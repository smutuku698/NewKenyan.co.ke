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
  BadgeCheck, FileCheck, HeartHandshake, Scale, TreeDeciduous, Landmark
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

export default function LandForSaleKenyaClient() {
  const [properties, setProperties] = useState<PropertyListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCounty, setSelectedCounty] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedLandType, setSelectedLandType] = useState<string>('all');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  useEffect(() => {
    fetchProperties();
  }, [selectedCounty, selectedPriceRange, selectedLandType]);

  const fetchProperties = async () => {
    try {
      setLoading(true);

      let query = supabase
        .from('property_listings')
        .select('*')
        .eq('is_approved', true)
        .eq('price_type', 'For Sale')
        .eq('property_type', 'Land')
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false});

      if (selectedCounty !== 'all') {
        query = query.ilike('county', `%${selectedCounty}%`);
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

      // Fallback: If no properties found, show any land for sale in Kenya
      if (!data || data.length === 0) {
        const fallbackQuery = supabase
          .from('property_listings')
          .select('*')
          .eq('is_approved', true)
          .eq('price_type', 'For Sale')
          .eq('property_type', 'Land')
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
    { value: 'all', label: 'All Prices', description: 'Browse all land' },
    { value: '0-1000000', label: 'Under KES 1M', description: 'Entry-level plots' },
    { value: '1000000-3000000', label: 'KES 1M - 3M', description: 'Residential plots' },
    { value: '3000000-5000000', label: 'KES 3M - 5M', description: 'Prime plots' },
    { value: '5000000-10000000', label: 'KES 5M - 10M', description: 'Large parcels' },
    { value: '10000000', label: 'KES 10M+', description: 'Premium land' }
  ];

  const counties = [
    { value: 'all', label: 'All Counties', count: '2000+' },
    { value: 'Nairobi', label: 'Nairobi', count: '300+' },
    { value: 'Kiambu', label: 'Kiambu', count: '500+' },
    { value: 'Machakos', label: 'Machakos', count: '400+' },
    { value: 'Kajiado', label: 'Kajiado', count: '350+' },
    { value: 'Nakuru', label: 'Nakuru', count: '250+' },
    { value: 'Mombasa', label: 'Mombasa', count: '200+' }
  ];

  const topAreas = [
    {
      name: 'Kiambu County (Ruiru, Juja, Thika)',
      avgPrice: 'KES 1M - 8M (1/8 - 1/4 acre)',
      description: 'Most popular land buying destination near Nairobi. Excellent infrastructure along Thika Road, close to malls, hospitals, schools. High appreciation rates (15-20% annually).',
      bestFor: 'Residential development, investment',
      highlights: 'Thika Road, Tatu City, Eastern Bypass, Two Rivers Mall',
      appreciation: 'High (15-20% p.a.)',
      link: '/land-for-sale/kiambu-county'
    },
    {
      name: 'Machakos County (Syokimau, Mlolongo, Athi River)',
      avgPrice: 'KES 800K - 5M (1/8 - 1/2 acre)',
      description: 'Fast-growing area with SGR access, close to JKIA and Mombasa Road. Modern planned estates, improving infrastructure, and lower land costs than Nairobi.',
      bestFor: 'Affordable residential, rental income',
      highlights: 'SGR Station, Konza Technopolis, Airport access',
      appreciation: 'Very High (20-25% p.a.)',
      link: '/land-for-sale/machakos-county'
    },
    {
      name: 'Kajiado County (Kitengela, Rongai, Ngong)',
      avgPrice: 'KES 600K - 4M (1/8 - 1 acre)',
      description: 'Spacious affordable plots near Nairobi National Park. Growing commercial centers, fresh air, and large parcels suitable for various projects.',
      bestFor: 'Large plots, budget investment, mixed-use',
      highlights: 'Nairobi National Park, growing townships, space',
      appreciation: 'High (15-18% p.a.)',
      link: '/land-for-sale/kajiado-county'
    },
    {
      name: 'Nakuru County',
      avgPrice: 'KES 500K - 6M (0.5 - 5 acres)',
      description: 'Agricultural and residential land in Kenya\'s 4th largest city. Good climate, fertile soil, growing industry, and strategic location on highway.',
      bestFor: 'Agriculture, long-term investment, retirement',
      highlights: 'Lake Nakuru, climate, fertile land, highway access',
      appreciation: 'Moderate (10-15% p.a.)',
      link: '/land-for-sale/nakuru-county'
    },
    {
      name: 'Nairobi County (Ruai, Kamulu, Utawala)',
      avgPrice: 'KES 2M - 15M (1/8 - 1/4 acre)',
      description: 'Premium land within Nairobi city limits. High demand, established infrastructure, and proximity to CBD. Most expensive but safest investment.',
      bestFor: 'Premium residential, commercial development',
      highlights: 'City amenities, infrastructure, high demand',
      appreciation: 'Moderate-High (12-18% p.a.)',
      link: '/land-for-sale/nairobi-county'
    },
    {
      name: 'Mombasa/Kilifi Coast',
      avgPrice: 'KES 1M - 20M (varies)',
      description: 'Beachfront and near-beach plots, retirement land, tourism investment. High potential but requires careful due diligence on titles.',
      bestFor: 'Tourism, retirement, vacation homes',
      highlights: 'Beach access, tourism, climate, SGR',
      appreciation: 'Variable (8-15% p.a.)',
      link: '/land-for-sale/mombasa-county'
    }
  ];

  const faqData = [
    {
      question: "What is the average price of land in Kenya in 2025?",
      answer: "Land prices in Kenya vary significantly by location: <strong>Nairobi:</strong> KES 2M-15M per 1/8 acre (residential areas like Ruai, Kamulu). <strong>Kiambu:</strong> KES 1M-8M per 1/8-1/4 acre (Ruiru, Juja, Thika). <strong>Machakos:</strong> KES 800K-5M per 1/8-1/2 acre (Syokimau, Mlolongo). <strong>Kajiado:</strong> KES 600K-4M per 1/8-1 acre (Kitengela, Rongai). <strong>Nakuru:</strong> KES 500K-2M per acre (agricultural/residential). Prime areas appreciate 15-25% annually while rural areas grow 5-10%."
    },
    {
      question: "How can I buy land in Kenya safely without being scammed?",
      answer: "Follow these <strong>critical steps</strong> to avoid land scams: <strong>1. Verify ownership:</strong> Conduct official search at Land Registry (KES 500), confirm seller's name matches title deed. <strong>2. Physical inspection:</strong> Visit land with surveyor, confirm boundaries match title deed. <strong>3. Check encumbrances:</strong> Ensure no loans, disputes, court cases on the land. <strong>4. Use lawyer:</strong> Hire licensed advocate to handle transfer (KES 50,000-150,000). <strong>5. Avoid cash:</strong> Pay via banker's cheque after title transfer. <strong>6. Beware red flags:</strong> Pressure to pay fast, prices far below market, no physical address, reluctance to show original title. <strong>7. Verify planning approvals:</strong> Confirm land use (residential, agricultural, commercial) with county government."
    },
    {
      question: "What documents do I need to buy land in Kenya?",
      answer: "<strong>Buyer requirements:</strong> Copy of National ID or Passport, KRA PIN certificate, Proof of funds (bank statement), Contact information. <strong>Seller must provide:</strong> Original title deed, National ID, Land rates clearance certificate, Land rent clearance (if applicable), Consent to transfer from Land Control Board (if required). <strong>Transfer process documents:</strong> Sale agreement (drafted by lawyer), Transfer forms (Land Registry), Stamp duty payment (4% of land value), Legal fees receipt. <strong>After transfer:</strong> New title deed in your name, Land rates payment records, Survey map (if available)."
    },
    {
      question: "How much does it cost to transfer land ownership in Kenya?",
      answer: "<strong>Land transfer costs breakdown:</strong> <strong>1. Stamp Duty:</strong> 4% of land value (e.g., KES 2M land = KES 80,000). <strong>2. Legal fees:</strong> KES 50,000-150,000 depending on land value and lawyer. <strong>3. Land Registry fees:</strong> KES 5,000-20,000 (search, processing, new title). <strong>4. Valuation fees:</strong> KES 10,000-30,000 (if bank financing). <strong>5. Survey fees:</strong> KES 20,000-80,000 (if survey needed). <strong>6. Land rates clearance:</strong> Outstanding rates must be cleared. <strong>Total:</strong> Budget <strong>6-10% of land value</strong> for all transfer costs. Example: KES 3M land = KES 180,000-300,000 transfer costs."
    },
    {
      question: "What is the best area to buy land in Kenya for investment?",
      answer: "Top land investment areas in 2025: <strong>1. Kiambu (Ruiru, Juja):</strong> 15-20% annual appreciation, Thika Road growth, best ROI. <strong>2. Machakos (Syokimau, Mlolongo):</strong> 20-25% growth, SGR impact, Konza City. <strong>3. Kajiado (Kitengela, Ongata Rongai):</strong> 15-18% growth, affordable entry, large parcels. <strong>4. Nairobi (Ruai, Kamulu):</strong> 12-18% growth, safest investment, high demand. <strong>5. Nakuru:</strong> 10-15% growth, agricultural potential, climate. <strong>Investment tips:</strong> Look for areas with <a href='/land-for-sale-kenya' class='text-green-600 hover:underline'>upcoming infrastructure</a> (roads, malls, schools), buy before development (higher appreciation), verify title authenticity, hold 5-10 years for maximum returns."
    },
    {
      question: "Can foreigners buy land in Kenya?",
      answer: "<strong>YES, with restrictions:</strong> Foreigners can buy land in Kenya but NOT freehold land. <strong>Allowed:</strong> 99-year <strong>leasehold</strong> for residential/commercial purposes, Maximum 99-year lease (renewable), Can buy apartments/condos, Can inherit land. <strong>NOT allowed:</strong> Freehold land ownership (reserved for Kenyan citizens), Agricultural land in certain areas. <strong>Process for foreigners:</strong> Obtain Investment Certificate from Kenya Investment Authority (KIA) - not always required but recommended, Work with lawyer specialized in foreign transactions, Expect 10-20% higher costs due to additional approvals, Register with KRA for PIN. <strong>East African Community (EAC) citizens:</strong> Can own land similar to Kenyans under EAC treaty."
    },
    {
      question: "How long does it take to transfer land in Kenya?",
      answer: "<strong>Land transfer timeline:</strong> <strong>Fast track (Digital):</strong> 2-4 weeks if all documents ready, no issues, and using e-registration. <strong>Standard process:</strong> 1-3 months typical timeline. <strong>Complex cases:</strong> 3-6 months (disputes, missing documents, court approvals needed). <strong>Breakdown:</strong> Land search & verification: 3-7 days, Sale agreement preparation: 1-2 weeks, Land Control Board consent (if required): 2-4 weeks, Stamp duty payment & stamping: 1 week, Land Registry processing: 2-4 weeks, New title deed issuance: 1-2 weeks. <strong>Delays caused by:</strong> Missing documents, outstanding rates, disputed boundaries, consent delays from Land Control Board, registry backlog. <strong>Speed up process:</strong> Ensure all documents ready upfront, hire experienced lawyer, use e-registration system, clear all rates before starting."
    },
    {
      question: "What are the red flags when buying land in Kenya?",
      answer: "<strong>MAJOR RED FLAGS - Walk away if you see these:</strong> <strong>1. No original title deed:</strong> Only photocopies shown, seller claims 'title at lawyer' for weeks. <strong>2. Price too good to be true:</strong> 50%+ below market rate. <strong>3. Pressure tactics:</strong> 'Buy now or lose it', 'special discount expires today'. <strong>4. Reluctance to visit land:</strong> Seller discourages physical inspection. <strong>5. Multiple 'owners':</strong> Different people claiming same land. <strong>6. Undocumented agreements:</strong> Verbal promises, handwritten 'agreements'. <strong>7. Land in court/disputed:</strong> Check Land Registry for cautions. <strong>8. Boundary discrepancies:</strong> Physical land doesn't match title dimensions. <strong>9. No rates receipts:</strong> Seller can't show recent rates payments. <strong>10. Fake documents:</strong> Watermarks, stamps look suspicious. <strong>Protect yourself:</strong> ALWAYS conduct official search, use lawyer, visit land physically, never pay full amount before title transfer."
    },
    {
      question: "Should I buy land with a loan or cash in Kenya?",
      answer: "<strong>CASH (if you have it):</strong> <strong>Pros:</strong> No 12-15% interest payments (save millions long-term), Faster process (no bank approvals), Better negotiating power (10-15% discount for cash), No monthly stress. <strong>Cons:</strong> Ties up capital, Misses other investment opportunities. <strong>LOAN:</strong> <strong>Pros:</strong> Preserve cash for other investments, Leverage - control more land with less money, Tax deductions on interest (for businesses), Build credit history. <strong>Cons:</strong> 12-15% annual interest (expensive!), Risk of default and land seizure, Longer processing (2-3 months), Requires 20-30% deposit. <strong>BEST STRATEGY:</strong> If you can pay cash and land appreciation expected is 15-20%, use cash. If you can invest the cash elsewhere at 20%+ returns, take loan and invest cash. For income-generating land (rental, commercial), loans acceptable. Avoid loans over 5 years - interest eats profits."
    },
    {
      question: "What is the difference between freehold and leasehold land?",
      answer: "<strong>FREEHOLD:</strong> <strong>Definition:</strong> Absolute ownership forever, you and your heirs own land indefinitely. <strong>Pros:</strong> Permanent ownership, No annual rent, Higher resale value, Can be subdivided freely. <strong>Cons:</strong> More expensive (20-30% premium), Only available to Kenyan citizens. <strong>Common in:</strong> Nairobi, Kiambu, established areas. <strong>LEASEHOLD:</strong> <strong>Definition:</strong> You lease land from government/owner for fixed period (usually 99 years). <strong>Pros:</strong> Cheaper (20-30% less than freehold), Renewable at end of term, Foreigners can acquire, Same usage rights during lease. <strong>Cons:</strong> Must pay annual land rent, Lease expires (though typically renewed), Slightly lower resale value. <strong>Common in:</strong> Former government land, Coast, newer developments. <strong>Which to buy?</strong> If Kenyan and can afford, freehold better long-term. Leasehold acceptable if 99 years (plenty of time) and significantly cheaper."
    },
    {
      question: "How can I verify land ownership in Kenya?",
      answer: "<strong>Official land search process (MANDATORY):</strong> <strong>1. Visit Land Registry:</strong> Ardhi House (Nairobi) or county land registry. <strong>2. Requirements:</strong> Title deed number or parcel number, Copy of your ID, KES 500 search fee. <strong>3. Request official search:</strong> Ask for <strong>Official Search</strong> (not just Green Card). <strong>4. Search reveals:</strong> Registered owner name and ID, Land size and location, Any loans/charges on land, Any court cases/caveats, Ownership history. <strong>5. Verify:</strong> Owner name matches seller's ID exactly, No encumbrances or disputes, Land description matches physical land. <strong>6. Digital option:</strong> Use <strong>Ardhisasa</strong> online portal - faster (minutes vs days). <strong>Red flags in search:</strong> Different owner name, Multiple charges/loans, Caveat or caution, Frequent ownership changes, Boundaries unclear. <strong>NEVER skip official search</strong> - it's your only legal protection!"
    },
    {
      question: "What is the best size of land to buy in Kenya?",
      answer: "<strong>Depends on purpose:</strong> <strong>Residential (personal home):</strong> 1/8 acre (50x100) - Standard, affordable, KES 1M-5M. 1/4 acre - Spacious compound, room for garden, KES 2M-10M. <strong>Investment (rental development):</strong> 1/4 - 1/2 acre - Build 4-8 rental units. 1-2 acres - Apartment block (20-40 units). <strong>Commercial:</strong> 1/4 - 1 acre near highways/towns. <strong>Agriculture:</strong> 5-50 acres depending on crop/livestock. <strong>BEST INVESTMENT SIZES:</strong> <strong>Beginner:</strong> 1/8 acre (affordable, easy to sell, high demand). <strong>Serious investor:</strong> 1/4 - 1/2 acre (subdivision potential, development options). <strong>Large investor:</strong> 1-5 acres (apartments, commercial, wholesale). <strong>Tip:</strong> Smaller plots (1/8, 1/4) easier to sell quickly. Larger parcels can be subdivided for profit but take longer to sell."
    },
    {
      question: "Can I get a loan to buy land in Kenya?",
      answer: "YES, land loans available from banks. <strong>Requirements:</strong> Kenyan citizen (most banks), Steady income (payslips, business financials), KRA PIN and tax compliance, Deposit 20-40% of land value, Good credit score (CRB check), Land must have clear title deed. <strong>Loan terms:</strong> Interest: 12-16% annually, Duration: 5-20 years, LTV (Loan-to-Value): 60-80%, Processing: 1-3 months. <strong>Top lenders:</strong> KCB, Equity, Co-op Bank, Stanbic, NCBA, Family Bank. <strong>Monthly payment example:</strong> KES 3M land, 30% deposit (KES 900K), Loan KES 2.1M at 14% for 10 years = KES 32,500/month. <strong>Tips:</strong> Shop around - rates vary 2-4%, Negotiate for lower interest with good credit, Consider shorter term to save on interest, Factor in total cost including transfer fees."
    },
    {
      question: "What are land rates and how much do they cost in Kenya?",
      answer: "<strong>Land rates definition:</strong> Annual tax paid to county government for land ownership (like property tax). <strong>Calculation:</strong> Based on land value and county rates. Formula: Land value x Rate (usually 0.5-2% annually). <strong>Example rates:</strong> <strong>Nairobi:</strong> KES 5,000-30,000/year (residential 1/8 acre). <strong>Kiambu:</strong> KES 2,000-15,000/year. <strong>Machakos:</strong> KES 1,500-10,000/year. <strong>Kajiado:</strong> KES 1,000-8,000/year. <strong>When to pay:</strong> Annually, usually in one lump sum. Some counties allow quarterly. <strong>Consequences of non-payment:</strong> Penalties and interest (2-3% monthly), Cannot transfer land until cleared, County can auction land after years of default. <strong>Clearance certificate:</strong> Required for land transfer - must show rates paid to date. <strong>Check rates:</strong> Visit county revenue office with title number."
    },
    {
      question: "Is buying agricultural land a good investment in Kenya?",
      answer: "YES, but requires different strategy than residential land. <strong>PROS:</strong> Cheaper per acre (KES 200K-1M/acre vs KES 2M-8M for residential 1/8 acre), Larger parcels available, Passive income from farming (lease to farmers), Long-term appreciation (8-12% annually), Tax benefits for agricultural use, Food security/self-sufficiency. <strong>CONS:</strong> Slower appreciation than residential land near cities, Less liquid (harder to sell quickly), Requires knowledge of farming/leasing, May need fencing, water access, Infrastructure often limited. <strong>BEST AREAS:</strong> Nakuru (fertile, good climate), Kiambu (near Nairobi market), Laikipia (ranching), Meru (coffee, tea, horticulture). <strong>STRATEGY:</strong> Buy near growing towns (will become residential in 10-20 years), Ensure water access (borehole, river), Good road access increases value, Lease to farmers for income while land appreciates. Agricultural land works for patient investors willing to hold 10-20 years."
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
              <span className="text-green-100 font-medium">2000+ Verified Land Listings</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Land for Sale in Kenya 2025
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-50">
              Buy verified plots & acres from KES 500,000 - Residential, Commercial & Agricultural land with ready title deeds
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <Landmark className="h-5 w-5 text-green-200" />
                <span>Ready Title Deeds</span>
              </div>
              <div className="flex items-center gap-2">
                <TreeDeciduous className="h-5 w-5 text-green-200" />
                <span>Prime Locations</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-200" />
                <span>Verified Sellers</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-200" />
                <span>High ROI</span>
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
            <a href="#guide" className="text-sm font-medium hover:text-green-600 whitespace-nowrap">Buying Guide</a>
            <span className="text-gray-300">|</span>
            <a href="#listings" className="text-sm font-medium hover:text-green-600 whitespace-nowrap">Browse Land</a>
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
              Latest Land for Sale in Kenya
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
                    <Link href="/land-for-sale">
                      View All {properties.length} Land Listings →
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
                <Link href="/land-for-sale">Browse All Land</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Buy Land in Kenya - 2025 Complete Investor Guide</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Looking to <strong>buy land in Kenya</strong>? NewKenyan.com offers <strong>2000+ verified land listings</strong> across Kenya's prime investment zones - from affordable plots starting at KES 500,000 to premium acres in high-growth areas. With 8+ years of real estate expertise and partnerships with <Link href="/real-estate-companies-in-kenya" className="text-green-600 hover:underline font-semibold">many real estate agencies in Kenya</Link>, we help buyers make informed land investments with confidence.
              </p>
              <p>
                <strong>Why Invest in Kenyan Land in 2025?</strong> Land remains Kenya's most reliable investment with average annual appreciation of 10-25% depending on location. Unlike volatile stocks or depreciating vehicles, land consistently grows in value, especially in infrastructure development corridors. Vision 2030 projects (Konza City, Lamu Port, SGR, expressways) are driving unprecedented land appreciation in <Link href="/land-for-sale/kiambu-county" className="text-green-600 hover:underline">Kiambu</Link>, <Link href="/land-for-sale/machakos-county" className="text-green-600 hover:underline">Machakos</Link>, and <Link href="/land-for-sale/kajiado-county" className="text-green-600 hover:underline">Kajiado</Link> counties.
              </p>
              <p>
                <strong>2025 Land Market Trends:</strong> The Kenya land market shows strong demand in peri-urban areas within 30km of Nairobi. <Link href="/land-for-sale/kiambu-county" className="text-green-600 hover:underline">Kiambu County</Link> (Ruiru, Juja, Thika) leads in appreciation (15-20% annually) driven by Thika Road expansion. <Link href="/land-for-sale/machakos-county" className="text-green-600 hover:underline">Machakos County</Link> (Syokimau, Mlolongo) shows explosive growth (20-25%) due to SGR and Konza City proximity. <Link href="/land-for-sale/kajiado-county" className="text-green-600 hover:underline">Kajiado</Link> (Kitengela, Rongai) offers best value with large affordable parcels growing 15-18% yearly.
              </p>
              <p>
                This comprehensive guide covers everything you need to know about buying land in Kenya - from verification and due diligence to price analysis, legal processes, investment strategies, and how to avoid the common land scams that cost Kenyans millions annually. Let's help you make a smart, secure land investment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Price Range Section */}
      <section id="price-ranges" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Land Price Ranges in Kenya (2025)</h2>
            <p className="text-center text-gray-600 mb-8">Find land within your investment budget</p>

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
              <h3 className="text-2xl font-bold mb-6">What You Get at Each Price Point</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-green-600 mb-2">Under KES 1 Million (Entry-Level)</h4>
                  <p className="text-gray-700 mb-2"><strong>Areas:</strong> Kajiado (Kitengela, Rongai outer), Machakos (Kangundo Road), Nakuru, rural counties</p>
                  <p className="text-gray-700 mb-2"><strong>Size:</strong> 1/8 - 1/4 acre residential or 1-5 acres agricultural</p>
                  <p className="text-gray-700"><strong>Best For:</strong> First-time buyers, agricultural investment, long-term hold. Appreciation moderate (8-12% annually) but affordable entry point.</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-green-600 mb-2">KES 1M - 3M (Residential Standard)</h4>
                  <p className="text-gray-700 mb-2"><strong>Areas:</strong> Kiambu (Ruiru, Juja outskirts), Machakos (Mlolongo, Athi River), Kajiado (Kitengela, Ngong)</p>
                  <p className="text-gray-700 mb-2"><strong>Size:</strong> 1/8 - 1/4 acre in organized estates with amenities</p>
                  <p className="text-gray-700"><strong>Best For:</strong> Building family home, medium-term investment. Good appreciation (15-18% annually), ready infrastructure (roads, water, electricity).</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-green-600 mb-2">KES 3M - 5M (Prime Residential)</h4>
                  <p className="text-gray-700 mb-2"><strong>Areas:</strong> Kiambu (Ruiru near Thika Road, Juja), Machakos (Syokimau, near SGR), Nairobi (Ruai, Kamulu)</p>
                  <p className="text-gray-700 mb-2"><strong>Size:</strong> 1/8 - 1/4 acre in premium estates</p>
                  <p className="text-gray-700"><strong>Best For:</strong> Quality family home, rental development. Excellent appreciation (18-22% annually), established infrastructure, high demand areas.</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-green-600 mb-2">KES 5M - 10M (Development Parcels)</h4>
                  <p className="text-gray-700 mb-2"><strong>Areas:</strong> Kiambu (Thika Road corridor), Nairobi (Ruai, Utawala), Machakos (Syokimau prime)</p>
                  <p className="text-gray-700 mb-2"><strong>Size:</strong> 1/4 - 1 acre or multiple small plots</p>
                  <p className="text-gray-700"><strong>Best For:</strong> Apartment development, commercial projects, subdivision for profit. High returns through development (25-40% ROI).</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-green-600 mb-2">KES 10M+ (Premium/Commercial)</h4>
                  <p className="text-gray-700 mb-2"><strong>Areas:</strong> Nairobi (Lavington, Karen, Runda), Kiambu (Thika Road frontage), highway commercial</p>
                  <p className="text-gray-700 mb-2"><strong>Size:</strong> Large parcels (1-10+ acres), commercial frontage, prime residential</p>
                  <p className="text-gray-700"><strong>Best For:</strong> High-end development, commercial malls/offices, luxury residential estates. Premium returns for experienced investors.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Land Areas Section */}
      <section id="areas" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Top 6 Areas to Buy Land in Kenya</h2>
            <p className="text-center text-gray-600 mb-8">Compare Kenya's highest-growth land investment zones</p>

            <div className="space-y-6">
              {topAreas.map((area) => (
                <div key={area.name} className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-green-500 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-green-600">{area.name}</h3>
                      <p className="text-lg font-semibold text-gray-700">{area.avgPrice}</p>
                    </div>
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>

                  <p className="text-gray-700 mb-4">{area.description}</p>

                  <div className="grid md:grid-cols-3 gap-4 mb-4 text-sm">
                    <div>
                      <p className="font-semibold text-gray-600">Best For:</p>
                      <p className="text-gray-700">{area.bestFor}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-600">Key Highlights:</p>
                      <p className="text-gray-700">{area.highlights}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-600">Appreciation Rate:</p>
                      <p className="text-gray-700 font-bold text-green-600">{area.appreciation}</p>
                    </div>
                  </div>

                  <Link href={area.link}>
                    <Button className="w-full md:w-auto">
                      View {area.name.split(' ')[0]} County Land
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Buying Guide */}
      <section id="guide" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Complete Land Buying Guide for Kenya</h2>

            <div className="space-y-8">
              {/* Due Diligence Checklist */}
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <FileCheck className="h-8 w-8 text-green-600" />
                  <h3 className="text-2xl font-bold">Essential Due Diligence Checklist</h3>
                </div>

                <div className="space-y-4">
                  <p className="text-gray-700 font-semibold">Follow these steps to avoid land scams (90% of disputes happen due to skipping these):</p>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-800">1. Conduct Official Land Search</p>
                        <p className="text-sm text-gray-700">Visit Land Registry (Ardhi House or county office) or use Ardhisasa online. Cost: KES 500. Verify owner name, land size, encumbrances, court cases.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-800">2. Physical Land Inspection with Survey</p>
                        <p className="text-sm text-gray-700">Visit land with licensed surveyor (KES 20,000-50,000). Confirm boundaries match title deed. Check for squatters, encroachments, access roads.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-800">3. Verify Seller's Identity</p>
                        <p className="text-sm text-gray-700">Confirm seller's ID matches title deed owner EXACTLY (names, ID number). Meet seller in person. Beware of 'representatives' or 'brokers'.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-800">4. Check Land Rates Clearance</p>
                        <p className="text-sm text-gray-700">Seller must provide rates clearance certificate from county. Confirms rates paid to date. Buyer responsible for future rates.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-800">5. Verify Planning/Zoning Approvals</p>
                        <p className="text-sm text-gray-700">Visit county planning office. Confirm land use (residential, agricultural, commercial). Check if subdivision approval exists (for plots from larger parcel).</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-800">6. Hire Licensed Lawyer</p>
                        <p className="text-sm text-gray-700">Use Law Society of Kenya registered advocate (verify at LSK). Cost: KES 50,000-150,000. Lawyer handles transfer, protects your interests.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-800">7. Confirm Land Control Board Consent (if required)</p>
                        <p className="text-sm text-gray-700">Required for agricultural land transfers. Application through District Land Registrar. Takes 2-4 weeks.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-800">8. Pay Via Banker's Cheque ONLY After Title Transfer</p>
                        <p className="text-sm text-gray-700">NEVER pay cash. NEVER pay before title deed transferred to your name. Use banker's cheque payable to seller ONLY after lawyer confirms transfer complete.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transfer Process */}
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <Scale className="h-8 w-8 text-green-600" />
                  <h3 className="text-2xl font-bold">Land Transfer Process (Step-by-Step)</h3>
                </div>

                <ol className="space-y-3 list-decimal list-inside text-gray-700">
                  <li className="font-semibold">Find Land & Negotiate Price
                    <p className="ml-6 mt-1 font-normal text-sm">Browse NewKenyan.com verified listings. Negotiate price based on market rates, land condition, location.</p>
                  </li>
                  <li className="font-semibold">Sign Sale Agreement
                    <p className="ml-6 mt-1 font-normal text-sm">Lawyer drafts agreement specifying price, payment terms, handover date. Pay 10% deposit to show commitment.</p>
                  </li>
                  <li className="font-semibold">Conduct Due Diligence
                    <p className="ml-6 mt-1 font-normal text-sm">Complete all 8 checklist items above. Takes 2-4 weeks if done properly.</p>
                  </li>
                  <li className="font-semibold">Pay Stamp Duty
                    <p className="ml-6 mt-1 font-normal text-sm">Pay 4% of land value to Kenya Revenue Authority. Required before transfer registration.</p>
                  </li>
                  <li className="font-semibold">Obtain Land Control Board Consent (if required)
                    <p className="ml-6 mt-1 font-normal text-sm">Application submitted by lawyer. Takes 2-4 weeks for approval.</p>
                  </li>
                  <li className="font-semibold">Submit Transfer Documents to Land Registry
                    <p className="ml-6 mt-1 font-normal text-sm">Lawyer submits transfer forms, stamped sale agreement, consents. Registry processes 2-4 weeks.</p>
                  </li>
                  <li className="font-semibold">Complete Payment
                    <p className="ml-6 mt-1 font-normal text-sm">Pay balance (90%) via banker's cheque ONLY after lawyer confirms transfer approved.</p>
                  </li>
                  <li className="font-semibold">Receive New Title Deed
                    <p className="ml-6 mt-1 font-normal text-sm">Land Registry issues new title in your name. Takes 1-2 weeks. Lawyer collects and hands to you.</p>
                  </li>
                  <li className="font-semibold">Take Possession & Register Rates
                    <p className="ml-6 mt-1 font-normal text-sm">Visit land, install beacons/fence if needed. Register with county for land rates payments.</p>
                  </li>
                </ol>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200 mt-6">
                  <p className="text-sm text-green-800"><strong>Total Timeline:</strong> 1-3 months for smooth transaction. Delays from missing documents, disputes, or registry backlog can extend to 3-6 months.</p>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <DollarSign className="h-8 w-8 text-green-600" />
                  <h3 className="text-2xl font-bold">Complete Cost Breakdown (Budget 6-10% of Land Value)</h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-2 text-left">Cost Item</th>
                        <th className="border p-2 text-left">Calculation</th>
                        <th className="border p-2 text-right">Example (KES 3M land)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2">Land Price</td>
                        <td className="border p-2">Negotiated amount</td>
                        <td className="border p-2 text-right font-bold">KES 3,000,000</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border p-2">Stamp Duty</td>
                        <td className="border p-2">4% of land value</td>
                        <td className="border p-2 text-right">KES 120,000</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Legal Fees</td>
                        <td className="border p-2">2-5% (negotiable)</td>
                        <td className="border p-2 text-right">KES 90,000</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border p-2">Land Search</td>
                        <td className="border p-2">Official fee</td>
                        <td className="border p-2 text-right">KES 500</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Survey Fees</td>
                        <td className="border p-2">If survey needed</td>
                        <td className="border p-2 text-right">KES 30,000</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border p-2">Land Registry Fees</td>
                        <td className="border p-2">Processing & new title</td>
                        <td className="border p-2 text-right">KES 10,000</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Valuation (if loan)</td>
                        <td className="border p-2">Bank requirement</td>
                        <td className="border p-2 text-right">KES 15,000</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Land Rates Clearance</td>
                        <td className="border p-2">Outstanding rates</td>
                        <td className="border p-2 text-right">KES 5,000</td>
                      </tr>
                      <tr className="bg-green-50 font-bold">
                        <td className="border p-2">TOTAL COST</td>
                        <td className="border p-2"></td>
                        <td className="border p-2 text-right text-green-600">KES 3,270,500</td>
                      </tr>
                      <tr className="bg-green-100 font-bold">
                        <td className="border p-2" colSpan={2}>Additional Costs (9% of land value)</td>
                        <td className="border p-2 text-right text-green-600">KES 270,500</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Listings Grid */}
      <section id="listings" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Browse Land for Sale in Kenya</h2>

          {/* Filters */}
          <div className="max-w-5xl mx-auto mb-8">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Filter by County</label>
                <select
                  value={selectedCounty}
                  onChange={(e) => setSelectedCounty(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  {counties.map((county) => (
                    <option key={county.value} value={county.value}>
                      {county.label} {county.count && `(${county.count})`}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Filter by Price Range</label>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  {priceRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Land Type</label>
                <select
                  value={selectedLandType}
                  onChange={(e) => setSelectedLandType(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="all">All Types</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="agricultural">Agricultural</option>
                </select>
              </div>
            </div>
          </div>

          {/* Listings */}
          {loading ? (
            <GridLoadingSkeleton count={6} />
          ) : properties.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>

              <div className="text-center mt-8">
                <Link href="/land-for-sale">
                  <Button size="lg">
                    View All Land for Sale
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No land found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters</p>
              <Link href="/land-for-sale">
                <Button>Browse All Land</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Internal Linking Section - Browse by Location */}
      <section className="py-12 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Browse Land for Sale by Location</h2>
            <p className="text-center text-gray-600 mb-8">Explore land opportunities across Kenya for investment, residential, or commercial development</p>

            {/* By County */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Land for Sale by County</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                <Link href="/land-for-sale/nairobi-county" className="px-4 py-2 bg-gray-100 hover:bg-green-50 hover:text-green-600 rounded-lg text-center transition-colors border border-gray-200 hover:border-green-500">
                  Nairobi
                </Link>
                <Link href="/land-for-sale/kiambu-county" className="px-4 py-2 bg-gray-100 hover:bg-green-50 hover:text-green-600 rounded-lg text-center transition-colors border border-gray-200 hover:border-green-500">
                  Kiambu
                </Link>
                <Link href="/land-for-sale/machakos-county" className="px-4 py-2 bg-gray-100 hover:bg-green-50 hover:text-green-600 rounded-lg text-center transition-colors border border-gray-200 hover:border-green-500">
                  Machakos
                </Link>
                <Link href="/land-for-sale/kajiado-county" className="px-4 py-2 bg-gray-100 hover:bg-green-50 hover:text-green-600 rounded-lg text-center transition-colors border border-gray-200 hover:border-green-500">
                  Kajiado
                </Link>
                <Link href="/land-for-sale/mombasa-county" className="px-4 py-2 bg-gray-100 hover:bg-green-50 hover:text-green-600 rounded-lg text-center transition-colors border border-gray-200 hover:border-green-500">
                  Mombasa
                </Link>
                <Link href="/land-for-sale/nakuru-county" className="px-4 py-2 bg-gray-100 hover:bg-green-50 hover:text-green-600 rounded-lg text-center transition-colors border border-gray-200 hover:border-green-500">
                  Nakuru
                </Link>
              </div>
            </div>

            {/* Prime Investment Areas */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Prime Investment Areas</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                <Link href="/land-for-sale/syokimau" className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 rounded-lg text-center transition-colors border border-green-200 hover:border-green-500 font-medium">
                  Syokimau
                </Link>
                <Link href="/land-for-sale/ruiru" className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 rounded-lg text-center transition-colors border border-green-200 hover:border-green-500 font-medium">
                  Ruiru
                </Link>
                <Link href="/land-for-sale/kitengela" className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 rounded-lg text-center transition-colors border border-green-200 hover:border-green-500 font-medium">
                  Kitengela
                </Link>
                <Link href="/land-for-sale/thika" className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 rounded-lg text-center transition-colors border border-green-200 hover:border-green-500 font-medium">
                  Thika
                </Link>
                <Link href="/land-for-sale/juja" className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 rounded-lg text-center transition-colors border border-green-200 hover:border-green-500 font-medium">
                  Juja
                </Link>
              </div>
            </div>

            {/* Budget-Friendly Land Areas */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Affordable Land Opportunities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                <Link href="/land-for-sale/ngong" className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 rounded-lg text-center transition-colors border border-blue-200 hover:border-blue-500">
                  Ngong
                </Link>
                <Link href="/land-for-sale/rongai" className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 rounded-lg text-center transition-colors border border-blue-200 hover:border-blue-500">
                  Rongai
                </Link>
                <Link href="/land-for-sale/konza" className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 rounded-lg text-center transition-colors border border-blue-200 hover:border-blue-500">
                  Konza City
                </Link>
                <Link href="/land-for-sale/makuyu" className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 rounded-lg text-center transition-colors border border-blue-200 hover:border-blue-500">
                  Makuyu
                </Link>
                <Link href="/land-for-sale/nanyuki" className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 rounded-lg text-center transition-colors border border-blue-200 hover:border-blue-500">
                  Nanyuki
                </Link>
              </div>
            </div>

            {/* Related Property Searches */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Related Property Searches</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <Link href="/houses-for-rent-nairobi" className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-center transition-colors border border-gray-300 hover:border-gray-500">
                  Houses for Rent Nairobi
                </Link>
                <Link href="/3-bedroom-house-for-rent" className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-center transition-colors border border-gray-300 hover:border-gray-500">
                  3 Bedroom Houses
                </Link>
                <Link href="/apartments-for-rent-nairobi" className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-center transition-colors border border-gray-300 hover:border-gray-500">
                  Apartments Nairobi
                </Link>
                <Link href="/apartments-westlands" className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-center transition-colors border border-gray-300 hover:border-gray-500">
                  Westlands Apartments
                </Link>
                <Link href="/apartments-kilimani" className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-center transition-colors border border-gray-300 hover:border-gray-500">
                  Kilimani Apartments
                </Link>
                <Link href="/cheap-apartments-nairobi" className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-center transition-colors border border-gray-300 hover:border-gray-500">
                  Cheap Apartments Nairobi
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
            <h2 className="text-2xl font-bold mb-8 text-center">Why Buy Land Through NewKenyan.com?</h2>

            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <Award className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">13+ Awards</h3>
                <p className="text-sm text-gray-600">Industry excellence</p>
              </div>

              <div>
                <Shield className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">8+ Years</h3>
                <p className="text-sm text-gray-600">Trusted land experts</p>
              </div>

              <div>
                <Users className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Agency Partnerships</h3>
                <p className="text-sm text-gray-600">Partnering with trusted agencies</p>
              </div>

              <div>
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Verified Sellers</h3>
                <p className="text-sm text-gray-600">All land vetted</p>
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
