import { useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import { getSummary } from '../../data/transactions'
import { formatINR } from '../../utils/format'

function TrendArrow({ positive }) {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: positive ? 'rotate(0deg)' : 'rotate(180deg)' }}>
      <path d="m18 15-6-6-6 6"/>
    </svg>
  )
}

export default function SummaryCards() {
  const { state } = useApp()
  const summary = useMemo(() => getSummary(state.transactions), [state.transactions])

  const cards = [
    {
      label: 'Net Balance',
      value: summary.balance,
      sub: `${summary.savingsRate}% savings rate`,
      positive: summary.balance >= 0,
      accent: true,
    },
    {
      label: 'Total Income',
      value: summary.income,
      sub: 'All sources combined',
      positive: true,
      color: 'var(--color-green)',
      bg: 'var(--color-green-soft)',
    },
    {
      label: 'Total Expenses',
      value: summary.expenses,
      sub: 'Across all categories',
      positive: false,
      color: 'var(--color-red)',
      bg: 'var(--color-red-soft)',
    },
    {
      label: 'Transactions',
      value: state.transactions.length,
      sub: 'Total recorded entries',
      isCount: true,
      color: 'var(--color-blue)',
      bg: 'var(--color-blue-soft)',
    },
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: 12 }}>
      {cards.map((card, i) => (
        <div
          key={card.label}
          className={`card animate-fade-up delay-${i * 100 + 100}`}
          style={{
            padding: '20px 22px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {card.accent && (
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 3,
              background: 'linear-gradient(90deg, var(--color-accent), var(--color-accent-dark))',
              borderRadius: '16px 16px 0 0',
            }} />
          )}

          <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-ink-muted)', marginBottom: 10, letterSpacing: '0.02em' }}>
            {card.label}
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 8 }}>
            <div
              className="animate-count-up"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 26,
                lineHeight: 1,
                color: card.accent
                  ? (card.positive ? 'var(--color-green)' : 'var(--color-red)')
                  : (card.isCount ? 'var(--color-ink)' : card.color),
                animationDelay: `${i * 0.08 + 0.15}s`,
              }}
            >
              {card.isCount ? card.value : formatINR(card.value, true)}
            </div>

            {!card.isCount && (
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: card.accent ? (card.positive ? 'var(--color-green-soft)' : 'var(--color-red-soft)') : card.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: card.accent ? (card.positive ? 'var(--color-green)' : 'var(--color-red)') : card.color,
              }}>
                <TrendArrow positive={card.positive} />
              </div>
            )}
          </div>

          <div style={{ fontSize: 12, color: 'var(--color-ink-muted)' }}>{card.sub}</div>
        </div>
      ))}
    </div>
  )
}