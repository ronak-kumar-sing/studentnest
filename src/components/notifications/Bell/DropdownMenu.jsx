import React from 'react';
import { motion } from 'framer-motion';
import { Settings, CheckCheck, Trash2, MessageCircle, Home, CreditCard } from 'lucide-react';
import { useNotification } from '../../../contexts/NotificationContext';

const DropdownMenu = ({ notifications, onClose }) => {
  const { markAsRead, markAllAsRead, clearAllNotifications } = useNotification();

  const recentNotifications = notifications.slice(0, 5);
  const unreadNotifications = notifications.filter(n => !n.read);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'message':
        return <MessageCircle className="w-4 h-4 text-blue-400" />;
      case 'booking_request':
      case 'booking_confirmed':
        return <Home className="w-4 h-4 text-green-400" />;
      case 'payment_reminder':
      case 'payment_received':
        return <CreditCard className="w-4 h-4 text-yellow-400" />;
      default:
        return <div className="w-4 h-4 bg-zinc-600 rounded-full" />;
    }
  };

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }

    // Handle notification action
    if (notification.action) {
      notification.action();
    }

    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute right-0 top-full mt-2 w-80 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl z-50"
    >
      {/* Header */}
      <div className="p-4 border-b border-zinc-800">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold">Notifications</h3>
          <div className="flex items-center space-x-2">
            {unreadNotifications.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={markAllAsRead}
                className="p-1.5 text-zinc-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-md transition-colors"
                title="Mark all as read"
              >
                <CheckCheck className="w-4 h-4" />
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {unreadNotifications.length > 0 && (
          <p className="text-zinc-400 text-sm mt-1">
            {unreadNotifications.length} unread notification{unreadNotifications.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {recentNotifications.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🔔</span>
            </div>
            <p className="text-zinc-400">No notifications yet</p>
            <p className="text-zinc-500 text-sm mt-1">We'll notify you when something happens</p>
          </div>
        ) : (
          <div className="py-2">
            {recentNotifications.map((notification) => (
              <motion.div
                key={notification.id}
                whileHover={{ backgroundColor: 'rgba(63, 63, 70, 0.5)' }}
                onClick={() => handleNotificationClick(notification)}
                className={`px-4 py-3 cursor-pointer transition-colors ${!notification.read ? 'bg-blue-500/5 border-l-2 border-l-blue-500' : ''
                  }`}
              >
                <div className="flex items-start space-x-3">
                  {/* Icon */}
                  <div className="flex-shrink-0 mt-0.5">
                    {notification.icon ? (
                      <span className="text-lg">{notification.icon}</span>
                    ) : (
                      getNotificationIcon(notification.type)
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${!notification.read ? 'text-white' : 'text-zinc-300'
                      }`}>
                      {notification.title}
                    </p>
                    <p className="text-zinc-400 text-sm mt-0.5 line-clamp-2">
                      {notification.message}
                    </p>
                    <p className="text-zinc-500 text-xs mt-1">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {/* Unread Indicator */}
                  {!notification.read && (
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="p-3 border-t border-zinc-800">
          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
            >
              View All
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearNotifications}
              className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
              title="Clear all notifications"
            >
              <Trash2 className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default DropdownMenu;
