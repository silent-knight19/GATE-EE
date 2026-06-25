import type { Metadata } from "next"
import PageClient from "./page-client"

export const metadata: Metadata = {
  title: "Jobs & Recruitment Tracker — GATE EE 2027",
  description:
    "Track PSU recruitments, government departments, and govt job exams for Electrical Engineering graduates. View salary ranges, cutoffs, eligibility, and exam patterns.",
  keywords: [
    "PSU recruitment",
    "GATE jobs",
    "government jobs for electrical engineers",
    "SSC JE",
    "RRB JE",
    "ESE IES",
    "DRDO recruitment",
    "PSU cutoffs",
  ],
  alternates: {
    canonical: "https://gateee-electrical.web.app/jobs",
  },
  openGraph: {
    title: "Jobs & Recruitment Tracker | GATE EE 2027 Tracker",
    description:
      "Track PSU recruitments, government departments, and govt job exams for Electrical Engineering graduates.",
  },
  twitter: {
    title: "Jobs & Recruitment Tracker | GATE EE 2027 Tracker",
    description:
      "Track PSU recruitments, government departments, and govt job exams for Electrical Engineering graduates.",
  },
}

export default function Page() {
  return <PageClient />
}
