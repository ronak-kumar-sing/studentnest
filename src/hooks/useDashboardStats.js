import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

export const useDashboardStats = () => {
  const [stats, setStats] = useState({
    totalRooms: 0,
    totalBookings: 0,
    monthlyRevenue: 0,
    pendingRequests: 0,
    occupancyRate: 0,
    recentBookings: [],
    recentPayments: []
  })

  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      // This would be replaced with actual API call
      // For now, return mock data
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API delay

      return {
        totalRooms: 12,
        totalBookings: 45,
        monthlyRevenue: 85000,
        pendingRequests: 8,
        occupancyRate: 78,
        recentBookings: [
          { id: 1, student: 'Rahul Kumar', room: 'Single Room A1', status: 'pending', date: '2025-08-20' },
          { id: 2, student: 'Priya Singh', room: 'Double Room B3', status: 'approved', date: '2025-08-19' },
          { id: 3, student: 'Amit Patel', room: 'Single Room C2', status: 'pending', date: '2025-08-18' },
        ],
        recentPayments: [
          { id: 1, amount: 15000, student: 'Rahul Kumar', status: 'completed', date: '2025-08-20' },
          { id: 2, amount: 22000, student: 'Priya Singh', status: 'pending', date: '2025-08-19' },
          { id: 3, amount: 18000, student: 'Amit Patel', status: 'completed', date: '2025-08-18' },
        ]
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3
  })

  useEffect(() => {
    if (data) {
      setStats(data)
    }
  }, [data])

  return {
    stats,
    isLoading,
    error,
    refetch: () => {
      // Refetch logic would go here
    }
  }
}

export const useRoomData = () => {
  const [rooms, setRooms] = useState([])

  const { data, isLoading, error } = useQuery({
    queryKey: ['owner-rooms'],
    queryFn: async () => {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 800))

      return [
        {
          id: 'R001',
          title: 'Single Room A1 - Andheri',
          type: 'Single Room',
          rent: 18000,
          status: 'occupied',
          tenant: 'Rahul Kumar',
          images: ['/api/placeholder/300/200'],
          amenities: ['wifi', 'parking', 'kitchen'],
          location: 'Andheri West, Mumbai'
        },
        {
          id: 'R002',
          title: 'Double Room B3 - Bandra',
          type: 'Double Room',
          rent: 25000,
          status: 'vacant',
          tenant: null,
          images: ['/api/placeholder/300/200'],
          amenities: ['wifi', 'gym', 'security'],
          location: 'Bandra East, Mumbai'
        }
      ]
    }
  })

  useEffect(() => {
    if (data) {
      setRooms(data)
    }
  }, [data])

  const addRoom = async (roomData) => {
    try {
      // Mock API call
      const newRoom = {
        id: `R${Date.now()}`,
        ...roomData,
        status: 'vacant',
        tenant: null,
        createdAt: new Date()
      }

      setRooms(prev => [...prev, newRoom])
      return { success: true, room: newRoom }
    } catch (error) {
      return { success: false, error }
    }
  }

  const updateRoom = async (roomId, updates) => {
    try {
      setRooms(prev =>
        prev.map(room =>
          room.id === roomId ? { ...room, ...updates } : room
        )
      )
      return { success: true }
    } catch (error) {
      return { success: false, error }
    }
  }

  const deleteRoom = async (roomId) => {
    try {
      setRooms(prev => prev.filter(room => room.id !== roomId))
      return { success: true }
    } catch (error) {
      return { success: false, error }
    }
  }

  return {
    rooms,
    isLoading,
    error,
    addRoom,
    updateRoom,
    deleteRoom
  }
}

export const useBookingRequests = () => {
  const [requests, setRequests] = useState([])

  const { data, isLoading, error } = useQuery({
    queryKey: ['booking-requests'],
    queryFn: async () => {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 600))

      return [
        {
          id: 1,
          studentName: 'Rahul Kumar',
          email: 'rahul.kumar@gmail.com',
          phone: '+91 98765 43210',
          roomId: 'R001',
          roomTitle: 'Single Room A1 - Andheri',
          status: 'pending',
          requestDate: '2025-08-20T10:30:00Z',
          moveInDate: '2025-09-01',
          message: 'Looking for a clean and peaceful room for studying.'
        }
      ]
    }
  })

  useEffect(() => {
    if (data) {
      setRequests(data)
    }
  }, [data])

  const approveRequest = async (requestId) => {
    try {
      setRequests(prev =>
        prev.map(req =>
          req.id === requestId ? { ...req, status: 'approved' } : req
        )
      )
      return { success: true }
    } catch (error) {
      return { success: false, error }
    }
  }

  const declineRequest = async (requestId) => {
    try {
      setRequests(prev =>
        prev.map(req =>
          req.id === requestId ? { ...req, status: 'declined' } : req
        )
      )
      return { success: true }
    } catch (error) {
      return { success: false, error }
    }
  }

  return {
    requests,
    isLoading,
    error,
    approveRequest,
    declineRequest
  }
}

export const usePayments = () => {
  const [payments, setPayments] = useState([])

  const { data, isLoading, error } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 700))

      return [
        {
          id: 'PAY001',
          studentName: 'Rahul Kumar',
          amount: 18000,
          type: 'Monthly Rent',
          status: 'completed',
          date: '2025-08-20T10:30:00Z',
          transactionId: 'TXN123456789'
        }
      ]
    }
  })

  useEffect(() => {
    if (data) {
      setPayments(data)
    }
  }, [data])

  const processPayment = async (paymentData) => {
    try {
      const newPayment = {
        id: `PAY${Date.now()}`,
        ...paymentData,
        status: 'processing',
        date: new Date()
      }

      setPayments(prev => [...prev, newPayment])

      // Simulate processing delay
      setTimeout(() => {
        setPayments(prev =>
          prev.map(payment =>
            payment.id === newPayment.id
              ? { ...payment, status: 'completed', transactionId: `TXN${Date.now()}` }
              : payment
          )
        )
      }, 3000)

      return { success: true, payment: newPayment }
    } catch (error) {
      return { success: false, error }
    }
  }

  const processRefund = async (paymentId, amount) => {
    try {
      // Mock refund logic
      setPayments(prev =>
        prev.map(payment =>
          payment.id === paymentId
            ? { ...payment, status: 'refunded', refundAmount: amount }
            : payment
        )
      )
      return { success: true }
    } catch (error) {
      return { success: false, error }
    }
  }

  return {
    payments,
    isLoading,
    error,
    processPayment,
    processRefund
  }
}
