'use client';

import React from 'react';
import UserProfile, { UserProfileData } from '@/components/UserProfile';
import { TrendingUp, BookOpen, Heart } from 'lucide-react';

export default function FatherProfilePage() {
  // Mock user data - replace with actual auth and API calls
  const userData: UserProfileData = {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    family: 'Salvation Siblings',
    role: 'Father',
    level: 'Y1',
    status: 'Current Student',
    joinedDate: new Date('2024-01-15'),
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
      accentColor="blue"
    />
  );
}
