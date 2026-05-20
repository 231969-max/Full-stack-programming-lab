import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-[#fdfaf3] py-20 border-b border-orange-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-800 mb-6 tracking-tight">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Have a question about our products, need help with an order, or just want to say hello? 
            We'd love to hear from you.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 mt-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Contact Information */}
          <div className="w-full lg:w-1/3 flex flex-col gap-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Get In Touch</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our dedicated support team is available Monday through Friday, 9am to 6pm EST to assist you with any inquiries.
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-orange-50 p-3 rounded-full text-orange-500 shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg mb-1">Our Location</h3>
                  <p className="text-gray-600">123 Furniture Row, Design District<br/>New York, NY 10012</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-orange-50 p-3 rounded-full text-orange-500 shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg mb-1">Phone Number</h3>
                  <p className="text-gray-600">+1 (555) 123-4567<br/>+1 (555) 987-6543</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-orange-50 p-3 rounded-full text-orange-500 shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg mb-1">Email Address</h3>
                  <p className="text-gray-600">support@rustikplank.com<br/>info@rustikplank.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">Send Us A Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input type="text" id="first-name" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors" placeholder="John" />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input type="text" id="last-name" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors" placeholder="Doe" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input type="email" id="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number (Optional)</label>
                    <input type="tel" id="phone" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors" placeholder="+1 (555) 000-0000" />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input type="text" id="subject" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors" placeholder="How can we help you?" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea id="message" rows={5} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors resize-none" placeholder="Your message here..."></textarea>
                </div>
                
                <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg flex items-center justify-center gap-2 w-full md:w-auto transition-colors shadow-md hover:shadow-lg text-sm tracking-wider uppercase">
                  <Send size={18} /> Send Message
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
