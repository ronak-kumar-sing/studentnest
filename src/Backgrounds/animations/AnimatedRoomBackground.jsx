import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Star,
  MapPin,
  Wifi,
  Car,
  Shield,
  Coffee,
  Dumbbell,
  Tv,
  Wind,
  Zap
} from 'lucide-react';

// Sample room data for background animation
const SAMPLE_ROOMS = [
  {
    id: 1,
    title: "Modern Studio in Central Delhi",
    price: 25000,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    type: "Studio",
    location: "Connaught Place"
  },
  {
    id: 2,
    title: "Cozy PG Near Metro Station",
    price: 15000,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80",
    rating: 4.5,
    type: "PG",
    location: "Lajpat Nagar"
  },
  {
    id: 3,
    title: "Luxury 2BHK Apartment",
    price: 45000,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    type: "2BHK",
    location: "Greater Kailash"
  },
  {
    id: 4,
    title: "Student-Friendly Room",
    price: 12000,
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=400&q=80",
    rating: 4.3,
    type: "Single",
    location: "Kamla Nagar"
  },
  {
    id: 5,
    title: "Premium Executive Suite",
    price: 35000,
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    type: "Suite",
    location: "Nehru Place"
  },
  {
    id: 6,
    title: "Shared Room with Amenities",
    price: 8000,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=400&q=80",
    rating: 4.1,
    type: "Shared",
    location: "Malviya Nagar"
  },
  {
    id: 7,
    title: "Furnished 1BHK Near IT Hub",
    price: 28000,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    type: "1BHK",
    location: "Gurgaon"
  },
  {
    id: 8,
    title: "Budget Hostel Room",
    price: 6000,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80",
    rating: 3.9,
    type: "Hostel",
    location: "Mukherjee Nagar"
  }
];

// Amenity icons for variety
const AMENITY_ICONS = [Wifi, Car, Shield, Coffee, Dumbbell, Tv, Wind, Zap];

