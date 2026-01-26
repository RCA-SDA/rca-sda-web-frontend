'use client';

import { useState } from 'react';
import { GalleryItem, MediaType } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Image as ImageIcon, Video, Play } from 'lucide-react';
import { DateSearchFilter } from '@/components/DateSearchFilter';

export default function GalleryPage() {
  const [filter, setFilter] = useState<MediaType | 'All'>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  
  // Mock data - replace with API call
  const galleryItems: GalleryItem[] = [
    {
      id: '1',
      title: 'Sunday Worship Service',
      description: 'Beautiful worship service with the congregation',
      mediaUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800',
      thumbnailUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=400',
      mediaType: 'image',
      createdAt: new Date('2024-01-15'),
      uploadedBy: 'admin'
    },
    {
      id: '3',
      title: 'Youth Fellowship',
      description: 'Youth group gathering and fellowship',
      mediaUrl: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800',
      thumbnailUrl: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=400',
      mediaType: 'image',
      createdAt: new Date('2024-01-22'),
      uploadedBy: 'admin'
    },
    {
      id: '4',
      title: 'Baptism Ceremony',
      description: 'Celebrating new members joining our church family',
      mediaUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800',
      thumbnailUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      mediaType: 'image',
      createdAt: new Date('2024-01-25'),
      uploadedBy: 'admin'
    },
    {
      id: '5',
      title: 'Community Outreach',
      description: 'Serving our community with love',
      mediaUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800',
      thumbnailUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400',
      mediaType: 'image',
      createdAt: new Date('2024-02-01'),
      uploadedBy: 'admin'
    },
    {
      id: '6',
      title: 'Prayer Meeting',
      description: 'Weekly prayer and worship gathering',
      mediaUrl: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800',
      thumbnailUrl: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=400',
      mediaType: 'image',
      createdAt: new Date('2024-02-05'),
      uploadedBy: 'admin'
    },
    {
      id: '8',
      title: 'Easter Celebration',
      description: 'Celebrating the resurrection of our Lord',
      mediaUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
      thumbnailUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
      mediaType: 'image',
      createdAt: new Date('2024-03-31'),
      uploadedBy: 'admin'
    },
    {
      id: '9',
      title: 'Worship Highlights',
      description: 'Video highlights from our worship service',
      mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400',
      mediaType: 'video',
      createdAt: new Date('2024-02-10'),
      uploadedBy: 'admin'
    },
    {
      id: '10',
      title: 'Bible Study Group',
      description: 'Diving deep into God\'s Word together',
      mediaUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
      thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      mediaType: 'image',
      createdAt: new Date('2024-02-12'),
      uploadedBy: 'admin'
    },
    {
      id: '11',
      title: 'Church Picnic',
      description: 'Fellowship and fun in the great outdoors',
      mediaUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800',
      thumbnailUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400',
      mediaType: 'image',
      createdAt: new Date('2024-02-15'),
      uploadedBy: 'admin'
    },
    
    {
      id: '13',
      title: 'Choir Rehearsal',
      description: 'Behind the scenes of our choir practice session',
      mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400',
      mediaType: 'video',
      createdAt: new Date('2024-02-20'),
      uploadedBy: 'admin'
    }
  ];

  const filteredItems = filter === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.mediaType === filter);

  // Apply date filter
  const dateFilteredItems = dateFilter
    ? filteredItems.filter(item => {
        const itemDate = new Date(item.createdAt);
        return itemDate.toDateString() === dateFilter.toDateString();
      })
    : filteredItems;

  // Apply search filter
  const searchedItems = searchQuery.trim() === ''
    ? dateFilteredItems
    : dateFilteredItems.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div className="min-h-screen bg-[#fafafa] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-black uppercase transform -rotate-1">
            Church Gallery
          </h1>
          <Button onClick={() => setShowAddModal(true)}>
            <Upload className="w-5 h-5 mr-2" />
            Upload Media
          </Button>
        </div>

        {/* Filter */}
        <div className="flex gap-4 mb-8 flex-wrap items-center">
          <div className="flex gap-4">
            <Button
              variant={filter === 'All' ? 'default' : 'outline'}
              onClick={() => setFilter('All')}
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              All
            </Button>
            <Button
              variant={filter === 'image' ? 'default' : 'outline'}
              onClick={() => setFilter('image')}
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              Photos
            </Button>
            <Button
              variant={filter === 'video' ? 'default' : 'outline'}
              onClick={() => setFilter('video')}
            >
              <Video className="w-4 h-4 mr-2" />
              Videos
            </Button>
          </div>
          
          <DateSearchFilter
            dateFilter={dateFilter}
            onDateChange={setDateFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search gallery..."
          />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {searchedItems.length === 0 ? (
            <div className="col-span-full">
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-zinc-500">
                    {searchQuery.trim() !== '' 
                      ? `No results found for "${searchQuery}"`
                      : 'No media yet. Upload your first photo or video to get started.'}
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            searchedItems.map(item => (
              <GalleryCard 
                key={item.id} 
                item={item}
                onClick={() => setSelectedItem(item)}
              />
            ))
          )}
        </div>

        {showAddModal && (
          <AddMediaModal onClose={() => setShowAddModal(false)} />
        )}

        {selectedItem && (
          <MediaDetailModal 
            item={selectedItem} 
            onClose={() => setSelectedItem(null)} 
          />
        )}
      </div>
    </div>
  );
}

function GalleryCard({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="relative aspect-square bg-zinc-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity group"
    >
      {item.mediaType === 'image' ? (
        <img 
          src={item.thumbnailUrl || item.mediaUrl} 
          alt={item.title}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="relative w-full h-full">
          <img 
            src={item.thumbnailUrl} 
            alt={item.title}
            className="w-full h-full object-cover"
          />
          {/* YouTube-style play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/70 rounded-full p-4 group-hover:bg-red-600 transition-colors">
              <Play className="w-12 h-12 text-white fill-white" />
            </div>
          </div>
          {/* Video duration badge (optional) */}
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
            Video
          </div>
        </div>
      )}
      
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
        <p className="text-white text-sm font-medium">{item.title}</p>
      </div>
    </div>
  );
}

function MediaDetailModal({ item, onClose }: { item: GalleryItem; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
      <div className="max-w-5xl w-full">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {item.title}
            </h2>
            {item.description && (
              <p className="text-zinc-300">{item.description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-zinc-300 text-3xl"
          >
            ✕
          </button>
        </div>

        <div className="bg-black rounded-lg overflow-hidden">
          {item.mediaType === 'image' ? (
            <img 
              src={item.mediaUrl} 
              alt={item.title}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
          ) : (
            <video 
              controls 
              className="w-full h-auto max-h-[70vh]"
              src={item.mediaUrl}
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        <p className="text-zinc-400 text-sm mt-4">
          Uploaded {new Date(item.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

function AddMediaModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    mediaType: 'image' as MediaType,
    file: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add API call here with file upload
    console.log('Adding media:', formData);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Media</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter media title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              rows={3}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              placeholder="Add a description..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mediaType">Media Type</Label>
            <Select
              value={formData.mediaType}
              onValueChange={(value) => setFormData({ ...formData, mediaType: value as MediaType })}
            >
              <SelectTrigger id="mediaType">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image">Photo</SelectItem>
                <SelectItem value="video">Video</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">File</Label>
            <Input
              id="file"
              type="file"
              required
              accept={formData.mediaType === 'image' ? 'image/*' : 'video/*'}
              onChange={e => setFormData({ ...formData, file: e.target.files?.[0] || null })}
              className="cursor-pointer"
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
              Upload
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
