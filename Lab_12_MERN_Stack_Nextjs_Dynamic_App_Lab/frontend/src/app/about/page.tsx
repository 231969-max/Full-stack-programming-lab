import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full bg-gray-900 flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&h=600&fit=crop" 
          alt="Workshop" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 tracking-tight">Our Story</h1>
          <p className="text-gray-200 max-w-2xl mx-auto text-lg leading-relaxed">
            Crafting beautiful, sustainable furniture for modern homes since 2010.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 mt-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-24">
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&h=1000&fit=crop" 
                alt="Craftsman at work" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-orange-500 w-32 h-32 rounded-full hidden md:block -z-10"></div>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-2">The Beginning</h2>
            <h3 className="text-3xl md:text-4xl font-serif text-gray-800 mb-6">Born from a passion for wood and design.</h3>
            <p className="text-gray-600 mb-6 leading-relaxed text-lg">
              Rustik Plank started in a small garage in Portland, Oregon. What began as a hobby of restoring old vintage furniture quickly blossomed into a full-scale operation dedicated to designing and building premium wooden pieces.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed text-lg">
              We believe that furniture should not only serve a functional purpose but also tell a story and add warmth to your living spaces. Every piece we create is a testament to our dedication to quality and sustainability.
            </p>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <h4 className="text-3xl font-bold text-gray-800">10+</h4>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Years Exp.</p>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div className="text-center">
                <h4 className="text-3xl font-bold text-gray-800">5k+</h4>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Happy Clients</p>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div className="text-center">
                <h4 className="text-3xl font-bold text-gray-800">100%</h4>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Sustainable</p>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="bg-gray-50 rounded-3xl p-10 md:p-16 mb-24 text-center">
          <h2 className="text-3xl font-serif text-gray-800 mb-16">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">🌱</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Sustainability</h3>
              <p className="text-gray-600 leading-relaxed">We source all our wood from responsibly managed forests and use eco-friendly finishes to minimize our footprint.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">🔨</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Craftsmanship</h3>
              <p className="text-gray-600 leading-relaxed">Our artisans pay attention to every detail, ensuring each joint is perfect and every surface is flawless.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">🤝</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Community</h3>
              <p className="text-gray-600 leading-relaxed">We support local businesses and regularly give back to community housing projects across the country.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
