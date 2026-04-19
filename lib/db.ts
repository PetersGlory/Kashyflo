import Dexie, { Table } from 'dexie'

export interface Expense {
  id?: number
  category: string
  amount: number
  description: string
  date: number // timestamp
  createdAt: number // timestamp
}

export interface BudgetAllocation {
  category: string
  percentage: number
}

export interface Category {
  id?: number
  name: string
  color: string
  icon: string
  order: number
}

export interface SalaryEntry {
  id?: number
  amount: number
  date: number // timestamp
  allocations: BudgetAllocation[]
  createdAt: number // timestamp
}

export class KashyfloDb extends Dexie {
  expenses!: Table<Expense>
  salaries!: Table<SalaryEntry>
  categories!: Table<Category>

  constructor() {
    super('kashyflo')
    this.version(2).stores({
      expenses: '++id, category, date',
      salaries: '++id, date',
      categories: '++id, name',
    })
    this.on('populate', () => this.populateCategories())
  }

  async populateCategories() {
    await this.categories.bulkAdd([
      { name: 'Rent', color: '#1e40af', icon: 'Home', order: 1 },
      { name: 'Food', color: '#15803d', icon: 'Utensils', order: 2 },
      { name: 'Savings', color: '#7c2d12', icon: 'PiggyBank', order: 3 },
      { name: 'Buffer', color: '#9333ea', icon: 'Shield', order: 4 },
      { name: 'Entertainment', color: '#be123c', icon: 'Gamepad2', order: 5 },
      { name: 'Transport', color: '#0369a1', icon: 'Car', order: 6 },
      { name: 'Other', color: '#6b7280', icon: 'MoreHorizontal', order: 7 },
    ])
  }
}

export const db = new KashyfloDb()
