import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useApp } from '../../context/AppContext'
import { CATEGORIES, getCategoryBreakdown, getMonthlyData, getSummary } from '../../data/transactions'
import { formatINR } from '../../utils/format'

function InsightCard({ icon, label, value, sub, color = 'var(--color-accent)', bg = 'var(--color-accent-soft)', delay = 0 }) {
  return (
    <div className={`card animate-fade-up`} style={{ padding: '20px 22px', animationDelay: `${delay}s` }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        <div style={{
          width: 42, height: 42, borderRadius: 10,
          background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, flexShrink: 0,
        }}>{icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, color: 'var(--color-ink-muted)', fontWeight: 500, marginBottom: 4 }}>{label}</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, color, marginBottom: 2 }}>{value}</div>
          <div style={{ fontSize: 12, color: 'var(--color-ink-muted)', lineHeight: 1.4 }}>{sub}</div>
        </div>
      </div>
    </div>
  )
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: '#0d0f14',
      color: '#ffffff',
      borderRadius: 10,
      padding: '8px 13px',
      fontSize: 13,
      boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)',
      border: '1px solid rgba(255,255,255,0.1)',
    }}>
      <div style={{ fontWeight: 600, marginBottom: 4 }}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ color: 'rgba(255,255,255,0.7)' }}>
          {p.name}: <strong>{formatINR(p.value, true)}</strong>
        </div>
      ))}
    </div>
  )
}

