'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Image as ImageIcon,
  Video,
  Upload,
  CheckCircle,
  AlertCircle,
  FileImage
} from 'lucide-react';
import { useCreateGallery } from '@/lib/hooks/useGallery';
import type { CreateGalleryInput } from '@/lib/services/gallery.service';

export default function AddGalleryPage() {
  const [formData, setFormData] = useState<CreateGalleryInput>({
    title: '',
    description: '',
    galleryItemUrl: '',
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const createGalleryItem = useCreateGallery();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title) {
      return;
    }

    try {
      await createGalleryItem.mutateAsync(formData);

      // Reset form on success
      setFormData({
        title: '',
        description: '',
        galleryItemUrl: '',
      });
      setPreviewUrl(null);

    } catch (error) {
      console.error('Error adding gallery item:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleFileUpload = async () => {
    if (!uploadedFile) return;

    setIsUploading(true);
    try {
      // Create a simple FormData for file upload
      const uploadFormData = new FormData();
      uploadFormData.append('file', uploadedFile);

      console.log(' Uploading file:', uploadedFile.name);
      console.log(' Upload endpoint:', 'https://rca-sda-backend.onrender.com/api/upload');

      // Upload file to get URL (using your existing backend API)
      const response = await fetch('https://rca-sda-backend.onrender.com/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      console.log(' Upload response status:', response.status);
      console.log(' Upload response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(' Upload failed. Response:', errorText);
        throw new Error(`File upload failed: ${response.status} ${errorText}`);
      }

      const result = await response.json();
      console.log(' Upload result:', result);

      // Set the uploaded file URL in the form
      setFormData(prev => ({
        ...prev,
        galleryItemUrl: result.url || ''
      }));

      setUploadedFile(null);
      setPreviewUrl(result.url || null);

    } catch (error: any) {
      console.error(' Upload error:', error);
      alert(`Upload failed: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black uppercase transform -rotate-1 mb-2">
            Add Gallery Item
          </h1>
          <p className="text-lg font-bold text-gray-600">
            Upload photos or videos to the church gallery
          </p>
        </div>

        {/* Success/Error Messages */}
        {createGalleryItem.isSuccess && (
          <Card className="mb-6 bg-green-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <p className="font-black text-lg">Gallery item uploaded successfully!</p>
              </div>
            </CardContent>
          </Card>
        )}

        {createGalleryItem.isError && (
          <Card className="mb-6 bg-red-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-red-600" />
                <p className="font-black text-lg">Failed to upload. Please try again.</p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <Card className="bg-purple-100 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader className="bg-purple-400 border-b-4 border-black">
              <CardTitle className="uppercase flex items-center gap-2">
                <Upload className="w-6 h-6" />
                Media Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-black uppercase flex items-center gap-2">
                    <FileImage className="w-4 h-4" />
                    Title *
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter media title"
                    className="h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-black uppercase">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Add a description (optional)"
                    className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold resize-none"
                  />
                </div>

                {/* Gallery Item URL */}
                <div className="space-y-2">
                  <Label htmlFor="galleryItemUrl" className="text-sm font-black uppercase">
                    Gallery Item URL *
                  </Label>
                  <Input
                    id="galleryItemUrl"
                    name="galleryItemUrl"
                    type="url"
                    required
                    value={formData.galleryItemUrl}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    className="h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={createGalleryItem.isPending}
                    className="w-full h-14 text-lg font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all bg-purple-400 disabled:opacity-50"
                  >
                    {createGalleryItem.isPending ? (
                      'Adding Gallery Item...'
                    ) : (
                      <>
                        <Upload className="w-5 h-5 mr-2" />
                        Add Gallery Item
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card className="bg-gray-100 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader className="bg-gray-300 border-b-4 border-black">
              <CardTitle className="uppercase flex items-center gap-2">
                <ImageIcon className="w-6 h-6" />
                Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {formData.galleryItemUrl ? (
                <div className="space-y-4">
                  <div className="aspect-video bg-black rounded-lg overflow-hidden border-4 border-black">
                    <img
                      src={formData.galleryItemUrl}
                      alt="Preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {formData.title && (
                    <div>
                      <h3 className="font-black text-lg">{formData.title}</h3>
                      {formData.description && (
                        <p className="text-sm font-bold text-gray-600 mt-2">
                          {formData.description}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-video bg-gray-200 rounded-lg border-4 border-black flex items-center justify-center">
                  <div className="text-center">
                    <ImageIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <p className="font-black text-gray-500">
                      No URL provided
                    </p>
                    <p className="text-sm font-bold text-gray-400 mt-2">
                      Enter a gallery item URL to see preview
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Info Card */}
        <Card className="mt-6 bg-yellow-100 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="pt-6">
            <h3 className="font-black uppercase mb-3">Upload Guidelines:</h3>
            <ul className="space-y-2 font-bold text-sm">
              <li className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>Photos: JPG, PNG, or GIF format (max 10MB)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>Videos: MP4, MOV, or AVI format (max 100MB)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>Use descriptive titles for better searchability</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>Ensure content is appropriate for church gallery</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
