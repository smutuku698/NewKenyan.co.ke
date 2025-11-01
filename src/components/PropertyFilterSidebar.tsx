'use client';

import { useState } from 'react';
import { MapPin, Home, DollarSign, Bed, Bath, Square, Filter, X, ChevronDown, ChevronUp, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface FilterState {
  county?: string;
  city?: string;
  propertyType?: string;
  priceMin?: number;
  priceMax?: number;
  bedrooms?: number;
  bathrooms?: number;
  squareFeetMin?: number;
  squareFeetMax?: number;
  amenities?: string[];
  nearbyFeatures?: string[];
  externalFeatures?: string[];
  internalFeatures?: string[];
  constructionStatus?: string;
}

interface PropertyFilterSidebarProps {
  onFilterChange: (filters: FilterState) => void;
  availableCounties?: string[];
  availableCities?: string[];
  availableAmenities?: string[];
  availableConstructionStatus?: string[];
  availableNearbyFeatures?: string[];
  availableExternalFeatures?: string[];
  availableInternalFeatures?: string[];
  className?: string;
}

const PROPERTY_TYPES = ['Apartment', 'House', 'Villa', 'Townhouse', 'Studio', 'Penthouse', 'Office'];
const BEDROOM_OPTIONS = [0, 1, 2, 3, 4, 5];
const BATHROOM_OPTIONS = [1, 2, 3, 4, 5];

export default function PropertyFilterSidebar({
  onFilterChange,
  availableCounties = [],
  availableCities = [],
  availableAmenities = [],
  availableConstructionStatus = [],
  availableNearbyFeatures = [],
  availableExternalFeatures = [],
  availableInternalFeatures = [],
  className = ''
}: PropertyFilterSidebarProps) {
  const [filters, setFilters] = useState<FilterState>({});
  const [expandedSections, setExpandedSections] = useState({
    location: true,
    propertyType: true,
    price: true,
    bedsBaths: true,
    size: false,
    amenities: false,
    construction: false,
    nearbyFeatures: false,
    externalFeatures: false,
    internalFeatures: false
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    if (value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) {
      delete newFilters[key];
    }
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleAmenity = (amenity: string) => {
    const currentAmenities = filters.amenities || [];
    const newAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter(a => a !== amenity)
      : [...currentAmenities, amenity];
    updateFilter('amenities', newAmenities.length > 0 ? newAmenities : undefined);
  };

  const toggleFeature = (feature: string, type: 'nearbyFeatures' | 'externalFeatures' | 'internalFeatures') => {
    const currentFeatures = filters[type] || [];
    const newFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter(f => f !== feature)
      : [...currentFeatures, feature];
    updateFilter(type, newFeatures.length > 0 ? newFeatures : undefined);
  };

  const clearAllFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  const activeFilterCount = Object.keys(filters).reduce((count, key) => {
    const value = filters[key as keyof FilterState];
    if (Array.isArray(value)) {
      return count + value.length;
    }
    return value ? count + 1 : count;
  }, 0);

  return (
    <div className={`bg-white rounded-lg shadow-md border ${className}`}>
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-green-50 to-white">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-green-600" />
            <h2 className="text-lg font-bold text-gray-900">Filter Properties</h2>
          </div>
          {activeFilterCount > 0 && (
            <span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
          >
            <X className="h-3 w-3" />
            Clear all filters
          </button>
        )}
      </div>

      <div className="p-4 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
        {/* Location Filter */}
        <div className="border-b pb-4">
          <button
            onClick={() => toggleSection('location')}
            className="w-full flex items-center justify-between mb-3"
          >
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-green-600" />
              <span className="font-semibold text-gray-900">Location</span>
            </div>
            {expandedSections.location ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          {expandedSections.location && (
            <div className="space-y-3">
              {/* County Filter */}
              {availableCounties.length > 0 && (
                <div>
                  <label className="text-xs text-gray-600 mb-1 block">County</label>
                  <select
                    value={filters.county || ''}
                    onChange={(e) => updateFilter('county', e.target.value || undefined)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  >
                    <option value="">All Counties</option>
                    {availableCounties.map((county) => (
                      <option key={county} value={county}>
                        {county}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* City Filter */}
              {availableCities.length > 0 && (
                <div>
                  <label className="text-xs text-gray-600 mb-1 block">City / Area</label>
                  <select
                    value={filters.city || ''}
                    onChange={(e) => updateFilter('city', e.target.value || undefined)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  >
                    <option value="">All Cities</option>
                    {availableCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Property Type Filter */}
        <div className="border-b pb-4">
          <button
            onClick={() => toggleSection('propertyType')}
            className="w-full flex items-center justify-between mb-3"
          >
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4 text-green-600" />
              <span className="font-semibold text-gray-900">Property Type</span>
            </div>
            {expandedSections.propertyType ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          {expandedSections.propertyType && (
            <div className="grid grid-cols-2 gap-2">
              {PROPERTY_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => updateFilter('propertyType', filters.propertyType === type ? undefined : type)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filters.propertyType === type
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Price Range Filter */}
        <div className="border-b pb-4">
          <button
            onClick={() => toggleSection('price')}
            className="w-full flex items-center justify-between mb-3"
          >
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              <span className="font-semibold text-gray-900">Price Range (KSh)</span>
            </div>
            {expandedSections.price ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          {expandedSections.price && (
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Minimum</label>
                <input
                  type="number"
                  placeholder="Min price"
                  value={filters.priceMin || ''}
                  onChange={(e) => updateFilter('priceMin', e.target.value ? parseInt(e.target.value) : undefined)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Maximum</label>
                <input
                  type="number"
                  placeholder="Max price"
                  value={filters.priceMax || ''}
                  onChange={(e) => updateFilter('priceMax', e.target.value ? parseInt(e.target.value) : undefined)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                />
              </div>
            </div>
          )}
        </div>

        {/* Bedrooms & Bathrooms Filter */}
        <div className="border-b pb-4">
          <button
            onClick={() => toggleSection('bedsBaths')}
            className="w-full flex items-center justify-between mb-3"
          >
            <div className="flex items-center gap-2">
              <Bed className="h-4 w-4 text-green-600" />
              <span className="font-semibold text-gray-900">Beds & Baths</span>
            </div>
            {expandedSections.bedsBaths ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          {expandedSections.bedsBaths && (
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-600 mb-2 block flex items-center gap-1">
                  <Bed className="h-3 w-3" />
                  Bedrooms
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {BEDROOM_OPTIONS.map((num) => (
                    <button
                      key={num}
                      onClick={() => updateFilter('bedrooms', filters.bedrooms === num ? undefined : num)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        filters.bedrooms === num
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {num === 0 ? 'Studio' : `${num}+`}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-600 mb-2 block flex items-center gap-1">
                  <Bath className="h-3 w-3" />
                  Bathrooms
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {BATHROOM_OPTIONS.map((num) => (
                    <button
                      key={num}
                      onClick={() => updateFilter('bathrooms', filters.bathrooms === num ? undefined : num)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        filters.bathrooms === num
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {num}+
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Size Filter */}
        <div className="border-b pb-4">
          <button
            onClick={() => toggleSection('size')}
            className="w-full flex items-center justify-between mb-3"
          >
            <div className="flex items-center gap-2">
              <Square className="h-4 w-4 text-green-600" />
              <span className="font-semibold text-gray-900">Size (Sq Ft)</span>
            </div>
            {expandedSections.size ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          {expandedSections.size && (
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Minimum</label>
                <input
                  type="number"
                  placeholder="Min sq ft"
                  value={filters.squareFeetMin || ''}
                  onChange={(e) => updateFilter('squareFeetMin', e.target.value ? parseInt(e.target.value) : undefined)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Maximum</label>
                <input
                  type="number"
                  placeholder="Max sq ft"
                  value={filters.squareFeetMax || ''}
                  onChange={(e) => updateFilter('squareFeetMax', e.target.value ? parseInt(e.target.value) : undefined)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                />
              </div>
            </div>
          )}
        </div>

        {/* Amenities Filter */}
        {availableAmenities.length > 0 && (
          <div className="pb-4 border-b">
            <button
              onClick={() => toggleSection('amenities')}
              className="w-full flex items-center justify-between mb-3"
            >
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                <span className="font-semibold text-gray-900">Amenities</span>
              </div>
              {expandedSections.amenities ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            {expandedSections.amenities && (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {availableAmenities.slice(0, 15).map((amenity) => (
                  <label key={amenity} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="checkbox"
                      checked={filters.amenities?.includes(amenity) || false}
                      onChange={() => toggleAmenity(amenity)}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">{amenity}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Construction Status Filter */}
        {availableConstructionStatus.length > 0 && (
          <div className="pb-4 border-b">
            <button
              onClick={() => toggleSection('construction')}
              className="w-full flex items-center justify-between mb-3"
            >
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-green-600" />
                <span className="font-semibold text-gray-900">Construction Status</span>
              </div>
              {expandedSections.construction ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            {expandedSections.construction && (
              <select
                value={filters.constructionStatus || ''}
                onChange={(e) => updateFilter('constructionStatus', e.target.value || undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              >
                <option value="">All Status</option>
                {availableConstructionStatus.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}

        {/* Nearby Features Filter */}
        {availableNearbyFeatures.length > 0 && (
          <div className="pb-4 border-b">
            <button
              onClick={() => toggleSection('nearbyFeatures')}
              className="w-full flex items-center justify-between mb-3"
            >
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-green-600" />
                <span className="font-semibold text-gray-900">Nearby</span>
              </div>
              {expandedSections.nearbyFeatures ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            {expandedSections.nearbyFeatures && (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {availableNearbyFeatures.slice(0, 10).map((feature) => (
                  <label key={feature} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="checkbox"
                      checked={filters.nearbyFeatures?.includes(feature) || false}
                      onChange={() => toggleFeature(feature, 'nearbyFeatures')}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        )}

        {/* External Features Filter */}
        {availableExternalFeatures.length > 0 && (
          <div className="pb-4 border-b">
            <button
              onClick={() => toggleSection('externalFeatures')}
              className="w-full flex items-center justify-between mb-3"
            >
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-green-600" />
                <span className="font-semibold text-gray-900">External</span>
              </div>
              {expandedSections.externalFeatures ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            {expandedSections.externalFeatures && (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {availableExternalFeatures.slice(0, 10).map((feature) => (
                  <label key={feature} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="checkbox"
                      checked={filters.externalFeatures?.includes(feature) || false}
                      onChange={() => toggleFeature(feature, 'externalFeatures')}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Internal Features Filter */}
        {availableInternalFeatures.length > 0 && (
          <div className="pb-4">
            <button
              onClick={() => toggleSection('internalFeatures')}
              className="w-full flex items-center justify-between mb-3"
            >
              <div className="flex items-center gap-2">
                <Square className="h-4 w-4 text-green-600" />
                <span className="font-semibold text-gray-900">Internal</span>
              </div>
              {expandedSections.internalFeatures ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            {expandedSections.internalFeatures && (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {availableInternalFeatures.slice(0, 10).map((feature) => (
                  <label key={feature} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="checkbox"
                      checked={filters.internalFeatures?.includes(feature) || false}
                      onChange={() => toggleFeature(feature, 'internalFeatures')}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer with Apply Button */}
      <div className="p-4 border-t bg-gray-50">
        <Button
          onClick={() => onFilterChange(filters)}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          <Filter className="h-4 w-4 mr-2" />
          Apply Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </Button>
      </div>
    </div>
  );
}
