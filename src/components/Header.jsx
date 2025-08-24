import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bookmark, MessageCircle, Home, Info, Phone, MessageSquare, LayoutDashboard } from 'lucide-react'
import CardNav from './CardNav/CardNav'
import { useSavedRooms } from '../contexts/SavedRoomsContext'
import NotificationBell from './notifications/Bell/NotificationBell'
import SplitTextImmediate from './TextAnimations/SplitText/SplitTextImmediate'

function Header() {
  const { savedRooms } = useSavedRooms();
  const navigate = useNavigate();

  // Create a custom logo component using SplitText
  const CustomLogo = () => (
    <div className="flex items-center justify-center h-[28px]">
      <img
        src="/home-48.svg"
        alt="Home"
        className="size-10 mr-2 mb-2"
      />
      <SplitTextImmediate
        text="StudentNest"
        className="text-blue-200 font-bold text-3xl tracking-wide"
        delay={60}
        duration={0.6}
        splitType="chars"
        from={{ opacity: 0, y: 20, rotateY: 90 }}
        to={{ opacity: 1, y: 0, rotateY: 0 }}
        autoPlay={true}
      />
    </div>
  );

  // Navigation items for CardNav
  const navItems = [
    {
      label: 'Explore',
      bgColor: 'rgba(59, 130, 246, 0.1)',
      textColor: '#3B82F6',
      links: [
        {
          label: 'Home',
          href: '/',
          ariaLabel: 'Go to home page'
        },
        {
          label: 'About Us',
          href: '/about',
          ariaLabel: 'Learn about StudentNest'
        },
        {
          label: 'Contact',
          href: '/contact',
          ariaLabel: 'Contact us'
        }
      ]
    },
    {
      label: 'Your Space',
      bgColor: 'rgba(16, 185, 129, 0.1)',
      textColor: '#10B981',
      links: [
        {
          label: `Saved (${savedRooms.length})`,
          href: '/saved',
          ariaLabel: 'View saved rooms'
        },
        {
          label: 'Messages',
          href: '/messages',
          ariaLabel: 'View messages'
        },
        {
          label: 'Chat Demo',
          href: '/chat-demo',
          ariaLabel: 'Try chat demo'
        }
      ]
    },
    {
      label: 'Dashboard',
      bgColor: 'rgba(245, 101, 101, 0.1)',
      textColor: '#F56565',
      links: [
        {
          label: 'Dashboard',
          href: '/dashboard',
          ariaLabel: 'Go to dashboard'
        },
        {
          label: 'Post Room',
          href: '/dashboard/post-room',
          ariaLabel: 'Post a new room'
        }
      ]
    }
  ];

  return (
    <>
      {/* Notification Bell - positioned separately */}
      <div className="fixed top-4 right-4 z-[100]">
        <NotificationBell />
      </div>

      <CardNav
        logo={<CustomLogo />}
        logoAlt="StudentNest Logo"
        items={navItems}
        className="top-4"
        ease="power3.out"
        baseColor="rgba(0, 0, 0, 0.8)"
        menuColor="#ffffff"
        buttonBgColor="#3B82F6"
        buttonTextColor="#ffffff"
      />
    </>
  )
}

export default Header