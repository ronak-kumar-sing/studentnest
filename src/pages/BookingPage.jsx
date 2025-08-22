import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  CreditCard,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  User,
  Mail,
  Phone,
  MapPin,
  Home,
  IndianRupee
} from 'lucide-react'
import { SAMPLE_ROOMS } from '../utils/sampleData'
import { formatCurrency } from '../utils/roomHelpers'

const BookingPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [room, setRoom] = useState(null)
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState(1) // 1: Details, 2: Payment, 3: Confirmation

  const [formData, setFormData] = useState({
    // Personal Details
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    occupation: 'student',

    // Booking Details
    moveInDate: '',
    duration: '6', // months

    // Emergency Contact
    emergencyName: '',
    emergencyPhone: '',
    emergencyRelation: '',

    // Additional Info
    specialRequests: '',
    agreeTerms: false,
    agreePrivacy: false
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    const foundRoom = SAMPLE_ROOMS.find(r => r.id === id)
    if (foundRoom) {
      setRoom(foundRoom)
    }
    setLoading(false)
  }, [id])

  const validateStep1 = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.moveInDate) newErrors.moveInDate = 'Move-in date is required'
    if (!formData.emergencyName.trim()) newErrors.emergencyName = 'Emergency contact name is required'
    if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = 'Emergency contact phone is required'
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms'
    if (!formData.agreePrivacy) newErrors.agreePrivacy = 'You must agree to the privacy policy'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    } else if (step === 2) {
      // Simulate payment processing
      setTimeout(() => {
        setStep(3)
      }, 2000)
    }
  }

  const calculateTotal = () => {
    if (!room) return 0
    const monthlyRent = room.price
    const securityDeposit = monthlyRent * 2
    const bookingFee = 999
    return {
      monthlyRent,
      securityDeposit,
      bookingFee,
      total: monthlyRent + securityDeposit + bookingFee
    }
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

  const costs = calculateTotal()

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-zinc-900 border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to room details
            </button>

            <Link
              to="/"
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Book Your Room</h1>
              <p className="text-zinc-400">{room.title}</p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center gap-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${s <= step ? 'bg-blue-600 text-white' : 'bg-zinc-700 text-zinc-400'
                    }`}>
                    {s < step ? <CheckCircle className="w-4 h-4" /> : s}
                  </div>
                  {s < 3 && <div className={`w-8 h-0.5 ${s < step ? 'bg-blue-600' : 'bg-zinc-700'}`} />}
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
                {/* Personal Details */}
                <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Details
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

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
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

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Occupation
                      </label>
                      <select
                        value={formData.occupation}
                        onChange={(e) => handleInputChange('occupation', e.target.value)}
                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="student">Student</option>
                        <option value="working_professional">Working Professional</option>
                        <option value="intern">Intern</option>
                        <option value="freelancer">Freelancer</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Booking Details
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Move-in Date *
                      </label>
                      <input
                        type="date"
                        value={formData.moveInDate}
                        onChange={(e) => handleInputChange('moveInDate', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.moveInDate && (
                        <p className="text-red-400 text-sm mt-1">{errors.moveInDate}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Duration (months)
                      </label>
                      <select
                        value={formData.duration}
                        onChange={(e) => handleInputChange('duration', e.target.value)}
                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="1">1 months</option>
                        <option value="2">2 months</option>
                        <option value="3">3 months</option>
                        <option value="6">6 months</option>
                        <option value="11">11 months</option>
                        <option value="12">12 months</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Emergency Contact
                  </h3>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        value={formData.emergencyName}
                        onChange={(e) => handleInputChange('emergencyName', e.target.value)}
                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Emergency contact name"
                      />
                      {errors.emergencyName && (
                        <p className="text-red-400 text-sm mt-1">{errors.emergencyName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        value={formData.emergencyPhone}
                        onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="+91 98765 43210"
                      />
                      {errors.emergencyPhone && (
                        <p className="text-red-400 text-sm mt-1">{errors.emergencyPhone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Relationship
                      </label>
                      <select
                        value={formData.emergencyRelation}
                        onChange={(e) => handleInputChange('emergencyRelation', e.target.value)}
                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select relationship</option>
                        <option value="parent">Parent</option>
                        <option value="sibling">Sibling</option>
                        <option value="spouse">Spouse</option>
                        <option value="friend">Friend</option>
                        <option value="relative">Relative</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                  <h3 className="text-xl font-semibold text-white mb-6">
                    Additional Information
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Special Requests or Requirements
                    </label>
                    <textarea
                      value={formData.specialRequests}
                      onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Any special requests, dietary requirements, accessibility needs, etc."
                    />
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={formData.agreeTerms}
                        onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                        className="mt-1 w-4 h-4 text-blue-600 bg-zinc-800 border-zinc-600 rounded focus:ring-blue-500"
                      />
                      <label className="text-sm text-zinc-300">
                        I agree to the <Link to="/terms" className="text-blue-400 hover:text-blue-300">Terms and Conditions</Link> and <Link to="/rental-agreement" className="text-blue-400 hover:text-blue-300">Rental Agreement</Link> *
                      </label>
                    </div>
                    {errors.agreeTerms && (
                      <p className="text-red-400 text-sm">{errors.agreeTerms}</p>
                    )}

                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={formData.agreePrivacy}
                        onChange={(e) => handleInputChange('agreePrivacy', e.target.checked)}
                        className="mt-1 w-4 h-4 text-blue-600 bg-zinc-800 border-zinc-600 rounded focus:ring-blue-500"
                      />
                      <label className="text-sm text-zinc-300">
                        I agree to the <Link to="/privacy" className="text-blue-400 hover:text-blue-300">Privacy Policy</Link> and consent to data processing *
                      </label>
                    </div>
                    {errors.agreePrivacy && (
                      <p className="text-red-400 text-sm">{errors.agreePrivacy}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-zinc-900 rounded-xl p-6 border border-zinc-800"
              >
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Details
                </h3>

                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Pay Later Option</h4>
                  <p className="text-zinc-400 mb-6">
                    You can complete the booking now and pay later. A small booking fee will secure your room.
                  </p>

                  <div className="bg-zinc-800 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span className="text-zinc-400">Booking Fee (Pay Now)</span>
                      <span className="text-white font-semibold">{formatCurrency(999)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-400">Remaining Amount (Pay on Move-in)</span>
                      <span className="text-white font-semibold">{formatCurrency(costs.total - 999)}</span>
                    </div>
                  </div>

                  <div className="text-xs text-zinc-500 mb-6">
                    <p className="flex items-center justify-center gap-1 mb-1">
                      <Shield className="w-3 h-3" />
                      100% Secure Payment
                    </p>
                    <p>Your payment information is encrypted and secure</p>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Booking Confirmed!</h3>
                <p className="text-zinc-400 mb-6">
                  Your room has been successfully booked. You'll receive a confirmation email shortly.
                </p>

                <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 mb-6 text-left">
                  <h4 className="font-semibold text-white mb-4">Next Steps:</h4>
                  <ul className="space-y-2 text-sm text-zinc-400">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Check your email for booking confirmation and receipt
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-500" />
                      Property manager will contact you within 24 hours
                    </li>
                    <li className="flex items-center gap-2">
                      <Home className="w-4 h-4 text-yellow-500" />
                      Complete remaining payment on move-in date
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <Link
                    to="/"
                    className="block w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Back to Search
                  </Link>
                  <button
                    onClick={() => window.print()}
                    className="block w-full border border-zinc-600 text-zinc-300 py-3 rounded-lg font-semibold hover:bg-zinc-800 transition-colors"
                  >
                    Print Confirmation
                  </button>
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
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-zinc-400">Type:</span>
                  <span className="text-white">{room.type}</span>
                </div>
              </div>

              {/* Cost Breakdown */}
              {step < 3 && (
                <div className="border-t border-zinc-800 pt-6">
                  <h5 className="font-semibold text-white mb-4">Cost Breakdown</h5>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Monthly Rent</span>
                      <span className="text-white">{formatCurrency(costs.monthlyRent)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Security Deposit</span>
                      <span className="text-white">{formatCurrency(costs.securityDeposit)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Booking Fee</span>
                      <span className="text-white">{formatCurrency(costs.bookingFee)}</span>
                    </div>
                    <div className="border-t border-zinc-800 pt-3">
                      <div className="flex justify-between font-semibold">
                        <span className="text-white">Total</span>
                        <span className="text-white">{formatCurrency(costs.total)}</span>
                      </div>
                      {step === 2 && (
                        <div className="mt-2 text-xs text-zinc-500">
                          Pay {formatCurrency(999)} now, {formatCurrency(costs.total - 999)} on move-in
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Button */}
              {step < 3 && (
                <motion.button
                  onClick={handleNextStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all mt-6"
                >
                  {step === 1 ? 'Continue to Payment' : 'Complete Booking'}
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingPage
