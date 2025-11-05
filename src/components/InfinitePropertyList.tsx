'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { useInfiniteProperties } from '@/hooks/useInfiniteProperties';
import PropertyCard from '@/components/PropertyCard';
import PropertyFiltersComponent, { PropertyFilters } from '@/components/PropertyFilters';
import { Loader2 } from 'lucide-react';

interface Property {
  id: string;
  property_title: string;
  property_type: string;
  price: number;
  price_type: string;
  bedrooms: number | null;
  bathrooms: number | null;
  square_feet: number | null;
  city: string;
  county: string | null;
  images: string[];
  amenities: string[];
  contact_phone: string;
  whatsapp_number: string | null;
  address: string;
  is_featured: boolean;
  created_at: string;
}

interface InfinitePropertyListProps {
  initialProperties: Property[];
  location?: {
    type: 'county' | 'neighborhood' | 'estate';
    name: string;
    county: string;
    city?: string;
  };
  propertyType?: 'house' | 'apartment';
  transactionType?: 'sale' | 'rent';
  enableFilters?: boolean;
}

export default function InfinitePropertyList({
  initialProperties,
  location,
  propertyType,
  transactionType,
  enableFilters = true
}: InfinitePropertyListProps) {
  const [filters, setFilters] = useState<PropertyFilters>({});

  const {
    properties,
    loading,
    hasMore,
    loadMore
  } = useInfiniteProperties({
    initialProperties,
    location,
    propertyType,
    transactionType,
    filters
  });

  // Intersection Observer for infinite scroll
  const observerTarget = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [target] = entries;
    if (target.isIntersecting && hasMore && !loading) {
      loadMore();
    }
  }, [hasMore, loading, loadMore]);

  useEffect(() => {
    const element = observerTarget.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '100px', // Start loading 100px before reaching the bottom
      threshold: 0.1
    });

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [handleObserver]);

  // Calculate filter options from initial properties
  const availableBedrooms = Array.from(
    new Set(
      initialProperties
        .map(p => p.bedrooms)
        .filter((b): b is number => b !== null)
    )
  ).sort((a, b) => a - b);

  const availableAmenities = Array.from(
    new Set(
      initialProperties.flatMap(p => p.amenities || [])
    )
  ).sort();

  const prices = initialProperties.map(p => p.price);
  const priceRange = {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };

  return (
    <>
      {/* Filters */}
      {enableFilters && initialProperties.length > 0 && (
        <PropertyFiltersComponent
          onFiltersChange={setFilters}
          availableBedrooms={availableBedrooms}
          availableAmenities={availableAmenities}
          priceRange={priceRange}
        />
      )}

      {/* Properties Grid */}
      {properties.length > 0 ? (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
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
                location={`${property.city}${property.county ? `, ${property.county}` : ''}`}
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

          {/* Loading indicator */}
          {loading && (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-green-600" />
            </div>
          )}

          {/* Intersection observer target */}
          <div ref={observerTarget} className="h-10" />

          {/* End of results message */}
          {!hasMore && properties.length > 0 && (
            <div className="text-center py-8 text-gray-600">
              <p className="text-sm">You've reached the end of the listings</p>
              <p className="text-xs mt-1">Showing all {properties.length} properties</p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">
            {Object.keys(filters).length > 0
              ? 'No properties match your filters. Try adjusting your search criteria.'
              : 'No properties found.'}
          </p>
        </div>
      )}
    </>
  );
}
