export interface RankEntry {
  minMarks: number
  maxMarks: number
  minScore: number
  maxScore: number
  minRank: number
  maxRank: number
  category: 'General'
}

export type RankMappingEntry = RankEntry

export interface CollegeRef {
  name: string
  tier: 'IIT' | 'NIT' | 'IIIT' | 'GFTI' | 'Private' | 'Deemed'
  category: 'General' | 'OBC' | 'EWS' | 'SC' | 'ST' | 'PwD'
  specializations: string[]
}

export interface YearStats {
  year: number
  registered: number
  appeared: number
  qualified: number
  qualifyingMarksGeneral: number
  qualifyingMarksObcEws: number
  qualifyingMarksScStPwd: number
  topMeanMarks: number
  maxMarks: number
  conductingInstitute: string
  source: string
  scoreToRank: { minScore: number; maxScore: number; minRank: number; maxRank: number }[]
}

const GENERAL_RANKS: Omit<RankEntry, 'category'>[] = [
  { minMarks: 74, maxMarks: 100, minScore: 901, maxScore: 1000, minRank: 1, maxRank: 19 },
  { minMarks: 66, maxMarks: 74, minScore: 801, maxScore: 900, minRank: 21, maxRank: 78 },
  { minMarks: 59, maxMarks: 66, minScore: 701, maxScore: 800, minRank: 82, maxRank: 239 },
  { minMarks: 51, maxMarks: 59, minScore: 601, maxScore: 700, minRank: 257, maxRank: 622 },
  { minMarks: 44, maxMarks: 51, minScore: 501, maxScore: 600, minRank: 648, maxRank: 1417 },
  { minMarks: 36, maxMarks: 44, minScore: 401, maxScore: 500, minRank: 1471, maxRank: 2946 },
  { minMarks: 29, maxMarks: 36, minScore: 301, maxScore: 400, minRank: 3069, maxRank: 5682 },
  { minMarks: 25, maxMarks: 29, minScore: 252, maxScore: 300, minRank: 5908, maxRank: 11902 },
  { minMarks: 0, maxMarks: 25, minScore: 0, maxScore: 252, minRank: 11902, maxRank: 67701 },
]

const SCORE_TO_RANK_2025: { minScore: number; maxScore: number; minRank: number; maxRank: number }[] = [
  { minScore: 901, maxScore: 1000, minRank: 1, maxRank: 19 },
  { minScore: 801, maxScore: 900, minRank: 21, maxRank: 78 },
  { minScore: 701, maxScore: 800, minRank: 82, maxRank: 239 },
  { minScore: 601, maxScore: 700, minRank: 257, maxRank: 622 },
  { minScore: 501, maxScore: 600, minRank: 648, maxRank: 1417 },
  { minScore: 401, maxScore: 500, minRank: 1471, maxRank: 2946 },
  { minScore: 301, maxScore: 400, minRank: 3069, maxRank: 5682 },
  { minScore: 201, maxScore: 300, minRank: 5908, maxRank: 11902 },
  { minScore: 0, maxScore: 200, minRank: 11902, maxRank: 67701 },
]

const SCORE_TO_RANK_2024: { minScore: number; maxScore: number; minRank: number; maxRank: number }[] = [
  { minScore: 901, maxScore: 1000, minRank: 1, maxRank: 620 },
  { minScore: 801, maxScore: 900, minRank: 621, maxRank: 14998 },
  { minScore: 701, maxScore: 800, minRank: 14999, maxRank: 43158 },
  { minScore: 601, maxScore: 700, minRank: 43159, maxRank: 54625 },
  { minScore: 501, maxScore: 600, minRank: 54626, maxRank: 58016 },
  { minScore: 401, maxScore: 500, minRank: 58017, maxRank: 59149 },
  { minScore: 301, maxScore: 400, minRank: 59150, maxRank: 59500 },
  { minScore: 201, maxScore: 300, minRank: 59501, maxRank: 59599 },
  { minScore: 0, maxScore: 200, minRank: 59599, maxRank: 59599 },
]

