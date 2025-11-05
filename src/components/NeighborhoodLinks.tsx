'use client';

import Link from 'next/link';
import { MapPin, Building2, Home } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Location {
  name: string;
  slug: string;
  type: 'county' | 'neighborhood' | 'estate';
  county: string;
  city: string | null;
}

interface NeighborhoodLinksProps {
  county: string;
  currentCity?: string;
  propertyType?: 'house' | 'apartment';
  className?: string;
}

export default function NeighborhoodLinks({
  county,
  currentCity,
  propertyType = 'house',
  className = ''
}: NeighborhoodLinksProps) {
  const [neighborhoods, setNeighborhoods] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNeighborhoods() {
      try {
        const { data, error } = await supabase
          .from('locations')
          .select('name, slug, type, county, city')
          .eq('county', county)
          .eq('is_active', true)
          .in('type', ['neighborhood', 'estate'])
          .order('name');

        if (!error && data) {
          setNeighborhoods(data as Location[]);
        }
      } catch (error) {
        console.error('Error fetching neighborhoods:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchNeighborhoods();
  }, [county]);

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (neighborhoods.length === 0) {
    return null;
  }

  // Determine property category paths
  const getLocationUrl = (slug: string) => {
    // Default to houses-for-sale if not specified
    const category = propertyType === 'apartment' ? 'apartments' : 'houses';
    return `/${category}-for-sale/${slug}`;
  };

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'estate':
        return <Building2 className="h-4 w-4 text-green-600 flex-shrink-0" />;
      case 'neighborhood':
        return <Home className="h-4 w-4 text-blue-600 flex-shrink-0" />;
      default:
        return <MapPin className="h-4 w-4 text-gray-600 flex-shrink-0" />;
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border p-6 ${className}`}>
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="h-6 w-6 text-green-600" />
        <h3 className="text-xl font-bold text-gray-900">
          Explore More Areas in {county}
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {neighborhoods.map((location) => (
          <Link
            key={location.slug}
            href={getLocationUrl(location.slug)}
            className={`group flex items-center gap-2 p-3 rounded-lg border transition-all hover:border-green-600 hover:bg-green-50 ${
              currentCity && location.name.toLowerCase().includes(currentCity.toLowerCase())
                ? 'bg-green-50 border-green-600'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            {getLocationIcon(location.type)}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 group-hover:text-green-700 truncate">
                {location.name}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {location.type}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Popular property searches */}
      <div className="mt-6 pt-6 border-t">
        <p className="text-sm font-semibold text-gray-700 mb-3">
          Popular Searches in {county}:
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/houses-for-sale/${county.toLowerCase().replace(/\s+/g, '-')}-county`}
            className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-green-100 hover:text-green-700 transition-colors"
          >
            Houses for Sale
          </Link>
          <Link
            href={`/houses-for-rent/${county.toLowerCase().replace(/\s+/g, '-')}-county`}
            className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-green-100 hover:text-green-700 transition-colors"
          >
            Houses for Rent
          </Link>
          <Link
            href={`/apartments-for-sale/${county.toLowerCase().replace(/\s+/g, '-')}-county`}
            className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-green-100 hover:text-green-700 transition-colors"
          >
            Apartments for Sale
          </Link>
          <Link
            href={`/apartments-for-rent/${county.toLowerCase().replace(/\s+/g, '-')}-county`}
            className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-green-100 hover:text-green-700 transition-colors"
          >
            Apartments for Rent
          </Link>
        </div>
      </div>
    </div>
  );
}
