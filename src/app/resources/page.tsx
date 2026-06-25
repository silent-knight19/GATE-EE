import type { Metadata } from "next"
import PageClient from "./page-client"

export const metadata: Metadata = {
  title: "Resources | GATE EE",
  description:
    "Curated study resources for GATE EE including YouTube playlists, NPTEL lectures, textbooks, PYQs, mock tests, and more.",
  keywords: [
    "GATE EE resources",
    "GATE study material",
    "subject-wise resources",
    "GATE PYQs",
    "NPTEL lectures",
  ],
  alternates: {
    canonical: "https://gateee-electrical.web.app/resources",
  },
  openGraph: {
    title: "Resources | GATE EE 2027 Tracker",
    description:
      "Curated study resources for GATE EE including YouTube playlists, NPTEL lectures, textbooks, PYQs, mock tests, and more.",
  },
  twitter: {
    title: "Resources | GATE EE 2027 Tracker",
    description:
      "Curated study resources for GATE EE including YouTube playlists, NPTEL lectures, textbooks, PYQs, mock tests, and more.",
  },
}

export default function Page() {
  return <PageClient />
}
