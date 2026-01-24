'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-zinc-900 dark:text-white">
              RCA-SDA
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/members" className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white">
              Members
            </Link>
            <Link href="/sabbath-report" className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white">
              Sabbath Report
            </Link>
            <Link href="/committee" className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white">
              Committee
            </Link>
            <Link href="/choir" className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white">
              Choir
            </Link>
            <Link href="/blog" className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white">
              Blog
            </Link>
            <Link href="/gallery" className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white">
              Gallery
            </Link>
            <Link href="/testimonies" className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white">
              Testimonies
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-zinc-700 dark:text-zinc-300"
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
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/members" className="block px-3 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded">
              Members
            </Link>
            <Link href="/sabbath-report" className="block px-3 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded">
              Sabbath Report
            </Link>
            <Link href="/committee" className="block px-3 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded">
              Committee
            </Link>
            <Link href="/choir" className="block px-3 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded">
              Choir
            </Link>
            <Link href="/blog" className="block px-3 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded">
              Blog
            </Link>
            <Link href="/gallery" className="block px-3 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded">
              Gallery
            </Link>
            <Link href="/testimonies" className="block px-3 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded">
              Testimonies
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
