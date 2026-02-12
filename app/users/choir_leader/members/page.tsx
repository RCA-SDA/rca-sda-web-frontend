'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Music, Trash2 } from 'lucide-react';
import { useChoirs, useUpdateChoir } from '@/lib/hooks/useChoir';
import { useMembers } from '@/lib/hooks/useMember';

export default function ChoirMembersPage() {
  const [selectedChoirId, setSelectedChoirId] = useState<string>('');
  
  const { data: choirs, isLoading: choirsLoading } = useChoirs();
  const { data: members } = useMembers();
  const updateChoir = useUpdateChoir();

  const selectedChoir = choirs?.find(c => c.id.toString() === selectedChoirId);

  const getChoirMembers = () => {
    if (!selectedChoir || !members) return [];
    
    return members.filter(member => 
      selectedChoir.choirMembers?.includes(member.id.toString())
    );
  };

  const handleRemoveMember = async (memberId: number) => {
    if (!selectedChoir) return;

    try {
      const updatedMembers = selectedChoir.choirMembers?.filter(id => id !== memberId.toString()) || [];
      
      await updateChoir.mutateAsync({
        id: selectedChoir.id,
        data: {
          choirMembers: updatedMembers
        }
      });
    } catch (error) {
      console.error('Failed to remove member:', error);
    }
  };

  const choirMembers = getChoirMembers();

  return (
    <div className="min-h-screen bg-[#fafafa] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black uppercase transform -rotate-1 mb-2">
            Choir Members
          </h1>
          <p className="text-lg font-bold text-gray-600">
            View and manage members in each choir
          </p>
        </div>

        {/* Choir Selector */}
        <Card className="mb-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="bg-purple-400 border-b-4 border-black">
            <CardTitle className="uppercase flex items-center gap-2">
              <Music className="w-6 h-6" />
              Select Choir
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <Select
              value={selectedChoirId}
              onValueChange={setSelectedChoirId}
              disabled={choirsLoading}
            >
              <SelectTrigger className="h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold">
                <SelectValue placeholder={choirsLoading ? "Loading choirs..." : "Choose a choir to view members"} />
              </SelectTrigger>
              <SelectContent className="border-4 border-black">
                {choirs?.map(choir => (
                  <SelectItem key={choir.id} value={choir.id.toString()} className="font-bold">
                    {choir.name} ({choir.choirMembers?.length || 0} members)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Members List */}
        {selectedChoirId && (
          <Card className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader className="bg-blue-400 border-b-4 border-black">
              <CardTitle className="uppercase flex items-center gap-2">
                <Users className="w-6 h-6" />
                {selectedChoir?.name} Members ({choirMembers.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {choirMembers.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-xl font-black text-gray-600">No members in this choir yet</p>
                  <p className="text-sm font-bold text-gray-500 mt-2">Add members using the Add Member page</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {choirMembers.map(member => (
                    <Card key={member.id} className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-black text-lg mb-1">
                              {member.firstName} {member.lastName}
                            </h3>
                            <p className="text-sm font-bold text-gray-600 mb-1">{member.email}</p>
                            <p className="text-xs font-bold text-gray-500">
                              {member.gender} • {member.level}
                            </p>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleRemoveMember(member.id)}
                            disabled={updateChoir.isPending}
                            className="border-2 border-black"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {!selectedChoirId && (
          <Card className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-gray-50">
            <CardContent className="pt-6 text-center py-12">
              <Music className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-xl font-black text-gray-600">Select a choir to view members</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
