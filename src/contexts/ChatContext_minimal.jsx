import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Minimal chat reducer - only basic state management
const chatReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_CONVERSATIONS':
      return { ...state, conversations: action.payload, loading: false };
    case 'SET_ACTIVE_CHAT':
      return { ...state, activeChat: action.payload };
    case 'SET_MESSAGES':
      return { ...state, messages: { ...state.messages, [action.payload.chatId]: action.payload.messages } };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const initialState = {
  conversations: [],
  activeChat: null,
  messages: {},
  loading: false,
  error: null
};

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  // Mock user for UI purposes
  const user = { id: 'user_123', name: 'Current User' };

  // Minimal useEffect - no operations to prevent RAM usage
  useEffect(() => {
    if (user?.id) {
      // Just set empty state
      dispatch({ type: 'SET_CONVERSATIONS', payload: [] });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [user?.id]);

  // All functions return early - no operations
  const sendMessage = () => false;
  const startChat = () => null;
  const setActiveChat = () => null;
  const loadMessages = () => [];
  const getRecipientId = () => null;
  const markAsRead = () => false;

  const value = {
    ...state,
    user,
    sendMessage,
    startChat,
    setActiveChat,
    loadMessages,
    getRecipientId,
    markAsRead
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
