'use client'

import { useEffect, useState } from 'react'
import { useKashyflo } from '@/lib/store'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import {
  calculateSpendingTrends,
  calculateCategoryBreakdown,
  calculateBudgetHealth,
  filterExpensesByMonth,
  AnalyticsData,
} from '@/lib/analytics'
import { formatCurrency } from '@/lib/utils'
import { TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'

export function Analytics() {
  const { expenses, salaries, categories, daysUntilSalary } = useKashyflo()
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)

  useEffect(() => {
    const currentMonth = filterExpensesByMonth(expenses)
    const latestSalary = salaries.length > 0 ? salaries[salaries.length - 1] : null
    const currentAllocation = latestSalary?.allocations || []

    // Calculate totals
    const totalSpent = currentMonth.reduce((sum, exp) => sum + exp.amount, 0)
    const totalBudgeted = latestSalary
      ? latestSalary.amount
      : currentAllocation.reduce((sum, alloc) => sum + alloc.percentage, 0) * 100000

    // Create color map from categories
    const colorMap: Record<string, string> = {}
    categories.forEach((cat) => {
      colorMap[cat.name] = cat.color
    })

    // Calculate analytics
    const trends = calculateSpendingTrends(currentMonth, 7)
    const categoryBreakdown = calculateCategoryBreakdown(currentMonth, colorMap)
    const budgetHealth = calculateBudgetHealth(
      totalSpent,
      totalBudgeted,
      daysUntilSalary
    )

    setAnalytics({
      totalSpent,
      totalBudgeted,
      spentPercentage: totalBudgeted > 0 ? (totalSpent / totalBudgeted) * 100 : 0,
      trends,
      categoryBreakdown,
      budgetHealth,
      daysUntilSalary,
    })
  }, [expenses, salaries, categories, daysUntilSalary])

  if (!analytics) {
    return <div className="text-center py-8 text-muted-foreground">Loading analytics...</div>
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-500/10 text-green-700 border-green-200'
      case 'good':
        return 'bg-blue-500/10 text-blue-700 border-blue-200'
      case 'warning':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-200'
      case 'critical':
        return 'bg-red-500/10 text-red-700 border-red-200'
      default:
        return ''
    }
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Budget Health Score */}
      <Card className="p-6 border-l-4 border-l-primary">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Budget Health</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-foreground">
                {analytics.budgetHealth.score.toFixed(0)}
              </span>
              <span className="text-muted-foreground">/100</span>
            </div>
            <p className="text-sm mt-3 text-foreground">{analytics.budgetHealth.message}</p>
          </div>
          <div className={`rounded-full p-3 ${getStatusColor(analytics.budgetHealth.status)}`}>
            {analytics.budgetHealth.status === 'excellent' || analytics.budgetHealth.status === 'good' ? (
              <CheckCircle className="w-6 h-6" />
            ) : (
              <AlertCircle className="w-6 h-6" />
            )}
          </div>
        </div>
      </Card>

      {/* Spending Overview */}
      <Card className="p-6">
        <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Spending Overview
        </h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Total Spent</p>
            <p className="text-2xl font-bold text-foreground">
              {formatCurrency(analytics.totalSpent)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Total Budget</p>
            <p className="text-2xl font-bold text-foreground">
              {formatCurrency(analytics.totalBudgeted)}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Budget Usage</span>
            <span className="font-semibold text-foreground">
              {analytics.spentPercentage.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-border rounded-full h-3 overflow-hidden">
            <div
              className={`h-full transition-all ${
                analytics.spentPercentage > 100
                  ? 'bg-red-500'
                  : analytics.spentPercentage > 80
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(analytics.spentPercentage, 100)}%` }}
            />
          </div>
        </div>
      </Card>

      {/* Spending Trends Chart */}
      {analytics.trends.length > 0 && (
        <Card className="p-6">
          <h3 className="text-sm font-semibold mb-4">7-Day Spending Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={analytics.trends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#6b7280" />
              <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
              <Tooltip
                formatter={(value) => formatCurrency(value as number)}
                contentStyle={{
                  backgroundColor: 'var(--background)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#1e40af"
                strokeWidth={2}
                dot={{ fill: '#1e40af', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      )}

      {/* Category Breakdown */}
      {analytics.categoryBreakdown.length > 0 && (
        <Card className="p-6">
          <h3 className="text-sm font-semibold mb-4">Spending by Category</h3>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Pie Chart */}
            <div className="flex-1 flex justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={analytics.categoryBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="amount"
                  >
                    {analytics.categoryBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => formatCurrency(value as number)}
                    contentStyle={{
                      backgroundColor: 'var(--background)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Category List */}
            <div className="flex-1 space-y-3">
              {analytics.categoryBreakdown.map((cat) => (
                <div key={cat.category} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="text-sm font-medium text-foreground">{cat.category}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">
                      {formatCurrency(cat.amount)}
                    </p>
                    <p className="text-xs text-muted-foreground">{cat.percentage.toFixed(1)}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
