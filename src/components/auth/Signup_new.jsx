import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const Signup = () => {
  const [step, setStep] = useState(1)
  const [userType, setUserType] = useState('student')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    collegeId: '',
    collegeName: '',
    aadhaarNumber: '',
    emailOtp: '',
    phoneOtp: '',
    emailVerified: false,
    phoneVerified: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [otpSent, setOtpSent] = useState({ email: false, phone: false })
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const validatePassword = (password) => {
    const minLength = password.length >= 8
    const hasUppercase = /[A-Z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    return {
      minLength,
      hasUppercase,
      hasNumber,
      hasSpecialChar,
      isValid: minLength && hasUppercase && hasNumber && hasSpecialChar
    }
  }

  const sendEmailOtp = async () => {
    // TODO: Implement email OTP sending
    setOtpSent({ ...otpSent, email: true })
    alert('OTP sent to email (Demo)')
  }

  const sendPhoneOtp = async () => {
    // TODO: Implement phone OTP sending
    setOtpSent({ ...otpSent, phone: true })
    alert('OTP sent to phone (Demo)')
  }

  const verifyEmailOtp = async () => {
    // TODO: Implement email OTP verification
    setFormData({ ...formData, emailVerified: true })
    alert('Email verified (Demo)')
  }

  const verifyPhoneOtp = async () => {
    // TODO: Implement phone OTP verification
    setFormData({ ...formData, phoneVerified: true })
    alert('Phone verified (Demo)')
  }

  const validateStep1 = () => {
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields')
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    const passwordValidation = validatePassword(formData.password)
    if (!passwordValidation.isValid) {
      setError('Password must meet all requirements')
      return false
    }
    return true
  }

  const validateStep2 = () => {
    if (userType === 'student') {
      if (!formData.fullName || !formData.phone || !formData.collegeId || !formData.collegeName) {
        setError('Please fill in all required fields')
        return false
      }
      if (!formData.emailVerified || !formData.phoneVerified) {
        setError('Please verify your email and phone number')
        return false
      }
    } else {
      if (!formData.fullName || !formData.phone) {
        setError('Please fill in all required fields')
        return false
      }
      if (!formData.emailVerified || !formData.phoneVerified) {
        setError('Please verify your email and phone number')
        return false
      }
    }
    return true
  }

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    } else if (step === 2 && validateStep2()) {
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')

    try {
      const user = await signup({ ...formData, userType })

      // Redirect based on user type
      if (userType === 'owner') {
        navigate('/verify')
      } else {
        navigate('/dashboard')
      }
    } catch (err) {
      setError(err.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  const passwordValidation = validatePassword(formData.password)

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#060010]/98 px-4 py-8'>
      <div className='max-w-md w-full'>
        <div className='text-center mb-8'>
          <h2 className='text-3xl font-bold text-white mb-2'>Create Account</h2>
          <p className='text-white/60'>Join StudentNest today</p>
        </div>

        <div className='bg-black/30 backdrop-blur-md rounded-3xl p-8 border border-white/10'>
          {/* Progress Indicator */}
          <div className='flex items-center justify-center mb-6'>
            <div className='flex space-x-2'>
              <div className={`w-8 h-2 rounded-full transition-all ${step >= 1 ? 'bg-blue-500' : 'bg-white/20'}`}></div>
              <div className={`w-8 h-2 rounded-full transition-all ${step >= 2 ? 'bg-blue-500' : 'bg-white/20'}`}></div>
            </div>
          </div>

          {/* Step 1: User Type & Credentials */}
          {step === 1 && (
            <div className='space-y-6'>
              <div>
                <label className='text-white/90 text-sm font-medium mb-3 block'>I am a</label>
                <div className='grid grid-cols-2 gap-3'>
                  <button
                    type='button'
                    onClick={() => setUserType('student')}
                    className={`p-3 rounded-xl border transition-all text-center flex items-center justify-center gap-2 ${userType === 'student'
                      ? 'bg-blue-500/20 border-blue-400 text-blue-300'
                      : 'bg-black/20 border-white/10 text-white/70 hover:border-white/20'
                      }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                    Student
                  </button>
                  <button
                    type='button'
                    onClick={() => setUserType('owner')}
                    className={`p-3 rounded-xl border transition-all text-center flex items-center justify-center gap-2 ${userType === 'owner'
                      ? 'bg-blue-500/20 border-blue-400 text-blue-300'
                      : 'bg-black/20 border-white/10 text-white/70 hover:border-white/20'
                      }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Owner
                  </button>
                </div>
              </div>

              <div>
                <label className='text-white/90 text-sm font-medium mb-2 block'>Email Address</label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    className='w-full bg-black/20 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    placeholder='Enter your email'
                  />
                </div>
              </div>

              <div>
                <label className='text-white/90 text-sm font-medium mb-2 block'>Create Password</label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    className='w-full bg-black/20 border border-white/20 rounded-xl pl-10 pr-12 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    placeholder='Create a strong password'
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute inset-y-0 right-0 pr-3 flex items-center text-white/50 hover:text-white/70'
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Password Requirements */}
                <div className='mt-2 space-y-1'>
                  <div className={`text-xs flex items-center gap-1 ${passwordValidation.minLength ? 'text-green-400' : 'text-white/50'}`}>
                    {passwordValidation.minLength ? '✓' : '○'} At least 8 characters
                  </div>
                  <div className={`text-xs flex items-center gap-1 ${passwordValidation.hasUppercase ? 'text-green-400' : 'text-white/50'}`}>
                    {passwordValidation.hasUppercase ? '✓' : '○'} One uppercase letter
                  </div>
                  <div className={`text-xs flex items-center gap-1 ${passwordValidation.hasNumber ? 'text-green-400' : 'text-white/50'}`}>
                    {passwordValidation.hasNumber ? '✓' : '○'} One number
                  </div>
                  <div className={`text-xs flex items-center gap-1 ${passwordValidation.hasSpecialChar ? 'text-green-400' : 'text-white/50'}`}>
                    {passwordValidation.hasSpecialChar ? '✓' : '○'} One special character
                  </div>
                </div>
              </div>

              <div>
                <label className='text-white/90 text-sm font-medium mb-2 block'>Confirm Password</label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className='w-full bg-black/20 border border-white/20 rounded-xl pl-10 pr-12 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    placeholder='Confirm your password'
                  />
                  <button
                    type='button'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className='absolute inset-y-0 right-0 pr-3 flex items-center text-white/50 hover:text-white/70'
                  >
                    {showConfirmPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Personal Information & Verification */}
          {step === 2 && (
            <div className='space-y-6'>
              <div>
                <label className='text-white/90 text-sm font-medium mb-2 block'>
                  Full Name <span className='text-red-400'>*</span>
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type='text'
                    name='fullName'
                    value={formData.fullName}
                    onChange={handleChange}
                    className='w-full bg-black/20 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    placeholder={`Enter your full name`}
                  />
                </div>
              </div>

              {/* Email Verification */}
              <div>
                <label className='text-white/90 text-sm font-medium mb-2 block'>
                  Email Verification <span className='text-red-400'>*</span>
                </label>
                <div className='flex gap-2'>
                  <input
                    type='text'
                    name='emailOtp'
                    value={formData.emailOtp}
                    onChange={handleChange}
                    disabled={!otpSent.email}
                    className='flex-1 bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
                    placeholder='Enter OTP'
                  />
                  {!formData.emailVerified && (
                    <button
                      type='button'
                      onClick={otpSent.email ? verifyEmailOtp : sendEmailOtp}
                      className='px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-all'
                    >
                      {otpSent.email ? 'Verify' : 'Send OTP'}
                    </button>
                  )}
                  {formData.emailVerified && (
                    <div className='flex items-center px-4 py-3 bg-green-500/20 border border-green-400 rounded-xl'>
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              {/* Phone Verification */}
              <div>
                <label className='text-white/90 text-sm font-medium mb-2 block'>
                  Phone Number <span className='text-red-400'>*</span>
                </label>
                <div className='space-y-2'>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <input
                      type='tel'
                      name='phone'
                      value={formData.phone}
                      onChange={handleChange}
                      className='w-full bg-black/20 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500'
                      placeholder='+91 XXXXX XXXXX'
                    />
                  </div>
                  <div className='flex gap-2'>
                    <input
                      type='text'
                      name='phoneOtp'
                      value={formData.phoneOtp}
                      onChange={handleChange}
                      disabled={!otpSent.phone}
                      className='flex-1 bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
                      placeholder='Enter OTP'
                    />
                    {!formData.phoneVerified && (
                      <button
                        type='button'
                        onClick={otpSent.phone ? verifyPhoneOtp : sendPhoneOtp}
                        className='px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-all'
                      >
                        {otpSent.phone ? 'Verify' : 'Send OTP'}
                      </button>
                    )}
                    {formData.phoneVerified && (
                      <div className='flex items-center px-4 py-3 bg-green-500/20 border border-green-400 rounded-xl'>
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Student-specific fields */}
              {userType === 'student' && (
                <>
                  <div>
                    <label className='text-white/90 text-sm font-medium mb-2 block'>
                      College ID <span className='text-red-400'>*</span>
                    </label>
                    <div className='relative'>
                      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                        </svg>
                      </div>
                      <input
                        type='text'
                        name='collegeId'
                        value={formData.collegeId}
                        onChange={handleChange}
                        className='w-full bg-black/20 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='Enter your college ID'
                      />
                    </div>
                  </div>

                  <div>
                    <label className='text-white/90 text-sm font-medium mb-2 block'>
                      College Name <span className='text-red-400'>*</span>
                    </label>
                    <div className='relative'>
                      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <input
                        type='text'
                        name='collegeName'
                        value={formData.collegeName}
                        onChange={handleChange}
                        className='w-full bg-black/20 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='Enter your college name'
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {error && (
            <div className='bg-red-500/20 border border-red-400/50 rounded-xl p-3 mt-4'>
              <p className='text-red-300 text-sm'>{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className='flex gap-3 mt-6'>
            {step === 2 && (
              <button
                type='button'
                onClick={() => setStep(1)}
                className='flex-1 bg-black/20 border border-white/10 hover:border-white/20 text-white font-medium py-3 px-6 rounded-xl transition-all'
              >
                Back
              </button>
            )}
            <button
              type='button'
              onClick={handleNext}
              disabled={loading}
              className='flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 text-white font-medium py-3 px-6 rounded-xl transition-all transform hover:scale-105'
            >
              {loading ? (
                <div className='flex items-center justify-center'>
                  <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3'></div>
                  Creating...
                </div>
              ) : step === 1 ? (
                'Next'
              ) : (
                'Create Account'
              )}
            </button>
          </div>

          {/* Login Link */}
          <div className='mt-6 text-center'>
            <p className='text-white/60 text-sm'>
              Already have an account?{' '}
              <Link
                to='/login'
                className='text-blue-400 hover:text-blue-300 font-medium transition-colors'
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
