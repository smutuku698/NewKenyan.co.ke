import { Metadata } from 'next';
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
import {
  Location,
  PropertyStats,
  generateLocationMetadata,
  generateH1,
  generateBreadcrumbs,
  generateLocationSchema
} from '@/lib/location-seo';
import {
  generatePropertyMetadata,
  generatePropertyH1,
  generatePropertyBreadcrumbs,
  generatePropertySchema,
  generateAboutContent,
  formatPrice
} from '@/lib/property-page-generator';
import { getFullCanonicalUrl } from '@/lib/canonical-mapping';

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
  searchParams: { [key: string]: string | string[] | undefined };
}

// ISR Configuration: Revalidate every 24 hours
export const revalidate = 86400; // 24 hours in seconds

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

async function getHousesForRent(
  location: Location,
  searchParams?: { [key: string]: string | string[] | undefined }
): Promise<PropertyListing[]> {
  let query = supabase
    .from('property_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('price_type', 'rent')
    .ilike('property_type', '%house%');

  // Build location filters with proper AND logic
  if (location.type === 'county') {
    // Remove " County" suffix from location name for database matching
    const countyName = location.name.replace(/ County$/i, '');
    query = query.ilike('county', `%${countyName}%`);

    // If city param is provided, add it as additional filter within the county
    if (searchParams?.city && typeof searchParams.city === 'string') {
      query = query.or(`city.ilike.%${searchParams.city}%,address.ilike.%${searchParams.city}%`);
    }
  } else if (location.type === 'neighborhood') {
    // Remove " County" suffix from county name for database matching
    const countyName = location.county.replace(/ County$/i, '');
    query = query
      .ilike('county', `%${countyName}%`)
      .or(`city.ilike.%${location.name}%,address.ilike.%${location.name}%`);

    // If city param provided and different from location name, add additional filter
    if (searchParams?.city && typeof searchParams.city === 'string' &&
        searchParams.city.toLowerCase() !== location.name.toLowerCase()) {
      query = query.or(`city.ilike.%${searchParams.city}%,address.ilike.%${searchParams.city}%`);
    }
  } else if (location.type === 'estate') {
    // Remove " County" suffix from county name for database matching
    const countyName = location.county.replace(/ County$/i, '');
    query = query
      .ilike('county', `%${countyName}%`)
      .ilike('address', `%${location.name}%`);
  }

  // Apply other query parameter filters
  if (searchParams) {
    if (searchParams.bedrooms && typeof searchParams.bedrooms === 'string') {
      const bedrooms = parseInt(searchParams.bedrooms);
      if (!isNaN(bedrooms)) {
        query = query.eq('bedrooms', bedrooms);
      }
    }
    if (searchParams.min_price && typeof searchParams.min_price === 'string') {
      const minPrice = parseInt(searchParams.min_price);
      if (!isNaN(minPrice)) {
        query = query.gte('price', minPrice);
      }
    }
    if (searchParams.max_price && typeof searchParams.max_price === 'string') {
      const maxPrice = parseInt(searchParams.max_price);
      if (!isNaN(maxPrice)) {
        query = query.lte('price', maxPrice);
      }
    }
    if (searchParams.bathrooms && typeof searchParams.bathrooms === 'string') {
      const bathrooms = parseInt(searchParams.bathrooms);
      if (!isNaN(bathrooms)) {
        query = query.gte('bathrooms', bathrooms);
      }
    }
  }

  query = query
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(100);

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching properties:', error);
    return [];
  }

  return data || [];
}

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

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const location = await getLocation(params.location);

  if (!location) {
    return {
      title: 'Location Not Found | NewKenyan',
      description: 'The requested location could not be found.'
    };
  }

  const properties = await getHousesForRent(location, searchParams);
  const stats = calculateStats(properties);

  const metadata = generatePropertyMetadata(location, 'houses', 'rent', stats);

  // Add canonical URL if this page has a standalone equivalent
  const canonicalUrl = getFullCanonicalUrl(location.slug, 'house', 'rent');
  if (canonicalUrl) {
    return {
      ...metadata,
      alternates: {
        ...metadata.alternates,
        canonical: canonicalUrl
      }
    };
  }

  return metadata;
}

