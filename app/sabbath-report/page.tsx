'use client';

import { useState } from 'react';
import { Family, Member, SabbathAttendance } from '@/types';
import { FAMILIES, DAYS_OF_WEEK } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon, Save } from 'lucide-react';
import { format } from 'date-fns';

export default function SabbathReportPage() {
  const [selectedFamily, setSelectedFamily] = useState<Family>('Salvation Siblings');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  // Mock current user - replace with actual auth
  const currentUser = {
    id: '1',
    role: 'Father',
    family: 'Salvation Siblings' as Family,
  };

  // Mock family members - replace with API call
  const familyMembers: Member[] = [];

  return (
    <div className="min-h-screen bg-[#fafafa] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black uppercase transform -rotate-1 mb-8">
          Sabbath School Report
        </h1>

        {/* Date Selection */}
        <Card className="mb-6 bg-yellow-200">
          <CardContent className="pt-6">
            <Label htmlFor="date" className="flex items-center gap-2 mb-2">
              <CalendarIcon className="w-5 h-5" />
              Select Date
            </Label>
            <div className="flex gap-4 items-start flex-wrap">
              <Input
                id="date"
                type="date"
                value={format(selectedDate, 'yyyy-MM-dd')}
                onChange={e => setSelectedDate(new Date(e.target.value))}
                className="max-w-xs"
              />
              <Button 
                variant="outline"
                onClick={() => setShowCalendar(!showCalendar)}
              >
                <CalendarIcon className="w-4 h-4 mr-2" />
                {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
              </Button>
            </div>
            
            {showCalendar && (
              <div className="mt-6 flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="w-fit"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Family Selection (only for authorized users) */}
        {(currentUser.role === 'Father' || currentUser.role === 'Mother') && (
          <Card className="mb-6 bg-blue-200">
            <CardHeader>
              <CardTitle className="uppercase">Your Family: {currentUser.family}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-bold">
                You can mark attendance for members of your family.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Attendance Form */}
        <Card className="bg-green-200">
          <CardHeader>
            <CardTitle className="uppercase">Mark Attendance - {currentUser.family}</CardTitle>
          </CardHeader>
          <CardContent>
            {familyMembers.length === 0 ? (
              <p className="text-center py-8 font-bold">
                No members found in your family. Please add members first.
              </p>
            ) : (
              <div className="space-y-6">
                {familyMembers.map(member => (
                  <AttendanceForm
                    key={member.id}
                    member={member}
                    date={format(selectedDate, 'yyyy-MM-dd')}
                    recordedBy={currentUser.id}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AttendanceForm({ 
  member, 
  date, 
  recordedBy 
}: { 
  member: Member; 
  date: string; 
  recordedBy: string;
}) {
  const [formData, setFormData] = useState({
    attendedSabbath: false,
    attendedStartingSabbath: false,
    studiedBible: 0,
    visitedPeople: false,
    wasVisited: false,
    helpedPeople: false,
    wasHelped: false,
  });

  const handleSubmit = () => {
    const attendance: Partial<SabbathAttendance> = {
      memberId: member.id,
      family: member.family,
      date: new Date(date),
      ...formData,
      recordedBy,
      createdAt: new Date(),
    };
    
    // Add API call here
    console.log('Submitting attendance:', attendance);
  };

  return (
    <Card className="bg-purple-200">
      <CardHeader>
        <CardTitle className="uppercase">{member.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <label className="flex items-center gap-2 cursor-pointer font-bold">
            <input
              type="checkbox"
              checked={formData.attendedSabbath}
              onChange={e => setFormData({ ...formData, attendedSabbath: e.target.checked })}
              className="w-5 h-5 border-4 border-black"
            />
            <span>Attended Sabbath</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer font-bold">
            <input
              type="checkbox"
              checked={formData.attendedStartingSabbath}
              onChange={e => setFormData({ ...formData, attendedStartingSabbath: e.target.checked })}
              className="w-5 h-5 border-4 border-black"
            />
            <span>Attended Starting Sabbath</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer font-bold">
            <input
              type="checkbox"
              checked={formData.visitedPeople}
              onChange={e => setFormData({ ...formData, visitedPeople: e.target.checked })}
              className="w-5 h-5 border-4 border-black"
            />
            <span>Visited People</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer font-bold">
            <input
              type="checkbox"
              checked={formData.wasVisited}
              onChange={e => setFormData({ ...formData, wasVisited: e.target.checked })}
              className="w-5 h-5 border-4 border-black"
            />
            <span>Was Visited</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer font-bold">
            <input
              type="checkbox"
              checked={formData.helpedPeople}
              onChange={e => setFormData({ ...formData, helpedPeople: e.target.checked })}
              className="w-5 h-5 border-4 border-black"
            />
            <span>Helped People</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer font-bold">
            <input
              type="checkbox"
              checked={formData.wasHelped}
              onChange={e => setFormData({ ...formData, wasHelped: e.target.checked })}
              className="w-5 h-5 border-4 border-black"
            />
            <span>Was Helped</span>
          </label>
        </div>

        <div className="mt-4">
          <Label htmlFor="bible-days">Days Studied Bible (0-7)</Label>
          <Input
            id="bible-days"
            type="number"
            min="0"
            max="7"
            value={formData.studiedBible}
            onChange={e => setFormData({ ...formData, studiedBible: parseInt(e.target.value) || 0 })}
            className="w-32 mt-2"
          />
        </div>

        <Button onClick={handleSubmit} className="mt-4">
          <Save className="w-4 h-4 mr-2" />
          Save Attendance
        </Button>
      </CardContent>
    </Card>
  );
}
