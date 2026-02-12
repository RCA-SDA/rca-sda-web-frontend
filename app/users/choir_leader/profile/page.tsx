'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Mail, Shield, Calendar } from 'lucide-react';

export default function ChoirLeaderProfilePage() {
  // Mock user data - replace with actual user data from auth context
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@church.com',
    role: 'CHOIR_LEADER',
    joinedDate: '2024-01-15',
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black uppercase transform -rotate-1 mb-2">
            My Profile
          </h1>
          <p className="text-lg font-bold text-gray-600">
            View and manage your account information
          </p>
        </div>

        {/* Profile Card */}
        <Card className="bg-purple-100 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="bg-purple-400 border-b-4 border-black">
            <CardTitle className="uppercase flex items-center gap-2">
              <User className="w-6 h-6" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* Name */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-400 border-4 border-black flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-black uppercase text-gray-600">Full Name</p>
                <p className="text-xl font-black">{user.firstName} {user.lastName}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-400 border-4 border-black flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-black uppercase text-gray-600">Email Address</p>
                <p className="text-xl font-black">{user.email}</p>
              </div>
            </div>

            {/* Role */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-yellow-400 border-4 border-black flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-black uppercase text-gray-600">Role</p>
                <p className="text-xl font-black">{user.role.replace('_', ' ')}</p>
              </div>
            </div>

            {/* Joined Date */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-400 border-4 border-black flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-black uppercase text-gray-600">Member Since</p>
                <p className="text-xl font-black">
                  {new Date(user.joinedDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions Card */}
        <Card className="mt-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="bg-gray-200 border-b-4 border-black">
            <CardTitle className="uppercase">Account Actions</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <Button 
              className="w-full h-12 font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all bg-blue-400"
            >
              Edit Profile
            </Button>
            <Button 
              variant="outline"
              className="w-full h-12 font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              Change Password
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
