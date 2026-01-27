'use client';

import { useState } from 'react';
import { Family, Member } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar as CalendarIcon, Save, AlertCircle, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

type MemberAttendanceData = {
  memberId: string;
  isPresent: boolean;
  hasReason: boolean;
  hasNoReason: boolean;
  isSick: boolean;
  attendedSabbath: boolean;
  attendedStartingSabbath: boolean;
  studiedBible: boolean;
  visitedPeople: boolean;
  wasVisited: boolean;
  helpedPeople: boolean;
  wasHelped: boolean;
};

export default function SabbathReportPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [attendanceData, setAttendanceData] = useState<Record<string, MemberAttendanceData>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [confirmDate, setConfirmDate] = useState<Date>(new Date());

  // Mock current user - replace with actual auth
  const currentUser = {
    id: '2',
    role: 'Mother',
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
      level: 'Y1',
      status: 'Current Student',
      createdAt: new Date(),
    },
    {
      id: '2',
      name: 'Sarah Smith',
      family: 'Salvation Siblings',
      role: 'Mother',
      email: 'sarah.smith@example.com',
      level: 'Y1',
      status: 'Current Student',
      createdAt: new Date(),
    },
    {
      id: '3',
      name: 'David Smith',
      family: 'Salvation Siblings',
      role: 'Member',
      email: 'david.smith@example.com',
      level: 'Y2',
      status: 'Current Student',
      createdAt: new Date(),
    },
    {
      id: '4',
      name: 'Emma Smith',
      family: 'Salvation Siblings',
      role: 'Member',
      email: 'emma.smith@example.com',
      level: 'Y1',
      status: 'Current Student',
      createdAt: new Date(),
    },
  ];

  // Initialize attendance data for all members
  const initializeAttendanceData = () => {
    const initialData: Record<string, MemberAttendanceData> = {};
    familyMembers.forEach(member => {
      initialData[member.id] = {
        memberId: member.id,
        isPresent: true,
        hasReason: false,
        hasNoReason: false,
        isSick: false,
        attendedSabbath: false,
        attendedStartingSabbath: false,
        studiedBible: false,
        visitedPeople: false,
        wasVisited: false,
        helpedPeople: false,
        wasHelped: false,
      };
    });
    setAttendanceData(initialData);
  };

  // Initialize on mount or when family members change
  useState(() => {
    if (Object.keys(attendanceData).length === 0) {
      initializeAttendanceData();
    }
  });

  const updateMemberAttendance = (memberId: string, updates: Partial<MemberAttendanceData>) => {
    setAttendanceData(prev => ({
      ...prev,
      [memberId]: {
        ...prev[memberId],
        ...updates,
      },
    }));
  };

  const handleSaveAllClick = () => {
    setConfirmDate(selectedDate);
    setShowSaveModal(true);
  };

  const handleConfirmSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    setShowSaveModal(false);

    try {
      // Prepare all attendance records
      const attendanceRecords = Object.values(attendanceData).map(data => ({
        memberId: data.memberId,
        family: currentUser.family,
        date: new Date(format(confirmDate, 'yyyy-MM-dd')),
        isPresent: data.isPresent,
        hasReason: !data.isPresent ? data.hasReason : undefined,
        hasNoReason: !data.isPresent ? data.hasNoReason : undefined,
        isSick: !data.isPresent ? data.isSick : undefined,
        attendedSabbath: data.attendedSabbath,
        attendedStartingSabbath: data.attendedStartingSabbath,
        studiedBible: data.studiedBible,
        visitedPeople: data.visitedPeople,
        wasVisited: data.wasVisited,
        helpedPeople: data.helpedPeople,
        wasHelped: data.wasHelped,
        recordedBy: currentUser.id,
        createdAt: new Date(),
      }));

      // Add API call here to save all records at once
      console.log('Submitting collective attendance:', attendanceRecords);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving attendance:', error);
    } finally {
      setIsSaving(false);
    }
  };

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
            <CardTitle className="uppercase flex items-center justify-between">
              <span>Mark Attendance - {currentUser.family}</span>
              {saveSuccess && (
                <span className="flex items-center gap-2 text-green-700 text-sm font-bold">
                  <CheckCircle className="w-5 h-5" />
                  Saved Successfully!
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {familyMembers.length === 0 ? (
              <p className="text-center py-8 font-bold">
                No members found in your family. Please add members first.
              </p>
            ) : (
              <>
                <div className="space-y-6">
                  {familyMembers.map(member => (
                    <MemberAttendanceCard
                      key={member.id}
                      member={member}
                      data={attendanceData[member.id] || {
                        memberId: member.id,
                        isPresent: true,
                        hasReason: false,
                        hasNoReason: false,
                        isSick: false,
                        attendedSabbath: false,
                        attendedStartingSabbath: false,
                        studiedBible: false,
                        visitedPeople: false,
                        wasVisited: false,
                        helpedPeople: false,
                        wasHelped: false,
                      }}
                      onUpdate={(updates) => updateMemberAttendance(member.id, updates)}
                    />
                  ))}
                </div>

                {/* Collective Save Button */}
                <div className="mt-6 flex justify-center">
                  <Button 
                    onClick={handleSaveAllClick}
                    disabled={isSaving}
                    className="w-full md:w-auto px-8 py-6 text-lg font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    <Save className="w-6 h-6 mr-2" />
                    {isSaving ? 'Saving...' : 'Save All Attendance'}
                  </Button>
                </div>
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

        {/* Save Confirmation Modal */}
        <Dialog open={showSaveModal} onOpenChange={setShowSaveModal}>
          <DialogContent className="max-w-md p-6 bg-yellow-100 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black uppercase">Confirm Sabbath Date</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 mt-4">
              <p className="font-bold text-lg">
                Please confirm the Sabbath date for this attendance report:
              </p>
              
              <div className="p-4 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Label htmlFor="confirm-date" className="flex items-center gap-2 mb-2 font-bold">
                  <CalendarIcon className="w-5 h-5" />
                  Sabbath Date
                </Label>
                <Calendar
                  mode="single"
                  selected={confirmDate}
                  onSelect={(date) => {
                    if (date) {
                      setConfirmDate(date);
                    }
                  }}
                  className="w-fit mx-auto"
                />
                <div className="mt-4 text-center">
                  <p className="text-xl font-black">
                    {format(confirmDate, 'EEEE, MMMM dd, yyyy')}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setShowSaveModal(false)}
                  className="flex-1 font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmSave}
                  className="flex-1 font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Confirm & Save
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

function MemberAttendanceCard({ 
  member, 
  data,
  onUpdate,
}: { 
  member: Member; 
  data: MemberAttendanceData;
  onUpdate: (updates: Partial<MemberAttendanceData>) => void;
}) {
  return (
    <Card className="bg-purple-200">
      <CardHeader>
        <CardTitle className="uppercase">{member.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Presence Check */}
        <div className="mb-6 p-4 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <label className="flex items-center gap-2 cursor-pointer font-bold text-lg">
            <input
              type="checkbox"
              checked={data.isPresent}
              onChange={e => onUpdate({ 
                isPresent: e.target.checked,
                hasReason: e.target.checked ? false : data.hasReason,
                hasNoReason: e.target.checked ? false : data.hasNoReason,
                isSick: e.target.checked ? false : data.isSick,
              })}
              className="w-6 h-6 border-4 border-black"
            />
            <span>Present</span>
          </label>
        </div>

        {/* Absence Fields - Only show if not present */}
        {!data.isPresent && (
          <div className="mb-6 p-4 bg-red-50 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
            <div className="flex items-center gap-2 text-red-700 font-black">
              <AlertCircle className="w-5 h-5" />
              <span>Member Absent</span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <label className="flex items-center gap-2 cursor-pointer font-bold">
                <input
                  type="checkbox"
                  checked={data.hasReason}
                  onChange={e => onUpdate({ 
                    hasReason: e.target.checked,
                    hasNoReason: e.target.checked ? false : data.hasNoReason
                  })}
                  className="w-5 h-5 border-4 border-black"
                />
                <span>Has Reason</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer font-bold">
                <input
                  type="checkbox"
                  checked={data.hasNoReason}
                  onChange={e => onUpdate({ 
                    hasNoReason: e.target.checked,
                    hasReason: e.target.checked ? false : data.hasReason
                  })}
                  className="w-5 h-5 border-4 border-black"
                />
                <span>Has No Reason</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer font-bold">
                <input
                  type="checkbox"
                  checked={data.isSick}
                  onChange={e => onUpdate({ isSick: e.target.checked })}
                  className="w-5 h-5 border-4 border-black"
                />
                <span>Due to Sickness</span>
              </label>
            </div>
          </div>
        )}

        {/* Activity Checkboxes - Always visible */}
        <div className="grid md:grid-cols-2 gap-4">
          <label className="flex items-center gap-2 cursor-pointer font-bold">
            <input
              type="checkbox"
              checked={data.attendedSabbath}
              onChange={e => onUpdate({ attendedSabbath: e.target.checked })}
              className="w-5 h-5 border-4 border-black"
            />
            <span>Attended Sabbath</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer font-bold">
            <input
              type="checkbox"
              checked={data.attendedStartingSabbath}
              onChange={e => onUpdate({ attendedStartingSabbath: e.target.checked })}
              className="w-5 h-5 border-4 border-black"
            />
            <span>Attended Starting Sabbath</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer font-bold">
            <input
              type="checkbox"
              checked={data.visitedPeople}
              onChange={e => onUpdate({ visitedPeople: e.target.checked })}
              className="w-5 h-5 border-4 border-black"
            />
            <span>Visited People</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer font-bold">
            <input
              type="checkbox"
              checked={data.wasVisited}
              onChange={e => onUpdate({ wasVisited: e.target.checked })}
              className="w-5 h-5 border-4 border-black"
            />
            <span>Was Visited</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer font-bold">
            <input
              type="checkbox"
              checked={data.helpedPeople}
              onChange={e => onUpdate({ helpedPeople: e.target.checked })}
              className="w-5 h-5 border-4 border-black"
            />
            <span>Helped People</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer font-bold">
            <input
              type="checkbox"
              checked={data.wasHelped}
              onChange={e => onUpdate({ wasHelped: e.target.checked })}
              className="w-5 h-5 border-4 border-black"
            />
            <span>Was Helped</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer font-bold">
            <input
              type="checkbox"
              checked={data.studiedBible}
              onChange={e => onUpdate({ studiedBible: e.target.checked })}
              className="w-5 h-5 border-4 border-black"
            />
            <span>Studied Whole Week</span>
          </label>
        </div>
      </CardContent>
    </Card>
  );
}
