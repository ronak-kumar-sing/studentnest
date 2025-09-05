import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const Login = () => {
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
    userType: 'student'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleForgotPassword = () => {
    // TODO: Implement forgot password functionality
    alert('Forgot password functionality will be implemented')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const user = await login(formData)

      // Redirect based on user type
      if (user.userType === 'owner' && !user.isVerified) {
        navigate('/verify')
      } else if (user.userType === 'owner') {
        navigate('/owner-dashboard')
      } else {
        navigate('/dashboard')
      }
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#060010]/98 px-4'>
      <div className='max-w-md w-full space-y-8'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold text-white mb-2'>Welcome Back</h2>
          <p className='text-white/60'>Sign in to your account</p>
        </div>

        <div className='bg-black/30 backdrop-blur-md rounded-3xl p-8 border border-white/10'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* User Type Selection */}
            <div>
              <label className='text-white/90 text-sm font-medium mb-3 block'>I am a</label>
              <div className='grid grid-cols-2 gap-3'>
                <button
                  type='button'
                  onClick={() => setFormData({ ...formData, userType: 'student' })}
                  className={`p-3 rounded-xl border transition-all text-center flex items-center justify-center gap-2 ${formData.userType === 'student'
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
                  onClick={() => setFormData({ ...formData, userType: 'owner' })}
                  className={`p-3 rounded-xl border transition-all text-center flex items-center justify-center gap-2 ${formData.userType === 'owner'
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

            {/* Email/Username Input */}
            <div>
              <label className='text-white/90 text-sm font-medium mb-2 block'>Email or Username</label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type='text'
                  name='emailOrUsername'
                  value={formData.emailOrUsername}
                  onChange={handleChange}
                  required
                  className='w-full bg-black/20 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                  placeholder='Enter your email or username'
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className='text-white/90 text-sm font-medium mb-2 block'>Password</label>
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
                  required
                  className='w-full bg-black/20 border border-white/20 rounded-xl pl-10 pr-12 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                  placeholder='Enter your password'
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
            </div>

            {/* Forgot Password */}
            <div className='text-right'>
              <button
                type='button'
                onClick={handleForgotPassword}
                className='text-blue-400 hover:text-blue-300 text-sm transition-colors flex items-center gap-1 ml-auto'
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Forgot Password?
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className='bg-red-500/20 border border-red-400/50 rounded-xl p-3'>
                <p className='text-red-300 text-sm'>{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type='submit'
              disabled={loading}
              className='w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105'
            >
              {loading ? (
                <div className='flex items-center justify-center'>
                  <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3'></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>

            {/* OTP Option */}
            <div className='text-center'>
              <p className='text-white/60 text-sm mb-3'>Or</p>
              <button
                type='button'
                className='w-full bg-black/20 border border-white/10 hover:border-white/20 text-white/80 hover:text-white font-medium py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2'
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Login with OTP
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className='mt-6 text-center'>
            <p className='text-white/60 text-sm'>
              Don't have an account?{' '}
              <Link
                to='/signup'
                className='text-blue-400 hover:text-blue-300 font-medium transition-colors'
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
