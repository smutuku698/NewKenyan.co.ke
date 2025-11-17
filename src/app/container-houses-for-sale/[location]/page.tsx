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
  searchParams: { [key: string]: string | string[] | undefined };
}

// Property type configuration
const PROPERTY_TYPE = 'container-houses';
const TRANSACTION_TYPE = 'sale';
const DB_QUERY = '%container%house%|%shipping container%|%prefab%|%modular house%';
const PROPERTY_LABEL = 'Container Houses';

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
async function getProperties(
  location: Location,
  searchParams?: { [key: string]: string | string[] | undefined }
): Promise<PropertyListing[]> {
  let query = supabase
    .from('property_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('price_type', 'sale')
    .ilike('property_type', DB_QUERY);

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
    // Filter by bedrooms
    if (searchParams.bedrooms && typeof searchParams.bedrooms === 'string') {
      const bedrooms = parseInt(searchParams.bedrooms);
      if (!isNaN(bedrooms)) {
        query = query.eq('bedrooms', bedrooms);
      }
    }

    // Filter by min price
    if (searchParams.min_price && typeof searchParams.min_price === 'string') {
      const minPrice = parseInt(searchParams.min_price);
      if (!isNaN(minPrice)) {
        query = query.gte('price', minPrice);
      }
    }

    // Filter by max price
    if (searchParams.max_price && typeof searchParams.max_price === 'string') {
      const maxPrice = parseInt(searchParams.max_price);
      if (!isNaN(maxPrice)) {
        query = query.lte('price', maxPrice);
      }
    }

    // Filter by bathrooms
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
    .limit(100); // Increase limit to show more filtered results

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
    query = query.ilike('county', `%${location.name}%`).neq('slug', location.slug);
  } else {
    query = query.ilike('county', `%${location.county}%`).neq('slug', location.slug);
  }

  query = query.order('name').limit(50);

  const { data, error } = await query;
  if (error || !data) return [];
  return data;
}


