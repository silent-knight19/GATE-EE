import type { Metadata } from "next"
import PageClient from "./page-client"

export const metadata: Metadata = {
  title: "Subject Weightage Analysis & Marks Distribution",
  description:
    "Detailed 5-year average weightage and marks distribution analysis across all GATE EE subjects (2022-2026). Plan your preparation strategically.",
  keywords: [
    "subject weightage",
    "marks distribution",
    "GATE EE analysis",
    "weightage 2025",
    "exam trend",
  ],
  alternates: {
    canonical: "https://gateee-electrical.web.app/weightage",
  },
  openGraph: {
    title: "Subject Weightage Analysis & Marks Distribution | GATE EE 2027 Tracker",
    description:
      "Detailed 5-year average weightage and marks distribution analysis across all GATE EE subjects (2022-2026). Plan your preparation strategically.",
  },
  twitter: {
    title: "Subject Weightage Analysis & Marks Distribution | GATE EE 2027 Tracker",
    description:
      "Detailed 5-year average weightage and marks distribution analysis across all GATE EE subjects (2022-2026). Plan your preparation strategically.",
  },
}

export default function Page() {
  return <PageClient />
}
