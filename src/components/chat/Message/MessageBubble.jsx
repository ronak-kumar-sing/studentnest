import React from 'react';
import { motion } from 'framer-motion';
import { Check, CheckCheck, Clock, AlertCircle, User } from 'lucide-react';
import MessageStatus from './MessageStatus';
import MessageTime from './MessageTime';

const MessageBubble = ({
  message,
  isOwn = false,
  showAvatar = true,
  showSenderName = false,
  onRead
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'sending':
        return 'text-zinc-400';
      case 'sent':
        return 'text-zinc-400';
      case 'delivered':
        return 'text-blue-400';
      case 'read':
        return 'text-blue-500';
      case 'failed':
        return 'text-red-400';
      default:
        return 'text-zinc-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'sending':
        return <Clock className="w-3 h-3" />;
      case 'sent':
        return <Check className="w-3 h-3" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3" />;
      case 'read':
        return <CheckCheck className="w-3 h-3" />;
      case 'failed':
        return <AlertCircle className="w-3 h-3" />;
      default:
        return <Check className="w-3 h-3" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-2`}
    >
      <div className={`flex ${isOwn ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2 max-w-[70%]`}>
        {/* Avatar */}
        {showAvatar && !isOwn && (
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-white" />
          </div>
        )}

        {!showAvatar && !isOwn && (
          <div className="w-8 h-8 flex-shrink-0" />
        )}

        {/* Message Bubble */}
        <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
          {/* Sender Name */}
          {showSenderName && !isOwn && (
            <div className="text-xs text-zinc-400 mb-1 px-1">
              {message.senderName}
            </div>
          )}

          {/* Message Content */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`relative px-4 py-2 rounded-2xl ${isOwn
                ? 'bg-blue-600 text-white rounded-br-md'
                : 'bg-zinc-800 text-white rounded-bl-md'
              } shadow-lg`}
          >
            {/* Message Text */}
            <div className="whitespace-pre-wrap break-words">
              {message.content}
            </div>

            {/* Message Timestamp and Status */}
            <div className={`flex items-center justify-end mt-1 space-x-1 ${isOwn ? 'text-blue-100' : 'text-zinc-400'
              }`}>
              <MessageTime timestamp={message.timestamp} />

              {isOwn && (
                <div className={`flex items-center ${getStatusColor(message.status)}`}>
                  {getStatusIcon(message.status)}
                </div>
              )}
            </div>

            {/* Triangle pointer */}
            <div
              className={`absolute bottom-0 w-0 h-0 ${isOwn
                  ? 'right-0 border-l-[6px] border-l-blue-600 border-b-[6px] border-b-transparent'
                  : 'left-0 border-r-[6px] border-r-zinc-800 border-b-[6px] border-b-transparent'
                }`}
            />
          </motion.div>

          {/* Message Status (for own messages) */}
          {isOwn && (
            <div className="mt-1">
              <MessageStatus status={message.status} />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
