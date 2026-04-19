'use client'

import { useEffect } from 'react'
import { useKashyflo } from '@/lib/store'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'

export default function Transactions() {
  const { loadData, expenses, deleteExpense } = useKashyflo()

  useEffect(() => {
    loadData()
  }, [loadData])

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Rent: 'bg-red-100 text-red-800 border-red-300',
      Food: 'bg-orange-100 text-orange-800 border-orange-300',
      Savings: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      Buffer: 'bg-blue-100 text-blue-800 border-blue-300',
      Entertainment: 'bg-purple-100 text-purple-800 border-purple-300',
      Transport: 'bg-amber-100 text-amber-800 border-amber-300',
      Other: 'bg-slate-100 text-slate-800 border-slate-300',
    }
    return colors[category] || colors['Other']
  }

  const sortedExpenses = [...expenses].sort((a, b) => b.date - a.date)

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Transactions</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {expenses.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No transactions yet</p>
            <Link href="/add-expense">
              <Button className="mt-4">Add First Expense</Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-3">
            {sortedExpenses.map((expense) => (
              <Card key={expense.id} className="p-4 flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${getCategoryColor(expense.category)}`}>
                      {expense.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(expense.date), { addSuffix: true })}</span>
                  </div>
                  {expense.description && <p className="text-sm text-foreground font-medium">{expense.description}</p>}
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-lg text-foreground min-w-max">{formatCurrency(expense.amount)}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteExpense(expense.id!)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
