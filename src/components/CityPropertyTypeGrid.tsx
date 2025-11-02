'use client';

import Link from 'next/link';
import { RESIDENTIAL_PROPERTY_TYPES, COMMERCIAL_PROPERTY_TYPES, PROPERTY_TYPES } from '@/lib/property-types';

interface CityPropertyTypeGridProps {
  cityName: string;
  citySlug: string;
  className?: string;
}

export default function CityPropertyTypeGrid({ cityName, citySlug, className = '' }: CityPropertyTypeGridProps) {
  const countySlug = `${citySlug}-county`;

  // Property type colors and icons
  const propertyIcons: Record<string, string> = {
    'houses': '🏠',
    'apartments': '🏢',
    'studio-apartments': '🏠',
    'bungalows': '🏡',
    'maisonettes': '🏘️',
    'townhouses': '🏘️',
    'villas': '🏰',
    'bedsitters': '🚪',
    'serviced-apartments': '🏨',
    'commercial-properties': '🏬',
    'office-space': '🏢',
    'shops': '🏪',
    'warehouses': '🏭',
    'land': '🌍',
  };

  const colors = [
    'from-blue-50 to-blue-100 border-blue-200 hover:from-blue-100 hover:to-blue-200 group-hover:text-blue-700',
    'from-green-50 to-green-100 border-green-200 hover:from-green-100 hover:to-green-200 group-hover:text-green-700',
    'from-purple-50 to-purple-100 border-purple-200 hover:from-purple-100 hover:to-purple-200 group-hover:text-purple-700',
    'from-pink-50 to-pink-100 border-pink-200 hover:from-pink-100 hover:to-pink-200 group-hover:text-pink-700',
    'from-yellow-50 to-yellow-100 border-yellow-200 hover:from-yellow-100 hover:to-yellow-200 group-hover:text-yellow-700',
    'from-orange-50 to-orange-100 border-orange-200 hover:from-orange-100 hover:to-orange-200 group-hover:text-orange-700',
    'from-red-50 to-red-100 border-red-200 hover:from-red-100 hover:to-red-200 group-hover:text-red-700',
    'from-indigo-50 to-indigo-100 border-indigo-200 hover:from-indigo-100 hover:to-indigo-200 group-hover:text-indigo-700',
  ];

  return (
    <div className={className}>
      {/* Residential Properties */}
      <section className="mb-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Residential Properties in {cityName}</h2>
          <p className="text-gray-600">Browse homes, apartments, and residential properties</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {RESIDENTIAL_PROPERTY_TYPES.map((propertyType, index) => {
            const colorClass = colors[index % colors.length];
            const icon = propertyIcons[propertyType.slug] || '🏠';

            return (
              <div key={propertyType.slug}>
                {/* For Sale */}
                {propertyType.transactionTypes.includes('sale') && (
                  <Link
                    href={`/${propertyType.slug}-for-sale/${countySlug}`}
                    className={`group bg-gradient-to-br ${colorClass} p-5 rounded-lg border-2 transition-all block mb-3`}
                  >
                    <div className="text-3xl mb-2">{icon}</div>
                    <div className="font-bold text-base text-gray-900">{propertyType.pluralName}</div>
                    <div className="text-sm text-gray-600 mt-1">For Sale</div>
                    {propertyType.avgYield && (
                      <div className="text-xs text-green-600 mt-1 font-semibold">
                        {propertyType.avgYield}% avg yield
                      </div>
                    )}
                  </Link>
                )}

                {/* For Rent */}
                {propertyType.transactionTypes.includes('rent') && (
                  <Link
                    href={`/${propertyType.slug}-for-rent/${countySlug}`}
                    className={`group bg-gradient-to-br ${colorClass} p-5 rounded-lg border-2 transition-all block`}
                  >
                    <div className="text-3xl mb-2">{icon}</div>
                    <div className="font-bold text-base text-gray-900">{propertyType.pluralName}</div>
                    <div className="text-sm text-gray-600 mt-1">For Rent</div>
                    {propertyType.avgYield && (
                      <div className="text-xs text-green-600 mt-1 font-semibold">
                        {propertyType.avgYield}% avg yield
                      </div>
                    )}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Commercial Properties */}
      <section className="mb-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Commercial Properties in {cityName}</h2>
          <p className="text-gray-600">Office spaces, retail, warehouses, and business properties</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {COMMERCIAL_PROPERTY_TYPES.map((propertyType, index) => {
            const colorClass = colors[(index + 4) % colors.length];
            const icon = propertyIcons[propertyType.slug] || '🏬';

            return (
              <div key={propertyType.slug}>
                {/* For Sale */}
                {propertyType.transactionTypes.includes('sale') && (
                  <Link
                    href={`/${propertyType.slug}-for-sale/${countySlug}`}
                    className={`group bg-gradient-to-br ${colorClass} p-5 rounded-lg border-2 transition-all block mb-3`}
                  >
                    <div className="text-3xl mb-2">{icon}</div>
                    <div className="font-bold text-base text-gray-900">{propertyType.pluralName}</div>
                    <div className="text-sm text-gray-600 mt-1">For Sale</div>
                    {propertyType.avgYield && (
                      <div className="text-xs text-green-600 mt-1 font-semibold">
                        {propertyType.avgYield}% avg yield
                      </div>
                    )}
                  </Link>
                )}

                {/* For Rent */}
                {propertyType.transactionTypes.includes('rent') && (
                  <Link
                    href={`/${propertyType.slug}-for-rent/${countySlug}`}
                    className={`group bg-gradient-to-br ${colorClass} p-5 rounded-lg border-2 transition-all block`}
                  >
                    <div className="text-3xl mb-2">{icon}</div>
                    <div className="font-bold text-base text-gray-900">{propertyType.pluralName}</div>
                    <div className="text-sm text-gray-600 mt-1">For Rent</div>
                    {propertyType.avgYield && (
                      <div className="text-xs text-green-600 mt-1 font-semibold">
                        {propertyType.avgYield}% avg yield
                      </div>
                    )}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Land for Sale */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Land & Plots in {cityName}</h2>
          <p className="text-gray-600">Residential, commercial, and agricultural land</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href={`/land-for-sale/${countySlug}`}
            className="group bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 hover:from-emerald-100 hover:to-emerald-200 p-5 rounded-lg border-2 transition-all"
          >
            <div className="text-3xl mb-2">🌍</div>
            <div className="font-bold text-base text-gray-900 group-hover:text-emerald-700">Land & Plots</div>
            <div className="text-sm text-gray-600 mt-1">For Sale</div>
          </Link>
        </div>
      </section>

      {/* SEO Text */}
      <div className="mt-12 p-6 bg-gray-50 rounded-lg border">
        <p className="text-sm text-gray-600 text-center">
          Explore all property types available in {cityName}, Kenya. From residential homes and apartments
          to commercial properties and land. Find verified listings with photos, prices, and direct contact details.
        </p>
      </div>
    </div>
  );
}
