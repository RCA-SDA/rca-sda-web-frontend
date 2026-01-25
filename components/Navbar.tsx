'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Users, Calendar, FileText, Music, BookOpen, Image, Heart } from 'lucide-react';

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
            <Link href="/members" className="flex items-center gap-2 font-black uppercase text-sm hover:text-yellow-500 transition-colors">
              <Users className="w-4 h-4" />
              Members
            </Link>
            <Link href="/sabbath-report" className="flex items-center gap-2 font-black uppercase text-sm hover:text-yellow-500 transition-colors">
              <Calendar className="w-4 h-4" />
              Sabbath
            </Link>
            <Link href="/committee" className="flex items-center gap-2 font-black uppercase text-sm hover:text-yellow-500 transition-colors">
              <FileText className="w-4 h-4" />
              Committee
            </Link>
            <Link href="/choir" className="flex items-center gap-2 font-black uppercase text-sm hover:text-yellow-500 transition-colors">
              <Music className="w-4 h-4" />
              Choir
            </Link>
            <Link href="/blog" className="flex items-center gap-2 font-black uppercase text-sm hover:text-yellow-500 transition-colors">
              <BookOpen className="w-4 h-4" />
              Blog
            </Link>
            <Link href="/gallery" className="flex items-center gap-2 font-black uppercase text-sm hover:text-yellow-500 transition-colors">
              <Image className="w-4 h-4" />
              Gallery
            </Link>
            <Link href="/testimonies" className="flex items-center gap-2 font-black uppercase text-sm hover:text-yellow-500 transition-colors">
              <Heart className="w-4 h-4" />
              Testimonies
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="font-black text-2xl"
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t-4 border-black bg-yellow-300">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/members" className="flex items-center gap-2 px-3 py-2 font-black uppercase text-sm hover:bg-black hover:text-yellow-300 transition-colors">
              <Users className="w-5 h-5" />
              Members
            </Link>
            <Link href="/sabbath-report" className="flex items-center gap-2 px-3 py-2 font-black uppercase text-sm hover:bg-black hover:text-yellow-300 transition-colors">
              <Calendar className="w-5 h-5" />
              Sabbath Report
            </Link>
            <Link href="/committee" className="flex items-center gap-2 px-3 py-2 font-black uppercase text-sm hover:bg-black hover:text-yellow-300 transition-colors">
              <FileText className="w-5 h-5" />
              Committee
            </Link>
            <Link href="/choir" className="flex items-center gap-2 px-3 py-2 font-black uppercase text-sm hover:bg-black hover:text-yellow-300 transition-colors">
              <Music className="w-5 h-5" />
              Choir
            </Link>
            <Link href="/blog" className="flex items-center gap-2 px-3 py-2 font-black uppercase text-sm hover:bg-black hover:text-yellow-300 transition-colors">
              <BookOpen className="w-5 h-5" />
              Blog
            </Link>
            <Link href="/gallery" className="flex items-center gap-2 px-3 py-2 font-black uppercase text-sm hover:bg-black hover:text-yellow-300 transition-colors">
              <Image className="w-5 h-5" />
              Gallery
            </Link>
            <Link href="/testimonies" className="flex items-center gap-2 px-3 py-2 font-black uppercase text-sm hover:bg-black hover:text-yellow-300 transition-colors">
              <Heart className="w-5 h-5" />
              Testimonies
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
