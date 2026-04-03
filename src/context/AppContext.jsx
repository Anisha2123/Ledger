import { createContext, useContext, useReducer, useEffect, useMemo } from 'react'
import { TRANSACTIONS } from '../data/transactions'

const AppContext = createContext(null)

const DATA_VERSION = '2025-2026' // Update this when transactions data changes

const initialState = {
  transactions: (() => {
    const storedVersion = localStorage.getItem('fd_data_version')
    const storedTransactions = JSON.parse(localStorage.getItem('fd_transactions') || 'null')
    
    // If version doesn't match or no stored data, use fresh data
    if (storedVersion !== DATA_VERSION || !storedTransactions) {
      localStorage.setItem('fd_data_version', DATA_VERSION)
      return TRANSACTIONS
    }
    
    return storedTransactions
  })(),
  role: localStorage.getItem('fd_role') || 'viewer',
  activeTab: 'dashboard',
  darkMode: localStorage.getItem('fd_darkMode') === 'true' || false,
  filters: {
    search: '',
    type: 'all',
    category: 'all',
    month: 'all',
    sortBy: 'date',
    sortDir: 'desc',
  },
  modal: null, // { type: 'add' | 'edit', tx?: {} }
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ROLE':
      return { ...state, role: action.payload }
    case 'SET_TAB':
      return { ...state, activeTab: action.payload }
    case 'SET_FILTER':
      return { ...state, filters: { ...state.filters, ...action.payload } }
    case 'RESET_FILTERS':
      return { ...state, filters: { ...initialState.filters } }
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] }
    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(t => t.id === action.payload.id ? action.payload : t)
      }
    case 'DELETE_TRANSACTION':
      return { ...state, transactions: state.transactions.filter(t => t.id !== action.payload) }
    case 'SET_MODAL':
      return { ...state, modal: action.payload }
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode }
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Apply dark mode on mount and when it changes
  useEffect(() => {
    const html = document.documentElement
    if (state.darkMode) {
      html.classList.add('dark-mode')
      html.classList.remove('light-mode')
    } else {
      html.classList.remove('dark-mode')
      html.classList.add('light-mode')
    }
    localStorage.setItem('fd_darkMode', state.darkMode)
  }, [state.darkMode])

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('fd_transactions', JSON.stringify(state.transactions))
  }, [state.transactions])

  useEffect(() => {
    localStorage.setItem('fd_role', state.role)
  }, [state.role])

  const filteredTransactions = useMemo(() => {
    let txs = [...state.transactions]
    const { search, type, category, month, sortBy, sortDir } = state.filters

    if (search) {
      const q = search.toLowerCase()
      txs = txs.filter(t =>
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      )
    }
    if (type !== 'all') txs = txs.filter(t => t.type === type)
    if (category !== 'all') txs = txs.filter(t => t.category === category)
    if (month !== 'all') {
      txs = txs.filter(t => {
        const d = new Date(t.date)
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}` === month
      })
    }

    txs.sort((a, b) => {
      let va, vb
      if (sortBy === 'date') {
        va = new Date(a.date); vb = new Date(b.date)
      } else if (sortBy === 'amount') {
        va = Math.abs(a.amount); vb = Math.abs(b.amount)
      } else {
        va = a.description; vb = b.description
      }
      if (va < vb) return sortDir === 'asc' ? -1 : 1
      if (va > vb) return sortDir === 'asc' ? 1 : -1
      return 0
    })

    return txs
  }, [state.transactions, state.filters])

  return (
    <AppContext.Provider value={{ state, dispatch, filteredTransactions }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
