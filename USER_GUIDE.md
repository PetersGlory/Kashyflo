# Kashyflo User Guide

Complete walkthrough for using Kashyflo to manage your monthly budget.

---

## Table of Contents
1. [Getting Started](#getting-started)
2. [Dashboard Overview](#dashboard-overview)
3. [Adding Salary](#adding-salary)
4. [Managing Budget](#managing-budget)
5. [Tracking Expenses](#tracking-expenses)
6. [Viewing History](#viewing-history)
7. [Tips & Best Practices](#tips--best-practices)
8. [FAQ](#faq)

---

## Getting Started

### First Time Setup (5 minutes)

**Step 1: Open Kashyflo**
- Visit the app URL in your web browser
- You should see a welcome message saying "No salary added yet"

**Step 2: Set Your Monthly Salary**
```
1. Click the Settings icon (⚙️) in the top right
2. You'll see a "Monthly Salary" input field
3. Enter your monthly take-home amount in Nigerian Naira
4. Click "Add Salary"
```

**Step 3: Customize Budget (Optional)**
```
1. Review the default budget allocations below
2. If you want to adjust, change the percentages
3. Make sure all percentages add up to 100%
4. Click "Save Allocations" when ready
```

**Step 4: Install as Mobile App (Optional)**
```
On Android Chrome:
1. Tap the menu (⋮) at the top right
2. Select "Install app"
3. App appears on your home screen

On iPhone Safari:
1. Tap the Share button (↑)
2. Scroll and select "Add to Home Screen"
3. App appears on your home screen
```

---

## Dashboard Overview

### The Main Screen

```
┌─────────────────────────────────────────┐
│  Logo    Kashyflo    🕐  ⚙️             │  ← Header with navigation
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ Monthly Budget                  │   │  ← Total Salary Card
│  │ ₦500,000                        │   │     (gradient background)
│  │ 14 days until next salary    ↗️ │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌────────────────┐  ┌────────────────┐ │
│  │ Rent           │  │ Food           │ │
│  │ 20% allocated  │  │ 30% allocated  │ │  ← Category Cards
│  │ Spent: ₦50,000 │  │ Spent: ₦40,000 │ │    (grid layout)
│  │ Remaining:40%  │  │ Remaining:67%  │ │
│  │ ₦50,000        │  │ ₦110,000       │ │
│  └────────────────┘  └────────────────┘ │
│                                         │
│  [More category cards below...]        │
│                                         │
│                           │  + │        │  ← Floating Action Button
│                           └────┘        │
└─────────────────────────────────────────┘
```

### Understanding the Dashboard

**Total Salary Card (Top)**
- Shows your total monthly budget
- Displays days until next salary
- Appears in gradient (primary to secondary color)

**Category Cards (Grid)**
- Showing 7 default categories
- Each card displays:
  - Category name and percentage
  - Amount spent (with visual progress bar)
  - Remaining balance
  - Color indicator (status badge)

**Status Colors**
- 🟢 Green: >50% remaining (healthy)
- 🟡 Yellow: 20-50% remaining (caution)
- 🔴 Red: <20% remaining (limit spending)

---

## Adding Salary

### How to Add Your Monthly Salary

**Location**: Settings page (⚙️ icon)

**Step-by-Step**:
```
1. Click Settings icon (⚙️) at top right
2. Find "Add Salary" section
3. Enter amount: 500000 (just numbers, no commas)
4. Click "Add Salary" button
5. Dashboard updates immediately
```

**That's it!** Your salary is now saved and budget categories are auto-calculated.

### Monthly Reset
- Your salary entry is valid for the current month
- Budget resets automatically on the 1st of each month
- You'll see previous month's data in transaction history
- Add a new salary entry when you get paid next month

---

## Managing Budget

### Understanding Your Budget Allocation

**Default Split** (you can customize):
```
Rent              20% (housing, utilities)
Food              30% (groceries, meals)
Savings           15% (emergency fund)
Buffer            10% (unexpected expenses)
Entertainment     10% (fun, hobbies)
Transport         10% (commute, travel)
Other              5% (misc items)
─────────────────────────────
Total            100%
```

### How Budgets Are Calculated

```
Category Budget = (Total Salary × Percentage) / 100

Example:
- Salary: ₦500,000
- Rent percentage: 20%
- Rent budget: (500,000 × 20) / 100 = ₦100,000
```

### Customizing Your Budget

**When to adjust**:
- Your actual spending patterns are different
- You have additional income sources
- A category regularly runs out early
- Your lifestyle changes (e.g., moved closer to work)

**How to adjust**:
```
1. Go to Settings (⚙️)
2. Find "Budget Allocation" section
3. Click on percentage field for a category
4. Enter new percentage
5. Check that total = 100% (required)
6. Click "Save Allocations"
7. Dashboard updates immediately with new budgets
```

**Example Adjustment**:
```
If you don't eat out much:
- Change Food from 30% to 25%
- Add those 5% to Savings
- New total: 100% ✓
```

---

## Tracking Expenses

### Add an Expense (The Main Task!)

**Quick Process** (3 steps):
```
1. Click the + button (bottom right)
2. Select category and enter amount
3. Done! Back to dashboard
```

**Detailed Steps**:

**Step 1: Click the + Button**
```
- Look for the floating + button at bottom right
- It's always accessible from any page
- Takes you to "Add Expense" form
```

**Step 2: Select Category**
```
- You'll see category buttons in a grid
- Select category for your expense
  (e.g., "Food" for grocery purchase)
- Selected button turns blue/highlighted
```

**Step 3: Enter Details**
```
Amount (Required):
- Just the number (no ₦ symbol)
- Example: 5000 (for ₦5,000)
- Can use decimals if needed

Description (Optional):
- What you bought
- Example: "Lunch at work" or "Fuel"
- Helpful for remembering expenses
```

**Step 4: Save**
```
- Click "Save Expense" button
- Returns to dashboard automatically
- Dashboard updates instantly
- Money deducted from that category's budget
```

### Best Practices

✓ **Add expenses immediately** - Don't wait until later
✓ **Be specific** - Helpful descriptions let you remember
✓ **Check category** - Make sure you're selecting right one
✓ **Monitor spending** - Glance at dashboard frequently

---

## Viewing History

### Access Transaction History

**How to view**:
```
1. Click History icon (🕐) at top right
2. See all expenses in reverse date order (newest first)
```

**What You See**:
```
Each transaction shows:
┌────────────────────────────────────────┐
│ [Food]    2 hours ago                  │  ← Category & time
│ Lunch at office         ₦2,500      ✕  │  ← Description, amount, delete
└────────────────────────────────────────┘
```

### Delete an Expense

**To remove a transaction**:
```
1. Go to History (🕐 icon)
2. Find the transaction you want to remove
3. Click the trash icon (✕) on the right
4. Expense is deleted
5. Dashboard budget updates (money restored)
```

### View All Transactions

The history shows:
- All expenses from current month
- Full timestamps ("2 hours ago", "Yesterday", etc.)
- Category badges with colors
- Amount in Nigerian Naira
- Description you entered
- Delete button for each entry

---

## Tips & Best Practices

### Daily Habits

**Morning**
```
Start your day by:
1. Opening Kashyflo
2. Checking dashboard
3. Reviewing your remaining budget
4. Planning your spending
```

**Throughout Day**
```
When you spend money:
1. Immediately add to Kashyflo
2. Select category
3. Note description
4. Keep app updated
```

**Evening**
```
Before bed:
1. Review what you spent
2. Check if any category is concerning
3. Plan next day's spending
```

### Weekly Review

Every Sunday or start of week:
```
1. Open Kashyflo
2. Check each category's remaining balance
3. See which categories are tight
4. Plan your spending for the week
5. Adjust if needed for next month
```

### Monthly Checklist

On salary day:
```
✓ Verify your salary amount
✓ Review budget allocations
✓ Adjust percentages if needed
✓ Start fresh with a new salary entry
✓ Check last month's spending patterns
```

### Smart Budgeting Tips

**Prevent overspending**:
- Set personal limits within categories
- Stop spending when category reaches 80%
- Don't use all money immediately

**Boost savings**:
- Increase Savings percentage if possible
- Move unused money from other categories
- Track your savings month over month

**Flexible categories**:
- "Buffer" is for unexpected expenses
- "Other" catches miscellaneous items
- Adjust percentages if patterns emerge

---

## FAQ

### General Questions

**Q: What happens at the end of the month?**
A: The budget resets on the 1st of each month. Your previous month's data stays in transaction history. Add a new salary entry when you get paid next month.

**Q: Can I have multiple salary entries in one month?**
A: Yes! If you get side income, add another salary entry. The dashboard sums all salaries for that month.

**Q: Is my data safe?**
A: Yes! Data is stored only on your device. Nothing goes to servers. Your financial info never leaves your phone.

**Q: What if I make a mistake?**
A: No problem! Go to History, find the wrong entry, click the trash icon, and it's deleted. The budget restores automatically.

### Expense Tracking

**Q: Can I edit an expense?**
A: Currently, you can only delete and re-add. Go to History, delete the wrong one, then add the correct amount.

**Q: What if I forget to add an expense?**
A: Add it later! The timestamp shows when you added it, not when you spent it. But accuracy is better.

**Q: Can I have expenses without a category?**
A: No, you must select a category. That's how the budget system works.

**Q: What if I spend more than budgeted?**
A: The "Remaining" turns red. You're overspending that category. Cut back or adjust percentages next month.

### Budget & Salary

**Q: How do I change my monthly salary?**
A: Go to Settings, enter a new amount, click "Add Salary". The new salary is used for the current month.

**Q: Can I adjust percentages mid-month?**
A: Yes! Go to Settings, change percentages, save. The budgets recalculate immediately based on your salary.

**Q: What if my percentages don't add to 100%?**
A: The save button is disabled. Adjust until they total exactly 100%, then save.

**Q: Why are my calculations different?**
A: Rounding! Percentages are rounded to nearest Naira. Small differences are normal.

### Technical

**Q: Does the app work offline?**
A: Yes! After your first visit, it works 100% offline. You can add expenses without internet.

**Q: Where is my data stored?**
A: On your device, in browser's IndexedDB. Not on any server.

**Q: What if I clear my browser data?**
A: All Kashyflo data is deleted. Don't clear data unless you want to lose everything.

**Q: Can I use Kashyflo on multiple phones?**
A: Currently, each device has its own data. Multi-device sync is on the roadmap.

**Q: What browsers are supported?**
A: Chrome, Firefox, Safari, Edge (all recent versions). Mobile versions included.

### Installation & PWA

**Q: How do I install the app?**
A: 
- Chrome: tap ⋮ → "Install app"
- Safari: tap Share (↑) → "Add to Home Screen"
- Other browsers: search "[browser] install PWA"

**Q: Can I uninstall?**
A: Yes, like any app. Data stays in browser until you clear it.

**Q: What's the difference between web and app?**
A: Web app mode: full screen, starts faster, works offline. Otherwise identical.

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Click + | Go to Add Expense |
| Click Logo | Return to Dashboard |
| Click ⚙️ | Go to Settings |
| Click 🕐 | Go to History |
| Tab | Navigate between buttons |
| Enter | Submit form |

---

## Accessibility

Kashyflo is designed to be accessible:
- Screen reader compatible
- High contrast text
- Large touch targets (mobile)
- Keyboard navigation
- Clear color indicators

---

## Support

**Need help?**
1. Check this User Guide
2. See SETUP.md for troubleshooting
3. Read README.md for technical details

---

**Happy budgeting! Take control of your finances, one expense at a time. 💚**
