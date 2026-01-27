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

export default function AddGalleryPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    mediaType: 'image',
    file: null as File | null,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
      file: null, // Reset file when media type changes
    }));
    setPreviewUrl(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      file
    }));

    // Create preview URL
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call with file upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Adding gallery item:', {
        ...formData,
        fileName: formData.file?.name,
        fileSize: formData.file?.size,
      });
      
      setSubmitStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          title: '',
          description: '',
          mediaType: 'image',
          file: null,
        });
        setPreviewUrl(null);
        setSubmitStatus('idle');
      }, 3000);
      
    } catch (error) {
      console.error('Error adding gallery item:', error);
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
            Add Gallery Item
          </h1>
          <p className="text-lg font-bold text-gray-600">
            Upload photos or videos to the church gallery
          </p>
        </div>

        {/* Success/Error Messages */}
        {submitStatus === 'success' && (
          <Card className="mb-6 bg-green-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <p className="font-black text-lg">Gallery item uploaded successfully!</p>
              </div>
            </CardContent>
          </Card>
        )}

        {submitStatus === 'error' && (
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

                {/* Media Type */}
                <div className="space-y-2">
                  <Label htmlFor="mediaType" className="text-sm font-black uppercase">
                    Media Type *
                  </Label>
                  <Select
                    value={formData.mediaType}
                    onValueChange={(value) => handleSelectChange('mediaType', value)}
                    required
                  >
                    <SelectTrigger className="h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-4 border-black">
                      <SelectItem value="image" className="font-bold">
                        <div className="flex items-center gap-2">
                          <ImageIcon className="w-4 h-4" />
                          Photo
                        </div>
                      </SelectItem>
                      <SelectItem value="video" className="font-bold">
                        <div className="flex items-center gap-2">
                          <Video className="w-4 h-4" />
                          Video
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <Label htmlFor="file" className="text-sm font-black uppercase">
                    {formData.mediaType === 'image' ? 'Photo File' : 'Video File'} *
                  </Label>
                  <Input
                    id="file"
                    name="file"
                    type="file"
                    required
                    accept={formData.mediaType === 'image' ? 'image/*' : 'video/*'}
                    onChange={handleFileChange}
                    className="h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold cursor-pointer"
                  />
                  {formData.file && (
                    <p className="text-sm font-bold text-gray-600">
                      Selected: {formData.file.name} ({(formData.file.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 text-lg font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all bg-purple-400 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      'Uploading...'
                    ) : (
                      <>
                        <Upload className="w-5 h-5 mr-2" />
                        Upload Media
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
              {previewUrl ? (
                <div className="space-y-4">
                  {formData.mediaType === 'image' ? (
                    <div className="aspect-video bg-black rounded-lg overflow-hidden border-4 border-black">
                      <img 
                        src={previewUrl} 
                        alt="Preview"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-black rounded-lg overflow-hidden border-4 border-black">
                      <video 
                        src={previewUrl}
                        controls
                        className="w-full h-full"
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
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
                    {formData.mediaType === 'image' ? (
                      <ImageIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    ) : (
                      <Video className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    )}
                    <p className="font-black text-gray-500">
                      No {formData.mediaType === 'image' ? 'photo' : 'video'} selected
                    </p>
                    <p className="text-sm font-bold text-gray-400 mt-2">
                      Upload a file to see preview
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
