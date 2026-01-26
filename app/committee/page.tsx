'use client';

import { useState } from 'react';
import { CommitteeMeeting } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { FileText, Calendar as CalendarIcon, Users } from 'lucide-react';
import { format } from 'date-fns';
import { DateSearchFilter } from '@/components/DateSearchFilter';
import { Pagination } from '@/components/Pagination';

export default function CommitteePage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<CommitteeMeeting | null>(null);
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  
  // Mock data - replace with API call
  const meetings: CommitteeMeeting[] = [
    {
      id: '1',
      title: 'January 2026 Committee Meeting',
      date: new Date('2026-01-15'),
      notes: `Opening Prayer: Elder John led us in prayer.

Agenda Items:
1. Church Building Maintenance
   - Discussed repairs needed for the roof
   - Budget approved: $5,000
   - Work to begin in February

2. Youth Ministry Programs
   - Planning youth camp for summer 2026
   - Dates: July 15-22, 2026
   - Location: Mountain View Retreat Center
   - Registration to open in March

3. Sabbath School Improvements
   - New curriculum materials ordered
   - Teacher training scheduled for February 8th
   - Discussion on increasing youth participation

4. Community Outreach
   - Food bank partnership approved
   - Monthly community meals to start in March
   - Volunteer sign-up sheets to be posted

5. Financial Report
   - Tithes and offerings up 12% from last year
   - All bills paid on time
   - Emergency fund at healthy level

Action Items:
- Secretary to contact roofing contractors
- Youth leader to finalize camp details
- Treasurer to prepare Q1 financial report

Closing Prayer: Sister Mary closed in prayer.`,
      attendees: ['Pastor David Johnson', 'Elder John Smith', 'Sister Mary Williams', 'Brother James Brown', 'Sister Sarah Davis', 'Elder Michael Wilson'],
      createdBy: 'Elder John Smith',
      createdAt: new Date('2026-01-15'),
    },
    {
      id: '2',
      title: 'December 2025 Year-End Review',
      date: new Date('2025-12-20'),
      notes: `Opening Prayer: Pastor David opened with prayer.

Year-End Review:
1. Membership Growth
   - 15 new baptisms this year
   - 3 families joined by transfer
   - Current membership: 127 members

2. Financial Summary
   - Total tithes: $145,000
   - Total offerings: $32,000
   - Major expenses: Building maintenance, utilities, outreach programs
   - Year ended with surplus of $8,500

3. Ministry Highlights
   - Successful VBS with 45 children
   - 3 evangelistic series held
   - Community garden project launched
   - Choir performed at 2 community events

4. 2026 Planning
   - Goal: 20 baptisms
   - Expand youth programs
   - Renovate fellowship hall
   - Increase community outreach

5. Officer Elections
   - All current officers re-elected for 2026
   - New youth leader appointed: Brother Timothy Lee

Closing Remarks:
Pastor thanked everyone for their dedication and service throughout 2025.

Closing Prayer: Elder Michael closed in prayer.`,
      attendees: ['Pastor David Johnson', 'Elder John Smith', 'Elder Michael Wilson', 'Sister Mary Williams', 'Brother James Brown', 'Sister Sarah Davis', 'Brother Timothy Lee'],
      createdBy: 'Sister Mary Williams',
      createdAt: new Date('2025-12-20'),
    },
    {
      id: '3',
      title: 'November 2025 Committee Meeting',
      date: new Date('2025-11-10'),
      notes: `Opening Prayer: Sister Sarah led in prayer.

Agenda Items:
1. Thanksgiving Service Planning
   - Date: November 28, 2025
   - Potluck lunch after service
   - Special music by choir
   - Guest speaker: Elder Robert from Central Church

2. Christmas Program
   - Children's program: December 21st
   - Rehearsals start November 15th
   - Need volunteers for costumes and props

3. Heating System Update
   - Old furnace needs replacement
   - Quotes received from 3 contractors
   - Approved contractor: ABC Heating ($7,200)
   - Installation scheduled for early December

4. Sabbath School Attendance
   - Average attendance: 85 members
   - Discussion on improving participation
   - Proposal: Start new young adult class

5. Mission Offering
   - Annual mission offering: December 14th
   - Goal: $5,000
   - Promotion materials to be distributed

Next Meeting: December 20, 2025

Closing Prayer: Brother James closed in prayer.`,
      attendees: ['Pastor David Johnson', 'Elder John Smith', 'Sister Sarah Davis', 'Brother James Brown', 'Sister Mary Williams'],
      createdBy: 'Sister Sarah Davis',
      createdAt: new Date('2025-11-10'),
    },
  ];

  // Filter meetings based on date and search query
  const filteredMeetings = meetings.filter(meeting => {
    const matchesDate = !dateFilter || 
      new Date(meeting.date).toDateString() === dateFilter.toDateString();
    
    const matchesSearch = !searchQuery || 
      meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meeting.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meeting.attendees.some(attendee => 
        attendee.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    return matchesDate && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredMeetings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMeetings = filteredMeetings.slice(startIndex, startIndex + itemsPerPage);

  // Reset to page 1 when filters change
  const handleFilterChange = (filterFn: () => void) => {
    filterFn();
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-black uppercase transform -rotate-1">
            Committee Meetings
          </h1>
          <Button onClick={() => setShowAddModal(true)}>
            <FileText className="w-5 h-5 mr-2" />
            Add Meeting Notes
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 items-center">
          <DateSearchFilter
            dateFilter={dateFilter}
            onDateChange={(date) => handleFilterChange(() => setDateFilter(date))}
            searchQuery={searchQuery}
            onSearchChange={(query) => handleFilterChange(() => setSearchQuery(query))}
            searchPlaceholder="Search meetings, notes, or attendees..."
          />
        </div>

        <div className="space-y-6">
          {filteredMeetings.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="font-bold">
                  {meetings.length === 0 
                    ? 'No meeting notes yet. Add your first meeting notes to get started.'
                    : 'No meetings found matching your filters.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            paginatedMeetings.map(meeting => (
              <MeetingCard 
                key={meeting.id} 
                meeting={meeting} 
                onViewDetails={() => setSelectedMeeting(meeting)}
              />
            ))
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredMeetings.length}
          onItemsPerPageChange={setItemsPerPage}
          itemsPerPageOptions={[2, 5, 10, 20]}
        />

        {showAddModal && (
          <AddMeetingModal onClose={() => setShowAddModal(false)} />
        )}

        {selectedMeeting && (
          <ViewMeetingModal 
            meeting={selectedMeeting} 
            onClose={() => setSelectedMeeting(null)} 
          />
        )}
      </div>
    </div>
  );
}

function MeetingCard({ meeting, onViewDetails }: { meeting: CommitteeMeeting; onViewDetails: () => void }) {
  return (
    <Card className="bg-gradient-to-br from-orange-200 to-red-200 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <CardTitle className="uppercase flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5" />
              {meeting.title}
            </CardTitle>
            <span className="text-sm font-black">
              {new Date(meeting.date).toLocaleDateString()}
            </span>
          </div>
          <Button 
            onClick={onViewDetails}
            size="sm"
            className="bg-black text-white hover:bg-gray-800"
          >
            View Decisions
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-bold">
          {meeting.attendees.length} attendees • Recorded by {meeting.createdBy}
        </p>
      </CardContent>
    </Card>
  );
}

function ViewMeetingModal({ meeting, onClose }: { meeting: CommitteeMeeting; onClose: () => void }) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="uppercase text-2xl">{meeting.title}</DialogTitle>
          <p className="text-sm font-bold pt-2">
            {new Date(meeting.date).toLocaleDateString()} • Recorded by {meeting.createdBy}
          </p>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-black text-lg mb-3 uppercase">Meeting Notes</h3>
            <div className="bg-orange-50 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-bold whitespace-pre-wrap">
                {meeting.notes}
              </p>
            </div>
          </div>

          {meeting.attendees.length > 0 && (
            <div>
              <h3 className="font-black text-lg mb-3 uppercase flex items-center gap-2">
                <Users className="w-5 h-5" />
                Attendees ({meeting.attendees.length})
              </h3>
              <div className="bg-blue-50 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex flex-wrap gap-2">
                  {meeting.attendees.map((attendee, index) => (
                    <span 
                      key={index}
                      className="bg-white border-2 border-black px-3 py-1 font-bold text-sm"
                    >
                      {attendee}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AddMeetingModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    date: new Date(),
    notes: '',
    attendees: '',
  });
  const [showCalendar, setShowCalendar] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const meeting: Partial<CommitteeMeeting> = {
      title: formData.title,
      date: formData.date,
      notes: formData.notes,
      attendees: formData.attendees.split(',').map(a => a.trim()).filter(Boolean),
      createdAt: new Date(),
    };

    // Add API call here
    console.log('Adding meeting:', meeting);
    onClose();
  };

  return (
    <>
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
              <Label htmlFor="date" className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                Date
              </Label>
              <div className="flex gap-2 items-center flex-wrap">
                <Input
                  id="date"
                  type="text"
                  required
                  value={format(formData.date, 'MMMM dd, yyyy')}
                  readOnly
                  className="max-w-xs cursor-pointer"
                  onClick={() => setShowCalendar(true)}
                />
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => setShowCalendar(true)}
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Choose Date
                </Button>
              </div>
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

      {/* Calendar Modal */}
      <Dialog open={showCalendar} onOpenChange={setShowCalendar}>
        <DialogContent className="max-w-fit p-6">
          <DialogHeader>
            <DialogTitle>Select Date</DialogTitle>
          </DialogHeader>
          <Calendar
            mode="single"
            selected={formData.date}
            onSelect={(date) => {
              if (date) {
                setFormData({ ...formData, date });
                setShowCalendar(false);
              }
            }}
            className="w-fit mx-auto"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
