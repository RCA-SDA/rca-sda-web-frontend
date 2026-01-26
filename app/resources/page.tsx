'use client';

import { useState } from 'react';
import { Book, ResourceCategory } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination } from '@/components/Pagination';
import { BookOpen, Download, ExternalLink, Search } from 'lucide-react';

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | 'All'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

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
        <h1 className="text-4xl font-black uppercase transform -rotate-1 mb-8">
          Resource Library
        </h1>

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
