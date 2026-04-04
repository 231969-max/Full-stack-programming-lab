import React from 'react';
import Breadcrumbs from '../components/common/Breadcrumbs';

export const ForgotPassword = () => (
  <div className="bg-white flex-grow mb-10 pb-16">
    <Breadcrumbs paths={[{ name: 'Forgot Password', url: '/forgot-password' }]} />
    <div className="container xl:w-[1100px] mx-auto px-4 max-w-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Forgot Password</h2>
      <div className="bg-gray-50 p-6 border border-gray-100 shadow-sm">
        <p className="text-xs text-gray-500 mb-6">Please enter your email address below. You will receive a link to reset your password.</p>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Email Address</label>
            <input type="email" className="w-full px-3 py-2 border border-gray-300 focus:border-hot-red outline-none text-sm transition" placeholder="Your Email" />
          </div>
          <button type="submit" className="bg-hot-red hover:bg-hot-darkred text-white font-bold py-2 px-6 text-sm tracking-wider transition">RESET PASSWORD</button>
        </form>
      </div>
    </div>
  </div>
);

export const EditBilling = () => (
  <div className="bg-white flex-grow mb-10 pb-16">
    <Breadcrumbs paths={[{ name: 'Edit Billing Address', url: '/edit-billing' }]} />
    <div className="container xl:w-[1100px] mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Billing Address</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">First Name</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 focus:border-hot-red outline-none text-sm transition" defaultValue="Jennifer" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Last Name</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 focus:border-hot-red outline-none text-sm transition" defaultValue="Lawrence" />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Street Address</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 focus:border-hot-red outline-none text-sm transition" placeholder="Street Address" />
          </div>
          <button type="submit" className="bg-hot-red hover:bg-hot-darkred text-white font-bold py-2 px-6 text-sm tracking-wider transition">SAVE ADDRESS</button>
        </div>
      </form>
    </div>
  </div>
);

export const EditShipping = () => (
  <div className="bg-white flex-grow mb-10 pb-16">
    <Breadcrumbs paths={[{ name: 'Edit Shipping Address', url: '/edit-shipping' }]} />
    <div className="container xl:w-[1100px] mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Shipping Address</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">First Name</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 focus:border-hot-red outline-none text-sm transition" defaultValue="Jennifer" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Last Name</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 focus:border-hot-red outline-none text-sm transition" defaultValue="Lawrence" />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Shipping Method</label>
            <select className="w-full px-3 py-2 border border-gray-300 focus:border-hot-red outline-none text-sm transition bg-white">
              <option>Free Shipping</option>
              <option>Standard Shipping</option>
              <option>Express Shipping</option>
            </select>
          </div>
          <button type="submit" className="bg-hot-red hover:bg-hot-darkred text-white font-bold py-2 px-6 text-sm tracking-wider transition">SAVE ADDRESS</button>
        </div>
      </form>
    </div>
  </div>
);
