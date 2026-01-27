'use client';

import UserProfile from '@/components/UserProfile';
import { FileText, MessageSquare, BookOpen } from 'lucide-react';

export default function ProfilePage() {
  const userData = {
    id: 'evangelism_leader_female_001',
    name: 'Pastor Sarah Williams',
    email: 'sarah.williams@church.com',
    phone: '+250 788 654 321',
    family: 'Evangelism & Outreach',
    role: 'Evangelism Leader (Female)',
    status: 'Active',
    joinedDate: new Date('2024-01-15'),
  };

  const customFields = [
    {
      label: 'Blogs Created',
      value: 24,
      icon: <FileText className="w-5 h-5" />,
    },
    {
      label: 'Testimonies Approved',
      value: 156,
      icon: <MessageSquare className="w-5 h-5" />,
    },
    {
      label: 'Resources Added',
      value: 15,
      icon: <BookOpen className="w-5 h-5" />,
    },
  ];

  const handleUpdate = async (updatedData: any) => {
    console.log('Updating profile:', updatedData);
    // Add API call here
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <UserProfile
      user={userData}
      onUpdate={handleUpdate}
      editable={true}
      showFamilyInfo={true}
      showRoleInfo={true}
      customFields={customFields}
      accentColor="pink"
    />
  );
}
