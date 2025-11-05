/**
 * Script to generate all property type pages
 * Run with: node scripts/generate-property-pages.js
 */

const fs = require('fs');
const path = require('path');

// Property type configurations
const PROPERTY_TYPES = [
  // Already exists: houses-for-sale, houses-for-rent, apartments-for-sale, apartments-for-rent
  // Already created: studio-apartments-for-sale

  { slug: 'studio-apartments-for-rent', dbQuery: '%studio%', label: 'Studio Apartments', propertyType: 'studio', avgYield: '2.2%' },
  { slug: 'bungalows-for-sale', dbQuery: '%bungalow%', label: 'Bungalows', propertyType: 'bungalow', avgYield: 'N/A' },
  { slug: 'bungalows-for-rent', dbQuery: '%bungalow%', label: 'Bungalows', propertyType: 'bungalow', avgYield: 'N/A' },
  { slug: 'maisonettes-for-sale', dbQuery: '%maisonette%', label: 'Maisonettes', propertyType: 'maisonette', avgYield: 'N/A' },
  { slug: 'maisonettes-for-rent', dbQuery: '%maisonette%', label: 'Maisonettes', propertyType: 'maisonette', avgYield: 'N/A' },
  { slug: 'townhouses-for-sale', dbQuery: '%townhouse%|%town house%', label: 'Townhouses', propertyType: 'townhouse', avgYield: '8.3%' },
  { slug: 'townhouses-for-rent', dbQuery: '%townhouse%|%town house%', label: 'Townhouses', propertyType: 'townhouse', avgYield: '8.3%' },
  { slug: 'villas-for-sale', dbQuery: '%villa%', label: 'Villas', propertyType: 'villa', avgYield: 'N/A' },
  { slug: 'villas-for-rent', dbQuery: '%villa%', label: 'Villas', propertyType: 'villa', avgYield: 'N/A' },
  { slug: 'bedsitters-for-rent', dbQuery: '%bedsitter%|%bed sitter%|%single room%', label: 'Bedsitters', propertyType: 'bedsitter', avgYield: '2.2%', saleOnly: false },
  { slug: 'serviced-apartments-for-rent', dbQuery: '%serviced%|%furnished apartment%', label: 'Serviced Apartments', propertyType: 'serviced', avgYield: 'N/A', saleOnly: false },
  { slug: 'commercial-properties-for-sale', dbQuery: '%commercial%', label: 'Commercial Properties', propertyType: 'commercial', avgYield: '12.0%' },
  { slug: 'commercial-properties-for-rent', dbQuery: '%commercial%', label: 'Commercial Properties', propertyType: 'commercial', avgYield: '12.0%' },
  { slug: 'office-space-for-rent', dbQuery: '%office%', label: 'Office Spaces', propertyType: 'office', avgYield: '12.0%', saleOnly: false },
  { slug: 'shops-for-sale', dbQuery: '%shop%|%retail%|%store%', label: 'Shops', propertyType: 'shop', avgYield: 'N/A' },
  { slug: 'shops-for-rent', dbQuery: '%shop%|%retail%|%store%', label: 'Shops', propertyType: 'shop', avgYield: 'N/A' },
  { slug: 'warehouses-for-sale', dbQuery: '%warehouse%|%godown%', label: 'Warehouses', propertyType: 'warehouse', avgYield: 'N/A' },
  { slug: 'warehouses-for-rent', dbQuery: '%warehouse%|%godown%', label: 'Warehouses', propertyType: 'warehouse', avgYield: 'N/A' },
  { slug: 'land-for-sale', dbQuery: '%land%|%plot%', label: 'Land Plots', propertyType: 'land', avgYield: 'N/A', saleOnly: true },
];

