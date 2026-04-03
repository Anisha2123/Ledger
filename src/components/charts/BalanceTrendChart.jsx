import { useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useApp } from '../../context/AppContext'
import { getMonthlyData } from '../../data/transactions'
import { formatINR } from '../../utils/format'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: '#0d0f14',
      color: '#ffffff',
      borderRadius: 10, padding: '10px 14px',
      fontSize: 13,
      boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)',
      border: '1px solid rgba(255,255,255,0.1)',
    }}>
      <div style={{ fontWeight: 600, marginBottom: 6 }}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
          <span style={{ width: 8, height: 8, borderRadius: 2, background: p.color, display: 'inline-block' }} />
          <span style={{ color: 'rgba(255,255,255,0.6)', textTransform: 'capitalize' }}>{p.name}:</span>
          <span style={{ fontWeight: 500 }}>{formatINR(p.value, true)}</span>
        </div>
      ))}
    </div>
  )
}

export default function BalanceTrendChart() {
  const { state } = useApp()
  const data = useMemo(() => getMonthlyData(state.transactions), [state.transactions])

  return (
    <div className="card animate-fade-up delay-300" style={{ padding: '22px 24px' }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--color-ink)', marginBottom: 2 }}>
          Monthly Overview
        </div>
        <div style={{ fontSize: 13, color: 'var(--color-ink-muted)' }}>Income vs Expenses vs Savings</div>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2d7a5f" stopOpacity={0.15}/>
              <stop offset="95%" stopColor="#2d7a5f" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#c84b2f" stopOpacity={0.15}/>
              <stop offset="95%" stopColor="#c84b2f" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="savingsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2d5fa8" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#2d5fa8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" strokeOpacity={0.6} />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--color-ink-muted)', fontFamily: 'var(--font-sans)' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: 'var(--color-ink-muted)', fontFamily: 'var(--font-sans)' }} axisLine={false} tickLine={false}
            tickFormatter={v => `₹${(v / 1000).toFixed(0)}K`} width={48} />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--color-border)', strokeWidth: 1 }} />
          <Legend
            iconType="circle" iconSize={8}
            wrapperStyle={{ fontSize: 12, fontFamily: 'var(--font-sans)', paddingTop: 12 }}
          />
          <Area type="monotone" dataKey="income" stroke="#2d7a5f" strokeWidth={2} fill="url(#incomeGrad)" dot={{ r: 3, fill: '#2d7a5f' }} activeDot={{ r: 5 }} />
          <Area type="monotone" dataKey="expenses" stroke="#c84b2f" strokeWidth={2} fill="url(#expenseGrad)" dot={{ r: 3, fill: '#c84b2f' }} activeDot={{ r: 5 }} />
          <Area type="monotone" dataKey="savings" stroke="#2d5fa8" strokeWidth={2} fill="url(#savingsGrad)" dot={{ r: 3, fill: '#2d5fa8' }} activeDot={{ r: 5 }} strokeDasharray="5 3" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
