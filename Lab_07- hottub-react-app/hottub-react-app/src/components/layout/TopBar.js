import React from 'react';
import { Link } from 'react-router-dom';

const TopBar = () => {
  return (
    <div className="bg-gray-100 text-xs py-2 border-b border-gray-200">
      <div className="container xl:w-[1100px] mx-auto px-4 flex justify-between items-center">
        <div>
          <span className="text-gray-500">Call for Customer support:</span> 
          <span className="text-hot-red font-bold ml-1">020 38085565</span>
        </div>
        <div className="flex space-x-4 text-gray-500 font-sans">
          <Link to="/edit-billing" className="hover:text-hot-red">My Account</Link>
          <a href="#" className="hover:text-hot-red">Wishlist</a>
          <Link to="/cart" className="hover:text-hot-red">To Checkout</Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
