import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Bell,
  Calendar,
  MessageSquare,
  DollarSign,
  Home,
  User,
  Clock,
  Check,
  X,
  Eye,
  MoreHorizontal,
  Filter,
  BellRing
} from 'lucide-react'
import { useNotification } from '../../contexts/NotificationContext'

const NotificationSection = ({ compact = false, maxItems = 5 }) => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotification()
  const [localNotifications, setLocalNotifications] = useState([])
  const [filter, setFilter] = useState('all') // all, unread, booking, payment, message
  const [loading, setLoading] = useState(true)

  // Mock notifications data for UI demonstration
  useEffect(() => {
    const mockNotifications = [
      {
        id: 'notif_1',
        type: 'booking',
        title: 'New Booking Request',
        message: 'Rahul Kumar has requested to book Single Room A1',
        timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
        read: false,
        priority: 'high',
        data: {
          studentName: 'Rahul Kumar',
          roomTitle: 'Single Room A1',
          roomId: 'room-1'
        }
      },
      {
        id: 'notif_2',
        type: 'payment',
        title: 'Payment Received',
        message: 'Priya Singh has made a payment of ₹22,000',
        timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        read: false,
        priority: 'medium',
        data: {
          amount: 22000,
          studentName: 'Priya Singh',
          paymentId: 'pay_123'
        }
      },
      {
        id: 'notif_3',
        type: 'message',
        title: 'New Message',
        message: 'Sarah Johnson: "Is the room still available?"',
        timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
        read: true,
        priority: 'medium',
        data: {
          senderName: 'Sarah Johnson',
          chatId: 'chat_1'
        }
      },
      {
        id: 'notif_4',
        type: 'schedule',
        title: 'Upcoming Visit',
        message: 'Room visit scheduled with Amit Patel at 2:00 PM today',
        timestamp: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
        read: true,
        priority: 'high',
        data: {
          studentName: 'Amit Patel',
          visitTime: '14:00',
          roomTitle: 'Budget Friendly Room'
        }
      },
      {
        id: 'notif_5',
        type: 'booking',
        title: 'Booking Cancelled',
        message: 'Vikash Kumar cancelled the booking for Single Room B2',
        timestamp: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
        read: true,
        priority: 'low',
        data: {
          studentName: 'Vikash Kumar',
          roomTitle: 'Single Room B2',
          reason: 'Change of plans'
        }
      },
      {
        id: 'notif_6',
        type: 'system',
        title: 'Room Listed',
        message: 'Your room "Premium Studio" has been successfully listed',
        timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        read: false,
        priority: 'low',
        data: {
          roomTitle: 'Premium Studio',
          roomId: 'room-6'
        }
      }
    ]

    setTimeout(() => {
      setLocalNotifications(mockNotifications)
      setLoading(false)
    }, 800)
  }, [])

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'booking':
        return <Calendar className="w-4 h-4" />
      case 'payment':
        return <DollarSign className="w-4 h-4" />
      case 'message':
        return <MessageSquare className="w-4 h-4" />
      case 'schedule':
        return <Clock className="w-4 h-4" />
      case 'system':
        return <Home className="w-4 h-4" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  const getNotificationColor = (type, priority) => {
    const baseColors = {
      booking: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      payment: 'bg-green-500/20 text-green-300 border-green-500/30',
      message: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      schedule: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      system: 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }

    if (priority === 'high') {
      return 'bg-red-500/20 text-red-300 border-red-500/30'
    }

    return baseColors[type] || baseColors.system
  }

  const formatTimeAgo = (timestamp) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInMinutes = Math.floor((now - time) / (1000 * 60))

    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  const filteredNotifications = localNotifications.filter(notif => {
    if (filter === 'all') return true
    if (filter === 'unread') return !notif.read
    return notif.type === filter
  })

  const displayNotifications = compact 
    ? filteredNotifications.slice(0, maxItems)
    : filteredNotifications

  const unreadNotifications = localNotifications.filter(n => !n.read)

  const handleMarkAsRead = (notificationId) => {
    setLocalNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId
          ? { ...notif, read: true }
          : notif
      )
    )
  }

  const handleMarkAllAsRead = () => {
    setLocalNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    )
  }

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-white/20 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-white/10 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <BellRing className="w-5 h-5" />
            {compact ? 'Recent Notifications' : 'Notifications'}
          </h3>
          <p className="text-sm text-white/70 mt-1">
            {compact 
              ? `${unreadNotifications.length} unread notifications`
              : 'Stay updated with your property activities'
            }
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadNotifications.length > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="text-sm text-blue-400 hover:text-blue-300 font-medium"
            >
              Mark all read
            </button>
          )}
          {compact && localNotifications.length > maxItems && (
            <Link
              to="/dashboard/notifications"
              className="text-blue-400 hover:text-blue-300 font-medium text-sm"
            >
              View All
            </Link>
          )}
        </div>
      </div>

      {/* Filter tabs - Only show in full mode */}
      {!compact && (
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { key: 'all', label: 'All', count: localNotifications.length },
            { key: 'unread', label: 'Unread', count: unreadNotifications.length },
            { key: 'booking', label: 'Bookings', count: localNotifications.filter(n => n.type === 'booking').length },
            { key: 'payment', label: 'Payments', count: localNotifications.filter(n => n.type === 'payment').length },
            { key: 'message', label: 'Messages', count: localNotifications.filter(n => n.type === 'message').length }
          ].map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                filter === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {label} {count > 0 && `(${count})`}
            </button>
          ))}
        </div>
      )}

      {/* Notifications List */}
      <div className="space-y-3">
        {displayNotifications.length > 0 ? (
          <AnimatePresence>
            {displayNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border transition-all duration-200 hover:bg-white/15 ${
                  notification.read 
                    ? 'bg-white/5 border-white/10' 
                    : 'bg-blue-500/10 border-blue-500/20'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className={`p-2 rounded-lg border ${getNotificationColor(notification.type, notification.priority)}`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className={`font-medium ${notification.read ? 'text-white/80' : 'text-white'}`}>
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <p className={`text-sm ${notification.read ? 'text-white/60' : 'text-white/80'} mb-2`}>
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/50">
                          {formatTimeAgo(notification.timestamp)}
                        </span>
                        {notification.priority === 'high' && (
                          <span className="text-xs px-2 py-1 bg-red-500/20 text-red-300 rounded-full">
                            Priority
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {!notification.read && (
                      <button
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="p-1 hover:bg-white/10 rounded transition-colors"
                        title="Mark as read"
                      >
                        <Check className="w-4 h-4 text-white/70" />
                      </button>
                    )}
                    <button
                      className="p-1 hover:bg-white/10 rounded transition-colors"
                      title="More options"
                    >
                      <MoreHorizontal className="w-4 h-4 text-white/70" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <div className="text-center py-8">
            <Bell className="w-12 h-12 text-white/30 mx-auto mb-4" />
            <p className="text-white/70 mb-2">No notifications found</p>
            <p className="text-sm text-white/50">
              {filter === 'unread' 
                ? 'All caught up! No unread notifications.'
                : 'Notifications will appear here when you have updates.'
              }
            </p>
          </div>
        )}
      </div>

      {/* Show more button for compact mode */}
      {compact && localNotifications.length > maxItems && (
        <div className="mt-4 text-center">
          <Link
            to="/dashboard/notifications"
            className="text-sm text-blue-400 hover:text-blue-300 font-medium"
          >
            View {localNotifications.length - maxItems} more notifications
          </Link>
        </div>
      )}
    </div>
  )
}

export default NotificationSection
