import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-hot-footer text-hot-footer-text text-xs py-10 mt-auto border-t-4 border-hot-red">
      <div className="container xl:w-[1100px] mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Contact Us */}
        <div>
          <h4 className="text-white font-bold mb-4 uppercase">Contact Us</h4>
          <ul className="space-y-2">
            <li>yoursitename.com</li>
            <li className="text-white font-bold text-sm tracking-wide">CALL 24/7: <span className="text-lg">888 - 201 - 8899</span></li>
            <li className="mt-2">Your Address:</li>
            <li>Street</li>
            <li>State & Zip Code</li>
            <li>City & Country</li>
            <li>Email: <a href="mailto:service@yoursitename.com" className="text-white hover:text-hot-red">service@yoursitename.com</a></li>
          </ul>
          {/* Social Icons */}
          <div className="flex space-x-2 mt-4">
            <a href="#" className="w-6 h-6 rounded-full bg-[#1da1f2] text-white flex items-center justify-center hover:bg-opacity-80 transition"><i className="fa-brands fa-twitter text-[10px]"></i></a>
            <a href="#" className="w-6 h-6 rounded-full bg-[#3b5998] text-white flex items-center justify-center hover:bg-opacity-80 transition"><i className="fa-brands fa-facebook-f text-[10px]"></i></a>
            <a href="#" className="w-6 h-6 rounded-full bg-[#0077b5] text-white flex items-center justify-center hover:bg-opacity-80 transition"><i className="fa-brands fa-linkedin-in text-[10px]"></i></a>
            <a href="#" className="w-6 h-6 rounded-full bg-[#db4437] text-white flex items-center justify-center hover:bg-opacity-80 transition"><i className="fa-brands fa-google-plus-g text-[10px]"></i></a>
            <a href="#" className="w-6 h-6 rounded-full bg-[#c4302b] text-white flex items-center justify-center hover:bg-opacity-80 transition"><i className="fa-brands fa-youtube text-[10px]"></i></a>
            <a href="#" className="w-6 h-6 rounded-full bg-[#bd081c] text-white flex items-center justify-center hover:bg-opacity-80 transition"><i className="fa-brands fa-pinterest-p text-[10px]"></i></a>
          </div>
        </div>

        {/* Information */}
        <div>
          <h4 className="text-white font-bold mb-4 uppercase">Information</h4>
          <ul className="space-y-1">
            <li className="border-b border-[#0f304e] py-1"><Link to="/" className="hover:text-white transition">About Us</Link></li>
            <li className="border-b border-[#0f304e] py-1"><a href="#" className="hover:text-white transition">Customer Service</a></li>
            <li className="border-b border-[#0f304e] py-1"><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
            <li className="border-b border-[#0f304e] py-1"><a href="#" className="hover:text-white transition">Site Map</a></li>
            <li className="border-b border-[#0f304e] py-1"><a href="#" className="hover:text-white transition">Search Terms</a></li>
            <li className="border-b border-[#0f304e] py-1"><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
          </ul>
        </div>

        {/* My Account */}
        <div>
          <h4 className="text-white font-bold mb-4 uppercase">My Account</h4>
          <ul className="space-y-1">
            <li className="border-b border-[#0f304e] py-1"><a href="#" className="hover:text-white transition">Sign In</a></li>
            <li className="border-b border-[#0f304e] py-1"><Link to="/cart" className="hover:text-white transition">View Cart</Link></li>
            <li className="border-b border-[#0f304e] py-1"><a href="#" className="hover:text-white transition">My Wishlist</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-bold mb-4 uppercase">Signup For A News Letter</h4>
          <p className="mb-2">SIGN UP FOR OUR NEWSLETTER</p>
          <form className="mt-2" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <input type="email" className="w-full bg-white text-gray-800 px-3 py-2 outline-none text-xs" placeholder="Email Address..." />
              <button type="submit" className="absolute right-0 top-0 h-full bg-[#354f65] text-white px-3 hover:bg-hot-red transition">
                <i className="fa-solid fa-play"></i>
              </button>
            </div>
            <div className="text-green-400 text-[10px] mt-1 hidden">Subscribed successfully!</div>
          </form>

          <h5 className="text-white text-[10px] font-bold mt-6 mb-2 uppercase">Payment Solutions</h5>
          <div className="flex space-x-1">
            <div className="bg-white px-1 py-0.5 rounded text-[10px] text-hot-footer font-bold flex items-center justify-center w-8 h-5">Visa</div>
            <div className="bg-white px-1 py-0.5 rounded text-[10px] text-hot-footer font-bold flex items-center justify-center w-8 h-5">MC</div>
            <div className="bg-white px-1 py-0.5 rounded text-[10px] text-hot-footer font-bold flex items-center justify-center w-8 h-5">Amex</div>
            <div className="bg-white px-1 py-0.5 rounded text-[10px] text-hot-footer font-bold flex items-center justify-center w-8 h-5">PayP</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
