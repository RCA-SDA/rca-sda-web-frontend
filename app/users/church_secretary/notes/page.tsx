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
  X
} from 'lucide-react';
import { format } from 'date-fns';

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
};

export default function AllNotesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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
    return matchesSearch && matchesType;
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
      </div>
    </div>
  );
}
