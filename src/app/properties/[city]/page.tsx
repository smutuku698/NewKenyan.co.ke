import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import PropertyCard from '@/components/PropertyCard';
import { supabase } from '@/lib/supabase';

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
    title: `Houses for Rent & Sale in ${capitalizedCity} Kenya | Properties`,
    description: `Find affordable houses for rent, apartments for sale, and commercial properties in ${capitalizedCity}, Kenya. Browse verified property listings with photos, prices, and contact details.`,
    keywords: `houses for rent ${capitalizedCity}, apartments for sale ${capitalizedCity}, properties ${capitalizedCity} Kenya, real estate ${capitalizedCity}`,
    openGraph: {
      title: `Houses for Rent & Sale in ${capitalizedCity} Kenya`,
      description: `Discover properties in ${capitalizedCity}, Kenya on NewKenyan.com`,
      url: `https://newkenyan.com/properties/${params.city}`,
    },
    alternates: {
      canonical: `https://newkenyan.com/properties/${params.city}`,
    },
  };
}

async function getPropertiesByCity(city: string): Promise<PropertyListing[]> {
  const cityName = decodeURIComponent(city).replace(/-/g, ' ');
  
  const { data, error } = await supabase
    .from('property_listings')
    .select('*')
    .eq('is_approved', true)
    .ilike('city', `%${cityName}%`)
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching properties:', error);
    return [];
  }

  return data || [];
}

export default async function CityPropertiesPage({ params }: PageProps) {
  const cityName = decodeURIComponent(params.city).replace(/-/g, ' ');
  const capitalizedCity = cityName.charAt(0).toUpperCase() + cityName.slice(1);
  
  // Check if it's a valid Kenyan city
  if (!kenyanCities.includes(params.city.toLowerCase())) {
    notFound();
  }

  const properties = await getPropertiesByCity(params.city);

  const breadcrumbItems = [
    { label: 'Properties', href: '/properties' },
    { label: capitalizedCity }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Houses for Rent & Sale in {capitalizedCity}, Kenya
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Discover {properties.length} property listings in {capitalizedCity}. Find affordable houses for rent, 
            apartments for sale, commercial properties, and land for sale with verified contact details.
          </p>
        </div>

        {/* Property Type Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {['House', 'Apartment', 'Commercial', 'Land'].map((type) => {
            const count = properties.filter(p => p.property_type.toLowerCase().includes(type.toLowerCase())).length;
            return (
              <div key={type} className="bg-white p-4 rounded-lg shadow-sm border text-center">
                <div className="text-2xl font-bold text-green-600">{count}</div>
                <div className="text-sm text-gray-600">{type}s</div>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Filter Properties in {capitalizedCity}</h2>
          <div className="flex flex-wrap gap-2">
            {['For Rent', 'For Sale', '1 Bedroom', '2 Bedroom', '3+ Bedroom'].map((filter) => (
              <button
                key={filter}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Properties Grid */}
        {properties.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                id={property.id}
                title={property.property_title}
                type={property.property_type}
                price={property.price}
                bedrooms={property.bedrooms || undefined}
                bathrooms={property.bathrooms || undefined}
                location={`${property.city}${property.county ? `, ${property.county}` : ''}`}
                images={property.images}
                amenities={property.amenities}
                contactPhone={property.contact_phone}
                whatsappNumber={property.whatsapp_number || undefined}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No properties found in {capitalizedCity}
            </h3>
            <p className="text-gray-600 mb-6">
              Be the first to list a property in {capitalizedCity}!
            </p>
            <a
              href="/add-listing"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              List Your Property
            </a>
          </div>
        )}

        {/* City Information */}
        <div className="mt-12 bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-4">About {capitalizedCity}, Kenya</h2>
          <div className="prose max-w-none text-gray-600">
            <p>
              {capitalizedCity} is one of Kenya's vibrant cities offering diverse property opportunities. 
              Whether you're looking for houses for rent, apartments for sale, or commercial properties, 
              {capitalizedCity} provides excellent options for residents and investors.
            </p>
            <h3 className="text-lg font-semibold mt-6 mb-3">Property Market in {capitalizedCity}</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Wide range of rental properties from budget-friendly to luxury</li>
              <li>Growing real estate market with good investment potential</li>
              <li>Various property types including residential and commercial</li>
              <li>Convenient access to amenities and transportation</li>
            </ul>
          </div>
        </div>

        {/* Local Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": `Houses for Rent & Sale in ${capitalizedCity}, Kenya`,
              "description": `Find properties in ${capitalizedCity}, Kenya on NewKenyan.com`,
              "url": `https://newkenyan.com/properties/${params.city}`,
              "about": {
                "@type": "Place",
                "name": capitalizedCity,
                "addressRegion": "Kenya"
              },
              "mainEntity": {
                "@type": "ItemList",
                "name": `Properties in ${capitalizedCity}`,
                "numberOfItems": properties.length,
                "itemListElement": properties.slice(0, 10).map((property, index) => ({
                  "@type": "RealEstateListing",
                  "position": index + 1,
                  "name": property.property_title,
                  "price": property.price,
                  "priceCurrency": "KES",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": property.city,
                    "addressCountry": "KE"
                  }
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