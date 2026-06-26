'use client'

import { useEffect, useRef, useCallback } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db, isConfigured } from '@/lib/firebase'
import { useAuth } from '@/lib/auth-context'
import { useAppStore, stripFunctions } from '@/lib/store'

const SAVE_DEBOUNCE_MS = 3000
const STORE_FIELD = 'store'
const PENDING_KEY = 'gateee-sync-pending'
const MAX_RETRIES = 3
const RETRY_DELAY_MS = 1000
const MAX_LOAD_RETRIES = 2
const LOAD_RETRY_DELAY_MS = 2000

/**
 * Builds the Firestore-safe payload from current store state.
 * Strips functions, syncStatus, and timerState.
 */
function buildPayload(state: ReturnType<typeof useAppStore.getState>): Record<string, unknown> {
  const payload = stripFunctions(state)
  delete payload.syncStatus
  delete payload.timerState
  delete payload.setTimerState
  return payload
}

export function FirestoreSync() {
  const { user } = useAuth()
  const initialized = useRef(false)
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const retryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pendingSaveRef = useRef(false)
  const retryCountRef = useRef(0)
  const skipNextSaveRef = useRef(false)
  const setSyncStatus = useAppStore((s) => s.setSyncStatus)

  const doSaveRef = useRef<((state: ReturnType<typeof useAppStore.getState>) => Promise<void>) | null>(null)

  const doSave = useCallback(async (state: ReturnType<typeof useAppStore.getState>) => {
    if (!db || !user) return
    try {
      pendingSaveRef.current = false
      setSyncStatus({ state: 'saving', lastError: null })
      const payload = buildPayload(state)
      const ref = doc(db, 'users', user.uid)
      await setDoc(ref, { [STORE_FIELD]: payload }, { merge: true })
      retryCountRef.current = 0
      setSyncStatus({ state: 'saved' })
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown save error'

      if (retryCountRef.current < MAX_RETRIES) {
        retryCountRef.current++
        pendingSaveRef.current = true
        setSyncStatus({ state: 'saving', lastError: `Retrying (${retryCountRef.current}/${MAX_RETRIES})...` })
        retryTimerRef.current = setTimeout(() => {
          doSaveRef.current?.(useAppStore.getState())
        }, RETRY_DELAY_MS)
      } else {
        retryCountRef.current = 0
        pendingSaveRef.current = false
        setSyncStatus({ state: 'error', lastError: msg })
      }
    }
  }, [user, setSyncStatus])

  useEffect(() => {
    doSaveRef.current = doSave
  }, [doSave])

  /**
   * Loads user data from Firestore and MERGES it into local Zustand state.
   *
   * CRITICAL: Local non-empty data ALWAYS takes precedence over Firestore data.
   * Firestore is used to fill in gaps when local state is empty (new device).
   * After merge, the combined state is written back to Firestore to heal stale data.
   *
   * This prevents the "data vanishes on hard refresh" bug where a failed doSave
   * leaves empty defaults in Firestore that would otherwise overwrite real local data.
   */
  const loadFromFirestore = useCallback(async (retryAttempt = 0) => {
    if (!db || !user) return

    try {
      const current = useAppStore.getState()

      // --- Step 1: Check crash-recovery stash (freshest data from this device) ---
      let stashData: Record<string, unknown> | null = null
      try {
        const raw = localStorage.getItem(PENDING_KEY)
        if (raw) {
          stashData = JSON.parse(raw) as Record<string, unknown>
          localStorage.removeItem(PENDING_KEY)
        }
      } catch { /* ignore */ }

      // --- Step 2: Read Firestore ---
      const ref = doc(db, 'users', user.uid)
      const snap = await getDoc(ref)
      const remoteData = snap.exists()
        ? (snap.data()[STORE_FIELD] as Record<string, unknown> | undefined)
        : null

      // --- Step 3: Union/LocalMerge — combine all three sources per field ---
      // Arrays: UNION (keep items from ALL sources, deduplicate by JSON identity)
      // Records: MERGE with local keys winning
      // Objects: prefer remote (cross-device consistency), fall back to stash, then local

      const canonicalKey = (item: unknown): string => {
        // Sort keys to produce the same string regardless of property insertion order.
        // Firestore and localStorage may return objects with different key orderings,
        // which would cause JSON.stringify to produce different strings for identical data.
        if (item && typeof item === 'object' && !Array.isArray(item)) {
          const sorted: Record<string, unknown> = {}
          for (const k of Object.keys(item).sort()) {
            sorted[k] = (item as Record<string, unknown>)[k]
          }
          return JSON.stringify(sorted)
        }
        return JSON.stringify(item)
      }

      const unionArrays = <T,>(...sources: (T[] | undefined)[]): T[] => {
        const seen = new Set<string>()
        const result: T[] = []
        for (const arr of sources) {
          if (!arr) continue
          for (const item of arr) {
            const key = canonicalKey(item)
            if (!seen.has(key)) {
              seen.add(key)
              result.push(item)
            }
          }
        }
        return result
      }

      const mergeRecord = <T extends Record<string, unknown>>(local: T, ...others: (T | undefined)[]): T => {
        let merged = { ...local } as Record<string, unknown>
        for (const src of others) {
          if (src) merged = { ...src, ...merged }
        }
        return merged as T
      }

      const preferObject = <T extends Record<string, unknown>>(
        remote: T | undefined, stash: T | undefined, local: T
      ): T => {
        // Prefer remote (cross-device consistency), fall back to stash, then local
        if (remote && Object.keys(remote).length > 0) return remote
        if (stash && Object.keys(stash).length > 0) return stash
        return local
      }

      const mergedTopics = mergeRecord(
        current.topicsProgress,
        stashData?.topicsProgress as Record<string, string> | undefined,
        remoteData?.topicsProgress as Record<string, string> | undefined,
      )

      const mergedLogs = unionArrays(
        current.logs,
        stashData?.logs as typeof current.logs | undefined,
        remoteData?.logs as typeof current.logs | undefined,
      )

      const mergedTests = unionArrays(
        current.tests,
        stashData?.tests as typeof current.tests | undefined,
        remoteData?.tests as typeof current.tests | undefined,
      )

      const mergedRevision = unionArrays(
        current.revisionHistory,
        stashData?.revisionHistory as typeof current.revisionHistory | undefined,
        remoteData?.revisionHistory as typeof current.revisionHistory | undefined,
      )

      const mergedTasks = unionArrays(
        current.dailyTasks,
        stashData?.dailyTasks as typeof current.dailyTasks | undefined,
        remoteData?.dailyTasks as typeof current.dailyTasks | undefined,
      )

      const mergedTargets = unionArrays(
        current.weeklyTargets,
        stashData?.weeklyTargets as typeof current.weeklyTargets | undefined,
        remoteData?.weeklyTargets as typeof current.weeklyTargets | undefined,
      )

      const mergedUser = preferObject(
        remoteData?.user as Record<string, unknown> | undefined,
        stashData?.user as Record<string, unknown> | undefined,
        current.user as unknown as Record<string, unknown>,
      ) as unknown as typeof current.user

      const mergedSettings = preferObject(
        remoteData?.plannerSettings as Record<string, unknown> | undefined,
        stashData?.plannerSettings as Record<string, unknown> | undefined,
        current.plannerSettings as unknown as Record<string, unknown>,
      ) as unknown as typeof current.plannerSettings

      const mergedAppState = preferObject(
        remoteData?.appState as Record<string, unknown> | undefined,
        stashData?.appState as Record<string, unknown> | undefined,
        current.appState as unknown as Record<string, unknown>,
      ) as unknown as typeof current.appState

      // --- Step 5: Apply merged state to store ---
      skipNextSaveRef.current = true
      useAppStore.setState({
        user: mergedUser,
        topicsProgress: mergedTopics,
        logs: mergedLogs,
        tests: mergedTests,
        revisionHistory: mergedRevision,
        dailyTasks: mergedTasks,
        weeklyTargets: mergedTargets,
        plannerSettings: mergedSettings,
        appState: mergedAppState,
        syncStatus: { state: 'saved', lastError: null },
      } as Partial<typeof current>)

      // --- Step 6: Heal Firestore — push merged data up if it differs from what was there ---
      // This ensures Firestore always has the complete data set.
      const finalState = useAppStore.getState()
      const mergedPayload = buildPayload(finalState)
      const remoteStr = remoteData ? JSON.stringify(remoteData) : null
      const payloadStr = JSON.stringify(mergedPayload)
      if (!remoteStr || remoteStr !== payloadStr) {
        await setDoc(ref, { [STORE_FIELD]: mergedPayload }, { merge: true })
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown load error'

      if (retryAttempt < MAX_LOAD_RETRIES) {
        setSyncStatus({
          state: 'saving',
          lastError: `Retrying load (${retryAttempt + 1}/${MAX_LOAD_RETRIES})...`,
        })
        setTimeout(() => loadFromFirestore(retryAttempt + 1), LOAD_RETRY_DELAY_MS)
      } else {
        setSyncStatus({ state: 'error', lastError: msg })
      }
    }
  }, [user, setSyncStatus])

  // Load data from Firestore when user signs in
  useEffect(() => {
    if (!isConfigured || !db || !user) {
      initialized.current = false
      return
    }

    if (!initialized.current) {
      initialized.current = true
      if (useAppStore.persist.hasHydrated()) {
        loadFromFirestore()
      } else {
        const unsub = useAppStore.persist.onFinishHydration(() => {
          loadFromFirestore()
        })
        return () => { unsub() }
      }
    }
  }, [user, loadFromFirestore])

  // Subscribe to store changes and debounce saves
  useEffect(() => {
    if (!isConfigured || !db || !user) return

    const unsub = useAppStore.subscribe((state) => {
      if (skipNextSaveRef.current) {
        skipNextSaveRef.current = false
        return
      }

      if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
      pendingSaveRef.current = true
      retryCountRef.current = 0
      saveTimerRef.current = setTimeout(() => doSaveRef.current?.(state), SAVE_DEBOUNCE_MS)
    })

    return () => {
      unsub()
      if (saveTimerRef.current) { clearTimeout(saveTimerRef.current); saveTimerRef.current = null }
      if (retryTimerRef.current) { clearTimeout(retryTimerRef.current); retryTimerRef.current = null }
    }
  }, [user, doSave])

  // On tab close, stash unsaved data to localStorage for recovery on next load
  useEffect(() => {
    function stashPending() {
      if (!pendingSaveRef.current) return

      const state = useAppStore.getState()
      const payload = buildPayload(state)

      try {
        localStorage.setItem(PENDING_KEY, JSON.stringify(payload))
      } catch {
        // localStorage is full or unavailable — nothing we can do
      }
    }

    function onBeforeUnload() {
      stashPending()
    }

    // Mobile browsers kill tabs without beforeunload
    function onVisibilityChange() {
      if (document.visibilityState === 'hidden') {
        stashPending()
      }
    }

    window.addEventListener('beforeunload', onBeforeUnload)
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  return null
}
