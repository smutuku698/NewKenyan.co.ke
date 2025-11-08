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
  BadgeCheck, FileCheck, HeartHandshake, Scale, ShoppingBag, UtensilsCrossed, Music
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

export default function ApartmentsKilimaniClient() {
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
        .ilike('city', '%kilimani%')
        .in('property_type', ['Apartment', 'Studio', 'Penthouse', 'Flat'])
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
          .ilike('city', '%nairobi%')
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
    { value: 'all', label: 'All Bedrooms', count: '700+' },
    { value: '0', label: 'Studio', count: '150+' },
    { value: '1', label: '1 Bedroom', count: '250+' },
    { value: '2', label: '2 Bedroom', count: '220+' },
    { value: '3', label: '3 Bedroom', count: '80+' }
  ];

  const priceRanges = [
    { value: 'all', label: 'All Prices', description: 'Browse all listings' },
    { value: '0-30000', label: 'KES 20K - 30K', description: 'Budget studios' },
    { value: '30000-50000', label: 'KES 30K - 50K', description: '1BR apartments' },
    { value: '50000-80000', label: 'KES 50K - 80K', description: '2BR apartments' },
    { value: '80000-120000', label: 'KES 80K - 120K', description: 'Premium 2-3BR' },
    { value: '120000', label: 'KES 120K+', description: 'Luxury apartments' }
  ];

  const subLocations = [
    {
      name: 'Kilimani CBD (Yaya Area)',
      avgPrice: 'KES 35,000 - 90,000',
      description: 'Heart of Kilimani with high-rise apartments near Yaya Centre. Walk to restaurants, cafes, gyms, and supermarkets. Popular with young professionals and entrepreneurs.',
      bestFor: 'Young professionals, couples, singles',
      highlights: 'Yaya Centre, The Cube, 100+ restaurants, vibrant nightlife',
      link: '/apartments-for-rent/nairobi-county?city=Kilimani'
    },
    {
      name: 'Ngong Road Corridor',
      avgPrice: 'KES 30,000 - 70,000',
      description: 'Mixed residential-commercial area along Ngong Road. Good transport links to CBD and Westlands. Variety of apartment options from budget to mid-range.',
      bestFor: 'Commuters, budget-conscious professionals',
      highlights: 'Easy matatu access, shopping centers, hospitals nearby',
      link: '/apartments-for-rent/nairobi-county?city=Ngong+Road'
    },
    {
      name: 'Wood Avenue/Elgeyo Marakwet',
      avgPrice: 'KES 45,000 - 110,000',
      description: 'Quieter residential streets with modern apartment blocks. Mix of families and young professionals. Close to Valley Arcade and popular restaurants.',
      bestFor: 'Families, professionals seeking quieter areas',
      highlights: 'Tree-lined streets, Valley Arcade, good schools',
      link: '/apartments-for-rent/nairobi-county?city=Kilimani'
    },
    {
      name: 'Argwings Kodhek/Dennis Pritt',
      avgPrice: 'KES 40,000 - 95,000',
      description: 'Established neighborhood with mix of older and newer apartments. Close to Nairobi Hospital and Yaya Centre. Good value for families and sharers.',
      bestFor: 'Families, medical professionals, sharers',
      highlights: 'Nairobi Hospital, Yaya Centre, restaurants',
      link: '/apartments-for-rent/nairobi-county?city=Kilimani'
    },
    {
      name: 'Lower Kilimani (Towards Kileleshwa)',
      avgPrice: 'KES 25,000 - 55,000',
      description: 'More affordable section of Kilimani with budget apartments and bedsitters. Good for those wanting Kilimani address at lower cost.',
      bestFor: 'Students, entry-level professionals, budget seekers',
      highlights: 'Affordable rents, growing infrastructure, matatu access',
      link: '/apartments-for-rent/nairobi-county?city=Kilimani'
    }
  ];

  const faqData = [
    {
      question: "What is the average rent for apartments in Kilimani in 2025?",
      answer: "Average rent for <a href='/apartments-kilimani' class='text-green-600 hover:underline'>apartments in Kilimani</a> varies by size: <strong>Studios:</strong> KES 20,000-40,000/month, <strong>1 Bedroom:</strong> KES 30,000-60,000/month, <strong>2 Bedroom:</strong> KES 50,000-90,000/month, <strong>3 Bedroom:</strong> KES 80,000-140,000/month. Premium apartments near <a href='/apartments-for-rent/nairobi-county?city=Kilimani' class='text-green-600 hover:underline'>Yaya Centre</a> command higher rents (KES 120,000-200,000) while Lower Kilimani offers budget options (KES 20,000-50,000)."
    },
    {
      question: "Why is Kilimani popular for renters in Nairobi?",
      answer: "<a href='/apartments-kilimani' class='text-green-600 hover:underline'>Kilimani</a> has become Nairobi's trendiest neighborhood. Benefits include: Central location (between CBD and Westlands), Yaya Centre shopping and entertainment, 100+ restaurants, bars, cafes (diverse cuisines), Vibrant social scene and nightlife, Walking distance to many amenities, Good matatu and Uber access, Mix of modern and affordable apartments, Young, cosmopolitan community, Proximity to hospitals (Nairobi Hospital, MP Shah)."
    },
    {
      question: "What amenities should I expect in Kilimani apartments?",
      answer: "Standard amenities in <strong>Kilimani apartments</strong>: Parking (open or covered - 1 bay), 24/7 security with CCTV, Backup water tank, Modern kitchen cabinets, Wardrobes, Perimeter wall. <strong>Mid to high-end add:</strong> Gym, Swimming pool, Elevator, Generator backup, High-speed internet ready, Intercom system, On-site caretaker. <strong>Luxury apartments feature:</strong> Rooftop terraces, Premium finishes, Smart locks, Concierge, Multiple parking bays, Laundry facilities."
    },
    {
      question: "Are utilities included in Kilimani apartment rent?",
      answer: "Typically <strong>NO</strong>. Most Kilimani apartments charge utilities separately: <strong>Electricity:</strong> KES 1,500-5,000/month (higher with AC), <strong>Water:</strong> KES 600-1,800/month, <strong>Internet:</strong> KES 3,000-5,000 (fiber), <strong>Service charge:</strong> KES 1,500-6,000 (security, garbage, common areas), <strong>DSTV/Zuku (optional):</strong> KES 1,500-3,500. Budget extra KES 7,000-18,000/month for utilities. Some serviced apartments include utilities - confirm before signing lease."
    },
    {
      question: "How much deposit is required for a Kilimani apartment?",
      answer: "Standard deposit structure in Kilimani: <strong>1-2 months rent</strong> (deposit), <strong>1 month rent</strong> (advance), <strong>1 month rent</strong> (agent commission if using agent). Total upfront: <strong>3-4 months' rent</strong>. Example for KES 50,000/month 2BR: Pay KES 150,000-200,000 upfront. Negotiate commission waiver if renting directly from landlord. Some landlords accept staggered deposit over 2-3 months."
    },
    {
      question: "Is parking available in Kilimani apartments?",
      answer: "Most Kilimani apartments include <strong>at least 1 parking bay</strong>. Parking types: <strong>Open/uncovered:</strong> Usually included in rent, <strong>Covered:</strong> May cost extra KES 1,500-4,000/month, <strong>Basement parking:</strong> Premium, KES 3,000-7,000/month, <strong>Additional bays:</strong> KES 2,500-6,000/month. In Yaya area, parking is limited and valuable. Confirm allocation in tenancy agreement. Street parking risky - risk of break-ins."
    },
    {
      question: "What is the best time to find apartments in Kilimani?",
      answer: "Optimal times to rent in Kilimani: <strong>March-May:</strong> Off-peak, better negotiation, more inventory, <strong>September-November:</strong> Post-holiday vacancies, eager landlords, <strong>Avoid December-January:</strong> Peak season, high demand, premium prices. <strong>June-July:</strong> Moderate activity (school transitions). Start searching <strong>1-2 months before</strong> move date. Kilimani has high turnover - new listings appear daily. Be ready to move quickly on good deals."
    },
    {
      question: "Is Kilimani safe and secure?",
      answer: "Kilimani is <strong>relatively safe</strong> with active security measures. Security features: Most apartments have 24/7 guards and CCTV, Well-lit main roads (Ngong Road, Argwings Kodhek), Neighborhood watch programs, Police patrols. <strong>Safety tips:</strong> Choose apartments in well-lit areas, Avoid late-night solo walks in back streets, Use Uber/taxi at night, Secure valuables and lock doors/windows, Join building WhatsApp groups for updates. Yaya area and main roads safest. Crime lower than CBD but stay alert."
    },
    {
      question: "Can I negotiate rent for Kilimani apartments?",
      answer: "Yes, negotiation is common in Kilimani. <strong>Best leverage:</strong> Long-term lease (2+ years) - seek 8-12% discount, Paying 6-12 months upfront, Off-peak season rentals, Property vacant for extended period, Willing to handle minor repairs/painting. <strong>Realistic discount:</strong> 5-10% off asking price. Older buildings more flexible than brand new developments. Also negotiate service charges and parking fees. Show proof of income and be professional."
    },
    {
      question: "What are the best restaurants and cafes near Kilimani apartments?",
      answer: "Kilimani is Nairobi's <strong>foodie paradise</strong> with 100+ dining options: <strong>Yaya Centre:</strong> Java House, Artcaffe, KFC, Pizza Inn, diverse food court. <strong>Popular restaurants:</strong> Mambo Italia (Italian), Habesha (Ethiopian), Chopsticks (Chinese), Cedars (Mediterranean), K'Osewe (Kenyan). <strong>Cafes:</strong> Dormans, CJ's, Nairobi Java House. <strong>Nightlife:</strong> B-Club, Black Diamond, Whiskey River, Kiza Lounge. <strong>Street food:</strong> Affordable nyama choma, chips, local cuisine. Most apartments within 5-15 min walk to dining."
    },
    {
      question: "Do Kilimani apartments allow pets?",
      answer: "Pet policies vary widely in Kilimani. <strong>Generally:</strong> Many apartments allow small pets (cats, small dogs) with written approval, Pet deposit required (KES 5,000-12,000 refundable), Large dogs often restricted in high-rises, Exotic pets typically prohibited. <strong>Before renting:</strong> Confirm pet policy in tenancy agreement, Provide vaccination records, Pay pet deposit, Agree to damage liability. Ground floor apartments more pet-friendly. Some landlords strictly prohibit all pets - ask upfront."
    },
    {
      question: "What documents are needed to rent a Kilimani apartment?",
      answer: "Required documents for Kilimani rentals: <strong>ID:</strong> National ID or Passport copies (2), Passport photos (2-3). <strong>Financial:</strong> 3 recent payslips or employment letter, Bank statements (3-6 months), KRA PIN. <strong>References:</strong> Current landlord reference, Employer contact. <strong>Optional (some landlords):</strong> Good Conduct Certificate, Guarantor with ID copy. Have documents ready to speed application. Competitive market - fast responses win apartments."
    },
    {
      question: "What is the commute like from Kilimani to CBD and Westlands?",
      answer: "<strong>Commute from Kilimani:</strong> <strong>To CBD:</strong> 10-25 min matatu (KES 50), 15-35 min Uber (KES 350-600), 15-40 min personal car (traffic dependent). <strong>To Westlands:</strong> 10-20 min matatu (KES 50), 15-30 min Uber (KES 400-700), 15-35 min car. <strong>Matatu routes:</strong> Frequent along Ngong Road and Argwings Kodhek. <strong>Rush hour:</strong> 7-9am, 5-7pm congested. Many Kilimani residents work nearby, minimizing commute. Walking distance to some offices in Yaya/Upper Hill areas."
    },
    {
      question: "Are there gyms and fitness centers near Kilimani apartments?",
      answer: "Kilimani has <strong>excellent fitness options</strong>: <strong>Gyms in apartments:</strong> Many buildings have in-house gyms (free or small fee). <strong>Commercial gyms:</strong> Yaya Gym (Yaya Centre), Alfa Gym, Fit-In Wellness, CrossFit Nairobi, Powerhouse Gym. <strong>Yoga/Pilates:</strong> Bikram Yoga, Pilates studios. <strong>Outdoor:</strong> Karura Forest (20 min drive), Ngong Road for jogging (use caution). <strong>Swimming:</strong> Several apartments have pools. Monthly gym memberships: KES 3,000-8,000. Convenient for fitness-conscious residents."
    },
    {
      question: "Can I sublet my Kilimani apartment?",
      answer: "Subletting requires <strong>written landlord permission</strong> - never sublet without approval. <strong>Process:</strong> Request in writing with subtenant details, Landlord may charge admin fee (KES 5,000-8,000), You remain legally liable for rent and damages, Screen subtenants thoroughly (income, references), Draft formal sublease agreement. <strong>Important:</strong> Unauthorized subletting = eviction risk and deposit loss. Airbnb subletting usually prohibited unless explicitly allowed. Negotiate subletting rights before signing main lease if flexibility needed."
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
              <span className="text-green-100 font-medium">700+ Verified Listings in Kilimani</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Apartments in Kilimani Nairobi 2025
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-50">
              Modern apartments from KES 20,000/month in Nairobi's trendiest neighborhood
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-green-200" />
                <span>Near Yaya Centre</span>
              </div>
              <div className="flex items-center gap-2">
                <UtensilsCrossed className="h-5 w-5 text-green-200" />
                <span>100+ Restaurants</span>
              </div>
              <div className="flex items-center gap-2">
                <Music className="h-5 w-5 text-green-200" />
                <span>Vibrant Nightlife</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-200" />
                <span>Secure Living</span>
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
              Latest Apartments in Kilimani
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
                    <Link href="/apartments-for-rent/nairobi-county?city=Kilimani">
                      View All {properties.length} Apartments in Kilimani →
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
                <Link href="/apartments-for-rent/nairobi-county?city=Kilimani">Browse All Properties</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Find Your Perfect Apartment in Kilimani - 2025 Complete Guide</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Looking for <strong>apartments in Kilimani</strong>? You're in Nairobi's hottest neighborhood. NewKenyan.com offers <strong>700+ verified apartment listings</strong> in Kilimani, from budget-friendly studios to premium penthouses. With 8+ years of real estate expertise, we help you find your ideal home in this vibrant, cosmopolitan community.
              </p>
              <p>
                <strong>Why Kilimani?</strong> Once a quiet residential area, Kilimani has transformed into Nairobi's trendiest neighborhood, attracting young professionals, entrepreneurs, creatives, and families. The area boasts Yaya Centre (shopping, dining, entertainment), over 100 restaurants and bars, excellent nightlife, central location between CBD and Westlands, and a diverse, youthful community. Whether you're new to Nairobi or relocating within the city, Kilimani offers unmatched lifestyle and convenience.
              </p>
              <p>
                <strong>2025 Market Trends:</strong> Kilimani's rental market remains competitive with high demand from young professionals. Studios (KES 20,000-40,000/month) are popular with singles and couples starting out. 1-bedroom apartments (KES 30,000-60,000/month) attract working professionals. 2-bedroom units (KES 50,000-90,000/month) suit small families and sharers. Newer developments along <Link href="/apartments-for-rent/nairobi-county?city=Kilimani" className="text-green-600 hover:underline">Ngong Road</Link> and near <Link href="/apartments-for-rent/nairobi-county?city=Kilimani" className="text-green-600 hover:underline">Yaya Centre</Link> feature modern amenities including gyms, pools, and backup generators.
              </p>
              <p>
                This comprehensive guide covers everything you need to know about renting apartments in Kilimani - from price breakdowns and sub-location profiles to lifestyle insights, legal tips, and insider recommendations for dining, fitness, and entertainment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Price Range Section */}
      <section id="price-ranges" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Kilimani Apartment Price Ranges (2025)</h2>
            <p className="text-center text-gray-600 mb-8">Choose your budget and find your perfect apartment</p>

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
                  <h4 className="text-lg font-semibold text-green-600 mb-2">KES 20,000 - 30,000/month (Budget Studios)</h4>
                  <p className="text-gray-700 mb-2"><strong>Areas:</strong> Lower Kilimani, outskirts towards Kileleshwa, older buildings</p>
                  <p className="text-gray-700 mb-2"><strong>Features:</strong> Studio/bedsitter, basic kitchen, shared or single bathroom, open parking, basic security, water tank, older construction (10+ years).</p>
                  <p className="text-gray-700"><strong>Best For:</strong> Students, entry-level professionals, singles on tight budget. Functional but basic - Kilimani address at lowest cost.</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-green-600 mb-2">KES 30,000 - 50,000/month (1 Bedroom Standard)</h4>
                  <p className="text-gray-700 mb-2"><strong>Areas:</strong> Ngong Road corridor, mid-Kilimani, mixed neighborhoods</p>
                  <p className="text-gray-700 mb-2"><strong>Features:</strong> 1 bedroom with en-suite, separate kitchen and living area, 1 parking bay, 24/7 security, backup water, modern finishes, elevator (most buildings), CCTV.</p>
                  <p className="text-gray-700"><strong>Best For:</strong> Young professionals, couples, individuals seeking convenience and lifestyle. Good value for money.</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-green-600 mb-2">KES 50,000 - 80,000/month (2 Bedroom Standard)</h4>
                  <p className="text-gray-700 mb-2"><strong>Areas:</strong> Yaya area, Argwings Kodhek, Wood Avenue, main Kilimani</p>
                  <p className="text-gray-700 mb-2"><strong>Features:</strong> 2 bedrooms (master en-suite), guest toilet, spacious living/dining, modern kitchen, 1-2 parking bays, gym (many buildings), swimming pool (some), elevator, generator backup, intercom.</p>
                  <p className="text-gray-700"><strong>Best For:</strong> Small families, roommates sharing costs, mid-level professionals. Excellent amenities and location.</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-green-600 mb-2">KES 80,000 - 120,000/month (Premium 2-3BR)</h4>
                  <p className="text-gray-700 mb-2"><strong>Areas:</strong> Prime Yaya area, Wood Avenue, new developments</p>
                  <p className="text-gray-700 mb-2"><strong>Features:</strong> Spacious 2-3 bedrooms (all en-suite), DSQ (some), high-end finishes, premium appliances, swimming pool, fully-equipped gym, covered parking (2 bays), 24/7 concierge, children's play area, rooftop terrace (some).</p>
                  <p className="text-gray-700"><strong>Best For:</strong> Established families, senior professionals, expatriates. Premium lifestyle with comprehensive amenities.</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-green-600 mb-2">KES 120,000+/month (Luxury Apartments)</h4>
                  <p className="text-gray-700 mb-2"><strong>Areas:</strong> Ultra-prime Kilimani locations, newest luxury towers</p>
                  <p className="text-gray-700 mb-2"><strong>Features:</strong> 3-4 bedroom penthouses, private terraces with city views, smart home technology, premium imported appliances, concierge services, rooftop entertainment areas, business centers, multiple parking bays, sauna/steam room, private elevators (some).</p>
                  <p className="text-gray-700"><strong>Best For:</strong> Executives, successful entrepreneurs, high-income professionals. Ultimate luxury urban living.</p>
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
            <h2 className="text-3xl font-bold mb-4 text-center">Kilimani Sub-Locations Guide</h2>
            <p className="text-center text-gray-600 mb-8">Discover different areas within Kilimani</p>

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
                      <p className="text-sm font-semibold text-gray-600">Key Highlights:</p>
                      <p className="text-sm text-gray-700">{location.highlights}</p>
                    </div>
                  </div>

                  <Link href={location.link}>
                    <Button className="w-full md:w-auto">
                      View {location.name.split(' ')[0]} Listings
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
            <h2 className="text-3xl font-bold mb-8 text-center">Complete Kilimani Rental Guide</h2>

            <div className="space-y-8">
              {/* Kilimani Lifestyle */}
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <UtensilsCrossed className="h-8 w-8 text-green-600" />
                  <h3 className="text-2xl font-bold">Kilimani Lifestyle & Social Scene</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Dining & Restaurants (100+ Options):</h4>
                    <p className="text-gray-700 text-sm mb-2">Kilimani is Nairobi's culinary capital with incredible diversity:</p>
                    <ul className="space-y-1 text-gray-700 text-sm ml-4">
                      <li>• <strong>Italian:</strong> Mambo Italia, Osteria, Trattoria</li>
                      <li>• <strong>Ethiopian:</strong> Habesha, Addis Ababa Restaurant</li>
                      <li>• <strong>Asian:</strong> Chopsticks (Chinese), Siam Thai, Furusato (Japanese)</li>
                      <li>• <strong>Mediterranean:</strong> Cedars, Mesopotamia</li>
                      <li>• <strong>Kenyan:</strong> K'Osewe Ranalo Foods, Nyama Mama</li>
                      <li>• <strong>Cafes:</strong> Java House, Artcaffe, Dormans, CJ's</li>
                      <li>• <strong>Fast Food:</strong> KFC, Pizza Inn, Chicken Inn, Galitos</li>
                      <li>• <strong>Budget:</strong> Countless local eateries with meals from KES 200-500</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Nightlife & Entertainment:</h4>
                    <ul className="space-y-1 text-gray-700 text-sm ml-4">
                      <li>• <strong>Clubs:</strong> B-Club, Black Diamond, Kiza Lounge</li>
                      <li>• <strong>Bars:</strong> Whiskey River, Brew Bistro, The Alchemist</li>
                      <li>• <strong>Live Music:</strong> Various venues with live bands, DJs</li>
                      <li>• <strong>Lounges:</strong> Rooftop bars, shisha lounges, chill spots</li>
                      <li>• Nightlife runs Thu-Sat, most venues open until 2-4am</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Shopping & Services:</h4>
                    <ul className="space-y-1 text-gray-700 text-sm ml-4">
                      <li>• <strong>Yaya Centre:</strong> Main mall with Carrefour, shops, banking, dining, cinema</li>
                      <li>• <strong>The Cube:</strong> Boutique shopping, salons, restaurants</li>
                      <li>• <strong>Supermarkets:</strong> Carrefour (Yaya), Naivas, Chandarana, Quickmart</li>
                      <li>• <strong>Healthcare:</strong> Nairobi Hospital, MP Shah, numerous clinics, pharmacies</li>
                      <li>• <strong>Gyms:</strong> Yaya Gym, Alfa Gym, Fit-In, apartment gyms</li>
                      <li>• <strong>Salons/Spas:</strong> Dozens of options for grooming, beauty, wellness</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Transport & Commute:</h4>
                    <ul className="space-y-1 text-gray-700 text-sm ml-4">
                      <li>• <strong>To CBD:</strong> 10-25 min matatu (KES 50), 15-35 min Uber/car</li>
                      <li>• <strong>To Westlands:</strong> 10-20 min matatu (KES 50), 15-30 min Uber</li>
                      <li>• Excellent matatu connectivity along Ngong Road</li>
                      <li>• Uber/Bolt readily available 24/7</li>
                      <li>• Many amenities within walking distance</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Rental Process */}
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <FileCheck className="h-8 w-8 text-green-600" />
                  <h3 className="text-2xl font-bold">How to Rent in Kilimani (Step-by-Step)</h3>
                </div>

                <ol className="space-y-3 list-decimal list-inside text-gray-700 text-sm">
                  <li className="font-semibold">Set Your Budget
                    <p className="ml-6 mt-1 font-normal">Calculate total upfront (3-4 months rent) + monthly utilities (KES 7,000-18,000). Prioritize location, size, amenities.</p>
                  </li>
                  <li className="font-semibold">Search & Shortlist
                    <p className="ml-6 mt-1 font-normal">Browse NewKenyan.com, filter by budget/bedrooms. Shortlist 5-7 properties. Check photos, location, amenities.</p>
                  </li>
                  <li className="font-semibold">Schedule Viewings
                    <p className="ml-6 mt-1 font-normal">Contact via WhatsApp/phone. Book weekday viewings if possible. Ask about deposit, utilities, parking.</p>
                  </li>
                  <li className="font-semibold">Inspect Thoroughly
                    <p className="ml-6 mt-1 font-normal">Check water, electricity, appliances, security, parking, noise levels. Visit at different times if possible.</p>
                  </li>
                  <li className="font-semibold">Verify Ownership
                    <p className="ml-6 mt-1 font-normal">Request landlord ID and title deed. Search at Land Registry (KES 500). Verify agent registration.</p>
                  </li>
                  <li className="font-semibold">Negotiate
                    <p className="ml-6 mt-1 font-normal">Request 5-10% discount for long lease or upfront payment. Negotiate service charges and parking.</p>
                  </li>
                  <li className="font-semibold">Review Agreement
                    <p className="ml-6 mt-1 font-normal">Read entire tenancy agreement. Confirm rent, deposit terms, notice period, maintenance, subletting policy.</p>
                  </li>
                  <li className="font-semibold">Pay Securely
                    <p className="ml-6 mt-1 font-normal">Bank transfer only (never cash). Get receipts for all payments with landlord KRA PIN.</p>
                  </li>
                  <li className="font-semibold">Document Condition
                    <p className="ml-6 mt-1 font-normal">Take photos/videos before moving in. Note existing damages. Share with landlord.</p>
                  </li>
                  <li className="font-semibold">Move In & Set Up
                    <p className="ml-6 mt-1 font-normal">Register utilities, install internet, meet neighbors, join building WhatsApp group.</p>
                  </li>
                </ol>
              </div>

              {/* Legal Tips */}
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <Scale className="h-8 w-8 text-green-600" />
                  <h3 className="text-2xl font-bold">Tenant Rights & Legal Protection</h3>
                </div>

                <div className="space-y-3 text-gray-700 text-sm">
                  <p><strong>Landlord and Tenant Act 2021</strong> protects you:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Written Agreement Required:</strong> All rentals need signed written contracts.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Maximum Deposit:</strong> 2 months rent. Refunded within 30 days less legitimate deductions.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Rent Increase:</strong> Requires 3 months written notice. Usually capped at 10% annually.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Eviction:</strong> Landlord needs court order. Cannot forcibly remove you or change locks.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Privacy:</strong> Landlord must give 24-48 hours notice before visits (except emergencies).</span>
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
                <Link href="/apartments-westlands" className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 rounded-lg text-center transition-colors border border-green-200 hover:border-green-500 font-medium">
                  Westlands
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
                <p className="text-sm text-gray-600">Industry excellence</p>
              </div>

              <div>
                <Shield className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">8+ Years</h3>
                <p className="text-sm text-gray-600">Trusted property experts</p>
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
