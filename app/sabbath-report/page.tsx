'use client';

import { useState } from 'react';
import { Family, Member, SabbathAttendance } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Pagination } from '@/components/Pagination';
import { Calendar as CalendarIcon, Save } from 'lucide-react';
import { format } from 'date-fns';

export default function SabbathReportPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Mock current user - replace with actual auth
  const currentUser = {
    id: '1',
    role: 'Father',
    family: 'Salvation Siblings' as Family,
  };

  // Mock family members - replace with API call
  const familyMembers: Member[] = [
    {
      id: '1',
      name: 'John Smith',
      family: 'Salvation Siblings',
      role: 'Father',
      email: 'john.smith@example.com',
      phone: '555-0101',
      address: '123 Faith Street',
      dateOfBirth: new Date('1980-05-15'),
      baptismDate: new Date('2005-08-20'),
      joinedDate: new Date('2005-08-20'),
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Sarah Smith',
      family: 'Salvation Siblings',
      role: 'Mother',
      email: 'sarah.smith@example.com',
      phone: '555-0102',
      address: '123 Faith Street',
      dateOfBirth: new Date('1982-09-22'),
      baptismDate: new Date('2006-03-15'),
      joinedDate: new Date('2006-03-15'),
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      name: 'David Smith',
      family: 'Salvation Siblings',
      role: 'Youth',
      email: 'david.smith@example.com',
      phone: '555-0103',
      address: '123 Faith Street',
      dateOfBirth: new Date('2008-12-10'),
      baptismDate: new Date('2020-07-18'),
      joinedDate: new Date('2020-07-18'),
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '4',
      name: 'Emma Smith',
      family: 'Salvation Siblings',
      role: 'Child',
      email: 'emma.smith@example.com',
      phone: '555-0104',
      address: '123 Faith Street',
      dateOfBirth: new Date('2012-04-05'),
      joinedDate: new Date('2012-04-05'),
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

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
            <div className="flex gap-4 items-center flex-wrap">
              <Input
                id="date"
                type="text"
                value={format(selectedDate, 'MMMM dd, yyyy')}
                readOnly
                className="max-w-xs cursor-pointer"
                onClick={() => setShowCalendar(true)}
              />
              <Button 
                variant="default"
                onClick={() => setShowCalendar(true)}
              >
                <CalendarIcon className="w-4 h-4 mr-2" />
                Choose Date
              </Button>
            </div>
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
              <>
                <div className="space-y-6">
                  {familyMembers
                    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    .map(member => (
                      <AttendanceForm
                        key={member.id}
                        member={member}
                        date={format(selectedDate, 'yyyy-MM-dd')}
                        recordedBy={currentUser.id}
                      />
                    ))}
                </div>
                
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(familyMembers.length / itemsPerPage)}
                  onPageChange={setCurrentPage}
                  itemsPerPage={itemsPerPage}
                  totalItems={familyMembers.length}
                  onItemsPerPageChange={setItemsPerPage}
                  itemsPerPageOptions={[2, 5, 10, 20]}
                />
              </>
            )}
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
              selected={selectedDate}
              onSelect={(date) => {
                if (date) {
                  setSelectedDate(date);
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
    studiedBible: false,
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

          <label className="flex items-center gap-2 cursor-pointer font-bold">
            <input
              type="checkbox"
              checked={formData.studiedBible}
              onChange={e => setFormData({ ...formData, studiedBible: e.target.checked })}
              className="w-5 h-5 border-4 border-black"
            />
            <span>Studied Whole Week</span>
          </label>
        </div>

        <Button onClick={handleSubmit} className="mt-4">
          <Save className="w-4 h-4 mr-2" />
          Save Attendance
        </Button>
      </CardContent>
    </Card>
  );
}
