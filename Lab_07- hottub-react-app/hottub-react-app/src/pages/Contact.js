import React from 'react';
import Breadcrumbs from '../components/common/Breadcrumbs';

const Contact = () => {
  return (
    <div className="bg-white flex-grow mb-10 pb-16">
      <Breadcrumbs paths={[{ name: 'Contact Us', url: '/contact' }]} />

      <div className="container xl:w-[1100px] mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Details */}
          <div>
            <div className="mb-8">
              <h3 className="font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200 uppercase text-sm">Our Location</h3>
              <div className="bg-gray-100 h-64 w-full flex items-center justify-center text-gray-400">
                <i className="fa-solid fa-map-location-dot text-5xl"></i>
                <span className="ml-3 font-bold">Google Maps Placeholder</span>
              </div>
            </div>

            <div className="space-y-4 text-sm text-gray-600">
              <p><i className="fa-solid fa-location-dot text-hot-red mr-2 w-4"></i> Street No, City, Country</p>
              <p><i className="fa-solid fa-phone text-hot-red mr-2 w-4"></i> 888 - 201 - 8899</p>
              <p><i className="fa-solid fa-envelope text-hot-red mr-2 w-4"></i> service@yoursitename.com</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200 uppercase text-sm">Send us a Message</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Full Name</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 focus:border-hot-red outline-none text-sm transition" placeholder="Your Name" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Email Address</label>
                <input type="email" className="w-full px-3 py-2 border border-gray-300 focus:border-hot-red outline-none text-sm transition" placeholder="Your Email" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Message</label>
                <textarea className="w-full px-3 py-2 border border-gray-300 focus:border-hot-red outline-none text-sm h-32 transition" placeholder="Your Message"></textarea>
              </div>
              <button type="submit" className="bg-hot-red hover:bg-hot-darkred text-white font-bold py-2 px-6 text-sm tracking-wider transition">SEND MESSAGE</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
