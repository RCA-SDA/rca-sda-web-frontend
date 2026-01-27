'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  FolderPlus,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function CreateFamilyPage() {
  const [formData, setFormData] = useState({
    familyName: '',
    fatherName: '',
    fatherEmail: '',
    fatherPhone: '',
    fatherDOB: '',
    address: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      
      console.log('Creating family:', formData);
      
      setSubmitStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          familyName: '',
          fatherName: '',
          fatherEmail: '',
          fatherPhone: '',
          fatherDOB: '',
          address: '',
        });
        setSubmitStatus('idle');
      }, 3000);
      
    } catch (error) {
      console.error('Error creating family:', error);
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

                <div className="space-y-4">
                  {/* Father Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fatherName" className="text-sm font-black uppercase">
                      Father's Full Name *
                    </Label>
                    <Input
                      id="fatherName"
                      name="fatherName"
                      type="text"
                      required
                      value={formData.fatherName}
                      onChange={handleInputChange}
                      placeholder="e.g., John Smith"
                      className="h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
                    />
                  </div>

                  {/* Email and Phone */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fatherEmail" className="text-sm font-black uppercase flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email *
                      </Label>
                      <Input
                        id="fatherEmail"
                        name="fatherEmail"
                        type="email"
                        required
                        value={formData.fatherEmail}
                        onChange={handleInputChange}
                        placeholder="father@example.com"
                        className="h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fatherPhone" className="text-sm font-black uppercase flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Phone *
                      </Label>
                      <Input
                        id="fatherPhone"
                        name="fatherPhone"
                        type="tel"
                        required
                        value={formData.fatherPhone}
                        onChange={handleInputChange}
                        placeholder="+250 788 123 456"
                        className="h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
                      />
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div className="space-y-2">
                    <Label htmlFor="fatherDOB" className="text-sm font-black uppercase flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Date of Birth *
                    </Label>
                    <Input
                      id="fatherDOB"
                      name="fatherDOB"
                      type="date"
                      required
                      value={formData.fatherDOB}
                      onChange={handleInputChange}
                      className="h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-sm font-black uppercase flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Address *
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      type="text"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="e.g., Kigali, Rwanda"
                      className="h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 text-lg font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all bg-purple-400 disabled:opacity-50"
                >
                  {isSubmitting ? (
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
                <span>Father will receive login credentials via email</span>
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
