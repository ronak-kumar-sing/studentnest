import React from 'react'
import { useAuth } from '../../contexts/AuthContext'

const Avatar = ({ size = 'md', onClick, className = '' }) => {
  const { user } = useAuth()

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-24 h-24 text-2xl'
  }

  const getInitials = (name) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const gradientColors = [
    'from-blue-500 to-purple-600',
    'from-green-500 to-teal-600',
    'from-pink-500 to-rose-600',
    'from-orange-500 to-red-600',
    'from-indigo-500 to-blue-600'
  ]

  // Use user ID to consistently select gradient
  const gradientIndex = user?.id ? user.id % gradientColors.length : 0
  const gradient = gradientColors[gradientIndex]

  return (
    <div
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-medium text-white cursor-pointer transition-all hover:scale-105 ${className}`}
      onClick={onClick}
    >
      {user?.avatar ? (
        <img
          src={user.avatar}
          alt={user.name || 'User'}
          className='w-full h-full rounded-full object-cover'
        />
      ) : (
        <div className={`w-full h-full rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
          {getInitials(user?.name || user?.username || 'User')}
        </div>
      )}
    </div>
  )
}

export default Avatar
