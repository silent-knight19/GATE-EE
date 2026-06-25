import type { Metadata } from "next"
import PageClient from "./page-client"

export const metadata: Metadata = {
  title: "Syllabus Tracker & Completion Status",
  description:
    "Detailed topic-by-topic syllabus breakdown for GATE EE 2027. Track your progress, review key topics, and plan your study milestones.",
  keywords: [
    "GATE EE syllabus",
    "syllabus tracker",
    "topic breakdown",
    "completion status",
    "GATE study plan",
  ],
  alternates: {
    canonical: "https://gateee-electrical.web.app/syllabus",
  },
  openGraph: {
    title: "Syllabus Tracker & Completion Status | GATE EE 2027 Tracker",
    description:
      "Detailed topic-by-topic syllabus breakdown for GATE EE 2027. Track your progress, review key topics, and plan your study milestones.",
  },
  twitter: {
    title: "Syllabus Tracker & Completion Status | GATE EE 2027 Tracker",
    description:
      "Detailed topic-by-topic syllabus breakdown for GATE EE 2027. Track your progress, review key topics, and plan your study milestones.",
  },
}

export default function Page() {
  return <PageClient />
}
