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
  BadgeCheck, FileCheck, HeartHandshake, Scale, GraduationCap, Wallet
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

export default function BedsitterKasaraniClient() {
  const [properties, setProperties] = useState<PropertyListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  useEffect(() => {
    fetchProperties();
  }, [selectedArea, selectedPriceRange]);

  const fetchProperties = async () => {
    try {
      setLoading(true);

      let query = supabase
        .from('property_listings')
        .select('*')
        .eq('is_approved', true)
        .eq('price_type', 'rent')
        .ilike('city', '%kasarani%')
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      // Query for Bedsitter property type OR bedrooms = 0
      query = query.or('property_type.eq.Bedsitter,bedrooms.eq.0');

      if (selectedArea !== 'all') {
        query = query.ilike('city', `%${selectedArea}%`);
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

      // Fallback: If no properties found, show any bedsitters in Nairobi
      if (!data || data.length === 0) {
        const fallbackQuery = supabase
          .from('property_listings')
          .select('*')
          .eq('is_approved', true)
          .eq('price_type', 'rent')
          .ilike('county', '%Nairobi%')
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
    { value: '0-6000', label: 'KES 5K - 6K', description: 'Ultra budget' },
    { value: '6000-8000', label: 'KES 6K - 8K', description: 'Budget friendly' },
    { value: '8000-10000', label: 'KES 8K - 10K', description: 'Standard' },
    { value: '10000-12000', label: 'KES 10K - 12K', description: 'Mid-range' },
    { value: '12000', label: 'KES 12K+', description: 'Premium' }
  ];

  const kasaraniAreas = [
    { value: 'all', label: 'All Kasarani Areas', count: '400+' },
    { value: 'Mwiki', label: 'Mwiki', count: '100+', avgPrice: 'KES 6,000' },
    { value: 'Clay City', label: 'Clay City', count: '70+', avgPrice: 'KES 7,000' },
    { value: 'Seasons', label: 'Seasons', count: '60+', avgPrice: 'KES 8,000' },
    { value: 'Hunters', label: 'Hunters', count: '50+', avgPrice: 'KES 7,500' },
    { value: 'Sunton', label: 'Sunton', count: '40+', avgPrice: 'KES 6,500' },
    { value: 'Zimmerman', label: 'Zimmerman', count: '80+', avgPrice: 'KES 7,500' }
  ];

  const neighborhoods = [
    {
      name: 'Mwiki',
      avgPrice: 'KES 5,000 - 8,000',
      description: 'Most popular and affordable area in Kasarani. Large concentration of bedsitters catering to students and young professionals. Vibrant local markets, shops, and transport.',
      amenities: ['Mwiki Market', 'Shopping Centers', 'Churches', 'Hospitals'],
      demographics: 'Students, Entry-level Professionals, Singles',
      transport: 'Excellent matatu routes to Thika Road, CBD (Route 45, 236)',
      safety: '6/10 - Active community policing, choose well-lit areas',
      link: '/bedsitters-for-rent/nairobi-county?city=Mwiki'
    },
    {
      name: 'Clay City',
      avgPrice: 'KES 6,000 - 9,000',
      description: 'Well-planned estate with modern bedsitters. Good security with most units in gated compounds. Popular with young professionals working along Thika Road.',
      amenities: ['Shopping Malls Nearby', 'Hospitals', 'Banks', 'Supermarkets'],
      demographics: 'Young Professionals, Small Families, Students',
      transport: 'Easy access to Thika Superhighway, matatus to CBD',
      safety: '7/10 - Gated estates with security guards',
      link: '/bedsitters-for-rent/nairobi-county?city=Clay+City'
    },
    {
      name: 'Seasons',
      avgPrice: 'KES 7,000 - 10,000',
      description: 'Newer development with organized estates. Modern bedsitters with better finishes. Growing area with improving infrastructure and amenities.',
      amenities: ['Thika Road Mall', 'Schools', 'Health Centers', 'Churches'],
      demographics: 'Working Professionals, Young Couples',
      transport: 'Matatus along Thika Road, boda bodas',
      safety: '7/10 - Estate security, well-lit compounds',
      link: '/bedsitters-for-rent/nairobi-county?city=Seasons'
    },
    {
      name: 'Hunters',
      avgPrice: 'KES 6,500 - 9,500',
      description: 'Established area with mix of older and newer bedsitters. Good value for money with spacious units. Close to Thika Road for easy commuting.',
      amenities: ['Local Markets', 'Shopping Centers', 'Schools', 'Hospitals'],
      demographics: 'Students, Young Professionals, Singles',
      transport: 'Frequent matatus to Thika Road and CBD',
      safety: '6/10 - Community security, choose secure buildings',
      link: '/bedsitters-for-rent/nairobi-county?city=Hunters'
    },
    {
      name: 'Sunton',
      avgPrice: 'KES 5,500 - 8,500',
      description: 'Budget-friendly area with basic bedsitters. Popular with students due to proximity to universities. Local amenities and affordable cost of living.',
      amenities: ['Markets', 'Small Shops', 'Churches', 'Schools'],
      demographics: 'Students, Entry-Level Workers, Singles',
      transport: 'Matatus to Thika Road, CBD, boda bodas',
      safety: '6/10 - Basic security, community watch',
      link: '/bedsitters-for-rent/nairobi-county?city=Sunton'
    },
    {
      name: 'Zimmerman',
      avgPrice: 'KES 6,500 - 10,000',
      description: 'Larger area with diverse bedsitter options. Mix of budget and mid-range units. Good shopping and entertainment options along Thika Road.',
      amenities: ['Thika Road Mall', 'Kenyatta University Nearby', 'Hospitals', 'Banks'],
      demographics: 'Students, Professionals, Young Families',
      transport: 'Excellent matatu access along Thika Road',
      safety: '7/10 - Mixed, better in gated estates',
      link: '/bedsitters-for-rent/nairobi-county?city=Zimmerman'
    }
  ];

  const faqData = [
    {
      question: "What is the average rent for bedsitters in Kasarani in 2025?",
      answer: "Average rent for <a href='/bedsitter-kasarani' class='text-green-600 hover:underline'>bedsitters in Kasarani</a> ranges from KES 5,000-12,000 per month depending on location and amenities. <a href='/bedsitters-for-rent/nairobi-county?city=Mwiki' class='text-green-600 hover:underline'>Mwiki</a> offers the cheapest options at KES 5,000-8,000, while <a href='/bedsitters-for-rent/nairobi-county?city=Seasons' class='text-green-600 hover:underline'>Seasons</a> and <a href='/bedsitters-for-rent/nairobi-county?city=Clay+City' class='text-green-600 hover:underline'>Clay City</a> cost KES 7,000-10,000 for newer units with better security."
    },
    {
      question: "Why is Kasarani popular for bedsitter rentals?",
      answer: "Kasarani is Nairobi's most affordable area for bedsitters. Benefits include: <strong>Lowest rents in Nairobi</strong> (KES 5,000-10,000), Direct access to Thika Superhighway (easy commute to CBD, Westlands, Ruiru), Large student population from Kenyatta University area, Vibrant local economy with markets and affordable amenities, Growing infrastructure and new developments, Good matatu connectivity, and Lower cost of living compared to central Nairobi."
    },
    {
      question: "What amenities should I expect in a Kasarani bedsitter?",
      answer: "Standard <strong>Kasarani bedsitter</strong> includes: Single room with bed space and sitting area, Small kitchen corner (sink, cooking space), Private or shared bathroom, Basic finishes (cement/tiled floor), Security (perimeter wall, watchman in most estates), Water supply (many have water issues - confirm backup). <strong>Mid-range bedsitters (KES 8K+) add:</strong> Tiled floors throughout, Better kitchen cabinets, Hot shower, Gated compound, CCTV cameras, Reliable water and electricity."
    },
    {
      question: "Are utilities included in Kasarani bedsitter rent?",
      answer: "Usually <strong>NO</strong>. Most Kasarani bedsitters charge utilities separately: <strong>Electricity:</strong> KES 500-1,500/month (prepaid tokens), <strong>Water:</strong> KES 200-600/month (some included in rent), <strong>Garbage:</strong> KES 100-300/month, <strong>Security fee (some estates):</strong> KES 200-500/month. Budget an extra <strong>KES 1,000-2,500/month</strong> for utilities. Confirm what's included before signing lease to avoid surprises."
    },
    {
      question: "How much deposit is required for a Kasarani bedsitter?",
      answer: "Standard deposit structure: <strong>1 month rent</strong> (deposit - refundable), <strong>1 month rent</strong> (advance rent), <strong>0.5-1 month rent</strong> (agent commission if using agent). Total upfront: <strong>2.5-3 months' rent</strong>. Example for KES 7,000/month bedsitter: Pay KES 17,500-21,000 upfront. Some landlords flexible - negotiate staggered payments. Dealing directly with landlord saves commission."
    },
    {
      question: "Is parking available for bedsitters in Kasarani?",
      answer: "Parking varies widely in Kasarani. <strong>Budget bedsitters (KES 5-8K):</strong> Usually open/street parking only, no dedicated bay. <strong>Mid-range estates (KES 8K+):</strong> May have compound parking (not guaranteed), sometimes charged extra KES 500-1,000/month. <strong>Street parking:</strong> Free but risky (theft/vandalism). If you own a car, confirm parking availability before renting. Many residents use public transport due to limited parking."
    },
    {
      question: "What is the best time to find bedsitters in Kasarani?",
      answer: "Best rental periods in Kasarani: <strong>January-February:</strong> Post-holiday vacancies, students returning, high supply. <strong>June-July:</strong> Mid-year moves, decent availability. <strong>September:</strong> University semester starts, competition increases. <strong>Avoid December:</strong> Low inventory, everyone moving. Start searching <strong>2-4 weeks before</strong> move date. Kasarani has high turnover - new listings daily. Act fast on good deals."
    },
    {
      question: "Is Kasarani safe for bedsitter residents?",
      answer: "Kasarani safety is <strong>moderate with precautions needed</strong>. Safety varies by specific area: <strong>Safer areas:</strong> Clay City, Seasons (gated estates), parts of Zimmerman. <strong>Higher risk:</strong> Some parts of Mwiki, isolated back streets. <strong>Safety tips:</strong> Choose bedsitters in gated compounds with security guards, Avoid ground floor units for better security, Don't walk alone late at night (use boda/Uber), Lock doors and windows always, Get to know neighbors, Keep valuables hidden. Overall safety: <strong>6-7/10</strong> with proper precautions."
    },
    {
      question: "Can I negotiate rent for bedsitters in Kasarani?",
      answer: "Yes, negotiation is common in Kasarani. <strong>Best leverage:</strong> Long-term commitment (1-2 years) - request KES 500-1,000 discount, Off-peak season (Jan-Feb, June-July), Paying 3-6 months upfront, Property vacant for extended period, Willing to handle minor repairs. <strong>Realistic discount:</strong> KES 500-1,500 off asking price (10-15%). Budget bedsitters more flexible than newer estates. Also negotiate agent commission - try to waive or reduce."
    },
    {
      question: "What is the commute like from Kasarani to Nairobi CBD?",
      answer: "<strong>Commute from Kasarani to CBD:</strong> <strong>Matatu:</strong> 30-60 minutes (KES 70-100), routes 45, 236 along Thika Road. <strong>Uber/Bolt:</strong> 35-70 minutes (KES 600-1,000 depending on traffic). <strong>Personal car:</strong> 30-75 minutes (heavy traffic 7-9am, 5-7pm on Thika Road). <strong>Boda boda:</strong> 25-40 minutes (KES 200-350), faster in traffic. <strong>Peak rush hour:</strong> Expect 60-90 minutes. Living in Kasarani means factoring commute time and transport costs (KES 3,000-6,000/month)."
    },
    {
      question: "Do Kasarani bedsitters have water and electricity issues?",
      answer: "Water issues are <strong>common in some Kasarani areas</strong>. <strong>Water:</strong> Many areas experience irregular supply. Landlords install water tanks for backup. Confirm: Tank capacity, water schedule (daily/weekly), source (piped/borehole). <strong>Electricity:</strong> Generally reliable. Most use prepaid tokens (Kenya Power). Occasional outages during storms. <strong>Before renting:</strong> Ask current tenants about water reliability, Check tank size and condition, Test water pressure during viewing, Confirm backup systems."
    },
    {
      question: "What documents do I need to rent a bedsitter in Kasarani?",
      answer: "Required documents for Kasarani bedsitters: <strong>Basic (most landlords):</strong> Copy of National ID (2 copies), 1-2 passport photos, Contact information. <strong>Additional (some landlords):</strong> Payslip or employment letter, KRA PIN, Previous landlord reference. <strong>Note:</strong> Kasarani landlords generally less strict than upmarket areas. Many accept informal workers, students without payslips. Have ID and photos ready - some properties rent same-day if available."
    },
    {
      question: "Are there shopping centers and amenities near Kasarani bedsitters?",
      answer: "Kasarani has <strong>growing amenities</strong>: <strong>Shopping Malls:</strong> Thika Road Mall (TRM - 10-15 min), Hunters Mall, local shopping centers. <strong>Supermarkets:</strong> Naivas, Quickmart, Tumaini, local groceries. <strong>Markets:</strong> Mwiki Market (fresh produce, affordable), Kasarani Market. <strong>Healthcare:</strong> Neema Hospital, Motherly Love Hospital, numerous clinics. <strong>Banks:</strong> Equity, KCB, Co-op, M-Pesa agents everywhere. <strong>Entertainment:</strong> Local bars, restaurants, gyms. Most daily needs available locally at affordable prices."
    },
    {
      question: "Is Kasarani suitable for students?",
      answer: "Yes, Kasarani is <strong>excellent for students</strong>. Benefits: <strong>Affordability:</strong> Cheapest bedsitters in Nairobi (KES 5,000-8,000), <strong>Proximity to universities:</strong> Kenyatta University nearby, USIU accessible, <strong>Student-friendly environment:</strong> Large student population, affordable food and entertainment, <strong>Cost of living:</strong> Meals from KES 100-200, cheap groceries, <strong>Transport:</strong> Easy matatu access to campus and town. <strong>Popular areas for students:</strong> Mwiki, Sunton, Zimmerman. Budget KES 12,000-18,000/month total (rent + utilities + food + transport)."
    },
    {
      question: "Can I sublet my Kasarani bedsitter?",
      answer: "Subletting policies vary in Kasarani. <strong>Generally:</strong> Many landlords prohibit subletting without permission, Students often share informally (not recommended), If subletting needed, request written permission. <strong>Process:</strong> Inform landlord in writing, May charge small admin fee (KES 1,000-3,000), You remain liable for rent and damages, Screen subtenant carefully. <strong>Important:</strong> Unauthorized subletting risks eviction and deposit loss. Kasarani landlords may be flexible - ask upfront. Many students find roommates to share costs officially."
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
              <span className="text-green-100 font-medium">400+ Verified Bedsitters in Kasarani</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Bedsitter in Kasarani 2025
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-50">
              Nairobi's most affordable bedsitters from KES 5,000/month - Perfect for students & young professionals
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-green-200" />
                <span>From KES 5,000/mo</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-green-200" />
                <span>Student Friendly</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-200" />
                <span>Thika Road Access</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-200" />
                <span>Secure Estates</span>
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
            <a href="#areas" className="text-sm font-medium hover:text-green-600 whitespace-nowrap">Top Areas</a>
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
              Latest Bedsitters in Kasarani
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
                    <Link href="/bedsitters-for-rent/nairobi-county?city=Kasarani">
                      View All {properties.length} Bedsitters in Kasarani →
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
                <Link href="/bedsitters-for-rent/nairobi-county?city=Kasarani">Browse All Bedsitters</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Find Affordable Bedsitters in Kasarani - 2025 Complete Guide</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Looking for the <strong>cheapest bedsitters in Nairobi</strong>? Kasarani is your answer. NewKenyan.com features <strong>400+ verified bedsitter listings in Kasarani</strong> starting from just KES 5,000/month. With 8+ years of real estate experience, we help students, young professionals, and budget-conscious renters find quality affordable housing in Nairobi's most value-driven neighborhood.
              </p>
              <p>
                <strong>Why Kasarani for Bedsitters?</strong> Kasarani has become Nairobi's go-to destination for affordable rental housing. Located along the Thika Superhighway with excellent matatu access to CBD, Westlands, and Thika, Kasarani offers unbeatable value. The area hosts thousands of students from nearby Kenyatta University, young professionals starting their careers, and singles seeking budget-friendly independent living. Vibrant local markets, affordable food, and growing infrastructure make Kasarani ideal for cost-conscious living.
              </p>
              <p>
                <strong>2025 Market Overview:</strong> Kasarani bedsitter market remains highly competitive with rents ranging KES 5,000-12,000/month. <Link href="/bedsitters-for-rent/nairobi-county?city=Mwiki" className="text-green-600 hover:underline">Mwiki</Link> offers the cheapest options (KES 5,000-8,000) attracting students and entry-level workers. <Link href="/bedsitters-for-rent/nairobi-county?city=Clay+City" className="text-green-600 hover:underline">Clay City</Link> and <Link href="/bedsitters-for-rent/nairobi-county?city=Seasons" className="text-green-600 hover:underline">Seasons</Link> provide newer developments (KES 7,000-10,000) with better security and amenities. <Link href="/bedsitters-for-rent/nairobi-county?city=Zimmerman" className="text-green-600 hover:underline">Zimmerman</Link> offers diverse options from budget to mid-range (KES 6,500-10,000).
              </p>
              <p>
                This comprehensive guide covers everything about renting bedsitters in Kasarani - from price breakdowns and area comparisons to safety tips, commuting costs, and insider advice for finding the best deals in Nairobi's most affordable neighborhood.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Price Range Section */}
      <section id="price-ranges" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Kasarani Bedsitter Price Ranges (2025)</h2>
            <p className="text-center text-gray-600 mb-8">Find bedsitters within your budget</p>

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
                  <h4 className="text-lg font-semibold text-green-600 mb-2">KES 5,000 - 6,000/month (Ultra Budget)</h4>
                  <p className="text-gray-700 mb-2"><strong>Areas:</strong> Mwiki, Sunton, parts of Hunters</p>
                  <p className="text-gray-700 mb-2"><strong>Features:</strong> Basic single room, small kitchen corner, shared or basic bathroom, cement floor (some tiled), basic finishes, perimeter wall, watchman security, water tank (irregular supply common).</p>
                  <p className="text-gray-700"><strong>Best For:</strong> Students on tight budget, entry-level workers, first-time renters. Very basic but functional - prioritize security and water supply.</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-green-600 mb-2">KES 6,000 - 8,000/month (Budget Standard)</h4>
                  <p className="text-gray-700 mb-2"><strong>Areas:</strong> Mwiki, Clay City, Hunters, Sunton, Zimmerman</p>
                  <p className="text-gray-700 mb-2"><strong>Features:</strong> Single room with sitting/sleeping area, basic kitchen (sink, cooking space, small cabinet), private bathroom, tiled or cement floor, perimeter wall, water tank, electricity (prepaid), basic security.</p>
                  <p className="text-gray-700"><strong>Best For:</strong> Students, young professionals, singles. Good value - most popular price range in Kasarani.</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-green-600 mb-2">KES 8,000 - 10,000/month (Standard)</h4>
                  <p className="text-gray-700 mb-2"><strong>Areas:</strong> Clay City, Seasons, Zimmerman, Mwiki (newer estates)</p>
                  <p className="text-gray-700 mb-2"><strong>Features:</strong> Well-finished single room, tiled floor throughout, modern kitchen with cabinets, private bathroom with shower, gated compound, security guard, CCTV (some), reliable water supply, prepaid electricity.</p>
                  <p className="text-gray-700"><strong>Best For:</strong> Working professionals, those prioritizing security and finishes. Better quality construction and amenities.</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-green-600 mb-2">KES 10,000 - 12,000/month (Mid-Range)</h4>
                  <p className="text-gray-700 mb-2"><strong>Areas:</strong> Seasons, Clay City, premium Zimmerman estates</p>
                  <p className="text-gray-700 mb-2"><strong>Features:</strong> Spacious bedsitter, high-quality finishes, modern kitchen with ample cabinets, hot shower, gated estate with 24/7 security, CCTV cameras, reliable water and electricity, waste collection, well-maintained compound.</p>
                  <p className="text-gray-700"><strong>Best For:</strong> Professionals seeking quality at affordable price, couples, those prioritizing comfort and security.</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-green-600 mb-2">KES 12,000+/month (Premium Bedsitters)</h4>
                  <p className="text-gray-700 mb-2"><strong>Areas:</strong> Select estates in Seasons, Clay City, Zimmerman</p>
                  <p className="text-gray-700 mb-2"><strong>Features:</strong> Large bedsitter (studio-style), premium finishes, modern appliances, spacious bathroom with hot shower, balcony (some), gated estate with excellent security, backup water, parking available, landscaped compound.</p>
                  <p className="text-gray-700"><strong>Best For:</strong> Young professionals wanting premium quality without CBD prices. Best Kasarani can offer.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Areas Section */}
      <section id="areas" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Top 6 Areas for Bedsitters in Kasarani</h2>
            <p className="text-center text-gray-600 mb-8">Detailed profiles of Kasarani's bedsitter hotspots</p>

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
                      View {neighborhood.name} Bedsitters
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
            <h2 className="text-3xl font-bold mb-8 text-center">Complete Kasarani Bedsitter Rental Guide</h2>

            <div className="space-y-8">
              {/* Budget Planning */}
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <Wallet className="h-8 w-8 text-green-600" />
                  <h3 className="text-2xl font-bold">Complete Budget Breakdown for Kasarani Living</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Upfront Costs (First Month):</h4>
                    <ul className="space-y-1 text-gray-700 text-sm ml-4">
                      <li>• Deposit: KES 5,000-10,000 (1 month rent)</li>
                      <li>• Advance Rent: KES 5,000-10,000 (1 month)</li>
                      <li>• Agent Commission: KES 2,500-10,000 (0.5-1 month, if using agent)</li>
                      <li>• <strong>Total Upfront: KES 12,500-30,000</strong></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Monthly Recurring Costs:</h4>
                    <ul className="space-y-1 text-gray-700 text-sm ml-4">
                      <li>• Rent: KES 5,000-12,000</li>
                      <li>• Electricity: KES 500-1,500 (prepaid tokens)</li>
                      <li>• Water: KES 200-600 (if not included)</li>
                      <li>• Garbage: KES 100-300</li>
                      <li>• Security fee: KES 200-500 (some estates)</li>
                      <li>• <strong>Total Housing: KES 6,000-15,000/month</strong></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Additional Monthly Expenses:</h4>
                    <ul className="space-y-1 text-gray-700 text-sm ml-4">
                      <li>• Food/Groceries: KES 4,000-8,000 (cooking at home)</li>
                      <li>• Transport (to CBD): KES 3,000-6,000 (matatu daily commute)</li>
                      <li>• Internet/Data: KES 1,000-2,000 (mobile data or WiFi)</li>
                      <li>• Personal care: KES 1,000-2,000</li>
                      <li>• Entertainment: KES 1,000-3,000</li>
                      <li>• <strong>Total Monthly Budget: KES 16,000-36,000</strong></li>
                    </ul>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg border border-green-200 mt-4">
                    <p className="text-sm text-green-800"><strong>Budget Tip:</strong> Minimum recommended monthly income to comfortably rent in Kasarani: <strong>KES 20,000-25,000</strong> (rent should be max 30-40% of income).</p>
                  </div>
                </div>
              </div>

              {/* Rental Process */}
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <FileCheck className="h-8 w-8 text-green-600" />
                  <h3 className="text-2xl font-bold">How to Rent a Bedsitter in Kasarani (10 Steps)</h3>
                </div>

                <ol className="space-y-3 list-decimal list-inside text-gray-700 text-sm">
                  <li className="font-semibold">Calculate Your Budget
                    <p className="ml-6 mt-1 font-normal">Total upfront costs + monthly expenses. Ensure you can afford 3x monthly rent upfront.</p>
                  </li>
                  <li className="font-semibold">Search Online Listings
                    <p className="ml-6 mt-1 font-normal">Browse NewKenyan.com, filter by price (KES 5K-12K) and area. Shortlist 5-8 bedsitters.</p>
                  </li>
                  <li className="font-semibold">Contact Landlords/Agents
                    <p className="ml-6 mt-1 font-normal">WhatsApp or call. Ask about water supply, security, move-in costs. Schedule viewings.</p>
                  </li>
                  <li className="font-semibold">Visit Properties in Person
                    <p className="ml-6 mt-1 font-normal">NEVER pay before viewing. Visit during daytime. Check multiple options same day.</p>
                  </li>
                  <li className="font-semibold">Inspect Thoroughly
                    <p className="ml-6 mt-1 font-normal">Test water pressure, check electricity, inspect bathroom/toilet, check locks, assess security, ask current tenants about issues.</p>
                  </li>
                  <li className="font-semibold">Negotiate Price
                    <p className="ml-6 mt-1 font-normal">Request KES 500-1,000 discount. Offer longer lease. Try to waive/reduce agent commission.</p>
                  </li>
                  <li className="font-semibold">Review Agreement
                    <p className="ml-6 mt-1 font-normal">Read tenancy agreement. Confirm rent, deposit terms, notice period, water/electricity arrangement.</p>
                  </li>
                  <li className="font-semibold">Make Payment
                    <p className="ml-6 mt-1 font-normal">M-Pesa or bank transfer preferred. Get official receipt with landlord details. Keep all receipts.</p>
                  </li>
                  <li className="font-semibold">Document Condition
                    <p className="ml-6 mt-1 font-normal">Take photos before moving furniture. Note existing damages. Share with landlord.</p>
                  </li>
                  <li className="font-semibold">Move In & Settle
                    <p className="ml-6 mt-1 font-normal">Buy prepaid electricity tokens, confirm water schedule, meet caretaker, exchange neighbor contacts.</p>
                  </li>
                </ol>
              </div>

              {/* Safety Tips */}
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="h-8 w-8 text-green-600" />
                  <h3 className="text-2xl font-bold">Safety & Security Tips for Kasarani</h3>
                </div>

                <div className="space-y-3 text-gray-700 text-sm">
                  <p className="font-semibold text-gray-800">Kasarani requires extra security awareness. Follow these tips:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Choose Secure Buildings:</strong> Prioritize gated compounds with security guards and CCTV cameras over standalone plots.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Avoid Ground Floor:</strong> Upper floors (1st or 2nd) are safer from break-ins. Ensure windows have grills.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Night Safety:</strong> Don't walk alone after 9pm. Use boda boda or Uber. Stick to main roads.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Secure Your Room:</strong> Install additional padlocks. Keep valuables hidden. Lock doors/windows always.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Know Your Neighbors:</strong> Build community. Exchange contacts. Join estate WhatsApp groups for security alerts.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Avoid Displaying Wealth:</strong> Don't flash expensive phones/items openly. Keep low profile.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Emergency Contacts:</strong> Save nearest police station, hospital, landlord, caretaker numbers.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Internal Linking Section - Browse by Location */}
      <section className="py-12 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Browse Bedsitters by Location</h2>
            <p className="text-center text-gray-600 mb-8">Explore affordable bedsitters and studio apartments across Kenya</p>

            {/* By County */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Bedsitters by County</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                <Link href="/bedsitters-for-rent/nairobi-county" className="px-4 py-2 bg-gray-100 hover:bg-green-50 hover:text-green-600 rounded-lg text-center transition-colors border border-gray-200 hover:border-green-500">
                  Nairobi
                </Link>
                <Link href="/bedsitters-for-rent/kiambu-county" className="px-4 py-2 bg-gray-100 hover:bg-green-50 hover:text-green-600 rounded-lg text-center transition-colors border border-gray-200 hover:border-green-500">
                  Kiambu
                </Link>
                <Link href="/bedsitters-for-rent/machakos-county" className="px-4 py-2 bg-gray-100 hover:bg-green-50 hover:text-green-600 rounded-lg text-center transition-colors border border-gray-200 hover:border-green-500">
                  Machakos
                </Link>
                <Link href="/bedsitters-for-rent/kajiado-county" className="px-4 py-2 bg-gray-100 hover:bg-green-50 hover:text-green-600 rounded-lg text-center transition-colors border border-gray-200 hover:border-green-500">
                  Kajiado
                </Link>
                <Link href="/bedsitters-for-rent/mombasa-county" className="px-4 py-2 bg-gray-100 hover:bg-green-50 hover:text-green-600 rounded-lg text-center transition-colors border border-gray-200 hover:border-green-500">
                  Mombasa
                </Link>
                <Link href="/bedsitters-for-rent/nakuru-county" className="px-4 py-2 bg-gray-100 hover:bg-green-50 hover:text-green-600 rounded-lg text-center transition-colors border border-gray-200 hover:border-green-500">
                  Nakuru
                </Link>
              </div>
            </div>

            {/* Popular Nairobi Areas for Bedsitters */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Popular Nairobi Areas for Bedsitters</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                <Link href="/bedsitter-nairobi" className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 rounded-lg text-center transition-colors border border-green-200 hover:border-green-500 font-medium">
                  Nairobi (All Areas)
                </Link>
                <Link href="/bedsitters-for-rent/kahawa" className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 rounded-lg text-center transition-colors border border-green-200 hover:border-green-500 font-medium">
                  Kahawa
                </Link>
                <Link href="/bedsitters-for-rent/zimmerman" className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 rounded-lg text-center transition-colors border border-green-200 hover:border-green-500 font-medium">
                  Zimmerman
                </Link>
                <Link href="/bedsitters-for-rent/roysambu" className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 rounded-lg text-center transition-colors border border-green-200 hover:border-green-500 font-medium">
                  Roysambu
                </Link>
                <Link href="/bedsitters-for-rent/githurai" className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 rounded-lg text-center transition-colors border border-green-200 hover:border-green-500 font-medium">
                  Githurai
                </Link>
              </div>
            </div>

            {/* Budget-Friendly Nairobi Areas */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Budget-Friendly Areas (Under KES 8K)</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                <Link href="/bedsitters-for-rent/ruiru" className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 rounded-lg text-center transition-colors border border-blue-200 hover:border-blue-500">
                  Ruiru
                </Link>
                <Link href="/bedsitters-for-rent/juja" className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 rounded-lg text-center transition-colors border border-blue-200 hover:border-blue-500">
                  Juja
                </Link>
                <Link href="/bedsitters-for-rent/ngong" className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 rounded-lg text-center transition-colors border border-blue-200 hover:border-blue-500">
                  Ngong
                </Link>
                <Link href="/bedsitters-for-rent/rongai" className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 rounded-lg text-center transition-colors border border-blue-200 hover:border-blue-500">
                  Rongai
                </Link>
                <Link href="/bedsitters-for-rent/syokimau" className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 rounded-lg text-center transition-colors border border-blue-200 hover:border-blue-500">
                  Syokimau
                </Link>
              </div>
            </div>

            {/* Related Property Searches */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Related Property Searches</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <Link href="/cheap-apartments-nairobi" className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-center transition-colors border border-gray-300 hover:border-gray-500">
                  Cheap Apartments Nairobi
                </Link>
                <Link href="/apartments-for-rent-nairobi" className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-center transition-colors border border-gray-300 hover:border-gray-500">
                  1 Bedroom Apartments
                </Link>
                <Link href="/2-bedroom-apartment-nairobi" className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-center transition-colors border border-gray-300 hover:border-gray-500">
                  2 Bedroom Apartments
                </Link>
                <Link href="/apartments-westlands" className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-center transition-colors border border-gray-300 hover:border-gray-500">
                  Westlands Apartments
                </Link>
                <Link href="/apartments-kilimani" className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-center transition-colors border border-gray-300 hover:border-gray-500">
                  Kilimani Apartments
                </Link>
                <Link href="/3-bedroom-house-for-rent" className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-center transition-colors border border-gray-300 hover:border-gray-500">
                  3 Bedroom Houses
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

      {/* Trust Signals */}
      <section className="py-12 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Why Choose NewKenyan.com?</h2>

            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <Award className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">13+ Awards</h3>
                <p className="text-sm text-gray-600">Industry excellence</p>
              </div>

              <div>
                <Shield className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">8+ Years</h3>
                <p className="text-sm text-gray-600">Trusted experts</p>
              </div>

              <div>
                <Users className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Agency Partnerships</h3>
                <p className="text-sm text-gray-600">Partnering with trusted agencies</p>
              </div>

              <div>
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Verified Listings</h3>
                <p className="text-sm text-gray-600">All properties vetted</p>
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
