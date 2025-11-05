/**
 * Comprehensive Property Page Generator
 * Extends location-seo.ts to support ALL property types
 */

import { Metadata } from 'next';
import { Location, PropertyStats } from './location-seo';
import { PropertyTypeConfig, getPropertyTypeBySlug } from './property-types';

/**
 * Format price for display
 */
export function formatPrice(price: number): string {
  if (price >= 1000000) {
    return `${(price / 1000000).toFixed(1)}M`;
  } else if (price >= 1000) {
    return `${(price / 1000).toFixed(0)}K`;
  }
  return price.toString();
}

/**
 * Generate meta title for any property type
 */
export function generatePropertyMetaTitle(
  location: Location,
  propertyTypeSlug: string,
  transactionType: 'sale' | 'rent',
  stats?: PropertyStats
): string {
  const propertyType = getPropertyTypeBySlug(propertyTypeSlug);
  if (!propertyType) return `Properties in ${location.name}`;

  const count = stats?.totalCount || '';
  const countPrefix = count ? `${count} ` : '';
  const propertyLabel = propertyType.pluralName;
  const transactionLabel = transactionType === 'sale' ? 'Sale' : 'Rent';

  // Default templates based on location type
  switch (location.type) {
    case 'county':
      if (transactionType === 'sale') {
        return `${countPrefix}${propertyLabel} for Sale in ${location.name} County, Kenya | Buy ${propertyLabel}`;
      } else {
        return `${propertyLabel} for Rent in ${location.name} County - ${countPrefix}Verified Listings`;
      }

    case 'neighborhood':
      if (transactionType === 'sale') {
        const priceInfo = stats?.minPrice ? ` from KES ${formatPrice(stats.minPrice)}` : '';
        return `${propertyLabel} for Sale in ${location.name}, ${location.city} | ${countPrefix}Listings${priceInfo}`;
      } else {
        return `${countPrefix}${propertyLabel} for Rent in ${location.name}, ${location.city} - Available Now`;
      }

    case 'estate':
      if (transactionType === 'sale') {
        return `${countPrefix}${propertyLabel} for Sale in ${location.name}, ${location.city} | Gated Community`;
      } else {
        return `${propertyLabel} for Rent in ${location.name}, ${location.city} - Modern Living Spaces`;
      }

    default:
      return `${propertyLabel} for ${transactionLabel} in ${location.name}, Kenya`;
  }
}

/**
 * Generate meta description for any property type
 */
export function generatePropertyMetaDescription(
  location: Location,
  propertyTypeSlug: string,
  transactionType: 'sale' | 'rent',
  stats?: PropertyStats
): string {
  const propertyType = getPropertyTypeBySlug(propertyTypeSlug);
  if (!propertyType) return `Find properties in ${location.name}`;

  const count = stats?.totalCount || 0;
  const locationName = location.city ? `${location.name}, ${location.city}` : location.name;
  const propertyLabel = propertyType.pluralName.toLowerCase();

  let description = `Find ${count > 0 ? count + ' ' : ''}${propertyLabel} for ${transactionType} in ${locationName}, Kenya.`;

  // Add price range if available
  if (stats && stats.minPrice > 0 && stats.maxPrice > 0) {
    description += ` Prices from KES ${formatPrice(stats.minPrice)} to KES ${formatPrice(stats.maxPrice)}.`;
  }

  // Add bedroom info if available
  if (stats && Object.keys(stats.bedroomDistribution).length > 0) {
    const bedroomRange = `${Math.min(...Object.keys(stats.bedroomDistribution).map(Number))}-${Math.max(...Object.keys(stats.bedroomDistribution).map(Number))}`;
    description += ` ${bedroomRange} bedrooms available.`;
  }

  description += ` Verified listings with photos, prices, and direct contact details. Browse now!`;

  return description;
}

/**
 * Generate H1 heading for any property type (4 variations)
 */
export function generatePropertyH1(
  location: Location,
  propertyTypeSlug: string,
  transactionType: 'sale' | 'rent',
  variationIndex: number = 0
): string {
  const propertyType = getPropertyTypeBySlug(propertyTypeSlug);
  if (!propertyType) return `Properties in ${location.name}`;

  const propertyLabel = propertyType.pluralName;
  const transactionLabel = transactionType === 'sale' ? 'Sale' : 'Rent';
  const locationName = location.city ? `${location.name}, ${location.city}` : location.name;

  const variations = [
    `${propertyLabel} for ${transactionLabel} in ${locationName}`,
    `Find ${propertyLabel} for ${transactionLabel} in ${locationName}`,
    `${locationName}: ${propertyLabel} for ${transactionLabel}`,
    `Browse ${propertyLabel} for ${transactionLabel} in ${locationName}`,
  ];

  return variations[variationIndex % 4];
}

/**
 * Generate breadcrumbs for property pages
 */
