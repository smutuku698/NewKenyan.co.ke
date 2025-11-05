import { Metadata } from 'next';

export interface PropertyData {
  id: string;
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
  created_at: string;
  updated_at?: string;
  latitude?: number | null;
  longitude?: number | null;
}

/**
 * Generate comprehensive SEO metadata for property listing
 */
export function generateEnhancedPropertyMetadata(property: PropertyData): Metadata {
  const bedroomText = property.bedrooms ? `${property.bedrooms}BR ` : '';
  const bathroomText = property.bathrooms ? `${property.bathrooms}Bath ` : '';
  const typeShort = property.property_type.replace('Apartment', 'Apt').replace('House', 'Home');

  // Generate unique title variations based on property ID hash
  const titleVariations = [
    `${bedroomText}${typeShort} for ${property.price_type} in ${property.city} | KES ${formatPrice(property.price)}`,
    `${property.property_title} - ${bedroomText}${property.city} | NewKenyan`,
    `${property.price_type}: ${bedroomText}${property.property_type} in ${property.city} from KES ${formatPrice(property.price)}`,
    `${property.city} ${property.property_type} - ${bedroomText}${bathroomText}| ${property.address}`
  ];

  const titleIndex = parseInt(property.id.slice(0, 8), 16) % titleVariations.length;
  const title = titleVariations[titleIndex];

  // Generate rich description
  const amenityText = property.amenities.length > 0
    ? `Features: ${property.amenities.slice(0, 4).join(', ')}.`
    : '';

  const furnishedText = property.is_furnished ? 'Fully furnished.' : '';
  const petsText = property.pets_allowed ? 'Pets allowed.' : '';

  const description = `${bedroomText}${bathroomText}${property.property_type} for ${property.price_type.toLowerCase()} in ${property.address}, ${property.city}. KES ${property.price.toLocaleString()}/month. ${amenityText} ${furnishedText} ${petsText} Contact: ${property.contact_phone}`.substring(0, 160);

  // Generate keywords
  const keywords = [
    `${property.property_type.toLowerCase()} for ${property.price_type.toLowerCase()} ${property.city}`,
    `${property.bedrooms} bedroom ${property.city}`,
    `houses in ${property.city}`,
    property.address,
    property.county || property.city,
    ...property.amenities.slice(0, 3),
    property.is_furnished ? 'furnished' : 'unfurnished',
    'Kenya real estate'
  ].join(', ');

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: `https://newkenyan.com/properties/${property.id}`,
      siteName: 'NewKenyan.com',
      images: property.images.length > 0 ? property.images.slice(0, 3).map(img => ({
        url: img,
        width: 1200,
        height: 630,
        alt: `${property.property_title} - ${property.city}`,
      })) : [],
      locale: 'en_KE',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: property.images.slice(0, 1),
    },
    alternates: {
      canonical: `https://newkenyan.com/properties/${property.id}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      }
    },
  };
}

/**
 * Generate unique H1 heading based on property attributes
 */
export function generatePropertyH1(property: PropertyData): string {
  const variations = [
    `${property.property_title}`,
    `${property.property_type} for ${property.price_type} in ${property.city}, ${property.county || 'Kenya'}`,
    `${property.bedrooms}BR ${property.property_type} - ${property.address}, ${property.city}`,
    `For ${property.price_type}: ${property.property_title} | ${property.city}`
  ];

  const index = parseInt(property.id.slice(0, 8), 16) % variations.length;
  return variations[index];
}

/**
 * Generate unique content sections based on property attributes
 */
export function generatePropertyContent(property: PropertyData): {
  overview: string;
  features: string[];
  location: string;
  investment: string;
} {
  const bedroomText = property.bedrooms ? `${property.bedrooms} bedroom${property.bedrooms > 1 ? 's' : ''}` : 'multiple bedrooms';
  const bathroomText = property.bathrooms ? `${property.bathrooms} bathroom${property.bathrooms > 1 ? 's' : ''}` : 'bathrooms';

  const overview = `This ${property.property_type.toLowerCase()} in ${property.address}, ${property.city} offers ${bedroomText} and ${bathroomText}${property.square_feet ? `, spanning ${property.square_feet} square feet` : ''}. ${property.is_furnished ? 'The property comes fully furnished, ready for immediate occupancy.' : 'This unfurnished property allows you to customize the space to your preferences.'} ${property.price_type === 'For Rent' ? `Available for rent at KES ${property.price.toLocaleString()} per month` : `Listed for sale at KES ${property.price.toLocaleString()}`}.`;

  const features = [];
  if (property.amenities.length > 0) {
    property.amenities.forEach(amenity => {
      features.push(`${amenity}: Enhances your living experience with modern convenience`);
    });
  }
  if (property.is_furnished) {
    features.push('Fully Furnished: Move in ready with quality furniture and appliances');
  }
  if (property.pets_allowed) {
    features.push('Pet-Friendly: Welcome your furry companions to their new home');
  }
  if (property.square_feet) {
    features.push(`Spacious ${property.square_feet} sqft: Ample room for comfortable living`);
  }

  const location = `Located in ${property.address}, ${property.city}, this property enjoys ${getLocationBenefits(property.city)}. The ${property.county || property.city} area is known for its ${getAreaCharacteristics(property.city)}, making it an ideal location for ${property.price_type === 'For Rent' ? 'renters' : 'buyers'} seeking ${getTargetAudience(property.property_type)}.`;

  const investment = property.price_type === 'For Sale'
    ? `Priced at KES ${property.price.toLocaleString()}, this ${property.property_type.toLowerCase()} represents excellent value in the ${property.city} market. ${property.county || property.city} has shown consistent property value appreciation, making this an attractive investment opportunity. The property's ${bedroomText} configuration appeals to families and professionals, ensuring strong rental potential if you choose to lease it out.`
    : `At KES ${property.price.toLocaleString()} per month, this rental offers competitive pricing for ${property.city}. The ${bedroomText} layout provides excellent value, especially considering ${property.is_furnished ? 'the furnished condition and' : ''} the amenities included. Long-term tenants will appreciate the ${getLocationBenefits(property.city)} that this location provides.`;

  return { overview, features, location, investment };
}

