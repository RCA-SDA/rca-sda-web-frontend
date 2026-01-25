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

export default function GalleryPage() {
  const [filter, setFilter] = useState<MediaType | 'All'>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  
  // Mock data - replace with API call
  const galleryItems: GalleryItem[] = [];

  const filteredItems = filter === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.mediaType === filter);

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
        <div className="flex gap-4 mb-8">
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

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.length === 0 ? (
            <div className="col-span-full">
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-zinc-500">
                    No media yet. Upload your first photo or video to get started.
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            filteredItems.map(item => (
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
        <div className="w-full h-full flex items-center justify-center bg-zinc-300">
          <Play className="w-16 h-16" />
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-4 text-zinc-900">
          Upload Media
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-700">
              Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg bg-white text-zinc-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-700">
              Description (optional)
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg bg-white text-zinc-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-700">
              Media Type
            </label>
            <select
              value={formData.mediaType}
              onChange={e => setFormData({ ...formData, mediaType: e.target.value as MediaType })}
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg bg-white text-zinc-900"
            >
              <option value="image">Photo</option>
              <option value="video">Video</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-700">
              File
            </label>
            <input
              type="file"
              required
              accept={formData.mediaType === 'image' ? 'image/*' : 'video/*'}
              onChange={e => setFormData({ ...formData, file: e.target.files?.[0] || null })}
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg bg-white text-zinc-900"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-zinc-300 rounded-lg hover:bg-zinc-100 text-zinc-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
