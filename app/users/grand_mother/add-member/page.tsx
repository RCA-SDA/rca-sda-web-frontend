'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  UserPlus,
  User,
  Users,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { useFamilies, useAllUsers, useAddMemberToFamily } from '@/lib/hooks/useFamily';
import { Family, User as UserType } from '@/lib/services/family.service';

export default function AddMemberPage() {
  const [formData, setFormData] = useState({
    familyId: '',
    memberId: '',
    memberRole: 'child',
  });

  // Fetch families and users using React Query
  const { data: families = [], isLoading: isLoadingFamilies, error: familiesError } = useFamilies();
  const { data: users = [], isLoading: isLoadingUsers, error: usersError } = useAllUsers();
  const addMemberMutation = useAddMemberToFamily();

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const memberRoles = [
    { value: 'child', label: 'Child' },
    { value: 'youth', label: 'Youth' },
    { value: 'other', label: 'Other' },
  ];

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
    setSubmitStatus('idle');

    try {
      const result = await addMemberMutation.mutateAsync({
        familyId: parseInt(formData.familyId),
        userId: parseInt(formData.memberId),
      });

      console.log('Member added to family successfully:', result);
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
    }
  };

  if (isLoadingFamilies || isLoadingUsers) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
          <p className="text-lg font-bold">Loading families and members...</p>
        </div>
      </div>
    );
  }

  if (familiesError || usersError) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <Card className="bg-red-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="p-8 text-center">
            <p className="text-lg font-black">Failed to load data</p>
            <p className="text-sm text-gray-600 mt-2">Please try again later</p>
          </CardContent>
        </Card>
      </div>
    );
  }

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
                  disabled={isLoadingFamilies || !!familiesError}
                >
                  <SelectTrigger className="h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold">
                    <SelectValue placeholder={isLoadingFamilies ? "Loading families..." : familiesError ? "Error loading families" : "Choose a family..."} />
                  </SelectTrigger>
                  <SelectContent className="border-4 border-black">
                    {isLoadingFamilies ? (
                      <SelectItem value="loading" disabled>Loading families...</SelectItem>
                    ) : familiesError ? (
                      <SelectItem value="error" disabled>Error loading families</SelectItem>
                    ) : families.length === 0 ? (
                      <SelectItem value="no-families" disabled>No families available</SelectItem>
                    ) : (
                      families.map((family: Family) => (
                        <SelectItem key={family.id.toString()} value={family.id.toString()} className="font-bold">
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
                  disabled={isLoadingUsers || !!usersError}
                >
                  <SelectTrigger className="h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold">
                    <SelectValue placeholder={isLoadingUsers ? "Loading members..." : usersError ? "Error loading members" : "Choose a member..."} />
                  </SelectTrigger>
                  <SelectContent className="border-4 border-black">
                    {isLoadingUsers ? (
                      <SelectItem value="loading" disabled>Loading members...</SelectItem>
                    ) : usersError ? (
                      <SelectItem value="error" disabled>Error loading members</SelectItem>
                    ) : users.length === 0 ? (
                      <SelectItem value="no-members" disabled>No members available</SelectItem>
                    ) : (
                      users.map((user: UserType) => (
                        <SelectItem key={user.id.toString()} value={user.id.toString()} className="font-bold">
                          {user.firstName} {user.lastName} - {user.email}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                {formData.memberId && (
                  <p className="text-sm font-bold text-gray-600 mt-2">
                    Selected: {users.find((u: UserType) => u.id.toString() === formData.memberId)?.firstName} {users.find((u: UserType) => u.id.toString() === formData.memberId)?.lastName}
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
                  disabled={addMemberMutation.isPending}
                  className="w-full h-14 text-lg font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all bg-blue-400 disabled:opacity-50"
                >
                  {addMemberMutation.isPending ? (
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
        <Card className="mt-6 bg-blue-100 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="pt-6">
            <h3 className="font-black uppercase mb-3">Important Notes:</h3>
            <ul className="space-y-2 font-bold text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span>Select a family from the dropdown list</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span>Choose a member to add to the selected family</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span>Specify the member's role in the family</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span>The member will receive notification of the family assignment</span>
              </li>
            </ul>

            {families.length === 0 && (
              <div className="mt-4 p-3 bg-yellow-200 border-2 border-black">
                <p className="font-black text-sm">No families available. Create families first before adding members.</p>
              </div>
            )}

            {users.length === 0 && (
              <div className="mt-4 p-3 bg-yellow-200 border-2 border-black">
                <p className="font-black text-sm">No members available. Create members first before adding them to families.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
