'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JobCard from '@/components/JobCard';
import BusinessCard from '@/components/BusinessCard';
import PropertyCard from '@/components/PropertyCard';
import BlogCard from '@/components/BlogCard';
import ToggleableFilterSidebar from '@/components/ToggleableFilterSidebar';
import { KENYA_COUNTIES } from '@/components/CountyCrossLinks';
import { FilterState } from '@/components/PropertyFilterSidebar';
import { GridLoadingSkeleton } from '@/components/LoadingSkeleton';
import { LazySection } from '@/components/LazySection';
import WhatsAppButton from '@/components/WhatsAppButton';
import { 
  sampleBusinesses, 
  sampleBlogPosts, 
  heroStats 
} from '@/data/sampleData';
import { supabase } from '@/lib/supabase';
import { Users, Briefcase, Home, ArrowRight, Building2, BookOpen, ChevronDown } from 'lucide-react';

interface BusinessListing {
  id: string;
  business_name: string;
  category: string;
  description: string;
  address: string;
  city: string;
  phone: string;
  email: string | null;
  website: string | null;
  image_url: string | null;
  rating: number;
  review_count: number;
  is_approved: boolean;
  is_verified: boolean;
  whatsapp_number: string | null;
}

interface PropertyListing {
  id: string;
  property_title: string;
  property_type: string;
  description: string;
  price: number;
  price_type: string;
  bedrooms: number | null;
  bathrooms: number | null;
  square_feet: number | null;
  address: string;
  city: string;
  county: string | null;
  contact_phone: string;
  contact_email: string | null;
  whatsapp_number: string | null;
  amenities: string[];
  images: string[];
  is_approved: boolean;
  is_featured: boolean;
  created_at: string;
  construction_progress?: string | null;
  completion_date?: string | null;
  payment_plan?: string | null;
  nearby_features?: string[];
  external_features?: string[];
  internal_features?: string[];
}

interface JobListing {
  id: string;
  job_title: string;
  nature_of_job: string;
  industry: string;
  salary: string;
  job_location: string;
  duties_and_responsibilities: string;
  company_name: string;
  contact_email: string;
  status: string;
  featured: boolean;
  slug: string;
}

