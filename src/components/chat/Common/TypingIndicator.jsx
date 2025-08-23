import React from 'react';
import { motion } from 'framer-motion';

const TypingIndicator = ({ userName = 'Someone' }) => {
  return (
    <div className="flex items-center space-x-2 text-zinc-400 text-sm">
      <div className="flex items-center space-x-1">
        <div className="w-6 h-6 bg-zinc-800 rounded-full flex items-center justify-center">
          <div className="flex space-x-1">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-1 h-1 bg-zinc-400 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
        <span>{userName} is typing...</span>
      </div>
    </div>
  );
};

export default TypingIndicator;
