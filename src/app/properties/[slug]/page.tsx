import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { 
  generatePropertySlug, 
  generatePropertyMetaTags, 
  generatePropertyHeadings 
} from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import PropertyDetailClient from './PropertyDetailClient';

interface PropertyListing {
  id: string;
  created_at: string;
  property_title: string;
  property_type: string;
  description: string;
  price: number;
  price_type: string;
  bedrooms: number | null;
  bathrooms: number | null;
  square_feet: number | null;
  address: string;
  city: string;
  county: string | null;
  contact_phone: string;
  contact_email: string | null;
  whatsapp_number: string | null;
  amenities: string[];
  images: string[];
  available_from: string | null;
  is_furnished: boolean;
  pets_allowed: boolean;
  rating: number;
  review_count: number;
  is_approved: boolean;
  is_featured: boolean;
  views_count: number;
  user_id: string;
}

async function getPropertyBySlug(slug: string): Promise<PropertyListing | null> {
  try {
    // First try to get by slug, if that fails try by ID for backward compatibility
    const { data, error } = await supabase
      .from('property_listings')
      .select('*')
      .eq('is_approved', true)
      .limit(1000); // Ensure we get enough properties to find matches

    if (error || !data) return null;

    // Find property by matching slug or ID
    const property = data.find(p => {
      const expectedSlug = generatePropertySlug(
        p.property_title, 
        p.property_type, 
        p.city, 
        p.bedrooms
      );
      // Try exact slug match first, then ID fallback
      return expectedSlug === slug || p.id === slug;
    });

    // If no property found, log for debugging (only in development)
    if (!property && process.env.NODE_ENV === 'development') {
      console.log('Property not found for slug:', slug);
      console.log('Available properties:', data.map(p => ({
        id: p.id,
        title: p.property_title,
        expectedSlug: generatePropertySlug(p.property_title, p.property_type, p.city, p.bedrooms)
      })).slice(0, 3));
    }

    return property || null;
  } catch (error) {
    console.error('Error fetching property:', error);
    return null;
  }
}


interface PageProps {
  params: { slug: string };
}

