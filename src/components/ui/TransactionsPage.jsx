import { useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import { CATEGORIES } from '../../data/transactions'
import { formatINR, formatDate } from '../../utils/format'

function ExportIcon() {
  return <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
}
function PlusIcon() {
  return <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
}
function EditIcon() {
  return <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
}
function DeleteIcon() {
  return <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
}

// Get unique months from transactions
function getMonthOptions(transactions) {
  const months = new Set()
  transactions.forEach(t => {
    const d = new Date(t.date)
    months.add(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`)
  })
  return Array.from(months).sort().reverse()
}

export default function TransactionsPage() {
  const { state, dispatch, filteredTransactions } = useApp()
  const { filters, role } = state

  const monthOptions = useMemo(() => getMonthOptions(state.transactions), [state.transactions])

  function setFilter(obj) { dispatch({ type: 'SET_FILTER', payload: obj }) }

  function toggleSort(field) {
    if (filters.sortBy === field) {
      setFilter({ sortDir: filters.sortDir === 'asc' ? 'desc' : 'asc' })
    } else {
      setFilter({ sortBy: field, sortDir: 'desc' })
    }
  }

  function exportCSV() {
    const rows = [
      ['Date', 'Description', 'Category', 'Type', 'Amount', 'Note'],
      ...filteredTransactions.map(t => [
        t.date, t.description, CATEGORIES[t.category]?.label, t.type, t.amount, t.note || ''
      ])
    ]
    const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'transactions.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  const inputBase = {
    padding: '8px 12px', borderRadius: 8,
    border: '1px solid var(--color-border)', background: 'var(--color-white)',
    fontSize: 13, fontFamily: 'var(--font-sans)', color: 'var(--color-ink)',
    outline: 'none', height: 38,
  }

  const SortBtn = ({ field, label }) => {
    const active = filters.sortBy === field
    return (
      <button
        onClick={() => toggleSort(field)}
        style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: '0',
          fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600,
          color: active ? 'var(--color-accent)' : 'var(--color-ink-muted)',
          display: 'flex', alignItems: 'center', gap: 4, letterSpacing: '0.02em',
          textTransform: 'uppercase',
        }}
      >
        {label}
        {active && <span style={{ fontSize: 10 }}>{filters.sortDir === 'asc' ? '↑' : '↓'}</span>}
      </button>
    )
  }

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--color-ink)', margin: 0 }}>Transactions</h1>
          <p style={{ margin: '4px 0 0', fontSize: 14, color: 'var(--color-ink-muted)' }}>
            {filteredTransactions.length} of {state.transactions.length} entries
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={exportCSV}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 14px', borderRadius: 8,
              border: '1px solid var(--color-border)', background: 'var(--color-white)',
              fontSize: 13, fontWeight: 500, cursor: 'pointer', color: 'var(--color-ink-soft)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            <ExportIcon /> Export CSV
          </button>
          {role === 'admin' && (
            <button
              onClick={() => dispatch({ type: 'SET_MODAL', payload: { type: 'add' } })}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 16px', borderRadius: 8,
                border: 'none', background: 'var(--color-accent)',
                fontSize: 13, fontWeight: 600, cursor: 'pointer', color: 'white',
                fontFamily: 'var(--font-sans)',
              }}
            >
              <PlusIcon /> Add Transaction
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="card" style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            style={{ ...inputBase, flex: '1 1 180px', minWidth: 150 }}
            placeholder="🔍 Search transactions..."
            value={filters.search}
            onChange={e => setFilter({ search: e.target.value })}
          />
          <select style={{ ...inputBase, cursor: 'pointer' }} value={filters.type} onChange={e => setFilter({ type: e.target.value })}>
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select style={{ ...inputBase, cursor: 'pointer' }} value={filters.category} onChange={e => setFilter({ category: e.target.value })}>
            <option value="all">All Categories</option>
            {Object.entries(CATEGORIES).map(([k, v]) => (
              <option key={k} value={k}>{v.icon} {v.label}</option>
            ))}
          </select>
          <select style={{ ...inputBase, cursor: 'pointer' }} value={filters.month} onChange={e => setFilter({ month: e.target.value })}>
            <option value="all">All Months</option>
            {monthOptions.map(m => {
              const [y, mo] = m.split('-')
              const label = new Date(y, mo - 1).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
              return <option key={m} value={m}>{label}</option>
            })}
          </select>
          {(filters.search || filters.type !== 'all' || filters.category !== 'all' || filters.month !== 'all') && (
            <button
              onClick={() => dispatch({ type: 'RESET_FILTERS' })}
              style={{
                padding: '8px 12px', borderRadius: 8, border: 'none', cursor: 'pointer',
                background: 'var(--color-accent-soft)', color: 'var(--color-accent)',
                fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-sans)',
              }}
            >
              Clear ×
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        {/* Table header */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr 1fr auto',
          gap: 12, padding: '12px 20px',
          borderBottom: '1px solid var(--color-border)',
          background: 'var(--color-surface)',
        }}>
          <SortBtn field="date" label="Date" />
          <SortBtn field="description" label="Description" />
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-ink-muted)', letterSpacing: '0.02em', textTransform: 'uppercase' }}>Category</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-ink-muted)', letterSpacing: '0.02em', textTransform: 'uppercase' }}>Type</div>
          <SortBtn field="amount" label="Amount" />
          {role === 'admin' && <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-ink-muted)', letterSpacing: '0.02em', textTransform: 'uppercase' }}>Actions</div>}
        </div>

        {filteredTransactions.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
            <div style={{ fontSize: 16, fontWeight: 500, color: 'var(--color-ink-soft)', marginBottom: 4 }}>No transactions found</div>
            <div style={{ fontSize: 13, color: 'var(--color-ink-muted)' }}>Try adjusting your filters</div>
          </div>
        ) : (
          <div style={{ maxHeight: 500, overflowY: 'auto' }}>
            {filteredTransactions.map((tx, i) => {
              const cat = CATEGORIES[tx.category] || CATEGORIES.other
              return (
                <div
                  key={tx.id}
                  style={{
                    display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr 1fr auto',
                    gap: 12, padding: '11px 20px',
                    borderBottom: i < filteredTransactions.length - 1 ? '1px solid var(--color-surface-2)' : 'none',
                    alignItems: 'center', transition: 'background 0.12s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--color-surface)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ fontSize: 12, color: 'var(--color-ink-muted)' }}>{formatDate(tx.date)}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-ink)' }}>{tx.description}</div>
                    {tx.note && <div style={{ fontSize: 11, color: 'var(--color-ink-muted)' }}>{tx.note}</div>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 15 }}>{cat.icon}</span>
                    <span style={{ fontSize: 12, color: 'var(--color-ink-soft)' }}>{cat.label}</span>
                  </div>
                  <div>
                    <span style={{
                      fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 20,
                      background: tx.type === 'income' ? 'var(--color-green-soft)' : 'var(--color-red-soft)',
                      color: tx.type === 'income' ? 'var(--color-green)' : 'var(--color-red)',
                      textTransform: 'capitalize',
                    }}>
                      {tx.type}
                    </span>
                  </div>
                  <div style={{
                    fontSize: 13, fontWeight: 700,
                    color: tx.type === 'income' ? 'var(--color-green)' : 'var(--color-red)',
                  }}>
                    {tx.type === 'income' ? '+' : ''}{formatINR(tx.amount)}
                  </div>
                  {role === 'admin' && (
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button
                        onClick={() => dispatch({ type: 'SET_MODAL', payload: { type: 'edit', tx } })}
                        style={{
                          width: 28, height: 28, borderRadius: 6, border: '1px solid var(--color-border)',
                          background: 'transparent', cursor: 'pointer', display: 'flex',
                          alignItems: 'center', justifyContent: 'center', color: 'var(--color-ink-muted)',
                          transition: 'all 0.15s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-blue-soft)'; e.currentTarget.style.color = 'var(--color-blue)' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-ink-muted)' }}
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Delete this transaction?'))
                            dispatch({ type: 'DELETE_TRANSACTION', payload: tx.id })
                        }}
                        style={{
                          width: 28, height: 28, borderRadius: 6, border: '1px solid var(--color-border)',
                          background: 'transparent', cursor: 'pointer', display: 'flex',
                          alignItems: 'center', justifyContent: 'center', color: 'var(--color-ink-muted)',
                          transition: 'all 0.15s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-red-soft)'; e.currentTarget.style.color = 'var(--color-red)' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-ink-muted)' }}
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
