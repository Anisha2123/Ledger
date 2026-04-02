import { useMemo } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { useApp } from '../../context/AppContext'
import { getCategoryBreakdown } from '../../data/transactions'
import { formatINR } from '../../utils/format'

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0]
  return (
    <div style={{
      background: 'var(--color-ink)', color: 'white',
      borderRadius: 10, padding: '9px 13px', fontSize: 13,
      boxShadow: 'var(--shadow-float)',
    }}>
      <div style={{ fontWeight: 600 }}>{d.name}</div>
      <div style={{ color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>{formatINR(d.value)}</div>
    </div>
  )
}

export default function CategoryChart() {
  const { state } = useApp()
  const data = useMemo(() => getCategoryBreakdown(state.transactions).slice(0, 7), [state.transactions])
  const total = data.reduce((s, d) => s + d.amount, 0)

  return (
    <div className="card animate-fade-up delay-400" style={{ padding: '22px 24px' }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--color-ink)', marginBottom: 2 }}>
          Spending by Category
        </div>
        <div style={{ fontSize: 13, color: 'var(--color-ink-muted)' }}>Top categories · All time</div>
      </div>

      <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', width: 180, height: 180, flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={54} outerRadius={78}
                dataKey="amount" nameKey="label" strokeWidth={2} stroke="var(--color-white)">
                {data.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none',
          }}>
            <div style={{ fontSize: 11, color: 'var(--color-ink-muted)', marginBottom: 2 }}>Total</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--color-ink)' }}>
              {formatINR(total, true)}
            </div>
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 140 }}>
          {data.map(d => (
            <div key={d.category} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: d.color, flexShrink: 0 }} />
              <div style={{ flex: 1, fontSize: 13, color: 'var(--color-ink-soft)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {d.label}
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-ink)', flexShrink: 0 }}>
                {Math.round(d.amount / total * 100)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
