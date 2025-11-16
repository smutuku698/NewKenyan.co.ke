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
  CheckCircle, Clock, Users, Building2, DollarSign, Star,
  BadgeCheck, FileCheck, HeartHandshake, Scale
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

export default function ThreeBedroomHouseClient() {
  const [properties, setProperties] = useState<PropertyListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  useEffect(() => {
    fetchProperties();
  }, [selectedLocation, selectedPriceRange]);

  const fetchProperties = async () => {
    try {
      setLoading(true);

      let query = supabase
        .from('property_listings')
        .select('*')
        .eq('is_approved', true)
        .eq('price_type', 'rent')
        .eq('bedrooms', 3)
        .ilike('property_type', '%house%')
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (selectedLocation !== 'all') {
        query = query.ilike('city', `%${selectedLocation}%`);
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

      // Fallback: If no properties found, show any rental houses in Kenya
      if (!data || data.length === 0) {
        const fallbackQuery = supabase
          .from('property_listings')
          .select('*')
          .eq('is_approved', true)
          .eq('price_type', 'rent')
          .ilike('property_type', '%house%')
          .order('is_featured', { ascending: false })
          .order('created_at', { ascending: false })
          .limit(12);

        const { data: fallbackData, error: fallbackError } = await fallbackQuery;
        if (!fallbackError) {
          setProperties(fallbackData || []);
        }
      } else {
        setProperties(data || []);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const priceRanges = [
    { value: 'all', label: 'All Prices', description: 'Browse all listings' },
    { value: '0-40000', label: 'KES 30K - 40K', description: 'Budget-friendly suburbs' },
    { value: '40000-70000', label: 'KES 40K - 70K', description: 'Mid-range neighborhoods' },
    { value: '70000-100000', label: 'KES 70K - 100K', description: 'Premium locations' },
    { value: '100000-150000', label: 'KES 100K - 150K', description: 'High-end suburbs' },
    { value: '150000', label: 'KES 150K+', description: 'Luxury estates' }
  ];

  const topLocations = [
    { value: 'all', label: 'All Locations', count: '800+' },
    { value: 'Karen', label: 'Karen', count: '120+', avgPrice: 'KES 150,000' },
    { value: 'Runda', label: 'Runda', count: '80+', avgPrice: 'KES 200,000' },
    { value: 'Lavington', label: 'Lavington', count: '95+', avgPrice: 'KES 120,000' },
    { value: 'Kilimani', label: 'Kilimani', count: '110+', avgPrice: 'KES 90,000' },
    { value: 'Ngong', label: 'Ngong', count: '130+', avgPrice: 'KES 45,000' },
    { value: 'Kitisuru', label: 'Kitisuru', count: '70+', avgPrice: 'KES 180,000' },
    { value: 'Syokimau', label: 'Syokimau', count: '90+', avgPrice: 'KES 50,000' },
    { value: 'Ruiru', label: 'Ruiru', count: '100+', avgPrice: 'KES 40,000' }
  ];

  const neighborhoods = [
    {
      name: 'Karen',
      avgPrice: 'KES 120,000 - 250,000',
      description: 'Leafy, serene suburb with spacious compounds, excellent security, and proximity to international schools. Popular with expatriates and affluent families.',
      amenities: ['International Schools', 'Shopping Malls', 'Golf Courses', 'Karen Hospital'],
      demographics: 'Expatriates, Business Executives, Affluent Families',
      transport: 'Personal vehicles, Uber readily available',
      safety: '9/10 - Gated communities with 24/7 security',
      link: '/houses-for-rent/nairobi-county?city=Karen&bedrooms=3'
    },
    {
      name: 'Runda',
      avgPrice: 'KES 150,000 - 300,000',
      description: 'Ultra-premium gated estate with diplomatic residences, luxury amenities, and top-tier security. Features large compounds and modern architecture.',
      amenities: ['Country Club', 'Ridgeways Mall', 'Village Market', 'Diplomatic Enclave'],
      demographics: 'Diplomats, CEOs, High Net Worth Individuals',
      transport: 'Private vehicles, secure rideshare',
      safety: '10/10 - Maximum security protocols',
      link: '/houses-for-rent/nairobi-county?city=Runda&bedrooms=3'
    },
    {
      name: 'Lavington',
      avgPrice: 'KES 100,000 - 180,000',
      description: 'Upscale, centrally-located suburb with mature gardens, close to Westlands business district. Mix of standalone houses and townhouses.',
      amenities: ['Westlands Shopping', 'Hospitals', 'International Schools', 'Restaurants'],
      demographics: 'Professionals, Families, Young Executives',
      transport: 'Easy access to Waiyaki Way and Ngong Road',
      safety: '8/10 - Good neighborhood watch',
      link: '/houses-for-rent/nairobi-county?city=Lavington&bedrooms=3'
    },
    {
      name: 'Kilimani',
      avgPrice: 'KES 70,000 - 120,000',
      description: 'Vibrant neighborhood mixing residential and commercial. Growing number of modern townhouses and bungalows, close to Yaya Centre and CBD.',
      amenities: ['Yaya Centre', 'Hospitals', 'Schools', 'Restaurants & Cafes'],
      demographics: 'Young Families, Professionals, Entrepreneurs',
      transport: 'Excellent matatu routes, Uber, boda bodas',
      safety: '7/10 - Active community policing',
      link: '/houses-for-rent/nairobi-county?city=Kilimani&bedrooms=3'
    },
    {
      name: 'Ngong',
      avgPrice: 'KES 35,000 - 60,000',
      description: 'Fast-growing suburb with affordable spacious houses, fresh air, and scenic views. Popular with middle-income families seeking value.',
      amenities: ['Ngong Town Shopping', 'Schools', 'Markets', 'Growing Retail'],
      demographics: 'Middle-Income Families, Commuters',
      transport: 'Matatus to CBD, Ngong Road access',
      safety: '7/10 - Improving security infrastructure',
      link: '/houses-for-rent/nairobi-county?city=Ngong&bedrooms=3'
    },
    {
      name: 'Kitisuru',
      avgPrice: 'KES 130,000 - 250,000',
      description: 'Exclusive, hilly suburb with breathtaking views, large plots, and luxury homes. Close to Village Market and UN offices.',
      amenities: ['Village Market', 'International Schools', 'Two Rivers Mall', 'Private Clinics'],
      demographics: 'Executives, Expatriates, Diplomats',
      transport: 'Private vehicles, Uber',
      safety: '9/10 - Gated estates with security',
      link: '/houses-for-rent/nairobi-county?city=Kitisuru&bedrooms=3'
    },
    {
      name: 'Syokimau',
      avgPrice: 'KES 40,000 - 70,000',
      description: 'Modern planned suburb with SGR access, close to Jomo Kenyatta Airport. Features contemporary homes and growing infrastructure.',
      amenities: ['SGR Station', 'Malls', 'Schools', 'Airport Access'],
      demographics: 'Aviation Workers, Commuters, Young Families',
      transport: 'SGR to CBD, matatus, personal vehicles',
      safety: '8/10 - Organized estate security',
      link: '/houses-for-rent/nairobi-county?city=Syokimau&bedrooms=3'
    },
    {
      name: 'Ruiru',
      avgPrice: 'KES 35,000 - 55,000',
      description: 'Rapidly developing satellite town with affordable housing estates. Great value for families seeking spacious homes at lower costs.',
      amenities: ['Thika Road Mall', 'Schools', 'Hospitals', 'Markets'],
      demographics: 'Middle-Income Families, First-Time Renters',
      transport: 'Thika Superhighway, matatus, trains',
      safety: '7/10 - Estate security available',
      link: '/houses-for-rent/nairobi-county?city=Ruiru&bedrooms=3'
    }
  ];

  const faqData = [
    {
      question: "What is the average rent for a 3 bedroom house in Kenya in 2025?",
      answer: "The average rent for <a href='/3-bedroom-house-for-rent' class='text-green-600 hover:underline'>3 bedroom houses in Kenya</a> varies significantly by location. Budget suburbs like <a href='/houses-for-rent/nairobi-county?city=Ngong&bedrooms=3' class='text-green-600 hover:underline'>Ngong</a> and <a href='/houses-for-rent/nairobi-county?city=Ruiru&bedrooms=3' class='text-green-600 hover:underline'>Ruiru</a> range KES 35,000-55,000/month. Mid-range areas like <a href='/houses-for-rent/nairobi-county?city=Kilimani&bedrooms=3' class='text-green-600 hover:underline'>Kilimani</a> cost KES 70,000-120,000/month. Premium suburbs like <a href='/houses-for-rent/nairobi-county?city=Karen&bedrooms=3' class='text-green-600 hover:underline'>Karen</a> and <a href='/houses-for-rent/nairobi-county?city=Runda&bedrooms=3' class='text-green-600 hover:underline'>Runda</a> command KES 120,000-300,000/month."
    },
    {
      question: "Which are the best family-friendly neighborhoods for 3 bedroom houses?",
      answer: "Top family-friendly areas include <a href='/houses-for-rent/nairobi-county?city=Karen&bedrooms=3' class='text-green-600 hover:underline'>Karen</a> (excellent schools, security), <a href='/houses-for-rent/nairobi-county?city=Lavington&bedrooms=3' class='text-green-600 hover:underline'>Lavington</a> (mature suburb, amenities), <a href='/houses-for-rent/nairobi-county?city=Syokimau&bedrooms=3' class='text-green-600 hover:underline'>Syokimau</a> (modern, SGR access), <a href='/houses-for-rent/nairobi-county?city=Kitisuru&bedrooms=3' class='text-green-600 hover:underline'>Kitisuru</a> (secure, international schools), and <a href='/houses-for-rent/nairobi-county?city=Ngong&bedrooms=3' class='text-green-600 hover:underline'>Ngong</a> (spacious, affordable). Consider proximity to schools, hospitals, and safety ratings."
    },
    {
      question: "What should I expect in a 3 bedroom house rental in Nairobi?",
      answer: "Standard features include 3 bedrooms (master en-suite), guest toilet, living/dining area, kitchen, and parking (1-2 cars). Mid to high-end houses include: compound/garden, security (gated estate or perimeter wall), backup water, modern fittings, and DSQ (servant quarter). Premium houses add: swimming pool, generator, CCTV, gym, and landscaped gardens."
    },
    {
      question: "How much deposit is required for a 3 bedroom house in Kenya?",
      answer: "Standard deposit structure: 1-2 months rent (deposit), 1 month rent (advance rent), 1 month rent (agent commission - if applicable). Total upfront cost is typically 3-4 months' rent. Example: For a KES 60,000/month house, expect to pay KES 180,000-240,000 upfront. Some landlords negotiate on commission or accept staggered deposit payments."
    },
    {
      question: "What documents do I need to rent a 3 bedroom house in Kenya?",
      answer: "Required documents include: Copy of National ID or Passport, 2-3 recent passport photos, Proof of income (payslips, employment letter, or business registration), Bank statements (3-6 months), Current landlord reference letter (if applicable), Good Conduct Certificate (some landlords), and signed Tenancy Agreement. Have copies ready to speed up the process."
    },
    {
      question: "Are utilities included in 3 bedroom house rent in Kenya?",
      answer: "Typically NO. Most <a href='/3-bedroom-house-for-rent' class='text-green-600 hover:underline'>3 bedroom house rentals</a> exclude utilities. Expect to pay separately for: Electricity (KES 3,000-8,000/month), Water (KES 1,000-3,000/month), Internet (KES 3,000-6,000/month), Security/Service charge (KES 2,000-10,000/month in estates), and Garbage collection (KES 300-800/month). Budget an extra KES 10,000-25,000/month for utilities."
    },
    {
      question: "What is the best time to look for a 3 bedroom house in Nairobi?",
      answer: "Best times: Mid-year (June-July) when school transfers happen, December-January (expatriate moves, job changes), and March-April (fiscal year transitions). Avoid peak moving seasons for better negotiation leverage. Start searching 2-3 months before your target move date. Off-peak periods offer better deals and landlord flexibility."
    },
    {
      question: "How can I verify a 3 bedroom house rental is legitimate?",
      answer: "Verification steps: 1) Visit the property in person (never rent sight-unseen), 2) Request landlord's ID and title deed copy, 3) Verify property ownership at Land Registry (KES 500), 4) Check agent is registered with Estate Agents Registration Board, 5) Read tenancy agreement carefully before signing, 6) Avoid paying cash - use bank transfers for paper trail, 7) Get receipts for all payments."
    },
    {
      question: "Can I negotiate rent for a 3 bedroom house in Kenya?",
      answer: "YES, negotiation is common in Kenya. Best leverage: Long-term lease commitment (2+ years), paying 6-12 months upfront, off-peak season, property vacant for long period, minor repairs needed, or bulk deal (if renting multiple units). Realistic discount range: 5-15% off asking price. Landlords in suburban areas are generally more flexible than premium neighborhoods."
    },
    {
      question: "What are common landlord-tenant laws for house rentals in Kenya?",
      answer: "Key legal points: 1) Tenancy agreement must be in writing and signed, 2) Notice period: 1-3 months (as per agreement), 3) Landlord cannot evict without court order, 4) Landlord must maintain structural repairs, 5) Tenant responsible for internal damages, 6) Deposit refundable within 30 days of vacancy (less deductions), 7) Rent increase requires proper notice (usually 3 months). Consult the Landlord and Tenant Act 2021 for full rights."
    },
    {
      question: "Is it better to rent in Nairobi or satellite towns for 3 bedroom houses?",
      answer: "Depends on priorities. <strong>Nairobi pros:</strong> Shorter commutes, better amenities, social scene, premium schools. <strong>Cons:</strong> Higher rent, smaller compounds, traffic. <strong>Satellite town pros (Ruiru, Ngong, Syokimau):</strong> 30-50% cheaper rent, larger compounds, quieter environment. <strong>Cons:</strong> Longer commutes, developing infrastructure. Calculate commute costs vs rent savings."
    },
    {
      question: "What security features should a 3 bedroom house have?",
      answer: "Essential security: Perimeter wall (6-8 feet) with electric fence/razor wire, Solid gate with guard or electric access, Window grills on all openings, Secure doors with deadbolts, Adequate outdoor lighting. Preferred additions: CCTV cameras, Alarm system, Gated community with 24/7 security, Neighborhood watch, and Backup lighting (solar). Karen, Runda, Kitisuru estates typically have comprehensive security."
    },
    {
      question: "How close should a 3 bedroom house be to schools?",
      answer: "Ideal distance: Within 5-10 km of school to minimize commute stress for children. Premium neighborhoods like <a href='/houses-for-rent/nairobi-county?city=Karen&bedrooms=3' class='text-green-600 hover:underline'>Karen</a>, <a href='/houses-for-rent/nairobi-county?city=Kitisuru&bedrooms=3' class='text-green-600 hover:underline'>Kitisuru</a>, and <a href='/houses-for-rent/nairobi-county?city=Lavington&bedrooms=3' class='text-green-600 hover:underline'>Lavington</a> are near top international schools (Brookhouse, ISK, Braeside). Consider school bus routes availability. Factor school run time into location choice."
    },
    {
      question: "What are red flags when viewing a 3 bedroom house?",
      answer: "Warning signs: 1) Landlord pressures immediate deposit without viewing, 2) Price significantly below market rate, 3) Landlord avoids showing title deed, 4) Property has persistent water/sewage issues, 5) Visible structural cracks or electrical problems, 6) Neighbors report frequent landlord-tenant disputes, 7) No written agreement offered, 8) Previous tenants left abruptly. Trust your instincts - if it feels wrong, walk away."
    },
    {
      question: "Can I sublet a 3 bedroom house in Kenya?",
      answer: "Only with WRITTEN landlord permission in the tenancy agreement. Unauthorized subletting is grounds for eviction. If you need to sublet: 1) Request landlord's written consent, 2) Landlord may charge admin fee, 3) You remain legally responsible for rent and property condition, 4) Screen subtenants carefully, 5) Have sublease agreement drafted. Many landlords prohibit subletting in premium areas like Karen and Runda."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-green-500 to-blue-600 text-white pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BadgeCheck className="h-6 w-6" />
              <span className="text-green-100 font-medium">800+ Verified Listings</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              3 Bedroom House for Rent in Kenya 2025
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-50">
              Find spacious family homes from KES 30,000/month in Kenya's best neighborhoods
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-200" />
                <span>Verified Landlords</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-200" />
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-green-200" />
                <span>13+ Industry Awards</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-200" />
                <span>8+ Years Experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 py-3 overflow-x-auto">
            <a href="#price-ranges" className="text-sm font-medium hover:text-green-600 whitespace-nowrap">Price Ranges</a>
            <span className="text-gray-300">|</span>
            <a href="#neighborhoods" className="text-sm font-medium hover:text-green-600 whitespace-nowrap">Top Locations</a>
            <span className="text-gray-300">|</span>
            <a href="#guide" className="text-sm font-medium hover:text-green-600 whitespace-nowrap">Rental Guide</a>
            <span className="text-gray-300">|</span>
            <a href="#listings" className="text-sm font-medium hover:text-green-600 whitespace-nowrap">Browse Listings</a>
            <span className="text-gray-300">|</span>
            <a href="#faqs" className="text-sm font-medium hover:text-green-600 whitespace-nowrap">FAQs</a>
          </div>
        </div>
      </section>

      {/* Property Listings - MOVED TO TOP */}
      <section id="listings" className="py-12 bg-white border-b-2 border-gray-100">
        <div className="container mx-auto px-3">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Latest 3 Bedroom Houses for Rent in Kenya
            </h2>
            <p className="text-gray-600">
              Browse verified listings. Showing {properties.length > 4 ? '4 of ' + properties.length : properties.length} properties
            </p>
          </div>

          {loading ? (
            <GridLoadingSkeleton type="property" count={4} />
          ) : properties.length > 0 ? (
            <>
              <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                {properties.slice(0, 4).map((property) => (
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
              {properties.length > 4 && (
                <div className="text-center">
                  <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3" asChild>
                    <Link href="/houses-for-rent?bedrooms=3">
                      View All {properties.length} 3 Bedroom Houses →
                    </Link>
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Home className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No properties found
              </h3>
              <p className="text-gray-600 mb-6">
                Browse all available properties
              </p>
              <Button className="bg-green-600 hover:bg-green-700 text-white" asChild>
                <Link href="/houses-for-rent?bedrooms=3">Browse All Houses</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Find Your Perfect 3 Bedroom House in Kenya - 2025 Market Guide</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Looking for a <strong>3 bedroom house for rent in Kenya</strong>? You've come to the right place. NewKenyan.com offers <strong>800+ verified 3 bedroom house listings</strong> across Kenya's most sought-after neighborhoods, from luxury estates in Karen and Runda to affordable family suburbs in Ngong and Ruiru.
              </p>
              <p>
                The Kenya rental market in 2025 shows strong demand for <strong>3 bedroom houses</strong>, particularly among growing families, expatriates, and professionals seeking more space and privacy than apartments offer. With our 8+ years of real estate experience and partnerships with <Link href="/real-estate-companies-in-kenya" className="text-green-600 hover:underline font-semibold">many real estate agencies in Kenya</Link>, we've helped thousands of families find their ideal homes.
              </p>
              <p>
                <strong>Current Market Trends 2025:</strong> Rental prices for 3 bedroom houses have stabilized after 2024 fluctuations, with budget suburbs like <Link href="/houses-for-rent/nairobi-county?city=Ngong&bedrooms=3" className="text-green-600 hover:underline">Ngong</Link> and <Link href="/houses-for-rent/nairobi-county?city=Syokimau&bedrooms=3" className="text-green-600 hover:underline">Syokimau</Link> offering excellent value (KES 35,000-60,000/month). Premium neighborhoods like <Link href="/houses-for-rent/nairobi-county?city=Karen&bedrooms=3" className="text-green-600 hover:underline">Karen</Link>, <Link href="/houses-for-rent/nairobi-county?city=Runda&bedrooms=3" className="text-green-600 hover:underline">Runda</Link>, and <Link href="/houses-for-rent/nairobi-county?city=Kitisuru&bedrooms=3" className="text-green-600 hover:underline">Kitisuru</Link> remain in high demand among diplomats and executives (KES 120,000-300,000/month).
              </p>
              <p>
                Whether you're searching for a spacious family home near international schools, a secure gated estate, or an affordable house in a growing suburb, this comprehensive guide covers everything you need to know about renting a 3 bedroom house in Kenya - from price ranges and top neighborhoods to legal requirements and negotiation tips.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Price Range Section */}
      <section id="price-ranges" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">3 Bedroom House Price Ranges in Kenya (2025)</h2>
            <p className="text-center text-gray-600 mb-8">Choose your budget and discover what you can expect at each price point</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {priceRanges.slice(1).map((range) => (
                <div key={range.value} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-green-500 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-green-600">{range.label}</h3>
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-gray-600 mb-4">{range.description}</p>
                  <Button
                    onClick={() => setSelectedPriceRange(range.value)}
                    variant={selectedPriceRange === range.value ? "default" : "outline"}
                    className="w-full"
                  >
                    View Listings
                  </Button>
                </div>
              ))}
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-2xl font-bold mb-6">What to Expect at Each Price Point</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-green-600 mb-2">KES 30,000 - 40,000/month (Budget-Friendly)</h4>
                  <p className="text-gray-700 mb-2"><strong>Locations:</strong> Ngong, Ruiru, Githurai, Rongai, Kitengela</p>
                  <p className="text-gray-700 mb-2"><strong>Property Features:</strong> Standalone houses or townhouses, 3 bedrooms (master en-suite), guest toilet, small compound, parking for 1 car, water tank, perimeter wall.</p>
                  <p className="text-gray-700"><strong>Best For:</strong> Young families, first-time renters, commuters seeking affordability and space. Expect older construction but functional homes.</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-green-600 mb-2">KES 40,000 - 70,000/month (Mid-Range)</h4>
                  <p className="text-gray-700 mb-2"><strong>Locations:</strong> Syokimau, Kitengela, Athi River, Kahawa, Juja, Lower Ngong</p>
                  <p className="text-gray-700 mb-2"><strong>Property Features:</strong> Modern houses/bungalows in organized estates, master en-suite + 2 bedrooms, DSQ (Domestic Servant Quarter), parking for 2 cars, compound/small garden, estate security, backup water.</p>
                  <p className="text-gray-700"><strong>Best For:</strong> Growing families prioritizing security and modern amenities, professionals working near Airport/Mombasa Road.</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-green-600 mb-2">KES 70,000 - 100,000/month (Premium)</h4>
                  <p className="text-gray-700 mb-2"><strong>Locations:</strong> Kilimani, South B, South C, Langata, Kileleshwa, Lavington (outskirts)</p>
                  <p className="text-gray-700 mb-2"><strong>Property Features:</strong> Contemporary townhouses or bungalows, spacious rooms, modern kitchen, large compound, 24/7 gated security, CCTV, generator backup, well-maintained gardens, 2-car parking.</p>
                  <p className="text-gray-700"><strong>Best For:</strong> Established families, mid-level executives, those seeking balance between location and cost.</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-green-600 mb-2">KES 100,000 - 150,000/month (High-End)</h4>
                  <p className="text-gray-700 mb-2"><strong>Locations:</strong> Karen, Lavington, Kilimani (premium estates), Kitisuru, Westlands, Runda Mumwe</p>
                  <p className="text-gray-700 mb-2"><strong>Property Features:</strong> Luxury bungalows/maisonettes, high-end finishes, large gardens, swimming pool (in some), gym, 24/7 security with guards, CCTV throughout, solar backup, 3+ parking bays, DSQ.</p>
                  <p className="text-gray-700"><strong>Best For:</strong> Senior executives, expatriates, families prioritizing schools, security, and prestige.</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-green-600 mb-2">KES 150,000+/month (Ultra-Luxury)</h4>
                  <p className="text-gray-700 mb-2"><strong>Locations:</strong> Runda, Karen (prime), Kitisuru, Muthaiga, Gigiri</p>
                  <p className="text-gray-700 mb-2"><strong>Property Features:</strong> Diplomatic-grade security, sprawling compounds (1+ acre), swimming pool, landscaped gardens, guest wing, smart home technology, premium appliances, staff quarters, multiple parking, generator, borehole.</p>
                  <p className="text-gray-700"><strong>Best For:</strong> Diplomats, CEOs, high net worth individuals requiring maximum security, privacy, and luxury.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Neighborhoods Section */}
      <section id="neighborhoods" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Top 8 Neighborhoods for 3 Bedroom Houses</h2>
            <p className="text-center text-gray-600 mb-8">Detailed profiles of Kenya's best residential areas for families</p>

            <div className="grid md:grid-cols-2 gap-8">
              {neighborhoods.map((neighborhood) => (
                <div key={neighborhood.name} className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-green-500 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-green-600">{neighborhood.name}</h3>
                      <p className="text-lg font-semibold text-gray-700">{neighborhood.avgPrice}</p>
                    </div>
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>

                  <p className="text-gray-700 mb-4">{neighborhood.description}</p>

                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Key Amenities:</p>
                      <div className="flex flex-wrap gap-2">
                        {neighborhood.amenities.map((amenity) => (
                          <span key={amenity} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-600">Demographics:</p>
                      <p className="text-sm text-gray-700">{neighborhood.demographics}</p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-600">Transport:</p>
                      <p className="text-sm text-gray-700">{neighborhood.transport}</p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-600">Safety Rating:</p>
                      <p className="text-sm text-gray-700">{neighborhood.safety}</p>
                    </div>
                  </div>

                  <Link href={neighborhood.link}>
                    <Button className="w-full">
                      View {neighborhood.name} Listings
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Rental Guide */}
      <section id="guide" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Complete Guide to Renting a 3 Bedroom House in Kenya</h2>

            <div className="space-y-8">
              {/* Step-by-Step Process */}
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <FileCheck className="h-8 w-8 text-green-600" />
                  <h3 className="text-2xl font-bold">Step-by-Step Rental Process</h3>
                </div>

                <ol className="space-y-4 list-decimal list-inside text-gray-700">
                  <li className="font-semibold">Define Your Budget & Requirements
                    <p className="ml-6 mt-2 font-normal">Calculate total upfront costs (3-4 months' rent), monthly utilities (KES 10,000-25,000), and commute expenses. List must-haves: location, security, parking, schools nearby, compound size.</p>
                  </li>
                  <li className="font-semibold">Search & Shortlist Properties
                    <p className="ml-6 mt-2 font-normal">Browse NewKenyan.com's verified listings, filter by budget and location. Shortlist 5-8 properties. Check listing dates (avoid old listings), read descriptions carefully, verify photos are recent.</p>
                  </li>
                  <li className="font-semibold">Schedule Property Viewings
                    <p className="ml-6 mt-2 font-normal">Contact landlords/agents via WhatsApp or phone. Book viewings for weekday mornings (better lighting). Visit at least 3-5 properties to compare. Bring a checklist.</p>
                  </li>
                  <li className="font-semibold">Inspect the Property Thoroughly
                    <p className="ml-6 mt-2 font-normal">Check: Plumbing (run all taps, flush toilets), electrical (test all switches, check wiring), doors/windows (locks, security grills), walls/ceiling (cracks, leaks), compound (drainage, fence condition), water supply (tank size, pressure). Ask about security protocols.</p>
                  </li>
                  <li className="font-semibold">Verify Ownership & Legitimacy
                    <p className="ml-6 mt-2 font-normal">Request landlord's ID and title deed copy. Visit Land Registry to confirm ownership (KES 500 official search). If using agent, verify registration with Estate Agents Registration Board (EARB).</p>
                  </li>
                  <li className="font-semibold">Negotiate Terms
                    <p className="ml-6 mt-2 font-normal">Negotiate rent (5-15% discount possible), deposit structure, minor repairs, lease duration. Best leverage: long-term commitment, upfront payment, off-peak season.</p>
                  </li>
                  <li className="font-semibold">Review Tenancy Agreement
                    <p className="ml-6 mt-2 font-normal">Read ENTIRE agreement before signing. Key clauses: Rent amount and payment date, Deposit refund terms, Notice period (typically 1-3 months), Maintenance responsibilities, Subletting policy, Rent increase terms. Seek legal advice if unclear.</p>
                  </li>
                  <li className="font-semibold">Make Payments & Collect Receipts
                    <p className="ml-6 mt-2 font-normal">Pay via bank transfer (paper trail). Typical breakdown: 1-2 months deposit + 1 month advance rent + 1 month agent commission = 3-4 months total. ALWAYS get official receipts for every payment.</p>
                  </li>
                  <li className="font-semibold">Conduct Move-In Inspection
                    <p className="ml-6 mt-2 font-normal">Document property condition with photos/video before moving in. Note existing damages in writing. Share with landlord. This protects your deposit at move-out.</p>
                  </li>
                  <li className="font-semibold">Set Up Utilities & Services
                    <p className="ml-6 mt-2 font-normal">Register electricity meter (KPLC), arrange water connection, install internet, set up garbage collection, exchange contacts with neighbors, establish relationship with landlord/caretaker.</p>
                  </li>
                </ol>
              </div>

              {/* Required Documents */}
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <FileCheck className="h-8 w-8 text-green-600" />
                  <h3 className="text-2xl font-bold">Required Documents for House Rental</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Tenant Documents:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Copy of National ID or Passport (2 copies)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>2-3 recent passport photos</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Proof of income (3 recent payslips or employment letter)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Bank statements (3-6 months)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Current landlord reference letter (if applicable)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Good Conduct Certificate (some landlords require)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>KRA PIN certificate</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Landlord Should Provide:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Copy of National ID</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Copy of title deed (for verification)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>KRA PIN (for rent receipts)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Signed tenancy agreement (2 copies)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Official payment receipts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Inventory list of fixtures/fittings</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Legal Considerations */}
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <Scale className="h-8 w-8 text-green-600" />
                  <h3 className="text-2xl font-bold">Legal Considerations & Tenant Rights</h3>
                </div>

                <div className="space-y-4 text-gray-700">
                  <p><strong>Landlord and Tenant Act 2021</strong> governs residential rentals in Kenya. Key provisions:</p>

                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Written Agreement Required:</strong> All tenancy agreements must be in writing and signed by both parties. Verbal agreements are not legally enforceable.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Deposit Protection:</strong> Maximum deposit is 2 months' rent. Must be refunded within 30 days of vacancy, less legitimate deductions for damages.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Rent Increases:</strong> Landlord must give 3 months' written notice before increasing rent. Increases typically capped at 10% annually.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Notice Period:</strong> Tenant must give 1-3 months notice (per agreement) before vacating. Landlord needs court order to evict.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Maintenance Obligations:</strong> Landlord responsible for structural repairs, plumbing, electrical. Tenant responsible for internal cleanliness and minor damage.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Right to Quiet Enjoyment:</strong> Landlord cannot enter property without reasonable notice (24-48 hours) except in emergencies.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Dispute Resolution:</strong> Rent Tribunal handles landlord-tenant disputes. Consult a lawyer or seek professional mediation for serious issues.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Inspection Checklist */}
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                  <h3 className="text-2xl font-bold">Property Inspection Checklist</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Interior Checks:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Walls & ceiling (cracks, dampness, paint condition)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Flooring (tiles, wood condition, levelness)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Doors & windows (locks, hinges, glass, grills)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Plumbing (run all taps, check water pressure, toilets)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Electrical (test all switches, outlets, check meter box)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Kitchen (cabinets, sink, countertops, ventilation)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Bathrooms (tiles, fixtures, drainage, water heater)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Storage spaces (closets, shelves, condition)</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Exterior & Security:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Perimeter wall/fence (height, condition, electric fence)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Gate (security, lock, condition)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Compound (drainage, landscaping, parking space)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Water supply (tank size, condition, backup)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Outdoor lighting (security lights, condition)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>DSQ (if applicable - size, condition, facilities)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Neighborhood security (guards, CCTV, access control)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Septic tank/sewer connection (location, condition)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Negotiation Tips */}
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <HeartHandshake className="h-8 w-8 text-green-600" />
                  <h3 className="text-2xl font-bold">Negotiation Tips & Common Pitfalls</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">How to Negotiate Rent Successfully:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Research Market Rates:</strong> Compare similar properties in the area using NewKenyan.com. Know the average price range before negotiating.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Offer Long-Term Commitment:</strong> Landlords prefer stable tenants. Offer 2-year lease for 10-15% discount. Negotiate rent review clause.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Pay Multiple Months Upfront:</strong> Offering 6-12 months rent in advance gives strong negotiating power for 5-10% discount.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Point Out Needed Repairs:</strong> Use inspection findings to negotiate lower rent or request repairs before moving in.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Negotiate in Off-Peak Seasons:</strong> Best times: March-May, September-November. Avoid December-January when demand peaks.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Be Respectful & Professional:</strong> Build rapport with landlord. Show you're responsible tenant with stable income.</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 text-red-600">Common Pitfalls to Avoid:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold mt-0.5 flex-shrink-0">✗</span>
                        <span><strong>Paying Deposit Before Viewing:</strong> NEVER pay money before physically inspecting the property. Common scam tactic.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold mt-0.5 flex-shrink-0">✗</span>
                        <span><strong>Skipping Title Deed Verification:</strong> Confirm ownership at Land Registry. Some fraudsters rent out properties they don't own.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold mt-0.5 flex-shrink-0">✗</span>
                        <span><strong>Signing Incomplete Agreements:</strong> Ensure ALL terms are written before signing. Verbal promises are unenforceable.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold mt-0.5 flex-shrink-0">✗</span>
                        <span><strong>No Pre-Move Photos/Video:</strong> Document property condition BEFORE moving in. Protects deposit at move-out.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold mt-0.5 flex-shrink-0">✗</span>
                        <span><strong>Ignoring Neighborhood Research:</strong> Visit area at different times (day/night, weekday/weekend). Talk to current residents.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold mt-0.5 flex-shrink-0">✗</span>
                        <span><strong>Underestimating Total Costs:</strong> Factor in utilities (KES 10-25K/month), security charges, commute costs, school fees.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Expert Tips Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Expert Tips for Renting 3 Bedroom Houses in Kenya</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-green-600 mb-3">Best Time to Rent</h3>
                <p className="text-gray-700 mb-3">Optimal rental periods in Kenya's housing market:</p>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li><strong>June-July:</strong> School transitions, family relocations increase supply</li>
                  <li><strong>December-January:</strong> High demand (expatriate moves, job changes) - prices peak</li>
                  <li><strong>March-May:</strong> Off-peak season, better negotiation opportunities</li>
                  <li><strong>Tip:</strong> Start searching 2-3 months before target move date for best selection</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-green-600 mb-3">Spot Genuine Listings</h3>
                <p className="text-gray-700 mb-3">How to identify legitimate property listings:</p>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>✓ Recent, high-quality photos with consistent property features</li>
                  <li>✓ Detailed description with specific amenities and location</li>
                  <li>✓ Realistic pricing (compare with area averages)</li>
                  <li>✓ Verifiable contact information (phone, WhatsApp)</li>
                  <li>✗ Suspiciously low prices or "urgent" sale pressure</li>
                  <li>✗ Stock photos or watermarked images from other sites</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-green-600 mb-3">Red Flags to Watch For</h3>
                <p className="text-gray-700 mb-3">Warning signs during your house search:</p>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>🚩 Landlord refuses to show title deed or ID</li>
                  <li>🚩 Pressure to pay deposit immediately without viewing</li>
                  <li>🚩 No written tenancy agreement offered</li>
                  <li>🚩 Property significantly below market rate</li>
                  <li>🚩 Landlord only accepts cash payments (no bank transfer)</li>
                  <li>🚩 Visible structural issues (major cracks, water damage)</li>
                  <li>🚩 Neighbors report frequent landlord-tenant disputes</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-green-600 mb-3">Understanding Total Costs</h3>
                <p className="text-gray-700 mb-3">Budget for upfront and monthly expenses:</p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-gray-800">Upfront (3-4 months rent):</p>
                    <ul className="text-gray-700 ml-4 mt-1">
                      <li>• Deposit: 1-2 months</li>
                      <li>• Advance rent: 1 month</li>
                      <li>• Agent commission: 1 month (if applicable)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Monthly Utilities (~KES 15,000-30,000):</p>
                    <ul className="text-gray-700 ml-4 mt-1">
                      <li>• Electricity: KES 3,000-8,000</li>
                      <li>• Water: KES 1,000-3,000</li>
                      <li>• Internet: KES 3,000-6,000</li>
                      <li>• Security/service charge: KES 2,000-10,000</li>
                      <li>• Garbage: KES 300-800</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Property Types */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Explore Related Property Types</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/2-bedroom-apartment-nairobi" className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:border-green-500 transition-colors">
                <Building2 className="h-10 w-10 text-green-600 mb-3" />
                <h3 className="text-lg font-bold mb-2">2 Bedroom Apartments</h3>
                <p className="text-sm text-gray-600 mb-3">Compact family apartments in Nairobi</p>
                <p className="text-green-600 font-semibold">From KES 25,000/month →</p>
              </Link>

              <Link href="/apartments-for-rent-nairobi" className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:border-green-500 transition-colors">
                <Building2 className="h-10 w-10 text-green-600 mb-3" />
                <h3 className="text-lg font-bold mb-2">All Apartments</h3>
                <p className="text-sm text-gray-600 mb-3">Browse apartments across Nairobi</p>
                <p className="text-green-600 font-semibold">450+ listings →</p>
              </Link>

              <Link href="/houses-for-rent" className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:border-green-500 transition-colors">
                <Home className="h-10 w-10 text-green-600 mb-3" />
                <h3 className="text-lg font-bold mb-2">All Houses for Rent</h3>
                <p className="text-sm text-gray-600 mb-3">Explore all house rentals in Kenya</p>
                <p className="text-green-600 font-semibold">1,500+ listings →</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Linking Section - Browse by Location */}
      <section className="py-12 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Browse 3 Bedroom Houses by Location</h2>
            <p className="text-center text-gray-600 mb-8">Find houses in Kenya's most popular residential areas</p>

            {/* Counties */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">By County</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                <Link href="/houses-for-rent/nairobi-county?bedrooms=3" className="text-green-600 hover:underline text-sm">
                  Nairobi County
                </Link>
                <Link href="/houses-for-rent/kiambu-county?bedrooms=3" className="text-green-600 hover:underline text-sm">
                  Kiambu County
                </Link>
                <Link href="/houses-for-rent/machakos-county?bedrooms=3" className="text-green-600 hover:underline text-sm">
                  Machakos County
                </Link>
                <Link href="/houses-for-rent/kajiado-county?bedrooms=3" className="text-green-600 hover:underline text-sm">
                  Kajiado County
                </Link>
                <Link href="/houses-for-rent/mombasa-county?bedrooms=3" className="text-green-600 hover:underline text-sm">
                  Mombasa County
                </Link>
                <Link href="/houses-for-rent/nakuru-county?bedrooms=3" className="text-green-600 hover:underline text-sm">
                  Nakuru County
                </Link>
              </div>
            </div>

            {/* Premium Neighborhoods */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Premium Neighborhoods</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                <Link href="/houses-for-rent/nairobi-county?city=Karen&bedrooms=3" className="text-green-600 hover:underline text-sm">
                  Karen Houses
                </Link>
                <Link href="/houses-for-rent/nairobi-county?city=Runda&bedrooms=3" className="text-green-600 hover:underline text-sm">
                  Runda Houses
                </Link>
                <Link href="/houses-for-rent/nairobi-county?city=Lavington&bedrooms=3" className="text-green-600 hover:underline text-sm">
                  Lavington Houses
                </Link>
                <Link href="/houses-for-rent/nairobi-county?city=Kitisuru&bedrooms=3" className="text-green-600 hover:underline text-sm">
                  Kitisuru Houses
                </Link>
                <Link href="/houses-for-rent/nairobi-county?city=Kilimani&bedrooms=3" className="text-green-600 hover:underline text-sm">
                  Kilimani Houses
                </Link>
              </div>
            </div>

            {/* Budget-Friendly Areas */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Budget-Friendly Areas</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                <Link href="/houses-for-rent/nairobi-county?city=Ngong&bedrooms=3" className="text-green-600 hover:underline text-sm">
                  Ngong Houses
                </Link>
                <Link href="/houses-for-rent/nairobi-county?city=Ruiru&bedrooms=3" className="text-green-600 hover:underline text-sm">
                  Ruiru Houses
                </Link>
                <Link href="/houses-for-rent/machakos-county?city=Syokimau&bedrooms=3" className="text-green-600 hover:underline text-sm">
                  Syokimau Houses
                </Link>
                <Link href="/houses-for-rent/kajiado-county?city=Kitengela&bedrooms=3" className="text-green-600 hover:underline text-sm">
                  Kitengela Houses
                </Link>
                <Link href="/houses-for-rent/nairobi-county?city=Kasarani&bedrooms=3" className="text-green-600 hover:underline text-sm">
                  Kasarani Houses
                </Link>
              </div>
            </div>

            {/* Related Searches */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Related Property Searches</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <Link href="/2-bedroom-apartment-nairobi" className="text-green-600 hover:underline text-sm">
                  → 2 Bedroom Apartments in Nairobi
                </Link>
                <Link href="/apartments-for-rent-nairobi" className="text-green-600 hover:underline text-sm">
                  → Apartments for Rent in Nairobi
                </Link>
                <Link href="/houses-for-rent/nairobi-county?bedrooms=4" className="text-green-600 hover:underline text-sm">
                  → 4 Bedroom Houses for Rent
                </Link>
                <Link href="/houses-for-rent/nairobi-county?bedrooms=2" className="text-green-600 hover:underline text-sm">
                  → 2 Bedroom Houses for Rent
                </Link>
                <Link href="/houses-for-sale/nairobi-county?bedrooms=3" className="text-green-600 hover:underline text-sm">
                  → 3 Bedroom Houses for Sale
                </Link>
                <Link href="/land-for-sale-kenya" className="text-green-600 hover:underline text-sm">
                  → Land for Sale in Kenya
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faqs" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>

            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-800">{faq.question}</span>
                    <ChevronDown className={`h-5 w-5 text-green-600 transition-transform ${openFAQ === index ? 'transform rotate-180' : ''}`} />
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals Footer */}
      <section className="py-12 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Why Choose NewKenyan.com?</h2>

            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <Award className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">13+ Awards</h3>
                <p className="text-sm text-gray-600">Industry-recognized excellence in real estate</p>
              </div>

              <div>
                <Shield className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">8+ Years</h3>
                <p className="text-sm text-gray-600">Trusted experience in Kenya property market</p>
              </div>

              <div>
                <Users className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Agency Partnerships</h3>
                <p className="text-sm text-gray-600">Partnering with trusted real estate agencies across Kenya</p>
              </div>

              <div>
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Verified Listings</h3>
                <p className="text-sm text-gray-600">All properties vetted for authenticity</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
