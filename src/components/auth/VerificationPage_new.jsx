import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const VerificationPage = () => {
  const { user, updateProfile, updateVerificationStep } = useAuth()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(user?.verificationStep || 'digilocker')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    aadhaarNumber: '',
    aadhaarFile: null,
    address: user?.profile?.address || '',
    emergencyContact: user?.profile?.emergencyContact || ''
  })

  const steps = {
    digilocker: { title: 'DigiLocker Verification', icon: '🔐' },
    aadhaar: { title: 'Aadhaar Verification', icon: '📄' },
    contact: { title: 'Emergency Contact', icon: '🚨' },
    review: { title: 'Review & Submit', icon: '✅' }
  }

  const stepOrder = ['digilocker', 'aadhaar', 'contact', 'review']
  const currentStepIndex = stepOrder.indexOf(currentStep)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({ ...formData, aadhaarFile: file })
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
      case 'digilocker':
        return true // DigiLocker mock verification
      case 'aadhaar':
        return formData.aadhaarNumber.length === 12 && formData.aadhaarFile !== null
      case 'contact':
        return formData.emergencyContact.trim() !== '' && formData.address.trim() !== ''
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
          <h1 className='text-3xl font-bold text-white mb-2'>Room Owner Verification</h1>
          <p className='text-white/60'>Complete DigiLocker verification to start listing rooms</p>
        </div>

        {/* Progress Bar */}
        <div className='bg-black/30 backdrop-blur-md rounded-3xl p-8 border border-white/10 mb-6'>
          <div className='flex items-center justify-between mb-8'>
            {stepOrder.map((step, index) => (
              <div key={step} className='flex flex-col items-center flex-1 relative'>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 border-2 transition-all text-xl ${index <= currentStepIndex
                  ? 'bg-blue-500 border-blue-500 text-white'
                  : 'bg-black/20 border-white/20 text-white/50'
                  }`}>
                  {steps[step].icon}
                </div>
                <span className={`text-xs text-center max-w-20 ${index <= currentStepIndex ? 'text-blue-300' : 'text-white/50'
                  }`}>
                  {steps[step].title}
                </span>
                {index < stepOrder.length - 1 && (
                  <div className={`absolute top-6 left-1/2 w-full h-0.5 -z-10 ${index < currentStepIndex ? 'bg-blue-500' : 'bg-white/20'
                    }`} style={{ transform: 'translateX(25%)' }} />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className='min-h-[300px]'>
            {currentStep === 'digilocker' && (
              <div className='space-y-6'>
                <div className='text-center'>
                  <h2 className='text-xl font-semibold text-white mb-2'>DigiLocker Integration</h2>
                  <p className='text-white/60'>Securely connect your DigiLocker account for document verification</p>
                </div>

                <div className='bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/30 rounded-2xl p-8 text-center'>
                  <div className='text-6xl mb-4'>🔐</div>
                  <h3 className='text-white font-semibold mb-3 text-lg'>Secure DigiLocker Verification</h3>
                  <p className='text-white/70 mb-6'>
                    Connect with DigiLocker to automatically verify your documents and identity.
                    This ensures a secure and trusted platform for all users.
                  </p>

                  {/* Currently Disabled Notice */}
                  <div className='bg-yellow-500/10 border border-yellow-400/30 rounded-xl p-4 mb-6'>
                    <div className='flex items-center justify-center gap-2 text-yellow-300 text-sm'>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.729-.833-2.499 0L4.315 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <span>DigiLocker verification is currently disabled for demo</span>
                    </div>
                  </div>

                  <button
                    disabled={true}
                    className='bg-blue-600/50 text-white/70 px-6 py-3 rounded-xl font-medium transition-all cursor-not-allowed'
                  >
                    <div className='flex items-center gap-2'>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      Connect with DigiLocker (Disabled)
                    </div>
                  </button>

                  <div className='mt-4'>
                    <p className='text-green-300 text-sm flex items-center justify-center gap-2'>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Mock verification completed for demo purposes
                    </p>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 'aadhaar' && (
              <div className='space-y-6'>
                <div className='text-center'>
                  <h2 className='text-xl font-semibold text-white mb-2'>Aadhaar Card Verification</h2>
                  <p className='text-white/60'>Upload your Aadhaar card and enter the number for verification</p>
                </div>

                <div>
                  <label className='text-white/90 text-sm font-medium mb-2 block'>
                    Aadhaar Number <span className='text-red-400'>*</span>
                  </label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                      </svg>
                    </div>
                    <input
                      type='text'
                      name='aadhaarNumber'
                      value={formData.aadhaarNumber}
                      onChange={handleChange}
                      maxLength={12}
                      className='w-full bg-black/20 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500'
                      placeholder='Enter 12-digit Aadhaar number'
                    />
                  </div>
                  <p className='text-white/50 text-xs mt-1'>
                    {formData.aadhaarNumber.length}/12 digits
                  </p>
                </div>

                <div>
                  <label className='text-white/90 text-sm font-medium mb-2 block'>
                    Upload Aadhaar Card <span className='text-red-400'>*</span>
                  </label>
                  <div className='relative'>
                    <input
                      type='file'
                      onChange={handleFileChange}
                      accept='image/*,.pdf'
                      className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                    />
                    <div className='w-full bg-black/20 border-2 border-dashed border-white/20 hover:border-white/30 rounded-xl px-6 py-8 text-center transition-all'>
                      {formData.aadhaarFile ? (
                        <div className='flex flex-col items-center gap-2'>
                          <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className='text-white font-medium'>{formData.aadhaarFile.name}</span>
                          <span className='text-white/50 text-sm'>Click to change file</span>
                        </div>
                      ) : (
                        <div className='flex flex-col items-center gap-2'>
                          <svg className="w-8 h-8 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <span className='text-white/70'>Upload Aadhaar Card</span>
                          <span className='text-white/50 text-sm'>PDF, JPG, PNG (Max 5MB)</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className='bg-blue-500/10 border border-blue-400/30 rounded-xl p-4'>
                  <div className='flex items-start gap-3'>
                    <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className='text-blue-300 text-sm font-medium mb-1'>Why do we need Aadhaar verification?</p>
                      <p className='text-blue-200/70 text-xs'>
                        This helps us verify your identity and ensures a safe, trusted platform for all students looking for accommodation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 'contact' && (
              <div className='space-y-6'>
                <div className='text-center'>
                  <h2 className='text-xl font-semibold text-white mb-2'>Contact Information</h2>
                  <p className='text-white/60'>Provide your address and emergency contact details</p>
                </div>

                <div>
                  <label className='text-white/90 text-sm font-medium mb-2 block'>
                    Complete Address <span className='text-red-400'>*</span>
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

                <div>
                  <label className='text-white/90 text-sm font-medium mb-2 block'>
                    Emergency Contact Number <span className='text-red-400'>*</span>
                  </label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <input
                      type='tel'
                      name='emergencyContact'
                      value={formData.emergencyContact}
                      onChange={handleChange}
                      className='w-full bg-black/20 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500'
                      placeholder='+91 XXXXX XXXXX'
                    />
                  </div>
                  <p className='text-white/50 text-xs mt-2'>
                    This should be a family member or close friend who can be reached in case of emergency
                  </p>
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
                    <div className='flex items-center gap-3 mb-2'>
                      <div className='text-2xl'>🔐</div>
                      <h3 className='text-white font-medium'>DigiLocker Verification</h3>
                    </div>
                    <p className='text-green-300 text-sm'>✓ Completed (Demo Mode)</p>
                  </div>

                  <div className='bg-black/20 rounded-xl p-4'>
                    <div className='flex items-center gap-3 mb-2'>
                      <div className='text-2xl'>📄</div>
                      <h3 className='text-white font-medium'>Aadhaar Verification</h3>
                    </div>
                    <p className='text-white/70 text-sm'>Number: {formData.aadhaarNumber}</p>
                    <p className='text-white/70 text-sm'>
                      Document: {formData.aadhaarFile ? formData.aadhaarFile.name : 'Not uploaded'}
                    </p>
                  </div>

                  <div className='bg-black/20 rounded-xl p-4'>
                    <div className='flex items-center gap-3 mb-2'>
                      <div className='text-2xl'>📍</div>
                      <h3 className='text-white font-medium'>Address</h3>
                    </div>
                    <p className='text-white/70 text-sm'>{formData.address}</p>
                  </div>

                  <div className='bg-black/20 rounded-xl p-4'>
                    <div className='flex items-center gap-3 mb-2'>
                      <div className='text-2xl'>🚨</div>
                      <h3 className='text-white font-medium'>Emergency Contact</h3>
                    </div>
                    <p className='text-white/70 text-sm'>{formData.emergencyContact}</p>
                  </div>
                </div>

                <div className='bg-yellow-500/10 border border-yellow-400/30 rounded-xl p-4'>
                  <div className='flex items-start gap-3'>
                    <svg className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className='text-yellow-300 text-sm font-medium mb-1'>Verification Timeline</p>
                      <p className='text-yellow-200/70 text-xs'>
                        Your account will be reviewed within 24-48 hours. You'll receive an email notification once approved.
                      </p>
                    </div>
                  </div>
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
              className='px-6 py-3 bg-black/20 border border-white/10 hover:border-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all flex items-center gap-2'
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            <button
              onClick={currentStep === 'review' ? handleSubmit : handleNext}
              disabled={!canProceed() || loading}
              className='px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all transform hover:scale-105 flex items-center gap-2'
            >
              {loading ? (
                <>
                  <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div>
                  {currentStep === 'review' ? 'Submitting...' : 'Saving...'}
                </>
              ) : currentStep === 'review' ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Submit for Review
                </>
              ) : (
                <>
                  Next
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerificationPage
