import { useState, useEffect } from 'react'

export const useSchedules = () => {
  const [schedules, setSchedules] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Mock schedule data - replace with actual API call
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setLoading(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        const mockSchedules = [
          {
            id: 1,
            studentName: 'Rahul Kumar',
            email: 'rahul.kumar@email.com',
            phone: '+91 98765 43210',
            roomTitle: 'Modern Single Room Near Campus',
            roomId: 'room-1',
            roomLocation: 'Sector 15, Gurgaon',
            visitDate: '2025-08-25',
            visitTime: '10:00',
            visitType: 'in-person',
            status: 'upcoming',
            message: 'Looking for a quiet room for studying. Would like to check the internet connectivity.',
            createdAt: '2025-08-23T10:30:00Z',
            studentDetails: {
              university: 'Delhi University',
              year: '3rd Year',
              course: 'Computer Science'
            }
          },
          {
            id: 2,
            studentName: 'Priya Singh',
            email: 'priya.singh@email.com',
            phone: '+91 87654 32109',
            roomTitle: 'Luxury Double Room with AC',
            roomId: 'room-2',
            roomLocation: 'DLF Phase 2, Gurgaon',
            visitDate: '2025-08-24',
            visitTime: '14:00',
            visitType: 'virtual',
            status: 'upcoming',
            message: 'Interested in the room. Can we have a virtual tour first?',
            createdAt: '2025-08-22T15:45:00Z',
            studentDetails: {
              university: 'Jamia Millia Islamia',
              year: '2nd Year',
              course: 'Engineering'
            }
          },
          {
            id: 3,
            studentName: 'Amit Patel',
            email: 'amit.patel@email.com',
            phone: '+91 76543 21098',
            roomTitle: 'Budget Friendly Shared Room',
            roomId: 'room-3',
            roomLocation: 'Sector 14, Gurgaon',
            visitDate: '2025-08-23',
            visitTime: '16:00',
            visitType: 'in-person',
            status: 'completed',
            message: 'Need to check the room condition and nearby facilities.',
            createdAt: '2025-08-21T09:20:00Z',
            studentDetails: {
              university: 'JNU',
              year: '1st Year',
              course: 'Economics'
            }
          },
          {
            id: 4,
            studentName: 'Sneha Sharma',
            email: 'sneha.sharma@email.com',
            phone: '+91 65432 10987',
            roomTitle: 'Premium Studio Apartment',
            roomId: 'room-4',
            roomLocation: 'Cyber City, Gurgaon',
            visitDate: '2025-08-26',
            visitTime: '11:00',
            visitType: 'in-person',
            status: 'upcoming',
            message: 'Looking for a premium room with kitchen facilities.',
            createdAt: '2025-08-23T12:15:00Z',
            studentDetails: {
              university: 'IIIT Delhi',
              year: '4th Year',
              course: 'Information Technology'
            }
          },
          {
            id: 5,
            studentName: 'Vikash Kumar',
            email: 'vikash.kumar@email.com',
            phone: '+91 54321 09876',
            roomTitle: 'Single Room with Balcony',
            roomId: 'room-5',
            roomLocation: 'Sector 10, Gurgaon',
            visitDate: '2025-08-22',
            visitTime: '09:00',
            visitType: 'virtual',
            status: 'cancelled',
            message: 'Change of plans. Will reschedule later.',
            createdAt: '2025-08-20T14:30:00Z',
            studentDetails: {
              university: 'DTU',
              year: '3rd Year',
              course: 'Mechanical Engineering'
            }
          },
          {
            id: 6,
            studentName: 'Ananya Reddy',
            email: 'ananya.reddy@email.com',
            phone: '+91 43210 98765',
            roomTitle: 'Cozy Single Room',
            roomId: 'room-6',
            roomLocation: 'Sector 12, Gurgaon',
            visitDate: '2025-08-27',
            visitTime: '15:30',
            visitType: 'in-person',
            status: 'upcoming',
            message: 'Need a room close to metro station for easy commute.',
            createdAt: '2025-08-23T16:20:00Z',
            studentDetails: {
              university: 'IGDTUW',
              year: '2nd Year',
              course: 'Electronics'
            }
          }
        ]

        setSchedules(mockSchedules)
        setError(null)
      } catch (err) {
        setError('Failed to fetch schedules')
        console.error('Error fetching schedules:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSchedules()
  }, [])

  const updateScheduleStatus = (scheduleId, newStatus) => {
    setSchedules(prevSchedules =>
      prevSchedules.map(schedule =>
        schedule.id === scheduleId
          ? { ...schedule, status: newStatus }
          : schedule
      )
    )
  }

  const deleteSchedule = (scheduleId) => {
    setSchedules(prevSchedules =>
      prevSchedules.filter(schedule => schedule.id !== scheduleId)
    )
  }

  const getSchedulesByStatus = (status) => {
    return schedules.filter(schedule => schedule.status === status)
  }

  const getUpcomingSchedules = () => {
    return schedules.filter(schedule => schedule.status === 'upcoming')
      .sort((a, b) => new Date(a.visitDate) - new Date(b.visitDate))
  }

  const getTodaysSchedules = () => {
    const today = new Date().toISOString().split('T')[0]
    return schedules.filter(schedule =>
      schedule.visitDate === today && schedule.status === 'upcoming'
    )
  }

  const getScheduleStats = () => {
    return {
      total: schedules.length,
      upcoming: schedules.filter(s => s.status === 'upcoming').length,
      completed: schedules.filter(s => s.status === 'completed').length,
      cancelled: schedules.filter(s => s.status === 'cancelled').length,
      today: getTodaysSchedules().length,
      thisWeek: schedules.filter(s => {
        const scheduleDate = new Date(s.visitDate)
        const today = new Date()
        const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
        return scheduleDate >= today && scheduleDate <= weekFromNow && s.status === 'upcoming'
      }).length
    }
  }

  return {
    schedules,
    loading,
    error,
    updateScheduleStatus,
    deleteSchedule,
    getSchedulesByStatus,
    getUpcomingSchedules,
    getTodaysSchedules,
    getScheduleStats
  }
}