/**
 * Generate dynamic FAQs based on property attributes
 */
export function generatePropertyFAQs(property: PropertyData): Array<{ question: string; answer: string }> {
  const faqs = [
    {
      question: `What is included in the KES ${property.price.toLocaleString()} ${property.price_type === 'For Rent' ? 'monthly rent' : 'sale price'}?`,
      answer: `The ${property.price_type === 'For Rent' ? 'monthly rent of' : 'sale price of'} KES ${property.price.toLocaleString()} includes the ${property.bedrooms}-bedroom ${property.property_type.toLowerCase()} with ${property.bathrooms} bathroom${property.bathrooms && property.bathrooms > 1 ? 's' : ''}${property.is_furnished ? ', all furniture and appliances' : ''}. ${property.amenities.length > 0 ? `Access to amenities including ${property.amenities.slice(0, 3).join(', ')} is also included.` : ''} ${property.price_type === 'For Rent' ? 'Utilities and service charges may be additional.' : 'All fixtures and fittings are included in the sale.'}`
    },
    {
      question: `Is this ${property.property_type.toLowerCase()} in ${property.city} furnished?`,
      answer: `${property.is_furnished ? `Yes, this property comes fully furnished with quality furniture and appliances, making it move-in ready.` : `No, this property is unfurnished, giving you the freedom to furnish it according to your personal style and preferences.`} The property features ${property.bedrooms} bedroom${property.bedrooms && property.bedrooms > 1 ? 's' : ''} and ${property.bathrooms} bathroom${property.bathrooms && property.bathrooms > 1 ? 's' : ''}.`
    },
    {
      question: `What amenities are available at this property in ${property.address}?`,
      answer: `This ${property.property_type.toLowerCase()} offers ${property.amenities.length} key amenities including ${property.amenities.slice(0, 5).join(', ')}${property.amenities.length > 5 ? ', and more' : ''}. ${property.pets_allowed ? 'The property is also pet-friendly.' : ''} These features enhance your living experience and provide excellent value.`
    },
    {
      question: `How do I schedule a viewing for this ${property.bedrooms}BR ${property.property_type.toLowerCase()} in ${property.city}?`,
      answer: `To schedule a viewing, contact the property manager directly at ${property.contact_phone}${property.whatsapp_number ? ` or via WhatsApp at ${property.whatsapp_number}` : ''}. ${property.contact_email ? `You can also email ${property.contact_email}.` : ''} Viewings are available by appointment to suit your schedule.`
    },
    {
      question: `Are pets allowed in this ${property.property_type.toLowerCase()}?`,
      answer: `${property.pets_allowed ? 'Yes, this property welcomes pets! You can bring your furry companions to enjoy this home with you. Please confirm any specific pet policies or deposits with the property owner.' : 'This property does not allow pets. If you have pets, please browse our other pet-friendly listings in ' + property.city + '.'}`
    }
  ];

  // Add property-type specific FAQs
  if (property.price_type === 'For Rent' && property.available_from) {
    faqs.push({
      question: `When is this property available for move-in?`,
      answer: `This ${property.property_type.toLowerCase()} is available from ${new Date(property.available_from).toLocaleDateString()}. ${property.is_furnished ? 'As a furnished property, you can move in immediately with minimal setup.' : ''} Contact the owner to confirm availability and reserve your viewing.`
    });
  }

  if (property.square_feet) {
    faqs.push({
      question: `How large is this ${property.property_type.toLowerCase()}?`,
      answer: `This property offers ${property.square_feet} square feet of living space, providing ample room for ${property.bedrooms} bedroom${property.bedrooms && property.bedrooms > 1 ? 's' : ''} and ${property.bathrooms} bathroom${property.bathrooms && property.bathrooms > 1 ? 's' : ''}. The spacious layout is ideal for ${property.bedrooms && property.bedrooms >= 3 ? 'families' : property.bedrooms === 2 ? 'couples or small families' : 'singles or couples'}.`
    });
  }

  return faqs;
}

