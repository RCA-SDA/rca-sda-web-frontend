'use client';

import { useState } from 'react';
import { Song } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Music, Music2 } from 'lucide-react';

export default function ChoirPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  
  // Mock data - replace with API call
  const songs: Song[] = [];

  // Mock current user - replace with actual auth
  const currentUser = {
    role: 'Choir Secretary',
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-black uppercase transform -rotate-1">
            Choir Songs
          </h1>
          {currentUser.role === 'Choir Secretary' && (
            <Button onClick={() => setShowAddModal(true)}>
              <Music className="w-5 h-5 mr-2" />
              Add Song
            </Button>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {songs.length === 0 ? (
            <div className="col-span-full">
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="font-bold">
                    No songs yet. {currentUser.role === 'Choir Secretary' && 'Add your first song to get started.'}
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            songs.map(song => (
              <SongCard 
                key={song.id} 
                song={song} 
                onClick={() => setSelectedSong(song)}
              />
            ))
          )}
        </div>

        {showAddModal && (
          <AddSongModal onClose={() => setShowAddModal(false)} />
        )}

        {selectedSong && (
          <SongDetailModal 
            song={selectedSong} 
            onClose={() => setSelectedSong(null)} 
          />
        )}
      </div>
    </div>
  );
}

function SongCard({ song, onClick }: { song: Song; onClick: () => void }) {
  return (
    <Card
      onClick={onClick}
      className="cursor-pointer bg-gradient-to-br from-purple-200 to-pink-200"
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg uppercase">{song.title}</CardTitle>
          {song.audioUrl && (
            <Music2 className="w-6 h-6" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-bold mb-2">
          {song.choirName}
        </p>
        <p className="text-xs font-black">
          {new Date(song.createdAt).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
}

function SongDetailModal({ song, onClose }: { song: Song; onClose: () => void }) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{song.title}</DialogTitle>
        </DialogHeader>

        <p className="font-bold mb-4">
          {song.choirName}
        </p>

        {song.audioUrl && (
          <div className="mb-6">
            <audio controls className="w-full">
              <source src={song.audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}

        <Card className="bg-yellow-100 border-2">
          <CardHeader>
            <CardTitle className="text-lg">Lyrics</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap font-bold font-sans">
              {song.lyrics}
            </pre>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

function AddSongModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    choirName: '',
    lyrics: '',
    audioFile: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add API call here with file upload
    console.log('Adding song:', formData);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Song</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Song Title</Label>
            <Input
              id="title"
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="choirName">Choir Name</Label>
            <Input
              id="choirName"
              type="text"
              required
              value={formData.choirName}
              onChange={e => setFormData({ ...formData, choirName: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lyrics">Lyrics</Label>
            <Textarea
              id="lyrics"
              required
              rows={10}
              value={formData.lyrics}
              onChange={e => setFormData({ ...formData, lyrics: e.target.value })}
              placeholder="Enter song lyrics..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="audio">Audio File (optional)</Label>
            <Input
              id="audio"
              type="file"
              accept="audio/*"
              onChange={e => setFormData({ ...formData, audioFile: e.target.files?.[0] || null })}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Song
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
