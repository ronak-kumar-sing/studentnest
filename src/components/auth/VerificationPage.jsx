import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const VerificationPage = () => {
  const { user, updateProfile, updateVerificationStep, uploadAvatar } = useAuth()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(user?.verificationStep || 'address')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    address: user?.profile?.address || '',
    emergencyContact: user?.profile?.emergencyContact || '',
    selfie: null
  })

  const steps = {
    address: { title: 'Address Verification', icon: '📍' },
    contact: { title: 'Contact Verification', icon: '📞' },
    emergency: { title: 'Emergency Contact', icon: '🚨' },
    identity: { title: 'Identity Verification', icon: '📸' },
    review: { title: 'Review & Submit', icon: '✅' }
  }

  const stepOrder = ['address', 'contact', 'emergency', 'identity', 'review']
  const currentStepIndex = stepOrder.indexOf(currentStep)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({ ...formData, selfie: file })
    }
  }

  const handleNext = async () => {
    setLoading(true)
    try {
      // Save current step data
      await updateProfile({
        profile: {
          ...user.profile,
          ...formData
        }
      })

      const nextStepIndex = currentStepIndex + 1
      if (nextStepIndex < stepOrder.length) {
        const nextStep = stepOrder[nextStepIndex]
        setCurrentStep(nextStep)
        updateVerificationStep(nextStep)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      // Upload selfie if provided
      if (formData.selfie) {
        await uploadAvatar(formData.selfie)
      }

      // Mark as verified
      await updateProfile({
        isVerified: true,
        verificationStep: 'completed',
        profile: {
          ...user.profile,
          ...formData
        }
      })

      // Redirect to owner dashboard
      navigate('/owner-dashboard')
    } finally {
      setLoading(false)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 'address':
        return formData.address.trim() !== ''
      case 'contact':
        return true // Mock verification
      case 'emergency':
        return formData.emergencyContact.trim() !== ''
      case 'identity':
        return formData.selfie !== null
      case 'review':
        return true
      default:
        return false
    }
  }

  return (
    <div className='min-h-screen bg-[#060010]/98 flex items-center justify-center px-4'>
      <div className='max-w-2xl w-full'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-white mb-2'>Account Verification</h1>
          <p className='text-white/60'>Complete your profile to start listing rooms</p>
        </div>

        {/* Progress Bar */}
        <div className='bg-black/30 backdrop-blur-md rounded-3xl p-8 border border-white/10 mb-6'>
          <div className='flex items-center justify-between mb-8'>
            {stepOrder.map((step, index) => (
              <div key={step} className='flex flex-col items-center flex-1'>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 border-2 transition-all ${index <= currentStepIndex
                  ? 'bg-blue-500 border-blue-500 text-white'
                  : 'bg-black/20 border-white/20 text-white/50'
                  }`}>
                  {steps[step].icon}
                </div>
                <span className={`text-xs text-center ${index <= currentStepIndex ? 'text-blue-300' : 'text-white/50'
                  }`}>
                  {steps[step].title}
                </span>
                {index < stepOrder.length - 1 && (
                  <div className={`absolute top-6 left-1/2 w-full h-0.5 -z-10 ${index < currentStepIndex ? 'bg-blue-500' : 'bg-white/20'
                    }`} style={{ transform: 'translateX(50%)' }} />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className='min-h-[300px]'>
            {currentStep === 'address' && (
              <div className='space-y-6'>
                <div className='text-center'>
                  <h2 className='text-xl font-semibold text-white mb-2'>Address Verification</h2>
                  <p className='text-white/60'>Please provide your current address for verification</p>
                </div>
                <div>
                  <label className='text-white/90 text-sm font-medium mb-2 block'>
                    Room Owner Address <span className='text-red-400'>*</span>
                  </label>
                  <textarea
                    name='address'
                    value={formData.address}
                    onChange={handleChange}
                    rows={4}
                    className='w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    placeholder='Enter your complete address including city, state, and PIN code'
                  />
                </div>
              </div>
            )}

            {currentStep === 'contact' && (
              <div className='space-y-6'>
                <div className='text-center'>
                  <h2 className='text-xl font-semibold text-white mb-2'>Contact Verification</h2>
                  <p className='text-white/60'>Verify your contact information via Digilocker</p>
                </div>
                <div className='bg-blue-500/10 border border-blue-400/30 rounded-xl p-6 text-center'>
                  <div className='text-4xl mb-4'>🔐</div>
                  <h3 className='text-white font-semibold mb-2'>Digilocker Integration</h3>
                  <p className='text-white/70 mb-4'>Securely verify your phone number and email using Digilocker</p>
                  <button className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all'>
                    Connect with Digilocker
                  </button>
                </div>
                <div className='text-center'>
                  <p className='text-green-300 text-sm'>✓ Mock verification completed for demo</p>
                </div>
              </div>
            )}

            {currentStep === 'emergency' && (
              <div className='space-y-6'>
                <div className='text-center'>
                  <h2 className='text-xl font-semibold text-white mb-2'>Emergency Contact</h2>
                  <p className='text-white/60'>Provide an emergency contact for safety purposes</p>
                </div>
                <div>
                  <label className='text-white/90 text-sm font-medium mb-2 block'>
                    Emergency Contact Number <span className='text-red-400'>*</span>
                  </label>
                  <input
                    type='tel'
                    name='emergencyContact'
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    className='w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    placeholder='+91 XXXXX XXXXX'
                  />
                  <p className='text-white/50 text-xs mt-2'>This should be a family member or close friend who can be reached in case of emergency</p>
                </div>
              </div>
            )}

            {currentStep === 'identity' && (
              <div className='space-y-6'>
                <div className='text-center'>
                  <h2 className='text-xl font-semibold text-white mb-2'>Identity Verification</h2>
                  <p className='text-white/60'>Upload a clear selfie photo for identity verification</p>
                </div>
                <div className='flex flex-col items-center space-y-4'>
                  {formData.selfie ? (
                    <div className='relative'>
                      <img
                        src={URL.createObjectURL(formData.selfie)}
                        alt='Selfie preview'
                        className='w-32 h-32 rounded-full object-cover border-4 border-blue-400'
                      />
                      <button
                        onClick={() => setFormData({ ...formData, selfie: null })}
                        className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs'
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className='w-32 h-32 rounded-full bg-black/20 border-2 border-dashed border-white/30 flex items-center justify-center'>
                      <span className='text-white/50 text-sm'>No photo</span>
                    </div>
                  )}

                  <div className='flex gap-3'>
                    <label className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium transition-all cursor-pointer'>
                      📷 Camera
                      <input
                        type='file'
                        onChange={handleFileChange}
                        accept='image/*'
                        capture='user'
                        className='hidden'
                      />
                    </label>
                    <label className='bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl font-medium transition-all cursor-pointer'>
                      📁 Gallery
                      <input
                        type='file'
                        onChange={handleFileChange}
                        accept='image/*'
                        className='hidden'
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 'review' && (
              <div className='space-y-6'>
                <div className='text-center'>
                  <h2 className='text-xl font-semibold text-white mb-2'>Review & Submit</h2>
                  <p className='text-white/60'>Please review your information before submission</p>
                </div>
                <div className='space-y-4'>
                  <div className='bg-black/20 rounded-xl p-4'>
                    <h3 className='text-white font-medium mb-2'>📍 Address</h3>
                    <p className='text-white/70 text-sm'>{formData.address}</p>
                  </div>
                  <div className='bg-black/20 rounded-xl p-4'>
                    <h3 className='text-white font-medium mb-2'>📞 Contact</h3>
                    <p className='text-white/70 text-sm'>✓ Verified via Digilocker</p>
                  </div>
                  <div className='bg-black/20 rounded-xl p-4'>
                    <h3 className='text-white font-medium mb-2'>🚨 Emergency Contact</h3>
                    <p className='text-white/70 text-sm'>{formData.emergencyContact}</p>
                  </div>
                  <div className='bg-black/20 rounded-xl p-4'>
                    <h3 className='text-white font-medium mb-2'>📸 Identity</h3>
                    <p className='text-white/70 text-sm'>
                      {formData.selfie ? '✓ Photo uploaded' : '✗ No photo uploaded'}
                    </p>
                  </div>
                </div>
                <div className='bg-yellow-500/10 border border-yellow-400/30 rounded-xl p-4'>
                  <p className='text-yellow-300 text-sm'>
                    ⏳ Your account will be reviewed within 24-48 hours. You'll receive an email notification once approved.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className='flex justify-between mt-8'>
            <button
              onClick={() => {
                const prevStepIndex = currentStepIndex - 1
                if (prevStepIndex >= 0) {
                  const prevStep = stepOrder[prevStepIndex]
                  setCurrentStep(prevStep)
                  updateVerificationStep(prevStep)
                }
              }}
              disabled={currentStepIndex === 0}
              className='px-6 py-3 bg-black/20 border border-white/10 hover:border-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all'
            >
              Back
            </button>

            <button
              onClick={currentStep === 'review' ? handleSubmit : handleNext}
              disabled={!canProceed() || loading}
              className='px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all transform hover:scale-105'
            >
              {loading ? (
                <div className='flex items-center'>
                  <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3'></div>
                  {currentStep === 'review' ? 'Submitting...' : 'Saving...'}
                </div>
              ) : currentStep === 'review' ? (
                'Submit for Review'
              ) : (
                'Next'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerificationPage
