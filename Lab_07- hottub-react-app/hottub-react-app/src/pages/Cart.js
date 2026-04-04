import React from 'react';
import Breadcrumbs from '../components/common/Breadcrumbs';

const Cart = () => {
  return (
    <div className="bg-white flex-grow mb-10 pb-16">
      <Breadcrumbs paths={[{ name: 'Shopping Cart', url: '/cart' }]} />

      <div className="container xl:w-[1100px] mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Shopping Cart</h2>

        <div className="border border-gray-200 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 uppercase text-xs font-bold text-gray-600 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4 text-center">Price</th>
                <th className="px-6 py-4 text-center">Qty</th>
                <th className="px-6 py-4 text-center">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-50 border border-gray-100 p-1 flex items-center justify-center">
                    <img src="/assets/extracted_assets/product1.jpg" alt="Product" className="max-h-full max-w-full" />
                  </div>
                  <span className="font-bold text-hot-red">XS SCYBA X SERUES 119</span>
                </td>
                <td className="px-6 py-4 text-center font-bold">$500.00</td>
                <td className="px-6 py-4 text-center">
                  <input type="number" defaultValue="1" className="w-12 px-1 py-1 border border-gray-300 text-center outline-none" />
                </td>
                <td className="px-6 py-4 text-center font-bold text-hot-red">$500.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex flex-col md:row justify-between gap-8">
          <div className="md:w-1/3">
             <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-6 text-xs uppercase transition">Continue Shopping</button>
          </div>
          <div className="md:w-1/3 bg-gray-50 p-6 border border-gray-100">
            <div className="flex justify-between mb-2 text-sm font-bold">
              <span>Subtotal:</span>
              <span>$500.00</span>
            </div>
            <div className="flex justify-between mb-4 text-lg font-black text-hot-red border-t border-gray-200 pt-4">
              <span>Grand Total:</span>
              <span>$500.00</span>
            </div>
            <button className="w-full bg-hot-red hover:bg-hot-darkred text-white font-bold py-3 text-sm tracking-wider transition uppercase">Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
