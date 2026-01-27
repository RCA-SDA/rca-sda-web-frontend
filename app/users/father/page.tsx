'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Calendar, 
  CheckSquare, 
  FileText, 
  TrendingUp,
  UserCheck,
  UserX,
  BookOpen,
  Heart,
  Activity
} from 'lucide-react';
import Link from 'next/link';

export default function FatherPortalPage() {
  // Mock data - replace with actual auth and API calls
  const father = {
    name: 'John Smith',
    family: 'Salvation Siblings',
    role: 'Father',
  };

  const familyMembers = [
    { id: '1', name: 'John Smith', role: 'Father', status: 'active' },
    { id: '2', name: 'Sarah Smith', role: 'Mother', status: 'active' },
    { id: '3', name: 'David Smith', role: 'Youth', status: 'active' },
    { id: '4', name: 'Emma Smith', role: 'Child', status: 'active' },
  ];

  const recentAttendance = [
    { date: '2026-01-25', present: 4, absent: 0 },
    { date: '2026-01-18', present: 3, absent: 1 },
    { date: '2026-01-11', present: 4, absent: 0 },
  ];

  const weeklyStats = {
    attendanceRate: 92,
    bibleStudyRate: 75,
    visitationRate: 50,
    helpingRate: 65,
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black uppercase transform -rotate-1 mb-2">
            Father Portal
          </h1>
          <p className="text-xl font-bold">
            Welcome, {father.name} - {father.family}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-blue-200 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
            <CardHeader>
              <CardTitle className="uppercase text-sm flex items-center justify-between">
                <span>Family Members</span>
                <Users className="w-6 h-6" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-black">{familyMembers.length}</p>
              <p className="text-sm font-bold mt-2">Active members</p>
            </CardContent>
          </Card>

          <Card className="bg-green-200 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
            <CardHeader>
              <CardTitle className="uppercase text-sm flex items-center justify-between">
                <span>Attendance Rate</span>
                <TrendingUp className="w-6 h-6" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-black">{weeklyStats.attendanceRate}%</p>
              <p className="text-sm font-bold mt-2">Last 4 weeks</p>
            </CardContent>
          </Card>

          <Card className="bg-purple-200 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
            <CardHeader>
              <CardTitle className="uppercase text-sm flex items-center justify-between">
                <span>Bible Study</span>
                <BookOpen className="w-6 h-6" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-black">{weeklyStats.bibleStudyRate}%</p>
              <p className="text-sm font-bold mt-2">Weekly completion</p>
            </CardContent>
          </Card>

          <Card className="bg-yellow-200 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
            <CardHeader>
              <CardTitle className="uppercase text-sm flex items-center justify-between">
                <span>Service Rate</span>
                <Heart className="w-6 h-6" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-black">{weeklyStats.helpingRate}%</p>
              <p className="text-sm font-bold mt-2">Helping others</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8 bg-orange-200">
          <CardHeader>
            <CardTitle className="uppercase flex items-center gap-2">
              <Activity className="w-6 h-6" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link href="/users/father/sabbath-report">
                <Button className="w-full h-20 text-lg font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
                  <Calendar className="w-6 h-6 mr-2" />
                  Mark Attendance
                </Button>
              </Link>

              <Link href="/users/father/family">
                <Button 
                  variant="outline"
                  className="w-full h-20 text-lg font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  <Users className="w-6 h-6 mr-2" />
                  View Family
                </Button>
              </Link>

              <Link href="/users/father/history">
                <Button 
                  variant="outline"
                  className="w-full h-20 text-lg font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  <BookOpen className="w-6 h-6 mr-2" />
                  View perfomance
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Family Members */}
          <Card className="bg-pink-200">
            <CardHeader>
              <CardTitle className="uppercase flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  Family Members
                </span>
                <Link href="/members">
                  <Button size="sm" variant="outline">
                    View All
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {familyMembers.map((member) => (
                  <div 
                    key={member.id}
                    className="flex items-center justify-between p-3 bg-white border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <div>
                      <p className="font-black">{member.name}</p>
                      <p className="text-sm font-bold text-gray-600">{member.role}</p>
                    </div>
                    <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Attendance */}
          <Card className="bg-cyan-200">
            <CardHeader>
              <CardTitle className="uppercase flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <CheckSquare className="w-6 h-6" />
                  Recent Attendance
                </span>
                <Link href="/sabbath-report">
                  <Button size="sm" variant="outline">
                    View All
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentAttendance.map((record, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 bg-white border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <div>
                      <p className="font-black">
                        {new Date(record.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-1">
                        <UserCheck className="w-5 h-5 text-green-600" />
                        <span className="font-black">{record.present}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <UserX className="w-5 h-5 text-red-600" />
                        <span className="font-black">{record.absent}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Responsibilities */}
        <Card className="mt-6 bg-gradient-to-br from-green-200 to-blue-200">
          <CardHeader>
            <CardTitle className="uppercase flex items-center gap-2">
              <FileText className="w-6 h-6" />
              Father's Responsibilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <ul className="space-y-2 font-bold">
                  <li className="flex items-start gap-2">
                    <CheckSquare className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Mark Sabbath attendance for all family members</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckSquare className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Track Bible study completion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckSquare className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Record visitation and service activities</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <ul className="space-y-2 font-bold">
                  <li className="flex items-start gap-2">
                    <CheckSquare className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Review family spiritual progress</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckSquare className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Update family member information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckSquare className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Coordinate family service projects</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
