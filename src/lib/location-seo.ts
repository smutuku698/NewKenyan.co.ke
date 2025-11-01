import { Metadata } from 'next';

export interface Location {
  id: string;
  name: string;
  slug: string;
  type: 'county' | 'neighborhood' | 'estate';
  parent_id?: string;
  city?: string;
  county: string;
  description?: string;
  meta_content?: {
    seo_variations?: {
      title_templates?: Record<string, string>;
      h1_variations?: string[];
    };
    features?: string[];
  };
}

export interface PropertyStats {
  totalCount: number;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  bedroomDistribution: Record<number, number>;
  popularAmenities: string[];
}

export type PropertyType = 'houses' | 'apartments';
export type TransactionType = 'sale' | 'rent';

/**
 * Generate unique meta title based on location type and property details
 */
export function generateMetaTitle(
  location: Location,
  propertyType: PropertyType,
  transactionType: TransactionType,
  stats?: PropertyStats
): string {
  const propertyLabel = propertyType === 'houses' ? 'Houses' : 'Apartments';
  const transactionLabel = transactionType === 'sale' ? 'Sale' : 'Rent';
  const count = stats?.totalCount || '';
  const countPrefix = count ? `${count} ` : '';

  // Check for custom template in meta_content
  const templateKey = `${propertyType}_${transactionType}`;
  const customTemplate = location.meta_content?.seo_variations?.title_templates?.[templateKey];

  if (customTemplate) {
    return customTemplate.replace('{count}', count.toString());
  }

  // Default templates based on location type
  switch (location.type) {
    case 'county':
      if (transactionType === 'sale') {
        return `${countPrefix}${propertyLabel} for Sale in ${location.name} County, Kenya | Buy Homes in ${location.name}`;
      } else {
        return `${propertyLabel} for Rent in ${location.name} County - ${countPrefix}Rental Homes Available`;
      }

    case 'neighborhood':
      if (transactionType === 'sale') {
        const priceInfo = stats?.minPrice ? ` from KES ${formatPrice(stats.minPrice)}` : '';
        return `${propertyLabel} for Sale in ${location.name}, ${location.city} | ${countPrefix}Homes${priceInfo}`;
      } else {
        return `${countPrefix}${propertyLabel} for Rent in ${location.name}, ${location.city} - Verified Listings`;
      }

    case 'estate':
      if (transactionType === 'sale') {
        return `${countPrefix}${propertyLabel} for Sale in ${location.name}, ${location.city} | Gated Community Homes`;
      } else {
        return `${propertyLabel} for Rent in ${location.name}, ${location.city} - Family Homes & Modern Living`;
      }

    default:
      return `${propertyLabel} for ${transactionLabel} in ${location.name}, Kenya`;
  }
}

/**
 * Generate unique meta description with real property data
 */
export function generateMetaDescription(
  location: Location,
  propertyType: PropertyType,
  transactionType: TransactionType,
  stats?: PropertyStats
): string {
  const propertyLabel = propertyType === 'houses' ? 'houses' : 'apartments';
  const transactionLabel = transactionType === 'sale' ? 'sale' : 'rent';
  const count = stats?.totalCount || 0;
  const locationName = location.city ? `${location.name}, ${location.city}` : location.name;

  let description = `Find ${count > 0 ? count + ' ' : ''}${propertyLabel} for ${transactionLabel} in ${locationName}`;

  // Add price range if available
  if (stats && stats.minPrice > 0 && stats.maxPrice > 0) {
    description += `. Prices from KES ${formatPrice(stats.minPrice)} to ${formatPrice(stats.maxPrice)}`;
  }

  // Add features based on location type
  const features = location.meta_content?.features || [];
  if (features.length > 0) {
    description += `. Features include: ${features.slice(0, 3).join(', ')}`;
  }

  // Add call to action
  description += `. Verified listings with photos, floor plans, and direct contact details.`;

  return description.substring(0, 160); // Keep under 160 chars
}

/**
 * Generate unique H1 tag with rotation to avoid duplication
 */
export function generateH1(
  location: Location,
  propertyType: PropertyType,
  transactionType: TransactionType,
  variationIndex: number = 0
): string {
  const propertyLabel = propertyType === 'houses' ? 'Houses' : 'Apartments';
  const transactionLabel = transactionType === 'sale' ? 'Sale' : 'Rent';
  const locationName = location.city && location.type !== 'county'
    ? `${location.name}, ${location.city}`
    : location.name;

  // Get custom variations from meta_content
  const customVariations = location.meta_content?.seo_variations?.h1_variations || [];

  if (customVariations.length > 0) {
    const template = customVariations[variationIndex % customVariations.length];
    return template
      .replace('{propertyType}', propertyLabel)
      .replace('{transactionType}', transactionLabel);
  }

  // Default variations
  const variations = [
    `${propertyLabel} for ${transactionLabel} in ${locationName}`,
    `Find ${propertyLabel} for ${transactionLabel} in ${locationName}, Kenya`,
    `Best ${propertyLabel} for ${transactionLabel} in ${locationName}`,
    `${locationName} ${propertyLabel} for ${transactionLabel} - Verified Listings`
  ];

  return variations[variationIndex % variations.length];
}

