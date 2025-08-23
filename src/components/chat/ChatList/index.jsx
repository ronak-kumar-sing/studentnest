import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Plus } from 'lucide-react';
import { useChat } from '../../../contexts/ChatContext';
import ChatItem from './ChatItem';

const ChatList = ({ onStartNewChat }) => {
  const { conversations, activeChat, setActiveChat, loading } = useChat();

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800">
        <div className="flex items-center justify-between">
          <h2 className="text-white font-semibold">Messages</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onStartNewChat}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
            title="Start new chat"
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="h-full flex items-center justify-center p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-zinc-400" />
              </div>
              <h3 className="text-zinc-300 font-medium mb-2">No conversations yet</h3>
              <p className="text-zinc-500 text-sm mb-4">Start chatting with room owners</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onStartNewChat}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Start Chat
              </motion.button>
            </div>
          </div>
        ) : (
          <div className="py-2">
            {conversations.map((conversation) => (
              <ChatItem
                key={conversation.id}
                conversation={conversation}
                isActive={activeChat?.id === conversation.id}
                onClick={() => setActiveChat(conversation.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
