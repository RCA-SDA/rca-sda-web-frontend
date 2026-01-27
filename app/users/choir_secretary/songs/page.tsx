'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Music2, Search } from 'lucide-react';
import { Song } from '@/types';

export default function AllSongsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - replace with API call
  const songs: Song[] = [
    {
      id: '1',
      title: 'Amazing Grace',
      lyrics: 'Amazing grace! How sweet the sound...',
      audioUrl: 'https://example.com/audio1.mp3',
      choirName: 'Salvation Siblings Choir',
      uploadedBy: 'user1',
      createdAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      title: 'How Great Thou Art',
      lyrics: 'O Lord my God, when I in awesome wonder...',
      audioUrl: 'https://example.com/audio2.mp3',
      choirName: 'Ebenezer Choir',
      uploadedBy: 'user1',
      createdAt: new Date('2024-01-20'),
    },
  ];

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.choirName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
       <div className="min-h-screen bg-[#fafafa] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div>
        <h2 className="text-4xl font-black uppercase mb-2">All Songs</h2>
        <p className="text-gray-600 font-bold">Manage and view all choir songs</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search songs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 border-2 border-black"
        />
      </div>

      {/* Songs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSongs.map((song) => (
          <Card
            key={song.id}
            className="bg-gradient-to-br from-purple-200 to-pink-200 border-4 border-black hover:shadow-lg transition-shadow cursor-pointer"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg uppercase">{song.title}</CardTitle>
                {song.audioUrl && <Music2 className="w-6 h-6" />}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold mb-2">{song.choirName}</p>
              <p className="text-xs font-black">
                {new Date(song.createdAt).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSongs.length === 0 && (
        <div className="text-center py-12">
          <Music2 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 font-bold">No songs found</p>
        </div>
      )}
      </div>
      </div>
  );
}
