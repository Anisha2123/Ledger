import { useState } from 'react'
import { AppProvider } from './context/AppContext'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import DashboardPage from './components/layout/DashboardPage'
import { useIsMobile } from './hooks/useIsMobile'

function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useIsMobile()

  return (
    <div style={{ display: 'flex', height: '100dvh', overflow: 'hidden' }}>
      <Sidebar mobileOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
        <Header onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
        <main style={{ flex: 1, overflow: 'auto', padding: '24px 20px' }}>
          <DashboardPage />
        </main>
      </div>
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