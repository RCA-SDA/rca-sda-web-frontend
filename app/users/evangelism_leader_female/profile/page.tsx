'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const profile = {
    name: 'Pastor Sarah Williams',
    role: 'Evangelism Leader (Female)',
    email: '[email]',
    phone: '[phone_number]',
    joinDate: 'January 2024',
    department: 'Evangelism & Outreach',
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black uppercase transform -rotate-1 mb-2">
              My Profile
            </h1>
            <p className="text-lg font-bold text-gray-600">
              View and manage your profile
            </p>
          </div>
          <Link href="/users/evangelism_leader_female">
            <Button className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all bg-gray-200">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Profile Card */}
        <Card className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="bg-pink-200 border-b-4 border-black">
            <CardTitle className="uppercase flex items-center gap-2">
              <User className="w-6 h-6" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 bg-pink-400 border-4 border-black flex items-center justify-center">
                  <User className="w-12 h-12" />
                </div>
                <div>
                  <h2 className="text-2xl font-black uppercase">{profile.name}</h2>
                  <p className="text-lg font-bold text-gray-600">{profile.role}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 mt-1" />
                  <div>
                    <p className="text-sm font-black uppercase text-gray-600">Email</p>
                    <p className="text-base font-bold">{profile.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 mt-1" />
                  <div>
                    <p className="text-sm font-black uppercase text-gray-600">Phone</p>
                    <p className="text-base font-bold">{profile.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 mt-1" />
                  <div>
                    <p className="text-sm font-black uppercase text-gray-600">Join Date</p>
                    <p className="text-base font-bold">{profile.joinDate}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 mt-1" />
                  <div>
                    <p className="text-sm font-black uppercase text-gray-600">Department</p>
                    <p className="text-base font-bold">{profile.department}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
