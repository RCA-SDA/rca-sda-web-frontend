'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Calendar as CalendarIcon, 
  Save, 
  Plus,
  X,
  Users,
  Clock,
  MapPin,
  FileText,
  CheckCircle
} from 'lucide-react';
import { format } from 'date-fns';

type Attendee = {
  id: string;
  name: string;
  role: string;
};

type ActionItem = {
  id: string;
  description: string;
  assignedTo: string;
  dueDate: Date | null;
  status: 'pending' | 'completed';
};

export default function NewMeetingNotePage() {
  const [meetingDate, setMeetingDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form state
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingType, setMeetingType] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [newAttendeeName, setNewAttendeeName] = useState('');
  const [newAttendeeRole, setNewAttendeeRole] = useState('');
  const [agenda, setAgenda] = useState('');
  const [discussion, setDiscussion] = useState('');
  const [decisions, setDecisions] = useState('');
  const [actionItems, setActionItems] = useState<ActionItem[]>([]);
  const [newActionItem, setNewActionItem] = useState('');
  const [newActionAssignee, setNewActionAssignee] = useState('');

  const meetingTypes = [
    'Board Meeting',
    'Council Meeting',
    'Committee Meeting',
    'Ministry Meeting',
    'Planning Session',
    'General Meeting',
    'Other',
  ];

  const addAttendee = () => {
    if (newAttendeeName.trim()) {
      setAttendees([
        ...attendees,
        {
          id: Date.now().toString(),
          name: newAttendeeName,
          role: newAttendeeRole || 'Member',
        },
      ]);
      setNewAttendeeName('');
      setNewAttendeeRole('');
    }
  };

  const removeAttendee = (id: string) => {
    setAttendees(attendees.filter(a => a.id !== id));
  };

  const addActionItem = () => {
    if (newActionItem.trim()) {
      setActionItems([
        ...actionItems,
        {
          id: Date.now().toString(),
          description: newActionItem,
          assignedTo: newActionAssignee,
          dueDate: null,
          status: 'pending',
        },
      ]);
      setNewActionItem('');
      setNewActionAssignee('');
    }
  };

  const removeActionItem = (id: string) => {
    setActionItems(actionItems.filter(a => a.id !== id));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const meetingNote = {
        title: meetingTitle,
        type: meetingType,
        date: meetingDate,
        startTime,
        endTime,
        location,
        attendees,
        agenda,
        discussion,
        decisions,
        actionItems,
        createdAt: new Date(),
      };

      // Add API call here to save meeting note
      console.log('Saving meeting note:', meetingNote);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSaveSuccess(true);
      
      // Reset form after 2 seconds
      setTimeout(() => {
        resetForm();
        setSaveSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Error saving meeting note:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const resetForm = () => {
    setMeetingTitle('');
    setMeetingType('');
    setStartTime('');
    setEndTime('');
    setLocation('');
    setAttendees([]);
    setAgenda('');
    setDiscussion('');
    setDecisions('');
    setActionItems([]);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-black uppercase transform -rotate-1">
            New Meeting Note
          </h1>
          {saveSuccess && (
            <div className="flex items-center gap-2 px-4 py-2 bg-green-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <CheckCircle className="w-5 h-5 text-green-700" />
              <span className="font-black text-green-700">Saved Successfully!</span>
            </div>
          )}
        </div>

        {/* Basic Information */}
        <Card className="mb-6 bg-blue-200">
          <CardHeader>
            <CardTitle className="uppercase flex items-center gap-2">
              <FileText className="w-6 h-6" />
              Meeting Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title" className="font-bold mb-2 block">
                Meeting Title *
              </Label>
              <Input
                id="title"
                value={meetingTitle}
                onChange={(e) => setMeetingTitle(e.target.value)}
                placeholder="e.g., Monthly Board Meeting"
                className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type" className="font-bold mb-2 block">
                  Meeting Type *
                </Label>
                <Select value={meetingType} onValueChange={setMeetingType}>
                  <SelectTrigger className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {meetingTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="date" className="font-bold mb-2 block">
                  Meeting Date *
                </Label>
                <Button
                  variant="outline"
                  onClick={() => setShowDatePicker(true)}
                  className="w-full justify-start text-left font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {format(meetingDate, 'MMMM dd, yyyy')}
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="startTime" className="font-bold mb-2 block">
                  Start Time
                </Label>
                <Input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
                />
              </div>

              <div>
                <Label htmlFor="endTime" className="font-bold mb-2 block">
                  End Time
                </Label>
                <Input
                  id="endTime"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
                />
              </div>

              <div>
                <Label htmlFor="location" className="font-bold mb-2 block">
                  Location
                </Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Board Room"
                  className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attendees */}
        <Card className="mb-6 bg-green-200">
          <CardHeader>
            <CardTitle className="uppercase flex items-center gap-2">
              <Users className="w-6 h-6" />
              Attendees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newAttendeeName}
                  onChange={(e) => setNewAttendeeName(e.target.value)}
                  placeholder="Attendee name"
                  className="flex-1 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
                  onKeyPress={(e) => e.key === 'Enter' && addAttendee()}
                />
                <Input
                  value={newAttendeeRole}
                  onChange={(e) => setNewAttendeeRole(e.target.value)}
                  placeholder="Role (optional)"
                  className="w-40 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
                  onKeyPress={(e) => e.key === 'Enter' && addAttendee()}
                />
                <Button
                  onClick={addAttendee}
                  className="font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </div>

              {attendees.length > 0 && (
                <div className="space-y-2">
                  {attendees.map((attendee) => (
                    <div
                      key={attendee.id}
                      className="flex items-center justify-between p-3 bg-white border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <div>
                        <p className="font-black">{attendee.name}</p>
                        <p className="text-sm font-bold text-gray-600">{attendee.role}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeAttendee(attendee.id)}
                        className="border-2 border-black"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Meeting Content */}
        <Card className="mb-6 bg-yellow-200">
          <CardHeader>
            <CardTitle className="uppercase">Meeting Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="agenda" className="font-bold mb-2 block">
                Agenda
              </Label>
              <Textarea
                id="agenda"
                value={agenda}
                onChange={(e) => setAgenda(e.target.value)}
                placeholder="List the meeting agenda items..."
                rows={4}
                className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
              />
            </div>

            <div>
              <Label htmlFor="discussion" className="font-bold mb-2 block">
                Discussion & Notes
              </Label>
              <Textarea
                id="discussion"
                value={discussion}
                onChange={(e) => setDiscussion(e.target.value)}
                placeholder="Record the main discussion points and notes..."
                rows={6}
                className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
              />
            </div>

            <div>
              <Label htmlFor="decisions" className="font-bold mb-2 block">
                Decisions Made
              </Label>
              <Textarea
                id="decisions"
                value={decisions}
                onChange={(e) => setDecisions(e.target.value)}
                placeholder="Document any decisions made during the meeting..."
                rows={4}
                className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Items */}
        <Card className="mb-6 bg-purple-200">
          <CardHeader>
            <CardTitle className="uppercase flex items-center gap-2">
              <CheckCircle className="w-6 h-6" />
              Action Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newActionItem}
                  onChange={(e) => setNewActionItem(e.target.value)}
                  placeholder="Action item description"
                  className="flex-1 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
                  onKeyPress={(e) => e.key === 'Enter' && addActionItem()}
                />
                <Input
                  value={newActionAssignee}
                  onChange={(e) => setNewActionAssignee(e.target.value)}
                  placeholder="Assigned to"
                  className="w-40 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
                  onKeyPress={(e) => e.key === 'Enter' && addActionItem()}
                />
                <Button
                  onClick={addActionItem}
                  className="font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </div>

              {actionItems.length > 0 && (
                <div className="space-y-2">
                  {actionItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-white border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <div className="flex-1">
                        <p className="font-black">{item.description}</p>
                        {item.assignedTo && (
                          <p className="text-sm font-bold text-gray-600">
                            Assigned to: {item.assignedTo}
                          </p>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeActionItem(item.id)}
                        className="border-2 border-black"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            onClick={resetForm}
            className="px-8 py-6 text-lg font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            Clear Form
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving || !meetingTitle || !meetingType}
            className="px-8 py-6 text-lg font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            <Save className="w-6 h-6 mr-2" />
            {isSaving ? 'Saving...' : 'Save Meeting Note'}
          </Button>
        </div>

        {/* Date Picker Modal */}
        <Dialog open={showDatePicker} onOpenChange={setShowDatePicker}>
          <DialogContent className="max-w-fit p-6">
            <DialogHeader>
              <DialogTitle>Select Meeting Date</DialogTitle>
            </DialogHeader>
            <Calendar
              mode="single"
              selected={meetingDate}
              onSelect={(date) => {
                if (date) {
                  setMeetingDate(date);
                  setShowDatePicker(false);
                }
              }}
              className="w-fit mx-auto"
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