/**
 * Generate comprehensive Schema.org structured data
 */
export function generatePropertySchema(property: PropertyData, similarProperties?: any[]) {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": property.property_title,
    "description": property.description,
    "url": `https://newkenyan.com/properties/${property.id}`,
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
    "numberOfRooms": property.bedrooms,
    "numberOfBedrooms": property.bedrooms,
    "numberOfBathroomsTotal": property.bathrooms,
    "floorSize": property.square_feet ? {
      "@type": "QuantitativeValue",
      "value": property.square_feet,
      "unitText": "square feet"
    } : undefined,
    "amenityFeature": property.amenities.map(amenity => ({
      "@type": "LocationFeatureSpecification",
      "name": amenity,
      "value": true
    })),
    "datePosted": property.created_at,
    "availabilityStarts": property.available_from,
    "petsAllowed": property.pets_allowed,
    "furnished": property.is_furnished,
    "offers": {
      "@type": "Offer",
      "price": property.price,
      "priceCurrency": "KES",
      "availability": "https://schema.org/InStock",
      "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    },
    "provider": {
      "@type": "RealEstateAgent",
      "name": "NewKenyan.com",
      "url": "https://newkenyan.com",
      "telephone": property.contact_phone,
      "email": property.contact_email
    }
  };

  // Add geo coordinates if available
  if (property.latitude && property.longitude) {
    baseSchema["geo"] = {
      "@type": "GeoCoordinates",
      "latitude": property.latitude,
      "longitude": property.longitude
    };
  }

  return baseSchema;
}

// Helper functions
function formatPrice(price: number): string {
  if (price >= 1000000) {
    return `${(price / 1000000).toFixed(1)}M`;
  } else if (price >= 1000) {
    return `${(price / 1000).toFixed(0)}K`;
  }
  return price.toString();
}

function getLocationBenefits(city: string): string {
  const benefits: Record<string, string> = {
    'Nairobi': 'excellent connectivity to the CBD, shopping malls, international schools, and healthcare facilities',
    'Mombasa': 'proximity to beaches, the port, and vibrant coastal lifestyle amenities',
    'Kisumu': 'lakeside views, growing business district, and serene environment',
    'Nakuru': 'access to the lake, national park, and thriving agricultural economy'
  };
  return benefits[city] || 'convenient access to essential amenities, schools, and business districts';
}

function getAreaCharacteristics(city: string): string {
  const characteristics: Record<string, string> = {
    'Nairobi': 'safety, modern infrastructure, and cosmopolitan lifestyle',
    'Mombasa': 'coastal charm, cultural diversity, and tourism opportunities',
    'Kisumu': 'tranquility, lakeside beauty, and community atmosphere',
    'Nakuru': 'natural beauty, economic growth, and family-friendly environment'
  };
  return characteristics[city] || 'quality infrastructure, security, and growing property values';
}

function getTargetAudience(propertyType: string): string {
  if (propertyType.toLowerCase().includes('apartment') || propertyType.toLowerCase().includes('studio')) {
    return 'young professionals, couples, and small families';
  } else if (propertyType.toLowerCase().includes('house') || propertyType.toLowerCase().includes('villa')) {
    return 'families, executives, and those valuing space and privacy';
  } else if (propertyType.toLowerCase().includes('townhouse')) {
    return 'modern families looking for community living with privacy';
  }
  return 'discerning buyers and renters';
}
