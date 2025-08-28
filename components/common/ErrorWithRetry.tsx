
import React from 'react';


interface ErrorWithRetryProps {
  message: string;
  onRetry: () => void;
}

const ErrorWithRetry: React.FC<ErrorWithRetryProps> = ({ message, onRetry }) => {
  return (
    <div className="text-center py-12">
      <div className="text-red-500 mb-4">{message}</div>
      <button 
        onClick={onRetry}
       
        className="text-white  border-white border-1 px-4 py-1 rounded-lg hover:bg-gray-700"
      >
        Retry
      </button>
    </div>
  );
};

export default ErrorWithRetry;