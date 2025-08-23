import React from 'react';

const DevStatusIndicator = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
      🚫 Backend Completely Disabled - Zero RAM Usage
    </div>
  );
};

export default DevStatusIndicator;