// Get smart alternative properties based on failed filters
async function getSmartAlternatives(
  location: Location,
  searchParams?: { [key: string]: string | string[] | undefined },
  limit: number = 12
): Promise<{
  sameCityDifferentBedrooms: PropertyListing[],
  sameBedroomsDifferentCity: PropertyListing[],
  differentPropertyTypes: PropertyListing[]
}> {
  const countyName = location.county.replace(/ County$/i, '');
  const cityFilter = searchParams?.city as string | undefined;
  const bedroomsFilter = searchParams?.bedrooms ? parseInt(searchParams.bedrooms as string) : undefined;

  let sameCityDifferentBedrooms: PropertyListing[] = [];
  let sameBedroomsDifferentCity: PropertyListing[] = [];
  let differentPropertyTypes: PropertyListing[] = [];

  // If we have both city and bedrooms filters, get smart alternatives
  if (cityFilter && bedroomsFilter && !isNaN(bedroomsFilter)) {
    // Query 1: Same city (or location), different bedrooms
    let query1 = supabase
      .from('property_listings')
      .select('*')
      .eq('is_approved', true)
      .eq('price_type', 'sale')
      .ilike('property_type', DB_QUERY)
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
      .ilike('property_type', DB_QUERY)
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
      .ilike('property_type', DB_QUERY)
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
      .ilike('property_type', DB_QUERY)
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

  // Query 3: Different property types in same location
  if (cityFilter || location.type !== 'county') {
    let query3 = supabase
      .from('property_listings')
      .select('*')
      .eq('is_approved', true)
      .eq('price_type', 'sale')
      .not('property_type', 'ilike', '%container%') // Different property types
      .ilike('county', `%${countyName}%`);

    if (cityFilter && location.type === 'county') {
      query3 = query3.or(`city.ilike.%${cityFilter}%,address.ilike.%${cityFilter}%`);
    } else if (location.type === 'neighborhood') {
      query3 = query3.or(`city.ilike.%${location.name}%,address.ilike.%${location.name}%`);
    }

    // Apply bedroom filter if present
    if (bedroomsFilter && !isNaN(bedroomsFilter)) {
      query3 = query3.eq('bedrooms', bedroomsFilter);
    }

    query3 = query3
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(limit);

    const { data: data3 } = await query3;
    differentPropertyTypes = data3 || [];
  }

  return { sameCityDifferentBedrooms, sameBedroomsDifferentCity, differentPropertyTypes };
}

// Get alternative properties from nearby locations
async function getAlternativeProperties(location: Location, limit: number = 8): Promise<PropertyListing[]> {
  const countyName = location.county.replace(/ County$/i, '');

  // First try: Same county, same property type
  let query = supabase
    .from('property_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('price_type', 'sale')
    .ilike('property_type', DB_QUERY)
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

// Generate metadata
export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const location = await getLocation(params.location);

  if (!location) {
    return {
      title: 'Location Not Found | NewKenyan',
      description: 'The requested location could not be found.'
    };
  }

  const properties = await getProperties(location, searchParams);
  const stats = calculateStats(properties);

  return generatePropertyMetadata(location, PROPERTY_TYPE, TRANSACTION_TYPE, stats);
}

export default async function PropertyPage({ params, searchParams }: PageProps) {
  const location = await getLocation(params.location);

  if (!location) {
    notFound();
  }

  const properties = await getProperties(location, searchParams);
  const stats = calculateStats(properties);
  const relatedLocations = await getRelatedLocations(location);

  // Get smart alternatives if we have filters applied and no results
  const hasFilters = searchParams?.city || searchParams?.bedrooms || searchParams?.property_type;
  const smartAlternatives = (properties.length === 0 && hasFilters)
    ? await getSmartAlternatives(location, searchParams, 12)
    : { sameCityDifferentBedrooms: [], sameBedroomsDifferentCity: [], differentPropertyTypes: [] };

  // Get alternative properties if we have fewer than 3 or none
  const needsAlternatives = properties.length < 3;
  const alternativeProperties = needsAlternatives ? await getAlternativeProperties(location, 8) : [];

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
              <div className="text-lg font-bold text-green-600">N/A</div>
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
            propertyType="container-house"
            transactionType={TRANSACTION_TYPE}
            enableFilters={true}
          />
        ) : (
          <>
            <div className="text-center py-12 mb-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No {PROPERTY_LABEL.toLowerCase()} for sale found {searchParams?.city ? `in ${searchParams.city}, ${location.name}` : `in ${location.name}`}
                {searchParams?.bedrooms && ` with ${searchParams.bedrooms} bedroom${parseInt(searchParams.bedrooms as string) !== 1 ? 's' : ''}`}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchParams?.city || searchParams?.bedrooms
                  ? `Try adjusting your filters or be the first to list a property ${searchParams?.city ? `in ${searchParams.city}` : `in ${location.name}`}!`
                  : `Be the first to list a property for sale in ${location.name}!`
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
                    ? `Other Container Houses for Sale in ${searchParams.city}`
                    : `Other Container Houses for Sale in ${location.name}`}
                </h2>
                <p className="text-gray-600 mb-6">
                  {searchParams?.bedrooms
                    ? `No ${searchParams.bedrooms}-bedroom properties available. Check out these other options ${searchParams?.city ? `in ${searchParams.city}` : `in ${location.name}`}:`
                    : `Available properties ${searchParams?.city ? `in ${searchParams.city}` : `in ${location.name}`}:`}
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
                    ? `${searchParams.bedrooms}-Bedroom Container Houses in ${location.county}`
                    : `Container Houses for Sale in ${location.county}`}
                </h2>
                <p className="text-gray-600 mb-6">
                  {searchParams?.bedrooms
                    ? `Check out these ${searchParams.bedrooms}-bedroom properties in other areas of ${location.county}:`
                    : `Available properties in nearby areas of ${location.county}:`}
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

            {/* Smart Alternative 3: Different property types in same location */}
            {smartAlternatives.differentPropertyTypes.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {searchParams?.city
                    ? `Other Property Types for Sale in ${searchParams.city}`
                    : `Other Property Types for Sale in ${location.name}`}
                </h2>
                <p className="text-gray-600 mb-6">
                  {searchParams?.bedrooms
                    ? `Check out these ${searchParams.bedrooms}-bedroom properties (Houses, Bungalows, Villas, etc.) ${searchParams?.city ? `in ${searchParams.city}` : `in ${location.name}`}:`
                    : `Explore other property types available ${searchParams?.city ? `in ${searchParams.city}` : `in ${location.name}`}:`}
                </p>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {smartAlternatives.differentPropertyTypes.slice(0, 6).map((property) => (
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
             smartAlternatives.differentPropertyTypes.length === 0 &&
             alternativeProperties.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Container Houses for Sale in {location.county}
                </h2>
                <p className="text-gray-600 mb-6">
                  Check out these properties for sale in {location.county}
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

        {/* Show alternative properties when we have less than 3 exact matches */}
        {properties.length > 0 && properties.length < 3 && alternativeProperties.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              More Container Houses for Sale in {location.county}
            </h2>
            <p className="text-gray-600 mb-6">
              Explore more properties for sale in nearby areas
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {alternativeProperties.filter(alt => !properties.find(p => p.id === alt.id)).slice(0, 8).map((property) => (
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
          currentCountySlug={location.type === 'county' ? location.slug : `${location.county.toLowerCase().replace(/\s+/g, '-')}-county`}
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
