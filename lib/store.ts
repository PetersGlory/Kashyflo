'use client'

import { create } from 'zustand'
import { db, Expense, SalaryEntry, BudgetAllocation } from './db'

export const DEFAULT_ALLOCATIONS: BudgetAllocation[] = [
  { category: 'Rent', percentage: 20 },
  { category: 'Food', percentage: 30 },
  { category: 'Savings', percentage: 15 },
  { category: 'Buffer', percentage: 10 },
  { category: 'Entertainment', percentage: 10 },
  { category: 'Transport', percentage: 10 },
  { category: 'Other', percentage: 5 },
]

interface KashyfloStore {
  // State
  currentMonth: number // month in milliseconds for current date
  expenses: Expense[]
  salaries: SalaryEntry[]
  allocations: BudgetAllocation[]

  // Computed
  totalSalary: number
  categoryBudgets: Record<string, number>
  categorySpent: Record<string, number>
  categoryRemaining: Record<string, number>
  daysUntilSalary: number

  // Actions
  addExpense: (category: string, amount: number, description: string) => Promise<void>
  addSalary: (amount: number, allocations?: BudgetAllocation[]) => Promise<void>
  updateAllocations: (allocations: BudgetAllocation[]) => void
  loadData: () => Promise<void>
  deleteExpense: (id: number) => Promise<void>
  getMonthlyData: () => void
}

const getMonthStart = (timestamp: number) => {
  const date = new Date(timestamp)
  return new Date(date.getFullYear(), date.getMonth(), 1).getTime()
}

export const useKashyflo = create<KashyfloStore>((set, get) => ({
  // Initial state
  currentMonth: getMonthStart(Date.now()),
  expenses: [],
  salaries: [],
  allocations: DEFAULT_ALLOCATIONS,

  // Computed values
  get totalSalary() {
    const store = get()
    return store.salaries.reduce((sum, s) => sum + s.amount, 0)
  },

  get categoryBudgets() {
    const store = get()
    const total = store.totalSalary
    const budgets: Record<string, number> = {}
    store.allocations.forEach((alloc) => {
      budgets[alloc.category] = (total * alloc.percentage) / 100
    })
    return budgets
  },

  get categorySpent() {
    const store = get()
    const spent: Record<string, number> = {}
    store.allocations.forEach((alloc) => {
      spent[alloc.category] = 0
    })
    store.expenses.forEach((exp) => {
      if (exp.category in spent) {
        spent[exp.category] += exp.amount
      }
    })
    return spent
  },

  get categoryRemaining() {
    const store = get()
    const budgets = store.categoryBudgets
    const spent = store.categorySpent
    const remaining: Record<string, number> = {}
    Object.keys(budgets).forEach((cat) => {
      remaining[cat] = Math.max(0, budgets[cat] - spent[cat])
    })
    return remaining
  },

  get daysUntilSalary() {
    const today = new Date()
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)
    const diff = nextMonth.getTime() - today.getTime()
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  },

  // Actions
  addExpense: async (category: string, amount: number, description: string) => {
    const expense: Expense = {
      category,
      amount,
      description,
      date: Date.now(),
      createdAt: Date.now(),
    }
    const id = await db.expenses.add(expense)
    get().loadData()
  },

  addSalary: async (amount: number, allocations?: BudgetAllocation[]) => {
    const salary: SalaryEntry = {
      amount,
      date: Date.now(),
      allocations: allocations || DEFAULT_ALLOCATIONS,
      createdAt: Date.now(),
    }
    await db.salaries.add(salary)
    if (allocations) {
      set({ allocations })
    }
    get().loadData()
  },

  updateAllocations: (allocations: BudgetAllocation[]) => {
    set({ allocations })
  },

  deleteExpense: async (id: number) => {
    await db.expenses.delete(id)
    get().loadData()
  },

  loadData: async () => {
    try {
      const expenses = await db.expenses.toArray()
      const salaries = await db.salaries.toArray()

      // Filter by current month
      const monthStart = getMonthStart(Date.now())
      const monthEnd = new Date(new Date(monthStart).getFullYear(), new Date(monthStart).getMonth() + 1, 0).getTime()

      const currentExpenses = expenses.filter((e) => e.date >= monthStart && e.date <= monthEnd)
      const currentSalaries = salaries.filter((s) => s.date >= monthStart && s.date <= monthEnd)

      set({
        expenses: currentExpenses,
        salaries: currentSalaries,
        currentMonth: monthStart,
      })
    } catch (error) {
      console.error('[v0] Error loading data:', error)
    }
  },

  getMonthlyData: () => {
    get().loadData()
  },
}))
