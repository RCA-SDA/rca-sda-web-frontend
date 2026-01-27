'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  FolderPlus,
  UserPlus,
  Activity,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';

export default function GrandMotherPortalPage() {
  const grandMother = {
    name: 'Elder Mary Johnson',
    role: 'Grand Mother',
  };

  const stats = {
    totalFamilies: 12,
    totalMembers: 48,
    activeFamilies: 11,
    newMembersThisMonth: 3,
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black uppercase transform -rotate-1 mb-2">
            Grand Mother Portal
          </h1>
          <p className="text-xl font-bold">
            Welcome, {grandMother.name}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-pink-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
            <CardHeader>
              <CardTitle className="uppercase text-sm flex items-center justify-between">
                <span>Total Families</span>
                <Users className="w-6 h-6" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-black">{stats.totalFamilies}</p>
              <p className="text-sm font-bold mt-2">Registered families</p>
            </CardContent>
          </Card>

          <Card className="bg-blue-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
            <CardHeader>
              <CardTitle className="uppercase text-sm flex items-center justify-between">
                <span>Total Members</span>
                <Users className="w-6 h-6" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-black">{stats.totalMembers}</p>
              <p className="text-sm font-bold mt-2">All family members</p>
            </CardContent>
          </Card>

          <Card className="bg-green-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
            <CardHeader>
              <CardTitle className="uppercase text-sm flex items-center justify-between">
                <span>Active Families</span>
                <Activity className="w-6 h-6" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-black">{stats.activeFamilies}</p>
              <p className="text-sm font-bold mt-2">Currently active</p>
            </CardContent>
          </Card>

          <Card className="bg-yellow-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/users/grand_mother/create-family">
                <Button className="w-full h-20 text-lg font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all bg-pink-400">
                  <FolderPlus className="w-6 h-6 mr-2" />
                  Create Family
                </Button>
              </Link>

              <Link href="/users/grand_mother/add-member">
                <Button 
                  className="w-full h-20 text-lg font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all bg-blue-400"
                >
                  <UserPlus className="w-6 h-6 mr-2" />
                  Add Member
                </Button>
              </Link>

              <Link href="/users/grand_mother/family">
                <Button 
                  className="w-full h-20 text-lg font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all bg-green-400"
                >
                  <Users className="w-6 h-6 mr-2" />
                  View All Families
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
