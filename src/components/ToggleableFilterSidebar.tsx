'use client';

import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PropertyFilterSidebar from './PropertyFilterSidebar';
import type { FilterState } from './PropertyFilterSidebar';

// Re-export FilterState for consumers
export type { FilterState };

interface ToggleableFilterSidebarProps {
  onFilterChange: (filters: FilterState) => void;
  availableCounties?: string[];
  availableCities?: string[];
  availableAmenities?: string[];
  availableConstructionStatus?: string[];
  availableNearbyFeatures?: string[];
  availableExternalFeatures?: string[];
  availableInternalFeatures?: string[];
}

export default function ToggleableFilterSidebar(props: ToggleableFilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);

  const handleFilterChange = (filters: FilterState) => {
    // Count active filters
    const count = Object.keys(filters).reduce((total, key) => {
      const value = filters[key as keyof FilterState];
      if (Array.isArray(value)) {
        return total + value.length;
      }
      return value ? total + 1 : total;
    }, 0);

    setActiveFilters(count);
    props.onFilterChange(filters);
  };

  return (
    <>
      {/* Filter Toggle Button - Fixed position for mobile */}
      <div className="fixed bottom-20 right-4 z-40 lg:hidden">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-green-700 hover:bg-green-800 text-white rounded-full shadow-2xl w-14 h-14 flex items-center justify-center relative"
          aria-label="Open filters"
        >
          <Filter className="h-6 w-6" />
          {activeFilters > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {activeFilters}
            </span>
          )}
        </Button>
      </div>

      {/* Desktop Filter Toggle Button */}
      <div className="hidden lg:block mb-6">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          className="w-full border-2 border-green-600 hover:bg-green-50 text-green-700 font-semibold"
        >
          <Filter className="h-4 w-4 mr-2" />
          {isOpen ? 'Hide' : 'Show'} Filters
          {activeFilters > 0 && (
            <span className="ml-2 bg-green-700 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {activeFilters}
            </span>
          )}
        </Button>
      </div>

      {/* Overlay for both mobile and desktop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Filter Sidebar - Slide in from right on mobile, overlay on desktop */}
      {isOpen && (
        <div
          className="fixed inset-y-0 right-0 lg:left-0 lg:right-auto z-50 transform transition-transform duration-300 ease-in-out w-full sm:w-96 lg:w-80 xl:w-96"
        >
          {/* Close Button - visible on both mobile and desktop */}
          <div className="absolute top-4 right-4 lg:left-4 lg:right-auto z-10">
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="bg-white rounded-full shadow-lg hover:bg-gray-100"
              aria-label="Close filters"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Filter Content */}
          <div className="h-full overflow-hidden bg-white shadow-2xl">
            <PropertyFilterSidebar
              {...props}
              onFilterChange={handleFilterChange}
              className="h-full"
            />
          </div>
        </div>
      )}
    </>
  );
}
