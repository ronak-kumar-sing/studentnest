import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Minimal notification reducer
const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATIONS':
      return { ...state, notifications: action.payload };
    case 'SET_UNREAD_COUNT':
      return { ...state, unreadCount: action.payload };
    case 'SET_PUSH_ENABLED':
      return { ...state, pushEnabled: action.payload };
    case 'MARK_AS_READ':
      return { ...state, notifications: state.notifications.map(n => n.id === action.payload ? { ...n, read: true } : n) };
    case 'CLEAR_ALL':
      return { ...state, notifications: [], unreadCount: 0 };
    default:
      return state;
  }
};

const initialState = {
  notifications: [],
  unreadCount: 0,
  pushEnabled: false,
  toasts: []
};

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);
  
  // Mock user for UI purposes
  const user = { id: 'user_123', name: 'Current User' };

  // Minimal useEffect - no operations to prevent RAM usage
  useEffect(() => {
    if (user?.id) {
      // Just set empty state
      dispatch({ type: 'SET_NOTIFICATIONS', payload: [] });
      dispatch({ type: 'SET_UNREAD_COUNT', payload: 0 });
      dispatch({ type: 'SET_PUSH_ENABLED', payload: false });
    }
  }, [user?.id]);

  // All functions return early - no operations
  const addNotification = () => false;
  const markAsRead = () => false;
  const markAllAsRead = () => false;
  const clearAllNotifications = () => false;
  const showToast = () => false;
  const removeToast = () => false;

  const value = {
    ...state,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearAllNotifications,
    showToast,
    removeToast
  };

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};
