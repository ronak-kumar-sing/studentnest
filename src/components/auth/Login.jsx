import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'student'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
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
                  className={`p-3 rounded-xl border transition-all text-center ${formData.userType === 'student'
                      ? 'bg-blue-500/20 border-blue-400 text-blue-300'
                      : 'bg-black/20 border-white/10 text-white/70 hover:border-white/20'
                    }`}
                >
                  🎓 Student
                </button>
                <button
                  type='button'
                  onClick={() => setFormData({ ...formData, userType: 'owner' })}
                  className={`p-3 rounded-xl border transition-all text-center ${formData.userType === 'owner'
                      ? 'bg-blue-500/20 border-blue-400 text-blue-300'
                      : 'bg-black/20 border-white/10 text-white/70 hover:border-white/20'
                    }`}
                >
                  🏠 Owner
                </button>
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className='text-white/90 text-sm font-medium mb-2 block'>Email Address</label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
                className='w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                placeholder='Enter your email'
              />
            </div>

            {/* Password Input */}
            <div>
              <label className='text-white/90 text-sm font-medium mb-2 block'>Password</label>
              <input
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
                className='w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                placeholder='Enter your password'
              />
            </div>

            {/* Forgot Password */}
            <div className='text-right'>
              <button
                type='button'
                className='text-blue-400 hover:text-blue-300 text-sm transition-colors'
              >
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
                className='w-full bg-black/20 border border-white/10 hover:border-white/20 text-white/80 hover:text-white font-medium py-3 px-6 rounded-xl transition-all'
              >
                📱 Login with OTP
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
