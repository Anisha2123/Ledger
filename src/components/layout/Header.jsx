import { useApp } from '../../context/AppContext'

function MenuIcon() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  )
}

const TAB_LABELS = {
  dashboard: 'Dashboard',
  transactions: 'Transactions',
  insights: 'Insights',
}

export default function Header({ onMenuClick }) {
  const { state, dispatch } = useApp()

  return (
    <header style={{
      height: 58,
      borderBottom: '1px solid var(--color-border)',
      background: 'var(--color-white)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      position: 'sticky',
      top: 0,
      zIndex: 30,
      flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Mobile menu */}
        <button
          className="lg:hidden"
          onClick={onMenuClick}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--color-ink-soft)', display: 'flex', alignItems: 'center',
            padding: 4, borderRadius: 6,
          }}
        >
          <MenuIcon />
        </button>
        <div style={{
          fontSize: 13,
          color: 'var(--color-ink-muted)',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span>Ledger</span>
          <span style={{ opacity: 0.4 }}>/</span>
          <span style={{ color: 'var(--color-ink)', fontWeight: 500 }}>
            {TAB_LABELS[state.activeTab]}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Role badge */}
        <div style={{
          fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 20,
          background: state.role === 'admin' ? 'var(--color-accent-soft)' : 'var(--color-surface-2)',
          color: state.role === 'admin' ? 'var(--color-accent)' : 'var(--color-ink-muted)',
          letterSpacing: '0.02em',
          textTransform: 'capitalize',
        }}>
          {state.role === 'admin' ? '⚡ Admin' : '👁 Viewer'}
        </div>

        {/* Avatar placeholder */}
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: 'var(--color-ink)',
          color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-display)',
          flexShrink: 0,
        }}>
          {state.role === 'admin' ? 'A' : 'V'}
        </div>
      </div>
    </header>
  )
}
