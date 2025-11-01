import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import InfinitePropertyList from '@/components/InfinitePropertyList';
import InternalLinks from '@/components/InternalLinks';
import LocationDirectory from '@/components/LocationDirectory';
import { supabase } from '@/lib/supabase';
import {
  Location,
  PropertyStats,
  generateLocationMetadata,
  generateH1,
  generateBreadcrumbs,
  generateLocationSchema
} from '@/lib/location-seo';

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

async function getApartmentsForSale(location: Location): Promise<PropertyListing[]> {
  let query = supabase
    .from('property_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('price_type', 'For Sale')
    .ilike('property_type', '%apartment%');

  if (location.type === 'county') {
    query = query.eq('county', location.name);
  } else if (location.type === 'neighborhood') {
    query = query
      .eq('county', location.county)
      .or(`city.ilike.%${location.name}%,address.ilike.%${location.name}%`);
  } else if (location.type === 'estate') {
    query = query
      .eq('county', location.county)
      .ilike('address', `%${location.name}%`);
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const location = await getLocation(params.location);

  if (!location) {
    return {
      title: 'Location Not Found | NewKenyan',
      description: 'The requested location could not be found.'
    };
  }

  const properties = await getApartmentsForSale(location);
  const stats = calculateStats(properties);

  return generateLocationMetadata(location, 'apartments', 'sale', stats);
}

async function getAllLocations() {
  const { data, error } = await supabase
    .from('locations')
    .select('name, slug, type, county, city')
    .eq('is_active', true)
    .order('name');

  if (error || !data) {
    return [];
  }

  return data;
}

export default async function ApartmentsForSalePage({ params }: PageProps) {
  const location = await getLocation(params.location);

  if (!location) {
    notFound();
  }

  const properties = await getApartmentsForSale(location);
  const stats = calculateStats(properties);
  const allLocations = await getAllLocations();

  const h1VariationIndex = parseInt(location.id.slice(0, 8), 16) % 4;
  const h1 = generateH1(location, 'apartments', 'sale', h1VariationIndex);

  const breadcrumbItems = generateBreadcrumbs(location, 'apartments', 'sale');

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
            {location.description || `Discover ${stats.totalCount} apartment${stats.totalCount !== 1 ? 's' : ''} for sale in ${location.name}.
            Find modern flats, penthouses, and apartment units with verified listings and direct seller contact.`}
          </p>
        </div>

        {stats.totalCount > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
              <div className="text-2xl font-bold text-green-600">{stats.totalCount}</div>
              <div className="text-sm text-gray-600">Apartments Available</div>
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
              <div className="text-lg font-bold text-green-600">
                {Object.keys(stats.bedroomDistribution).length > 0
                  ? `${Math.min(...Object.keys(stats.bedroomDistribution).map(Number))}-${Math.max(...Object.keys(stats.bedroomDistribution).map(Number))}`
                  : 'Various'}
              </div>
              <div className="text-sm text-gray-600">Bedroom Options</div>
            </div>
          </div>
        )}

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
            propertyType="apartment"
            transactionType="sale"
            enableFilters={true}
          />
        ) : (
          <div className="text-center py-12 mb-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No apartments for sale found in {location.name}
            </h3>
            <p className="text-gray-600 mb-6">
              Be the first to list an apartment for sale in {location.name}!
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
          <h2 className="text-2xl font-bold mb-4">About Apartments in {location.name}</h2>
          <div className="prose max-w-none text-gray-600">
            <p className="mb-4">
              {location.description || `${location.name} offers excellent investment opportunities for apartment buyers in ${location.county}, Kenya,
              with modern developments and secure properties.`}
            </p>

            {location.type === 'county' && (
              <>
                <h3 className="text-lg font-semibold mt-6 mb-3">Why Buy an Apartment in {location.name} County?</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Modern apartment buildings with secure facilities</li>
                  <li>Strong rental yields for investment properties</li>
                  <li>Lower maintenance compared to houses</li>
                  <li>Access to shared amenities like gyms and pools</li>
                </ul>
              </>
            )}

            {location.type === 'neighborhood' && (
              <>
                <h3 className="text-lg font-semibold mt-6 mb-3">Apartments in {location.name}</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Well-maintained apartment complexes</li>
                  <li>24/7 security and gated communities</li>
                  <li>Convenient access to urban amenities</li>
                  <li>Great investment opportunities</li>
                </ul>
              </>
            )}

            {location.type === 'estate' && stats.popularAmenities.length > 0 && (
              <>
                <h3 className="text-lg font-semibold mt-6 mb-3">Apartment Features in {location.name}</h3>
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
            __html: JSON.stringify(generateLocationSchema(
              location,
              'apartments',
              'sale',
              stats,
              properties.slice(0, 10)
            ))
          }}
        />

        {/* Location Directory - Massive Internal Linking */}
        <LocationDirectory
          locations={allLocations}
          currentLocationSlug={location.slug}
          propertyType="apartments"
          transactionType="sale"
          className="mt-12"
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
