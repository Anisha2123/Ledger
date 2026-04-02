// Mock transactions data
export const CATEGORIES = {
  food: { label: 'Food & Dining', color: '#c84b2f', bg: '#f5e8e4', icon: '🍽' },
  transport: { label: 'Transport', color: '#2d5fa8', bg: '#e2eaf5', icon: '🚗' },
  shopping: { label: 'Shopping', color: '#6b3fa8', bg: '#ece5f5', icon: '🛍' },
  health: { label: 'Health', color: '#2d7a5f', bg: '#e2f0eb', icon: '💊' },
  entertainment: { label: 'Entertainment', color: '#c47a1a', bg: '#f5edde', icon: '🎬' },
  utilities: { label: 'Utilities', color: '#4a7a8a', bg: '#e0eef2', icon: '⚡' },
  rent: { label: 'Rent', color: '#5a4a3a', bg: '#ede8e3', icon: '🏠' },
  salary: { label: 'Salary', color: '#2d7a5f', bg: '#e2f0eb', icon: '💼' },
  freelance: { label: 'Freelance', color: '#2d5fa8', bg: '#e2eaf5', icon: '💻' },
  investment: { label: 'Investment', color: '#6b3fa8', bg: '#ece5f5', icon: '📈' },
  other: { label: 'Other', color: '#7a7f8e', bg: '#eeeeee', icon: '📌' },
}

function tx(id, date, desc, amount, category, type, note = '') {
  return { id, date, description: desc, amount, category, type, note }
}