// Generate static params for all approved properties
export async function generateStaticParams() {
  try {
    const { data: properties } = await supabase
      .from('property_listings')
      .select('id, property_title, property_type, city, bedrooms')
      .eq('is_approved', true)
      .limit(100); // Limit for build performance, adjust as needed

    if (!properties) return [];

    return properties.map((property) => ({
      slug: generatePropertySlug(
        property.property_title,
        property.property_type,
        property.city,
        property.bedrooms
      ),
    }));
  } catch (error) {
    console.error('Error generating static params for properties:', error);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const property = await getPropertyBySlug(resolvedParams.slug);
  
  if (!property) {
    return {
      title: 'Property Not Found | NewKenyan.com',
      description: 'The property you are looking for was not found.',
    };
  }

  const metaTags = generatePropertyMetaTags(
    property.property_title,
    property.price,
    property.city,
    property.property_type,
    property.bedrooms || undefined
  );

  const canonicalSlug = generatePropertySlug(
    property.property_title,
    property.property_type,
    property.city,
    property.bedrooms
  );

  return {
    title: metaTags.title,
    description: metaTags.description,
    keywords: metaTags.keywords,
    openGraph: {
      title: metaTags.title,
      description: metaTags.description,
      url: `https://newkenyan.com/properties/${canonicalSlug}`,
      siteName: 'NewKenyan.com',
      images: property.images.length > 0 ? [
        {
          url: property.images[0],
          width: 1200,
          height: 630,
          alt: `${property.property_title} in ${property.city}`,
        },
      ] : [],
      locale: 'en_KE',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTags.title,
      description: metaTags.description,
      images: property.images.length > 0 ? [property.images[0]] : [],
    },
    alternates: {
      canonical: `https://newkenyan.com/properties/${canonicalSlug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

async function getSimilarProperties(currentPropertyId: string, city: string, propertyType: string): Promise<PropertyListing[]> {
  try {
    const { data, error } = await supabase
      .from('property_listings')
      .select('*')
      .eq('is_approved', true)
      .neq('id', currentPropertyId)
      .ilike('city', `%${city}%`)
      .limit(3);

    if (error) {
      console.error('Error fetching similar properties:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching similar properties:', error);
    return [];
  }
}

export default async function PropertyPage({ params }: PageProps) {
  const resolvedParams = await params;
  const property = await getPropertyBySlug(resolvedParams.slug);

  if (!property) {
    notFound();
  }

  // Fetch similar properties
  const similarProperties = await getSimilarProperties(property.id, property.city, property.property_type);

  // Generate SEO-optimized headings
  const headings = generatePropertyHeadings(
    property.property_title,
    property.city,
    property.property_type,
    property.bedrooms || undefined
  );

  // Breadcrumb navigation
  const breadcrumbItems = [
    { label: 'Properties', href: '/properties' },
    { label: property.city, href: `/properties/city/${property.city.toLowerCase()}` },
    { label: property.property_title }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />
        
        {/* SEO-optimized headings */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            {headings.h1}
          </h1>
          <h2 className="text-lg text-gray-600 mb-4">
            {headings.h2}
          </h2>
        </div>

        {/* Property details component */}
        <PropertyDetailClient property={property} similarProperties={similarProperties} />

        {/* Local SEO content */}
        <div className="mt-12 bg-gray-50 p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">
            About Properties in {property.city}
          </h3>
          <div className="prose max-w-none text-gray-600">
            <p>
              {property.city} offers excellent property opportunities with this {property.property_type.toLowerCase()} 
              being a prime example. Located in {property.address}, this property provides 
              {property.bedrooms ? ` ${property.bedrooms} bedrooms` : ''} 
              {property.bathrooms ? ` and ${property.bathrooms} bathrooms` : ''} 
              for comfortable living.
            </p>
            
            {property.amenities.length > 0 && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold mb-2">Property Features:</h4>
                <ul className="list-disc pl-6">
                  {property.amenities.slice(0, 5).map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2">
                Why Choose Properties in {property.city}?
              </h4>
              <ul className="list-disc pl-6">
                <li>Strategic location with good transport links</li>
                <li>Growing property values and investment potential</li>
                <li>Access to amenities and business opportunities</li>
                <li>Safe and secure neighborhoods</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6">
            Frequently Asked Questions about {property.property_type}s in {property.city}
          </h3>
          <div className="space-y-4">
            {[
              {
                question: `What is the average rent for ${property.property_type.toLowerCase()}s in ${property.city}?`,
                answer: `Property prices in ${property.city} vary based on location, size, and amenities. This ${property.property_type.toLowerCase()} is priced at KES ${property.price.toLocaleString()} which is competitive for the area.`
              },
              {
                question: `Are there other ${property.bedrooms}-bedroom properties available in ${property.city}?`,
                answer: `Yes, we have various ${property.bedrooms}-bedroom properties available in ${property.city}. Browse our listings to find options that match your budget and preferences.`
              },
              {
                question: `How do I schedule a viewing for this property?`,
                answer: `Contact the property owner directly using the phone number or WhatsApp contact provided. They will be happy to arrange a convenient viewing time.`
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
                <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateListing",
              "name": property.property_title,
              "description": property.description,
              "url": `https://newkenyan.com/properties/${generatePropertySlug(property.property_title, property.property_type, property.city, property.bedrooms)}`,
              "image": property.images,
              "price": property.price,
              "priceCurrency": "KES",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": property.address,
                "addressLocality": property.city,
                "addressRegion": property.county || property.city,
                "addressCountry": "KE"
              },
              "geo": property.city === "Nairobi" ? {
                "@type": "GeoCoordinates",
                "latitude": -1.2921,
                "longitude": 36.8219
              } : undefined,
              "numberOfBedrooms": property.bedrooms,
              "numberOfBathroomsTotal": property.bathrooms,
              "floorSize": property.square_feet ? {
                "@type": "QuantitativeValue",
                "value": property.square_feet,
                "unitCode": "FTK"
              } : undefined,
              "amenityFeature": property.amenities.map(amenity => ({
                "@type": "LocationFeatureSpecification",
                "name": amenity
              })),
              "datePosted": property.created_at,
              "availabilityStarts": property.available_from,
              "isAccessibleForFree": false,
              "offers": {
                "@type": "Offer",
                "price": property.price,
                "priceCurrency": "KES",
                "availability": "https://schema.org/InStock"
              },
              "provider": {
                "@type": "Organization",
                "name": "NewKenyan.com",
                "url": "https://newkenyan.com"
              }
            })
          }}
        />

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": `What is the average rent for ${property.property_type.toLowerCase()}s in ${property.city}?`,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Property prices in ${property.city} vary based on location, size, and amenities. This ${property.property_type.toLowerCase()} is priced at KES ${property.price.toLocaleString()} which is competitive for the area.`
                  }
                },
                {
                  "@type": "Question", 
                  "name": `Are there other ${property.bedrooms}-bedroom properties available in ${property.city}?`,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Yes, we have various ${property.bedrooms}-bedroom properties available in ${property.city}. Browse our listings to find options that match your budget and preferences.`
                  }
                }
              ]
            })
          }}
        />
      </main>

      <Footer />
    </div>
  );
}