// Get related locations
async function getRelatedLocations(location: Location) {
  let query = supabase
    .from('locations')
    .select('name, slug, type, county, city')
    .eq('is_active', true);

  // Get locations in the same area
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

export default async function HousesForRentPage({ params, searchParams }: PageProps) {
  const location = await getLocation(params.location);

  if (!location) {
    notFound();
  }

  const properties = await getHousesForRent(location, searchParams);
  const stats = calculateStats(properties);
  const relatedLocations = await getRelatedLocations(location);

  const h1VariationIndex = parseInt(location.id.slice(0, 8), 16) % 4;
  const h1 = generatePropertyH1(location, 'houses', 'rent', h1VariationIndex);

  const breadcrumbItems = generatePropertyBreadcrumbs(location, 'houses', 'rent');
  const aboutContent = generateAboutContent(location, 'houses', 'rent', stats);

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `${(price / 1000).toFixed(0)}K`;
    }
    return price.toString();
  };

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
              <div className="text-sm text-gray-600">Houses Available</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
              <div className="text-lg font-bold text-green-600">KES {formatPrice(stats.minPrice)}/mo</div>
              <div className="text-sm text-gray-600">Starting Rent</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
              <div className="text-lg font-bold text-green-600">KES {formatPrice(stats.avgPrice)}/mo</div>
              <div className="text-sm text-gray-600">Average Rent</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
              <div className="text-lg font-bold text-green-600">
                {Object.keys(stats.bedroomDistribution).length > 0
                  ? `${Math.min(...Object.keys(stats.bedroomDistribution).map(Number))}-${Math.max(...Object.keys(stats.bedroomDistribution).map(Number))}`
                  : 'Various'}
              </div>
              <div className="text-sm text-gray-600">Bedroom Options</div>
            </div>
          </div>
        )}

        {/* Property Type Switcher */}
        <PropertyTypeSwitcher
          currentPropertyType="houses"
          currentTransaction="rent"
          locationSlug={location.slug}
          locationName={location.name}
          className="mb-8"
        />

        {/* Infinite Scroll Properties List with Filters */}
        {properties.length > 0 ? (
          <InfinitePropertyList
            initialProperties={properties}
            location={{
              type: location.type as 'county' | 'neighborhood' | 'estate',
              name: location.name,
              county: location.county,
              city: location.city || undefined
            }}
            propertyType="house"
            transactionType="rent"
            enableFilters={true}
          />
        ) : (
          <div className="text-center py-12 mb-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No houses for rent found in {location.name}
            </h3>
            <p className="text-gray-600 mb-6">
              Be the first to list a house for rent in {location.name}!
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
          <h2 className="text-2xl font-bold mb-4">Renting a House in {location.name}</h2>
          <div className="prose max-w-none text-gray-600">
            <p className="mb-4">
              {location.description || `${location.name} offers a variety of houses for rent in ${location.county}, Kenya,
              catering to different budgets and preferences.`}
            </p>

            {location.type === 'county' && (
              <>
                <h3 className="text-lg font-semibold mt-6 mb-3">Why Rent a House in {location.name} County?</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Wide range of rental houses from budget-friendly to upmarket</li>
                  <li>Flexible lease terms available</li>
                  <li>Good transport links and accessibility</li>
                  <li>Access to schools, hospitals, and shopping centers</li>
                </ul>
              </>
            )}

            {location.type === 'neighborhood' && (
              <>
                <h3 className="text-lg font-semibold mt-6 mb-3">Living in {location.name}</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Family-friendly neighborhood with secure environments</li>
                  <li>Convenient access to amenities and services</li>
                  <li>Good community atmosphere</li>
                  <li>Regular public transport availability</li>
                </ul>
              </>
            )}

            {location.type === 'estate' && stats.popularAmenities.length > 0 && (
              <>
                <h3 className="text-lg font-semibold mt-6 mb-3">Common Features in {location.name}</h3>
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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generatePropertySchema(
              location,
              'houses',
              'rent',
              stats,
              properties.slice(0, 10)
            ))
          }}
        />

        
      </main>

      {/* Internal Links & Silo Structure */}
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
