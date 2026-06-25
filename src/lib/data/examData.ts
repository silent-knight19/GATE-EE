export interface ExamInfo {
  conductingInstitute: string
  examDates: string[]
  notificationDate: string
  registrationWindow: string
  admitCardDate: string
  resultDate: string
  duration: string
  totalMarks: number
  questionTypes: string[]
  markingScheme: { mcq1Mark: number; mcq2Mark: number }
  scoreValidity: string
}

export const examInfo: ExamInfo = {
  conductingInstitute: 'IIT Roorkee for GATE 2027',
  examDates: [
    'GATE 2027 was held on February 7, 8, 14, and 15, 2027',
  ],
  notificationDate: 'To be announced',
  registrationWindow: 'To be announced',
  admitCardDate: 'To be announced',
  resultDate: 'To be announced',
  duration: '3 hours',
  totalMarks: 100,
  questionTypes: [
    'MCQ (negative marking)',
    'MSQ (no negative marking)',
    'NAT (no negative marking)',
  ],
  markingScheme: { mcq1Mark: -1 / 3, mcq2Mark: -2 / 3 },
  scoreValidity: '3 years',
}

export interface SubjectWeightage {
  subjectId: string
  subjectName: string
  yearMarks: { year: number; marks: number }[]
  avgMarks: number
  trend: 'up' | 'down' | 'stable'
  volatility: 'low' | 'medium' | 'high'
}

export const subjectWeightages: SubjectWeightage[] = [
  {
    subjectId: 'ga',
    subjectName: 'General Aptitude',
    yearMarks: [
      { year: 2022, marks: 15 },
      { year: 2023, marks: 15 },
      { year: 2024, marks: 15 },
      { year: 2025, marks: 15 },
      { year: 2026, marks: 15 },
    ],
    avgMarks: 15,
    trend: 'stable',
    volatility: 'low',
  },
  {
    subjectId: 'em',
    subjectName: 'Engineering Mathematics',
    yearMarks: [
      { year: 2022, marks: 8 },
      { year: 2023, marks: 10 },
      { year: 2024, marks: 10 },
      { year: 2025, marks: 8 },
      { year: 2026, marks: 9 },
    ],
    avgMarks: 9,
    trend: 'stable',
    volatility: 'medium',
  },
  {
    subjectId: 'ec',
    subjectName: 'Electric Circuits',
    yearMarks: [
      { year: 2022, marks: 8 },
      { year: 2023, marks: 7 },
      { year: 2024, marks: 7 },
      { year: 2025, marks: 8 },
      { year: 2026, marks: 7 },
    ],
    avgMarks: 7.4,
    trend: 'stable',
    volatility: 'low',
  },
  {
    subjectId: 'emft',
    subjectName: 'Electromagnetic Fields',
    yearMarks: [
      { year: 2022, marks: 4 },
      { year: 2023, marks: 4 },
      { year: 2024, marks: 3 },
      { year: 2025, marks: 5 },
      { year: 2026, marks: 4 },
    ],
    avgMarks: 4,
    trend: 'stable',
    volatility: 'medium',
  },
  {
    subjectId: 'ss',
    subjectName: 'Signals and Systems',
    yearMarks: [
      { year: 2022, marks: 8 },
      { year: 2023, marks: 9 },
      { year: 2024, marks: 8 },
      { year: 2025, marks: 9 },
      { year: 2026, marks: 8 },
    ],
    avgMarks: 8.4,
    trend: 'stable',
    volatility: 'low',
  },
  {
    subjectId: 'emach',
    subjectName: 'Electrical Machines',
    yearMarks: [
      { year: 2022, marks: 10 },
      { year: 2023, marks: 9 },
      { year: 2024, marks: 10 },
      { year: 2025, marks: 9 },
      { year: 2026, marks: 10 },
    ],
    avgMarks: 9.6,
    trend: 'stable',
    volatility: 'medium',
  },
  {
    subjectId: 'ps',
    subjectName: 'Power Systems',
    yearMarks: [
      { year: 2022, marks: 11 },
      { year: 2023, marks: 10 },
      { year: 2024, marks: 9 },
      { year: 2025, marks: 10 },
      { year: 2026, marks: 11 },
    ],
    avgMarks: 10.2,
    trend: 'stable',
    volatility: 'medium',
  },
  {
    subjectId: 'csys',
    subjectName: 'Control Systems',
    yearMarks: [
      { year: 2022, marks: 9 },
      { year: 2023, marks: 9 },
      { year: 2024, marks: 10 },
      { year: 2025, marks: 9 },
      { year: 2026, marks: 10 },
    ],
    avgMarks: 9.4,
    trend: 'up',
    volatility: 'low',
  },
  {
    subjectId: 'eem',
    subjectName: 'Electrical and Electronic Measurements',
    yearMarks: [
      { year: 2022, marks: 5 },
      { year: 2023, marks: 5 },
      { year: 2024, marks: 4 },
      { year: 2025, marks: 5 },
      { year: 2026, marks: 4 },
    ],
    avgMarks: 4.6,
    trend: 'stable',
    volatility: 'medium',
  },
  {
    subjectId: 'ade',
    subjectName: 'Analog and Digital Electronics',
    yearMarks: [
      { year: 2022, marks: 12 },
      { year: 2023, marks: 12 },
      { year: 2024, marks: 13 },
      { year: 2025, marks: 15 },
      { year: 2026, marks: 14 },
    ],
    avgMarks: 13.2,
    trend: 'up',
    volatility: 'medium',
  },
  {
    subjectId: 'pe',
    subjectName: 'Power Electronics',
    yearMarks: [
      { year: 2022, marks: 10 },
      { year: 2023, marks: 10 },
      { year: 2024, marks: 11 },
      { year: 2025, marks: 9 },
      { year: 2026, marks: 10 },
    ],
    avgMarks: 10,
    trend: 'stable',
    volatility: 'medium',
  },
]