// Template for property pages
function generatePageTemplate(config) {
  const transactionType = config.slug.includes('-for-sale') ? 'sale' : 'rent';
  const priceType = transactionType === 'sale' ? 'For Sale' : 'For Rent';

  return `import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import InfinitePropertyList from '@/components/InfinitePropertyList';
import InternalLinks from '@/components/InternalLinks';
import PropertyTypeSwitcher from '@/components/PropertyTypeSwitcher';
import CountyCrossLinks from '@/components/CountyCrossLinks';
import RelatedLocations from '@/components/RelatedLocations';
import { supabase } from '@/lib/supabase';
import { Location, PropertyStats } from '@/lib/location-seo';
import {
  generatePropertyMetadata,
  generatePropertyH1,
  generatePropertyBreadcrumbs,
  generatePropertySchema,
  generateAboutContent,
  formatPrice
} from '@/lib/property-page-generator';

interface PropertyListing {
  id: string;
  property_title: string;
  property_type: string;
  description: string;
  price: number;
  price_type: string;
  bedrooms: number | null;
  bathrooms: number | null;
  address: string;
  city: string;
  county: string | null;
  contact_phone: string;
  contact_email: string | null;
  whatsapp_number: string | null;
  amenities: string[];
  images: string[];
  is_approved: boolean;
  is_featured: boolean;
}

interface PageProps {
  params: { location: string };
}

// Property type configuration
const PROPERTY_TYPE = '${config.slug.replace('-for-sale', '').replace('-for-rent', '')}';
const TRANSACTION_TYPE = '${transactionType}';
const DB_QUERY = '${config.dbQuery}';
const PROPERTY_LABEL = '${config.label}';

// ISR Configuration: Revalidate every 24 hours
export const revalidate = 86400;

// Generate static params for all active locations
export async function generateStaticParams() {
  const { data: locations } = await supabase
    .from('locations')
    .select('slug')
    .eq('is_active', true);

  return locations?.map((location) => ({
    location: location.slug,
  })) || [];
}

// Get location data from Supabase
async function getLocation(slug: string): Promise<Location | null> {
  const { data, error } = await supabase
    .from('locations')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error || !data) {
    return null;
  }

  return data as Location;
}

// Get properties
async function getProperties(location: Location): Promise<PropertyListing[]> {
  let query = supabase
    .from('property_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('price_type', '${priceType}')
    .ilike('property_type', DB_QUERY);

  // Filter based on location type
  if (location.type === 'county') {
    query = query.eq('county', location.name);
  } else if (location.type === 'neighborhood') {
    query = query
      .eq('county', location.county)
      .or(\`city.ilike.%\${location.name}%,address.ilike.%\${location.name}%\`);
  } else if (location.type === 'estate') {
    query = query
      .eq('county', location.county)
      .ilike('address', \`%\${location.name}%\`);
  }

  query = query
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(12);

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching properties:', error);
    return [];
  }

  return data || [];
}

// Calculate property statistics
function calculateStats(properties: PropertyListing[]): PropertyStats {
  if (properties.length === 0) {
    return {
      totalCount: 0,
      minPrice: 0,
      maxPrice: 0,
      avgPrice: 0,
      bedroomDistribution: {},
      popularAmenities: []
    };
  }

  const prices = properties.map(p => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const avgPrice = Math.floor(prices.reduce((a, b) => a + b, 0) / prices.length);

  const bedroomDistribution: Record<number, number> = {};
  properties.forEach(p => {
    if (p.bedrooms) {
      bedroomDistribution[p.bedrooms] = (bedroomDistribution[p.bedrooms] || 0) + 1;
    }
  });

  const amenityCounts: Record<string, number> = {};
  properties.forEach(p => {
    p.amenities?.forEach(amenity => {
      amenityCounts[amenity] = (amenityCounts[amenity] || 0) + 1;
    });
  });
  const popularAmenities = Object.entries(amenityCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([amenity]) => amenity);

  return {
    totalCount: properties.length,
    minPrice,
    maxPrice,
    avgPrice,
    bedroomDistribution,
    popularAmenities
  };
}

// Get related locations
async function getRelatedLocations(location: Location) {
  let query = supabase
    .from('locations')
    .select('name, slug, type, county, city')
    .eq('is_active', true);

  if (location.type === 'county') {
    query = query.eq('county', location.name).neq('slug', location.slug);
  } else {
    query = query.eq('county', location.county).neq('slug', location.slug);
  }

  query = query.order('name').limit(50);

  const { data, error } = await query;
  if (error || !data) return [];
  return data;
}

// Generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const location = await getLocation(params.location);

  if (!location) {
    return {
      title: 'Location Not Found | NewKenyan',
      description: 'The requested location could not be found.'
    };
  }

  const properties = await getProperties(location);
  const stats = calculateStats(properties);

  return generatePropertyMetadata(location, PROPERTY_TYPE, TRANSACTION_TYPE, stats);
}

export default async function PropertyPage({ params }: PageProps) {
  const location = await getLocation(params.location);

  if (!location) {
    notFound();
  }

  const properties = await getProperties(location);
  const stats = calculateStats(properties);
  const relatedLocations = await getRelatedLocations(location);

  const h1VariationIndex = parseInt(location.id.slice(0, 8), 16) % 4;
  const h1 = generatePropertyH1(location, PROPERTY_TYPE, TRANSACTION_TYPE, h1VariationIndex);
  const breadcrumbItems = generatePropertyBreadcrumbs(location, PROPERTY_TYPE, TRANSACTION_TYPE);
  const aboutContent = generateAboutContent(location, PROPERTY_TYPE, TRANSACTION_TYPE, stats);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{h1}</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            {aboutContent.paragraphs[0]}
          </p>
        </div>

        {stats.totalCount > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
              <div className="text-2xl font-bold text-green-600">{stats.totalCount}</div>
              <div className="text-sm text-gray-600">{PROPERTY_LABEL}</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
              <div className="text-lg font-bold text-green-600">KES {formatPrice(stats.minPrice)}</div>
              <div className="text-sm text-gray-600">Starting Price</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
              <div className="text-lg font-bold text-green-600">KES {formatPrice(stats.avgPrice)}</div>
              <div className="text-sm text-gray-600">Average Price</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
              <div className="text-lg font-bold text-green-600">${config.avgYield}</div>
              <div className="text-sm text-gray-600">Avg. Yield</div>
            </div>
          </div>
        )}

        <PropertyTypeSwitcher
          currentPropertyType={PROPERTY_TYPE}
          currentTransaction={TRANSACTION_TYPE}
          locationSlug={location.slug}
          locationName={location.name}
          className="mb-8"
        />

        {properties.length > 0 ? (
          <InfinitePropertyList
            initialProperties={properties}
            location={{
              type: location.type as 'county' | 'neighborhood' | 'estate',
              name: location.name,
              county: location.county,
              city: location.city || undefined
            }}
            propertyType="${config.propertyType}"
            transactionType={TRANSACTION_TYPE}
            enableFilters={true}
          />
        ) : (
          <div className="text-center py-12 mb-12 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No {PROPERTY_LABEL.toLowerCase()} for ${transactionType} found in {location.name}
            </h3>
            <p className="text-gray-600 mb-6">
              Be the first to list a property in {location.name}!
            </p>
            <a
              href="/add-listing"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              List Your Property
            </a>
          </div>
        )}

        <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
          <h2 className="text-2xl font-bold mb-4">{aboutContent.title}</h2>
          <div className="prose max-w-none text-gray-600">
            {aboutContent.paragraphs.map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}

            {aboutContent.features.length > 0 && (
              <>
                <h3 className="text-lg font-semibold mt-6 mb-3">
                  Why Choose {location.name}?
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  {aboutContent.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </>
            )}

            {stats.popularAmenities.length > 0 && (
              <>
                <h3 className="text-lg font-semibold mt-6 mb-3">Popular Features</h3>
                <div className="flex flex-wrap gap-2 mt-3">
                  {stats.popularAmenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <RelatedLocations
          currentLocation={location}
          relatedLocations={relatedLocations}
          propertyType={PROPERTY_TYPE}
          transactionType={TRANSACTION_TYPE}
          className="mb-8"
        />

        <CountyCrossLinks
          currentCountySlug={location.type === 'county' ? location.slug : \`\${location.county.toLowerCase().replace(/\\s+/g, '-')}-county\`}
          propertyType={PROPERTY_TYPE}
          transactionType={TRANSACTION_TYPE}
          className="mb-8"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generatePropertySchema(
              location,
              PROPERTY_TYPE,
              TRANSACTION_TYPE,
              stats,
              properties.slice(0, 10)
            ))
          }}
        />
      </main>

      <InternalLinks
        currentPage={{
          type: 'location',
          city: location.city || location.name,
          county: location.county
        }}
      />

      <Footer />
    </div>
  );
}
`;
}

// Generate all property pages
PROPERTY_TYPES.forEach(config => {
  const dirPath = path.join(__dirname, '..', 'src', 'app', config.slug, '[location]');
  const filePath = path.join(dirPath, 'page.tsx');

  // Create directory if it doesn't exist
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Created directory: ${config.slug}/[location]`);
  }

  // Write page file
  fs.writeFileSync(filePath, generatePageTemplate(config));
  console.log(`✅ Generated: ${config.slug}/[location]/page.tsx`);
});

console.log(`\n🎉 Successfully generated ${PROPERTY_TYPES.length} property type pages!`);
