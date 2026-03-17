'use client';

import React from 'react';
import UserProfile, { UserProfileData } from '@/components/UserProfile';
import { Music, Users, Loader2 } from 'lucide-react';
import { useCurrentUser, useUpdateCurrentUser } from '@/lib/hooks/useCurrentUser';
import { type CurrentUser } from '@/lib/services/currentUser.service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ChoirLeaderProfilePage() {
  const { data: currentUser, isLoading, error } = useCurrentUser();
  const updateCurrentUser = useUpdateCurrentUser();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
          <p className="text-lg font-bold">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !currentUser) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <Card className="bg-red-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="p-8 text-center">
            <p className="text-lg font-black">Failed to load profile</p>
            <p className="text-sm text-gray-600 mt-2">Please try again later</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Transform API data to UserProfile format
  const userData: UserProfileData = {
    id: currentUser.id.toString(),
    name: `${currentUser.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} - ${currentUser.firstName} ${currentUser.lastName}`,
    email: currentUser.email,
    family: currentUser.familly || 'Choir Family',
    role: currentUser.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    status: currentUser.status || 'Active',
    joinedDate: currentUser.memberSince ? new Date(currentUser.memberSince) : new Date(),
  };

  // Handle profile update
  const handleUpdateProfile = async (updatedData: Partial<UserProfileData>) => {
    try {
      // Transform UserProfileData back to CurrentUser format
      const apiData: Partial<CurrentUser> = {};

      if (updatedData.name) {
        const [firstName, lastName] = updatedData.name.split(' ');
        apiData.firstName = firstName || currentUser.firstName;
        apiData.lastName = lastName || currentUser.lastName;
      }

      if (updatedData.family) {
        apiData.familly = updatedData.family;
      }

      await updateCurrentUser.mutateAsync(apiData);
      console.log('Profile updated successfully:', updatedData);
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  };

  const customFields = [
    {
      label: 'Members Added',
      value: currentUser.membersAdded,
      icon: <Users className="w-5 h-5" />,
    },
    {
      label: 'Gallery Items',
      value: currentUser.galleryItems,
      icon: <Music className="w-5 h-5" />,
    },
    ...(currentUser.classroom ? [{
      label: 'Classroom',
      value: currentUser.classroom,
      icon: <Music className="w-5 h-5" />,
    }] : []),
  ];

  return (
    <>
      <UserProfile
        user={userData}
        onUpdate={handleUpdateProfile}
        editable={true}
        showFamilyInfo={true}
        showRoleInfo={true}
        customFields={customFields}
        accentColor="purple"
      />

      {/* Choir Leader Responsibilities Card */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <Card className="bg-purple-100 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="bg-purple-400 border-b-4 border-black">
            <CardTitle className="uppercase flex items-center gap-2">
              <Music className="w-6 h-6" />
              Choir Leader Responsibilities
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-3">
              <li className="flex items-start gap-3 p-3 bg-white border-2 border-black">
                <span className="text-purple-600 font-black">✓</span>
                <span className="font-bold">Lead choir rehearsals and performances</span>
              </li>
              <li className="flex items-start gap-3 p-3 bg-white border-2 border-black">
                <span className="text-purple-600 font-black">✓</span>
                <span className="font-bold">Select and arrange music for services</span>
              </li>
              <li className="flex items-start gap-3 p-3 bg-white border-2 border-black">
                <span className="text-purple-600 font-black">✓</span>
                <span className="font-bold">Train and mentor choir members</span>
              </li>
              <li className="flex items-start gap-3 p-3 bg-white border-2 border-black">
                <span className="text-purple-600 font-black">✓</span>
                <span className="font-bold">Organize special music programs</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
