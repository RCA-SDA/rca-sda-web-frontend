'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, Users, Calendar, FileText, Music, BookOpen, Image, Heart } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const navLinks = [
    { href: '/members', label: 'Members', icon: Users },
    { href: '/sabbath-report', label: 'Sabbath', icon: Calendar },
    { href: '/committee', label: 'Committee', icon: FileText },
    { href: '/choir', label: 'Choir', icon: Music },
    { href: '/blog', label: 'Blog', icon: BookOpen },
    { href: '/gallery', label: 'Gallery', icon: Image },
    { href: '/testimonies', label: 'Testimonies', icon: Heart },
  ];

  return (
    <nav 
      className={`border-b-8 border-black sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-[0px_8px_0px_0px_rgba(0,0,0,1)]' 
          : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link 
              href="/" 
              className={`text-2xl font-black uppercase tracking-tight transform hover:scale-105 transition-transform ${
                isActive('/') ? 'text-yellow-500' : ''
              }`}
            >
              RCA-SDA
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 font-black uppercase text-sm transition-all ${
                  isActive(href)
                    ? 'text-black bg-yellow-400 px-3 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-2'
                    : 'hover:text-yellow-500'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
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
        <div 
          className={`md:hidden border-t-4 border-black transition-all duration-300 ${
            isScrolled 
              ? 'bg-yellow-300/90 backdrop-blur-md' 
              : 'bg-yellow-300'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-3 py-2 font-black uppercase text-sm transition-colors ${
                  isActive(href)
                    ? 'bg-black text-yellow-300 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                    : 'hover:bg-black hover:text-yellow-300'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
