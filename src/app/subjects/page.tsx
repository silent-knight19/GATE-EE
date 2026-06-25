import type { Metadata } from "next"
import PageClient from "./page-client"

export const metadata: Metadata = {
  title: "Subjects & Topic Progress",
  description:
    "Explore subject-wise syllabus progress, average mark weights, and topic checklists for GATE 2027 Electrical Engineering.",
  keywords: [
    "GATE EE subjects",
    "topic progress tracker",
    "syllabus progress",
    "subject-wise marks",
  ],
  alternates: {
    canonical: "https://gateee-electrical.web.app/subjects",
  },
  openGraph: {
    title: "Subjects & Topic Progress | GATE EE 2027 Tracker",
    description:
      "Explore subject-wise syllabus progress, average mark weights, and topic checklists for GATE 2027 Electrical Engineering.",
  },
  twitter: {
    title: "Subjects & Topic Progress | GATE EE 2027 Tracker",
    description:
      "Explore subject-wise syllabus progress, average mark weights, and topic checklists for GATE 2027 Electrical Engineering.",
  },
}

export default function Page() {
  return <PageClient />
}
