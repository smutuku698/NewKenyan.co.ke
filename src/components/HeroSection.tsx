'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, MapPin, Home, TrendingUp, Users, Award, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Location suggestions for autocomplete
const locationSuggestions = [
  'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Kitale',
  'Malindi', 'Garissa', 'Kakamega', 'Machakos', 'Meru', 'Nyeri', 'Kericho',
  'Westlands', 'Kilimani', 'Karen', 'Lavington', 'Kileleshwa', 'Parklands'
];

// Property type options
const propertyTypes = [
  { value: 'all', label: 'All Property Types' },
  { value: 'House', label: 'Houses' },
  { value: 'Apartment', label: 'Apartments' },
  { value: 'Land', label: 'Land' },
  { value: 'Commercial', label: 'Commercial Property' },
  { value: 'Bedsitter', label: 'Bedsitters' },
  { value: 'Maisonette', label: 'Maisonettes' },
  { value: 'Bungalow', label: 'Bungalows' },
  { value: 'Townhouse', label: 'Townhouses' },
  { value: 'Villa', label: 'Villas' }
];

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [location, setLocation] = useState('');
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);

  const handleLocationChange = (value: string) => {
    setLocation(value);
    if (value.length > 0) {
      const filtered = locationSuggestions.filter(loc =>
        loc.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredLocations(filtered);
      setShowLocationSuggestions(true);
    } else {
      setShowLocationSuggestions(false);
    }
  };

  const selectLocation = (loc: string) => {
    setLocation(loc);
    setShowLocationSuggestions(false);
  };

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
      <div className="container mx-auto px-4 py-6 md:py-10">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">

          {/* LEFT COLUMN - Text & Search */}
          <div className="space-y-4 lg:space-y-5 z-10">
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-2 text-sm">
              <Award className="h-4 w-4 text-orange-600" />
              <span className="text-orange-800 font-medium">8 Years of Trusted Service</span>
            </div>

            {/* Main Heading - Improved mobile size */}
            <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
              Find Houses for Rent in Nairobi
              <span className="block text-orange-600">& Properties for Sale in Kenya</span>
            </h1>

            {/* Subtext - Improved mobile size */}
            <p className="text-lg md:text-lg text-gray-600 leading-relaxed max-w-xl">
              Browse 6,500+ apartments for rent, houses for sale, bedsitters, land, jobs, and businesses across Kenya. Affordable listings from KES 5,000/month.
            </p>

            {/* Search Bar with Autocomplete */}
            <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-lg p-2 md:p-3 border border-gray-100">
              <div className="flex flex-col md:flex-row gap-2">
                {/* Location Input with Autocomplete */}
                <div className="relative flex-1">
                  <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter location"
                      value={location}
                      onChange={(e) => handleLocationChange(e.target.value)}
                      onFocus={() => location && setShowLocationSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
                      className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-400"
                      list="locations"
                    />
                  </div>
                  {/* Location Suggestions Dropdown */}
                  {showLocationSuggestions && filteredLocations.length > 0 && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      {filteredLocations.map((loc, idx) => (
                        <div
                          key={idx}
                          onClick={() => selectLocation(loc)}
                          className="px-4 py-2 hover:bg-orange-50 cursor-pointer text-gray-700 text-sm"
                        >
                          {loc}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Property Type Select */}
                <div className="flex items-center gap-2 flex-1 bg-gray-50 rounded-lg px-4 py-3">
                  <Home className="h-5 w-5 text-gray-400" />
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="bg-transparent outline-none w-full text-gray-700"
                  >
                    {propertyTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Search Button */}
                <Button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 whitespace-nowrap"
                >
                  <Search className="h-5 w-5" />
                  <span className="hidden md:inline">Search</span>
                </Button>
              </div>
            </form>

            {/* Action Buttons - Changed to orange/brown */}
            <div className="flex flex-wrap gap-3 md:gap-4">
              <Button
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 md:px-8 py-3 text-base font-semibold rounded-lg shadow-md"
                asChild
              >
                <Link href="/properties/rent">Browse Rentals</Link>
              </Button>
              <Button
                variant="outline"
                className="border-2 border-orange-600 text-orange-600 hover:bg-orange-50 px-6 md:px-8 py-3 text-base font-semibold rounded-lg"
                asChild
              >
                <Link href="/properties">View All Properties</Link>
              </Button>
            </div>

            {/* Construction Cost Calculator Button */}
            <div className="mt-2">
              <Button
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 md:px-8 py-3 text-base font-semibold rounded-lg shadow-lg flex items-center gap-2"
                asChild
              >
                <Link href="https://newkenyan.com/construction-cost-calculator-kenya/" target="_blank" rel="noopener noreferrer">
                  <Calculator className="h-5 w-5" />
                  Construction Cost Calculator
                </Link>
              </Button>
              <p className="text-sm text-gray-600 mt-2 ml-1">
                See the cost of any house you have in mind right now!!
              </p>
            </div>

            {/* Small Links - Improved mobile layout */}
            <div className="flex flex-wrap items-center justify-start gap-3 md:gap-4 text-base md:text-sm text-gray-600">
              <Link href="/jobs-in-kenya" className="hover:text-orange-600 transition-colors flex items-center gap-1 font-medium">
                <span>Browse Jobs</span>
              </Link>
              <span className="text-gray-300 hidden md:inline">•</span>
              <Link href="/real-estate-companies-in-kenya" className="hover:text-orange-600 transition-colors flex items-center gap-1 font-medium text-center md:text-left">
                <span className="whitespace-nowrap md:whitespace-normal">
                  R/Estate Agencies<span className="hidden md:inline"> in KE</span>
                  <span className="block md:hidden text-sm">in Kenya</span>
                </span>
              </Link>
              <span className="text-gray-300 hidden md:inline">•</span>
              <Link href="/add-listing" className="hover:text-orange-600 transition-colors flex items-center gap-1 font-medium">
                <span>List Property</span>
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN - Image with Gradient & Floating Cards - Reduced height */}
          <div className="relative lg:h-[450px] h-[400px] hidden lg:block">

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
            <div className="relative z-10 w-[85%] h-[75%] mx-auto mt-8 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/newkenyan-houses-for-sale-in-kenya.webp"
                alt="Houses for sale in Kenya"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Floating Card - Top Right (Total Properties) */}
            <div className="absolute top-6 right-0 bg-white rounded-xl shadow-xl p-3 z-20 border border-gray-100 hover:shadow-2xl transition-shadow">
              <div className="flex items-center gap-2">
                <div className="bg-purple-100 rounded-lg p-2">
                  <Home className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900">1,200+</div>
                  <div className="text-xs text-gray-600">Properties</div>
                </div>
              </div>
            </div>

            {/* Floating Card - Mid Right (Happy Customers) */}
            <div className="absolute top-[45%] right-[-20px] bg-white rounded-xl shadow-xl p-3 z-20 border border-gray-100 hover:shadow-2xl transition-shadow">
              <div className="flex items-center gap-2">
                <div className="bg-orange-100 rounded-lg p-2">
                  <Users className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900">5,000+</div>
                  <div className="text-xs text-gray-600">Happy Clients</div>
                </div>
              </div>
            </div>

            {/* Floating Card - Bottom Left (Success Rate) */}
            <div className="absolute bottom-12 left-0 bg-white rounded-xl shadow-xl p-3 z-20 border border-gray-100 hover:shadow-2xl transition-shadow">
              <div className="flex items-center gap-2">
                <div className="bg-green-100 rounded-lg p-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900">98%</div>
                  <div className="text-xs text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
