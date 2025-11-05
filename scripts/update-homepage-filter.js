/**
 * Script to update homepage with toggleable filter and all 47 counties
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'app', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace imports
content = content.replace(
  "import PropertyFilterSidebar, { FilterState } from '@/components/PropertyFilterSidebar';",
  `import ToggleableFilterSidebar from '@/components/ToggleableFilterSidebar';
import { KENYA_COUNTIES } from '@/components/CountyCrossLinks';
import { FilterState } from '@/components/PropertyFilterSidebar';`
);

// Replace the filter sidebar rendering (lines 503-519)
const oldFilterSection = `              {/* Two-column layout: Filter Sidebar + Properties */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Filter Sidebar - Sticky on desktop - NOW ON LEFT */}
                <div className="lg:col-span-1 lg:order-2">
                  <div className="sticky top-4">
                    <PropertyFilterSidebar
                      onFilterChange={handleFilterChange}
                      availableCounties={Array.from(new Set(allProperties.map(p => p.county).filter(Boolean) as string[])).sort()}
                      availableCities={availableLocations.length > 0 ? availableLocations : Array.from(new Set(allProperties.map(p => p.city))).sort()}
                      availableAmenities={Array.from(new Set(allProperties.flatMap(p => p.amenities || []))).sort()}
                      availableConstructionStatus={Array.from(new Set(allProperties.map(p => p.construction_progress).filter(Boolean) as string[])).sort()}
                      availableNearbyFeatures={Array.from(new Set(allProperties.flatMap(p => p.nearby_features || []))).sort()}
                      availableExternalFeatures={Array.from(new Set(allProperties.flatMap(p => p.external_features || []))).sort()}
                      availableInternalFeatures={Array.from(new Set(allProperties.flatMap(p => p.internal_features || []))).sort()}
                    />
                  </div>
                </div>`;

const newFilterSection = `              {/* Toggleable Filter Sidebar */}
              <div className="lg:col-span-1">
                <ToggleableFilterSidebar
                  onFilterChange={handleFilterChange}
                  availableCounties={KENYA_COUNTIES.map(c => c.name).sort()}
                  availableCities={availableLocations.length > 0 ? availableLocations : Array.from(new Set(allProperties.map(p => p.city))).sort()}
                  availableAmenities={Array.from(new Set(allProperties.flatMap(p => p.amenities || []))).sort()}
                  availableConstructionStatus={Array.from(new Set(allProperties.map(p => p.construction_progress).filter(Boolean) as string[])).sort()}
                  availableNearbyFeatures={Array.from(new Set(allProperties.flatMap(p => p.nearby_features || []))).sort()}
                  availableExternalFeatures={Array.from(new Set(allProperties.flatMap(p => p.external_features || []))).sort()}
                  availableInternalFeatures={Array.from(new Set(allProperties.flatMap(p => p.internal_features || []))).sort()}
                />
              </div>`;

content = content.replace(oldFilterSection, newFilterSection);

// Change grid layout to give filter less space
content = content.replace(
  'grid grid-cols-1 lg:grid-cols-4 gap-6',
  'grid grid-cols-1 lg:grid-cols-5 gap-6'
);

content = content.replace(
  '{/* Properties Grid - 3 columns on desktop - NOW ON RIGHT */}\n                <div className="lg:col-span-3 lg:order-1">',
  '{/* Properties Grid - 4 columns on desktop */}\n                <div className="lg:col-span-4">'
);

fs.writeFileSync(filePath, content);
console.log('✅ Updated homepage with toggleable filter and all 47 counties');
