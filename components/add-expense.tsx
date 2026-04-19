'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useKashyflo } from '@/lib/store'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function AddExpense() {
  const router = useRouter()
  const { addExpense, allocations } = useKashyflo()
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!category || !amount || isNaN(Number(amount))) return

    setLoading(true)
    try {
      await addExpense(category, Number(amount), description)
      router.push('/')
    } catch (error) {
      console.error('[v0] Error adding expense:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Add Expense</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Selection */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Category</Label>
              <div className="grid grid-cols-2 gap-3">
                {allocations.map((alloc) => (
                  <button
                    key={alloc.category}
                    type="button"
                    onClick={() => setCategory(alloc.category)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      category === alloc.category
                        ? 'border-primary bg-primary/10 text-primary font-semibold'
                        : 'border-border bg-background hover:border-primary/50'
                    }`}
                  >
                    {alloc.category}
                  </button>
                ))}
              </div>
            </div>

            {/* Amount Input */}
            <div>
              <Label htmlFor="amount" className="text-sm font-medium">
                Amount (₦)
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-2 text-lg"
                step="100"
                min="0"
                autoFocus
              />
            </div>

            {/* Description Input */}
            <div>
              <Label htmlFor="description" className="text-sm font-medium">
                Description (Optional)
              </Label>
              <Input
                id="description"
                type="text"
                placeholder="e.g., Lunch, Transport"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-2"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!category || !amount || isNaN(Number(amount)) || loading}
              className="w-full h-12 text-lg font-semibold"
            >
              {loading ? 'Saving...' : 'Save Expense'}
            </Button>
          </form>
        </Card>

        {/* Quick Tips */}
        <Card className="mt-6 p-4 bg-secondary/10">
          <p className="text-sm text-muted-foreground">
            💡 <strong>Tip:</strong> Track expenses as you spend to keep your budget accurate.
          </p>
        </Card>
      </div>
    </div>
  )
}
