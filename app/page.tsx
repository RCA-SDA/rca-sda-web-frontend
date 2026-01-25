import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-400 via-pink-400 to-blue-400 text-black py-20 border-b-8 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl font-black mb-6 uppercase tracking-tight transform -rotate-1">Welcome to RCA-SDA</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto font-bold">
            Manage all church activities in one place. Track members, record Sabbath attendance, 
            share testimonies, and stay connected with our community.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg" variant="outline" className="bg-white">
              <Link href="/members">
                View Members
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/testimonies">
                Share Testimony
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-black text-center mb-12 uppercase transform -rotate-1">
          Church Management Features
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="Member Management"
            description="View and manage all church members organized by families: Salvation Siblings, Ebenezer, and Jehova-nissi."
            href="/members"
            icon="👥"
          />
          
          <FeatureCard
            title="Sabbath School Report"
            description="Family fathers and mothers can mark attendance and track spiritual activities for their family members."
            href="/sabbath-report"
            icon="📋"
          />
          
          <FeatureCard
            title="Committee Notes"
            description="Document and access RCA-SDA committee meeting notes and decisions."
            href="/committee"
            icon="📝"
          />
          
          <FeatureCard
            title="Choir Songs"
            description="Browse song lyrics and listen to choir recordings. Choir secretaries can upload new songs."
            href="/choir"
            icon="🎵"
          />
          
          <FeatureCard
            title="Church Blog"
            description="Read about church events, Word of God teachings, and stay updated with church activities."
            href="/blog"
            icon="✍️"
          />
          
          <FeatureCard
            title="Gallery"
            description="View photos and videos from church events and activities."
            href="/gallery"
            icon="📸"
          />
          
          <FeatureCard
            title="Testimonies"
            description="Share your testimony and read how God is working in the lives of our members."
            href="/testimonies"
            icon="🙏"
          />
        </div>
      </section>

      {/* Church Families Section */}
      <section className="py-16 bg-white border-y-8 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-center mb-12 uppercase transform rotate-1">
            Our Church Families
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-300 border-4 border-black p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all">
              <h3 className="text-2xl font-black mb-4 uppercase">
                Salvation Siblings
              </h3>
              <p className="font-bold">
                United in faith and fellowship
              </p>
            </div>
            
            <div className="bg-green-300 border-4 border-black p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all">
              <h3 className="text-2xl font-black mb-4 uppercase">
                Ebenezer
              </h3>
              <p className="font-bold">
                Thus far the Lord has helped us
              </p>
            </div>
            
            <div className="bg-purple-300 border-4 border-black p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all">
              <h3 className="text-2xl font-black mb-4 uppercase">
                Jehova-nissi
              </h3>
              <p className="font-bold">
                The Lord is our banner
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  href: string;
  icon: string;
}

function FeatureCard({ title, description, href, icon }: FeatureCardProps) {
  return (
    <Link href={href}>
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <div className="text-4xl mb-2">{icon}</div>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
