'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Music, Upload } from 'lucide-react';
import { choirAPI } from '@/lib/api';

export default function AddSongsPage() {
  const [formData, setFormData] = useState({
    title: '',
    choirName: '',
    lyrics: '',
  });
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.choirName || !formData.lyrics) {
      setMessage({ type: 'error', text: 'Please fill in all required fields' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const songData = {
        title: formData.title,
        choirName: formData.choirName,
        lyrics: formData.lyrics,
        uploadedBy: 'current-user-id', // Replace with actual user ID from auth
        createdAt: new Date(),
      };

      await choirAPI.create(songData, audioFile || undefined);
      
      setMessage({ type: 'success', text: 'Song added successfully!' });
      
      // Reset form
      setFormData({ title: '', choirName: '', lyrics: '' });
      setAudioFile(null);
      
      // Clear file input
      const fileInput = document.getElementById('audio-file') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      console.error('Error adding song:', error);
      setMessage({ type: 'error', text: 'Failed to add song. Please try again.' });
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
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-4xl font-black uppercase mb-2">Add New Song</h2>
        <p className="text-gray-600 font-bold">Upload a new song for the choir</p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-lg border-4 border-black font-bold ${
            message.type === 'success'
              ? 'bg-green-200 text-green-800'
              : 'bg-red-200 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}

      <Card className="border-4 border-black">
        <CardHeader className="bg-gradient-to-r from-purple-200 to-pink-200">
          <CardTitle className="flex items-center gap-2 uppercase">
            <Music className="w-6 h-6" />
            Song Details
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Song Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="font-bold">
                Song Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter song title"
                className="border-2 border-black"
                required
              />
            </div>

            {/* Choir Name */}
            <div className="space-y-2">
              <Label htmlFor="choirName" className="font-bold">
                Choir Name <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.choirName}
                onValueChange={(value) => setFormData({ ...formData, choirName: value })}
                required
              >
                <SelectTrigger className="border-2 border-black">
                  <SelectValue placeholder="Select choir" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Salvation Siblings Choir">Salvation Siblings Choir</SelectItem>
                  <SelectItem value="Ebenezer Choir">Ebenezer Choir</SelectItem>
                  <SelectItem value="Jehova-nissi Choir">Jehova-nissi Choir</SelectItem>
                  <SelectItem value="Combined Youth Choir">Combined Youth Choir</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Lyrics */}
            <div className="space-y-2">
              <Label htmlFor="lyrics" className="font-bold">
                Lyrics <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="lyrics"
                value={formData.lyrics}
                onChange={(e) => setFormData({ ...formData, lyrics: e.target.value })}
                placeholder="Enter song lyrics..."
                className="border-2 border-black min-h-[200px]"
                required
              />
            </div>

            {/* Audio File */}
            <div className="space-y-2">
              <Label htmlFor="audio-file" className="font-bold">
                Audio File (Optional)
              </Label>
              <div className="flex items-center gap-4">
                <Input
                  id="audio-file"
                  type="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                  className="border-2 border-black"
                />
                {audioFile && (
                  <span className="text-sm font-bold text-green-600">
                    ✓ {audioFile.name}
                  </span>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-6 text-lg border-4 border-black"
            >
              <Upload className="w-5 h-5 mr-2" />
              {isSubmitting ? 'Adding Song...' : 'Add Song'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
