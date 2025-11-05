'use client';

import { useState } from 'react';
import { Sliders, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface PropertyFilters {
  bedrooms?: number[];
  minPrice?: number;
  maxPrice?: number;
  amenities?: string[];
}

interface PropertyFiltersProps {
  onFiltersChange: (filters: PropertyFilters) => void;
  availableBedrooms: number[];
  availableAmenities: string[];
  priceRange: { min: number; max: number };
}

export default function PropertyFiltersComponent({
  onFiltersChange,
  availableBedrooms,
  availableAmenities,
  priceRange
}: PropertyFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBedrooms, setSelectedBedrooms] = useState<number[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();

  const handleBedroomToggle = (bedroom: number) => {
    const newBedrooms = selectedBedrooms.includes(bedroom)
      ? selectedBedrooms.filter(b => b !== bedroom)
      : [...selectedBedrooms, bedroom];

    setSelectedBedrooms(newBedrooms);
    applyFilters(newBedrooms, selectedAmenities, minPrice, maxPrice);
  };

  const handleAmenityToggle = (amenity: string) => {
    const newAmenities = selectedAmenities.includes(amenity)
      ? selectedAmenities.filter(a => a !== amenity)
      : [...selectedAmenities, amenity];

    setSelectedAmenities(newAmenities);
    applyFilters(selectedBedrooms, newAmenities, minPrice, maxPrice);
  };

  const handlePriceChange = (min?: number, max?: number) => {
    setMinPrice(min);
    setMaxPrice(max);
    applyFilters(selectedBedrooms, selectedAmenities, min, max);
  };

  const applyFilters = (
    bedrooms: number[],
    amenities: string[],
    min?: number,
    max?: number
  ) => {
    onFiltersChange({
      bedrooms: bedrooms.length > 0 ? bedrooms : undefined,
      amenities: amenities.length > 0 ? amenities : undefined,
      minPrice: min,
      maxPrice: max
    });
  };

  const clearFilters = () => {
    setSelectedBedrooms([]);
    setSelectedAmenities([]);
    setMinPrice(undefined);
    setMaxPrice(undefined);
    onFiltersChange({});
  };

  const hasActiveFilters = selectedBedrooms.length > 0 ||
    selectedAmenities.length > 0 ||
    minPrice !== undefined ||
    maxPrice !== undefined;

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `${(price / 1000).toFixed(0)}K`;
    }
    return price.toString();
  };

  return (
    <div className="mb-6">
      {/* Filter Toggle Button */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Sliders className="h-4 w-4" />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="ml-1 bg-green-700 text-white text-xs px-2 py-0.5 rounded-full">
              {(selectedBedrooms.length + selectedAmenities.length +
                (minPrice ? 1 : 0) + (maxPrice ? 1 : 0))}
            </span>
          )}
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
          {/* Bedrooms Filter */}
          {availableBedrooms.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Bedrooms</h3>
              <div className="flex flex-wrap gap-2">
                {availableBedrooms.map(bedroom => (
                  <button
                    key={bedroom}
                    onClick={() => handleBedroomToggle(bedroom)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                      selectedBedrooms.includes(bedroom)
                        ? 'bg-green-700 text-white border-green-700'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-green-700'
                    }`}
                  >
                    {bedroom} {bedroom === 1 ? 'Bedroom' : 'Bedrooms'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price Range Filter */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Price Range</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Min Price (KES)</label>
                <input
                  type="number"
                  placeholder={`${formatPrice(priceRange.min)}`}
                  value={minPrice || ''}
                  onChange={(e) => handlePriceChange(
                    e.target.value ? parseInt(e.target.value) : undefined,
                    maxPrice
                  )}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Max Price (KES)</label>
                <input
                  type="number"
                  placeholder={`${formatPrice(priceRange.max)}`}
                  value={maxPrice || ''}
                  onChange={(e) => handlePriceChange(
                    minPrice,
                    e.target.value ? parseInt(e.target.value) : undefined
                  )}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Range: KES {formatPrice(priceRange.min)} - KES {formatPrice(priceRange.max)}
            </div>
          </div>

          {/* Amenities Filter */}
          {availableAmenities.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {availableAmenities.slice(0, 12).map(amenity => (
                  <button
                    key={amenity}
                    onClick={() => handleAmenityToggle(amenity)}
                    className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-colors ${
                      selectedAmenities.includes(amenity)
                        ? 'bg-green-700 text-white border-green-700'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-green-700'
                    }`}
                  >
                    {amenity}
                    {selectedAmenities.includes(amenity) && (
                      <X className="inline-block ml-1 h-3 w-3" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">
                  Active Filters: {(selectedBedrooms.length + selectedAmenities.length +
                    (minPrice ? 1 : 0) + (maxPrice ? 1 : 0))}
                </span>
                <Button
                  variant="link"
                  onClick={clearFilters}
                  className="text-sm text-green-600 hover:text-green-700 p-0"
                >
                  Clear All
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
