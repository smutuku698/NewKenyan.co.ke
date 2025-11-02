import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import PropertyCard from '@/components/PropertyCard';
import LocationDirectory from '@/components/LocationDirectory';
import { generateCityOverview, generateLocationFAQ, generateLocationSchema } from '@/lib/pillar-content';

const VALID_CITIES = ['nairobi', 'mombasa'];

interface CityPageProps {
  params: { city: string };
}

// Generate static params for all cities
export async function generateStaticParams() {
  return VALID_CITIES.map((city) => ({
    city: city.toLowerCase(),
  }));
}

// Fetch property stats for a city
async function getCityStats(cityName: string) {
  // Get total count
  const { count: totalProperties } = await supabase
    .from('property_listings')
    .select('*', { count: 'exact', head: true })
    .eq('city', cityName)
    .eq('is_approved', true);

  // Get price stats
  const { data: priceData } = await supabase
    .from('property_listings')
    .select('price')
    .eq('city', cityName)
    .eq('is_approved', true)
    .order('price');

  const prices = priceData?.map(p => p.price) || [];
  const averagePrice = prices.length > 0 ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 0;
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

  // Get bedroom distribution
  const { data: bedroomData } = await supabase
    .from('property_listings')
    .select('bedrooms')
    .eq('city', cityName)
    .eq('is_approved', true);

  const bedroomDistribution: Record<number, number> = {};
  bedroomData?.forEach(item => {
    if (item.bedrooms) {
      bedroomDistribution[item.bedrooms] = (bedroomDistribution[item.bedrooms] || 0) + 1;
    }
  });

  // Get property type distribution
  const { data: typeData } = await supabase
    .from('property_listings')
    .select('property_type')
    .eq('city', cityName)
    .eq('is_approved', true);

  const propertyTypes: Record<string, number> = {};
  typeData?.forEach(item => {
    propertyTypes[item.property_type] = (propertyTypes[item.property_type] || 0) + 1;
  });

  // Get popular amenities
  const { data: amenitiesData } = await supabase
    .from('property_listings')
    .select('amenities')
    .eq('city', cityName)
    .eq('is_approved', true);

  const amenityCounts: Record<string, number> = {};
  amenitiesData?.forEach(item => {
    item.amenities?.forEach((amenity: string) => {
      amenityCounts[amenity] = (amenityCounts[amenity] || 0) + 1;
    });
  });

  const popularAmenities = Object.entries(amenityCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([amenity]) => amenity);

  return {
    totalProperties: totalProperties || 0,
    averagePrice,
    minPrice,
    maxPrice,
    bedroomDistribution,
    propertyTypes,
    popularAmenities,
  };
}

// Fetch featured properties for a city
async function getFeaturedProperties(cityName: string, limit = 12) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('property_listings')
    .select('*')
    .eq('city', cityName)
    .eq('is_approved', true)
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching featured properties:', error);
    return [];
  }

  return data || [];
}

