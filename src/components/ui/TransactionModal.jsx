import { useState, useEffect } from 'react'
import { useApp } from '../../context/AppContext'
import { CATEGORIES } from '../../data/transactions'
import { generateId } from '../../utils/format'

export default function TransactionModal() {
  const { state, dispatch } = useApp()
  const { modal } = state
  const isEdit = modal?.type === 'edit'
  const tx = modal?.tx

  const [form, setForm] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: 'food',
    date: new Date().toISOString().slice(0, 10),
    note: '',
  })

  useEffect(() => {
    if (isEdit && tx) {
      setForm({
        description: tx.description,
        amount: Math.abs(tx.amount).toString(),
        type: tx.type,
        category: tx.category,
        date: tx.date,
        note: tx.note || '',
      })
    } else {
      setForm({
        description: '', amount: '', type: 'expense', category: 'food',
        date: new Date().toISOString().slice(0, 10), note: '',
      })
    }
  }, [modal])

  function close() { dispatch({ type: 'SET_MODAL', payload: null }) }

  function submit() {
    if (!form.description.trim() || !form.amount) return
    const amount = parseFloat(form.amount)
    const finalAmount = form.type === 'expense' ? -Math.abs(amount) : Math.abs(amount)

    if (isEdit) {
      dispatch({ type: 'UPDATE_TRANSACTION', payload: { ...tx, ...form, amount: finalAmount } })
    } else {
      dispatch({ type: 'ADD_TRANSACTION', payload: { id: generateId(), ...form, amount: finalAmount } })
    }
    close()
  }

  if (!modal) return null

  const inputStyle = {
    width: '100%', padding: '9px 11px', borderRadius: 8,
    border: '1px solid var(--color-border)', background: 'var(--color-surface)',
    fontSize: 14, fontFamily: 'var(--font-sans)', color: 'var(--color-ink)',
    outline: 'none', transition: 'border-color 0.15s',
    boxSizing: 'border-box',
  }
  const labelStyle = {
    fontSize: 12, fontWeight: 500, color: 'var(--color-ink-soft)',
    marginBottom: 5, display: 'block', letterSpacing: '0.01em',
  }

  return (
    <div
      className="animate-fade-in"
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(13,15,20,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16,
      }}
      onClick={e => e.target === e.currentTarget && close()}
    >
      <div
        className="card animate-fade-up"
        style={{ width: '100%', maxWidth: 460, padding: '28px', position: 'relative' }}
      >
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22 }}>
            {isEdit ? 'Edit Transaction' : 'Add Transaction'}
          </div>
          <div style={{ fontSize: 13, color: 'var(--color-ink-muted)', marginTop: 2 }}>
            {isEdit ? 'Update the transaction details below' : 'Fill in the details for the new transaction'}
          </div>
        </div>

        {/* Type toggle */}
        <div style={{ marginBottom: 18 }}>
          <span style={labelStyle}>Type</span>
          <div style={{ display: 'flex', gap: 8 }}>
            {['income', 'expense'].map(t => (
              <button
                key={t}
                onClick={() => setForm(f => ({ ...f, type: t }))}
                style={{
                  flex: 1, padding: '8px', borderRadius: 8,
                  border: `1px solid ${form.type === t ? (t === 'income' ? 'var(--color-green)' : 'var(--color-red)') : 'var(--color-border)'}`,
                  background: form.type === t ? (t === 'income' ? 'var(--color-green-soft)' : 'var(--color-red-soft)') : 'transparent',
                  color: form.type === t ? (t === 'income' ? 'var(--color-green)' : 'var(--color-red)') : 'var(--color-ink-muted)',
                  fontWeight: 500, fontSize: 13, cursor: 'pointer',
                  fontFamily: 'var(--font-sans)', textTransform: 'capitalize',
                  transition: 'all 0.15s',
                }}
              >
                {t === 'income' ? '↑ Income' : '↓ Expense'}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Description</label>
            <input
              style={inputStyle}
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="e.g. Monthly Salary, Grocery..."
              onFocus={e => e.target.style.borderColor = 'var(--color-accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
            />
          </div>
          <div>
            <label style={labelStyle}>Amount (₹)</label>
            <input
              style={inputStyle}
              type="number"
              min="0"
              value={form.amount}
              onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
              placeholder="0"
              onFocus={e => e.target.style.borderColor = 'var(--color-accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
            />
          </div>
          <div>
            <label style={labelStyle}>Date</label>
            <input
              style={inputStyle}
              type="date"
              value={form.date}
              onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              onFocus={e => e.target.style.borderColor = 'var(--color-accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
            />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Category</label>
            <select
              style={{ ...inputStyle, cursor: 'pointer' }}
              value={form.category}
              onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              onFocus={e => e.target.style.borderColor = 'var(--color-accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
            >
              {Object.entries(CATEGORIES).map(([k, v]) => (
                <option key={k} value={k}>{v.icon} {v.label}</option>
              ))}
            </select>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Note (optional)</label>
            <input
              style={inputStyle}
              value={form.note}
              onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
              placeholder="Any additional notes..."
              onFocus={e => e.target.style.borderColor = 'var(--color-accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
          <button
            onClick={close}
            style={{
              flex: 1, padding: '10px', borderRadius: 8,
              border: '1px solid var(--color-border)',
              background: 'transparent', color: 'var(--color-ink-soft)',
              fontSize: 14, cursor: 'pointer', fontFamily: 'var(--font-sans)',
              fontWeight: 500, transition: 'all 0.15s',
            }}
          >Cancel</button>
          <button
            onClick={submit}
            disabled={!form.description.trim() || !form.amount}
            style={{
              flex: 2, padding: '10px', borderRadius: 8,
              border: 'none',
              background: (!form.description.trim() || !form.amount) ? 'var(--color-surface-3)' : 'var(--color-accent)',
              color: (!form.description.trim() || !form.amount) ? 'var(--color-ink-muted)' : 'white',
              fontSize: 14, cursor: (!form.description.trim() || !form.amount) ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--font-sans)', fontWeight: 600, transition: 'all 0.15s',
            }}
          >
            {isEdit ? 'Save Changes' : 'Add Transaction'}
          </button>
        </div>
      </div>
    </div>
  )
}
