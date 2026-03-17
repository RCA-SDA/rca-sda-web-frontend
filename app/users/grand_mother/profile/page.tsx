'use client';

import React from 'react';
import UserProfile, { UserProfileData } from '@/components/UserProfile';
import { Heart, Users, Crown, Loader2 } from 'lucide-react';
import { useCurrentUser, useUpdateCurrentUser } from '@/lib/hooks/useCurrentUser';
import { type CurrentUser } from '@/lib/services/currentUser.service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function GrandMotherProfilePage() {
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
    family: currentUser.familly || 'Church Leadership',
    role: currentUser.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    status: currentUser.status || 'Active',
    joinedDate: currentUser.memberSince ? new Date(currentUser.memberSince) : new Date(),
  };

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
      icon: <Heart className="w-5 h-5" />,
    },
    ...(currentUser.classroom ? [{
      label: 'Classroom',
      value: currentUser.classroom,
      icon: <Crown className="w-5 h-5" />,
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
        accentColor="pink"
      />

      {/* Grand Mother Responsibilities Card */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <Card className="bg-pink-100 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="bg-pink-400 border-b-4 border-black">
            <CardTitle className="uppercase flex items-center gap-2">
              <Heart className="w-6 h-6" />
              Grand Mother Responsibilities
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-3">
              <li className="flex items-start gap-3 p-3 bg-white border-2 border-black">
                <span className="text-pink-600 font-black">✓</span>
                <span className="font-bold">Provide spiritual guidance to women and children</span>
              </li>
              <li className="flex items-start gap-3 p-3 bg-white border-2 border-black">
                <span className="text-pink-600 font-black">✓</span>
                <span className="font-bold">Lead women's fellowship and prayer groups</span>
              </li>
              <li className="flex items-start gap-3 p-3 bg-white border-2 border-black">
                <span className="text-pink-600 font-black">✓</span>
                <span className="font-bold">Mentor young women in the church</span>
              </li>
              <li className="flex items-start gap-3 p-3 bg-white border-2 border-black">
                <span className="text-pink-600 font-black">✓</span>
                <span className="font-bold">Support family counseling and guidance</span>
              </li>
              <li className="flex items-start gap-3 p-3 bg-white border-2 border-black">
                <span className="text-pink-600 font-black">✓</span>
                <span className="font-bold">Organize community outreach programs</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
