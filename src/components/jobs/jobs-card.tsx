'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Building2, Globe, Calendar, Users, IndianRupeeIcon, X, GraduationCap, Swords } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Job, JobCategory } from '@/lib/data/jobData'
import { jobCategoryLabels } from '@/lib/data/jobData'

interface JobsCardProps {
  job: Job
}

const categoryColors: Record<JobCategory, string> = {
  'gate-psu': 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  'gate-govt': 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  'exam-govt': 'bg-amber-500/10 text-amber-600 border-amber-500/20',
}

const statusColors: Record<string, string> = {
  active: 'bg-green-500/10 text-green-600 border-green-500/20',
  upcoming: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  closed: 'bg-muted text-muted-foreground border-border',
}

function formatSalary(salaryRange: string): string {
  return salaryRange
}

export const JobsCard = React.memo(function JobsCard({ job }: JobsCardProps) {
  const [open, setOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open) {
      dialog.showModal()
    } else {
      dialog.close()
    }
  }, [open])

  return (
    <>
      <Card
        className="cursor-pointer hover:ring-2 hover:ring-ring/50 transition-all"
        onClick={() => setOpen(true)}
      >
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                {job.category === 'exam-govt' ? (
                  <Swords className="size-4 shrink-0 text-muted-foreground" />
                ) : (
                  <Building2 className="size-4 shrink-0 text-muted-foreground" />
                )}
                <CardTitle className="truncate text-sm">{job.name}</CardTitle>
              </div>
              <CardDescription className="mt-0.5 line-clamp-1 text-xs">{job.fullName}</CardDescription>
            </div>
            <Badge variant="outline" className={`shrink-0 text-[10px] px-2 ${categoryColors[job.category]}`}>
              {job.category === 'gate-psu' ? 'PSU' : job.category === 'gate-govt' ? 'Govt' : 'Exam'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-1.5 pt-0">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <IndianRupeeIcon className="size-3" />
            <span className="font-medium text-foreground">{job.salaryRange}</span>
            <span className="mx-1">·</span>
            <GraduationCap className="size-3" />
            <span>{job.jobType}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="size-3" />
            <span>{job.applicationPeriod}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Users className="size-3" />
            <span>{job.vacancies}</span>
          </div>
        </CardContent>
      </Card>

      <dialog
        ref={dialogRef}
        className="z-50 rounded-xl border border-border bg-card p-0 shadow-xl w-[calc(100%-2rem)] sm:max-w-lg max-h-[85vh]"
        onClick={(e) => {
          if (e.target === dialogRef.current) setOpen(false)
        }}
        onClose={() => setOpen(false)}
      >
        <div className="max-h-[85vh] overflow-y-auto p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              {job.category === 'exam-govt' ? (
                <Swords className="size-5 text-muted-foreground" />
              ) : (
                <Building2 className="size-5 text-muted-foreground" />
              )}
              <div>
                <h2 className="text-lg font-semibold text-foreground">{job.name}</h2>
                <p className="text-sm text-muted-foreground">{job.fullName}</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Category</span>
                <Badge variant="outline" className={categoryColors[job.category]}>
                  {jobCategoryLabels[job.category]}
                </Badge>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Type</span>
                <p className="font-medium text-foreground text-xs">{job.jobType}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Salary</span>
                <p className="font-medium text-foreground">{job.salaryRange}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Status</span>
                <Badge variant="outline" className={statusColors[job.status]}>
                  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                </Badge>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Sector</span>
                <p className="font-medium text-foreground text-xs">{job.sector}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Vacancies</span>
                <p className="font-medium text-foreground">{job.vacancies}</p>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Eligibility</span>
              <p className="text-sm text-foreground">{job.eligibility}</p>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">
                {job.category === 'exam-govt' ? 'Application / Exam Period' : 'Recruitment Period'}
              </span>
              <p className="text-sm text-foreground">{job.applicationPeriod}</p>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Selection Process</span>
              <p className="text-sm text-foreground">{job.selectionProcess}</p>
            </div>

            {job.examPattern && (
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Exam Pattern</span>
                <p className="text-sm text-foreground">{job.examPattern}</p>
              </div>
            )}

            {job.syllabusSimilarity && (
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Syllabus Overlap with GATE EE</span>
                <p className="text-sm text-foreground">{job.syllabusSimilarity}</p>
              </div>
            )}

            {job.expectedCutoffs && job.expectedCutoffs.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Expected Cutoffs</span>
                  {job.cutoffReference && (
                    <span className="text-[10px] text-muted-foreground/60 font-mono">(based on {job.cutoffReference})</span>
                  )}
                </div>
                <div className="rounded-lg border border-border overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="px-3 py-1.5 text-left text-xs font-medium text-muted-foreground">Category</th>
                        <th className="px-3 py-1.5 text-left text-xs font-medium text-muted-foreground">Expected Cutoff</th>
                      </tr>
                    </thead>
                    <tbody>
                      {job.expectedCutoffs.map((c, i) => (
                        <tr key={i} className={i < job.expectedCutoffs!.length - 1 ? 'border-b border-border' : ''}>
                          <td className="px-3 py-1.5 text-foreground">{c.category}</td>
                          <td className="px-3 py-1.5 font-mono text-foreground">{c.score}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {job.notes && (
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Notes</span>
                <p className="text-sm text-muted-foreground">{job.notes}</p>
              </div>
            )}

            <a
              href={job.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
            >
              <Globe className="size-4" />
              Visit official website
            </a>
          </div>
        </div>
      </dialog>
    </>
  )
})
