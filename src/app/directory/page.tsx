'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BusinessCard from '@/components/BusinessCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { Search, Filter, Building2, ChevronDown, Phone, Mail } from 'lucide-react';

interface BusinessListing {
  id: string;
  business_name: string;
  category: string;
  description: string;
  address: string;
  city: string;
  phone: string;
  whatsapp_number: string | null;
  image_url: string | null;
  rating: number;
  review_count: number;
  is_verified: boolean;
  created_at: string;
}

export default function DirectoryPage() {
  const [businesses, setBusinesses] = useState<BusinessListing[]>([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState<BusinessListing[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqData = [
    {
      question: "How do I find registered companies in Kenya?",
      answer: "Use our comprehensive business directory to search for registered companies in Kenya. Filter by industry, location, or company name to find verified businesses across all sectors."
    },
    {
      question: "Are all businesses in your directory verified?",
      answer: "Yes, we verify all business listings in our Kenya directory. Companies must provide valid registration details and contact information before being approved for our <a href='/directory' class='text-green-600 hover:underline'>business directory</a>."
    },
    {
      question: "How can I add my company to the business directory?",
      answer: "To list your company in our Kenya business directory, visit our <a href='/add-listing' class='text-green-600 hover:underline'>add listing page</a>. Provide your business registration details, contact information, and business description."
    },
    {
      question: "What types of companies are listed in your directory?",
      answer: "Our directory includes all types of registered companies in Kenya - from startups to multinational corporations, covering industries like technology, manufacturing, agriculture, services, and more."
    },
    {
      question: "How do I contact companies listed in the directory?",
      answer: "Each business listing includes contact details such as phone numbers, email addresses, and physical locations. You can contact companies directly through the information provided in their listings."
    },
    {
      question: "Is there a cost to search the business directory?",
      answer: "No, searching our Kenya business directory is completely free. Browse <a href='/directory' class='text-green-600 hover:underline'>companies in Kenya</a>, view business details, and access contact information at no cost."
    },
    {
      question: "How often is the business directory updated?",
      answer: "Our business directory is updated daily with new company registrations and business information. We also regularly verify existing listings to ensure accuracy and relevance."
    },
    {
      question: "Can I find business daily services through your directory?",
      answer: "Yes, our directory includes companies offering business daily services, corporate services, and professional business solutions. Check our <a href='/blog' class='text-green-600 hover:underline'>business blog</a> for daily business news and updates."
    }
  ];

  const categories = Array.from(new Set(businesses.map(b => b.category))).sort();

  useEffect(() => {
    fetchBusinesses();
  }, []);

  useEffect(() => {
    let filtered = businesses;

    if (searchTerm) {
      filtered = filtered.filter(business =>
        business.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(business => business.category === selectedCategory);
    }

    setFilteredBusinesses(filtered);
  }, [businesses, searchTerm, selectedCategory]);

  const fetchBusinesses = async () => {
    try {
      const { data, error } = await supabase
        .from('business_listings')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching businesses:', error);
      } else {
        setBusinesses(data || []);
        setFilteredBusinesses(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Kenya Business Directory - Companies in Kenya | Business Listings</title>
        <meta name="description" content="Find registered companies in Kenya, business listings, corporate directory. Browse verified businesses and companies across all industries. Contact business daily services." />
        <meta name="keywords" content="companies in kenya, business directory, business listings, registered companies, corporate directory, business daily kenya, kenya companies, business services" />
        <meta property="og:title" content="Kenya Business Directory - Companies in Kenya" />
        <meta property="og:description" content="Find registered companies in Kenya, business listings, corporate directory. Browse verified businesses and companies across all industries." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kenya Business Directory - Companies in Kenya" />
        <meta name="twitter:description" content="Find registered companies in Kenya, business listings, corporate directory." />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "Kenya Business Directory",
              "description": "Comprehensive directory of registered companies and businesses in Kenya",
              "url": "https://newkenyan.com/directory",
              "mainEntity": {
                "@type": "ItemList",
                "name": "Companies in Kenya",
                "description": "List of verified businesses and companies operating in Kenya",
                "numberOfItems": businesses.length
              },
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://newkenyan.com"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Business Directory",
                    "item": "https://newkenyan.com/directory"
                  }
                ]
              }
            })
          }}
        />
      </Head>
      
      <div className="min-h-screen bg-white">
        <Header />
      
      {/* Hero Section with Search */}
      <section className="relative bg-gray-900 text-white py-20">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-office.jpg"
            alt="Modern Office Interior"
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gray-900/50" />
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Kenya Business Directory - Companies in Kenya
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Find registered companies in Kenya, business listings, corporate directory, and business daily services. Connect with top businesses and companies across all industries in Kenya.
          </p>
          
          {/* Search Form */}
          <div className="max-w-4xl mx-auto bg-white rounded-lg p-6 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search companies in Kenya, business listings, services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-gray-900"
                />
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="mt-4 flex justify-center">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8">
                <Search className="h-4 w-4 mr-2" />
                Find Companies in Kenya
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <main className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          {/* Results Header */}
          {!loading && (
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">Registered Companies in Kenya - Business Listings</h2>
                <p className="text-gray-600">
                  Showing {filteredBusinesses.length} of {businesses.length} verified {businesses.length === 1 ? 'company' : 'companies'} in our Kenya business directory
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">Sort by: Latest</span>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading businesses...</p>
            </div>
          )}

          {/* No Results */}
          {!loading && filteredBusinesses.length === 0 && (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No companies found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || selectedCategory
                    ? 'Try adjusting your search criteria to find more companies in Kenya.'
                    : 'No verified companies yet. Check back soon for new business listings!'}
                </p>
                {(searchTerm || selectedCategory) && (
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('');
                    }}
                    className="border-gray-300 hover:bg-gray-50"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Business Grid */}
          {!loading && filteredBusinesses.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredBusinesses.map((business) => {
                const isNew = new Date(business.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                
                return (
                  <BusinessCard
                    key={business.id}
                    id={business.id}
                    name={business.business_name}
                    category={business.category}
                    rating={business.rating}
                    reviewCount={business.review_count}
                    location={`${business.city}`}
                    imageUrl={business.image_url || '/images/sample-business-1.jpg'}
                    isVerified={business.is_verified}
                    isNew={isNew}
                    phoneNumber={business.phone}
                    whatsappNumber={business.whatsapp_number || undefined}
                    description={business.description}
                  />
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Business Directory Information Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Why Choose Our Kenya Business Directory?</h2>
            <p className="text-gray-600 mb-12 text-lg">
              Connect with verified companies in Kenya through our comprehensive business directory. Find reliable business partners, suppliers, and service providers across all industries.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Verified Companies</h3>
                <p className="text-gray-600">All registered companies in our directory are verified with valid business registration details.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Direct Contact</h3>
                <p className="text-gray-600">Access direct contact information for all businesses including phone numbers and email addresses.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Easy Search</h3>
                <p className="text-gray-600">Find companies by industry, location, or services using our advanced search filters.</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8" asChild>
                <Link href="/add-listing">List Your Business</Link>
              </Button>
              <Button variant="outline" className="border-2 border-gray-300 hover:bg-gray-100 px-8" asChild>
                <Link href="/properties">Browse Properties</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions - Business Directory</h2>
              <p className="text-gray-600">
                Get answers to common questions about finding companies in Kenya and using our business directory
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
                Need help finding specific companies in Kenya?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" className="border-2 border-gray-300 hover:bg-gray-100" asChild>
                  <Link href="mailto:hr@newkenyan.com">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Support
                  </Link>
                </Button>
                <Button variant="outline" className="border-2 border-gray-300 hover:bg-gray-100" asChild>
                  <Link href="tel:+254736407642">
                    <Phone className="h-4 w-4 mr-2" />
                    Call +254 736 407 642
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
        <Footer />
      </div>
    </>
  );
}