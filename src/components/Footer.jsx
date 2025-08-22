import React from 'react'
import { Link } from 'react-router-dom'
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Heart,
  Home,
  Info,
  MessageCircle,
  Bookmark,
  Calendar
} from 'lucide-react'
import FuzzyText from './TextAnimations/FuzzyText/FuzzyText'

function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    'Quick Links': [
      { name: 'Home', path: '/', icon: Home },
      { name: 'About', path: '/about', icon: Info },
      { name: 'Contact', path: '/contact', icon: MessageCircle },
      { name: 'Saved Rooms', path: '/saved', icon: Bookmark },
      { name: 'Schedule Visit', path: '/schedule', icon: Calendar }
    ],
    'Student Resources': [
      { name: 'Room Search', path: '/' },
      { name: 'Booking Guide', path: '/about' },
      { name: 'FAQs', path: '/contact' },
      { name: 'Student Support', path: '/contact' },
      { name: 'Safety Tips', path: '/about' }
    ],
    'Property Owners': [
      { name: 'List Your Property', path: '/contact' },
      { name: 'Owner Dashboard', path: '/contact' },
      { name: 'Pricing Guide', path: '/about' },
      { name: 'Terms of Service', path: '/contact' },
      { name: 'Privacy Policy', path: '/contact' }
    ]
  }

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-400' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-sky-400' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-400' },
    { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-600' }
  ]

  return (
    <footer className="relative bg-white/5 backdrop-blur-lg border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <FuzzyText
                baseIntensity={0.2}
                hoverIntensity={0.5}
                enableHover={true}
                fontSize={36}
              >
                StuGet
              </FuzzyText>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Your trusted platform for finding the perfect student accommodation.
              Connecting students with quality housing since 2024.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-300 text-sm">
                <Mail className="w-4 h-4 mr-3 text-blue-400" />
                <span>hello@stuget.com</span>
              </div>
              <div className="flex items-center text-gray-300 text-sm">
                <Phone className="w-4 h-4 mr-3 text-green-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-300 text-sm">
                <MapPin className="w-4 h-4 mr-3 text-red-400" />
                <span>Student District, University City</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold text-lg mb-4 relative">
                {category}
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
              </h3>
              <ul className="space-y-3">
                {links.map((link, index) => {
                  const IconComponent = link.icon
                  return (
                    <li key={index}>
                      <Link
                        to={link.path}
                        className="text-gray-300 hover:text-white text-sm transition-all duration-300 flex items-center group"
                      >
                        {IconComponent && (
                          <IconComponent className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        )}
                        <span className="group-hover:translate-x-2 transition-transform duration-300">
                          {link.name}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Media & Newsletter */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Social Links */}
            <div className="flex items-center space-x-6 mb-6 md:mb-0">
              <span className="text-gray-300 text-sm font-medium">Follow us:</span>
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`text-gray-400 ${social.color} transition-all duration-300 hover:scale-110`}
                    aria-label={social.name}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                )
              })}
            </div>

            {/* Newsletter Signup */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 text-sm font-medium">Stay updated:</span>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/10 border border-white/20 rounded-l-lg px-4 py-2 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
                <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-r-lg text-sm font-medium transition-all duration-300 hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div className="flex items-center mb-4 md:mb-0">
              <span>© {currentYear} StuGet. Made with </span>
              <Heart className="w-4 h-4 mx-1 text-red-400 animate-pulse" />
              <span>for students everywhere.</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link to="/contact" className="hover:text-white transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/contact" className="hover:text-white transition-colors duration-300">
                Terms of Service
              </Link>
              <Link to="/contact" className="hover:text-white transition-colors duration-300">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
    </footer>
  )
}

export default Footer