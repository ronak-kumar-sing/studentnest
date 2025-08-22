import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import {
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Star,
  CheckCircle,
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  Bookmark,
  BookmarkCheck,
  Users,
  Home as HomeIcon,
  Car,
  Wifi,
  Shield,
  ChefHat,
  Maximize,
  X,
  ArrowLeft,
  Clock,
  Award,
  Zap
} from 'lucide-react'
import { SAMPLE_ROOMS } from '../utils/sampleData'
import MapComponent from '../components/Map/MapComponent'
import { formatCurrency, formatDistance, getTimeAgo, getInitials } from '../utils/roomHelpers'
import ShinyText from '../components/TextAnimations/ShinyText/ShinyText'
import { useSavedRooms } from '../contexts/SavedRoomsContext'
import { useToast } from '../components/Toast'

// Mock API service
const roomService = {
  getRoomById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay
    const room = SAMPLE_ROOMS.find(r => r.id === id)
    if (!room) throw new Error('Room not found')

    // Enhanced room data with additional details
    return {
      ...room,
      fullDescription: `${room.description} This beautifully maintained accommodation offers everything a student needs for comfortable living. The room is part of a well-managed property with excellent facilities and a supportive community environment.`,
      images: [
        ...room.images,
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"
      ],
      detailedAmenities: [
        { id: 'wifi', name: 'High-Speed Wi-Fi', icon: 'wifi', available: true },
        { id: 'parking', name: 'Parking Space', icon: 'car', available: room.amenities.includes('parking') },
        { id: 'security', name: '24/7 Security', icon: 'shield', available: room.amenities.includes('security') },
        { id: 'kitchen', name: 'Shared Kitchen', icon: 'chef-hat', available: room.amenities.includes('kitchen') },
        { id: 'laundry', name: 'Laundry Service', icon: 'droplets', available: true },
        { id: 'cleaning', name: 'Housekeeping', icon: 'sparkles', available: false }
      ],
      location: {
        ...room.location,
        fullAddress: `${room.location.address}, New Delhi - 110007`,
        nearbyFacilities: [
          { name: 'Metro Station', distance: 500, type: 'transport' },
          { name: 'Grocery Store', distance: 200, type: 'shopping' },
          { name: 'Hospital', distance: 1000, type: 'medical' },
          { name: 'Restaurant', distance: 100, type: 'food' }
        ]
      },
      reviews: [
        {
          id: 1,
          userName: 'Priya Singh',
          rating: 5,
          date: '2 months ago',
          comment: 'Excellent place! Very clean and the owner is very helpful. Perfect location near the university.',
          verified: true
        },
        {
          id: 2,
          userName: 'Rahul Kumar',
          rating: 4,
          date: '3 months ago',
          comment: 'Good room with decent facilities. The kitchen is well-equipped and the area is safe.',
          verified: true
        },
        {
          id: 3,
          userName: 'Ananya Sharma',
          rating: 5,
          date: '1 month ago',
          comment: 'Amazing experience! The room is exactly as shown in photos. Highly recommend for female students.',
          verified: true
        }
      ],
      owner: {
        ...room.owner,
        phone: '+91 98765 43210',
        email: 'owner@example.com',
        responseRate: 95,
        responseTime: 'within 1 hour',
        joinedDate: 'Member since 2020'
      }
    }
  }
}

const getSimilarRooms = (currentRoomId, roomType) => {
  return SAMPLE_ROOMS.filter(room =>
    room.id !== currentRoomId &&
    room.roomType === roomType
  ).slice(0, 4)
}

