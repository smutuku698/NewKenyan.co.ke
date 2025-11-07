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

export default function BedsitterNairobiClient() {
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
        .eq('price_type', 'rent')
        .ilike('city', '%nairobi%')
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      // Query for Bedsitter property type OR bedrooms = 0
      query = query.or('property_type.eq.Bedsitter,bedrooms.eq.0');

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
      question: "What is the average rent for bedsitters in Nairobi in 2025?",
      answer: "The average rent for <a href='/bedsitter-nairobi' class='text-green-600 hover:underline'>bedsitters in Nairobi</a> ranges from KES 5,000-15,000 per month depending on location and amenities. Budget-friendly areas like <a href='/bedsitters-for-rent/nairobi-county?city=Kasarani' class='text-green-600 hover:underline'>Kasarani</a>, <a href='/bedsitters-for-rent/nairobi-county?city=Kahawa' class='text-green-600 hover:underline'>Kahawa</a>, and <a href='/bedsitters-for-rent/nairobi-county?city=Rongai' class='text-green-600 hover:underline'>Rongai</a> offer bedsitters at KES 5,000-8,000, while areas closer to CBD like <a href='/bedsitters-for-rent/nairobi-county?city=Ruaka' class='text-green-600 hover:underline'>Ruaka</a> and <a href='/bedsitters-for-rent/nairobi-county?city=Ngong+Road' class='text-green-600 hover:underline'>Ngong Road</a> cost KES 10,000-15,000."
    },
    {
      question: "Which are the best areas for cheap bedsitters in Nairobi?",
      answer: "The best budget-friendly areas for bedsitters include <a href='/bedsitters-for-rent/nairobi-county?city=Kasarani' class='text-green-600 hover:underline'>Kasarani</a> (KES 6,000-10,000), <a href='/bedsitters-for-rent/nairobi-county?city=Kahawa+West' class='text-green-600 hover:underline'>Kahawa West</a> (KES 5,000-8,000), <a href='/bedsitters-for-rent/nairobi-county?city=Rongai' class='text-green-600 hover:underline'>Rongai</a> (KES 5,000-9,000), <a href='/bedsitters-for-rent/nairobi-county?city=Kitengela' class='text-green-600 hover:underline'>Kitengela</a> (KES 5,000-8,000), <a href='/bedsitters-for-rent/nairobi-county?city=Pipeline' class='text-green-600 hover:underline'>Pipeline</a> (KES 6,000-10,000), and <a href='/bedsitters-for-rent/nairobi-county?city=Githurai' class='text-green-600 hover:underline'>Githurai</a> (KES 5,000-8,000). These areas are popular with students and young professionals."
    },
    {
      question: "What amenities should I expect in a bedsitter apartment?",
      answer: "Standard bedsitters in Nairobi typically include: Combined living/sleeping area (200-300 sq ft), Private bathroom with shower, Small kitchenette or cooking area, Built-in wardrobe, Window for ventilation, and Access to water. Better bedsitters (KES 10,000+) may include: 24/7 security, Backup water, Tiled floors, Modern fixtures, Proximity to public transport, and Prepaid electricity meter."
    },
    {
      question: "How do I find bedsitters under KES 10,000 in Nairobi?",
      answer: "To find <a href='/bedsitters-for-rent/nairobi-county?max_price=10000' class='text-green-600 hover:underline'>bedsitters under KES 10,000</a>, focus on areas along Thika Road (Kasarani, Githurai, Kahawa), Ngong Road extension (Rongai, Karen Hardy), and outer suburbs (Kitengela, Syokimau). Use our <a href='/properties?property_type=Bedsitter&max_price=10000' class='text-green-600 hover:underline'>price filter</a> to browse verified listings. Avoid peak months (January, September) when demand from students is high."
    },
    {
      question: "Is a bedsitter good for students in Nairobi?",
      answer: "Yes, bedsitters are ideal for students due to affordability and low maintenance. Popular student areas include <a href='/bedsitters-for-rent/nairobi-county?city=Kahawa' class='text-green-600 hover:underline'>Kahawa</a> (near KU, USIU), <a href='/bedsitters-for-rent/nairobi-county?city=Ruaraka' class='text-green-600 hover:underline'>Ruaraka</a>, and <a href='/bedsitters-for-rent/nairobi-county?city=Kasarani' class='text-green-600 hover:underline'>Kasarani</a>. Look for bedsitters near matatu stages, with good lighting, and shared security. Budget KES 7,000-12,000 for student-friendly bedsitters near universities."
    },
    {
      question: "What documents do I need to rent a bedsitter in Nairobi?",
      answer: "Required documents typically include: Copy of National ID or student ID, Passport-size photos (2), Reference letter (from school, previous landlord, or employer), and Proof of income or sponsor letter (for students). Some landlords require a guarantor for students. Deposits are usually 1 month rent plus 1 month advance (2 months total upfront)."
    },
    {
      question: "Can I negotiate bedsitter rent in Nairobi?",
      answer: "Yes! Bedsitter rent is often negotiable, especially: During low-demand months (March-April, November-December), If you're willing to pay 3-6 months upfront, For newly constructed units seeking tenants, and In areas with many vacancies. You can typically negotiate 10-15% off the asking price. Always negotiate politely and show you're a reliable tenant."
    },
    {
      question: "What is the difference between a bedsitter and a studio apartment?",
      answer: "In Kenya, the terms are often used interchangeably, but subtle differences exist: <a href='/bedsitters-for-rent/nairobi-county' class='text-green-600 hover:underline'>Bedsitters</a> typically cost KES 5,000-15,000 and have basic finishes, while <a href='/studio-apartments-for-rent/nairobi-county' class='text-green-600 hover:underline'>studio apartments</a> (KES 15,000-35,000) feature better finishes, modern amenities, and are in more upscale areas. Both are single-room units with private bathrooms."
    },
    {
      question: "How safe are bedsitter neighborhoods in Nairobi?",
      answer: "Safety varies by area. Safer bedsitter neighborhoods include: <a href='/bedsitters-for-rent/nairobi-county?city=Ruaka' class='text-green-600 hover:underline'>Ruaka</a>, <a href='/bedsitters-for-rent/nairobi-county?city=Kileleshwa' class='text-green-600 hover:underline'>Kileleshwa</a> (pricier), and <a href='/bedsitters-for-rent/nairobi-county?city=Ngong+Road' class='text-green-600 hover:underline'>Ngong Road</a>. When viewing, check: 24/7 security guard presence, Perimeter wall/fence, CCTV cameras, Well-lit pathways, and Proximity to police station. Always visit during both day and evening to assess the area."
    },
    {
      question: "What utilities are included in bedsitter rent?",
      answer: "Typically, bedsitter rent includes: Garbage collection and Security services (guard, CCTV). You usually pay separately for: Electricity (prepaid token), Water (fixed monthly rate KES 300-800), Internet (Safaricom, Zuku - KES 2,500-3,500/month), and Cooking gas (own LPG cylinder). Total monthly utilities average KES 1,500-3,000 for bedsitters."
    },
    {
      question: "Can couples live in a bedsitter in Nairobi?",
      answer: "Yes, many couples rent bedsitters, especially when starting out or saving money. Look for slightly larger bedsitters (250-350 sq ft) with better storage. Popular couple-friendly areas include <a href='/bedsitters-for-rent/nairobi-county?city=Ruaka' class='text-green-600 hover:underline'>Ruaka</a>, <a href='/bedsitters-for-rent/nairobi-county?city=Ngong+Road' class='text-green-600 hover:underline'>Ngong Road</a>, and <a href='/bedsitters-for-rent/nairobi-county?city=Syokimau' class='text-green-600 hover:underline'>Syokimau</a>. Budget KES 10,000-15,000 for couple-suitable bedsitters."
    },
    {
      question: "How long does it take to find a bedsitter in Nairobi?",
      answer: "With over 1,000+ <a href='/bedsitters-for-rent/nairobi-county' class='text-green-600 hover:underline'>verified bedsitter listings</a> on NewKenyan.com, most renters find suitable bedsitters within 3-7 days. Bedsitters in budget-friendly areas like Kasarani and Rongai are available year-round. Peak demand (January, September) may require faster decision-making."
    },
    {
      question: "What should I check before renting a bedsitter?",
      answer: "Essential checks include: Water supply (pressure, consistency), Electricity (check sockets, lighting), Bathroom condition (toilet, shower functionality), Ventilation (window opens, no dampness), Security (guard, gate, locks), Cooking area (if allowed inside), Pest control (check for bedbugs, roaches), and Neighborhood safety (visit at different times). Take photos during viewing."
    },
    {
      question: "Are furnished bedsitters available in Nairobi?",
      answer: "Yes, but less common than unfurnished. Furnished bedsitters typically cost 20-30% more (KES 12,000-20,000) and include: Bed with mattress, Small wardrobe, Table and chair, Cooking burner, and Basic kitchen utensils. Most common in <a href='/bedsitters-for-rent/nairobi-county?city=Kilimani' class='text-green-600 hover:underline'>Kilimani</a>, <a href='/bedsitters-for-rent/nairobi-county?city=Westlands' class='text-green-600 hover:underline'>Westlands</a>, and near universities. Unfurnished gives you more control over quality."
    },
    {
      question: "What is the notice period for vacating a bedsitter?",
      answer: "Standard notice period is 1 month (30 days) written notice. To ensure deposit refund: Give notice in writing (email or letter), Pay rent up to vacating date, Clean the bedsitter thoroughly, Repair any damages you caused, and Hand over keys to landlord/caretaker. Deposit refunds typically take 7-30 days after inspection."
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
        "name": "Bedsitter Nairobi",
        "item": "https://newkenyan.com/bedsitter-nairobi"
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
            <span className="text-gray-900 font-medium">Bedsitter Nairobi</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-12 md:py-16">
        <div className="container mx-auto px-3">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl shadow-lg">
                <Home className="h-10 w-10 text-white" />
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-center leading-tight">
              Bedsitter Apartments in Nairobi 2025
            </h1>

            <p className="text-lg md:text-xl text-gray-700 mb-8 text-center max-w-4xl mx-auto leading-relaxed">
              Find affordable bedsitter apartments in Nairobi starting from KES 5,000/month. Browse 1,000+ verified listings in budget-friendly areas like Kasarani, Ruaka, Kahawa, Rongai, and Kitengela. Perfect for students, young professionals, and budget-conscious renters seeking quality bedsitters with direct landlord contacts.
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
                <a href="#neighborhoods" className="text-sm text-green-600 hover:underline">Best Areas</a>
                <a href="#guide" className="text-sm text-green-600 hover:underline">Renter's Guide</a>
                <a href="#listings" className="text-sm text-green-600 hover:underline">Latest Listings</a>
                <a href="#market-trends" className="text-sm text-green-600 hover:underline">Market Trends</a>
                <a href="#tips" className="text-sm text-green-600 hover:underline">Student Tips</a>
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
              Nairobi Bedsitter Rental Market 2025: Complete Guide
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              The <strong>bedsitter rental market in Nairobi 2025</strong> offers affordable housing solutions for students, young professionals, and budget-conscious individuals. With over <Link href="/bedsitters-for-rent/nairobi-county" className="text-green-600 hover:underline">1,000+ verified bedsitter listings</Link> on NewKenyan.com, finding your ideal bedsitter has never been easier. Whether you're a student looking for a <Link href="/bedsitters-for-rent/nairobi-county?city=Kasarani&max_price=8000" className="text-green-600 hover:underline">bedsitter in Kasarani under KES 8,000</Link> or a young professional seeking a modern bedsitter in <Link href="/bedsitters-for-rent/nairobi-county?city=Ruaka" className="text-green-600 hover:underline">Ruaka</Link> at KES 12,000, we connect you directly with verified landlords at no extra cost.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-6">
              <h3 className="font-bold text-blue-900 mb-2 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                2025 Bedsitter Market Insights from NewKenyan.com
              </h3>
              <ul className="list-disc list-inside text-blue-900 space-y-2">
                <li>Average bedsitter rent: KES 5,000-15,000 (up 5% from 2024)</li>
                <li>Highest demand areas: Kasarani, Ruaka, Kahawa West (student hubs)</li>
                <li>Most affordable: Kitengela, Rongai, Githurai (KES 5,000-8,000)</li>
                <li>Fastest-growing: Syokimau, Pipeline, Donholm (new developments)</li>
                <li>Peak seasons: January & September (student intake months)</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              At <Link href="/" className="text-green-600 hover:underline font-semibold">NewKenyan.com</Link>, we've specialized in the Kenyan property market for over <strong>8 years</strong>, earning <strong>13+ industry awards</strong> including Best Real Estate Marketing Platform (2023) and Property Marketplace of the Year (2023). Our partnership with the <strong>Kenya Property Developers Association (KPDA)</strong> ensures all bedsitter listings meet quality and safety standards. We've successfully helped over <strong>50,000+ tenants</strong> find affordable accommodation across Nairobi.
            </p>
          </div>
        </div>
      </section>

      {/* Price Range Breakdown */}
      <section id="price-ranges" className="py-12 bg-gray-50">
        <div className="container mx-auto px-3">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Bedsitter Prices in Nairobi: Complete Breakdown by Area
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Budget Bedsitters */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Budget Bedsitters (KES 5K-8K)</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">KES 5,000 - 8,000</span>
                      <Link href="/bedsitters-for-rent/nairobi-county?min_price=5000&max_price=8000" className="text-green-600 text-sm hover:underline">
                        View Listings →
                      </Link>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Best Areas:</strong> Kitengela, Rongai, Githurai, Kahawa West, Pipeline
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Ideal For:</strong> Students, first-time renters, extreme budget-conscious
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>What to Expect:</strong> Basic finishes, shared compounds, manual water pump, prepaid electricity, simple kitchenette
                    </p>
                  </div>
                </div>
              </div>

              {/* Mid-Range Bedsitters */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Mid-Range Bedsitters (KES 8K-12K)</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">KES 8,000 - 12,000</span>
                      <Link href="/bedsitters-for-rent/nairobi-county?min_price=8000&max_price=12000" className="text-green-600 text-sm hover:underline">
                        View Listings →
                      </Link>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Best Areas:</strong> Kasarani, Ruaka, Donholm, Embakasi, Syokimau
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Ideal For:</strong> Working professionals, serious students, couples starting out
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>What to Expect:</strong> Better finishes, 24/7 security, backup water, tiled floors, modern bathroom, wardrobe
                    </p>
                  </div>
                </div>
              </div>

              {/* Premium Bedsitters */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Premium Bedsitters (KES 12K-15K)</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">KES 12,000 - 15,000</span>
                      <Link href="/bedsitters-for-rent/nairobi-county?min_price=12000&max_price=15000" className="text-green-600 text-sm hover:underline">
                        View Listings →
                      </Link>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Best Areas:</strong> Ruaka, Ngong Road, Kileleshwa, South B, Langata
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Ideal For:</strong> Young professionals, couples, those prioritizing safety
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>What to Expect:</strong> Modern finishes, CCTV, backup generator, hot shower, ample storage, fiber internet ready
                    </p>
                  </div>
                </div>
              </div>

              {/* Upscale Studios */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-orange-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Upscale Studio Apartments (KES 15K+)</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">KES 15,000+</span>
                      <Link href="/studio-apartments-for-rent/nairobi-county" className="text-green-600 text-sm hover:underline">
                        View Studios →
                      </Link>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Best Areas:</strong> Kilimani, Westlands, Parklands, Lavington
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Ideal For:</strong> Professionals, expats, those wanting luxury
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>What to Expect:</strong> Premium finishes, gym, swimming pool, concierge, furnished options, parking
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white text-center">
              <h3 className="text-xl font-bold mb-2">
                Looking for the Cheapest Bedsitters?
              </h3>
              <p className="mb-4">
                Browse our collection of <Link href="/bedsitters-for-rent/nairobi-county?max_price=8000" className="text-yellow-300 hover:underline font-semibold">bedsitters under KES 8,000/month</Link>
              </p>
              <Button className="bg-white text-green-600 hover:bg-gray-100" asChild>
                <Link href="/bedsitters-for-rent/nairobi-county?max_price=8000">
                  View Affordable Bedsitters
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
              Best Neighborhoods for Bedsitters in Nairobi
            </h2>
            <p className="text-gray-700 mb-8">
              Based on 8+ years of market data and thousands of successful rentals, here are the top budget-friendly neighborhoods for bedsitter rentals in Nairobi:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  name: 'Kasarani',
                  slug: 'Kasarani',
                  avgRent: 'KES 6,000 - 12,000',
                  rating: '4.5/5',
                  demographics: 'Students, Young Professionals',
                  highlights: ['Near universities', 'Kasarani Stadium', 'Thika Road access', 'Many amenities'],
                  transport: 'Excellent - Thika Superhighway',
                  safety: 'Moderate to High',
                  searches: '200-300/mo',
                  link: '/bedsitters-for-rent/nairobi-county?city=Kasarani'
                },
                {
                  name: 'Ruaka',
                  slug: 'Ruaka',
                  avgRent: 'KES 8,000 - 15,000',
                  rating: '4.6/5',
                  demographics: 'Young Professionals, Students',
                  highlights: ['Growing suburb', 'Modern developments', 'Near Two Rivers Mall', 'Secure estates'],
                  transport: 'Good - Limuru Road',
                  safety: 'High',
                  searches: '150-250/mo',
                  link: '/bedsitters-for-rent/nairobi-county?city=Ruaka'
                },
                {
                  name: 'Kahawa West',
                  slug: 'Kahawa+West',
                  avgRent: 'KES 5,000 - 9,000',
                  rating: '4.3/5',
                  demographics: 'Students (KU, USIU)',
                  highlights: ['Student-friendly', 'Very affordable', 'Near KU', 'Vibrant nightlife'],
                  transport: 'Excellent - Thika Road',
                  safety: 'Moderate',
                  searches: '100-200/mo',
                  link: '/bedsitters-for-rent/nairobi-county?city=Kahawa+West'
                },
                {
                  name: 'Rongai',
                  slug: 'Rongai',
                  avgRent: 'KES 5,000 - 10,000',
                  rating: '4.4/5',
                  demographics: 'Students, Budget-conscious',
                  highlights: ['Very affordable', 'Spacious compounds', 'Quiet residential', 'Growing area'],
                  transport: 'Moderate - Magadi Road',
                  safety: 'Moderate',
                  searches: '150-250/mo',
                  link: '/bedsitters-for-rent/nairobi-county?city=Rongai'
                },
                {
                  name: 'Kitengela',
                  slug: 'Kitengela',
                  avgRent: 'KES 5,000 - 8,000',
                  rating: '4.2/5',
                  demographics: 'Budget-conscious, Commuters',
                  highlights: ['Cheapest option', 'Spacious units', 'Peaceful', 'Wildlife nearby'],
                  transport: 'Moderate - Namanga Road',
                  safety: 'Moderate',
                  searches: '100-180/mo',
                  link: '/bedsitters-for-rent/nairobi-county?city=Kitengela'
                },
                {
                  name: 'Pipeline (Embakasi)',
                  slug: 'Pipeline',
                  avgRent: 'KES 6,000 - 11,000',
                  rating: '4.4/5',
                  demographics: 'Professionals, Jomo Kenyatta Airport workers',
                  highlights: ['Near airport', 'Industrial area access', 'Affordable', 'SGR station'],
                  transport: 'Good - Mombasa Road',
                  safety: 'Moderate',
                  searches: '120-200/mo',
                  link: '/bedsitters-for-rent/nairobi-county?city=Pipeline'
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
                    View Bedsitters in {neighborhood.name} →
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-blue-50 rounded-lg p-6">
              <h3 className="font-bold text-blue-900 mb-3">More Affordable Areas:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Githurai', 'Donholm', 'Syokimau', 'Ngong Road', 'Kileleshwa', 'Umoja', 'Buruburu', 'Langata'].map((area) => (
                  <Link key={area} href={`/bedsitters-for-rent/nairobi-county?city=${area}`} className="text-blue-600 hover:underline text-sm">
                    {area} Bedsitters →
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
              Complete Guide to Renting Bedsitters in Nairobi (2025)
            </h2>

            <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                Step-by-Step Bedsitter Rental Process
              </h3>
              <ol className="space-y-4 list-decimal list-inside text-gray-700">
                <li className="leading-relaxed">
                  <strong>Set Your Budget:</strong> Calculate total costs: Rent + Deposit (usually 2 months upfront) + Moving costs + Initial utilities. Budget for KES 12,000-25,000 upfront for a KES 8,000 bedsitter.
                </li>
                <li className="leading-relaxed">
                  <strong>Search & Shortlist:</strong> Browse our <Link href="/bedsitters-for-rent/nairobi-county" className="text-green-600 hover:underline">1,000+ verified bedsitter listings</Link>, filter by price and location. Shortlist 5-10 options near your school/workplace.
                </li>
                <li className="leading-relaxed">
                  <strong>Property Viewing:</strong> Contact landlords directly (no agent fees!). Visit during daytime. Check: Water pressure, electricity outlets, bathroom condition, window ventilation, security measures, cooking area, and neighborhood safety.
                </li>
                <li className="leading-relaxed">
                  <strong>Documentation:</strong> Prepare: National ID/Student ID copy, 2 passport photos, Payslip/admission letter, Reference letter (optional but helpful), Guarantor details (for students).
                </li>
                <li className="leading-relaxed">
                  <strong>Negotiation:</strong> Bedsitter rent is negotiable! Offer 3-6 months upfront for 10-15% discount. Clarify: Water costs, Security deposit, Maintenance responsibilities, Notice period.
                </li>
                <li className="leading-relaxed">
                  <strong>Agreement & Payment:</strong> Read tenancy agreement carefully. Get receipt for all payments (via M-Pesa or bank transfer, never cash). Take photos of bedsitter condition before moving in.
                </li>
              </ol>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Shield className="h-6 w-6 text-blue-600 mr-2" />
                Essential Bedsitter Inspection Checklist
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Must-Check Items:</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>✓ Water supply (turn on tap, check pressure)</li>
                    <li>✓ Electricity (test all sockets, switches)</li>
                    <li>✓ Bathroom (flush toilet, shower functionality)</li>
                    <li>✓ Window (opens/closes, has burglar bars)</li>
                    <li>✓ Door lock (secure, has deadbolt)</li>
                    <li>✓ Walls (check for dampness, cracks)</li>
                    <li>✓ Cooking area (allowed inside or shared?)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Security & Neighborhood:</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>✓ 24/7 security guard present</li>
                    <li>✓ Main gate secure (fence/wall)</li>
                    <li>✓ Adequate lighting at night</li>
                    <li>✓ CCTV cameras (if advertised)</li>
                    <li>✓ Visit area at different times</li>
                    <li>✓ Ask neighbors about safety</li>
                    <li>✓ Check proximity to matatu stage</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-6">
              <h3 className="font-bold text-yellow-900 mb-3">⚠️ Common Bedsitter Scams to Avoid:</h3>
              <ul className="space-y-2 text-yellow-900">
                <li>• <strong>Fake listings:</strong> Never pay deposit without viewing property in person</li>
                <li>• <strong>Impersonators:</strong> Verify landlord owns property (ask to see title deed)</li>
                <li>• <strong>"Too cheap" deals:</strong> Bedsitters below KES 4,000 in Nairobi are likely scams</li>
                <li>• <strong>No receipt:</strong> Always get written receipt for all payments (M-Pesa is best)</li>
                <li>• <strong>Pressure tactics:</strong> Don't be rushed into paying "or someone else will take it"</li>
                <li>• <strong>Cash-only:</strong> Legitimate landlords accept M-Pesa/bank transfers</li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-600 p-6">
              <h3 className="font-bold text-green-900 mb-3">💡 Expert Money-Saving Tips for Students:</h3>
              <ul className="space-y-2 text-green-900">
                <li>• <strong>Best time to hunt:</strong> March-April & November-December (low demand = better deals)</li>
                <li>• <strong>Roommate option:</strong> Share a 1-bedroom (KES 15K) between 2 people = KES 7.5K each</li>
                <li>• <strong>Group negotiation:</strong> If 3-4 friends rent in same building, negotiate group discount</li>
                <li>• <strong>Utilities budget:</strong> KES 1,500-3,000/month (electricity KES 500-1,000, water KES 300-500, cooking gas KES 700)</li>
                <li>• <strong>DIY furniture:</strong> Buy second-hand mattress, utensils from Gikomba (save KES 10,000+)</li>
                <li>• <strong>Transport:</strong> Factor in matatu costs (KES 100-200/day to CBD)</li>
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
              Latest Bedsitters for Rent in Nairobi
            </h2>
            <div className="flex flex-wrap gap-4 items-center">
              <select
                value={selectedNeighborhood}
                onChange={(e) => setSelectedNeighborhood(e.target.value)}
                className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-green-500 focus:outline-none"
              >
                <option value="all">All Neighborhoods</option>
                <option value="Kasarani">Kasarani</option>
                <option value="Ruaka">Ruaka</option>
                <option value="Kahawa">Kahawa West</option>
                <option value="Rongai">Rongai</option>
                <option value="Kitengela">Kitengela</option>
                <option value="Pipeline">Pipeline</option>
                <option value="Githurai">Githurai</option>
                <option value="Syokimau">Syokimau</option>
              </select>

              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-green-500 focus:outline-none"
              >
                <option value="all">All Prices</option>
                <option value="5000-8000">KES 5K - 8K</option>
                <option value="8000-10000">KES 8K - 10K</option>
                <option value="10000-12000">KES 10K - 12K</option>
                <option value="12000-15000">KES 12K - 15K</option>
                <option value="15000-999999999">KES 15K+</option>
              </select>

              <div className="ml-auto">
                <p className="text-gray-600">
                  Showing <strong>{properties.length}</strong> bedsitters
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
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No bedsitters found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or browse all properties
              </p>
              <Button asChild>
                <Link href="/bedsitters-for-rent/nairobi-county">Browse All Bedsitters</Link>
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
              2025 Bedsitter Market Trends & Student Insights
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Supply & Demand Analysis</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <TrendingUp className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <span><strong>Peak Demand:</strong> January & September (student intake, 30% price spike)</span>
                  </li>
                  <li className="flex items-start">
                    <TrendingUp className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <span><strong>Supply Surge:</strong> 2,000+ new bedsitters in Ruaka, Kasarani (2024-2025)</span>
                  </li>
                  <li className="flex items-start">
                    <TrendingUp className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <span><strong>Vacancy Rates:</strong> 5-10% in budget areas (easier negotiation)</span>
                  </li>
                  <li className="flex items-start">
                    <TrendingUp className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <span><strong>Competition:</strong> High in March-April, November-December (best deals)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Price Trends by Area</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <DollarSign className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                    <span><strong>Kasarani/Ruaka:</strong> +8-10% YoY (new developments, demand)</span>
                  </li>
                  <li className="flex items-start">
                    <DollarSign className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                    <span><strong>Kitengela/Rongai:</strong> Stable pricing (good value for money)</span>
                  </li>
                  <li className="flex items-start">
                    <DollarSign className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                    <span><strong>Near Universities:</strong> Premium of KES 1,000-2,000 over market</span>
                  </li>
                  <li className="flex items-start">
                    <DollarSign className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                    <span><strong>Utilities Inflation:</strong> +5% annually (factor into budget)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg" id="tips">
              <h3 className="text-xl font-bold text-gray-900 mb-4">2025 Predictions & Expert Advice</h3>
              <div className="prose prose-lg text-gray-700">
                <p className="mb-4">
                  Based on our <strong>8+ years of market data</strong> and partnerships with leading student housing developers, NewKenyan.com forecasts:
                </p>
                <ul className="space-y-2">
                  <li>• <strong>Shared economy growth:</strong> More co-living bedsitter complexes targeting students</li>
                  <li>• <strong>Smart utilities:</strong> Prepaid meters becoming standard (better budget control)</li>
                  <li>• <strong>Safety focus:</strong> Landlords investing in CCTV, better lighting (competitive edge)</li>
                  <li>• <strong>Flexible leases:</strong> 6-month options for students (vs traditional 12 months)</li>
                  <li>• <strong>Digital payments:</strong> M-Pesa rent payment now 90% of transactions</li>
                  <li>• <strong>Sustainability:</strong> Solar-powered bedsitters emerging in Kitengela, Rongai</li>
                </ul>
                <p className="mt-4 text-sm text-gray-600">
                  <strong>Pro Tip for Students:</strong> Book bedsitters in November-December for January move-in. You'll save 15-20% compared to hunting in January when demand peaks!
                </p>
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
              Explore More Affordable Housing Options in Nairobi
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3">By Property Type</h3>
                <ul className="space-y-2">
                  <li><Link href="/studio-apartments-for-rent/nairobi-county" className="text-green-600 hover:underline text-sm">Studio Apartments (KES 15K+) →</Link></li>
                  <li><Link href="/apartments-for-rent/nairobi-county?bedrooms=1" className="text-green-600 hover:underline text-sm">1 Bedroom Apartments →</Link></li>
                  <li><Link href="/2-bedroom-apartment-nairobi" className="text-green-600 hover:underline text-sm">2 Bedroom Apartments →</Link></li>
                  <li><Link href="/serviced-apartments-for-rent/nairobi-county" className="text-green-600 hover:underline text-sm">Serviced Apartments →</Link></li>
                  <li><Link href="/houses-for-rent-nairobi" className="text-green-600 hover:underline text-sm">Houses for Rent →</Link></li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3">By Budget Range</h3>
                <ul className="space-y-2">
                  <li><Link href="/bedsitters-for-rent/nairobi-county?max_price=8000" className="text-blue-600 hover:underline text-sm">Under KES 8,000 →</Link></li>
                  <li><Link href="/bedsitters-for-rent/nairobi-county?min_price=8000&max_price=10000" className="text-blue-600 hover:underline text-sm">KES 8K - 10K →</Link></li>
                  <li><Link href="/bedsitters-for-rent/nairobi-county?min_price=10000&max_price=12000" className="text-blue-600 hover:underline text-sm">KES 10K - 12K →</Link></li>
                  <li><Link href="/bedsitters-for-rent/nairobi-county?min_price=12000" className="text-blue-600 hover:underline text-sm">Premium (KES 12K+) →</Link></li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3">Student Housing Guides</h3>
                <ul className="space-y-2">
                  <li><Link href="/bedsitters-for-rent/nairobi-county?city=Kahawa" className="text-purple-600 hover:underline text-sm">Near Kenyatta University →</Link></li>
                  <li><Link href="/bedsitters-for-rent/nairobi-county?city=Kasarani" className="text-purple-600 hover:underline text-sm">Near USIU →</Link></li>
                  <li><Link href="/apartments-for-rent-nairobi" className="text-purple-600 hover:underline text-sm">All Nairobi Apartments →</Link></li>
                  <li><Link href="/properties" className="text-purple-600 hover:underline text-sm">Browse All Properties →</Link></li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4">Bedsitters by Neighborhood</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  'Kasarani', 'Ruaka', 'Kahawa West', 'Rongai',
                  'Kitengela', 'Pipeline', 'Githurai', 'Syokimau',
                  'Donholm', 'Ngong Road', 'Kileleshwa', 'Embakasi'
                ].map((area) => (
                  <Link
                    key={area}
                    href={`/bedsitters-for-rent/nairobi-county?city=${area}`}
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
                <Link href="/bedsitter-kasarani" className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 rounded-lg text-center transition-colors border border-green-200 hover:border-green-500 font-medium">
                  Kasarani
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

            {/* Budget-Friendly Areas */}
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

      {/* FAQ Section with Schema */}
      <section id="faqs" className="py-12 bg-gray-50">
        <div className="container mx-auto px-3">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Frequently Asked Questions About Bedsitters
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Expert answers from NewKenyan.com's 8+ years serving students and budget-conscious renters
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
              Why Trust NewKenyan.com for Your Bedsitter Search?
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
              <h3 className="text-2xl font-bold mb-4">Ready to Find Your Affordable Bedsitter?</h3>
              <p className="text-lg text-green-50 mb-6">
                Browse 1,000+ verified bedsitter listings or contact our expert team for personalized assistance
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-3" asChild>
                  <Link href="/bedsitters-for-rent/nairobi-county">
                    Browse All Bedsitters
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