/**
 * Generate canonical URL
 */
export function generateCanonicalUrl(
  propertyType: PropertyType,
  transactionType: TransactionType,
  locationSlug: string
): string {
  const baseUrl = 'https://newkenyan.com';
  return `${baseUrl}/${propertyType}-for-${transactionType}/${locationSlug}`;
}

/**
 * Generate complete metadata for Next.js pages
 */
export function generateLocationMetadata(
  location: Location,
  propertyType: PropertyType,
  transactionType: TransactionType,
  stats?: PropertyStats
): Metadata {
  const title = generateMetaTitle(location, propertyType, transactionType, stats);
  const description = generateMetaDescription(location, propertyType, transactionType, stats);
  const canonicalUrl = generateCanonicalUrl(propertyType, transactionType, location.slug);

  const propertyLabel = propertyType === 'houses' ? 'houses' : 'apartments';
  const transactionLabel = transactionType === 'sale' ? 'sale' : 'rent';
  const locationName = location.city ? `${location.name}, ${location.city}` : location.name;

  return {
    title,
    description,
    keywords: `${propertyLabel} for ${transactionLabel} ${location.name}, ${propertyLabel} ${location.county}, properties ${locationName}, real estate ${location.name} Kenya`,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      locale: 'en_KE',
      siteName: 'NewKenyan.com'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description
    },
    alternates: {
      canonical: canonicalUrl
    },
    robots: {
      index: location.is_active !== false,
      follow: true,
      googleBot: {
        index: location.is_active !== false,
        follow: true
      }
    }
  };
}

/**
 * Helper function to format price
 */
function formatPrice(price: number): string {
  if (price >= 1000000) {
    return `${(price / 1000000).toFixed(1)}M`;
  } else if (price >= 1000) {
    return `${(price / 1000).toFixed(0)}K`;
  }
  return price.toString();
}

/**
 * Generate breadcrumb items for location pages
 */
export function generateBreadcrumbs(
  location: Location,
  propertyType: PropertyType,
  transactionType: TransactionType
) {
  const items = [
    { label: 'Home', href: '/' },
    {
      label: `${propertyType === 'houses' ? 'Houses' : 'Apartments'} for ${transactionType === 'sale' ? 'Sale' : 'Rent'}`,
      href: `/${propertyType}-for-${transactionType}`
    }
  ];

  // Add parent location if it exists
  if (location.type !== 'county' && location.county) {
    items.push({
      label: location.county,
      href: `/${propertyType}-for-${transactionType}/${location.county.toLowerCase()}-county`
    });
  }

  // Add current location
  items.push({
    label: location.name
  });

  return items;
}

/**
 * Generate Schema.org structured data for location pages
 */
export function generateLocationSchema(
  location: Location,
  propertyType: PropertyType,
  transactionType: TransactionType,
  stats?: PropertyStats,
  properties?: any[]
) {
  const propertyLabel = propertyType === 'houses' ? 'Houses' : 'Apartments';
  const transactionLabel = transactionType === 'sale' ? 'Sale' : 'Rent';
  const canonicalUrl = generateCanonicalUrl(propertyType, transactionType, location.slug);

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${propertyLabel} for ${transactionLabel} in ${location.name}`,
    description: generateMetaDescription(location, propertyType, transactionType, stats),
    url: canonicalUrl,
    about: {
      '@type': 'Place',
      name: location.name,
      address: {
        '@type': 'PostalAddress',
        addressLocality: location.city || location.name,
        addressRegion: location.county,
        addressCountry: 'KE'
      }
    },
    mainEntity: properties && properties.length > 0 ? {
      '@type': 'ItemList',
      name: `${propertyLabel} in ${location.name}`,
      numberOfItems: properties.length,
      itemListElement: properties.slice(0, 10).map((property, index) => ({
        '@type': 'RealEstateListing',
        position: index + 1,
        name: property.property_title,
        description: property.description,
        price: property.price,
        priceCurrency: 'KES',
        address: {
          '@type': 'PostalAddress',
          streetAddress: property.address,
          addressLocality: property.city,
          addressRegion: property.county,
          addressCountry: 'KE'
        }
      }))
    } : undefined
  };
}
