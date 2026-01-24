'use client';

import { useState } from 'react';
import { Testimony } from '@/types';

export default function TestimoniesPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Mock data - replace with API call
  const testimonies: Testimony[] = [];

  // Filter to show only approved testimonies to regular users
  const approvedTestimonies = testimonies.filter(t => t.isApproved);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            Testimonies
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-8">
            Share how God is working in your life and be encouraged by the testimonies of others.
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Share Your Testimony
          </button>
        </div>

        <div className="space-y-6">
          {approvedTestimonies.length === 0 ? (
            <div className="bg-white dark:bg-zinc-900 rounded-lg p-12 text-center">
              <p className="text-zinc-500 dark:text-zinc-400">
                No testimonies yet. Be the first to share your testimony!
              </p>
            </div>
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
    <article className="bg-white dark:bg-zinc-900 rounded-lg p-8 shadow-sm">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-2xl">🙏</span>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
            {testimony.title}
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            By {testimony.author} • {new Date(testimony.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed">
          {testimony.content}
        </p>
      </div>
    </article>
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
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-zinc-900 rounded-lg max-w-md w-full p-8 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">
            Thank You!
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Your testimony has been submitted and is pending approval. 
            It will be visible to others once approved by church leadership.
          </p>
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-zinc-900 rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">
          Share Your Testimony
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">
              Your Name
            </label>
            <input
              type="text"
              required
              value={formData.author}
              onChange={e => setFormData({ ...formData, author: e.target.value })}
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">
              Email (optional)
            </label>
            <input
              type="email"
              value={formData.authorEmail}
              onChange={e => setFormData({ ...formData, authorEmail: e.target.value })}
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">
              Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
              placeholder="e.g., How God Healed My Family"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">
              Your Testimony
            </label>
            <textarea
              required
              rows={12}
              value={formData.content}
              onChange={e => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
              placeholder="Share your story of how God has worked in your life..."
            />
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Your testimony will be reviewed before being published. 
              This helps maintain a respectful and encouraging environment.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Submit Testimony
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
