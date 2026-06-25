import {
  rankMapping,
  categoryQualifyingRatios,
  yearStats,
  getScoreParamsForYear,
  computeScore,
  estimateMarksFromScore,
  getRankFromScore,
  getHistoricalRankRange,
  getTrendAnalysis,
  getRankForMarksInYear,
} from '@/lib/data/rankMapping'
import type { Subject } from '@/lib/data/syllabus'

export interface RankPrediction {
  minRank: number
  maxRank: number
  expectedRank: number
  score: number
}

export interface RankPredictionWithHistory extends RankPrediction {
  historicalMinRank: number
  historicalMaxRank: number
  historicalMedianRank: number
  yearDetails: { year: number; rank: number }[]
}

export interface VelocityResult {
  currentVelocity: number
  requiredVelocity: number
  velocityGap: number
  isOnTrack: boolean
  predictedCompletionDate: Date
}

export interface ReadinessInput {
  syllabusProgress: number
  mockScoreTrend: number[]
  revisionCoverage: number
  consistency: number
}

export interface ConsistencyResult {
  score: number
  streak: number
  averageDaily: number
}

export interface DailyTask {
  subjectId: string
  topicId: string
  topicName: string
  hours: number
  priority: 'high' | 'medium' | 'low'
}

export interface BurnoutResult {
  risk: 'low' | 'medium' | 'high'
  score: number
  recommendation: string
}

export interface TimeAllocationEntry {
  subjectId: string
  subjectName: string
  weightage: number
  allocatedHours: number
  priority: number
}