// Animated Room Card Component for Background
const AnimatedRoomCard = ({ room, index }) => {
  const IconComponent = AMENITY_ICONS[index % AMENITY_ICONS.length];

  return (
    <div className="flex-shrink-0 w-72 h-40 bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 mx-3 hover:scale-105 transition-transform duration-300">
      <div className="flex h-full">
        {/* Image Section */}
        <div className="w-24 h-full relative overflow-hidden">
          <img
            src={room.image}
            alt={room.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-800/20"></div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-3 flex flex-col justify-between">
          <div>
            <h3 className="text-white font-semibold text-sm line-clamp-2 mb-1">
              {room.title}
            </h3>
            <div className="flex items-center gap-1 text-gray-300 text-xs mb-2">
              <MapPin className="w-3 h-3" />
              <span className="truncate">{room.location}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-amber-900/40 px-2 py-1 rounded-full">
                <Star className="w-3 h-3 text-amber-400 fill-current" />
                <span className="text-amber-300 text-xs font-medium">{room.rating}</span>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${room.type === 'PG' ? 'bg-green-600/30 text-green-400' :
                room.type === 'Studio' ? 'bg-purple-600/30 text-purple-400' :
                  'bg-blue-600/30 text-blue-400'
                }`}>
                {room.type}
              </div>
            </div>

            <div className="text-right">
              <div className="text-white font-bold text-sm">
                ₹{(room.price / 1000).toFixed(0)}k
              </div>
              <div className="text-gray-400 text-xs">/month</div>
            </div>
          </div>

          {/* Small amenity icon */}
          <div className="absolute top-2 right-2 bg-gray-700/50 p-1 rounded-lg">
            <IconComponent className="w-3 h-3 text-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Scrolling Row Component
const ScrollingRow = ({ rooms, direction, speed, delay }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Create multiple copies for seamless loop
  const extendedRooms = [...rooms, ...rooms, ...rooms];

  if (prefersReducedMotion) {
    return (
      <div className="flex gap-3 py-2 opacity-40">
        {rooms.slice(0, 4).map((room, index) => (
          <AnimatedRoomCard key={`${room.id}-static-${index}`} room={room} index={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-hidden py-2">
      <motion.div
        className="flex"
        animate={{
          x: direction === 'left' ? [0, -1152] : [0, 1152] // Card width * number of cards for seamless loop
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
            delay: delay
          }
        }}
        style={{
          width: 'max-content'
        }}
      >
        {extendedRooms.map((room, index) => (
          <AnimatedRoomCard
            key={`${room.id}-${Math.floor(index / rooms.length)}-${index}`}
            room={room}
            index={index}
          />
        ))}
      </motion.div>
    </div>
  );
};

// Animated Background Component
const AnimatedBackground = () => {
  // Create different room sets for each row
  const roomRows = useMemo(() => {
    const shuffled = [...SAMPLE_ROOMS].sort(() => Math.random() - 0.5);
    return [
      shuffled.slice(0, 4),
      shuffled.slice(2, 6),
      shuffled.slice(4, 8).concat(shuffled.slice(0, 2)),
      shuffled.slice(1, 5),
      shuffled.slice(3, 7),
    ];
  }, []);

  const rowConfig = [
    { direction: 'left', speed: 40, delay: 0 },
    { direction: 'right', speed: 36, delay: 0.5 },
    { direction: 'left', speed: 44, delay: 1 },
    { direction: 'right', speed: 38, delay: 1.5 },
    { direction: 'left', speed: 42, delay: 2 },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Gradient Overlays */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-900 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-900 to-transparent z-10 pointer-events-none"></div>

      {/* Scrolling Rows */}
      <div className="absolute inset-0 flex flex-col justify-center space-y-4 -mt-10">
        {roomRows.map((rooms, index) => (
          <ScrollingRow
            key={index}
            rooms={rooms}
            direction={rowConfig[index].direction}
            speed={rowConfig[index].speed}
            delay={rowConfig[index].delay}
          />
        ))}
      </div>

      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-gray-900/60 pointer-events-none"></div>
    </div>
  );
};

// Login Form Component
const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Login successful! (This is a demo)');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 w-full max-w-md mx-4 shadow-2xl"
    >
      <div className="text-center mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-white mb-2"
        >
          Welcome Back
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-300"
        >
          Sign in to find your perfect room
        </motion.p>
      </div>

      <div className="space-y-6">
        {/* Email Field */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full pl-12 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.email ? 'border-red-400' : 'border-white/30'
                }`}
              placeholder="Enter your email"
            />
          </div>
          <AnimatePresence>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-400 text-sm mt-1"
              >
                {errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Password Field */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full pl-12 pr-12 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.password ? 'border-red-400' : 'border-white/30'
                }`}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <AnimatePresence>
            {errors.password && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-400 text-sm mt-1"
              >
                {errors.password}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Remember Me & Forgot Password */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-between text-sm"
        >
          <label className="flex items-center text-gray-300">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-white/10 border-white/30 rounded focus:ring-blue-500 focus:ring-2"
            />
            <span className="ml-2">Remember me</span>
          </label>
          <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
            Forgot password?
          </a>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <LogIn className="w-5 h-5" />
              Sign In
            </>
          )}
        </motion.button>

        {/* Sign Up Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-gray-300 text-sm"
        >
          Don't have an account?{' '}
          <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
            Sign up here
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Main Component - Just the Animated Background
const AnimatedRoomBackground = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Optional: Add a semi-transparent overlay for content placement */}
      {/* <div className="relative z-20 min-h-screen flex items-center justify-center p-4">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Animated Room Cards Background</h1>
          <p className="text-gray-300">Perfect for login pages, hero sections, or any layout</p>
        </div>
      </div> */}
    </div>
  );
};

export default AnimatedRoomBackground;