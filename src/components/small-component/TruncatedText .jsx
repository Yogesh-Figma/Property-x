import React from 'react';

const TextTruncate = ({ text }) => {
  const safeText = text || '';

  
  // Function to truncate text to 10 words
  const truncateText = (str) => {
    if (!str) return '';

    if (str.length > 15) {
      return str.substring(0, 15) + '...';
    }
    return str;
  };
  const shouldTruncate = safeText.length > 15;
  const displayText = shouldTruncate ? truncateText(safeText) : safeText;

  return (
    <div 
      className="relative group"
      title={shouldTruncate ? safeText : ''}
    >
      <div className="text-sm text-gray-600">
      {displayText || '-'}  
      </div>
      
      {shouldTruncate && safeText && (
        <div
        className="
          absolute 
          z-50 
          invisible 
          group-hover:visible 
          bg-white 
          text-gray-900 
          text-sm 
          p-4 
          rounded-lg 
          shadow-xl 
          max-w-xs 
          whitespace-normal 
          break-words 
          mt-2 
          left-0 
          border 
          border-gray-200 
          transform 
          transition-opacity 
          duration-200 
          ease-in-out 
          opacity-0 
          group-hover:opacity-100 
          hover:scale-105 
          before:content-[''] 
          before:absolute 
          before:-top-2 
          before:left-1/2 
          before:-translate-x-1/2 
          before:border-8 
          before:border-transparent 
          before:border-b-white 
        "
      >
        {text}
      </div>
      
       
      )}
    </div>
  );
};

export default TextTruncate;