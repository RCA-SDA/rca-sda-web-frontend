'use client';

import { useState } from 'react';
import { CommitteeMeeting } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function CommitteePage() {
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Mock data - replace with API call
  const meetings: CommitteeMeeting[] = [];

  return (
    <div className="min-h-screen bg-[#fafafa] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-black uppercase transform -rotate-1">
            Committee Meetings
          </h1>
          <Button onClick={() => setShowAddModal(true)}>
            Add Meeting Notes
          </Button>
        </div>

        <div className="space-y-6">
          {meetings.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="font-bold">
                  No meeting notes yet. Add your first meeting notes to get started.
                </p>
              </CardContent>
            </Card>
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
    <Card className="bg-gradient-to-br from-orange-200 to-red-200">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="uppercase">{meeting.title}</CardTitle>
          <span className="text-sm font-black">
            {new Date(meeting.date).toLocaleDateString()}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="font-bold whitespace-pre-wrap mb-4">
          {meeting.notes}
        </p>

        {meeting.attendees.length > 0 && (
          <div className="border-t-4 border-black pt-4">
            <p className="text-sm font-black">
              Attendees: {meeting.attendees.join(', ')}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
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
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Meeting Notes</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Meeting Title</Label>
            <Input
              id="title"
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Monthly Committee Meeting"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              required
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Meeting Notes</Label>
            <Textarea
              id="notes"
              required
              rows={10}
              value={formData.notes}
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Enter detailed meeting notes..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="attendees">Attendees (comma-separated)</Label>
            <Input
              id="attendees"
              type="text"
              value={formData.attendees}
              onChange={e => setFormData({ ...formData, attendees: e.target.value })}
              placeholder="John Doe, Jane Smith, ..."
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
              Save Notes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
