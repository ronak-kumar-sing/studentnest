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

// Booking API functions
export const bookingAPI = {
  // Get all booking requests for owner
  getBookingRequests: async (ownerId) => {
    try {
      const response = await api.get(`/bookings/requests/${ownerId}`)
      return response.data
    } catch (error) {
      // Return mock data for development
      return [
        {
          id: 1,
          studentName: 'Rahul Kumar',
          email: 'rahul.kumar@gmail.com',
          phone: '+91 98765 43210',
          profileImage: '/api/placeholder/100/100',
          age: 21,
          occupation: 'Student',
          college: 'Mumbai University',
          course: 'B.Tech Computer Science',
          roomId: 'R001',
          roomTitle: 'Single Room A1 - Andheri',
          roomType: 'Single Room',
          requestDate: '2025-08-20T10:30:00Z',
          moveInDate: '2025-09-01',
          duration: '12 months',
          status: 'pending',
          monthlyBudget: 18000,
          securityDeposit: 36000,
          message: 'Hi, I am a final year engineering student looking for a clean and peaceful room near my college.',
          documents: {
            idProof: true,
            collegeId: true,
            parentConsent: true
          },
          preferences: {
            vegetarian: true,
            nonSmoker: true,
            quiet: true
          },
          rating: 4.8,
          previousStays: 2
        }
      ]
    }
  },

  // Approve booking request
  approveRequest: async (requestId) => {
    try {
      const response = await api.put(`/bookings/${requestId}/approve`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to approve request')
    }
  },

  // Decline booking request
  declineRequest: async (requestId, reason = '') => {
    try {
      const response = await api.put(`/bookings/${requestId}/decline`, { reason })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to decline request')
    }
  },

  // Send message to student
  sendMessage: async (requestId, message) => {
    try {
      const response = await api.post(`/bookings/${requestId}/message`, { message })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send message')
    }
  },

  // Get booking calendar data
  getCalendarData: async (roomId = null) => {
    try {
      const url = roomId ? `/bookings/calendar?roomId=${roomId}` : '/bookings/calendar'
      const response = await api.get(url)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch calendar data')
    }
  },

  // Cancel booking
  cancelBooking: async (bookingId, reason = '') => {
    try {
      const response = await api.post(`/bookings/${bookingId}/cancel`, { reason })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to cancel booking')
    }
  },

  // Get booking details
  getBookingDetails: async (bookingId) => {
    try {
      const response = await api.get(`/bookings/${bookingId}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch booking details')
    }
  },

  // Update booking status
  updateBookingStatus: async (bookingId, status, notes = '') => {
    try {
      const response = await api.put(`/bookings/${bookingId}/status`, { status, notes })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update booking status')
    }
  }
}

export default bookingAPI