export default function InsightsPage() {
  const { state } = useApp()
  const { transactions } = state

  const summary = useMemo(() => getSummary(transactions), [transactions])
  const categories = useMemo(() => getCategoryBreakdown(transactions), [transactions])
  const monthly = useMemo(() => getMonthlyData(transactions), [transactions])

  const topCat = categories[0]
  const lowestMonth = [...monthly].sort((a, b) => a.expenses - b.expenses)[0]
  const highestSavings = [...monthly].sort((a, b) => b.savings - a.savings)[0]
  const avgMonthlyExpense = monthly.reduce((s, m) => s + m.expenses, 0) / monthly.filter(m => m.expenses > 0).length

  const monthComparison = monthly.map((m, i, arr) => ({
    ...m,
    prevExpenses: i > 0 ? arr[i - 1].expenses : null,
    change: i > 0 ? ((m.expenses - arr[i - 1].expenses) / arr[i - 1].expenses * 100).toFixed(0) : null,
  }))

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--color-ink)', margin: '0 0 4px' }}>Insights</h1>
        <p style={{ margin: 0, fontSize: 14, color: 'var(--color-ink-muted)' }}>Smart observations from your financial data</p>
      </div>

      {/* Key insight cards */}
      <div className="insight-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
        {topCat && (
          <InsightCard
            icon={CATEGORIES[topCat.category]?.icon || '🏷'}
            label="Highest Spending Category"
            value={CATEGORIES[topCat.category]?.label}
            sub={`${formatINR(topCat.amount, true)} spent · ${Math.round(topCat.amount / summary.expenses * 100)}% of total expenses`}
            color={topCat.color}
            bg={topCat.bg}
            delay={0.1}
          />
        )}
        <InsightCard
          icon="📊"
          label="Average Monthly Spend"
          value={formatINR(avgMonthlyExpense, true)}
          sub="Based on months with recorded data"
          color="var(--color-blue)"
          bg="var(--color-blue-soft)"
          delay={0.15}
        />
        {highestSavings && (
          <InsightCard
            icon="🎯"
            label="Best Savings Month"
            value={highestSavings.month}
            sub={`Saved ${formatINR(highestSavings.savings, true)} · ${Math.round(highestSavings.savings / highestSavings.income * 100)}% of income`}
            color="var(--color-green)"
            bg="var(--color-green-soft)"
            delay={0.2}
          />
        )}
        {lowestMonth && (
          <InsightCard
            icon="💡"
            label="Most Frugal Month"
            value={lowestMonth.month}
            sub={`Spent only ${formatINR(lowestMonth.expenses, true)}`}
            color="var(--color-purple)"
            bg="var(--color-purple-soft)"
            delay={0.25}
          />
        )}
      </div>

      {/* Monthly comparison bar chart */}
      <div className="card animate-fade-up delay-300" style={{ padding: '22px 24px' }}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, marginBottom: 2 }}>Month-over-Month Comparison</div>
          <div style={{ fontSize: 13, color: 'var(--color-ink-muted)' }}>Income vs Expenses by month</div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={monthly} margin={{ top: 5, right: 5, left: 0, bottom: 5 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" strokeOpacity={0.6} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--color-ink-muted)', fontFamily: 'var(--font-sans)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: 'var(--color-ink-muted)', fontFamily: 'var(--font-sans)' }} axisLine={false} tickLine={false}
              tickFormatter={v => `₹${(v / 1000).toFixed(0)}K`} width={46} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--color-surface)' }} />
            <Bar dataKey="income" name="Income" fill="var(--color-green)" radius={[4, 4, 0, 0]} maxBarSize={36} />
            <Bar dataKey="expenses" name="Expenses" fill="var(--color-red)" radius={[4, 4, 0, 0]} maxBarSize={36} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly change table */}
      <div className="card animate-fade-up delay-400" style={{ padding: '22px 24px' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, marginBottom: 4 }}>Expense Trend</div>
        <div style={{ fontSize: 13, color: 'var(--color-ink-muted)', marginBottom: 18 }}>Month-over-month change in spending</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {monthComparison.map((m, i) => (
            <div
              key={m.month}
              style={{
                display: 'grid', gridTemplateColumns: '80px 1fr 1fr 80px',
                gap: 16, padding: '11px 8px',
                borderBottom: i < monthComparison.length - 1 ? '1px solid var(--color-surface-2)' : 'none',
                alignItems: 'center',
              }}
            >
              <div style={{ fontWeight: 600, color: 'var(--color-ink)', fontSize: 14 }}>{m.month}</div>
              <div>
                <div style={{ fontSize: 12, color: 'var(--color-ink-muted)', marginBottom: 3 }}>Income</div>
                <div style={{ fontSize: 14, color: 'var(--color-green)', fontWeight: 600 }}>{formatINR(m.income, true)}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: 'var(--color-ink-muted)', marginBottom: 3 }}>Expenses</div>
                <div style={{ fontSize: 14, color: 'var(--color-red)', fontWeight: 600 }}>{formatINR(m.expenses, true)}</div>
              </div>
              <div>
                {m.change !== null ? (
                  <span style={{
                    fontSize: 12, fontWeight: 700, padding: '3px 8px', borderRadius: 20,
                    background: Number(m.change) <= 0 ? 'var(--color-green-soft)' : 'var(--color-red-soft)',
                    color: Number(m.change) <= 0 ? 'var(--color-green)' : 'var(--color-red)',
                  }}>
                    {Number(m.change) > 0 ? '+' : ''}{m.change}%
                  </span>
                ) : (
                  <span style={{ fontSize: 12, color: 'var(--color-ink-muted)' }}>—</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top spending categories ranked */}
      <div className="card animate-fade-up delay-500" style={{ padding: '22px 24px' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, marginBottom: 4 }}>Spending Breakdown</div>
        <div style={{ fontSize: 13, color: 'var(--color-ink-muted)', marginBottom: 18 }}>All expense categories ranked by total spend</div>
        {categories.map((cat, i) => (
          <div key={cat.category} style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 16 }}>{CATEGORIES[cat.category]?.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-ink)' }}>{cat.label}</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-ink)' }}>{formatINR(cat.amount, true)}</span>
            </div>
            <div style={{ height: 6, borderRadius: 99, background: 'var(--color-surface-2)', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${(cat.amount / categories[0].amount * 100)}%`,
                  borderRadius: 99, background: cat.color,
                  transition: 'width 0.6s cubic-bezier(0.22,1,0.36,1)',
                  animationDelay: `${0.5 + i * 0.05}s`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
