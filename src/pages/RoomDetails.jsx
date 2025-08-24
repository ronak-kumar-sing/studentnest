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
  Maximize,
  X,
  ArrowLeft,
  Clock,
  Award,
  Zap,
  DollarSign,
  Send
} from 'lucide-react'
import { AMENITIES_LIST, getAmenitiesByCategory } from '../utils/constants'
import { SAMPLE_ROOMS } from '../utils/sampleData'
import MapComponent from '../components/Map/MapComponent'
import { formatCurrency, formatDistance, getTimeAgo, getInitials } from '../utils/roomHelpers'
import ShinyText from '../components/TextAnimations/ShinyText/ShinyText'
import { useSavedRooms } from '../contexts/SavedRoomsContext'
import { useToast } from '../components/Toast'
import { useChat } from '../contexts/ChatContext'
import ReviewsSection from '../components/Reviews/ReviewsSection'

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
      detailedAmenities: room.amenities || ['wifi', 'security', 'parking', 'kitchen'],
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
          comment: 'Excellent place! Very clean and the owner is very helpful. Perfect location near the university. I have been staying here for over 6 months now and my experience has been absolutely wonderful. The room is spacious, well-ventilated, and gets plenty of natural light throughout the day. The owner, Mr. Sharma, is incredibly responsive and addresses any concerns immediately. The building has excellent security with CCTV cameras and a guard at the entrance 24/7. The kitchen facilities are top-notch with all modern appliances including a microwave, refrigerator, and induction cooktop. The area is very safe for female students, and I never felt unsafe even while returning late from college. The proximity to the metro station makes commuting very convenient. I would definitely recommend this place to any student looking for comfortable and affordable accommodation.',
          verified: true,
          helpfulCount: 12,
          stayDuration: '6 months',
          categories: {
            cleanliness: 5,
            location: 5,
            facilities: 5,
            owner: 5,
            value: 5
          }
        },
        {
          id: 2,
          userName: 'Rahul Kumar',
          rating: 4,
          date: '3 months ago',
          comment: 'Good room with decent facilities. The kitchen is well-equipped and the area is safe. The room size is adequate for a single person, though it could be a bit bigger. The internet connection is reliable and fast, which is great for online classes and assignments. The only minor issue is that the hot water supply can be inconsistent during peak hours, but overall it\'s a good place to stay.',
          verified: true,
          helpfulCount: 8,
          stayDuration: '4 months',
          categories: {
            cleanliness: 4,
            location: 4,
            facilities: 4,
            owner: 4,
            value: 4
          }
        },
        {
          id: 3,
          userName: 'Ananya Sharma',
          rating: 5,
          date: '1 month ago',
          comment: 'Amazing experience! The room is exactly as shown in photos. Highly recommend for female students.',
          verified: true,
          helpfulCount: 5,
          stayDuration: '2 months',
          categories: {
            cleanliness: 5,
            location: 5,
            facilities: 5,
            owner: 5,
            value: 5
          }
        },
        {
          id: 4,
          userName: 'Vikash Gupta',
          rating: 3,
          date: '4 months ago',
          comment: 'The room is okay for the price point. Location is convenient as it\'s close to the metro and several food joints. However, the room could use some maintenance work - the paint is peeling in some areas and the bathroom fixtures are a bit old. The owner is responsive to complaints but the resolution time could be faster. The building doesn\'t have a lift which can be inconvenient if you have heavy luggage. Internet speed is decent during the day but tends to slow down in the evening when everyone is online. Overall, it\'s an average place - not the best but definitely not the worst either. If you\'re looking for budget accommodation and don\'t mind compromising on some amenities, this could work for you.',
          verified: true,
          helpfulCount: 3,
          stayDuration: '8 months',
          categories: {
            cleanliness: 3,
            location: 4,
            facilities: 3,
            owner: 3,
            value: 4
          },
          ownerResponse: {
            date: '3 months ago',
            message: 'Thank you for your feedback, Vikash. We have addressed the maintenance issues you mentioned and upgraded the bathroom fixtures. We\'re also working on improving the internet infrastructure. We appreciate your patience and hope your experience has improved.'
          }
        },
        {
          id: 5,
          userName: 'Meera Patel',
          rating: 2,
          date: '5 months ago',
          comment: 'Had a mixed experience here. While the location is great and the rent is reasonable, there were several issues during my stay. The room had a persistent dampness problem during the monsoon season, which made it uncomfortable. The common areas were not cleaned regularly, and there were frequent disputes among tenants about kitchen usage timings. The owner was not very responsive to complaints and took a long time to address maintenance issues. I had to follow up multiple times just to get a broken window pane replaced. The security deposit refund process was also quite delayed and involved unnecessary hassles.',
          verified: true,
          helpfulCount: 7,
          stayDuration: '5 months',
          categories: {
            cleanliness: 2,
            location: 4,
            facilities: 2,
            owner: 2,
            value: 3
          },
          ownerResponse: {
            date: '4 months ago',
            message: 'We sincerely apologize for the issues you faced during your stay, Meera. We have since implemented a more proactive maintenance schedule and improved our responsiveness to tenant concerns. We\'ve also addressed the dampness issue with proper waterproofing. Your feedback helps us improve our services.'
          }
        }
      ],
      owner: {
        ...room.owner,
        phone: room.owner.phone || '+91 98765 43210',
        email: room.owner.email || 'owner@example.com',
        whatsapp: room.owner.whatsapp || room.owner.phone || '+91 98765 43210',
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

// Price Negotiation Modal Component
const PriceNegotiationModal = ({ room, isOpen, onClose }) => {
  const [proposedPrice, setProposedPrice] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { startChat, sendMessage } = useChat()
  const { showToast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!proposedPrice || !message.trim()) {
      showToast('Please fill in all required fields', 'error')
      return
    }

    const proposedPriceNum = parseInt(proposedPrice)
    if (isNaN(proposedPriceNum) || proposedPriceNum <= 0) {
      showToast('Please enter a valid price', 'error')
      return
    }

    if (proposedPriceNum >= room.price) {
      showToast('Proposed price should be less than the current price', 'error')
      return
    }

    if (proposedPriceNum < room.price * 0.5) {
      showToast('Proposed price seems too low. Please consider a reasonable offer.', 'error')
      return
    }

    setIsSubmitting(true)

    try {
      // Create the negotiation message
      const negotiationMessage = `Hi! I'm interested in your property "${room.title}". I would like to negotiate the price from ₹${room.price.toLocaleString()} to ₹${proposedPriceNum.toLocaleString()}/month.

My message: ${message}

Please let me know if this works for you. Looking forward to your response!`

      // Start chat with owner and send the negotiation message
      const chat = await startChat(room.owner.id || 'owner_456', negotiationMessage)

      if (chat) {
        showToast('Price negotiation request sent to room owner successfully!', 'success')
        onClose()
        // Reset form
        setProposedPrice('')
        setMessage('')
      } else {
        showToast('Failed to send negotiation request. Please try again.', 'error')
      }
    } catch (error) {
      console.error('Error sending negotiation request:', error)
      showToast('Failed to send negotiation request. Please try again.', 'error')
    }

    setIsSubmitting(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-zinc-900 rounded-2xl p-6 max-w-md w-full border border-zinc-700 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-400" />
            Negotiate Price
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-zinc-400" />
          </button>
        </div>

        <div className="mb-4">
          <div className="text-sm text-zinc-400 mb-2">Current Price</div>
          <div className="text-2xl font-bold text-white">₹{room.price.toLocaleString()}<span className="text-base text-zinc-400">/month</span></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Your Proposed Price *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400">₹</span>
              <input
                type="number"
                value={proposedPrice}
                onChange={(e) => setProposedPrice(e.target.value)}
                placeholder="Enter your price"
                max={room.price - 1}
                min="1000"
                className="w-full pl-8 pr-4 py-3 border border-zinc-700 bg-zinc-800 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>
            <div className="flex justify-between items-center text-xs mt-1">
              <span className="text-zinc-500">Must be less than ₹{room.price.toLocaleString()}</span>
              {proposedPrice && !isNaN(parseInt(proposedPrice)) && parseInt(proposedPrice) < room.price && (
                <span className="text-green-400 font-medium">
                  {Math.round(((room.price - parseInt(proposedPrice)) / room.price) * 100)}% off
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Message to Owner *
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Explain why you're proposing this price..."
              rows={4}
              className="w-full px-4 py-3 border border-zinc-700 bg-zinc-800 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-zinc-600 text-zinc-300 rounded-xl hover:bg-zinc-800 transition-all font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Request
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

// Booking Panel Component
const BookingPanel = ({ room }) => {
  const [selectedDate, setSelectedDate] = useState('')
  const [showNegotiationModal, setShowNegotiationModal] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()
  const { toggleSaveRoom, isRoomSaved } = useSavedRooms()

  return (
    <>
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
            onClick={() => setShowNegotiationModal(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <DollarSign className="w-4 h-4" />
            <ShinyText text="Negotiate Price" speed={3} className="text-base" />
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

      {/* Price Negotiation Modal */}
      <PriceNegotiationModal
        room={room}
        isOpen={showNegotiationModal}
        onClose={() => setShowNegotiationModal(false)}
      />
    </>
  )
}

// Amenities Component - Minimized Version
const AmenitiesList = ({ amenities }) => {
  const [showAllAmenities, setShowAllAmenities] = useState(false)

  // Get all amenities without categories for minimized display
  const allAmenities = amenities.map(amenityId => {
    const amenity = AMENITIES_LIST[amenityId]
    return amenity ? { id: amenityId, ...amenity } : null
  }).filter(Boolean)

  // Show only first 8 amenities initially
  const displayedAmenities = showAllAmenities ? allAmenities : allAmenities.slice(0, 8)
  const hasMoreAmenities = allAmenities.length > 8

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">
          <ShinyText text="Amenities & Facilities" speed={3} className="text-xl font-semibold" />
        </h3>
        <span className="text-sm text-blue-400 font-medium">
          {allAmenities.length} facilities
        </span>
      </div>

      {/* Compact amenities grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {displayedAmenities.map((amenity) => {
          const IconComponent = amenity.icon
          return (
            <div
              key={amenity.id}
              className="flex items-center gap-2 p-3 rounded-lg bg-green-900/20 border border-green-700/30 text-green-300 hover:bg-green-900/30 transition-colors"
              title={amenity.description}
            >
              <IconComponent className="w-4 h-4 text-green-400 flex-shrink-0" />
              <span className="font-medium text-sm truncate">{amenity.name}</span>
            </div>
          )
        })}
      </div>

      {/* Show more/less button */}
      {hasMoreAmenities && (
        <div className="text-center">
          <button
            onClick={() => setShowAllAmenities(!showAllAmenities)}
            className="text-blue-400 hover:text-blue-300 font-medium text-sm underline"
          >
            {showAllAmenities ? 'Show Less' : `Show ${allAmenities.length - 8} More Amenities`}
          </button>
        </div>
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

      {/* Contact Information */}
      <div className="bg-zinc-800 rounded-xl p-4 mb-4 border border-zinc-700">
        <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Mail className="w-4 h-4 text-blue-400" />
          Contact Details
        </h4>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-3 h-3 text-blue-400 flex-shrink-0" />
            <span className="text-zinc-400 w-18">Email:</span>
            <span className="text-white font-mono text-xs break-all">{owner.email}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-3 h-3 text-green-400 flex-shrink-0" />
            <span className="text-zinc-400 w-18">Phone:</span>
            <span className="text-white font-mono">{owner.phone}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <MessageCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
            <span className="text-zinc-400 w-18">WhatsApp:</span>
            <span className="text-white font-mono">{owner.whatsapp}</span>
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
    </div>
  )
}

// Similar Rooms Component
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
  const [roomReviews, setRoomReviews] = useState([])

  const { data: room, isLoading, error } = useQuery({
    queryKey: ['room', id],
    queryFn: () => roomService.getRoomById(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  })

  // Initialize room reviews when room data is loaded
  useEffect(() => {
    if (room?.reviews) {
      setRoomReviews(room.reviews)
    }
  }, [room])

  // Handle new review submission
  const handleReviewSubmit = (newReview) => {
    setRoomReviews(prev => [newReview, ...prev])
  }

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
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-blue-900/50 text-blue-400 text-sm rounded-full capitalize font-medium border border-blue-700">
                    {room.roomType} Room
                  </span>
                  {room.accommodationType && (
                    <span className={`px-3 py-1 text-sm rounded-full font-medium border ${room.accommodationType === 'pg'
                      ? 'bg-green-900/50 text-green-400 border-green-700'
                      : 'bg-purple-900/50 text-purple-400 border-purple-700'
                      }`}>
                      {room.accommodationType === 'pg' ? 'PG Accommodation' : 'Private Room'}
                    </span>
                  )}
                </div>
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

            {/* PG-specific Information */}
            {room.accommodationType === 'pg' && room.features.meals && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="space-y-4"
              >
                <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
                  🍽️ PG Facilities & Meal Information
                </h3>
                <div className="bg-green-900/20 border border-green-700 rounded-xl p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-green-400 mb-3">Meal Timings</h4>
                      <div className="space-y-2">
                        {room.features.pgRules?.mealTimings && Object.entries(room.features.pgRules.mealTimings).map(([meal, time]) => (
                          <div key={meal} className="flex justify-between items-center">
                            <span className="text-zinc-300 capitalize">{meal}</span>
                            <span className="text-green-400 font-medium">{time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-green-400 mb-3">PG Rules & Policies</h4>
                      <div className="space-y-2 text-sm">
                        {room.features.pgRules?.guestPolicy && (
                          <div className="flex items-start gap-2">
                            <span className="text-zinc-500">•</span>
                            <span className="text-zinc-300">{room.features.pgRules.guestPolicy}</span>
                          </div>
                        )}
                        {room.features.pgRules?.quietHours && (
                          <div className="flex items-start gap-2">
                            <span className="text-zinc-500">•</span>
                            <span className="text-zinc-300">Quiet Hours: {room.features.pgRules.quietHours}</span>
                          </div>
                        )}
                        <div className="flex items-start gap-2">
                          <span className="text-zinc-500">•</span>
                          <span className="text-zinc-300">Meals included in rent</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

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
                reviews={roomReviews}
                rating={room.rating}
                totalReviews={room.totalReviews}
                room={room}
                onReviewSubmit={handleReviewSubmit}
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
