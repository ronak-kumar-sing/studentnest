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
import Dashboard from './pages/dashboard/Dashboard'
import PostRoom from './pages/dashboard/PostRoom'
import BookingRequests from './pages/dashboard/BookingRequests'
import Payments from './pages/dashboard/Payments'
import RoomModification from './pages/dashboard/RoomModification'
import SchedulesPage from './pages/dashboard/SchedulesPage'
import NotificationsPage from './pages/dashboard/NotificationsPage'
import Aurora from './Backgrounds/Aurora/Aurora'
import { ChatProvider } from './contexts/ChatContext'
import { NotificationProvider } from './contexts/NotificationContext'
import ToastContainer from './components/notifications/Toast/ToastContainer'
import DevStatusIndicator from './components/DevStatusIndicator'
import ChatDemo from './pages/ChatDemo'
import Auth from './pages/Auth'


function App() {
  const location = useLocation()

  // Routes where header should be hidden
  const hideHeaderRoutes = [
    '/room/',
    '/book',
    '/visit',
    '/dashboard',
    '/auth',
    '/messages'
  ]

  // Check if current route should hide header
  const shouldHideHeader = hideHeaderRoutes.some(route =>
    location.pathname.includes(route)
  )

  return (
    <NotificationProvider>
      <ChatProvider>
        <div className='relative min-h-screen overflow-x-hidden'>
          {/* Aurora Background - Fixed to viewport */}
          <div className='fixed inset-0 w-full h-full -z-10 bg-zinc-900'>
            <Aurora
              colorStops={["#3B82F6", "#0F172A", "#0F172A"]}
              blend={0.5}
              amplitude={1.0}
              speed={0.5}
            />
          </div>

          <div className={`relative z-10 ${shouldHideHeader ? 'pt-0' : 'pt-20'}`}>
            {!shouldHideHeader && <Header />}
            <Routes>
              {/* Auth section */}
              <Route path="/auth" element={<Auth />} />

              {/* Main App */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/saved" element={<SavedRoomsPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/chat-demo" element={<ChatDemo />} />
              <Route path="/room/:id" element={<RoomDetails />} />
              <Route path="/room/:id/book" element={<BookingPage />} />
              <Route path="/room/:id/visit" element={<ScheduleVisitPage />} />

              {/* Dashboard Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/post-room" element={<PostRoom />} />
              <Route path="/dashboard/bookings" element={<BookingRequests />} />
              <Route path="/dashboard/payments" element={<Payments />} />
              <Route path="/dashboard/schedules" element={<SchedulesPage />} />
              <Route path="/dashboard/notifications" element={<NotificationsPage />} />
              <Route path="/dashboard/modifications" element={<RoomModification />} />
            </Routes>
            {!shouldHideHeader && <Footer />}
          </div>

          {/* Toast Notifications */}
          <ToastContainer />

          {/* Development Status Indicator */}
          <DevStatusIndicator />
        </div>
      </ChatProvider>
    </NotificationProvider>
  )
}

export default App
