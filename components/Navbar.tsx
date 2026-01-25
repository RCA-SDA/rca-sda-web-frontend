'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b-8 border-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-black uppercase tracking-tight transform hover:scale-105 transition-transform">
              RCA-SDA
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/members" className="font-black uppercase text-sm hover:text-yellow-500 transition-colors">
              Members
            </Link>
            <Link href="/sabbath-report" className="font-black uppercase text-sm hover:text-yellow-500 transition-colors">
              Sabbath Report
            </Link>
            <Link href="/committee" className="font-black uppercase text-sm hover:text-yellow-500 transition-colors">
              Committee
            </Link>
            <Link href="/choir" className="font-black uppercase text-sm hover:text-yellow-500 transition-colors">
              Choir
            </Link>
            <Link href="/blog" className="font-black uppercase text-sm hover:text-yellow-500 transition-colors">
              Blog
            </Link>
            <Link href="/gallery" className="font-black uppercase text-sm hover:text-yellow-500 transition-colors">
              Gallery
            </Link>
            <Link href="/testimonies" className="font-black uppercase text-sm hover:text-yellow-500 transition-colors">
              Testimonies
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="font-black text-2xl"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t-4 border-black bg-yellow-300">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/members" className="block px-3 py-2 font-black uppercase text-sm hover:bg-black hover:text-yellow-300 transition-colors">
              Members
            </Link>
            <Link href="/sabbath-report" className="block px-3 py-2 font-black uppercase text-sm hover:bg-black hover:text-yellow-300 transition-colors">
              Sabbath Report
            </Link>
            <Link href="/committee" className="block px-3 py-2 font-black uppercase text-sm hover:bg-black hover:text-yellow-300 transition-colors">
              Committee
            </Link>
            <Link href="/choir" className="block px-3 py-2 font-black uppercase text-sm hover:bg-black hover:text-yellow-300 transition-colors">
              Choir
            </Link>
            <Link href="/blog" className="block px-3 py-2 font-black uppercase text-sm hover:bg-black hover:text-yellow-300 transition-colors">
              Blog
            </Link>
            <Link href="/gallery" className="block px-3 py-2 font-black uppercase text-sm hover:bg-black hover:text-yellow-300 transition-colors">
              Gallery
            </Link>
            <Link href="/testimonies" className="block px-3 py-2 font-black uppercase text-sm hover:bg-black hover:text-yellow-300 transition-colors">
              Testimonies
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
