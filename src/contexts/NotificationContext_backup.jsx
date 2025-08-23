import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { pushService } from '../services/notifications/pushService';

// Notification reducer
const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PREFERENCES':
      return { ...state, preferences: action.payload };

    case 'SET_NOTIFICATIONS':
      return { ...state, notifications: action.payload };

    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
        unreadCount: state.unreadCount + 1
      };

    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [...state.toasts, action.payload]
      };

    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter(toast => toast.id !== action.payload)
      };

    case 'MARK_AS_READ':
      return {
        ...state,
        notifications: state.notifications.map(notif =>
          notif.id === action.payload ? { ...notif, read: true } : notif
        ),
        unreadCount: Math.max(0, state.unreadCount - 1)
      };

    case 'MARK_ALL_AS_READ':
      return {
        ...state,
        notifications: state.notifications.map(notif => ({ ...notif, read: true })),
        unreadCount: 0
      };

    case 'CLEAR_NOTIFICATIONS':
      return {
        ...state,
        notifications: [],
        unreadCount: 0
      };

    case 'SET_PUSH_ENABLED':
      return {
        ...state,
        preferences: { ...state.preferences, pushEnabled: action.payload }
      };

    default:
      return state;
  }
};

// Initial state
const initialNotificationState = {
  notifications: [],
  toasts: [],
  unreadCount: 0,
  preferences: {
    pushEnabled: false,
    showToasts: true,
    channels: {
      bookingUpdates: ['push', 'toast'],
      messages: ['push', 'toast'],
      paymentReminders: ['push', 'toast'],
      roomUpdates: ['toast']
    }
  }
};

// Create context
const NotificationContext = createContext();

// Provider component
export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialNotificationState);

  // Mock user for demonstration
  const user = {
    id: 'user_123',
    name: 'John Doe',
    type: 'student'
  };

  const initializeNotifications = useCallback(() => {
    // COMPLETELY DISABLED - NO DATA LOADING
    // Just set empty state to prevent RAM usage
    dispatch({ type: 'SET_NOTIFICATIONS', payload: [] });
    dispatch({ type: 'SET_UNREAD_COUNT', payload: 0 });
  }, []);

  const setupPushNotifications = useCallback(() => {
    // COMPLETELY DISABLED - NO OPERATIONS
    dispatch({ type: 'SET_PUSH_ENABLED', payload: false });
  }, []);

  useEffect(() => {
    // BACKEND COMPLETELY DISABLED FOR CONTENT WORK
    // Skip all initialization to save RAM
    if (user?.id) {
      // Only set basic state, no data loading
      dispatch({ type: 'SET_NOTIFICATIONS', payload: [] });
      dispatch({ type: 'SET_UNREAD_COUNT', payload: 0 });
      dispatch({ type: 'SET_PUSH_ENABLED', payload: false });
    }
  }, [user]);

  const showToast = (notification) => {
    const toastId = `toast-${Date.now()}`;
    const toast = {
      ...notification,
      id: toastId,
      timestamp: new Date().toISOString()
    };

    dispatch({ type: 'ADD_TOAST', payload: toast });

    // Auto-remove after delay
    setTimeout(() => {
      dispatch({ type: 'REMOVE_TOAST', payload: toastId });
    }, notification.duration || 5000);

    return toastId;
  };

  const addNotification = (notification) => {
    const fullNotification = {
      ...notification,
      id: notification.id || `notif-${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false
    };

    dispatch({ type: 'ADD_NOTIFICATION', payload: fullNotification });

    // Show toast if enabled
    if (state.preferences.showToasts) {
      showToast({
        type: notification.type,
        title: notification.title,
        message: notification.message,
        action: notification.action,
        icon: notification.icon
      });
    }

    // Send push notification if enabled and page not visible
    if (state.preferences.pushEnabled && document.hidden) {
      // pushService.showNotification(notification.title, {
      //   body: notification.message,
      //   icon: notification.icon || '/icons/default-notification.png',
      //   tag: notification.type,
      //   data: notification.data
      // });
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      dispatch({ type: 'MARK_AS_READ', payload: notificationId });
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      dispatch({ type: 'MARK_ALL_AS_READ' });
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

  const updatePreferences = async (newPreferences) => {
    try {
      const updated = { ...state.preferences, ...newPreferences };
      dispatch({ type: 'SET_PREFERENCES', payload: updated });

      // Update push subscription if needed
      if (newPreferences.pushEnabled && !state.preferences.pushEnabled) {
        await setupPushNotifications();
      } else if (!newPreferences.pushEnabled && state.preferences.pushEnabled) {
        // await pushService.unsubscribe();
      }
    } catch (error) {
      console.error('Failed to update notification preferences:', error);
    }
  };

  const clearNotifications = async () => {
    try {
      dispatch({ type: 'CLEAR_NOTIFICATIONS' });
    } catch (error) {
      console.error('Failed to clear notifications:', error);
    }
  };

  const value = {
    ...state,
    showToast,
    addNotification,
    markAsRead,
    markAllAsRead,
    updatePreferences,
    clearNotifications,
    removeToast: (id) => dispatch({ type: 'REMOVE_TOAST', payload: id })
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
