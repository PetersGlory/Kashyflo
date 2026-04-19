'use client'

import { useKashyflo } from '@/lib/store'
import { Button } from '@/components/ui/button'
import * as Icons from 'lucide-react'

interface CategorySelectorProps {
  selected?: string
  onSelect: (category: string) => void
}

export function CategorySelector({ selected, onSelect }: CategorySelectorProps) {
  const { categories } = useKashyflo()

  const getIcon = (iconName: string) => {
    const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
      Home: Icons.Home,
      Utensils: Icons.Utensils,
      PiggyBank: Icons.PiggyBank,
      Shield: Icons.Shield,
      Gamepad2: Icons.Gamepad2,
      Car: Icons.Car,
      MoreHorizontal: Icons.MoreHorizontal,
    }
    return iconMap[iconName] || Icons.MoreHorizontal
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {categories.map((cat) => {
        const Icon = getIcon(cat.icon)
        const isSelected = selected === cat.name

        return (
          <button
            key={cat.name}
            onClick={() => onSelect(cat.name)}
            className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
              isSelected
                ? 'border-primary bg-primary/10'
                : 'border-border bg-card hover:border-primary/50'
            }`}
          >
            <div
              className="p-3 rounded-lg text-white"
              style={{ backgroundColor: cat.color }}
            >
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-center text-foreground">
              {cat.name}
            </span>
          </button>
        )
      })}
    </div>
  )
}
