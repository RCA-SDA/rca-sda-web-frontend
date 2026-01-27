'use client';

import { useState } from 'react';
import { Book, ResourceCategory } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination } from '@/components/Pagination';
import { BookOpen, Download, ExternalLink, Search, Plus, Upload, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | 'All'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock books data - replace with API call
  const books: Book[] = [
    {
      id: '1',
      title: 'Steps to Christ',
      author: 'Ellen G. White',
      description: 'A classic guide to developing a personal relationship with Jesus Christ. This timeless book offers practical steps for spiritual growth and understanding God\'s love.',
      category: 'Spiritual Growth',
      coverImageUrl: '/books/steps-to-christ.jpg',
      pdfUrl: '/pdfs/steps-to-christ.pdf',
      uploadedBy: 'admin',
      createdAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      title: 'The Great Controversy',
      author: 'Ellen G. White',
      description: 'An epic narrative of the conflict between good and evil from the destruction of Jerusalem to the end times. Essential reading for understanding Bible prophecy.',
      category: 'Prophecy',
      coverImageUrl: '/books/great-controversy.jpg',
      externalUrl: 'https://example.com/great-controversy',
      uploadedBy: 'admin',
      createdAt: new Date('2024-01-20'),
    },
    {
      id: '3',
      title: 'The Desire of Ages',
      author: 'Ellen G. White',
      description: 'A beautiful portrayal of the life and ministry of Jesus Christ. This book brings the Savior to life through vivid descriptions and spiritual insights.',
      category: 'Bible Study',
      coverImageUrl: '/books/desire-of-ages.jpg',
      pdfUrl: '/pdfs/desire-of-ages.pdf',
      uploadedBy: 'admin',
      createdAt: new Date('2024-02-01'),
    },
    {
      id: '4',
      title: 'Messages to Young People',
      author: 'Ellen G. White',
      description: 'Practical counsel and encouragement for youth facing the challenges of modern life. Topics include education, relationships, and spiritual development.',
      category: 'Youth',
      coverImageUrl: '/books/messages-young-people.jpg',
      pdfUrl: '/pdfs/messages-young-people.pdf',
      uploadedBy: 'admin',
      createdAt: new Date('2024-02-10'),
    },
    {
      id: '5',
      title: 'The Ministry of Healing',
      author: 'Ellen G. White',
      description: 'Comprehensive guidance on physical, mental, and spiritual health. Learn about natural remedies and the connection between health and spirituality.',
      category: 'Health',
      coverImageUrl: '/books/ministry-healing.jpg',
      externalUrl: 'https://example.com/ministry-healing',
      uploadedBy: 'admin',
      createdAt: new Date('2024-02-15'),
    },
    {
      id: '6',
      title: 'The Adventist Home',
      author: 'Ellen G. White',
      description: 'Biblical principles for building strong Christian families. Covers courtship, marriage, parenting, and creating a Christ-centered home.',
      category: 'Family',
      coverImageUrl: '/books/adventist-home.jpg',
      pdfUrl: '/pdfs/adventist-home.pdf',
      uploadedBy: 'admin',
      createdAt: new Date('2024-02-20'),
    },
    {
      id: '7',
      title: 'Patriarchs and Prophets',
      author: 'Ellen G. White',
      description: 'The story of the Old Testament from Creation through the reign of King David. Brings ancient history to life with spiritual applications.',
      category: 'Bible Study',
      coverImageUrl: '/books/patriarchs-prophets.jpg',
      pdfUrl: '/pdfs/patriarchs-prophets.pdf',
      uploadedBy: 'admin',
      createdAt: new Date('2024-03-01'),
    },
    {
      id: '8',
      title: 'Christ\'s Object Lessons',
      author: 'Ellen G. White',
      description: 'In-depth exploration of Jesus\' parables and their meaning for our lives today. Discover hidden treasures in familiar stories.',
      category: 'Bible Study',
      coverImageUrl: '/books/object-lessons.jpg',
      externalUrl: 'https://example.com/object-lessons',
      uploadedBy: 'admin',
      createdAt: new Date('2024-03-05'),
    },
  ];

  const categories: (ResourceCategory | 'All')[] = [
    'All',
    'Spiritual Growth',
    'Bible Study',
    'Youth',
    'Family',
    'Health',
    'Prophecy',
  ];

  // Filter books
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Paginate books
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-[#fafafa] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-black uppercase transform -rotate-1">
            Resource Library
          </h1>
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="w-5 h-5 mr-2" />
            Add Resource
          </Button>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6 bg-yellow-200">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search books..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pl-10 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="w-full md:w-64">
                <Select
                  value={selectedCategory}
                  onValueChange={(value) => {
                    setSelectedCategory(value as ResourceCategory | 'All');
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category} className="font-bold">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Books Grid */}
        {paginatedBooks.length === 0 ? (
          <Card className="bg-blue-200">
            <CardContent className="py-12">
              <p className="text-center font-bold text-lg">
                No books found. Try adjusting your search or filters.
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {paginatedBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredBooks.length / itemsPerPage)}
              onPageChange={setCurrentPage}
              itemsPerPage={itemsPerPage}
              totalItems={filteredBooks.length}
              onItemsPerPageChange={setItemsPerPage}
              itemsPerPageOptions={[6, 12, 24]}
            />
          </>
        )}

        {/* Add Resource Modal */}
        {showAddModal && (
          <AddResourceModal onClose={() => setShowAddModal(false)} />
        )}
      </div>
    </div>
  );
}

