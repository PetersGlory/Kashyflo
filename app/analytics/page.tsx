'use client'

import { useEffect } from 'react'
import { useKashyflo } from '@/lib/store'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Analytics } from '@/components/analytics'
import { ArrowLeft } from 'lucide-react'

export default function AnalyticsPage() {
  const { loadData } = useKashyflo()

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background border-b border-border">
          <div className="px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-6">
          <Analytics />
        </div>
      </div>
    </main>
  )
}
