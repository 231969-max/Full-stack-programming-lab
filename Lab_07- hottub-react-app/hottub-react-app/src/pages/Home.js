import React, { useEffect } from 'react';
import Breadcrumbs from '../components/common/Breadcrumbs';

const Home = () => {
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

  return (
    <div className="bg-white flex-grow mb-10 pb-16">
      <Breadcrumbs paths={[{ name: 'About Us', url: '/' }]} />

      <div className="container xl:w-[1100px] mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">About Us</h2>

        {/* Welcome to the Company Section */}
        <div className="bg-[#f2f2f2] p-6 mb-10 fade-in">
          <h3 className="font-bold text-gray-800 mb-4 pb-2 border-b border-gray-300">Welcome to the Company</h3>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-2/3 text-xs text-gray-600 leading-relaxed space-y-4">
              <p>
                This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit. Sed ut imperdiet nisi. Proin condimentum fermentum nunc. Etiam pharetra, erat sed fermentum feugiat, velit mauris egestas quam, ut aliquam massa nisl quis neque. Suspendisse in orci enim.
              </p>
              <p>
                This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit. Sed ut imperdiet nisi. Proin condimentum fermentum nunc. Etiam pharetra, erat sed fermentum feugiat, velit mauris egestas quam, ut aliquam massa nisl quis neque. Suspendisse in orci enim.
              </p>
            </div>
            <div className="md:w-1/3">
              <img src="/assets/extracted_assets/showroom.jpg" alt="Company Showcase" className="w-full h-auto border border-gray-300 shadow-sm rounded-sm" />
            </div>
          </div>
        </div>

        {/* Our Company members Section */}
        <div className="mb-12 fade-in">
          <h3 className="font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">Our Company members</h3>
          <p className="text-xs text-gray-600 mb-6 leading-relaxed">
            This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((member) => (
              <div key={member} className="flex flex-col items-center bg-white p-3 border border-gray-100 hover-lift text-center shadow-sm">
                <div className="w-full bg-[#e6e6e6] mb-3 aspect-square flex items-center justify-center overflow-hidden">
                  <img src="/assets/extracted_assets/team1.jpg" alt="Team Member" className="w-full h-full object-cover" />
                </div>
                <h4 className="font-bold text-gray-800 text-sm">Jennifer lawrence</h4>
                <p className="text-xs text-gray-500 mb-2 italic">Business Consultant</p>
                <p className="text-[10px] text-gray-400 leading-tight">This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor.</p>
              </div>
            ))}
          </div>
        </div>

        {/* BRANDS LOGOS */}
        <div className="border border-gray-200 p-6 flex flex-wrap justify-between items-center bg-white fade-in mt-8 shadow-sm">
          <div className="flex items-center">
            <div className="bg-cyan-400 text-white font-black text-xl px-2 py-1 transform -skew-x-12 mr-2">SAVE</div>
            <div className="bg-cyan-400 text-white font-black text-2xl px-2 py-1 transform -skew-x-12">$1,000'S</div>
          </div>
          <img src="/assets/extracted_assets/oceanic.jpg" alt="OceanicSpa" className="h-10 opacity-70 hover:opacity-100 transition" />
          <img src="/assets/extracted_assets/caldera.jpg" alt="CalderaSpas" className="h-10 opacity-70 hover:opacity-100 transition" />
          <img src="/assets/extracted_assets/island.jpg" alt="IslandSpas" className="h-10 opacity-70 hover:opacity-100 transition" />
        </div>
      </div>
    </div>
  );
};

export default Home;
