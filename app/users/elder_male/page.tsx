'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  UserPlus,
  Image,
  Shield,
  Music,
  Activity,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';

export default function ElderMalePortalPage() {
  const elder = {
    name: 'Elder David Thompson',
    role: 'Elder (Male)',
  };

  const stats = {
    totalMembers: 156,
    newMembersThisMonth: 8,
    galleryItems: 234,
    choirSongs: 87,
    rolesAssigned: 42,
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black uppercase transform -rotate-1 mb-2">
            Elder Portal
          </h1>
          <p className="text-xl font-bold">
            Welcome, {elder.name}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-blue-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
            <CardHeader>
              <CardTitle className="uppercase text-sm flex items-center justify-between">
                <span>Total Members</span>
                <Users className="w-6 h-6" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-black">{stats.totalMembers}</p>
              <p className="text-sm font-bold mt-2">Church members</p>
            </CardContent>
          </Card>

          <Card className="bg-green-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
            <CardHeader>
              <CardTitle className="uppercase text-sm flex items-center justify-between">
                <span>New This Month</span>
                <TrendingUp className="w-6 h-6" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-black">{stats.newMembersThisMonth}</p>
              <p className="text-sm font-bold mt-2">New members</p>
            </CardContent>
          </Card>

          <Card className="bg-purple-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
            <CardHeader>
              <CardTitle className="uppercase text-sm flex items-center justify-between">
                <span>Gallery Items</span>
                <Image className="w-6 h-6" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-black">{stats.galleryItems}</p>
              <p className="text-sm font-bold mt-2">Photos & videos</p>
            </CardContent>
          </Card>

          <Card className="bg-pink-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
            <CardHeader>
              <CardTitle className="uppercase text-sm flex items-center justify-between">
                <span>Choir Songs</span>
                <Music className="w-6 h-6" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-black">{stats.choirSongs}</p>
              <p className="text-sm font-bold mt-2">Total songs</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8 bg-orange-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader>
            <CardTitle className="uppercase flex items-center gap-2">
              <Activity className="w-6 h-6" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/users/elder_male/add-member">
                <Button className="w-full h-20 text-lg font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all bg-blue-400">
                  <UserPlus className="w-6 h-6 mr-2" />
                  Add Member
                </Button>
              </Link>

              <Link href="/users/elder_male/add-gallery">
                <Button 
                  className="w-full h-20 text-lg font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all bg-purple-400"
                >
                  <Image className="w-6 h-6 mr-2" />
                  Add Gallery
                </Button>
              </Link>

              <Link href="/users/elder_male/add-choirs">
                <Button 
                  className="w-full h-20 text-lg font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all bg-pink-400"
                >
                  <Music className="w-6 h-6 mr-2" />
                  Add Choirs
                </Button>
              </Link>

              <Link href="/users/elder_male/assign-roles">
                <Button 
                  className="w-full h-20 text-lg font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all bg-green-400"
                >
                  <Shield className="w-6 h-6 mr-2" />
                  Assign Roles
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-yellow-100 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader>
            <CardTitle className="uppercase">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white border-2 border-black">
                <div className="w-10 h-10 bg-blue-400 border-2 border-black flex items-center justify-center">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-black">New member added</p>
                  <p className="text-sm font-bold text-gray-600">John Doe joined Salvation Siblings</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white border-2 border-black">
                <div className="w-10 h-10 bg-purple-400 border-2 border-black flex items-center justify-center">
                  <Image className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-black">Gallery updated</p>
                  <p className="text-sm font-bold text-gray-600">5 new photos from Sunday service</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white border-2 border-black">
                <div className="w-10 h-10 bg-pink-400 border-2 border-black flex items-center justify-center">
                  <Music className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-black">New choir song</p>
                  <p className="text-sm font-bold text-gray-600">Amazing Grace added to Ebenezer Choir</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
