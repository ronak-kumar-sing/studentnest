import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const VerificationPage = () => {
  const { user, updateProfile, updateVerificationStep } = useAuth()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState('digilocker') // Force initial step
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    aadhaarNumber: '',
    aadhaarFile: null,
    address: '',
    emergencyContact: ''
  })

  console.log('Current user:', user) // Debug log
  console.log('Current step:', currentStep) // Debug log

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
      if (updateProfile) {
        await updateProfile({
          profile: {
            ...user?.profile,
            ...formData
          }
        })
      }

      const nextStepIndex = currentStepIndex + 1
      if (nextStepIndex < stepOrder.length) {
        const nextStep = stepOrder[nextStepIndex]
        setCurrentStep(nextStep)
        if (updateVerificationStep) {
          updateVerificationStep(nextStep)
        }
      }
    } catch (error) {
      console.error('Error saving step:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      // Mark as verified
      if (updateProfile) {
        await updateProfile({
          isVerified: true,
          verificationStep: 'completed',
          profile: {
            ...user?.profile,
            ...formData
          }
        })
      }

      // Redirect to owner dashboard
      navigate('/owner-dashboard')
    } catch (error) {
      console.error('Error submitting verification:', error)
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
    <div className='min-h-screen bg-gradient-to-b from-[#060010] to-[#0a0015] flex items-center justify-center px-4 py-8'>
      <div className='max-w-4xl w-full'>
        {/* Header */}
        <div className='text-center mb-8'>
          <div className='inline-flex items-center gap-3 mb-4'>
            <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center'>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h1 className='text-4xl font-bold text-white'>Room Owner Verification</h1>
            </div>
          </div>
          <p className='text-white/70 text-lg'>Complete verification to start listing rooms on StudentNest</p>
        </div>

        {/* Main Content Card */}
        <div className='bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden'>
          {/* Progress Bar */}
          <div className='bg-gradient-to-r from-blue-500/5 to-purple-500/5 p-8 border-b border-white/10'>
            <div className='flex items-center justify-between relative'>
              {stepOrder.map((step, index) => (
                <div key={step} className='flex flex-col items-center flex-1 relative z-10'>
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 border-2 transition-all duration-300 text-2xl ${index <= currentStepIndex
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 border-blue-400 text-white shadow-lg'
                    : 'bg-black/30 border-white/20 text-white/50'
                    }`}>
                    {steps[step].icon}
                  </div>
                  <span className={`text-sm font-medium text-center max-w-24 transition-colors ${index <= currentStepIndex ? 'text-blue-300' : 'text-white/50'
                    }`}>
                    {steps[step].title}
                  </span>
                </div>
              ))}
              {/* Progress Line */}
              <div className='absolute top-7 left-0 right-0 h-0.5 bg-white/10'>
                <div
                  className='h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500'
                  style={{ width: `${(currentStepIndex / (stepOrder.length - 1)) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className='p-8'>
            <div className='min-h-[400px]'>
              {currentStep === 'digilocker' && (
                <div className='space-y-6'>
                  <div className='text-center'>
                    <h2 className='text-2xl font-semibold text-white mb-3'>DigiLocker Integration</h2>
                    <p className='text-white/60 text-lg'>Securely connect your DigiLocker account for document verification</p>
                  </div>

                  <div className='bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/30 rounded-2xl p-8 text-center'>
                    <div className='text-6xl mb-6'>🔐</div>
                    <h3 className='text-white font-semibold mb-4 text-xl'>Secure DigiLocker Verification</h3>
                    <p className='text-white/70 mb-8 text-lg leading-relaxed max-w-2xl mx-auto'>
                      Connect with DigiLocker to automatically verify your documents and identity.
                      This ensures a secure and trusted platform for all users.
                    </p>

                    {/* Currently Disabled Notice */}
                    <div className='bg-yellow-500/10 border border-yellow-400/30 rounded-xl p-6 mb-8'>
                      <div className='flex items-center justify-center gap-3 text-yellow-300'>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.729-.833-2.499 0L4.315 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <span className='text-lg font-medium'>DigiLocker verification is currently disabled for demo</span>
                      </div>
                    </div>

                    <button
                      disabled={true}
                      className='bg-blue-600/50 text-white/70 px-8 py-4 rounded-xl font-medium transition-all cursor-not-allowed text-lg'
                    >
                      <div className='flex items-center justify-center gap-3'>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        Connect with DigiLocker (Disabled)
                      </div>
                    </button>

                    <div className='mt-6'>
                      <p className='text-green-300 flex items-center justify-center gap-2 text-lg font-medium'>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Mock verification completed for demo purposes
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 'aadhaar' && (
                <div className='space-y-8'>
                  <div className='text-center'>
                    <h2 className='text-2xl font-semibold text-white mb-3'>Aadhaar Card Verification</h2>
                    <p className='text-white/60 text-lg'>Upload your Aadhaar card and enter the number for verification</p>
                  </div>

                  <div className='grid md:grid-cols-2 gap-8'>
                    <div>
                      <label className='text-white/90 text-lg font-medium mb-3 block'>
                        Aadhaar Number <span className='text-red-400'>*</span>
                      </label>
                      <div className='relative'>
                        <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                          <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                          </svg>
                        </div>
                        <input
                          type='text'
                          name='aadhaarNumber'
                          value={formData.aadhaarNumber}
                          onChange={handleChange}
                          maxLength={12}
                          className='w-full bg-black/20 border border-white/20 rounded-xl pl-12 pr-4 py-4 text-white text-lg placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
                          placeholder='Enter 12-digit Aadhaar number'
                        />
                      </div>
                      <p className='text-white/50 text-sm mt-2'>
                        {formData.aadhaarNumber.length}/12 digits
                      </p>
                    </div>

                    <div>
                      <label className='text-white/90 text-lg font-medium mb-3 block'>
                        Upload Aadhaar Card <span className='text-red-400'>*</span>
                      </label>
                      <div className='relative'>
                        <input
                          type='file'
                          onChange={handleFileChange}
                          accept='image/*,.pdf'
                          className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                        />
                        <div className='w-full bg-black/20 border-2 border-dashed border-white/20 hover:border-white/30 rounded-xl px-6 py-8 text-center transition-all min-h-[120px] flex flex-col justify-center'>
                          {formData.aadhaarFile ? (
                            <div className='flex flex-col items-center gap-3'>
                              <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className='text-white font-medium text-lg'>{formData.aadhaarFile.name}</span>
                              <span className='text-white/50'>Click to change file</span>
                            </div>
                          ) : (
                            <div className='flex flex-col items-center gap-3'>
                              <svg className="w-10 h-10 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                              </svg>
                              <span className='text-white/70 text-lg'>Upload Aadhaar Card</span>
                              <span className='text-white/50'>PDF, JPG, PNG (Max 5MB)</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='bg-blue-500/10 border border-blue-400/30 rounded-xl p-6'>
                    <div className='flex items-start gap-4'>
                      <svg className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className='text-blue-300 font-medium mb-2 text-lg'>Why do we need Aadhaar verification?</p>
                        <p className='text-blue-200/70 leading-relaxed'>
                          This helps us verify your identity and ensures a safe, trusted platform for all students looking for accommodation.
                          Your Aadhaar information is securely encrypted and used only for verification purposes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 'contact' && (
                <div className='space-y-8'>
                  <div className='text-center'>
                    <h2 className='text-2xl font-semibold text-white mb-3'>Contact Information</h2>
                    <p className='text-white/60 text-lg'>Provide your address and emergency contact details</p>
                  </div>

                  <div className='space-y-6'>
                    <div>
                      <label className='text-white/90 text-lg font-medium mb-3 block'>
                        Complete Address <span className='text-red-400'>*</span>
                      </label>
                      <textarea
                        name='address'
                        value={formData.address}
                        onChange={handleChange}
                        rows={4}
                        className='w-full bg-black/20 border border-white/20 rounded-xl px-4 py-4 text-white text-lg placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
                        placeholder='Enter your complete address including city, state, and PIN code'
                      />
                    </div>

                    <div>
                      <label className='text-white/90 text-lg font-medium mb-3 block'>
                        Emergency Contact Number <span className='text-red-400'>*</span>
                      </label>
                      <div className='relative'>
                        <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                          <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <input
                          type='tel'
                          name='emergencyContact'
                          value={formData.emergencyContact}
                          onChange={handleChange}
                          className='w-full bg-black/20 border border-white/20 rounded-xl pl-12 pr-4 py-4 text-white text-lg placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
                          placeholder='+91 XXXXX XXXXX'
                        />
                      </div>
                      <p className='text-white/50 mt-2'>
                        This should be a family member or close friend who can be reached in case of emergency
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 'review' && (
                <div className='space-y-8'>
                  <div className='text-center'>
                    <h2 className='text-2xl font-semibold text-white mb-3'>Review & Submit</h2>
                    <p className='text-white/60 text-lg'>Please review your information before submission</p>
                  </div>

                  <div className='grid gap-6'>
                    <div className='bg-black/20 rounded-xl p-6'>
                      <div className='flex items-center gap-4 mb-3'>
                        <div className='text-3xl'>🔐</div>
                        <h3 className='text-white font-semibold text-xl'>DigiLocker Verification</h3>
                      </div>
                      <p className='text-green-300 text-lg'>✓ Completed (Demo Mode)</p>
                    </div>

                    <div className='bg-black/20 rounded-xl p-6'>
                      <div className='flex items-center gap-4 mb-3'>
                        <div className='text-3xl'>📄</div>
                        <h3 className='text-white font-semibold text-xl'>Aadhaar Verification</h3>
                      </div>
                      <p className='text-white/70 text-lg mb-1'>Number: {formData.aadhaarNumber || 'Not provided'}</p>
                      <p className='text-white/70 text-lg'>
                        Document: {formData.aadhaarFile ? formData.aadhaarFile.name : 'Not uploaded'}
                      </p>
                    </div>

                    <div className='bg-black/20 rounded-xl p-6'>
                      <div className='flex items-center gap-4 mb-3'>
                        <div className='text-3xl'>📍</div>
                        <h3 className='text-white font-semibold text-xl'>Address</h3>
                      </div>
                      <p className='text-white/70 text-lg'>{formData.address || 'Not provided'}</p>
                    </div>

                    <div className='bg-black/20 rounded-xl p-6'>
                      <div className='flex items-center gap-4 mb-3'>
                        <div className='text-3xl'>🚨</div>
                        <h3 className='text-white font-semibold text-xl'>Emergency Contact</h3>
                      </div>
                      <p className='text-white/70 text-lg'>{formData.emergencyContact || 'Not provided'}</p>
                    </div>
                  </div>

                  <div className='bg-yellow-500/10 border border-yellow-400/30 rounded-xl p-6'>
                    <div className='flex items-start gap-4'>
                      <svg className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className='text-yellow-300 font-medium mb-2 text-lg'>Verification Timeline</p>
                        <p className='text-yellow-200/70 leading-relaxed'>
                          Your account will be reviewed within 24-48 hours. You'll receive an email notification once approved.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className='flex justify-between mt-12 pt-8 border-t border-white/10'>
              <button
                onClick={() => {
                  const prevStepIndex = currentStepIndex - 1
                  if (prevStepIndex >= 0) {
                    const prevStep = stepOrder[prevStepIndex]
                    setCurrentStep(prevStep)
                    if (updateVerificationStep) {
                      updateVerificationStep(prevStep)
                    }
                  }
                }}
                disabled={currentStepIndex === 0}
                className='px-8 py-4 bg-black/20 border border-white/10 hover:border-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all flex items-center gap-3 text-lg font-medium'
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>

              <button
                onClick={currentStep === 'review' ? handleSubmit : handleNext}
                disabled={!canProceed() || loading}
                className='px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all transform hover:scale-105 flex items-center gap-3 text-lg'
              >
                {loading ? (
                  <>
                    <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-white'></div>
                    {currentStep === 'review' ? 'Submitting...' : 'Saving...'}
                  </>
                ) : currentStep === 'review' ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Submit for Review
                  </>
                ) : (
                  <>
                    Next
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerificationPage
