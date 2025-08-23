import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useNotification } from '../../../contexts/NotificationContext';
import ToastNotification from './ToastNotification';

const ToastContainer = () => {
  const { toasts } = useNotification();

  return createPortal(
    <div className="fixed top-4 right-4 z-[9999] space-y-2">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastNotification key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
};

export default ToastContainer;
