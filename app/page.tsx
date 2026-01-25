import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Hero Section */}
      <section className="bg-white text-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to RCA-SDA</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Manage all church activities in one place. Track members, record Sabbath attendance, 
            share testimonies, and stay connected with our community.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/members">
                View Members
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-2 border-balck text-black hover:bg-white/10 hover:text-black">
              <Link href="/testimonies">
                Share Testimony
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-zinc-900">
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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-zinc-900">
            Our Church Families
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-semibold mb-4 text-zinc-900">
                Salvation Siblings
              </h3>
              <p className="text-zinc-600">
                United in faith and fellowship
              </p>
            </div>
            
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-semibold mb-4 text-zinc-900">
                Ebenezer
              </h3>
              <p className="text-zinc-600">
                Thus far the Lord has helped us
              </p>
            </div>
            
            <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-semibold mb-4 text-zinc-900">
                Jehova-nissi
              </h3>
              <p className="text-zinc-600">
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
