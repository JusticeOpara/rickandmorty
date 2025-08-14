
import React from 'react';

const CharacterCardSkeleton: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg animate-pulse">
      <div className="h-48 w-full bg-gray-700"></div>
      <div className="p-4">
        <div className="h-6 w-3/4 bg-gray-700 rounded mb-2"></div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-gray-700"></div>
          <div className="h-4 w-1/2 bg-gray-700 rounded"></div>
        </div>
        <div className="h-4 w-full bg-gray-700 rounded"></div>
      </div>
    </div>
  );
};

export default CharacterCardSkeleton;