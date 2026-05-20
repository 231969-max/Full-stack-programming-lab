import Link from "next/link";
import { ShoppingCart, Star, Heart, Share2, ShieldCheck, Truck, RotateCcw } from "lucide-react";

interface Product {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
  category: string;
  type: string;
  description?: string;
}

export const dynamic = 'force-dynamic';

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  let product: Product | null = null;
  
  try {
    const res = await fetch(`http://localhost:5000/api/products/${id}`, { cache: 'no-store' });
    if (res.ok) {
      product = await res.json();
    }
  } catch (error) {
    // Silently fallback if backend is not running
  }

  // Fallback if backend fails or empty
  if (!product) {
    // Just mock one based on the ID for visual demonstration
    product = { 
      _id: id, 
      title: "Premium Handcrafted Furniture Piece", 
      price: 249.99, 
      imageUrl: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&h=800&fit=crop", 
      category: "chairs", 
      type: "featured",
      description: "Experience the perfect blend of comfort and style with our premium handcrafted furniture piece. Meticulously designed with high-quality materials to ensure durability and a timeless aesthetic that complements any modern living space."
    };
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Breadcrumbs */}
      <div className="bg-gray-50 border-b py-4">
        <div className="container mx-auto px-4 md:px-6">
          <nav className="flex text-sm text-gray-500">
            <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href={`/${product.category}`} className="hover:text-orange-500 capitalize transition-colors">{product.category}</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800 font-medium truncate">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 mt-10">
        <div className="flex flex-col md:flex-row gap-10 lg:gap-16">
          
          {/* Product Image Gallery */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div className="bg-gray-100 rounded-2xl overflow-hidden relative aspect-square group">
              <img 
                src={product.imageUrl} 
                alt={product.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 cursor-crosshair"
              />
              <button className="absolute top-4 right-4 bg-white/80 p-2 rounded-full text-gray-500 hover:text-red-500 hover:bg-white transition-all shadow-sm">
                <Heart size={20} />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className={`bg-gray-100 rounded-lg overflow-hidden aspect-square cursor-pointer border-2 transition-colors ${i === 0 ? 'border-orange-500' : 'border-transparent hover:border-gray-300'}`}>
                  <img src={product.imageUrl} alt={`${product.title} view ${i+1}`} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2 flex flex-col">
            <div className="mb-2 flex items-center gap-2 text-sm text-orange-500 font-bold uppercase tracking-wider">
              <span>{product.type}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{product.title}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-yellow-400">
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} className="text-gray-300" fill="currentColor" />
              </div>
              <span className="text-sm text-gray-500 underline cursor-pointer hover:text-orange-500">(24 Reviews)</span>
            </div>
            
            <div className="text-4xl font-bold text-gray-800 mb-6">
              £{product.price.toFixed(2)}
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed">
              {product.description || "Beautifully crafted from premium materials, this piece brings both functionality and aesthetic appeal to your home. Designed to withstand the test of time while offering exceptional comfort."}
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden h-14 w-32 shrink-0">
                <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors">-</button>
                <input type="number" defaultValue="1" className="w-full text-center font-semibold text-gray-800 focus:outline-none" readOnly />
                <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors">+</button>
              </div>
              
              <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold uppercase tracking-wider rounded-lg h-14 flex items-center justify-center gap-2 transition-colors shadow-md hover:shadow-lg">
                <ShoppingCart size={20} /> Add to Cart
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-t border-b border-gray-200 mb-8">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <ShieldCheck className="text-teal-500" size={24} />
                <span>2 Year Warranty</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Truck className="text-teal-500" size={24} />
                <span>Free Delivery</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <RotateCcw className="text-teal-500" size={24} />
                <span>30 Days Return</span>
              </div>
            </div>

            {/* Meta */}
            <div className="flex flex-col gap-3 text-sm text-gray-600">
              <p><span className="font-semibold text-gray-800">SKU:</span> PRD-{product._id.substring(0, 6).toUpperCase()}</p>
              <p><span className="font-semibold text-gray-800">Category:</span> <Link href={`/${product.category}`} className="text-orange-500 hover:underline capitalize">{product.category}</Link></p>
              <div className="flex items-center gap-3 mt-2">
                <span className="font-semibold text-gray-800">Share:</span>
                <button className="text-gray-400 hover:text-orange-500 transition-colors"><Share2 size={18} /></button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
