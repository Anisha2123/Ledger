# Ledger — Finance Dashboard

A clean, interactive finance dashboard built with **Vite + React + Tailwind CSS 4.2.2**.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📐 Project Structure

```
src/
├── components/
│   ├── charts/
│   │   ├── BalanceTrendChart.jsx    # Area chart — income/expense/savings trend
│   │   └── CategoryChart.jsx       # Donut chart — spending by category
│   ├── layout/
│   │   ├── DashboardPage.jsx       # Main dashboard tab
│   │   ├── Header.jsx              # Top navigation bar
│   │   └── Sidebar.jsx             # Left navigation + role switcher
│   └── ui/
│       ├── InsightsPage.jsx        # Insights tab with charts + observations
│       ├── RecentTransactions.jsx  # Mini transaction list for dashboard
│       ├── SummaryCards.jsx        # KPI cards (Balance, Income, Expenses)
│       ├── TransactionModal.jsx    # Add/Edit transaction modal
│       └── TransactionsPage.jsx    # Full transactions table with filters
├── context/
│   └── AppContext.jsx              # Global state via useReducer + Context
├── data/
│   └── transactions.js             # 88 mock transactions (Jan–Jun 2024)
├── utils/
│   └── format.js                   # INR formatting, date helpers
├── App.jsx
├── main.jsx
└── index.css                       # Tailwind 4 + custom design tokens
```

---

## ✨ Features

### Dashboard Overview
- **4 Summary KPI cards**: Net Balance, Total Income, Total Expenses, Transaction count
- **Monthly trend chart**: Area chart comparing income vs expenses vs savings across 6 months
- **Category donut chart**: Visual breakdown of spending by category with percentages
- **Recent activity feed**: Last 6 transactions with category icons

### Transactions
- **Full transaction table** with 88 mock entries across 11 categories
- **Search**: Filter by description or category name
- **Type filter**: All / Income / Expense
- **Category filter**: All 11 categories
- **Month filter**: Filter by any specific month
- **Sort**: By date, amount, or description (ascending/descending)
- **Export CSV**: Downloads filtered results as a `.csv` file

### Role-Based UI
Switch roles via the sidebar dropdown:

| Role | Capabilities |
|------|-------------|
| **Viewer** | Read-only: browse dashboard, transactions, insights |
| **Admin** | Everything + Add transaction, Edit transaction, Delete transaction |

No backend required — roles are simulated on the frontend and persisted in `localStorage`.

### Insights
- **Highest spending category** — which category eats the most budget
- **Average monthly spend** — baseline reference for budgeting
- **Best savings month** — month with highest net savings and savings rate
- **Most frugal month** — lowest expense month
- **Month-over-month bar chart** — grouped bar chart for income vs expenses
- **Expense trend table** — month-by-month change percentage (green = improvement)
- **Category ranking bars** — all categories ranked with proportional progress bars

### State Management
Uses React's built-in `useReducer` + `Context API`:
- All transactions, filters, role, and modal state live in a single reducer
- `filteredTransactions` is derived via `useMemo` for performance
- Transactions and role are **persisted to `localStorage`** and restored on load

---

## 🎨 Design Approach

- **Aesthetic**: Editorial / refined — cream background, dark sidebar, warm typographic accents
- **Fonts**: DM Serif Display (headings) + DM Sans (body) — from Google Fonts
- **Color system**: CSS custom properties via Tailwind 4 `@theme` — consistent semantic tokens
- **Animations**: CSS keyframes for staggered page load reveals (no animation library needed)
- **Responsive**: Sidebar collapses to mobile drawer on small screens; cards use auto-fit grids

---

## 🛠 Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Vite | 5.x | Build tool & dev server |
| React | 18.x | UI framework |
| Tailwind CSS | **4.2.2** | Utility styling + `@theme` design tokens |
| Recharts | 2.x | Charts (area, bar, donut) |
| Lucide React | 0.383 | Icons |
| date-fns | 3.x | Date utilities |

---

## 📦 Optional Enhancements Implemented

- ✅ **Data persistence** — localStorage for transactions + role
- ✅ **Export CSV** — filtered transaction export
- ✅ **Animations** — staggered load animations, hover states, smooth transitions
- ✅ **Advanced filtering** — search + type + category + month combined filters

---

## 💡 Assumptions Made

1. Currency is **INR (₹)** — amounts formatted using `Intl.NumberFormat`
2. Data covers **Jan–Jun 2024** (6 months of mock data)
3. "Investment" transactions are categorized as expenses (money leaving the account)
4. Role switching is for demo only — no authentication layer
5. Admin role can delete with a browser `confirm()` dialog (no custom modal, kept simple)
