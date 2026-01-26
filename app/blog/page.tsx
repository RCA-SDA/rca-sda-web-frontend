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
import { DateSearchFilter } from '@/components/DateSearchFilter';
import { Pagination } from '@/components/Pagination';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'All'>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  
  // Mock data - replace with API call
  const blogs: Blog[] = [
    {
      id: '1',
      title: 'Welcome to Our New Church Website',
      content: 'We are excited to announce the launch of our new church website! This platform will serve as a central hub for our community to stay connected, share testimonies, and keep up with church events.\n\nOur vision is to create a digital space where members can easily access information about upcoming services, view the church calendar, read inspiring blog posts, and connect with one another.\n\nWe encourage everyone to explore the different sections of the website and provide feedback on how we can make it even better. Together, we can build a stronger, more connected community.',
      category: 'Church News',
      author: 'Pastor John',
      authorId: 'pastor-john-1',
      imageUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&q=80',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      title: 'The Power of Prayer in Our Daily Lives',
      content: 'Prayer is not just a ritual; it is a powerful conversation with God that transforms our hearts and minds. In Matthew 6:6, Jesus teaches us: "But when you pray, go into your room, close the door and pray to your Father, who is unseen."\n\nWhen we pray, we acknowledge our dependence on God and invite His presence into every aspect of our lives. Prayer brings peace in times of trouble, wisdom in moments of confusion, and strength when we feel weak.\n\nLet us commit to making prayer a daily practice, not just in times of need, but as a constant communion with our Heavenly Father. Start your day with prayer, pray throughout the day, and end your day in thanksgiving.',
      category: 'Word of God',
      author: 'Elder Sarah',
      authorId: 'elder-sarah-1',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-01-20'),
    },
    {
      id: '3',
      title: 'Annual Church Picnic - Save the Date!',
      content: 'Mark your calendars! Our annual church picnic is scheduled for Saturday, March 15th at Riverside Park from 11 AM to 4 PM.\n\nThis is a wonderful opportunity for our church family to come together, enjoy great food, play games, and strengthen our bonds of fellowship. We will have activities for all ages including:\n\n- Volleyball and soccer tournaments\n- Kids games and face painting\n- Potluck lunch (please bring a dish to share)\n- Live worship music\n- Baptism ceremony at 2 PM\n\nPlease RSVP by March 1st so we can plan accordingly. We look forward to seeing everyone there!',
      category: 'Events',
      author: 'Events Committee',
      authorId: 'events-committee-1',
      imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80',
      createdAt: new Date('2024-01-25'),
      updatedAt: new Date('2024-01-25'),
    },
    {
      id: '4',
      title: 'Understanding Grace: God\'s Unmerited Favor',
      content: 'Grace is one of the most beautiful concepts in Christianity. Ephesians 2:8-9 reminds us: "For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God—not by works, so that no one can boast."\n\nGrace means receiving something we don\'t deserve. While we were still sinners, Christ died for us. This is the ultimate expression of God\'s love and grace. We cannot earn salvation through our good deeds; it is a free gift from God.\n\nHowever, receiving grace should transform how we live. When we truly understand the grace we\'ve received, we naturally want to extend that same grace to others. Let us be people who show grace, forgiveness, and love to everyone we encounter.',
      category: 'Word of God',
      author: 'Pastor John',
      authorId: 'pastor-john-1',
      imageUrl: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&q=80',
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-01'),
    },
    {
      id: '5',
      title: 'Youth Group Mission Trip Fundraiser',
      content: 'Our youth group is planning an exciting mission trip to Guatemala this summer, and we need your support!\n\nThe trip will take place from July 10-20, where our youth will:\n- Help build homes for families in need\n- Run a Vacation Bible School for local children\n- Provide medical supplies to rural communities\n- Share the Gospel and their testimonies\n\nTo help fund this trip, we are hosting several fundraising events:\n- Car wash on February 10th\n- Bake sale every Sunday in March\n- Spaghetti dinner on March 30th\n\nYour donations and prayers are greatly appreciated. This will be a life-changing experience for our young people!',
      category: 'Church News',
      author: 'Youth Pastor Mike',
      authorId: 'youth-pastor-mike-1',
      imageUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80',
      createdAt: new Date('2024-02-05'),
      updatedAt: new Date('2024-02-05'),
    },
    {
      id: '6',
      title: 'New Bible Study Series Starting Next Week',
      content: 'Join us for our new 8-week Bible study series: "Walking in Faith: Lessons from the Book of James."\n\nStarting Wednesday, February 14th at 7 PM in the Fellowship Hall.\n\nThe Book of James is packed with practical wisdom for living out our faith. We\'ll explore topics like:\n- Faith and works\n- Taming the tongue\n- Wisdom from above\n- Prayer and healing\n- Patience in suffering\n\nAll are welcome! Study guides will be provided. Bring your Bible, a notebook, and an open heart ready to learn and grow together.',
      category: 'Events',
      author: 'Elder Sarah',
      authorId: 'elder-sarah-1',
      imageUrl: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&q=80',
      createdAt: new Date('2024-02-08'),
      updatedAt: new Date('2024-02-08'),
    },
  ];

  // Mock current user - replace with actual auth
  const currentUser = {
    role: 'Leader',
  };

  const filteredBlogs = selectedCategory === 'All' 
    ? blogs 
    : blogs.filter(b => b.category === selectedCategory);

  // Apply date filter
  const dateFilteredBlogs = dateFilter
    ? filteredBlogs.filter(blog => {
        const blogDate = new Date(blog.createdAt);
        return blogDate.toDateString() === dateFilter.toDateString();
      })
    : filteredBlogs;

  // Apply search filter
  const searchedBlogs = searchQuery.trim() === ''
    ? dateFilteredBlogs
    : dateFilteredBlogs.filter(blog => 
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchQuery.toLowerCase())
      );

  // Pagination
  const totalPages = Math.ceil(searchedBlogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBlogs = searchedBlogs.slice(startIndex, startIndex + itemsPerPage);

  // Reset to page 1 when filters change
  const handleFilterChange = (filterFn: () => void) => {
    filterFn();
    setCurrentPage(1);
  };

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
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2 flex-wrap items-center">
          <div className="flex gap-4">
            <Button
              variant={selectedCategory === 'All' ? 'default' : 'outline'}
              onClick={() => handleFilterChange(() => setSelectedCategory('All'))}
            >
              All Posts
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => handleFilterChange(() => setSelectedCategory(category))}
              >
                {category}
              </Button>
            ))}
          </div>

          <DateSearchFilter
            dateFilter={dateFilter}
            onDateChange={(date) => handleFilterChange(() => setDateFilter(date))}
            searchQuery={searchQuery}
            onSearchChange={(query) => handleFilterChange(() => setSearchQuery(query))}
            searchPlaceholder="Search blog posts..."
          />
        </div>

        {/* Blog Posts */}
        <div className="space-y-6">
          {searchedBlogs.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-zinc-500">
                  {searchQuery.trim() !== '' || dateFilter
                    ? 'No blog posts found matching your filters.'
                    : `No blog posts yet. ${currentUser.role === 'Leader' ? 'Write your first post to get started.' : ''}`}
                </p>
              </CardContent>
            </Card>
          ) : (
            paginatedBlogs.map(blog => (
              <BlogCard 
                key={blog.id} 
                blog={blog} 
                onReadMore={() => setSelectedBlog(blog)}
              />
            ))
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={searchedBlogs.length}
          onItemsPerPageChange={setItemsPerPage}
          itemsPerPageOptions={[3, 6, 12, 24]}
        />

        {showAddModal && (
          <AddBlogModal onClose={() => setShowAddModal(false)} />
        )}

        {selectedBlog && (
          <BlogDetailModal 
            blog={selectedBlog} 
            onClose={() => setSelectedBlog(null)} 
          />
        )}
      </div>
    </div>
  );
}

function BlogCard({ blog, onReadMore }: { blog: Blog; onReadMore: () => void }) {
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
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}
        <p className="text-zinc-700 whitespace-pre-wrap mb-4">
          {blog.content.substring(0, 300)}
          {blog.content.length > 300 && '...'}
        </p>
        <Button variant="link" className="p-0" onClick={onReadMore}>
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

function BlogDetailModal({ blog, onClose }: { blog: Blog; onClose: () => void }) {
  const categoryVariants = {
    'Church News': 'default',
    'Word of God': 'secondary',
    'Events': 'outline',
  } as const;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="space-y-3">
            <Badge variant={categoryVariants[blog.category]}>
              {blog.category}
            </Badge>
            <DialogTitle className="text-3xl">{blog.title}</DialogTitle>
            <p className="text-sm text-zinc-500">
              By {blog.author} • {new Date(blog.createdAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          {blog.imageUrl && (
            <img 
              src={blog.imageUrl} 
              alt={blog.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          )}
          <p className="text-zinc-700 whitespace-pre-wrap leading-relaxed text-lg">
            {blog.content}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
