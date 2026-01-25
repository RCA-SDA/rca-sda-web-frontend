import { Family } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface FamilyCardProps {
  family: Family;
  memberCount: number;
  onClick?: () => void;
}

export default function FamilyCard({ family, memberCount, onClick }: FamilyCardProps) {
  const colorVariants = {
    'Salvation Siblings': 'bg-blue-300',
    'Ebenezer': 'bg-green-300',
    'Jehova-nissi': 'bg-purple-300',
  };

  return (
    <Card 
      onClick={onClick}
      className={`${colorVariants[family]} cursor-pointer`}
    >
      <CardHeader>
        <CardTitle className="uppercase">{family}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-black font-black">
          {memberCount} {memberCount === 1 ? 'member' : 'members'}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
