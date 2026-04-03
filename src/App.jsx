import { useState } from 'react'
import { AppProvider, useApp } from './context/AppContext'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import DashboardPage from './components/layout/DashboardPage'
import TransactionsPage from './components/ui/TransactionsPage'
import InsightsPage from './components/ui/InsightsPage'
import TransactionModal from './components/ui/TransactionModal'
import { useIsMobile } from './hooks/useIsMobile'

function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { state } = useApp()
  const isMobile = useIsMobile()

  const renderPage = () => {
    switch (state.activeTab) {
      case 'transactions':
        return <TransactionsPage />
      case 'insights':
        return <InsightsPage />
      case 'dashboard':
      default:
        return <DashboardPage />
    }
  }

  return (
    <div style={{ display: 'flex', height: '100dvh', overflow: 'hidden' }}>
      <Sidebar mobileOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
        <Header onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
        <main style={{ flex: 1, overflow: 'auto', padding: '24px 20px' }}>
          {renderPage()}
        </main>
      </div>
      <TransactionModal />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppLayout />
    </AppProvider>
  )
}