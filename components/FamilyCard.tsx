import { Family } from '@/types';

interface FamilyCardProps {
  family: Family;
  memberCount: number;
  onClick?: () => void;
}

export default function FamilyCard({ family, memberCount, onClick }: FamilyCardProps) {
  const colors = {
    'Salvation Siblings': 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800',
    'Ebenezer': 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800',
    'Jehova-nissi': 'bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800',
  };

  return (
    <div
      onClick={onClick}
      className={`${colors[family]} border-2 rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow`}
    >
      <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
        {family}
      </h3>
      <p className="text-zinc-600 dark:text-zinc-400">
        {memberCount} {memberCount === 1 ? 'member' : 'members'}
      </p>
    </div>
  );
}
