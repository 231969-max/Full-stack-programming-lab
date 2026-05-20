import React, { useEffect } from 'react';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ProductCard from '../components/product/ProductCard';

const Category = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  const products = [
    { id: 1, image: '/assets/extracted_assets/product1.jpg', title: 'XS SCYBA X SERUES 119', description: 'The goods of our stores are very reliable and dur we care about the customer', price: '500.00' },
    { id: 2, image: '/assets/extracted_assets/product2.jpg', title: 'XS SCYBA X SERUES 119', description: 'The goods of our stores are very reliable and dur we care about the customer', price: '500.00' },
    { id: 3, image: '/assets/extracted_assets/product3.jpg', title: 'XS SCYBA X SERUES 119', description: 'The goods of our stores are very reliable and dur we care about the customer', price: '500.00' },
    { id: 4, image: '/assets/extracted_assets/product1.jpg', title: 'XS SCYBA X SERUES 119', description: 'The goods of our stores are very reliable and dur we care about the customer', price: '500.00' },
    { id: 5, image: '/assets/extracted_assets/product2.jpg', title: 'XS SCYBA X SERUES 119', description: 'The goods of our stores are very reliable and dur we care about the customer', price: '500.00' },
    { id: 6, image: '/assets/extracted_assets/product3.jpg', title: 'XS SCYBA X SERUES 119', description: 'The goods of our stores are very reliable and dur we care about the customer', price: '500.00' },
  ];

  return (
    <div className="bg-white flex-grow mb-10 pb-16">
      <Breadcrumbs paths={[{ name: 'Category', url: '/category' }]} />

      <div className="container xl:w-[1100px] mx-auto px-4 flex flex-col md:row mt-6 gap-8">
        {/* Sidebar: Shopping Options */}
        <aside className="w-full md:w-1/4">
          <div className="mb-8">
            <h2 className="text-[14px] font-bold text-gray-800 border-b-2 border-gray-100 pb-2 mb-4">Shopping Options</h2>
            
            {/* Seating Capacity */}
            <div className="mb-4">
              <h3 className="text-[11px] font-bold text-gray-500 uppercase mb-3">Seating Capacity</h3>
              <ul className="text-[11px] space-y-3 pl-2">
                <li><a href="#" className="flex items-center text-hot-red"><i className="fa-solid fa-angle-right text-[8px] mr-2"></i> 2 - 4 PEOPLE</a></li>
                <li><a href="#" className="flex items-center text-gray-500 hover:text-hot-red transition"><i className="fa-solid fa-angle-right text-[8px] mr-2 text-gray-300"></i> 5 - 7 PEOPLE</a></li>
              </ul>
            </div>
            <hr className="border-gray-100 my-4 border-dashed" />
            
            {/* Choose Sizes */}
            <div className="mb-4">
              <h3 className="text-[11px] font-bold text-gray-500 uppercase mb-3">Choose Sizes</h3>
              <ul className="text-[11px] space-y-3 pl-2">
                <li><a href="#" className="flex items-center text-gray-500 hover:text-hot-red transition"><i className="fa-solid fa-angle-right text-[8px] mr-2 text-gray-300"></i> 5 - 6 FEET LONG</a></li>
                <li><a href="#" className="flex items-center text-gray-500 hover:text-hot-red transition"><i className="fa-solid fa-angle-right text-[8px] mr-2 text-gray-300"></i> 6 - 7 FEET LONG</a></li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Main Product Area */}
        <main className="w-full md:w-3/4">
          <div className="flex justify-between items-end border-b border-gray-200 pb-2 mb-2">
            <h2 className="text-lg font-bold text-gray-800">Top Product Listing</h2>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <p className="text-[11px] text-gray-500">6 Item(s)</p>
            <div className="flex items-center text-[11px] text-gray-600">
              <span className="mr-2">Show</span>
              <select className="border border-gray-300 p-1 outline-none bg-white w-16">
                <option>9</option>
                <option>18</option>
                <option>36</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
            {products.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          {/* BRANDS LOGOS */}
          <div className="border border-gray-200 p-6 flex flex-wrap justify-between items-center bg-white fade-in mt-8 shadow-sm">
            <div className="flex items-center">
              <div className="bg-cyan-400 text-white font-black text-xl px-2 py-1 transform -skew-x-12 mr-2">SAVE</div>
              <div className="bg-cyan-400 text-white font-black text-2xl px-2 py-1 transform -skew-x-12">$1,000'S</div>
            </div>
            <img src="/assets/extracted_assets/oceanic.jpg" alt="OceanicSpa" className="h-10 opacity-70 hover:opacity-100 transition" />
            <img src="/assets/extracted_assets/caldera.jpg" alt="CalderaSpas" className="h-10 opacity-70 hover:opacity-100 transition" />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Category;
