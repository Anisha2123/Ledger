export function formatINR(amount, compact = false) {
  const abs = Math.abs(amount)
  if (compact) {
    if (abs >= 100000) return `₹${(abs / 100000).toFixed(1)}L`
    if (abs >= 1000) return `₹${(abs / 1000).toFixed(1)}K`
    return `₹${abs.toLocaleString('en-IN')}`
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function formatDateShort(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
  })
}

export function generateId() {
  return 't' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5)
}

export function getMonthLabel(ym) {
  if (!ym) return ''
  const [y, m] = ym.split('-')
  return new Date(y, m - 1).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
}
