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

  constructor() {
    super('kashyflo')
    this.version(1).stores({
      expenses: '++id, category, date',
      salaries: '++id, date',
    })
  }
}

export const db = new KashyfloDb()
