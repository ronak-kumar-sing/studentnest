import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Home,
  Plus,
  Calendar,
  CreditCard,
  Users,
  Bell,
  Settings,
  BarChart3,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Edit,
  MessageSquare
} from 'lucide-react'
import { useDashboardStats } from '../../hooks/useDashboardStats'

const Dashboard = () => {
  const { stats, isLoading } = useDashboardStats()

  // Mock data - replace with actual API calls
  const mockStats = {
    totalRooms: 12,
    totalBookings: 45,
    monthlyRevenue: 85000,
    pendingRequests: 8,
    occupancyRate: 78,
    recentBookings: [
      { id: 1, student: 'Rahul Kumar', room: 'Single Room A1', status: 'pending', date: '2025-08-20' },
      { id: 2, student: 'Priya Singh', room: 'Double Room B3', status: 'approved', date: '2025-08-19' },
      { id: 3, student: 'Amit Patel', room: 'Single Room C2', status: 'pending', date: '2025-08-18' },
    ],
    recentPayments: [
      { id: 1, amount: 15000, student: 'Rahul Kumar', status: 'completed', date: '2025-08-20' },
      { id: 2, amount: 22000, student: 'Priya Singh', status: 'pending', date: '2025-08-19' },
      { id: 3, amount: 18000, student: 'Amit Patel', status: 'completed', date: '2025-08-18' },
    ]
  }

  const quickActions = [
    { name: 'Post New Room', icon: Plus, href: '/dashboard/post-room', color: 'bg-blue-600' },
    { name: 'View Requests', icon: Calendar, href: '/dashboard/bookings', color: 'bg-green-600' },
    { name: 'Manage Payments', icon: CreditCard, href: '/dashboard/payments', color: 'bg-purple-600' },
    { name: 'View Analytics', icon: BarChart3, href: '/dashboard/analytics', color: 'bg-orange-600' },
  ]

  const statsCards = [
    {
      title: 'Total Rooms',
      value: mockStats.totalRooms,
      change: '+2 this month',
      icon: Home,
      color: 'text-blue-600'
    },
    {
      title: 'Total Bookings',
      value: mockStats.totalBookings,
      change: '+12 this month',
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Monthly Revenue',
      value: `₹${(mockStats.monthlyRevenue / 1000).toFixed(0)}K`,
      change: '+15% from last month',
      icon: DollarSign,
      color: 'text-purple-600'
    },
    {
      title: 'Pending Requests',
      value: mockStats.pendingRequests,
      change: '3 new today',
      icon: Clock,
      color: 'text-orange-600'
    }
  ]

  return (
    <div className="min-h-screen bg-transparent">
      {/* Dashboard Header */}
      <div className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              <p className="text-white/70 mt-1">Welcome back! Here's your property overview.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-white/70 hover:text-white cursor-pointer" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </div>
              <Link
                to="/dashboard/settings"
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Settings className="w-6 h-6 text-white/70" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={action.href}
                  className="block p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group"
                >
                  <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-white group-hover:text-white/90">
                    {action.name}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/70 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-green-400 mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg bg-white/10`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Booking Requests */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Recent Booking Requests</h3>
              <Link
                to="/dashboard/bookings"
                className="text-blue-400 hover:text-blue-300 font-medium text-sm"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {mockStats.recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                  <div className="flex-1">
                    <p className="font-medium text-white">{booking.student}</p>
                    <p className="text-sm text-white/70">{booking.room}</p>
                    <p className="text-xs text-white/50">{booking.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${booking.status === 'approved'
                      ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                      : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                      }`}>
                      {booking.status}
                    </span>
                    <div className="flex gap-1">
                      <button className="p-1 hover:bg-white/10 rounded">
                        <Eye className="w-4 h-4 text-white/70" />
                      </button>
                      <button className="p-1 hover:bg-white/10 rounded">
                        <MessageSquare className="w-4 h-4 text-white/70" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Payments */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0 }}
            className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Recent Payments</h3>
              <Link
                to="/dashboard/payments"
                className="text-blue-400 hover:text-blue-300 font-medium text-sm"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {mockStats.recentPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                  <div className="flex-1">
                    <p className="font-medium text-white">₹{payment.amount.toLocaleString()}</p>
                    <p className="text-sm text-white/70">{payment.student}</p>
                    <p className="text-xs text-white/50">{payment.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${payment.status === 'completed'
                      ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                      : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                      }`}>
                      {payment.status}
                    </span>
                    {payment.status === 'completed' && (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    )}
                    {payment.status === 'pending' && (
                      <Clock className="w-4 h-4 text-yellow-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
