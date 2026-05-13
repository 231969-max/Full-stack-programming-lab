import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 mt-20 border-t pt-16 pb-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* INFORMATIONS */}
        <div>
          <h3 className="text-orange-500 font-bold mb-6 uppercase tracking-wider text-sm">Informations</h3>
          <ul className="space-y-3 text-gray-600 text-sm">
            <li><Link href="/terms" className="hover:text-orange-500">Terms and conditions</Link></li>
            <li><Link href="/about" className="hover:text-orange-500">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-orange-500">Contact</Link></li>
            <li><Link href="/privacy" className="hover:text-orange-500">Privacy policy</Link></li>
            <li><Link href="/suppliers" className="hover:text-orange-500">Suppliers</Link></li>
          </ul>
        </div>
        
        {/* MY ACCOUNT */}
        <div>
          <h3 className="text-orange-500 font-bold mb-6 uppercase tracking-wider text-sm">My Account</h3>
          <ul className="space-y-3 text-gray-600 text-sm">
            <li><Link href="/account" className="hover:text-orange-500">Your Account</Link></li>
            <li><Link href="/info" className="hover:text-orange-500">Personal Information</Link></li>
            <li><Link href="/addresses" className="hover:text-orange-500">Addresses</Link></li>
            <li><Link href="/orders" className="hover:text-orange-500">Order History</Link></li>
            <li><Link href="/search" className="hover:text-orange-500">Search Terms</Link></li>
          </ul>
        </div>

        {/* HELP AND MORE */}
        <div>
          <h3 className="text-orange-500 font-bold mb-6 uppercase tracking-wider text-sm">Help and More</h3>
          <ul className="space-y-3 text-gray-600 text-sm">
            <li><Link href="/products" className="hover:text-orange-500">New products</Link></li>
            <li><Link href="/sellers" className="hover:text-orange-500">Top sellers</Link></li>
            <li><Link href="/specials" className="hover:text-orange-500">Specials</Link></li>
            <li><Link href="/support" className="hover:text-orange-500">Customer Support</Link></li>
            <li><Link href="/faq" className="hover:text-orange-500">FAQ</Link></li>
          </ul>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="text-orange-500 font-bold mb-6 uppercase tracking-wider text-sm">Links</h3>
          <ul className="space-y-3 text-gray-600 text-sm">
            <li><Link href="/manufacturers" className="hover:text-orange-500">Manufacturers</Link></li>
            <li><Link href="/mobile" className="hover:text-orange-500">Mobile</Link></li>
            <li><Link href="/gift" className="hover:text-orange-500">Gift Cards</Link></li>
            <li><Link href="/service" className="hover:text-orange-500">Service</Link></li>
          </ul>
        </div>
      </div>
      
      {/* Logos Section */}
      <div className="container mx-auto px-6 mt-16 flex flex-wrap justify-center items-center gap-8 border-t border-b py-8">
        <span className="text-gray-400 text-2xl font-bold">f4b</span>
        <span className="text-gray-400 text-2xl font-bold">QANTAS</span>
        <span className="text-gray-400 text-2xl font-bold">GE Money</span>
        <span className="text-gray-400 text-2xl font-bold">Rockwell Collins</span>
        <span className="text-gray-400 text-2xl font-bold">LexisNexis</span>
      </div>

      <div className="container mx-auto px-6 mt-8 text-center text-gray-400 text-xs">
        <p>© 2026 Rustik Plank Furniture. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
