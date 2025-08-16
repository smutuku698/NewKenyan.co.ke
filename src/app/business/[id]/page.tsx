'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BusinessCard from '@/components/BusinessCard';
import ReviewSystem from '@/components/ReviewSystem';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  Phone, 
  MessageCircle, 
  MapPin, 
  CheckCircle, 
  Mail, 
  Globe, 
  Clock, 
  DollarSign,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  Shield,
  Award
} from 'lucide-react';
import { 
  generateBusinessSlug, 
  generateBusinessTitle, 
  generateBusinessDescription, 
  generateBusinessKeywords,
  getSimilarBusinesses
} from '@/utils/seo';

interface BusinessDetails {
  id: string;
  business_name: string;
  category: string;
  description: string;
  address: string;
  city: string;
  pin_location_url: string | null;
  phone: string;
  email: string | null;
  website: string | null;
  business_days: string | null;
  pricing_info: string | null;
  image_url: string | null;
  rating: number;
  review_count: number;
  is_verified: boolean;
  created_at: string;
  whatsapp_number: string | null;
}

export default function BusinessDetailPage() {
  const params = useParams();
  const businessId = params.id as string;
  const [business, setBusiness] = useState<BusinessDetails | null>(null);
  const [similarBusinesses, setSimilarBusinesses] = useState<BusinessDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const fetchBusinessDetails = useCallback(async () => {
    try {
      // Fetch the main business
      const { data: businessData, error: businessError } = await supabase
        .from('business_listings')
        .select('*')
        .eq('id', businessId)
        .eq('is_approved', true)
        .single();

      if (businessError) {
        if (businessError.code === 'PGRST116') {
          setError('Business not found');
        } else {
          console.error('Error fetching business:', businessError);
          setError('Failed to load business details');
        }
        return;
      }

      setBusiness(businessData);

      // Fetch similar businesses
      const { data: allBusinesses, error: allBusinessesError } = await supabase
        .from('business_listings')
        .select('*')
        .eq('is_approved', true)
        .limit(50); // Get a good sample for similarity matching

      if (!allBusinessesError && allBusinesses) {
        const similar = getSimilarBusinesses(allBusinesses, businessData, 6);
        setSimilarBusinesses(similar);
      }

    } catch (error) {
      console.error('Error:', error);
      setError('Failed to load business details');
    } finally {
      setLoading(false);
    }
  }, [businessId]);

  useEffect(() => {
    if (businessId) {
      fetchBusinessDetails();
    }
  }, [businessId, fetchBusinessDetails]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-12">
              <p className="text-gray-600">Loading business details...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !business) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-600 mb-4">{error}</h2>
              <Button onClick={() => window.history.back()}>
                Go Back
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isNew = new Date(business.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  // Generate business-specific FAQ based on category and features
  const generateBusinessFAQ = (business: BusinessDetails) => {
    const baseQuestions = [
      {
        question: `What services does ${business.business_name} offer in ${business.city}?`,
        answer: `${business.business_name} is a ${business.category.toLowerCase()} business located in ${business.city}. ${business.description} Contact them directly at ${business.phone} for detailed information about their services and offerings.`
      },
      {
        question: `How can I contact ${business.business_name}?`,
        answer: `You can contact ${business.business_name} by calling ${business.phone}${business.whatsapp_number ? ` or via WhatsApp at ${business.whatsapp_number}` : ''}${business.email ? `. You can also email them at ${business.email}` : ''}${business.website ? ` or visit their website` : ''}. They are located at ${business.address}, ${business.city}.`
      },
      {
        question: `What are the business hours for ${business.business_name}?`,
        answer: `${business.business_days ? `${business.business_name} operates during: ${business.business_days}.` : 'Contact the business directly for their operating hours.'} For the most current hours and availability, please call ${business.phone} before visiting.`
      },
      {
        question: `Is ${business.business_name} a verified business on NewKenyan.com?`,
        answer: `${business.is_verified ? `Yes, ${business.business_name} is a verified business on NewKenyan.com.` : `${business.business_name} is listed on NewKenyan.com.`} All businesses go through our verification process. You can find more verified businesses in our <a href='/business-directory' class='text-green-600 hover:underline'>business directory</a>.`
      },
      {
        question: `What do customers say about ${business.business_name}?`,
        answer: `${business.business_name} has a rating of ${business.rating} stars based on ${business.review_count} customer reviews. Read detailed customer reviews and experiences below, or browse more ${business.category.toLowerCase()} businesses in our <a href='/business-directory' class='text-green-600 hover:underline'>Kenya business directory</a>.`
      },
      {
        question: `Where is ${business.business_name} located in ${business.city}?`,
        answer: `${business.business_name} is located at ${business.address}, ${business.city}. ${business.pin_location_url ? 'You can view their exact location on the map using the location link provided.' : 'Contact them for specific directions and landmarks.'} Find more businesses near you in our <a href='/business-directory' class='text-green-600 hover:underline'>local business listings</a>.`
      }
    ];

    // Add category-specific questions
    if (business.category.toLowerCase().includes('restaurant') || business.category.toLowerCase().includes('food')) {
      baseQuestions.push({
        question: `Does ${business.business_name} offer delivery or takeaway services?`,
        answer: `For information about delivery, takeaway, and dining options at ${business.business_name}, please contact them directly at ${business.phone}. ${business.pricing_info ? `Pricing information: ${business.pricing_info}` : ''}`
      });
    }

    if (business.category.toLowerCase().includes('hotel') || business.category.toLowerCase().includes('accommodation')) {
      baseQuestions.push({
        question: `How do I make a reservation at ${business.business_name}?`,
        answer: `To make a reservation at ${business.business_name}, call ${business.phone}${business.whatsapp_number ? ` or WhatsApp ${business.whatsapp_number}` : ''}. ${business.pricing_info ? `Pricing: ${business.pricing_info}` : 'Contact them for current rates and availability.'}`
      });
    }

    if (business.pricing_info) {
      baseQuestions.push({
        question: `What are the prices at ${business.business_name}?`,
        answer: `${business.business_name} pricing: ${business.pricing_info}. Contact them at ${business.phone} for the most current pricing and to discuss your specific needs. Find more businesses with competitive pricing in our <a href='/business-directory' class='text-green-600 hover:underline'>business directory</a>.`
      });
    }

    return baseQuestions;
  };

  const businessFAQ = business ? generateBusinessFAQ(business) : [];

  // Generate SEO metadata
  if (!business) return null;

  const seoTitle = generateBusinessTitle(business.business_name, business.category, business.city);
  const seoDescription = generateBusinessDescription(business.business_name, business.category, business.city, business.description);
  const seoKeywords = generateBusinessKeywords(business.business_name, business.category, business.city);
  const businessSlug = generateBusinessSlug(business.business_name, business.category, business.city);

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={seoKeywords} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://newkenyan.com/business/${businessSlug}`} />
        {business.image_url && (
          <meta property="og:image" content={business.image_url} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <link rel="canonical" href={`https://newkenyan.com/business/${businessSlug}`} />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": business.business_name,
              "description": business.description,
              "url": business.website || `https://newkenyan.com/business/${businessSlug}`,
              "image": business.image_url,
              "address": {
                "@type": "PostalAddress",
                "streetAddress": business.address,
                "addressLocality": business.city,
                "addressCountry": "KE"
              },
              "geo": business.pin_location_url ? {
                "@type": "GeoCoordinates",
                "url": business.pin_location_url
              } : undefined,
              "telephone": business.phone,
              "email": business.email,
              "openingHours": business.business_days,
              "priceRange": business.pricing_info,
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": business.rating,
                "reviewCount": business.review_count
              },
              "category": business.category,
              "founder": {
                "@type": "Organization",
                "name": "NewKenyan.com"
              }
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Header />
        
        {/* Breadcrumb Navigation */}
        <div className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-green-600">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/business-directory" className="hover:text-green-600">Business Directory</Link>
              <ChevronRight className="h-4 w-4" />
              <Link href={`/business-directory?category=${business.category}`} className="hover:text-green-600">{business.category}</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-gray-900 truncate">{business.business_name}</span>
            </nav>
          </div>
        </div>
        
        <main className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              
              {/* Back Button */}
              <div className="mb-6">
                <Link href="/business-directory" className="inline-flex items-center text-green-600 hover:text-green-700">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Business Directory
                </Link>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                  {/* Business Header */}
                  <div className="bg-white rounded-lg shadow-sm border overflow-hidden mb-6">
                    {/* Hero Image */}
                    {business.image_url && (
                      <div className="relative h-64 md:h-80">
                        <Image
                          src={business.image_url}
                          alt={`${business.business_name} - ${business.category} in ${business.city}`}
                          fill
                          className="object-cover"
                          priority
                        />
                        <div className="absolute top-4 left-4 flex space-x-2">
                          {isNew && (
                            <Badge className="bg-orange-100 text-orange-800 border-orange-300">
                              <Award className="h-3 w-3 mr-1" />
                              New
                            </Badge>
                          )}
                          {business.is_verified && (
                            <Badge className="bg-green-100 text-green-800 border-green-300">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Business Info */}
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                        <div className="mb-4 md:mb-0 flex-1">
                          <h1 className="text-3xl font-bold text-gray-900 mb-3">
                            {business.business_name}
                          </h1>
                          <div className="flex items-center space-x-3 mb-3">
                            <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                              {business.category}
                            </Badge>
                            <div className="flex items-center text-gray-600">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{business.city}</span>
                            </div>
                          </div>
                          
                          {/* Rating */}
                          <div className="flex items-center mb-4">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-5 w-5 ${
                                    i < Math.floor(business.rating)
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="ml-2 text-gray-600">
                              {business.rating} ({business.review_count} reviews)
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-3">About {business.business_name}</h2>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{business.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Business Details */}
                  <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Business Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Location */}
                      <div>
                        <h3 className="font-semibold mb-3 flex items-center">
                          <MapPin className="h-5 w-5 mr-2 text-gray-600" />
                          Location & Address
                        </h3>
                        <div className="text-gray-700 space-y-1">
                          <p>{business.address}</p>
                          <p>{business.city}</p>
                          {business.pin_location_url && (
                            <a
                              href={business.pin_location_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-green-600 hover:text-green-700 text-sm"
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              View on Maps
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div>
                        <h3 className="font-semibold mb-3">Contact Information</h3>
                        <div className="space-y-2 text-gray-700">
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-3 text-gray-600" />
                            <span>{business.phone}</span>
                          </div>
                          {business.whatsapp_number && (
                            <div className="flex items-center">
                              <MessageCircle className="h-4 w-4 mr-3 text-gray-600" />
                              <span>{business.whatsapp_number}</span>
                            </div>
                          )}
                          {business.email && (
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-3 text-gray-600" />
                              <a
                                href={`mailto:${business.email}`}
                                className="text-green-600 hover:text-green-700"
                              >
                                {business.email}
                              </a>
                            </div>
                          )}
                          {business.website && (
                            <div className="flex items-center">
                              <Globe className="h-4 w-4 mr-3 text-gray-600" />
                              <a
                                href={business.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-600 hover:text-green-700"
                              >
                                Visit Website
                              </a>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Business Hours */}
                      {business.business_days && (
                        <div>
                          <h3 className="font-semibold mb-3 flex items-center">
                            <Clock className="h-5 w-5 mr-2 text-gray-600" />
                            Business Hours
                          </h3>
                          <p className="text-gray-700">{business.business_days}</p>
                        </div>
                      )}

                      {/* Pricing Info */}
                      {business.pricing_info && (
                        <div>
                          <h3 className="font-semibold mb-3 flex items-center">
                            <DollarSign className="h-5 w-5 mr-2 text-gray-600" />
                            Pricing Information
                          </h3>
                          <p className="text-gray-700">{business.pricing_info}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Reviews Section */}
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <ReviewSystem 
                      businessId={business.id} 
                      businessName={business.business_name}
                    />
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Contact Card */}
                  <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
                    <h3 className="text-lg font-semibold mb-4">Contact {business.business_name}</h3>
                    
                    <div className="space-y-2 mb-6">
                      <Button
                        onClick={() => window.open(`tel:${business.phone}`, '_self')}
                        className="w-full"
                        variant="outline"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Call Now
                      </Button>
                      {business.whatsapp_number && (
                        <Button
                          onClick={() => window.open(`https://wa.me/${business.whatsapp_number?.replace('+', '')}`, '_blank')}
                          className="w-full bg-green-600 hover:bg-green-700 text-white"
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          WhatsApp
                        </Button>
                      )}
                      {business.email && (
                        <Button
                          onClick={() => window.open(`mailto:${business.email}`, '_self')}
                          variant="outline"
                          className="w-full"
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Send Email
                        </Button>
                      )}
                    </div>

                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>Category:</strong> {business.category}</p>
                      <p><strong>Location:</strong> {business.city}</p>
                      <p><strong>Listed:</strong> {new Date(business.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {/* Trust Signals */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <Shield className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-green-800 mb-2">Verified Business</h4>
                        <p className="text-sm text-green-700">
                          This business is listed in our verified Kenya business directory. 
                          Contact information has been confirmed.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* More Businesses Section */}
              {similarBusinesses.length > 0 && (
                <section className="mt-16">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">More {business.category} Businesses in {business.city}</h2>
                    <Link 
                      href={`/business-directory?category=${business.category}&city=${business.city}`}
                      className="text-green-600 hover:text-green-700 font-semibold flex items-center"
                    >
                      View All {business.category} in {business.city}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                  
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {similarBusinesses.map((similarBusiness) => (
                      <BusinessCard 
                        key={similarBusiness.id} 
                        id={similarBusiness.id}
                        name={similarBusiness.business_name}
                        category={similarBusiness.category}
                        rating={similarBusiness.rating}
                        reviewCount={similarBusiness.review_count}
                        location={similarBusiness.city}
                        imageUrl={similarBusiness.image_url || '/images/sample-business-1.jpg'}
                        isVerified={similarBusiness.is_verified}
                        isNew={new Date(similarBusiness.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)}
                        phoneNumber={similarBusiness.phone}
                        whatsappNumber={similarBusiness.whatsapp_number || undefined}
                        description={similarBusiness.description}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* FAQ Section */}
              <section className="mt-16">
                <div className="max-w-3xl mx-auto">
                  <div className="text-center mb-12">
                    <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                    <p className="text-gray-600">
                      Common questions about {business.business_name} and their {business.category.toLowerCase()} services
                    </p>
                  </div>

                  <div className="space-y-4">
                    {businessFAQ.map((faq, index) => (
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
                      Looking for more businesses in {business.city}?
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button variant="outline" asChild>
                        <Link href="/business-directory">Browse All Businesses</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href="/blog">Business Tips & News</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}