'use client';

import UserProfile from '@/components/UserProfile';

export default function AssistantElderFemaleProfilePage() {
  const user = {
    id: 'assistant-elder-2',
    name: 'Elder Grace Williams',
    email: 'grace.williams@rca-sda.org',
    phone: '+250 788 654 321',
    family: 'Church Leadership',
    role: 'Assistant Elder (Female)',
    address: 'Kigali, Rwanda',
    level: 'Elder',
    status: 'Active',
    joinedDate: new Date('2023-08-20'),
  };

  const customFields = [
    { label: 'Ministry Focus', value: 'Member Care & Administration' },
    { label: 'Years of Service', value: '6 years' },
    { label: 'Responsibilities', value: 'Member management, Gallery oversight, Role assignments' },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <UserProfile
          user={user}
          editable={true}
          showFamilyInfo={true}
          showRoleInfo={true}
          onUpdate={async (updatedUser: Partial<typeof user>) => {
            console.log('Updated user:', updatedUser);
          }}
          customFields={customFields}
          accentColor="pink"
        />
      </div>
    </div>
  );
}
