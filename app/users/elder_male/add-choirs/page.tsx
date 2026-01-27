'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Music, Upload, CheckCircle, AlertCircle } from 'lucide-react';

export default function AddChoirsPage() {
  const [formData, setFormData] = useState({
    title: '',
    choirName: '',
    lyrics: '',
  });
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.choirName || !formData.lyrics) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Adding choir song:', {
        ...formData,
        audioFile: audioFile?.name,
        uploadedBy: 'current-user-id',
        createdAt: new Date(),
      });
      
      setSubmitStatus('success');
      
      // Reset form
      setTimeout(() => {
        setFormData({ title: '', choirName: '', lyrics: '' });
        setAudioFile(null);
        
        // Clear file input
        const fileInput = document.getElementById('audio-file') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
        
        setSubmitStatus('idle');
      }, 3000);
      
    } catch (error) {
      console.error('Error adding song:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black uppercase transform -rotate-1 mb-2">
            Add Choir Song
          </h1>
          <p className="text-lg font-bold text-gray-600">
            Upload a new song for the choir
          </p>
        </div>

        {/* Success/Error Messages */}
        {submitStatus === 'success' && (
          <Card className="mb-6 bg-green-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <p className="font-black text-lg">Song added successfully!</p>
              </div>
            </CardContent>
          </Card>
        )}

        {submitStatus === 'error' && (
          <Card className="mb-6 bg-red-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-red-600" />
                <p className="font-black text-lg">Failed to add song. Please try again.</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Form */}
        <Card className="bg-pink-100 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="bg-pink-400 border-b-4 border-black">
            <CardTitle className="uppercase flex items-center gap-2">
              <Music className="w-6 h-6" />
              Song Details
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Song Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-black uppercase">
                  Song Title *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter song title"
                  className="h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
                  required
                />
              </div>

              {/* Choir Name */}
              <div className="space-y-2">
                <Label htmlFor="choirName" className="text-sm font-black uppercase">
                  Choir Name *
                </Label>
                <Select
                  value={formData.choirName}
                  onValueChange={(value) => setFormData({ ...formData, choirName: value })}
                  required
                >
                  <SelectTrigger className="h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold">
                    <SelectValue placeholder="Select choir" />
                  </SelectTrigger>
                  <SelectContent className="border-4 border-black">
                    <SelectItem value="Salvation Siblings Choir" className="font-bold">
                      Salvation Siblings Choir
                    </SelectItem>
                    <SelectItem value="Ebenezer Choir" className="font-bold">
                      Ebenezer Choir
                    </SelectItem>
                    <SelectItem value="Jehova-nissi Choir" className="font-bold">
                      Jehova-nissi Choir
                    </SelectItem>
                    <SelectItem value="Combined Youth Choir" className="font-bold">
                      Combined Youth Choir
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Lyrics */}
              <div className="space-y-2">
                <Label htmlFor="lyrics" className="text-sm font-black uppercase">
                  Lyrics *
                </Label>
                <Textarea
                  id="lyrics"
                  value={formData.lyrics}
                  onChange={(e) => setFormData({ ...formData, lyrics: e.target.value })}
                  placeholder="Enter song lyrics..."
                  className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold min-h-[200px] resize-none"
                  required
                />
              </div>

              {/* Audio File */}
              <div className="space-y-2">
                <Label htmlFor="audio-file" className="text-sm font-black uppercase">
                  Audio File (Optional)
                </Label>
                <Input
                  id="audio-file"
                  type="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                  className="h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold cursor-pointer"
                />
                {audioFile && (
                  <p className="text-sm font-bold text-green-600 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    {audioFile.name} ({(audioFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 text-lg font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all bg-pink-400 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    'Adding Song...'
                  ) : (
                    <>
                      <Upload className="w-5 h-5 mr-2" />
                      Add Song
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
            <h3 className="font-black uppercase mb-3">Song Upload Guidelines:</h3>
            <ul className="space-y-2 font-bold text-sm">
              <li className="flex items-start gap-2">
                <span className="text-pink-600">•</span>
                <span>All fields marked with * are required</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-600">•</span>
                <span>Audio files: MP3, WAV, or M4A format (max 20MB)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-600">•</span>
                <span>Include complete lyrics for better choir practice</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-600">•</span>
                <span>Audio file is optional but recommended for learning</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
