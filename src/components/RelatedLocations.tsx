'use client';

import Link from 'next/link';
import { generatePropertyTypeUrl } from '@/lib/property-types';

interface Location {
  name: string;
  slug: string;
  type: 'county' | 'neighborhood' | 'estate';
  county?: string;
  city?: string;
}

interface RelatedLocationsProps {
  currentLocation: Location;
  relatedLocations: Location[]; // Neighborhoods and estates in same area
  propertyType: string;
  transactionType: 'sale' | 'rent';
  className?: string;
}

export default function RelatedLocations({
  currentLocation,
  relatedLocations,
  propertyType,
  transactionType,
  className = ''
}: RelatedLocationsProps) {
  // Separate by location type
  const neighborhoods = relatedLocations.filter(loc => loc.type === 'neighborhood');
  const estates = relatedLocations.filter(loc => loc.type === 'estate');
  const counties = relatedLocations.filter(loc => loc.type === 'county');

  // Filter out current location
  const filteredNeighborhoods = neighborhoods.filter(loc => loc.slug !== currentLocation.slug);
  const filteredEstates = estates.filter(loc => loc.slug !== currentLocation.slug);

  if (filteredNeighborhoods.length === 0 && filteredEstates.length === 0 && counties.length === 0) {
    return null;
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border p-6 ${className}`}>
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        {currentLocation.type === 'county'
          ? `Popular Areas in ${currentLocation.name}`
          : `Nearby Locations to ${currentLocation.name}`
        }
      </h2>

      {/* Neighborhoods */}
      {filteredNeighborhoods.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Neighborhoods
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredNeighborhoods.slice(0, 12).map((location) => (
              <Link
                key={location.slug}
                href={generatePropertyTypeUrl(propertyType, transactionType, location.slug)}
                className="group px-4 py-3 bg-gray-50 hover:bg-green-50 border border-gray-200 hover:border-green-400 rounded-lg transition-all text-sm"
                title={`View properties in ${location.name}`}
              >
                <div className="font-medium text-gray-900 group-hover:text-green-700">
                  {location.name}
                </div>
                {location.city && (
                  <div className="text-xs text-gray-500 mt-1">{location.city}</div>
                )}
              </Link>
            ))}
          </div>
          {filteredNeighborhoods.length > 12 && (
            <button className="mt-3 text-sm text-green-600 hover:text-green-700 font-medium">
              View all {filteredNeighborhoods.length} neighborhoods →
            </button>
          )}
        </div>
      )}

      {/* Estates & Gated Communities */}
      {filteredEstates.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Estates & Gated Communities
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredEstates.slice(0, 12).map((location) => (
              <Link
                key={location.slug}
                href={generatePropertyTypeUrl(propertyType, transactionType, location.slug)}
                className="group px-4 py-3 bg-gray-50 hover:bg-green-50 border border-gray-200 hover:border-green-400 rounded-lg transition-all text-sm"
                title={`View properties in ${location.name}`}
              >
                <div className="font-medium text-gray-900 group-hover:text-green-700">
                  {location.name}
                </div>
                {location.city && (
                  <div className="text-xs text-gray-500 mt-1">{location.city}</div>
                )}
              </Link>
            ))}
          </div>
          {filteredEstates.length > 12 && (
            <button className="mt-3 text-sm text-green-600 hover:text-green-700 font-medium">
              View all {filteredEstates.length} estates →
            </button>
          )}
        </div>
      )}

      {/* View County Page Link */}
      {currentLocation.type !== 'county' && currentLocation.county && (
        <div className="pt-4 border-t border-gray-200">
          <Link
            href={generatePropertyTypeUrl(
              propertyType,
              transactionType,
              `${currentLocation.county.toLowerCase().replace(/\s+/g, '-')}-county`
            )}
            className="inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            View all properties in {currentLocation.county} County
          </Link>
        </div>
      )}

      {/* SEO-friendly text */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-600">
          Explore properties in {currentLocation.name} and nearby locations.
          Each area offers unique features, amenities, and lifestyle options.
        </p>
      </div>
    </div>
  );
}
