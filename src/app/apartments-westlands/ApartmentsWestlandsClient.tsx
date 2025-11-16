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
  BadgeCheck, FileCheck, HeartHandshake, Scale, ShoppingBag, Train, Briefcase
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

export default function ApartmentsWestlandsClient() {
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
        .eq('price_type', 'rent')
        .ilike('city', '%westlands%')
        .ilike('property_type', '%apartment%')
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (selectedBedrooms !== 'all') {
        if (selectedBedrooms === '0') {
          query = query.eq('bedrooms', 0);
        } else {
          query = query.eq('bedrooms', parseInt(selectedBedrooms));
        }
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

      // Fallback: If no properties found, show any rental properties in Nairobi
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

  const bedroomOptions = [
    { value: 'all', label: 'All Bedrooms', count: '600+' },
    { value: '0', label: 'Studio', count: '120+' },
    { value: '1', label: '1 Bedroom', count: '200+' },
    { value: '2', label: '2 Bedroom', count: '180+' },
    { value: '3', label: '3 Bedroom', count: '100+' }
  ];

  const priceRanges = [
    { value: 'all', label: 'All Prices', description: 'Browse all listings' },
    { value: '0-35000', label: 'KES 25K - 35K', description: 'Budget studios' },
    { value: '35000-60000', label: 'KES 35K - 60K', description: '1BR apartments' },
    { value: '60000-90000', label: 'KES 60K - 90K', description: '2BR apartments' },
    { value: '90000-150000', label: 'KES 90K - 150K', description: 'Premium 2-3BR' },
    { value: '150000', label: 'KES 150K+', description: 'Luxury penthouses' }
  ];

  const subLocations = [
    {
      name: 'Parklands/Highridge',
      avgPrice: 'KES 30,000 - 70,000',
      description: 'Diverse neighborhood mixing residential and commercial. Popular with young professionals and families. Good value apartments with easy access to Westlands business district.',
      bestFor: 'Budget-conscious professionals, small families',
      transport: 'Matatu routes, Uber, walking distance to Westlands',
      link: '/apartments-for-rent/nairobi-county?city=Parklands'
    },
    {
      name: 'Westlands CBD',
      avgPrice: 'KES 50,000 - 120,000',
      description: 'Heart of Westlands with modern high-rise apartments. Walk to offices, malls (Sarit Centre, The Mall), restaurants, and nightlife. Ideal for professionals seeking convenience.',
      bestFor: 'Young professionals, expatriates, entrepreneurs',
      transport: 'Walking distance to most amenities, Uber readily available',
      link: '/apartments-for-rent/nairobi-county?city=Westlands'
    },
    {
      name: 'Lower Kabete/Uthiru',
      avgPrice: 'KES 25,000 - 50,000',
      description: 'Quiet residential area on the outskirts of Westlands. Affordable apartments with spacious layouts. Popular with families and students near University of Nairobi.',
      bestFor: 'Families, students, budget seekers',
      transport: 'Matatu routes to Westlands and CBD',
      link: '/apartments-for-rent/nairobi-county?city=Kabete'
    },
    {
      name: 'Kangemi/Mountain View',
      avgPrice: 'KES 20,000 - 40,000',
      description: 'Developing area with newer apartment complexes. Budget-friendly option close to Westlands. Growing infrastructure and amenities.',
      bestFor: 'Young professionals, couples on budget',
      transport: 'Matatus, boda bodas, 10-15 min to Westlands',
      link: '/apartments-for-rent/nairobi-county?city=Kangemi'
    },
    {
      name: 'Westlands/Spring Valley Border',
      avgPrice: 'KES 80,000 - 200,000',
      description: 'Premium neighborhood with luxury apartments and penthouses. Gated complexes with gyms, pools, and 24/7 security. Close to international schools and diplomatic areas.',
      bestFor: 'Executives, expatriates, affluent professionals',
      transport: 'Private vehicles, Uber, secure rideshare',
      link: '/apartments-for-rent/nairobi-county?city=Spring+Valley'
    }
  ];

  const faqData = [
    {
      question: "What is the average rent for apartments in Westlands in 2025?",
      answer: "Average rent for <a href='/apartments-westlands' class='text-green-600 hover:underline'>apartments in Westlands</a> varies by bedroom count: <strong>Studios:</strong> KES 25,000-45,000/month, <strong>1 Bedroom:</strong> KES 35,000-70,000/month, <strong>2 Bedroom:</strong> KES 60,000-110,000/month, <strong>3 Bedroom:</strong> KES 90,000-180,000/month. Premium serviced apartments and penthouses command KES 150,000-350,000/month. Prices vary based on building amenities, parking, and proximity to Sarit Centre or The Mall Westlands."
    },
    {
      question: "Why is Westlands a popular area for apartments in Nairobi?",
      answer: "<a href='/apartments-westlands' class='text-green-600 hover:underline'>Westlands</a> is Nairobi's premier business and lifestyle hub. Benefits include: Walking distance to offices (reducing commute stress), Premium shopping malls (Sarit Centre, The Mall Westlands, Westgate), Diverse restaurants, cafes, and nightlife, International schools and hospitals nearby, Excellent public transport links, Modern apartments with amenities (gym, pool, parking), Safe and well-lit streets, and Cosmopolitan community (Kenyans and expatriates)."
    },
    {
      question: "What amenities should I expect in a Westlands apartment?",
      answer: "Standard amenities in <strong>Westlands apartments</strong> include: Secure parking (covered or basement), 24/7 security with CCTV, Backup water supply and generator, Modern kitchen with cabinets, Wardrobes in bedrooms, and Perimeter wall/gated access. <strong>Mid to high-end apartments add:</strong> Swimming pool, Gym/fitness center, Elevator access, High-speed internet ready, Backup generator (whole building), Intercom system, and On-site management/caretaker. <strong>Luxury apartments feature:</strong> Concierge services, Rooftop terraces, Smart home technology, Premium appliances, and Parking for 2+ vehicles."
    },
    {
      question: "Are utilities included in Westlands apartment rent?",
      answer: "Typically <strong>NO</strong>. Most Westlands apartments charge utilities separately. Monthly utility costs: <strong>Electricity:</strong> KES 2,000-6,000 (depending on usage, AC increases costs), <strong>Water:</strong> KES 800-2,000, <strong>Internet:</strong> KES 3,000-6,000 (fiber), <strong>Service charge:</strong> KES 2,000-8,000 (covers security, garbage, common area maintenance), <strong>DSTV/Zuku (optional):</strong> KES 1,500-4,000. Budget an extra KES 8,000-20,000/month for utilities. Some serviced apartments include utilities in rent - confirm before signing."
    },
    {
      question: "How much deposit is required for a Westlands apartment?",
      answer: "Standard deposit structure in Westlands: <strong>1-2 months rent</strong> (refundable deposit), <strong>1 month rent</strong> (advance rent), <strong>1 month rent</strong> (agent commission if applicable). Total upfront: <strong>3-4 months' rent</strong>. Example for KES 60,000/month 2BR: Pay KES 180,000-240,000 upfront. Premium apartments may require 2-3 months deposit. Negotiate commission waiver if dealing directly with landlord. Some landlords accept staggered deposit payments."
    },
    {
      question: "Is parking available for apartments in Westlands?",
      answer: "Most Westlands apartments include <strong>at least 1 parking bay</strong>. Parking options: <strong>Open/uncovered:</strong> Usually included in rent, <strong>Covered/basement parking:</strong> May cost extra KES 2,000-5,000/month, <strong>Visitor parking:</strong> Available in most complexes, <strong>Additional parking:</strong> KES 3,000-8,000/month per extra bay. In Westlands CBD, parking is premium due to space constraints. Confirm parking allocation before signing lease. Street parking is limited and risky."
    },
    {
      question: "What is the best time to find apartments in Westlands?",
      answer: "Optimal rental periods: <strong>March-May:</strong> Off-peak season, better negotiation leverage, more inventory. <strong>September-November:</strong> Post-holiday period, landlords eager to fill vacancies. <strong>Avoid December-January:</strong> Peak demand (job changes, expatriate relocations), prices highest, limited selection. <strong>June-July:</strong> Moderate activity due to school transitions. Start searching <strong>1-2 months before</strong> your target move date. Westlands has high turnover, so new listings appear weekly."
    },
    {
      question: "Are Westlands apartments safe and secure?",
      answer: "Yes, Westlands is generally safe with good security infrastructure. Security features: Most apartments have 24/7 guards, CCTV, gated access, Well-lit streets and walkways, Active neighborhood watch programs, Police patrols (Parklands Police Station nearby). <strong>Safety tips:</strong> Choose apartments with visible security (guards, cameras), Avoid ground floor apartments for added security, Use Uber/taxi at night rather than walking, Keep valuables secure, Get to know neighbors and building management. Westlands CBD is safer than outskirts. Crime is low compared to other Nairobi areas."
    },
    {
      question: "Can I negotiate rent for apartments in Westlands?",
      answer: "Yes, negotiation is possible in Westlands. <strong>Best leverage:</strong> Long-term lease (2+ years) - request 10-15% discount, Paying 6-12 months upfront, Off-peak season (March-May, Sept-Nov), Apartment vacant for extended period, Minor repairs/updates needed, Bulk rental (if renting multiple units). <strong>Realistic discount:</strong> 5-10% off asking price. Landlords in older buildings more flexible than new developments. Negotiate service charges and parking fees too. Be professional and show proof of stable income."
    },
    {
      question: "What are the best malls and amenities near Westlands apartments?",
      answer: "Westlands offers <strong>excellent shopping and dining</strong>: <strong>Major Malls:</strong> Sarit Centre (largest, diverse shops, supermarkets, cinemas), The Mall Westlands (premium retail, restaurants, gym), Westgate Mall (shopping, dining, entertainment), ABC Place (offices, shops, cafes). <strong>Supermarkets:</strong> Carrefour, Naivas, Chandarana. <strong>Hospitals:</strong> The Nairobi Hospital Westlands, Aga Khan Hospital (nearby). <strong>Schools:</strong> Brookhouse School, Oshwal Academy, Braeburn. <strong>Restaurants:</strong> 100+ options (Italian, Indian, Chinese, local cuisine). Most apartments within 5-10 min walk to major malls."
    },
    {
      question: "Do Westlands apartments allow pets?",
      answer: "Pet policies vary by apartment complex. <strong>Generally:</strong> Many Westlands apartments allow small pets (cats, small dogs) with landlord approval and pet deposit (KES 5,000-15,000), Large dogs often restricted in high-rise buildings, Exotic pets typically prohibited. <strong>Before renting:</strong> Confirm pet policy in writing in tenancy agreement, Pay required pet deposit (usually refundable), Provide vaccination records, Agree to damage liability. Ground floor or low-rise apartments more pet-friendly. Some luxury complexes have designated pet areas."
    },
    {
      question: "What documents do I need to rent a Westlands apartment?",
      answer: "Required documents: <strong>Identification:</strong> Copy of National ID or Passport (2 copies), 2-3 passport photos. <strong>Financial proof:</strong> 3 recent payslips or employment letter, Bank statements (3-6 months), KRA PIN certificate. <strong>References:</strong> Current landlord reference letter (if applicable), Employer reference. <strong>Additional (some landlords):</strong> Good Conduct Certificate, Guarantor details with ID copy. Have documents ready to speed up application. Competitive market means fast decision-making wins apartments."
    },
    {
      question: "Are serviced apartments available in Westlands?",
      answer: "Yes, Westlands has numerous <strong>serviced apartment options</strong> ideal for short/long stays. <strong>Features:</strong> Fully furnished (furniture, appliances, kitchenware), Utilities included (electricity, water, internet, DSTV), Weekly housekeeping and linen change, 24/7 concierge and security, Gym and pool access, No long-term commitment (daily, weekly, monthly rates). <strong>Cost:</strong> KES 4,000-15,000/night or KES 80,000-250,000/month depending on size and luxury level. <strong>Best for:</strong> Expatriates, business travelers, relocating families, short-term stays. Popular providers: Airbnb hosts, Oakwood, Azalea."
    },
    {
      question: "What is the commute like from Westlands to Nairobi CBD?",
      answer: "<strong>Commute options from Westlands to CBD:</strong> <strong>Matatu:</strong> 15-30 minutes (KES 50-100), frequent routes via Waiyaki Way or Uhuru Highway. <strong>Uber/Bolt:</strong> 20-40 minutes (KES 400-800 depending on traffic), convenient door-to-door. <strong>Personal car:</strong> 20-45 minutes depending on traffic (peak 7-9am, 5-7pm congested). <strong>Boda boda:</strong> 15-25 minutes (KES 150-300), faster in traffic but riskier. <strong>Tip:</strong> Living in Westlands means many work in the area, avoiding CBD commute altogether. Morning rush hour can be challenging on Waiyaki Way."
    },
    {
      question: "Can I sublet my Westlands apartment?",
      answer: "Subletting requires <strong>written landlord permission</strong>. <strong>Process:</strong> Request approval in writing (email/letter), Landlord may charge admin fee (KES 5,000-10,000), You remain legally responsible for rent and property, Screen subtenants carefully (verify income, references), Draft sublease agreement. <strong>Important:</strong> Unauthorized subletting = grounds for eviction and deposit forfeiture. Many Westlands landlords prohibit subletting due to security concerns. If you need flexibility, negotiate subletting clause before signing main lease. Airbnb subletting typically prohibited unless explicitly allowed."
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
              <span className="text-green-100 font-medium">600+ Verified Listings in Westlands</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Apartments in Westlands Nairobi 2025
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-50">
              Modern apartments from KES 25,000/month in Nairobi's premier business & lifestyle hub
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-green-200" />
                <span>Near Sarit Centre</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-green-200" />
                <span>Business District</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-200" />
                <span>24/7 Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-green-200" />
                <span>Premium Amenities</span>
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
            <a href="#sub-locations" className="text-sm font-medium hover:text-green-600 whitespace-nowrap">Sub-Locations</a>
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
              Latest Apartments in Westlands
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
                    <Link href="/apartments-for-rent/nairobi-county?city=Westlands">
                      View All {properties.length} Apartments in Westlands →
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
                <Link href="/apartments-for-rent/nairobi-county?city=Westlands">Browse All Properties</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Find Your Perfect Apartment in Westlands - 2025 Complete Guide</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Looking for <strong>apartments in Westlands</strong>? You're in the right place. NewKenyan.com offers <strong>600+ verified apartment listings</strong> in Westlands, Nairobi's most dynamic neighborhood combining business, lifestyle, and convenience. From budget-friendly studios to luxury penthouses, find your ideal home in Kenya's premier urban center.
              </p>
              <p>
                <strong>Why Westlands?</strong> Westlands has evolved into Nairobi's most cosmopolitan neighborhood, attracting young professionals, expatriates, and families seeking the ultimate urban lifestyle. With world-class shopping malls (Sarit Centre, The Mall Westlands, Westgate), hundreds of restaurants, international offices, and excellent transport links, Westlands offers unparalleled convenience. Our 8+ years of real estate experience and partnerships with <Link href="/real-estate-companies-in-kenya" className="text-green-600 hover:underline font-semibold">many real estate agencies in Kenya</Link> ensure you find verified, high-quality apartments.
              </p>
              <p>
                <strong>2025 Market Trends:</strong> Westlands apartment market remains competitive with steady demand from professionals working in the area. Studios and 1-bedroom apartments (KES 25,000-70,000/month) are highly sought after by young professionals and couples. 2-bedroom units (KES 60,000-110,000/month) attract small families and sharers. Luxury 3-bedroom penthouses (KES 150,000-350,000/month) cater to executives and expatriates. New developments along <Link href="/apartments-for-rent/nairobi-county?city=Parklands" className="text-green-600 hover:underline">Parklands Road</Link> and <Link href="/apartments-for-rent/nairobi-county?city=Westlands" className="text-green-600 hover:underline">Mpaka Road</Link> offer modern amenities including gyms, pools, and basement parking.
              </p>
              <p>
                Whether you're relocating for work, seeking a vibrant social scene, or want to eliminate your daily commute, this comprehensive guide covers everything about renting apartments in Westlands - from price breakdowns and sub-location comparisons to legal tips and lifestyle insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Price Range Section */}
      <section id="price-ranges" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Westlands Apartment Price Ranges (2025)</h2>
            <p className="text-center text-gray-600 mb-8">Find apartments within your budget</p>

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
                  <h4 className="text-lg font-semibold text-green-600 mb-2">KES 25,000 - 35,000/month (Budget Studios)</h4>
                  <p className="text-gray-700 mb-2"><strong>Areas:</strong> Kangemi, Lower Parklands, Uthiru, Mountain View</p>
                  <p className="text-gray-700 mb-2"><strong>Features:</strong> Studio/bedsitter, basic kitchen, shared or single bathroom, open/limited parking, perimeter security, water tank, older buildings (5-15 years).</p>
                  <p className="text-gray-700"><strong>Best For:</strong> Students, entry-level professionals, singles on tight budget. Expect basic amenities but good location access to Westlands.</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-green-600 mb-2">KES 35,000 - 60,000/month (1 Bedroom Standard)</h4>
                  <p className="text-gray-700 mb-2"><strong>Areas:</strong> Parklands, Highridge, Lower Westlands CBD</p>
                  <p className="text-gray-700 mb-2"><strong>Features:</strong> 1 bedroom with en-suite bathroom, separate kitchen, living area, 1 parking bay, 24/7 security, backup water, modern finishes, elevator (in most), gym (some buildings).</p>
                  <p className="text-gray-700"><strong>Best For:</strong> Young professionals, couples, individuals working in Westlands. Good balance of price and amenities.</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-green-600 mb-2">KES 60,000 - 90,000/month (2 Bedroom Standard)</h4>
                  <p className="text-gray-700 mb-2"><strong>Areas:</strong> Westlands CBD, Parklands, Mpaka Road</p>
                  <p className="text-gray-700 mb-2"><strong>Features:</strong> 2 bedrooms (master en-suite), guest toilet, spacious living/dining, modern kitchen with cabinets, 1-2 parking bays, elevator, gym, backup generator and water, CCTV, intercom.</p>
                  <p className="text-gray-700"><strong>Best For:</strong> Small families, sharers (roommates), mid-level professionals. Close to malls and offices.</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-green-600 mb-2">KES 90,000 - 150,000/month (Premium 2-3BR)</h4>
                  <p className="text-gray-700 mb-2"><strong>Areas:</strong> Westlands CBD (prime), Spring Valley border, Rhapta Road</p>
                  <p className="text-gray-700 mb-2"><strong>Features:</strong> Spacious 2-3 bedrooms (all en-suite), DSQ (some units), high-end finishes, modern appliances, swimming pool, well-equipped gym, covered/basement parking (2 bays), 24/7 concierge, children's play area.</p>
                  <p className="text-gray-700"><strong>Best For:</strong> Established families, senior professionals, expatriates. Premium lifestyle with full amenities.</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-green-600 mb-2">KES 150,000+/month (Luxury Penthouses)</h4>
                  <p className="text-gray-700 mb-2"><strong>Areas:</strong> Westlands CBD (luxury towers), Spring Valley, Runda Mumwe</p>
                  <p className="text-gray-700 mb-2"><strong>Features:</strong> 3-4 bedroom penthouses, private terraces/balconies, premium appliances (dishwasher, wine cooler), smart home technology, concierge services, rooftop access, multiple parking bays, swimming pool, sauna/steam room, business center.</p>
                  <p className="text-gray-700"><strong>Best For:</strong> Executives, diplomats, high net worth individuals. Ultra-modern living with maximum luxury and convenience.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-Locations Section */}
      <section id="sub-locations" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Westlands Sub-Locations Guide</h2>
            <p className="text-center text-gray-600 mb-8">Find the perfect neighborhood within Westlands</p>

            <div className="space-y-6">
              {subLocations.map((location) => (
                <div key={location.name} className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-green-500 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-green-600">{location.name}</h3>
                      <p className="text-lg font-semibold text-gray-700">{location.avgPrice}</p>
                    </div>
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>

                  <p className="text-gray-700 mb-4">{location.description}</p>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-600">Best For:</p>
                      <p className="text-sm text-gray-700">{location.bestFor}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600">Transport:</p>
                      <p className="text-sm text-gray-700">{location.transport}</p>
                    </div>
                  </div>

                  <Link href={location.link}>
                    <Button className="w-full md:w-auto">
                      View {location.name} Listings
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
            <h2 className="text-3xl font-bold mb-8 text-center">Complete Guide to Renting Apartments in Westlands</h2>

            <div className="space-y-8">
              {/* Step-by-Step Process */}
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <FileCheck className="h-8 w-8 text-green-600" />
                  <h3 className="text-2xl font-bold">Step-by-Step Rental Process</h3>
                </div>

                <ol className="space-y-4 list-decimal list-inside text-gray-700">
                  <li className="font-semibold">Define Your Budget & Needs
                    <p className="ml-6 mt-2 font-normal">Calculate total upfront costs (3-4 months' rent) and monthly utilities (KES 8,000-20,000). Prioritize: proximity to work/school, apartment size, parking needs, amenities (gym, pool), building age/condition.</p>
                  </li>
                  <li className="font-semibold">Search Verified Listings
                    <p className="ml-6 mt-2 font-normal">Browse NewKenyan.com's Westlands apartments, filter by bedrooms and price. Shortlist 5-7 properties. Check photos, amenities, and location on map. Read reviews if available.</p>
                  </li>
                  <li className="font-semibold">Contact Landlords/Agents
                    <p className="ml-6 mt-2 font-normal">WhatsApp or call to schedule viewings. Ask about: total upfront costs, included amenities, parking allocation, pet policy, lease duration flexibility. Book viewings for weekdays if possible.</p>
                  </li>
                  <li className="font-semibold">Inspect Properties Thoroughly
                    <p className="ml-6 mt-2 font-normal">Check: Water pressure and plumbing, Electrical outlets and lighting, Kitchen appliances and cabinets, Bathroom fixtures, Door/window locks and security grills, Parking bay condition, Building elevator and common areas, Noise levels from neighbors/street.</p>
                  </li>
                  <li className="font-semibold">Verify Ownership & Legitimacy
                    <p className="ml-6 mt-2 font-normal">Request landlord ID and title deed. Verify agent registration with EARB if using agent. Search property at Land Registry (KES 500). Confirm building has necessary approvals.</p>
                  </li>
                  <li className="font-semibold">Negotiate Terms
                    <p className="ml-6 mt-2 font-normal">Negotiate rent (5-10% possible), service charges, parking fees, minor repairs/painting. Best leverage: long lease, off-peak season, upfront payment. Be professional and show financial stability.</p>
                  </li>
                  <li className="font-semibold">Review Tenancy Agreement
                    <p className="ml-6 mt-2 font-normal">Read entire agreement. Key clauses: rent amount and due date, deposit refund terms, notice period, maintenance responsibilities, subletting policy, parking allocation, service charge breakdown. Seek legal advice if unsure.</p>
                  </li>
                  <li className="font-semibold">Make Payments Securely
                    <p className="ml-6 mt-2 font-normal">Pay via bank transfer (never cash). Typical: 1-2 months deposit + 1 month advance + 1 month commission = 3-4 months total. Get official receipts for ALL payments with landlord's KRA PIN.</p>
                  </li>
                  <li className="font-semibold">Document Move-In Condition
                    <p className="ml-6 mt-2 font-normal">Take photos/videos of entire apartment before moving furniture. Note existing damages in writing. Share with landlord/agent. This protects your deposit at move-out.</p>
                  </li>
                  <li className="font-semibold">Set Up Utilities & Services
                    <p className="ml-6 mt-2 font-normal">Register KPLC meter (if required), arrange internet installation (Safaricom, Zuku, Jamii), set up water/service charge payments, exchange contacts with caretaker and neighbors, join building WhatsApp group if available.</p>
                  </li>
                </ol>
              </div>

              {/* Westlands Lifestyle Benefits */}
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <ShoppingBag className="h-8 w-8 text-green-600" />
                  <h3 className="text-2xl font-bold">Westlands Lifestyle & Amenities</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Shopping & Malls:</h4>
                    <ul className="space-y-1 text-gray-700 text-sm ml-4">
                      <li>• <strong>Sarit Centre:</strong> Nairobi's largest mall - Carrefour, Game, 100+ shops, cinemas, restaurants</li>
                      <li>• <strong>The Mall Westlands:</strong> Premium shopping, Woolworths, international brands, rooftop restaurants</li>
                      <li>• <strong>Westgate Mall:</strong> Family-friendly, supermarkets, kids' play areas, diverse dining</li>
                      <li>• <strong>ABC Place:</strong> Professional offices, boutique shops, cafes</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Dining & Nightlife:</h4>
                    <ul className="space-y-1 text-gray-700 text-sm ml-4">
                      <li>• 100+ restaurants (Italian, Indian, Chinese, Japanese, Ethiopian, local cuisine)</li>
                      <li>• Popular spots: Artcaffe, Java House, Sailor's Lounge, K'Osewe Ranalo Foods</li>
                      <li>• Vibrant nightlife: clubs, bars, live music venues</li>
                      <li>• Street food and local eateries for budget dining</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Healthcare & Education:</h4>
                    <ul className="space-y-1 text-gray-700 text-sm ml-4">
                      <li>• <strong>Hospitals:</strong> The Nairobi Hospital Westlands, Aga Khan Hospital (10 min), MP Shah</li>
                      <li>• <strong>International Schools:</strong> Brookhouse, Oshwal Academy, Braeburn (nearby)</li>
                      <li>• <strong>Universities:</strong> University of Nairobi (Parklands campus), Strathmore (nearby)</li>
                      <li>• Numerous private clinics, pharmacies, dental centers</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Transport & Connectivity:</h4>
                    <ul className="space-y-1 text-gray-700 text-sm ml-4">
                      <li>• <strong>To CBD:</strong> 15-30 min matatu, 20-40 min Uber/car (traffic dependent)</li>
                      <li>• <strong>To Airport:</strong> 30-50 min via Waiyaki Way or Southern Bypass</li>
                      <li>• Excellent matatu routes along Waiyaki Way and Uhuru Highway</li>
                      <li>• Uber/Bolt readily available 24/7</li>
                      <li>• Walkable neighborhood - most amenities within 10-15 min walk</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Legal Considerations */}
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <Scale className="h-8 w-8 text-green-600" />
                  <h3 className="text-2xl font-bold">Tenant Rights & Legal Tips</h3>
                </div>

                <div className="space-y-3 text-gray-700">
                  <p><strong>Landlord and Tenant Act 2021</strong> protects renters:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Written Agreement Mandatory:</strong> All rentals must have signed written agreements.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Maximum Deposit:</strong> 2 months' rent. Refundable within 30 days less legitimate deductions.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Rent Increases:</strong> Require 3 months written notice. Typically capped at 10% annually.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Eviction Protection:</strong> Landlord needs court order to evict. Cannot change locks or forcibly remove tenant.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Privacy Rights:</strong> Landlord must give 24-48 hours notice before property visits (except emergencies).</span>
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
            <h2 className="text-3xl font-bold mb-4 text-center">Browse Apartments by Location</h2>
            <p className="text-center text-gray-600 mb-8">Explore apartments in other premium neighborhoods and counties across Kenya</p>

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
                <Link href="/apartments-kilimani" className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 rounded-lg text-center transition-colors border border-green-200 hover:border-green-500 font-medium">
                  Kilimani
                </Link>
                <Link href="/apartments-for-rent/lavington" className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 rounded-lg text-center transition-colors border border-green-200 hover:border-green-500 font-medium">
                  Lavington
                </Link>
                <Link href="/apartments-for-rent/parklands" className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 rounded-lg text-center transition-colors border border-green-200 hover:border-green-500 font-medium">
                  Parklands
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
                <Link href="/apartments-for-rent/ngong" className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 rounded-lg text-center transition-colors border border-blue-200 hover:border-blue-500">
                  Ngong
                </Link>
                <Link href="/apartments-for-rent/ruiru" className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 rounded-lg text-center transition-colors border border-blue-200 hover:border-blue-500">
                  Ruiru
                </Link>
                <Link href="/apartments-for-rent/kasarani" className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 rounded-lg text-center transition-colors border border-blue-200 hover:border-blue-500">
                  Kasarani
                </Link>
                <Link href="/apartments-for-rent/kahawa" className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 rounded-lg text-center transition-colors border border-blue-200 hover:border-blue-500">
                  Kahawa
                </Link>
                <Link href="/apartments-for-rent/rongai" className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 rounded-lg text-center transition-colors border border-blue-200 hover:border-blue-500">
                  Rongai
                </Link>
              </div>
            </div>

            {/* Related Property Searches */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Related Property Searches</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <Link href="/apartments-for-rent-nairobi" className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-center transition-colors border border-gray-300 hover:border-gray-500">
                  All Nairobi Apartments
                </Link>
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
                <p className="text-sm text-gray-600">Industry-recognized excellence</p>
              </div>

              <div>
                <Shield className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">8+ Years</h3>
                <p className="text-sm text-gray-600">Trusted Nairobi property experts</p>
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
