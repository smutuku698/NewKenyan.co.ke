'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RealEstateCompanyListing from '@/components/RealEstateCompanyListing';
import Link from 'next/link';
import {
  Home,
  TrendingUp,
  Building2,
  MapPin,
  DollarSign,
  BarChart3,
  Users,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Hammer,
  LineChart,
  PieChart,
  Building,
  BookOpen,
  ChevronDown
} from 'lucide-react';
import realEstateData from '@/data/realEstateCompanies.json';

export default function RealEstateCompaniesPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const companies = realEstateData.companies;

  useEffect(() => {
    // Add JSON-LD structured data for SEO
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Best Real Estate Companies in Kenya: Top Realtors & Property Investment Agents 2025',
      description: 'Find the best real estate agents, realtors, and property investment companies in Kenya. Comprehensive guide covering commercial real estate firms, property agents, market trends, and investment opportunities in Nairobi and across Kenya.',
      author: {
        '@type': 'Organization',
        name: 'NewKenyan.co.ke',
        url: 'https://newkenyan.co.ke'
      },
      publisher: {
        '@type': 'Organization',
        name: 'NewKenyan.co.ke',
        logo: {
          '@type': 'ImageObject',
          url: 'https://newkenyan.co.ke/logo.png'
        }
      },
      datePublished: '2025-01-04',
      dateModified: '2025-01-04',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://newkenyan.co.ke/real-estate-companies-in-kenya'
      },
      about: [
        {
          '@type': 'Thing',
          name: 'Real Estate Companies in Kenya'
        },
        {
          '@type': 'Thing',
          name: 'Real Estate Agents Kenya'
        },
        {
          '@type': 'Thing',
          name: 'Property Investment Companies Kenya'
        },
        {
          '@type': 'Thing',
          name: 'Commercial Real Estate Kenya'
        }
      ],
      keywords: 'real estate companies in kenya, best real estate agent in kenya, realtors in kenya, property investment companies in kenya, commercial real estate kenya, property agents kenya'
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
          }}></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="h-8 w-8" />
                <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">Real Estate Market Guide 2025</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Best Real Estate Companies in Kenya: Top Realtors & Property Investment Agents
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                Find trusted real estate agents, realtors, and property investment companies in Kenya. Compare commercial real estate firms, property developers, and expert consultants in Nairobi and beyond
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-3xl font-bold">KES 773B</div>
                  <div className="text-sm text-blue-100">Market Value 2025</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-3xl font-bold">5.12%</div>
                  <div className="text-sm text-blue-100">Annual Growth Rate</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-3xl font-bold">4.4%</div>
                  <div className="text-sm text-blue-100">Urbanization Rate</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-3xl font-bold">200K</div>
                  <div className="text-sm text-blue-100">Housing Deficit</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="bg-white border-b sticky top-0 z-40 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto gap-1 py-4 scrollbar-hide">
              {[
                { id: 'overview', label: 'Market Overview', icon: BarChart3 },
                { id: 'trends', label: 'Market Trends', icon: TrendingUp },
                { id: 'investment', label: 'Investment Guide', icon: DollarSign },
                { id: 'locations', label: 'Prime Locations', icon: MapPin },
                { id: 'house-types', label: 'House Types', icon: Home },
                { id: 'construction', label: 'Construction', icon: Hammer },
                { id: 'companies', label: 'Find Companies', icon: Building2 }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                    activeTab === item.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          {/* Market Overview Section */}
          <section id="overview" className="mb-16 scroll-mt-24">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Kenya Real Estate Market Overview: Finding the Best Realtors & Property Investment Companies</h2>
              </div>

              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Finding the <strong>best real estate agent in Kenya</strong> or reliable <strong>property investment companies</strong> is crucial for navigating Kenya's dynamic property market. Whether you're seeking experienced <strong>realtors in Kenya</strong> for residential properties or <strong>commercial real estate</strong> experts, Kenya's real estate sector offers diverse opportunities. With a projected market value of <strong>KES 773.02 billion (US$773.02 billion) by 2025</strong>, the country's <strong>real estate companies</strong> and <strong>property agents</strong> are driving one of East Africa's most vibrant property markets, serving both local buyers and diaspora investors.
                </p>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    Market Growth Trajectory
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Kenya's real estate market is experiencing exponential growth, with projections indicating an <strong>annual growth rate of 5.12% from 2025 to 2029</strong>, reaching a market volume of <strong>US$944.09 billion by 2029</strong>. This growth is fueled by rapid urbanization, infrastructure development, and a burgeoning middle class seeking quality housing and commercial spaces.
                  </p>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Historical Development of Kenya's Real Estate Sector</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Kenya's real estate sector has undergone remarkable transformation over the past two decades. From 2000 to 2016, the industry's contribution to GDP grew from <strong>10.5% to 13.8%</strong>, demonstrating its increasing importance to the national economy. This evolution has been characterized by several key phases:
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-400 transition-colors">
                    <h4 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      2000-2010: Foundation Era
                    </h4>
                    <p className="text-gray-700 text-sm">
                      Establishment of modern property development frameworks, introduction of mortgage financing, and emergence of professional real estate companies targeting middle-income earners.
                    </p>
                  </div>
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-400 transition-colors">
                    <h4 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      2010-2020: Expansion Phase
                    </h4>
                    <p className="text-gray-700 text-sm">
                      Massive infrastructure projects including the Standard Gauge Railway (SGR), expanded road networks, and development of satellite towns like Tatu City, Konza Technopolis, and Tilisi.
                    </p>
                  </div>
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-400 transition-colors">
                    <h4 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      2020-Present: Digitalization Era
                    </h4>
                    <p className="text-gray-700 text-sm">
                      Integration of technology in property transactions, virtual property tours, online listings platforms, and the rise of PropTech solutions transforming how Kenyans buy, sell, and rent properties.
                    </p>
                  </div>
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-400 transition-colors">
                    <h4 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      Future Outlook: Sustainability Focus
                    </h4>
                    <p className="text-gray-700 text-sm">
                      Growing emphasis on green buildings, smart homes with solar panels, rainwater harvesting, and eco-friendly construction materials responding to climate change concerns.
                    </p>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Current Market Dynamics</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The Kenyan real estate market in 2025 is characterized by several compelling dynamics that shape investment decisions and property values:
                </p>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-6">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    Housing Demand vs. Supply Gap
                  </h4>
                  <p className="text-gray-700">
                    Kenya faces an <strong>annual housing deficit of 200,000 units</strong>, with the country's population of 54 million growing at 2.3% annually. This persistent gap creates sustained demand for residential properties across all price segments, particularly affordable housing units.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 my-8">
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                    <div className="text-4xl font-bold text-blue-600 mb-2">US$693.88B</div>
                    <div className="text-sm text-gray-700">Residential Segment Value (2025)</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                    <div className="text-4xl font-bold text-green-600 mb-2">US$75.80B</div>
                    <div className="text-sm text-gray-700">Commercial Segment Value (2024)</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                    <div className="text-4xl font-bold text-purple-600 mb-2">12%</div>
                    <div className="text-sm text-gray-700">Rental Yields (Commercial)</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Market Trends Section */}
          <section id="trends" className="mb-16 scroll-mt-24">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">2025 Real Estate Market Trends</h2>
              </div>

              <div className="prose max-w-none">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Property Price Trends</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  The Kenyan property market in 2024-2025 has experienced notable price corrections, creating opportunities for buyers while presenting challenges for developers. House prices dropped by <strong>1.1% in Q3 2024</strong> compared to the previous quarter and fell <strong>14.28% year-on-year</strong>, making homeownership more accessible to first-time buyers.
                </p>

                <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-8">
                  <h4 className="font-bold text-xl text-gray-900 mb-4">Land Price Dynamics by Region</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div>
                        <div className="font-semibold text-gray-900">Urban Centers (Nairobi, Mombasa, Kisumu)</div>
                        <div className="text-sm text-gray-600">Established metropolitan areas</div>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">5-7% ↑</div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div>
                        <div className="font-semibold text-gray-900">Peripheral Towns (Kitengela, Thika, Nanyuki)</div>
                        <div className="text-sm text-gray-600">Growth areas near major cities</div>
                      </div>
                      <div className="text-2xl font-bold text-green-600">Up to 10% ↑</div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                      <div>
                        <div className="font-semibold text-gray-900">Infrastructure Corridors</div>
                        <div className="text-sm text-gray-600">Areas along new roads and SGR</div>
                      </div>
                      <div className="text-2xl font-bold text-purple-600">30%+ ↑</div>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Key Market Trends Shaping 2025</h3>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="border-2 border-blue-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <h4 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                      <Home className="h-5 w-5 text-blue-600" />
                      1. Affordable Housing Initiative
                    </h4>
                    <p className="text-gray-700 text-sm mb-3">
                      Government-backed affordable housing programs are creating opportunities for low to middle-income earners, with developments offering units ranging from KES 1.5M to KES 4M.
                    </p>
                    <div className="text-xs text-gray-600 bg-blue-50 p-3 rounded">
                      <strong>Key Players:</strong> National Housing Corporation, State Department for Housing, Private Developers partnering with government
                    </div>
                  </div>

                  <div className="border-2 border-green-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <h4 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                      <Building className="h-5 w-5 text-green-600" />
                      2. Mixed-Use Developments
                    </h4>
                    <p className="text-gray-700 text-sm mb-3">
                      Integrated communities combining residential, commercial, and recreational facilities are gaining popularity, offering convenience and modern urban living.
                    </p>
                    <div className="text-xs text-gray-600 bg-green-50 p-3 rounded">
                      <strong>Examples:</strong> Garden City, Two Rivers, Tatu City, The Hub Karen, Northlands City
                    </div>
                  </div>

                  <div className="border-2 border-purple-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <h4 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-purple-600" />
                      3. Sustainable & Green Buildings
                    </h4>
                    <p className="text-gray-700 text-sm mb-3">
                      Eco-friendly construction featuring solar panels, rainwater harvesting, energy-efficient designs, and sustainable materials is becoming standard practice.
                    </p>
                    <div className="text-xs text-gray-600 bg-purple-50 p-3 rounded">
                      <strong>Features:</strong> LEED certification, green roofs, natural ventilation, recycled materials, smart water management
                    </div>
                  </div>

                  <div className="border-2 border-orange-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <h4 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                      <Users className="h-5 w-5 text-orange-600" />
                      4. Smart Home Technology
                    </h4>
                    <p className="text-gray-700 text-sm mb-3">
                      Integration of IoT devices, smart security systems, automated lighting, climate control, and app-based property management is attracting tech-savvy buyers.
                    </p>
                    <div className="text-xs text-gray-600 bg-orange-50 p-3 rounded">
                      <strong>Technology:</strong> Smart locks, surveillance systems, energy monitors, automated gates, mobile app controls
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border-l-4 border-indigo-600 p-6 rounded-r-lg mb-6">
                  <h4 className="font-bold text-gray-900 mb-3">Rental Market Dynamics</h4>
                  <p className="text-gray-700 mb-4">
                    The rental market remains robust across Kenya's urban centers. <strong>Mid-income neighborhoods offer average rental yields of 7-8%</strong>, making rental properties an attractive investment vehicle. Commercial properties continue to offer even higher returns, with rental yields reaching up to 12% in prime locations.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div className="bg-white p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-indigo-600">7-8%</div>
                      <div className="text-xs text-gray-600">Residential Yields</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600">10-11%</div>
                      <div className="text-xs text-gray-600">Long-term Rentals</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-purple-600">12%</div>
                      <div className="text-xs text-gray-600">Commercial Properties</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600">15%+</div>
                      <div className="text-xs text-gray-600">Short-term Rentals</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Investment Guide Section */}
          <section id="investment" className="mb-16 scroll-mt-24">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Property Investment Companies in Kenya: Guide for Investors</h2>
              </div>

              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Investing in Kenyan real estate offers compelling opportunities for both local and international investors. The sector's fundamental drivers—rapid urbanization at 4.4% annually, infrastructure development, and sustained housing demand—create a favorable environment for property investment.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Invest in Kenya Real Estate?</h3>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                    <div className="text-3xl font-bold text-green-600 mb-2">5.4%</div>
                    <div className="text-sm font-semibold text-gray-900 mb-2">Average GDP Growth</div>
                    <div className="text-xs text-gray-700">Stable economic growth over five years supporting real estate demand</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                    <div className="text-3xl font-bold text-blue-600 mb-2">25%</div>
                    <div className="text-sm font-semibold text-gray-900 mb-2">Average Total Returns</div>
                    <div className="text-xs text-gray-700">High returns combining rental income and capital appreciation</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                    <div className="text-3xl font-bold text-purple-600 mb-2">30%+</div>
                    <div className="text-sm font-semibold text-gray-900 mb-2">Infrastructure Boost</div>
                    <div className="text-xs text-gray-700">Property value increases in newly connected areas</div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">Investment Options & Strategies</h3>

                <div className="space-y-6 mb-8">
                  <div className="border-l-4 border-blue-600 bg-blue-50 p-6 rounded-r-xl">
                    <h4 className="font-bold text-lg text-gray-900 mb-3">1. Direct Property Purchase</h4>
                    <p className="text-gray-700 mb-3">
                      Purchasing land or completed properties for rental income or capital appreciation remains the most popular investment strategy. Focus areas include:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm ml-4">
                      <li><strong>Residential Units:</strong> Apartments, maisonettes, and bungalows in high-demand areas (ROI: 7-11% annually)</li>
                      <li><strong>Commercial Properties:</strong> Office spaces, retail outlets, and warehouses (ROI: 10-15% annually)</li>
                      <li><strong>Land Banking:</strong> Purchasing land in growth corridors for future development (Appreciation: 5-30% annually)</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-green-600 bg-green-50 p-6 rounded-r-xl">
                    <h4 className="font-bold text-lg text-gray-900 mb-3">2. Real Estate Investment Trusts (REITs)</h4>
                    <p className="text-gray-700 mb-3">
                      REITs offer a more accessible entry point for investors seeking exposure to real estate without direct property ownership. Kenya's REIT market is growing, with I-REIT and D-REIT options providing:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm ml-4">
                      <li>Lower capital requirements (from KES 50,000)</li>
                      <li>Diversification across multiple properties</li>
                      <li>Professional management and liquidity</li>
                      <li>Regular dividend distributions from rental income</li>
                    </ul>
                    <div className="mt-4 p-3 bg-white rounded text-xs text-gray-600">
                      <strong>Reference:</strong> <a href="https://sbs.strathmore.edu/trends-in-the-kenyan-real-estate-sector-a-focus-on-real-estate-investment-trusts-reits/" target="_blank" rel="nofollow noopener" className="text-blue-600 hover:underline">Strathmore University - Trends in Kenya REITs</a>
                    </div>
                  </div>

                  <div className="border-l-4 border-purple-600 bg-purple-50 p-6 rounded-r-xl">
                    <h4 className="font-bold text-lg text-gray-900 mb-3">3. Off-Plan Property Investment</h4>
                    <p className="text-gray-700 mb-3">
                      Buying properties before construction completion offers significant discounts (10-30% below market value) with flexible payment plans. Partner with established developers like:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm ml-4">
                      <li><strong>Centum Real Estate:</strong> Kenya's leading developer with 11,000+ acres under development</li>
                      <li><strong>Tatu City:</strong> Mixed-use development north of Nairobi</li>
                      <li><strong>Tilisi Development:</strong> Large-scale residential communities</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-orange-600 bg-orange-50 p-6 rounded-r-xl">
                    <h4 className="font-bold text-lg text-gray-900 mb-3">4. Airbnb & Short-Term Rentals</h4>
                    <p className="text-gray-700 mb-3">
                      Tourist destinations and business hubs offer excellent opportunities for short-term rental investments, with yields exceeding 15% annually in prime locations like:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm ml-4">
                      <li>Nairobi CBD and Westlands (business travelers)</li>
                      <li>Coastal areas: Diani, Malindi, Watamu (tourism)</li>
                      <li>Kilimani, Lavington, Karen (expat and corporate housing)</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">Working with Real Estate Agents and Property Investment Companies</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Kenya's real estate landscape features numerous professional <strong>realtors</strong>, <strong>property agents</strong>, and <strong>real estate companies</strong> offering comprehensive services for investors. When selecting the <strong>best real estate agent in Kenya</strong> or a reliable property investment partner, consider:
                </p>

                <div className="bg-gradient-to-r from-gray-50 to-slate-50 border-2 border-gray-300 rounded-xl p-6 mb-6">
                  <h4 className="font-bold text-gray-900 mb-4">Due Diligence Checklist</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <div className="font-semibold text-sm text-gray-900">Track Record & Portfolio</div>
                        <div className="text-xs text-gray-600">Verify completed projects and client testimonials</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <div className="font-semibold text-sm text-gray-900">Legal Documentation</div>
                        <div className="text-xs text-gray-600">Confirm title deeds, approvals, and compliance</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <div className="font-semibold text-sm text-gray-900">Financial Stability</div>
                        <div className="text-xs text-gray-600">Assess developer's financial health and funding</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <div className="font-semibold text-sm text-gray-900">Market Reputation</div>
                        <div className="text-xs text-gray-600">Research reviews, awards, and industry standing</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    Investment Risks to Consider
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    While Kenya's real estate offers attractive returns, investors should be aware of potential challenges:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm ml-4">
                    <li>Market volatility and economic fluctuations affecting property values</li>
                    <li>Title deed issues and land disputes requiring thorough legal verification</li>
                    <li>Developer delays in off-plan projects</li>
                    <li>Credit to construction sector constraints (dropped 13.47% in 2024)</li>
                    <li>Rental income fluctuations based on market demand</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Prime Locations Section */}
          <section id="locations" className="mb-16 scroll-mt-24">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-red-100 rounded-lg">
                  <MapPin className="h-6 w-6 text-red-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Most Expensive & Prime Locations in Kenya</h2>
              </div>

              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Kenya's real estate market features distinct pricing tiers across different neighborhoods, driven by factors including infrastructure quality, proximity to amenities, security, and prestige. Understanding these locations helps investors and homebuyers make informed decisions.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">Top 10 Most Expensive Estates in Nairobi</h3>

                <div className="space-y-4 mb-8">
                  <div className="border-2 border-gold rounded-xl p-6 bg-gradient-to-r from-amber-50 to-yellow-50">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-xl text-gray-900">1. Gigiri</h4>
                        <p className="text-sm text-gray-600">Diplomatic & International Hub</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-amber-600">KES 119.3M</div>
                        <div className="text-xs text-gray-600">Average home price</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      Home to the United Nations Office (UNON) and numerous embassies including US, Canada, Italy, Sweden, and multiple African nations. Rental prices range from KES 200,000-300,000 for four-bedroom houses.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-white px-3 py-1 rounded-full text-gray-700">UN Headquarters</span>
                      <span className="text-xs bg-white px-3 py-1 rounded-full text-gray-700">Embassies</span>
                      <span className="text-xs bg-white px-3 py-1 rounded-full text-gray-700">International Schools</span>
                      <span className="text-xs bg-white px-3 py-1 rounded-full text-gray-700">24/7 Security</span>
                    </div>
                  </div>

                  <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-400 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-xl text-gray-900">2. Nyari</h4>
                        <p className="text-sm text-gray-600">Exclusive Leafy Suburb</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">KES 103.6M</div>
                        <div className="text-xs text-gray-600">Average home price</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      Relatively new upmarket estate along Red Hill Road, bordering Gigiri, Muthaiga, and Runda. Features luxury villas with rentals of KES 200,000-300,000 monthly.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-700">Gated Communities</span>
                      <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-700">Modern Villas</span>
                      <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-700">Proximity to Gigiri</span>
                    </div>
                  </div>

                  <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-400 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-xl text-gray-900">3. Runda</h4>
                        <p className="text-sm text-gray-600">Established Diplomatic Area</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">KES 92.1M</div>
                        <div className="text-xs text-gray-600">Average home price</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      Developed in the 1970s for UN employees, Runda remains a premier address with spacious compounds, mature gardens, and excellent security infrastructure.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-700">UN Community</span>
                      <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-700">Mature Estate</span>
                      <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-700">Large Compounds</span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="border-2 border-gray-200 rounded-xl p-4 hover:border-blue-400 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-lg text-gray-900">4. Karen</h4>
                          <p className="text-xs text-gray-600">Historic Leafy Suburb</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-purple-600">KES 88M</div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-700 mb-2">19km southwest of Nairobi, bordering Ngong Forest with spacious properties and colonial-era charm.</p>
                      <div className="flex flex-wrap gap-1">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700">Ngong Forest</span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700">Spacious Plots</span>
                      </div>
                    </div>

                    <div className="border-2 border-gray-200 rounded-xl p-4 hover:border-blue-400 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-lg text-gray-900">5. Muthaiga</h4>
                          <p className="text-xs text-gray-600">Elite Residential Area</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-indigo-600">KES 85M+</div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-700 mb-2">2.5 miles northeast of Nairobi CBD, surrounded by Karura Forest, home to Kenya's wealthiest individuals.</p>
                      <div className="flex flex-wrap gap-1">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700">Ultra-Luxury</span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700">Karura Forest</span>
                      </div>
                    </div>

                    <div className="border-2 border-gray-200 rounded-xl p-4 hover:border-blue-400 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-lg text-gray-900">6. Kitisuru</h4>
                          <p className="text-xs text-gray-600">Premium Hillside Location</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-blue-600">Up to KES 145M</div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-700 mb-2">Features magnificent villas with panoramic views, popular with executives and successful entrepreneurs.</p>
                      <div className="flex flex-wrap gap-1">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700">Hilltop Views</span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700">Executive Homes</span>
                      </div>
                    </div>

                    <div className="border-2 border-gray-200 rounded-xl p-4 hover:border-blue-400 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-lg text-gray-900">7. Lavington</h4>
                          <p className="text-xs text-gray-600">Upscale Northwest Suburb</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-green-600">KES 66.7M+</div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-700 mb-2">Northwest of CBD, high-end mansions with excellent amenities and proximity to shopping centers.</p>
                      <div className="flex flex-wrap gap-1">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700">Shopping Access</span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700">Mansions</span>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Commercial Real Estate in Kenya: Prime Business Districts & Land Prices</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Upper Hill</h4>
                    <div className="text-3xl font-bold text-blue-600 mb-2">KES 525.7M</div>
                    <div className="text-sm text-gray-700">per acre</div>
                    <p className="text-xs text-gray-600 mt-3">Nairobi's premier business district with modern office towers, hospitals, and government offices.</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Westlands</h4>
                    <div className="text-3xl font-bold text-purple-600 mb-2">KES 418.7M</div>
                    <div className="text-sm text-gray-700">per acre</div>
                    <p className="text-xs text-gray-600 mt-3">Thriving commercial hub with malls, hotels, restaurants, and office complexes.</p>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Affordable & Emerging Locations</h3>
                <p className="text-gray-700 mb-4">
                  For budget-conscious buyers and investors seeking value appreciation, these areas offer significant opportunities:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-green-50 border-2 border-green-200 p-4 rounded-xl">
                    <h4 className="font-bold text-gray-900 mb-2">Kiserian</h4>
                    <div className="text-2xl font-bold text-green-600 mb-1">KES 8.8M</div>
                    <div className="text-xs text-gray-600 mb-3">Average house price</div>
                    <p className="text-xs text-gray-700">Fast-growing town along Ngong Road with affordable housing developments.</p>
                  </div>
                  <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded-xl">
                    <h4 className="font-bold text-gray-900 mb-2">Kitengela</h4>
                    <div className="text-2xl font-bold text-blue-600 mb-1">KES 11.1M</div>
                    <div className="text-xs text-gray-600 mb-3">Average house price</div>
                    <p className="text-xs text-gray-700">Rapidly developing area south of Nairobi with land value growth up to 10% annually.</p>
                  </div>
                  <div className="bg-purple-50 border-2 border-purple-200 p-4 rounded-xl">
                    <h4 className="font-bold text-gray-900 mb-2">Juja</h4>
                    <div className="text-2xl font-bold text-purple-600 mb-1">KES 11.9M</div>
                    <div className="text-xs text-gray-600 mb-3">Average house price</div>
                    <p className="text-xs text-gray-700">Student town and growing residential area along Thika Road corridor.</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg text-xs text-gray-600">
                  <strong>Source:</strong> <a href="https://www.businessdailyafrica.com/bd/news/revealed-nairobi-s-most-expensive-cheapest-estates-2289728" target="_blank" rel="nofollow noopener" className="text-blue-600 hover:underline">Business Daily Africa - Nairobi Estate Prices</a>, <a href="https://shiftersmovers.com/most-expensive-estates-in-nairobi-house-prices-in-nairobi/" target="_blank" rel="nofollow noopener" className="text-blue-600 hover:underline">Comprehensive Estate Analysis 2025</a>
                </div>
              </div>
            </div>
          </section>

          {/* House Types Section */}
          <section id="house-types" className="mb-16 scroll-mt-24">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Home className="h-6 w-6 text-orange-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">House Types & Architectural Styles in Kenya</h2>
              </div>

              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Kenya's residential landscape showcases diverse architectural styles reflecting the country's cultural heritage, climate adaptation, and modern design influences. Understanding these house types helps buyers choose properties that match their lifestyle and investment goals.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">Popular House Types in Kenya</h3>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="border-2 border-blue-200 rounded-xl p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Home className="h-6 w-6 text-blue-600" />
                      </div>
                      <h4 className="font-bold text-lg text-gray-900">Bungalows</h4>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      Single-story homes popular for their accessibility and ease of maintenance. Modern open-plan bungalows feature 2-4 bedrooms, making them ideal for families and retirees.
                    </p>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="text-gray-700">Affordable construction costs</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="text-gray-700">Easy maintenance and accessibility</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="text-gray-700">Suitable for all age groups</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="text-sm font-semibold text-gray-900">Typical Price Range:</div>
                      <div className="text-lg font-bold text-blue-600">KES 3.5M - KES 15M</div>
                    </div>
                  </div>

                  <div className="border-2 border-green-200 rounded-xl p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Building className="h-6 w-6 text-green-600" />
                      </div>
                      <h4 className="font-bold text-lg text-gray-900">Maisonettes</h4>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      Two-story residential units maximizing land use efficiency. Typically feature 3-5 bedrooms with ground floor living areas and bedrooms upstairs.
                    </p>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="text-gray-700">Optimal space utilization</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="text-gray-700">Clear separation of living and sleeping areas</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="text-gray-700">Popular in gated communities</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="text-sm font-semibold text-gray-900">Typical Price Range:</div>
                      <div className="text-lg font-bold text-green-600">KES 6M - KES 25M</div>
                    </div>
                  </div>

                  <div className="border-2 border-purple-200 rounded-xl p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Building2 className="h-6 w-6 text-purple-600" />
                      </div>
                      <h4 className="font-bold text-lg text-gray-900">Apartments & Condominiums</h4>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      Multi-unit residential buildings ranging from studio apartments to 4-bedroom penthouses. Ideal for urban living with shared amenities.
                    </p>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="text-gray-700">Lower entry costs for buyers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="text-gray-700">Shared amenities (gym, pool, security)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="text-gray-700">Strong rental demand in cities</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="text-sm font-semibold text-gray-900">Typical Price Range:</div>
                      <div className="text-lg font-bold text-purple-600">KES 2M - KES 30M+</div>
                    </div>
                  </div>

                  <div className="border-2 border-orange-200 rounded-xl p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Home className="h-6 w-6 text-orange-600" />
                      </div>
                      <h4 className="font-bold text-lg text-gray-900">Villas & Mansions</h4>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      Luxury standalone properties with expansive compounds, multiple bedrooms (5+), and premium finishes. Common in upscale neighborhoods.
                    </p>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="text-gray-700">Large compound sizes (0.5 - 2+ acres)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="text-gray-700">High-end finishes and amenities</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="text-gray-700">Privacy and exclusivity</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="text-sm font-semibold text-gray-900">Typical Price Range:</div>
                      <div className="text-lg font-bold text-orange-600">KES 30M - KES 200M+</div>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Trending Architectural Styles 2025</h3>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-6">
                  <h4 className="font-bold text-lg text-gray-900 mb-3">1. Modern Contemporary Design</h4>
                  <p className="text-gray-700 mb-3">
                    Characterized by clean lines, large windows, open floor plans, and minimalist aesthetics. Uses glass, steel, and concrete for a sleek appearance.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <div className="font-semibold text-sm text-gray-900 mb-2">Key Features:</div>
                      <ul className="list-disc list-inside text-xs text-gray-700 space-y-1">
                        <li>Floor-to-ceiling windows for natural light</li>
                        <li>Open-plan living, dining, and kitchen areas</li>
                        <li>Neutral color palettes with accent features</li>
                        <li>Integration of smart home technology</li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-gray-900 mb-2">Popular In:</div>
                      <ul className="list-disc list-inside text-xs text-gray-700 space-y-1">
                        <li>Kilimani, Lavington, and Parklands (Nairobi)</li>
                        <li>New developments in Tatu City</li>
                        <li>Nyali and Bamburi (Mombasa coast)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-600 p-6 rounded-r-lg mb-6">
                  <h4 className="font-bold text-lg text-gray-900 mb-3">2. Traditional African Architecture Revival</h4>
                  <p className="text-gray-700 mb-3">
                    Renewed interest in indigenous building methods celebrating Kenya's cultural heritage while incorporating modern comfort and sustainability.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <div className="font-semibold text-sm text-gray-900 mb-2">Key Features:</div>
                      <ul className="list-disc list-inside text-xs text-gray-700 space-y-1">
                        <li>Natural materials: earth, clay, thatch, timber</li>
                        <li>Intricate carvings and decorative elements</li>
                        <li>Passive cooling through design orientation</li>
                        <li>Community-focused spatial layouts</li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-gray-900 mb-2">Examples:</div>
                      <ul className="list-disc list-inside text-xs text-gray-700 space-y-1">
                        <li>Swahili houses with coral stone (coastal region)</li>
                        <li>Makuti-thatched roofs for beach properties</li>
                        <li>Adobe/mud brick homes in rural areas</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-600 p-6 rounded-r-lg mb-6">
                  <h4 className="font-bold text-lg text-gray-900 mb-3">3. Mediterranean & Colonial Styles</h4>
                  <p className="text-gray-700 mb-3">
                    Timeless designs featuring arches, verandas, terracotta roofs, and white-washed walls, popular in upscale estates.
                  </p>
                  <div className="text-xs text-gray-700">
                    <strong>Popular locations:</strong> Karen, Runda, parts of Mombasa's North Coast
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-600 p-6 rounded-r-lg">
                  <h4 className="font-bold text-lg text-gray-900 mb-3">4. Smart & Eco-Friendly Homes</h4>
                  <p className="text-gray-700 mb-3">
                    Integration of technology and sustainability features defining modern Kenyan housing:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <div className="font-semibold text-gray-900 mb-2">Smart Features:</div>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Automated lighting and climate control</li>
                        <li>Smart security systems with app controls</li>
                        <li>Voice-activated home management</li>
                        <li>Energy monitoring systems</li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-2">Eco Features:</div>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Solar panel installations</li>
                        <li>Rainwater harvesting systems</li>
                        <li>Greywater recycling</li>
                        <li>Energy-efficient appliances and lighting</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg text-xs text-gray-600">
                  <strong>Reference:</strong> <a href="https://integrum.co.ke/types-of-houses-in-kenya/" target="_blank" rel="nofollow noopener" className="text-blue-600 hover:underline">INTEGRUM Construction - House Types in Kenya</a>, <a href="https://www.evansengineeringandconstruction.com/post/unveiling-the-future-2024-s-hidden-gems-in-kenyan-architectural-styles" target="_blank" rel="nofollow noopener" className="text-blue-600 hover:underline">Evans Engineering - 2024 Architectural Trends</a>
                </div>
              </div>
            </div>
          </section>

          {/* Construction Materials Section */}
          <section id="construction" className="mb-16 scroll-mt-24">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Hammer className="h-6 w-6 text-yellow-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Construction Materials & Building Trends</h2>
              </div>

              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Understanding construction materials is essential for property buyers, developers, and investors in Kenya. The choice of building materials impacts construction costs, durability, maintenance requirements, and environmental sustainability.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">Common Building Materials in Kenya</h3>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="border-2 border-red-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <h4 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                      Bricks & Blocks
                    </h4>
                    <p className="text-sm text-gray-700 mb-3">
                      The most common masonry material in Kenya, offering durability, fire resistance, and good insulation properties.
                    </p>
                    <div className="space-y-2 text-xs text-gray-700">
                      <div><strong>Types:</strong> Red clay bricks, concrete blocks, interlocking blocks</div>
                      <div><strong>Cost:</strong> KES 8-25 per brick/block depending on type</div>
                      <div><strong>Benefits:</strong> Durable, fire-resistant, low maintenance, various colors/textures</div>
                      <div><strong>Best For:</strong> Permanent residential and commercial structures</div>
                    </div>
                  </div>

                  <div className="border-2 border-brown-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <h4 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                      <div className="w-3 h-3 bg-amber-700 rounded-full"></div>
                      Timber & Wood
                    </h4>
                    <p className="text-sm text-gray-700 mb-3">
                      Versatile natural material adding warmth and character to homes, used for framing, flooring, and cladding.
                    </p>
                    <div className="space-y-2 text-xs text-gray-700">
                      <div><strong>Types:</strong> Hardwood (mvule, teak), softwood (cypress, pine), treated timber</div>
                      <div><strong>Applications:</strong> Roof trusses, flooring, doors, windows, cladding</div>
                      <div><strong>Benefits:</strong> Natural beauty, good insulation, renewable resource</div>
                      <div><strong>Considerations:</strong> Requires treatment against termites and moisture</div>
                    </div>
                  </div>

                  <div className="border-2 border-gray-300 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <h4 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                      Stone
                    </h4>
                    <p className="text-sm text-gray-700 mb-3">
                      Natural or cut stone providing durability, aesthetic appeal, and a timeless look to residential properties.
                    </p>
                    <div className="space-y-2 text-xs text-gray-700">
                      <div><strong>Types:</strong> Natural quarry stone, granite, limestone, sandstone</div>
                      <div><strong>Applications:</strong> Wall cladding, foundations, decorative features</div>
                      <div><strong>Benefits:</strong> Extremely durable, low maintenance, unique aesthetics</div>
                      <div><strong>Best For:</strong> High-end finishes, accent walls, outdoor landscaping</div>
                    </div>
                  </div>

                  <div className="border-2 border-blue-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <h4 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      Concrete & Cement
                    </h4>
                    <p className="text-sm text-gray-700 mb-3">
                      Foundation of modern construction in Kenya, used for structural elements and finishing.
                    </p>
                    <div className="space-y-2 text-xs text-gray-700">
                      <div><strong>Applications:</strong> Foundations, slabs, beams, columns, floors</div>
                      <div><strong>Cost:</strong> 50kg bag of cement: KES 700-850</div>
                      <div><strong>Benefits:</strong> High strength, versatile, readily available</div>
                      <div><strong>Modern Use:</strong> Polished concrete floors, exposed concrete features</div>
                    </div>
                  </div>

                  <div className="border-2 border-green-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <h4 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                      Interlocking Stabilized Soil Blocks (ISSBs)
                    </h4>
                    <p className="text-sm text-gray-700 mb-3">
                      Eco-friendly alternative gaining popularity for sustainable and cost-effective construction.
                    </p>
                    <div className="space-y-2 text-xs text-gray-700">
                      <div><strong>Composition:</strong> Soil, cement (8-10%), compressed without firing</div>
                      <div><strong>Cost Savings:</strong> 30-40% cheaper than conventional bricks</div>
                      <div><strong>Benefits:</strong> Eco-friendly, good thermal mass, reduced mortar use</div>
                      <div><strong>Growing Trend:</strong> Affordable housing and green building projects</div>
                    </div>
                  </div>

                  <div className="border-2 border-orange-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <h4 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                      Roofing Materials
                    </h4>
                    <p className="text-sm text-gray-700 mb-3">
                      Diverse options catering to different budgets, climates, and aesthetic preferences.
                    </p>
                    <div className="space-y-2 text-xs text-gray-700">
                      <div><strong>Iron Sheets:</strong> Most common, gauge 28-32 (KES 500-1,200 per sheet)</div>
                      <div><strong>Tiles:</strong> Clay or concrete tiles for upscale homes (KES 80-200 per tile)</div>
                      <div><strong>Makuti Thatch:</strong> Traditional coastal roofing, natural insulation</div>
                      <div><strong>Shingles:</strong> Asphalt or composite for modern aesthetics</div>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Sustainable & Innovative Materials</h3>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-600 p-6 rounded-r-lg mb-6">
                  <h4 className="font-bold text-lg text-gray-900 mb-3">Green Building Movement in Kenya</h4>
                  <p className="text-gray-700 mb-4">
                    Kenya's construction sector is increasingly embracing sustainable materials and practices in response to environmental concerns and energy efficiency demands.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <div className="font-semibold text-sm text-gray-900 mb-2">Sustainable Materials:</div>
                      <ul className="list-disc list-inside text-xs text-gray-700 space-y-1">
                        <li>Bamboo for structural and decorative elements</li>
                        <li>Recycled plastic bricks and pavers</li>
                        <li>Locally-sourced stone reducing carbon footprint</li>
                        <li>Rammed earth for thermal mass</li>
                        <li>Reclaimed wood and recycled steel</li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-gray-900 mb-2">Energy-Efficient Features:</div>
                      <ul className="list-disc list-inside text-xs text-gray-700 space-y-1">
                        <li>Solar panels for electricity generation</li>
                        <li>Solar water heating systems</li>
                        <li>Rainwater harvesting tanks</li>
                        <li>Double-glazed windows for insulation</li>
                        <li>LED lighting throughout properties</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Construction Cost Estimates 2025</h3>
                <p className="text-gray-700 mb-4">
                  Understanding construction costs helps investors and homebuilders budget effectively. Costs vary based on location, materials, finishes, and design complexity.
                </p>

                <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden mb-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                        <tr>
                          <th className="text-left p-4 font-semibold">House Type</th>
                          <th className="text-left p-4 font-semibold">Size</th>
                          <th className="text-left p-4 font-semibold">Cost per SQM</th>
                          <th className="text-left p-4 font-semibold">Total Cost Range</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50">
                          <td className="p-4 font-medium">Basic Bungalow</td>
                          <td className="p-4">100-150 sqm</td>
                          <td className="p-4">KES 35,000-45,000</td>
                          <td className="p-4 font-semibold text-blue-600">KES 3.5M-6.7M</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="p-4 font-medium">3-Bedroom Maisonette</td>
                          <td className="p-4">150-200 sqm</td>
                          <td className="p-4">KES 45,000-60,000</td>
                          <td className="p-4 font-semibold text-green-600">KES 6.7M-12M</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="p-4 font-medium">4-Bedroom Maisonette</td>
                          <td className="p-4">200-250 sqm</td>
                          <td className="p-4">KES 50,000-70,000</td>
                          <td className="p-4 font-semibold text-purple-600">KES 10M-17.5M</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="p-4 font-medium">Luxury Villa</td>
                          <td className="p-4">300-500 sqm</td>
                          <td className="p-4">KES 70,000-120,000</td>
                          <td className="p-4 font-semibold text-orange-600">KES 21M-60M</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="p-4 font-medium">Apartment Block (per unit)</td>
                          <td className="p-4">60-100 sqm</td>
                          <td className="p-4">KES 40,000-55,000</td>
                          <td className="p-4 font-semibold text-indigo-600">KES 2.4M-5.5M</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="bg-gray-50 p-4 text-xs text-gray-600">
                    <strong>Note:</strong> Costs include labor, materials, and basic finishes. High-end finishes, smart home features, and complex designs increase costs by 20-50%. Location significantly affects labor costs and material transportation.
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg text-xs text-gray-600">
                  <strong>Learn More:</strong> Use our <Link href="/construction-cost-calculator-kenya" className="text-blue-600 hover:underline font-semibold">Construction Cost Calculator</Link> to estimate your specific project costs based on size, location, and finishes.
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg text-xs text-gray-600">
                  <strong>Reference:</strong> <a href="https://www.ebuild.ke/types-of-building-materials-for-residential-house-in-kenya/" target="_blank" rel="nofollow noopener" className="text-blue-600 hover:underline">Ebuild Kenya - Building Materials Guide</a>, <a href="https://integrum.co.ke/best-modern-house-designs-kenya/" target="_blank" rel="nofollow noopener" className="text-blue-600 hover:underline">INTEGRUM - Modern House Designs & Costs</a>
                </div>
              </div>
            </div>
          </section>

          {/* Real Estate Companies Section */}
          <section id="companies" className="mb-16 scroll-mt-24">
            <div className="mb-8">
              <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                      <Building2 className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold">Trusted Real Estate Companies in Kenya</h2>
                  </div>
                  <Link
                    href="/real-estate-companies/add"
                    className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold shadow-lg whitespace-nowrap"
                  >
                    <Building2 className="h-5 w-5" />
                    Add Your Company
                  </Link>
                </div>
                <p className="text-xl text-blue-100 leading-relaxed mb-6">
                  Browse our curated directory of {companies.length}+ verified real estate companies across Kenya. Each listing includes contact details, Google Maps location, client reviews, and comprehensive service information to help you make informed decisions.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-300 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold mb-1">Verified Contact Information</div>
                      <div className="text-sm text-blue-100">Direct phone numbers, WhatsApp links, and website URLs for instant communication</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-300 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold mb-1">Google Maps Integration</div>
                      <div className="text-sm text-blue-100">Interactive maps showing exact company locations with directions</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-300 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold mb-1">Real Client Reviews</div>
                      <div className="text-sm text-blue-100">Authentic Google reviews and ratings from actual clients</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-300 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold mb-1">Detailed Service Listings</div>
                      <div className="text-sm text-blue-100">Comprehensive information about each company's specializations and offerings</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Listings */}
              <RealEstateCompanyListing companies={companies} />

              {/* Bottom CTA */}
              <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-8 mt-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Can't Find What You're Looking For?</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Browse thousands of property listings or list your own business in our directory
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/properties"
                    className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    <Home className="h-5 w-5" />
                    Browse Properties
                  </Link>
                  <Link
                    href="/add-listing"
                    className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    <Building2 className="h-5 w-5" />
                    List Your Company
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Related Resources Section */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Resources & Tools</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link href="/mortgage-calculator-kenya" className="group bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                      <DollarSign className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">Mortgage Calculator</h3>
                  </div>
                  <p className="text-sm text-gray-700">Calculate monthly payments and total loan costs for your property purchase</p>
                </Link>

                <Link href="/construction-cost-calculator-kenya" className="group bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-green-500 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                      <Hammer className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">Construction Calculator</h3>
                  </div>
                  <p className="text-sm text-gray-700">Estimate building costs for your dream home based on size and finishes</p>
                </Link>

                <Link href="/properties" className="group bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-purple-500 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                      <Home className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">Property Listings</h3>
                  </div>
                  <p className="text-sm text-gray-700">Browse thousands of properties for sale and rent across Kenya</p>
                </Link>

                <Link href="/blog" className="group bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-orange-500 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                      <BookOpen className="h-6 w-6 text-orange-600" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">Real Estate Blog</h3>
                  </div>
                  <p className="text-sm text-gray-700">Expert insights, market updates, and investment guides</p>
                </Link>

                <Link href="/business-directory" className="group bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-indigo-500 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
                      <Building className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">Business Directory</h3>
                  </div>
                  <p className="text-sm text-gray-700">Find contractors, architects, interior designers, and more</p>
                </Link>

                <Link href="/contact" className="group bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-red-500 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                      <Users className="h-6 w-6 text-red-600" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">Contact Us</h3>
                  </div>
                  <p className="text-sm text-gray-700">Get personalized assistance with your real estate needs</p>
                </Link>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>

              <div className="space-y-4">
                <details className="group border-2 border-gray-200 rounded-xl p-6 hover:border-blue-400 transition-colors">
                  <summary className="font-bold text-lg text-gray-900 cursor-pointer flex items-center justify-between">
                    <span>What is the average return on real estate investment in Kenya?</span>
                    <ChevronDown className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="text-gray-700 mt-4 text-sm leading-relaxed">
                    Real estate in Kenya offers average total returns of approximately 25% annually, combining rental income (7-12% yields) and capital appreciation (5-30% depending on location). Residential properties in mid-income areas typically yield 7-8%, while commercial properties can achieve 10-12% rental yields. Infrastructure development zones have seen property values increase by over 30% in recent years.
                  </p>
                </details>

                <details className="group border-2 border-gray-200 rounded-xl p-6 hover:border-blue-400 transition-colors">
                  <summary className="font-bold text-lg text-gray-900 cursor-pointer flex items-center justify-between">
                    <span>How much does it cost to build a 3-bedroom house in Kenya?</span>
                    <ChevronDown className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="text-gray-700 mt-4 text-sm leading-relaxed">
                    Building a 3-bedroom house in Kenya typically costs between KES 3.5M to KES 12M depending on size (100-200 sqm), location, materials, and finishes. Basic construction costs average KES 35,000-60,000 per square meter. High-end finishes, smart home technology, and complex designs can increase costs by 20-50%. Use our Construction Cost Calculator for personalized estimates.
                  </p>
                </details>

                <details className="group border-2 border-gray-200 rounded-xl p-6 hover:border-blue-400 transition-colors">
                  <summary className="font-bold text-lg text-gray-900 cursor-pointer flex items-center justify-between">
                    <span>Which are the most expensive areas to buy property in Kenya?</span>
                    <ChevronDown className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="text-gray-700 mt-4 text-sm leading-relaxed">
                    The most expensive residential areas in Kenya are: 1) Gigiri (avg. KES 119.3M per home), 2) Nyari (KES 103.6M), 3) Runda (KES 92.1M), 4) Karen (KES 88M), 5) Muthaiga (KES 85M+), 6) Kitisuru (up to KES 145M), and 7) Lavington (KES 66.7M+). For commercial land, Upper Hill commands KES 525.7M per acre, followed by Westlands at KES 418.7M per acre.
                  </p>
                </details>

                <details className="group border-2 border-gray-200 rounded-xl p-6 hover:border-blue-400 transition-colors">
                  <summary className="font-bold text-lg text-gray-900 cursor-pointer flex items-center justify-between">
                    <span>Is real estate a good investment in Kenya in 2025?</span>
                    <ChevronDown className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="text-gray-700 mt-4 text-sm leading-relaxed">
                    Yes, real estate remains an excellent investment in Kenya for 2025. The market is projected to grow at 5.12% annually, reaching US$944.09 billion by 2029. Key drivers include: rapid urbanization (4.4% annually), annual housing deficit of 200,000 units, infrastructure improvements boosting property values by 30%+, and stable GDP growth averaging 5.4%. However, investors should conduct thorough due diligence and consider market corrections (house prices dropped 14.28% YoY in 2024, creating buying opportunities).
                  </p>
                </details>

                <details className="group border-2 border-gray-200 rounded-xl p-6 hover:border-blue-400 transition-colors">
                  <summary className="font-bold text-lg text-gray-900 cursor-pointer flex items-center justify-between">
                    <span>What should I look for when choosing a real estate company in Kenya?</span>
                    <ChevronDown className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="text-gray-700 mt-4 text-sm leading-relaxed">
                    When selecting a real estate company, verify: 1) Track record with completed projects and client testimonials, 2) Legal compliance including proper registration and title documentation, 3) Financial stability and funding sources, 4) Market reputation through reviews and industry awards, 5) Transparency in pricing and payment terms, 6) After-sales support and warranty provisions. Always conduct independent title searches and consult a lawyer before making property transactions.
                  </p>
                </details>

                <details className="group border-2 border-gray-200 rounded-xl p-6 hover:border-blue-400 transition-colors">
                  <summary className="font-bold text-lg text-gray-900 cursor-pointer flex items-center justify-between">
                    <span>What are the trending property features in Kenya's real estate market?</span>
                    <ChevronDown className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="text-gray-700 mt-4 text-sm leading-relaxed">
                    Current trending features include: Smart home technology (automated lighting, security, climate control), eco-friendly elements (solar panels, rainwater harvesting, energy-efficient appliances), mixed-use developments combining residential and commercial spaces, gated communities with shared amenities (gyms, pools, playgrounds), open-plan living spaces, and sustainable construction materials like interlocking stabilized soil blocks (ISSBs). Properties with these features command premium prices and attract tech-savvy, environmentally-conscious buyers.
                  </p>
                </details>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section>
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Real Estate Journey?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Whether you're buying your first home, investing in property, or looking for the perfect commercial space, NewKenyan.co.ke connects you with trusted real estate professionals across Kenya.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/properties"
                  className="inline-flex items-center justify-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg"
                >
                  <Home className="h-6 w-6" />
                  Explore Properties
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/30 transition-colors"
                >
                  <Users className="h-6 w-6" />
                  Get Expert Advice
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
