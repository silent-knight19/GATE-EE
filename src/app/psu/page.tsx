'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function PsuRedirect() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/jobs')
  }, [router])
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <p className="text-sm text-muted-foreground">Redirecting to Jobs page...</p>
    </div>
  )
}
