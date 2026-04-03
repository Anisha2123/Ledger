import { useApp } from '../../context/AppContext'
import { useIsMobile } from '../../hooks/useIsMobile'

function MenuIcon() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

function SunIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
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
  const isMobile = useIsMobile()

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
        {/* Hamburger — only on mobile */}
        {isMobile && (
          <button
            onClick={onMenuClick}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--color-ink-soft)', display: 'flex', alignItems: 'center',
              padding: 4, borderRadius: 6,
            }}
          >
            <MenuIcon />
          </button>
        )}
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
        {/* Dark mode toggle */}
        <button
          onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--color-ink-soft)', display: 'flex', alignItems: 'center',
            padding: 6, borderRadius: 6, transition: 'all 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--color-surface-2)'}
          onMouseLeave={e => e.currentTarget.style.background = 'none'}
        >
          {state.darkMode ? <SunIcon /> : <MoonIcon />}
        </button>

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