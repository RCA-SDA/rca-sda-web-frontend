'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home,
  Users, 
  Calendar, 
  CheckSquare, 
  BookOpen, 
  Heart,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  User,
  LogOut
} from 'lucide-react';

export default function FatherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const handleLogout = () => {
    // Add logout logic here (clear session, tokens, etc.)
    console.log('Logging out...');
    window.location.href = '/login';
  };

  const navLinks = [
    { href: '/users/father', label: 'Dashboard', icon: Home },
    { href: '/users/father/family', label: 'My Family', icon: Users },
    { href: '/saers/father/sabbath-report', label: 'Sabbath Report', icon: Calendar },
    { href: '/users/father/attendance', label: 'Attendance', icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <header className="bg-white border-b-4 border-black sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black uppercase transform -rotate-1">
                Father Portal
              </h1>
              <p className="text-sm font-bold text-gray-600 mt-1">
                Manage your family's spiritual journey
              </p>
            </div>
            
            <div className="flex items-center gap-4">
            
              
              {/* Profile */}
              <Link 
                href="/users/father/profile"
                className="flex items-center gap-2 px-4 py-2 bg-yellow-400 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <User className="w-5 h-5" />
                <span className="font-black uppercase text-sm">Profile</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside 
          className={`fixed left-0 top-[5.5rem] h-[calc(100vh-5.5rem)] bg-white border-r-4 border-black transition-all duration-300 z-30 ${
            isCollapsed ? 'w-20' : 'w-64'
          }`}
        >
          {/* Toggle Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-4 top-4 w-8 h-8 bg-blue-400 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center justify-center z-50"
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
                      ? 'bg-blue-400 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-1'
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
              <Link
                href="/users/father/settings"
                className={`flex items-center gap-3 px-3 py-3 font-black uppercase text-sm transition-all hover:bg-gray-100 border-2 border-transparent ${
                  isCollapsed ? 'justify-center' : ''
                }`}
                title={isCollapsed ? 'Settings' : ''}
              >
                <Settings className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span className="truncate">Settings</span>}
              </Link>
              
              <button
                onClick={handleLogout}
                className={`w-full flex items-center gap-3 px-3 py-3 font-black uppercase text-sm transition-all hover:bg-red-100 border-2 border-transparent hover:border-red-500 text-red-600 ${
                  isCollapsed ? 'justify-center' : ''
                }`}
                title={isCollapsed ? 'Logout' : ''}
              >
                <LogOut className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span className="truncate">Logout</span>}
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main 
          className={`flex-1 transition-all duration-300 ${
            isCollapsed ? 'ml-20' : 'ml-64'
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
