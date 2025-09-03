import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import Avatar from '../profile/Avatar'

const AuthenticatedHeader = () => {
  const { user, logout } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
    setDropdownOpen(false)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', searchQuery)
    }
  }

  return (
    <header className='bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0 z-50'>
      <div className='container mx-auto px-6 py-4'>
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <Link to={user?.userType === 'owner' ? '/owner-dashboard' : '/dashboard'} className='flex items-center space-x-2'>
            <div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center'>
              <span className='text-white font-bold text-sm'>SN</span>
            </div>
            <span className='text-white font-semibold text-xl'>StudentNest</span>
          </Link>

          {/* Search Bar - Only for students */}
          {user?.userType === 'student' && (
            <div className='flex-1 max-w-md mx-8'>
              <form onSubmit={handleSearch} className='relative'>
                <input
                  type='text'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Search rooms, locations...'
                  className='w-full bg-black/20 border border-white/20 rounded-xl px-4 py-2 pl-10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
                <svg
                  className='absolute left-3 top-2.5 w-4 h-4 text-white/40'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                </svg>
              </form>
            </div>
          )}

          {/* Navigation & Profile */}
          <div className='flex items-center space-x-4'>
            {/* Navigation Links */}
            {user?.userType === 'student' && (
              <nav className='hidden md:flex items-center space-x-6'>
                <Link to='/dashboard' className='text-white/80 hover:text-white transition-colors'>
                  Rooms
                </Link>
                <Link to='/saved' className='text-white/80 hover:text-white transition-colors'>
                  Saved
                </Link>
                <Link to='/messages' className='text-white/80 hover:text-white transition-colors'>
                  Messages
                </Link>
              </nav>
            )}

            {user?.userType === 'owner' && (
              <nav className='hidden md:flex items-center space-x-6'>
                <Link to='/owner-dashboard' className='text-white/80 hover:text-white transition-colors'>
                  Dashboard
                </Link>
                <Link to='/dashboard/post-room' className='text-white/80 hover:text-white transition-colors'>
                  Add Room
                </Link>
                <Link to='/dashboard/bookings' className='text-white/80 hover:text-white transition-colors'>
                  Bookings
                </Link>
              </nav>
            )}

            {/* User Profile Dropdown */}
            <div className='relative' ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className='flex items-center space-x-2 focus:outline-none'
              >
                <Avatar size='md' />
                <div className='hidden md:block text-left'>
                  <div className='text-white text-sm font-medium'>{user?.name}</div>
                  <div className='text-white/60 text-xs capitalize'>{user?.userType}</div>
                </div>
                <svg
                  className={`w-4 h-4 text-white/60 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className='absolute right-0 mt-2 w-64 bg-black/90 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl py-2 z-50'>
                  {/* User Info */}
                  <div className='px-4 py-3 border-b border-white/10'>
                    <div className='flex items-center space-x-3'>
                      <Avatar size='md' />
                      <div>
                        <div className='text-white font-medium'>{user?.name}</div>
                        <div className='text-white/60 text-sm'>{user?.email}</div>
                        <div className='flex items-center mt-1'>
                          <span className={`w-2 h-2 rounded-full mr-2 ${user?.isVerified ? 'bg-green-400' : 'bg-yellow-400'}`}></span>
                          <span className='text-xs text-white/60'>
                            {user?.isVerified ? 'Verified' : 'Pending Verification'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <Link
                    to='/profile'
                    className='flex items-center px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 transition-all'
                    onClick={() => setDropdownOpen(false)}
                  >
                    <svg className='w-4 h-4 mr-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                    </svg>
                    View Profile
                  </Link>

                  <Link
                    to='/settings'
                    className='flex items-center px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 transition-all'
                    onClick={() => setDropdownOpen(false)}
                  >
                    <svg className='w-4 h-4 mr-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' />
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                    </svg>
                    Settings
                  </Link>

                  {user?.userType === 'owner' && !user?.isVerified && (
                    <Link
                      to='/verify'
                      className='flex items-center px-4 py-2 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10 transition-all'
                      onClick={() => setDropdownOpen(false)}
                    >
                      <svg className='w-4 h-4 mr-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                      </svg>
                      Complete Verification
                    </Link>
                  )}

                  <div className='border-t border-white/10 mt-2 pt-2'>
                    <button
                      onClick={handleLogout}
                      className='flex items-center w-full px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all'
                    >
                      <svg className='w-4 h-4 mr-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AuthenticatedHeader
