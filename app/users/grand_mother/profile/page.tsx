'use client';

import React from 'react';
import UserProfile, { UserProfileData } from '@/components/UserProfile';

export default function GrandMotherProfilePage() {
  const userData: UserProfileData = {
    id: '2',
    name: 'Elder Mary Johnson',
    email: 'grand_mother@example.com',
    phone: '+250 788 777 666',
    family: 'Church Leadership',
    role: 'Grand Mother',
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
      accentColor="pink"
    />
  );
}
