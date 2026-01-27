'use client';

import { Music, FolderOpen, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ChoirSecretaryDashboard() {
  // Mock stats - replace with API call
  const stats = {
    totalSongs: 24,
    recentUploads: 5,
    choirs: 3,
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <h2 className="text-4xl font-black uppercase mb-2">Dashboard , Etoile Choir</h2>
        <p className="text-gray-600 font-bold">Welcome back, Choir Secretary!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-purple-200 to-pink-200 border-4 border-black">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Music className="w-5 h-5" />
              Total Songs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-black">{stats.totalSongs}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-200 to-cyan-200 border-4 border-black">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Recent Uploads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-black">{stats.recentUploads}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-200 to-orange-200 border-4 border-black">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="w-5 h-5" />
              Audio songs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-black">{stats.choirs}</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-4 border-black">
        <CardHeader>
          <CardTitle className="uppercase">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Link href="/users/choir_secretary/add-songs">
            <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-6 text-lg border-4 border-black">
              <Music className="w-5 h-5 mr-2" />
              Add New Song
            </Button>
          </Link>
          <Link href="/users/choir_secretary/songs">
            <Button variant="outline" className="w-full font-bold py-6 text-lg border-4 border-black">
              <FolderOpen className="w-5 h-5 mr-2" />
              View All Songs
            </Button>
          </Link>
        </CardContent>
      </Card>
      </div>
      </div>
  );
}
