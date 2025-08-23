import React from 'react';
import { Check, CheckCheck, Clock, AlertCircle } from 'lucide-react';

const MessageStatus = ({ status }) => {
  const getStatusInfo = (status) => {
    switch (status) {
      case 'sending':
        return {
          icon: <Clock className="w-3 h-3" />,
          text: 'Sending',
          color: 'text-zinc-400'
        };
      case 'sent':
        return {
          icon: <Check className="w-3 h-3" />,
          text: 'Sent',
          color: 'text-zinc-400'
        };
      case 'delivered':
        return {
          icon: <CheckCheck className="w-3 h-3" />,
          text: 'Delivered',
          color: 'text-blue-400'
        };
      case 'read':
        return {
          icon: <CheckCheck className="w-3 h-3" />,
          text: 'Read',
          color: 'text-blue-500'
        };
      case 'failed':
        return {
          icon: <AlertCircle className="w-3 h-3" />,
          text: 'Failed',
          color: 'text-red-400'
        };
      default:
        return {
          icon: <Check className="w-3 h-3" />,
          text: 'Sent',
          color: 'text-zinc-400'
        };
    }
  };

  const { icon, text, color } = getStatusInfo(status);

  return (
    <div className={`flex items-center space-x-1 text-xs ${color}`} title={text}>
      {icon}
    </div>
  );
};

export default MessageStatus;
