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
import PropertyCard from '@/components/PropertyCard';
import CityPillarContentComponent from '@/components/CityPillarContent';
import CountyPillarContentComponent from '@/components/CountyPillarContent';
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
import { getFullCanonicalUrl } from '@/lib/canonical-mapping';
import { getCityPillarContent, hasPillarContent } from '@/lib/city-pillar-content';
import { getCountyContent, hasCountyContent } from '@/lib/county-content';

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
  searchParams: { [key: string]: string | string[] | undefined };
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

// Get properties for houses for sale
async function getHousesForSale(
  location: Location,
  searchParams?: { [key: string]: string | string[] | undefined }
): Promise<PropertyListing[]> {
  let query = supabase
    .from('property_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('price_type', 'sale')
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
    .limit(100); // Initial load - 12 properties

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

  // Bedroom distribution
  const bedroomDistribution: Record<number, number> = {};
  properties.forEach(p => {
    if (p.bedrooms) {
      bedroomDistribution[p.bedrooms] = (bedroomDistribution[p.bedrooms] || 0) + 1;
    }
  });

  // Popular amenities
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

// Get smart alternative properties based on failed filters
async function getSmartAlternatives(
  location: Location,
  searchParams?: { [key: string]: string | string[] | undefined },
  limit: number = 12
): Promise<{ sameCityDifferentBedrooms: PropertyListing[], sameBedroomsDifferentCity: PropertyListing[] }> {
  const countyName = location.county.replace(/ County$/i, '');
  const cityFilter = searchParams?.city as string | undefined;
  const bedroomsFilter = searchParams?.bedrooms ? parseInt(searchParams.bedrooms as string) : undefined;

  let sameCityDifferentBedrooms: PropertyListing[] = [];
  let sameBedroomsDifferentCity: PropertyListing[] = [];

  // If we have both city and bedrooms filters, get smart alternatives
  if (cityFilter && bedroomsFilter && !isNaN(bedroomsFilter)) {
    // Query 1: Same city (or location), different bedrooms
    let query1 = supabase
      .from('property_listings')
      .select('*')
      .eq('is_approved', true)
      .eq('price_type', 'sale')
      .ilike('property_type', '%house%')
      .ilike('county', `%${countyName}%`)
      .neq('bedrooms', bedroomsFilter) // Different bedrooms
      .not('bedrooms', 'is', null);

    if (location.type === 'county') {
      query1 = query1.or(`city.ilike.%${cityFilter}%,address.ilike.%${cityFilter}%`);
    } else if (location.type === 'neighborhood') {
      query1 = query1.or(`city.ilike.%${location.name}%,address.ilike.%${location.name}%,city.ilike.%${cityFilter}%,address.ilike.%${cityFilter}%`);
    }

    query1 = query1
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(limit);

    const { data: data1 } = await query1;
    sameCityDifferentBedrooms = data1 || [];

    // Query 2: Same bedrooms, different city in same county
    let query2 = supabase
      .from('property_listings')
      .select('*')
      .eq('is_approved', true)
      .eq('price_type', 'sale')
      .ilike('property_type', '%house%')
      .ilike('county', `%${countyName}%`)
      .eq('bedrooms', bedroomsFilter);

    query2 = query2
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(limit);

    const { data: data2 } = await query2;
    sameBedroomsDifferentCity = data2 || [];
  } else if (bedroomsFilter && !isNaN(bedroomsFilter)) {
    // Only bedrooms filter: get different bedrooms in same location
    let query1 = supabase
      .from('property_listings')
      .select('*')
      .eq('is_approved', true)
      .eq('price_type', 'sale')
      .ilike('property_type', '%house%')
      .ilike('county', `%${countyName}%`)
      .neq('bedrooms', bedroomsFilter)
      .not('bedrooms', 'is', null);

    if (location.type === 'neighborhood') {
      query1 = query1.or(`city.ilike.%${location.name}%,address.ilike.%${location.name}%`);
    }

    query1 = query1
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(limit);

    const { data: data1 } = await query1;
    sameCityDifferentBedrooms = data1 || [];
  } else if (cityFilter) {
    // Only city filter: get same city, any bedrooms
    let query1 = supabase
      .from('property_listings')
      .select('*')
      .eq('is_approved', true)
      .eq('price_type', 'sale')
      .ilike('property_type', '%house%')
      .ilike('county', `%${countyName}%`);

    if (location.type === 'county') {
      query1 = query1.or(`city.ilike.%${cityFilter}%,address.ilike.%${cityFilter}%`);
    }

    query1 = query1
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(limit);

    const { data: data1 } = await query1;
    sameCityDifferentBedrooms = data1 || [];
  }

  return { sameCityDifferentBedrooms, sameBedroomsDifferentCity };
}

// Get related locations
async function getRelatedLocations(location: Location) {
  let query = supabase
    .from('locations')
    .select('name, slug, type, county, city')
    .eq('is_active', true);

  // Get locations in the same area
  if (location.type === 'county') {
    query = query.ilike('county', `%${location.name}%`).neq('slug', location.slug);
  } else {
    query = query.ilike('county', `%${location.county}%`).neq('slug', location.slug);
  }

  query = query.order('name').limit(50);

  const { data, error } = await query;
  if (error || !data) return [];
  return data;
}

// Generate metadata

// Get alternative properties from nearby locations
async function getAlternativeProperties(location: Location, limit: number = 8): Promise<PropertyListing[]> {
  const countyName = location.county.replace(/ County$/i, '');

  // Get properties from same county
  let query = supabase
    .from('property_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('price_type', 'sale')
    .ilike('property_type', '%house%')
    .ilike('county', `%${countyName}%`)
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(limit);

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching alternative properties:', error);
    return [];
  }

  return data || [];
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const location = await getLocation(params.location);

  if (!location) {
    return {
      title: 'Location Not Found | NewKenyan',
      description: 'The requested location could not be found.'
    };
  }

  const properties = await getHousesForSale(location, searchParams);
  const stats = calculateStats(properties);

  const metadata = generatePropertyMetadata(location, 'houses', 'sale', stats);

  // Add canonical URL if this page has a standalone equivalent
  const canonicalUrl = getFullCanonicalUrl(location.slug, 'house', 'sale');
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

export default async function HousesForSalePage({ params, searchParams }: PageProps) {
  const location = await getLocation(params.location);

  if (!location) {
    notFound();
  }

  const properties = await getHousesForSale(location, searchParams);
  const stats = calculateStats(properties);
  const relatedLocations = await getRelatedLocations(location);

  // Get smart alternatives if we have filters applied and no results
  const hasFilters = searchParams?.city || searchParams?.bedrooms;
  const smartAlternatives = (properties.length === 0 && hasFilters)
    ? await getSmartAlternatives(location, searchParams, 12)
    : { sameCityDifferentBedrooms: [], sameBedroomsDifferentCity: [] };

  // Get alternative properties if we have fewer than 3 or none
  const needsAlternatives = properties.length < 3;
  const alternativeProperties = needsAlternatives ? await getAlternativeProperties(location, 8) : [];

  // Generate unique H1 (use location ID hash for consistent variation)
  const h1VariationIndex = parseInt(location.id.slice(0, 8), 16) % 4;
  const h1 = generatePropertyH1(location, 'houses', 'sale', h1VariationIndex);
  const breadcrumbItems = generatePropertyBreadcrumbs(location, 'houses', 'sale');
  const aboutContent = generateAboutContent(location, 'houses', 'sale', stats);

  // Check for comprehensive pillar content (Cities & Counties)
  const cityPillarContent = hasPillarContent(location) ? getCityPillarContent(location.name) : null;
  const countyPillarContent = !cityPillarContent && hasCountyContent(location.name) ? getCountyContent(location.name) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />

        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{h1}</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            {aboutContent.paragraphs[0]}
          </p>
        </div>

        {/* Quick Stats */}
        {stats.totalCount > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
              <div className="text-2xl font-bold text-green-600">{stats.totalCount}</div>
              <div className="text-sm text-gray-600">Houses Available</div>
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

        {/* Property Type Switcher */}
        <PropertyTypeSwitcher
          currentPropertyType="houses"
          currentTransaction="sale"
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
            transactionType="sale"
            enableFilters={true}
          />
        ) : (
          <>
            <div className="text-center py-12 mb-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No houses for sale found {searchParams?.city ? `in ${searchParams.city}, ${location.name}` : `in ${location.name}`}
                {searchParams?.bedrooms && ` with ${searchParams.bedrooms} bedroom${parseInt(searchParams.bedrooms as string) !== 1 ? 's' : ''}`}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchParams?.city || searchParams?.bedrooms
                  ? `Try adjusting your filters or be the first to list a house ${searchParams?.city ? `in ${searchParams.city}` : `in ${location.name}`}!`
                  : `Be the first to list a house for sale in ${location.name}!`
                }
              </p>
              <a
                href="/add-listing"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                List Your Property
              </a>
            </div>

            {/* Smart Alternative 1: Same city/location, different bedrooms */}
            {smartAlternatives.sameCityDifferentBedrooms.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {searchParams?.city
                    ? `Other Houses for Sale in ${searchParams.city}`
                    : `Other Houses for Sale in ${location.name}`}
                </h2>
                <p className="text-gray-600 mb-6">
                  {searchParams?.bedrooms
                    ? `No ${searchParams.bedrooms}-bedroom houses available. Check out these other options ${searchParams?.city ? `in ${searchParams.city}` : `in ${location.name}`}:`
                    : `Available houses ${searchParams?.city ? `in ${searchParams.city}` : `in ${location.name}`}:`}
                </p>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {smartAlternatives.sameCityDifferentBedrooms.slice(0, 6).map((property) => (
                    <PropertyCard
                      key={property.id}
                      id={property.id}
                      title={property.property_title}
                      type={property.property_type}
                      price={property.price}
                      priceType={property.price_type}
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
              </div>
            )}

            {/* Smart Alternative 2: Same bedrooms, different cities in county */}
            {smartAlternatives.sameBedroomsDifferentCity.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {searchParams?.bedrooms
                    ? `${searchParams.bedrooms}-Bedroom Houses in ${location.county}`
                    : `Houses for Sale in ${location.county}`}
                </h2>
                <p className="text-gray-600 mb-6">
                  {searchParams?.bedrooms
                    ? `Check out these ${searchParams.bedrooms}-bedroom houses in other areas of ${location.county}:`
                    : `Available houses in nearby areas of ${location.county}:`}
                </p>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {smartAlternatives.sameBedroomsDifferentCity.slice(0, 6).map((property) => (
                    <PropertyCard
                      key={property.id}
                      id={property.id}
                      title={property.property_title}
                      type={property.property_type}
                      price={property.price}
                      priceType={property.price_type}
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
              </div>
            )}

            {/* Fallback: Show general alternative properties if no smart alternatives */}
            {smartAlternatives.sameCityDifferentBedrooms.length === 0 &&
             smartAlternatives.sameBedroomsDifferentCity.length === 0 &&
             alternativeProperties.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Houses for Sale in {location.county}
                </h2>
                <p className="text-gray-600 mb-6">
                  Check out these houses for sale in {location.county}
                </p>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {alternativeProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      id={property.id}
                      title={property.property_title}
                      type={property.property_type}
                      price={property.price}
                      priceType={property.price_type}
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
              </div>
            )}
          </>
        )}

        {/* Comprehensive Pillar Content for Cities & Counties */}
        {cityPillarContent ? (
          /* Major city content (Nairobi, Mombasa) */
          <div className="mb-12">
            <CityPillarContentComponent content={cityPillarContent} />
          </div>
        ) : countyPillarContent ? (
          /* County-level content for other counties */
          <div className="mb-12">
            <CountyPillarContentComponent content={countyPillarContent} />
          </div>
        ) : (
          /* Basic About Location for neighborhoods and estates */
          <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
            <h2 className="text-2xl font-bold mb-4">{aboutContent.title}</h2>
            <div className="prose max-w-none text-gray-600">
              {aboutContent.paragraphs.map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}

              {aboutContent.features.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold mt-6 mb-3">
                    Why Buy a House in {location.name}?
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
        )}

        {/* Related Locations */}
        <RelatedLocations
          currentLocation={location}
          relatedLocations={relatedLocations}
          propertyType="houses"
          transactionType="sale"
          className="mb-8"
        />

        {/* County Cross Links */}
        <CountyCrossLinks
          currentCountySlug={location.type === 'county' ? location.slug : `${location.county.toLowerCase().replace(/\s+/g, '-')}-county`}
          propertyType="houses"
          transactionType="sale"
          className="mb-8"
        />

        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generatePropertySchema(
              location,
              'houses',
              'sale',
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
