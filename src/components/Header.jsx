import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Bookmark, MessageCircle } from 'lucide-react'
import FuzzyText from './TextAnimations/FuzzyText/FuzzyText';
import ShinyText from './TextAnimations/ShinyText/ShinyText';
import { useSavedRooms } from '../contexts/SavedRoomsContext'
import NotificationBell from './notifications/Bell/NotificationBell'

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { savedRooms } = useSavedRooms();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 50); // Change header after 50px of scroll
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`bg-white/10 backdrop-blur-lg bg-opacity-10 shadow-xl border-b border-white/20 py-4 px-6 rounded-2xl fixed top-2 z-50 transition-all duration-700 ease-out ${isScrolled
        ? 'left-1/2 transform -translate-x-1/2 w-[500px] shadow-2xl' // Narrower when scrolled
        : 'left-2 right-2' // Full width when at top
        }`}>
        <div className='max-w-8xl mx-auto flex items-center justify-between'>
          {/* Logo */}
          <div className='flex items-center transition-all duration-700 ease-out'>
            <Link to="/">
              <FuzzyText
                baseIntensity={0.2}
                hoverIntensity={0.5}
                enableHover={true}
                fontSize={isScrolled ? 28 : 40}
              >
                StuGet
              </FuzzyText>
            </Link>
          </div>

          {/* Navigation Menu */}
          <div className={`hidden md:flex items-center transition-all duration-700 ease-out transform ${isScrolled ? 'space-x-3 scale-95' : 'space-x-8 scale-100'
            }`}>

            {/* Hide Home, About, Contact when scrolled */}
            {!isScrolled && (
              <>
                <Link to="/" className='text-white font-medium relative group overflow-hidden py-2 px-1 rounded-full'>
                  <span className='relative z-10 transition-colors duration-300 group-hover:text-blue-300'>Home</span>
                  <div className='absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out'></div>
                </Link>
                <Link to="/about" className='text-white font-medium relative group overflow-hidden py-2 px-1 rounded-full'>
                  <span className='relative z-10 transition-colors duration-300 group-hover:text-purple-300'>About</span>
                  <div className='absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out'></div>
                </Link>
                <Link to="/contact" className='text-white font-medium relative group overflow-hidden py-2 px-1 rounded-full'>
                  <span className='relative z-10 transition-colors duration-300 group-hover:text-green-300'>Contact</span>
                  <div className='absolute inset-0 bg-gradient-to-r from-transparent via-green-500/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out'></div>
                </Link>
              </>
            )}

            {/* Messages Link - Always visible */}
            <Link to="/messages" className='text-white font-medium relative group overflow-hidden py-2 px-3 rounded-full flex items-center gap-2'>
              <MessageCircle className="w-4 h-4" />
              <span className='relative z-10 transition-colors duration-300 group-hover:text-yellow-300'>
                Messages
              </span>
              <div className='absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out'></div>
            </Link>

            {/* Saved Rooms Link - Always visible */}
            <Link to="/saved" className='text-white font-medium relative group overflow-hidden py-2 px-3 rounded-full flex items-center gap-2'>
              <Bookmark className="w-4 h-4" />
              <span className='relative z-10 transition-colors duration-300 group-hover:text-blue-300'>
                Saved {savedRooms.length > 0 && `(${savedRooms.length})`}
              </span>
              <div className='absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out'></div>
            </Link>

            {/* Notification Bell - Always visible */}
            <NotificationBell />

            {!isScrolled && (
              <div className="flex items-center space-x-8 transition-all duration-700 ease-out transform">
                <Link to="/chat-demo" className='text-white font-medium relative group overflow-hidden py-2 px-3 rounded-full flex items-center gap-2'>
                  <span className='relative z-10 transition-colors duration-300 group-hover:text-cyan-300'>
                    💬 Chat Demo
                  </span>
                  <div className='absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out'></div>
                </Link>

                <Link to="/dashboard" className='text-white font-medium relative group overflow-hidden py-2 px-3 rounded-full flex items-center gap-2'>
                  <span className='relative z-10 transition-colors duration-300 group-hover:text-orange-300'>
                    Dashboard
                  </span>
                  <div className='absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out'></div>
                </Link>

                <div className='font-medium border border-yellow-400/30 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/10 to-orange-500/10 hover:from-yellow-500/20 hover:to-orange-500/20 transition-all duration-300'>
                  <ShinyText
                    text="Add Your's"
                    disabled={false}
                    speed={5}
                    className='cursor-pointer'
                  />
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden'>
            <button className='text-white hover:text-gray-300 focus:outline-none'>
              <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header