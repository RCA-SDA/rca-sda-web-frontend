'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pagination } from '@/components/Pagination';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  FileText, 
  Search,
  Filter,
  Calendar,
  Users,
  Eye,
  Download,
  X,
  CheckCircle2,
  ClipboardList
} from 'lucide-react';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { DateSearchFilter } from '@/components/DateSearchFilter';

type MeetingNote = {
  id: string;
  title: string;
  type: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  attendeesCount: number;
  hasActionItems: boolean;
  createdAt: Date;
  recorder?: string;
  attendees?: string[];
  agenda?: string[];
  notes?: string;
  decisions?: string[];
};

export default function AllNotesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedNote, setSelectedNote] = useState<MeetingNote | null>(null);

  // Mock data - replace with API call
  const mockNotes: MeetingNote[] = [
    {
      id: '1',
      title: 'Church Board Meeting',
      type: 'Board Meeting',
      date: new Date('2026-01-25'),
      startTime: '10:00',
      endTime: '12:00',
      location: 'Board Room',
      attendeesCount: 12,
      hasActionItems: true,
      createdAt: new Date('2026-01-25'),
      recorder: 'Elder John Smith',
      attendees: ['Pastor David Johnson', 'Elder John Smith', 'Sister Mary Williams', 'Brother James Brown', 'Sister Sarah Davis', 'Elder Michael Wilson', 'Brother Timothy Lee', 'Sister Grace Anderson', 'Brother Paul Martinez', 'Sister Ruth Thompson', 'Elder Daniel White', 'Sister Rebecca Harris'],
      agenda: ['Opening Prayer', 'Financial Report Review', 'Building Maintenance Discussion', 'Youth Ministry Update', 'Upcoming Events Planning', 'Closing Prayer'],
      notes: `Opening Prayer: Elder John led us in prayer.

Financial Report Review:
- Reviewed monthly income and expenses
- All bills paid on time
- Discussed budget for upcoming quarter

Building Maintenance Discussion:
- Roof repairs needed - multiple quotes reviewed
- HVAC system maintenance scheduled
- Parking lot resurfacing proposal presented

Youth Ministry Update:
- Summer camp planning underway
- Youth attendance increasing
- New youth leader appointed

Upcoming Events Planning:
- Easter service preparations
- Community outreach event scheduled
- Vacation Bible School dates confirmed

Closing Prayer: Sister Mary closed in prayer.`,
      decisions: [
        'Approved $5,000 budget for roof repairs',
        'Scheduled HVAC maintenance for next month',
        'Approved summer youth camp dates: July 15-22',
        'Allocated $2,000 for Easter service preparations',
        'Confirmed VBS dates: June 10-14'
      ],
    },
    {
      id: '2',
      title: 'Elders Council Meeting',
      type: 'Council Meeting',
      date: new Date('2026-01-20'),
      startTime: '14:00',
      endTime: '16:00',
      location: 'Conference Room A',
      attendeesCount: 8,
      hasActionItems: true,
      createdAt: new Date('2026-01-20'),
      recorder: 'Elder Michael Wilson',
      attendees: ['Pastor David Johnson', 'Elder John Smith', 'Elder Michael Wilson', 'Elder Daniel White', 'Sister Mary Williams', 'Sister Sarah Davis', 'Brother James Brown', 'Brother Timothy Lee'],
      agenda: ['Spiritual Health of Congregation', 'Pastoral Care Needs', 'Sabbath School Review', 'Prayer Requests'],
      notes: `Opening Prayer: Pastor David opened with prayer.

Spiritual Health of Congregation:
- Discussed overall spiritual climate
- Identified areas needing attention
- Planned spiritual revival series

Pastoral Care Needs:
- Reviewed members needing visits
- Discussed hospital visitation schedule
- Planned home communion services

Sabbath School Review:
- Attendance trends discussed
- Teacher training needs identified
- New curriculum materials reviewed

Prayer Requests:
- Prayed for sick members
- Prayed for church growth
- Prayed for community outreach

Closing Prayer: Elder John closed in prayer.`,
      decisions: [
        'Scheduled spiritual revival series for March',
        'Created pastoral care visitation schedule',
        'Approved new Sabbath School curriculum',
        'Planned teacher training for February 15th'
      ],
    },
    {
      id: '3',
      title: 'Youth Ministry Planning',
      type: 'Ministry Meeting',
      date: new Date('2026-01-18'),
      startTime: '18:00',
      endTime: '20:00',
      location: 'Youth Hall',
      attendeesCount: 6,
      hasActionItems: false,
      createdAt: new Date('2026-01-18'),
      recorder: 'Brother Timothy Lee',
      attendees: ['Brother Timothy Lee', 'Sister Grace Anderson', 'Brother Paul Martinez', 'Sister Rebecca Harris', 'Brother David Chen', 'Sister Emily Rodriguez'],
      agenda: ['Summer Camp Planning', 'Weekly Activities', 'Fundraising Ideas', 'Volunteer Recruitment'],
      notes: `Opening Prayer: Brother Timothy led in prayer.

Summer Camp Planning:
- Discussed camp location options
- Reviewed budget requirements
- Planned activities and schedule

Weekly Activities:
- Friday night youth meetings
- Sabbath afternoon programs
- Midweek Bible study

Fundraising Ideas:
- Car wash fundraiser
- Bake sale
- Youth talent show

Volunteer Recruitment:
- Need more adult sponsors
- Looking for music leaders
- Seeking activity coordinators

Closing Prayer: Sister Grace closed in prayer.`,
      decisions: [],
    },
    {
      id: '4',
      title: 'Finance Committee Review',
      type: 'Committee Meeting',
      date: new Date('2026-01-15'),
      startTime: '09:00',
      endTime: '11:00',
      location: 'Finance Office',
      attendeesCount: 5,
      hasActionItems: true,
      createdAt: new Date('2026-01-15'),
      recorder: 'Sister Sarah Davis',
      attendees: ['Sister Sarah Davis', 'Brother James Brown', 'Elder John Smith', 'Sister Ruth Thompson', 'Brother Michael Chen'],
      agenda: ['Q4 Financial Report', 'Budget Planning', 'Expense Review', 'Investment Strategy'],
      notes: `Opening Prayer: Sister Sarah led in prayer.

Q4 Financial Report:
- Total income exceeded projections
- Expenses within budget
- Year-end surplus achieved

Budget Planning:
- Reviewed 2026 budget proposals
- Discussed ministry allocations
- Planned for major expenses

Expense Review:
- All bills current
- Utility costs reviewed
- Maintenance expenses tracked

Investment Strategy:
- Reviewed investment portfolio
- Discussed risk management
- Planned for future growth

Closing Prayer: Brother James closed in prayer.`,
      decisions: [
        'Approved 2026 annual budget',
        'Allocated surplus to building fund',
        'Approved new investment strategy',
        'Scheduled quarterly financial reviews'
      ],
    },
    {
      id: '5',
      title: 'Worship Team Meeting',
      type: 'Ministry Meeting',
      date: new Date('2026-01-12'),
      startTime: '19:00',
      endTime: '21:00',
      location: 'Sanctuary',
      attendeesCount: 10,
      hasActionItems: false,
      createdAt: new Date('2026-01-12'),
      recorder: 'Sister Grace Anderson',
      attendees: ['Sister Grace Anderson', 'Brother Paul Martinez', 'Sister Emily Rodriguez', 'Brother David Chen', 'Sister Lisa Wang', 'Brother Marcus Johnson', 'Sister Angela Brown', 'Brother Kevin Lee', 'Sister Michelle Davis', 'Brother Ryan Thompson'],
      agenda: ['Music Selection', 'Rehearsal Schedule', 'Special Music Planning', 'Equipment Needs'],
      notes: `Opening Prayer: Sister Grace led in prayer.

Music Selection:
- Reviewed songs for upcoming services
- Discussed seasonal themes
- Planned special presentations

Rehearsal Schedule:
- Weekly rehearsals on Thursdays
- Extra rehearsals before special events
- Individual practice expectations

Special Music Planning:
- Easter cantata preparation
- Guest musicians coordination
- Youth choir involvement

Equipment Needs:
- New microphones needed
- Sound system upgrade discussed
- Music stand replacements

Closing Prayer: Brother Paul closed in prayer.`,
      decisions: [],
    },
  ];

  const meetingTypes = [
    'Board Meeting',
    'Council Meeting',
    'Committee Meeting',
    'Ministry Meeting',
    'Planning Session',
    'General Meeting',
  ];

  // Filter notes
  const filteredNotes = mockNotes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || note.type === filterType;
    const matchesDate = !dateFilter || 
      new Date(note.date).toDateString() === dateFilter.toDateString();
    return matchesSearch && matchesType && matchesDate;
  });

  // Pagination
  const totalPages = Math.ceil(filteredNotes.length / itemsPerPage);
  const paginatedNotes = filteredNotes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Board Meeting':
        return 'bg-blue-200';
      case 'Council Meeting':
        return 'bg-purple-200';
      case 'Committee Meeting':
        return 'bg-green-200';
      case 'Ministry Meeting':
        return 'bg-yellow-200';
      case 'Planning Session':
        return 'bg-pink-200';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-black uppercase transform -rotate-1 mb-2">
            All Meeting Notes
          </h1>
          <p className="text-lg font-bold text-gray-600">
            Browse and search all meeting notes
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6 bg-orange-200">
          <CardHeader>
            <CardTitle className="uppercase flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search */}
              <div>
                <Label htmlFor="search" className="font-bold mb-2 block">
                  Search Notes
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    id="search"
                    type="text"
                    placeholder="Search by title, type, or location..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-10 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => handleSearchChange('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Type Filter */}
              <div>
                <Label htmlFor="type" className="font-bold mb-2 block">
                  Meeting Type
                </Label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold">
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {meetingTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {searchQuery && (
              <p className="text-sm font-bold text-gray-600 mt-4">
                Found {filteredNotes.length} note{filteredNotes.length !== 1 ? 's' : ''}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Notes List */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="uppercase flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FileText className="w-6 h-6" />
                Meeting Notes ({filteredNotes.length})
              </span>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {paginatedNotes.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-block p-6 bg-gray-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <Search className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                  <p className="text-xl font-black uppercase mb-2">No Notes Found</p>
                  <p className="font-bold text-gray-600">
                    Try adjusting your search or filters
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {paginatedNotes.map((note) => (
                    <Card
                      key={note.id}
                      className={`${getTypeColor(note.type)} border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer`}
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start gap-3 mb-3">
                              <FileText className="w-6 h-6 flex-shrink-0 mt-1" />
                              <div>
                                <h3 className="text-2xl font-black mb-1">{note.title}</h3>
                                <p className="text-sm font-bold uppercase px-3 py-1 bg-black text-white inline-block">
                                  {note.type}
                                </p>
                              </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-3 mt-4">
                              <div className="flex items-center gap-2 font-bold text-sm">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  {format(note.date, 'MMM dd, yyyy')}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 font-bold text-sm">
                                <Users className="w-4 h-4" />
                                <span>{note.attendeesCount} attendees</span>
                              </div>

                              <div className="flex items-center gap-2 font-bold text-sm">
                                <span>{note.startTime} - {note.endTime}</span>
                              </div>
                            </div>

                            {note.hasActionItems && (
                              <div className="mt-3">
                                <span className="px-3 py-1 bg-red-400 border-2 border-black font-black text-xs uppercase">
                                  Has Action Items
                                </span>
                              </div>
                            )}
                          </div>

                          <Button
                            onClick={() => setSelectedNote(note)}
                            className="font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                          >
                            <Eye className="w-5 h-5 mr-2" />
                            View
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-6">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    itemsPerPage={itemsPerPage}
                    totalItems={filteredNotes.length}
                    onItemsPerPageChange={setItemsPerPage}
                    itemsPerPageOptions={[5, 10, 20, 50]}
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* View Meeting Modal */}
        {selectedNote && (
          <ViewMeetingModal 
            meeting={selectedNote} 
            onClose={() => setSelectedNote(null)} 
          />
        )}
      </div>
    </div>
  );
}

function ViewMeetingModal({ meeting, onClose }: { meeting: MeetingNote; onClose: () => void }) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="uppercase text-2xl">{meeting.title}</DialogTitle>
          <p className="text-sm font-bold pt-2">
            {format(meeting.date, 'MMMM dd, yyyy')} • {meeting.startTime} - {meeting.endTime}
            {meeting.recorder && ` • Recorded by ${meeting.recorder}`}
          </p>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Attendees */}
          {meeting.attendees && meeting.attendees.length > 0 && (
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
          {meeting.agenda && meeting.agenda.length > 0 && (
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
          {meeting.notes && (
            <div>
              <h3 className="font-black text-lg mb-3 uppercase">Meeting Notes</h3>
              <div className="bg-orange-50 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <p className="font-bold whitespace-pre-wrap">
                  {meeting.notes}
                </p>
              </div>
            </div>
          )}

          {/* Decisions */}
          {meeting.decisions && meeting.decisions.length > 0 && (
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
          <Button onClick={onClose} variant="outline" className="border-2 border-black font-bold">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
