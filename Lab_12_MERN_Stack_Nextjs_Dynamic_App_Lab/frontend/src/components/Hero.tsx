export default function Hero() {
  return (
    <section className="relative w-full h-[600px] bg-gray-100 flex items-center justify-center overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Subtle curved background pattern */}
        <div className="absolute bottom-0 left-0 w-full h-[30%] bg-orange-500 rounded-tr-[100%] opacity-10"></div>
        <div className="absolute top-10 right-10 text-gray-300 opacity-50">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <path d="M10 50 L50 10 L90 50 L50 90 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between">
        <div className="max-w-xl text-center md:text-left mb-10 md:mb-0">
          <p className="text-gray-500 mb-4 font-serif italic text-lg">
            This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit.
          </p>
          <div className="flex items-center gap-6 mt-8 justify-center md:justify-start">
            <span className="text-4xl font-bold text-orange-500">£129<span className="text-xl text-gray-400">.99</span></span>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-bold uppercase tracking-wider transition-colors shadow-lg">
              Add To Cart
            </button>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80" alt="Wooden Abstract Chair" className="max-w-full h-auto drop-shadow-2xl rounded-xl object-cover w-[500px] h-[400px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
