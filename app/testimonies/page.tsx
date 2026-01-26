'use client';

import { useState } from 'react';
import { Testimony } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Heart, CheckCircle } from 'lucide-react';
import { DateSearchFilter } from '@/components/DateSearchFilter';
import { Pagination } from '@/components/Pagination';

export default function TestimoniesPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTestimony, setSelectedTestimony] = useState<Testimony | null>(null);
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  
  // Mock data - replace with API call
  const testimonies: Testimony[] = [
    {
      id: '1',
      title: 'God Restored My Marriage',
      content: `I want to give glory to God for what He has done in my marriage. Two years ago, my husband and I were on the verge of divorce. We had grown apart, communication had broken down, and we were both hurting deeply.

One Sunday, Pastor John preached about forgiveness and God's power to restore broken relationships. That message pierced my heart. I went home and prayed earnestly, asking God to heal our marriage.

God began working in both our hearts. We started attending marriage counseling at the church, joined a couples' Bible study, and most importantly, we began praying together every day.

It wasn't easy, and there were many difficult conversations, but God was faithful. Today, our marriage is stronger than ever. We've learned to communicate with love and grace, and we're serving together in the church.

If you're going through a difficult time in your relationship, don't give up. God is a God of restoration and miracles. Trust Him and watch Him work!`,
      author: 'Sister Grace Mutesi',
      authorEmail: 'grace.m@example.com',
      isApproved: true,
      createdAt: new Date('2024-01-10'),
    },
    {
      id: '2',
      title: 'Healed from Depression',
      content: `For three years, I battled severe depression. There were days I couldn't get out of bed, and I felt like giving up on life. I tried medication, therapy, and everything else, but nothing seemed to help.

One evening, I was at my lowest point when my phone rang. It was Sister Mary from church, just calling to check on me. She didn't know what I was going through, but God used her at the perfect time.

She prayed with me over the phone, and I felt something shift in my spirit. She invited me to join the church prayer group, and I reluctantly agreed.

The brothers and sisters in that prayer group became my family. They prayed for me, encouraged me, and reminded me of God's promises. Slowly but surely, the darkness began to lift.

Today, I am completely free from depression! God has given me joy and purpose. I now lead a support group at church for others struggling with mental health issues.

God is real, and He cares about our mental and emotional health. If you're struggling, please reach out. You don't have to fight alone.`,
      author: 'Brother David Nkunda',
      authorEmail: 'david.n@example.com',
      isApproved: true,
      createdAt: new Date('2024-01-18'),
    },
    {
      id: '3',
      title: 'Provision During Financial Crisis',
      content: `Last year, I lost my job unexpectedly. I had bills to pay, children to feed, and no savings. I was terrified and didn't know what to do.

I remembered the scripture in Philippians 4:19: "And my God will meet all your needs according to the riches of his glory in Christ Jesus." I decided to trust God completely.

I shared my situation with the church family, and the response was overwhelming. People brought food, helped with bills, and encouraged me with prayers and scripture.

But God didn't stop there. Within two weeks, I received a call for a job interview. The position was better than my previous job, with higher pay and better benefits. I got the job!

Looking back, I see how God used that difficult season to teach me to depend on Him and to experience the love of the church family. He is truly Jehovah Jireh, our provider!

Never doubt God's ability to provide. He knows your needs before you even ask, and He is faithful to supply.`,
      author: 'Brother James Habimana',
      isApproved: true,
      createdAt: new Date('2024-01-25'),
    },
    {
      id: '4',
      title: 'Miraculous Healing from Cancer',
      content: `In March 2023, I was diagnosed with stage 3 cancer. The doctors gave me a grim prognosis and recommended aggressive treatment. I was devastated and afraid.

The church immediately rallied around me. They organized prayer vigils, fasted for my healing, and supported my family in every way possible. Elder John anointed me with oil and prayed according to James 5:14-15.

I went through chemotherapy, and it was the hardest thing I've ever experienced. But through it all, I felt God's presence. The church family visited me, brought meals, and never stopped praying.

In December 2023, I went for my follow-up scan. The doctor came in with tears in his eyes and said, "I don't know how to explain this, but the cancer is completely gone. This is medically unexplainable."

I knew it was God! He had heard our prayers and performed a miracle. Today, I am cancer-free and healthier than ever. I give all glory to God!

If you're facing a health crisis, don't lose hope. God is still in the healing business. Trust Him and believe in His power to heal.`,
      author: 'Sister Ruth Uwase',
      authorEmail: 'ruth.u@example.com',
      isApproved: true,
      createdAt: new Date('2024-02-02'),
    },
    {
      id: '5',
      title: 'From Addiction to Freedom',
      content: `I struggled with alcohol addiction for over 10 years. It destroyed my relationships, my career, and nearly took my life. I tried to quit many times but always fell back into the same pattern.

One night, I hit rock bottom. I was alone, drunk, and contemplating ending my life. In that moment, I cried out to God: "If you're real, please help me!"

The next morning, my cousin invited me to church. I hadn't been to church in years, but something made me go. That Sunday, the message was about freedom in Christ and breaking chains of addiction.

When the altar call was made, I went forward. The pastor and elders prayed for me, and I felt the power of God like never before. That day, God broke the chains of addiction in my life.

It's been 14 months since that day, and I haven't touched alcohol. God has restored my relationships, given me a new job, and filled my life with purpose. I now volunteer with the church's addiction recovery ministry.

If you're struggling with addiction, there is hope. Jesus can set you free. Don't wait until you hit rock bottom like I did. Reach out for help today.`,
      author: 'Brother Samuel Mugisha',
      isApproved: true,
      createdAt: new Date('2024-02-08'),
    },
    {
      id: '6',
      title: 'God Gave Me a Family',
      content: `I grew up in an orphanage and never knew what it felt like to have a real family. When I turned 18, I was on my own with no support system and no one to turn to.

I started attending RCA-SDA church because someone invited me. At first, I came just for the free meals after service, but something kept drawing me back.

The people at this church became my family. They didn't just say they cared—they showed it. They helped me find housing, supported me through college, celebrated my birthdays, and were there during my difficult times.

Sister Mary and Brother John became like parents to me. The youth group became my siblings. For the first time in my life, I understood what family meant.

But more than that, I discovered my Heavenly Father who loves me unconditionally. God used this church family to show me His love in a tangible way.

Today, I'm a college graduate with a good job, and I'm engaged to a wonderful woman I met at church. God took an orphan and gave him a family, a future, and a hope.

If you feel alone or abandoned, know that God sees you. He can give you a family and a place to belong. Come to church—we're waiting to welcome you with open arms!`,
      author: 'Brother Emmanuel Kayitare',
      authorEmail: 'emmanuel.k@example.com',
      isApproved: true,
      createdAt: new Date('2024-02-12'),
    },
  ];

  // Filter to show only approved testimonies to regular users
  const approvedTestimonies = testimonies.filter(t => t.isApproved);

  // Apply date filter
  const dateFilteredTestimonies = dateFilter
    ? approvedTestimonies.filter(testimony => {
        const testimonyDate = new Date(testimony.createdAt);
        return testimonyDate.toDateString() === dateFilter.toDateString();
      })
    : approvedTestimonies;

  // Apply search filter
  const searchedTestimonies = searchQuery.trim() === ''
    ? dateFilteredTestimonies
    : dateFilteredTestimonies.filter(testimony => 
        testimony.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        testimony.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        testimony.author.toLowerCase().includes(searchQuery.toLowerCase())
      );

  // Pagination
  const totalPages = Math.ceil(searchedTestimonies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTestimonies = searchedTestimonies.slice(startIndex, startIndex + itemsPerPage);

  // Reset to page 1 when filters change
  const handleFilterChange = (filterFn: () => void) => {
    filterFn();
    setCurrentPage(1);
  };

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
            <Heart className="w-5 h-5 mr-2" />
            Share Your Testimony
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 items-center justify-center">
          <DateSearchFilter
            dateFilter={dateFilter}
            onDateChange={(date) => handleFilterChange(() => setDateFilter(date))}
            searchQuery={searchQuery}
            onSearchChange={(query) => handleFilterChange(() => setSearchQuery(query))}
            searchPlaceholder="Search testimonies..."
          />
        </div>

        <div className="space-y-6">
          {searchedTestimonies.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="font-bold">
                  {testimonies.length === 0 
                    ? 'No testimonies yet. Be the first to share your testimony!'
                    : 'No testimonies found matching your filters.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            paginatedTestimonies.map(testimony => (
              <TestimonyCard 
                key={testimony.id} 
                testimony={testimony}
                onViewDetails={() => setSelectedTestimony(testimony)}
              />
            ))
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={searchedTestimonies.length}
          onItemsPerPageChange={setItemsPerPage}
          itemsPerPageOptions={[4, 8, 12, 20]}
        />

        {showAddModal && (
          <AddTestimonyModal onClose={() => setShowAddModal(false)} />
        )}

        {selectedTestimony && (
          <ViewTestimonyModal 
            testimony={selectedTestimony}
            onClose={() => setSelectedTestimony(null)}
          />
        )}
      </div>
    </div>
  );
}

