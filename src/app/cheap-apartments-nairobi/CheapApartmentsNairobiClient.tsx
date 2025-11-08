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
  BadgeCheck, FileCheck, HeartHandshake, Scale, Wallet, PiggyBank
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

export default function CheapApartmentsNairobiClient() {
  const [properties, setProperties] = useState<PropertyListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [selectedBedrooms, setSelectedBedrooms] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  useEffect(() => {
    fetchProperties();
  }, [selectedArea, selectedBedrooms, selectedPriceRange]);

  const fetchProperties = async () => {
    try {
      setLoading(true);

      let query = supabase
        .from('property_listings')
        .select('*')
        .eq('is_approved', true)
        .eq('price_type', 'rent')
        .in('property_type', ['Apartment', 'Flat', 'Bedsitter', 'Studio'])
        .lte('price', 25000) // Only show apartments under KES 25,000
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (selectedArea !== 'all') {
        query = query.ilike('city', `%${selectedArea}%`);
      }

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

      // Fallback: If no properties found, show any cheap rental properties in Nairobi
      if (!data || data.length === 0) {
        const fallbackQuery = supabase
          .from('property_listings')
          .select('*')
          .eq('is_approved', true)
          .eq('price_type', 'rent')
          .ilike('city', '%nairobi%')
          .lte('price', 30000)
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
    { value: 'all', label: 'All Prices', description: 'Under KES 25K' },
    { value: '0-12000', label: 'Under KES 12K', description: 'Ultra budget' },
    { value: '12000-16000', label: 'KES 12K - 16K', description: 'Budget friendly' },
    { value: '16000-20000', label: 'KES 16K - 20K', description: 'Affordable' },
    { value: '20000-25000', label: 'KES 20K - 25K', description: 'Value range' }
  ];

  const budgetAreas = [
    { value: 'all', label: 'All Budget Areas', count: '1000+' },
    { value: 'Kasarani', label: 'Kasarani', count: '250+', avgPrice: 'KES 8,000' },
    { value: 'Rongai', label: 'Rongai', count: '200+', avgPrice: 'KES 10,000' },
    { value: 'Githurai', label: 'Githurai', count: '180+', avgPrice: 'KES 9,000' },
    { value: 'Kitengela', label: 'Kitengela', count: '150+', avgPrice: 'KES 12,000' },
    { value: 'Pipeline', label: 'Pipeline', count: '120+', avgPrice: 'KES 14,000' },
    { value: 'Kahawa', label: 'Kahawa West', count: '100+', avgPrice: 'KES 11,000' }
  ];

  const bedroomOptions = [
    { value: 'all', label: 'All Sizes' },
    { value: '0', label: 'Bedsitter/Studio' },
    { value: '1', label: '1 Bedroom' },
    { value: '2', label: '2 Bedroom' }
  ];

  const neighborhoods = [
    {
      name: 'Kasarani (Mwiki, Zimmerman)',
      avgPrice: 'KES 6,000 - 15,000',
      description: 'Nairobi\'s most affordable area. Huge inventory of budget apartments from bedsitters to 2-bedrooms. Popular with students and young professionals.',
      pros: ['Cheapest rents in Nairobi', 'Thika Road access', 'Large student community', 'Abundant matatu routes'],
      cons: ['Water supply issues in some areas', 'Variable security', 'Longer commute to CBD'],
      link: '/apartments-for-rent/nairobi-county?city=Kasarani'
    },
    {
      name: 'Rongai',
      avgPrice: 'KES 8,000 - 18,000',
      description: 'Growing satellite town with affordable apartments. Fresh air, spacious units, and improving infrastructure. Popular with families on budget.',
      pros: ['Spacious apartments', 'Fresh air, less pollution', 'Growing amenities', 'Family-friendly'],
      cons: ['Dust from murram roads', 'Limited nightlife', '40-60 min commute to CBD'],
      link: '/apartments-for-rent/nairobi-county?city=Rongai'
    },
    {
      name: 'Githurai (44, 45)',
      avgPrice: 'KES 7,000 - 16,000',
      description: 'Busy commercial area along Thika Road. Budget apartments with good transport links. Mix of working professionals and small businesses.',
      pros: ['Excellent matatu access', 'Cheap cost of living', 'Commercial hub', 'Thika Road proximity'],
      cons: ['Crowded and noisy', 'Traffic congestion', 'Security concerns at night'],
      link: '/apartments-for-rent/nairobi-county?city=Githurai'
    },
    {
      name: 'Kitengela',
      avgPrice: 'KES 10,000 - 20,000',
      description: 'Rapidly developing town near Nairobi National Park. Modern budget apartments, spacious units, and growing commercial center.',
      pros: ['Spacious modern apartments', 'SGR access', 'Growing infrastructure', 'Lower crime rates'],
      cons: ['Distance from CBD (30km)', 'Dust during dry season', 'Limited entertainment options'],
      link: '/apartments-for-rent/nairobi-county?city=Kitengela'
    },
    {
      name: 'Pipeline (Embakasi)',
      avgPrice: 'KES 12,000 - 22,000',
      description: 'Industrial area with affordable apartments. Close to airport and Mombasa Road. Popular with aviation workers and industrial employees.',
      pros: ['Close to JKIA', 'Industrial jobs nearby', 'Decent security', 'Good value 1-2BR'],
      cons: ['Industrial pollution', 'Limited social amenities', 'Far from CBD nightlife'],
      link: '/apartments-for-rent/nairobi-county?city=Pipeline'
    },
    {
      name: 'Kahawa West',
      avgPrice: 'KES 9,000 - 17,000',
      description: 'Residential area near Thika Road. Budget apartments in organized estates. Growing area with improving amenities.',
      pros: ['Organized estates', 'Thika Road access', 'Kenyatta University nearby', 'Quieter than Kasarani'],
      cons: ['Limited nightlife', 'Developing amenities', '35-50 min CBD commute'],
      link: '/apartments-for-rent/nairobi-county?city=Kahawa+West'
    }
  ];

  const faqData = [
    {
      question: "Where can I find the cheapest apartments in Nairobi in 2025?",
      answer: "The <strong>cheapest apartments in Nairobi</strong> are in: <a href='/apartments-for-rent/nairobi-county?city=Kasarani' class='text-green-600 hover:underline'>Kasarani</a> (KES 6,000-15,000/month - Mwiki, Zimmerman, Seasons), <a href='/apartments-for-rent/nairobi-county?city=Githurai' class='text-green-600 hover:underline'>Githurai</a> (KES 7,000-16,000 - along Thika Road), <a href='/apartments-for-rent/nairobi-county?city=Rongai' class='text-green-600 hover:underline'>Rongai</a> (KES 8,000-18,000 - spacious satellite town), <a href='/apartments-for-rent/nairobi-county?city=Kahawa' class='text-green-600 hover:underline'>Kahawa West</a> (KES 9,000-17,000), and <a href='/apartments-for-rent/nairobi-county?city=Kitengela' class='text-green-600 hover:underline'>Kitengela</a> (KES 10,000-20,000). Kasarani offers the absolute lowest rents with bedsitters from KES 5,000."
    },
    {
      question: "What can I expect from a cheap apartment in Nairobi?",
      answer: "<strong>Budget apartments (KES 10,000-20,000)</strong> typically include: <strong>Bedsitter (KES 10K-15K):</strong> Single room, small kitchen, private/shared bathroom, basic finishes. <strong>1 Bedroom (KES 15K-20K):</strong> Separate bedroom and living area, kitchen, bathroom, tiled floors, water tank, perimeter security. <strong>2 Bedroom (KES 18K-25K):</strong> Two bedrooms, living/dining, kitchen, 1-2 bathrooms, parking (some), estate security. Expect older buildings, basic finishes, occasional water/power issues. Prioritize security and water supply when viewing."
    },
    {
      question: "How can I find quality cheap apartments without compromising safety?",
      answer: "Find safe budget apartments by: <strong>Prioritize security:</strong> Choose gated estates with guards over standalone buildings, even if slightly pricier. <strong>Visit during daytime:</strong> Inspect neighborhoods, talk to current tenants about security. <strong>Check reviews:</strong> Search online for estate/landlord reviews. <strong>Verify water supply:</strong> Confirm backup tanks, ask tenants about water schedule. <strong>Inspect thoroughly:</strong> Test plumbing, electricity, locks, window grills. <strong>Safe budget areas:</strong> Clay City (Kasarani), organized estates in Kitengela, gated complexes in Rongai."
    },
    {
      question: "Are utilities included in cheap Nairobi apartment rent?",
      answer: "Usually <strong>NO</strong>. Budget apartments charge utilities separately: <strong>Electricity:</strong> KES 800-2,500/month (prepaid, usage-based), <strong>Water:</strong> KES 300-1,000/month (sometimes included), <strong>Garbage:</strong> KES 100-400/month, <strong>Security fee (estates):</strong> KES 300-800/month. Budget an extra <strong>KES 1,500-4,500/month</strong> for utilities. Confirm what's included before signing lease. Some landlords include water in rent - always ask."
    },
    {
      question: "How much deposit do I need for a cheap apartment in Nairobi?",
      answer: "Standard deposit for budget apartments: <strong>1 month rent</strong> (deposit - refundable), <strong>1 month rent</strong> (advance), <strong>0.5-1 month rent</strong> (agent commission if applicable). Total upfront: <strong>2.5-3 months' rent</strong>. Example for KES 15,000/month 1BR: Pay KES 37,500-45,000 upfront. Budget landlords often more flexible - negotiate staggered payments or commission waiver. Dealing directly with landlord saves commission (KES 7,500-15,000)."
    },
    {
      question: "Can I negotiate rent for cheap apartments in Nairobi?",
      answer: "Yes, negotiation is very common in budget market. <strong>Best strategies:</strong> Long-term commitment (1-2 years) - request KES 1,000-2,000 monthly discount, Pay 3-6 months upfront for 10-15% total discount, Off-peak season (Jan-Feb, June-July), Point out needed repairs/updates, Offer to handle minor maintenance yourself. <strong>Realistic discounts:</strong> KES 500-2,000 off monthly rent. Budget landlords more flexible than premium areas. Also negotiate agent commission - many waive for direct deals."
    },
    {
      question: "What's the commute cost from budget areas to Nairobi CBD?",
      answer: "<strong>Daily commute costs to CBD:</strong> <strong>Kasarani:</strong> KES 70-100 matatu, 30-60 min. Monthly: KES 3,000-5,000. <strong>Rongai:</strong> KES 80-100 matatu, 40-60 min. Monthly: KES 3,500-5,000. <strong>Githurai:</strong> KES 70-100 matatu, 30-50 min. Monthly: KES 3,000-5,000. <strong>Kitengela:</strong> KES 100-150 matatu/SGR, 40-70 min. Monthly: KES 4,000-7,000. <strong>Pipeline:</strong> KES 60-100 matatu, 30-50 min. Monthly: KES 2,500-4,500. <strong>Budget tip:</strong> Calculate transport costs vs rent savings. Sometimes closer apartment at +KES 3,000/month saves KES 2,000 transport."
    },
    {
      question: "Are there cheap apartments near universities in Nairobi?",
      answer: "Yes, <strong>student-friendly budget areas</strong>: <strong>Near Kenyatta University:</strong> Kahawa West, Kasarani - KES 6,000-12,000. <strong>Near USIU:</strong> Kasarani, Ruaraka - KES 8,000-15,000. <strong>Near Daystar (Athi River):</strong> Kitengela, Athi River - KES 10,000-16,000. <strong>Near Strathmore/UoN:</strong> Pipeline, South B, South C - KES 12,000-20,000. Most universities have matatu routes from these areas. Many landlords understand student budgets and offer flexible payment terms during semester breaks."
    },
    {
      question: "What documents do I need to rent a cheap apartment in Nairobi?",
      answer: "Budget apartment landlords generally less strict: <strong>Basic requirements:</strong> Copy of National ID or Passport (2 copies), 1-2 passport photos, Contact information (phone, email). <strong>Additional (some landlords):</strong> Payslip or employment letter, Previous landlord reference, KRA PIN. <strong>Note:</strong> Many budget landlords accept informal workers, students, freelancers without traditional payslips. Some require guarantor instead. Have ID ready - some properties rent same-day if available. Be honest about income to avoid future payment issues."
    },
    {
      question: "Is it safe to live in cheap apartment areas in Nairobi?",
      answer: "Safety varies by specific area and estate. <strong>Safer budget areas:</strong> Gated estates in Clay City (Kasarani), Organized complexes in Kitengela/Syokimau, Kahawa West estates, Pipeline estates near JKIA. <strong>Higher risk areas:</strong> Parts of Githurai, Isolated sections of Rongai, Some Mwiki back streets. <strong>Safety tips:</strong> Choose gated compounds with security guards (worth extra KES 500-1,000/month), Avoid ground floor units, Don't walk alone after dark - use boda/Uber, Lock doors/windows always, Build community with neighbors. Overall, budget areas require extra security awareness but are manageable with precautions."
    },
    {
      question: "Do cheap Nairobi apartments have water and electricity issues?",
      answer: "Water issues are <strong>common in budget areas</strong>. <strong>Water:</strong> Many areas have irregular piped supply. Landlords install water tanks for backup. <strong>Before renting, confirm:</strong> Tank capacity (minimum 5,000L for apartments), Water schedule (daily, weekly, or irregular), Source (piped, borehole, water trucks), Tank condition and maintenance. <strong>Electricity:</strong> Generally reliable via Kenya Power prepaid tokens. Occasional outages during storms. <strong>Tips:</strong> Ask current tenants about water reliability, Check for visible water storage during viewing, Budget extra KES 200-500/month for water if buying from trucks."
    },
    {
      question: "Can I find furnished cheap apartments in Nairobi?",
      answer: "Furnished budget apartments are <strong>rare but available</strong>. <strong>Options:</strong> <strong>Serviced apartments (short-term):</strong> KES 2,000-4,000/day or KES 40,000-80,000/month in Kasarani, Kitengela. <strong>Airbnb monthly:</strong> Negotiate long-term rates with hosts. <strong>Unfurnished is cheaper:</strong> Most budget apartments unfurnished. <strong>Furnishing tips:</strong> Buy used furniture (Jiji, Facebook Marketplace) - full bedsitter setup KES 15,000-30,000, Rent furniture (available in Nairobi) - KES 3,000-8,000/month, Gradual purchase as budget allows. Unfurnished + buying furniture still cheaper long-term than serviced apartments."
    },
    {
      question: "What is the best time to find cheap apartments in Nairobi?",
      answer: "Best rental periods for budget apartments: <strong>January-February:</strong> Post-holiday vacancies, landlords eager to fill units, high inventory. <strong>June-July:</strong> Mid-year moves, decent supply, students relocating. <strong>September:</strong> Some availability but competition increases (university intake). <strong>Avoid December:</strong> Low inventory, everyone moving, prices may increase. <strong>Strategy:</strong> Start searching <strong>2-4 weeks before</strong> target move date. Budget areas have high turnover - new listings daily on NewKenyan.com. Act fast on good deals (view within 1-2 days, decide quickly)."
    },
    {
      question: "Are there cheap 2 bedroom apartments in Nairobi?",
      answer: "Yes, <strong>budget 2-bedroom apartments</strong> available: <strong>Kasarani:</strong> KES 12,000-20,000/month (Mwiki, Zimmerman, Seasons). <strong>Rongai:</strong> KES 15,000-22,000 (spacious units). <strong>Githurai:</strong> KES 13,000-20,000. <strong>Kitengela:</strong> KES 16,000-25,000 (modern estates). <strong>Kahawa West:</strong> KES 15,000-22,000. <strong>Pipeline:</strong> KES 16,000-24,000. <strong>Best for:</strong> Small families, roommates splitting costs (KES 6,000-12,000 each), couples needing home office. Sharing 2BR often cheaper per person than renting separate bedsitters."
    },
    {
      question: "Can I sublet my cheap apartment in Nairobi?",
      answer: "Subletting rules vary by landlord. <strong>Generally:</strong> Most budget landlords prohibit unauthorized subletting, Many tenants share informally (risky - not recommended), If subletting needed, get written permission. <strong>Process:</strong> Request landlord approval in writing with subtenant details, May charge admin fee (KES 1,000-3,000), You remain liable for rent and damages, Screen subtenant carefully (ID, deposit, agreement). <strong>Alternatives:</strong> Officially add roommate to lease (many landlords allow for small fee), Find apartment with separate bedrooms for easy sharing. Unauthorized subletting risks eviction and deposit forfeiture."
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
              <span className="text-green-100 font-medium">1000+ Verified Budget Apartments</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Cheap Apartments in Nairobi 2025
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-50">
              Affordable quality apartments from KES 10,000/month - Live well, save more
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <PiggyBank className="h-5 w-5 text-green-200" />
                <span>Budget Friendly</span>
              </div>
              <div className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-green-200" />
                <span>From KES 10K/mo</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-200" />
                <span>6+ Areas</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-200" />
                <span>Verified Listings</span>
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
            <a href="#areas" className="text-sm font-medium hover:text-green-600 whitespace-nowrap">Budget Areas</a>
            <span className="text-gray-300">|</span>
            <a href="#guide" className="text-sm font-medium hover:text-green-600 whitespace-nowrap">Money-Saving Tips</a>
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
              Latest Cheap Apartments in Nairobi
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
                    <Link href="/apartments-for-rent/nairobi-county?max_price=30000">
                      View All {properties.length} Cheap Apartments →
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
                <Link href="/apartments-for-rent/nairobi-county?max_price=30000">Browse All Apartments</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Find Affordable Apartments in Nairobi - 2025 Budget Guide</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Looking for <strong>cheap apartments in Nairobi</strong> without compromising on quality? You're in the right place. NewKenyan.com features <strong>1000+ verified budget apartment listings</strong> starting from just KES 10,000/month across Nairobi's most affordable neighborhoods. With 8+ years of real estate expertise, we help budget-conscious renters, young professionals, students, and families find quality housing at unbeatable prices.
              </p>
              <p>
                <strong>Why Budget Apartments Make Sense:</strong> In 2025's tough economy, finding affordable housing is crucial. Living in budget-friendly areas like <Link href="/apartments-for-rent/nairobi-county?city=Kasarani" className="text-green-600 hover:underline">Kasarani</Link>, <Link href="/apartments-for-rent/nairobi-county?city=Rongai" className="text-green-600 hover:underline">Rongai</Link>, and <Link href="/apartments-for-rent/nairobi-county?city=Kitengela" className="text-green-600 hover:underline">Kitengela</Link> can save you KES 10,000-30,000/month compared to CBD or Westlands - that's KES 120,000-360,000 annually! Use these savings for investments, education, emergency fund, or lifestyle upgrades.
              </p>
              <p>
                <strong>2025 Budget Market Overview:</strong> Nairobi's affordable housing market is thriving with inventory across six major budget zones. Bedsitters/studios range KES 6,000-15,000/month, 1-bedroom apartments KES 12,000-20,000/month, and 2-bedroom units KES 16,000-25,000/month. New developments in <Link href="/apartments-for-rent/nairobi-county?city=Kitengela" className="text-green-600 hover:underline">Kitengela</Link> and <Link href="/apartments-for-rent/nairobi-county?city=Syokimau" className="text-green-600 hover:underline">Syokimau</Link> offer modern finishes at budget prices. Areas along Thika Road (<Link href="/apartments-for-rent/nairobi-county?city=Kasarani" className="text-green-600 hover:underline">Kasarani</Link>, <Link href="/apartments-for-rent/nairobi-county?city=Githurai" className="text-green-600 hover:underline">Githurai</Link>) remain most affordable with excellent transport links.
              </p>
              <p>
                This comprehensive guide covers everything about finding cheap apartments in Nairobi - from the best budget areas and price comparisons to money-saving strategies, safety tips, and how to maximize value while minimizing costs. Let's help you save money without sacrificing your quality of life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Price Range Section */}
      <section id="price-ranges" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Budget Apartment Price Ranges (2025)</h2>
            <p className="text-center text-gray-600 mb-8">Find apartments within your budget - all under KES 25,000/month</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
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
              <h3 className="text-2xl font-bold mb-6">Budget Breakdown by Price Point</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-green-600 mb-2">Under KES 12,000/month (Ultra Budget)</h4>
                  <p className="text-gray-700 mb-2"><strong>What You Get:</strong> Bedsitters/studios in Kasarani (Mwiki, Sunton), Githurai, parts of Rongai.</p>
                  <p className="text-gray-700 mb-2"><strong>Features:</strong> Single room with kitchen corner, basic bathroom, cement or tiled floor, water tank, basic security, prepaid electricity.</p>
                  <p className="text-gray-700"><strong>Best For:</strong> Students, entry-level workers, extreme budget constraints. Functional but basic - absolute cheapest option in Nairobi.</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-green-600 mb-2">KES 12,000 - 16,000/month (Budget Standard)</h4>
                  <p className="text-gray-700 mb-2"><strong>What You Get:</strong> Bedsitters to 1-bedroom in Kasarani, Githurai, Rongai, Kahawa West.</p>
                  <p className="text-gray-700 mb-2"><strong>Features:</strong> 1 bedroom (or spacious bedsitter), separate kitchen and bathroom, tiled floors, gated compound security, water tank, parking (some).</p>
                  <p className="text-gray-700"><strong>Best For:</strong> Young professionals, couples on budget. Sweet spot for value - decent quality at low price.</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-green-600 mb-2">KES 16,000 - 20,000/month (Affordable)</h4>
                  <p className="text-gray-700 mb-2"><strong>What You Get:</strong> 1-2 bedroom apartments in organized estates - Kitengela, Pipeline, Kahawa, parts of Rongai.</p>
                  <p className="text-gray-700 mb-2"><strong>Features:</strong> Spacious bedrooms, modern kitchen with cabinets, tiled throughout, gated estate with guards, CCTV (some), reliable water, parking included.</p>
                  <p className="text-gray-700"><strong>Best For:</strong> Small families, roommates sharing, professionals prioritizing quality. Excellent value for money.</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-green-600 mb-2">KES 20,000 - 25,000/month (Best Value Range)</h4>
                  <p className="text-gray-700 mb-2"><strong>What You Get:</strong> 2-bedroom apartments in newer estates - Kitengela, Syokimau, Pipeline, premium Kasarani/Rongai.</p>
                  <p className="text-gray-700 mb-2"><strong>Features:</strong> Spacious 2BR (master en-suite), modern finishes, full kitchen, guest toilet, 24/7 security, CCTV, backup water/generator, parking (1-2 bays), waste collection.</p>
                  <p className="text-gray-700"><strong>Best For:</strong> Growing families, sharers splitting costs (KES 10-12.5K each), those wanting premium quality at budget price. Best bang for buck in Nairobi.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Budget Areas Section */}
      <section id="areas" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Top 6 Budget Areas in Nairobi</h2>
            <p className="text-center text-gray-600 mb-8">Compare Nairobi's most affordable neighborhoods</p>

            <div className="space-y-6">
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

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-2">Pros:</p>
                      <ul className="space-y-1 text-sm text-gray-700">
                        {neighborhood.pros.map((pro) => (
                          <li key={pro} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-2">Cons:</p>
                      <ul className="space-y-1 text-sm text-gray-700">
                        {neighborhood.cons.map((con) => (
                          <li key={con} className="flex items-start gap-2">
                            <span className="text-orange-600 font-bold mt-0.5 flex-shrink-0">⚠</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link href={neighborhood.link}>
                    <Button className="w-full md:w-auto">
                      View {neighborhood.name.split(' ')[0]} Apartments
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Money-Saving Guide */}
      <section id="guide" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Complete Money-Saving Guide for Budget Apartments</h2>

            <div className="space-y-8">
              {/* Savings Calculator */}
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <PiggyBank className="h-8 w-8 text-green-600" />
                  <h3 className="text-2xl font-bold">How Much Can You Save?</h3>
                </div>

                <div className="space-y-4">
                  <p className="text-gray-700">Compare costs between expensive vs budget areas:</p>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border p-2 text-left">Expense</th>
                          <th className="border p-2 text-right">Kilimani/Westlands</th>
                          <th className="border p-2 text-right">Budget Area</th>
                          <th className="border p-2 text-right text-green-600">Savings</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border p-2">Rent (1BR)</td>
                          <td className="border p-2 text-right">KES 40,000</td>
                          <td className="border p-2 text-right">KES 15,000</td>
                          <td className="border p-2 text-right text-green-600 font-bold">KES 25,000</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border p-2">Utilities</td>
                          <td className="border p-2 text-right">KES 4,000</td>
                          <td className="border p-2 text-right">KES 2,000</td>
                          <td className="border p-2 text-right text-green-600 font-bold">KES 2,000</td>
                        </tr>
                        <tr>
                          <td className="border p-2">Food/Dining</td>
                          <td className="border p-2 text-right">KES 12,000</td>
                          <td className="border p-2 text-right">KES 6,000</td>
                          <td className="border p-2 text-right text-green-600 font-bold">KES 6,000</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border p-2">Entertainment</td>
                          <td className="border p-2 text-right">KES 5,000</td>
                          <td className="border p-2 text-right">KES 2,000</td>
                          <td className="border p-2 text-right text-green-600 font-bold">KES 3,000</td>
                        </tr>
                        <tr className="bg-green-50 font-bold">
                          <td className="border p-2">MONTHLY TOTAL</td>
                          <td className="border p-2 text-right">KES 61,000</td>
                          <td className="border p-2 text-right">KES 25,000</td>
                          <td className="border p-2 text-right text-green-600">KES 36,000</td>
                        </tr>
                        <tr className="bg-green-100 font-bold text-lg">
                          <td className="border p-2" colSpan={3}>ANNUAL SAVINGS</td>
                          <td className="border p-2 text-right text-green-600">KES 432,000!</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg border border-green-200 mt-4">
                    <p className="text-sm text-green-800"><strong>What KES 432,000/year can do:</strong> Down payment for land/car, 1 year tuition, Emergency fund (6 months expenses), Investment capital, Start a business, Study abroad fund.</p>
                  </div>
                </div>
              </div>

              {/* Top Money-Saving Tips */}
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <Wallet className="h-8 w-8 text-green-600" />
                  <h3 className="text-2xl font-bold">15 Money-Saving Tips for Budget Renters</h3>
                </div>

                <ol className="space-y-3 list-decimal list-inside text-gray-700 text-sm">
                  <li className="font-semibold">Find Apartments Directly from Landlords
                    <p className="ml-6 mt-1 font-normal">Save agent commission (KES 5,000-20,000) by browsing NewKenyan.com, asking neighbors, checking estate notice boards.</p>
                  </li>
                  <li className="font-semibold">Negotiate Aggressively
                    <p className="ml-6 mt-1 font-normal">Request KES 1,000-3,000 monthly discount for long lease or upfront payment. Budget landlords more flexible.</p>
                  </li>
                  <li className="font-semibold">Share 2BR with Roommate
                    <p className="ml-6 mt-1 font-normal">KES 20,000 2BR ÷ 2 = KES 10,000 each. Cheaper than KES 15,000 1BR + more space.</p>
                  </li>
                  <li className="font-semibold">Choose Areas with Cheaper Living Costs
                    <p className="ml-6 mt-1 font-normal">Kasarani/Githurai meals KES 100-200 vs Kilimani KES 400-800. Save KES 6,000/month on food.</p>
                  </li>
                  <li className="font-semibold">Calculate Total Cost (Rent + Transport)
                    <p className="ml-6 mt-1 font-normal">Sometimes KES 18,000 apartment near work saves more than KES 12,000 + KES 6,000 transport.</p>
                  </li>
                  <li className="font-semibold">Rent Off-Peak Season
                    <p className="ml-6 mt-1 font-normal">January-February, June-July have lower demand. Negotiate better deals.</p>
                  </li>
                  <li className="font-semibold">Monitor Prepaid Electricity Usage
                    <p className="ml-6 mt-1 font-normal">Track token usage. Turn off appliances. Use energy-saving bulbs. Save KES 500-1,000/month.</p>
                  </li>
                  <li className="font-semibold">Cook at Home
                    <p className="ml-6 mt-1 font-normal">Home cooking: KES 200/day. Eating out: KES 500-800/day. Save KES 9,000-18,000/month!</p>
                  </li>
                  <li className="font-semibold">Buy Furniture Second-Hand
                    <p className="ml-6 mt-1 font-normal">Jiji, Facebook Marketplace - full setup KES 15,000-30,000 vs new KES 50,000-100,000.</p>
                  </li>
                  <li className="font-semibold">Use Matatus Instead of Uber
                    <p className="ml-6 mt-1 font-normal">Daily Uber: KES 600 x 22 days = KES 13,200. Matatu: KES 100 x 22 = KES 2,200. Save KES 11,000!</p>
                  </li>
                  <li className="font-semibold">Avoid Deposit Disputes
                    <p className="ml-6 mt-1 font-normal">Document move-in condition with photos. Protects KES 5,000-20,000 deposit at move-out.</p>
                  </li>
                  <li className="font-semibold">Join Estate Savings Groups (Chamas)
                    <p className="ml-6 mt-1 font-normal">Many estates have tenant chamas for emergencies, bulk buying, support.</p>
                  </li>
                  <li className="font-semibold">Conserve Water
                    <p className="ml-6 mt-1 font-normal">Fix leaks immediately. Shorter showers. Reuse water. Save KES 200-500/month.</p>
                  </li>
                  <li className="font-semibold">Buy Groceries in Bulk from Markets
                    <p className="ml-6 mt-1 font-normal">Kasarani/Githurai markets 30-50% cheaper than supermarkets. Save KES 2,000-4,000/month.</p>
                  </li>
                  <li className="font-semibold">Build Emergency Fund
                    <p className="ml-6 mt-1 font-normal">Save KES 2,000-5,000/month. Prevents borrowing at 10-20% interest for emergencies.</p>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Internal Linking Section - Browse by Location */}
      <section className="py-12 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Browse Affordable Apartments by Location</h2>
            <p className="text-center text-gray-600 mb-8">Discover budget-friendly apartments across Nairobi and Kenya</p>

            {/* By County */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Cheap Apartments by County</h3>
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

            {/* Budget Areas (Under KES 25K) */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Best Budget Areas (Under KES 25K)</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                <Link href="/apartments-for-rent/kasarani" className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 rounded-lg text-center transition-colors border border-green-200 hover:border-green-500 font-medium">
                  Kasarani
                </Link>
                <Link href="/apartments-for-rent/kahawa" className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 rounded-lg text-center transition-colors border border-green-200 hover:border-green-500 font-medium">
                  Kahawa
                </Link>
                <Link href="/apartments-for-rent/ruiru" className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 rounded-lg text-center transition-colors border border-green-200 hover:border-green-500 font-medium">
                  Ruiru
                </Link>
                <Link href="/apartments-for-rent/ngong" className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 rounded-lg text-center transition-colors border border-green-200 hover:border-green-500 font-medium">
                  Ngong
                </Link>
                <Link href="/apartments-for-rent/rongai" className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 rounded-lg text-center transition-colors border border-green-200 hover:border-green-500 font-medium">
                  Rongai
                </Link>
              </div>
            </div>

            {/* Ultra Budget (Bedsitters) */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Ultra Budget Options (Bedsitters)</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                <Link href="/bedsitter-nairobi" className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 rounded-lg text-center transition-colors border border-blue-200 hover:border-blue-500">
                  Bedsitter Nairobi
                </Link>
                <Link href="/bedsitter-kasarani" className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 rounded-lg text-center transition-colors border border-blue-200 hover:border-blue-500">
                  Bedsitter Kasarani
                </Link>
                <Link href="/bedsitters-for-rent/zimmerman" className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 rounded-lg text-center transition-colors border border-blue-200 hover:border-blue-500">
                  Zimmerman
                </Link>
                <Link href="/bedsitters-for-rent/githurai" className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 rounded-lg text-center transition-colors border border-blue-200 hover:border-blue-500">
                  Githurai
                </Link>
                <Link href="/bedsitters-for-rent/juja" className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 rounded-lg text-center transition-colors border border-blue-200 hover:border-blue-500">
                  Juja
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
                <Link href="/apartments-westlands" className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-center transition-colors border border-gray-300 hover:border-gray-500">
                  Westlands Apartments
                </Link>
                <Link href="/apartments-kilimani" className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-center transition-colors border border-gray-300 hover:border-gray-500">
                  Kilimani Apartments
                </Link>
                <Link href="/houses-for-rent-nairobi" className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-center transition-colors border border-gray-300 hover:border-gray-500">
                  Houses for Rent
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
