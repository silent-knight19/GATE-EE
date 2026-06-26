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
   * Checks for and recovers stashed crash data.
   * Returns true if stashed data was found and flushed to Firestore.
   * Only called when Firestore document doesn't exist yet (first load).
   */
  const recoverCrashData = useCallback(async (): Promise<boolean> => {
    if (!db || !user) return false
    try {
      const raw = localStorage.getItem(PENDING_KEY)
      if (!raw) return false
      const payload = JSON.parse(raw)
      const ref = doc(db, 'users', user.uid)
      await setDoc(ref, { [STORE_FIELD]: payload }, { merge: true })
      localStorage.removeItem(PENDING_KEY)
      return true
    } catch {
      return false
    }
  }, [user])

  /**
   * Discards stale crash-recovery stash when Firestore already has fresher data.
   */
  const discardStash = useCallback(() => {
    try {
      const raw = localStorage.getItem(PENDING_KEY)
      if (raw) localStorage.removeItem(PENDING_KEY)
    } catch { /* ignore */ }
  }, [])

  /**
   * Loads user data from Firestore into local Zustand state.
   * Firestore is the single source of truth.
   * Fixed: flushPendingSave runs only when doc doesn't exist (crash recovery).
   * Fixed: retry on load failure.
   * Fixed: setState and syncStatus combined to prevent redundant save-back.
   */
  const loadFromFirestore = useCallback(async (retryAttempt = 0) => {
    if (!db || !user) return

    try {
      const ref = doc(db, 'users', user.uid)
      const snap = await getDoc(ref)
      const current = useAppStore.getState()

      if (snap.exists()) {
        const remoteData = snap.data()[STORE_FIELD] as Record<string, unknown> | undefined

        if (remoteData) {
          // Firestore has data — use it as source of truth.
          // Discard any stale crash-recovery stash since Firestore is fresher.
          discardStash()

          const remoteTopics = (remoteData.topicsProgress || {}) as Record<string, string>
          const mergedTopics = {
            ...current.topicsProgress,
            ...remoteTopics,
          }

          skipNextSaveRef.current = true
          useAppStore.setState({
            user: (remoteData.user as typeof current.user) || current.user,
            topicsProgress: mergedTopics,
            logs: (remoteData.logs as typeof current.logs) || [],
            tests: (remoteData.tests as typeof current.tests) || [],
            revisionHistory: (remoteData.revisionHistory as typeof current.revisionHistory) || [],
            dailyTasks: (remoteData.dailyTasks as typeof current.dailyTasks) || [],
            weeklyTargets: (remoteData.weeklyTargets as typeof current.weeklyTargets) || [],
            plannerSettings: (remoteData.plannerSettings as typeof current.plannerSettings) || current.plannerSettings,
            appState: (remoteData.appState as typeof current.appState) || current.appState,
            syncStatus: { state: 'saved', lastError: null },
          } as Partial<typeof current>)
        } else {
          // Doc exists but store field missing — seed it with local data
          const payload = buildPayload(current)
          await setDoc(ref, { [STORE_FIELD]: payload }, { merge: true })
          skipNextSaveRef.current = true
          useAppStore.setState({
            syncStatus: { state: 'saved', lastError: null },
          } as Partial<typeof current>)
        }
      } else {
        // Doc doesn't exist — check for crash-recovery stash
        const hadStash = await recoverCrashData()
        if (hadStash) {
          // Re-read the recovered data
          const snap2 = await getDoc(ref)
          const remoteData2 = snap2.data()?.[STORE_FIELD] as Record<string, unknown> | undefined
          if (remoteData2) {
            skipNextSaveRef.current = true
            useAppStore.setState({
              user: (remoteData2.user as typeof current.user) || current.user,
              topicsProgress: {
                ...current.topicsProgress,
                ...(remoteData2.topicsProgress as Record<string, string> || {}),
              },
              logs: (remoteData2.logs as typeof current.logs) || [],
              tests: (remoteData2.tests as typeof current.tests) || [],
              revisionHistory: (remoteData2.revisionHistory as typeof current.revisionHistory) || [],
              dailyTasks: (remoteData2.dailyTasks as typeof current.dailyTasks) || [],
              weeklyTargets: (remoteData2.weeklyTargets as typeof current.weeklyTargets) || [],
              plannerSettings: (remoteData2.plannerSettings as typeof current.plannerSettings) || current.plannerSettings,
              appState: (remoteData2.appState as typeof current.appState) || current.appState,
              syncStatus: { state: 'saved', lastError: null },
            } as Partial<typeof current>)
            return
          }
        }

        // Truly first-time user: push local state up to Firestore
        const payload = buildPayload(current)
        await setDoc(ref, { [STORE_FIELD]: payload }, { merge: true })
        skipNextSaveRef.current = true
        useAppStore.setState({
          syncStatus: { state: 'saved', lastError: null },
        } as Partial<typeof current>)
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
  }, [user, setSyncStatus, discardStash, recoverCrashData])

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
