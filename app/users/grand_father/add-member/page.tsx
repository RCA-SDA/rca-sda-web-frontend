'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  UserPlus,
  User,
  Users,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
}

interface Family {
  id: string;
  name: string;
}

export default function AddMemberPage() {
  const [formData, setFormData] = useState({
    familyId: '',
    memberId: '',
    memberRole: 'child',
  });

  const [families, setFamilies] = useState<Family[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoadingFamilies, setIsLoadingFamilies] = useState(true);
  const [isLoadingMembers, setIsLoadingMembers] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const memberRoles = [
    { value: 'child', label: 'Child' },
    { value: 'youth', label: 'Youth' },
    { value: 'other', label: 'Other' },
  ];

  // Fetch families list
  useEffect(() => {
    const fetchFamilies = async () => {
      try {
        setIsLoadingFamilies(true);
        // Simulate API call - replace with actual API endpoint
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - replace with actual API response
        const mockFamilies: Family[] = [
          { id: '1', name: 'Salvation Siblings' },
          { id: '2', name: 'Grace Family' },
          { id: '3', name: 'Faith Warriors' },
        ];
        
        setFamilies(mockFamilies);
      } catch (error) {
        console.error('Error fetching families:', error);
      } finally {
        setIsLoadingFamilies(false);
      }
    };

    fetchFamilies();
  }, []);

  // Fetch members list
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setIsLoadingMembers(true);
        // Simulate API call - replace with actual API endpoint
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - replace with actual API response
        const mockMembers: Member[] = [
          { id: '1', name: 'John Doe', email: 'john@example.com', phone: '+250 788 111 111', gender: 'male' },
          { id: '2', name: 'Michael Smith', email: 'michael@example.com', phone: '+250 788 222 222', gender: 'male' },
          { id: '3', name: 'David Johnson', email: 'david@example.com', phone: '+250 788 333 333', gender: 'male' },
          { id: '4', name: 'Robert Brown', email: 'robert@example.com', phone: '+250 788 444 444', gender: 'male' },
          { id: '5', name: 'Jane Doe', email: 'jane@example.com', phone: '+250 788 555 555', gender: 'female' },
          { id: '6', name: 'Sarah Smith', email: 'sarah@example.com', phone: '+250 788 666 666', gender: 'female' },
          { id: '7', name: 'Emily Johnson', email: 'emily@example.com', phone: '+250 788 777 777', gender: 'female' },
          { id: '8', name: 'Mary Brown', email: 'mary@example.com', phone: '+250 788 888 888', gender: 'female' },
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

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Adding member:', formData);
      
      setSubmitStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          familyId: '',
          memberId: '',
          memberRole: 'child',
        });
        setSubmitStatus('idle');
      }, 3000);
      
    } catch (error) {
      console.error('Error adding member:', error);
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
            Add Family Member
          </h1>
          <p className="text-lg font-bold text-gray-600">
            Add a new member to an existing family
          </p>
        </div>

        {/* Success/Error Messages */}
        {submitStatus === 'success' && (
          <Card className="mb-6 bg-green-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <p className="font-black text-lg">Member added successfully!</p>
              </div>
            </CardContent>
          </Card>
        )}

        {submitStatus === 'error' && (
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
        <Card className="bg-blue-100 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="bg-blue-400 border-b-4 border-black">
            <CardTitle className="uppercase flex items-center gap-2">
              <UserPlus className="w-6 h-6" />
              Member Information
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Select Family */}
              <div className="space-y-2">
                <Label htmlFor="familyId" className="text-sm font-black uppercase flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Select Family *
                </Label>
                <Select
                  value={formData.familyId}
                  onValueChange={(value) => handleSelectChange('familyId', value)}
                  required
                >
                  <SelectTrigger className="h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold">
                    <SelectValue placeholder={isLoadingFamilies ? "Loading families..." : "Choose a family..."} />
                  </SelectTrigger>
                  <SelectContent className="border-4 border-black">
                    {isLoadingFamilies ? (
                      <SelectItem value="loading" disabled>Loading families...</SelectItem>
                    ) : families.length === 0 ? (
                      <SelectItem value="no-families" disabled>No families available</SelectItem>
                    ) : (
                      families.map((family) => (
                        <SelectItem key={family.id} value={family.id} className="font-bold">
                          {family.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Select Member */}
              <div className="space-y-2">
                <Label htmlFor="memberId" className="text-sm font-black uppercase flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Select Member *
                </Label>
                <Select
                  value={formData.memberId}
                  onValueChange={(value) => handleSelectChange('memberId', value)}
                  required
                >
                  <SelectTrigger className="h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold">
                    <SelectValue placeholder={isLoadingMembers ? "Loading members..." : "Choose a member..."} />
                  </SelectTrigger>
                  <SelectContent className="border-4 border-black">
                    {isLoadingMembers ? (
                      <SelectItem value="loading" disabled>Loading members...</SelectItem>
                    ) : members.length === 0 ? (
                      <SelectItem value="no-members" disabled>No members available</SelectItem>
                    ) : (
                      members.map((member) => (
                        <SelectItem key={member.id} value={member.id} className="font-bold">
                          {member.name} - {member.email}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                {formData.memberId && (
                  <p className="text-sm font-bold text-gray-600 mt-2">
                    Selected: {members.find(m => m.id === formData.memberId)?.name}
                  </p>
                )}
              </div>

              {/* Member Role */}
              <div className="space-y-2">
                <Label htmlFor="memberRole" className="text-sm font-black uppercase flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Member Role *
                </Label>
                <Select
                  value={formData.memberRole}
                  onValueChange={(value) => handleSelectChange('memberRole', value)}
                  required
                >
                  <SelectTrigger className="h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold">
                    <SelectValue placeholder="Choose a role..." />
                  </SelectTrigger>
                  <SelectContent className="border-4 border-black">
                    {memberRoles.map(role => (
                      <SelectItem key={role.value} value={role.value} className="font-bold">
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 text-lg font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all bg-blue-400 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    'Adding Member...'
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5 mr-2" />
                      Add Member
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
                <span className="text-blue-600">•</span>
                <span>Select an existing member from the list to add to a family</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span>Members will be linked to the selected family</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span>The family father will be notified of new members</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
