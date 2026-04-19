import { Expense, SalaryEntry } from './db'

export interface SpendingTrend {
  date: string
  amount: number
}

export interface CategorySpending {
  category: string
  amount: number
  percentage: number
  color: string
}

export interface BudgetHealth {
  score: number // 0-100
  status: 'excellent' | 'good' | 'warning' | 'critical'
  message: string
}

export interface AnalyticsData {
  totalSpent: number
  totalBudgeted: number
  spentPercentage: number
  trends: SpendingTrend[]
  categoryBreakdown: CategorySpending[]
  budgetHealth: BudgetHealth
  daysUntilSalary: number
}

export function getDaysUntilSalary(): number {
  const today = new Date()
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)
  const daysLeft = Math.ceil(
    (nextMonth.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  )
  return daysLeft
}

export function calculateSpendingTrends(
  expenses: Expense[],
  days: number = 7
): SpendingTrend[] {
  const now = Date.now()
  const msPerDay = 1000 * 60 * 60 * 24
  const trends: Record<string, number> = {}

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now - i * msPerDay)
    const dateStr = date.toLocaleDateString('en-NG', {
      month: 'short',
      day: 'numeric',
    })
    trends[dateStr] = 0
  }

  expenses.forEach((exp) => {
    const expDate = new Date(exp.date)
    const dateStr = expDate.toLocaleDateString('en-NG', {
      month: 'short',
      day: 'numeric',
    })
    if (dateStr in trends) {
      trends[dateStr] += exp.amount
    }
  })

  return Object.entries(trends).map(([date, amount]) => ({
    date,
    amount,
  }))
}

export function calculateCategoryBreakdown(
  expenses: Expense[],
  categoryColors: Record<string, string>
): CategorySpending[] {
  const categoryTotals: Record<string, number> = {}
  let total = 0

  expenses.forEach((exp) => {
    categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount
    total += exp.amount
  })

  return Object.entries(categoryTotals)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: total > 0 ? (amount / total) * 100 : 0,
      color: categoryColors[category] || '#6b7280',
    }))
    .sort((a, b) => b.amount - a.amount)
}

export function calculateBudgetHealth(
  spent: number,
  budgeted: number,
  daysUntilSalary: number
): BudgetHealth {
  const spentPercentage = budgeted > 0 ? (spent / budgeted) * 100 : 0
  const daysElapsed = 30 - daysUntilSalary
  const expectedSpent = (daysElapsed / 30) * budgeted

  let score = 100
  let status: 'excellent' | 'good' | 'warning' | 'critical' = 'excellent'
  let message = 'You are on track!'

  if (spent > expectedSpent) {
    const overspend = ((spent - expectedSpent) / expectedSpent) * 100
    score = Math.max(0, 100 - overspend)

    if (overspend > 30) {
      status = 'critical'
      message = 'Critical: You are significantly overspending. Slow down!'
    } else if (overspend > 15) {
      status = 'warning'
      message = 'Warning: You are overspending slightly. Be careful.'
    } else {
      status = 'good'
      message = 'You are slightly ahead of pace, but doing okay.'
    }
  } else if (spentPercentage > 80) {
    status = 'warning'
    message = `${spentPercentage.toFixed(0)}% of budget spent. Budget carefully.`
  } else if (spentPercentage > 100) {
    status = 'critical'
    message = 'Budget exceeded! Stop spending immediately.'
  }

  return { score, status, message }
}

export function getMonthStart(date: Date = new Date()): number {
  const month = new Date(date.getFullYear(), date.getMonth(), 1)
  return month.getTime()
}

export function getMonthEnd(date: Date = new Date()): number {
  const month = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  month.setHours(23, 59, 59, 999)
  return month.getTime()
}

export function filterExpensesByMonth(expenses: Expense[]): Expense[] {
  const monthStart = getMonthStart()
  const monthEnd = getMonthEnd()
  return expenses.filter((exp) => exp.date >= monthStart && exp.date <= monthEnd)
}
