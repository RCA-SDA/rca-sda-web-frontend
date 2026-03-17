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
  ClipboardList,
  Loader2
} from 'lucide-react';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DateSearchFilter } from '@/components/DateSearchFilter';
import { useMeetingNotes, useMeetingNote } from '@/lib/hooks/useMeetingNotes';
import { MeetingNote, MeetingNoteAttendee } from '@/lib/services/meeting-notes.service';

export default function AllNotesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);

  // Fetch meeting notes from API
  const { data: notes = [], isLoading, error } = useMeetingNotes();
  const { data: selectedNote, isLoading: isLoadingDetail } = useMeetingNote(selectedNoteId || 0);

  // Filter notes
  const filteredNotes = notes.filter(note => {
    const matchesSearch = !searchQuery || 
      note.notes?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.agenda_items?.some(item => item.toLowerCase().includes(searchQuery.toLowerCase())) ||
      note.decisions?.some(decision => decision.toLowerCase().includes(searchQuery.toLowerCase())) ||
      note.attendees?.some(attendee => 
        `${attendee.firstName} ${attendee.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    const matchesDate = !dateFilter || 
      (note.createdAt && new Date(note.createdAt).toDateString() === dateFilter.toDateString());
    
    return matchesSearch && matchesDate;
  });

  // Pagination
  const totalPages = Math.ceil(filteredNotes.length / itemsPerPage);
  const paginatedNotes = filteredNotes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getTypeColor = (index: number) => {
    const colors = [
      'bg-blue-200',
      'bg-purple-200', 
      'bg-green-200',
      'bg-yellow-200',
      'bg-pink-200',
      'bg-orange-200'
    ];
    return colors[index % colors.length];
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <Card className="bg-red-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="p-8 text-center">
            <p className="text-lg font-black">Failed to load meeting notes</p>
            <p className="text-sm text-gray-600 mt-2">Please try again later</p>
          </CardContent>
        </Card>
      </div>
    );
  }

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
        <div className="mb-6 flex flex-wrap gap-4 items-center">
          <DateSearchFilter
            dateFilter={dateFilter}
            onDateChange={(date) => {
              setDateFilter(date);
              setCurrentPage(1);
            }}
            searchQuery={searchQuery}
            onSearchChange={(query) => {
              setSearchQuery(query);
              setCurrentPage(1);
            }}
            searchPlaceholder="Search by notes, agenda, decisions, or attendees..."
          />

          {(searchQuery || dateFilter) && (
            <p className="text-sm font-bold text-gray-600">
              Found {filteredNotes.length} note{filteredNotes.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

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
            {isLoading ? (
              <div className="text-center py-12">
                <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
                <p className="text-xl font-black uppercase">Loading Meeting Notes...</p>
              </div>
            ) : paginatedNotes.length === 0 ? (
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
                  {paginatedNotes.map((note, index) => (
                    <Card
                      key={note.id}
                      className={`${getTypeColor(index)} border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer`}
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start gap-3 mb-3">
                              <FileText className="w-6 h-6 flex-shrink-0 mt-1" />
                              <div>
                                <h3 className="text-2xl font-black mb-1">
                                  Meeting Note #{note.id}
                                </h3>
                                <p className="text-sm font-bold uppercase px-3 py-1 bg-black text-white inline-block">
                                  {note.createdAt ? format(new Date(note.createdAt), 'MMM dd, yyyy') : 'No Date'}
                                </p>
                              </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-3 mt-4">
                              <div className="flex items-center gap-2 font-bold text-sm">
                                <Users className="w-4 h-4" />
                                <span>{note.attendees?.length || 0} attendees</span>
                              </div>

                              <div className="flex items-center gap-2 font-bold text-sm">
                                <ClipboardList className="w-4 h-4" />
                                <span>{note.agenda_items?.length || 0} agenda items</span>
                              </div>
                            </div>

                            <div className="mt-3">
                              <p className="font-bold text-sm line-clamp-2">
                                {note.notes ? note.notes.substring(0, 150) + '...' : 'No notes available'}
                              </p>
                            </div>

                            {(note.decisions && note.decisions.length > 0) && (
                              <div className="mt-3">
                                <span className="px-3 py-1 bg-red-400 border-2 border-black font-black text-xs uppercase">
                                  {note.decisions.length} Decision{note.decisions.length !== 1 ? 's' : ''}
                                </span>
                              </div>
                            )}
                          </div>

                          <Button
                            onClick={() => setSelectedNoteId(note.id)}
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
        {selectedNoteId && selectedNote && (
          <ViewMeetingModal 
            meeting={selectedNote} 
            onClose={() => setSelectedNoteId(null)} 
            isLoading={isLoadingDetail}
          />
        )}
      </div>
    </div>
  );
}

function ViewMeetingModal({ 
  meeting, 
  onClose, 
  isLoading 
}: { 
  meeting: MeetingNote; 
  onClose: () => void;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="text-center py-12">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
            <p className="text-xl font-black uppercase">Loading Meeting Details...</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="uppercase text-2xl">
            Meeting Note #{meeting.id}
          </DialogTitle>
          <p className="text-sm font-bold pt-2">
            {meeting.createdAt ? format(new Date(meeting.createdAt), 'MMMM dd, yyyy') : 'No Date'}
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
                  {meeting.attendees.map((attendee: MeetingNoteAttendee) => (
                    <span 
                      key={attendee.id}
                      className="bg-white border-2 border-black px-3 py-1 font-bold text-sm"
                    >
                      {attendee.firstName} {attendee.lastName}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Meeting Agenda */}
          {meeting.agenda_items && meeting.agenda_items.length > 0 && (
            <div>
              <h3 className="font-black text-lg mb-3 uppercase flex items-center gap-2">
                <ClipboardList className="w-5 h-5" />
                Meeting Agenda
              </h3>
              <div className="bg-purple-50 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <ol className="list-decimal list-inside space-y-2">
                  {meeting.agenda_items.map((item, index) => (
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

          {/* Additional Fields (if they exist in future) */}
          {meeting.title && (
            <div>
              <h3 className="font-black text-lg mb-3 uppercase">Title</h3>
              <div className="bg-gray-50 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <p className="font-bold">{meeting.title}</p>
              </div>
            </div>
          )}

          {meeting.location && (
            <div>
              <h3 className="font-black text-lg mb-3 uppercase">Location</h3>
              <div className="bg-gray-50 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <p className="font-bold">{meeting.location}</p>
              </div>
            </div>
          )}

          {meeting.startTime && meeting.endTime && (
            <div>
              <h3 className="font-black text-lg mb-3 uppercase">Time</h3>
              <div className="bg-gray-50 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <p className="font-bold">{meeting.startTime} - {meeting.endTime}</p>
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
