import React from 'react';
import { Link } from 'react-router';

const NotFound = () => {
    return (
        <div>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-2xl text-gray-700 mb-6">Oops! Page Not Found</p>
      <Link to="/"className="px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition">
        Go Back Home
      </Link>
    </div>
        </div>
    );
};

export default NotFound;