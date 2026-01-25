'use client';

import { useState } from 'react';
import { Family, Member, SabbathAttendance } from '@/types';
import { FAMILIES, DAYS_OF_WEEK } from '@/lib/constants';

export default function SabbathReportPage() {
  const [selectedFamily, setSelectedFamily] = useState<Family>('Salvation Siblings');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Mock current user - replace with actual auth
  const currentUser = {
    id: '1',
    role: 'Father',
    family: 'Salvation Siblings' as Family,
  };

  // Mock family members - replace with API call
  const familyMembers: Member[] = [];

  return (
    <div className="min-h-screen bg-zinc-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-zinc-900 mb-8">
          Sabbath School Report
        </h1>

        {/* Date Selection */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <label className="block text-sm font-medium mb-2 text-zinc-700">
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            className="px-4 py-2 border border-zinc-300 rounded-lg bg-white text-zinc-900"
          />
        </div>

        {/* Family Selection (only for authorized users) */}
        {(currentUser.role === 'Father' || currentUser.role === 'Mother') && (
          <div className="bg-white rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-zinc-900">
              Your Family: {currentUser.family}
            </h2>
            <p className="text-zinc-600">
              You can mark attendance for members of your family.
            </p>
          </div>
        )}

        {/* Attendance Form */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6 text-zinc-900">
            Mark Attendance - {currentUser.family}
          </h2>

          {familyMembers.length === 0 ? (
            <p className="text-zinc-500 text-center py-8">
              No members found in your family. Please add members first.
            </p>
          ) : (
            <div className="space-y-6">
              {familyMembers.map(member => (
                <AttendanceForm
                  key={member.id}
                  member={member}
                  date={selectedDate}
                  recordedBy={currentUser.id}
                />
              ))}
            </div>
          )}
        </div>
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
    <div className="border border-zinc-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4 text-zinc-900">
        {member.name}
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.attendedSabbath}
            onChange={e => setFormData({ ...formData, attendedSabbath: e.target.checked })}
            className="w-4 h-4 rounded"
          />
          <span className="text-zinc-700">Attended Sabbath</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.attendedStartingSabbath}
            onChange={e => setFormData({ ...formData, attendedStartingSabbath: e.target.checked })}
            className="w-4 h-4 rounded"
          />
          <span className="text-zinc-700">Attended Starting Sabbath</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.visitedPeople}
            onChange={e => setFormData({ ...formData, visitedPeople: e.target.checked })}
            className="w-4 h-4 rounded"
          />
          <span className="text-zinc-700">Visited People</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.wasVisited}
            onChange={e => setFormData({ ...formData, wasVisited: e.target.checked })}
            className="w-4 h-4 rounded"
          />
          <span className="text-zinc-700">Was Visited</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.helpedPeople}
            onChange={e => setFormData({ ...formData, helpedPeople: e.target.checked })}
            className="w-4 h-4 rounded"
          />
          <span className="text-zinc-700">Helped People</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.wasHelped}
            onChange={e => setFormData({ ...formData, wasHelped: e.target.checked })}
            className="w-4 h-4 rounded"
          />
          <span className="text-zinc-700">Was Helped</span>
        </label>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium mb-2 text-zinc-700">
          Days Studied Bible (0-7)
        </label>
        <input
          type="number"
          min="0"
          max="7"
          value={formData.studiedBible}
          onChange={e => setFormData({ ...formData, studiedBible: parseInt(e.target.value) || 0 })}
          className="w-32 px-3 py-2 border border-zinc-300 rounded-lg bg-white text-zinc-900"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Save Attendance
      </button>
    </div>
  );
}
