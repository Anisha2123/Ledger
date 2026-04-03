import { useApp } from '../../context/AppContext'
import { useIsMobile } from '../../hooks/useIsMobile'

const NAV_ITEMS = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'transactions', icon: ArrowLeftRight, label: 'Transactions' },
  { id: 'insights', icon: Sparkles, label: 'Insights' },
]

function LayoutDashboard({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  )
}
function ArrowLeftRight({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/>
    </svg>
  )
}
function Sparkles({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
    </svg>
  )
}

export default function Sidebar({ mobileOpen, onClose }) {
  const { state, dispatch } = useApp()
  const { activeTab, role } = state
  const isMobile = useIsMobile()

  return (
    <>
      {/* Backdrop — only visible on mobile when open */}
      {isMobile && mobileOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 40,
            background: 'rgba(0,0,0,0.35)',
            pointerEvents: 'auto',
          }}
        />
      )}

      {/* Backdrop — only visible on mobile when open */}
      {isMobile && mobileOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 40,
            background: 'rgba(0,0,0,0.35)',
          }}
        />
      )}

      <aside style={{
        width: 220,
        minWidth: 220,
        background: 'var(--color-ink)',
        color: 'var(--color-white)',
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        position: isMobile ? 'fixed' : 'sticky',
        top: 0,
        left: 0,
        zIndex: 50,
        flexShrink: 0,
        transform: isMobile
          ? (mobileOpen ? 'translateX(0)' : 'translateX(-100%)')
          : 'translateX(0)',
        transition: 'transform 0.25s ease',
        pointerEvents: isMobile && !mobileOpen ? 'none' : 'auto',
      }}>
        {/* Logo */}
        <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'var(--color-accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600,
              color: 'white', flexShrink: 0,
            }}>L</div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, lineHeight: 1 }}>Ledger</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>Finance Dashboard</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ padding: '16px 12px', flex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.3)', padding: '0 8px', marginBottom: 8, textTransform: 'uppercase' }}>
            Navigation
          </div>
          {NAV_ITEMS.map(item => {
            const Icon = item.icon
            const active = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => { dispatch({ type: 'SET_TAB', payload: item.id }); onClose() }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  width: '100%', padding: '9px 10px',
                  borderRadius: 8, border: 'none', cursor: 'pointer',
                  marginBottom: 2, textAlign: 'left',
                  background: active ? 'rgba(255,255,255,0.1)' : 'transparent',
                  color: active ? 'white' : 'rgba(255,255,255,0.5)',
                  fontSize: 14, fontWeight: active ? 500 : 400,
                  transition: 'all 0.15s ease',
                  fontFamily: 'var(--font-sans)',
                  position: 'relative',
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)' } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)' } }}
              >
                {active && (
                  <span style={{
                    position: 'absolute', left: 0, width: 3, height: 20,
                    background: 'var(--color-accent)', borderRadius: '0 2px 2px 0',
                  }} />
                )}
                <Icon size={17} />
                {item.label}
              </button>
            )
          })}
        </nav>

        {/* Role Switcher */}
        <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.3)', marginBottom: 8, textTransform: 'uppercase' }}>
            Role
          </div>
          <select
            value={role}
            onChange={e => dispatch({ type: 'SET_ROLE', payload: e.target.value })}
            style={{
              width: '100%', padding: '7px 10px',
              borderRadius: 7, border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.07)', color: 'white',
              fontSize: 13, fontFamily: 'var(--font-sans)', cursor: 'pointer',
              outline: 'none',
            }}
          >
            <option value="viewer" style={{ background: '#1a1c22', color: 'white' }}>👁 Viewer</option>
            <option value="admin" style={{ background: '#1a1c22', color: 'white' }}>⚡ Admin</option>
          </select>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 6, lineHeight: 1.4 }}>
            {role === 'admin' ? 'Can add & edit transactions' : 'Read-only access'}
          </div>
        </div>
      </aside>
    </>
  )
}