'use client'

import { useEffect } from 'react'
import { useKashyflo } from '@/lib/store'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Settings, TrendingUp, History, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'
import { Alerts } from './alerts'
import { WeeklySummary } from './weekly-summary'

export default function Dashboard() {
  const {
    loadData,
    totalSalary,
    categoryBudgets,
    categorySpent,
    categoryRemaining,
    allocations,
    daysUntilSalary,
  } = useKashyflo()

  useEffect(() => {
    loadData()
  }, [loadData])

  const getStatus = (remaining: number, budget: number) => {
    if (budget === 0) return 'neutral'
    const percentage = (remaining / budget) * 100
    if (percentage > 50) return 'green'
    if (percentage > 20) return 'yellow'
    return 'red'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'green':
        return 'bg-emerald-50 border-emerald-200'
      case 'yellow':
        return 'bg-amber-50 border-amber-200'
      case 'red':
        return 'bg-red-50 border-red-200'
      default:
        return 'bg-slate-50 border-slate-200'
    }
  }

  const getTextColor = (status: string) => {
    switch (status) {
      case 'green':
        return 'text-emerald-700'
      case 'yellow':
        return 'text-amber-700'
      case 'red':
        return 'text-red-700'
      default:
        return 'text-slate-700'
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/kashyflo-logo.png" alt="Kashyflo" className="w-8 h-8" />
            <h1 className="text-2xl font-bold text-foreground">Kashyflo</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/analytics">
              <Button variant="ghost" size="icon">
                <BarChart3 className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/transactions">
              <Button variant="ghost" size="icon">
                <History className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/settings">
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Alerts */}
        <div className="mb-6">
          <Alerts />
        </div>

        {/* Total Salary Card */}
        {totalSalary > 0 && (
          <>
            <Card className="mb-6 bg-gradient-to-br from-primary to-secondary text-white p-6">
              <p className="text-sm font-medium opacity-90 mb-2">Monthly Budget</p>
              <h2 className="text-4xl font-bold mb-4">{formatCurrency(totalSalary)}</h2>
              <div className="flex items-center justify-between text-sm">
                <span className="opacity-90">{daysUntilSalary} days until next salary</span>
                <TrendingUp className="w-4 h-4" />
              </div>
            </Card>

            {/* Weekly Summary */}
            <div className="mb-6">
              <WeeklySummary />
            </div>
          </>
        )}

        {/* Category Cards */}
        {totalSalary === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No salary added yet</p>
            <Link href="/settings">
              <Button>Add Your Salary</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {allocations.map((alloc) => {
              const budget = categoryBudgets[alloc.category] || 0
              const spent = categorySpent[alloc.category] || 0
              const remaining = categoryRemaining[alloc.category] || 0
              const status = getStatus(remaining, budget)
              const statusColor = getStatusColor(status)
              const textColor = getTextColor(status)

              return (
                <Card
                  key={alloc.category}
                  className={`p-4 border border-border cursor-pointer hover:shadow-md transition-shadow ${statusColor}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground">{alloc.category}</h3>
                      <p className="text-xs text-muted-foreground">{alloc.percentage}% of salary</p>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${textColor} bg-white/50`}>
                      {Math.round((spent / budget) * 100)}%
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Spent</span>
                      <span className="font-medium">{formatCurrency(spent)}</span>
                    </div>
                    <div className="w-full bg-white/50 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-accent to-secondary h-2 rounded-full"
                        style={{ width: `${Math.min((spent / budget) * 100, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm pt-1">
                      <span className="text-muted-foreground">Remaining</span>
                      <span className={`font-semibold ${textColor}`}>{formatCurrency(remaining)}</span>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}

        {/* FAB */}
        {totalSalary > 0 && (
          <Link href="/add-expense" className="fixed bottom-6 right-6 z-20">
            <Button size="lg" className="rounded-full w-14 h-14 shadow-lg">
              <Plus className="w-6 h-6" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