export function generatePropertyBreadcrumbs(
  location: Location,
  propertyTypeSlug: string,
  transactionType: 'sale' | 'rent'
): Array<{ label: string; href: string }> {
  const propertyType = getPropertyTypeBySlug(propertyTypeSlug);
  if (!propertyType) return [];

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    {
      label: `${propertyType.pluralName} for ${transactionType === 'sale' ? 'Sale' : 'Rent'}`,
      href: `/${propertyTypeSlug}-for-${transactionType}`,
    },
  ];

  // Add county if neighborhood or estate
  if ((location.type === 'neighborhood' || location.type === 'estate') && location.county) {
    breadcrumbs.push({
      label: `${location.county} County`,
      href: `/${propertyTypeSlug}-for-${transactionType}/${location.county.toLowerCase().replace(/\s+/g, '-')}-county`,
    });
  }

  // Add current location
  breadcrumbs.push({
    label: location.name,
    href: `/${propertyTypeSlug}-for-${transactionType}/${location.slug}`,
  });

  return breadcrumbs;
}

/**
 * Generate Schema.org JSON-LD for property pages
 */
export function generatePropertySchema(
  location: Location,
  propertyTypeSlug: string,
  transactionType: 'sale' | 'rent',
  stats: PropertyStats,
  properties: any[]
) {
  const propertyType = getPropertyTypeBySlug(propertyTypeSlug);
  if (!propertyType) return {};

  const url = `https://newkenyan.co.ke/${propertyTypeSlug}-for-${transactionType}/${location.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: generatePropertyMetaTitle(location, propertyTypeSlug, transactionType, stats),
    description: generatePropertyMetaDescription(location, propertyTypeSlug, transactionType, stats),
    url,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: generatePropertyBreadcrumbs(location, propertyTypeSlug, transactionType).map(
        (item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.label,
          item: `https://newkenyan.co.ke${item.href}`,
        })
      ),
    },
    numberOfItems: stats.totalCount,
    about: {
      '@type': 'Place',
      name: location.name,
      address: {
        '@type': 'PostalAddress',
        addressRegion: location.county,
        addressCountry: 'KE',
      },
    },
  };
}

/**
 * Generate complete metadata for property pages
 */
export function generatePropertyMetadata(
  location: Location,
  propertyTypeSlug: string,
  transactionType: 'sale' | 'rent',
  stats?: PropertyStats
): Metadata {
  const propertyType = getPropertyTypeBySlug(propertyTypeSlug);
  if (!propertyType) {
    return {
      title: 'Properties in Kenya',
      description: 'Find properties across Kenya',
    };
  }

  const title = generatePropertyMetaTitle(location, propertyTypeSlug, transactionType, stats);
  const description = generatePropertyMetaDescription(location, propertyTypeSlug, transactionType, stats);

  return {
    title,
    description,
    keywords: [
      ...propertyType.keywords,
      ...propertyType.searchTerms,
      location.name,
      location.county,
      location.city || '',
      transactionType === 'sale' ? 'buy' : 'rent',
      'Kenya real estate',
      'verified listings',
    ].filter(Boolean),
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://newkenyan.co.ke/${propertyTypeSlug}-for-${transactionType}/${location.slug}`,
      siteName: 'NewKenyan.co.ke',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://newkenyan.co.ke/${propertyTypeSlug}-for-${transactionType}/${location.slug}`,
    },
  };
}

/**
 * Generate content for "About" section
 */
export function generateAboutContent(
  location: Location,
  propertyTypeSlug: string,
  transactionType: 'sale' | 'rent',
  stats: PropertyStats
): { title: string; paragraphs: string[]; features: string[] } {
  const propertyType = getPropertyTypeBySlug(propertyTypeSlug);
  if (!propertyType) return { title: '', paragraphs: [], features: [] };

  const propertyLabel = propertyType.pluralName.toLowerCase();
  const transactionLabel = transactionType === 'sale' ? 'buying' : 'renting';

  let features: string[] = [];

  if (location.type === 'county') {
    features = [
      `Wide selection of ${propertyLabel} across ${location.name} County`,
      `Verified listings with accurate pricing and photos`,
      `Direct contact with property owners and agents`,
      `Various residential areas catering to different budgets`,
      `Growing real estate market with strong investment potential`,
    ];
  } else if (location.type === 'neighborhood') {
    features = [
      `Convenient access to shopping centers and markets`,
      `Schools and educational institutions nearby`,
      `Good transport connectivity within ${location.city}`,
      `Modern amenities and growing community`,
      `Verified ${propertyLabel} with transparent pricing`,
    ];
  } else if (location.type === 'estate') {
    features = [
      `Gated community with 24/7 security`,
      `Well-maintained infrastructure and amenities`,
      `Family-friendly environment`,
      `Modern ${propertyLabel} with quality finishes`,
      `Active resident community`,
    ];
  }

  const paragraphs = [
    location.description ||
      `${location.name} offers excellent opportunities for ${transactionLabel} ${propertyLabel} in ${location.county}, Kenya. ` +
        `With ${stats.totalCount > 0 ? stats.totalCount + ' ' : ''}verified listings available, you'll find ${propertyLabel} ` +
        `that match your budget and lifestyle preferences.`,
  ];

  if (stats.totalCount > 0 && stats.minPrice > 0) {
    paragraphs.push(
      `${propertyType.pluralName} in ${location.name} range from KES ${formatPrice(stats.minPrice)} to KES ${formatPrice(stats.maxPrice)}, ` +
        `with an average price of KES ${formatPrice(stats.avgPrice)}. ` +
        `This variety ensures options for different budget levels and family sizes.`
    );
  }

  return {
    title: `About ${location.name}`,
    paragraphs,
    features,
  };
}
