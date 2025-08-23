import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

const ChatItem = ({ conversation, isActive, onClick }) => {
  const formatLastMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / 1000 / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) {
      return 'now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}m`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h`;
    } else if (diffInDays === 1) {
      return 'yesterday';
    } else if (diffInDays < 7) {
      return `${diffInDays}d`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    }
  };

  const truncateMessage = (message, maxLength = 50) => {
    if (!message) return 'No messages yet';
    return message.length > maxLength ? `${message.substring(0, maxLength)}...` : message;
  };

  return (
    <motion.div
      whileHover={{ backgroundColor: 'rgba(63, 63, 70, 0.5)' }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`px-4 py-3 cursor-pointer transition-colors ${isActive ? 'bg-blue-600/20 border-r-2 border-r-blue-500' : ''
        }`}
    >
      <div className="flex items-center space-x-3">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          {conversation.participantInfo?.avatar ? (
            <img
              src={conversation.participantInfo.avatar}
              alt={conversation.participantInfo.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
          )}

          {/* Online Status */}
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-zinc-900"></div>
        </div>

        {/* Chat Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className={`font-medium truncate ${isActive ? 'text-white' : 'text-zinc-200'
              }`}>
              {conversation.participantInfo?.name || 'Unknown User'}
            </h3>

            {conversation.lastMessage && (
              <span className="text-zinc-400 text-xs flex-shrink-0 ml-2">
                {formatLastMessageTime(conversation.lastMessage.timestamp)}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-zinc-400 text-sm truncate">
              {truncateMessage(conversation.lastMessage?.content)}
            </p>

            {/* Unread Count */}
            {conversation.unreadCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-blue-600 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 ml-2 flex-shrink-0"
              >
                {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatItem;
