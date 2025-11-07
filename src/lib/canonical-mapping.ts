/**
 * Canonical URL Mapping for Standalone Pages
 *
 * Maps dynamic location pages to their canonical standalone page equivalents.
 * When a dynamic page matches a standalone page, it should include a canonical tag
 * pointing to the standalone version as the authoritative source.
 */

interface CanonicalMapping {
  slug: string;
  propertyType?: string;
  transactionType?: string;
  bedrooms?: number;
  canonicalUrl: string;
  priority: number; // Higher priority = more specific match
}

const CANONICAL_MAPPINGS: CanonicalMapping[] = [
  // Nairobi County - Apartments for Rent
  {
    slug: 'nairobi-county',
    propertyType: 'apartment',
    transactionType: 'rent',
    canonicalUrl: '/apartments-for-rent-nairobi',
    priority: 2
  },

  // Nairobi County - 2 Bedroom Apartments
  {
    slug: 'nairobi-county',
    propertyType: 'apartment',
    transactionType: 'rent',
    bedrooms: 2,
    canonicalUrl: '/2-bedroom-apartment-nairobi',
    priority: 3 // Higher priority due to more specific match
  },

  // Nairobi County - Bedsitters
  {
    slug: 'nairobi-county',
    propertyType: 'bedsitter',
    transactionType: 'rent',
    canonicalUrl: '/bedsitter-nairobi',
    priority: 2
  },

  // Nairobi County - Houses for Rent
  {
    slug: 'nairobi-county',
    propertyType: 'house',
    transactionType: 'rent',
    canonicalUrl: '/houses-for-rent-nairobi',
    priority: 2
  },

  // Westlands - Apartments
  {
    slug: 'westlands',
    propertyType: 'apartment',
    transactionType: 'rent',
    canonicalUrl: '/apartments-westlands',
    priority: 2
  },

  // Kilimani - Apartments
  {
    slug: 'kilimani',
    propertyType: 'apartment',
    transactionType: 'rent',
    canonicalUrl: '/apartments-kilimani',
    priority: 2
  },

  // Kasarani - Bedsitters
  {
    slug: 'kasarani',
    propertyType: 'bedsitter',
    transactionType: 'rent',
    canonicalUrl: '/bedsitter-kasarani',
    priority: 2
  },

  // Nairobi County - Cheap Apartments (any bedroom count under certain price)
  {
    slug: 'nairobi-county',
    propertyType: 'apartment',
    transactionType: 'rent',
    canonicalUrl: '/cheap-apartments-nairobi',
    priority: 1 // Lower priority as it's less specific
  }
];

/**
 * Get canonical URL for a dynamic location page
 *
 * @param slug - Location slug (e.g., 'nairobi-county', 'westlands')
 * @param propertyType - Type of property (e.g., 'apartment', 'house', 'bedsitter')
 * @param transactionType - Type of transaction ('rent' or 'sale')
 * @param bedrooms - Optional bedroom count for more specific matching
 * @returns Canonical URL if match found, null otherwise
 */
export function getCanonicalUrl(
  slug: string,
  propertyType: string,
  transactionType: string,
  bedrooms?: number
): string | null {
  // Normalize property type for matching
  const normalizedPropertyType = normalizePropertyType(propertyType);

  // Find all matching mappings
  const matches = CANONICAL_MAPPINGS.filter(mapping => {
    const slugMatch = mapping.slug === slug;
    const propertyMatch = !mapping.propertyType || mapping.propertyType === normalizedPropertyType;
    const transactionMatch = !mapping.transactionType || mapping.transactionType === transactionType;
    const bedroomMatch = mapping.bedrooms === undefined || mapping.bedrooms === bedrooms;

    return slugMatch && propertyMatch && transactionMatch && bedroomMatch;
  });

  if (matches.length === 0) {
    return null;
  }

  // Return the highest priority match
  matches.sort((a, b) => b.priority - a.priority);
  return matches[0].canonicalUrl;
}

/**
 * Normalize property type for consistent matching
 */
function normalizePropertyType(propertyType: string): string {
  const normalized = propertyType.toLowerCase();

  // Map variations to standard types
  if (normalized.includes('apartment') || normalized.includes('flat')) {
    return 'apartment';
  }
  if (normalized.includes('bedsitter') || normalized.includes('studio')) {
    return 'bedsitter';
  }
  if (normalized.includes('house') || normalized.includes('bungalow') ||
      normalized.includes('maisonette') || normalized.includes('townhouse') ||
      normalized.includes('villa')) {
    return 'house';
  }
  if (normalized.includes('land') || normalized.includes('plot')) {
    return 'land';
  }

  return normalized;
}

/**
 * Check if a location/property combination should use canonical
 */
export function shouldUseCanonical(
  slug: string,
  propertyType: string,
  transactionType: string,
  bedrooms?: number
): boolean {
  return getCanonicalUrl(slug, propertyType, transactionType, bedrooms) !== null;
}

/**
 * Get full canonical URL with domain
 */
export function getFullCanonicalUrl(
  slug: string,
  propertyType: string,
  transactionType: string,
  bedrooms?: number
): string | null {
  const path = getCanonicalUrl(slug, propertyType, transactionType, bedrooms);
  if (!path) return null;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://newkenyan.com';
  return `${baseUrl}${path}`;
}
