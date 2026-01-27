'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, CheckCircle, XCircle, ArrowLeft, User, Calendar } from 'lucide-react';
import Link from 'next/link';

interface Testimony {
  id: number;
  author: string;
  title: string;
  content: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export default function ApproveTestimoniesPage() {
  const [testimonies, setTestimonies] = useState<Testimony[]>([
    {
      id: 1,
      author: 'Sarah Johnson',
      title: 'God\'s Healing Power',
      content: 'I was diagnosed with a serious illness last year, but through prayer and faith, God completely healed me. The doctors were amazed at my recovery...',
      date: '2026-01-25',
      status: 'pending',
    },
    {
      id: 2,
      author: 'Michael Brown',
      title: 'From Darkness to Light',
      content: 'I was lost in addiction for many years, but God found me and transformed my life. Today I am free and serving Him with all my heart...',
      date: '2026-01-24',
      status: 'pending',
    },
    {
      id: 3,
      author: 'Grace Williams',
      title: 'Financial Breakthrough',
      content: 'When I lost my job, I didn\'t know how I would provide for my family. But God opened doors I never imagined and blessed me abundantly...',
      date: '2026-01-23',
      status: 'pending',
    },
  ]);

  const handleApprove = (id: number) => {
    setTestimonies(testimonies.map(t => 
      t.id === id ? { ...t, status: 'approved' as const } : t
    ));
    alert('Testimony approved!');
  };

  const handleReject = (id: number) => {
    setTestimonies(testimonies.map(t => 
      t.id === id ? { ...t, status: 'rejected' as const } : t
    ));
    alert('Testimony rejected!');
  };

  const pendingTestimonies = testimonies.filter(t => t.status === 'pending');

  return (
    <div className="min-h-screen bg-[#fafafa] py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black uppercase transform -rotate-1 mb-2">
              Approve Testimonies
            </h1>
            <p className="text-lg font-bold text-gray-600">
              Review and approve member testimonies
            </p>
          </div>
          <Link href="/users/evangelism_leader_male">
            <Button className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all bg-gray-200">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <Card className="mb-8 bg-orange-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-black uppercase text-gray-600">Pending Testimonies</p>
                <p className="text-4xl font-black">{pendingTestimonies.length}</p>
              </div>
              <MessageSquare className="w-12 h-12" />
            </div>
          </CardContent>
        </Card>

        {/* Testimonies List */}
        <div className="space-y-6">
          {pendingTestimonies.length === 0 ? (
            <Card className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <CardContent className="p-12 text-center">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-xl font-black uppercase text-gray-600">
                  No pending testimonies
                </p>
                <p className="text-sm font-bold text-gray-500 mt-2">
                  All testimonies have been reviewed
                </p>
              </CardContent>
            </Card>
          ) : (
            pendingTestimonies.map((testimony) => (
              <Card key={testimony.id} className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <CardHeader className="bg-yellow-100 border-b-4 border-black">
                  <CardTitle className="uppercase flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <MessageSquare className="w-6 h-6" />
                      {testimony.title}
                    </span>
                    <span className="text-sm font-black uppercase bg-orange-400 px-3 py-1 border-2 border-black">
                      Pending
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Author and Date */}
                    <div className="flex items-center gap-6 text-sm font-bold text-gray-600">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{testimony.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(testimony.date).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <p className="text-base leading-relaxed">
                      {testimony.content}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                      <Button
                        onClick={() => handleApprove(testimony.id)}
                        className="flex-1 h-12 font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all bg-green-400"
                      >
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleReject(testimony.id)}
                        className="flex-1 h-12 font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all bg-red-400"
                      >
                        <XCircle className="w-5 h-5 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
