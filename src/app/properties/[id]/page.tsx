import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { 
  generatePropertySlug, 
  generatePropertyTitle, 
  generatePropertyDescription, 
  generatePropertyKeywords,
  getSimilarProperties
} from '@/utils/seo'
import PropertyDetailClient from './PropertyDetailClient'

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

async function getProperty(id: string): Promise<PropertyListing | null> {
  try {
    const { data, error } = await supabase
      .from('property_listings')
      .select('*')
      .eq('id', id)
      .eq('is_approved', true)
      .single()

    if (error || !data) {
      return null
    }

    return data
  } catch (error) {
    return null
  }
}

async function getSimilarPropertiesData(property: PropertyListing): Promise<PropertyListing[]> {
  try {
    const { data: allProperties } = await supabase
      .from('property_listings')
      .select('*')
      .eq('is_approved', true)
      .limit(50)

    if (!allProperties) return []

    return getSimilarProperties(allProperties, property, 6)
  } catch (error) {
    return []
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const property = await getProperty(params.id)

  if (!property) {
    return {
      title: 'Property Not Found | NewKenyan.com',
      description: 'The property you are looking for could not be found.'
    }
  }

  const seoTitle = generatePropertyTitle(property.property_title, property.city, property.price_type, property.price)
  const seoDescription = generatePropertyDescription(
    property.property_title, 
    property.property_type, 
    property.city, 
    property.bedrooms, 
    property.bathrooms, 
    property.amenities, 
    property.price_type
  )
  const seoKeywords = generatePropertyKeywords(
    property.property_type, 
    property.city, 
    property.county, 
    property.price_type, 
    property.bedrooms, 
    property.amenities
  )
  const propertySlug = generatePropertySlug(property.property_title, property.property_type, property.city, property.bedrooms)

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: 'website',
      url: `https://newkenyan.com/properties/${params.id}`,
      images: property.images?.[0] ? [property.images[0]] : [],
      siteName: 'NewKenyan.com',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: property.images?.[0] ? [property.images[0]] : [],
    },
    alternates: {
      canonical: `https://newkenyan.com/properties/${params.id}`,
    },
    other: {
      'property:price:amount': property.price.toString(),
      'property:price:currency': 'KES',
      'property:bedrooms': property.bedrooms?.toString() || '0',
      'property:bathrooms': property.bathrooms?.toString() || '0',
      'property:location': `${property.city}, Kenya`,
    }
  }
}

export default async function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = await getProperty(params.id)

  if (!property) {
    notFound()
  }

  // Get similar properties
  const similarProperties = await getSimilarPropertiesData(property)

  // Generate structured data
  const propertySlug = generatePropertySlug(property.property_title, property.property_type, property.city, property.bedrooms)
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": property.property_title,
    "description": property.description,
    "url": `https://newkenyan.com/properties/${params.id}`,
    "image": property.images || [],
    "offers": {
      "@type": "Offer",
      "price": property.price,
      "priceCurrency": "KES",
      "availability": "https://schema.org/InStock",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "price": property.price,
        "priceCurrency": "KES"
      }
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": property.address,
      "addressLocality": property.city,
      "addressRegion": property.county || property.city,
      "addressCountry": "KE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "addressCountry": "KE"
    },
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": property.square_feet,
      "unitCode": "FTK"
    },
    "numberOfRooms": property.bedrooms,
    "numberOfBathroomsTotal": property.bathrooms,
    "petsAllowed": property.pets_allowed,
    "furnished": property.is_furnished,
    "datePosted": property.created_at,
    "broker": {
      "@type": "Organization",
      "name": "NewKenyan.com",
      "url": "https://newkenyan.com"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <PropertyDetailClient 
        property={property} 
        similarProperties={similarProperties}
      />
    </>
  )
}