import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Search,
  Filter,
  Calendar,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Check,
  X,
  Clock,
  User,
  GraduationCap,
  Briefcase,
  Home,
  Star,
  Eye,
  ChevronDown
} from 'lucide-react'

const BookingRequests = () => {
  const [requests, setRequests] = useState([])
  const [filteredRequests, setFilteredRequests] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [roomFilter, setRoomFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)

  // Mock data - replace with API call
  const mockRequests = [
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
      message: 'Hi, I am a final year engineering student looking for a clean and peaceful room near my college. I am very serious about my studies and maintain cleanliness.',
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
    },
    {
      id: 2,
      studentName: 'Priya Singh',
      email: 'priya.singh@outlook.com',
      phone: '+91 87654 32109',
      profileImage: '/api/placeholder/100/100',
      age: 22,
      occupation: 'Professional',
      company: 'TCS',
      designation: 'Software Developer',
      roomId: 'R003',
      roomTitle: 'Double Room B3 - Bandra',
      roomType: 'Double Room',
      requestDate: '2025-08-19T14:15:00Z',
      moveInDate: '2025-09-15',
      duration: '6 months',
      status: 'approved',
      monthlyBudget: 25000,
      securityDeposit: 50000,
      message: 'Hello! I am a working professional at TCS, looking for a comfortable accommodation. I have excellent references from my previous landlords.',
      documents: {
        idProof: true,
        salarySlip: true,
        companyId: true
      },
      preferences: {
        vegetarian: false,
        nonSmoker: true,
        socializing: true
      },
      rating: 4.9,
      previousStays: 3
    },
    {
      id: 3,
      studentName: 'Amit Patel',
      email: 'amit.patel@yahoo.com',
      phone: '+91 76543 21098',
      profileImage: '/api/placeholder/100/100',
      age: 20,
      occupation: 'Student',
      college: 'IIT Bombay',
      course: 'M.Tech Data Science',
      roomId: 'R002',
      roomTitle: 'Single Room C2 - Powai',
      roomType: 'Single Room',
      requestDate: '2025-08-18T09:45:00Z',
      moveInDate: '2025-08-25',
      duration: '24 months',
      status: 'declined',
      monthlyBudget: 22000,
      securityDeposit: 44000,
      message: 'I am pursuing my Masters at IIT Bombay. I need a room close to campus with good study environment and reliable internet.',
      documents: {
        idProof: true,
        collegeId: true,
        parentConsent: true,
        academicRecords: true
      },
      preferences: {
        vegetarian: true,
        nonSmoker: true,
        studious: true
      },
      rating: 4.7,
      previousStays: 1
    }
  ]

  useEffect(() => {
    setRequests(mockRequests)
    setFilteredRequests(mockRequests)
  }, [])

  useEffect(() => {
    let filtered = requests

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(request =>
        request.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.roomTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.college?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.company?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(request => request.status === statusFilter)
    }

    // Room filter
    if (roomFilter !== 'all') {
      filtered = filtered.filter(request => request.roomType.toLowerCase().includes(roomFilter))
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.requestDate) - new Date(a.requestDate)
        case 'oldest':
          return new Date(a.requestDate) - new Date(b.requestDate)
        case 'budget-high':
          return b.monthlyBudget - a.monthlyBudget
        case 'budget-low':
          return a.monthlyBudget - b.monthlyBudget
        default:
          return 0
      }
    })

    setFilteredRequests(filtered)
  }, [requests, searchTerm, statusFilter, roomFilter, sortBy])

  const handleApprove = (requestId) => {
    setRequests(prev =>
      prev.map(req =>
        req.id === requestId ? { ...req, status: 'approved' } : req
      )
    )
  }

  const handleDecline = (requestId) => {
    setRequests(prev =>
      prev.map(req =>
        req.id === requestId ? { ...req, status: 'declined' } : req
      )
    )
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-200 border border-yellow-400/30'
      case 'approved':
        return 'bg-green-500/20 text-green-200 border border-green-400/30'
      case 'declined':
        return 'bg-red-500/20 text-red-200 border border-red-400/30'
      default:
        return 'bg-white/20 backdrop-blur-sm text-white border border-white/30'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />
      case 'approved':
        return <Check className="w-4 h-4" />
      case 'declined':
        return <X className="w-4 h-4" />
      default:
        return null
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-transparent">
      {/* Header */}
      <div className="bg-transparent backdrop-blur-3xl border-b border-white/10 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center gap-4">
              <Link
                to="/dashboard"
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-white/70" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">Booking Requests</h1>
                <p className="text-white/70">
                  {filteredRequests.length} of {requests.length} requests
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-6 bg-transparent backdrop-blur-md border border-white/20 rounded-lg p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-3.5 text-white/50" />
              <input
                type="text"
                placeholder="Search by student name, room, college, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-transparent border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-white/50"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-3 bg-transparent border border-white/30 rounded-lg hover:bg-white/10 transition-colors text-white"
            >
              <Filter className="w-5 h-5" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {/* Quick Filters - Desktop */}
            <div className="hidden lg:flex gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 bg-transparent border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white"
              >
                <option value="all" className="bg-black text-white">All Status</option>
                <option value="pending" className="bg-black text-white">Pending</option>
                <option value="approved" className="bg-black text-white">Approved</option>
                <option value="declined" className="bg-black text-white">Declined</option>
              </select>

              <select
                value={roomFilter}
                onChange={(e) => setRoomFilter(e.target.value)}
                className="px-4 py-3 bg-transparent border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white"
              >
                <option value="all" className="bg-black text-white">All Rooms</option>
                <option value="single" className="bg-black text-white">Single Room</option>
                <option value="double" className="bg-black text-white">Double Room</option>
                <option value="shared" className="bg-black text-white">Shared Room</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-transparent border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white"
              >
                <option value="newest" className="bg-black text-white">Newest First</option>
                <option value="oldest" className="bg-black text-white">Oldest First</option>
                <option value="budget-high" className="bg-black text-white">Budget: High to Low</option>
                <option value="budget-low" className="bg-black text-white">Budget: Low to High</option>
              </select>
            </div>
          </div>

          {/* Mobile Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden mt-4 pt-4 border-t border-white/20"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-3 bg-transparent border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white"
                  >
                    <option value="all" className="bg-black text-white">All Status</option>
                    <option value="pending" className="bg-black text-white">Pending</option>
                    <option value="approved" className="bg-black text-white">Approved</option>
                    <option value="declined" className="bg-black text-white">Declined</option>
                  </select>

                  <select
                    value={roomFilter}
                    onChange={(e) => setRoomFilter(e.target.value)}
                    className="px-4 py-3 bg-transparent border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white"
                  >
                    <option value="all" className="bg-black text-white">All Rooms</option>
                    <option value="single" className="bg-black text-white">Single Room</option>
                    <option value="double" className="bg-black text-white">Double Room</option>
                    <option value="shared" className="bg-black text-white">Shared Room</option>
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 bg-transparent border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white"
                  >
                    <option value="newest" className="bg-black text-white">Newest First</option>
                    <option value="oldest" className="bg-black text-white">Oldest First</option>
                    <option value="budget-high" className="bg-black text-white">Budget: High to Low</option>
                    <option value="budget-low" className="bg-black text-white">Budget: Low to High</option>
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Requests List */}
        {filteredRequests.length === 0 ? (
          <div className="text-center py-12 bg-transparent backdrop-blur-md border border-white/20 rounded-lg shadow-sm">
            <Calendar className="w-12 h-12 text-white/50 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No requests found</h3>
            <p className="text-white/70">
              {searchTerm || statusFilter !== 'all' || roomFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'No booking requests yet'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRequests.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-transparent backdrop-blur-3xl border border-white/20 rounded-lg shadow-sm overflow-hidden hover:shadow-md hover:border-white/30 transition-all"
              >
                <div className="p-6  backdrop-blur-3xl bg-white/5">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Student Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4 mb-4">
                        <img
                          src={request.profileImage}
                          alt={request.studentName}
                          className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-white">
                              {request.studentName}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(request.status)}`}>
                              {getStatusIcon(request.status)}
                              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-white/70 mb-2">
                            <span className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              Age {request.age}
                            </span>
                            <span className="flex items-center gap-1">
                              {request.occupation === 'Student' ? (
                                <GraduationCap className="w-4 h-4" />
                              ) : (
                                <Briefcase className="w-4 h-4" />
                              )}
                              {request.occupation}
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              {request.rating}
                            </span>
                          </div>
                          <div className="text-sm text-white/70">
                            {request.college && (
                              <p>{request.course} at {request.college}</p>
                            )}
                            {request.company && (
                              <p>{request.designation} at {request.company}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Room Details */}
                      <div className="bg-white/5 border border-white/10 p-4 rounded-lg mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Home className="w-4 h-4 text-white/60" />
                          <span className="font-medium text-white">{request.roomTitle}</span>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-white/70">Move-in:</span>
                            <p className="font-medium text-white">{new Date(request.moveInDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <span className="text-white/70">Duration:</span>
                            <p className="font-medium text-white">{request.duration}</p>
                          </div>
                          <div>
                            <span className="text-white/70">Budget:</span>
                            <p className="font-medium text-white">₹{request.monthlyBudget.toLocaleString()}/mo</p>
                          </div>
                          <div>
                            <span className="text-white/70">Requested:</span>
                            <p className="font-medium text-white">{formatDate(request.requestDate)}</p>
                          </div>
                        </div>
                      </div>

                      {/* Message */}
                      {request.message && (
                        <div className="mb-4">
                          <p className="text-sm text-white/90 bg-blue-500/10 backdrop-blur-sm border border-blue-400/20 p-3 rounded-lg">
                            "{request.message}"
                          </p>
                        </div>
                      )}

                      {/* Preferences */}
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(request.preferences).map(([key, value]) =>
                          value && (
                            <span
                              key={key}
                              className="px-2 py-1 bg-green-500/20 text-green-200 border border-green-400/30 text-xs rounded-full font-medium"
                            >
                              {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="lg:w-64 space-y-3">
                      <div className="flex lg:flex-col gap-2">
                        <button
                          onClick={() => setSelectedRequest(request)}
                          className="flex-1 lg:w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-200 border border-blue-400/30 rounded-lg hover:bg-blue-500/30 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                        <button className="flex-1 lg:w-full flex items-center justify-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-lg hover:bg-white/20 transition-colors">
                          <MessageSquare className="w-4 h-4" />
                          Message
                        </button>
                      </div>

                      <div className="flex lg:flex-col gap-2">
                        <a
                          href={`tel:${request.phone}`}
                          className="flex-1 lg:w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-500/20 text-green-200 border border-green-400/30 rounded-lg hover:bg-green-500/30 transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                          Call
                        </a>
                        <a
                          href={`mailto:${request.email}`}
                          className="flex-1 lg:w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-200 border border-purple-400/30 rounded-lg hover:bg-purple-500/30 transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          Email
                        </a>
                      </div>

                      {request.status === 'pending' && (
                        <div className="flex lg:flex-col gap-2 pt-2 border-t border-white/20">
                          <button
                            onClick={() => handleApprove(request.id)}
                            className="flex-1 lg:w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600/80 text-white rounded-lg hover:bg-green-600 transition-colors"
                          >
                            <Check className="w-4 h-4" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleDecline(request.id)}
                            className="flex-1 lg:w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600/80 text-white rounded-lg hover:bg-red-600 transition-colors"
                          >
                            <X className="w-4 h-4" />
                            Decline
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Request Details Modal */}
      <AnimatePresence>
        {selectedRequest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedRequest(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-black/80 backdrop-blur-md border border-white/20 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Request Details</h2>
                  <button
                    onClick={() => setSelectedRequest(null)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Detailed view content would go here */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedRequest.profileImage}
                      alt={selectedRequest.studentName}
                      className="w-20 h-20 rounded-full object-cover border-2 border-white/20"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {selectedRequest.studentName}
                      </h3>
                      <p className="text-white/70">
                        {selectedRequest.college || selectedRequest.company}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-white">{selectedRequest.rating}</span>
                        <span className="text-sm text-white/60">
                          ({selectedRequest.previousStays} previous stays)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <h4 className="font-medium text-white mb-2">Documents Submitted</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(selectedRequest.documents).map(([doc, submitted]) => (
                        <div key={doc} className="flex items-center gap-2">
                          {submitted ? (
                            <Check className="w-4 h-4 text-green-400" />
                          ) : (
                            <X className="w-4 h-4 text-red-400" />
                          )}
                          <span className={`text-sm ${submitted ? 'text-green-200' : 'text-red-200'}`}>
                            {doc.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-2">Complete Message</h4>
                    <p className="text-white/90 bg-blue-500/10 border border-blue-400/20 p-4 rounded-lg">
                      {selectedRequest.message}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default BookingRequests
