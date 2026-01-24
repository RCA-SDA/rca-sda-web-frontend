'use client';

import { useState } from 'react';
import { Song } from '@/types';

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
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            Choir Songs
          </h1>
          {currentUser.role === 'Choir Secretary' && (
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Add Song
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {songs.length === 0 ? (
            <div className="col-span-full bg-white dark:bg-zinc-900 rounded-lg p-12 text-center">
              <p className="text-zinc-500 dark:text-zinc-400">
                No songs yet. {currentUser.role === 'Choir Secretary' && 'Add your first song to get started.'}
              </p>
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
    <div
      onClick={onClick}
      className="bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-sm cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
          {song.title}
        </h3>
        {song.audioUrl && (
          <span className="text-2xl">🎵</span>
        )}
      </div>
      
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
        {song.choirName}
      </p>
      
      <p className="text-xs text-zinc-500 dark:text-zinc-500">
        {new Date(song.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}

function SongDetailModal({ song, onClose }: { song: Song; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-zinc-900 rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
            {song.title}
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
          >
            ✕
          </button>
        </div>

        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
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

        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
          <h3 className="font-semibold mb-2 text-zinc-900 dark:text-white">Lyrics</h3>
          <pre className="whitespace-pre-wrap text-zinc-700 dark:text-zinc-300 font-sans">
            {song.lyrics}
          </pre>
        </div>
      </div>
    </div>
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-zinc-900 rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">
          Add New Song
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">
              Song Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">
              Choir Name
            </label>
            <input
              type="text"
              required
              value={formData.choirName}
              onChange={e => setFormData({ ...formData, choirName: e.target.value })}
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">
              Lyrics
            </label>
            <textarea
              required
              rows={10}
              value={formData.lyrics}
              onChange={e => setFormData({ ...formData, lyrics: e.target.value })}
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
              placeholder="Enter song lyrics..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">
              Audio File (optional)
            </label>
            <input
              type="file"
              accept="audio/*"
              onChange={e => setFormData({ ...formData, audioFile: e.target.files?.[0] || null })}
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Song
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
