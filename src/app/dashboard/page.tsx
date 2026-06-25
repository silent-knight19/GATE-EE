import type { Metadata } from "next"
import CountdownCard from "@/components/dashboard/countdown-card"
import SyllabusOverview from "@/components/dashboard/syllabus-overview"
import ExamOverview from "@/components/dashboard/exam-overview"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Track your GATE 2027 Electrical Engineering preparation. Features live syllabus overview, subject weightage, recommended study hours, and exam countdown.",
  keywords: ["GATE 2027", "GATE EE 2027", "GATE preparation dashboard", "GATE study planner", "IIT Madras GATE"],
  alternates: {
    canonical: "https://gateee-electrical.web.app/dashboard",
  },
  openGraph: {
    title: "Dashboard | GATE EE 2027 Tracker",
    description: "Track your GATE 2027 Electrical Engineering preparation with live syllabus overview, subject weightage, and exam countdown.",
  },
  twitter: {
    title: "Dashboard | GATE EE 2027 Tracker",
    description: "Track your GATE 2027 Electrical Engineering preparation with live syllabus overview, subject weightage, and exam countdown.",
  },
}

export default function DashboardPage() {
  return (
    <div className="space-y-8 p-6">
      <div className="animate-fade-in-up" style={{ animationDelay: "0ms" }}>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Your GATE EE 2027 preparation at a glance</p>
      </div>

      <div className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
        <CountdownCard />
      </div>

      <div className="animate-fade-in-up" style={{ animationDelay: "150ms" }}>
        <ExamOverview />
      </div>

      <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
        <SyllabusOverview />
      </div>
    </div>
  )
}
