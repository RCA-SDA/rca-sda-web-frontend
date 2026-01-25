'use client';

import { useState } from 'react';
import { CommitteeMeeting } from '@/types';

export default function CommitteePage() {
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Mock data - replace with API call
  const meetings: CommitteeMeeting[] = [];

  return (
    <div className="min-h-screen bg-zinc-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-zinc-900">
            Committee Meetings
          </h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Meeting Notes
          </button>
        </div>

        <div className="space-y-6">
          {meetings.length === 0 ? (
            <div className="bg-white rounded-lg p-12 text-center">
              <p className="text-zinc-500">
                No meeting notes yet. Add your first meeting notes to get started.
              </p>
            </div>
          ) : (
            meetings.map(meeting => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))
          )}
        </div>

        {showAddModal && (
          <AddMeetingModal onClose={() => setShowAddModal(false)} />
        )}
      </div>
    </div>
  );
}

function MeetingCard({ meeting }: { meeting: CommitteeMeeting }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-zinc-900">
          {meeting.title}
        </h3>
        <span className="text-sm text-zinc-500">
          {new Date(meeting.date).toLocaleDateString()}
        </span>
      </div>
      
      <div className="prose max-w-none mb-4">
        <p className="text-zinc-700 whitespace-pre-wrap">
          {meeting.notes}
        </p>
      </div>

      {meeting.attendees.length > 0 && (
        <div className="border-t border-zinc-200 pt-4">
          <p className="text-sm text-zinc-600">
            Attendees: {meeting.attendees.join(', ')}
          </p>
        </div>
      )}
    </div>
  );
}

function AddMeetingModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    attendees: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const meeting: Partial<CommitteeMeeting> = {
      title: formData.title,
      date: new Date(formData.date),
      notes: formData.notes,
      attendees: formData.attendees.split(',').map(a => a.trim()).filter(Boolean),
      createdAt: new Date(),
    };

    // Add API call here
    console.log('Adding meeting:', meeting);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-zinc-900">
          Add Meeting Notes
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-700">
              Meeting Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg bg-white text-zinc-900"
              placeholder="e.g., Monthly Committee Meeting"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-700">
              Date
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg bg-white text-zinc-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-700">
              Meeting Notes
            </label>
            <textarea
              required
              rows={10}
              value={formData.notes}
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg bg-white text-zinc-900"
              placeholder="Enter detailed meeting notes..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-700">
              Attendees (comma-separated)
            </label>
            <input
              type="text"
              value={formData.attendees}
              onChange={e => setFormData({ ...formData, attendees: e.target.value })}
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg bg-white text-zinc-900"
              placeholder="John Doe, Jane Smith, ..."
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
              Save Notes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
