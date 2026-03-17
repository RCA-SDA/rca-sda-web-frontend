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
  Calendar as CalendarIcon,
  Save,
  Plus,
  X,
  FileText,
  CheckCircle2,
  ClipboardList
} from 'lucide-react';
import { format } from 'date-fns';
import { useAllUsers } from '@/lib/hooks/useFamily';
import { useCreateMeetingNote } from '@/lib/hooks/useMeetingNotes';
import { User } from '@/lib/services/family.service';

export default function NewMeetingNotePage() {
  const [formData, setFormData] = useState({
    title: '',
    date: new Date(),
    recorder: '',
    attendees: [] as number[],
    notes: '',
  });
  const [agendaItems, setAgendaItems] = useState<string[]>(['']);
  const [decisions, setDecisions] = useState<string[]>(['']);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  // Fetch users and meeting note mutation
  const { data: users = [], isLoading: isLoadingUsers } = useAllUsers();
  const createMeetingNoteMutation = useCreateMeetingNote();

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

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const meetingNoteData = {
        agendaItems: agendaItems.filter(item => item.trim() !== ''),
        decisions: decisions.filter(decision => decision.trim() !== ''),
        notes: formData.notes,
        attendeeIds: formData.attendees,
      };

      console.log('Saving meeting note:', meetingNoteData);

      const result = await createMeetingNoteMutation.mutateAsync(meetingNoteData);
      console.log('Meeting note created successfully:', result);

      setSaveSuccess(true);

      // Reset form after 2 seconds
      setTimeout(() => {
        resetForm();
        setSaveSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Error saving meeting note:', error);
      setSaveSuccess(false);
    } finally {
      setIsSaving(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      date: new Date(),
      recorder: '',
      attendees: [],
      notes: '',
    });
    setAgendaItems(['']);
    setDecisions(['']);
  };

  const handleAttendeeChange = (userId: string, isChecked: boolean) => {
    const userIdNum = parseInt(userId);
    if (isChecked) {
      setFormData(prev => ({
        ...prev,
        attendees: [...prev.attendees, userIdNum]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        attendees: prev.attendees.filter(id => id !== userIdNum)
      }));
    }
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
              <CheckCircle2 className="w-5 h-5 text-green-700" />
              <span className="font-black text-green-700">Saved Successfully!</span>
            </div>
          )}
        </div>

        <Card className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="pt-6">
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6">
              {/* Meeting Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="font-bold">Meeting Title *</Label>
                <Input
                  id="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Monthly Committee Meeting"
                  className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
                />
              </div>

              {/* Date and Recorder */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center gap-2 font-bold">
                    <CalendarIcon className="w-4 h-4" />
                    Meeting Date *
                  </Label>
                  <Input
                    id="date"
                    type="text"
                    required
                    value={format(formData.date, 'MMMM dd, yyyy')}
                    readOnly
                    className="cursor-pointer border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
                    onClick={() => setShowCalendar(true)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recorder" className="font-bold">Meeting Recorder *</Label>
                  <Input
                    id="recorder"
                    type="text"
                    required
                    value={formData.recorder}
                    onChange={e => setFormData({ ...formData, recorder: e.target.value })}
                    placeholder="e.g., Elder John Smith"
                    className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
                  />
                </div>
              </div>

              {/* Attendees */}
              <div className="space-y-2">
                <Label className="font-bold">Attendees *</Label>
                <div className="border-4 border-black rounded-lg p-4 bg-gray-50 max-h-40 overflow-y-auto">
                  {isLoadingUsers ? (
                    <p className="text-center text-gray-500">Loading users...</p>
                  ) : users.length === 0 ? (
                    <p className="text-center text-gray-500">No users available</p>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      {users.map((user: User) => (
                        <label key={user.id} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
                          <input
                            type="checkbox"
                            checked={formData.attendees.includes(user.id)}
                            onChange={(e) => handleAttendeeChange(user.id.toString(), e.target.checked)}
                            className="w-4 h-4 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm font-medium">
                            {user.firstName} {user.lastName}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
                {formData.attendees.length > 0 && (
                  <p className="text-sm text-gray-600">
                    {formData.attendees.length} attendee{formData.attendees.length !== 1 ? 's' : ''} selected
                  </p>
                )}
              </div>

              {/* Meeting Agenda */}
              <div className="space-y-2">
                <Label className="flex items-center justify-between font-bold">
                  <span className="flex items-center gap-2">
                    <ClipboardList className="w-4 h-4" />
                    Meeting Agenda
                  </span>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={addAgendaItem}
                    className="h-8 border-2 border-black font-bold"
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
                        className="flex-1 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
                      />
                      {agendaItems.length > 1 && (
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => removeAgendaItem(index)}
                          className="px-3 border-2 border-black"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Meeting Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes" className="font-bold">Meeting Notes *</Label>
                <Textarea
                  id="notes"
                  required
                  rows={8}
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Enter detailed meeting notes..."
                  className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
                />
              </div>

              {/* Decisions */}
              <div className="space-y-2">
                <Label className="flex items-center justify-between font-bold">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Decisions & Action Items
                  </span>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={addDecision}
                    className="h-8 border-2 border-black font-bold"
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
                        className="flex-1 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
                      />
                      {decisions.length > 1 && (
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => removeDecision(index)}
                          className="px-3 border-2 border-black"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  className="flex-1 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black uppercase hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  Clear Form
                </Button>
                <Button
                  type="submit"
                  disabled={isSaving || createMeetingNoteMutation.isPending}
                  className="flex-1 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black uppercase hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  <Save className="w-5 h-5 mr-2" />
                  {isSaving || createMeetingNoteMutation.isPending ? 'Saving...' : 'Save Meeting'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

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
      </div>
    </div>
  );
}
