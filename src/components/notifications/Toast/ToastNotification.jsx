import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle, AlertTriangle, Info, AlertCircle, MessageCircle } from 'lucide-react';
import { useNotifications } from '../../../contexts/NotificationContext';

const ToastNotification = ({ toast }) => {
  const { removeToast } = useNotifications();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, toast.duration || 5000);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, removeToast]);

  const getToastStyles = (type) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-900/90 border-green-500/50',
          text: 'text-green-100',
          icon: <CheckCircle className="w-5 h-5 text-green-400" />
        };
      case 'error':
        return {
          bg: 'bg-red-900/90 border-red-500/50',
          text: 'text-red-100',
          icon: <AlertCircle className="w-5 h-5 text-red-400" />
        };
      case 'warning':
        return {
          bg: 'bg-yellow-900/90 border-yellow-500/50',
          text: 'text-yellow-100',
          icon: <AlertTriangle className="w-5 h-5 text-yellow-400" />
        };
      case 'info':
        return {
          bg: 'bg-blue-900/90 border-blue-500/50',
          text: 'text-blue-100',
          icon: <Info className="w-5 h-5 text-blue-400" />
        };
      case 'message':
        return {
          bg: 'bg-zinc-800/90 border-zinc-600/50',
          text: 'text-zinc-100',
          icon: <MessageCircle className="w-5 h-5 text-blue-400" />
        };
      default:
        return {
          bg: 'bg-zinc-800/90 border-zinc-600/50',
          text: 'text-zinc-100',
          icon: <Info className="w-5 h-5 text-zinc-400" />
        };
    }
  };

  const { bg, text, icon } = getToastStyles(toast.type);

  const handleClose = () => {
    removeToast(toast.id);
  };

  const handleClick = () => {
    if (toast.action) {
      toast.action();
    }
    removeToast(toast.id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 300, scale: 0.3 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.5, transition: { duration: 0.2 } }}
      whileHover={{ scale: 1.02 }}
      className={`${bg} backdrop-blur-sm border rounded-lg shadow-xl max-w-sm w-full cursor-pointer`}
      onClick={toast.action ? handleClick : undefined}
    >
      <div className="p-4">
        <div className="flex items-start space-x-3">
          {/* Icon */}
          <div className="flex-shrink-0">
            {toast.icon ? (
              <span className="text-lg">{toast.icon}</span>
            ) : (
              icon
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {toast.title && (
              <h4 className={`font-medium ${text} mb-1`}>
                {toast.title}
              </h4>
            )}
            <p className={`text-sm ${text} opacity-90`}>
              {toast.message}
            </p>

            {toast.action && (
              <button className="text-xs text-blue-300 hover:text-blue-200 mt-2 font-medium">
                Click to view
              </button>
            )}
          </div>

          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            className={`flex-shrink-0 ${text} opacity-50 hover:opacity-100 transition-opacity`}
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Progress Bar */}
        <motion.div
          className="mt-3 h-1 bg-white/20 rounded-full overflow-hidden"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: (toast.duration || 5000) / 1000, ease: "linear" }}
        >
          <div className="h-full bg-white/50 rounded-full" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ToastNotification;
