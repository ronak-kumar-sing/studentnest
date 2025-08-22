import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import RoomDetails from './pages/RoomDetails'
import BookingPage from './pages/BookingPage'
import ScheduleVisitPage from './pages/ScheduleVisitPage'
import SavedRoomsPage from './pages/SavedRoomsPage'
import Aurora from './Backgrounds/Aurora/Aurora'

function App() {
  const location = useLocation()
  
  // Routes where header should be hidden
  const hideHeaderRoutes = [
    '/room/',
    '/book',
    '/visit'
  ]
  
  // Check if current route should hide header
  const shouldHideHeader = hideHeaderRoutes.some(route => 
    location.pathname.includes(route)
  )

  return (
    <div className='relative min-h-screen overflow-x-hidden'>
      {/* Aurora Background - Fixed to viewport */}
      <div className='fixed inset-0 w-full h-full -z-10 bg-zinc-900'>
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />


      </div>
      <div className='relative z-10 pt-20'>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/saved" element={<SavedRoomsPage />} />
          <Route path="/room/:id" element={<RoomDetails />} />
          <Route path="/room/:id/book" element={<BookingPage />} />
          <Route path="/room/:id/visit" element={<ScheduleVisitPage />} />
        </Routes>
      </div>

      {/* Main content with semi-transparent overlay for better text readability */}
    </div>
  )
}

export default App