export const MARKS_TO_RANK_HISTORY: Record<number, { minMarks: number; maxMarks: number; minRank: number; maxRank: number }[]> = {
  2022: [
    { minMarks: 0, maxMarks: 20, minRank: 12681, maxRank: 25000 },
    { minMarks: 20, maxMarks: 30, minRank: 10006, maxRank: 12680 },
    { minMarks: 30, maxMarks: 40, minRank: 5378, maxRank: 10005 },
    { minMarks: 40, maxMarks: 50, minRank: 2786, maxRank: 5377 },
    { minMarks: 50, maxMarks: 60, minRank: 1167, maxRank: 2785 },
    { minMarks: 60, maxMarks: 70, minRank: 347, maxRank: 1166 },
    { minMarks: 70, maxMarks: 80, minRank: 42, maxRank: 346 },
    { minMarks: 80, maxMarks: 90, minRank: 3, maxRank: 41 },
    { minMarks: 90, maxMarks: 100, minRank: 1, maxRank: 2 },
  ],
  2023: [
    { minMarks: 0, maxMarks: 10, minRank: 5471, maxRank: 8000 },
    { minMarks: 10, maxMarks: 20, minRank: 3001, maxRank: 5470 },
    { minMarks: 20, maxMarks: 30, minRank: 2304, maxRank: 3000 },
    { minMarks: 30, maxMarks: 40, minRank: 622, maxRank: 2303 },
    { minMarks: 40, maxMarks: 50, minRank: 110, maxRank: 621 },
    { minMarks: 50, maxMarks: 60, minRank: 13, maxRank: 109 },
    { minMarks: 60, maxMarks: 70, minRank: 1, maxRank: 12 },
  ],
  2024: [
    { minMarks: 0, maxMarks: 20, minRank: 6156, maxRank: 12596 },
    { minMarks: 20, maxMarks: 30, minRank: 3001, maxRank: 6155 },
    { minMarks: 30, maxMarks: 40, minRank: 1451, maxRank: 3000 },
    { minMarks: 40, maxMarks: 50, minRank: 591, maxRank: 1450 },
    { minMarks: 50, maxMarks: 60, minRank: 176, maxRank: 590 },
    { minMarks: 60, maxMarks: 70, minRank: 21, maxRank: 175 },
    { minMarks: 70, maxMarks: 80, minRank: 1, maxRank: 20 },
  ],
}

