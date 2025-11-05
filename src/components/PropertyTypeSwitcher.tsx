'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  PROPERTY_TYPES,
  RESIDENTIAL_PROPERTY_TYPES,
  COMMERCIAL_PROPERTY_TYPES,
  PropertyTypeConfig,
  generatePropertyTypeUrl
} from '@/lib/property-types';

interface PropertyTypeSwitcherProps {
  currentPropertyType: string; // e.g., "houses"
  currentTransaction: 'sale' | 'rent';
  locationSlug: string;
  locationName: string;
  className?: string;
}

export default function PropertyTypeSwitcher({
  currentPropertyType,
  currentTransaction,
  locationSlug,
  locationName,
  className = ''
}: PropertyTypeSwitcherProps) {
  // Separate residential and commercial types
  const residentialTypes = RESIDENTIAL_PROPERTY_TYPES.filter(type =>
    type.transactionTypes.includes(currentTransaction)
  );

  const commercialTypes = COMMERCIAL_PROPERTY_TYPES.filter(type =>
    type.transactionTypes.includes(currentTransaction)
  );

  // Land (only for sale)
  const landType = currentTransaction === 'sale' ? PROPERTY_TYPES.land : null;

  const renderPropertyTypeLink = (propertyType: PropertyTypeConfig) => {
    const isActive = propertyType.slug === currentPropertyType;
    const url = generatePropertyTypeUrl(propertyType.slug, currentTransaction, locationSlug);

    return (
      <Link
        key={propertyType.slug}
        href={url}
        className={`
          px-4 py-2 rounded-lg border transition-all text-sm font-medium
          ${isActive
            ? 'bg-green-600 text-white border-green-600 shadow-md'
            : 'bg-white text-gray-700 border-gray-300 hover:border-green-500 hover:bg-green-50'
          }
        `}
        title={`View ${propertyType.pluralName} for ${currentTransaction} in ${locationName}`}
      >
        {propertyType.pluralName}
      </Link>
    );
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border p-6 ${className}`}>
      {/* Transaction Type Toggle */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b">
        <h3 className="text-lg font-semibold text-gray-900">Browse Property Types in {locationName}</h3>
        <div className="flex gap-2">
          <Link
            href={generatePropertyTypeUrl(currentPropertyType, 'sale', locationSlug)}
            className={`
              px-4 py-2 rounded-lg font-medium text-sm transition-all
              ${currentTransaction === 'sale'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            For Sale
          </Link>
          <Link
            href={generatePropertyTypeUrl(currentPropertyType, 'rent', locationSlug)}
            className={`
              px-4 py-2 rounded-lg font-medium text-sm transition-all
              ${currentTransaction === 'rent'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            For Rent
          </Link>
        </div>
      </div>

      {/* Residential Properties */}
      {residentialTypes.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            Residential Properties
          </h4>
          <div className="flex flex-wrap gap-2">
            {residentialTypes.map(renderPropertyTypeLink)}
          </div>
        </div>
      )}

      {/* Commercial Properties */}
      {commercialTypes.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            Commercial Properties
          </h4>
          <div className="flex flex-wrap gap-2">
            {commercialTypes.map(renderPropertyTypeLink)}
          </div>
        </div>
      )}

      {/* Land (only for sale) */}
      {landType && (
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            Land & Plots
          </h4>
          <div className="flex flex-wrap gap-2">
            {renderPropertyTypeLink(landType)}
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t">
        <p className="text-xs text-gray-500 text-center">
          Browse all property types available in {locationName}. Click any category to view listings.
        </p>
      </div>
    </div>
  );
}
