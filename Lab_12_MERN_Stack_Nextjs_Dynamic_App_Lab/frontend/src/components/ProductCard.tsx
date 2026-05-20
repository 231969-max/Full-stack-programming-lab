import Link from "next/link";

export default function ProductCard({ id, title, price, imageUrl }: { id?: string, title: string, price: number, imageUrl: string }) {
  const detailLink = id ? `/product/${id}` : "/products";

  return (
    <div className="bg-white border rounded-xl p-5 flex flex-col items-center group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link href={detailLink} className="w-full">
        <div className="w-full h-48 sm:h-56 mb-4 overflow-hidden rounded-lg relative">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </Link>
      <Link href={detailLink} className="w-full flex flex-col items-center flex-1">
        <p className="text-sm font-medium text-gray-600 text-center mb-2 h-10 overflow-hidden text-ellipsis line-clamp-2 hover:text-orange-500 transition-colors">
          {title}
        </p>
        <p className="font-bold text-gray-800 text-lg mb-4 mt-auto">£{price.toFixed(2)}</p>
      </Link>
      <Link href={detailLink} className="w-full text-center border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors duration-300 px-6 py-2 rounded-lg uppercase text-sm font-bold tracking-wider">
        Detail
      </Link>
    </div>
  );
}
