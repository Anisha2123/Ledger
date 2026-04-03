// Mock API service for simulating backend calls
// In a real app, these would make actual HTTP requests

const API_DELAY = 300 // Simulate network delay

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const api = {
  // Transactions
  async getTransactions() {
    await delay(API_DELAY)
    return { success: true, data: [] }
  },

  async addTransaction(transaction) {
    await delay(API_DELAY)
    return { success: true, data: transaction }
  },

  async updateTransaction(id, transaction) {
    await delay(API_DELAY)
    return { success: true, data: { id, ...transaction } }
  },

  async deleteTransaction(id) {
    await delay(API_DELAY)
    return { success: true, data: { id } }
  },

  // Analytics
  async getAnalytics() {
    await delay(API_DELAY)
    return {
      success: true,
      data: {
        totalIncome: 0,
        totalExpenses: 0,
        balance: 0,
        savingsRate: 0,
      }
    }
  },

  // Export
  async exportTransactions(format = 'csv') {
    await delay(API_DELAY)
    return { success: true, data: { format, timestamp: new Date().toISOString() } }
  },

  // User
  async getUser() {
    await delay(API_DELAY)
    return {
      success: true,
      data: {
        id: 'user-1',
        role: 'viewer',
        name: 'User',
      }
    }
  },

  async updateUserRole(role) {
    await delay(API_DELAY)
    return { success: true, data: { role } }
  },
}
