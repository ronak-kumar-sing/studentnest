import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import Avatar from './Avatar'

const Profile = () => {
  const { user, updateProfile, uploadAvatar } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || '',
    phone: user?.profile?.phone || '',
    address: user?.profile?.address || '',
    fullName: user?.profile?.fullName || ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0]
    if (file) {
      setLoading(true)
      try {
        await uploadAvatar(file)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      await updateProfile({
        name: formData.name,
        username: formData.username,
        profile: {
          ...user.profile,
          phone: formData.phone,
          address: formData.address,
          fullName: formData.fullName
        }
      })
      setIsEditing(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-[#060010]/98'>
      {/* Header */}
      <div className='bg-black/30 backdrop-blur-md border-b border-white/10'>
        <div className='container mx-auto px-6 py-6'>
          <div className='flex items-center justify-between'>
            <h1 className='text-2xl font-bold text-white'>Profile</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${isEditing
                ? 'bg-gray-600 hover:bg-gray-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-6 py-8'>
        <div className='max-w-2xl mx-auto'>
          {/* Profile Card */}
          <div className='bg-black/30 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden'>
            {/* Cover Section */}
            <div className='h-32 bg-gradient-to-r from-blue-600 to-purple-600 relative'>
              <div className='absolute -bottom-16 left-8'>
                <div className='relative'>
                  <Avatar size='xl' className='border-4 border-black/30' />
                  {isEditing && (
                    <label className='absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer transition-all'>
                      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z' />
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 13a3 3 0 11-6 0 3 3 0 016 0z' />
                      </svg>
                      <input
                        type='file'
                        onChange={handleAvatarUpload}
                        accept='image/*'
                        className='hidden'
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className='pt-20 pb-8 px-8'>
              <div className='flex items-center justify-between mb-6'>
                <div>
                  <h2 className='text-2xl font-bold text-white mb-1'>{user?.name}</h2>
                  <p className='text-white/60 text-sm'>@{user?.username}</p>
                  <div className='flex items-center mt-2'>
                    <span className={`w-2 h-2 rounded-full mr-2 ${user?.isVerified ? 'bg-green-400' : 'bg-yellow-400'}`}></span>
                    <span className='text-white/70 text-sm capitalize'>{user?.userType}</span>
                    <span className='mx-2 text-white/30'>•</span>
                    <span className='text-white/60 text-sm'>
                      {user?.isVerified ? 'Verified Account' : 'Pending Verification'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Profile Details */}
              <div className='space-y-6'>
                {/* Personal Information */}
                <div>
                  <h3 className='text-white font-semibold mb-4 flex items-center'>
                    <svg className='w-5 h-5 mr-2 text-blue-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                    </svg>
                    Personal Information
                  </h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <label className='text-white/70 text-sm block mb-2'>Full Name</label>
                      {isEditing ? (
                        <input
                          type='text'
                          name='fullName'
                          value={formData.fullName}
                          onChange={handleChange}
                          className='w-full bg-black/20 border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                      ) : (
                        <p className='text-white bg-black/20 rounded-xl px-4 py-2'>
                          {user?.profile?.fullName || 'Not provided'}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className='text-white/70 text-sm block mb-2'>Username</label>
                      {isEditing ? (
                        <input
                          type='text'
                          name='username'
                          value={formData.username}
                          onChange={handleChange}
                          className='w-full bg-black/20 border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                      ) : (
                        <p className='text-white bg-black/20 rounded-xl px-4 py-2'>@{user?.username}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className='text-white font-semibold mb-4 flex items-center'>
                    <svg className='w-5 h-5 mr-2 text-green-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                    </svg>
                    Contact Information
                  </h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <label className='text-white/70 text-sm block mb-2'>Email</label>
                      <p className='text-white bg-black/20 rounded-xl px-4 py-2'>{user?.email}</p>
                    </div>
                    <div>
                      <label className='text-white/70 text-sm block mb-2'>Phone</label>
                      {isEditing ? (
                        <input
                          type='tel'
                          name='phone'
                          value={formData.phone}
                          onChange={handleChange}
                          className='w-full bg-black/20 border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                          placeholder='Enter phone number'
                        />
                      ) : (
                        <p className='text-white bg-black/20 rounded-xl px-4 py-2'>
                          {user?.profile?.phone || 'Not provided'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Address Information - Only for owners */}
                {user?.userType === 'owner' && (
                  <div>
                    <h3 className='text-white font-semibold mb-4 flex items-center'>
                      <svg className='w-5 h-5 mr-2 text-purple-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                      </svg>
                      Address Information
                    </h3>
                    <div>
                      <label className='text-white/70 text-sm block mb-2'>Address</label>
                      {isEditing ? (
                        <textarea
                          name='address'
                          value={formData.address}
                          onChange={handleChange}
                          rows={3}
                          className='w-full bg-black/20 border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                          placeholder='Enter your address'
                        />
                      ) : (
                        <p className='text-white bg-black/20 rounded-xl px-4 py-2'>
                          {user?.profile?.address || 'Not provided'}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Account Settings */}
                <div>
                  <h3 className='text-white font-semibold mb-4 flex items-center'>
                    <svg className='w-5 h-5 mr-2 text-orange-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' />
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                    </svg>
                    Account Settings
                  </h3>
                  <div className='space-y-3'>
                    <button className='w-full bg-black/20 hover:bg-black/30 border border-white/10 hover:border-white/20 rounded-xl px-4 py-3 text-left text-white transition-all'>
                      <div className='flex items-center justify-between'>
                        <span>Change Password</span>
                        <svg className='w-4 h-4 text-white/60' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                        </svg>
                      </div>
                    </button>
                    <button className='w-full bg-black/20 hover:bg-black/30 border border-white/10 hover:border-white/20 rounded-xl px-4 py-3 text-left text-white transition-all'>
                      <div className='flex items-center justify-between'>
                        <span>Notification Preferences</span>
                        <svg className='w-4 h-4 text-white/60' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                        </svg>
                      </div>
                    </button>
                    <button className='w-full bg-black/20 hover:bg-black/30 border border-white/10 hover:border-white/20 rounded-xl px-4 py-3 text-left text-white transition-all'>
                      <div className='flex items-center justify-between'>
                        <span>Privacy Settings</span>
                        <svg className='w-4 h-4 text-white/60' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Save Changes */}
              {isEditing && (
                <div className='flex gap-3 mt-8 pt-6 border-t border-white/10'>
                  <button
                    onClick={() => setIsEditing(false)}
                    className='flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 rounded-xl transition-all'
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className='flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 text-white font-medium py-3 rounded-xl transition-all'
                  >
                    {loading ? (
                      <div className='flex items-center justify-center'>
                        <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3'></div>
                        Saving...
                      </div>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
