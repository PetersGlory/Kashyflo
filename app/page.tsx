'use client'

import { useEffect, useState } from 'react'
import { useKashyflo } from '@/lib/store'
import Dashboard from '@/components/dashboard'
import Landing from '@/components/landing'

export default function Home() {
  const { salaries, loadData } = useKashyflo()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadData().then(() => setIsLoading(false))
  }, [loadData])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center">
            <img src="/kashyflo-logo.png" alt="Kashyflo" className="w-12 h-12 animate-pulse" />
          </div>
          <p className="text-muted-foreground">Loading Kashyflo...</p>
        </div>
      </div>
    )
  }

  // Show landing page if no salary set, otherwise show dashboard
  const hasSalary = salaries.length > 0

  return hasSalary ? <Dashboard /> : <Landing />
}
