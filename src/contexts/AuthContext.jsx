import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Initialize user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem('studentnest_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Error parsing stored user:', error)
        localStorage.removeItem('studentnest_user')
      }
    }
    setLoading(false)
  }, [])

  // Save user to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('studentnest_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('studentnest_user')
    }
  }, [user])

  const login = async (credentials) => {
    // Simulate API call with mock authentication
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { email, password, userType = 'student' } = credentials

        // Mock validation
        if (email && password) {
          const mockUser = {
            id: Date.now(),
            email,
            userType,
            name: email.split('@')[0],
            username: email.split('@')[0],
            avatar: null,
            isVerified: userType === 'student' ? true : false,
            verificationStep: userType === 'owner' ? 'pending' : 'completed',
            profile: {
              phone: '',
              address: '',
              emergencyContact: '',
              collegeId: null
            },
            createdAt: new Date().toISOString()
          }
          setUser(mockUser)
          resolve(mockUser)
        } else {
          reject(new Error('Invalid credentials'))
        }
      }, 1000)
    })
  }

  const signup = async (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { email, password, userType, ...rest } = userData

        if (email && password) {
          const newUser = {
            id: Date.now(),
            email,
            userType,
            name: rest.fullName || rest.name || email.split('@')[0],
            username: rest.username || email.split('@')[0],
            avatar: null,
            isVerified: userType === 'student' ? true : false,
            verificationStep: userType === 'owner' ? 'address' : 'completed',
            profile: {
              phone: rest.phone || '',
              address: rest.address || '',
              emergencyContact: '',
              collegeId: rest.collegeId || null,
              fullName: rest.fullName || ''
            },
            createdAt: new Date().toISOString()
          }
          setUser(newUser)
          resolve(newUser)
        } else {
          reject(new Error('Invalid signup data'))
        }
      }, 1000)
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('studentnest_user')
  }

  const updateProfile = async (profileData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedUser = {
          ...user,
          ...profileData,
          profile: {
            ...user.profile,
            ...profileData.profile
          }
        }
        setUser(updatedUser)
        resolve(updatedUser)
      }, 500)
    })
  }

  const updateVerificationStep = (step) => {
    if (user) {
      const updatedUser = { ...user, verificationStep: step }
      setUser(updatedUser)
    }
  }

  const uploadAvatar = async (file) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate file upload by creating object URL
        const avatarUrl = URL.createObjectURL(file)
        const updatedUser = { ...user, avatar: avatarUrl }
        setUser(updatedUser)
        resolve(avatarUrl)
      }, 1000)
    })
  }

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateProfile,
    updateVerificationStep,
    uploadAvatar,
    isAuthenticated: !!user,
    isStudent: user?.userType === 'student',
    isOwner: user?.userType === 'owner',
    isVerified: user?.isVerified || false
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