export const yearStats: YearStats[] = [
  {
    year: 2022,
    registered: 96850,
    appeared: 69734,
    qualified: 12680,
    qualifyingMarksGeneral: 30.7,
    qualifyingMarksObcEws: 27.6,
    qualifyingMarksScStPwd: 20.4,
    topMeanMarks: 92.67,
    maxMarks: 92.67,
    conductingInstitute: 'IIT Kharagpur',
    source:
      'Registered/Appeared/Qualified: inspirenignite.com (GATE 2022 official data from IIT Kharagpur report), confirmed by CollegeDekho (collegedekho.com/news/highest-marks-in-gate-electrical-engineering-ee) and Careers360. Mq: Times of India, Jagran Josh, Careers360, CollegeDekho — all confirm Gen=30.7, OBC=27.6, SC/ST=20.4. Mt: computed from AIR-1=92.67 (Gaurav Kumar) → Score 1000, confirmed by IIT Kharagpur topper page (gate.iitkgp.ac.in/gate2022/toppers.html), News18, BYJU\'s. Marks-vs-rank: CollegeDekho retrospective 2024 analysis (published 2024-03-16, verified against actual 2022 data).',
    scoreToRank: [
      { minScore: 901, maxScore: 1000, minRank: 1, maxRank: 2 },
      { minScore: 801, maxScore: 900, minRank: 3, maxRank: 41 },
      { minScore: 701, maxScore: 800, minRank: 42, maxRank: 346 },
      { minScore: 601, maxScore: 700, minRank: 347, maxRank: 1166 },
      { minScore: 501, maxScore: 600, minRank: 1167, maxRank: 2785 },
      { minScore: 401, maxScore: 500, minRank: 2786, maxRank: 5377 },
      { minScore: 301, maxScore: 400, minRank: 5378, maxRank: 10005 },
      { minScore: 252, maxScore: 300, minRank: 10006, maxRank: 12680 },
    ],
  },
  {
    year: 2023,
    registered: 70361,
    appeared: 55292,
    qualified: 6213,
    qualifyingMarksGeneral: 25,
    qualifyingMarksObcEws: 22.5,
    qualifyingMarksScStPwd: 16.6,
    topMeanMarks: 66,
    maxMarks: 66,
    conductingInstitute: 'IIT Kanpur',
    source:
      'Registered/Appeared/Qualified: collegedunia.com (GATE 2023 official category-wise breakdown from IIT Kanpur Statistical Report). Mq: IIT Kanpur official cutoff — confirmed by Careers360, Times of India, Jagran Josh, GateExam.info, CollegeDekho, PW Live (all report Gen=25, OBC=22.5, SC/ST=16.6). AIR-1: Bhanwar Singh Choudhary, 66 marks → Score 1000 (Economic Times, TOI, CollegeDekho, Engineers Institute, EduRev). Mt: computed from AIR-1=66 (Mean of top 0.1% for this paper). Marks-vs-rank: CollegeDekho retrospective 2024 analysis (published 2024-03-16). Qualified candidates: 6213 from category sum (Gen=1686, EWS=585, OBC=2356, SC=1154, ST=432).',
    scoreToRank: [
      { minScore: 901, maxScore: 1000, minRank: 1, maxRank: 12 },
      { minScore: 801, maxScore: 900, minRank: 13, maxRank: 109 },
      { minScore: 701, maxScore: 800, minRank: 110, maxRank: 621 },
      { minScore: 601, maxScore: 700, minRank: 622, maxRank: 2303 },
      { minScore: 501, maxScore: 600, minRank: 2304, maxRank: 5470 },
      { minScore: 252, maxScore: 500, minRank: 5471, maxRank: 6213 },
    ],
  },
  {
    year: 2024,
    registered: 73728,
    appeared: 59599,
    qualified: 12596,
    qualifyingMarksGeneral: 25.7,
    qualifyingMarksObcEws: 23.1,
    qualifyingMarksScStPwd: 17.1,
    topMeanMarks: 67.48,
    maxMarks: 77,
    conductingInstitute: 'IISc Bangalore',
    source:
      'Registered/Appeared/Qualified/Mq/Mt: IISc Bangalore official Statistical Report (gate2024.iisc.ac.in — GATE2024StatisticalAndPerformanceReportWebVersion.pdf). AIR-1: Manoj Kumar Sinha, Shivam, Sai Kiran Adelly (all 77 marks → Score 1000) — confirmed by IISc AIR-1 page and CollegeSearch. Score distribution: derived from IISc PDF candidate count per score band (620+14378+28160+11467+3391+1133+351+85 = 59599 total appeared). Mq confirmed by IISc cut-off page. Marks-vs-rank: CollegeDekho expected analysis (collegedekho.com/news/expected-gate-electrical-ee-marks-vs-rank-analysis-2024) — AIR-1=77 consistent with bracket 70-80→Rank 1-20.',
    scoreToRank: SCORE_TO_RANK_2024,
  },
  {
    year: 2025,
    registered: 83355,
    appeared: 67701,
    qualified: 11902,
    qualifyingMarksGeneral: 25,
    qualifyingMarksObcEws: 22.5,
    qualifyingMarksScStPwd: 16.6,
    topMeanMarks: 81.67,
    maxMarks: 81.67,
    conductingInstitute: 'IIT Roorkee',
    source:
      'Registered/Appeared/Mq: IIT Roorkee official cut-off page (gate2025.iitr.ac.in/cut-off-marks.html) — confirmed by Careers360, CollegeDekho, Jagran Josh. AIR-1: Pradip Chauhan, 81.67 marks → Score 1000 (IIT Roorkee AIR-1 page). Score-to-rank: IMS India (imsindia.com/blog/gate/gate-marks-vs-rank) — published from official GATE 2025 Statistical Report data (score distribution for EE: 901-1000→1-19, 801-900→21-78, 701-800→82-239, 601-700→257-622, 501-600→648-1417, 401-500→1471-2946, 301-400→3069-5682, 252-300→5908-11360). Mt: computed from formula; AIR-1 marks 81.67 = mean of top 0.1% for EE 2025.',
    scoreToRank: SCORE_TO_RANK_2025,
  },
  {
    year: 2026,
    registered: 81947,
    appeared: 65801,
    qualified: 12500,
    qualifyingMarksGeneral: 27.7,
    qualifyingMarksObcEws: 24.9,
    qualifyingMarksScStPwd: 18.4,
    topMeanMarks: 92,
    maxMarks: 92,
    conductingInstitute: 'IIT Guwahati',
    source:
      'Registered/Appeared/Mq: IIT Guwahati official cut-off page (gate2026.iitg.ac.in/cut-off.html) — confirmed by Jagran Josh, PW Live, Careers360, GeeksforGeeks, Shiksha, FindMyCollege (ALL sources agree: Gen=27.7, OBC=24.9, SC/ST=18.4). AIR-1: Tejavath Manoj Kumar, 92 marks → Score 1000 (GeeksforGeeks GATE 2026 AIR-1 list). Mt: computed from AIR-1=92 marks. Qualified: estimated from appeared count and pass rate trends. Score-to-rank: ESTIMATED (no official report published yet by IIT Guwahati).',
    scoreToRank: [
      { minScore: 901, maxScore: 1000, minRank: 1, maxRank: 15 },
      { minScore: 801, maxScore: 900, minRank: 16, maxRank: 65 },
      { minScore: 701, maxScore: 800, minRank: 66, maxRank: 210 },
      { minScore: 601, maxScore: 700, minRank: 211, maxRank: 550 },
      { minScore: 501, maxScore: 600, minRank: 551, maxRank: 1250 },
      { minScore: 401, maxScore: 500, minRank: 1251, maxRank: 2650 },
      { minScore: 301, maxScore: 400, minRank: 2651, maxRank: 5200 },
      { minScore: 201, maxScore: 300, minRank: 5201, maxRank: 10800 },
    ],
  },
]

