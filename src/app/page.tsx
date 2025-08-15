'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JobCard from '@/components/JobCard';
import BusinessCard from '@/components/BusinessCard';
import PropertyCard from '@/components/PropertyCard';
import BlogCard from '@/components/BlogCard';
import { 
  sampleBusinesses, 
  sampleProperties, 
  sampleBlogPosts, 
  heroStats 
} from '@/data/sampleData';
import jobsData from '@/data/jobs.json';
import { Users, Briefcase, Home, ArrowRight, Building2, BookOpen } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gray-900 text-white py-20">
          <div className="absolute inset-0">
            <Image
              src="/images/hero-kenya.jpg"
              alt="Kenya Landscape"
              fill
              className="object-cover opacity-60"
              priority
            />
            <div className="absolute inset-0 bg-gray-900/40" />
          </div>
          
          <div className="relative container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">
              Welcome to NewKenyan.com
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Connect with Kenya&apos;s fastest-growing business directory, job board, and property marketplace.
            </p>
            <div className="flex gap-4 justify-center mb-12">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg" asChild>
                <Link href="/directory">Explore Directory</Link>
              </Button>
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg bg-transparent" asChild>
                <Link href="/jobs-in-kenya">Find Jobs</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-600 rounded-full mx-auto mb-2">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  {heroStats.businesses.toLocaleString()}+
                </div>
                <div className="text-white text-sm">Businesses</div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full mx-auto mb-2">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  {heroStats.jobs.toLocaleString()}+
                </div>
                <div className="text-white text-sm">Jobs</div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-600 rounded-full mx-auto mb-2">
                  <Home className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  {heroStats.properties.toLocaleString()}+
                </div>
                <div className="text-white text-sm">Properties</div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Content Sections */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Explore Kenya&apos;s Opportunities</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover the best jobs, businesses, properties, and stories from across Kenya
              </p>
            </div>

            {/* Latest Jobs */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold">Latest Jobs</h3>
                </div>
                <Button variant="outline" className="border-2 border-gray-300 hover:bg-gray-100" asChild>
                  <Link href="/jobs-in-kenya" className="flex items-center">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {jobsData.jobs.slice(0, 3).map((job) => (
                  <JobCard key={job.id} {...job} />
                ))}
              </div>
            </div>

            {/* Top Businesses */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg">
                    <Building2 className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold">Top Businesses</h3>
                </div>
                <Button variant="outline" className="border-2 border-gray-300 hover:bg-gray-100" asChild>
                  <Link href="/directory" className="flex items-center">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sampleBusinesses.slice(0, 3).map((business) => (
                  <BusinessCard 
                    key={business.id} 
                    id={business.id}
                    name={business.name}
                    category={business.category}
                    rating={business.rating}
                    reviewCount={business.reviewCount}
                    location={business.location}
                    imageUrl={business.imageUrl}
                    isVerified={business.isVerified}
                    isNew={business.isNew}
                    phoneNumber={business.phoneNumber}
                    whatsappNumber={business.whatsappNumber}
                    description={business.description}
                  />
                ))}
              </div>
            </div>

            {/* Featured Properties */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg">
                    <Home className="h-5 w-5 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-bold">Featured Properties</h3>
                </div>
                <Button variant="outline" className="border-2 border-gray-300 hover:bg-gray-100" asChild>
                  <Link href="/properties" className="flex items-center">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sampleProperties.slice(0, 3).map((property) => (
                  <PropertyCard key={property.id} {...property} />
                ))}
              </div>
            </div>

            {/* Recent Blog Posts */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg">
                    <BookOpen className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold">Recent Blog Posts</h3>
                </div>
                <Button variant="outline" className="border-2 border-gray-300 hover:bg-gray-100" asChild>
                  <Link href="/blog" className="flex items-center">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sampleBlogPosts.slice(0, 3).map((post) => (
                  <BlogCard key={post.id} {...post} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-gray-600 mb-8">
                Join thousands of Kenyans already using our platform to grow their careers and businesses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-green-600 hover:bg-green-700 text-white text-lg px-8" asChild>
                  <Link href="/add-listing">Post Your Listing</Link>
                </Button>
                <Button variant="outline" className="border-2 border-gray-300 hover:bg-gray-100 text-lg px-8" asChild>
                  <Link href="/directory">Explore More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
