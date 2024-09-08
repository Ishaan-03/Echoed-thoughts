import React from "react";

const SkeletonLoader: React.FC = () => {
  return (
    <div className="animate-pulse p-4 w-full max-w-screen-lg mx-auto">
      <div className="h-8 bg-gray-300 rounded-md w-3/4 mb-6"></div>

      <div className="h-56 bg-gray-300 rounded-lg mb-6"></div>

      <div className="space-y-4">
        <div className="h-4 bg-gray-300 rounded-md w-full"></div>
        <div className="h-4 bg-gray-300 rounded-md w-full"></div>
        <div className="h-4 bg-gray-300 rounded-md w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded-md w-3/4"></div>
      </div>

      <div className="flex items-center mt-6 space-x-4">
        <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded-md w-24"></div>
          <div className="h-4 bg-gray-300 rounded-md w-20"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
