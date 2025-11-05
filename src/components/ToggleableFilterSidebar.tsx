'use client';

import { useState, forwardRef, useImperativeHandle } from 'react';
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

export interface ToggleableFilterSidebarRef {
  openFilter: () => void;
}

const ToggleableFilterSidebar = forwardRef<ToggleableFilterSidebarRef, ToggleableFilterSidebarProps>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);

  useImperativeHandle(ref, () => ({
    openFilter: () => setIsOpen(true)
  }));

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
});

ToggleableFilterSidebar.displayName = 'ToggleableFilterSidebar';

export default ToggleableFilterSidebar;
