import { User, Package, MapPin, CreditCard, LogOut, Settings } from "lucide-react";
import Link from "next/link";

export default function AccountPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-20 pt-10">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Account</h1>
          <p className="text-gray-500 mt-2">Manage your orders, profile, and preferences.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center font-bold text-xl">
                  JD
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">John Doe</h3>
                  <p className="text-xs text-gray-500">john.doe@example.com</p>
                </div>
              </div>
              <div className="flex flex-col py-2">
                <Link href="#" className="flex items-center gap-3 px-6 py-3 text-orange-500 bg-orange-50 font-medium border-r-2 border-orange-500">
                  <User size={18} /> Dashboard
                </Link>
                <Link href="#" className="flex items-center gap-3 px-6 py-3 text-gray-600 hover:text-orange-500 hover:bg-gray-50 transition-colors">
                  <Package size={18} /> Orders
                </Link>
                <Link href="#" className="flex items-center gap-3 px-6 py-3 text-gray-600 hover:text-orange-500 hover:bg-gray-50 transition-colors">
                  <MapPin size={18} /> Addresses
                </Link>
                <Link href="#" className="flex items-center gap-3 px-6 py-3 text-gray-600 hover:text-orange-500 hover:bg-gray-50 transition-colors">
                  <CreditCard size={18} /> Payment Methods
                </Link>
                <Link href="#" className="flex items-center gap-3 px-6 py-3 text-gray-600 hover:text-orange-500 hover:bg-gray-50 transition-colors">
                  <Settings size={18} /> Settings
                </Link>
                <hr className="my-2" />
                <Link href="/login" className="flex items-center gap-3 px-6 py-3 text-red-500 hover:bg-red-50 transition-colors">
                  <LogOut size={18} /> Logout
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4 flex flex-col gap-8">
            
            {/* Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-blue-500">
                  <Package size={24} />
                </div>
                <div>
                  <h4 className="text-gray-500 text-sm">Total Orders</h4>
                  <p className="text-2xl font-bold text-gray-800">12</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="bg-green-50 p-4 rounded-lg text-green-500">
                  <CreditCard size={24} />
                </div>
                <div>
                  <h4 className="text-gray-500 text-sm">Total Spent</h4>
                  <p className="text-2xl font-bold text-gray-800">£1,249.50</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="bg-purple-50 p-4 rounded-lg text-purple-500">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-gray-500 text-sm">Saved Addresses</h4>
                  <p className="text-2xl font-bold text-gray-800">2</p>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-800 text-lg">Recent Orders</h3>
                <Link href="#" className="text-orange-500 hover:underline text-sm font-medium">View All</Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-sm">
                      <th className="px-6 py-4 font-medium">Order ID</th>
                      <th className="px-6 py-4 font-medium">Date</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium">Total</th>
                      <th className="px-6 py-4 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="px-6 py-4 font-medium text-gray-800">#ORD-98765</td>
                      <td className="px-6 py-4 text-gray-500">May 15, 2026</td>
                      <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">Delivered</span></td>
                      <td className="px-6 py-4 font-medium text-gray-800">£349.99</td>
                      <td className="px-6 py-4 text-right"><button className="text-orange-500 hover:underline text-sm">View</button></td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-gray-800">#ORD-98764</td>
                      <td className="px-6 py-4 text-gray-500">Apr 22, 2026</td>
                      <td className="px-6 py-4"><span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">Processing</span></td>
                      <td className="px-6 py-4 font-medium text-gray-800">£124.99</td>
                      <td className="px-6 py-4 text-right"><button className="text-orange-500 hover:underline text-sm">View</button></td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-gray-800">#ORD-98763</td>
                      <td className="px-6 py-4 text-gray-500">Mar 10, 2026</td>
                      <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">Delivered</span></td>
                      <td className="px-6 py-4 font-medium text-gray-800">£774.52</td>
                      <td className="px-6 py-4 text-right"><button className="text-orange-500 hover:underline text-sm">View</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
