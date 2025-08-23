import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  MapPin,
  Home,
  Star,
  Calendar,
  Users,
  DollarSign,
  Settings,
  Save,
  X,
  Plus,
  Camera
} from 'lucide-react'
import { getAmenitiesByCategory } from '../../utils/constants'
import ImageUpload from '../../components/dashboard/ImageUpload'
import Toast from '../../components/Toast'

const RoomModification = () => {
  const [rooms, setRooms] = useState([])
  const [filteredRooms, setFilteredRooms] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editFormData, setEditFormData] = useState({})
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' })

  const showToast = (message, type = 'success', duration = 3000) => {
    setToast({ isVisible: true, message, type })
    setTimeout(() => {
      setToast({ isVisible: false, message: '', type: 'success' })
    }, duration)
  }

  // Mock data - in a real app, this would come from your API
  const mockRooms = [
    {
      id: 'R001',
      title: 'Single Room A1 - Andheri',
      description: 'Spacious single room with modern amenities',
      roomType: 'single',
      size: 120,
      monthlyRent: 18000,
      securityDeposit: 36000,
      maintenanceCharges: 2000,
      address: '123 Main Street, Andheri West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400058',
      amenities: ['wifi', 'parking', 'security', 'power-backup'],
      images: ['/api/placeholder/300/200', '/api/placeholder/300/200'],
      status: 'available',
      furnished: 'fully-furnished',
      floor: 3,
      totalFloors: 5,
      availableFrom: '2025-09-01',
      preferredTenant: 'students',
      roomRules: 'No smoking, No parties',
      isActive: true,
      createdAt: '2025-08-15',
      views: 45,
      bookings: 3
    },
    {
      id: 'R002',
      title: 'Double Room B2 - Bandra',
      description: 'Comfortable double occupancy room near station',
      roomType: 'double',
      size: 150,
      monthlyRent: 25000,
      securityDeposit: 50000,
      maintenanceCharges: 2500,
      address: '456 Link Road, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050',
      amenities: ['wifi', 'ac', 'laundry', 'gym'],
      images: ['/api/placeholder/300/200'],
      status: 'occupied',
      furnished: 'semi-furnished',
      floor: 2,
      totalFloors: 4,
      availableFrom: '2025-10-01',
      preferredTenant: 'professionals',
      roomRules: 'No smoking, Visitors allowed till 10 PM',
      isActive: true,
      createdAt: '2025-08-10',
      views: 72,
      bookings: 8
    },
    {
      id: 'R003',
      title: 'Studio Apartment - Powai',
      description: 'Modern studio apartment with all amenities',
      roomType: 'studio',
      size: 180,
      monthlyRent: 32000,
      securityDeposit: 64000,
      maintenanceCharges: 3000,
      address: '789 Hiranandani Gardens, Powai',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400076',
      amenities: ['wifi', 'ac', 'parking', 'gym', 'swimming'],
      images: ['/api/placeholder/300/200', '/api/placeholder/300/200', '/api/placeholder/300/200'],
      status: 'available',
      furnished: 'fully-furnished',
      floor: 5,
      totalFloors: 10,
      availableFrom: '2025-08-25',
      preferredTenant: 'any',
      roomRules: 'No smoking, No pets',
      isActive: false,
      createdAt: '2025-08-05',
      views: 28,
      bookings: 1
    }
  ]

  useEffect(() => {
    setRooms(mockRooms)
    setFilteredRooms(mockRooms)
  }, [])

  useEffect(() => {
    let filtered = rooms

    if (searchTerm) {
      filtered = filtered.filter(room =>
        room.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.city.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      if (statusFilter === 'active') {
        filtered = filtered.filter(room => room.isActive)
      } else if (statusFilter === 'inactive') {
        filtered = filtered.filter(room => !room.isActive)
      } else {
        filtered = filtered.filter(room => room.status === statusFilter)
      }
    }

    setFilteredRooms(filtered)
  }, [searchTerm, statusFilter, rooms])

  const getStatusColor = (status, isActive) => {
    if (!isActive) return 'bg-gray-500/20 text-gray-300 border border-gray-400/30'

    switch (status) {
      case 'available':
        return 'bg-green-500/20 text-green-300 border border-green-400/30'
      case 'occupied':
        return 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
      case 'maintenance':
        return 'bg-orange-500/20 text-orange-300 border border-orange-400/30'
      default:
        return 'bg-gray-500/20 text-gray-300 border border-gray-400/30'
    }
  }

  const getStatusIcon = (status, isActive) => {
    if (!isActive) return <EyeOff className="w-4 h-4" />

    switch (status) {
      case 'available':
        return <Home className="w-4 h-4" />
      case 'occupied':
        return <Users className="w-4 h-4" />
      case 'maintenance':
        return <Settings className="w-4 h-4" />
      default:
        return <Home className="w-4 h-4" />
    }
  }

  const handleEdit = (room) => {
    setSelectedRoom(room)
    setEditFormData({
      ...room,
      amenities: room.amenities || []
    })
    setShowEditModal(true)
  }

  const handleDelete = async (roomId) => {
    if (confirm('Are you sure you want to delete this room? This action cannot be undone.')) {
      setRooms(rooms.filter(room => room.id !== roomId))
    }
  }

  const toggleRoomStatus = async (roomId) => {
    setRooms(rooms.map(room =>
      room.id === roomId
        ? { ...room, isActive: !room.isActive }
        : room
    ))
  }

  const handleSaveChanges = async () => {
    try {
      const originalRoom = rooms.find(room => room.id === selectedRoom.id)
      const photosChanged = JSON.stringify(originalRoom.images) !== JSON.stringify(editFormData.images)

      setRooms(rooms.map(room =>
        room.id === selectedRoom.id
          ? { ...editFormData }
          : room
      ))

      setShowEditModal(false)
      setSelectedRoom(null)
      setEditFormData({})

      if (photosChanged) {
        showToast('Room photos updated successfully!', 'success')
      } else {
        showToast('Room details updated successfully!', 'success')
      }
    } catch (error) {
      showToast('Failed to update room details. Please try again.', 'error')
    }
  }

  const handleInputChange = (field, value) => {
    setEditFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAmenityToggle = (amenityId) => {
    setEditFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(id => id !== amenityId)
        : [...prev.amenities, amenityId]
    }))
  }

  const handleImagesChange = (newImages) => {
    setEditFormData(prev => ({ ...prev, images: newImages }))
    if (newImages.length > (editFormData.images?.length || 0)) {
      showToast(`${newImages.length} photos selected`, 'info', 2000)
    }
  }

  const amenitiesCategories = getAmenitiesByCategory()

  return (
    <div className="min-h-screen bg-transparent">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-10">
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
                <h1 className="text-2xl font-bold text-white">Room Modification</h1>
                <p className="text-white/70">Manage and edit your room listings</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-3.5 text-white/50" />
              <input
                type="text"
                placeholder="Search rooms by title, location, or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-white/60"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white"
            >
              <option value="all">All Rooms</option>
              <option value="active">Active Rooms</option>
              <option value="inactive">Inactive Rooms</option>
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="maintenance">Under Maintenance</option>
            </select>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/70 mb-1">Total Rooms</p>
                <p className="text-2xl font-bold text-white">{rooms.length}</p>
              </div>
              <Home className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/70 mb-1">Available</p>
                <p className="text-2xl font-bold text-white">
                  {rooms.filter(r => r.status === 'available' && r.isActive).length}
                </p>
              </div>
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                <Home className="w-4 h-4 text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/70 mb-1">Occupied</p>
                <p className="text-2xl font-bold text-white">
                  {rooms.filter(r => r.status === 'occupied').length}
                </p>
              </div>
              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/70 mb-1">Inactive</p>
                <p className="text-2xl font-bold text-white">
                  {rooms.filter(r => !r.isActive).length}
                </p>
              </div>
              <div className="w-8 h-8 bg-gray-500/20 rounded-full flex items-center justify-center">
                <EyeOff className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Rooms List */}
        {filteredRooms.length === 0 ? (
          <div className="text-center py-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-sm">
            <Home className="w-12 h-12 text-white/50 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No rooms found</h3>
            <p className="text-white/70">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : 'Start by adding your first room listing.'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence>
              {filteredRooms.map((room) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Room Image */}
                      <div className="lg:w-64 h-48 lg:h-40 bg-white/20 rounded-lg overflow-hidden relative">
                        {room.images && room.images.length > 0 ? (
                          <>
                            <img
                              src={room.images[0]}
                              alt={room.title}
                              className="w-full h-full object-cover"
                            />
                            {/* Photo count badge */}
                            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                              <Camera className="w-3 h-3" />
                              {room.images.length}
                            </div>
                          </>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center flex-col gap-2">
                            <Camera className="w-8 h-8 text-white/50" />
                            <span className="text-white/50 text-sm">No photos</span>
                          </div>
                        )}
                      </div>

                      {/* Room Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-white">
                                {room.title}
                              </h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(room.status, room.isActive)}`}>
                                {getStatusIcon(room.status, room.isActive)}
                                {!room.isActive ? 'Inactive' : room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-white/70 mb-2">
                              <span className="flex items-center gap-1">
                                <Home className="w-4 h-4" />
                                {room.roomType}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {room.city}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {room.views} views
                              </span>
                            </div>
                            <p className="text-sm text-white/70 mb-4 line-clamp-2">
                              {room.description}
                            </p>
                          </div>
                        </div>

                        {/* Key Details */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div>
                            <span className="text-white/70 text-sm">Rent:</span>
                            <p className="font-medium text-white">₹{room.monthlyRent.toLocaleString()}/mo</p>
                          </div>
                          <div>
                            <span className="text-white/70 text-sm">Deposit:</span>
                            <p className="font-medium text-white">₹{room.securityDeposit.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="text-white/70 text-sm">Size:</span>
                            <p className="font-medium text-white">{room.size} sq ft</p>
                          </div>
                          <div>
                            <span className="text-white/70 text-sm">Floor:</span>
                            <p className="font-medium text-white">{room.floor}/{room.totalFloors}</p>
                          </div>
                        </div>

                        {/* Amenities Preview */}
                        <div className="mb-4">
                          <p className="text-sm text-white/70 mb-2">Amenities:</p>
                          <div className="flex flex-wrap gap-2">
                            {room.amenities.slice(0, 4).map((amenityId) => {
                              // Find amenity details
                              let amenity = null
                              amenitiesCategories.forEach(category => {
                                const found = category.items.find(a => a.id === amenityId)
                                if (found) amenity = found
                              })

                              return amenity ? (
                                <span
                                  key={amenityId}
                                  className="px-2 py-1 bg-blue-500/20 text-blue-300 border border-blue-400/30 rounded text-xs font-medium flex items-center gap-1"
                                >
                                  <amenity.icon size={12} />
                                  {amenity.name}
                                </span>
                              ) : null
                            })}
                            {room.amenities.length > 4 && (
                              <span className="px-2 py-1 bg-white/20 text-white/70 border border-white/30 rounded text-xs">
                                +{room.amenities.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={() => handleEdit(room)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </button>

                          <button
                            onClick={() => {
                              handleEdit(room)
                              // Scroll to photos section after modal opens
                              setTimeout(() => {
                                const photosSection = document.querySelector('[data-photos-section]')
                                if (photosSection) {
                                  photosSection.scrollIntoView({ behavior: 'smooth', block: 'center' })
                                }
                              }, 100)
                            }}
                            className="flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                          >
                            <Camera className="w-4 h-4" />
                            Photos
                          </button>

                          <button
                            onClick={() => toggleRoomStatus(room.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${room.isActive
                              ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                              : 'bg-green-600 text-white hover:bg-green-700'
                              }`}
                          >
                            {room.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            {room.isActive ? 'Deactivate' : 'Activate'}
                          </button>

                          <button
                            onClick={() => handleDelete(room.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Edit Room Modal */}
      <AnimatePresence>
        {showEditModal && selectedRoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white/20 backdrop-blur-md border border-white/20 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Edit Room Details</h2>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-white/70" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Basic Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Room Title
                        </label>
                        <input
                          type="text"
                          value={editFormData.title || ''}
                          onChange={(e) => handleInputChange('title', e.target.value)}
                          className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-white/60"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Description
                        </label>
                        <textarea
                          value={editFormData.description || ''}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          rows={3}
                          className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-white/60"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">
                            Room Type
                          </label>
                          <select
                            value={editFormData.roomType || ''}
                            onChange={(e) => handleInputChange('roomType', e.target.value)}
                            className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white"
                          >
                            <option value="single">Single Room</option>
                            <option value="double">Double Room</option>
                            <option value="shared">Shared Room</option>
                            <option value="studio">Studio Apartment</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-white mb-2">
                            Size (sq ft)
                          </label>
                          <input
                            type="number"
                            value={editFormData.size || ''}
                            onChange={(e) => handleInputChange('size', parseInt(e.target.value))}
                            className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-white/60"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Room Photos */}
                  <div data-photos-section>
                    <h3 className="text-lg font-semibold text-white mb-4">Room Photos</h3>
                    <div className="bg-white/5 rounded-lg p-4">
                      <ImageUpload
                        images={editFormData.images || []}
                        onImagesChange={handleImagesChange}
                        maxImages={10}
                        maxSize={5 * 1024 * 1024} // 5MB per image
                      />
                      <p className="text-white/60 text-sm mt-2">
                        Upload up to 10 high-quality photos of your room. Good photos help attract more tenants!
                      </p>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Pricing</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Monthly Rent (₹)
                        </label>
                        <input
                          type="number"
                          value={editFormData.monthlyRent || ''}
                          onChange={(e) => handleInputChange('monthlyRent', parseInt(e.target.value))}
                          className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-white/60"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Security Deposit (₹)
                        </label>
                        <input
                          type="number"
                          value={editFormData.securityDeposit || ''}
                          onChange={(e) => handleInputChange('securityDeposit', parseInt(e.target.value))}
                          className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-white/60"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Maintenance (₹/month)
                        </label>
                        <input
                          type="number"
                          value={editFormData.maintenanceCharges || ''}
                          onChange={(e) => handleInputChange('maintenanceCharges', parseInt(e.target.value))}
                          className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-white/60"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Amenities</h3>
                    <div className="space-y-6">
                      {amenitiesCategories.map((category) => (
                        <div key={category.key} className="space-y-3">
                          <h4 className="text-md font-medium text-white border-b border-white/20 pb-2">
                            {category.name}
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {category.items.map((amenity) => (
                              <div
                                key={amenity.id}
                                onClick={() => handleAmenityToggle(amenity.id)}
                                className={`p-3 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${editFormData.amenities?.includes(amenity.id)
                                  ? 'border-blue-400 bg-blue-500/20 backdrop-blur-sm'
                                  : 'border-white/30 bg-white/10 backdrop-blur-sm hover:border-white/50'
                                  }`}
                              >
                                <amenity.icon className={`w-5 h-5 mx-auto mb-1 ${editFormData.amenities?.includes(amenity.id) ? 'text-blue-300' : 'text-white/70'
                                  }`} />
                                <p className={`text-xs font-medium text-center ${editFormData.amenities?.includes(amenity.id) ? 'text-blue-300' : 'text-white'
                                  }`}>
                                  {amenity.name}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Other Details */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Other Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Status
                        </label>
                        <select
                          value={editFormData.status || ''}
                          onChange={(e) => handleInputChange('status', e.target.value)}
                          className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white"
                        >
                          <option value="available">Available</option>
                          <option value="occupied">Occupied</option>
                          <option value="maintenance">Under Maintenance</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Furnished Status
                        </label>
                        <select
                          value={editFormData.furnished || ''}
                          onChange={(e) => handleInputChange('furnished', e.target.value)}
                          className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white"
                        >
                          <option value="fully-furnished">Fully Furnished</option>
                          <option value="semi-furnished">Semi Furnished</option>
                          <option value="unfurnished">Unfurnished</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-white mb-2">
                        Room Rules
                      </label>
                      <textarea
                        value={editFormData.roomRules || ''}
                        onChange={(e) => handleInputChange('roomRules', e.target.value)}
                        rows={2}
                        className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-white/60"
                        placeholder="e.g., No smoking, No parties, Visitors allowed till 9 PM"
                      />
                    </div>
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="flex gap-4 pt-6 mt-6 border-t border-white/20">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg hover:bg-white/30 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveChanges}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notifications */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </div>
  )
}

export default RoomModification
