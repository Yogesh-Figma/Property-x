import React from 'react';

const Loading = () => {
  return (
<div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center z-[9999]">
<div className="flex flex-col items-center gap-4 p-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl">
        <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-gray-800 font-semibold text-lg">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
