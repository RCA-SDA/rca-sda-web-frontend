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
import { FileText, Calendar as CalendarIcon, Users, Plus, X, CheckCircle2, ClipboardList } from 'lucide-react';
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
      recorder: 'Elder John Smith',
      attendees: ['Pastor David Johnson', 'Elder John Smith', 'Sister Mary Williams', 'Brother James Brown', 'Sister Sarah Davis', 'Elder Michael Wilson'],
      agenda: [
        'Church Building Maintenance',
        'Youth Ministry Programs',
        'Sabbath School Improvements',
        'Community Outreach',
        'Financial Report'
      ],
      notes: `Opening Prayer: Elder John led us in prayer.

Church Building Maintenance:
- Discussed repairs needed for the roof
- Multiple quotes reviewed from contractors
- Timeline discussed for completion

Youth Ministry Programs:
- Planning youth camp for summer 2026
- Location options presented: Mountain View Retreat Center
- Registration process and timeline discussed

Sabbath School Improvements:
- New curriculum materials reviewed
- Teacher training needs assessed
- Discussion on increasing youth participation

Community Outreach:
- Food bank partnership proposal presented
- Monthly community meals concept introduced
- Volunteer coordination discussed

Financial Report:
- Tithes and offerings reviewed
- All bills confirmed paid on time
- Emergency fund status reviewed

Closing Prayer: Sister Mary closed in prayer.`,
      decisions: [
        'Approved $5,000 budget for roof repairs to begin in February',
        'Approved youth camp dates: July 15-22, 2026 at Mountain View Retreat Center',
        'Approved purchase of new Sabbath School curriculum materials',
        'Scheduled teacher training for February 8th',
        'Approved food bank partnership with monthly community meals starting March',
        'Secretary to contact roofing contractors for final quotes',
        'Youth leader to finalize camp registration details by February 1st',
        'Treasurer to prepare Q1 financial report for next meeting'
      ],
      createdBy: 'Elder John Smith',
      createdAt: new Date('2026-01-15'),
    },
    {
      id: '2',
      title: 'December 2025 Year-End Review',
      date: new Date('2025-12-20'),
      recorder: 'Sister Mary Williams',
      attendees: ['Pastor David Johnson', 'Elder John Smith', 'Elder Michael Wilson', 'Sister Mary Williams', 'Brother James Brown', 'Sister Sarah Davis', 'Brother Timothy Lee'],
      agenda: [
        'Membership Growth Review',
        'Financial Summary',
        'Ministry Highlights',
        '2026 Planning',
        'Officer Elections'
      ],
      notes: `Opening Prayer: Pastor David opened with prayer.

Membership Growth Review:
- Baptism records reviewed for the year
- Transfer members welcomed
- Current membership count verified

Financial Summary:
- Complete financial review presented
- Major expenses itemized and discussed
- Year-end surplus allocation discussed

Ministry Highlights:
- VBS success stories shared
- Evangelistic series outcomes reviewed
- Community garden project progress
- Choir performance feedback

2026 Planning:
- Goals for new year discussed
- Youth program expansion plans
- Fellowship hall renovation needs
- Community outreach expansion

Officer Elections:
- Nominations presented
- Voting conducted
- New youth leader appointed

Closing Remarks:
Pastor thanked everyone for their dedication and service throughout 2025.

Closing Prayer: Elder Michael closed in prayer.`,
      decisions: [
        'Celebrated 15 new baptisms and 3 families joined by transfer',
        'Confirmed year ended with surplus of $8,500',
        'Set goal of 20 baptisms for 2026',
        'Approved expansion of youth programs',
        'Approved fellowship hall renovation project',
        'Re-elected all current officers for 2026',
        'Appointed Brother Timothy Lee as new youth leader',
        'Approved increased budget for community outreach in 2026'
      ],
      createdBy: 'Sister Mary Williams',
      createdAt: new Date('2025-12-20'),
    },
    {
      id: '3',
      title: 'November 2025 Committee Meeting',
      date: new Date('2025-11-10'),
      recorder: 'Sister Sarah Davis',
      attendees: ['Pastor David Johnson', 'Elder John Smith', 'Sister Sarah Davis', 'Brother James Brown', 'Sister Mary Williams'],
      agenda: [
        'Thanksgiving Service Planning',
        'Christmas Program',
        'Heating System Update',
        'Sabbath School Attendance',
        'Mission Offering'
      ],
      notes: `Opening Prayer: Sister Sarah led in prayer.

Thanksgiving Service Planning:
- Date and time confirmed
- Potluck coordination discussed
- Special music arrangements
- Guest speaker invitation status

Christmas Program:
- Children's program planning
- Rehearsal schedule proposed
- Volunteer needs identified

Heating System Update:
- Old furnace condition assessed
- Contractor quotes reviewed
- Installation timeline discussed

Sabbath School Attendance:
- Current attendance statistics reviewed
- Participation improvement strategies discussed
- New class proposal presented

Mission Offering:
- Annual mission offering date set
- Fundraising goal discussed
- Promotion strategy planned

Next Meeting: December 20, 2025

Closing Prayer: Brother James closed in prayer.`,
      decisions: [
        'Approved Thanksgiving Service for November 28, 2025 with potluck lunch',
        'Confirmed guest speaker: Elder Robert from Central Church',
        'Approved children\'s Christmas program for December 21st',
        'Rehearsals to start November 15th',
        'Approved ABC Heating contractor for furnace replacement at $7,200',
        'Scheduled installation for early December',
        'Approved new young adult Sabbath School class',
        'Set mission offering goal at $5,000 for December 14th'
      ],
      createdBy: 'Sister Sarah Davis',
      createdAt: new Date('2025-11-10'),
    },
  ];

  // Filter meetings
  const filteredMeetings = meetings.filter(meeting => {
    const matchesDate = !dateFilter || 
      new Date(meeting.date).toDateString() === dateFilter.toDateString();
    
    const matchesSearch = !searchQuery || 
      meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meeting.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meeting.attendees.some(attendee => 
        attendee.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      meeting.agenda.some(item => 
        item.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      meeting.decisions.some(decision => 
        decision.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    return matchesDate && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredMeetings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMeetings = filteredMeetings.slice(startIndex, startIndex + itemsPerPage);

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
            View Details
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <p className="text-sm font-bold">
            {meeting.attendees.length} attendees • Recorded by {meeting.recorder}
          </p>
          <p className="text-sm font-bold">
            {meeting.agenda.length} agenda items • {meeting.decisions.length} decisions
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function ViewMeetingModal({ meeting, onClose }: { meeting: CommitteeMeeting; onClose: () => void }) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="uppercase text-2xl">{meeting.title}</DialogTitle>
          <p className="text-sm font-bold pt-2">
            {new Date(meeting.date).toLocaleDateString()} • Recorded by {meeting.recorder}
          </p>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Attendees */}
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

          {/* Meeting Agenda */}
          {meeting.agenda.length > 0 && (
            <div>
              <h3 className="font-black text-lg mb-3 uppercase flex items-center gap-2">
                <ClipboardList className="w-5 h-5" />
                Meeting Agenda
              </h3>
              <div className="bg-purple-50 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <ol className="list-decimal list-inside space-y-2">
                  {meeting.agenda.map((item, index) => (
                    <li key={index} className="font-bold">
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}

          {/* Meeting Notes */}
          <div>
            <h3 className="font-black text-lg mb-3 uppercase">Meeting Notes</h3>
            <div className="bg-orange-50 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-bold whitespace-pre-wrap">
                {meeting.notes}
              </p>
            </div>
          </div>

          {/* Decisions */}
          {meeting.decisions.length > 0 && (
            <div>
              <h3 className="font-black text-lg mb-3 uppercase flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Decisions & Action Items
              </h3>
              <div className="bg-green-50 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <ul className="space-y-3">
                  {meeting.decisions.map((decision, index) => (
                    <li key={index} className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span className="font-bold">{decision}</span>
                    </li>
                  ))}
                </ul>
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
    recorder: '',
    attendees: '',
    notes: '',
  });
  const [agendaItems, setAgendaItems] = useState<string[]>(['']);
  const [decisions, setDecisions] = useState<string[]>(['']);
  const [showCalendar, setShowCalendar] = useState(false);

  const addAgendaItem = () => {
    setAgendaItems([...agendaItems, '']);
  };

  const removeAgendaItem = (index: number) => {
    setAgendaItems(agendaItems.filter((_, i) => i !== index));
  };

  const updateAgendaItem = (index: number, value: string) => {
    const updated = [...agendaItems];
    updated[index] = value;
    setAgendaItems(updated);
  };

  const addDecision = () => {
    setDecisions([...decisions, '']);
  };

  const removeDecision = (index: number) => {
    setDecisions(decisions.filter((_, i) => i !== index));
  };

  const updateDecision = (index: number, value: string) => {
    const updated = [...decisions];
    updated[index] = value;
    setDecisions(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const meeting: Partial<CommitteeMeeting> = {
      title: formData.title,
      date: formData.date,
      recorder: formData.recorder,
      attendees: formData.attendees.split(',').map(a => a.trim()).filter(Boolean),
      agenda: agendaItems.filter(item => item.trim() !== ''),
      notes: formData.notes,
      decisions: decisions.filter(decision => decision.trim() !== ''),
      createdAt: new Date(),
    };

    // Add API call here
    console.log('Adding meeting:', meeting);
    onClose();
  };

  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  Meeting Date
                </Label>
                <Input
                  id="date"
                  type="text"
                  required
                  value={format(formData.date, 'MMMM dd, yyyy')}
                  readOnly
                  className="cursor-pointer"
                  onClick={() => setShowCalendar(true)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recorder">Meeting Recorder</Label>
                <Input
                  id="recorder"
                  type="text"
                  required
                  value={formData.recorder}
                  onChange={e => setFormData({ ...formData, recorder: e.target.value })}
                  placeholder="e.g., Elder John Smith"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="attendees">Attendees (comma-separated)</Label>
              <Input
                id="attendees"
                type="text"
                required
                value={formData.attendees}
                onChange={e => setFormData({ ...formData, attendees: e.target.value })}
                placeholder="John Doe, Jane Smith, ..."
              />
            </div>

            {/* Meeting Agenda */}
            <div className="space-y-2">
              <Label className="flex items-center justify-between">
                <span>Meeting Agenda</span>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={addAgendaItem}
                  className="h-8"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Item
                </Button>
              </Label>
              <div className="space-y-2">
                {agendaItems.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      type="text"
                      value={item}
                      onChange={e => updateAgendaItem(index, e.target.value)}
                      placeholder={`Agenda item ${index + 1}`}
                      className="flex-1"
                    />
                    {agendaItems.length > 1 && (
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => removeAgendaItem(index)}
                        className="px-3"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Meeting Notes</Label>
              <Textarea
                id="notes"
                required
                rows={8}
                value={formData.notes}
                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Enter detailed meeting notes..."
              />
            </div>

            {/* Decisions */}
            <div className="space-y-2">
              <Label className="flex items-center justify-between">
                <span>Decisions & Action Items</span>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={addDecision}
                  className="h-8"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Decision
                </Button>
              </Label>
              <div className="space-y-2">
                {decisions.map((decision, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      type="text"
                      value={decision}
                      onChange={e => updateDecision(index, e.target.value)}
                      placeholder={`Decision or action item ${index + 1}`}
                      className="flex-1"
                    />
                    {decisions.length > 1 && (
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => removeDecision(index)}
                        className="px-3"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
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
                Save Meeting
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
