import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Bell, Zap, Send, ArrowLeft } from 'lucide-react';
import { useNotification } from '../contexts/NotificationContext';
import { useToast } from '../hooks/useToast';
import ChatButton from '../components/chat/ChatButton';

const ChatDemo = () => {
  const { addNotification, showToast: showNotificationToast } = useNotification();
  const { showSuccess, showError, showInfo, showWarning } = useToast();

  // Demo: Add a notification every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const notifications = [
        {
          type: 'message',
          title: 'New Message',
          message: 'You have a new message from Room Owner',
          icon: '💬'
        },
        {
          type: 'booking_confirmed',
          title: 'Booking Confirmed',
          message: 'Your booking for Cozy Studio has been confirmed!',
          icon: '🏠'
        },
        {
          type: 'payment_reminder',
          title: 'Payment Due',
          message: 'Your rent payment is due in 3 days',
          icon: '💳'
        }
      ];

      const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
      addNotification(randomNotification);
    }, 15000);

    return () => clearInterval(interval);
  }, [addNotification]);

  const handleToastDemo = (type) => {
    const messages = {
      success: 'Operation completed successfully!',
      error: 'Something went wrong. Please try again.',
      info: 'Here is some important information.',
      warning: 'Please be aware of this warning.'
    };

    switch (type) {
      case 'success':
        showSuccess(messages.success);
        break;
      case 'error':
        showError(messages.error);
        break;
      case 'info':
        showInfo(messages.info);
        break;
      case 'warning':
        showWarning(messages.warning);
        break;
      default:
        showInfo('Default toast message');
    }
  };

  const handleNotificationDemo = () => {
    addNotification({
      type: 'message',
      title: 'Demo Notification',
      message: 'This is a demo notification with action!',
      icon: '🎉',
      action: () => alert('Notification clicked!')
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Chat & Notifications Demo
            </h1>
            <p className="text-zinc-400 text-lg">
              Experience the real-time messaging and notification system
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Chat Demo Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            delay={0.1}
            className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-2xl p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-600/20 rounded-lg">
                <MessageCircle className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold">Real-time Chat</h2>
            </div>

            <p className="text-zinc-400 text-sm mb-6">
              Start a conversation with room owners instantly. Experience real-time messaging with typing indicators and message status.
            </p>

            <div className="space-y-4">
              <div className="bg-zinc-700/30 p-4 rounded-xl">
                <h3 className="font-medium text-green-400 mb-2">✓ Features</h3>
                <ul className="text-sm text-zinc-300 space-y-1">
                  <li>• Real-time messaging</li>
                  <li>• Typing indicators</li>
                  <li>• Message status (sent, delivered, read)</li>
                  <li>• Chat history</li>
                </ul>
              </div>

              <ChatButton
                recipientId="demo_owner"
                roomId="demo_room"
                roomTitle="Modern Studio Apartment"
              />
            </div>
          </motion.div>

          {/* Toast Demo Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-2xl p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-green-600/20 rounded-lg">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <h2 className="text-xl font-semibold">Toast Notifications</h2>
            </div>

            <p className="text-zinc-400 text-sm mb-6">
              Instant feedback with beautiful toast notifications. Try different types of messages.
            </p>

            <div className="space-y-3">
              <button
                onClick={() => handleToastDemo('success')}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors text-sm"
              >
                Show Success Toast
              </button>

              <button
                onClick={() => handleToastDemo('error')}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors text-sm"
              >
                Show Error Toast
              </button>

              <button
                onClick={() => handleToastDemo('info')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors text-sm"
              >
                Show Info Toast
              </button>

              <button
                onClick={() => handleToastDemo('warning')}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg transition-colors text-sm"
              >
                Show Warning Toast
              </button>
            </div>
          </motion.div>

          {/* Push Notifications Demo Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-2xl p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-purple-600/20 rounded-lg">
                <Bell className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-xl font-semibold">Push Notifications</h2>
            </div>

            <p className="text-zinc-400 text-sm mb-6">
              Get notified about important updates even when you're not actively using the app.
            </p>

            <div className="space-y-4">
              <div className="bg-zinc-700/30 p-4 rounded-xl">
                <h3 className="font-medium text-purple-400 mb-2">🔔 Notification Types</h3>
                <ul className="text-sm text-zinc-300 space-y-1">
                  <li>• New messages</li>
                  <li>• Booking updates</li>
                  <li>• Payment reminders</li>
                  <li>• Room availability</li>
                </ul>
              </div>

              <button
                onClick={handleNotificationDemo}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors text-sm"
              >
                Add Demo Notification
              </button>
            </div>
          </motion.div>
        </div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-semibold text-center mb-8">System Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="font-semibold mb-2">Real-time Chat</h3>
              <p className="text-zinc-400 text-sm">Instant messaging with WebSocket connections</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Bell className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="font-semibold mb-2">Smart Notifications</h3>
              <p className="text-zinc-400 text-sm">Context-aware alerts and reminders</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="font-semibold mb-2">Instant Feedback</h3>
              <p className="text-zinc-400 text-sm">Beautiful toast notifications</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎪</span>
              </div>
              <h3 className="font-semibold mb-2">PWA Ready</h3>
              <p className="text-zinc-400 text-sm">Mobile-optimized experience</p>
            </div>
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-zinc-400">
            💡 Check the notification bell in the header and try the chat functionality!
          </p>
          <p className="text-zinc-500 text-sm mt-2">
            New demo notifications will appear automatically every 15 seconds
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ChatDemo;
