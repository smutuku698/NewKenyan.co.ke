'use client';

import Link from 'next/link';
import { MapPin, Building2, Home } from 'lucide-react';
import { useState } from 'react';

interface Location {
  name: string;
  slug: string;
  type: 'county' | 'neighborhood' | 'estate';
  county: string;
  city?: string;
}

interface LocationDirectoryProps {
  locations: Location[];
  currentLocationSlug?: string;
  propertyType?: 'houses' | 'apartments';
  transactionType?: 'sale' | 'rent';
  className?: string;
}

export default function LocationDirectory({
  locations,
  currentLocationSlug,
  propertyType = 'houses',
  transactionType = 'sale',
  className = ''
}: LocationDirectoryProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'counties' | 'nairobi' | 'mombasa'>('all');

  // Group locations
  const counties = locations.filter(l => l.type === 'county');
  const nairobiareas = locations.filter(l =>
    (l.type === 'neighborhood' || l.type === 'estate') && l.county === 'Nairobi'
  );
  const mombasaAreas = locations.filter(l =>
    (l.type === 'neighborhood' || l.type === 'estate') && l.county === 'Mombasa'
  );

  const getFilteredLocations = () => {
    switch (activeTab) {
      case 'counties':
        return counties;
      case 'nairobi':
        return nairobiareas;
      case 'mombasa':
        return mombasaAreas;
      default:
        return locations;
    }
  };

  const filteredLocations = getFilteredLocations().filter(l => l.slug !== currentLocationSlug);

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'county':
        return <MapPin className="h-4 w-4" />;
      case 'estate':
        return <Building2 className="h-4 w-4" />;
      default:
        return <Home className="h-4 w-4" />;
    }
  };

  const getLocationUrl = (slug: string) => {
    return `/${propertyType}-for-${transactionType}/${slug}`;
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border p-6 ${className}`}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Browse {propertyType === 'houses' ? 'Houses' : 'Apartments'} by Location
      </h2>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b pb-4">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'all'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Locations ({locations.length})
        </button>
        <button
          onClick={() => setActiveTab('counties')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'counties'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Counties ({counties.length})
        </button>
        <button
          onClick={() => setActiveTab('nairobi')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'nairobi'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Nairobi Areas ({nairobiareas.length})
        </button>
        <button
          onClick={() => setActiveTab('mombasa')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'mombasa'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Mombasa Areas ({mombasaAreas.length})
        </button>
      </div>

      {/* Location Links Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {filteredLocations.map((location) => (
          <Link
            key={location.slug}
            href={getLocationUrl(location.slug)}
            className="group flex items-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all"
          >
            <span className="text-green-600 group-hover:text-green-700">
              {getLocationIcon(location.type)}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 group-hover:text-green-700 truncate">
                {location.name}
              </p>
              {location.type !== 'county' && location.city && (
                <p className="text-xs text-gray-500">{location.city}</p>
              )}
            </div>
          </Link>
        ))}
      </div>

      {filteredLocations.length === 0 && (
        <p className="text-center text-gray-500 py-8">
          No other locations available
        </p>
      )}

      {/* Quick Links Section */}
      <div className="mt-8 pt-6 border-t">
        <h3 className="font-semibold text-gray-900 mb-4">Popular Property Searches</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <Link href="/houses-for-sale/nairobi-county" className="text-green-600 hover:text-green-700 hover:underline">
            Houses for Sale in Nairobi
          </Link>
          <Link href="/apartments-for-rent/nairobi-county" className="text-green-600 hover:text-green-700 hover:underline">
            Apartments for Rent in Nairobi
          </Link>
          <Link href="/houses-for-sale/mombasa-county" className="text-green-600 hover:text-green-700 hover:underline">
            Houses for Sale in Mombasa
          </Link>
          <Link href="/apartments-for-sale/nairobi-county" className="text-green-600 hover:text-green-700 hover:underline">
            Apartments for Sale in Nairobi
          </Link>
          <Link href="/houses-for-rent/kiambu-county" className="text-green-600 hover:text-green-700 hover:underline">
            Houses for Rent in Kiambu
          </Link>
          <Link href="/apartments-for-rent/mombasa-county" className="text-green-600 hover:text-green-700 hover:underline">
            Apartments for Rent in Mombasa
          </Link>
        </div>
      </div>
    </div>
  );
}
