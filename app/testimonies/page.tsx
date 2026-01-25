'use client';

import { useState } from 'react';
import { Testimony } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function TestimoniesPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Mock data - replace with API call
  const testimonies: Testimony[] = [];

  // Filter to show only approved testimonies to regular users
  const approvedTestimonies = testimonies.filter(t => t.isApproved);

  return (
    <div className="min-h-screen bg-[#fafafa] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black uppercase mb-4 transform -rotate-1">
            Testimonies
          </h1>
          <p className="text-lg font-bold max-w-2xl mx-auto mb-8">
            Share how God is working in your life and be encouraged by the testimonies of others.
          </p>
          <Button onClick={() => setShowAddModal(true)} size="lg">
            Share Your Testimony
          </Button>
        </div>

        <div className="space-y-6">
          {approvedTestimonies.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="font-bold">
                  No testimonies yet. Be the first to share your testimony!
                </p>
              </CardContent>
            </Card>
          ) : (
            approvedTestimonies.map(testimony => (
              <TestimonyCard key={testimony.id} testimony={testimony} />
            ))
          )}
        </div>

        {showAddModal && (
          <AddTestimonyModal onClose={() => setShowAddModal(false)} />
        )}
      </div>
    </div>
  );
}

function TestimonyCard({ testimony }: { testimony: Testimony }) {
  return (
    <Card className="bg-gradient-to-br from-pink-200 to-yellow-200">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-400 border-4 border-black flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">🙏</span>
          </div>
          <div className="flex-1">
            <CardTitle className="uppercase mb-2">{testimony.title}</CardTitle>
            <p className="text-sm font-bold">
              By {testimony.author} • {new Date(testimony.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="font-bold whitespace-pre-wrap leading-relaxed">
          {testimony.content}
        </p>
      </CardContent>
    </Card>
  );
}

function AddTestimonyModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    authorEmail: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const testimony: Partial<Testimony> = {
      ...formData,
      isApproved: false, // Requires approval
      createdAt: new Date(),
    };

    // Add API call here
    console.log('Submitting testimony:', testimony);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-md text-center bg-green-300">
          <div className="text-6xl mb-4">✅</div>
          <DialogTitle>Thank You!</DialogTitle>
          <p className="font-bold mb-6">
            Your testimony has been submitted and is pending approval. 
            It will be visible to others once approved by church leadership.
          </p>
          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Share Your Testimony</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="author">Your Name</Label>
            <Input
              id="author"
              type="text"
              required
              value={formData.author}
              onChange={e => setFormData({ ...formData, author: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email (optional)</Label>
            <Input
              id="email"
              type="email"
              value={formData.authorEmail}
              onChange={e => setFormData({ ...formData, authorEmail: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., How God Healed My Family"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Your Testimony</Label>
            <Textarea
              id="content"
              required
              rows={12}
              value={formData.content}
              onChange={e => setFormData({ ...formData, content: e.target.value })}
              placeholder="Share your story of how God has worked in your life..."
            />
          </div>

          <Card className="bg-blue-200 border-2">
            <CardContent className="p-4">
              <p className="text-sm font-bold">
                Your testimony will be reviewed before being published. 
                This helps maintain a respectful and encouraging environment.
              </p>
            </CardContent>
          </Card>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Submit Testimony
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
