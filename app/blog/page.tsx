'use client';

import { useState } from 'react';
import { Blog, BlogCategory } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PenSquare, ArrowRight } from 'lucide-react';

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
    <div className="min-h-screen bg-[#fafafa] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-black uppercase transform -rotate-1">
            Church Blog
          </h1>
          {currentUser.role === 'Leader' && (
            <Button onClick={() => setShowAddModal(true)}>
              <PenSquare className="w-5 h-5 mr-2" />
              Write Post
            </Button>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <Button
            variant={selectedCategory === 'All' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('All')}
          >
            All Posts
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Blog Posts */}
        <div className="space-y-6">
          {filteredBlogs.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-zinc-500">
                  No blog posts yet. {currentUser.role === 'Leader' && 'Write your first post to get started.'}
                </p>
              </CardContent>
            </Card>
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
  const categoryVariants = {
    'Church News': 'default',
    'Word of God': 'secondary',
    'Events': 'outline',
  } as const;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <Badge variant={categoryVariants[blog.category]}>
              {blog.category}
            </Badge>
            <CardTitle className="text-2xl">{blog.title}</CardTitle>
            <CardDescription>
              By {blog.author} • {new Date(blog.createdAt).toLocaleDateString()}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {blog.imageUrl && (
          <img 
            src={blog.imageUrl} 
            alt={blog.title}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
        )}
        <p className="text-zinc-700 whitespace-pre-wrap mb-4">
          {blog.content.substring(0, 300)}
          {blog.content.length > 300 && '...'}
        </p>
        <Button variant="link" className="p-0">
          Read more <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </CardContent>
    </Card>
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
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Write Blog Post</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value as BlogCategory })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Church News">Church News</SelectItem>
                <SelectItem value="Word of God">Word of God</SelectItem>
                <SelectItem value="Events">Events</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL (optional)</Label>
            <Input
              id="imageUrl"
              type="url"
              value={formData.imageUrl}
              onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              required
              rows={15}
              value={formData.content}
              onChange={e => setFormData({ ...formData, content: e.target.value })}
              placeholder="Write your blog post content..."
            />
          </div>

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
              Publish Post
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
