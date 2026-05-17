import ProductCard from "@/components/ProductCard";

interface Product {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
  category: string;
  type: string;
}

export const dynamic = 'force-dynamic';

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const category = resolvedParams.category;
  
  let products: Product[] = [];
  
  try {
    const res = await fetch(`http://localhost:5000/api/products?category=${category}`, { cache: 'no-store' });
    if (res.ok) {
      products = await res.json();
    }
  } catch (error) {
    // Silently fallback if backend is not running
  }

  // Fallback for specific categories if backend fails or empty
  if (!products || products.length === 0) {
    const allFallbackProducts = [
      { _id: "1", title: "Fallback Wooden Chair", price: 124.99, imageUrl: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&h=500&fit=crop", category: "chairs", type: "featured" },
      { _id: "2", title: "Fallback Modern Bed", price: 299.99, imageUrl: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=500&h=500&fit=crop", category: "beds", type: "featured" },
      { _id: "3", title: "Fallback Glass Table", price: 199.99, imageUrl: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=500&h=500&fit=crop", category: "tables", type: "featured" },
    ];
    products = allFallbackProducts.filter(p => p.category === category);
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-[#fdfaf3] py-16 border-b border-orange-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4 capitalize">{category}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Browse our selection of premium {category} designed to bring comfort and style to your home.</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 mt-12">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {products.map(product => (
              <ProductCard 
                key={product._id} 
                id={product._id}
                title={product.title} 
                price={product.price} 
                imageUrl={product.imageUrl} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl text-gray-500 font-medium">No products found in this category.</h3>
          </div>
        )}
      </div>
    </div>
  );
}