// Skeleton components
const RoomDetailsSkeleton = () => (
  <div className="min-h-screen bg-zinc-950">
    {/* Header Skeleton */}
    <div className="bg-zinc-900 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="h-4 bg-zinc-700 rounded w-24 animate-pulse"></div>
      </div>
    </div>

    {/* Image Gallery Skeleton */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="h-96 bg-zinc-800 rounded-xl animate-pulse mb-4"></div>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="w-20 h-16 bg-zinc-800 rounded-lg animate-pulse"></div>
        ))}
      </div>
    </div>

    {/* Content Skeleton */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Title Skeleton */}
          <div className="space-y-4">
            <div className="h-10 bg-zinc-800 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-zinc-800 rounded w-1/2 animate-pulse"></div>
            <div className="flex gap-4">
              <div className="h-8 bg-zinc-800 rounded w-20 animate-pulse"></div>
              <div className="h-8 bg-zinc-800 rounded w-24 animate-pulse"></div>
              <div className="h-8 bg-zinc-800 rounded w-16 animate-pulse"></div>
            </div>
          </div>

          {/* Description Skeleton */}
          <div className="space-y-4">
            <div className="h-6 bg-zinc-800 rounded w-48 animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 bg-zinc-800 rounded animate-pulse"></div>
              <div className="h-4 bg-zinc-800 rounded animate-pulse"></div>
              <div className="h-4 bg-zinc-800 rounded w-3/4 animate-pulse"></div>
            </div>
          </div>

          {/* Amenities Skeleton */}
          <div className="space-y-4">
            <div className="h-6 bg-zinc-800 rounded w-32 animate-pulse"></div>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-12 bg-zinc-800 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-2xl p-6 shadow-lg border border-zinc-800 space-y-4">
            <div className="h-8 bg-zinc-700 rounded w-32 animate-pulse"></div>
            <div className="h-4 bg-zinc-700 rounded w-24 animate-pulse"></div>
            <div className="h-12 bg-zinc-700 rounded-xl animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-10 bg-zinc-700 rounded-xl animate-pulse"></div>
              <div className="h-10 bg-zinc-700 rounded-xl animate-pulse"></div>
              <div className="h-10 bg-zinc-700 rounded-xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