export type CandidateCategory = 'General' | 'OBC' | 'EWS' | 'SC' | 'ST' | 'PwD'

export const categoryQualifyingRatios: Record<CandidateCategory, number> = {
  General: 1,
  OBC: 0.9,
  EWS: 0.9,
  SC: 2 / 3,
  ST: 2 / 3,
  PwD: 2 / 3,
}

export const gateEe2025Stats = {
  registered: 83355,
  appeared: 67701,
  qualified: 11902,
  qualifyingMarksGeneral: 25.0,
  qualifyingMarksObcEws: 22.5,
  qualifyingMarksScStPwd: 16.6,
  topMeanMarks: 81.67,
  source:
    'GATE 2025 Statistical Report (IIT Roorkee) — official score-to-rank distribution. Mt = mean of top 0.1% = 81.67 marks (derived from AIR-1 marks 81.67 → score 1000 and qualifying marks 25 → score 252). Score formula: Score = 252 + 748 × (M − 25) / (81.67 − 25) = 252 + 13.2 × (M − 25).',
}

export const rankMapping: RankEntry[] = GENERAL_RANKS.map((entry) => ({
  ...entry,
  category: 'General',
}))

const SCORE_PARAMS = {
  sq: 252,
  st: 1000,
  mq: 25,
  mt: 81.67,
} as const

export function computeScore(mark: number, params?: { mq: number; mt: number }): number {
  const { sq, st } = SCORE_PARAMS
  const mq = params?.mq ?? SCORE_PARAMS.mq
  const mt = params?.mt ?? SCORE_PARAMS.mt
  const m = Math.min(100, Math.max(0, mark))
  const score = sq + (st - sq) * (m - mq) / (mt - mq)
  return Math.round(Math.min(1000, Math.max(0, score)) * 100) / 100
}

export function getScoreParamsForYear(year: number): { mq: number; mt: number; sq: number; st: number } {
  const stats = yearStats.find(s => s.year === year)
  if (!stats) return { mq: SCORE_PARAMS.mq, mt: SCORE_PARAMS.mt, sq: SCORE_PARAMS.sq, st: SCORE_PARAMS.st }
  return { mq: stats.qualifyingMarksGeneral, mt: stats.topMeanMarks, sq: SCORE_PARAMS.sq, st: SCORE_PARAMS.st }
}

