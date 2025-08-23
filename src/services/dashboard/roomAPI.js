import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Room API functions
export const roomAPI = {
  // Get all rooms for owner
  getOwnerRooms: async (ownerId) => {
    try {
      const response = await api.get(`/rooms/owner/${ownerId}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch rooms')
    }
  },

  // Create new room
  createRoom: async (roomData) => {
    try {
      const response = await api.post('/rooms', roomData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create room')
    }
  },

  // Update room
  updateRoom: async (roomId, updates) => {
    try {
      const response = await api.put(`/rooms/${roomId}`, updates)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update room')
    }
  },

  // Delete room
  deleteRoom: async (roomId) => {
    try {
      await api.delete(`/rooms/${roomId}`)
      return { success: true }
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete room')
    }
  },

  // Upload room images
  uploadImages: async (roomId, images) => {
    try {
      const formData = new FormData()
      images.forEach((image, index) => {
        formData.append(`images`, image.file)
      })

      const response = await api.post(`/rooms/${roomId}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to upload images')
    }
  },

  // Delete room image
  deleteImage: async (roomId, imageId) => {
    try {
      await api.delete(`/rooms/${roomId}/images/${imageId}`)
      return { success: true }
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete image')
    }
  }
}

// Dashboard API functions
export const dashboardAPI = {
  // Get dashboard stats
  getStats: async () => {
    try {
      const response = await api.get('/dashboard/stats')
      return response.data
    } catch (error) {
      // Return mock data for development
      return {
        totalRooms: 12,
        totalBookings: 45,
        monthlyRevenue: 85000,
        pendingRequests: 8,
        occupancyRate: 78,
        recentBookings: [],
        recentPayments: []
      }
    }
  },

  // Get analytics data
  getAnalytics: async (timeframe = 'month') => {
    try {
      const response = await api.get(`/dashboard/analytics?timeframe=${timeframe}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch analytics')
    }
  }
}

export default api
