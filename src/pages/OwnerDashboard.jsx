import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

const OwnerDashboard = () => {
  const { user } = useAuth()

  // Mock data
  const stats = {
    totalRooms: 5,
    occupiedRooms: 3,
    pendingBookings: 7,
    monthlyRevenue: 45000,
    avgRating: 4.6
  }

  const recentBookings = [
    { id: 1, studentName: 'Rahul Sharma', roomType: 'Single Room', date: '2025-03-15', status: 'pending' },
    { id: 2, studentName: 'Priya Patel', roomType: 'Shared Room', date: '2025-03-12', status: 'approved' },
    { id: 3, studentName: 'Arjun Kumar', roomType: 'Studio', date: '2025-03-10', status: 'pending' },
  ]

  const myRooms = [
    { id: 1, title: 'Modern Single Room', status: 'occupied', rent: 12000, tenant: 'Amit Singh' },
    { id: 2, title: 'Cozy Shared Room', status: 'available', rent: 8000, tenant: null },
    { id: 3, title: 'Luxury Studio', status: 'occupied', rent: 18000, tenant: 'Sneha Gupta' },
    { id: 4, title: 'Budget PG Room', status: 'available', rent: 6000, tenant: null },
  ]

  return (
    <div className='min-h-screen bg-[#060010]/98'>
      {/* Header */}
      <div className='bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-b border-white/10'>
        <div className='container mx-auto px-6 py-8'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-3xl font-bold text-white mb-2'>
                Welcome, {user?.name}! 🏠
              </h1>
              <p className='text-white/80 text-lg'>
                Manage your property listings and bookings
              </p>
            </div>
            <div className='flex items-center space-x-4'>
              {!user?.isVerified && (
                <Link
                  to='/verify'
                  className='bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-6 py-3 rounded-xl transition-all'
                >
                  Complete Verification
                </Link>
              )}
              <Link
                to='/dashboard/post-room'
                className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 py-3 rounded-xl transition-all'
              >
                + Add New Room
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-6 py-8'>
        {/* Stats Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8'>
          <div className='bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/10'>
            <div className='flex items-center justify-between mb-2'>
              <h3 className='text-white/80 text-sm font-medium'>Total Rooms</h3>
              <div className='w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center'>
                <span className='text-blue-400 text-lg'>🏠</span>
              </div>
            </div>
            <p className='text-white text-2xl font-bold'>{stats.totalRooms}</p>
            <p className='text-green-400 text-xs mt-1'>+2 this month</p>
          </div>

          <div className='bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/10'>
            <div className='flex items-center justify-between mb-2'>
              <h3 className='text-white/80 text-sm font-medium'>Occupied</h3>
              <div className='w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center'>
                <span className='text-green-400 text-lg'>👥</span>
              </div>
            </div>
            <p className='text-white text-2xl font-bold'>{stats.occupiedRooms}</p>
            <p className='text-white/60 text-xs mt-1'>
              {Math.round((stats.occupiedRooms / stats.totalRooms) * 100)}% occupancy
            </p>
          </div>

          <div className='bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/10'>
            <div className='flex items-center justify-between mb-2'>
              <h3 className='text-white/80 text-sm font-medium'>Pending Bookings</h3>
              <div className='w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center'>
                <span className='text-yellow-400 text-lg'>📋</span>
              </div>
            </div>
            <p className='text-white text-2xl font-bold'>{stats.pendingBookings}</p>
            <p className='text-yellow-400 text-xs mt-1'>Needs attention</p>
          </div>

          <div className='bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/10'>
            <div className='flex items-center justify-between mb-2'>
              <h3 className='text-white/80 text-sm font-medium'>Monthly Revenue</h3>
              <div className='w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center'>
                <span className='text-purple-400 text-lg'>💰</span>
              </div>
            </div>
            <p className='text-white text-2xl font-bold'>₹{stats.monthlyRevenue.toLocaleString()}</p>
            <p className='text-green-400 text-xs mt-1'>+15% vs last month</p>
          </div>

          <div className='bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/10'>
            <div className='flex items-center justify-between mb-2'>
              <h3 className='text-white/80 text-sm font-medium'>Avg Rating</h3>
              <div className='w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center'>
                <span className='text-orange-400 text-lg'>⭐</span>
              </div>
            </div>
            <p className='text-white text-2xl font-bold'>{stats.avgRating}</p>
            <p className='text-orange-400 text-xs mt-1'>Excellent rating</p>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Recent Bookings */}
          <div className='bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden'>
            <div className='p-6 border-b border-white/10'>
              <div className='flex items-center justify-between'>
                <h2 className='text-white text-xl font-semibold'>Recent Booking Requests</h2>
                <Link
                  to='/dashboard/bookings'
                  className='text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors'
                >
                  View All
                </Link>
              </div>
            </div>
            <div className='p-6'>
              <div className='space-y-4'>
                {recentBookings.map(booking => (
                  <div key={booking.id} className='flex items-center justify-between p-4 bg-black/20 rounded-xl'>
                    <div className='flex items-center space-x-4'>
                      <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center'>
                        <span className='text-white font-medium text-sm'>
                          {booking.studentName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className='text-white font-medium'>{booking.studentName}</p>
                        <p className='text-white/60 text-sm'>{booking.roomType}</p>
                        <p className='text-white/40 text-xs'>{booking.date}</p>
                      </div>
                    </div>
                    <div className='flex items-center space-x-3'>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${booking.status === 'pending'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-green-500/20 text-green-400'
                        }`}>
                        {booking.status}
                      </span>
                      <button className='text-blue-400 hover:text-blue-300 transition-colors'>
                        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* My Rooms */}
          <div className='bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden'>
            <div className='p-6 border-b border-white/10'>
              <div className='flex items-center justify-between'>
                <h2 className='text-white text-xl font-semibold'>My Rooms</h2>
                <Link
                  to='/dashboard/post-room'
                  className='text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors'
                >
                  Add Room
                </Link>
              </div>
            </div>
            <div className='p-6'>
              <div className='space-y-4'>
                {myRooms.map(room => (
                  <div key={room.id} className='p-4 bg-black/20 rounded-xl'>
                    <div className='flex items-center justify-between mb-2'>
                      <h3 className='text-white font-medium'>{room.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${room.status === 'occupied'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-blue-500/20 text-blue-400'
                        }`}>
                        {room.status}
                      </span>
                    </div>
                    <div className='flex items-center justify-between text-sm'>
                      <div>
                        <p className='text-white/80'>₹{room.rent.toLocaleString()}/month</p>
                        {room.tenant && (
                          <p className='text-white/60'>Tenant: {room.tenant}</p>
                        )}
                      </div>
                      <div className='flex items-center space-x-2'>
                        <button className='text-blue-400 hover:text-blue-300 p-1'>
                          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' />
                          </svg>
                        </button>
                        <button className='text-red-400 hover:text-red-300 p-1'>
                          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className='mt-8'>
          <h2 className='text-white text-xl font-semibold mb-6'>Quick Actions</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <Link
              to='/dashboard/post-room'
              className='bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all group'
            >
              <div className='w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform'>
                <svg className='w-6 h-6 text-blue-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                </svg>
              </div>
              <h3 className='text-white font-medium mb-2'>Add New Room</h3>
              <p className='text-white/60 text-sm'>List a new property for rent</p>
            </Link>

            <Link
              to='/dashboard/bookings'
              className='bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all group'
            >
              <div className='w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform'>
                <svg className='w-6 h-6 text-yellow-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
                </svg>
              </div>
              <h3 className='text-white font-medium mb-2'>Manage Bookings</h3>
              <p className='text-white/60 text-sm'>Review and approve requests</p>
            </Link>

            <Link
              to='/dashboard/payments'
              className='bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all group'
            >
              <div className='w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform'>
                <svg className='w-6 h-6 text-green-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1' />
                </svg>
              </div>
              <h3 className='text-white font-medium mb-2'>View Payments</h3>
              <p className='text-white/60 text-sm'>Track your earnings</p>
            </Link>

            <Link
              to='/dashboard/schedules'
              className='bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all group'
            >
              <div className='w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform'>
                <svg className='w-6 h-6 text-purple-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                </svg>
              </div>
              <h3 className='text-white font-medium mb-2'>Schedule Visits</h3>
              <p className='text-white/60 text-sm'>Manage property viewings</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OwnerDashboard
