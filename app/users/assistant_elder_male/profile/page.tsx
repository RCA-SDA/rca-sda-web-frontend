'use client';

import UserProfile from '@/components/UserProfile';

export default function AssistantElderMaleProfilePage() {
  const user = {
    id: 'assistant-elder-1',
    name: 'Elder Michael Thompson',
    email: 'michael.thompson@rca-sda.org',
    phone: '+250 788 456 789',
    family: 'Church Leadership',
    role: 'Assistant Elder (Male)',
    address: 'Kigali, Rwanda',
    level: 'Elder',
    status: 'Active',
    joinedDate: new Date('2023-06-15'),
  };

  const customFields = [
    { label: 'Ministry Focus', value: 'Member Care & Administration' },
    { label: 'Years of Service', value: '8 years' },
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
          accentColor="blue"
        />
      </div>
    </div>
  );
}
