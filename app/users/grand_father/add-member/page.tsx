'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  UserPlus,
  User,
  Mail,
  Phone,
  Calendar,
  Users,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function AddMemberPage() {
  const [formData, setFormData] = useState({
    familyId: '',
    memberName: '',
    memberEmail: '',
    memberPhone: '',
    memberDOB: '',
    memberRole: 'mother',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Mock families data - replace with actual API call
  const families = [
    { id: '1', name: 'Salvation Siblings' },
    { id: '2', name: 'Grace Family' },
    { id: '3', name: 'Faith Warriors' },
  ];

  const memberRoles = [
    { value: 'mother', label: 'Mother' },
    { value: 'youth', label: 'Youth' },
    { value: 'child', label: 'Child' },
  ];

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
          memberName: '',
          memberEmail: '',
          memberPhone: '',
          memberDOB: '',
          memberRole: 'mother',
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
                <select
                  id="familyId"
                  name="familyId"
                  required
                  value={formData.familyId}
                  onChange={handleInputChange}
                  className="w-full h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold px-4 bg-white"
                >
                  <option value="">Choose a family...</option>
                  {families.map(family => (
                    <option key={family.id} value={family.id}>
                      {family.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Member Role */}
              <div className="space-y-2">
                <Label htmlFor="memberRole" className="text-sm font-black uppercase flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Member Role *
                </Label>
                <select
                  id="memberRole"
                  name="memberRole"
                  required
                  value={formData.memberRole}
                  onChange={handleInputChange}
                  className="w-full h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold px-4 bg-white"
                >
                  {memberRoles.map(role => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Member Name */}
              <div className="space-y-2">
                <Label htmlFor="memberName" className="text-sm font-black uppercase">
                  Full Name *
                </Label>
                <Input
                  id="memberName"
                  name="memberName"
                  type="text"
                  required
                  value={formData.memberName}
                  onChange={handleInputChange}
                  placeholder="e.g., Sarah Smith"
                  className="h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
                />
              </div>

              {/* Email and Phone */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="memberEmail" className="text-sm font-black uppercase flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </Label>
                  <Input
                    id="memberEmail"
                    name="memberEmail"
                    type="email"
                    value={formData.memberEmail}
                    onChange={handleInputChange}
                    placeholder="member@example.com"
                    className="h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="memberPhone" className="text-sm font-black uppercase flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone
                  </Label>
                  <Input
                    id="memberPhone"
                    name="memberPhone"
                    type="tel"
                    value={formData.memberPhone}
                    onChange={handleInputChange}
                    placeholder="+250 788 123 456"
                    className="h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
                  />
                </div>
              </div>

              {/* Date of Birth */}
              <div className="space-y-2">
                <Label htmlFor="memberDOB" className="text-sm font-black uppercase flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Date of Birth *
                </Label>
                <Input
                  id="memberDOB"
                  name="memberDOB"
                  type="date"
                  required
                  value={formData.memberDOB}
                  onChange={handleInputChange}
                  className="h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
                />
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
                <span>Email and phone are optional for children</span>
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
