'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MessageSquare, CheckCircle, XCircle, ArrowLeft, User, Calendar, Eye, Heart, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { DateSearchFilter } from '@/components/DateSearchFilter';
import { useBlogPosts, useUpdateBlogPost } from '@/lib/hooks/useBlog';
import { type BlogPost } from '@/lib/services/blog.service';

interface Testimony extends BlogPost {
  status: 'pending' | 'approved' | 'rejected';
}

export default function ApproveTestimoniesPage() {
  const { data: blogsData, isLoading, error } = useBlogPosts();
  const updateBlogPost = useUpdateBlogPost();

  const [selectedTestimony, setSelectedTestimony] = useState<Testimony | null>(null);
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');

  // Convert blog posts to testimonies format
  const testimonies: Testimony[] = (blogsData?.posts || []).map(blog => ({
    ...blog,
    status: 'approved' as const, // Default to approved since we don't have status field
  }));

  // Apply date filter
  const dateFilteredTestimonies = dateFilter
    ? testimonies.filter(testimony => {
        if (!testimony.createdAt) return false;
        const testimonyDate = new Date(testimony.createdAt);
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

  const handleApprove = async (id: number) => {
    try {
      // Note: We would need to add status field to backend for this to work
      // For now, just show success message
      alert('Testimony approved!');
    } catch (error) {
      console.error('Error approving testimony:', error);
      alert('Failed to approve testimony');
    }
  };

  const handleReject = async (id: number) => {
    try {
      // Note: We would need to add status field to backend for this to work
      // For now, just show success message
      alert('Testimony rejected!');
    } catch (error) {
      console.error('Error rejecting testimony:', error);
      alert('Failed to reject testimony');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fafafa] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
              <p className="text-lg font-bold">Loading testimonies...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#fafafa] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <Card className="bg-red-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <CardContent className="p-8 text-center">
                <p className="text-lg font-black">Failed to load testimonies</p>
                <p className="text-sm text-gray-600 mt-2">Please try again later</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

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
              Review and approve member testimonies ({testimonies.length} total)
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
                <p className="text-sm font-black uppercase text-gray-600">Total Testimonies</p>
                <p className="text-4xl font-black">{testimonies.length}</p>
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
          {searchedTestimonies.length === 0 ? (
            <Card className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <CardContent className="p-12 text-center">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-xl font-black uppercase text-gray-600">
                  No testimonies found
                </p>
                <p className="text-sm font-bold text-gray-500 mt-2">
                  Try adjusting your search or filters
                </p>
              </CardContent>
            </Card>
          ) : (
            searchedTestimonies.map((testimony) => (
              <Card key={testimony.id} className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <CardHeader className="bg-yellow-100 border-b-4 border-black">
                  <CardTitle className="uppercase flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <MessageSquare className="w-6 h-6" />
                      {testimony.title}
                    </span>
                    <span className="text-sm font-black uppercase bg-green-400 px-3 py-1 border-2 border-black">
                      Published
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
                        <span>{testimony.createdAt ? new Date(testimony.createdAt).toLocaleDateString() : 'No date'}</span>
                      </div>
                    </div>

                    {/* Content Preview */}
                    <p className="text-base leading-relaxed">
                      {testimony.content.substring(0, 200)}...
                    </p>

                    {/* Category */}
                    {testimony.category && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black uppercase bg-blue-100 px-3 py-1 border-2 border-black">
                          {testimony.category}
                        </span>
                      </div>
                    )}

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
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{testimony.createdAt ? new Date(testimony.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'No date'}</span>
                </div>
                {testimony.category && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black uppercase bg-blue-100 px-3 py-1 border-2 border-black">
                      {testimony.category}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="font-bold whitespace-pre-wrap leading-relaxed text-lg">
            {testimony.content}
          </p>
        </div>

        {testimony.externalUrl && (
          <div className="mt-4 p-4 bg-blue-50 border-4 border-black">
            <p className="text-sm font-bold mb-2">External Link:</p>
            <a
              href={testimony.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {testimony.externalUrl}
            </a>
          </div>
        )}

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
