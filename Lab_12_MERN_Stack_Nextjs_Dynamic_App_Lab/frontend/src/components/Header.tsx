"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search, ShoppingCart, User } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b sticky top-0 z-50 py-4 px-6 md:px-12 flex items-center justify-between shadow-sm transition-all duration-300">
      <div className="flex items-center gap-2">
        <Link href="/">
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            <span className="text-orange-500">Rustik</span> Plank
          </h1>
        </Link>
      </div>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
        <Link href="/" className="hover:text-orange-500 uppercase transition-colors">Home</Link>
        <Link href="/products" className="hover:text-orange-500 uppercase transition-colors">Shop All</Link>
        <Link href="/about" className="hover:text-orange-500 uppercase transition-colors">About Us</Link>
        <Link href="/contact" className="hover:text-orange-500 uppercase transition-colors">Contact Us</Link>
      </nav>

      {/* Desktop Categories */}
      <div className="hidden lg:flex items-center gap-4 text-sm font-medium text-gray-600">
        <Link href="/beds" className="hover:text-orange-500 uppercase transition-colors">Beds</Link>
        <Link href="/cabinets" className="hover:text-orange-500 uppercase transition-colors">Cabinets</Link>
        <Link href="/chairs" className="hover:text-orange-500 uppercase transition-colors">Chairs</Link>
        <Link href="/tables" className="hover:text-orange-500 uppercase transition-colors">Tables</Link>
      </div>

      {/* Actions */}
      <div className="hidden md:flex items-center gap-5 text-sm">
        <Link href="/account" className="text-gray-600 hover:text-orange-500 transition-colors">
          <User size={20} />
        </Link>
        <Link href="/login" className="font-medium text-gray-600 hover:text-orange-500 transition-colors">Login/Register</Link>
        <button className="text-gray-600 hover:text-orange-500 transition-colors">
          <Search size={20} />
        </button>
        <Link href="/cart" className="text-gray-600 hover:text-orange-500 transition-colors relative">
          <ShoppingCart size={20} />
          <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>
        </Link>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center gap-4">
        <Link href="/cart" className="text-gray-600 hover:text-orange-500 transition-colors relative">
          <ShoppingCart size={24} />
        </Link>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-800 hover:text-orange-500 focus:outline-none">
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-xl border-t md:hidden flex flex-col p-6 gap-4 z-40">
          <Link onClick={() => setIsMobileMenuOpen(false)} href="/" className="font-semibold text-lg text-gray-800 hover:text-orange-500 uppercase">Home</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} href="/products" className="font-semibold text-lg text-gray-800 hover:text-orange-500 uppercase">Shop All</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} href="/about" className="font-semibold text-lg text-gray-800 hover:text-orange-500 uppercase">About Us</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} href="/contact" className="font-semibold text-lg text-gray-800 hover:text-orange-500 uppercase">Contact Us</Link>
          <hr className="my-2" />
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Categories</h3>
          <Link onClick={() => setIsMobileMenuOpen(false)} href="/beds" className="text-gray-600 hover:text-orange-500">Beds</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} href="/cabinets" className="text-gray-600 hover:text-orange-500">Cabinets</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} href="/chairs" className="text-gray-600 hover:text-orange-500">Chairs</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} href="/tables" className="text-gray-600 hover:text-orange-500">Tables</Link>
          <hr className="my-2" />
          <Link onClick={() => setIsMobileMenuOpen(false)} href="/account" className="text-gray-600 hover:text-orange-500 flex items-center gap-2"><User size={18} /> My Account</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} href="/login" className="text-gray-600 hover:text-orange-500">Login/Register</Link>
        </div>
      )}
    </header>
  );
}
