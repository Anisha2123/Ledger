import SummaryCards from '../ui/SummaryCards'
import BalanceTrendChart from '../charts/BalanceTrendChart'
import CategoryChart from '../charts/CategoryChart'
import RecentTransactions from '../ui/RecentTransactions'
import { useApp } from '../../context/AppContext'

export default function DashboardPage() {
  const { state } = useApp()
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      {/* Header */}
      <div className="animate-fade-up">
        <div style={{ fontSize: 13, color: 'var(--color-ink-muted)', marginBottom: 4 }}>{today}</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 30, color: 'var(--color-ink)', margin: 0 }}>
          Good day{state.role === 'admin' ? ', Admin' : ''} 👋
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: 14, color: 'var(--color-ink-muted)' }}>
          Here's your financial overview for Jan – Jun 2024.
        </p>
      </div>

      {/* Summary cards */}
      <SummaryCards />

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 18 }}>
        <div style={{ minWidth: 0 }}>
          <BalanceTrendChart />
        </div>
        <div style={{ minWidth: 0 }}>
          <CategoryChart />
        </div>
      </div>

      {/* Recent transactions */}
      <RecentTransactions />
    </div>
  )
}
