import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  MessageSquare,
  User,
  Search,
  Send,
  MoreHorizontal,
  Clock,
  Circle,
  CheckCheck
} from 'lucide-react'

const MessageSection = ({ compact = false, maxItems = 5 }) => {
  const [conversations, setConversations] = useState([])
  const [filter, setFilter] = useState('all') // all, unread, recent
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  // Mock conversations data based on MessagesPage structure
  useEffect(() => {
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
        unreadCount: 3,
        updatedAt: new Date(Date.now() - 432000000).toISOString(),
        online: false
      }
    ]

    setTimeout(() => {
      setConversations(mockConversations)
      setLoading(false)
    }, 600)
  }, [])

  const formatTimeAgo = (timestamp) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInMinutes = Math.floor((now - time) / (1000 * 60))

    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`
    return `${Math.floor(diffInMinutes / 1440)}d`
  }

  const filteredConversations = conversations
    .filter(conv => {
      // Apply search filter
      if (searchTerm) {
        return conv.participantInfo?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      }
      return true
    })
    .filter(conv => {
      // Apply status filter
      if (filter === 'unread') return conv.unreadCount > 0
      if (filter === 'recent') {
        const dayAgo = new Date(Date.now() - 86400000)
        return new Date(conv.updatedAt) > dayAgo
      }
      return true
    })
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))

  const displayConversations = compact
    ? filteredConversations.slice(0, maxItems)
    : filteredConversations

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-white/20 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-white/10 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-white/10 rounded w-1/2"></div>
                </div>
              </div>
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
            <MessageSquare className="w-5 h-5" />
            {compact ? 'Recent Messages' : 'Messages'}
          </h3>
          <p className="text-sm text-white/70 mt-1">
            {compact
              ? `${totalUnread} unread messages from ${conversations.length} conversations`
              : 'Manage your property-related conversations'
            }
          </p>
        </div>
        <div className="flex items-center gap-2">
          {totalUnread > 0 && (
            <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs font-medium rounded-full">
              {totalUnread} unread
            </span>
          )}
          {compact && conversations.length > maxItems && (
            <Link
              to="/messages"
              className="text-blue-400 hover:text-blue-300 font-medium text-sm"
            >
              View All
            </Link>
          )}
        </div>
      </div>

      {/* Search and Filters - Only show in full mode */}
      {!compact && (
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {[
              { key: 'all', label: 'All', count: conversations.length },
              { key: 'unread', label: 'Unread', count: conversations.filter(c => c.unreadCount > 0).length },
              {
                key: 'recent', label: 'Recent', count: conversations.filter(c => {
                  const dayAgo = new Date(Date.now() - 86400000)
                  return new Date(c.updatedAt) > dayAgo
                }).length
              }
            ].map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${filter === key
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
              >
                {label} {count > 0 && `(${count})`}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Conversations List */}
      <div className="space-y-3">
        {displayConversations.length > 0 ? (
          <AnimatePresence>
            {displayConversations.map((conversation, index) => (
              <motion.div
                key={conversation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link
                  to={`/messages?chat=${conversation.id}`}
                  className="block p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200"
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
                        <h4 className="font-medium text-white truncate">
                          {conversation.participantInfo?.name}
                        </h4>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-white/50">
                            {formatTimeAgo(conversation.lastMessage?.timestamp)}
                          </span>
                          {conversation.unreadCount > 0 && (
                            <div className="min-w-[20px] h-5 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-xs text-white font-medium px-1">
                                {conversation.unreadCount}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className={`text-sm truncate flex-1 ${conversation.unreadCount > 0 ? 'text-white' : 'text-white/60'
                          }`}>
                          {conversation.lastMessage?.senderId === 'user_123' && (
                            <span className="text-white/50">You: </span>
                          )}
                          {conversation.lastMessage?.content || 'No messages yet'}
                        </p>
                        <div className="flex items-center gap-1 ml-2">
                          {conversation.lastMessage?.senderId === 'user_123' && (
                            <CheckCheck className="w-3 h-3 text-blue-400" />
                          )}
                          <button
                            onClick={(e) => e.preventDefault()}
                            className="p-1 hover:bg-white/10 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreHorizontal className="w-4 h-4 text-white/70" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <div className="text-center py-8">
            <MessageSquare className="w-12 h-12 text-white/30 mx-auto mb-4" />
            <p className="text-white/70 mb-2">
              {searchTerm
                ? 'No conversations found'
                : filter === 'unread'
                  ? 'No unread messages'
                  : 'No conversations yet'
              }
            </p>
            <p className="text-sm text-white/50">
              {searchTerm
                ? 'Try adjusting your search terms'
                : 'Messages from students and property inquiries will appear here'
              }
            </p>
          </div>
        )}
      </div>

      {/* Quick actions */}
      {!compact && conversations.length > 0 && (
        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="flex gap-2">
            <Link
              to="/messages"
              className="flex-1 py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors text-center"
            >
              Open Messages
            </Link>
            <button className="py-2 px-4 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors">
              Mark All Read
            </button>
          </div>
        </div>
      )}

      {/* Show more button for compact mode */}
      {compact && conversations.length > maxItems && (
        <div className="mt-4 text-center">
          <Link
            to="/messages"
            className="text-sm text-purple-400 hover:text-purple-300 font-medium"
          >
            View {conversations.length - maxItems} more conversations
          </Link>
        </div>
      )}
    </div>
  )
}

export default MessageSection
