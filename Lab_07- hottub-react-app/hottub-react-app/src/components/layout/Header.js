import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="bg-white py-6">
      <div className="container xl:w-[1100px] mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center">
          <Link to="/" className="flex flex-col">
            <h1 className="text-3xl font-black tracking-tight leading-none" style={{ color: '#333' }}>HOTSPRING</h1>
            <span className="text-hot-red font-bold text-sm tracking-wide ml-1 mt-[-2px]">Portable Spas</span>
          </Link>
        </div>
        <Link to="/cart" className="border border-gray-200 p-2 flex items-center justify-between w-48 text-sm cursor-pointer hover:border-gray-300">
          <div className="flex items-center">
            <i className="fa-solid fa-cart-shopping text-hot-red mr-2"></i>
            <span className="text-gray-700 font-sans">My Cart: <span className="font-bold">0 item(s)</span></span>
          </div>
          <i className="fa-solid fa-caret-down text-gray-400"></i>
        </Link>
      </div>
    </div>
  );
};

export default Header;
