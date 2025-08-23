import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MessageBubble from '../Message/MessageBubble';
import { useChat } from '../../../contexts/ChatContext';

const MessageList = ({ messages, chatId, onMessageRead }) => {
  const messagesContainerRef = useRef(null);
  const { currentUser } = useChat();

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  // Group messages by date
  const groupMessagesByDate = (messages) => {
    const groups = {};
    messages.forEach(message => {
      const date = new Date(message.timestamp).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    return groups;
  };

  const messageGroups = groupMessagesByDate(messages);

  const formatDateGroup = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  };

  if (!messages || messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">💬</span>
          </div>
          <p className="text-zinc-400 text-sm">No messages yet</p>
          <p className="text-zinc-500 text-xs mt-1">Send a message to start the conversation</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={messagesContainerRef}
      className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: '#374151 #111827'
      }}
    >
      <AnimatePresence initial={false}>
        {Object.entries(messageGroups).map(([date, groupMessages]) => (
          <motion.div
            key={date}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-2"
          >
            {/* Date Separator */}
            <div className="flex items-center justify-center my-4">
              <div className="bg-zinc-800 text-zinc-400 text-xs px-3 py-1 rounded-full">
                {formatDateGroup(date)}
              </div>
            </div>

            {/* Messages for this date */}
            {groupMessages.map((message, index) => {
              const prevMessage = index > 0 ? groupMessages[index - 1] : null;
              const isConsecutive =
                prevMessage &&
                prevMessage.senderId === message.senderId &&
                new Date(message.timestamp).getTime() - new Date(prevMessage.timestamp).getTime() < 60000; // 1 minute

              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <MessageBubble
                    message={message}
                    isOwn={message.senderId === currentUser?.id}
                    showAvatar={!isConsecutive}
                    showSenderName={!isConsecutive && message.senderId !== currentUser?.id}
                    onRead={() => onMessageRead(message.id)}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default MessageList;
