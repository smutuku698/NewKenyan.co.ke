'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { GridLoadingSkeleton } from '@/components/LoadingSkeleton';
import WhatsAppButton from '@/components/WhatsAppButton';
import { supabase } from '@/lib/supabase';
import {
  Home, MapPin, TrendingUp, Shield, Award, ChevronDown,
  CheckCircle, Clock, Users, Building2, DollarSign, Star
} from 'lucide-react';

interface PropertyListing {
  id: string;
  property_title: string;
  property_type: string;
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
}

export default function ApartmentsForRentNairobiClient() {
  const [properties, setProperties] = useState<PropertyListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBedrooms, setSelectedBedrooms] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  useEffect(() => {
    fetchProperties();
  }, [selectedBedrooms, selectedPriceRange]);

  const fetchProperties = async () => {
    try {
      setLoading(true);

      let query = supabase
        .from('property_listings')
        .select('*')
        .eq('is_approved', true)
        .eq('property_type', 'Apartment')
        .eq('price_type', 'rent')
        .ilike('city', '%nairobi%')
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (selectedBedrooms !== 'all') {
        query = query.eq('bedrooms', parseInt(selectedBedrooms));
      }

      if (selectedPriceRange !== 'all') {
        const [min, max] = selectedPriceRange.split('-').map(Number);
        if (max) {
          query = query.gte('price', min).lte('price', max);
        } else {
          query = query.gte('price', min);
        }
      }

      const { data, error } = await query;

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const faqData = [
    {
      question: "What is the average rent for apartments in Nairobi in 2025?",
      answer: "The average rent for apartments in Nairobi varies by location and size. <a href='/bedsitters-for-rent/nairobi-county' class='text-green-600 hover:underline'>Bedsitters</a> range from KES 8,000-15,000, <a href='/apartments-for-rent/nairobi-county?bedrooms=1' class='text-green-600 hover:underline'>1-bedroom apartments</a> from KES 15,000-30,000, <a href='/2-bedroom-apartment-nairobi' class='text-green-600 hover:underline'>2-bedroom apartments</a> from KES 25,000-50,000, and 3-bedroom apartments from KES 40,000-80,000. Premium areas like <a href='/apartments-for-rent/nairobi-county?city=Westlands' class='text-green-600 hover:underline'>Westlands</a> and <a href='/apartments-for-rent/nairobi-county?city=Kilimani' class='text-green-600 hover:underline'>Kilimani</a> command higher rents."
    },
    {
      question: "Which are the best neighborhoods for apartments in Nairobi?",
      answer: "Top neighborhoods for apartments include <a href='/apartments-for-rent/nairobi-county?city=Westlands' class='text-green-600 hover:underline'>Westlands</a> (modern, upscale), <a href='/apartments-for-rent/nairobi-county?city=Kilimani' class='text-green-600 hover:underline'>Kilimani</a> (vibrant, central), <a href='/apartments-for-rent/nairobi-county?city=Karen' class='text-green-600 hover:underline'>Karen</a> (luxury, spacious), <a href='/apartments-for-rent/nairobi-county?city=Kileleshwa' class='text-green-600 hover:underline'>Kileleshwa</a> (quiet, safe), <a href='/apartments-for-rent/nairobi-county?city=Parklands' class='text-green-600 hover:underline'>Parklands</a> (diverse, affordable), and <a href='/apartments-for-rent/nairobi-county?city=Kasarani' class='text-green-600 hover:underline'>Kasarani</a> (budget-friendly)."
    },
    {
      question: "How do I find cheap apartments for rent in Nairobi?",
      answer: "To find <a href='/apartments-for-rent/nairobi-county?max_price=20000' class='text-green-600 hover:underline'>affordable apartments in Nairobi</a>, consider areas like Kasarani, Ruaka, Kahawa West, Rongai, and Kitengela. <a href='/bedsitters-for-rent/nairobi-county?max_price=10000' class='text-green-600 hover:underline'>Bedsitters under KES 10,000</a> are available in these areas. Use our filters to search by <a href='/properties' class='text-green-600 hover:underline'>price range and location</a>."
    },
    {
      question: "What documents do I need to rent an apartment in Nairobi?",
      answer: "You typically need: Copy of your National ID or Passport, Proof of income (payslip, bank statement), Reference letter from previous landlord, Passport-size photos, and Signed tenancy agreement. Some landlords may require a guarantor. Learn more in our <a href='/blog' class='text-green-600 hover:underline'>renting guide</a>."
    },
    {
      question: "Are furnished apartments available in Nairobi?",
      answer: "Yes, furnished apartments are available throughout Nairobi, especially in <a href='/apartments-for-rent/nairobi-county?city=Westlands' class='text-green-600 hover:underline'>Westlands</a>, Kilimani, and Karen. They typically cost 20-30% more than unfurnished units but include furniture, appliances, and sometimes utilities."
    },
    {
      question: "What is the deposit required for renting an apartment?",
      answer: "Most landlords in Nairobi require a deposit of 1-2 months' rent plus the first month's rent in advance. Some may also ask for an additional 1-month rent as a refundable security deposit. Total upfront cost is typically 2-4 months' rent."
    },
    {
      question: "How long does it take to find an apartment in Nairobi?",
      answer: "With over 1,000 <a href='/properties' class='text-green-600 hover:underline'>verified listings</a> on NewKenyan.com, most renters find suitable apartments within 1-2 weeks. Prime locations like Westlands and Kilimani have high demand, so quality apartments rent quickly."
    },
    {
      question: "Can foreigners rent apartments in Nairobi?",
      answer: "Yes, foreigners can rent apartments in Nairobi. You'll need a valid passport, visa/work permit, proof of employment or income, and possibly a local guarantor. Some landlords prefer cash deposits or bank guarantees from expatriates."
    },
    {
      question: "What amenities should I look for in Nairobi apartments?",
      answer: "Essential amenities include: 24/7 security, backup generator, borehole water, parking, high-speed internet, DSTV connections, and proximity to shopping centers. Premium apartments offer gyms, swimming pools, and children's play areas."
    },
    {
      question: "Is it safe to rent apartments in Nairobi?",
      answer: "Yes, when using reputable platforms like <a href='/' class='text-green-600 hover:underline'>NewKenyan.com</a>. We verify all listings and provide direct landlord contacts. Always visit properties in person, verify ownership documents, and avoid paying deposits without signed agreements."
    },
    {
      question: "What are the best websites to find apartments in Nairobi?",
      answer: "<a href='/' class='text-green-600 hover:underline'>NewKenyan.com</a> is Kenya's most trusted platform with 1,000+ verified apartment listings, direct landlord contacts, and no hidden fees. We've been serving the Kenyan property market for 8+ years and have won multiple industry awards."
    },
    {
      question: "How much does a 2-bedroom apartment cost in Westlands?",
      answer: "<a href='/apartments-for-rent/nairobi-county?city=Westlands&bedrooms=2' class='text-green-600 hover:underline'>2-bedroom apartments in Westlands</a> range from KES 40,000 to KES 80,000 per month, depending on amenities, floor level, and proximity to Westlands Road. Modern apartments with gym and pool cost KES 60,000-100,000."
    },
    {
      question: "Are there studio apartments for rent in Nairobi?",
      answer: "Yes, <a href='/studio-apartments-for-rent/nairobi-county' class='text-green-600 hover:underline'>studio apartments</a> are available from KES 15,000-35,000/month in areas like Kilimani, Kileleshwa, and Parklands. They're perfect for young professionals and students."
    },
    {
      question: "What is the notice period for vacating rental apartments?",
      answer: "Standard notice period is 1-3 months, as specified in your tenancy agreement. Always provide written notice and ensure rent is paid up to date. Your deposit refund will be processed after property inspection."
    },
    {
      question: "Can I negotiate apartment rent in Nairobi?",
      answer: "Yes, rent is negotiable, especially for long-term leases (1+ years) or during low-demand seasons (March-April, November-December). Offering to pay 6-12 months upfront can give you 5-10% discount. Contact landlords directly through our platform."
    }
  ];

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer.replace(/<[^>]*>/g, '')
      }
    }))
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
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
        "name": "Properties",
        "item": "https://newkenyan.com/properties"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Apartments for Rent Nairobi",
        "item": "https://newkenyan.com/apartments-for-rent-nairobi"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header />

      {/* Breadcrumbs */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-3 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-green-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/properties" className="hover:text-green-600">Properties</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Apartments for Rent Nairobi</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-12 md:py-16">
        <div className="container mx-auto px-3">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl shadow-lg">
                <Building2 className="h-10 w-10 text-white" />
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-center leading-tight">
              Apartments for Rent in Nairobi 2025
            </h1>

            <p className="text-lg md:text-xl text-gray-700 mb-8 text-center max-w-4xl mx-auto leading-relaxed">
              Find your ideal apartment in Nairobi with our comprehensive guide. Browse 1,000+ verified listings from bedsitters to 3-bedroom apartments in Westlands, Kilimani, Karen, and all major neighborhoods. Expert market insights, transparent pricing, and direct landlord contacts.
            </p>

            {/* Trust Signals */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="flex items-center justify-center mb-2">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">1,000+</div>
                <div className="text-sm text-gray-600">Verified Listings</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="flex items-center justify-center mb-2">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">8+ Years</div>
                <div className="text-sm text-gray-600">Industry Experience</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Happy Tenants</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900">13+</div>
                <div className="text-sm text-gray-600">Industry Awards</div>
              </div>
            </div>

            {/* Quick Nav */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Navigation</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <a href="#price-ranges" className="text-sm text-green-600 hover:underline">Price Ranges</a>
                <a href="#neighborhoods" className="text-sm text-green-600 hover:underline">Top Neighborhoods</a>
                <a href="#guide" className="text-sm text-green-600 hover:underline">Renter's Guide</a>
                <a href="#listings" className="text-sm text-green-600 hover:underline">Latest Listings</a>
                <a href="#market-trends" className="text-sm text-green-600 hover:underline">Market Trends</a>
                <a href="#tips" className="text-sm text-green-600 hover:underline">Expert Tips</a>
                <a href="#faqs" className="text-sm text-green-600 hover:underline">FAQs</a>
                <a href="#contact" className="text-sm text-green-600 hover:underline">Get Help</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Overview - EEAT Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-3">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Nairobi Apartment Rental Market 2025: Complete Overview
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              The <strong>Nairobi apartment rental market in 2025</strong> continues to offer diverse options for renters across all budgets. With over <Link href="/properties" className="text-green-600 hover:underline">6,500+ active property listings</Link> on NewKenyan.com, Nairobi remains East Africa's most dynamic rental market. Whether you're searching for an affordable <Link href="/bedsitters-for-rent/nairobi-county" className="text-green-600 hover:underline">bedsitter in Kasarani</Link> starting at KES 8,000/month or a luxury <Link href="/apartments-for-rent/nairobi-county?bedrooms=3&city=Westlands" className="text-green-600 hover:underline">3-bedroom apartment in Westlands</Link> at KES 80,000+, our comprehensive platform connects you directly with verified landlords.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-6">
              <h3 className="font-bold text-blue-900 mb-2 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                2025 Market Insights from NewKenyan.com
              </h3>
              <ul className="list-disc list-inside text-blue-900 space-y-2">
                <li>Average rent increase: 5-8% year-over-year in premium areas</li>
                <li>Highest demand: 2-bedroom apartments (40% of searches)</li>
                <li>Fastest-growing areas: Ruaka, Syokimau, Kitengela (affordable suburbs)</li>
                <li>Premium market: Westlands, Kilimani, Karen remain top choices</li>
                <li>New trend: Furnished apartments now 30% of premium listings</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              At <Link href="/" className="text-green-600 hover:underline font-semibold">NewKenyan.com</Link>, we've served the Kenyan property market for over <strong>8 years</strong>, earning <strong>13+ industry awards</strong> including Best Real Estate Marketing Platform (2023) and Property Marketplace of the Year (2023). Our partnership with the <strong>Kenya Property Developers Association (KPDA)</strong> ensures all listings meet quality standards.
            </p>
          </div>
        </div>
      </section>

      {/* Price Range Breakdown */}
      <section id="price-ranges" className="py-12 bg-gray-50">
        <div className="container mx-auto px-3">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Apartment Prices in Nairobi: Complete Breakdown by Size
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Bedsitters */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Bedsitters / Studio Apartments</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">KES 5,000 - 10,000</span>
                      <Link href="/bedsitters-for-rent/nairobi-county?min_price=5000&max_price=10000" className="text-green-600 text-sm hover:underline">
                        View Listings →
                      </Link>
                    </div>
                    <p className="text-sm text-gray-600">
                      Budget-friendly options in Kasarani, Kahawa, Rongai, Kitengela. Basic amenities, ideal for students.
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">KES 10,000 - 15,000</span>
                      <Link href="/bedsitters-for-rent/nairobi-county?min_price=10000&max_price=15000" className="text-green-600 text-sm hover:underline">
                        View Listings →
                      </Link>
                    </div>
                    <p className="text-sm text-gray-600">
                      Mid-range bedsitters in Ruaka, Kileleshwa, Ngong Road. Better security, modern finishes.
                    </p>
                  </div>
                </div>
              </div>

              {/* 1 Bedroom */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">1-Bedroom Apartments</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">KES 15,000 - 25,000</span>
                      <Link href="/apartments-for-rent/nairobi-county?bedrooms=1&min_price=15000&max_price=25000" className="text-green-600 text-sm hover:underline">
                        View Listings →
                      </Link>
                    </div>
                    <p className="text-sm text-gray-600">
                      Affordable 1BRs in Parklands, Ngara, Eastleigh. Good for young couples, parking available.
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">KES 25,000 - 40,000</span>
                      <Link href="/apartments-for-rent/nairobi-county?bedrooms=1&min_price=25000&max_price=40000" className="text-green-600 text-sm hover:underline">
                        View Listings →
                      </Link>
                    </div>
                    <p className="text-sm text-gray-600">
                      Premium 1BRs in Kilimani, Kileleshwa, South B. Modern amenities, gym, swimming pool.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2 Bedroom */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">2-Bedroom Apartments</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">KES 25,000 - 40,000</span>
                      <Link href="/apartments-for-rent/nairobi-county?bedrooms=2&min_price=25000&max_price=40000" className="text-green-600 text-sm hover:underline">
                        View Listings →
                      </Link>
                    </div>
                    <p className="text-sm text-gray-600">
                      Family-friendly apartments in Umoja, Buruburu, Donholm. Secure estates, schools nearby.
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">KES 40,000 - 70,000</span>
                      <Link href="/2-bedroom-apartment-nairobi" className="text-green-600 text-sm hover:underline">
                        View Premium 2BR →
                      </Link>
                    </div>
                    <p className="text-sm text-gray-600">
                      <Link href="/apartments-for-rent/nairobi-county?city=Westlands&bedrooms=2" className="text-green-600 hover:underline">Westlands</Link>, <Link href="/apartments-for-rent/nairobi-county?city=Kilimani&bedrooms=2" className="text-green-600 hover:underline">Kilimani</Link>, Lavington. Modern high-rises, concierge, backup power.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3 Bedroom */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-orange-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">3-Bedroom Apartments</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">KES 40,000 - 60,000</span>
                      <Link href="/apartments-for-rent/nairobi-county?bedrooms=3&min_price=40000&max_price=60000" className="text-green-600 text-sm hover:underline">
                        View Listings →
                      </Link>
                    </div>
                    <p className="text-sm text-gray-600">
                      Spacious 3BRs in South C, Lang'ata, Embakasi. Perfect for growing families.
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">KES 70,000 - 120,000</span>
                      <Link href="/apartments-for-rent/nairobi-county?bedrooms=3&min_price=70000" className="text-green-600 text-sm hover:underline">
                        View Luxury 3BR →
                      </Link>
                    </div>
                    <p className="text-sm text-gray-600">
                      Luxury penthouses in Westlands, Karen, Runda. Master en-suite, DSQ, premium finishes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white text-center">
              <h3 className="text-xl font-bold mb-2">
                Looking for Affordable Options?
              </h3>
              <p className="mb-4">
                Browse our collection of <Link href="/apartments-for-rent/nairobi-county?max_price=20000" className="text-yellow-300 hover:underline font-semibold">apartments under KES 20,000/month</Link>
              </p>
              <Button className="bg-white text-green-600 hover:bg-gray-100" asChild>
                <Link href="/apartments-for-rent/nairobi-county?max_price=20000">
                  View Affordable Apartments
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Top Neighborhoods - Comprehensive */}
      <section id="neighborhoods" className="py-12 bg-white">
        <div className="container mx-auto px-3">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Best Neighborhoods for Apartments in Nairobi
            </h2>
            <p className="text-gray-700 mb-8">
              Based on 8+ years of market data and thousands of successful rentals, here are the top neighborhoods for apartment rentals in Nairobi:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  name: 'Westlands',
                  slug: 'Westlands',
                  avgRent: 'KES 35,000 - 80,000',
                  rating: '4.8/5',
                  demographics: 'Expats, Professionals',
                  highlights: ['Modern high-rises', 'Sarit Centre', 'Westgate Mall', '24/7 security'],
                  transport: 'Excellent - Matatus, Uber, major roads',
                  safety: 'Very High',
                  searches: '200-350/mo',
                  link: '/apartments-for-rent/nairobi-county?city=Westlands'
                },
                {
                  name: 'Kilimani',
                  slug: 'Kilimani',
                  avgRent: 'KES 30,000 - 70,000',
                  rating: '4.7/5',
                  demographics: 'Young Professionals, Students',
                  highlights: ['Vibrant nightlife', 'Yaya Centre', 'Central location', 'Mixed-use'],
                  transport: 'Excellent - Well connected',
                  safety: 'High',
                  searches: '200-300/mo',
                  link: '/apartments-for-rent/nairobi-county?city=Kilimani'
                },
                {
                  name: 'Kileleshwa',
                  slug: 'Kileleshwa',
                  avgRent: 'KES 25,000 - 60,000',
                  rating: '4.6/5',
                  demographics: 'Families, Professionals',
                  highlights: ['Quiet residential', 'Safe', 'Near Westlands', 'Tree-lined streets'],
                  transport: 'Good - Close to CBD',
                  safety: 'Very High',
                  searches: '100-200/mo',
                  link: '/apartments-for-rent/nairobi-county?city=Kileleshwa'
                },
                {
                  name: 'Parklands',
                  slug: 'Parklands',
                  avgRent: 'KES 20,000 - 50,000',
                  rating: '4.5/5',
                  demographics: 'Diverse, Families',
                  highlights: ['Cultural diversity', 'Shopping', 'Schools', 'Mosques/Churches'],
                  transport: 'Good - Multiple routes',
                  safety: 'High',
                  searches: '100-180/mo',
                  link: '/apartments-for-rent/nairobi-county?city=Parklands'
                },
                {
                  name: 'Kasarani',
                  slug: 'Kasarani',
                  avgRent: 'KES 8,000 - 25,000',
                  rating: '4.3/5',
                  demographics: 'Students, Budget-conscious',
                  highlights: ['Affordable', 'Kasarani Stadium', 'Growing area', 'Universities'],
                  transport: 'Moderate - Thika Road',
                  safety: 'Moderate',
                  searches: '150-250/mo',
                  link: '/apartments-for-rent/nairobi-county?city=Kasarani'
                },
                {
                  name: 'Karen',
                  slug: 'Karen',
                  avgRent: 'KES 60,000 - 150,000',
                  rating: '4.9/5',
                  demographics: 'Expats, High-income',
                  highlights: ['Luxury', 'Spacious', 'Karen Blixen', 'Giraffe Centre'],
                  transport: 'Moderate - Requires car',
                  safety: 'Very High',
                  searches: '150-250/mo',
                  link: '/apartments-for-rent/nairobi-county?city=Karen'
                }
              ].map((neighborhood, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-green-500 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{neighborhood.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-semibold text-gray-700">{neighborhood.rating}</span>
                        <span className="text-sm text-gray-500">({neighborhood.searches} searches)</span>
                      </div>
                    </div>
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>

                  <div className="space-y-3 mb-4">
                    <div>
                      <span className="text-sm font-semibold text-gray-700">Avg. Rent:</span>
                      <span className="text-sm text-gray-900 ml-2">{neighborhood.avgRent}</span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-700">Best For:</span>
                      <span className="text-sm text-gray-900 ml-2">{neighborhood.demographics}</span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-700">Transport:</span>
                      <span className="text-sm text-gray-900 ml-2">{neighborhood.transport}</span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-700">Safety:</span>
                      <span className="text-sm text-gray-900 ml-2">{neighborhood.safety}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="text-sm font-semibold text-gray-700 block mb-2">Key Highlights:</span>
                    <div className="flex flex-wrap gap-2">
                      {neighborhood.highlights.map((highlight, idx) => (
                        <span key={idx} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={neighborhood.link}
                    className="block w-full text-center bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    View Apartments in {neighborhood.name} →
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-blue-50 rounded-lg p-6">
              <h3 className="font-bold text-blue-900 mb-3">More Neighborhood Options:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Ruaka', 'Syokimau', 'Rongai', 'Kitengela', 'Lang\'ata', 'South C', 'South B', 'Lavington'].map((area) => (
                  <Link key={area} href={`/apartments-for-rent/nairobi-county?city=${area}`} className="text-blue-600 hover:underline text-sm">
                    {area} Apartments →
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Renter's Guide - EEAT Expertise */}
      <section id="guide" className="py-12 bg-gray-50">
        <div className="container mx-auto px-3">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Complete Guide to Renting Apartments in Nairobi (2025)
            </h2>

            <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                Step-by-Step Rental Process
              </h3>
              <ol className="space-y-4 list-decimal list-inside text-gray-700">
                <li className="leading-relaxed">
                  <strong>Search & Shortlist:</strong> Browse our <Link href="/properties" className="text-green-600 hover:underline">1,000+ verified listings</Link>, filter by price, bedrooms, and location. Save favorites.
                </li>
                <li className="leading-relaxed">
                  <strong>Property Viewing:</strong> Contact landlords directly (no agent fees!). Schedule viewings for 3-5 properties. Visit during daylight, check water pressure, power backup, security.
                </li>
                <li className="leading-relaxed">
                  <strong>Documentation:</strong> Prepare: National ID/Passport copy, Recent payslips (3 months), Bank statements, Reference letter from previous landlord, 2 passport photos.
                </li>
                <li className="leading-relaxed">
                  <strong>Negotiation:</strong> Don't be afraid to negotiate! Offer 6-12 months upfront for 5-10% discount. Clarify what's included (water, internet, DSTV).
                </li>
                <li className="leading-relaxed">
                  <strong>Agreement & Payment:</strong> Review tenancy agreement carefully. Check deposit refund terms, notice period, maintenance responsibilities. Pay via bank transfer (never cash).
                </li>
                <li className="leading-relaxed">
                  <strong>Move-In Inspection:</strong> Document property condition with photos/videos. Note any damages. Test all appliances, switches, plumbing.
                </li>
              </ol>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Shield className="h-6 w-6 text-blue-600 mr-2" />
                Essential Inspection Checklist
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Security & Infrastructure:</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>✓ 24/7 security guards</li>
                    <li>✓ CCTV cameras operational</li>
                    <li>✓ Secure main gate/access control</li>
                    <li>✓ Backup generator functional</li>
                    <li>✓ Borehole/backup water</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Unit Condition:</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>✓ Water pressure adequate</li>
                    <li>✓ Electrical outlets work</li>
                    <li>✓ Windows/doors secure</li>
                    <li>✓ No water leaks/dampness</li>
                    <li>✓ Pest control done</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-6">
              <h3 className="font-bold text-yellow-900 mb-3">⚠️ Common Pitfalls to Avoid:</h3>
              <ul className="space-y-2 text-yellow-900">
                <li>• Never pay deposits before signing agreement</li>
                <li>• Verify landlord ownership documents</li>
                <li>• Don't skip property viewing (even if photos look good)</li>
                <li>• Read tenancy agreement thoroughly - ask questions</li>
                <li>• Avoid "too good to be true" deals (likely scams)</li>
                <li>• Always get receipts for all payments</li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-600 p-6">
              <h3 className="font-bold text-green-900 mb-3">💡 Expert Tips from NewKenyan.com:</h3>
              <ul className="space-y-2 text-green-900">
                <li>• <strong>Best time to rent:</strong> March-April & November-December (low demand = better deals)</li>
                <li>• <strong>Negotiation leverage:</strong> Long-term commitment (1+ year lease)</li>
                <li>• <strong>Hidden costs:</strong> Ask about service charge, waste disposal, parking fees</li>
                <li>• <strong>Internet:</strong> Verify if building has fiber optic connectivity</li>
                <li>• <strong>Parking:</strong> Clarify if parking is included or extra charge</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Property Listings */}
      <section id="listings" className="py-12 bg-white">
        <div className="container mx-auto px-3">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Latest Apartments for Rent in Nairobi
            </h2>
            <div className="flex flex-wrap gap-4 items-center">
              <select
                value={selectedBedrooms}
                onChange={(e) => setSelectedBedrooms(e.target.value)}
                className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-green-500 focus:outline-none"
              >
                <option value="all">All Bedrooms</option>
                <option value="0">Bedsitter</option>
                <option value="1">1 Bedroom</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
              </select>

              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-green-500 focus:outline-none"
              >
                <option value="all">All Prices</option>
                <option value="5000-15000">KES 5K - 15K</option>
                <option value="15000-30000">KES 15K - 30K</option>
                <option value="30000-50000">KES 30K - 50K</option>
                <option value="50000-80000">KES 50K - 80K</option>
                <option value="80000-999999999">KES 80K+</option>
              </select>

              <div className="ml-auto">
                <p className="text-gray-600">
                  Showing <strong>{properties.length}</strong> apartments
                </p>
              </div>
            </div>
          </div>

          {loading ? (
            <GridLoadingSkeleton type="property" count={12} />
          ) : properties.length > 0 ? (
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  id={property.id}
                  title={property.property_title}
                  type={property.property_type}
                  price={property.price}
                  bedrooms={property.bedrooms || undefined}
                  bathrooms={property.bathrooms || undefined}
                  squareFeet={property.square_feet || undefined}
                  location={property.city + (property.county ? ', ' + property.county : '')}
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
          ) : (
            <div className="text-center py-12">
              <Home className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No apartments found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or browse all properties
              </p>
              <Button asChild>
                <Link href="/properties">Browse All Properties</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Market Trends & Expert Tips */}
      <section id="market-trends" className="py-12 bg-gray-50">
        <div className="container mx-auto px-3">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              2025 Nairobi Rental Market Trends & Forecast
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Supply & Demand</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <TrendingUp className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <span><strong>High Demand:</strong> 2-bedroom apartments (40% of searches)</span>
                  </li>
                  <li className="flex items-start">
                    <TrendingUp className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <span><strong>Supply Increase:</strong> 5,000+ new units in Ruaka, Syokimau</span>
                  </li>
                  <li className="flex items-start">
                    <TrendingUp className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <span><strong>Vacancy Rates:</strong> 8-12% in premium areas, stabilizing</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Price Trends</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <DollarSign className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                    <span><strong>Westlands/Kilimani:</strong> +5-8% YoY price increase</span>
                  </li>
                  <li className="flex items-start">
                    <DollarSign className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                    <span><strong>Suburbs:</strong> Stable pricing, high value for money</span>
                  </li>
                  <li className="flex items-start">
                    <DollarSign className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                    <span><strong>Furnished:</strong> 20-30% premium over unfurnished</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Expert Predictions for 2025</h3>
              <div className="prose prose-lg text-gray-700">
                <p className="mb-4">
                  Based on our <strong>8+ years of market data</strong> and partnerships with leading developers, NewKenyan.com forecasts:
                </p>
                <ul className="space-y-2">
                  <li>• <strong>Remote work demand:</strong> Continued preference for 2BR+ with home office space</li>
                  <li>• <strong>Suburban growth:</strong> Ruaka, Syokimau, Kitengela expected 15-20% rental increase</li>
                  <li>• <strong>Smart homes:</strong> Fiber internet, prepaid utilities becoming standard</li>
                  <li>• <strong>Co-living:</strong> Emergence of co-living spaces for young professionals</li>
                  <li>• <strong>Green buildings:</strong> Eco-friendly apartments gaining premium (EDGE certified)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Property Types - Internal Linking Hub */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-3">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Explore More Property Options in Nairobi
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3">By Bedroom Type</h3>
                <ul className="space-y-2">
                  <li><Link href="/bedsitters-for-rent/nairobi-county" className="text-green-600 hover:underline text-sm">Bedsitters in Nairobi →</Link></li>
                  <li><Link href="/studio-apartments-for-rent/nairobi-county" className="text-green-600 hover:underline text-sm">Studio Apartments →</Link></li>
                  <li><Link href="/apartments-for-rent/nairobi-county?bedrooms=1" className="text-green-600 hover:underline text-sm">1 Bedroom Apartments →</Link></li>
                  <li><Link href="/2-bedroom-apartment-nairobi" className="text-green-600 hover:underline text-sm">2 Bedroom Apartments →</Link></li>
                  <li><Link href="/apartments-for-rent/nairobi-county?bedrooms=3" className="text-green-600 hover:underline text-sm">3 Bedroom Apartments →</Link></li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3">By Budget</h3>
                <ul className="space-y-2">
                  <li><Link href="/apartments-for-rent/nairobi-county?max_price=15000" className="text-blue-600 hover:underline text-sm">Under KES 15,000 →</Link></li>
                  <li><Link href="/apartments-for-rent/nairobi-county?max_price=20000" className="text-blue-600 hover:underline text-sm">Under KES 20,000 →</Link></li>
                  <li><Link href="/apartments-for-rent/nairobi-county?min_price=20000&max_price=40000" className="text-blue-600 hover:underline text-sm">KES 20K - 40K →</Link></li>
                  <li><Link href="/apartments-for-rent/nairobi-county?min_price=40000" className="text-blue-600 hover:underline text-sm">Luxury (KES 40K+) →</Link></li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3">Other Property Types</h3>
                <ul className="space-y-2">
                  <li><Link href="/houses-for-rent-nairobi" className="text-purple-600 hover:underline text-sm">Houses for Rent →</Link></li>
                  <li><Link href="/houses-for-sale/nairobi-county" className="text-purple-600 hover:underline text-sm">Houses for Sale →</Link></li>
                  <li><Link href="/serviced-apartments-for-rent/nairobi-county" className="text-purple-600 hover:underline text-sm">Serviced Apartments →</Link></li>
                  <li><Link href="/office-space-for-rent/nairobi-county" className="text-purple-600 hover:underline text-sm">Office Spaces →</Link></li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4">Explore by Neighborhood</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  'Westlands', 'Kilimani', 'Karen', 'Kileleshwa',
                  'Parklands', 'Kasarani', 'Lavington', 'South C',
                  'Lang\'ata', 'Runda', 'Ruaka', 'Syokimau'
                ].map((area) => (
                  <Link
                    key={area}
                    href={`/apartments-for-rent/nairobi-county?city=${area}`}
                    className="text-orange-600 hover:underline text-sm"
                  >
                    {area} →
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Linking Section - Browse by Location */}
      <section className="py-12 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Browse Apartments by Location</h2>
            <p className="text-center text-gray-600 mb-8">Explore apartments in other neighborhoods and counties across Kenya</p>

            {/* By County */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Apartments by County</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                <Link href="/apartments-for-rent/nairobi-county" className="px-4 py-2 bg-gray-100 hover:bg-green-50 hover:text-green-600 rounded-lg text-center transition-colors border border-gray-200 hover:border-green-500">
                  Nairobi
                </Link>
                <Link href="/apartments-for-rent/kiambu-county" className="px-4 py-2 bg-gray-100 hover:bg-green-50 hover:text-green-600 rounded-lg text-center transition-colors border border-gray-200 hover:border-green-500">
                  Kiambu
                </Link>
                <Link href="/apartments-for-rent/machakos-county" className="px-4 py-2 bg-gray-100 hover:bg-green-50 hover:text-green-600 rounded-lg text-center transition-colors border border-gray-200 hover:border-green-500">
                  Machakos
                </Link>
                <Link href="/apartments-for-rent/kajiado-county" className="px-4 py-2 bg-gray-100 hover:bg-green-50 hover:text-green-600 rounded-lg text-center transition-colors border border-gray-200 hover:border-green-500">
                  Kajiado
                </Link>
                <Link href="/apartments-for-rent/mombasa-county" className="px-4 py-2 bg-gray-100 hover:bg-green-50 hover:text-green-600 rounded-lg text-center transition-colors border border-gray-200 hover:border-green-500">
                  Mombasa
                </Link>
                <Link href="/apartments-for-rent/nakuru-county" className="px-4 py-2 bg-gray-100 hover:bg-green-50 hover:text-green-600 rounded-lg text-center transition-colors border border-gray-200 hover:border-green-500">
                  Nakuru
                </Link>
              </div>
            </div>

            {/* Premium Nairobi Neighborhoods */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Premium Nairobi Neighborhoods</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                <Link href="/apartments-westlands" className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 rounded-lg text-center transition-colors border border-green-200 hover:border-green-500 font-medium">
                  Westlands
                </Link>
                <Link href="/apartments-kilimani" className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 rounded-lg text-center transition-colors border border-green-200 hover:border-green-500 font-medium">
                  Kilimani
                </Link>
                <Link href="/apartments-for-rent/lavington" className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 rounded-lg text-center transition-colors border border-green-200 hover:border-green-500 font-medium">
                  Lavington
                </Link>
                <Link href="/apartments-for-rent/kileleshwa" className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 rounded-lg text-center transition-colors border border-green-200 hover:border-green-500 font-medium">
                  Kileleshwa
                </Link>
                <Link href="/apartments-for-rent/upper-hill" className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 rounded-lg text-center transition-colors border border-green-200 hover:border-green-500 font-medium">
                  Upper Hill
                </Link>
              </div>
            </div>

            {/* Budget-Friendly Nairobi Areas */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Budget-Friendly Nairobi Areas</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                <Link href="/apartments-for-rent/kasarani" className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 rounded-lg text-center transition-colors border border-blue-200 hover:border-blue-500">
                  Kasarani
                </Link>
                <Link href="/apartments-for-rent/ruiru" className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 rounded-lg text-center transition-colors border border-blue-200 hover:border-blue-500">
                  Ruiru
                </Link>
                <Link href="/apartments-for-rent/ngong" className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 rounded-lg text-center transition-colors border border-blue-200 hover:border-blue-500">
                  Ngong
                </Link>
                <Link href="/apartments-for-rent/rongai" className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 rounded-lg text-center transition-colors border border-blue-200 hover:border-blue-500">
                  Rongai
                </Link>
                <Link href="/apartments-for-rent/kahawa" className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 rounded-lg text-center transition-colors border border-blue-200 hover:border-blue-500">
                  Kahawa
                </Link>
              </div>
            </div>

            {/* Related Property Searches */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Related Property Searches</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <Link href="/2-bedroom-apartment-nairobi" className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-center transition-colors border border-gray-300 hover:border-gray-500">
                  2 Bedroom Apartments
                </Link>
                <Link href="/bedsitter-nairobi" className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-center transition-colors border border-gray-300 hover:border-gray-500">
                  Bedsitter Nairobi
                </Link>
                <Link href="/cheap-apartments-nairobi" className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-center transition-colors border border-gray-300 hover:border-gray-500">
                  Cheap Apartments Nairobi
                </Link>
                <Link href="/houses-for-rent-nairobi" className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-center transition-colors border border-gray-300 hover:border-gray-500">
                  Houses for Rent Nairobi
                </Link>
                <Link href="/3-bedroom-house-for-rent" className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-center transition-colors border border-gray-300 hover:border-gray-500">
                  3 Bedroom Houses
                </Link>
                <Link href="/land-for-sale-kenya" className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-center transition-colors border border-gray-300 hover:border-gray-500">
                  Land for Sale Kenya
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section with Schema */}
      <section id="faqs" className="py-12 bg-gray-50">
        <div className="container mx-auto px-3">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Expert answers from NewKenyan.com's 8+ years in Kenya's property market
            </p>

            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
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

      {/* Trust & Authority Section */}
      <section className="py-12 bg-gradient-to-br from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-3">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Why Trust NewKenyan.com for Your Apartment Search?
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <Award className="h-12 w-12 mx-auto mb-4" />
                <h3 className="font-bold text-xl mb-2">13+ Awards</h3>
                <p className="text-sm text-green-50">
                  Including Best Real Estate Platform (2023) & Property Marketplace of the Year
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <Users className="h-12 w-12 mx-auto mb-4" />
                <h3 className="font-bold text-xl mb-2">50,000+ Renters</h3>
                <p className="text-sm text-green-50">
                  Successfully connected with landlords through our platform since 2017
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <Shield className="h-12 w-12 mx-auto mb-4" />
                <h3 className="font-bold text-xl mb-2">KPDA Partner</h3>
                <p className="text-sm text-green-50">
                  Official partner of Kenya Property Developers Association
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-lg p-6 mb-8">
              <h3 className="font-bold text-xl mb-4">Featured In:</h3>
              <p className="text-green-50">
                Business Daily, The Standard, Capital FM, Kenya Gazette, and more
              </p>
            </div>

            <div id="contact">
              <h3 className="text-2xl font-bold mb-4">Ready to Find Your Dream Apartment?</h3>
              <p className="text-lg text-green-50 mb-6">
                Browse 1,000+ verified listings or contact our expert team for personalized assistance
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-3" asChild>
                  <Link href="/apartments-for-rent/nairobi-county">
                    Browse All Apartments
                  </Link>
                </Button>
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-green-600 text-lg px-8 py-3" asChild>
                  <Link href="/add-listing">List Your Property</Link>
                </Button>
              </div>
              <p className="mt-6 text-sm text-green-100">
                Questions? Contact us: <a href="tel:+254736407642" className="hover:underline font-semibold">+254 736 407 642</a> |
                <a href="mailto:info@newkenyan.com" className="hover:underline font-semibold ml-2">info@newkenyan.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppButton />
      <Footer />
    </div>
  );
}
