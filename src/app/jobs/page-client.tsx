'use client'

import { useState, useMemo } from 'react'
import { JobsCard } from '@/components/jobs/jobs-card'
import { JobsFilterBar, type SortKey } from '@/components/jobs/jobs-filter-bar'
import { jobsData, jobCategoryLabels } from '@/lib/data/jobData'
import type { JobCategory } from '@/lib/data/jobData'
import { Building2, Briefcase, TrendingUp, IndianRupeeIcon } from 'lucide-react'

export default function JobsPage() {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [salaryRange, setSalaryRange] = useState('all')
  const [sort, setSort] = useState<SortKey>('name')

  const filtered = useMemo(() => {
    let list = [...jobsData]

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(j =>
        j.name.toLowerCase().includes(q) ||
        j.fullName.toLowerCase().includes(q) ||
        j.jobType.toLowerCase().includes(q)
      )
    }

    if (categoryFilter !== 'all') {
      list = list.filter(j => j.category === categoryFilter)
    }

    if (statusFilter !== 'all') {
      list = list.filter(j => j.status === statusFilter)
    }

    if (salaryRange !== 'all') {
      list = list.filter(j => {
        const s = j.salaryMin
        switch (salaryRange) {
          case 'below10': return s < 10
          case '10-20': return s >= 10 && s < 20
          case '20-30': return s >= 20 && s <= 30
          case 'above30': return s > 30
          default: return true
        }
      })
    }

    list.sort((a, b) => {
      switch (sort) {
        case 'name': return a.name.localeCompare(b.name)
        case 'salary': return b.salaryMin - a.salaryMin
        case 'status': {
          const order = { active: 0, upcoming: 1, closed: 2 }
          return order[a.status] - order[b.status]
        }
        default: return 0
      }
    })

    return list
  }, [search, categoryFilter, statusFilter, salaryRange, sort])

  const stats = useMemo(() => {
    const total = jobsData.length
    const active = jobsData.filter(j => j.status === 'active').length
    const avgSalary = Math.round(jobsData.reduce((s, j) => s + j.salaryMin, 0) / total)
    return { total, active, avgSalary }
  }, [])

  return (
    <div className="mx-auto max-w-6xl space-y-5 p-4 md:p-6">
      <div>
        <h1 className="text-lg font-semibold text-foreground">Jobs & Recruitment Tracker</h1>
        <p className="text-xs text-muted-foreground">
          Track PSUs recruiting through GATE, government departments, and own-exam govt jobs for EE graduates
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="rounded-lg border bg-card p-3 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Building2 className="size-3.5" />
            Total Opportunities
          </div>
          <p className="text-xl font-bold font-mono">{stats.total}</p>
        </div>
        <div className="rounded-lg border bg-card p-3 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Briefcase className="size-3.5" />
            Active Now
          </div>
          <p className="text-xl font-bold font-mono text-green-600">{stats.active}</p>
        </div>
        <div className="rounded-lg border bg-card p-3 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <TrendingUp className="size-3.5" />
            Your Matches
          </div>
          <p className="text-xl font-bold font-mono text-blue-600">{filtered.length}</p>
        </div>
        <div className="rounded-lg border bg-card p-3 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <IndianRupeeIcon className="size-3.5" />
            Avg Salary
          </div>
          <p className="text-xl font-bold font-mono">₹{stats.avgSalary} LPA</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 text-[10px] text-muted-foreground font-mono">
        <span>cat: <strong>{categoryFilter}</strong></span>
        <span>status: <strong>{statusFilter}</strong></span>
        <span>salary: <strong>{salaryRange}</strong></span>
        <span>sort: <strong>{sort}</strong></span>
        <span>results: <strong>{filtered.length}</strong></span>
      </div>

      <JobsFilterBar
        search={search}
        onSearchChange={setSearch}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        salaryRange={salaryRange}
        onSalaryRangeChange={setSalaryRange}
        sort={sort}
        onSortChange={setSort}
      />

      {categoryFilter !== 'all' && (
        <div className="text-xs text-muted-foreground px-1">
          Showing <strong>{jobCategoryLabels[categoryFilter as JobCategory] || categoryFilter}</strong>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(job => (
          <JobsCard key={job.id} job={job} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-sm text-muted-foreground py-8">No jobs match your filters.</p>
      )}
    </div>
  )
}