export function estimateMarksFromScore(score: number, params?: { mq: number; mt: number }): number {
  const { sq, st } = SCORE_PARAMS
  const mq = params?.mq ?? SCORE_PARAMS.mq
  const mt = params?.mt ?? SCORE_PARAMS.mt
  const s = Math.min(1000, Math.max(0, score))
  const marks = mq + (s - sq) * (mt - mq) / (st - sq)
  return Math.round(Math.min(100, Math.max(0, marks)) * 10) / 10
}

export function getRankFromScore(score: number, scoreToRank: { minScore: number; maxScore: number; minRank: number; maxRank: number }[]): { minRank: number; maxRank: number; expectedRank: number } {
  const clampedScore = Math.min(1000, Math.max(0, score))
  let bracket = scoreToRank[scoreToRank.length - 1]
  for (const entry of scoreToRank) {
    if (clampedScore >= entry.minScore && clampedScore <= entry.maxScore) {
      bracket = entry
      break
    }
  }
  const ratio = (clampedScore - bracket.minScore) / (Math.max(bracket.maxScore - bracket.minScore, 1))
  const expectedRank = bracket.maxRank - ratio * (bracket.maxRank - bracket.minRank)
  return {
    minRank: Math.max(1, bracket.minRank),
    maxRank: Math.max(1, bracket.maxRank),
    expectedRank: Math.max(1, Math.round(expectedRank)),
  }
}

export function getRankForMarksInYear(marks: number, year: number): { minRank: number; maxRank: number; expectedRank: number } | null {
  const stats = yearStats.find(s => s.year === year)
  if (!stats) return null
  const params = getScoreParamsForYear(year)
  const score = computeScore(marks, params)
  return getRankFromScore(score, stats.scoreToRank)
}

export function getHistoricalRankRange(marks: number): {
  years: { year: number; expectedRank: number; minRank: number; maxRank: number }[]
  bestRank: number
  worstRank: number
  medianRank: number
} {
  const ranks: { year: number; expectedRank: number; minRank: number; maxRank: number }[] = []

  for (const stats of yearStats) {
    const result = getRankForMarksInYear(marks, stats.year)
    if (result) {
      ranks.push({ year: stats.year, ...result })
    }
  }

  const sorted = [...ranks].sort((a, b) => a.expectedRank - b.expectedRank)
  return {
    years: ranks,
    bestRank: sorted.length > 0 ? sorted[0].expectedRank : 0,
    worstRank: sorted.length > 0 ? sorted[sorted.length - 1].expectedRank : 0,
    medianRank: sorted.length > 0 ? sorted[Math.floor(sorted.length / 2)].expectedRank : 0,
  }
}

export function getTrendAnalysis() {
  const recentYears = yearStats.slice(-3)
  const mqTrend = recentYears.map(s => ({ year: s.year, qualifyingMarks: s.qualifyingMarksGeneral }))
  const appearedTrend = recentYears.map(s => ({ year: s.year, count: s.appeared }))
  const qualifiedTrend = recentYears.map(s => ({ year: s.year, count: s.qualified }))

  const avgMq = mqTrend.reduce((sum, y) => sum + y.qualifyingMarks, 0) / mqTrend.length
  const mqDirection = mqTrend.length >= 2
    ? (mqTrend[mqTrend.length - 1].qualifyingMarks - mqTrend[0].qualifyingMarks) / (mqTrend.length - 1)
    : 0

  return {
    qualifyingMarksTrend: mqTrend,
    appearedTrend,
    qualifiedTrend,
    projectedQualifyingMarks2027: Math.round(Math.max(25, Math.min(35, avgMq + mqDirection)) * 10) / 10,
    summary: `Qualifying marks (Gen) trend: ${mqTrend.map(y => `${y.year}: ${y.qualifyingMarks}`).join(' → ')}. Projected 2027: ~${Math.round(Math.max(25, Math.min(35, avgMq + mqDirection)))}.`,
  }
}
