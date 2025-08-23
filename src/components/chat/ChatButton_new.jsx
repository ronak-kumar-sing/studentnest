import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ChatButton = ({ recipientId, roomId, roomTitle }) => {
  const navigate = useNavigate();

  const handleChatClick = (e) => {
    e.stopPropagation();
    navigate('/messages');
  };

  return (
    <button
      onClick={handleChatClick}
      className="relative p-3 bg-gradient-to-r from-blue-500/20 to-blue-600/20 hover:from-blue-500/30 hover:to-blue-600/30 text-white rounded-xl backdrop-blur-sm border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 group"
      title={`Message about ${roomTitle}`}
    >
      <MessageCircle
        size={20}
        className="transition-transform duration-200 group-hover:scale-110 group-hover:rotate-12"
      />

      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
    </button>
  );
};

export default ChatButton;