export const TRANSACTIONS = [
  // January
  tx('t001', '2024-01-02', 'Monthly Salary', 85000, 'salary', 'income'),
  tx('t002', '2024-01-03', 'Apartment Rent', -18000, 'rent', 'expense'),
  tx('t003', '2024-01-05', 'Grocery Store', -2340, 'food', 'expense'),
  tx('t004', '2024-01-07', 'Uber Ride', -280, 'transport', 'expense'),
  tx('t005', '2024-01-09', 'Netflix Subscription', -649, 'entertainment', 'expense'),
  tx('t006', '2024-01-10', 'Freelance Project A', 12000, 'freelance', 'income'),
  tx('t007', '2024-01-12', 'Electricity Bill', -1200, 'utilities', 'expense'),
  tx('t008', '2024-01-14', 'Restaurant Dinner', -890, 'food', 'expense'),
  tx('t009', '2024-01-16', 'Amazon Shopping', -3200, 'shopping', 'expense'),
  tx('t010', '2024-01-18', 'Gym Membership', -1500, 'health', 'expense'),
  tx('t011', '2024-01-20', 'Zomato Order', -450, 'food', 'expense'),
  tx('t012', '2024-01-22', 'Petrol', -2100, 'transport', 'expense'),
  tx('t013', '2024-01-25', 'Mobile Recharge', -399, 'utilities', 'expense'),
  tx('t014', '2024-01-28', 'Investment - Mutual Fund', -10000, 'investment', 'expense'),
  tx('t015', '2024-01-30', 'Freelance Project B', 8500, 'freelance', 'income'),

  // February
  tx('t016', '2024-02-01', 'Monthly Salary', 85000, 'salary', 'income'),
  tx('t017', '2024-02-02', 'Apartment Rent', -18000, 'rent', 'expense'),
  tx('t018', '2024-02-04', 'Grocery Store', -2750, 'food', 'expense'),
  tx('t019', '2024-02-06', 'Metro Pass', -500, 'transport', 'expense'),
  tx('t020', '2024-02-07', 'Movie Tickets', -820, 'entertainment', 'expense'),
  tx('t021', '2024-02-09', 'Doctor Visit', -600, 'health', 'expense'),
  tx('t022', '2024-02-10', 'Freelance Project C', 15000, 'freelance', 'income'),
  tx('t023', '2024-02-12', 'Clothing Purchase', -4500, 'shopping', 'expense'),
  tx('t024', '2024-02-14', 'Valentine Dinner', -2200, 'food', 'expense'),
  tx('t025', '2024-02-16', 'Electricity Bill', -1100, 'utilities', 'expense'),
  tx('t026', '2024-02-18', 'Spotify', -119, 'entertainment', 'expense'),
  tx('t027', '2024-02-20', 'Petrol', -1900, 'transport', 'expense'),
  tx('t028', '2024-02-22', 'Pharmacy', -340, 'health', 'expense'),
  tx('t029', '2024-02-25', 'Investment - Stocks', -5000, 'investment', 'expense'),
  tx('t030', '2024-02-28', 'Miscellaneous', -750, 'other', 'expense'),

  // March
  tx('t031', '2024-03-01', 'Monthly Salary', 85000, 'salary', 'income'),
  tx('t032', '2024-03-02', 'Apartment Rent', -18000, 'rent', 'expense'),
  tx('t033', '2024-03-03', 'Grocery Store', -3100, 'food', 'expense'),
  tx('t034', '2024-03-05', 'Holi Celebrations', -1800, 'entertainment', 'expense'),
  tx('t035', '2024-03-07', 'Uber Ride', -340, 'transport', 'expense'),
  tx('t036', '2024-03-08', 'Freelance Project D', 22000, 'freelance', 'income'),
  tx('t037', '2024-03-10', 'Online Course', -2999, 'other', 'expense'),
  tx('t038', '2024-03-12', 'Restaurant Lunch', -680, 'food', 'expense'),
  tx('t039', '2024-03-14', 'Electricity Bill', -1350, 'utilities', 'expense'),
  tx('t040', '2024-03-16', 'Shopping Mall', -5200, 'shopping', 'expense'),
  tx('t041', '2024-03-18', 'Gym Membership', -1500, 'health', 'expense'),
  tx('t042', '2024-03-20', 'Investment - Mutual Fund', -10000, 'investment', 'expense'),
  tx('t043', '2024-03-22', 'Petrol', -2300, 'transport', 'expense'),
  tx('t044', '2024-03-25', 'Mobile Recharge', -399, 'utilities', 'expense'),
  tx('t045', '2024-03-28', 'Dinner Party', -1200, 'food', 'expense'),

  // April
  tx('t046', '2024-04-01', 'Monthly Salary', 90000, 'salary', 'income', 'Increment'),
  tx('t047', '2024-04-02', 'Apartment Rent', -18000, 'rent', 'expense'),
  tx('t048', '2024-04-04', 'Grocery Store', -2600, 'food', 'expense'),
  tx('t049', '2024-04-06', 'Flight Tickets', -8500, 'transport', 'expense'),
  tx('t050', '2024-04-08', 'Hotel Stay', -6200, 'other', 'expense'),
  tx('t051', '2024-04-09', 'Freelance Project E', 18000, 'freelance', 'income'),
  tx('t052', '2024-04-11', 'Shopping', -3400, 'shopping', 'expense'),
  tx('t053', '2024-04-13', 'Electricity Bill', -1150, 'utilities', 'expense'),
  tx('t054', '2024-04-15', 'Restaurant', -950, 'food', 'expense'),
  tx('t055', '2024-04-17', 'Medical Checkup', -1200, 'health', 'expense'),
  tx('t056', '2024-04-20', 'Netflix', -649, 'entertainment', 'expense'),
  tx('t057', '2024-04-22', 'Petrol', -2000, 'transport', 'expense'),
  tx('t058', '2024-04-25', 'Investment - Stocks', -8000, 'investment', 'expense'),
  tx('t059', '2024-04-28', 'Miscellaneous', -420, 'other', 'expense'),

  // May
  tx('t060', '2024-05-01', 'Monthly Salary', 90000, 'salary', 'income'),
  tx('t061', '2024-05-02', 'Apartment Rent', -18000, 'rent', 'expense'),
  tx('t062', '2024-05-04', 'Grocery Store', -2900, 'food', 'expense'),
  tx('t063', '2024-05-06', 'Uber Pool', -180, 'transport', 'expense'),
  tx('t064', '2024-05-08', 'Concert Tickets', -3200, 'entertainment', 'expense'),
  tx('t065', '2024-05-09', 'Freelance Project F', 25000, 'freelance', 'income'),
  tx('t066', '2024-05-11', 'Online Shopping', -4100, 'shopping', 'expense'),
  tx('t067', '2024-05-13', 'Electricity Bill', -1080, 'utilities', 'expense'),
  tx('t068', '2024-05-15', 'Mom Birthday Gift', -3500, 'shopping', 'expense'),
  tx('t069', '2024-05-17', 'Gym Membership', -1500, 'health', 'expense'),
  tx('t070', '2024-05-19', 'Café Visits', -620, 'food', 'expense'),
  tx('t071', '2024-05-22', 'Petrol', -2200, 'transport', 'expense'),
  tx('t072', '2024-05-25', 'Investment - Mutual Fund', -10000, 'investment', 'expense'),
  tx('t073', '2024-05-28', 'Restaurant Dinner', -1100, 'food', 'expense'),
  tx('t074', '2024-05-30', 'Internet Bill', -800, 'utilities', 'expense'),

  // June
  tx('t075', '2024-06-01', 'Monthly Salary', 90000, 'salary', 'income'),
  tx('t076', '2024-06-02', 'Apartment Rent', -18000, 'rent', 'expense'),
  tx('t077', '2024-06-04', 'Grocery Store', -3200, 'food', 'expense'),
  tx('t078', '2024-06-06', 'AC Service', -1800, 'utilities', 'expense'),
  tx('t079', '2024-06-08', 'Freelance Project G', 20000, 'freelance', 'income'),
  tx('t080', '2024-06-10', 'Clothing Sale', -5800, 'shopping', 'expense'),
  tx('t081', '2024-06-12', 'Electricity Bill (Summer)', -2100, 'utilities', 'expense'),
  tx('t082', '2024-06-14', 'Dining Out', -1450, 'food', 'expense'),
  tx('t083', '2024-06-16', 'Petrol', -2400, 'transport', 'expense'),
  tx('t084', '2024-06-18', 'OTT Subscription', -1200, 'entertainment', 'expense'),
  tx('t085', '2024-06-20', 'Pharmacy', -480, 'health', 'expense'),
  tx('t086', '2024-06-22', 'Investment - Gold ETF', -5000, 'investment', 'expense'),
  tx('t087', '2024-06-25', 'Mobile Recharge', -399, 'utilities', 'expense'),
  tx('t088', '2024-06-28', 'Miscellaneous', -680, 'other', 'expense'),
]

// Generate monthly balance trend
export function getMonthlyData(transactions) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  return months.map((month, i) => {
    const monthNum = i + 1
    const monthTxs = transactions.filter(t => {
      const d = new Date(t.date)
      return d.getMonth() + 1 === monthNum
    })
    const income = monthTxs.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
    const expenses = Math.abs(monthTxs.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0))
    const savings = income - expenses
    return { month, income, expenses, savings }
  })
}

export function getCategoryBreakdown(transactions) {
  const expense = transactions.filter(t => t.type === 'expense')
  const totals = {}
  expense.forEach(t => {
    totals[t.category] = (totals[t.category] || 0) + Math.abs(t.amount)
  })
  return Object.entries(totals)
    .map(([cat, amount]) => ({
      category: cat,
      label: CATEGORIES[cat]?.label || cat,
      amount,
      color: CATEGORIES[cat]?.color || '#888',
      bg: CATEGORIES[cat]?.bg || '#eee',
    }))
    .sort((a, b) => b.amount - a.amount)
}

export function getSummary(transactions) {
  const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const expenses = Math.abs(transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0))
  const balance = income - expenses
  return { income, expenses, balance, savings: balance, savingsRate: income > 0 ? (balance / income * 100).toFixed(1) : 0 }
}
