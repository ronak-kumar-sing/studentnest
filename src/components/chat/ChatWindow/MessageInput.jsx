import React, { useState, forwardRef, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Paperclip, Smile, Mic } from 'lucide-react';

const MessageInput = forwardRef(({
  onSendMessage,
  disabled = false,
  placeholder = 'Type a message...'
}, ref) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');

      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  };

  const handleAttachment = () => {
    // TODO: Implement file attachment
    console.log('Attachment clicked');
  };

  const handleEmoji = () => {
    // TODO: Implement emoji picker
    console.log('Emoji clicked');
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // TODO: Implement voice recording
    console.log(isRecording ? 'Stop recording' : 'Start recording');
  };

  return (
    <div className="p-4 border-t border-zinc-800">
      <form onSubmit={handleSubmit} className="flex items-end space-x-2">
        {/* Attachment Button */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleAttachment}
          disabled={disabled}
          className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Attach File"
        >
          <Paperclip className="w-5 h-5" />
        </motion.button>

        {/* Message Input */}
        <div className="flex-1 relative">
          <textarea
            ref={(node) => {
              textareaRef.current = node;
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
            }}
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="w-full bg-zinc-800 text-white placeholder-zinc-400 rounded-lg px-4 py-3 pr-12 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              minHeight: '48px',
              maxHeight: '120px',
              scrollbarWidth: 'thin',
              scrollbarColor: '#374151 #111827'
            }}
          />

          {/* Emoji Button */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleEmoji}
            disabled={disabled}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-white transition-colors disabled:opacity-50"
            title="Add Emoji"
          >
            <Smile className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Send/Voice Button */}
        {message.trim() ? (
          <motion.button
            type="submit"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={disabled}
            className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Send Message"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        ) : (
          <motion.button
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleRecording}
            disabled={disabled}
            className={`p-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${isRecording
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white'
              }`}
            title={isRecording ? 'Stop Recording' : 'Voice Message'}
          >
            <motion.div
              animate={isRecording ? { scale: [1, 1.2, 1] } : { scale: 1 }}
              transition={{ repeat: isRecording ? Infinity : 0, duration: 1 }}
            >
              <Mic className="w-5 h-5" />
            </motion.div>
          </motion.button>
        )}
      </form>

      {/* Recording Indicator */}
      {isRecording && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="flex items-center justify-center mt-2 p-2 bg-red-500/10 border border-red-500/20 rounded-lg"
        >
          <div className="flex items-center space-x-2 text-red-400">
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-2 h-2 bg-red-500 rounded-full"
            />
            <span className="text-sm font-medium">Recording...</span>
            <span className="text-xs">Tap to stop</span>
          </div>
        </motion.div>
      )}
    </div>
  );
});

MessageInput.displayName = 'MessageInput';

export default MessageInput;
