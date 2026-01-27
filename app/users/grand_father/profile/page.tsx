'use client';

import React from 'react';
import UserProfile, { UserProfileData } from '@/components/UserProfile';

export default function GrandFatherProfilePage() {
  const userData: UserProfileData = {
    id: '1',
    name: 'Elder James Wilson',
    email: 'grand_father@example.com',
    phone: '+250 788 999 888',
    family: 'Church Leadership',
    role: 'Grand Father',
    level: 'Elder',
    status: 'Active',
    joinedDate: new Date('2020-01-01'),
  };

  const handleUpdateProfile = async (updatedData: Partial<UserProfileData>) => {
    try {
      console.log('Updating profile:', updatedData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
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
    />
  );
}
