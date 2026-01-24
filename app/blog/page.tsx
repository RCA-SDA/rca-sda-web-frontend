'use client';

import { useState } from 'react';
import { Blog, BlogCategory } from '@/types';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'All'>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Mock data - replace with API call
  const blogs: Blog[] = [];

  // Mock current user - replace with actual auth
  const currentUser = {
    role: 'Leader',
  };

  const filteredBlogs = selectedCategory === 'All' 
    ? blogs 
    : blogs.filter(b => b.category === selectedCategory);

  const categories: BlogCategory[] = ['Church News', 'Word of God', 'Events'];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            Church Blog
          </h1>
          {currentUser.role === 'Leader' && (
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Write Post
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              selectedCategory === 'All'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800'
            }`}
          >
            All Posts
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Posts */}
        <div className="space-y-6">
          {filteredBlogs.length === 0 ? (
            <div className="bg-white dark:bg-zinc-900 rounded-lg p-12 text-center">
              <p className="text-zinc-500 dark:text-zinc-400">
                No blog posts yet. {currentUser.role === 'Leader' && 'Write your first post to get started.'}
              </p>
            </div>
          ) : (
            filteredBlogs.map(blog => (
              <BlogCard key={blog.id} blog={blog} />
            ))
          )}
        </div>

        {showAddModal && (
          <AddBlogModal onClose={() => setShowAddModal(false)} />
        )}
      </div>
    </div>
  );
}

function BlogCard({ blog }: { blog: Blog }) {
  const categoryColors = {
    'Church News': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'Word of God': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'Events': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  };

  return (
    <article className="bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${categoryColors[blog.category]}`}>
            {blog.category}
          </span>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
            {blog.title}
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            By {blog.author} • {new Date(blog.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {blog.imageUrl && (
        <img 
          src={blog.imageUrl} 
          alt={blog.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
      )}

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
          {blog.content.substring(0, 300)}
          {blog.content.length > 300 && '...'}
        </p>
      </div>

      <button className="mt-4 text-blue-600 dark:text-blue-400 hover:underline">
        Read more →
      </button>
    </article>
  );
}

function AddBlogModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Church News' as BlogCategory,
    imageUrl: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const blog: Partial<Blog> = {
      ...formData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Add API call here
    console.log('Adding blog:', blog);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-zinc-900 rounded-lg max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">
          Write Blog Post
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
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
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">
              Category
            </label>
            <select
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value as BlogCategory })}
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
            >
              <option value="Church News">Church News</option>
              <option value="Word of God">Word of God</option>
              <option value="Events">Events</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">
              Image URL (optional)
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">
              Content
            </label>
            <textarea
              required
              rows={15}
              value={formData.content}
              onChange={e => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
              placeholder="Write your blog post content..."
            />
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
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
