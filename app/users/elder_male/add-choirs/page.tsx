'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Music, Users, CheckCircle, AlertCircle, User, Search } from 'lucide-react';

interface Member {
  id: string;
  name: string;
  email: string;
  family: string;
  role: string;
}

export default function AddChoirsPage() {
  const [formData, setFormData] = useState({
    choirName: '',
    description: '',
    leaderId: '',
    memberCount: '',
  });
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoadingMembers, setIsLoadingMembers] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Fetch members list
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setIsLoadingMembers(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - replace with actual API call
        const mockMembers: Member[] = [
          { id: '1', name: 'John Smith', email: 'john@example.com', family: 'Salvation Siblings', role: 'Member' },
          { id: '2', name: 'Sarah Johnson', email: 'sarah@example.com', family: 'Ebenezer', role: 'Choir Secretary' },
          { id: '3', name: 'Michael Brown', email: 'michael@example.com', family: 'Salvation Siblings', role: 'Father' },
          { id: '4', name: 'Emily Davis', email: 'emily@example.com', family: 'Jehova-nissi', role: 'Mother' },
          { id: '5', name: 'David Wilson', email: 'david@example.com', family: 'Ebenezer', role: 'Member' },
          { id: '6', name: 'Lisa Anderson', email: 'lisa@example.com', family: 'Salvation Siblings', role: 'Choir Secretary' },
          { id: '7', name: 'James Taylor', email: 'james@example.com', family: 'Jehova-nissi', role: 'Leader' },
          { id: '8', name: 'Mary Martinez', email: 'mary@example.com', family: 'Ebenezer', role: 'Member' },
        ];
        
        setMembers(mockMembers);
      } catch (error) {
        console.error('Error fetching members:', error);
      } finally {
        setIsLoadingMembers(false);
      }
    };

    fetchMembers();
  }, []);

  const filteredMembers = searchQuery.trim() === ''
    ? members
    : members.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const selectedLeader = members.find(m => m.id === formData.leaderId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.choirName || !formData.leaderId) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Adding choir:', {
        ...formData,
        leaderName: selectedLeader?.name,
        leaderEmail: selectedLeader?.email,
        createdBy: 'current-user-id',
        createdAt: new Date(),
      });
      
      setSubmitStatus('success');
      
      // Reset form
      setTimeout(() => {
        setFormData({
          choirName: '',
          description: '',
          leaderId: '',
          memberCount: '',
        });
        setSearchQuery('');
        setSubmitStatus('idle');
      }, 3000);
      
    } catch (error) {
      console.error('Error adding choir:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
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
        {submitStatus === 'success' && (
          <Card className="mb-6 bg-green-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <p className="font-black text-lg">Choir added successfully!</p>
              </div>
            </CardContent>
          </Card>
        )}

        {submitStatus === 'error' && (
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
                <Label htmlFor="choirName" className="text-sm font-black uppercase flex items-center gap-2">
                  <Music className="w-4 h-4" />
                  Choir Name *
                </Label>
                <Input
                  id="choirName"
                  value={formData.choirName}
                  onChange={(e) => setFormData({ ...formData, choirName: e.target.value })}
                  placeholder="e.g., Salvation Siblings Choir"
                  className="h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-black uppercase">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the choir's purpose and activities..."
                  className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold min-h-[120px] resize-none"
                />
              </div>

              {/* Choir Leader Selection */}
              <div className="space-y-2">
                <Label htmlFor="leader" className="text-sm font-black uppercase flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Choir Leader *
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

                {/* Selected Leader Display */}
                {selectedLeader && (
                  <Card className="bg-green-100 border-4 border-black mb-2">
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-black">{selectedLeader.name}</p>
                          <p className="text-sm font-bold text-gray-600">{selectedLeader.email}</p>
                          <p className="text-sm font-bold text-gray-600">
                            {selectedLeader.family} • {selectedLeader.role}
                          </p>
                        </div>
                        <Button
                          type="button"
                          onClick={() => setFormData({ ...formData, leaderId: '' })}
                          className="bg-red-400 border-2 border-black font-black text-sm"
                        >
                          Remove
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Members List */}
                {!selectedLeader && (
                  <div className="border-4 border-black bg-white max-h-[300px] overflow-y-auto">
                    {isLoadingMembers ? (
                      <p className="text-center font-bold text-gray-500 py-8">Loading members...</p>
                    ) : filteredMembers.length === 0 ? (
                      <p className="text-center font-bold text-gray-500 py-8">
                        {searchQuery ? 'No members found' : 'No members available'}
                      </p>
                    ) : (
                      <div className="divide-y-2 divide-black">
                        {filteredMembers.map(member => (
                          <button
                            key={member.id}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, leaderId: member.id });
                              setSearchQuery('');
                            }}
                            className="w-full text-left p-4 hover:bg-blue-100 transition-colors"
                          >
                            <p className="font-black">{member.name}</p>
                            <p className="text-sm font-bold text-gray-600">{member.email}</p>
                            <p className="text-sm font-bold text-gray-600">
                              {member.family} • {member.role}
                            </p>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Member Count */}
              <div className="space-y-2">
                <Label htmlFor="memberCount" className="text-sm font-black uppercase flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Initial Member Count
                </Label>
                <Input
                  id="memberCount"
                  type="number"
                  min="0"
                  value={formData.memberCount}
                  onChange={(e) => setFormData({ ...formData, memberCount: e.target.value })}
                  placeholder="Number of members"
                  className="h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 text-lg font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all bg-pink-400 disabled:opacity-50"
                >
                  {isSubmitting ? (
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
                <span>All fields marked with * are required</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-600">•</span>
                <span>Select a choir leader from existing church members</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-600">•</span>
                <span>Use the search box to quickly find members</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-600">•</span>
                <span>You can add songs and members to the choir after creation</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
