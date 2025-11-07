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
  School, ShoppingCart, Wifi, Car, Camera, Droplet
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

export default function TwoBedroomApartmentNairobiClient() {
  const [properties, setProperties] = useState<PropertyListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  useEffect(() => {
    fetchProperties();
  }, [selectedNeighborhood, selectedPriceRange]);

  const fetchProperties = async () => {
    try {
      setLoading(true);

      let query = supabase
        .from('property_listings')
        .select('*')
        .eq('is_approved', true)
        .eq('property_type', 'Apartment')
        .eq('bedrooms', 2)
        .eq('price_type', 'rent')
        .ilike('city', '%nairobi%')
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (selectedNeighborhood !== 'all') {
        query = query.ilike('city', `%${selectedNeighborhood}%`);
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
      question: "What is the average rent for a 2-bedroom apartment in Nairobi in 2025?",
      answer: "The average rent for <strong>2-bedroom apartments in Nairobi</strong> ranges from <strong>KES 25,000 to 70,000 per month</strong>, depending on location and amenities. Budget-friendly options in <a href='/apartments-for-rent/nairobi-county?city=Umoja&bedrooms=2' class='text-green-600 hover:underline'>Umoja</a> and <a href='/apartments-for-rent/nairobi-county?city=Buruburu&bedrooms=2' class='text-green-600 hover:underline'>Buruburu</a> start at KES 25,000-35,000, while premium areas like <a href='/apartments-for-rent/nairobi-county?city=Westlands&bedrooms=2' class='text-green-600 hover:underline'>Westlands</a> (KES 50,000-80,000) and <a href='/apartments-for-rent/nairobi-county?city=Karen&bedrooms=2' class='text-green-600 hover:underline'>Karen</a> (KES 60,000-100,000) command higher prices. 2BR apartments are the most searched property type, accounting for 40% of all rental queries on NewKenyan.com."
    },
    {
      question: "Which are the best neighborhoods for 2-bedroom apartments suitable for families in Nairobi?",
      answer: "Top family-friendly neighborhoods for 2BR apartments include: <a href='/apartments-for-rent/nairobi-county?city=Kileleshwa&bedrooms=2' class='text-green-600 hover:underline'>Kileleshwa</a> (excellent schools, quiet, safe), <a href='/apartments-for-rent/nairobi-county?city=Lavington&bedrooms=2' class='text-green-600 hover:underline'>Lavington</a> (upscale, international schools nearby), <a href='/apartments-for-rent/nairobi-county?city=Parklands&bedrooms=2' class='text-green-600 hover:underline'>Parklands</a> (diverse community, good schools), <a href='/apartments-for-rent/nairobi-county?city=South C&bedrooms=2' class='text-green-600 hover:underline'>South C</a> (family estates, playgrounds), and <a href='/apartments-for-rent/nairobi-county?city=Karen&bedrooms=2' class='text-green-600 hover:underline'>Karen</a> (spacious, nature, premium schools). All offer proximity to quality schools, shopping centers, healthcare facilities, and children-friendly amenities like parks and play areas."
    },
    {
      question: "What amenities should I expect in a modern 2-bedroom apartment in Nairobi?",
      answer: "Modern 2BR apartments in Nairobi typically include: <strong>Essential amenities</strong> - 24/7 security with CCTV, backup generator, borehole/water tanks, parking (1-2 slots), high-speed fiber internet connectivity, DSTV connections. <strong>Premium amenities</strong> - Swimming pool, fully-equipped gym, children's play area, landscaped gardens, concierge/reception, lifts/elevators, intercom systems, laundry facilities, BBQ areas. <a href='/apartments-for-rent/nairobi-county?city=Westlands&bedrooms=2' class='text-green-600 hover:underline'>Westlands</a> and <a href='/apartments-for-rent/nairobi-county?city=Kilimani&bedrooms=2' class='text-green-600 hover:underline'>Kilimani</a> apartments often feature smart home technology, prepaid electricity/water, and roof-top terraces."
    },
    {
      question: "Should I rent a furnished or unfurnished 2-bedroom apartment in Nairobi?",
      answer: "<strong>Furnished 2BR apartments</strong> cost 20-30% more (KES 10,000-20,000 extra monthly) but include furniture, appliances, kitchenware, and sometimes utilities. Ideal for expats, short-term stays (3-12 months), or professionals relocating to Nairobi. <strong>Unfurnished apartments</strong> offer better long-term value, flexibility to personalize, and typically lower deposits. Best for families planning to stay 1+ years. Areas like <a href='/apartments-for-rent/nairobi-county?city=Westlands&bedrooms=2' class='text-green-600 hover:underline'>Westlands</a> and <a href='/apartments-for-rent/nairobi-county?city=Kilimani&bedrooms=2' class='text-green-600 hover:underline'>Kilimani</a> have the highest availability of furnished options. View our <a href='/apartments-for-rent/nairobi-county?bedrooms=2&min_price=40000' class='text-green-600 hover:underline'>premium 2BR listings</a> for furnished options."
    },
    {
      question: "What are the average utility costs for a 2-bedroom apartment in Nairobi?",
      answer: "Monthly utility costs for 2BR apartments average <strong>KES 5,000-10,000</strong>, broken down as: <strong>Electricity:</strong> KES 2,500-5,000 (higher with AC, electric shower), <strong>Water:</strong> KES 1,000-2,000 (many apartments include in rent), <strong>Internet (fiber):</strong> KES 1,500-3,000 (20-50 Mbps), <strong>DSTV:</strong> KES 1,500-3,000 (optional), <strong>Waste/Service charge:</strong> KES 500-2,000 (varies by estate). Gated communities in <a href='/apartments-for-rent/nairobi-county?city=Westlands' class='text-green-600 hover:underline'>Westlands</a> and <a href='/apartments-for-rent/nairobi-county?city=Kilimani' class='text-green-600 hover:underline'>Kilimani</a> may have service charges of KES 3,000-5,000 covering security, cleaning, and facility maintenance."
    },
    {
      question: "Are there pet-friendly 2-bedroom apartments in Nairobi?",
      answer: "Yes, many modern apartment complexes allow pets, especially in upscale neighborhoods like <a href='/apartments-for-rent/nairobi-county?city=Westlands&bedrooms=2' class='text-green-600 hover:underline'>Westlands</a>, <a href='/apartments-for-rent/nairobi-county?city=Kilimani&bedrooms=2' class='text-green-600 hover:underline'>Kilimani</a>, <a href='/apartments-for-rent/nairobi-county?city=Lavington&bedrooms=2' class='text-green-600 hover:underline'>Lavington</a>, and <a href='/apartments-for-rent/nairobi-county?city=Karen&bedrooms=2' class='text-green-600 hover:underline'>Karen</a>. Pet policies vary: some landlords charge extra deposit (KES 5,000-10,000), monthly pet fee (KES 1,000-2,000), or have breed/size restrictions. Always confirm pet policy before viewing. Ground-floor apartments with gardens are ideal for pet owners. Contact landlords directly through our platform to discuss pet arrangements."
    },
    {
      question: "How many parking spaces come with a 2-bedroom apartment?",
      answer: "Most 2-bedroom apartments in Nairobi include <strong>1-2 parking spaces</strong>. <strong>Standard apartments</strong> (KES 25,000-40,000) typically offer 1 covered or open parking slot. <strong>Premium apartments</strong> (KES 50,000+) in <a href='/apartments-for-rent/nairobi-county?city=Westlands&bedrooms=2' class='text-green-600 hover:underline'>Westlands</a>, <a href='/apartments-for-rent/nairobi-county?city=Kilimani&bedrooms=2' class='text-green-600 hover:underline'>Kilimani</a>, and <a href='/apartments-for-rent/nairobi-county?city=Karen&bedrooms=2' class='text-green-600 hover:underline'>Karen</a> provide 2 basement parking spots with some offering visitor parking. Additional parking may cost KES 1,000-3,000/month. Always verify parking allocation before signing lease, especially if you own multiple vehicles."
    },
    {
      question: "What security features should I look for in a 2-bedroom apartment?",
      answer: "Essential security features for 2BR apartments include: <strong>Perimeter security:</strong> 24/7 trained security guards, secure main gate with access control, perimeter wall/fence with electric wire. <strong>Surveillance:</strong> CCTV cameras at entry/exit points, hallways, parking areas - verify if cameras are operational. <strong>Unit security:</strong> Metal/security doors, window grills, intercom system, deadbolt locks. <strong>Estate security:</strong> Well-lit compounds, security patrols, visitor logbook. Premium apartments in <a href='/apartments-for-rent/nairobi-county?city=Kileleshwa&bedrooms=2' class='text-green-600 hover:underline'>Kileleshwa</a> and <a href='/apartments-for-rent/nairobi-county?city=Lavington&bedrooms=2' class='text-green-600 hover:underline'>Lavington</a> often feature biometric access and integrated alarm systems."
    },
    {
      question: "When is the best time to rent a 2-bedroom apartment in Nairobi?",
      answer: "The <strong>best time to rent 2BR apartments</strong> in Nairobi is during low-demand periods: <strong>March-April</strong> (post-holiday lull) and <strong>November-December</strong> (before festive season). During these months, landlords are more willing to negotiate on rent (5-10% discount possible) and deposit terms. <strong>High-demand periods</strong> (January-February, June-July) see limited availability and firm pricing as students return and professionals relocate. For premium apartments in <a href='/apartments-for-rent/nairobi-county?city=Westlands&bedrooms=2' class='text-green-600 hover:underline'>Westlands</a> and <a href='/apartments-for-rent/nairobi-county?city=Kilimani&bedrooms=2' class='text-green-600 hover:underline'>Kilimani</a>, early viewing is crucial as quality units rent within 2-3 weeks."
    },
    {
      question: "What documents are required to rent a 2-bedroom apartment in Nairobi?",
      answer: "Standard documents for renting 2BR apartments: <strong>Personal identification:</strong> Copy of National ID or Passport, 2 passport-size photos. <strong>Financial proof:</strong> Last 3 months' payslips (for employed), Bank statements (6 months for self-employed), KRA PIN certificate, Employment contract/letter. <strong>References:</strong> Previous landlord reference letter, Character reference (employer/professional). <strong>Guarantor:</strong> Some landlords require guarantor with similar documentation. <strong>Upfront payment:</strong> Be prepared for 2-4 months' rent (1-2 months deposit + 1 month rent + sometimes 1 month refundable deposit). Always get signed tenancy agreement before payment."
    },
    {
      question: "How much deposit is required for a 2-bedroom apartment in Nairobi?",
      answer: "Deposit requirements for 2BR apartments typically total <strong>2-4 months' rent upfront</strong>: <strong>Standard breakdown:</strong> 1 month advance rent, 1-2 months rent deposit (refundable), sometimes additional 1 month security deposit. <strong>Example:</strong> For KES 40,000/month apartment, expect to pay KES 80,000-160,000 upfront. <strong>Premium apartments</strong> in <a href='/apartments-for-rent/nairobi-county?city=Westlands&bedrooms=2' class='text-green-600 hover:underline'>Westlands</a> and <a href='/apartments-for-rent/nairobi-county?city=Karen&bedrooms=2' class='text-green-600 hover:underline'>Karen</a> may require 3-4 months. <strong>Negotiation tip:</strong> Offering 6-12 months rent upfront can reduce monthly rent by 5-10%. Deposits are refundable upon vacating if property is in good condition."
    },
    {
      question: "What is the difference between a 2-bedroom apartment and a 2-bedroom house in Nairobi?",
      answer: "<strong>2-Bedroom Apartments:</strong> Typically in multi-story buildings, shared compound/amenities (pool, gym, security), lower utility costs, easier maintenance, better for city center living, rent: KES 25,000-70,000. Common in <a href='/apartments-for-rent/nairobi-county?city=Westlands&bedrooms=2' class='text-green-600 hover:underline'>Westlands</a>, <a href='/apartments-for-rent/nairobi-county?city=Kilimani&bedrooms=2' class='text-green-600 hover:underline'>Kilimani</a>. <strong>2-Bedroom Houses:</strong> Standalone or maisonettes, private compound/garden, more space and privacy, higher utilities, pet-friendly, better for families with children, rent: KES 30,000-80,000. View <a href='/2-bedroom-houses-for-rent' class='text-green-600 hover:underline'>2-bedroom houses</a> or <a href='/houses-for-rent-nairobi' class='text-green-600 hover:underline'>all houses for rent in Nairobi</a>."
    },
    {
      question: "Is it advisable to get a roommate or flatmate for a 2-bedroom apartment?",
      answer: "Getting a roommate/flatmate for a 2BR apartment can <strong>reduce costs by 40-50%</strong> but requires careful consideration. <strong>Advantages:</strong> Split rent (KES 20,000-35,000 each instead of KES 40,000-70,000 solo), shared utilities (save KES 2,500-5,000), shared household responsibilities, enhanced security. <strong>Considerations:</strong> Ensure landlord allows subletting (check tenancy agreement), both parties on lease or clear sublease terms, compatible lifestyle/habits, written roommate agreement, split deposit responsibility. Popular for young professionals in <a href='/apartments-for-rent/nairobi-county?city=Kilimani&bedrooms=2' class='text-green-600 hover:underline'>Kilimani</a> and <a href='/apartments-for-rent/nairobi-county?city=Westlands&bedrooms=2' class='text-green-600 hover:underline'>Westlands</a>. Some apartments explicitly market as 'co-living spaces.'"
    },
    {
      question: "Which neighborhoods have the best schools near 2-bedroom apartments?",
      answer: "<strong>Top school-proximity neighborhoods for families:</strong> <a href='/apartments-for-rent/nairobi-county?city=Kileleshwa&bedrooms=2' class='text-green-600 hover:underline'>Kileleshwa</a> - Riara Group of Schools, Kileleshwa Academy, Consolata Primary. <a href='/apartments-for-rent/nairobi-county?city=Lavington&bedrooms=2' class='text-green-600 hover:underline'>Lavington</a> - Braeside School, Lavington International, Rusinga School. <a href='/apartments-for-rent/nairobi-county?city=Westlands&bedrooms=2' class='text-green-600 hover:underline'>Westlands</a> - Westlands Primary, International School of Kenya (ISK). <a href='/apartments-for-rent/nairobi-county?city=Parklands&bedrooms=2' class='text-green-600 hover:underline'>Parklands</a> - Aga Khan Academy, Parklands Baptist. <a href='/apartments-for-rent/nairobi-county?city=Karen&bedrooms=2' class='text-green-600 hover:underline'>Karen</a> - Brookhouse, Karen C Primary, Kazuri School. These areas offer mix of public, private, and international schools within 5-10 minutes drive."
    },
    {
      question: "What is the notice period for vacating a 2-bedroom apartment in Nairobi?",
      answer: "Standard notice period is <strong>1-3 months</strong>, specified in your tenancy agreement. <strong>Common terms:</strong> Month-to-month leases: 1 month notice, 1-year leases: 2-3 months notice, Premium apartments: Often require 3 months. <strong>Proper procedure:</strong> Provide written notice (email + hard copy) to landlord, continue paying rent during notice period, schedule exit inspection, ensure all utilities paid, repair any damages beyond normal wear, clean thoroughly. <strong>Deposit refund:</strong> Processed 14-30 days after vacating, following inspection. Deductions may apply for damages, unpaid utilities, or incomplete notice period. Document property condition with photos/videos at move-out."
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
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "2 Bedroom Apartment Nairobi",
        "item": "https://newkenyan.com/2-bedroom-apartment-nairobi"
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
            <Link href="/apartments-for-rent-nairobi" className="hover:text-green-600">Apartments Nairobi</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">2 Bedroom Apartments</span>
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
              2 Bedroom Apartment Nairobi: Family-Friendly Rentals 2025
            </h1>

            <p className="text-lg md:text-xl text-gray-700 mb-8 text-center max-w-4xl mx-auto leading-relaxed">
              Discover the perfect 2-bedroom apartment in Nairobi for your family. Browse 500+ verified listings from KES 25,000-70,000/month in premium neighborhoods like Westlands, Kilimani, Karen, Lavington, Kileleshwa, and Parklands. Modern amenities, family-friendly features, and direct landlord contacts.
            </p>

            {/* Trust Signals */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="flex items-center justify-center mb-2">
                  <Building2 className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">2BR Listings</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="flex items-center justify-center mb-2">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">8+ Years</div>
                <div className="text-sm text-gray-600">Market Expertise</div>
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
                <a href="#features" className="text-sm text-green-600 hover:underline">Family Features</a>
                <a href="#listings" className="text-sm text-green-600 hover:underline">Latest Listings</a>
                <a href="#guide" className="text-sm text-green-600 hover:underline">Renter's Guide</a>
                <a href="#amenities" className="text-sm text-green-600 hover:underline">Modern Amenities</a>
                <a href="#faqs" className="text-sm text-green-600 hover:underline">FAQs (15)</a>
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
              2 Bedroom Apartments in Nairobi 2025: The Complete Market Guide
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>2-bedroom apartments are the most sought-after property type in Nairobi</strong>, accounting for 40% of all rental searches on NewKenyan.com in 2024-2025. This popularity stems from their versatility - ideal for small families with 1-2 children, young couples planning to start families, professionals needing a home office, or roommates sharing costs. With over <Link href="/apartments-for-rent/nairobi-county?bedrooms=2" className="text-green-600 hover:underline">500+ verified 2BR apartment listings</Link> across Nairobi, our platform connects you directly with landlords offering the perfect balance of space, affordability, and modern amenities.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-6">
              <h3 className="font-bold text-blue-900 mb-2 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Why 2-Bedroom Apartments Dominate Nairobi's Rental Market
              </h3>
              <ul className="list-disc list-inside text-blue-900 space-y-2">
                <li><strong>Perfect size for families:</strong> Accommodates couples with 1-2 children comfortably</li>
                <li><strong>Work-from-home ready:</strong> Extra bedroom doubles as home office or study</li>
                <li><strong>Cost-effective:</strong> Best value per square foot compared to 1BR or 3BR units</li>
                <li><strong>Roommate-friendly:</strong> Popular among young professionals sharing costs (save 40-50%)</li>
                <li><strong>Resale value:</strong> Highest demand if you later buy for investment</li>
                <li><strong>Growing supply:</strong> Developers prioritize 2BR units in new projects</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              The <strong>2-bedroom apartment rental market in Nairobi</strong> offers exceptional diversity, from budget-friendly family estates in <Link href="/apartments-for-rent/nairobi-county?city=Umoja&bedrooms=2" className="text-green-600 hover:underline">Umoja</Link> and <Link href="/apartments-for-rent/nairobi-county?city=Buruburu&bedrooms=2" className="text-green-600 hover:underline">Buruburu</Link> starting at KES 25,000/month to ultra-modern high-rises in <Link href="/apartments-for-rent/nairobi-county?city=Westlands&bedrooms=2" className="text-green-600 hover:underline">Westlands</Link> and <Link href="/apartments-for-rent/nairobi-county?city=Kilimani&bedrooms=2" className="text-green-600 hover:underline">Kilimani</Link> commanding KES 50,000-80,000/month. The sweet spot for most families is <strong>KES 35,000-50,000</strong>, which typically secures a well-maintained apartment in safe neighborhoods like <Link href="/apartments-for-rent/nairobi-county?city=Kileleshwa&bedrooms=2" className="text-green-600 hover:underline">Kileleshwa</Link>, <Link href="/apartments-for-rent/nairobi-county?city=Parklands&bedrooms=2" className="text-green-600 hover:underline">Parklands</Link>, or <Link href="/apartments-for-rent/nairobi-county?city=Lavington&bedrooms=2" className="text-green-600 hover:underline">Lavington</Link> with essential amenities like 24/7 security, parking, backup power, and water.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              At <Link href="/" className="text-green-600 hover:underline font-semibold">NewKenyan.com</Link>, we've been Kenya's trusted property marketplace for over <strong>8 years</strong>, having successfully connected over <strong>50,000+ tenants</strong> with their ideal homes. Our platform has won <strong>13+ industry awards</strong>, including Best Real Estate Marketing Platform (2023), Property Marketplace of the Year (2023), and Digital Innovation Excellence Award. As an official partner of the <strong>Kenya Property Developers Association (KPDA)</strong>, all our 2-bedroom apartment listings undergo verification to ensure authenticity, accurate pricing, and legitimate landlord contacts - eliminating the risk of scams that plague other platforms.
            </p>

            <div className="bg-green-50 border-l-4 border-green-600 p-6 my-6">
              <h3 className="font-bold text-green-900 mb-3">2025 Expert Market Insights for 2BR Apartments</h3>
              <div className="text-green-900 space-y-3">
                <p><strong>Price trends:</strong> 2-bedroom apartments in premium areas (Westlands, Kilimani, Karen) have seen 5-8% rent increases year-over-year due to high demand from expatriates and upwardly mobile professionals. However, suburban areas like <Link href="/apartments-for-rent/nairobi-county?city=Ruaka&bedrooms=2" className="text-green-600 hover:underline">Ruaka</Link>, <Link href="/apartments-for-rent/nairobi-county?city=Syokimau&bedrooms=2" className="text-green-600 hover:underline">Syokimau</Link>, and <Link href="/apartments-for-rent/nairobi-county?city=Kitengela&bedrooms=2" className="text-green-600 hover:underline">Kitengela</Link> maintain stable pricing with exceptional value (KES 20,000-35,000 for modern units).</p>
                <p><strong>Supply dynamics:</strong> Over 3,000 new 2BR units entered the Nairobi market in 2024, concentrated in Ruaka (800+ units), Syokimau (600+ units), and Kasarani (500+ units). This increased supply in suburbs creates opportunities for negotiation, with landlords offering incentives like 1 month free rent for 1-year leases.</p>
                <p><strong>Emerging preferences:</strong> Post-pandemic, 2BR apartments with dedicated home office space, fiber internet connectivity (100 Mbps+), and outdoor areas (balconies, terraces) command 10-15% premiums. Families increasingly prioritize proximity to quality schools over CBD access.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Price Range Breakdown - 2BR Specific */}
      <section id="price-ranges" className="py-12 bg-gray-50">
        <div className="container mx-auto px-3">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              2 Bedroom Apartment Prices in Nairobi: Complete Breakdown by Area
            </h2>
            <p className="text-gray-700 mb-8">
              Understanding the price landscape helps you make informed decisions. Here's a comprehensive breakdown of what to expect across different price ranges for 2-bedroom apartments in Nairobi:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Budget Range */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Budget-Friendly</h3>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">KES 25K-35K</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Typical Neighborhoods:</h4>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Link href="/apartments-for-rent/nairobi-county?city=Umoja&bedrooms=2" className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-green-100">Umoja</Link>
                      <Link href="/apartments-for-rent/nairobi-county?city=Buruburu&bedrooms=2" className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-green-100">Buruburu</Link>
                      <Link href="/apartments-for-rent/nairobi-county?city=Donholm&bedrooms=2" className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-green-100">Donholm</Link>
                      <Link href="/apartments-for-rent/nairobi-county?city=Kasarani&bedrooms=2" className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-green-100">Kasarani</Link>
                      <Link href="/apartments-for-rent/nairobi-county?city=Embakasi&bedrooms=2" className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-green-100">Embakasi</Link>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">What You Get:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>✓ Secure gated estates with perimeter walls</li>
                      <li>✓ Basic amenities: security guards, parking</li>
                      <li>✓ 2-3 bathrooms, open-plan kitchen</li>
                      <li>✓ Borehole water, backup power (varies)</li>
                      <li>✓ Near schools, shopping centers, hospitals</li>
                      <li>✓ Matatu access to CBD (30-45 mins)</li>
                    </ul>
                  </div>
                  <div className="pt-3 border-t">
                    <p className="text-sm text-gray-600 mb-3"><strong>Best for:</strong> Young families on budget, first-time renters, cost-conscious professionals</p>
                    <Link href="/apartments-for-rent/nairobi-county?bedrooms=2&min_price=25000&max_price=35000" className="block w-full text-center bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold text-sm">
                      View 2BR KES 25K-35K →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Mid-Range */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Mid-Range Comfort</h3>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">KES 35K-50K</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Typical Neighborhoods:</h4>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Link href="/apartments-for-rent/nairobi-county?city=Parklands&bedrooms=2" className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-blue-100">Parklands</Link>
                      <Link href="/apartments-for-rent/nairobi-county?city=Kileleshwa&bedrooms=2" className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-blue-100">Kileleshwa</Link>
                      <Link href="/apartments-for-rent/nairobi-county?city=South C&bedrooms=2" className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-blue-100">South C</Link>
                      <Link href="/apartments-for-rent/nairobi-county?city=Langata&bedrooms=2" className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-blue-100">Lang'ata</Link>
                      <Link href="/apartments-for-rent/nairobi-county?city=Ngong Road&bedrooms=2" className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-blue-100">Ngong Road</Link>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">What You Get:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>✓ Modern finishes, en-suite master bedroom</li>
                      <li>✓ 24/7 security + CCTV surveillance</li>
                      <li>✓ Backup generator, reliable borehole water</li>
                      <li>✓ 1-2 parking slots (covered/basement)</li>
                      <li>✓ Fiber internet ready, DSTV connections</li>
                      <li>✓ Some with gym, swimming pool, play area</li>
                      <li>✓ Quality schools within 5-10 mins</li>
                    </ul>
                  </div>
                  <div className="pt-3 border-t">
                    <p className="text-sm text-gray-600 mb-3"><strong>Best for:</strong> Growing families, professionals seeking quality, work-from-home setup</p>
                    <Link href="/apartments-for-rent/nairobi-county?bedrooms=2&min_price=35000&max_price=50000" className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm">
                      View 2BR KES 35K-50K →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Premium Range */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Premium Living</h3>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">KES 50K-70K</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Typical Neighborhoods:</h4>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Link href="/apartments-for-rent/nairobi-county?city=Westlands&bedrooms=2" className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-purple-100">Westlands</Link>
                      <Link href="/apartments-for-rent/nairobi-county?city=Kilimani&bedrooms=2" className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-purple-100">Kilimani</Link>
                      <Link href="/apartments-for-rent/nairobi-county?city=Lavington&bedrooms=2" className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-purple-100">Lavington</Link>
                      <Link href="/apartments-for-rent/nairobi-county?city=Riverside&bedrooms=2" className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-purple-100">Riverside</Link>
                      <Link href="/apartments-for-rent/nairobi-county?city=Runda&bedrooms=2" className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-purple-100">Runda</Link>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">What You Get:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>✓ High-rise apartments, elevator access</li>
                      <li>✓ Luxury finishes, spacious layouts (1,200+ sq ft)</li>
                      <li>✓ Full amenities: gym, pool, sauna, rooftop lounge</li>
                      <li>✓ Concierge/reception, intercom systems</li>
                      <li>✓ High-speed fiber internet (100+ Mbps)</li>
                      <li>✓ Premium security: biometric access, 24/7 CCTV</li>
                      <li>✓ Walking distance to malls, restaurants, offices</li>
                      <li>✓ Some furnished options available</li>
                    </ul>
                  </div>
                  <div className="pt-3 border-t">
                    <p className="text-sm text-gray-600 mb-3"><strong>Best for:</strong> Executives, expatriates, families seeking luxury lifestyle</p>
                    <Link href="/apartments-for-rent/nairobi-county?bedrooms=2&min_price=50000&max_price=70000" className="block w-full text-center bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors font-semibold text-sm">
                      View 2BR KES 50K-70K →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Ultra-Luxury Range */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-orange-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Ultra-Luxury</h3>
                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">KES 70K+</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Typical Neighborhoods:</h4>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Link href="/apartments-for-rent/nairobi-county?city=Karen&bedrooms=2" className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-orange-100">Karen</Link>
                      <Link href="/apartments-for-rent/nairobi-county?city=Runda&bedrooms=2" className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-orange-100">Runda</Link>
                      <Link href="/apartments-for-rent/nairobi-county?city=Westlands&bedrooms=2" className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-orange-100">Westlands (Penthouse)</Link>
                      <Link href="/apartments-for-rent/nairobi-county?city=Kilimani&bedrooms=2" className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-orange-100">Kilimani (High-floor)</Link>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">What You Get:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>✓ Penthouse/top-floor units, panoramic views</li>
                      <li>✓ Designer interiors, premium appliances</li>
                      <li>✓ Spacious (1,500+ sq ft), private terraces/balconies</li>
                      <li>✓ Full-service amenities, spa, business center</li>
                      <li>✓ Smart home features, automation</li>
                      <li>✓ Exclusive neighborhoods, low density</li>
                      <li>✓ International school proximity</li>
                      <li>✓ Often fully furnished</li>
                    </ul>
                  </div>
                  <div className="pt-3 border-t">
                    <p className="text-sm text-gray-600 mb-3"><strong>Best for:</strong> High-net-worth individuals, diplomats, C-suite executives</p>
                    <Link href="/apartments-for-rent/nairobi-county?bedrooms=2&min_price=70000" className="block w-full text-center bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors font-semibold text-sm">
                      View 2BR KES 70K+ →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white text-center">
              <h3 className="text-xl font-bold mb-2">
                Not Sure Which Price Range Fits Your Budget?
              </h3>
              <p className="mb-4">
                Use our smart filters to find 2-bedroom apartments matching your exact budget and preferred amenities
              </p>
              <Button className="bg-white text-green-600 hover:bg-gray-100" asChild>
                <Link href="/apartments-for-rent/nairobi-county?bedrooms=2">
                  Browse All 2BR Apartments
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Top Neighborhoods - 2BR Specific */}
      <section id="neighborhoods" className="py-12 bg-white">
        <div className="container mx-auto px-3">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Best Neighborhoods for 2-Bedroom Apartments in Nairobi
            </h2>
            <p className="text-gray-700 mb-8">
              Based on our 8+ years of market data, 50,000+ successful rentals, and comprehensive family-suitability analysis, these are the top neighborhoods for 2-bedroom apartments in Nairobi in 2025:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {[
                {
                  name: 'Westlands',
                  avgRent: 'KES 50,000 - 80,000',
                  rating: '4.8/5',
                  familyRating: '4.7/5',
                  demographics: 'Expats, Executives, Young Professionals',
                  highlights: ['Modern high-rises', 'Sarit Centre (5 mins)', 'Westgate Mall', 'International schools', 'Vibrant dining scene', '24/7 security'],
                  schools: ['ISK', 'Westlands Primary', 'Brookhouse (15 mins)'],
                  transport: 'Excellent - CBD access, Uber/taxi hub',
                  safety: 'Very High',
                  searches: '200-300/mo',
                  bestFor: 'Professionals wanting urban lifestyle, expat families',
                  link: '/apartments-for-rent/nairobi-county?city=Westlands&bedrooms=2'
                },
                {
                  name: 'Kilimani',
                  avgRent: 'KES 45,000 - 75,000',
                  rating: '4.7/5',
                  familyRating: '4.5/5',
                  demographics: 'Young Families, Professionals, Students',
                  highlights: ['Central location', 'Yaya Centre nearby', 'Vibrant nightlife', 'Mixed-use developments', 'Modern apartments', 'Fiber internet'],
                  schools: ['Riara Springs', 'Braeside (nearby)', 'Lavington schools (10 mins)'],
                  transport: 'Excellent - Well connected to CBD',
                  safety: 'High',
                  searches: '180-250/mo',
                  bestFor: 'Young couples, professionals prioritizing convenience',
                  link: '/apartments-for-rent/nairobi-county?city=Kilimani&bedrooms=2'
                },
                {
                  name: 'Kileleshwa',
                  avgRent: 'KES 40,000 - 65,000',
                  rating: '4.8/5',
                  familyRating: '4.9/5',
                  demographics: 'Families, Professionals, Retirees',
                  highlights: ['Quiet residential', 'Tree-lined streets', 'Family-friendly', 'Top-rated schools', 'Safe neighborhoods', 'Low traffic'],
                  schools: ['Riara Group', 'Kileleshwa Academy', 'Consolata Primary', 'Braeside (nearby)'],
                  transport: 'Good - Close to Westlands & CBD',
                  safety: 'Very High',
                  searches: '120-180/mo',
                  bestFor: 'Families with young children prioritizing safety & schools',
                  link: '/apartments-for-rent/nairobi-county?city=Kileleshwa&bedrooms=2'
                },
                {
                  name: 'Karen',
                  avgRent: 'KES 60,000 - 100,000',
                  rating: '4.9/5',
                  familyRating: '5.0/5',
                  demographics: 'Expats, High-Income Families',
                  highlights: ['Luxury living', 'Spacious units', 'Karen Blixen Museum', 'Giraffe Centre', 'International schools', 'Nature surroundings'],
                  schools: ['Brookhouse', 'Karen C Primary', 'Kazuri School', 'Braeside'],
                  transport: 'Moderate - Car recommended',
                  safety: 'Very High',
                  searches: '150-220/mo',
                  bestFor: 'Expat families, nature lovers, premium lifestyle seekers',
                  link: '/apartments-for-rent/nairobi-county?city=Karen&bedrooms=2'
                },
                {
                  name: 'Lavington',
                  avgRent: 'KES 45,000 - 70,000',
                  rating: '4.7/5',
                  familyRating: '4.8/5',
                  demographics: 'Families, Professionals, Diplomats',
                  highlights: ['Upscale residential', 'Lavington Mall', 'Valley Arcade', 'International schools', 'Safe & serene', 'Diplomatic presence'],
                  schools: ['Braeside', 'Lavington International', 'Rusinga', 'Oshwal Academy'],
                  transport: 'Good - Accessible to CBD',
                  safety: 'Very High',
                  searches: '100-150/mo',
                  bestFor: 'Families prioritizing education quality & safety',
                  link: '/apartments-for-rent/nairobi-county?city=Lavington&bedrooms=2'
                },
                {
                  name: 'Parklands',
                  avgRent: 'KES 35,000 - 55,000',
                  rating: '4.6/5',
                  familyRating: '4.6/5',
                  demographics: 'Diverse Families, Multi-cultural',
                  highlights: ['Cultural diversity', 'Shopping hubs', 'Mosques & churches', 'Good schools', 'Mid-range pricing', 'Community feel'],
                  schools: ['Aga Khan Academy', 'Parklands Baptist', 'Parklands Arya', 'Nairobi Primary'],
                  transport: 'Good - Multiple matatu routes',
                  safety: 'High',
                  searches: '100-160/mo',
                  bestFor: 'Families seeking diversity, value for money',
                  link: '/apartments-for-rent/nairobi-county?city=Parklands&bedrooms=2'
                }
              ].map((neighborhood, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-green-500 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{neighborhood.name}</h3>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-semibold text-gray-700">{neighborhood.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-green-600" />
                          <span className="text-xs text-gray-600">Family: {neighborhood.familyRating}</span>
                        </div>
                      </div>
                    </div>
                    <MapPin className="h-6 w-6 text-green-600 flex-shrink-0" />
                  </div>

                  <div className="space-y-3 mb-4">
                    <div>
                      <span className="text-sm font-semibold text-gray-700">Avg. 2BR Rent:</span>
                      <span className="text-sm text-gray-900 ml-2 font-medium">{neighborhood.avgRent}</span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-700">Best For:</span>
                      <span className="text-sm text-gray-900 ml-2">{neighborhood.demographics}</span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-700">Nearby Schools:</span>
                      <div className="text-xs text-gray-700 mt-1 flex flex-wrap gap-1">
                        {neighborhood.schools.map((school, idx) => (
                          <span key={idx} className="bg-blue-50 px-2 py-0.5 rounded">{school}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-700">Transport:</span>
                      <span className="text-sm text-gray-900 ml-2">{neighborhood.transport}</span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-700">Safety Rating:</span>
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

                  <div className="mb-3 p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-900"><strong>Ideal for:</strong> {neighborhood.bestFor}</p>
                  </div>

                  <Link
                    href={neighborhood.link}
                    className="block w-full text-center bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    View 2BR in {neighborhood.name} →
                  </Link>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="font-bold text-blue-900 mb-4">More Great Neighborhoods for 2BR Apartments:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { name: 'South C', rent: 'KES 35K-55K' },
                  { name: 'Langata', rent: 'KES 35K-60K' },
                  { name: 'Ruaka', rent: 'KES 25K-40K' },
                  { name: 'Runda', rent: 'KES 70K-120K' },
                  { name: 'Syokimau', rent: 'KES 20K-35K' },
                  { name: 'Riverside', rent: 'KES 50K-80K' },
                  { name: 'Ngong Road', rent: 'KES 30K-50K' },
                  { name: 'South B', rent: 'KES 30K-50K' }
                ].map((area) => (
                  <Link key={area.name} href={`/apartments-for-rent/nairobi-county?city=${area.name}&bedrooms=2`} className="text-blue-600 hover:underline text-sm p-2 bg-white rounded">
                    {area.name} <span className="text-xs text-gray-600 block">{area.rent}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Family-Friendly Features */}
      <section id="features" className="py-12 bg-gray-50">
        <div className="container mx-auto px-3">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Family-Friendly Features in 2-Bedroom Apartments
            </h2>
            <p className="text-gray-700 mb-8">
              When searching for a 2-bedroom apartment for your family, prioritize these essential features that ensure comfort, safety, and convenience for your loved ones:
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <School className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-bold text-gray-900">School Proximity</h3>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Top priority for families: apartments within 5-10 minutes of quality schools. Neighborhoods like <Link href="/apartments-for-rent/nairobi-county?city=Kileleshwa&bedrooms=2" className="text-green-600 hover:underline">Kileleshwa</Link>, <Link href="/apartments-for-rent/nairobi-county?city=Lavington&bedrooms=2" className="text-green-600 hover:underline">Lavington</Link>, and <Link href="/apartments-for-rent/nairobi-county?city=Karen&bedrooms=2" className="text-green-600 hover:underline">Karen</Link> excel here.
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Primary schools within walking distance</li>
                  <li>• International schools nearby (for expats)</li>
                  <li>• Safe school routes</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900">Safety & Security</h3>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Non-negotiable for families: 24/7 security, CCTV, secure play areas. Gated estates in <Link href="/apartments-for-rent/nairobi-county?city=Kileleshwa&bedrooms=2" className="text-green-600 hover:underline">Kileleshwa</Link> and <Link href="/apartments-for-rent/nairobi-county?city=South C&bedrooms=2" className="text-green-600 hover:underline">South C</Link> excel.
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Trained security guards round-the-clock</li>
                  <li>• Perimeter wall with controlled access</li>
                  <li>• Well-lit compounds and walkways</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-gray-900">Play Areas</h3>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Essential for children's development: dedicated play areas, parks, safe outdoor spaces. Premium apartments in <Link href="/apartments-for-rent/nairobi-county?city=Westlands&bedrooms=2" className="text-green-600 hover:underline">Westlands</Link> and <Link href="/apartments-for-rent/nairobi-county?city=Kilimani&bedrooms=2" className="text-green-600 hover:underline">Kilimani</Link> feature modern playgrounds.
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Children's playground with equipment</li>
                  <li>• Landscaped gardens for outdoor activities</li>
                  <li>• Community spaces for kids to socialize</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                    <ShoppingCart className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="font-bold text-gray-900">Shopping Centers</h3>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Convenience for busy families: supermarkets, pharmacies, shopping malls within 5 minutes. <Link href="/apartments-for-rent/nairobi-county?city=Westlands&bedrooms=2" className="text-green-600 hover:underline">Westlands</Link> (Sarit Centre) and <Link href="/apartments-for-rent/nairobi-county?city=Lavington&bedrooms=2" className="text-green-600 hover:underline">Lavington</Link> (Valley Arcade) excel.
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Major supermarkets (Carrefour, Naivas)</li>
                  <li>• Shopping malls with family entertainment</li>
                  <li>• Pharmacies and health facilities</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                    <Droplet className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="font-bold text-gray-900">Reliable Utilities</h3>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Critical for family comfort: consistent water supply (borehole backup), reliable electricity (backup generator), stable internet for kids' homework and remote work.
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Borehole water with storage tanks</li>
                  <li>• Backup generator for power outages</li>
                  <li>• Fiber internet connectivity (50+ Mbps)</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                    <Car className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h3 className="font-bold text-gray-900">Parking & Transport</h3>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Essential for modern families: secure parking for 1-2 cars, proximity to public transport, easy CBD access. Most 2BR apartments include at least 1 parking slot.
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Covered/basement parking (1-2 slots)</li>
                  <li>• Visitor parking available</li>
                  <li>• Matatu/Uber access for emergencies</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-green-50 border-l-4 border-green-600 p-6">
              <h3 className="font-bold text-green-900 mb-3">Work-From-Home Setup for 2BR Apartments</h3>
              <p className="text-green-900 mb-4">
                Post-pandemic, many families use the second bedroom as a home office. Look for these features:
              </p>
              <ul className="grid md:grid-cols-2 gap-3 text-green-900">
                <li className="flex items-start">
                  <Wifi className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span><strong>High-speed internet:</strong> Fiber connectivity 50-100 Mbps for video calls, file transfers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span><strong>Adequate space:</strong> Second bedroom 10x10 ft minimum for desk, shelving, equipment</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span><strong>Good lighting:</strong> Natural light from windows, electrical outlets for lamps/monitors</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span><strong>Quiet environment:</strong> Away from main roads, good sound insulation, professional background</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Amenities Section */}
      <section id="amenities" className="py-12 bg-white">
        <div className="container mx-auto px-3">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Modern Amenities to Expect in 2-Bedroom Apartments
            </h2>
            <p className="text-gray-700 mb-8">
              Based on analysis of 500+ 2-bedroom apartment listings on NewKenyan.com, here are the amenities you should expect across different price ranges:
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  Standard Amenities
                </h3>
                <p className="text-sm text-gray-600 mb-3">Found in 80%+ of 2BR apartments (KES 25K-50K)</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>24/7 Security guards & CCTV</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Backup water (borehole/tanks)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Parking (1 slot minimum)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Backup generator</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Perimeter wall/fence</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Waste collection services</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>DSTV/Satellite ready</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <Star className="h-5 w-5 text-blue-600 mr-2" />
                  Premium Amenities
                </h3>
                <p className="text-sm text-gray-600 mb-3">Common in 50%+ apartments (KES 40K-70K)</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>Swimming pool (outdoor/indoor)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>Fully-equipped gym/fitness center</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>Children's play area</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>Elevator/lift access</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>Fiber internet connectivity</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>Landscaped gardens</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>Intercom system</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>Basement/covered parking</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <Award className="h-5 w-5 text-purple-600 mr-2" />
                  Luxury Amenities
                </h3>
                <p className="text-sm text-gray-600 mb-3">Premium apartments (KES 60K+)</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span>Concierge/reception services</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span>Rooftop terrace/lounge</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span>Sauna & spa facilities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span>Business center/meeting rooms</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span>Smart home automation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span>Biometric access control</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span>BBQ/entertainment areas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span>Fully furnished option</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-500 p-6">
              <h3 className="font-bold text-yellow-900 mb-3">Average Monthly Utility Costs for 2BR Apartments</h3>
              <p className="text-yellow-900 mb-4">
                Budget an additional <strong>KES 5,000-10,000/month</strong> for utilities on top of rent:
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-yellow-900">
                <div>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Electricity:</strong> KES 2,500-5,000 (varies with AC usage, cooking)</li>
                    <li><strong>Water:</strong> KES 1,000-2,000 (often included in rent)</li>
                    <li><strong>Internet (Fiber):</strong> KES 1,500-3,000 (20-50 Mbps packages)</li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-2 text-sm">
                    <li><strong>DSTV/Streaming:</strong> KES 1,500-3,000 (optional)</li>
                    <li><strong>Service Charge:</strong> KES 500-5,000 (varies by estate)</li>
                    <li><strong>Waste Collection:</strong> Often included in service charge</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Renter's Guide */}
      <section id="guide" className="py-12 bg-gray-50">
        <div className="container mx-auto px-3">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Complete Guide to Renting a 2-Bedroom Apartment in Nairobi (2025)
            </h2>

            <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                Step-by-Step Rental Process for 2BR Apartments
              </h3>
              <ol className="space-y-4 list-decimal list-inside text-gray-700">
                <li className="leading-relaxed">
                  <strong>Define Your Requirements:</strong> Set budget (KES 25K-70K range), preferred neighborhoods, must-have amenities. Consider school proximity if you have children, commute time to work, and lifestyle preferences.
                </li>
                <li className="leading-relaxed">
                  <strong>Search & Shortlist:</strong> Browse our <Link href="/apartments-for-rent/nairobi-county?bedrooms=2" className="text-green-600 hover:underline">500+ verified 2BR listings</Link>. Use filters for price, location, amenities. Shortlist 5-10 apartments matching criteria. Check reviews/ratings if available.
                </li>
                <li className="leading-relaxed">
                  <strong>Contact Landlords:</strong> Call/WhatsApp landlords directly (no agent fees on NewKenyan.com!). Ask about: rent amount, deposit requirements, lease duration, included amenities, utility payment, pet policy, availability date.
                </li>
                <li className="leading-relaxed">
                  <strong>Schedule Viewings:</strong> Book viewings for 3-5 top properties. Best viewing times: 10am-4pm (natural lighting), weekdays (gauge neighborhood quiet). Bring: pen, paper, camera, measuring tape, checklist.
                </li>
                <li className="leading-relaxed">
                  <strong>Inspect Thoroughly:</strong> Check: water pressure (all taps), electrical outlets (bring phone charger), appliances functionality, windows/doors security, dampness/leaks, pest signs, phone signal strength, backup systems (generator, borehole).
                </li>
                <li className="leading-relaxed">
                  <strong>Neighborhood Assessment:</strong> Walk around: check security presence, cleanliness, parking availability, noise levels, proximity to schools/shops, transport options. Visit at different times if possible (morning, evening).
                </li>
                <li className="leading-relaxed">
                  <strong>Documentation Preparation:</strong> Gather: National ID/Passport copies, 3 months' payslips (employed) or bank statements (self-employed), KRA PIN certificate, reference letter from previous landlord, employer's letter, 2 passport photos.
                </li>
                <li className="leading-relaxed">
                  <strong>Negotiate Terms:</strong> Don't be shy! Negotiable aspects: monthly rent (especially for long-term lease), deposit amount (some landlords accept 1 month vs 2), included utilities, painting/repairs before move-in, lease start date. Offer 6-12 months upfront for 5-10% discount.
                </li>
                <li className="leading-relaxed">
                  <strong>Review Agreement:</strong> Read tenancy agreement carefully. Verify: rent amount, deposit (refundable conditions), lease duration, notice period, maintenance responsibilities, pet policy, subletting rules. Ask questions before signing.
                </li>
                <li className="leading-relaxed">
                  <strong>Payment & Move-in:</strong> Pay via bank transfer (keep receipts!). Typical upfront: KES 80K-200K (1-2 months deposit + 1 month rent + possible service charge). Conduct move-in inspection with landlord, document condition with photos/videos. Get keys, gate cards, utility meters readings.
                </li>
              </ol>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Shield className="h-6 w-6 text-blue-600 mr-2" />
                Essential Inspection Checklist for 2BR Apartments
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Security & Building Infrastructure:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <Camera className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Security:</strong> 24/7 guards present? CCTV cameras operational? Access control system? Visitor logbook?</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Power:</strong> Backup generator functional? Test frequency? Prepaid meter or postpaid?</span>
                    </li>
                    <li className="flex items-start">
                      <Droplet className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Water:</strong> Pressure adequate? Borehole available? Storage tanks capacity? Water quality?</span>
                    </li>
                    <li className="flex items-start">
                      <Car className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Parking:</strong> Allocated slots? Covered or open? Visitor parking? Security for vehicles?</span>
                    </li>
                    <li className="flex items-start">
                      <Wifi className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Internet:</strong> Fiber optic available? Provider options (Safaricom, Zuku)? Speed packages?</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Unit Condition & Fixtures:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Plumbing:</strong> Test all taps (hot/cold water), check for leaks under sinks, flush toilets, inspect water heater</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Electrical:</strong> Test outlets (bring charger), check light switches, inspect circuit breaker panel</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Windows/Doors:</strong> Open/close all, check locks, inspect frames for gaps, test balcony doors</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Walls/Ceilings:</strong> Look for cracks, water stains, dampness, mold, paint condition</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Kitchen:</strong> Test cooker/stove, check cabinets, sink drainage, exhaust fan if present</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Bathrooms:</strong> Drainage, shower pressure, toilet flush, ventilation, exhaust fan</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
              <h3 className="font-bold text-red-900 mb-3 flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Red Flags to Watch Out For
              </h3>
              <ul className="space-y-2 text-red-900">
                <li className="flex items-start">
                  <span className="mr-2">⚠️</span>
                  <span><strong>Deposit before viewing:</strong> Never pay anything without physically seeing the apartment. Scammers use fake listings with stolen photos.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">⚠️</span>
                  <span><strong>Too good to be true:</strong> If rent is 30-40% below market rate for the area, likely a scam. Cross-check with similar <Link href="/apartments-for-rent/nairobi-county?bedrooms=2" className="text-red-700 hover:underline font-semibold">2BR listings</Link>.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">⚠️</span>
                  <span><strong>Unverified landlord:</strong> Ask to see ownership documents (title deed, rent control card). Verify with neighbors.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">⚠️</span>
                  <span><strong>Cash-only demands:</strong> Legitimate landlords accept bank transfers. Always get receipts for all payments.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">⚠️</span>
                  <span><strong>Rushed decisions:</strong> "Many interested parties, pay now or lose it" is a pressure tactic. Take your time.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">⚠️</span>
                  <span><strong>Verbal agreements:</strong> Everything must be in writing. Don't accept "we'll add it later" promises.</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-600 p-6">
              <h3 className="font-bold text-green-900 mb-3">Expert Money-Saving Tips for 2BR Apartments</h3>
              <ul className="space-y-3 text-green-900">
                <li className="flex items-start">
                  <DollarSign className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span><strong>Best time to rent:</strong> March-April & November-December see 10-15% lower rents due to reduced demand. Landlords more willing to negotiate.</span>
                </li>
                <li className="flex items-start">
                  <DollarSign className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span><strong>Long-term leverage:</strong> Commit to 1-2 year lease for 5-10% discount. Offer 6-12 months upfront payment for additional 5% off.</span>
                </li>
                <li className="flex items-start">
                  <DollarSign className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span><strong>Utilities inclusion:</strong> Negotiate water inclusion in rent (saves KES 1,000-2,000/month). Some landlords bundle service charge.</span>
                </li>
                <li className="flex items-start">
                  <DollarSign className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span><strong>Roommate option:</strong> Share a 2BR with roommate/flatmate to cut costs by 40-50%. Popular among young professionals in <Link href="/apartments-for-rent/nairobi-county?city=Kilimani&bedrooms=2" className="text-green-700 hover:underline">Kilimani</Link> and <Link href="/apartments-for-rent/nairobi-county?city=Westlands&bedrooms=2" className="text-green-700 hover:underline">Westlands</Link>.</span>
                </li>
                <li className="flex items-start">
                  <DollarSign className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span><strong>Suburban value:</strong> Consider <Link href="/apartments-for-rent/nairobi-county?city=Ruaka&bedrooms=2" className="text-green-700 hover:underline">Ruaka</Link>, <Link href="/apartments-for-rent/nairobi-county?city=Syokimau&bedrooms=2" className="text-green-700 hover:underline">Syokimau</Link>, or <Link href="/apartments-for-rent/nairobi-county?city=Kitengela&bedrooms=2" className="text-green-700 hover:underline">Kitengela</Link> for modern 2BR at KES 20-35K vs KES 50-70K in Westlands - same quality, 30-40% savings.</span>
                </li>
                <li className="flex items-start">
                  <DollarSign className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span><strong>Direct landlord contact:</strong> Use NewKenyan.com to contact landlords directly - save 8-10% agent commission (KES 25K-70K saved!).</span>
                </li>
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
              Latest 2-Bedroom Apartments for Rent in Nairobi
            </h2>
            <p className="text-gray-600 mb-6">
              Browse our curated selection of verified 2BR apartments. All listings feature direct landlord contacts, authentic photos, and accurate pricing.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <select
                value={selectedNeighborhood}
                onChange={(e) => setSelectedNeighborhood(e.target.value)}
                className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-green-500 focus:outline-none"
              >
                <option value="all">All Neighborhoods</option>
                <option value="Westlands">Westlands</option>
                <option value="Kilimani">Kilimani</option>
                <option value="Kileleshwa">Kileleshwa</option>
                <option value="Karen">Karen</option>
                <option value="Lavington">Lavington</option>
                <option value="Parklands">Parklands</option>
                <option value="South C">South C</option>
                <option value="Langata">Lang'ata</option>
                <option value="Ruaka">Ruaka</option>
                <option value="Runda">Runda</option>
              </select>

              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-green-500 focus:outline-none"
              >
                <option value="all">All Prices</option>
                <option value="25000-35000">KES 25K - 35K</option>
                <option value="35000-50000">KES 35K - 50K</option>
                <option value="50000-70000">KES 50K - 70K</option>
                <option value="70000-999999999">KES 70K+</option>
              </select>

              <div className="ml-auto">
                <p className="text-gray-600">
                  Showing <strong>{properties.length}</strong> 2-bedroom apartments
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
              <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No 2-bedroom apartments found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or browse all 2BR apartments
              </p>
              <Button asChild>
                <Link href="/apartments-for-rent/nairobi-county?bedrooms=2">View All 2BR Apartments</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Related Property Links - Silo Structure */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-3">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Explore More Apartment Options in Nairobi
            </h2>

            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg p-5 shadow-md">
                <h3 className="font-bold text-gray-900 mb-3 text-sm">By Bedroom Size</h3>
                <ul className="space-y-2">
                  <li><Link href="/bedsitters-for-rent/nairobi-county" className="text-green-600 hover:underline text-sm">Bedsitters →</Link></li>
                  <li><Link href="/studio-apartments-for-rent/nairobi-county" className="text-green-600 hover:underline text-sm">Studio Apartments →</Link></li>
                  <li><Link href="/apartments-for-rent/nairobi-county?bedrooms=1" className="text-green-600 hover:underline text-sm">1 Bedroom →</Link></li>
                  <li><Link href="/apartments-for-rent/nairobi-county?bedrooms=3" className="text-green-600 hover:underline text-sm">3 Bedroom →</Link></li>
                  <li><Link href="/apartments-for-rent/nairobi-county?bedrooms=4" className="text-green-600 hover:underline text-sm">4 Bedroom+ →</Link></li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-5 shadow-md">
                <h3 className="font-bold text-gray-900 mb-3 text-sm">By Price Range</h3>
                <ul className="space-y-2">
                  <li><Link href="/apartments-for-rent/nairobi-county?bedrooms=2&max_price=30000" className="text-blue-600 hover:underline text-sm">Under KES 30K →</Link></li>
                  <li><Link href="/apartments-for-rent/nairobi-county?bedrooms=2&min_price=30000&max_price=40000" className="text-blue-600 hover:underline text-sm">KES 30K-40K →</Link></li>
                  <li><Link href="/apartments-for-rent/nairobi-county?bedrooms=2&min_price=40000&max_price=60000" className="text-blue-600 hover:underline text-sm">KES 40K-60K →</Link></li>
                  <li><Link href="/apartments-for-rent/nairobi-county?bedrooms=2&min_price=60000" className="text-blue-600 hover:underline text-sm">Luxury KES 60K+ →</Link></li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-5 shadow-md">
                <h3 className="font-bold text-gray-900 mb-3 text-sm">Property Types</h3>
                <ul className="space-y-2">
                  <li><Link href="/2-bedroom-houses-for-rent" className="text-purple-600 hover:underline text-sm">2BR Houses →</Link></li>
                  <li><Link href="/houses-for-rent-nairobi" className="text-purple-600 hover:underline text-sm">All Houses →</Link></li>
                  <li><Link href="/maisonettes-for-rent" className="text-purple-600 hover:underline text-sm">Maisonettes →</Link></li>
                  <li><Link href="/serviced-apartments-for-rent/nairobi-county" className="text-purple-600 hover:underline text-sm">Serviced Apts →</Link></li>
                  <li><Link href="/apartments-for-sale/nairobi-county?bedrooms=2" className="text-purple-600 hover:underline text-sm">2BR for Sale →</Link></li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-5 shadow-md">
                <h3 className="font-bold text-gray-900 mb-3 text-sm">Popular Areas</h3>
                <ul className="space-y-2">
                  <li><Link href="/apartments-for-rent/nairobi-county?city=Westlands&bedrooms=2" className="text-orange-600 hover:underline text-sm">Westlands →</Link></li>
                  <li><Link href="/apartments-for-rent/nairobi-county?city=Kilimani&bedrooms=2" className="text-orange-600 hover:underline text-sm">Kilimani →</Link></li>
                  <li><Link href="/apartments-for-rent/nairobi-county?city=Kileleshwa&bedrooms=2" className="text-orange-600 hover:underline text-sm">Kileleshwa →</Link></li>
                  <li><Link href="/apartments-for-rent/nairobi-county?city=Karen&bedrooms=2" className="text-orange-600 hover:underline text-sm">Karen →</Link></li>
                  <li><Link href="/apartments-for-rent/nairobi-county?city=Lavington&bedrooms=2" className="text-orange-600 hover:underline text-sm">Lavington →</Link></li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-bold text-gray-900 mb-4">More Nairobi 2BR Neighborhoods</h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {[
                  'Parklands', 'South C', 'South B', 'Langata', 'Ngong Road', 'Riverside',
                  'Runda', 'Ruaka', 'Syokimau', 'Kasarani', 'Umoja', 'Buruburu',
                  'Donholm', 'Embakasi', 'Imara Daima', 'Kitengela', 'Rongai', 'Kahawa'
                ].map((area) => (
                  <Link
                    key={area}
                    href={`/apartments-for-rent/nairobi-county?city=${area}&bedrooms=2`}
                    className="text-green-600 hover:underline text-xs"
                  >
                    {area} →
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white text-center">
              <h3 className="text-xl font-bold mb-2">Looking for Apartments in Other Counties?</h3>
              <div className="flex flex-wrap gap-3 justify-center mt-4">
                <Link href="/apartments-for-rent/mombasa-county?bedrooms=2" className="bg-white text-green-600 px-4 py-2 rounded hover:bg-gray-100 text-sm font-semibold">
                  Mombasa 2BR
                </Link>
                <Link href="/apartments-for-rent/kisumu-county?bedrooms=2" className="bg-white text-green-600 px-4 py-2 rounded hover:bg-gray-100 text-sm font-semibold">
                  Kisumu 2BR
                </Link>
                <Link href="/apartments-for-rent/nakuru-county?bedrooms=2" className="bg-white text-green-600 px-4 py-2 rounded hover:bg-gray-100 text-sm font-semibold">
                  Nakuru 2BR
                </Link>
                <Link href="/apartments-for-rent/kiambu-county?bedrooms=2" className="bg-white text-green-600 px-4 py-2 rounded hover:bg-gray-100 text-sm font-semibold">
                  Kiambu 2BR
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Linking Section - Browse by Location */}
      <section className="py-12 bg-gray-50 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Browse 2-Bedroom Apartments by Location</h2>
            <p className="text-center text-gray-600 mb-8">Explore 2BR apartments in premium neighborhoods and counties across Kenya</p>

            {/* By County */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">2-Bedroom Apartments by County</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                <Link href="/apartments-for-rent/nairobi-county?bedrooms=2" className="px-4 py-2 bg-gray-100 hover:bg-green-50 hover:text-green-600 rounded-lg text-center transition-colors border border-gray-200 hover:border-green-500">
                  Nairobi
                </Link>
                <Link href="/apartments-for-rent/kiambu-county?bedrooms=2" className="px-4 py-2 bg-gray-100 hover:bg-green-50 hover:text-green-600 rounded-lg text-center transition-colors border border-gray-200 hover:border-green-500">
                  Kiambu
                </Link>
                <Link href="/apartments-for-rent/machakos-county?bedrooms=2" className="px-4 py-2 bg-gray-100 hover:bg-green-50 hover:text-green-600 rounded-lg text-center transition-colors border border-gray-200 hover:border-green-500">
                  Machakos
                </Link>
                <Link href="/apartments-for-rent/kajiado-county?bedrooms=2" className="px-4 py-2 bg-gray-100 hover:bg-green-50 hover:text-green-600 rounded-lg text-center transition-colors border border-gray-200 hover:border-green-500">
                  Kajiado
                </Link>
                <Link href="/apartments-for-rent/mombasa-county?bedrooms=2" className="px-4 py-2 bg-gray-100 hover:bg-green-50 hover:text-green-600 rounded-lg text-center transition-colors border border-gray-200 hover:border-green-500">
                  Mombasa
                </Link>
                <Link href="/apartments-for-rent/nakuru-county?bedrooms=2" className="px-4 py-2 bg-gray-100 hover:bg-green-50 hover:text-green-600 rounded-lg text-center transition-colors border border-gray-200 hover:border-green-500">
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
                <Link href="/apartments-for-rent/lavington?bedrooms=2" className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 rounded-lg text-center transition-colors border border-green-200 hover:border-green-500 font-medium">
                  Lavington
                </Link>
                <Link href="/apartments-for-rent/kileleshwa?bedrooms=2" className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 rounded-lg text-center transition-colors border border-green-200 hover:border-green-500 font-medium">
                  Kileleshwa
                </Link>
                <Link href="/apartments-for-rent/upper-hill?bedrooms=2" className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 rounded-lg text-center transition-colors border border-green-200 hover:border-green-500 font-medium">
                  Upper Hill
                </Link>
              </div>
            </div>

            {/* Budget-Friendly Nairobi Areas */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Budget-Friendly Nairobi Areas</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                <Link href="/apartments-for-rent/kasarani?bedrooms=2" className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 rounded-lg text-center transition-colors border border-blue-200 hover:border-blue-500">
                  Kasarani
                </Link>
                <Link href="/apartments-for-rent/ruiru?bedrooms=2" className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 rounded-lg text-center transition-colors border border-blue-200 hover:border-blue-500">
                  Ruiru
                </Link>
                <Link href="/apartments-for-rent/ngong?bedrooms=2" className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 rounded-lg text-center transition-colors border border-blue-200 hover:border-blue-500">
                  Ngong
                </Link>
                <Link href="/apartments-for-rent/rongai?bedrooms=2" className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 rounded-lg text-center transition-colors border border-blue-200 hover:border-blue-500">
                  Rongai
                </Link>
                <Link href="/apartments-for-rent/kahawa?bedrooms=2" className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 rounded-lg text-center transition-colors border border-blue-200 hover:border-blue-500">
                  Kahawa
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
      <section id="faqs" className="py-12 bg-white">
        <div className="container mx-auto px-3">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Frequently Asked Questions: 2-Bedroom Apartments in Nairobi
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Expert answers from NewKenyan.com's 8+ years serving Kenya's property market and 50,000+ successful rentals
            </p>

            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-lg shadow-sm border border-gray-200">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-100 transition-colors rounded-lg"
                  >
                    <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-500 transform transition-transform flex-shrink-0 ${
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

            <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 p-6">
              <h3 className="font-bold text-blue-900 mb-2">Still Have Questions?</h3>
              <p className="text-blue-900 mb-4">
                Our property experts are here to help you find the perfect 2-bedroom apartment in Nairobi. Get personalized assistance with:
              </p>
              <ul className="text-blue-900 space-y-1 text-sm mb-4">
                <li>• Neighborhood recommendations based on your budget and lifestyle</li>
                <li>• School proximity analysis for families with children</li>
                <li>• Negotiation tips and market insights</li>
                <li>• Lease agreement review and advice</li>
              </ul>
              <div className="flex flex-wrap gap-3">
                <a href="tel:+254736407642" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 font-semibold text-sm">
                  Call +254 736 407 642
                </a>
                <a href="https://wa.me/254736407642" className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 font-semibold text-sm" target="_blank" rel="noopener noreferrer">
                  WhatsApp Us
                </a>
                <a href="mailto:info@newkenyan.com" className="bg-gray-600 text-white px-5 py-2 rounded-lg hover:bg-gray-700 font-semibold text-sm">
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Authority Section */}
      <section className="py-12 bg-gradient-to-br from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-3">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Why Trust NewKenyan.com for Your 2-Bedroom Apartment Search?
            </h2>
            <p className="text-lg text-green-50 mb-8">
              Kenya's most awarded property marketplace with proven expertise in family housing
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <Award className="h-12 w-12 mx-auto mb-4" />
                <h3 className="font-bold text-xl mb-2">13+ Industry Awards</h3>
                <p className="text-sm text-green-50">
                  Best Real Estate Marketing Platform (2023), Property Marketplace of the Year (2023), Digital Innovation Excellence Award, and 10 more recognitions
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <Users className="h-12 w-12 mx-auto mb-4" />
                <h3 className="font-bold text-xl mb-2">50,000+ Happy Families</h3>
                <p className="text-sm text-green-50">
                  Successfully connected over 50,000 tenants with their ideal homes since 2017. Join thousands of satisfied families who found their perfect 2BR apartment through our platform
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <Shield className="h-12 w-12 mx-auto mb-4" />
                <h3 className="font-bold text-xl mb-2">KPDA Partnership</h3>
                <p className="text-sm text-green-50">
                  Official partner of Kenya Property Developers Association ensuring all listings meet quality standards. Every 2BR apartment verified for authenticity
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-lg p-6 mb-8">
              <h3 className="font-bold text-xl mb-4">As Featured In:</h3>
              <p className="text-green-50 text-lg">
                Business Daily | The Standard | Capital FM | Kenya Gazette | Property Kenya Magazine | Nation Media Group
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-lg p-6 mb-8">
              <h3 className="font-bold text-xl mb-4">Our Commitment to You:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <ul className="space-y-2 text-green-50">
                  <li>✓ 100% verified listings - no fake apartments</li>
                  <li>✓ Direct landlord contacts - zero agent fees</li>
                  <li>✓ Accurate pricing - no hidden costs</li>
                  <li>✓ Real photos from actual properties</li>
                </ul>
                <ul className="space-y-2 text-green-50">
                  <li>✓ Free expert consultation for families</li>
                  <li>✓ Neighborhood safety ratings</li>
                  <li>✓ School proximity information</li>
                  <li>✓ 24/7 customer support</li>
                </ul>
              </div>
            </div>

            <div id="contact">
              <h3 className="text-2xl font-bold mb-4">Ready to Find Your Family's Perfect 2BR Apartment?</h3>
              <p className="text-lg text-green-50 mb-6">
                Browse 500+ verified 2-bedroom apartments or speak with our family housing specialists for personalized recommendations
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-3 font-bold" asChild>
                  <Link href="/apartments-for-rent/nairobi-county?bedrooms=2">
                    Browse All 2BR Apartments
                  </Link>
                </Button>
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-green-600 text-lg px-8 py-3 font-bold" asChild>
                  <Link href="/add-listing">List Your 2BR Apartment</Link>
                </Button>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-green-100">
                <a href="tel:+254736407642" className="hover:underline font-semibold flex items-center">
                  <span className="mr-2">📞</span> +254 736 407 642
                </a>
                <span className="hidden sm:inline">|</span>
                <a href="https://wa.me/254736407642" className="hover:underline font-semibold flex items-center" target="_blank" rel="noopener noreferrer">
                  <span className="mr-2">💬</span> WhatsApp Support
                </a>
                <span className="hidden sm:inline">|</span>
                <a href="mailto:info@newkenyan.com" className="hover:underline font-semibold flex items-center">
                  <span className="mr-2">✉️</span> info@newkenyan.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppButton />
      <Footer />
    </div>
  );
}
