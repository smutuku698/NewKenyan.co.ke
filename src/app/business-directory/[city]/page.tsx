import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import BusinessCard from '@/components/BusinessCard';
import { supabase } from '@/lib/supabase';

interface BusinessListing {
  id: string;
  business_name: string;
  category: string;
  description: string;
  address: string;
  city: string;
  phone: string;
  email: string | null;
  website: string | null;
  image_url: string | null;
  rating: number;
  review_count: number;
  is_approved: boolean;
  is_verified: boolean;
  whatsapp_number: string | null;
}

const kenyanCities = [
  'nairobi', 'mombasa', 'kisumu', 'nakuru', 'eldoret', 'thika', 'malindi', 
  'kitale', 'garissa', 'kakamega', 'machakos', 'meru', 'nyeri', 'kericho',
  'embu', 'migori', 'homa-bay', 'kilifi', 'voi', 'mumias', 'bungoma',
  'webuye', 'kapsabet', 'kapenguria', 'maralal', 'isiolo', 'marsabit',
  'mandera', 'wajir', 'lodwar', 'kitui', 'machakos', 'kajiado', 'kiambu'
];

interface PageProps {
  params: { city: string };
}

export async function generateStaticParams() {
  return kenyanCities.map((city) => ({
    city: city,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const cityName = decodeURIComponent(params.city).replace(/-/g, ' ');
  const capitalizedCity = cityName.charAt(0).toUpperCase() + cityName.slice(1);
  
  return {
    title: `Business Directory ${capitalizedCity} Kenya | Companies & Services`,
    description: `Find verified businesses, companies, and services in ${capitalizedCity}, Kenya. Browse local business directory with contact details, reviews, and locations.`,
    keywords: `business directory ${capitalizedCity}, companies ${capitalizedCity} Kenya, services ${capitalizedCity}, businesses near me ${capitalizedCity}`,
    openGraph: {
      title: `Business Directory ${capitalizedCity} Kenya`,
      description: `Discover businesses in ${capitalizedCity}, Kenya on NewKenyan.com`,
      url: `https://newkenyan.com/business-directory/${params.city}`,
    },
    alternates: {
      canonical: `https://newkenyan.com/business-directory/${params.city}`,
    },
  };
}

async function getBusinessesByCity(city: string): Promise<BusinessListing[]> {
  const cityName = decodeURIComponent(city).replace(/-/g, ' ');
  
  const { data, error } = await supabase
    .from('business_listings')
    .select('*')
    .eq('is_approved', true)
    .ilike('city', `%${cityName}%`)
    .order('is_verified', { ascending: false })
    .order('rating', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching businesses:', error);
    return [];
  }

  return data || [];
}

export default async function CityBusinessPage({ params }: PageProps) {
  const cityName = decodeURIComponent(params.city).replace(/-/g, ' ');
  const capitalizedCity = cityName.charAt(0).toUpperCase() + cityName.slice(1);
  
  // Check if it's a valid Kenyan city
  if (!kenyanCities.includes(params.city.toLowerCase())) {
    notFound();
  }

  const businesses = await getBusinessesByCity(params.city);

  const breadcrumbItems = [
    { label: 'Business Directory', href: '/business-directory' },
    { label: capitalizedCity }
  ];

  // Group businesses by category
  const businessesByCategory = businesses.reduce((acc, business) => {
    const category = business.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(business);
    return acc;
  }, {} as Record<string, BusinessListing[]>);

  const topCategories = Object.entries(businessesByCategory)
    .sort(([,a], [,b]) => b.length - a.length)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Business Directory in {capitalizedCity}, Kenya
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Discover {businesses.length} verified businesses and services in {capitalizedCity}. Find local companies, 
            restaurants, shops, professionals, and service providers with contact details and reviews.
          </p>
        </div>

        {/* Business Category Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {topCategories.map(([category, categoryBusinesses]) => (
            <div key={category} className="bg-white p-4 rounded-lg shadow-sm border text-center">
              <div className="text-2xl font-bold text-green-600">{categoryBusinesses.length}</div>
              <div className="text-sm text-gray-600">{category}</div>
            </div>
          ))}
        </div>

        {/* Featured Businesses */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Featured Businesses in {capitalizedCity}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {businesses.filter(b => b.is_verified).slice(0, 6).map((business) => (
              <BusinessCard
                key={business.id}
                id={business.id}
                name={business.business_name}
                category={business.category}
                rating={business.rating}
                reviewCount={business.review_count}
                location={business.city}
                imageUrl={business.image_url}
                isVerified={business.is_verified}
                isNew={false}
                phoneNumber={business.phone}
                whatsappNumber={business.whatsapp_number}
                description={business.description}
              />
            ))}
          </div>
        </div>

        {/* All Businesses by Category */}
        {topCategories.map(([category, categoryBusinesses]) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">
              {category} in {capitalizedCity} ({categoryBusinesses.length})
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categoryBusinesses.slice(0, 9).map((business) => (
                <BusinessCard
                  key={business.id}
                  id={business.id}
                  name={business.business_name}
                  category={business.category}
                  rating={business.rating}
                  reviewCount={business.review_count}
                  location={business.city}
                  imageUrl={business.image_url}
                  isVerified={business.is_verified}
                  isNew={false}
                  phoneNumber={business.phone}
                  whatsappNumber={business.whatsapp_number}
                  description={business.description}
                />
              ))}
            </div>
            {categoryBusinesses.length > 9 && (
              <div className="text-center mt-6">
                <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  View All {category} Businesses
                </button>
              </div>
            )}
          </div>
        ))}

        {businesses.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No businesses found in {capitalizedCity}
            </h3>
            <p className="text-gray-600 mb-6">
              Be the first to list your business in {capitalizedCity}!
            </p>
            <a
              href="/add-listing"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              List Your Business
            </a>
          </div>
        )}

        {/* City Business Information */}
        <div className="mt-12 bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Business Scene in {capitalizedCity}, Kenya</h2>
          <div className="prose max-w-none text-gray-600">
            <p>
              {capitalizedCity} hosts a thriving business community with diverse services and companies. 
              From local startups to established enterprises, the city offers numerous business opportunities 
              and services for residents and visitors.
            </p>
            <h3 className="text-lg font-semibold mt-6 mb-3">Popular Business Categories in {capitalizedCity}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {topCategories.slice(0, 8).map(([category, categoryBusinesses]) => (
                <div key={category} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium">{category}</span>
                  <span className="text-green-600 font-semibold">{categoryBusinesses.length} businesses</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Local Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": `Business Directory ${capitalizedCity}, Kenya`,
              "description": `Find businesses in ${capitalizedCity}, Kenya on NewKenyan.com`,
              "url": `https://newkenyan.com/business-directory/${params.city}`,
              "about": {
                "@type": "Place",
                "name": capitalizedCity,
                "addressRegion": "Kenya"
              },
              "mainEntity": {
                "@type": "ItemList",
                "name": `Businesses in ${capitalizedCity}`,
                "numberOfItems": businesses.length,
                "itemListElement": businesses.slice(0, 10).map((business, index) => ({
                  "@type": "LocalBusiness",
                  "position": index + 1,
                  "name": business.business_name,
                  "description": business.description,
                  "telephone": business.phone,
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": business.city,
                    "addressCountry": "KE"
                  },
                  "aggregateRating": business.review_count > 0 ? {
                    "@type": "AggregateRating",
                    "ratingValue": business.rating,
                    "reviewCount": business.review_count
                  } : undefined
                }))
              }
            })
          }}
        />
      </main>

      <Footer />
    </div>
  );
}