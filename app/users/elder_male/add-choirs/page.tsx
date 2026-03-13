'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Music, CheckCircle, AlertCircle } from 'lucide-react';
import { useCreateChoir } from '@/lib/hooks/useChoir';
import type { CreateChoirInput } from '@/lib/services/choir.service';

export default function AddChoirsPage() {
  const [formData, setFormData] = useState<CreateChoirInput>({
    name: '',
  });
  const createChoir = useCreateChoir();

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
      });

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
                <span>You can add songs and members to the choir after creation</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
