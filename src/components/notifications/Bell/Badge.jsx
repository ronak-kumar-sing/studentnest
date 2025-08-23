import React from 'react';
import { motion } from 'framer-motion';

const Badge = ({ count }) => {
  const displayCount = count > 99 ? '99+' : count.toString();

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1"
    >
      {displayCount}
    </motion.div>
  );
};

export default Badge;
