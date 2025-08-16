'use client';

import { useState } from 'react';
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
import { Users, Briefcase, Home, ArrowRight, Building2, BookOpen, ChevronDown } from 'lucide-react';

export default function HomePage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqData = [
    {
      question: "How do I find houses for rent in Nairobi on NewKenyan.com?",
      answer: "Browse our extensive <a href='/properties' class='text-green-600 hover:underline'>property listings</a> to find affordable houses for rent in Nairobi. Use our search filters to narrow down by location, price, and property type. You can also contact property owners directly through our platform."
    },
    {
      question: "Are there apartments for sale in Kenya on your platform?",
      answer: "Yes! We have a wide selection of <a href='/properties' class='text-green-600 hover:underline'>apartments for sale</a> across Kenya, especially in Nairobi. Browse by budget, location, and amenities to find your dream apartment."
    },
    {
      question: "How can I find job opportunities in Kenya?",
      answer: "Visit our <a href='/jobs-in-kenya' class='text-green-600 hover:underline'>jobs section</a> to explore thousands of job opportunities in Kenya. We feature positions across all industries and experience levels, from entry-level to executive roles."
    },
    {
      question: "Do you have office space for rent listings?",
      answer: "Absolutely! Our <a href='/properties' class='text-green-600 hover:underline'>commercial properties</a> section includes office spaces for rent across Kenya. Filter by size, location, and amenities to find the perfect office space for your business."
    },
    {
      question: "How do I list my company in your business directory?",
      answer: "Adding your company to our <a href='/business-directory' class='text-green-600 hover:underline'>business directory</a> is easy. Click on <a href='/add-listing' class='text-green-600 hover:underline'>Post Your Listing</a> and provide your business details. Verified businesses get priority placement."
    },
    {
      question: "Is there land for sale in Kenya on your website?",
      answer: "Yes, we have extensive listings for <a href='/properties' class='text-green-600 hover:underline'>land for sale in Kenya</a>. Whether you're looking for residential plots, commercial land, or agricultural property, browse our land listings with detailed information and photos."
    },
    {
      question: "How do I contact NewKenyan.com for support?",
      answer: "You can reach us at <a href='mailto:hr@newkenyan.com' class='text-green-600 hover:underline'>hr@newkenyan.com</a> or call <a href='tel:+254736407642' class='text-green-600 hover:underline'>+254 736 407 642</a>. Our team is ready to help with any questions about properties, jobs, or business listings."
    },
    {
      question: "Are your property listings verified and legitimate?",
      answer: "We work hard to ensure all our property listings are legitimate. However, we recommend verifying property details and visiting in person before making any commitments. Check our <a href='/blog' class='text-green-600 hover:underline'>blog</a> for tips on safe property transactions."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* 8 Years Anniversary Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4">
        <div className="container mx-auto text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm sm:text-base">
            <span className="font-bold">🎉 Celebrating 8 Years of Service!</span>
            <span className="hidden sm:inline">•</span>
            <span>Special Anniversary Price: <strong>KES 100</strong> (normally KES 2,000-5,000)</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-yellow-200 font-semibold">⏰ Limited Time Offer</span>
          </div>
        </div>
      </div>
      
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
              Houses for Rent & Sale in Nairobi Kenya | Jobs & Business Directory
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Find affordable houses for rent, apartments for sale, job opportunities in Kenya, and business listings. Your trusted marketplace for real estate, jobs, and business directory in Nairobi.
            </p>
            <div className="flex gap-4 justify-center mb-12">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg" asChild>
                <Link href="/properties">Find Houses for Rent</Link>
              </Button>
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg bg-transparent" asChild>
                <Link href="/jobs-in-kenya">Browse Jobs in Kenya</Link>
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
              <h2 className="text-3xl font-bold mb-4">Find Houses for Rent, Jobs & Business Opportunities in Kenya</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Browse affordable houses for rent in Nairobi, apartments for sale, job opportunities in Kenya, office space for rent, and registered companies in our comprehensive business directory.
              </p>
            </div>

            {/* Latest Jobs */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold">Latest Job Opportunities in Kenya</h3>
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
                  <h3 className="text-2xl font-bold">Top Companies in Kenya - Business Directory</h3>
                </div>
                <Button variant="outline" className="border-2 border-gray-300 hover:bg-gray-100" asChild>
                  <Link href="/business-directory" className="flex items-center">
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
                  <h3 className="text-2xl font-bold">Houses for Sale & Rent in Nairobi - Featured Properties</h3>
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
                  <h3 className="text-2xl font-bold">Business Daily Kenya - Latest News & Updates</h3>
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
              <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Property or Job in Kenya?</h2>
              <p className="text-gray-600 mb-8">
                Join thousands of Kenyans finding affordable houses for rent, apartments for sale, and job opportunities in Nairobi on our platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button className="bg-green-600 hover:bg-green-700 text-white text-lg px-8" asChild>
                  <Link href="/add-listing">List Your Property</Link>
                </Button>
                <Button variant="outline" className="border-2 border-gray-300 hover:bg-gray-100 text-lg px-8" asChild>
                  <Link href="/properties">Browse Properties</Link>
                </Button>
              </div>
              <div className="text-sm text-gray-600">
                <p className="mb-2">Contact us: <a href="mailto:hr@newkenyan.com" className="text-green-600 hover:underline">hr@newkenyan.com</a> | <a href="tel:+254736407642" className="text-green-600 hover:underline">+254 736 407 642</a></p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                <p className="text-gray-600">
                  Get answers to common questions about finding houses for rent, apartments for sale, and job opportunities in Kenya
                </p>
              </div>

              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm border">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                      <ChevronDown 
                        className={`h-5 w-5 text-gray-500 transform transition-transform ${
                          openFAQ === index ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    {openFAQ === index && (
                      <div className="px-6 pb-4">
                        <div 
                          className="text-gray-600 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: faq.answer }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <p className="text-gray-600 mb-4">
                  Still have questions? We&apos;re here to help!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" className="border-2 border-gray-300 hover:bg-gray-100" asChild>
                    <Link href="mailto:hr@newkenyan.com">Email Support</Link>
                  </Button>
                  <Button variant="outline" className="border-2 border-gray-300 hover:bg-gray-100" asChild>
                    <Link href="tel:+254736407642">Call Us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
