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
    username: '',
    phone: '',
    collegeId: null,
    address: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleFileChange = (e) => {
    setFormData({ ...formData, collegeId: e.target.files[0] })
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
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return false
    }
    return true
  }

  const validateStep2 = () => {
    if (userType === 'owner') {
      if (!formData.fullName || !formData.username || !formData.phone) {
        setError('Please fill in all required fields')
        return false
      }
    } else {
      if (!formData.fullName || !formData.username) {
        setError('Please fill in all required fields')
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

          {/* Step 1: User Type & Basic Info */}
          {step === 1 && (
            <div className='space-y-6'>
              <div>
                <label className='text-white/90 text-sm font-medium mb-3 block'>I am a</label>
                <div className='grid grid-cols-2 gap-3'>
                  <button
                    type='button'
                    onClick={() => setUserType('student')}
                    className={`p-3 rounded-xl border transition-all text-center ${userType === 'student'
                        ? 'bg-blue-500/20 border-blue-400 text-blue-300'
                        : 'bg-black/20 border-white/10 text-white/70 hover:border-white/20'
                      }`}
                  >
                    🎓 Student
                  </button>
                  <button
                    type='button'
                    onClick={() => setUserType('owner')}
                    className={`p-3 rounded-xl border transition-all text-center ${userType === 'owner'
                        ? 'bg-blue-500/20 border-blue-400 text-blue-300'
                        : 'bg-black/20 border-white/10 text-white/70 hover:border-white/20'
                      }`}
                  >
                    🏠 Owner
                  </button>
                </div>
              </div>

              <div>
                <label className='text-white/90 text-sm font-medium mb-2 block'>Email Address</label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter your email'
                />
              </div>

              <div>
                <label className='text-white/90 text-sm font-medium mb-2 block'>Password</label>
                <input
                  type='password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  className='w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Create a password'
                />
              </div>

              <div>
                <label className='text-white/90 text-sm font-medium mb-2 block'>Confirm Password</label>
                <input
                  type='password'
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className='w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Confirm your password'
                />
              </div>
            </div>
          )}

          {/* Step 2: Additional Information */}
          {step === 2 && (
            <div className='space-y-6'>
              <div>
                <label className='text-white/90 text-sm font-medium mb-2 block'>Full Name</label>
                <input
                  type='text'
                  name='fullName'
                  value={formData.fullName}
                  onChange={handleChange}
                  className='w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter your full name'
                />
              </div>

              <div>
                <label className='text-white/90 text-sm font-medium mb-2 block'>Username</label>
                <input
                  type='text'
                  name='username'
                  value={formData.username}
                  onChange={handleChange}
                  className='w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Choose a unique username'
                />
              </div>

              {userType === 'owner' && (
                <>
                  <div>
                    <label className='text-white/90 text-sm font-medium mb-2 block'>
                      Phone Number <span className='text-red-400'>*</span>
                    </label>
                    <input
                      type='tel'
                      name='phone'
                      value={formData.phone}
                      onChange={handleChange}
                      className='w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500'
                      placeholder='+91 XXXXX XXXXX'
                    />
                  </div>

                  <div>
                    <label className='text-white/90 text-sm font-medium mb-2 block'>College ID</label>
                    <div className='relative'>
                      <input
                        type='file'
                        onChange={handleFileChange}
                        accept='image/*,.pdf'
                        className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                      />
                      <div className='w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-white/50 flex items-center justify-between'>
                        <span>{formData.collegeId ? formData.collegeId.name : 'Upload College ID'}</span>
                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12' />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className='text-white/90 text-sm font-medium mb-2 block'>Address</label>
                    <textarea
                      name='address'
                      value={formData.address}
                      onChange={handleChange}
                      rows={3}
                      className='w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500'
                      placeholder='Enter your address'
                    />
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
