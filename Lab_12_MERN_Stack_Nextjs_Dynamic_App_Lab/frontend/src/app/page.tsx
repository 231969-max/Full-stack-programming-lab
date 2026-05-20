import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

interface Product {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
  category: string;
  type: string;
}

export const dynamic = 'force-dynamic';

export default async function Home() {
  let products: Product[] = [];
  
  try {
    const res = await fetch('http://localhost:5000/api/products', { cache: 'no-store' });
    if (res.ok) {
      products = await res.json();
    }
  } catch (error) {
    // Silently fallback if backend is not running
  }

  if (!products || products.length === 0) {
    // Provide some fallback dummy data just in case backend is not running or returned empty
    products = [
      { _id: "1", title: "Fallback Wooden Chair", price: 124.99, imageUrl: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&h=500&fit=crop", category: "chairs", type: "featured" },
      { _id: "2", title: "Fallback Modern Bed", price: 124.99, imageUrl: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=500&h=500&fit=crop", category: "beds", type: "featured" },
      { _id: "3", title: "Fallback Glass Table", price: 124.99, imageUrl: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=500&h=500&fit=crop", category: "tables", type: "featured" },
    ];
  }

  const featured = products.filter(p => p.type === 'featured');

  return (
    <div className="overflow-hidden">
      <Hero />
      
      {/* Collections Row */}
      <section className="container mx-auto px-4 md:px-6 mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/chairs" className="bg-orange-50 p-12 md:p-10 flex flex-col items-center justify-center text-center relative group overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-bold uppercase tracking-widest text-gray-800 z-10"><span className="text-orange-500">CHAIRS</span> COLLECTION</h2>
          <img src="https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=300&h=300&fit=crop" className="absolute opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700" alt="chairs" />
        </Link>
        <Link href="/beds" className="bg-orange-50 p-12 md:p-10 flex flex-col items-center justify-center text-center relative group overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-bold uppercase tracking-widest text-gray-800 z-10"><span className="text-orange-500">BEDS</span> COLLECTION</h2>
          <img src="https://images.unsplash.com/photo-1505693314120-0d443867891c?w=300&h=300&fit=crop" className="absolute opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700" alt="beds" />
        </Link>
        <Link href="/tables" className="bg-orange-50 p-12 md:p-10 flex flex-col items-center justify-center text-center relative group overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-bold uppercase tracking-widest text-gray-800 z-10"><span className="text-orange-500">TABLES</span> COLLECTION</h2>
          <img src="https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=300&h=300&fit=crop" className="absolute opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700" alt="tables" />
        </Link>
      </section>

      {/* Product Tabs */}
      <section className="container mx-auto px-4 md:px-6 mt-20">
        <div className="bg-gray-100 rounded-t-xl flex flex-col sm:flex-row overflow-hidden">
          <button className="flex-1 py-4 px-2 sm:px-4 text-center font-bold text-orange-500 bg-white border-b-2 sm:border-b-0 sm:border-t-2 border-orange-500 uppercase text-sm sm:text-base transition-colors">Featured</button>
          <button className="flex-1 py-4 px-2 sm:px-4 text-center font-bold text-gray-500 hover:text-gray-800 hover:bg-gray-200 uppercase text-sm sm:text-base transition-colors">Special</button>
          <button className="flex-1 py-4 px-2 sm:px-4 text-center font-bold text-gray-500 hover:text-gray-800 hover:bg-gray-200 uppercase text-sm sm:text-base transition-colors">Popular</button>
        </div>
        
        <div className="border border-t-0 sm:border-t p-6 md:p-8 rounded-b-xl bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {featured.length > 0 ? featured.slice(0, 8).map(product => (
              <ProductCard 
                key={product._id} 
                id={product._id}
                title={product.title} 
                price={product.price} 
                imageUrl={product.imageUrl} 
              />
            )) : <p className="col-span-full text-center text-gray-500 py-10">No products found.</p>}
          </div>
          <div className="mt-12 flex justify-center">
            <Link href="/products" className="group bg-gray-100 hover:bg-orange-500 hover:text-white text-gray-600 px-8 py-3 rounded-full text-sm uppercase font-bold tracking-widest transition-all duration-300">
              See All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Hot Deal */}
      <section className="container mx-auto px-4 md:px-6 mt-20 text-center">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px bg-gray-300 flex-1 max-w-[100px]"></div>
          <h2 className="text-3xl font-serif italic text-gray-600">Hot Deal</h2>
          <div className="h-px bg-gray-300 flex-1 max-w-[100px]"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-[300px] md:auto-rows-[400px]">
          {/* Reclaimed & Hand Crafted */}
          <Link href="/products" className="relative overflow-hidden group rounded-xl shadow-md">
            <img src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&h=600&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Reclaimed furniture" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end items-center text-white p-8">
              <h3 className="text-2xl md:text-3xl font-serif mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Reclaimed and hand crafted</h3>
              <p className="text-orange-400 text-4xl md:text-5xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">Sale OFF 50%</p>
            </div>
          </Link>
          {/* Elite Collection */}
          <Link href="/products" className="relative overflow-hidden group rounded-xl shadow-md">
            <img src="https://images.unsplash.com/photo-1618220179428-22790b46a0eb?w=800&h=600&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Elite collection" />
            <div className="absolute inset-0 bg-black/10 flex flex-col items-end justify-center pr-8 md:pr-12 text-right">
              <div className="bg-orange-500 text-white rounded-full w-20 h-20 md:w-24 md:h-24 flex flex-col items-center justify-center mb-6 shadow-lg transform group-hover:rotate-12 transition-transform duration-500">
                <span className="text-xl md:text-2xl font-bold">35%</span>
                <span className="text-[10px] md:text-xs uppercase">Sale Off</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-l-lg shadow-sm">Elite Collection</h3>
              <p className="text-gray-600 bg-white/90 backdrop-blur-sm px-6 py-2 mt-2 rounded-l-lg text-sm shadow-sm">Deluxe Plank Furniture</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Store System Banner */}
      <section className="container mx-auto px-4 md:px-6 mt-20">
        <div className="bg-gradient-to-r from-[#fdfaf3] to-white border border-orange-100 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-center md:text-left">
            <h2 className="text-xl md:text-2xl text-gray-700 uppercase tracking-widest mb-2">Now Available in our store system</h2>
            <Link href="/store" className="inline-block text-orange-500 hover:text-orange-600 font-bold text-sm tracking-wide border-b border-orange-500 hover:border-orange-600 pb-1 transition-colors">LEARN MORE</Link>
          </div>
          <div className="text-center md:text-right">
            <h2 className="text-3xl md:text-4xl font-bold text-teal-500 uppercase tracking-widest mb-2">Buy Online</h2>
            <p className="text-lg md:text-xl text-orange-500 font-bold uppercase tracking-widest">Pick Up In Store</p>
          </div>
        </div>
      </section>

      {/* Latest Updates */}
      <section className="container mx-auto px-4 md:px-6 mt-20 mb-20 text-center">
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px bg-gray-300 flex-1 max-w-[100px]"></div>
          <h2 className="text-3xl font-serif italic text-gray-600">Latest Updates</h2>
          <div className="h-px bg-gray-300 flex-1 max-w-[100px]"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="group overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-shadow">
            <img src="https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=400&h=300&fit=crop" alt="update" className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-700" />
          </div>
          <div className="group overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-shadow">
            <img src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=300&fit=crop" alt="update" className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-700" />
          </div>
          <div className="group overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-shadow">
            <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop" alt="update" className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-700" />
          </div>
          <div className="group overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-shadow">
            <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&h=300&fit=crop" alt="update" className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-700" />
          </div>
        </div>
        <p className="mt-8 text-gray-500 max-w-2xl mx-auto text-sm md:text-base italic leading-relaxed">
          Stay up to date with our newest arrivals and exclusive behind-the-scenes looks at our craftsmanship process. Sign up for our newsletter to never miss an update.
        </p>
      </section>
    </div>
  );
}
