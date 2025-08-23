import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  Video,
  Home,
  Check,
  X,
  MessageSquare,
  Eye,
  Edit,
  MoreHorizontal,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { useSchedules } from '../../hooks/useSchedules'

const ScheduleList = ({ compact = false, maxItems = 5 }) => {
  const {
    schedules,
    loading,
    error,
    updateScheduleStatus,
    getUpcomingSchedules,
    getTodaysSchedules
  } = useSchedules()

  const [filteredSchedules, setFilteredSchedules] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedSchedule, setSelectedSchedule] = useState(null)
  const [showDetails, setShowDetails] = useState(false)

  const itemsPerPage = compact ? maxItems : 5

  // Filter and search functionality
  useEffect(() => {
    let filtered = schedules

    if (compact) {
      // For compact mode, show only upcoming schedules
      filtered = getUpcomingSchedules().slice(0, maxItems)
    } else {
      // Apply search filter
      if (searchTerm) {
        filtered = filtered.filter(schedule =>
          schedule.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          schedule.roomTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          schedule.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }

      // Apply status filter
      if (filterStatus !== 'all') {
        filtered = filtered.filter(schedule => schedule.status === filterStatus)
      }

      // Apply type filter
      if (filterType !== 'all') {
        filtered = filtered.filter(schedule => schedule.visitType === filterType)
      }
    }

    setFilteredSchedules(filtered)
    setCurrentPage(1)
  }, [schedules, searchTerm, filterStatus, filterType, compact, maxItems])

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'completed':
        return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'cancelled':
        return 'bg-red-500/20 text-red-300 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <Check className="w-4 h-4" />
      case 'cancelled':
        return <X className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  const formatTime = (time) => {
    return new Date(`1970-01-01T${time}:00`).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const handleStatusChange = (scheduleId, newStatus) => {
    updateScheduleStatus(scheduleId, newStatus)
  }

  // Pagination
  const totalPages = Math.ceil(filteredSchedules.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentSchedules = compact ? filteredSchedules : filteredSchedules.slice(startIndex, endIndex)

  const ScheduleDetailsModal = ({ schedule, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-white">Schedule Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white/70" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Student Info */}
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Student Information</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-white/70" />
                <span className="text-white">{schedule.studentName}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-white/70" />
                <span className="text-white">{schedule.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-white/70" />
                <span className="text-white">{schedule.phone}</span>
              </div>
            </div>
          </div>

          {/* Visit Info */}
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Visit Information</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-white/70" />
                <span className="text-white">{formatDate(schedule.visitDate)}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-white/70" />
                <span className="text-white">{formatTime(schedule.visitTime)}</span>
              </div>
              <div className="flex items-center gap-3">
                {schedule.visitType === 'virtual' ? (
                  <Video className="w-5 h-5 text-white/70" />
                ) : (
                  <Home className="w-5 h-5 text-white/70" />
                )}
                <span className="text-white capitalize">{schedule.visitType} Visit</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-white/70" />
                <span className="text-white">{schedule.roomLocation}</span>
              </div>
            </div>
          </div>

          {/* Room Info */}
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Room Information</h3>
            <p className="text-white">{schedule.roomTitle}</p>
          </div>

          {/* Message */}
          {schedule.message && (
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Student Message</h3>
              <p className="text-white/80">{schedule.message}</p>
            </div>
          )}

          {/* Status Update */}
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Update Status</h3>
            <div className="flex gap-2">
              <button
                onClick={() => handleStatusChange(schedule.id, 'upcoming')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${schedule.status === 'upcoming'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
              >
                Mark as Upcoming
              </button>
              <button
                onClick={() => handleStatusChange(schedule.id, 'completed')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${schedule.status === 'completed'
                    ? 'bg-green-600 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
              >
                Mark as Completed
              </button>
              <button
                onClick={() => handleStatusChange(schedule.id, 'cancelled')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${schedule.status === 'cancelled'
                    ? 'bg-red-600 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
              >
                Mark as Cancelled
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-white/20 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-white/10 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
        <div className="text-center py-8">
          <p className="text-red-300 mb-2">Error loading schedules</p>
          <p className="text-sm text-white/70">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">
              {compact ? 'Upcoming Visits' : 'Visit Schedules'}
            </h3>
            <p className="text-sm text-white/70 mt-1">
              {compact
                ? 'Next scheduled property visits'
                : 'Manage upcoming and past property visits'
              }
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/70">
              {filteredSchedules.length} schedules
            </span>
            {compact && filteredSchedules.length > maxItems && (
              <Link
                to="/dashboard/schedules"
                className="text-blue-400 hover:text-blue-300 font-medium text-sm"
              >
                View All
              </Link>
            )}
          </div>
        </div>

        {/* Filters and Search - Only show in full mode */}
        {!compact && (
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                <input
                  type="text"
                  placeholder="Search by student name, room, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
              >
                <option value="all">All Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
              >
                <option value="all">All Types</option>
                <option value="in-person">In-Person</option>
                <option value="virtual">Virtual</option>
              </select>
            </div>
          </div>
        )}

        {/* Schedule List */}
        <div className="space-y-3 mb-6">
          {currentSchedules.length > 0 ? (
            currentSchedules.map((schedule, index) => (
              <motion.div
                key={schedule.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-white/70" />
                        <span className="font-medium text-white">
                          {schedule.studentName}
                        </span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(schedule.status)}`}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(schedule.status)}
                          {schedule.status}
                        </div>
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${schedule.visitType === 'virtual'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                        }`}>
                        <div className="flex items-center gap-1">
                          {schedule.visitType === 'virtual' ? (
                            <Video className="w-3 h-3" />
                          ) : (
                            <Home className="w-3 h-3" />
                          )}
                          {schedule.visitType}
                        </div>
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-white/70">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(schedule.visitDate)} at {formatTime(schedule.visitTime)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span className="truncate">{schedule.roomTitle}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>{schedule.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => {
                        setSelectedSchedule(schedule)
                        setShowDetails(true)
                      }}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4 text-white/70" />
                    </button>
                    <button
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      title="Send Message"
                    >
                      <MessageSquare className="w-4 h-4 text-white/70" />
                    </button>
                    <button
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      title="More Options"
                    >
                      <MoreHorizontal className="w-4 h-4 text-white/70" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-white/30 mx-auto mb-4" />
              <p className="text-white/70">No schedules found</p>
              <p className="text-sm text-white/50 mt-1">
                {searchTerm || filterStatus !== 'all' || filterType !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Visit schedules will appear here once students book appointments'
                }
              </p>
            </div>
          )}
        </div>

        {/* Pagination - Only show in full mode */}
        {!compact && totalPages > 1 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-white/70">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredSchedules.length)} of {filteredSchedules.length} schedules
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-white/70" />
              </button>
              <span className="text-sm text-white/70 px-3">
                {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-white/70" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Schedule Details Modal */}
      {showDetails && selectedSchedule && (
        <ScheduleDetailsModal
          schedule={selectedSchedule}
          onClose={() => {
            setShowDetails(false)
            setSelectedSchedule(null)
          }}
        />
      )}
    </>
  )
}

export default ScheduleList