// Generate metadata
export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const cityName = params.city.charAt(0).toUpperCase() + params.city.slice(1);

  if (!VALID_CITIES.includes(params.city.toLowerCase())) {
    return {
      title: 'City Not Found',
    };
  }

  const stats = await getCityStats(cityName);

  return {
    title: `${cityName} Real Estate: ${stats.totalProperties}+ Properties for Sale & Rent in Kenya`,
    description: `Discover ${stats.totalProperties}+ properties in ${cityName}, Kenya. Houses and apartments for sale and rent from KSh ${stats.minPrice.toLocaleString()} to KSh ${stats.maxPrice.toLocaleString()}. Find your perfect home in ${cityName} today.`,
    openGraph: {
      title: `${cityName} Real Estate Market - Properties for Sale & Rent`,
      description: `Browse ${stats.totalProperties}+ verified property listings in ${cityName}. From luxury homes to affordable apartments, find your ideal property in Kenya's ${cityName === 'Nairobi' ? 'capital city' : 'coastal paradise'}.`,
      type: 'website',
    },
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const cityName = params.city.charAt(0).toUpperCase() + params.city.slice(1);

  // Validate city
  if (!VALID_CITIES.includes(params.city.toLowerCase())) {
    notFound();
  }

  // Fetch data
  const stats = await getCityStats(cityName);
  const featuredProperties = await getFeaturedProperties(cityName);
  const cityContent = generateCityOverview(cityName, stats);
  const faqs = generateLocationFAQ({ name: cityName, type: 'city' }, stats);
  const schema = generateLocationSchema({ name: cityName, type: 'city' }, stats);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-700 to-green-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {cityName} Real Estate Market
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-6">
            {stats.totalProperties.toLocaleString()}+ Properties Available for Sale & Rent
          </p>
          <div className="flex flex-wrap gap-4 text-sm md:text-base">
            <div className="bg-white/20 backdrop-blur px-6 py-3 rounded-lg">
              <div className="font-semibold">Price Range</div>
              <div>KSh {stats.minPrice.toLocaleString()} - {stats.maxPrice.toLocaleString()}</div>
            </div>
            <div className="bg-white/20 backdrop-blur px-6 py-3 rounded-lg">
              <div className="font-semibold">Average Price</div>
              <div>KSh {stats.averagePrice.toLocaleString()}</div>
            </div>
            <div className="bg-white/20 backdrop-blur px-6 py-3 rounded-lg">
              <div className="font-semibold">Property Types</div>
              <div>{Object.keys(stats.propertyTypes).length} Types Available</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Introduction */}
        <section className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Welcome to {cityName} - Your Property Search Starts Here
          </h2>
          <div className="prose max-w-none space-y-4 text-gray-700 leading-relaxed">
            <p className="text-lg">{cityContent.intro}</p>
          </div>
        </section>

        {/* Quick Links to Property Types */}
        <section className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Browse by Property Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href={`/houses-for-sale?city=${cityName}`}
              className="group bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 p-6 rounded-lg border-2 border-blue-200 transition-all"
            >
              <div className="text-4xl mb-2">🏠</div>
              <div className="font-bold text-lg text-gray-900 group-hover:text-blue-700">Houses for Sale</div>
              <div className="text-sm text-gray-600 mt-1">
                {stats.propertyTypes['House'] || 0} available
              </div>
            </Link>

            <Link
              href={`/houses-for-rent?city=${cityName}`}
              className="group bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 p-6 rounded-lg border-2 border-green-200 transition-all"
            >
              <div className="text-4xl mb-2">🏡</div>
              <div className="font-bold text-lg text-gray-900 group-hover:text-green-700">Houses for Rent</div>
              <div className="text-sm text-gray-600 mt-1">
                {stats.propertyTypes['House'] || 0} available
              </div>
            </Link>

            <Link
              href={`/apartments-for-sale?city=${cityName}`}
              className="group bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 p-6 rounded-lg border-2 border-purple-200 transition-all"
            >
              <div className="text-4xl mb-2">🏢</div>
              <div className="font-bold text-lg text-gray-900 group-hover:text-purple-700">Apartments for Sale</div>
              <div className="text-sm text-gray-600 mt-1">
                {stats.propertyTypes['Apartment'] || 0} available
              </div>
            </Link>

            <Link
              href={`/apartments-for-rent?city=${cityName}`}
              className="group bg-gradient-to-br from-pink-50 to-pink-100 hover:from-pink-100 hover:to-pink-200 p-6 rounded-lg border-2 border-pink-200 transition-all"
            >
              <div className="text-4xl mb-2">🏘️</div>
              <div className="font-bold text-lg text-gray-900 group-hover:text-pink-700">Apartments for Rent</div>
              <div className="text-sm text-gray-600 mt-1">
                {stats.propertyTypes['Apartment'] || 0} available
              </div>
            </Link>
          </div>
        </section>

        {/* Market Overview */}
        <section className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            {cityName} Property Market Overview
          </h2>
          <div className="prose max-w-none space-y-4 text-gray-700 leading-relaxed">
            <p>{cityContent.marketOverview}</p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg border">
              <div className="text-sm font-semibold text-gray-600 mb-2">Bedroom Distribution</div>
              {Object.entries(stats.bedroomDistribution)
                .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
                .map(([beds, count]) => (
                  <div key={beds} className="flex justify-between text-sm mb-1">
                    <span>{beds} Bedroom{parseInt(beds) > 1 ? 's' : ''}</span>
                    <span className="font-semibold">{count} properties</span>
                  </div>
                ))}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border">
              <div className="text-sm font-semibold text-gray-600 mb-2">Property Types</div>
              {Object.entries(stats.propertyTypes).map(([type, count]) => (
                <div key={type} className="flex justify-between text-sm mb-1">
                  <span>{type}s</span>
                  <span className="font-semibold">{count} available</span>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border">
              <div className="text-sm font-semibold text-gray-600 mb-2">Popular Amenities</div>
              {stats.popularAmenities.slice(0, 5).map((amenity) => (
                <div key={amenity} className="flex items-center text-sm mb-1">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Neighborhoods */}
        <section className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Explore {cityName} Neighborhoods
          </h2>
          <div className="prose max-w-none space-y-4 text-gray-700 leading-relaxed">
            <p>{cityContent.neighborhoods}</p>
          </div>
        </section>

        {/* Featured Properties */}
        {featuredProperties.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Featured Properties in {cityName}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProperties.slice(0, 6).map((property: any) => (
                <PropertyCard
                  key={property.id}
                  id={property.id}
                  title={property.property_title}
                  type={property.property_type}
                  price={property.price}
                  bedrooms={property.bedrooms}
                  bathrooms={property.bathrooms}
                  location={`${property.city}${property.county ? `, ${property.county}` : ''}`}
                  city={property.city}
                  images={property.images}
                  amenities={property.amenities}
                  contactPhone={property.contact_phone}
                  whatsappNumber={property.whatsapp_number}
                />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href={`/properties?city=${cityName}`}
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                View All {stats.totalProperties.toLocaleString()} Properties in {cityName}
              </Link>
            </div>
          </section>
        )}

        {/* Investment Potential */}
        <section className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-sm border border-blue-200 p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Investment Opportunities in {cityName}
          </h2>
          <div className="prose max-w-none space-y-4 text-gray-700 leading-relaxed">
            <p>{cityContent.investment}</p>
          </div>
        </section>

        {/* Lifestyle */}
        <section className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Living in {cityName}
          </h2>
          <div className="prose max-w-none space-y-4 text-gray-700 leading-relaxed">
            <p>{cityContent.lifestyle}</p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Frequently Asked Questions About {cityName} Real Estate
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b pb-4 last:border-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Location Directory */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Explore All {cityName} Areas
          </h2>
          <LocationDirectory />
        </section>
      </div>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema)
        }}
      />
    </main>
  );
}

// Enable ISR with 24-hour revalidation
export const revalidate = 86400;
