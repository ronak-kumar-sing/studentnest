import React from 'react';
import { X, Phone, Video, MoreVertical, User } from 'lucide-react';
import { motion } from 'framer-motion';

const ChatHeader = ({ chat, onClose, onVideoCall, onVoiceCall }) => {
  if (!chat) return null;

  return (
    <div className="flex items-center justify-between p-4 border-b border-zinc-800">
      {/* User Info */}
      <div className="flex items-center space-x-3">
        <div className="relative">
          {chat.participantInfo?.avatar ? (
            <img
              src={chat.participantInfo.avatar}
              alt={chat.participantInfo.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          )}

          {/* Online Status Indicator */}
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900"></div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-white font-medium truncate">
            {chat.participantInfo?.name || 'Unknown User'}
          </h3>
          <p className="text-zinc-400 text-sm">
            Online • Last seen now
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onVoiceCall}
          className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
          title="Voice Call"
        >
          <Phone className="w-5 h-5" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onVideoCall}
          className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
          title="Video Call"
        >
          <Video className="w-5 h-5" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
          title="More Options"
        >
          <MoreVertical className="w-5 h-5" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors ml-2"
          title="Close Chat"
        >
          <X className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};

export default ChatHeader;
