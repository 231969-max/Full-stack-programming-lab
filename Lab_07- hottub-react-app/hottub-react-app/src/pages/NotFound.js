import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="bg-white flex-grow flex items-center justify-center py-20">
      <div className="container xl:w-[1100px] mx-auto px-4 text-center">
        <h1 className="text-9xl font-black text-gray-200 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Oops! Page Not Found</h2>
        <p className="text-gray-500 mb-10 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="inline-block bg-hot-red hover:bg-hot-darkred text-white font-bold py-3 px-8 rounded-sm transition uppercase text-sm tracking-widest">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
