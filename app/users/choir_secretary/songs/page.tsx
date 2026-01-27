'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Music2, Search } from 'lucide-react';
import { Song } from '@/types';
import { Pagination } from '@/components/Pagination';

export default function AllSongsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  // Mock data - replace with API call
  const songs: Song[] = [
    {
      id: '1',
      title: 'Amazing Grace',
      lyrics: `Amazing grace! How sweet the sound
That saved a wretch like me!
I once was lost, but now am found;
Was blind, but now I see.

'Twas grace that taught my heart to fear,
And grace my fears relieved;
How precious did that grace appear
The hour I first believed.

Through many dangers, toils and snares,
I have already come;
'Tis grace hath brought me safe thus far,
And grace will lead me home.`,
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      choirName: 'Salvation Siblings Choir',
      uploadedBy: 'user1',
      createdAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      title: 'How Great Thou Art',
      lyrics: `O Lord my God, when I in awesome wonder
Consider all the worlds Thy hands have made
I see the stars, I hear the rolling thunder
Thy power throughout the universe displayed

Then sings my soul, my Savior God, to Thee
How great Thou art, how great Thou art
Then sings my soul, my Savior God, to Thee
How great Thou art, how great Thou art!`,
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      choirName: 'Ebenezer Choir',
      uploadedBy: 'user1',
      createdAt: new Date('2024-01-20'),
    },
    {
      id: '3',
      title: 'Blessed Assurance',
      lyrics: `Blessed assurance, Jesus is mine!
O what a foretaste of glory divine!
Heir of salvation, purchase of God,
Born of His Spirit, washed in His blood.

This is my story, this is my song,
Praising my Savior all the day long;
This is my story, this is my song,
Praising my Savior all the day long.`,
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      choirName: 'Jehova-nissi Choir',
      uploadedBy: 'user1',
      createdAt: new Date('2024-02-10'),
    },
  ];

  const filteredSongs = useMemo(() => {
    return songs.filter(song =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.choirName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [songs, searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredSongs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSongs = filteredSongs.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2 space-y-6">
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
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 border-2 border-black"
        />
      </div>

      {/* Results count */}
      {filteredSongs.length > 0 && (
        <p className="text-sm font-bold text-gray-600">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredSongs.length)} of {filteredSongs.length} songs
        </p>
      )}

      {/* Songs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedSongs.map((song) => (
          <Card
            key={song.id}
            onClick={() => setSelectedSong(song)}
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

      {/* Pagination */}
      {filteredSongs.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredSongs.length}
          onItemsPerPageChange={setItemsPerPage}
          itemsPerPageOptions={[6, 9, 12, 18]}
        />
      )}

      {/* Song Detail Modal */}
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

function SongDetailModal({ song, onClose }: { song: Song; onClose: () => void }) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black uppercase">{song.title}</DialogTitle>
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

        <Card className="bg-yellow-100 border-2 border-black">
          <CardHeader>
            <CardTitle className="text-lg">Lyrics</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap font-bold font-sans">
              {song.lyrics}
            </pre>
          </CardContent>
        </Card>

        <p className="text-xs text-gray-600 font-bold mt-4">
          Added on {new Date(song.createdAt).toLocaleDateString()}
        </p>
      </DialogContent>
    </Dialog>
  );
}
