'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Music, Users, CheckCircle, AlertCircle, User, Search } from 'lucide-react';
import { useCreateChoir } from '@/lib/hooks/useChoir';
import { useMembers } from '@/lib/hooks/useMember';
import type { CreateChoirInput } from '@/lib/services/choir.service';

export default function AddChoirsPage() {
  const [formData, setFormData] = useState<CreateChoirInput>({
    name: '',
    choirMembers: [],
  });
  const { data: members, isLoading: isLoadingMembers } = useMembers();
  const [searchQuery, setSearchQuery] = useState('');
  const createChoir = useCreateChoir();

  const filteredMembers = searchQuery.trim() === ''
    ? (members || [])
    : (members || []).filter(member =>
        member.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email?.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const selectedMembers = members?.filter(member => formData.choirMembers?.includes(member.id.toString())) || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name) {
      return;
    }

    try {
      await createChoir.mutateAsync(formData);

      // Reset form on success
      setFormData({
        name: '',
        choirMembers: [],
      });
      setSearchQuery('');

    } catch (error) {
      console.error('Error adding choir:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black uppercase transform -rotate-1 mb-2">
            Add New Choir
          </h1>
          <p className="text-lg font-bold text-gray-600">
            Create a new choir group for the church
          </p>
        </div>

        {/* Success/Error Messages */}
        {createChoir.isSuccess && (
          <Card className="mb-6 bg-green-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <p className="font-black text-lg">Choir added successfully!</p>
              </div>
            </CardContent>
          </Card>
        )}

        {createChoir.isError && (
          <Card className="mb-6 bg-red-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-red-600" />
                <p className="font-black text-lg">Failed to add choir. Please try again.</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Form */}
        <Card className="bg-pink-100 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="bg-pink-400 border-b-4 border-black">
            <CardTitle className="uppercase flex items-center gap-2">
              <Music className="w-6 h-6" />
              Choir Information
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Choir Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-black uppercase flex items-center gap-2">
                  <Music className="w-4 h-4" />
                  Choir Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Salvation Siblings Choir"
                  className="h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
                  required
                />
              </div>

              {/* Choir Members Selection */}
              <div className="space-y-2">
                <Label htmlFor="members" className="text-sm font-black uppercase flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Choir Members
                </Label>

                {/* Search Input */}
                <div className="relative mb-2">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search members by name or email..."
                    className="h-12 pl-10 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
                  />
                </div>

                {/* Selected Members Display */}
                {selectedMembers.length > 0 && (
                  <Card className="bg-green-100 border-4 border-black mb-2">
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-black">{selectedMembers.length} member(s) selected</p>
                        <Button
                          type="button"
                          onClick={() => setFormData({ ...formData, choirMembers: [] })}
                          className="bg-red-400 border-2 border-black font-black text-sm"
                        >
                          Clear All
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {selectedMembers.map(member => (
                          <div key={member.id} className="flex items-center justify-between p-2 bg-white border-2 border-black">
                            <div>
                              <p className="font-black">{member.firstName} {member.lastName}</p>
                              <p className="text-sm font-bold text-gray-600">{member.email}</p>
                            </div>
                            <Button
                              type="button"
                              onClick={() => {
                                const newMembers = formData.choirMembers?.filter(id => id !== member.id.toString()) || [];
                                setFormData({ ...formData, choirMembers: newMembers });
                              }}
                              className="bg-red-400 border-2 border-black font-black text-sm"
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Members List */}
                <div className="border-4 border-black bg-white max-h-[300px] overflow-y-auto">
                  {isLoadingMembers ? (
                    <p className="text-center font-bold text-gray-500 py-8">Loading members...</p>
                  ) : filteredMembers.length === 0 ? (
                    <p className="text-center font-bold text-gray-500 py-8">
                      {searchQuery ? 'No members found' : 'No members available'}
                    </p>
                  ) : (
                    <div className="divide-y-2 divide-black">
                      {filteredMembers
                        .filter(member => !formData.choirMembers?.includes(member.id.toString()))
                        .map(member => (
                        <button
                          key={member.id}
                          type="button"
                          onClick={() => {
                            const newMembers = [...(formData.choirMembers || []), member.id.toString()];
                            setFormData({ ...formData, choirMembers: newMembers });
                          }}
                          className="w-full text-left p-4 hover:bg-blue-100 transition-colors"
                        >
                          <p className="font-black">{member.firstName} {member.lastName}</p>
                          <p className="text-sm font-bold text-gray-600">{member.email}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={createChoir.isPending}
                  className="w-full h-14 text-lg font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all bg-pink-400 disabled:opacity-50"
                >
                  {createChoir.isPending ? (
                    'Adding Choir...'
                  ) : (
                    <>
                      <Music className="w-5 h-5 mr-2" />
                      Add Choir
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
            <h3 className="font-black uppercase mb-3">Choir Creation Guidelines:</h3>
            <ul className="space-y-2 font-bold text-sm">
              <li className="flex items-start gap-2">
                <span className="text-pink-600">•</span>
                <span>Choir name is required</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-600">•</span>
                <span>Select members from existing church members</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-600">•</span>
                <span>Use search box to quickly find members</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-600">•</span>
                <span>You can add or remove multiple members to the choir</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
