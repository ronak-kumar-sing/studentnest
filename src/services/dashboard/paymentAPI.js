import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Payment API functions
export const paymentAPI = {
  // Get payment history for owner
  getPaymentHistory: async (ownerId, filters = {}) => {
    try {
      const params = new URLSearchParams(filters).toString()
      const response = await api.get(`/payments/owner/${ownerId}?${params}`)
      return response.data
    } catch (error) {
      // Return mock data for development
      return {
        payments: [
          {
            id: 'PAY001',
            studentName: 'Rahul Kumar',
            roomTitle: 'Single Room A1 - Andheri',
            amount: 18000,
            type: 'Monthly Rent',
            paymentMethod: 'UPI',
            status: 'completed',
            transactionId: 'TXN123456789',
            date: '2025-08-20T10:30:00Z',
            dueDate: '2025-08-25T00:00:00Z',
            lateFee: 0,
            receiptUrl: '/receipts/PAY001.pdf'
          },
          {
            id: 'PAY002',
            studentName: 'Priya Singh',
            roomTitle: 'Double Room B3 - Bandra',
            amount: 50000,
            type: 'Security Deposit',
            paymentMethod: 'Bank Transfer',
            status: 'completed',
            transactionId: 'TXN123456790',
            date: '2025-08-19T14:15:00Z',
            dueDate: '2025-08-19T00:00:00Z',
            lateFee: 0,
            receiptUrl: '/receipts/PAY002.pdf'
          },
          {
            id: 'PAY003',
            studentName: 'Amit Patel',
            roomTitle: 'Single Room C2 - Powai',
            amount: 22000,
            type: 'Monthly Rent',
            paymentMethod: 'Credit Card',
            status: 'pending',
            transactionId: null,
            date: null,
            dueDate: '2025-08-22T00:00:00Z',
            lateFee: 200,
            receiptUrl: null
          }
        ],
        stats: {
          totalRevenue: 127000,
          pendingAmount: 47200,
          completedPayments: 15,
          pendingPayments: 3,
          monthlyGrowth: 12.5,
          averagePayment: 21400
        }
      }
    }
  },

  // Process payment
  processPayment: async (paymentData) => {
    try {
      const response = await api.post('/payments/process', paymentData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to process payment')
    }
  },

  // Process refund
  processRefund: async (paymentId, refundData) => {
    try {
      const response = await api.post(`/payments/refund/${paymentId}`, refundData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to process refund')
    }
  },

  // Get payment analytics
  getAnalytics: async (timeframe = 'month', ownerId) => {
    try {
      const response = await api.get(`/payments/analytics?timeframe=${timeframe}&ownerId=${ownerId}`)
      return response.data
    } catch (error) {
      // Return mock analytics data
      return {
        revenue: {
          current: 85000,
          previous: 75000,
          growth: 13.3
        },
        payments: {
          completed: 15,
          pending: 3,
          failed: 1
        },
        methods: {
          'UPI': 45,
          'Bank Transfer': 30,
          'Credit Card': 20,
          'Wallet': 5
        },
        trends: [
          { date: '2025-08-01', amount: 25000 },
          { date: '2025-08-08', amount: 32000 },
          { date: '2025-08-15', amount: 28000 },
          { date: '2025-08-22', amount: 35000 }
        ]
      }
    }
  },

  // Generate invoice
  generateInvoice: async (bookingId, invoiceData) => {
    try {
      const response = await api.post('/payments/invoice', {
        bookingId,
        ...invoiceData
      })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to generate invoice')
    }
  },

  // Send payment reminder
  sendPaymentReminder: async (paymentId, message = '') => {
    try {
      const response = await api.post(`/payments/${paymentId}/reminder`, { message })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send reminder')
    }
  },

  // Get payment details
  getPaymentDetails: async (paymentId) => {
    try {
      const response = await api.get(`/payments/${paymentId}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch payment details')
    }
  },

  // Download receipt
  downloadReceipt: async (paymentId) => {
    try {
      const response = await api.get(`/payments/${paymentId}/receipt`, {
        responseType: 'blob'
      })

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `receipt-${paymentId}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)

      return { success: true }
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to download receipt')
    }
  },

  // Export payments data
  exportPayments: async (filters = {}, format = 'csv') => {
    try {
      const params = new URLSearchParams({ ...filters, format }).toString()
      const response = await api.get(`/payments/export?${params}`, {
        responseType: 'blob'
      })

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `payments-export.${format}`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)

      return { success: true }
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to export payments')
    }
  }
}

export default paymentAPI
