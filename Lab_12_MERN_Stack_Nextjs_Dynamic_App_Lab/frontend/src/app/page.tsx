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
    console.error("Failed to fetch products. Is the backend running?", error);
    // Provide some fallback dummy data just in case backend is not running
    products = [
      { _id: "1", title: "Fallback Wooden Chair", price: 124.99, imageUrl: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&h=500&fit=crop", category: "chairs", type: "featured" },
      { _id: "2", title: "Fallback Modern Bed", price: 124.99, imageUrl: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=500&h=500&fit=crop", category: "beds", type: "featured" },
      { _id: "3", title: "Fallback Glass Table", price: 124.99, imageUrl: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=500&h=500&fit=crop", category: "tables", type: "featured" },
    ];
  }

  const featured = products.filter(p => p.type === 'featured');

  return (
    <div>
      <Hero />
      
      {/* Collections Row */}
      <section className="container mx-auto px-6 mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-orange-50 p-10 flex flex-col items-center justify-center text-center relative group overflow-hidden">
          <h2 className="text-xl font-bold uppercase tracking-widest text-gray-800 z-10"><span className="text-orange-500">CHAIRS</span> COLLECTION</h2>
          <img src="https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=300&h=300&fit=crop" className="absolute opacity-20 group-hover:scale-110 transition-transform duration-700" alt="chairs" />
        </div>
        <div className="bg-orange-50 p-10 flex flex-col items-center justify-center text-center relative group overflow-hidden">
          <h2 className="text-xl font-bold uppercase tracking-widest text-gray-800 z-10"><span className="text-orange-500">BEDS</span> COLLECTION</h2>
          <img src="https://images.unsplash.com/photo-1505693314120-0d443867891c?w=300&h=300&fit=crop" className="absolute opacity-20 group-hover:scale-110 transition-transform duration-700" alt="beds" />
        </div>
        <div className="bg-orange-50 p-10 flex flex-col items-center justify-center text-center relative group overflow-hidden">
          <h2 className="text-xl font-bold uppercase tracking-widest text-gray-800 z-10"><span className="text-orange-500">TABLES</span> COLLECTION</h2>
          <img src="https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=300&h=300&fit=crop" className="absolute opacity-20 group-hover:scale-110 transition-transform duration-700" alt="tables" />
        </div>
      </section>

      {/* Product Tabs */}
      <section className="container mx-auto px-6 mt-16">
        <div className="bg-gray-100 rounded-t-lg flex">
          <button className="flex-1 py-4 text-center font-bold text-orange-500 bg-white border-t-2 border-orange-500 uppercase">Featured</button>
          <button className="flex-1 py-4 text-center font-bold text-gray-500 hover:text-gray-800 uppercase">Special</button>
          <button className="flex-1 py-4 text-center font-bold text-gray-500 hover:text-gray-800 uppercase">Popular</button>
        </div>
        
        <div className="border border-t-0 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.length > 0 ? featured.map(product => (
              <ProductCard 
                key={product._id} 
                title={product.title} 
                price={product.price} 
                imageUrl={product.imageUrl} 
              />
            )) : <p>No products found.</p>}
          </div>
          <div className="mt-8 flex justify-center">
            <Link href="/products" className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-6 py-2 rounded text-sm uppercase font-bold tracking-widest">
              See All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Hot Deal */}
      <section className="container mx-auto px-6 mt-16 text-center">
        <h2 className="text-2xl font-serif italic text-gray-500 mb-8">Hot Deal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[400px]">
          {/* Reclaimed & Hand Crafted */}
          <div className="relative overflow-hidden group rounded">
            <img src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&h=600&fit=crop" className="w-full h-full object-cover transition-transform group-hover:scale-105" alt="Reclaimed furniture" />
            <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-white">
              <h3 className="text-3xl font-serif mb-2">Reclaimed and hand crafted</h3>
              <p className="text-orange-400 text-5xl font-bold">Sale OFF 50%</p>
            </div>
          </div>
          {/* Elite Collection */}
          <div className="relative overflow-hidden group rounded">
            <img src="https://images.unsplash.com/photo-1618220179428-22790b46a0eb?w=800&h=600&fit=crop" className="w-full h-full object-cover transition-transform group-hover:scale-105" alt="Elite collection" />
            <div className="absolute inset-0 bg-black/10 flex flex-col items-end justify-center pr-10 text-right">
              <div className="bg-orange-500 text-white rounded-full w-24 h-24 flex flex-col items-center justify-center mb-4">
                <span className="text-2xl font-bold">35%</span>
                <span className="text-xs uppercase">Sale Off</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 bg-white/80 px-4 py-2">Elite Collection</h3>
              <p className="text-gray-600 bg-white/80 px-4 py-1 mt-1">Deluxe Plank Furniture</p>
            </div>
          </div>
        </div>
      </section>

      {/* Store System Banner */}
      <section className="container mx-auto px-6 mt-16">
        <div className="bg-[#fdfaf3] border border-orange-100 p-8 flex flex-col md:flex-row items-center justify-between">
          <div>
            <h2 className="text-xl text-gray-600 uppercase tracking-widest">Now Available in our store system</h2>
            <Link href="/store" className="text-orange-500 underline text-sm">LEARN MORE</Link>
          </div>
          <div className="text-right">
            <h2 className="text-4xl font-bold text-teal-400 uppercase tracking-widest">Buy Online</h2>
            <p className="text-xl text-orange-500 font-bold uppercase tracking-widest">Pick Up In Store</p>
          </div>
        </div>
      </section>

      {/* Latest Updates */}
      <section className="container mx-auto px-6 mt-16 text-center mb-10">
        <h2 className="text-2xl font-serif italic text-gray-500 mb-8">Latest Updates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <img src="https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=400&h=300&fit=crop" alt="update" className="w-full h-48 object-cover rounded" />
          <img src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=300&fit=crop" alt="update" className="w-full h-48 object-cover rounded" />
          <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop" alt="update" className="w-full h-48 object-cover rounded" />
          <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&h=300&fit=crop" alt="update" className="w-full h-48 object-cover rounded" />
        </div>
        <p className="mt-6 text-gray-500 max-w-2xl mx-auto text-sm italic">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </section>
    </div>
  );
}
