'use client'

import { useEffect, useState } from 'react'
import { useKashyflo } from '@/lib/store'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { calculateBudgetHealth, filterExpensesByMonth } from '@/lib/analytics'
import { formatCurrency } from '@/lib/utils'
import { AlertCircle, AlertTriangle, CheckCircle2 } from 'lucide-react'

interface AlertItem {
  id: string
  type: 'critical' | 'warning' | 'info'
  title: string
  message: string
  category?: string
}

export function Alerts() {
  const { expenses, salaries, daysUntilSalary } = useKashyflo()
  const [alerts, setAlerts] = useState<AlertItem[]>([])

  useEffect(() => {
    const newAlerts: AlertItem[] = []
    const currentMonth = filterExpensesByMonth(expenses)
    const latestSalary = salaries.length > 0 ? salaries[salaries.length - 1] : null

    if (!latestSalary) return

    const totalSpent = currentMonth.reduce((sum, exp) => sum + exp.amount, 0)
    const totalBudget = latestSalary.amount

    // Check budget health
    const health = calculateBudgetHealth(totalSpent, totalBudget, daysUntilSalary)

    if (health.status === 'critical') {
      newAlerts.push({
        id: 'budget-critical',
        type: 'critical',
        title: 'Critical Budget Alert',
        message: health.message,
      })
    } else if (health.status === 'warning') {
      newAlerts.push({
        id: 'budget-warning',
        type: 'warning',
        title: 'Budget Warning',
        message: health.message,
      })
    }

    // Check for overspent categories
    latestSalary.allocations.forEach((alloc) => {
      const categorySpent = currentMonth
        .filter((exp) => exp.category === alloc.category)
        .reduce((sum, exp) => sum + exp.amount, 0)
      const categoryBudget = (latestSalary.amount * alloc.percentage) / 100

      if (categorySpent > categoryBudget) {
        const overage = categorySpent - categoryBudget
        newAlerts.push({
          id: `category-${alloc.category}`,
          type: 'warning',
          title: `${alloc.category} Overspending`,
          message: `You've exceeded the ${alloc.category} budget by ${formatCurrency(overage)}`,
          category: alloc.category,
        })
      }
    })

    // Check low balance warning (less than 20% remaining)
    const remaining = totalBudget - totalSpent
    const remainingPercentage = (remaining / totalBudget) * 100
    if (remainingPercentage < 20 && remainingPercentage > 0) {
      newAlerts.push({
        id: 'low-balance',
        type: 'warning',
        title: 'Low Balance Alert',
        message: `You have only ${formatCurrency(remaining)} (${remainingPercentage.toFixed(1)}%) of your budget remaining`,
      })
    }

    // Positive alert for being on track
    if (health.status === 'excellent') {
      newAlerts.push({
        id: 'on-track',
        type: 'info',
        title: 'Great Job!',
        message: 'You are spending wisely and staying within budget.',
      })
    }

    setAlerts(newAlerts)
  }, [expenses, salaries, daysUntilSalary])

  if (alerts.length === 0) return null

  const getIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertCircle className="w-4 h-4" />
      case 'warning':
        return <AlertTriangle className="w-4 h-4" />
      case 'info':
        return <CheckCircle2 className="w-4 h-4" />
      default:
        return null
    }
  }

  const getVariant = (type: string) => {
    switch (type) {
      case 'critical':
        return 'destructive'
      case 'warning':
        return 'default'
      case 'info':
        return 'default'
      default:
        return 'default'
    }
  }

  return (
    <div className="space-y-3">
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          variant={getVariant(alert.type)}
          className={
            alert.type === 'info'
              ? 'border-green-200 bg-green-50'
              : alert.type === 'warning'
                ? 'border-yellow-200 bg-yellow-50'
                : 'border-red-200 bg-red-50'
          }
        >
          {getIcon(alert.type)}
          <AlertDescription className="ml-2">
            <p className="font-semibold text-sm">{alert.title}</p>
            <p className="text-sm mt-1">{alert.message}</p>
          </AlertDescription>
        </Alert>
      ))}
    </div>
  )
}