export interface CountdownResult {
  days: number
  hours: number
  minutes: number
  studyDays: number
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function marksToScore(marks: number): number {
  return computeScore(marks)
}

export function marksToRank(marks: number, category: string = 'General'): RankPrediction {
  const clamped = Math.min(100, Math.max(0, marks))
  const ratio = categoryQualifyingRatios[category as keyof typeof categoryQualifyingRatios] ?? 1
  const adjustedMarks = clamped * ratio

  let bracket = rankMapping[rankMapping.length - 1]
  for (const entry of rankMapping) {
    if (adjustedMarks >= entry.minMarks && adjustedMarks <= entry.maxMarks) {
      bracket = entry
      break
    }
  }

  const ratio2 = (adjustedMarks - bracket.minMarks) / (Math.max(bracket.maxMarks - bracket.minMarks, 1))
  const baseRank = bracket.maxRank - ratio2 * (bracket.maxRank - bracket.minRank)
  const score = computeScore(clamped)

  return {
    minRank: Math.max(1, Math.round(bracket.minRank)),
    maxRank: Math.max(1, Math.round(bracket.maxRank)),
    expectedRank: Math.max(1, Math.round(baseRank)),
    score,
  }
}

export function rankToMarks(targetRank: number, _category: string = 'General'): { marks: number; score: number } {
  for (const entry of rankMapping) {
    if (targetRank >= entry.minRank && targetRank <= entry.maxRank) {
      const rankRatio = (targetRank - entry.minRank) / (Math.max(entry.maxRank - entry.minRank, 1))
      const marks = entry.maxMarks - rankRatio * (entry.maxMarks - entry.minMarks)
      return { marks: Math.round(marks * 10) / 10, score: computeScore(marks) }
    }
  }
  return { marks: 0, score: 0 }
}

export function marksToRankWithHistory(marks: number, category: string = 'General'): RankPredictionWithHistory {
  const primary = marksToRank(marks, category)
  const history = getHistoricalRankRange(marks)

  return {
    ...primary,
    historicalMinRank: history.bestRank,
    historicalMaxRank: history.worstRank,
    historicalMedianRank: history.medianRank,
    yearDetails: history.years.map(y => ({ year: y.year, rank: y.expectedRank })),
  }
}

export function rankToMarksWithHistory(targetRank: number, category: string = 'General'): {
  marks: number
  score: number
  historicalMarks: { year: number; marks: number }[]
  marksRange: { min: number; max: number }
} {
  const primary = rankToMarks(targetRank, category)
  const historicalMarks: { year: number; marks: number }[] = []

  for (const stats of yearStats) {
    const params = getScoreParamsForYear(stats.year)
    for (const bracket of stats.scoreToRank) {
      if (targetRank >= bracket.minRank && targetRank <= bracket.maxRank) {
        const rankRatio = (targetRank - bracket.minRank) / (Math.max(bracket.maxRank - bracket.minRank, 1))
        const score = bracket.maxScore - rankRatio * (bracket.maxScore - bracket.minScore)
        const marks = estimateMarksFromScore(score, params)
        historicalMarks.push({ year: stats.year, marks })
        break
      }
    }
  }

  const sorted = [...historicalMarks].sort((a, b) => a.marks - b.marks)
  return {
    ...primary,
    historicalMarks,
    marksRange: {
      min: sorted.length > 0 ? sorted[0].marks : 0,
      max: sorted.length > 0 ? sorted[sorted.length - 1].marks : 100,
    },
  }
}

export function getYearOverYearRankComparison(marks: number): {
  year: number
  expectedRank: number
  score: number
  params: { mq: number; mt: number }
}[] {
  return yearStats.map(stats => {
    const params = getScoreParamsForYear(stats.year)
    const score = computeScore(marks, params)
    const rank = getRankFromScore(score, stats.scoreToRank)
    return { year: stats.year, expectedRank: rank.expectedRank, score, params }
  })
}

export function getPredictorTrendSummary() {
  return getTrendAnalysis()
}

export function getDaysUntilExam(targetDate?: Date, excludeWeekends?: boolean): CountdownResult {
  const GATE_2027 = new Date(2027, 1, 7)
  const target = targetDate ?? GATE_2027
  const now = new Date()

  if (now > target) {
    return { days: 0, hours: 0, minutes: 0, studyDays: 0 }
  }

  const diffMs = target.getTime() - now.getTime()
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

  let studyDays = days
  if (excludeWeekends) {
    let count = 0
    const d = new Date(now)
    for (let i = 0; i < days; i++) {
      const day = d.getDay()
      if (day !== 0 && day !== 6) count++
      d.setDate(d.getDate() + 1)
    }
    studyDays = count
  }

  return { days, hours, minutes, studyDays }
}

export function calculateVelocity(
  completedTopics: number,
  totalTopics: number,
  daysElapsed: number,
  totalDays: number,
): VelocityResult {
  const safeDaysElapsed = Math.max(1, daysElapsed)
  const safeTotalDays = Math.max(1, totalDays)

  const currentVelocity = (completedTopics / safeDaysElapsed) * 7

  const remainingTopics = Math.max(0, totalTopics - completedTopics)
  const remainingDays = Math.max(1, safeTotalDays - daysElapsed)
  const requiredVelocity = remainingTopics / (remainingDays / 7)

  const velocityGap = requiredVelocity - currentVelocity
  const isOnTrack = currentVelocity >= requiredVelocity

  const weeksToComplete = requiredVelocity > 0 ? remainingTopics / requiredVelocity : 0
  const predictedDays = Math.round(weeksToComplete * 7)
  const predictedCompletionDate = new Date(Date.now() + Math.max(1, predictedDays) * 86400000)

  return {
    currentVelocity: Math.round(currentVelocity * 100) / 100,
    requiredVelocity: Math.round(requiredVelocity * 100) / 100,
    velocityGap: Math.round(velocityGap * 100) / 100,
    isOnTrack,
    predictedCompletionDate,
  }
}

export function calculateReadinessScore(input: ReadinessInput): number {
  const { syllabusProgress, mockScoreTrend, revisionCoverage, consistency } = input

  const syllabusScore = clamp(syllabusProgress, 0, 100) * 0.3

  const avgMockScore =
    mockScoreTrend.length > 0
      ? mockScoreTrend.reduce((a, b) => a + b, 0) / mockScoreTrend.length
      : 0
  const normalizedMock = clamp((avgMockScore / 100) * 100, 0, 100)
  const mockScore = normalizedMock * 0.35

  const revisionScore = clamp(revisionCoverage, 0, 100) * 0.2

  const consistencyScore = clamp(consistency, 0, 100) * 0.15

  const total = Math.round((syllabusScore + mockScore + revisionScore + consistencyScore) * 100) / 100

  return clamp(total, 0, 100)
}

export function calculateConsistencyScore(
  studyLogs: { date: Date; hoursStudied: number; topicsCovered: string[] }[],
): ConsistencyResult {
  if (studyLogs.length === 0) {
    return { score: 0, streak: 0, averageDaily: 0 }
  }

  const sorted = [...studyLogs].sort((a, b) => a.date.getTime() - b.date.getTime())

  const totalHours = sorted.reduce((sum, log) => sum + log.hoursStudied, 0)
  const averageDaily = Math.round((totalHours / sorted.length) * 100) / 100

  let streak = 0
  const today = new Date()
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime()

  for (let i = sorted.length - 1; i >= 0; i--) {
    const logDate = new Date(sorted[i].date.getFullYear(), sorted[i].date.getMonth(), sorted[i].date.getDate()).getTime()
    const expectedDate = streak === 0 ? todayDate : todayDate - streak * 86400000
    const diff = Math.round((expectedDate - logDate) / 86400000)
    if (diff <= 1 && sorted[i].hoursStudied > 0) {
      streak++
    } else {
      break
    }
  }

  const streakScore = clamp((streak / 30) * 30, 0, 30)

  const sortedDates = sorted.map((l) =>
    new Date(l.date.getFullYear(), l.date.getMonth(), l.date.getDate()).getTime(),
  )
  const uniqueDays = new Set(sortedDates).size
  const firstDate = sortedDates[0]
  const lastDate = sortedDates[sortedDates.length - 1]
  const totalPeriod = Math.max(1, Math.round((lastDate - firstDate) / 86400000) + 1)
  const daysStudiedScore = clamp((uniqueDays / totalPeriod) * 30, 0, 30)

  const hoursList = sorted.map((l) => l.hoursStudied)
  const mean = hoursList.reduce((a, b) => a + b, 0) / hoursList.length
  const variance = hoursList.reduce((sum, h) => sum + (h - mean) ** 2, 0) / hoursList.length
  const stdDev = Math.sqrt(variance)
  const consistencyPenalty = clamp(stdDev * 3, 0, 20)
  const stdDevScore = clamp(20 - consistencyPenalty, 0, 20)

  const weekendLogs = sorted.filter((l) => {
    const d = l.date.getDay()
    return d === 0 || d === 6
  })
  const weekendHours = weekendLogs.reduce((sum, l) => sum + l.hoursStudied, 0)
  const totalUniqueWeekends = weekendLogs.filter(
    (l, i, arr) =>
      arr.findIndex(
        (x) =>
          new Date(x.date.getFullYear(), x.date.getMonth(), x.date.getDate()).getTime() ===
          new Date(l.date.getFullYear(), l.date.getMonth(), l.date.getDate()).getTime(),
      ) === i,
  ).length
  const idealWeekendHours = totalUniqueWeekends * (averageDaily * 0.6)
  const weekendRatio =
    idealWeekendHours > 0
      ? clamp((weekendHours / idealWeekendHours) * 20, 0, 20)
      : 0

  const totalScore = clamp(
    Math.round((streakScore + daysStudiedScore + stdDevScore + weekendRatio) * 100) / 100,
    0,
    100,
  )

  return { score: totalScore, streak, averageDaily }
}

export function generateStudyPlan(
  userSettings: { availableHours: number; weakSubjects: string[]; strongSubjects: string[] },
  syllabusData: Subject[],
  currentProgress: Record<string, string>,
): DailyTask[] {
  const { availableHours, weakSubjects, strongSubjects } = userSettings
  const tasks: DailyTask[] = []

  const pendingTopics: Array<{ subject: Subject; topicIndex: number; topic: Subject['topics'][0] }> = []

  for (const subject of syllabusData) {
    for (let i = 0; i < subject.topics.length; i++) {
      const topic = subject.topics[i]
      const status = currentProgress[topic.id]
      if (status === 'not_started' || status === 'in_progress') {
        pendingTopics.push({ subject, topicIndex: i, topic })
      }
    }
  }

  pendingTopics.sort((a, b) => {
    const aWeak = weakSubjects.includes(a.subject.id) ? 0 : 1
    const bWeak = weakSubjects.includes(b.subject.id) ? 0 : 1
    if (aWeak !== bWeak) return aWeak - bWeak
    const aStrong = strongSubjects.includes(a.subject.id) ? 1 : 0
    const bStrong = strongSubjects.includes(b.subject.id) ? 1 : 0
    if (aStrong !== bStrong) return aStrong - bStrong
    return b.topic.weightage - a.topic.weightage
  })

  let remainingHours = availableHours
  for (const item of pendingTopics) {
    if (remainingHours <= 0) break
    const hours = Math.min(item.topic.hours * 0.5, remainingHours)
    tasks.push({
      subjectId: item.subject.id,
      topicId: item.topic.id,
      topicName: item.topic.name,
      hours: Math.round(hours * 10) / 10,
      priority: weakSubjects.includes(item.subject.id) ? 'high' : 'medium',
    })
    remainingHours -= hours
  }

  return tasks
}

export function calculateBurnoutRisk(
  consecutiveHighIntensityDays: number,
  mockScoreTrend: number[],
  averageStudyHours: number,
): BurnoutResult {
  const intensityScore = clamp(consecutiveHighIntensityDays / 7, 0, 1) * 40

  let trendScore = 0
  if (mockScoreTrend.length >= 2) {
    const recent = mockScoreTrend.slice(-3)
    const improving = recent.length >= 2 && recent[recent.length - 1] > recent[0]
    trendScore = improving ? 10 : 25
  } else {
    trendScore = 15
  }

  const hoursScore = averageStudyHours > 8 ? 30 : averageStudyHours > 6 ? 20 : 10

  const total = intensityScore + trendScore + hoursScore

  let risk: 'low' | 'medium' | 'high'
  let recommendation: string

  if (total >= 60) {
    risk = 'high'
    recommendation = 'Take a rest day. Your intensity and hours are unsustainable.'
  } else if (total >= 35) {
    risk = 'medium'
    recommendation = 'Consider reducing study hours or taking a lighter day.'
  } else {
    risk = 'low'
    recommendation = 'Your current pace is sustainable. Keep going!'
  }

  return { risk, score: Math.round(total), recommendation }
}

export function calculateTimeAllocation(
  availableDays: number,
  availableHoursPerDay: number,
  syllabusData: Subject[],
  userWeakness: string[],
): TimeAllocationEntry[] {
  const totalHours = availableDays * availableHoursPerDay

  const entries: TimeAllocationEntry[] = syllabusData.map(subject => {
    const isWeak = userWeakness.includes(subject.id)
    const weakMultiplier = isWeak ? 1.3 : 1
    const baseAllocation = (subject.weightage / 100) * totalHours * weakMultiplier
    const priority = isWeak ? subject.topics.filter(t => t.frequency === 'very_high').length : 0

    return {
      subjectId: subject.id,
      subjectName: subject.shortName,
      weightage: subject.weightage,
      allocatedHours: Math.round(baseAllocation * 10) / 10,
      priority,
    }
  })

  const totalAllocated = entries.reduce((s, e) => s + e.allocatedHours, 0)
  const factor = totalHours / (totalAllocated || 1)

  return entries.map(e => ({
    ...e,
    allocatedHours: Math.round(e.allocatedHours * factor * 10) / 10,
  }))
}

export interface College {
  id: string
  name: string
  tier: 'IIT' | 'NIT' | 'IIIT' | 'GFTI'
  specializations: string[]
  city: string
  state: string
  cutoffScore: number
  cutoffSource: string
}

export const COLLEGES: College[] = [
  { id: 'iisc-bangalore', name: 'IISc Bangalore', tier: 'IIT', specializations: ['EE'], city: 'Bangalore', state: 'Karnataka', cutoffScore: 876, cutoffSource: 'IISc EE COAP 2024 R1 closing score' },
  { id: 'iit-bombay', name: 'IIT Bombay', tier: 'IIT', specializations: ['EE'], city: 'Mumbai', state: 'Maharashtra', cutoffScore: 750, cutoffSource: 'IIT Bombay EE3 (Power Electronics) COAP 2024 R1' },
  { id: 'iit-delhi', name: 'IIT Delhi', tier: 'IIT', specializations: ['EE'], city: 'New Delhi', state: 'Delhi', cutoffScore: 735, cutoffSource: 'IIT Delhi Power Systems COAP 2024 R1' },
  { id: 'iit-madras', name: 'IIT Madras', tier: 'IIT', specializations: ['EE'], city: 'Chennai', state: 'Tamil Nadu', cutoffScore: 709, cutoffSource: 'IIT Madras EE2Y Power Systems COAP 2024 R1' },
  { id: 'iit-kanpur', name: 'IIT Kanpur', tier: 'IIT', specializations: ['EE'], city: 'Kanpur', state: 'Uttar Pradesh', cutoffScore: 731, cutoffSource: 'IIT Kanpur PE (Power Engineering) COAP 2024 R1' },
  { id: 'iit-kharagpur', name: 'IIT Kharagpur', tier: 'IIT', specializations: ['EE'], city: 'Kharagpur', state: 'West Bengal', cutoffScore: 608, cutoffSource: 'IIT KGP EE4 COAP 2024 cutoff' },
  { id: 'iit-roorkee', name: 'IIT Roorkee', tier: 'IIT', specializations: ['EE'], city: 'Roorkee', state: 'Uttarakhand', cutoffScore: 760, cutoffSource: 'IIT Roorkee Power System Engg COAP 2024 R1' },
  { id: 'iit-guwahati', name: 'IIT Guwahati', tier: 'IIT', specializations: ['EE'], city: 'Guwahati', state: 'Assam', cutoffScore: 650, cutoffSource: 'IITG EE COAP 2024 median estimate' },
  { id: 'iit-hyderabad', name: 'IIT Hyderabad', tier: 'IIT', specializations: ['EE'], city: 'Hyderabad', state: 'Telangana', cutoffScore: 680, cutoffSource: 'IITH Power Electronics COAP 2024 data' },
  { id: 'iit-bhu', name: 'IIT (BHU) Varanasi', tier: 'IIT', specializations: ['EE'], city: 'Varanasi', state: 'Uttar Pradesh', cutoffScore: 622, cutoffSource: 'IIT BHU PE (Power Electronics) COAP 2025 R1' },
  { id: 'iit-jodhpur', name: 'IIT Jodhpur', tier: 'IIT', specializations: ['EE'], city: 'Jodhpur', state: 'Rajasthan', cutoffScore: 610, cutoffSource: 'IIT Jodhpur EEC (Control) COAP 2024 R1' },
  { id: 'iit-patna', name: 'IIT Patna', tier: 'IIT', specializations: ['EE'], city: 'Patna', state: 'Bihar', cutoffScore: 480, cutoffSource: 'IIT Patna EE COAP 2024 median estimate' },
  { id: 'nit-trichy', name: 'NIT Trichy', tier: 'NIT', specializations: ['EE'], city: 'Tiruchirappalli', state: 'Tamil Nadu', cutoffScore: 555, cutoffSource: 'NIT Trichy Power Electronics CCMT 2024 R1' },
  { id: 'nit-warangal', name: 'NIT Warangal', tier: 'NIT', specializations: ['EE'], city: 'Warangal', state: 'Telangana', cutoffScore: 509, cutoffSource: 'NIT Warangal Power & Energy CCMT 2024 R1' },
  { id: 'nit-surathkal', name: 'NIT Surathkal', tier: 'NIT', specializations: ['EE'], city: 'Mangalore', state: 'Karnataka', cutoffScore: 557, cutoffSource: 'NITK Surathkal Power & Energy CCMT 2024 R1' },
  { id: 'nit-calicut', name: 'NIT Calicut', tier: 'NIT', specializations: ['EE'], city: 'Calicut', state: 'Kerala', cutoffScore: 421, cutoffSource: 'NIT Calicut Power Electronics CCMT 2024 R1' },
  { id: 'mnnit', name: 'MNNIT Allahabad', tier: 'NIT', specializations: ['EE'], city: 'Prayagraj', state: 'Uttar Pradesh', cutoffScore: 435, cutoffSource: 'MNNIT Power Electronics & Drives CCMT 2024 R1' },
  { id: 'nit-rourkela', name: 'NIT Rourkela', tier: 'NIT', specializations: ['EE'], city: 'Rourkela', state: 'Odisha', cutoffScore: 503, cutoffSource: 'NIT Rourkela PE&Drives CCMT 2024 R1' },
  { id: 'nit-durgapur', name: 'NIT Durgapur', tier: 'NIT', specializations: ['EE'], city: 'Durgapur', state: 'West Bengal', cutoffScore: 398, cutoffSource: 'NIT Durgapur Power System CCMT 2024 R1' },
  { id: 'nit-kurukshetra', name: 'NIT Kurukshetra', tier: 'NIT', specializations: ['EE'], city: 'Kurukshetra', state: 'Haryana', cutoffScore: 380, cutoffSource: 'NIT Kurukshetra EE CCMT 2024 estimate' },
  { id: 'svnit', name: 'SVNIT Surat', tier: 'GFTI', specializations: ['EE'], city: 'Surat', state: 'Gujarat', cutoffScore: 424, cutoffSource: 'SVNIT Power Electronics & Drives CCMT 2024 R1' },
  { id: 'nit-patna', name: 'NIT Patna', tier: 'NIT', specializations: ['EE'], city: 'Patna', state: 'Bihar', cutoffScore: 380, cutoffSource: 'NIT Patna EE CCMT 2024 estimate' },
  { id: 'nit-silchar', name: 'NIT Silchar', tier: 'NIT', specializations: ['EE'], city: 'Silchar', state: 'Assam', cutoffScore: 350, cutoffSource: 'NIT Silchar EE CCMT 2024 estimate' },
  { id: 'iiest-shibpur', name: 'IIEST Shibpur', tier: 'GFTI', specializations: ['EE'], city: 'Shibpur', state: 'West Bengal', cutoffScore: 429, cutoffSource: 'IIEST Shibpur PEMD CCMT 2024 R1' },
  { id: 'dtu-delhi', name: 'DTU Delhi', tier: 'GFTI', specializations: ['EE'], city: 'Delhi', state: 'Delhi', cutoffScore: 400, cutoffSource: 'DTU Power System Engg CCMT 2024 R1' },
  { id: 'pec', name: 'PEC Chandigarh', tier: 'GFTI', specializations: ['EE'], city: 'Chandigarh', state: 'Chandigarh', cutoffScore: 354, cutoffSource: 'PEC EE/EES CCMT 2024 R1' },
]
