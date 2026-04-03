import { useState } from 'react'
import { AppProvider, useApp } from './context/AppContext'
import { useIsMobile } from './hooks/useIsMobile'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import DashboardPage from './components/layout/DashboardPage'
import TransactionsPage from './components/ui/TransactionsPage'
import InsightsPage from './components/ui/InsightsPage'
import TransactionModal from './components/ui/TransactionModal'

function AppShell() {
  const { state } = useApp()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isMobile = useIsMobile()

  const pages = {
    dashboard: <DashboardPage />,
    transactions: <TransactionsPage />,
    insights: <InsightsPage />,
  }

  return (
    // On desktop: flex row, sidebar is sticky in flow (220px) + main takes the rest.
    // On mobile:  sidebar is position:fixed (out of flow), main takes full width.
    <div style={{ display: 'flex', width: '100%', minHeight: '100dvh' }}>
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content — on desktop naturally sits beside the sticky sidebar */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        minHeight: '100dvh',
        // On mobile the sidebar is fixed/out-of-flow so main fills full width already
        width: isMobile ? '100%' : `calc(100% - 220px)`,
      }}>
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main style={{
          flex: 1,
          padding: isMobile ? '16px 14px 40px' : '24px 28px 40px',
          maxWidth: 1200,
          width: '100%',
          margin: '0 auto',
          boxSizing: 'border-box',
          overflowX: 'hidden',
        }}>
          {pages[state.activeTab]}
        </main>
      </div>

      {/* Modal */}
      <TransactionModal />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  )
}