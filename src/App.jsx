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
import Dashboard from './pages/dashboard/Dashboard'
import PostRoom from './pages/dashboard/PostRoom'
import BookingRequests from './pages/dashboard/BookingRequests'
import Payments from './pages/dashboard/Payments'
import RoomModification from './pages/dashboard/RoomModification'
import Aurora from './Backgrounds/Aurora/Aurora'
import { ChatProvider } from './contexts/ChatContext'
import { NotificationProvider } from './contexts/NotificationContext'
import ToastContainer from './components/notifications/Toast/ToastContainer'
import DevStatusIndicator from './components/DevStatusIndicator'
import ChatDemo from './pages/ChatDemo'

function App() {
  const location = useLocation()

  // Routes where header should be hidden
  const hideHeaderRoutes = [
    '/room/',
    '/book',
    '/visit',
    '/dashboard'
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
              colorStops={["#438ef7", "#000000", "#000000"]}
              blend={0.5}
              amplitude={1.0}
              speed={0.5}
            />
          </div>

          <div className={`relative z-10 ${shouldHideHeader ? 'pt-0' : 'pt-20'}`}>
            {!shouldHideHeader && <Header />}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/saved" element={<SavedRoomsPage />} />
              <Route path="/chat-demo" element={<ChatDemo />} />
              <Route path="/room/:id" element={<RoomDetails />} />
              <Route path="/room/:id/book" element={<BookingPage />} />
              <Route path="/room/:id/visit" element={<ScheduleVisitPage />} />

              {/* Dashboard Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/post-room" element={<PostRoom />} />
              <Route path="/dashboard/bookings" element={<BookingRequests />} />
              <Route path="/dashboard/payments" element={<Payments />} />
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