function TestimonyCard({ testimony, onViewDetails }: { testimony: Testimony; onViewDetails: () => void }) {
  const preview = testimony.content.substring(0, 200) + (testimony.content.length > 200 ? '...' : '');
  
  return (
    <Card className="bg-gradient-to-br from-pink-200 to-yellow-200 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-400 border-4 border-black flex items-center justify-center flex-shrink-0">
            <Heart className="w-6 h-6 text-white" />
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
        <p className="font-bold leading-relaxed mb-4">
          {preview}
        </p>
        <Button 
          onClick={onViewDetails}
          size="sm"
          className="bg-black text-white hover:bg-gray-800"
        >
          Read Full Testimony
        </Button>
      </CardContent>
    </Card>
  );
}

function ViewTestimonyModal({ testimony, onClose }: { testimony: Testimony; onClose: () => void }) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 bg-blue-400 border-4 border-black flex items-center justify-center flex-shrink-0">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <DialogTitle className="uppercase text-2xl mb-2">{testimony.title}</DialogTitle>
              <p className="text-sm font-bold">
                By {testimony.author} • {new Date(testimony.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </DialogHeader>
        
        <div className="bg-gradient-to-br from-pink-50 to-yellow-50 border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="font-bold whitespace-pre-wrap leading-relaxed text-lg">
            {testimony.content}
          </p>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
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
          <CheckCircle className="w-16 h-16 mx-auto mb-4" />
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
