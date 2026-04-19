'use client'

import { useState, useEffect } from 'react'
import { useKashyflo, DEFAULT_ALLOCATIONS } from '@/lib/store'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { BudgetAllocation } from '@/lib/db'

export default function Settings() {
  const { addSalary, allocations, updateAllocations } = useKashyflo()
  const [salary, setSalary] = useState('')
  const [customAllocations, setCustomAllocations] = useState<BudgetAllocation[]>(allocations)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setCustomAllocations(allocations)
  }, [allocations])

  const handleSalarySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!salary || isNaN(Number(salary))) return

    setLoading(true)
    try {
      // Normalize allocations to ensure they sum to 100
      const total = customAllocations.reduce((sum, a) => sum + a.percentage, 0)
      const normalized = customAllocations.map((a) => ({
        ...a,
        percentage: (a.percentage / total) * 100,
      }))

      await addSalary(Number(salary), normalized)
      setSalary('')
    } catch (error) {
      console.error('[v0] Error adding salary:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAllocationChange = (index: number, percentage: number) => {
    const updated = [...customAllocations]
    updated[index].percentage = Math.max(0, percentage)
    setCustomAllocations(updated)
  }

  const totalPercentage = customAllocations.reduce((sum, a) => sum + a.percentage, 0)

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
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Salary Input */}
        <Card className="mb-6 p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Add Salary</h2>
          <form onSubmit={handleSalarySubmit} className="space-y-4">
            <div>
              <Label htmlFor="salary" className="text-sm font-medium">
                Monthly Salary (₦)
              </Label>
              <Input
                id="salary"
                type="number"
                placeholder="e.g., 500000"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="mt-2"
                step="1000"
                min="0"
              />
            </div>
            <Button type="submit" disabled={salary == "" || loading} className="w-full">
              {loading ? 'Adding...' : 'Add Salary'}
            </Button>
          </form>
        </Card>

        {/* Budget Allocation */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Budget Allocation</h2>
          <p className="text-sm text-muted-foreground mb-4">Adjust how your salary is split across categories.</p>

          <div className="space-y-4 mb-6">
            {customAllocations.map((alloc, index) => (
              <div key={alloc.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">{alloc.category}</label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={alloc.percentage}
                      onChange={(e) => handleAllocationChange(index, Number(e.target.value))}
                      className="w-20 text-right"
                      min="0"
                      max="100"
                      step="1"
                    />
                    <span className="text-sm text-muted-foreground w-6">%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`p-4 rounded-lg border-2 ${totalPercentage === 100 ? 'bg-emerald-50 border-emerald-300' : 'bg-amber-50 border-amber-300'}`}>
            <div className="flex items-center justify-between">
              <span className="font-medium">Total Allocation</span>
              <span className={`font-bold text-lg ${totalPercentage === 100 ? 'text-emerald-700' : 'text-amber-700'}`}>
                {totalPercentage.toFixed(1)}%
              </span>
            </div>
          </div>

          <Button
            onClick={() => updateAllocations(customAllocations)}
            disabled={totalPercentage !== 100}
            className="w-full mt-6"
          >
            Save Allocations
          </Button>
        </Card>

        {/* Reset Button */}
        <div className="mt-6">
          <Button
            variant="outline"
            onClick={() => setCustomAllocations(DEFAULT_ALLOCATIONS)}
            className="w-full"
          >
            Reset to Default
          </Button>
        </div>
      </div>
    </div>
  )
}
