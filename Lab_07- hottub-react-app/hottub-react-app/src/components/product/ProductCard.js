import React from 'react';

const ProductCard = ({ image, title, description, price }) => {
  return (
    <div className="border border-gray-200 bg-white flex flex-col hover-lift h-full group transition-all duration-300">
      {/* Image Container */}
      <div className="p-6 flex items-center justify-center bg-white h-[200px] overflow-hidden">
        <img src={image} alt={title} className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105" />
      </div>
      
      {/* Details Container */}
      <div className="p-4 flex-grow flex flex-col bg-[#f9f9f9]">
        <h3 className="text-xs font-bold text-gray-800 mb-2 uppercase">{title}</h3>
        <p className="text-[10px] text-gray-500 mb-3 leading-tight flex-grow line-clamp-3">{description}</p>
        
        <div className="text-hot-red text-lg font-black mb-3">${price}</div>
        
        <div className="flex items-stretch mb-4">
          <button className="bg-[#1a1a1a] hover:bg-black text-white px-2 py-1 text-xs font-bold transition flex items-center justify-center border-r border-gray-700 group-hover:bg-hot-red w-8">
            <i className="fa-solid fa-cart-shopping"></i>
          </button>
          <button className="bg-hot-red hover:bg-hot-darkred text-white px-3 py-1.5 text-xs font-bold transition flex-grow min-w-0 tracking-wide text-center">
            ADD TO CART
          </button>
        </div>
        
        <div className="flex justify-between items-center text-[9px] uppercase font-bold text-hot-red mt-auto border-t border-gray-200 pt-3">
          <a href="#" className="hover:text-hot-darkred flex items-center transition-colors"><i className="fa-solid fa-plus text-[8px] mr-1"></i> ADD TO WISH LIST</a>
          <a href="#" className="hover:text-hot-darkred flex items-center transition-colors"><i className="fa-solid fa-plus text-[8px] mr-1"></i> MORE DETAILS</a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
