import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import Stepper, { Step } from '../Stepper/Stepper'

const VerificationPage = () => {
  const { user, updateProfile, updateVerificationStep } = useAuth()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1) // Use numeric step for Stepper
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
    1: { title: 'DigiLocker Verification', icon: '🔐', key: 'digilocker' },
    2: { title: 'Aadhaar Verification', icon: '📄', key: 'aadhaar' },
    3: { title: 'Emergency Contact', icon: '🚨', key: 'contact' },
    4: { title: 'Review & Submit', icon: '✅', key: 'review' }
  }

  const totalSteps = 4

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

      if (updateVerificationStep) {
        updateVerificationStep(steps[currentStep].key)
      }
    } catch (error) {
      console.error('Error saving step:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStepChange = (step) => {
    setCurrentStep(step)
    if (updateVerificationStep && steps[step]) {
      updateVerificationStep(steps[step].key)
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

  const onFinalStepCompleted = () => {
    handleSubmit()
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1: // digilocker
        return true // DigiLocker mock verification
      case 2: // aadhaar
        return formData.aadhaarNumber.length === 12 && formData.aadhaarFile !== null
      case 3: // contact
        return formData.emergencyContact.trim() !== '' && formData.address.trim() !== ''
      case 4: // review
        return true
      default:
        return false
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-[#060010] to-[#0a0015] flex items-center justify-center px-4 py-6'>
      <div className='max-w-7xl w-full'>
        {/* Header */}
        <div className='text-center mb-6'>
          <div className='inline-flex items-center gap-3 mb-3'>
            <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center'>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h1 className='text-3xl font-bold text-white'>Room Owner Verification</h1>
            </div>
          </div>
          <p className='text-white/70'>Complete verification to start listing rooms on StudentNest</p>
        </div>

        {/* Stepper Component */}
        <Stepper
          initialStep={1}
          onStepChange={handleStepChange}
          onFinalStepCompleted={onFinalStepCompleted}
          stepCircleContainerClassName="bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-4 max-w-6xl mx-auto"
          stepContainerClassName="bg-gradient-to-r from-blue-500/5 to-purple-500/5 border-b border-white/10 py-4"
          contentClassName="text-white max-w-6xl mx-auto px-6 py-6"
          footerClassName="border-t border-white/10 py-4 max-w-6xl mx-auto px-6"
          backButtonProps={{
            className: 'px-6 py-2.5 bg-black/20 border border-white/10 hover:border-white/20 text-white rounded-xl transition-all flex items-center gap-2 text-sm font-medium'
          }}
          nextButtonProps={{
            className: 'px-8 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all transform hover:scale-105 flex items-center gap-2 text-sm'
          }}
          backButtonText="Back"
          nextButtonText="Continue"
          renderStepIndicator={({ step, currentStep, onStepClick }) => (
            <div
              onClick={() => onStepClick(step)}
              className='flex flex-col items-center flex-1 relative z-10 cursor-pointer px-2'
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 border-2 transition-all duration-300 text-lg ${step <= currentStep
                ? 'bg-gradient-to-br from-blue-500 to-purple-600 border-blue-400 text-white shadow-lg'
                : 'bg-black/30 border-white/20 text-white/50'
                }`}>
                {step <= currentStep ? (
                  step === currentStep ? (
                    <div className="h-3 w-3 rounded-full bg-white" />
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )
                ) : (
                  <span className="text-sm">{step}</span>
                )}
              </div>
              <span className={`text-xs font-medium text-center max-w-20 transition-colors leading-tight ${step <= currentStep ? 'text-blue-300' : 'text-white/50'
                }`}>
                {steps[step].title}
              </span>
            </div>
          )}
        >
          {/* Step 1: DigiLocker Verification */}
          <Step>
            <div className='space-y-4 min-h-[250px] flex flex-col justify-center'>
              <div className='text-center'>
                <h2 className='text-xl font-semibold text-white mb-2'>DigiLocker Integration</h2>
                <p className='text-white/60'>Securely connect your DigiLocker account for document verification</p>
              </div>

              <div className='bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/30 rounded-xl p-6 text-center'>
                <div className='text-4xl mb-4'>🔐</div>
                <h3 className='text-white font-semibold mb-3'>Secure DigiLocker Verification</h3>
                <p className='text-white/70 mb-6 leading-relaxed max-w-xl mx-auto'>
                  Connect with DigiLocker to automatically verify your documents and identity.
                  This ensures a secure and trusted platform for all users.
                </p>

                {/* Currently Disabled Notice */}
                <div className='bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-4 mb-6'>
                  <div className='flex items-center justify-center gap-2 text-yellow-300'>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.729-.833-2.499 0L4.315 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <span className='font-medium'>DigiLocker verification is currently disabled for demo</span>
                  </div>
                </div>

                <button
                  disabled={true}
                  className='bg-blue-600/50 text-white/70 px-6 py-3 rounded-lg font-medium transition-all cursor-not-allowed'
                >
                  <div className='flex items-center justify-center gap-2'>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    Connect with DigiLocker (Disabled)
                  </div>
                </button>

                <div className='mt-4'>
                  <p className='text-green-300 flex items-center justify-center gap-2 font-medium'>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Mock verification completed for demo purposes
                  </p>
                </div>
              </div>
            </div>
          </Step>

          {/* Step 2: Aadhaar Verification */}
          <Step>
            <div className='space-y-6 min-h-[250px]'>
              <div className='text-center'>
                <h2 className='text-xl font-semibold text-white mb-2'>Aadhaar Card Verification</h2>
                <p className='text-white/60'>Upload your Aadhaar card and enter the number for verification</p>
              </div>

              <div className='grid md:grid-cols-2 gap-6'>
                <div>
                  <label className='text-white/90 font-medium mb-2 block'>
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
                      className='w-full bg-black/20 border border-white/20 rounded-lg pl-10 pr-3 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
                      placeholder='Enter 12-digit Aadhaar number'
                    />
                  </div>
                  <p className='text-white/50 text-sm mt-1'>
                    {formData.aadhaarNumber.length}/12 digits
                  </p>
                </div>

                <div>
                  <label className='text-white/90 font-medium mb-2 block'>
                    Upload Aadhaar Card <span className='text-red-400'>*</span>
                  </label>
                  <div className='relative'>
                    <input
                      type='file'
                      onChange={handleFileChange}
                      accept='image/*,.pdf'
                      className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                    />
                    <div className='w-full bg-black/20 border-2 border-dashed border-white/20 hover:border-white/30 rounded-lg px-4 py-6 text-center transition-all min-h-[100px] flex flex-col justify-center'>
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
              </div>

              <div className='bg-blue-500/10 border border-blue-400/30 rounded-lg p-4'>
                <div className='flex items-start gap-3'>
                  <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className='text-blue-300 font-medium mb-1'>Why do we need Aadhaar verification?</p>
                    <p className='text-blue-200/70 text-sm leading-relaxed'>
                      This helps us verify your identity and ensures a safe, trusted platform for all students looking for accommodation.
                      Your Aadhaar information is securely encrypted and used only for verification purposes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Step>

          {/* Step 3: Contact Information */}
          <Step>
            <div className='space-y-6 min-h-[250px]'>
              <div className='text-center'>
                <h2 className='text-xl font-semibold text-white mb-2'>Contact Information</h2>
                <p className='text-white/60'>Provide your address and emergency contact details</p>
              </div>

              <div className='space-y-4'>
                <div>
                  <label className='text-white/90 font-medium mb-2 block'>
                    Complete Address <span className='text-red-400'>*</span>
                  </label>
                  <textarea
                    name='address'
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className='w-full bg-black/20 border border-white/20 rounded-lg px-3 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
                    placeholder='Enter your complete address including city, state, and PIN code'
                  />
                </div>

                <div>
                  <label className='text-white/90 font-medium mb-2 block'>
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
                      className='w-full bg-black/20 border border-white/20 rounded-lg pl-10 pr-3 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
                      placeholder='+91 XXXXX XXXXX'
                    />
                  </div>
                  <p className='text-white/50 text-sm mt-1'>
                    This should be a family member or close friend who can be reached in case of emergency
                  </p>
                </div>
              </div>
            </div>
          </Step>

          {/* Step 4: Review & Submit */}
          <Step>
            <div className='space-y-6 min-h-[250px]'>
              <div className='text-center'>
                <h2 className='text-xl font-semibold text-white mb-2'>Review & Submit</h2>
                <p className='text-white/60'>Please review your information before submission</p>
              </div>

              <div className='grid gap-4'>
                <div className='bg-black/20 rounded-lg p-4'>
                  <div className='flex items-center gap-3 mb-2'>
                    <div className='text-2xl'>🔐</div>
                    <h3 className='text-white font-semibold'>DigiLocker Verification</h3>
                  </div>
                  <p className='text-green-300'>✓ Completed (Demo Mode)</p>
                </div>

                <div className='bg-black/20 rounded-lg p-4'>
                  <div className='flex items-center gap-3 mb-2'>
                    <div className='text-2xl'>📄</div>
                    <h3 className='text-white font-semibold'>Aadhaar Verification</h3>
                  </div>
                  <p className='text-white/70 mb-1'>Number: {formData.aadhaarNumber || 'Not provided'}</p>
                  <p className='text-white/70'>
                    Document: {formData.aadhaarFile ? formData.aadhaarFile.name : 'Not uploaded'}
                  </p>
                </div>

                <div className='bg-black/20 rounded-lg p-4'>
                  <div className='flex items-center gap-3 mb-2'>
                    <div className='text-2xl'>📍</div>
                    <h3 className='text-white font-semibold'>Address</h3>
                  </div>
                  <p className='text-white/70'>{formData.address || 'Not provided'}</p>
                </div>

                <div className='bg-black/20 rounded-lg p-4'>
                  <div className='flex items-center gap-3 mb-2'>
                    <div className='text-2xl'>🚨</div>
                    <h3 className='text-white font-semibold'>Emergency Contact</h3>
                  </div>
                  <p className='text-white/70'>{formData.emergencyContact || 'Not provided'}</p>
                </div>
              </div>

              <div className='bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-4'>
                <div className='flex items-start gap-3'>
                  <svg className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className='text-yellow-300 font-medium mb-1'>Verification Timeline</p>
                    <p className='text-yellow-200/70 text-sm leading-relaxed'>
                      Your account will be reviewed within 24-48 hours. You'll receive an email notification once approved.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Step>
        </Stepper>
      </div>
    </div>
  )
}

export default VerificationPage