// Image Gallery Component
const ImageGallery = ({ images, title }) => {
  const [currentImage, setCurrentImage] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const previousImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <div className="relative">
      {/* Main Image */}
      <div className="relative h-96 bg-gray-200 rounded-xl overflow-hidden group">
        <motion.img
          key={currentImage}
          src={images[currentImage]}
          alt={title}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Navigation Arrows */}
        <button
          onClick={previousImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
          >
            <Heart className={`w-5 h-5 ${isFavorited ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />
          </button>
          <button
            onClick={handleShare}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
          >
            <Share2 className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 mt-4 overflow-x-auto">
        {images.slice(0, 5).map((img, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden ${index === currentImage ? 'ring-2 ring-blue-500' : ''
              }`}
          >
            <img
              src={img}
              alt={`View ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
        {images.length > 5 && (
          <button
            onClick={() => setShowModal(true)}
            className="flex-shrink-0 w-20 h-16 bg-gray-900 text-white rounded-lg flex items-center justify-center text-xs font-medium"
          >
            +{images.length - 5}
          </button>
        )}
      </div>

      {/* Modal for all images */}
      {showModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-white p-2 hover:bg-white/20 rounded-full z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={images[currentImage]}
              alt={title}
              className="w-full max-h-[80vh] object-contain"
            />
            <div className="flex justify-center gap-2 mt-4">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-3 h-3 rounded-full ${index === currentImage ? 'bg-white' : 'bg-white/50'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Booking Panel Component
const BookingPanel = ({ room }) => {
  const [selectedDate, setSelectedDate] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()
  const { toggleSaveRoom, isRoomSaved } = useSavedRooms()

  return (
    <div className="bg-zinc-900 rounded-2xl p-6 shadow-xl border border-zinc-800 ">
      <div className="flex items-baseline justify-between mb-4">
        <div className="text-3xl font-bold text-white">
          ₹{room.price.toLocaleString()}<span className="text-lg font-normal text-zinc-400">/month</span>
        </div>
        <div className="text-right">
          <div className="text-sm text-zinc-500">Best Price</div>
          <div className="text-green-400 font-medium text-sm flex items-center gap-1">
            <Zap className="w-3 h-3" />
            <ShinyText text="Great Deal" speed={3} className="text-sm" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-white">{room.rating}</span>
        </div>
        <span className="text-zinc-500">•</span>
        <span className="text-zinc-400">{room.totalReviews} reviews</span>
        <span className="text-zinc-500">•</span>
        <div className="flex items-center gap-1 text-green-400">
          <CheckCircle className="w-4 h-4" />
          <span className="text-sm font-medium">Verified</span>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Move-in Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={room.availability.availableFrom}
            className="w-full px-4 py-3 border border-zinc-700 bg-zinc-800 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <motion.button
          onClick={() => navigate(`/room/${id}/book`)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
        >
          Book Now - Pay Later
        </motion.button>

        <motion.button
          onClick={() => navigate(`/room/${id}/visit`)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-zinc-800 text-white py-4 rounded-xl font-semibold hover:bg-zinc-700 transition-all border border-zinc-700 flex items-center justify-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          <ShinyText text="Schedule Visit" speed={3} className="text-base" />
        </motion.button>

        <motion.button
          onClick={() => toggleSaveRoom(room)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full border py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${isRoomSaved(id)
            ? 'border-blue-500 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20'
            : 'border-zinc-600 text-zinc-300 hover:bg-zinc-800'
            }`}
        >
          {isRoomSaved(id) ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          {isRoomSaved(id) ? 'Saved' : 'Save for Later'}
        </motion.button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-zinc-800 rounded-xl border border-zinc-700">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">{room.features.area}</div>
          <div className="text-xs text-zinc-500">sq ft</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">{room.owner.responseRate}%</div>
          <div className="text-xs text-zinc-500">Response</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-400">{room.reviews.length}</div>
          <div className="text-xs text-zinc-500">Reviews</div>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="border-t border-zinc-700 pt-4 space-y-3 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-zinc-400">Monthly Rent</span>
          <span className="font-medium text-white">₹{room.price.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-zinc-400">Security Deposit</span>
          <span className="font-medium text-white">₹{(room.price * 2).toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-green-400">
          <span>Maintenance</span>
          <span className="font-medium">Included</span>
        </div>
        <div className="flex justify-between items-center font-semibold pt-3 border-t border-zinc-700 text-lg">
          <span className="text-white">Total Initial Cost</span>
          <span className="text-blue-400">₹{(room.price * 3).toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-4 text-xs text-zinc-500 text-center">
        No booking fees • Cancel anytime
      </div>
    </div>
  )
}// Amenities Component
const AmenitiesList = ({ amenities }) => {
  const iconMap = {
    wifi: Wifi,
    car: Car,
    shield: Shield,
    'chef-hat': ChefHat
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white">
        <ShinyText text="Amenities" speed={3} className="text-xl font-semibold" />
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {amenities.map((amenity) => {
          const IconComponent = iconMap[amenity.icon] || CheckCircle
          return (
            <div
              key={amenity.id}
              className={`flex items-center gap-3 p-3 rounded-lg border ${amenity.available
                ? 'bg-green-900/50 border-green-700 text-green-400'
                : 'bg-zinc-800 border-zinc-700 text-zinc-500'
                }`}
            >
              <IconComponent className="w-5 h-5" />
              <span className="font-medium">{amenity.name}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Reviews Component
const ReviewsSection = ({ reviews, rating, totalReviews }) => {
  const [showAllReviews, setShowAllReviews] = useState(false)
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">
          Reviews & Ratings
        </h3>
        <button className="text-blue-400 hover:text-blue-300 font-medium">
          <ShinyText text="Write a Review" speed={3} className="font-medium" />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-4xl font-bold text-white">{rating}</div>
        <div>
          <div className="flex items-center gap-1 mb-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${star <= Math.floor(rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-zinc-600'
                  }`}
              />
            ))}
          </div>
          <div className="text-zinc-400">{totalReviews} reviews</div>
        </div>
      </div>

      <div className="space-y-4">
        {displayedReviews.map((review) => (
          <div key={review.id} className="border-b border-zinc-800 pb-4 last:border-b-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  {review.userName.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-white">{review.userName}</div>
                  {review.verified && (
                    <div className="flex items-center gap-1 text-xs text-green-400">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-3 h-3 ${star <= review.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-zinc-600'
                        }`}
                    />
                  ))}
                </div>
                <div className="text-xs text-zinc-500">{review.date}</div>
              </div>
            </div>
            <p className="text-zinc-300">{review.comment}</p>
          </div>
        ))}
      </div>

      {reviews.length > 3 && (
        <button
          onClick={() => setShowAllReviews(!showAllReviews)}
          className="text-blue-400 hover:text-blue-300 font-medium"
        >
          {showAllReviews ? 'Show Less' : `Show All ${reviews.length} Reviews`}
        </button>
      )}
    </div>
  )
}

