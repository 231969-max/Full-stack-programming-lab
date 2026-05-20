import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-hot-red text-white shadow-md">
      <div className="container xl:w-[1100px] mx-auto px-4 flex flex-col md:flex-row justify-between items-center h-auto md:h-12 py-3 md:py-0">
        <ul className="flex font-bold text-sm tracking-wide h-full items-center uppercase overflow-x-auto w-full md:w-auto mb-3 md:mb-0">
          <li className="h-full flex items-center shrink-0">
            <NavLink to="/category" className={({isActive}) => `px-5 hover:text-gray-200 hover:bg-hot-darkred h-full flex items-center transition ${isActive ? 'bg-hot-darkred' : ''}`}>
              Category
            </NavLink>
          </li>
          <li className="h-full flex items-center shrink-0"><span className="text-hot-darkred">|</span></li>
          <li className="h-full flex items-center shrink-0">
            <NavLink to="/brand" className={({isActive}) => `px-5 hover:text-gray-200 hover:bg-hot-darkred h-full flex items-center transition ${isActive ? 'bg-hot-darkred' : ''}`}>
              Brand
            </NavLink>
          </li>
          <li className="h-full flex items-center shrink-0"><span className="text-hot-darkred">|</span></li>
          <li className="h-full flex items-center shrink-0">
            <NavLink to="/" end className={({isActive}) => `px-5 hover:text-gray-200 hover:bg-hot-darkred h-full flex items-center transition ${isActive ? 'bg-hot-darkred' : ''}`}>
              Info
            </NavLink>
          </li>
          <li className="h-full flex items-center shrink-0"><span className="text-hot-darkred">|</span></li>
          <li className="h-full flex items-center shrink-0">
            <NavLink to="/contact" className={({isActive}) => `px-5 hover:text-gray-200 hover:bg-hot-darkred h-full flex items-center transition ${isActive ? 'bg-hot-darkred' : ''}`}>
              Contact
            </NavLink>
          </li>
        </ul>
        <div className="flex items-center h-8 w-full md:w-64">
          <input type="text" className="h-full w-full px-3 text-sm text-gray-700 focus:outline-none" placeholder="Search..." />
          <button className="bg-[#333] hover:bg-black text-white px-4 h-full text-xs font-bold transition">SEARCH</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
