// components/ConnectionError.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const ConnectionError = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Connection Required</h2>
        <p className="text-gray-700 mb-6">
          We couldn't connect to the server. Please check your internet connection and try again.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectionError;