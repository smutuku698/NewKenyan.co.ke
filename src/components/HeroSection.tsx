'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, MapPin, Home, DollarSign, TrendingUp, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [location, setLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Construct search URL with filters
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (propertyType !== 'all') params.set('type', propertyType);
    if (location) params.set('city', location);

    window.location.href = `/properties?${params.toString()}`;
  };

  return (
    <section className="relative bg-gradient-to-b from-[#FFF9F5] to-white overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* LEFT COLUMN - Text & Search */}
          <div className="space-y-6 lg:space-y-8 z-10">
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-2 text-sm">
              <Award className="h-4 w-4 text-orange-600" />
              <span className="text-orange-800 font-medium">8 Years of Trusted Service</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
              Find Your Dream
              <span className="block text-orange-600">Home in Kenya</span>
            </h1>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
              Discover thousands of properties, jobs, and businesses across Kenya.
              Your trusted marketplace for real estate and career opportunities.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-lg p-2 md:p-3 border border-gray-100">
              <div className="flex flex-col md:flex-row gap-2">
                {/* Location Input */}
                <div className="flex items-center gap-2 flex-1 bg-gray-50 rounded-lg px-4 py-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-400"
                  />
                </div>

                {/* Property Type Select */}
                <div className="flex items-center gap-2 flex-1 bg-gray-50 rounded-lg px-4 py-3">
                  <Home className="h-5 w-5 text-gray-400" />
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="bg-transparent outline-none w-full text-gray-700"
                  >
                    <option value="all">Property Type</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="land">Land</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>

                {/* Search Button */}
                <Button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-6 rounded-lg font-semibold flex items-center gap-2 whitespace-nowrap"
                >
                  <Search className="h-5 w-5" />
                  <span className="hidden md:inline">Search</span>
                </Button>
              </div>
            </form>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 md:gap-4">
              <Button
                className="bg-green-600 hover:bg-green-700 text-white px-6 md:px-8 py-6 text-base font-semibold rounded-lg shadow-md"
                asChild
              >
                <Link href="/properties/rent">Browse Rentals</Link>
              </Button>
              <Button
                variant="outline"
                className="border-2 border-gray-300 hover:bg-gray-100 px-6 md:px-8 py-6 text-base font-semibold rounded-lg"
                asChild
              >
                <Link href="/properties">View All Properties</Link>
              </Button>
            </div>

            {/* Small Links */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <Link href="/jobs-in-kenya" className="hover:text-green-600 transition-colors flex items-center gap-1">
                <span>Browse Jobs</span>
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/business-directory" className="hover:text-green-600 transition-colors flex items-center gap-1">
                <span>Business Directory</span>
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/add-listing" className="hover:text-green-600 transition-colors flex items-center gap-1">
                <span>List Property</span>
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN - Image with Gradient & Floating Cards */}
          <div className="relative lg:h-[600px] h-[500px] hidden lg:block">

            {/* Rotated Gradient Background */}
            <div
              className="absolute inset-0 rounded-3xl overflow-hidden"
              style={{
                transform: 'rotate(-4deg)',
                transformOrigin: 'center',
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-[#FFD7C2] via-[#FFEADE] to-[#FFF1EB] opacity-40"></div>
            </div>

            {/* Main Property Image */}
            <div className="relative z-10 w-[85%] h-[70%] mx-auto mt-12 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/newkenyan-houses-for-sale-in-kenya.webp"
                alt="Houses for sale in Kenya"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Floating Card - Top Right (Total Properties) */}
            <div className="absolute top-8 right-0 bg-white rounded-xl shadow-xl p-4 z-20 border border-gray-100 hover:shadow-2xl transition-shadow">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 rounded-lg p-3">
                  <Home className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">1,200+</div>
                  <div className="text-sm text-gray-600">Properties</div>
                </div>
              </div>
            </div>

            {/* Floating Card - Mid Right (Happy Customers) */}
            <div className="absolute top-[45%] right-[-20px] bg-white rounded-xl shadow-xl p-4 z-20 border border-gray-100 hover:shadow-2xl transition-shadow">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 rounded-lg p-3">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">5,000+</div>
                  <div className="text-sm text-gray-600">Happy Clients</div>
                </div>
              </div>
            </div>

            {/* Floating Card - Bottom Left (Success Rate) */}
            <div className="absolute bottom-16 left-0 bg-white rounded-xl shadow-xl p-4 z-20 border border-gray-100 hover:shadow-2xl transition-shadow">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 rounded-lg p-3">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">98%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
