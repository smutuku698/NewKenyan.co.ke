'use client';

import { useState, useMemo } from 'react';
import RealEstateCompanyCard from './RealEstateCompanyCard';
import {
  Search,
  Filter,
  MapPin,
  Star,
  Building2,
  SlidersHorizontal,
  X,
  TrendingUp,
  Award
} from 'lucide-react';

interface RealEstateCompany {
  id: string;
  slug: string;
  name: string;
  type: string;
  description: string;
  rating: number;
  reviewCount: number;
  address: string;
  city: string;
  phone: string;
  website: string;
  googleMapsLink: string;
  coordinates: {
    latitude: number;
    longitude: number;
  } | null;
  hours: string;
  openingTime: string;
  services: string[];
  specializations: string[];
  verified: boolean;
  featured: boolean;
  features: {
    virtualTours: boolean;
    onlineBooking: boolean;
    customerSupport: boolean;
    propertyManagement: boolean;
    financing: boolean;
    legalSupport: boolean;
  };
}

interface Props {
  companies: RealEstateCompany[];
}

export default function RealEstateCompanyListing({ companies }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'name'>('rating');

  // Extract unique cities and types
  const cities = useMemo(() => {
    const citySet = new Set(companies.map(c => c.city));
    return Array.from(citySet).sort();
  }, [companies]);

  const types = useMemo(() => {
    const typeSet = new Set(companies.map(c => c.type));
    return Array.from(typeSet).sort();
  }, [companies]);

  // Filter and sort companies
  const filteredCompanies = useMemo(() => {
    let filtered = companies;

    // Search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        company =>
          company.name.toLowerCase().includes(search) ||
          company.description.toLowerCase().includes(search) ||
          company.address.toLowerCase().includes(search) ||
          company.services.some(s => s.toLowerCase().includes(search))
      );
    }

    // City filter
    if (selectedCity !== 'all') {
      filtered = filtered.filter(company => company.city === selectedCity);
    }

    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(company => company.type === selectedType);
    }

    // Rating filter
    if (minRating > 0) {
      filtered = filtered.filter(company => company.rating >= minRating);
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'rating') {
        if (b.rating !== a.rating) return b.rating - a.rating;
        return b.reviewCount - a.reviewCount;
      } else if (sortBy === 'reviews') {
        return b.reviewCount - a.reviewCount;
      } else {
        return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [companies, searchTerm, selectedCity, selectedType, minRating, sortBy]);

  // Statistics
  const stats = useMemo(() => {
    return {
      total: companies.length,
      verified: companies.filter(c => c.verified).length,
      featured: companies.filter(c => c.featured).length,
      avgRating: (companies.reduce((sum, c) => sum + c.rating, 0) / companies.length).toFixed(1)
    };
  }, [companies]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCity('all');
    setSelectedType('all');
    setMinRating(0);
  };

  const activeFiltersCount = [
    searchTerm !== '',
    selectedCity !== 'all',
    selectedType !== 'all',
    minRating > 0
  ].filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Statistics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border-2 border-blue-200">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-gray-600">Total Companies</span>
            <Building2 className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border-2 border-green-200">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-gray-600">Verified</span>
            <Star className="h-5 w-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600">{stats.verified}</div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 border-2 border-yellow-200">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-gray-600">Top Rated</span>
            <Award className="h-5 w-5 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-yellow-600">{stats.featured}</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border-2 border-purple-200">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-gray-600">Avg Rating</span>
            <TrendingUp className="h-5 w-5 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-purple-600">{stats.avgRating} ⭐</div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-md p-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search companies by name, services, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Filter Toggle Button */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-semibold transition-colors"
          >
            <SlidersHorizontal className="h-5 w-5" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="border-2 border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
            >
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviews</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Expandable Filters */}
        {showFilters && (
          <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-gray-200 animate-in fade-in slide-in-from-top-2 duration-300">
            {/* City Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                City
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none"
              >
                <option value="all">All Cities</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Company Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none"
              >
                <option value="all">All Types</option>
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Star className="h-4 w-4" />
                Minimum Rating
              </label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none"
              >
                <option value="0">All Ratings</option>
                <option value="3">3+ Stars</option>
                <option value="4">4+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="5">5 Stars Only</option>
              </select>
            </div>
          </div>
        )}

        {/* Clear Filters */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center justify-between pt-2 border-t border-gray-200">
            <span className="text-sm text-gray-600">
              Showing {filteredCompanies.length} of {companies.length} companies
            </span>
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-semibold transition-colors"
            >
              <X className="h-4 w-4" />
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {filteredCompanies.length === companies.length
            ? `All Real Estate Companies (${companies.length})`
            : `Found ${filteredCompanies.length} Companies`}
        </h2>
      </div>

      {/* Company Cards */}
      {filteredCompanies.length > 0 ? (
        <div className="grid gap-6">
          {filteredCompanies.map((company, index) => (
            <RealEstateCompanyCard
              key={company.id}
              company={company}
              index={index + 1}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Companies Found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your filters or search terms to find more results.
          </p>
          <button
            onClick={clearFilters}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
