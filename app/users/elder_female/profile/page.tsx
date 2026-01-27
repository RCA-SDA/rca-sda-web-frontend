'use client';

import UserProfile, { UserProfileData } from '@/components/UserProfile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, Image, Music } from 'lucide-react';

export default function ProfilePage() {
  const elderData: UserProfileData = {
    id: 'elder-002',
    name: 'Elder Grace Williams',
    email: 'grace.williams@church.com',
    phone: '+250 788 987 654',
    role: 'Elder (Female)',
    family: 'Ebenezer',
    status: 'Active',
    joinedDate: new Date('2019-08-20'),
  };

  const handleUpdate = async (updatedData: Partial<UserProfileData>) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Updating elder profile:', updatedData);
    // In a real app, you would make an API call here
  };

  const customFields = [
    {
      label: 'Members Added',
      value: 38,
      icon: <Users className="w-5 h-5" />,
    },
    {
      label: 'Gallery Items',
      value: 142,
      icon: <Image className="w-5 h-5" />,
    },
    {
      label: 'Choirs Created',
      value: 6,
      icon: <Music className="w-5 h-5" />,
    },
  ];

  return (
    <>
      <UserProfile
        user={elderData}
        onUpdate={handleUpdate}
        editable={true}
        showFamilyInfo={true}
        showRoleInfo={true}
        customFields={customFields}
        accentColor="pink"
      />

      {/* Responsibilities Card - Additional section below the profile */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
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
                <span className="font-bold">Create and manage choirs</span>
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
    </>
  );
}
