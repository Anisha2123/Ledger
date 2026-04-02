import { useState } from 'react'
import { AppProvider, useApp } from './context/AppContext'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import DashboardPage from './components/layout/DashboardPage'
import TransactionsPage from './components/ui/TransactionsPage'
import InsightsPage from './components/ui/InsightsPage'
import TransactionModal from './components/ui/TransactionModal'

function AppShell() {
  const { state } = useApp()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const pages = {
    dashboard: <DashboardPage />,
    transactions: <TransactionsPage />,
    insights: <InsightsPage />,
  }

  return (
    <div style={{ display: 'flex', width: '100%', minHeight: '100dvh' }}>
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: '100dvh' }}>
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main style={{
          flex: 1,
          padding: '24px 24px 40px',
          maxWidth: 1200,
          width: '100%',
          margin: '0 auto',
          boxSizing: 'border-box',
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
