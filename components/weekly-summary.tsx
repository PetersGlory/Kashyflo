'use client'

import { useEffect, useState } from 'react'
import { useKashyflo } from '@/lib/store'
import { Card } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'
import { filterExpensesByMonth } from '@/lib/analytics'
import { TrendingDown } from 'lucide-react'

export function WeeklySummary() {
  const { expenses, salaries } = useKashyflo()
  const [weeklyStats, setWeeklyStats] = useState<{
    thisWeek: number
    lastWeek: number
    change: number
    changePercent: number
  } | null>(null)

  useEffect(() => {
    const now = Date.now()
    const oneWeekMs = 7 * 24 * 60 * 60 * 1000
    const twoWeeksMs = 14 * 24 * 60 * 60 * 1000

    const currentMonth = filterExpensesByMonth(expenses)

    const thisWeekExpenses = currentMonth.filter(
      (exp) => exp.date >= now - oneWeekMs && exp.date <= now
    )
    const lastWeekExpenses = currentMonth.filter(
      (exp) => exp.date >= now - twoWeeksMs && exp.date < now - oneWeekMs
    )

    const thisWeekTotal = thisWeekExpenses.reduce((sum, exp) => sum + exp.amount, 0)
    const lastWeekTotal = lastWeekExpenses.reduce((sum, exp) => sum + exp.amount, 0)
    const change = thisWeekTotal - lastWeekTotal
    const changePercent = lastWeekTotal > 0 ? (change / lastWeekTotal) * 100 : 0

    setWeeklyStats({
      thisWeek: thisWeekTotal,
      lastWeek: lastWeekTotal,
      change,
      changePercent,
    })
  }, [expenses])

  if (!weeklyStats) return null

  const isImproving = weeklyStats.change < 0
  const changeColor = isImproving ? 'text-green-600' : 'text-red-600'
  const changeBgColor = isImproving ? 'bg-green-50' : 'bg-red-50'

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">This Week's Spending</h3>
          <p className="text-3xl font-bold text-foreground mb-2">
            {formatCurrency(weeklyStats.thisWeek)}
          </p>
          <p className="text-xs text-muted-foreground">
            Last week: {formatCurrency(weeklyStats.lastWeek)}
          </p>
        </div>
        <div className={`rounded-lg p-3 ${changeBgColor}`}>
          <div className={`text-sm font-semibold ${changeColor}`}>
            {weeklyStats.change === 0 ? (
              'No change'
            ) : (
              <>
                {isImproving ? '↓' : '↑'} {Math.abs(weeklyStats.changePercent).toFixed(1)}%
              </>
            )}
          </div>
          {isImproving && (
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingDown className="w-3 h-3" />
              Good trend!
            </p>
          )}
        </div>
      </div>
    </Card>
  )
}
