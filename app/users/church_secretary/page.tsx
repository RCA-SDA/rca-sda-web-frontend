'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Calendar,
  Clock,
  TrendingUp,
  Plus,
  Eye
} from 'lucide-react';
import Link from 'next/link';

export default function SecretaryDashboard() {
  // Mock data - replace with actual API calls
  const stats = {
    totalNotes: 45,
    thisMonth: 8,
    upcomingMeetings: 3,
    recentActivity: 12,
  };

  const recentNotes = [
    {
      id: '1',
      title: 'Church Board Meeting',
      date: new Date('2026-01-25'),
      meetingType: 'Board Meeting',
      attendees: 12,
    },
    {
      id: '2',
      title: 'Elders Council Meeting',
      date: new Date('2026-01-20'),
      meetingType: 'Council',
      attendees: 8,
    },
    {
      id: '3',
      title: 'Youth Ministry Planning',
      date: new Date('2026-01-18'),
      meetingType: 'Ministry',
      attendees: 6,
    },
  ];

  const upcomingMeetings = [
    {
      id: '1',
      title: 'Finance Committee',
      date: new Date('2026-01-28'),
      time: '14:00',
      location: 'Conference Room A',
    },
    {
      id: '2',
      title: 'Worship Team Meeting',
      date: new Date('2026-01-30'),
      time: '18:00',
      location: 'Sanctuary',
    },
    {
      id: '3',
      title: 'Church Board Meeting',
      date: new Date('2026-02-01'),
      time: '10:00',
      location: 'Board Room',
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black uppercase transform -rotate-1 mb-2">
            Secretary Dashboard
          </h1>
          <p className="text-xl font-bold">
            Welcome back! Manage your meeting notes and schedules
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-blue-200 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
            <CardHeader>
              <CardTitle className="uppercase text-sm flex items-center justify-between">
                <span>Total Notes</span>
                <FileText className="w-6 h-6" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-black">{stats.totalNotes}</p>
              <p className="text-sm font-bold mt-2">All meeting notes</p>
            </CardContent>
          </Card>

          <Card className="bg-green-200 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
            <CardHeader>
              <CardTitle className="uppercase text-sm flex items-center justify-between">
                <span>This Month</span>
                <TrendingUp className="w-6 h-6" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-black">{stats.thisMonth}</p>
              <p className="text-sm font-bold mt-2">Notes created</p>
            </CardContent>
          </Card>

          <Card className="bg-purple-200 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
            <CardHeader>
              <CardTitle className="uppercase text-sm flex items-center justify-between">
                <span>Upcoming</span>
                <Calendar className="w-6 h-6" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-black">{stats.upcomingMeetings}</p>
              <p className="text-sm font-bold mt-2">Scheduled meetings</p>
            </CardContent>
          </Card>

          <Card className="bg-yellow-200 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
            <CardHeader>
              <CardTitle className="uppercase text-sm flex items-center justify-between">
                <span>Recent Activity</span>
                <Clock className="w-6 h-6" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-black">{stats.recentActivity}</p>
              <p className="text-sm font-bold mt-2">Last 7 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8 bg-orange-200">
          <CardHeader>
            <CardTitle className="uppercase flex items-center gap-2">
              <Plus className="w-6 h-6" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/users/secretary/new-note">
                <Button className="w-full h-20 text-lg font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
                  <FileText className="w-6 h-6 mr-2" />
                  New Meeting Note
                </Button>
              </Link>

              <Link href="/users/secretary/notes">
                <Button 
                  variant="outline"
                  className="w-full h-20 text-lg font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  <Eye className="w-6 h-6 mr-2" />
                  View All Notes
                </Button>
              </Link>

              <Link href="/users/secretary/calendar">
                <Button 
                  variant="outline"
                  className="w-full h-20 text-lg font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  <Calendar className="w-6 h-6 mr-2" />
                  Meeting Calendar
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Notes */}
          <Card className="bg-pink-200">
            <CardHeader>
              <CardTitle className="uppercase flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <FileText className="w-6 h-6" />
                  Recent Notes
                </span>
                <Link href="/users/secretary/notes">
                  <Button size="sm" variant="outline">
                    View All
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentNotes.map((note) => (
                  <div 
                    key={note.id}
                    className="flex items-center justify-between p-3 bg-white border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                  >
                    <div className="flex-1">
                      <p className="font-black">{note.title}</p>
                      <p className="text-sm font-bold text-gray-600">
                        {note.meetingType} • {note.attendees} attendees
                      </p>
                      <p className="text-xs font-bold text-gray-500 mt-1">
                        {new Date(note.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    <Eye className="w-5 h-5 flex-shrink-0" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Meetings */}
          <Card className="bg-cyan-200">
            <CardHeader>
              <CardTitle className="uppercase flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Calendar className="w-6 h-6" />
                  Upcoming Meetings
                </span>
                <Link href="/users/secretary/calendar">
                  <Button size="sm" variant="outline">
                    View Calendar
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingMeetings.map((meeting) => (
                  <div 
                    key={meeting.id}
                    className="p-3 bg-white border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <p className="font-black">{meeting.title}</p>
                    <div className="flex items-center gap-2 mt-2 text-sm font-bold text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(meeting.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-sm font-bold text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{meeting.time} • {meeting.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
