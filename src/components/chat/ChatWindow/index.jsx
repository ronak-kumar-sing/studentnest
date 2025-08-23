import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Video, MoreVertical, MessageCircle } from 'lucide-react';
import { useChat } from '../../../contexts/ChatContext';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ChatHeader from './ChatHeader';
import TypingIndicator from '../Common/TypingIndicator';

const ChatWindow = ({ chatId, onClose }) => {
  const {
    activeChat,
    messages,
    sendMessage,
    markMessageAsRead,
    isTyping,
    connectionStatus = 'connected'
  } = useChat();

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mark messages as read when chat becomes active
  useEffect(() => {
    if (chatId && messages.length > 0) {
      const unreadMessages = messages.filter(
        msg => !msg.read && msg.senderId !== 'user_123'
      );

      unreadMessages.forEach(msg => {
        markMessageAsRead(msg.id);
      });
    }
  }, [chatId, messages, markMessageAsRead]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end'
    });
  };

  const handleSendMessage = async (content, type = 'text') => {
    if (!content.trim()) return;

    try {
      await sendMessage(chatId, content, type);
      inputRef.current?.focus();
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  if (!activeChat) {
    return (
      <div className="flex items-center justify-center h-full bg-zinc-900 rounded-xl border border-zinc-800">
        <div className="text-center">
          <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-zinc-400" />
          </div>
          <h3 className="text-zinc-300 font-medium mb-2">No chat selected</h3>
          <p className="text-zinc-500 text-sm">Choose a conversation to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col h-full bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden"
    >
      {/* Socket Status Indicator - Content Mode */}
      <div className="bg-orange-600/20 border-orange-500/30 text-orange-200 text-sm py-2 px-4 text-center border-b">
        🚫 Real-time messaging disabled - Content Mode Active
      </div>

      {/* Chat Header */}
      <ChatHeader
        chat={activeChat}
        onClose={onClose}
        onVideoCall={() => console.log('Start video call')}
        onVoiceCall={() => console.log('Start voice call')}
      />

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <MessageList
          messages={messages}
          chatId={chatId}
          onMessageRead={markMessageAsRead}
        />

        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="px-4 pb-2"
            >
              <TypingIndicator userName={isTyping.userName} />
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <MessageInput
        ref={inputRef}
        onSendMessage={handleSendMessage}
        disabled={connectionStatus !== 'connected'}
        placeholder={
          connectionStatus !== 'connected'
            ? 'Connecting...'
            : 'Type a message...'
        }
      />
    </motion.div>
  );
};

export default ChatWindow;
