'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Save, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useCreateBlogPost } from '@/lib/hooks/useBlog';
import { type CreateBlogPostInput } from '@/lib/services/blog.service';

export default function CreateBlogPage() {
  const [formData, setFormData] = useState<CreateBlogPostInput>({
    title: '',
    author: '',
    category: 'NEWS',
    content: '',
    description: '',
    externalUrl: '',
  });

  const createBlogPost = useCreateBlogPost();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.author || !formData.content) {
      return;
    }

    try {
      await createBlogPost.mutateAsync(formData);

      // Reset form on success
      setFormData({
        title: '',
        author: '',
        category: 'NEWS',
        content: '',
        description: '',
        externalUrl: '',
      });

    } catch (error) {
      console.error('Error creating blog post:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (value: string) => {
    setFormData({
      ...formData,
      category: value as CreateBlogPostInput['category'],
    });
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black uppercase transform -rotate-1 mb-2">
              Create Blog Post
            </h1>
            <p className="text-lg font-bold text-gray-600">
              Share your evangelism insights
            </p>
          </div>
          <Link href="/users/evangelism_leader_male">
            <Button className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all bg-gray-200">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Success/Error Messages */}
        {createBlogPost.isSuccess && (
          <Card className="mb-6 bg-green-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <p className="font-black text-lg">Blog post created successfully!</p>
              </div>
            </CardContent>
          </Card>
        )}

        {createBlogPost.isError && (
          <Card className="mb-6 bg-red-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-red-600" />
                <p className="font-black text-lg">Failed to create blog post. Please try again.</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Form */}
        <Card className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="bg-purple-200 border-b-4 border-black">
            <CardTitle className="uppercase flex items-center gap-2">
              <FileText className="w-6 h-6" />
              Blog Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <Label htmlFor="title" className="text-sm font-black uppercase mb-2 block">
                  Blog Title *
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                  placeholder="Enter blog title"
                />
              </div>

              {/* Author */}
              <div>
                <Label htmlFor="author" className="text-sm font-black uppercase mb-2 block">
                  Author *
                </Label>
                <Input
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  className="border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                  placeholder="Enter author name"
                />
              </div>

              {/* Category */}
              <div>
                <Label htmlFor="category" className="text-sm font-black uppercase mb-2 block">
                  Category *
                </Label>
                <Select value={formData.category} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="border-4 border-black">
                    <SelectItem value="NEWS" className="font-bold">News</SelectItem>
                    <SelectItem value="EVENTS" className="font-bold">Events</SelectItem>
                    <SelectItem value="ANNOUNCEMENTS" className="font-bold">Announcements</SelectItem>
                    <SelectItem value="TESTIMONIALS" className="font-bold">Testimonials</SelectItem>
                    <SelectItem value="TEACHINGS" className="font-bold">Teachings</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description" className="text-sm font-black uppercase mb-2 block">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all resize-none"
                  placeholder="Brief summary of the blog post"
                />
              </div>

              {/* External URL */}
              <div>
                <Label htmlFor="externalUrl" className="text-sm font-black uppercase mb-2 block">
                  External URL (Optional)
                </Label>
                <Input
                  id="externalUrl"
                  name="externalUrl"
                  type="url"
                  value={formData.externalUrl}
                  onChange={handleChange}
                  className="border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                  placeholder="https://example.com"
                />
              </div>

              {/* Content */}
              <div>
                <Label htmlFor="content" className="text-sm font-black uppercase mb-2 block">
                  Blog Content *
                </Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows={12}
                  className="border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all resize-none"
                  placeholder="Write your blog content here..."
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={createBlogPost.isPending}
                  className="flex-1 h-14 text-lg font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all bg-purple-400 disabled:opacity-50"
                >
                  {createBlogPost.isPending ? (
                    'Creating...'
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" />
                      Publish Blog
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
