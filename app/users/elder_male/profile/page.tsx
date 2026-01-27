'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  User,
  Mail,
  Phone,
  Shield,
  Calendar,
  MapPin
} from 'lucide-react';

export default function ProfilePage() {
  const elder = {
    name: 'Elder David Thompson',
    email: 'david.thompson@church.com',
    phone: '+250 788 123 456',
    role: 'Elder (Male)',
    family: 'Salvation Siblings',
    joinedDate: 'January 2020',
    location: 'Kigali, Rwanda',
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
            View and manage your profile information
          </p>
        </div>

        {/* Profile Card */}
        <Card className="bg-blue-100 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6">
          <CardHeader className="bg-blue-400 border-b-4 border-black">
            <CardTitle className="uppercase flex items-center gap-2">
              <User className="w-6 h-6" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex items-start gap-6 mb-8">
              {/* Profile Picture */}
              <div className="w-32 h-32 bg-blue-400 border-4 border-black flex items-center justify-center flex-shrink-0">
                <User className="w-16 h-16" />
              </div>
              
              {/* Basic Info */}
              <div className="flex-1">
                <h2 className="text-3xl font-black mb-2">{elder.name}</h2>
                <div className="inline-block px-4 py-2 bg-yellow-200 border-2 border-black font-black uppercase text-sm mb-4">
                  {elder.role}
                </div>
                <p className="font-bold text-gray-600">
                  Serving the church with dedication and faith
                </p>
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white border-4 border-black">
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span className="font-black uppercase text-sm">Email</span>
                </div>
                <p className="font-bold text-gray-700">{elder.email}</p>
              </div>

              <div className="p-4 bg-white border-4 border-black">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <span className="font-black uppercase text-sm">Phone</span>
                </div>
                <p className="font-bold text-gray-700">{elder.phone}</p>
              </div>

              <div className="p-4 bg-white border-4 border-black">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="font-black uppercase text-sm">Family</span>
                </div>
                <p className="font-bold text-gray-700">{elder.family}</p>
              </div>

              <div className="p-4 bg-white border-4 border-black">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="font-black uppercase text-sm">Joined</span>
                </div>
                <p className="font-bold text-gray-700">{elder.joinedDate}</p>
              </div>

              <div className="p-4 bg-white border-4 border-black md:col-span-2">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span className="font-black uppercase text-sm">Location</span>
                </div>
                <p className="font-bold text-gray-700">{elder.location}</p>
              </div>
            </div>

            {/* Edit Button */}
            <div className="mt-6">
              <Button className="w-full h-12 text-lg font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all bg-blue-400">
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Responsibilities Card */}
        <Card className="bg-green-100 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="bg-green-400 border-b-4 border-black">
            <CardTitle className="uppercase flex items-center gap-2">
              <Shield className="w-6 h-6" />
              Your Responsibilities
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-3">
              <li className="flex items-start gap-3 p-3 bg-white border-2 border-black">
                <span className="text-green-600 font-black">✓</span>
                <span className="font-bold">Add and manage church members</span>
              </li>
              <li className="flex items-start gap-3 p-3 bg-white border-2 border-black">
                <span className="text-green-600 font-black">✓</span>
                <span className="font-bold">Upload and organize gallery items</span>
              </li>
              <li className="flex items-start gap-3 p-3 bg-white border-2 border-black">
                <span className="text-green-600 font-black">✓</span>
                <span className="font-bold">Add choir songs and manage choir content</span>
              </li>
              <li className="flex items-start gap-3 p-3 bg-white border-2 border-black">
                <span className="text-green-600 font-black">✓</span>
                <span className="font-bold">Assign and update member roles</span>
              </li>
              <li className="flex items-start gap-3 p-3 bg-white border-2 border-black">
                <span className="text-green-600 font-black">✓</span>
                <span className="font-bold">Oversee church operations and activities</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
