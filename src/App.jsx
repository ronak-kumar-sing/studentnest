import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import RoomDetails from './pages/RoomDetails'
import BookingPage from './pages/BookingPage'
import ScheduleVisitPage from './pages/ScheduleVisitPage'
import SavedRoomsPage from './pages/SavedRoomsPage'
import MessagesPage from './pages/MessagesPage'
import PostRoom from './pages/dashboard/PostRoom'
import BookingRequests from './pages/dashboard/BookingRequests'
import Payments from './pages/dashboard/Payments'
import RoomModification from './pages/dashboard/RoomModification'
import SchedulesPage from './pages/dashboard/SchedulesPage'
import NotificationsPage from './pages/dashboard/NotificationsPage'
import Aurora from './Backgrounds/Aurora/Aurora'
import { ChatProvider } from './contexts/ChatContext'
import { NotificationProvider } from './contexts/NotificationContext'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import ToastContainer from './components/notifications/Toast/ToastContainer'
import DevStatusIndicator from './components/DevStatusIndicator'
import ChatDemo from './pages/ChatDemo'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import VerificationPage from './components/auth/VerificationPage'
import Profile from './components/profile/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import OwnerDashboard from './pages/OwnerDashboard'
import StudentDashboard from './pages/StudentDashboard'


function AppContent() {
  const location = useLocation()
  const { user, isAuthenticated } = useAuth()

  // Routes where header should be hidden
  const hideHeaderRoutes = [
    '/room/',
    '/book',
    '/visit',
    '/dashboard',
    '/login',
    '/signup',
    '/verify',
    '/profile',
    '/messages',
    '/saved'
  ]

  // Check if current route should hide header
  const shouldHideHeader = hideHeaderRoutes.some(route =>
    location.pathname.includes(route)
  )

  return (
    <div className='min-h-screen overflow-x-hidden bg-[#060010]/98'>
      <div className={`${shouldHideHeader ? 'pt-0' : 'pt-25'}`}>
        {!shouldHideHeader && <Header />}
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Auth Routes */}
          <Route
            path="/verify"
            element={
              <ProtectedRoute requiredUserType="owner">
                <VerificationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Main App Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/chat-demo" element={<ChatDemo />} />
          <Route path="/room/:id" element={<RoomDetails />} />
          <Route
            path="/room/:id/book"
            element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/room/:id/visit"
            element={
              <ProtectedRoute>
                <ScheduleVisitPage />
              </ProtectedRoute>
            }
          />

          {/* Protected User Routes */}
          <Route
            path="/saved"
            element={
              <ProtectedRoute>
                <SavedRoomsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <MessagesPage />
              </ProtectedRoute>
            }
          />

          {/* Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                {user?.userType === 'student' ? <StudentDashboard /> : <OwnerDashboard />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/post-room"
            element={
              <ProtectedRoute requiredUserType="owner" requireVerification={true}>
                <PostRoom />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/bookings"
            element={
              <ProtectedRoute requiredUserType="owner">
                <BookingRequests />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/payments"
            element={
              <ProtectedRoute>
                <Payments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/schedules"
            element={
              <ProtectedRoute>
                <SchedulesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/notifications"
            element={
              <ProtectedRoute>
                <NotificationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/modifications"
            element={
              <ProtectedRoute requiredUserType="owner">
                <RoomModification />
              </ProtectedRoute>
            }
          />
        </Routes>
        {!shouldHideHeader && <Footer />}
      </div>

      {/* Toast Notifications */}
      <ToastContainer />

      {/* Development Status Indicator */}
      <DevStatusIndicator />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <ChatProvider>
          <AppContent />
        </ChatProvider>
      </NotificationProvider>
    </AuthProvider>
  )
}

export default App
