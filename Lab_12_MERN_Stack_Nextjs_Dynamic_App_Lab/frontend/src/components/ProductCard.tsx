export default function ProductCard({ title, price, imageUrl }: { title: string, price: number, imageUrl: string }) {
  return (
    <div className="bg-white border rounded p-4 flex flex-col items-center group transition-shadow hover:shadow-md">
      <div className="w-full h-48 mb-4 overflow-hidden rounded relative">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <p className="text-sm text-gray-500 text-center mb-2 h-10 overflow-hidden text-ellipsis line-clamp-2">
        {title}
      </p>
      <p className="font-bold text-gray-800 mb-4">£{price.toFixed(2)}</p>
      <button className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors px-6 py-2 uppercase text-sm font-medium">
        Detail
      </button>
    </div>
  );
}
