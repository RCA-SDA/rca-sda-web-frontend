'use client';

import { useState, useMemo } from 'react';
import { Song } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Music, Music2 } from 'lucide-react';
import { DateSearchFilter } from '@/components/DateSearchFilter';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ChoirPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [choirFilter, setChoirFilter] = useState<string>('all');
  
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
How great Thou art, how great Thou art!

When through the woods and forest glades I wander
And hear the birds sing sweetly in the trees
When I look down from lofty mountain grandeur
And hear the brook and feel the gentle breeze`,
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      choirName: 'Ebenezer Choir',
      uploadedBy: 'user2',
      createdAt: new Date('2024-02-20'),
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
Praising my Savior all the day long.

Perfect submission, perfect delight,
Visions of rapture now burst on my sight;
Angels descending bring from above
Echoes of mercy, whispers of love.`,
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      choirName: 'Jehova-nissi Choir',
      uploadedBy: 'user3',
      createdAt: new Date('2024-03-10'),
    },
    {
      id: '4',
      title: 'What a Friend We Have in Jesus',
      lyrics: `What a friend we have in Jesus,
All our sins and griefs to bear!
What a privilege to carry
Everything to God in prayer!
O what peace we often forfeit,
O what needless pain we bear,
All because we do not carry
Everything to God in prayer!

Have we trials and temptations?
Is there trouble anywhere?
We should never be discouraged,
Take it to the Lord in prayer.
Can we find a friend so faithful
Who will all our sorrows share?
Jesus knows our every weakness,
Take it to the Lord in prayer.`,
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
      choirName: 'Combined Youth Choir',
      uploadedBy: 'user4',
      createdAt: new Date('2024-04-05'),
    },
    {
      id: '5',
      title: 'Great Is Thy Faithfulness',
      lyrics: `Great is Thy faithfulness, O God my Father;
There is no shadow of turning with Thee;
Thou changest not, Thy compassions, they fail not;
As Thou hast been, Thou forever will be.

Great is Thy faithfulness!
Great is Thy faithfulness!
Morning by morning new mercies I see;
All I have needed Thy hand hath provided;
Great is Thy faithfulness, Lord, unto me!

Summer and winter and springtime and harvest,
Sun, moon and stars in their courses above
Join with all nature in manifold witness
To Thy great faithfulness, mercy and love.`,
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
      choirName: 'Salvation Siblings Choir',
      uploadedBy: 'user1',
      createdAt: new Date('2024-05-12'),
    },
    {
      id: '6',
      title: 'It Is Well With My Soul',
      lyrics: `When peace like a river attendeth my way,
When sorrows like sea billows roll;
Whatever my lot, Thou hast taught me to say,
It is well, it is well with my soul.

It is well with my soul,
It is well, it is well with my soul.

Though Satan should buffet, though trials should come,
Let this blest assurance control,
That Christ hath regarded my helpless estate,
And hath shed His own blood for my soul.`,
      choirName: 'Ebenezer Choir',
      uploadedBy: 'user2',
      createdAt: new Date('2024-06-18'),
    },
  ];

  // Mock current user - replace with actual auth
  const currentUser = {
    role: 'Choir Secretary',
  };

  // Get unique choir names for filter
  const uniqueChoirs = useMemo(() => {
    return Array.from(new Set(songs.map(song => song.choirName)));
  }, [songs]);

  // Filter songs based on date, search query, and choir
  const filteredSongs = useMemo(() => {
    return songs.filter(song => {
      // Date filter
      if (dateFilter) {
        const songDate = new Date(song.createdAt);
        if (
          songDate.getDate() !== dateFilter.getDate() ||
          songDate.getMonth() !== dateFilter.getMonth() ||
          songDate.getFullYear() !== dateFilter.getFullYear()
        ) {
          return false;
        }
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = song.title.toLowerCase().includes(query);
        const matchesLyrics = song.lyrics.toLowerCase().includes(query);
        const matchesChoir = song.choirName.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLyrics && !matchesChoir) {
          return false;
        }
      }

      // Choir filter
      if (choirFilter !== 'all' && song.choirName !== choirFilter) {
        return false;
      }

      return true;
    });
  }, [songs, dateFilter, searchQuery, choirFilter]);

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

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 items-center">
          <DateSearchFilter
            dateFilter={dateFilter}
            onDateChange={setDateFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search songs, lyrics, or choir..."
          />
          
          {/* Choir Filter */}
          <Select value={choirFilter} onValueChange={setChoirFilter}>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Filter by choir" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Choirs</SelectItem>
              {uniqueChoirs.map(choir => (
                <SelectItem key={choir} value={choir}>
                  {choir}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {filteredSongs.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="font-bold">
                {songs.length === 0 
                  ? `No songs yet. ${currentUser.role === 'Choir Secretary' ? 'Add your first song to get started.' : ''}`
                  : 'No songs match your filters. Try adjusting your search criteria.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {Object.entries(
              filteredSongs.reduce((acc, song) => {
                if (!acc[song.choirName]) {
                  acc[song.choirName] = [];
                }
                acc[song.choirName].push(song);
                return acc;
              }, {} as Record<string, Song[]>)
            ).map(([choirName, choirSongs]) => (
              <div key={choirName}>
                <h2 className="text-2xl font-black uppercase mb-4 transform -rotate-1 inline-block bg-gradient-to-r from-purple-400 to-pink-400 text-white px-4 py-2">
                  {choirName}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {choirSongs.map(song => (
                    <SongCard 
                      key={song.id} 
                      song={song} 
                      onClick={() => setSelectedSong(song)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

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

  const choirOptions = [
    'Salvation Siblings Choir',
    'Ebenezer Choir',
    'Jehova-nissi Choir',
    'Combined Youth Choir',
  ];

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
            <Select
              value={formData.choirName}
              onValueChange={value => setFormData({ ...formData, choirName: value })}
            >
              <SelectTrigger id="choirName">
                <SelectValue placeholder="Select a choir" />
              </SelectTrigger>
              <SelectContent>
                {choirOptions.map(choir => (
                  <SelectItem key={choir} value={choir}>
                    {choir}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            <Button type="submit" className="flex-1" disabled={!formData.choirName}>
              Add Song
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
