import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  User,
  AlertCircle,
  Video,
  Home,
  MessageCircle
} from 'lucide-react'
import { SAMPLE_ROOMS } from '../utils/sampleData'

const ScheduleVisitPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [room, setRoom] = useState(null)
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState(1) // 1: Details, 2: Confirmation

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    visitDate: '',
    visitTime: '',
    visitType: 'in-person', // 'in-person' or 'virtual'
    message: '',
    agreeTerms: false
  })

  const [errors, setErrors] = useState({})
  const [availableTimeSlots] = useState([
    '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ])

  useEffect(() => {
    const foundRoom = SAMPLE_ROOMS.find(r => r.id === id)
    if (foundRoom) {
      setRoom(foundRoom)
    }
    setLoading(false)
  }, [id])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.visitDate) newErrors.visitDate = 'Visit date is required'
    if (!formData.visitTime) newErrors.visitTime = 'Visit time is required'
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleSubmit = () => {
    if (validateForm()) {
      setStep(2)
    }
  }

  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  const getMaxDate = () => {
    const maxDate = new Date()
    maxDate.setDate(maxDate.getDate() + 30)
    return maxDate.toISOString().split('T')[0]
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400"></div>
      </div>
    )
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Room not found</h1>
          <Link to="/" className="text-blue-400 hover:text-blue-300">
            Go back to search
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-zinc-900 border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to room details
          </button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Schedule a Visit</h1>
              <p className="text-zinc-400">{room.title}</p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center gap-4">
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${s <= step ? 'bg-blue-600 text-white' : 'bg-zinc-700 text-zinc-400'
                    }`}>
                    {s < step ? <CheckCircle className="w-4 h-4" /> : s}
                  </div>
                  {s < 2 && <div className={`w-8 h-0.5 ${s < step ? 'bg-blue-600' : 'bg-zinc-700'}`} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Visit Type Selection */}
                <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                  <h3 className="text-xl font-semibold text-white mb-6">Choose Visit Type</h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.visitType === 'in-person'
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-zinc-700 hover:border-zinc-600'
                        }`}
                      onClick={() => handleInputChange('visitType', 'in-person')}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <Home className="w-6 h-6 text-blue-400" />
                        <h4 className="font-semibold text-white">In-Person Visit</h4>
                      </div>
                      <p className="text-sm text-zinc-400">
                        Visit the property in person to get a real feel of the space and meet the owner.
                      </p>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.visitType === 'virtual'
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-zinc-700 hover:border-zinc-600'
                        }`}
                      onClick={() => handleInputChange('visitType', 'virtual')}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <Video className="w-6 h-6 text-green-400" />
                        <h4 className="font-semibold text-white">Virtual Tour</h4>
                      </div>
                      <p className="text-sm text-zinc-400">
                        Take a virtual tour via video call from the comfort of your current location.
                      </p>
                    </motion.div>
                  </div>
                </div>

                {/* Personal Details */}
                <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Your Details
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && (
                        <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && (
                        <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="+91 98765 43210"
                      />
                      {errors.phone && (
                        <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Visit Schedule */}
                <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Schedule Your Visit
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        value={formData.visitDate}
                        onChange={(e) => handleInputChange('visitDate', e.target.value)}
                        min={getMinDate()}
                        max={getMaxDate()}
                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.visitDate && (
                        <p className="text-red-400 text-sm mt-1">{errors.visitDate}</p>
                      )}
                      <p className="text-xs text-zinc-500 mt-1">
                        Available from tomorrow up to 30 days ahead
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Preferred Time *
                      </label>
                      <select
                        value={formData.visitTime}
                        onChange={(e) => handleInputChange('visitTime', e.target.value)}
                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select time slot</option>
                        {availableTimeSlots.map(time => (
                          <option key={time} value={time}>
                            {time} - {String(parseInt(time.split(':')[0]) + 1).padStart(2, '0')}:00
                          </option>
                        ))}
                      </select>
                      {errors.visitTime && (
                        <p className="text-red-400 text-sm mt-1">{errors.visitTime}</p>
                      )}
                    </div>
                  </div>

                  {formData.visitType === 'virtual' && (
                    <div className="bg-zinc-800 rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Video className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-medium text-white">Virtual Tour Details</span>
                      </div>
                      <p className="text-sm text-zinc-400">
                        You'll receive a video call link via email 30 minutes before your scheduled time.
                        Make sure you have a stable internet connection and a device with a camera.
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Message to Owner (Optional)
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Any specific questions or requirements you'd like to discuss..."
                    />
                  </div>
                </div>

                {/* Terms */}
                <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={formData.agreeTerms}
                      onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                      className="mt-1 w-4 h-4 text-blue-600 bg-zinc-800 border-zinc-600 rounded focus:ring-blue-500"
                    />
                    <label className="text-sm text-zinc-300">
                      I agree to the visit terms and understand that I should arrive on time.
                      I also consent to my contact information being shared with the property owner. *
                    </label>
                  </div>
                  {errors.agreeTerms && (
                    <p className="text-red-400 text-sm mt-2">{errors.agreeTerms}</p>
                  )}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Visit Scheduled!</h3>
                <p className="text-zinc-400 mb-8">
                  Your visit request has been sent to the property owner. You'll receive a confirmation shortly.
                </p>

                <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 mb-8 text-left">
                  <h4 className="font-semibold text-white mb-4">Visit Details:</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      <span className="text-zinc-400">Date:</span>
                      <span className="text-white">
                        {new Date(formData.visitDate).toLocaleDateString('en-IN', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span className="text-zinc-400">Time:</span>
                      <span className="text-white">{formData.visitTime}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {formData.visitType === 'virtual' ? (
                        <Video className="w-4 h-4 text-green-400" />
                      ) : (
                        <Home className="w-4 h-4 text-purple-400" />
                      )}
                      <span className="text-zinc-400">Type:</span>
                      <span className="text-white">
                        {formData.visitType === 'virtual' ? 'Virtual Tour' : 'In-Person Visit'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-red-400" />
                      <span className="text-zinc-400">Location:</span>
                      <span className="text-white">{room.location.address}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 mb-8 text-left">
                  <h4 className="font-semibold text-white mb-4">What happens next?</h4>
                  <ul className="space-y-2 text-sm text-zinc-400">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Owner will confirm your visit within 2 hours
                    </li>
                    <li className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-500" />
                      You'll receive confirmation email with detailed instructions
                    </li>
                    {formData.visitType === 'virtual' ? (
                      <li className="flex items-center gap-2">
                        <Video className="w-4 h-4 text-green-500" />
                        Video call link will be sent 30 minutes before the tour
                      </li>
                    ) : (
                      <li className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-yellow-500" />
                        Owner may call you to confirm and provide directions
                      </li>
                    )}
                  </ul>
                </div>

                <div className="space-y-3">
                  <Link
                    to="/"
                    className="block w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Back to Search
                  </Link>
                  <Link
                    to={`/room/${id}`}
                    className="block w-full border border-zinc-600 text-zinc-300 py-3 rounded-lg font-semibold hover:bg-zinc-800 transition-colors"
                  >
                    Back to Room Details
                  </Link>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 sticky top-8">
              {/* Room Summary */}
              <div className="mb-6">
                <img
                  src={room.images[0]}
                  alt={room.title}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h4 className="font-semibold text-white mb-2">{room.title}</h4>
                <p className="text-sm text-zinc-400 flex items-center gap-1 mb-2">
                  <MapPin className="w-3 h-3" />
                  {room.location.area}, {room.location.city}
                </p>
                <div className="flex items-center gap-2 text-sm mb-3">
                  <span className="text-zinc-400">Rent:</span>
                  <span className="text-white font-semibold">₹{room.price.toLocaleString()}/month</span>
                </div>
              </div>

              {/* Owner Info */}
              <div className="border-t border-zinc-800 pt-6">
                <h5 className="font-semibold text-white mb-3">Property Owner</h5>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {room.owner.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{room.owner.name}</p>
                    <p className="text-xs text-zinc-400">Property Owner</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3 text-zinc-400" />
                    <span className="text-zinc-400">Response rate: 95%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-3 h-3 text-zinc-400" />
                    <span className="text-zinc-400">Usually responds within 2 hours</span>
                  </div>
                </div>
              </div>

              {/* Visit Guidelines */}
              {step === 1 && (
                <div className="border-t border-zinc-800 pt-6 mt-6">
                  <h5 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Visit Guidelines
                  </h5>
                  <ul className="space-y-2 text-sm text-zinc-400">
                    <li>• Please arrive on time for your scheduled visit</li>
                    <li>• Bring a valid ID for verification</li>
                    <li>• Feel free to ask questions about the property</li>
                    <li>• Take photos if you'd like (with permission)</li>
                    <li>• Respect the current tenants' privacy</li>
                  </ul>
                </div>
              )}

              {/* Action Button */}
              {step === 1 && (
                <motion.button
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all mt-6"
                >
                  Schedule Visit
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScheduleVisitPage
