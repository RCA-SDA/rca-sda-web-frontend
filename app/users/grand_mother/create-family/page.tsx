'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  FolderPlus,
  User,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useMaleUsers, useFemaleUsers, useCreateFamily } from '@/lib/hooks/useFamily';
import { User as UserType } from '@/lib/services/family.service';

export default function CreateFamilyPage() {
  const [formData, setFormData] = useState({
    familyName: '',
    fatherId: '',
    motherId: '',
  });

  // Fetch male users for father selection
  const { data: maleUsers = [], isLoading: isLoadingMales, error: malesError } = useMaleUsers();

  // Fetch female users for mother selection
  const { data: femaleUsers = [], isLoading: isLoadingFemales, error: femalesError } = useFemaleUsers();

  // Create family mutation
  const createFamilyMutation = useCreateFamily();

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');

    try {
      const result = await createFamilyMutation.mutateAsync({
        name: formData.familyName,
        fatherId: formData.fatherId,
        motherId: formData.motherId,
      });

      console.log('Family created successfully:', result);
      setSubmitStatus('success');

      // Reset form after success
      setTimeout(() => {
        setFormData({
          familyName: '',
          fatherId: '',
          motherId: '',
        });
        setSubmitStatus('idle');
      }, 3000);

    } catch (error) {
      console.error('Error creating family:', error);
      setSubmitStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black uppercase transform -rotate-1 mb-2">
            Create New Family
          </h1>
          <p className="text-lg font-bold text-gray-600">
            Register a new family and assign a father
          </p>
        </div>

        {/* Success/Error Messages */}
        {submitStatus === 'success' && (
          <Card className="mb-6 bg-green-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <p className="font-black text-lg">Family created successfully!</p>
              </div>
            </CardContent>
          </Card>
        )}

        {submitStatus === 'error' && (
          <Card className="mb-6 bg-red-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-red-600" />
                <p className="font-black text-lg">Failed to create family. Please try again.</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Form */}
        <Card className="bg-purple-100 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="bg-purple-400 border-b-4 border-black">
            <CardTitle className="uppercase flex items-center gap-2">
              <FolderPlus className="w-6 h-6" />
              Family Information
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Family Name */}
              <div className="space-y-2">
                <Label htmlFor="familyName" className="text-sm font-black uppercase">
                  Family Name *
                </Label>
                <Input
                  id="familyName"
                  name="familyName"
                  type="text"
                  required
                  value={formData.familyName}
                  onChange={handleInputChange}
                  placeholder="e.g., Salvation Siblings"
                  className="h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
                />
              </div>

              {/* Father Information Section */}
              <div className="pt-6 border-t-4 border-black">
                <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Father Information
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="fatherId" className="text-sm font-black uppercase">
                    Select Father from Members *
                  </Label>
                  <Select
                    value={formData.fatherId}
                    onValueChange={(value) => handleSelectChange('fatherId', value)}
                    required
                    disabled={isLoadingMales || !!malesError}
                  >
                    <SelectTrigger className="h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold">
                      <SelectValue placeholder={isLoadingMales ? "Loading male members..." : malesError ? "Error loading members" : "Select a father"} />
                    </SelectTrigger>
                    <SelectContent className="border-4 border-black">
                      {isLoadingMales ? (
                        <SelectItem value="loading" disabled>Loading male members...</SelectItem>
                      ) : malesError ? (
                        <SelectItem value="error" disabled>Error loading members</SelectItem>
                      ) : maleUsers.length === 0 ? (
                        <SelectItem value="no-members" disabled>No male members available</SelectItem>
                      ) : (
                        maleUsers.map((user: UserType) => (
                          <SelectItem key={user.id.toString()} value={user.id.toString()} className="font-bold">
                            {user.firstName} {user.lastName} - {user.email}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  {formData.fatherId && (
                    <p className="text-sm font-bold text-gray-600 mt-2">
                      Selected: {maleUsers.find((u: UserType) => u.id.toString() === formData.fatherId)?.firstName} {maleUsers.find((u: UserType) => u.id.toString() === formData.fatherId)?.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Mother Information Section */}
              <div className="pt-6 border-t-4 border-black">
                <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Mother Information
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="motherId" className="text-sm font-black uppercase">
                    Select Mother from Members *
                  </Label>
                  <Select
                    value={formData.motherId}
                    onValueChange={(value) => handleSelectChange('motherId', value)}
                    required
                    disabled={isLoadingFemales || !!femalesError}
                  >
                    <SelectTrigger className="h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold">
                      <SelectValue placeholder={isLoadingFemales ? "Loading female members..." : femalesError ? "Error loading members" : "Select a mother"} />
                    </SelectTrigger>
                    <SelectContent className="border-4 border-black">
                      {isLoadingFemales ? (
                        <SelectItem value="loading" disabled>Loading female members...</SelectItem>
                      ) : femalesError ? (
                        <SelectItem value="error" disabled>Error loading members</SelectItem>
                      ) : femaleUsers.length === 0 ? (
                        <SelectItem value="no-members" disabled>No female members available</SelectItem>
                      ) : (
                        femaleUsers.map((user: UserType) => (
                          <SelectItem key={user.id.toString()} value={user.id.toString()} className="font-bold">
                            {user.firstName} {user.lastName} - {user.email}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  {formData.motherId && (
                    <p className="text-sm font-bold text-gray-600 mt-2">
                      Selected: {femaleUsers.find((u: UserType) => u.id.toString() === formData.motherId)?.firstName} {femaleUsers.find((u: UserType) => u.id.toString() === formData.motherId)?.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={createFamilyMutation.isPending}
                  className="w-full h-14 text-lg font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all bg-purple-400 disabled:opacity-50"
                >
                  {createFamilyMutation.isPending ? (
                    'Creating Family...'
                  ) : (
                    <>
                      <FolderPlus className="w-5 h-5 mr-2" />
                      Create Family
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
                <span className="text-purple-600">•</span>
                <span>The father will be automatically assigned as the family head</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>Both parents will receive login credentials via email</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>You can add more family members after creating the family</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
