'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { 
  Shield,
  User,
  Search,
  CheckCircle,
  AlertCircle,
  Users
} from 'lucide-react';

interface Member {
  id: string;
  name: string;
  email: string;
  currentRole: string;
  family: string;
  level: string;
}

export default function AssignRolesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [newRole, setNewRole] = useState('');
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoadingMembers, setIsLoadingMembers] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const roles = [
    'Member',
    'Father',
    'Mother',
    'Leader',
    'Choir Secretary',
    'Assistant Elder',
    'Deacon',
    'Deaconess',
  ];

  // Fetch members list
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setIsLoadingMembers(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockMembers: Member[] = [
          { id: '1', name: 'John Smith', email: 'john@example.com', currentRole: 'Member', family: 'Salvation Siblings', level: 'Y1' },
          { id: '2', name: 'Sarah Johnson', email: 'sarah@example.com', currentRole: 'Member', family: 'Ebenezer', level: 'Y2' },
          { id: '3', name: 'Michael Brown', email: 'michael@example.com', currentRole: 'Father', family: 'Salvation Siblings', level: 'Y3' },
          { id: '4', name: 'Emily Davis', email: 'emily@example.com', currentRole: 'Mother', family: 'Jehova-nissi', level: 'Y1' },
          { id: '5', name: 'David Wilson', email: 'david@example.com', currentRole: 'Member', family: 'Ebenezer', level: 'Y2' },
          { id: '6', name: 'Lisa Anderson', email: 'lisa@example.com', currentRole: 'Choir Secretary', family: 'Salvation Siblings', level: 'Y3' },
          { id: '7', name: 'James Taylor', email: 'james@example.com', currentRole: 'Member', family: 'Jehova-nissi', level: 'Y1' },
          { id: '8', name: 'Mary Martinez', email: 'mary@example.com', currentRole: 'Member', family: 'Ebenezer', level: 'Y2' },
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

  const handleMemberSelect = (memberId: string) => {
    const member = members.find(m => m.id === memberId);
    setSelectedMember(member || null);
    setNewRole(member?.currentRole || '');
    setSubmitStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember || !newRole) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Assigning role:', {
        memberId: selectedMember.id,
        memberName: selectedMember.name,
        oldRole: selectedMember.currentRole,
        newRole: newRole,
      });
      
      // Update local state
      setMembers(prev => prev.map(m => 
        m.id === selectedMember.id 
          ? { ...m, currentRole: newRole }
          : m
      ));
      
      setSubmitStatus('success');
      
      // Reset after success
      setTimeout(() => {
        setSelectedMember(null);
        setNewRole('');
        setSubmitStatus('idle');
      }, 3000);
      
    } catch (error) {
      console.error('Error assigning role:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black uppercase transform -rotate-1 mb-2">
            Assign Member Roles
          </h1>
          <p className="text-lg font-bold text-gray-600">
            Manage and update member roles in the church
          </p>
        </div>

        {/* Success/Error Messages */}
        {submitStatus === 'success' && (
          <Card className="mb-6 bg-green-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <p className="font-black text-lg">Role assigned successfully!</p>
              </div>
            </CardContent>
          </Card>
        )}

        {submitStatus === 'error' && (
          <Card className="mb-6 bg-red-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-red-600" />
                <p className="font-black text-lg">Failed to assign role. Please try again.</p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Members List */}
          <Card className="bg-blue-100 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader className="bg-blue-400 border-b-4 border-black">
              <CardTitle className="uppercase flex items-center gap-2">
                <Users className="w-6 h-6" />
                Select Member
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {/* Search */}
              <div className="mb-4">
                <Label htmlFor="search" className="text-sm font-black uppercase flex items-center gap-2 mb-2">
                  <Search className="w-4 h-4" />
                  Search Members
                </Label>
                <Input
                  id="search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or email..."
                  className="h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
                />
              </div>

              {/* Members List */}
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {isLoadingMembers ? (
                  <p className="text-center font-bold text-gray-500 py-8">Loading members...</p>
                ) : filteredMembers.length === 0 ? (
                  <p className="text-center font-bold text-gray-500 py-8">
                    {searchQuery ? 'No members found' : 'No members available'}
                  </p>
                ) : (
                  filteredMembers.map(member => (
                    <button
                      key={member.id}
                      onClick={() => handleMemberSelect(member.id)}
                      className={`w-full text-left p-4 border-4 border-black transition-all ${
                        selectedMember?.id === member.id
                          ? 'bg-green-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-1'
                          : 'bg-white hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-black">{member.name}</p>
                          <p className="text-sm font-bold text-gray-600">{member.email}</p>
                          <p className="text-sm font-bold text-gray-600 mt-1">
                            {member.family} • {member.level}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="inline-block px-3 py-1 bg-yellow-200 border-2 border-black text-xs font-black uppercase">
                            {member.currentRole}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Role Assignment Form */}
          <Card className="bg-green-100 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader className="bg-green-400 border-b-4 border-black">
              <CardTitle className="uppercase flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Assign Role
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {selectedMember ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Selected Member Info */}
                  <Card className="bg-white border-4 border-black">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-blue-400 border-4 border-black flex items-center justify-center flex-shrink-0">
                          <User className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-black text-lg">{selectedMember.name}</p>
                          <p className="text-sm font-bold text-gray-600">{selectedMember.email}</p>
                          <p className="text-sm font-bold text-gray-600 mt-1">
                            {selectedMember.family} • {selectedMember.level}
                          </p>
                          <div className="mt-3">
                            <span className="text-xs font-black uppercase text-gray-500">Current Role:</span>
                            <span className="ml-2 inline-block px-3 py-1 bg-yellow-200 border-2 border-black text-xs font-black uppercase">
                              {selectedMember.currentRole}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* New Role Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="newRole" className="text-sm font-black uppercase flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      New Role *
                    </Label>
                    <Select
                      value={newRole}
                      onValueChange={setNewRole}
                      required
                    >
                      <SelectTrigger className="h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold">
                        <SelectValue placeholder="Select a role..." />
                      </SelectTrigger>
                      <SelectContent className="border-4 border-black">
                        {roles.map(role => (
                          <SelectItem key={role} value={role} className="font-bold">
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Role Change Summary */}
                  {newRole && newRole !== selectedMember.currentRole && (
                    <Card className="bg-blue-100 border-4 border-black">
                      <CardContent className="pt-6">
                        <p className="font-black text-sm uppercase mb-2">Role Change Summary:</p>
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 bg-red-200 border-2 border-black text-sm font-black">
                            {selectedMember.currentRole}
                          </span>
                          <span className="font-black">→</span>
                          <span className="px-3 py-1 bg-green-200 border-2 border-black text-sm font-black">
                            {newRole}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Submit Button */}
                  <div className="pt-6">
                    <Button
                      type="submit"
                      disabled={isSubmitting || !newRole || newRole === selectedMember.currentRole}
                      className="w-full h-14 text-lg font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all bg-green-400 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        'Assigning Role...'
                      ) : (
                        <>
                          <Shield className="w-5 h-5 mr-2" />
                          Assign Role
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-12">
                  <User className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="font-black text-gray-500">No member selected</p>
                  <p className="text-sm font-bold text-gray-400 mt-2">
                    Select a member from the list to assign a role
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Info Card */}
        <Card className="mt-6 bg-yellow-100 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="pt-6">
            <h3 className="font-black uppercase mb-3">Role Assignment Guidelines:</h3>
            <ul className="space-y-2 font-bold text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-600">•</span>
                <span>Each member can have only one primary role at a time</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">•</span>
                <span>Role changes take effect immediately</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">•</span>
                <span>Members will be notified of role changes via email</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">•</span>
                <span>Leadership roles require additional verification</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
