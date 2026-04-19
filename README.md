# Kashyflo - Smart Budget Splitting for Nigerian Earners

A lightweight, offline-first budgeting app designed for Nigerian salary earners. Track expenses in real-time, automatically split your income into smart budget categories, and never run out of money before your next salary.

## Features

### 🎯 Core Features
- **Quick Expense Tracking**: Add expenses in under 3 seconds with a streamlined UI
- **Automatic Salary Splitting**: Split your monthly salary across customizable budget categories (Rent, Food, Savings, Transport, etc.)
- **Real-time Budget Dashboard**: See exactly how much you have left in each category at a glance
- **Offline-First**: Works completely offline with IndexedDB for data persistence
- **PWA Installation**: Install as a mobile app on your phone for instant access

### 📊 Budget Categories
- **Rent** (20% by default) - Housing expenses
- **Food** (30%) - Groceries and meals
- **Savings** (15%) - Emergency fund and future planning
- **Buffer** (10%) - Unexpected expenses
- **Entertainment** (10%) - Fun and leisure
- **Transport** (10%) - Travel and commute
- **Other** (5%) - Miscellaneous

All percentages are fully customizable to match your lifestyle.

### 🔄 How It Works
1. **Set Your Salary**: Enter your monthly salary amount in Settings
2. **Review Allocations**: Customize how your salary is split across categories
3. **Track Expenses**: Add expenses as you spend, select the category
4. **Monitor Budget**: Dashboard shows remaining balance per category in real-time
5. **View History**: Check all transactions with detailed timestamps

### 💚 Smart Features
- **Status Indicators**: Visual feedback for each category
  - 🟢 Green: >50% remaining (good shape)
  - 🟡 Yellow: 20-50% remaining (be careful)
  - 🔴 Red: <20% remaining (limit spending)
- **Days to Salary**: Countdown to next salary payment
- **Quick Additions**: Category buttons for one-tap expense entry
- **Delete Transactions**: Remove expenses if they were entered by mistake

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS
- **State Management**: Zustand (reactive store)
- **Database**: Dexie.js (IndexedDB wrapper) for offline-first persistence
- **Icons**: Lucide React
- **PWA**: Service Worker + Web App Manifest

## Installation

### From Source
```bash
# Clone the repository
git clone https://github.com/yourusername/kashyflo.git
cd kashyflo

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open http://localhost:3000
```

### As a PWA (Mobile App)
1. Visit the app in your browser
2. Tap the menu button (⋮) and select "Install app"
3. Add to home screen
4. Works offline and loads instantly

## Architecture

### Folder Structure
```
kashyflo/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Dashboard
│   ├── settings/            # Settings page
│   ├── add-expense/         # Add expense page
│   ├── transactions/        # Transaction history
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Theme & styles
├── components/              # React components
│   ├── dashboard.tsx        # Main dashboard
│   ├── settings.tsx         # Settings form
│   ├── add-expense.tsx      # Expense form
│   ├── transactions.tsx     # Transaction list
│   └── ui/                  # shadcn/ui components
├── lib/
│   ├── db.ts               # Dexie.js schema
│   ├── store.ts            # Zustand store
│   └── utils.ts            # Helper functions
├── hooks/
│   └── use-service-worker.ts # PWA registration
├── public/
│   ├── kashyflo-logo.png    # App logo
│   ├── manifest.json        # PWA manifest
│   └── sw.js               # Service Worker
└── package.json
```

### Database Schema
```typescript
// Expenses Table
{
  id: number (auto)
  category: string
  amount: number
  description: string
  date: number (timestamp)
  createdAt: number (timestamp)
}

// Salaries Table
{
  id: number (auto)
  amount: number
  date: number (timestamp)
  allocations: Array<{category, percentage}>
  createdAt: number (timestamp)
}
```

### State Management (Zustand Store)
The app uses Zustand for real-time state with computed values:
- `expenses`: Current month's expenses
- `salaries`: Current month's salary entries
- `allocations`: Budget allocation percentages
- `totalSalary`: Computed total salary
- `categoryBudgets`: Computed budget per category
- `categorySpent`: Computed spending per category
- `categoryRemaining`: Computed remaining per category

## Usage Examples

### Adding a Salary
1. Go to Settings (⚙️ icon)
2. Enter your monthly salary amount
3. Adjust budget percentages if needed
4. Click "Add Salary"

### Adding an Expense
1. Click the + button (FAB)
2. Select expense category
3. Enter amount in Naira
4. Add optional description
5. Click "Save Expense"

### Viewing Transaction History
1. Click the History icon (🕐)
2. See all expenses with timestamps
3. Delete incorrect entries with the trash icon

## Performance
- **Initial Load**: <1 second (with Service Worker cache)
- **Add Expense**: <200ms (immediate IndexedDB write)
- **Calculate Budget**: <50ms (all computed in-memory)
- **Offline**: Works 100% offline after first visit

## Data Privacy
All data is stored locally on your device using IndexedDB. No data is sent to any server. Your financial information never leaves your phone.

## Customization
### Change Theme Colors
Edit `app/globals.css` and update the color tokens:
```css
:root {
  --primary: oklch(0.38 0.18 260);
  --secondary: oklch(0.55 0.2 165);
  --accent: oklch(0.75 0.22 85);
}
```

### Add New Categories
Edit `lib/store.ts` and add to `DEFAULT_ALLOCATIONS`:
```typescript
{ category: 'Healthcare', percentage: 5 }
```

## Browser Support
- Chrome 90+ (Desktop & Mobile)
- Firefox 88+
- Safari 14+
- Edge 90+

## Future Features (Roadmap)
- 📈 Spending trends and charts
- 🏦 Multiple accounts/wallets
- 📱 Android/iOS native apps
- 🔄 Cloud sync (optional)
- 📊 Monthly/yearly reports
- 🎯 Savings goals
- 💰 Income tracking
- 🔔 Budget alerts

## Contributing
Feel free to fork, modify, and submit pull requests!

## License
MIT License - feel free to use this app however you'd like.

## Support
For issues or suggestions, please open an issue on GitHub or reach out to support.

---

**Made with ❤️ for Nigerian salary earners**

Kashyflo helps you take control of your finances, one expense at a time.
