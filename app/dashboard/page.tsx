'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Settings, LogOut } from 'lucide-react';
import { useIsAuthenticated } from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { user, isAuthenticated } = useIsAuthenticated();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <p className="font-bold text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black uppercase transform -rotate-1 mb-2">
            User Dashboard
          </h1>
          <p className="text-lg font-bold text-gray-600">
            Welcome back, {user?.name || 'User'}!
          </p>
        </div>

        {/* User Info Card */}
        <Card className="bg-blue-100 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6">
          <CardHeader className="bg-blue-400 border-b-4 border-black">
            <CardTitle className="uppercase flex items-center gap-2">
              <User className="w-6 h-6" />
              Your Information
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <span className="font-black text-sm uppercase">Name:</span>
                <p className="font-bold">{user?.name}</p>
              </div>
              <div>
                <span className="font-black text-sm uppercase">Email:</span>
                <p className="font-bold">{user?.email}</p>
              </div>
              <div>
                <span className="font-black text-sm uppercase">Role:</span>
                <p className="font-bold">{user?.role}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notice Card */}
        <Card className="bg-yellow-100 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="pt-6">
            <h3 className="font-black uppercase mb-3">Notice:</h3>
            <p className="font-bold text-sm">
              You are currently on the general user dashboard. If you have a specific role
              (like Elder, Choir Leader, etc.), please contact your administrator to ensure
              your role is properly assigned for access to specialized features.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
