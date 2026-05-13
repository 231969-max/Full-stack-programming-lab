import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full bg-white border-b py-4 px-6 md:px-12 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold text-gray-800">
          <span className="text-orange-500">Rustik</span> Plank
        </h1>
      </div>
      
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
        <Link href="/" className="hover:text-orange-500 uppercase">Home</Link>
        <Link href="/blog" className="hover:text-orange-500 uppercase">Blog</Link>
        <Link href="/about" className="hover:text-orange-500 uppercase">About Us</Link>
        <Link href="/contact" className="hover:text-orange-500 uppercase">Contact Us</Link>
      </nav>

      <div className="hidden lg:flex items-center gap-4 text-sm font-medium text-gray-600">
        <Link href="/beds" className="hover:text-orange-500 uppercase">Beds</Link>
        <Link href="/cabinets" className="hover:text-orange-500 uppercase">Cabinets</Link>
        <Link href="/bookcases" className="hover:text-orange-500 uppercase">Bookcases</Link>
        <Link href="/boxes" className="hover:text-orange-500 uppercase">Boxes</Link>
        <Link href="/chairs" className="hover:text-orange-500 uppercase">Chairs</Link>
        <Link href="/tables" className="hover:text-orange-500 uppercase">Tables</Link>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <Link href="/account" className="font-medium text-gray-600 hover:text-orange-500">My Account</Link>
        <Link href="/login" className="font-medium text-gray-600 hover:text-orange-500">Login/Register</Link>
        <button className="text-gray-600 hover:text-orange-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </button>
      </div>
    </header>
  );
}
