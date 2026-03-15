'use client';

import UserProfile, { UserProfileData } from '@/components/UserProfile';
import { FileText, MessageSquare, BookOpen, Loader2 } from 'lucide-react';
import { useCurrentUser, useUpdateCurrentUser } from '@/lib/hooks/useCurrentUser';
import { type CurrentUser } from '@/lib/services/currentUser.service';

export default function ProfilePage() {
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
        <div className="bg-red-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8 text-center">
          <p className="text-lg font-black">Failed to load profile</p>
          <p className="text-sm text-gray-600 mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  // Transform API data to UserProfile format
  const userData: UserProfileData = {
    id: currentUser.id.toString(),
    name: `${currentUser.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} - ${currentUser.firstName} ${currentUser.lastName}`,
    email: currentUser.email,
    role: currentUser.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    family: currentUser.familly || 'Evangelism & Outreach',
    status: currentUser.status || 'Active',
    joinedDate: currentUser.memberSince ? new Date(currentUser.memberSince) : new Date(),
  };

  const customFields = [
    {
      label: 'Members Added',
      value: currentUser.membersAdded,
      icon: <FileText className="w-5 h-5" />,
    },
    {
      label: 'Gallery Items',
      value: currentUser.galleryItems,
      icon: <MessageSquare className="w-5 h-5" />,
    },
    ...(currentUser.classroom ? [{
      label: 'Classroom',
      value: currentUser.classroom,
      icon: <BookOpen className="w-5 h-5" />,
    }] : []),
  ];

  const handleUpdate = async (updatedData: Partial<UserProfileData>) => {
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

  return (
    <UserProfile
      user={userData}
      onUpdate={handleUpdate}
      editable={true}
      showFamilyInfo={true}
      showRoleInfo={true}
      customFields={customFields}
      accentColor="purple"
    />
  );
}