function BookCard({ book }: { book: Book }) {
  const categoryColors: Record<ResourceCategory, string> = {
    'Spiritual Growth': 'bg-purple-200',
    'Bible Study': 'bg-blue-200',
    'Youth': 'bg-green-200',
    'Family': 'bg-pink-200',
    'Health': 'bg-teal-200',
    'Prophecy': 'bg-orange-200',
  };

  return (
    <Card className={`${categoryColors[book.category]} hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all`}>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="uppercase text-lg mb-2">{book.title}</CardTitle>
            <p className="font-bold text-sm">by {book.author}</p>
          </div>
          <BookOpen className="w-8 h-8 flex-shrink-0" />
        </div>
        <div className="mt-2">
          <span className="inline-block px-3 py-1 bg-white border-4 border-black font-black text-xs uppercase transform -rotate-1">
            {book.category}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4 line-clamp-3">{book.description}</p>
        
        <div className="flex gap-2 flex-wrap">
          {book.pdfUrl && (
            <Button
              size="sm"
              className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all font-black"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          )}
          {book.externalUrl && (
            <Button
              size="sm"
              variant="outline"
              className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all font-black"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Read Online
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function AddResourceModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    category: 'Spiritual Growth' as ResourceCategory,
    externalUrl: '',
  });
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const categories: ResourceCategory[] = [
    'Spiritual Growth',
    'Bible Study',
    'Youth',
    'Family',
    'Health',
    'Prophecy',
  ];

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
    }
  };

  const removeCoverImage = () => {
    setCoverImage(null);
    setCoverImageFile(null);
  };

  const removePdf = () => {
    setPdfFile(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const resource: Partial<Book> = {
      title: formData.title,
      author: formData.author,
      description: formData.description,
      category: formData.category,
      externalUrl: formData.externalUrl || undefined,
      createdAt: new Date(),
    };

    // Add API call here with coverImageFile and pdfFile
    console.log('Adding resource:', resource, coverImageFile, pdfFile);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Resource</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Cover Image Upload */}
          <div className="space-y-2">
            <Label>Cover Image (Optional)</Label>
            <div className="flex items-center gap-4">
              {coverImage ? (
                <div className="relative">
                  <div className="w-24 h-32 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                    <Image
                      src={coverImage}
                      alt="Cover preview"
                      width={96}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={removeCoverImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="w-24 h-32 bg-gradient-to-br from-yellow-300 to-pink-300 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                  <BookOpen className="w-10 h-10 text-black" strokeWidth={3} />
                </div>
              )}
              <label className="cursor-pointer">
                <div className="flex items-center gap-2 px-3 py-2 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all font-bold text-sm">
                  <Upload className="w-4 h-4" />
                  Upload Cover
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Book Title</Label>
              <Input
                id="title"
                type="text"
                required
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Steps to Christ"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                type="text"
                required
                value={formData.author}
                onChange={e => setFormData({ ...formData, author: e.target.value })}
                placeholder="e.g., Ellen G. White"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              required
              rows={4}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the book..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value as ResourceCategory })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category} className="font-bold">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* PDF Upload */}
          <div className="space-y-2">
            <Label>PDF File (Optional)</Label>
            {pdfFile ? (
              <div className="flex items-center gap-2 p-3 bg-green-50 border-2 border-black">
                <Download className="w-5 h-5" />
                <span className="font-bold text-sm flex-1">{pdfFile.name}</span>
                <button
                  type="button"
                  onClick={removePdf}
                  className="bg-red-500 text-white rounded-full p-1 border-2 border-black hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="cursor-pointer block">
                <div className="flex items-center justify-center gap-2 p-4 bg-white border-2 border-dashed border-black hover:bg-gray-50 transition-colors">
                  <Upload className="w-5 h-5" />
                  <span className="font-bold text-sm">Upload PDF</span>
                </div>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handlePdfChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="externalUrl">External URL (Optional)</Label>
            <Input
              id="externalUrl"
              type="url"
              value={formData.externalUrl}
              onChange={e => setFormData({ ...formData, externalUrl: e.target.value })}
              placeholder="https://example.com/book"
            />
            <p className="text-xs text-gray-600">Link to read the book online</p>
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
              Add Resource
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