// Owner Contact Component
const OwnerContact = ({ owner }) => {
  return (
    <div className="bg-zinc-900 rounded-2xl p-6 shadow-xl border border-zinc-800 mt-6 sticky top-20">
      <h3 className="text-lg font-semibold text-white mb-4">
        <ShinyText text="Property Owner" speed={4} className="text-lg font-semibold" />
      </h3>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
          {getInitials(owner.name)}
        </div>
        <div className="flex-1">
          <div className="font-semibold text-white flex items-center gap-2">
            {owner.name}
            {owner.verified && (
              <div className="flex items-center gap-1 bg-green-900/50 text-green-400 px-2 py-1 rounded-full text-xs border border-green-700">
                <CheckCircle className="w-3 h-3" />
                Verified
              </div>
            )}
          </div>
          <div className="text-sm text-zinc-400">{owner.joinedDate}</div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-medium">{owner.rating}</span>
          </div>
        </div>
      </div>

      {/* Owner Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-zinc-800 rounded-xl border border-zinc-700">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-green-400 mb-1">
            <Clock className="w-4 h-4" />
            <span className="font-semibold">{owner.responseRate}%</span>
          </div>
          <div className="text-xs text-zinc-500">Response Rate</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-blue-400 mb-1">
            <Zap className="w-4 h-4" />
            <span className="font-semibold">{owner.responseTime}</span>
          </div>
          <div className="text-xs text-zinc-500">Response Time</div>
        </div>
      </div>

      <div className="space-y-3 ">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2 shadow-lg"
        >
          <Phone className="w-4 h-4" />
          Call Owner
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg"
        >
          <Mail className="w-4 h-4" />
          Send Email
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 shadow-lg"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp Chat
        </motion.button>
      </div>

      <div className="mt-4 text-center">
        <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
          View Owner Profile
        </button>
      </div>
    </div>
  )
}// Similar Rooms Component
const SimilarRooms = ({ currentRoomId, roomType }) => {
  const similarRooms = getSimilarRooms(currentRoomId, roomType)

  if (similarRooms.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-bold text-white">
          Similar Rooms You Might Like
        </h3>
        <Link
          to="/"
          className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1"
        >
          View All
          <ArrowLeft className="w-4 h-4 rotate-180" />
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {similarRooms.map((room, index) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link to={`/room/${room.id}`}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="bg-zinc-900 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all border border-zinc-800 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={room.images[0]}
                    alt={room.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <button className="bg-black/90 backdrop-blur-sm p-1.5 rounded-full hover:bg-black transition-colors">
                      <Heart className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Available Now
                  </div>
                </div>

                <div className="p-5">
                  <h4 className="font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                    {room.title}
                  </h4>

                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                    <span className="text-sm text-zinc-400 truncate">{room.location.address}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-white">{room.rating}</span>
                    </div>
                    <span className="text-zinc-600">•</span>
                    <span className="text-xs text-zinc-400">{room.totalReviews} reviews</span>
                    <span className="text-zinc-600">•</span>
                    <span className="text-xs text-zinc-400 capitalize">{room.roomType}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-white">
                      ₹{room.price.toLocaleString()}
                      <span className="text-sm font-normal text-zinc-400">/mo</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// Main RoomDetails Component
function RoomDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toggleSaveRoom, isRoomSaved, toastMessage, setToastMessage } = useSavedRooms()
  const { showToast, ToastComponent } = useToast()

  const { data: room, isLoading, error } = useQuery({
    queryKey: ['room', id],
    queryFn: () => roomService.getRoomById(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  })

  // Show toast when toastMessage changes
  useEffect(() => {
    if (toastMessage) {
      showToast(toastMessage.message, toastMessage.type)
      setToastMessage(null)
    }
  }, [toastMessage, showToast, setToastMessage])

  if (isLoading) return <RoomDetailsSkeleton />

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Room Not Found</h1>
          <p className="text-zinc-400 mb-6">The room you're looking for doesn't exist.</p>
          <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Navigation */}
      <div className="bg-zinc-900 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <Link
              to="/"
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
            >
              <HomeIcon className="w-4 h-4" />
              Home
            </Link>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <ImageGallery images={room.images} title={room.title} />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Room Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Room Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
                {room.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-2 text-zinc-400">
                  <MapPin className="w-4 h-4 text-zinc-500" />
                  <span>{room.location.fullAddress}</span>
                </div>
                <div className="flex items-center gap-2 bg-yellow-900/50 px-3 py-1 rounded-full border border-yellow-700">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-yellow-400">{room.rating}</span>
                  <span className="text-zinc-400">({room.totalReviews} reviews)</span>
                </div>
                <span className="px-3 py-1 bg-blue-900/50 text-blue-400 text-sm rounded-full capitalize font-medium border border-blue-700">
                  {room.roomType} Room
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-400">
                <div className="flex items-center gap-2 bg-zinc-800 px-3 py-2 rounded-lg border border-zinc-700">
                  <Maximize className="w-4 h-4 text-blue-400" />
                  <span className="font-medium text-white">{room.features.area} sq ft</span>
                </div>
                <div className="flex items-center gap-2 bg-zinc-800 px-3 py-2 rounded-lg border border-zinc-700">
                  <HomeIcon className="w-4 h-4 text-green-400" />
                  <span className="font-medium text-white">Floor {room.features.floor}/{room.features.totalFloors}</span>
                </div>
                {room.features.furnished && (
                  <div className="flex items-center gap-2 bg-green-900/50 text-green-400 px-3 py-2 rounded-lg border border-green-700">
                    <Award className="w-4 h-4" />
                    <span className="font-medium">Fully Furnished</span>
                  </div>
                )}
                {room.availability.isAvailable && (
                  <div className="flex items-center gap-2 bg-green-900/50 text-green-400 px-3 py-2 rounded-lg border border-green-700">
                    <CheckCircle className="w-4 h-4" />
                    <span className="font-medium">Available Now</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-semibold text-white">
                About This Place
              </h3>
              <p className="text-zinc-300 leading-relaxed text-lg">{room.fullDescription}</p>

              {/* Quick Highlights */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center p-4 bg-blue-900/50 rounded-xl border border-blue-800">
                  <div className="text-2xl font-bold text-blue-400">{room.features.area}</div>
                  <div className="text-sm text-blue-300">sq ft Area</div>
                </div>
                <div className="text-center p-4 bg-green-900/50 rounded-xl border border-green-800">
                  <div className="text-2xl font-bold text-green-400">{room.rating}</div>
                  <div className="text-sm text-green-300">Rating</div>
                </div>
                <div className="text-center p-4 bg-purple-900/50 rounded-xl border border-purple-800">
                  <div className="text-2xl font-bold text-purple-400">₹{Math.round(room.price / room.features.area)}</div>
                  <div className="text-sm text-purple-300">Per sq ft</div>
                </div>
                <div className="text-center p-4 bg-orange-900/50 rounded-xl border border-orange-800">
                  <div className="text-2xl font-bold text-orange-400">{room.location.nearbyUniversities[0]?.distance || 'N/A'}</div>
                  <div className="text-sm text-orange-300">km to Uni</div>
                </div>
              </div>
            </motion.div>            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-semibold text-gray-900">About This Place</h3>
              <p className="text-gray-700 leading-relaxed text-lg">{room.fullDescription}</p>

              {/* Quick Highlights */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">{room.features.area}</div>
                  <div className="text-sm text-blue-600">sq ft Area</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">{room.rating}</div>
                  <div className="text-sm text-green-600">Rating</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">₹{Math.round(room.price / room.features.area)}</div>
                  <div className="text-sm text-purple-600">Per sq ft</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <div className="text-2xl font-bold text-orange-600">{room.location.nearbyUniversities[0]?.distance || 'N/A'}</div>
                  <div className="text-sm text-orange-600">km to Uni</div>
                </div>
              </div>
            </motion.div>

            {/* Amenities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <AmenitiesList amenities={room.detailedAmenities} />
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold text-white">
                Location & Nearby
              </h3>

              {/* Interactive Map */}
              <MapComponent
                location={room.location}
                height="h-96"
                markersData={room.location.nearbyFacilities.map(facility => ({
                  name: facility.name,
                  type: facility.type,
                  distance: facility.distance
                }))}
                onLocationClick={(marker) => {
                  console.log('Clicked marker:', marker)
                }}
              />

              {/* Nearby Universities */}
              <div>
                <h4 className="font-semibold mb-4 flex items-center gap-2 text-lg text-white">
                  🏫 Nearby Universities
                </h4>
                <div className="space-y-3">
                  {room.location.nearbyUniversities.map((uni, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex justify-between items-center p-4 bg-zinc-900 rounded-xl border border-zinc-800 hover:shadow-md transition-shadow"
                    >
                      <div>
                        <div className="font-semibold text-white">{uni.name}</div>
                        <div className="text-sm text-zinc-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {uni.distance} km • {uni.commute} min by transport
                        </div>
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                        Get Directions
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Nearby Facilities */}
              <div>
                <h4 className="font-semibold mb-4 flex items-center gap-2 text-lg text-white">
                  🏪 Nearby Facilities
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {room.location.nearbyFacilities.map((facility, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center justify-between p-4 bg-zinc-900 rounded-xl border border-zinc-800 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center border border-zinc-700">
                          <MapPin className="w-4 h-4 text-zinc-400" />
                        </div>
                        <span className="font-medium text-white">{facility.name}</span>
                      </div>
                      <span className="text-blue-400 font-medium">{facility.distance}m</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <ReviewsSection
                reviews={room.reviews}
                rating={room.rating}
                totalReviews={room.totalReviews}
              />
            </motion.div>
          </div>

          {/* Right Column - Booking Panel */}
          <div className="lg:col-span-1">
            <BookingPanel room={room} />
            <OwnerContact owner={room.owner} />
          </div>
        </div>

        {/* Similar Rooms */}
        <div className="mt-16">
          <SimilarRooms currentRoomId={room.id} roomType={room.roomType} />
        </div>
      </div>

      {/* Toast Component */}
      <ToastComponent />
    </div>
  )
}

export default RoomDetails
