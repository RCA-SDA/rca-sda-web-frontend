'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home,
  Users, 
  Calendar, 
  FileText, 
  Music, 
  BookOpen, 
  Image, 
  Heart, 
  Library,
  UserCircle,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  // Hide sidebar on login and forgot-password pages
  if (!isMounted || pathname === '/login' || pathname === '/forgot-password') {
    return null;
  }

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/father-portal', label: 'Father Portal', icon: UserCircle },
    { href: '/members', label: 'Members', icon: Users },
    { href: '/sabbath-report', label: 'Sabbath Report', icon: Calendar },
    { href: '/committee', label: 'Committee', icon: FileText },
    { href: '/choir', label: 'Choir', icon: Music },
    { href: '/blog', label: 'Blog', icon: BookOpen },
    { href: '/gallery', label: 'Gallery', icon: Image },
    { href: '/testimonies', label: 'Testimonies', icon: Heart },
    { href: '/resources', label: 'Resources', icon: Library },
  ];

  const bottomLinks = [
    { href: '/settings', label: 'Settings', icon: Settings },
    { href: '/login', label: 'Logout', icon: LogOut },
  ];

  return (
    <>
      <aside 
        className={`fixed left-0 top-20 h-[calc(100vh-5rem)] bg-white border-r-4 border-black transition-all duration-300 z-40 overflow-hidden ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-4 top-4 w-8 h-8 bg-yellow-400 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center justify-center z-50"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>

        {/* Navigation Links */}
        <nav className="flex flex-col h-full py-4">
          <div className="flex-1 overflow-y-auto px-2 space-y-1">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-3 font-black uppercase text-sm transition-all ${
                  isActive(href)
                    ? 'bg-yellow-400 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-1'
                    : 'hover:bg-gray-100 border-2 border-transparent'
                } ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? label : ''}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span className="truncate">{label}</span>}
              </Link>
            ))}
          </div>

          {/* Bottom Links */}
          <div className="border-t-4 border-black pt-2 px-2 space-y-1">
            {bottomLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-3 font-black uppercase text-sm transition-all hover:bg-gray-100 border-2 border-transparent ${
                  isCollapsed ? 'justify-center' : ''
                }`}
                title={isCollapsed ? label : ''}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span className="truncate">{label}</span>}
              </Link>
            ))}
          </div>
        </nav>
      </aside>
      
      {/* Spacer to push content */}
      <div className={`transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`} />
    </>
  );
}
