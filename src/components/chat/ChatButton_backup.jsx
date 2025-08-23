import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useChat } from '../../contexts/ChatContext';
import ChatWindow from './ChatWindow';
import ChatList from './ChatList';

const ChatButton = ({ recipientId, roomId, roomTitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeView, setActiveView] = useState('list'); // 'list' or 'chat'
  const { startChat, activeChat } = useChat();

  const handleStartChat = async (initialMessage = null) => {
    try {
      const chat = await startChat(recipientId, initialMessage || `Hi! I'm interested in ${roomTitle}`);
      setActiveView('chat');
      setIsOpen(true);
      return chat;
    } catch (error) {
      console.error('Failed to start chat:', error);
    }
  };

  const handleOpenChatList = () => {
    setActiveView('list');
    setIsOpen(true);
  };

  const handleCloseChat = () => {
    setIsOpen(false);
    setActiveView('list');
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleOpenChatList}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm font-medium transition-colors"
      >
        <MessageCircle className="w-4 h-4" />
        <span>Contact Owner</span>
      </motion.button>

      {/* Chat Interface Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={handleCloseChat}
            />

            {/* Chat Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-4xl h-[600px] bg-zinc-900 rounded-xl border border-zinc-800 shadow-2xl overflow-hidden"
            >
              <div className="flex h-full">
                {/* Chat List Sidebar */}
                <div className="w-80 border-r border-zinc-800 flex flex-col">
                  {/* Header */}
                  <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
                    <h2 className="text-white font-semibold">Messages</h2>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleCloseChat}
                      className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {/* Quick Start Chat */}
                  <div className="p-4 border-b border-zinc-800">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleStartChat()}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg flex items-center space-x-3 text-sm font-medium transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>Message about {roomTitle}</span>
                    </motion.button>
                  </div>

                  {/* Chat List */}
                  <div className="flex-1">
                    <ChatList onStartNewChat={() => handleStartChat()} />
                  </div>
                </div>

                {/* Chat Window */}
                <div className="flex-1">
                  <ChatWindow
                    chatId={activeChat?.id}
                    onClose={handleCloseChat}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatButton;
