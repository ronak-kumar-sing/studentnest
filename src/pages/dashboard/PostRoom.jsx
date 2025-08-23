import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Upload,
  X,
  Plus,
  Home,
  Users,
  MapPin,
  Camera,
  Check
} from 'lucide-react'
import ImageUpload from              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Room Size (sq ft)
                </label>
                <input
                  type="number"
                  value={formData.size}
                  onChange={(e) => handleInputChange('size', e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-white/60"
                  placeholder="e.g., 120"
                />
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {currentStep === 2 && (
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Basic Information
    title: '',
    description: '',
    roomType: '',
    size: '',

    // Location
    address: '',
    city: '',
    state: '',
    pincode: '',
    nearbyLandmarks: '',

    // Pricing
    monthlyRent: '',
    securityDeposit: '',
    maintenanceCharges: '',

    // Amenities
    amenities: [],

    // Availability
    availableFrom: '',
    preferredTenant: '',

    // Images
    images: [],

    // Additional Details
    furnishingStatus: '',
    floorNumber: '',
    totalFloors: '',
    facing: '',
    ageOfProperty: '',

    // Rules
    rules: {
      smoking: false,
      drinking: false,
      pets: false,
      parties: false,
      visitors: 'allowed' // allowed, restricted, notAllowed
    }
  })

  const roomTypes = [
    { id: 'single', name: 'Single Room', icon: Home },
    { id: 'double', name: 'Double Room', icon: Users },
    { id: 'shared', name: 'Shared Room', icon: Users },
    { id: 'studio', name: 'Studio Apartment', icon: Home }
  ]

  // Get all amenities organized by category
  const amenitiesCategories = getAmenitiesByCategory()

  const steps = [
    { id: 1, name: 'Basic Info', description: 'Room details and type' },
    { id: 2, name: 'Location', description: 'Address and location details' },
    { id: 3, name: 'Pricing', description: 'Rent and charges' },
    { id: 4, name: 'Amenities', description: 'Available facilities' },
    { id: 5, name: 'Images', description: 'Upload room photos' },
    { id: 6, name: 'Additional', description: 'Extra details and rules' }
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAmenityToggle = (amenityId) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(id => id !== amenityId)
        : [...prev.amenities, amenityId]
    }))
  }

  const handleSubmit = async () => {
    try {
      // API call to create room
      console.log('Creating room with data:', formData)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      navigate('/dashboard?success=Room posted successfully!')
    } catch (error) {
      console.error('Error creating room:', error)
    }
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return formData.title && formData.description && formData.roomType && formData.size
      case 2:
        return formData.address && formData.city && formData.state && formData.pincode
      case 3:
        return formData.monthlyRent && formData.securityDeposit
      case 4:
        return formData.amenities.length > 0
      case 5:
        return formData.images.length > 0
      case 6:
        return formData.furnishingStatus && formData.availableFrom
      default:
        return true
    }
  }

  return (
    <div className="min-h-screen bg-transparent">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-white/70" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">Post New Room</h1>
                <p className="text-white/70">Step {currentStep} of {steps.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${currentStep >= step.id
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'border-zinc-300 text-zinc-400'
                  }`}>
                  {currentStep > step.id ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-2 ${currentStep > step.id ? 'bg-blue-600' : 'bg-zinc-300'
                    }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-lg font-semibold text-white">{steps[currentStep - 1].name}</h2>
            <p className="text-sm text-white/70">{steps[currentStep - 1].description}</p>
          </div>
        </div>

        {/* Form Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8"
        >
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Room Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-white/60"
                  placeholder="e.g., Spacious Single Room near University"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-white/60"
                  placeholder="Describe your room, its features, and what makes it special..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-4">
                  Room Type *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {roomTypes.map((type) => (
                    <div
                      key={type.id}
                      onClick={() => handleInputChange('roomType', type.id)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.roomType === type.id
                        ? 'border-blue-400 bg-blue-500/20 backdrop-blur-sm'
                        : 'border-white/30 bg-white/10 backdrop-blur-sm hover:border-white/50'
                        }`}
                    >
                      <type.icon className={`w-6 h-6 mx-auto mb-2 ${formData.roomType === type.id ? 'text-blue-300' : 'text-white/70'
                        }`} />
                      <p className={`text-sm font-medium text-center ${formData.roomType === type.id ? 'text-blue-300' : 'text-white'
                        }`}>
                        {type.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Room Size (sq ft) *
                </label>
                <input
                  type="number"
                  value={formData.size}
                  onChange={(e) => handleInputChange('size', e.target.value)}
                  className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 120"
                />
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Complete Address *
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter complete address with building name, street, area..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Mumbai"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Maharashtra"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  PIN Code *
                </label>
                <input
                  type="text"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange('pincode', e.target.value)}
                  className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 400001"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Nearby Landmarks
                </label>
                <input
                  type="text"
                  value={formData.nearbyLandmarks}
                  onChange={(e) => handleInputChange('nearbyLandmarks', e.target.value)}
                  className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Near XYZ University, ABC Mall, Metro Station"
                />
              </div>
            </div>
          )}

          {/* Step 3: Pricing */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Monthly Rent (₹) *
                </label>
                <input
                  type="number"
                  value={formData.monthlyRent}
                  onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
                  className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 15000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Security Deposit (₹) *
                </label>
                <input
                  type="number"
                  value={formData.securityDeposit}
                  onChange={(e) => handleInputChange('securityDeposit', e.target.value)}
                  className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 30000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Maintenance Charges (₹/month)
                </label>
                <input
                  type="number"
                  value={formData.maintenanceCharges}
                  onChange={(e) => handleInputChange('maintenanceCharges', e.target.value)}
                  className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 2000 (optional)"
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Pricing Summary</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-800">Monthly Rent:</span>
                    <span className="font-medium text-blue-900">
                      {formData.monthlyRent ? `₹${parseInt(formData.monthlyRent).toLocaleString()}` : '₹0'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-800">Security Deposit:</span>
                    <span className="font-medium text-blue-900">
                      {formData.securityDeposit ? `₹${parseInt(formData.securityDeposit).toLocaleString()}` : '₹0'}
                    </span>
                  </div>
                  {formData.maintenanceCharges && (
                    <div className="flex justify-between">
                      <span className="text-blue-800">Maintenance:</span>
                      <span className="font-medium text-blue-900">
                        ₹{parseInt(formData.maintenanceCharges).toLocaleString()}/month
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Amenities */}
          {currentStep === 4 && (
            <div className="space-y-8">
              <div>
                <label className="block text-lg font-semibold text-zinc-800 mb-6">
                  Select Available Amenities *
                </label>

                {/* Amenities organized by categories */}
                <div className="space-y-8">
                  {amenitiesCategories.map((category) => (
                    <div key={category.key} className="space-y-4">
                      <h3 className="text-md font-medium text-zinc-700 border-b border-zinc-200 pb-2">
                        {category.name}
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {category.items.map((amenity) => (
                          <div
                            key={amenity.id}
                            onClick={() => handleAmenityToggle(amenity.id)}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${formData.amenities.includes(amenity.id)
                              ? 'border-blue-600 bg-blue-50'
                              : 'border-zinc-200 hover:border-zinc-300'
                              }`}
                          >
                            <amenity.icon className={`w-6 h-6 mx-auto mb-2 ${formData.amenities.includes(amenity.id) ? 'text-blue-600' : 'text-zinc-600'
                              }`} />
                            <p className={`text-sm font-medium text-center ${formData.amenities.includes(amenity.id) ? 'text-blue-600' : 'text-zinc-900'
                              }`}>
                              {amenity.name}
                            </p>
                            {amenity.description && (
                              <p className="text-xs text-zinc-500 text-center mt-1">
                                {amenity.description}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {formData.amenities.length > 0 && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Selected Amenities ({formData.amenities.length})</h4>
                  <div className="flex flex-wrap gap-2">
                    {formData.amenities.map((amenityId) => {
                      // Find amenity in all categories
                      let foundAmenity = null
                      amenitiesCategories.forEach(category => {
                        const amenity = category.items.find(a => a.id === amenityId)
                        if (amenity) foundAmenity = amenity
                      })
                      return foundAmenity ? (
                        <span
                          key={amenityId}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium flex items-center gap-1"
                        >
                          <foundAmenity.icon size={14} />
                          {foundAmenity.name}
                        </span>
                      ) : null
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 5: Images */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-4">
                  Upload Room Photos *
                </label>
                <ImageUpload
                  images={formData.images}
                  onImagesChange={(images) => handleInputChange('images', images)}
                  maxImages={10}
                />
              </div>
            </div>
          )}

          {/* Step 6: Additional Details */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">
                    Furnishing Status *
                  </label>
                  <select
                    value={formData.furnishingStatus}
                    onChange={(e) => handleInputChange('furnishingStatus', e.target.value)}
                    className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select furnishing status</option>
                    <option value="fully-furnished">Fully Furnished</option>
                    <option value="semi-furnished">Semi Furnished</option>
                    <option value="unfurnished">Unfurnished</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">
                    Available From *
                  </label>
                  <input
                    type="date"
                    value={formData.availableFrom}
                    onChange={(e) => handleInputChange('availableFrom', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">
                    Floor Number
                  </label>
                  <input
                    type="number"
                    value={formData.floorNumber}
                    onChange={(e) => handleInputChange('floorNumber', e.target.value)}
                    className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">
                    Total Floors
                  </label>
                  <input
                    type="number"
                    value={formData.totalFloors}
                    onChange={(e) => handleInputChange('totalFloors', e.target.value)}
                    className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">
                    Facing Direction
                  </label>
                  <select
                    value={formData.facing}
                    onChange={(e) => handleInputChange('facing', e.target.value)}
                    className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select direction</option>
                    <option value="north">North</option>
                    <option value="south">South</option>
                    <option value="east">East</option>
                    <option value="west">West</option>
                    <option value="north-east">North East</option>
                    <option value="north-west">North West</option>
                    <option value="south-east">South East</option>
                    <option value="south-west">South West</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Preferred Tenant Type
                </label>
                <select
                  value={formData.preferredTenant}
                  onChange={(e) => handleInputChange('preferredTenant', e.target.value)}
                  className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">No preference</option>
                  <option value="students">Students Only</option>
                  <option value="professionals">Working Professionals</option>
                  <option value="family">Family</option>
                  <option value="bachelor">Bachelor</option>
                </select>
              </div>
            </div>
          )}
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-6 py-3 border border-zinc-300 text-zinc-700 rounded-lg hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          <div className="flex gap-4">
            {currentStep === steps.length ? (
              <button
                onClick={handleSubmit}
                disabled={!isStepValid(currentStep)}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Post Room
              </button>
            ) : (
              <button
                onClick={nextStep}
                disabled={!isStepValid(currentStep)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostRoom
