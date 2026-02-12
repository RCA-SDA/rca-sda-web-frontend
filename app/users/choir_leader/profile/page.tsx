'use client';

import React from 'react';
import UserProfile, { UserProfileData } from '@/components/UserProfile';
import { Music, Users } from 'lucide-react';

export default function ChoirLeaderProfilePage() {
  // Mock user data - replace with actual user data from auth context
  const userData: UserProfileData = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@church.com',
    phone: '+250 788 123 456',
    family: 'Doe Family',
    role: 'CHOIR_LEADER',
    level: 'Y2',
    status: 'CURRENT',
    joinedDate: new Date('2024-01-15'),
  };

  // Handle profile update
  const handleUpdateProfile = async (updatedData: Partial<UserProfileData>) => {
    try {
      // Add API call here to update user profile
      console.log('Updating profile:', updatedData);
      // await memberService.update(userData.id, updatedData);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  };

  return (
    <UserProfile
      user={userData}
      onUpdate={handleUpdateProfile}
      editable={true}
      showFamilyInfo={true}
      showRoleInfo={true}
      accentColor="purple"
      customFields={[
        {
          label: 'Choir Members',
          value: 45,
          icon: <Users className="w-5 h-5" />,
        },
        {
          label: 'Choir Songs',
          value: 24,
          icon: <Music className="w-5 h-5" />,
        },
      ]}
    />
  );
}
