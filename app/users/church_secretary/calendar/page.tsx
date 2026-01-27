'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Plus
} from 'lucide-react';
import Link from 'next/link';

export default function MeetingCalendarPage() {
  // Mock data - replace with API call
  const upcomingMeetings = [
    {
      id: '1',
      title: 'Finance Committee',
      date: new Date('2026-01-28'),
      time: '14:00',
      endTime: '16:00',
      location: 'Conference Room A',
      type: 'Committee Meeting',
    },
    {
      id: '2',
      title: 'Worship Team Meeting',
      date: new Date('2026-01-30'),
      time: '18:00',
      endTime: '20:00',
      location: 'Sanctuary',
      type: 'Ministry Meeting',
    },
    {
      id: '3',
      title: 'Church Board Meeting',
      date: new Date('2026-02-01'),
      time: '10:00',
      endTime: '12:00',
      location: 'Board Room',
      type: 'Board Meeting',
    },
    {
      id: '4',
      title: 'Youth Ministry Planning',
      date: new Date('2026-02-03'),
      time: '17:00',
      endTime: '19:00',
      location: 'Youth Hall',
      type: 'Ministry Meeting',
    },
    {
      id: '5',
      title: 'Elders Council',
      date: new Date('2026-02-05'),
      time: '09:00',
      endTime: '11:00',
      location: 'Conference Room B',
      type: 'Council Meeting',
    },
  ];

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
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black uppercase transform -rotate-1 mb-2">
              Meeting Calendar
            </h1>
            <p className="text-lg font-bold text-gray-600">
              Upcoming scheduled meetings
            </p>
          </div>
          <Link href="/users/secretary/new-note">
            <Button className="font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
              <Plus className="w-5 h-5 mr-2" />
              New Meeting
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          {upcomingMeetings.map((meeting) => (
            <Card
              key={meeting.id}
              className={`${getTypeColor(meeting.type)} border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all`}
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <CalendarIcon className="w-6 h-6 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-2xl font-black mb-1">{meeting.title}</h3>
                        <p className="text-sm font-bold uppercase px-3 py-1 bg-black text-white inline-block">
                          {meeting.type}
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-3 mt-4">
                      <div className="flex items-center gap-2 font-bold">
                        <CalendarIcon className="w-5 h-5" />
                        <span>
                          {new Date(meeting.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 font-bold">
                        <Clock className="w-5 h-5" />
                        <span>{meeting.time} - {meeting.endTime}</span>
                      </div>

                      <div className="flex items-center gap-2 font-bold">
                        <MapPin className="w-5 h-5" />
                        <span>{meeting.location}</span>
                      </div>
                    </div>
                  </div>

                  <Link href="/users/secretary/new-note">
                    <Button
                      variant="outline"
                      className="font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                    >
                      Create Note
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
