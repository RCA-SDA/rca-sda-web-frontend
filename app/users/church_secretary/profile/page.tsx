'use client';

import React from 'react';
import UserProfile, { UserProfileData } from '@/components/UserProfile';

export default function SecretaryProfilePage() {
  // Mock user data - replace with actual auth and API calls
  const userData: UserProfileData = {
    id: '5',
    name: 'Mary Johnson',
    email: 'mary.johnson@church.com',
    phone: '+250 788 555 1234',
    family: 'Grace Family',
    role: 'Church Secretary',
    level: 'Y2',
    status: 'Active Staff',
    joinedDate: new Date('2023-06-01'),
  };

  // Handle profile update
  const handleUpdateProfile = async (updatedData: Partial<UserProfileData>) => {
    try {
      // Add API call here to update user profile
      console.log('Updating profile:', updatedData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message or update local state
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
