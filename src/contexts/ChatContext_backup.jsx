import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { socketService } from '../services/socket/socketService';
import { useToast } from '../hooks/useToast';

// Chat reducer
const chatReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };

    case 'SET_CONVERSATIONS':
      return { ...state, conversations: action.payload, loading: false };

    case 'SET_ACTIVE_CHAT':
      return { ...state, activeChat: action.payload };

    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
        conversations: state.conversations.map(conv =>
          conv.id === action.payload.chatId
            ? { ...conv, lastMessage: action.payload, updatedAt: action.payload.timestamp }
            : conv
        )
      };

    case 'UPDATE_MESSAGE':
      return {
        ...state,
        messages: state.messages.map(msg =>
          msg.id === action.payload.tempId
            ? { ...action.payload.message }
            : msg
        )
      };

    case 'UPDATE_MESSAGE_STATUS':
      return {
        ...state,
        messages: state.messages.map(msg =>
          msg.id === action.payload.id
            ? { ...msg, status: action.payload.status }
            : msg
        )
      };

    case 'SET_TYPING':
      return { ...state, isTyping: action.payload };

    case 'SET_USER_ONLINE':
      return {
        ...state,
        onlineUsers: { ...state.onlineUsers, [action.payload]: true }
      };

    case 'SET_USER_OFFLINE':
      return {
        ...state,
        onlineUsers: { ...state.onlineUsers, [action.payload]: false }
      };

    case 'SET_MESSAGES':
      return { ...state, messages: action.payload };

    default:
      return state;
  }
};

// Initial state
const initialChatState = {
  conversations: [],
  messages: [],
  activeChat: null,
  loading: false,
  error: null,
  isTyping: null,
  onlineUsers: {},
  connectionStatus: 'disconnected'
};

// Create context
const ChatContext = createContext();

// Provider component
export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialChatState);
  const { showToast } = useToast();

  // Mock user for demonstration (in real app, get from AuthContext)
  const user = {
    id: 'user_123',
    name: 'John Doe',
    type: 'student'
  };

  const loadConversations = useCallback(() => {
    // COMPLETELY DISABLED - NO DATA LOADING
    // Just set empty state to prevent RAM usage
    dispatch({ type: 'SET_CONVERSATIONS', payload: [] });
    dispatch({ type: 'SET_LOADING', payload: false });
  }, []);

  useEffect(() => {
    // BACKEND COMPLETELY DISABLED FOR CONTENT WORK
    // Skip all operations to save RAM
    if (user?.id) {
      // Only set basic empty state
      dispatch({ type: 'SET_CONVERSATIONS', payload: [] });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [user]); const setupSocketListeners = () => {
    // DISABLED - NO OPERATIONS
  };

    const sendMessage = (chatId, content, type = 'text') => {
    // COMPLETELY DISABLED - NO OPERATIONS
    return false;
  };

  const getRecipientId = (chatId) => {
    // DISABLED
    return null;
  };

  const startChat = (recipientId, initialMessage = null) => {
    // COMPLETELY DISABLED - NO OPERATIONS
    return null;
  };

  const getRecipientId = (chatId) => {
    const conversation = state.conversations.find(conv => conv.id === chatId);
    return conversation?.participants.find(id => id !== user.id);
  };

  const startChat = async (recipientId, initialMessage = null) => {
    try {
      // Mock chat creation
      const chat = {
        id: `chat_${Date.now()}`,
        participants: [user.id, recipientId],
        participantInfo: {
          id: recipientId,
          name: 'New Contact',
          avatar: 'https://ui-avatars.com/api/?name=New+Contact&background=438ef7&color=fff'
        },
        lastMessage: null,
        unreadCount: 0,
        updatedAt: new Date().toISOString()
      };

      dispatch({ type: 'SET_ACTIVE_CHAT', payload: chat });

      if (initialMessage) {
        await sendMessage(chat.id, initialMessage);
      }

      return chat;
    } catch (error) {
      console.error('Failed to start chat:', error);
    }
  };

  const setActiveChat = (chatId) => {
    const chat = state.conversations.find(conv => conv.id === chatId);
    dispatch({ type: 'SET_ACTIVE_CHAT', payload: chat });

    // Load messages for this chat
    loadMessages(chatId);
  };

  const loadMessages = async (chatId) => {
    try {
      // Mock messages data
      const mockMessages = [
        {
          id: 'msg_1',
          chatId,
          senderId: 'owner_456',
          senderName: 'Property Owner',
          content: 'Hello! Yes, the room is still available. Would you like to schedule a visit?',
          type: 'text',
          timestamp: new Date(Date.now() - 60000).toISOString(),
          status: 'read'
        },
        {
          id: 'msg_2',
          chatId,
          senderId: 'user_123',
          senderName: 'John Doe',
          content: 'That sounds great! When would be a good time?',
          type: 'text',
          timestamp: new Date(Date.now() - 30000).toISOString(),
          status: 'delivered'
        }
      ];

      dispatch({ type: 'SET_MESSAGES', payload: mockMessages });
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  const markMessageAsRead = (messageId) => {
    // SOCKET DISABLED - Skip socket markAsRead call
    console.log('🚫 Socket markAsRead disabled for content work');

    dispatch({
      type: 'UPDATE_MESSAGE_STATUS',
      payload: { id: messageId, status: 'read' }
    });
  };

  const value = {
    ...state,
    sendMessage,
    startChat,
    markMessageAsRead,
    setActiveChat,
    loadConversations,
    currentUser: user
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
