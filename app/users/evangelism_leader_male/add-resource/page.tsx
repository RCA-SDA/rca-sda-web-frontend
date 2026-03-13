'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Save, ArrowLeft, Link as LinkIcon, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useCreateResource, useUploadCoverImage } from '@/lib/hooks/useResource';
import { type CreateResourceInput } from '@/lib/services/resource.service';

export default function AddResourcePage() {
  const [formData, setFormData] = useState<CreateResourceInput>({
    title: '',
    description: '',
    coverUrl: '',
    externalUrl: '',
    category: 'HEALTH',
  });

  const [coverFile, setCoverFile] = useState<File | null>(null);

  const createResource = useCreateResource();
  const uploadCoverImage = useUploadCoverImage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      return;
    }

    try {
      // Upload cover image first if selected
      let coverUrl = formData.coverUrl;
      if (coverFile) {
        const uploadResult = await uploadCoverImage.mutateAsync(coverFile);
        coverUrl = uploadResult.url;
      }

      // Create resource with cover URL
      await createResource.mutateAsync({
        ...formData,
        coverUrl,
      });

      // Reset form on success
      setFormData({
        title: '',
        description: '',
        coverUrl: '',
        externalUrl: '',
        category: 'HEALTH',
      });
      setCoverFile(null);

    } catch (error) {
      console.error('Error creating resource:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (value: string) => {
    setFormData({
      ...formData,
      category: value as CreateResourceInput['category'],
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black uppercase transform -rotate-1 mb-2">
              Add Resource
            </h1>
            <p className="text-lg font-bold text-gray-600">
              Share valuable evangelism resources
            </p>
          </div>
          <Link href="/users/evangelism_leader_male">
            <Button className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all bg-gray-200">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Success/Error Messages */}
        {createResource.isSuccess && (
          <Card className="mb-6 bg-green-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <p className="font-black text-lg">Resource added successfully!</p>
              </div>
            </CardContent>
          </Card>
        )}

        {createResource.isError && (
          <Card className="mb-6 bg-red-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-red-600" />
                <p className="font-black text-lg">Failed to add resource. Please try again.</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Form */}
        <Card className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="bg-cyan-200 border-b-4 border-black">
            <CardTitle className="uppercase flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              Resource Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <Label htmlFor="title" className="text-sm font-black uppercase mb-2 block">
                  Resource Title *
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                  placeholder="Enter resource title"
                />
              </div>

              {/* Category */}
              <div>
                <Label htmlFor="category" className="text-sm font-black uppercase mb-2 block">
                  Category *
                </Label>
                <Select value={formData.category} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="border-4 border-black">
                    <SelectItem value="HEALTH" className="font-bold">Health</SelectItem>
                    <SelectItem value="EDUCATION" className="font-bold">Education</SelectItem>
                    <SelectItem value="SPIRITUAL" className="font-bold">Spiritual</SelectItem>
                    <SelectItem value="COMMUNITY" className="font-bold">Community</SelectItem>
                    <SelectItem value="OUTREACH" className="font-bold">Outreach</SelectItem>
                    <SelectItem value="ADMINISTRATION" className="font-bold">Administration</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Cover Image Upload */}
              <div>
                <Label htmlFor="coverImage" className="text-sm font-black uppercase mb-2 block">
                  Cover Image
                </Label>
                <div className="space-y-2">
                  <Input
                    id="coverImage"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                  />
                  {coverFile && (
                    <p className="text-sm text-gray-600">Selected: {coverFile.name}</p>
                  )}
                  {uploadCoverImage.isPending && (
                    <p className="text-sm text-blue-600">Uploading image...</p>
                  )}
                </div>
              </div>

              {/* External URL */}
              <div>
                <Label htmlFor="externalUrl" className="text-sm font-black uppercase mb-2 block">
                  External URL (Optional)
                </Label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    id="externalUrl"
                    name="externalUrl"
                    type="url"
                    value={formData.externalUrl}
                    onChange={handleChange}
                    className="border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all pl-10"
                    placeholder="https://example.com/resource"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description" className="text-sm font-black uppercase mb-2 block">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all resize-none"
                  placeholder="Describe the resource and how it can help with evangelism..."
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={createResource.isPending || uploadCoverImage.isPending}
                  className="flex-1 h-14 text-lg font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all bg-cyan-400 disabled:opacity-50"
                >
                  {createResource.isPending || uploadCoverImage.isPending ? (
                    'Adding...'
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" />
                      Add Resource
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
