'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  UserPlus,
  Users,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useChoirs, useUpdateChoir } from '@/lib/hooks/useChoir';
import { useMembers } from '@/lib/hooks/useMember';

export default function AddMemberToChoirPage() {
  const [selectedChoir, setSelectedChoir] = useState<string>('');
  const [selectedMember, setSelectedMember] = useState<string>('');

  const { data: choirs, isLoading: choirsLoading } = useChoirs();
  const { data: members, isLoading: membersLoading } = useMembers();
  const updateChoir = useUpdateChoir();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedChoir || !selectedMember) {
      return;
    }

    try {
      const choir = choirs?.find(c => c.id.toString() === selectedChoir);
      if (!choir) return;

      // Add member to choir's choirMembers array (avoid duplicates)
      const currentMembers = choir.choirMembers || [];
      if (currentMembers.includes(selectedMember)) {
        alert('This member is already in the choir');
        return;
      }
      const updatedMembers = [...currentMembers, selectedMember];

      await updateChoir.mutateAsync({
        id: choir.id,
        data: {
          choirMembers: updatedMembers
        }
      });

      // Reset form on success
      setSelectedChoir('');
      setSelectedMember('');
    } catch (error) {
      console.error('Failed to add member to choir:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black uppercase transform -rotate-1 mb-2">
            Add Member to Choir
          </h1>
          <p className="text-lg font-bold text-gray-600">
            Assign a church member to a choir
          </p>
        </div>

        {/* Success/Error Messages */}
        {updateChoir.isSuccess && (
          <Card className="mb-6 bg-green-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <p className="font-black text-lg">Member added to choir successfully!</p>
              </div>
            </CardContent>
          </Card>
        )}

        {updateChoir.isError && (
          <Card className="mb-6 bg-red-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-red-600" />
                <p className="font-black text-lg">Failed to add member. Please try again.</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Form */}
        <Card className="bg-purple-100 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="bg-purple-400 border-b-4 border-black">
            <CardTitle className="uppercase flex items-center gap-2">
              <UserPlus className="w-6 h-6" />
              Select Choir and Member
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Select Choir */}
              <div className="space-y-2">
                <Label htmlFor="choir" className="text-sm font-black uppercase flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Select Choir *
                </Label>
                <Select
                  value={selectedChoir}
                  onValueChange={setSelectedChoir}
                  required
                  disabled={choirsLoading}
                >
                  <SelectTrigger className="h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold">
                    <SelectValue placeholder={choirsLoading ? "Loading choirs..." : "Choose a choir"} />
                  </SelectTrigger>
                  <SelectContent className="border-4 border-black">
                    {choirs?.map(choir => (
                      <SelectItem key={choir.id} value={choir.id.toString()} className="font-bold">
                        {choir.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Select Member */}
              <div className="space-y-2">
                <Label htmlFor="member" className="text-sm font-black uppercase flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Select Member *
                </Label>
                <Select
                  value={selectedMember}
                  onValueChange={setSelectedMember}
                  required
                  disabled={membersLoading}
                >
                  <SelectTrigger className="h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold">
                    <SelectValue placeholder={membersLoading ? "Loading members..." : "Choose a member"} />
                  </SelectTrigger>
                  <SelectContent className="border-4 border-black">
                    {members?.map(member => (
                      <SelectItem key={member.id} value={member.id.toString()} className="font-bold">
                        {member.firstName} {member.lastName} ({member.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={updateChoir.isPending || !selectedChoir || !selectedMember}
                  className="w-full h-14 text-lg font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all bg-purple-400 disabled:opacity-50"
                >
                  {updateChoir.isPending ? (
                    'Adding Member...'
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5 mr-2" />
                      Add Member to Choir
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 bg-yellow-100 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="pt-6">
            <h3 className="font-black uppercase mb-3">Important Notes:</h3>
            <ul className="space-y-2 font-bold text-sm">
              <li className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>Select both a choir and a member to add</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>Members can be part of multiple choirs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>View all choir members in the Members page</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
