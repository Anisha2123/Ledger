import { useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import { CATEGORIES } from '../../data/transactions'
import { formatINR, formatDateShort } from '../../utils/format'

export default function RecentTransactions() {
  const { state, dispatch } = useApp()
  const recent = useMemo(() =>
    [...state.transactions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 6),
    [state.transactions]
  )

  return (
    <div className="card animate-fade-up delay-500" style={{ padding: '22px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--color-ink)', marginBottom: 2 }}>
            Recent Activity
          </div>
          <div style={{ fontSize: 13, color: 'var(--color-ink-muted)' }}>Latest transactions</div>
        </div>
        <button
          onClick={() => dispatch({ type: 'SET_TAB', payload: 'transactions' })}
          style={{
            fontSize: 12, fontWeight: 500, color: 'var(--color-accent)',
            background: 'var(--color-accent-soft)', border: 'none', cursor: 'pointer',
            borderRadius: 6, padding: '5px 10px', fontFamily: 'var(--font-sans)',
            transition: 'all 0.15s',
          }}
        >
          View all →
        </button>
      </div>

      {recent.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--color-ink-muted)', fontSize: 14 }}>
          No transactions yet
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {recent.map((tx, i) => {
            const cat = CATEGORIES[tx.category] || CATEGORIES.other
            return (
              <div
                key={tx.id}
                className="animate-slide-in"
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '9px 8px', borderRadius: 8,
                  transition: 'background 0.15s',
                  animationDelay: `${0.5 + i * 0.05}s`,
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--color-surface)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{
                  width: 34, height: 34, borderRadius: 8, flexShrink: 0,
                  background: cat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16,
                }}>
                  {cat.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {tx.description}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--color-ink-muted)', marginTop: 1 }}>
                    {cat.label} · {formatDateShort(tx.date)}
                  </div>
                </div>
                <div style={{
                  fontSize: 13, fontWeight: 600, flexShrink: 0,
                  color: tx.type === 'income' ? 'var(--color-green)' : 'var(--color-red)',
                }}>
                  {tx.type === 'income' ? '+' : ''}{formatINR(tx.amount)}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
