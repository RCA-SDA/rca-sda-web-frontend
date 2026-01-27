'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText,
  MessageSquare,
  BookOpen,
  Activity,
  TrendingUp,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

export default function EvangelismLeaderFemalePortalPage() {
  const leader = {
    name: 'Pastor Sarah Williams',
    role: 'Evangelism Leader',
  };

  const stats = {
    totalBlogs: 24,
    pendingTestimonies: 8,
    totalResources: 15,
    approvedThisMonth: 12,
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black uppercase transform -rotate-1 mb-2">
            Evangelism Leader Portal
          </h1>
          <p className="text-xl font-bold">
            Welcome, {leader.name}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-pink-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
            <CardHeader>
              <CardTitle className="uppercase text-sm flex items-center justify-between">
                <span>Total Blogs</span>
                <FileText className="w-6 h-6" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-black">{stats.totalBlogs}</p>
              <p className="text-sm font-bold mt-2">Published blogs</p>
            </CardContent>
          </Card>

          <Card className="bg-rose-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
            <CardHeader>
              <CardTitle className="uppercase text-sm flex items-center justify-between">
                <span>Pending Testimonies</span>
                <MessageSquare className="w-6 h-6" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-black">{stats.pendingTestimonies}</p>
              <p className="text-sm font-bold mt-2">Awaiting approval</p>
            </CardContent>
          </Card>

          <Card className="bg-purple-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
            <CardHeader>
              <CardTitle className="uppercase text-sm flex items-center justify-between">
                <span>Total Resources</span>
                <BookOpen className="w-6 h-6" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-black">{stats.totalResources}</p>
              <p className="text-sm font-bold mt-2">Available resources</p>
            </CardContent>
          </Card>

          <Card className="bg-green-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
            <CardHeader>
              <CardTitle className="uppercase text-sm flex items-center justify-between">
                <span>Approved This Month</span>
                <CheckCircle className="w-6 h-6" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-black">{stats.approvedThisMonth}</p>
              <p className="text-sm font-bold mt-2">Testimonies approved</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8 bg-yellow-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader>
            <CardTitle className="uppercase flex items-center gap-2">
              <Activity className="w-6 h-6" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/users/evangelism_leader_female/create-blog">
                <Button className="w-full h-20 text-lg font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all bg-pink-400">
                  <FileText className="w-6 h-6 mr-2" />
                  Create Blog
                </Button>
              </Link>

              <Link href="/users/evangelism_leader_female/approve-testimonies">
                <Button 
                  className="w-full h-20 text-lg font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all bg-rose-400"
                >
                  <MessageSquare className="w-6 h-6 mr-2" />
                  Approve Testimonies
                </Button>
              </Link>

              <Link href="/users/evangelism_leader_female/add-resource">
                <Button 
                  className="w-full h-20 text-lg font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all bg-purple-400"
                >
                  <BookOpen className="w-6 h-6 mr-2" />
                  Add Resource
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
