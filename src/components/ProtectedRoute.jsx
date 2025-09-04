import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const ProtectedRoute = ({ children, requireAuth = true, userType = null, requireVerification = false }) => {
  const { user, loading, isAuthenticated, isVerified } = useAuth()

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-[#060010]/98'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto'></div>
          <p className='text-white/80 mt-4'>Loading...</p>
        </div>
      </div>
    )
  }

  // If authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // If specific user type is required
  if (userType && user?.userType !== userType) {
    if (user?.userType === 'student') {
      return <Navigate to="/dashboard" replace />
    } else if (user?.userType === 'owner') {
      return <Navigate to="/owner-dashboard" replace />
    } else {
      return <Navigate to="/login" replace />
    }
  }

  // If verification is required for owners
  if (requireVerification && user?.userType === 'owner' && !isVerified) {
    return <Navigate to="/verify" replace />
  }

  return children
}

export default ProtectedRoute
