'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MessageSquare, CheckCircle, XCircle, ArrowLeft, User, Calendar, Eye, Heart } from 'lucide-react';
import Link from 'next/link';
import { DateSearchFilter } from '@/components/DateSearchFilter';

interface Testimony {
  id: number;
  author: string;
  title: string;
  content: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  authorEmail?: string;
}

export default function ApproveTestimoniesPage() {
  const [testimonies, setTestimonies] = useState<Testimony[]>([
    {
      id: 1,
      author: 'Sarah Johnson',
      authorEmail: 'sarah.j@example.com',
      title: 'God\'s Healing Power',
      content: `I was diagnosed with a serious illness last year, but through prayer and faith, God completely healed me. The doctors were amazed at my recovery.

I want to share this testimony to encourage others who might be facing health challenges. When I first received the diagnosis, I was devastated. The doctors told me the treatment would be long and difficult, with no guarantee of success.

But I remembered the scripture in Jeremiah 30:17: "For I will restore health to you, and your wounds I will heal, declares the Lord." I held onto that promise and prayed earnestly every day.

The church family rallied around me with prayers, visits, and support. Their faith strengthened mine during the darkest moments. After months of treatment and constant prayer, I went for my follow-up examination.

The doctors were shocked - the illness was completely gone! They called it a medical miracle, but I know it was God's healing power. Today, I stand as a living testimony that God still heals.

If you're facing a health crisis, don't lose hope. God is faithful, and He hears our prayers. Trust in His timing and His power to heal.`,
      date: '2026-01-25',
      status: 'pending',
    },
    {
      id: 2,
      author: 'Michael Brown',
      authorEmail: 'michael.b@example.com',
      title: 'From Darkness to Light',
      content: `I was lost in addiction for many years, but God found me and transformed my life. Today I am free and serving Him with all my heart.

My story begins in a dark place. For over a decade, I struggled with substance abuse. It destroyed my relationships, my career, and nearly took my life. I tried to quit countless times, but I always fell back into the same destructive patterns.

One night, I hit rock bottom. I was alone, broken, and contemplating ending my life. In that moment of desperation, I cried out to God: "If you're real, please help me!"

The next morning, my cousin invited me to church. I hadn't been to church in years, but something compelled me to go. That Sunday, Pastor John preached about freedom in Christ and breaking the chains of addiction.

When the altar call was made, I went forward with tears streaming down my face. The pastor and elders prayed for me, and I felt the power of God like never before. That day, God broke the chains that had bound me for so long.

It's been 18 months since that day, and I haven't touched drugs or alcohol. God has restored my relationships, given me a new job, and filled my life with purpose. I now volunteer with the church's addiction recovery ministry, helping others find the freedom I found in Christ.

If you're struggling with addiction, there is hope. Jesus can set you free. Don't wait until you hit rock bottom like I did. Reach out for help today. God is waiting with open arms.`,
      date: '2026-01-24',
      status: 'pending',
    },
    {
      id: 3,
      author: 'Grace Williams',
      authorEmail: 'grace.w@example.com',
      title: 'Financial Breakthrough',
      content: `When I lost my job, I didn't know how I would provide for my family. But God opened doors I never imagined and blessed me abundantly.

Last year was one of the most challenging times of my life. I was unexpectedly laid off from my job of 10 years. I had three children to feed, rent to pay, and no savings to fall back on. I was terrified and didn't know what to do.

In my desperation, I remembered the scripture in Philippians 4:19: "And my God will meet all your needs according to the riches of his glory in Christ Jesus." I decided to trust God completely, even when I couldn't see a way forward.

I shared my situation with the church family, and the response was overwhelming. People brought groceries, helped with bills, and encouraged me with prayers and scripture. Their generosity reminded me that God works through His people.

But God didn't stop there. I started praying specifically for a new job, asking God to open the right doors. Within three weeks, I received a call for an interview. The position was actually better than my previous job, with higher pay and better benefits.

I went to the interview, and everything went smoothly. A week later, I got the call - I had the job! Not only did God provide, but He provided abundantly, exceeding what I had asked for.

Looking back, I see how God used that difficult season to teach me to depend on Him completely and to experience the love and support of the church family. He is truly Jehovah Jireh, our provider!

Never doubt God's ability to provide. He knows your needs before you even ask, and He is faithful to supply. Trust Him, even in the darkest moments.`,
      date: '2026-01-23',
      status: 'pending',
    },
  ]);

  const [selectedTestimony, setSelectedTestimony] = useState<Testimony | null>(null);
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');

  // Apply date filter
  const dateFilteredTestimonies = dateFilter
    ? testimonies.filter(testimony => {
        const testimonyDate = new Date(testimony.date);
        return testimonyDate.toDateString() === dateFilter.toDateString();
      })
    : testimonies;

  // Apply search filter
  const searchedTestimonies = searchQuery.trim() === ''
    ? dateFilteredTestimonies
    : dateFilteredTestimonies.filter(testimony => 
        testimony.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        testimony.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        testimony.author.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const pendingTestimonies = searchedTestimonies.filter(t => t.status === 'pending');

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

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 items-center">
          <DateSearchFilter
            dateFilter={dateFilter}
            onDateChange={setDateFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search testimonies by title, author, or content..."
          />
        </div>

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

                    {/* Content Preview */}
                    <p className="text-base leading-relaxed">
                      {testimony.content.substring(0, 200)}...
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                      <Button
                        onClick={() => setSelectedTestimony(testimony)}
                        className="flex-1 h-12 font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all bg-blue-400"
                      >
                        <Eye className="w-5 h-5 mr-2" />
                        View Details
                      </Button>
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

        {/* View Testimony Modal */}
        {selectedTestimony && (
          <ViewTestimonyModal 
            testimony={selectedTestimony}
            onClose={() => setSelectedTestimony(null)}
            onApprove={() => {
              handleApprove(selectedTestimony.id);
              setSelectedTestimony(null);
            }}
            onReject={() => {
              handleReject(selectedTestimony.id);
              setSelectedTestimony(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

function ViewTestimonyModal({ 
  testimony, 
  onClose, 
  onApprove, 
  onReject 
}: { 
  testimony: Testimony; 
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
}) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-6xl w-full max-h-[90vh] overflow-y-auto border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <DialogHeader>
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 bg-orange-400 border-4 border-black flex items-center justify-center flex-shrink-0">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <DialogTitle className="uppercase text-2xl mb-2">{testimony.title}</DialogTitle>
              <div className="flex flex-wrap gap-4 text-sm font-bold text-gray-600">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{testimony.author}</span>
                </div>
                {testimony.authorEmail && (
                  <div className="flex items-center gap-2">
                    <span>📧</span>
                    <span>{testimony.authorEmail}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(testimony.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>
        
        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="font-bold whitespace-pre-wrap leading-relaxed text-lg">
            {testimony.content}
          </p>
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            onClick={onApprove}
            className="flex-1 h-14 text-lg font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all bg-green-400"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Approve
          </Button>
          <Button
            onClick={onReject}
            className="flex-1 h-14 text-lg font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all bg-red-400"
          >
            <XCircle className="w-5 h-5 mr-2" />
            Reject
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="h-14 px-8 font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
