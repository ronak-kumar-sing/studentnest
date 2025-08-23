import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, MoreVertical, Send, Paperclip, Smile } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../contexts/ChatContext';

const MessagesPage = () => {
  const navigate = useNavigate();
  const { conversations, activeChat, setActiveChat, messages } = useChat();
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);

  // Mock conversations for UI demonstration
  const mockConversations = [
    {
      id: 'chat_1',
      participants: ['user_123', 'owner_456'],
      participantInfo: {
        id: 'owner_456',
        name: 'Sarah Johnson',
        avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=438ef7&color=fff&size=150'
      },
      lastMessage: {
        content: 'Perfect! I can show you the room tomorrow at 2 PM',
        timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
        senderId: 'owner_456'
      },
      unreadCount: 2,
      updatedAt: new Date(Date.now() - 1800000).toISOString(),
      online: true
    },
    {
      id: 'chat_2',
      participants: ['user_123', 'owner_789'],
      participantInfo: {
        id: 'owner_789',
        name: 'Michael Chen',
        avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=10b981&color=fff&size=150'
      },
      lastMessage: {
        content: 'The room has all amenities including WiFi and parking',
        timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
        senderId: 'owner_789'
      },
      unreadCount: 0,
      updatedAt: new Date(Date.now() - 7200000).toISOString(),
      online: true
    },
    {
      id: 'chat_3',
      participants: ['user_123', 'owner_101'],
      participantInfo: {
        id: 'owner_101',
        name: 'Emma Williams',
        avatar: 'https://ui-avatars.com/api/?name=Emma+Williams&background=f59e0b&color=fff&size=150'
      },
      lastMessage: {
        content: 'Thanks for your interest! Let me know if you have any questions',
        timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        senderId: 'owner_101'
      },
      unreadCount: 0,
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
      online: false
    },
    {
      id: 'chat_4',
      participants: ['user_123', 'owner_202'],
      participantInfo: {
        id: 'owner_202',
        name: 'David Rodriguez',
        avatar: 'https://ui-avatars.com/api/?name=David+Rodriguez&background=8b5cf6&color=fff&size=150'
      },
      lastMessage: {
        content: 'Sure, the monthly rent is $1200 including utilities',
        timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        senderId: 'owner_202'
      },
      unreadCount: 1,
      updatedAt: new Date(Date.now() - 172800000).toISOString(),
      online: false
    },
    {
      id: 'chat_5',
      participants: ['user_123', 'owner_303'],
      participantInfo: {
        id: 'owner_303',
        name: 'Lisa Thompson',
        avatar: 'https://ui-avatars.com/api/?name=Lisa+Thompson&background=ef4444&color=fff&size=150'
      },
      lastMessage: {
        content: 'Hi! Is the room still available for next month?',
        timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        senderId: 'user_123'
      },
      unreadCount: 0,
      updatedAt: new Date(Date.now() - 259200000).toISOString(),
      online: true
    },
    {
      id: 'chat_6',
      participants: ['user_123', 'owner_404'],
      participantInfo: {
        id: 'owner_404',
        name: 'James Wilson',
        avatar: 'https://ui-avatars.com/api/?name=James+Wilson&background=06b6d4&color=fff&size=150'
      },
      lastMessage: {
        content: 'The room comes with a study desk and good lighting for students',
        timestamp: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
        senderId: 'owner_404'
      },
      unreadCount: 0,
      updatedAt: new Date(Date.now() - 432000000).toISOString(),
      online: false
    }
  ];

  // Mock messages for the selected chat
  const mockMessages = {
    'chat_1': [
      {
        id: 'msg_1',
        chatId: 'chat_1',
        senderId: 'user_123',
        senderName: 'You',
        content: 'Hi! I\'m interested in the room you posted. Is it still available?',
        type: 'text',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        status: 'read'
      },
      {
        id: 'msg_2',
        chatId: 'chat_1',
        senderId: 'owner_456',
        senderName: 'Sarah Johnson',
        content: 'Hello! Yes, the room is still available. Would you like to schedule a visit?',
        type: 'text',
        timestamp: new Date(Date.now() - 3000000).toISOString(),
        status: 'read'
      },
      {
        id: 'msg_3',
        chatId: 'chat_1',
        senderId: 'user_123',
        senderName: 'You',
        content: 'That would be great! When would be a good time?',
        type: 'text',
        timestamp: new Date(Date.now() - 2400000).toISOString(),
        status: 'read'
      },
      {
        id: 'msg_4',
        chatId: 'chat_1',
        senderId: 'owner_456',
        senderName: 'Sarah Johnson',
        content: 'Perfect! I can show you the room tomorrow at 2 PM',
        type: 'text',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        status: 'delivered'
      }
    ],
    'chat_2': [
      {
        id: 'msg_5',
        chatId: 'chat_2',
        senderId: 'user_123',
        senderName: 'You',
        content: 'What amenities are included with the room?',
        type: 'text',
        timestamp: new Date(Date.now() - 7500000).toISOString(),
        status: 'read'
      },
      {
        id: 'msg_6',
        chatId: 'chat_2',
        senderId: 'owner_789',
        senderName: 'Michael Chen',
        content: 'The room has all amenities including WiFi and parking',
        type: 'text',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        status: 'read'
      }
    ]
  };

  // Use mock data instead of context data for UI demo
  const displayConversations = mockConversations;
  const filteredConversations = displayConversations.filter(conv =>
    conv.participantInfo?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChatSelect = (conversation) => {
    setSelectedChat(conversation);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedChat) {
      // Message sending is disabled in content mode
      setNewMessage('');
    }
  };

  const currentMessages = selectedChat ? mockMessages[selectedChat.id] || [] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 pt-20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-6"
        >
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-3xl font-bold text-white">Messages</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
          >
            {/* Search */}
            <div className="p-4 border-b border-white/10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 rounded-lg border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="overflow-y-auto flex-1">
              {filteredConversations.length === 0 ? (
                <div className="p-8 text-center text-gray-400">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8" />
                  </div>
                  <p className="text-lg font-medium mb-2">No conversations yet</p>
                  <p className="text-sm">Start chatting with property owners!</p>
                </div>
              ) : (
                filteredConversations.map((conversation) => (
                  <motion.div
                    key={conversation.id}
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                    onClick={() => handleChatSelect(conversation)}
                    className={`p-4 cursor-pointer border-b border-white/5 transition-colors ${selectedChat?.id === conversation.id ? 'bg-white/10' : ''
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={conversation.participantInfo?.avatar}
                          alt={conversation.participantInfo?.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-zinc-800 ${conversation.online ? 'bg-green-500' : 'bg-gray-400'
                          }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium text-white truncate">
                            {conversation.participantInfo?.name}
                          </h3>
                          <span className="text-xs text-gray-400">
                            {conversation.lastMessage?.timestamp &&
                              new Date(conversation.lastMessage.timestamp).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })
                            }
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-400 truncate flex-1">
                            {conversation.lastMessage?.senderId === 'user_123' && 'You: '}
                            {conversation.lastMessage?.content || 'No messages yet'}
                          </p>
                          {conversation.unreadCount > 0 && (
                            <div className="ml-2 min-w-[20px] h-5 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-xs text-white font-medium px-1">
                                {conversation.unreadCount}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>

          {/* Chat Area */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 flex flex-col overflow-hidden"
          >
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedChat.participantInfo?.avatar}
                      alt={selectedChat.participantInfo?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-white">
                        {selectedChat.participantInfo?.name}
                      </h3>
                      <p className={`text-sm ${selectedChat.online ? 'text-green-400' : 'text-gray-400'}`}>
                        {selectedChat.online ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <MoreVertical className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {currentMessages.length === 0 ? (
                    <div className="text-center text-gray-400 py-12">
                      <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Send className="w-8 h-8" />
                      </div>
                      <p className="text-lg font-medium mb-2">Start the conversation</p>
                      <p className="text-sm">Send a message to begin chatting</p>
                    </div>
                  ) : (
                    currentMessages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.senderId === 'user_123' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${message.senderId === 'user_123'
                          ? 'bg-blue-500 text-white'
                          : 'bg-white/10 text-white'
                          }`}>
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${message.senderId === 'user_123' ? 'text-blue-100' : 'text-gray-400'
                            }`}>
                            {new Date(message.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-white/10">
                  <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                    <button
                      type="button"
                      className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                      <Paperclip className="w-5 h-5 text-gray-400" />
                    </button>
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message... (Disabled in content mode)"
                        disabled
                        className="w-full px-4 py-2 bg-white/10 rounded-full border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
                      />
                    </div>
                    <button
                      type="button"
                      className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                      <Smile className="w-5 h-5 text-gray-400" />
                    </button>
                    <button
                      type="submit"
                      disabled
                      className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5 text-white" />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Select a conversation</h3>
                  <p className="text-sm">Choose a chat from the sidebar to start messaging</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Content Mode Warning */}
        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-400 text-sm">
            🚫 <strong>Content Mode:</strong> Messaging functionality is disabled. This is a UI preview only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
