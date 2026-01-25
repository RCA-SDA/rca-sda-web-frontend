import { Family } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface FamilyCardProps {
  family: Family;
  memberCount: number;
  onClick?: () => void;
}

export default function FamilyCard({ family, memberCount, onClick }: FamilyCardProps) {
  const colorVariants = {
    'Salvation Siblings': 'bg-blue-50 border-blue-200',
    'Ebenezer': 'bg-green-50 border-green-200',
    'Jehova-nissi': 'bg-purple-50 border-purple-200',
  };

  return (
    <Card 
      onClick={onClick}
      className={`${colorVariants[family]} border-2 cursor-pointer hover:shadow-lg transition-shadow`}
    >
      <CardHeader>
        <CardTitle className="text-xl">{family}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-zinc-600">
          {memberCount} {memberCount === 1 ? 'member' : 'members'}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