export default function HomePage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [featuredBusinesses, setFeaturedBusinesses] = useState<BusinessListing[]>([]);
  const [properties, setProperties] = useState<PropertyListing[]>([]);
  const [allProperties, setAllProperties] = useState<PropertyListing[]>([]);
  const [featuredJobs, setFeaturedJobs] = useState<JobListing[]>([]);
  const [availableLocations, setAvailableLocations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMoreProperties, setHasMoreProperties] = useState(true);
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState<FilterState>({});
  const PROPERTIES_PER_PAGE = 12;

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Fetch locations on mount
  useEffect(() => {
    fetchLocations();
  }, []);

  // Fetch available locations from locations table
  const fetchLocations = async () => {
    try {
      const { data, error } = await supabase
        .from('locations')
        .select('name, type')
        .eq('is_active', true)
        .order('name');

      if (!error && data) {
        const locationNames = data.map(l => l.name);
        setAvailableLocations(locationNames);
      }
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  // Fetch initial properties
  useEffect(() => {
    fetchProperties(0);
  }, []);

  // Fetch properties with pagination
  const fetchProperties = async (pageNum: number) => {
    try {
      if (pageNum === 0) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const from = pageNum * PROPERTIES_PER_PAGE;
      const to = from + PROPERTIES_PER_PAGE - 1;

      const { data, error, count } = await supabase
        .from('property_listings')
        .select('id, property_title, property_type, description, price, price_type, bedrooms, bathrooms, square_feet, address, city, county, contact_phone, contact_email, whatsapp_number, amenities, images, is_approved, is_featured, created_at, construction_progress, completion_date, payment_plan, nearby_features, external_features, internal_features', { count: 'exact' })
        .eq('is_approved', true)
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;

      const fetchedProperties = data || [];

      if (pageNum === 0) {
        setAllProperties(fetchedProperties);
        setProperties(applyFilters(fetchedProperties, filters));
      } else {
        const newAllProperties = [...allProperties, ...fetchedProperties];
        setAllProperties(newAllProperties);
        setProperties(applyFilters(newAllProperties, filters));
      }

      // Check if there are more properties to load
      if (count && from + PROPERTIES_PER_PAGE >= count) {
        setHasMoreProperties(false);
        // Fetch businesses and jobs when no more properties
        fetchBusinessesAndJobs();
      }

      setPage(pageNum);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Apply filters to properties
  const applyFilters = (props: PropertyListing[], filterState: FilterState): PropertyListing[] => {
    return props.filter(property => {
      // County filter
      if (filterState.county && property.county !== filterState.county) return false;

      // City filter
      if (filterState.city && property.city !== filterState.city) return false;

      // Property type filter
      if (filterState.propertyType && property.property_type !== filterState.propertyType) return false;

      // Price filters
      if (filterState.priceMin && property.price < filterState.priceMin) return false;
      if (filterState.priceMax && property.price > filterState.priceMax) return false;

      // Bedroom filter
      if (filterState.bedrooms !== undefined && (property.bedrooms || 0) < filterState.bedrooms) return false;

      // Bathroom filter
      if (filterState.bathrooms !== undefined && (property.bathrooms || 0) < filterState.bathrooms) return false;

      // Square feet filters
      if (filterState.squareFeetMin && (property.square_feet || 0) < filterState.squareFeetMin) return false;
      if (filterState.squareFeetMax && (property.square_feet || 0) > filterState.squareFeetMax) return false;

      // Construction status filter
      if (filterState.constructionStatus && property.construction_progress !== filterState.constructionStatus) return false;

      // Amenities filter
      if (filterState.amenities && filterState.amenities.length > 0) {
        const hasAllAmenities = filterState.amenities.every(amenity =>
          (property.amenities || []).some(propAmenity => propAmenity.toLowerCase().includes(amenity.toLowerCase()))
        );
        if (!hasAllAmenities) return false;
      }

      // Nearby features filter
      if (filterState.nearbyFeatures && filterState.nearbyFeatures.length > 0) {
        const hasAllFeatures = filterState.nearbyFeatures.every(feature =>
          (property.nearby_features || []).some(propFeature => propFeature.toLowerCase().includes(feature.toLowerCase()))
        );
        if (!hasAllFeatures) return false;
      }

      // External features filter
      if (filterState.externalFeatures && filterState.externalFeatures.length > 0) {
        const hasAllFeatures = filterState.externalFeatures.every(feature =>
          (property.external_features || []).some(propFeature => propFeature.toLowerCase().includes(feature.toLowerCase()))
        );
        if (!hasAllFeatures) return false;
      }

      // Internal features filter
      if (filterState.internalFeatures && filterState.internalFeatures.length > 0) {
        const hasAllFeatures = filterState.internalFeatures.every(feature =>
          (property.internal_features || []).some(propFeature => propFeature.toLowerCase().includes(feature.toLowerCase()))
        );
        if (!hasAllFeatures) return false;
      }

      return true;
    });
  };

  // Handle filter changes
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setProperties(applyFilters(allProperties, newFilters));
  };

  // Fetch businesses and jobs (shown after all properties)
  const fetchBusinessesAndJobs = async () => {
    try {
      const [businessQuery, jobsResponse] = await Promise.allSettled([
        supabase
          .from('business_listings')
          .select('id, business_name, category, description, address, city, phone, email, website, image_url, rating, review_count, is_approved, is_verified, whatsapp_number')
          .eq('is_approved', true)
          .order('is_verified', { ascending: false })
          .order('created_at', { ascending: false })
          .limit(3),

        fetch('/api/jobs?limit=3&status=approved')
          .then(res => res.json())
      ]);

      if (businessQuery.status === 'fulfilled' && !businessQuery.value.error) {
        setFeaturedBusinesses(businessQuery.value.data || []);
      }

      if (jobsResponse.status === 'fulfilled' && jobsResponse.value.success) {
        setFeaturedJobs(jobsResponse.value.data || []);
      }
    } catch (error) {
      console.error('Error fetching businesses and jobs:', error);
    }
  };

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (loadingMore || !hasMoreProperties) return;

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      // Load more when user is 200px from bottom
      if (scrollTop + clientHeight >= scrollHeight - 200) {
        fetchProperties(page + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page, loadingMore, hasMoreProperties]);

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

  // FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ')
      }
    }))
  };

  return (
    <div className="min-h-screen bg-white">
      {/* FAQ Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      {/* 8 Years Anniversary Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4">
        <div className="container mx-auto px-3 text-center">
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
        {/* Hero Section - Professional Redesign */}
        <section className="relative text-white py-12" style={{ backgroundColor: '#076146' }}>
          <div className="container mx-auto px-4">
            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-white">
                Find Jobs, Businesses & Properties in Kenya
              </h1>
              <p className="text-green-50 text-base md:text-lg max-w-2xl mx-auto">
                Your trusted marketplace for real estate, job opportunities, and business listings across Kenya
              </p>
            </div>

            {/* Professional Search Bar */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="bg-white rounded-2xl shadow-2xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Search Input */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Search Properties, Jobs, or Businesses
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 3 bedroom house, marketing job..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label htmlFor="hero-location" className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <select
                      id="hero-location"
                      name="location"
                      aria-label="Select location"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                    >
                      <option value="">All Locations</option>
                      <option value="nairobi">Nairobi</option>
                      <option value="mombasa">Mombasa</option>
                      <option value="kisumu">Kisumu</option>
                      <option value="nakuru">Nakuru</option>
                      <option value="eldoret">Eldoret</option>
                    </select>
                  </div>

                  {/* Category */}
                  <div>
                    <label htmlFor="hero-category" className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      id="hero-category"
                      name="category"
                      aria-label="Select category"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                    >
                      <option value="">All Categories</option>
                      <option value="properties">Properties</option>
                      <option value="jobs">Jobs</option>
                      <option value="businesses">Businesses</option>
                    </select>
                  </div>
                </div>

                {/* Search Button */}
                <Button className="w-full mt-4 bg-green-700 hover:bg-green-800 text-white py-3 text-lg font-semibold rounded-lg shadow-lg">
                  Search Now
                </Button>
              </div>
            </div>

            {/* Quick Access Icons - Clickable Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto">
              <Link href="/business-directory" className="text-center group cursor-pointer transition-transform hover:scale-105">
                <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-2xl mx-auto mb-2 group-hover:bg-white/30 transition-all shadow-lg">
                  <Users className="h-7 w-7 md:h-8 md:w-8 text-white" />
                </div>
                <div className="text-xl md:text-2xl font-bold text-white mb-1">
                  {heroStats.businesses.toLocaleString()}+
                </div>
                <div className="text-green-50 text-xs md:text-sm group-hover:underline">Businesses</div>
              </Link>

              <Link href="/jobs-in-kenya" className="text-center group cursor-pointer transition-transform hover:scale-105">
                <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-2xl mx-auto mb-2 group-hover:bg-white/30 transition-all shadow-lg">
                  <Briefcase className="h-7 w-7 md:h-8 md:w-8 text-white" />
                </div>
                <div className="text-xl md:text-2xl font-bold text-white mb-1">
                  {heroStats.jobs.toLocaleString()}+
                </div>
                <div className="text-green-50 text-xs md:text-sm group-hover:underline">Jobs</div>
              </Link>

              <Link href="/properties" className="text-center group cursor-pointer transition-transform hover:scale-105">
                <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-2xl mx-auto mb-2 group-hover:bg-white/30 transition-all shadow-lg">
                  <Home className="h-7 w-7 md:h-8 md:w-8 text-white" />
                </div>
                <div className="text-xl md:text-2xl font-bold text-white mb-1">
                  {heroStats.properties.toLocaleString()}+
                </div>
                <div className="text-green-50 text-xs md:text-sm group-hover:underline">Properties</div>
              </Link>
            </div>
          </div>
        </section>

        {/* Properties Section with Infinite Scroll */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-3">

            {/* Properties - Load More as User Scrolls */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg">
                    <Home className="h-5 w-5 text-orange-600" />
                  </div>
                  <h2 className="section-title">Properties for Sale & Rent in Kenya</h2>
                </div>
                <Button variant="outline" className="border-2 border-gray-300 hover:bg-gray-100" asChild>
                  <Link href="/properties" className="flex items-center">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Toggleable Filter Sidebar */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-1">
                  <ToggleableFilterSidebar
                    onFilterChange={handleFilterChange}
                    availableCounties={KENYA_COUNTIES.map(c => c.name).sort()}
                    availableCities={availableLocations.length > 0 ? availableLocations : Array.from(new Set(allProperties.map(p => p.city))).sort()}
                    availableAmenities={Array.from(new Set(allProperties.flatMap(p => p.amenities || []))).sort()}
                    availableConstructionStatus={Array.from(new Set(allProperties.map(p => p.construction_progress).filter(Boolean) as string[])).sort()}
                    availableNearbyFeatures={Array.from(new Set(allProperties.flatMap(p => p.nearby_features || []))).sort()}
                    availableExternalFeatures={Array.from(new Set(allProperties.flatMap(p => p.external_features || []))).sort()}
                    availableInternalFeatures={Array.from(new Set(allProperties.flatMap(p => p.internal_features || []))).sort()}
                  />
                </div>

                {/* Properties Grid - 4 columns on desktop */}
                <div className="lg:col-span-4">
                  <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                {loading && properties.length === 0 ? (
                  <GridLoadingSkeleton type="property" count={12} />
                ) : properties.length > 0 ? (
                  properties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      id={property.id}
                      title={property.property_title}
                      type={property.property_type}
                      price={property.price}
                      bedrooms={property.bedrooms || undefined}
                      bathrooms={property.bathrooms || undefined}
                      squareFeet={property.square_feet || undefined}
                      location={`${property.city}${property.county ? `, ${property.county}` : ''}`}
                      city={property.city}
                      images={property.images}
                      amenities={property.amenities}
                      contactPhone={property.contact_phone}
                      whatsappNumber={property.whatsapp_number || undefined}
                      createdAt={property.created_at}
                      isFeatured={property.is_featured}
                    />
                  ))
                ) : Object.keys(filters).length > 0 && allProperties.length > 0 ? (
                  <>
                    {/* No results message */}
                    <div className="col-span-full text-center py-8">
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                        <p className="text-gray-700 text-lg font-medium mb-2">
                          No properties match your filters
                        </p>
                        <p className="text-gray-600 text-sm">
                          Try adjusting your search criteria or browse our suggested properties below
                        </p>
                      </div>
                    </div>

                    {/* Show alternative/suggested properties */}
                    <div className="col-span-full">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Home className="h-5 w-5 mr-2 text-green-600" />
                        Suggested Properties You May Like
                      </h3>
                      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {allProperties.slice(0, 6).map((property) => (
                          <PropertyCard
                            key={property.id}
                            id={property.id}
                            title={property.property_title}
                            type={property.property_type}
                            price={property.price}
                            bedrooms={property.bedrooms || undefined}
                            bathrooms={property.bathrooms || undefined}
                            squareFeet={property.square_feet || undefined}
                            location={`${property.city}${property.county ? `, ${property.county}` : ''}`}
                            city={property.city}
                            images={property.images}
                            amenities={property.amenities}
                            contactPhone={property.contact_phone}
                            whatsappNumber={property.whatsapp_number || undefined}
                            createdAt={property.created_at}
                            isFeatured={property.is_featured}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="col-span-full text-center py-8 text-gray-500">
                    No properties available at the moment. Check back soon!
                  </div>
                )}
                  </div>

                  {/* Loading More Indicator */}
                  {loadingMore && (
                    <div className="mt-8">
                      <GridLoadingSkeleton type="property" count={4} />
                    </div>
                  )}

                  {/* End of Properties Message */}
                  {!hasMoreProperties && properties.length > 0 && (
                    <div className="text-center mt-12 py-6 border-t border-gray-200">
                      <p className="text-gray-600 font-medium">
                        You've reached the end of properties. Browse businesses and jobs below!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Top Businesses - Only show when all properties are loaded */}
            {!hasMoreProperties && (featuredBusinesses.length > 0 || sampleBusinesses.length > 0) && (
              <div className="mb-16">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg">
                      <Building2 className="h-5 w-5 text-green-600" />
                    </div>
                    <h2 className="section-title">Top Companies in Kenya Business Directory</h2>
                  </div>
                  <Button variant="outline" className="border-2 border-gray-300 hover:bg-gray-100" asChild>
                    <Link href="/business-directory" className="flex items-center">
                      View All
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {loading ? (
                    <GridLoadingSkeleton type="business" count={3} />
                  ) : featuredBusinesses.length > 0 ? (
                    featuredBusinesses.map((business) => (
                      <BusinessCard
                        key={business.id}
                        id={business.id}
                        name={business.business_name}
                        category={business.category}
                        rating={business.rating}
                        reviewCount={business.review_count}
                        location={`${business.city}`}
                        imageUrl={business.image_url}
                        isVerified={business.is_verified}
                        isNew={false}
                        phoneNumber={business.phone}
                        whatsappNumber={business.whatsapp_number}
                        description={business.description}
                      />
                    ))
                  ) : (
                    // Fallback to sample businesses if no real data
                    sampleBusinesses.slice(0, 3).map((business) => (
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
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Latest Jobs - Only show when all properties are loaded */}
            {!hasMoreProperties && (
              <div className="mb-16">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                      <Briefcase className="h-5 w-5 text-blue-600" />
                    </div>
                    <h2 className="section-title">Latest Job Opportunities in Kenya</h2>
                  </div>
                  <Button variant="outline" className="border-2 border-gray-300 hover:bg-gray-100" asChild>
                    <Link href="/jobs-in-kenya" className="flex items-center">
                      View All
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {loading ? (
                    <GridLoadingSkeleton type="job" count={3} />
                  ) : featuredJobs.length > 0 ? (
                    featuredJobs.map((job) => (
                      <JobCard
                        key={job.id}
                        id={parseInt(job.id) || 0}
                        date={job.created_at ? new Date(job.created_at).toLocaleDateString() : 'Recent'}
                        job_title={job.job_title}
                        nature_of_job={job.nature_of_job}
                        industry={job.industry}
                        salary={job.salary}
                        job_location={job.job_location}
                        duties_and_responsibilities={job.duties_and_responsibilities || ''}
                        key_requirements_skills_qualification={job.key_requirements_skills_qualification || ''}
                        how_to_apply={job.how_to_apply || ''}
                      />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-8 text-gray-500">
                      No jobs available at the moment. Check back soon!
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Recent Blog Posts */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg">
                    <BookOpen className="h-5 w-5 text-purple-600" />
                  </div>
                  <h2 className="section-title">Latest Business News & Updates from Kenya</h2>
                </div>
                <Button variant="outline" className="border-2 border-gray-300 hover:bg-gray-100" asChild>
                  <Link href="/blog" className="flex items-center">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sampleBlogPosts.slice(0, 3).map((post) => (
                  <BlogCard key={post.id} {...post} />
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* Popular Cities */}
        <LazySection>
        <section className="py-16 bg-white">
          <div className="container mx-auto px-3">
            <div className="text-center mb-12">
              <h2 className="section-title mb-4">Explore Properties & Businesses by City</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Find houses for rent, businesses, and job opportunities in Kenya's major cities
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
              {[
                { name: 'Nairobi', slug: 'nairobi' },
                { name: 'Mombasa', slug: 'mombasa' },
                { name: 'Kisumu', slug: 'kisumu' },
                { name: 'Nakuru', slug: 'nakuru' },
                { name: 'Eldoret', slug: 'eldoret' },
                { name: 'Thika', slug: 'thika' },
                { name: 'Machakos', slug: 'machakos' },
                { name: 'Meru', slug: 'meru' },
                { name: 'Nyeri', slug: 'nyeri' },
                { name: 'Kitale', slug: 'kitale' },
                { name: 'Kakamega', slug: 'kakamega' },
                { name: 'Malindi', slug: 'malindi' }
              ].map((city) => (
                <div key={city.slug} className="bg-gray-50 rounded-lg p-4 text-center hover:bg-green-50 transition-colors">
                  <h3 className="font-semibold text-gray-900 mb-2">{city.name}</h3>
                  <div className="space-y-1">
                    <Link 
                      href={`/properties/city/${city.slug}`}
                      className="block text-sm text-green-600 hover:underline"
                    >
                      Properties
                    </Link>
                    <Link 
                      href={`/business-directory/city/${city.slug}`}
                      className="block text-sm text-green-600 hover:underline"
                    >
                      Businesses
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        </LazySection>

        {/* Call to Action */}
        <LazySection>
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="section-title mb-4">Ready to Find Your Dream Property or Job in Kenya?</h2>
              <p className="text-gray-600 mb-8">
                Join thousands of Kenyans finding affordable houses for rent, apartments for sale, and job opportunities in Nairobi on our platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 px-4">
                <Button className="bg-green-600 hover:bg-green-700 text-white text-base sm:text-lg px-4 sm:px-8 w-full sm:w-auto" asChild>
                  <Link href="/add-listing">List Your Property</Link>
                </Button>
                <Button variant="outline" className="border-2 border-gray-300 hover:bg-gray-100 text-base sm:text-lg px-4 sm:px-8 w-full sm:w-auto" asChild>
                  <Link href="/properties">Browse Properties</Link>
                </Button>
              </div>
              <div className="text-sm text-gray-600">
                <p className="mb-2">Contact us: <a href="mailto:hr@newkenyan.com" className="text-green-600 hover:underline">hr@newkenyan.com</a> | <a href="tel:+254736407642" className="text-green-600 hover:underline">+254 736 407 642</a></p>
              </div>
            </div>
          </div>
        </section>
        </LazySection>

        {/* FAQ Section */}
        <LazySection>
        <section className="py-16 bg-white">
          <div className="container mx-auto px-3">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="section-title mb-4">Frequently Asked Questions</h2>
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
            </div>
          </div>
        </section>
        </LazySection>

        {/* Additional Content & Links */}
        <LazySection>
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-3">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="section-title mb-6">Find Houses for Rent, Jobs & Business Opportunities in Kenya</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Browse affordable <Link href="/properties/city/nairobi" className="text-green-600 hover:underline font-medium">houses for rent in Nairobi</Link>, 
                <Link href="/properties/city/mombasa" className="text-green-600 hover:underline font-medium"> properties in Mombasa</Link>, 
                <Link href="/properties/city/kisumu" className="text-green-600 hover:underline font-medium"> Kisumu real estate</Link>, 
                <Link href="/jobs-in-kenya" className="text-green-600 hover:underline font-medium"> job opportunities in Kenya</Link>, 
                <Link href="/properties" className="text-green-600 hover:underline font-medium"> office space for rent</Link>, and 
                <Link href="/business-directory" className="text-green-600 hover:underline font-medium"> registered companies</Link> in our comprehensive business directory.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Find affordable <Link href="/properties/city/nairobi" className="text-green-600 hover:underline">houses for rent in Nairobi</Link>, 
                <Link href="/properties" className="text-green-600 hover:underline"> apartments for sale</Link>, 
                <Link href="/jobs-in-kenya" className="text-green-600 hover:underline"> job opportunities in Kenya</Link>, and 
                <Link href="/business-directory" className="text-green-600 hover:underline"> business listings</Link>. 
                Your trusted marketplace for real estate, jobs, and business directory in Kenya.
              </p>
            </div>
          </div>
        </section>
        </LazySection>
      </main>

      <WhatsAppButton />
      <Footer />
    </div>
  );
}
