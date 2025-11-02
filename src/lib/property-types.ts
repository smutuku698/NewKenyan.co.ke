/**
 * Comprehensive Property Type Configuration
 * Defines all property categories for SEO-optimized pages
 * Based on Kenya National Bureau of Statistics 2023-24 Real Estate Report
 */

export interface PropertyTypeConfig {
  slug: string; // URL segment
  name: string; // Display name
  pluralName: string; // Plural form
  category: 'residential' | 'commercial' | 'land';
  transactionTypes: ('sale' | 'rent')[];
  description: string;
  keywords: string[];
  searchTerms: string[]; // Common Kenyan search variations
  dbQuery: string; // Database query pattern for property_type field
  icon?: string; // Optional icon for UI
  avgYield?: number; // Average rental yield % (from KNBS report)
  marketDemand: 'very-high' | 'high' | 'medium' | 'low';
}

export const PROPERTY_TYPES: Record<string, PropertyTypeConfig> = {
  // EXISTING PROPERTY TYPES
  houses: {
    slug: 'houses',
    name: 'House',
    pluralName: 'Houses',
    category: 'residential',
    transactionTypes: ['sale', 'rent'],
    description: 'Stand-alone houses and family homes in Kenya',
    keywords: ['houses', 'family homes', 'residential houses', 'detached houses'],
    searchTerms: ['houses', 'nyumba', 'family home', 'standalone house'],
    dbQuery: '%house%',
    marketDemand: 'very-high',
  },

  apartments: {
    slug: 'apartments',
    name: 'Apartment',
    pluralName: 'Apartments',
    category: 'residential',
    transactionTypes: ['sale', 'rent'],
    description: 'Modern apartment units and flats across Kenya',
    keywords: ['apartments', 'flats', 'apartment units', 'condos'],
    searchTerms: ['apartments', 'flats', 'apartment unit', 'condo'],
    dbQuery: '%apartment%',
    avgYield: 7.5,
    marketDemand: 'very-high',
  },

  // NEW HIGH-DEMAND PROPERTY TYPES
  studioApartments: {
    slug: 'studio-apartments',
    name: 'Studio Apartment',
    pluralName: 'Studio Apartments',
    category: 'residential',
    transactionTypes: ['sale', 'rent'],
    description: 'Compact studio apartments perfect for singles and young professionals',
    keywords: ['studio apartments', 'studio flats', 'single room apartments', 'bachelor pads'],
    searchTerms: ['studio', 'studio apartment', 'single room', 'bachelor pad', 'bedsitter deluxe'],
    dbQuery: '%studio%',
    avgYield: 2.2, // KNBS 2023-24 data
    marketDemand: 'very-high',
  },

  bungalows: {
    slug: 'bungalows',
    name: 'Bungalow',
    pluralName: 'Bungalows',
    category: 'residential',
    transactionTypes: ['sale', 'rent'],
    description: 'Single-story bungalows offering comfortable living spaces',
    keywords: ['bungalows', 'single story homes', 'bungalow houses', 'one level homes'],
    searchTerms: ['bungalow', 'single storey', 'one floor house', 'bungalow house'],
    dbQuery: '%bungalow%',
    marketDemand: 'very-high',
  },

  maisonettes: {
    slug: 'maisonettes',
    name: 'Maisonette',
    pluralName: 'Maisonettes',
    category: 'residential',
    transactionTypes: ['sale', 'rent'],
    description: 'Multi-level maisonettes with modern designs in prime locations',
    keywords: ['maisonettes', 'duplex', 'multi-story homes', 'double story houses'],
    searchTerms: ['maisonette', 'duplex', 'double storey', 'two storey house'],
    dbQuery: '%maisonette%',
    marketDemand: 'very-high',
  },

  townhouses: {
    slug: 'townhouses',
    name: 'Townhouse',
    pluralName: 'Townhouses',
    category: 'residential',
    transactionTypes: ['sale', 'rent'],
    description: 'Modern townhouses offering the best investment returns in Kenya',
    keywords: ['townhouses', 'row houses', 'terraced houses', 'attached houses'],
    searchTerms: ['townhouse', 'town house', 'row house', 'terraced house'],
    dbQuery: '%townhouse%|%town house%',
    avgYield: 8.3, // HIGHEST returns per KNBS report
    marketDemand: 'very-high',
  },

  villas: {
    slug: 'villas',
    name: 'Villa',
    pluralName: 'Villas',
    category: 'residential',
    transactionTypes: ['sale', 'rent'],
    description: 'Luxury villas in exclusive neighborhoods with premium amenities',
    keywords: ['villas', 'luxury homes', 'luxury villas', 'high-end properties'],
    searchTerms: ['villa', 'luxury home', 'mansion', 'executive home'],
    dbQuery: '%villa%',
    marketDemand: 'high',
  },

  bedsitters: {
    slug: 'bedsitters',
    name: 'Bedsitter',
    pluralName: 'Bedsitters',
    category: 'residential',
    transactionTypes: ['rent'], // Typically only for rent
    description: 'Affordable bedsitters perfect for students and budget-conscious renters',
    keywords: ['bedsitters', 'single rooms', 'self-contained rooms', 'budget apartments'],
    searchTerms: ['bedsitter', 'bed sitter', 'single room', 'SQ', 'servants quarter'],
    dbQuery: '%bedsitter%|%bed sitter%|%single room%',
    avgYield: 2.2,
    marketDemand: 'very-high',
  },

  servicedApartments: {
    slug: 'serviced-apartments',
    name: 'Serviced Apartment',
    pluralName: 'Serviced Apartments',
    category: 'residential',
    transactionTypes: ['rent'], // Short-term rentals
    description: 'Fully furnished serviced apartments with hotel-like amenities',
    keywords: ['serviced apartments', 'furnished apartments', 'short-term rentals', 'airbnb'],
    searchTerms: ['serviced apartment', 'furnished apartment', 'short stay', 'airbnb'],
    dbQuery: '%serviced%|%furnished apartment%',
    marketDemand: 'high',
  },

  // COMMERCIAL PROPERTIES
  commercialProperties: {
    slug: 'commercial-properties',
    name: 'Commercial Property',
    pluralName: 'Commercial Properties',
    category: 'commercial',
    transactionTypes: ['sale', 'rent'],
    description: 'Commercial properties including offices, retail spaces, and warehouses',
    keywords: ['commercial properties', 'business properties', 'commercial real estate', 'investment properties'],
    searchTerms: ['commercial property', 'business space', 'commercial building'],
    dbQuery: '%commercial%',
    avgYield: 12.0, // Higher returns per KNBS
    marketDemand: 'high',
  },

  officeSpace: {
    slug: 'office-space',
    name: 'Office Space',
    pluralName: 'Office Spaces',
    category: 'commercial',
    transactionTypes: ['rent'], // Primarily rentals
    description: 'Professional office spaces in prime business districts',
    keywords: ['office space', 'office buildings', 'business centers', 'coworking spaces'],
    searchTerms: ['office space', 'office to let', 'office for rent', 'serviced office'],
    dbQuery: '%office%',
    avgYield: 12.0,
    marketDemand: 'high',
  },

  shops: {
    slug: 'shops',
    name: 'Shop',
    pluralName: 'Shops',
    category: 'commercial',
    transactionTypes: ['sale', 'rent'],
    description: 'Retail shops and commercial spaces for businesses',
    keywords: ['shops', 'retail spaces', 'stores', 'commercial units'],
    searchTerms: ['shop', 'retail space', 'store', 'business premises'],
    dbQuery: '%shop%|%retail%|%store%',
    marketDemand: 'high',
  },

  warehouses: {
    slug: 'warehouses',
    name: 'Warehouse',
    pluralName: 'Warehouses',
    category: 'commercial',
    transactionTypes: ['sale', 'rent'],
    description: 'Industrial warehouses and storage facilities',
    keywords: ['warehouses', 'godowns', 'storage facilities', 'industrial spaces'],
    searchTerms: ['warehouse', 'godown', 'storage space', 'industrial warehouse'],
    dbQuery: '%warehouse%|%godown%',
    marketDemand: 'medium',
  },

  // LAND
  land: {
    slug: 'land',
    name: 'Land',
    pluralName: 'Land Plots',
    category: 'land',
    transactionTypes: ['sale'], // Land is typically only for sale
    description: 'Land for sale across Kenya - residential, commercial, and agricultural plots',
    keywords: ['land for sale', 'plots', 'land parcels', 'vacant land'],
    searchTerms: ['land', 'plot', 'acre', 'shamba', 'title deed'],
    dbQuery: '%land%|%plot%',
    marketDemand: 'very-high',
  },
};

/**
 * Get property type configuration by slug
 */
export function getPropertyTypeBySlug(slug: string): PropertyTypeConfig | null {
  return Object.values(PROPERTY_TYPES).find(type => type.slug === slug) || null;
}

/**
 * Get all property types for a given transaction type
 */
export function getPropertyTypesByTransaction(transactionType: 'sale' | 'rent'): PropertyTypeConfig[] {
  return Object.values(PROPERTY_TYPES).filter(type =>
    type.transactionTypes.includes(transactionType)
  );
}

/**
 * Get property types by category
 */
export function getPropertyTypesByCategory(category: 'residential' | 'commercial' | 'land'): PropertyTypeConfig[] {
  return Object.values(PROPERTY_TYPES).filter(type => type.category === category);
}

/**
 * Generate URL for property type + location
 */
export function generatePropertyTypeUrl(
  propertyTypeSlug: string,
  transactionType: 'sale' | 'rent',
  locationSlug?: string
): string {
  const baseUrl = `/${propertyTypeSlug}-for-${transactionType}`;
  return locationSlug ? `${baseUrl}/${locationSlug}` : baseUrl;
}

/**
 * Generate all possible URLs for a location (all property types)
 */
export function generateAllPropertyTypeUrlsForLocation(locationSlug: string): Array<{
  url: string;
  type: string;
  transaction: string;
}> {
  const urls: Array<{ url: string; type: string; transaction: string }> = [];

  Object.values(PROPERTY_TYPES).forEach(propertyType => {
    propertyType.transactionTypes.forEach(transactionType => {
      urls.push({
        url: generatePropertyTypeUrl(propertyType.slug, transactionType, locationSlug),
        type: propertyType.name,
        transaction: transactionType,
      });
    });
  });

  return urls;
}

/**
 * Get human-readable label for property type + transaction
 */
export function getPropertyTypeLabel(
  propertyTypeSlug: string,
  transactionType: 'sale' | 'rent',
  plural: boolean = false
): string {
  const propertyType = getPropertyTypeBySlug(propertyTypeSlug);
  if (!propertyType) return '';

  const name = plural ? propertyType.pluralName : propertyType.name;
  const transaction = transactionType === 'sale' ? 'for Sale' : 'for Rent';

  return `${name} ${transaction}`;
}

/**
 * Get all residential property types (for navigation)
 */
export const RESIDENTIAL_PROPERTY_TYPES = [
  PROPERTY_TYPES.houses,
  PROPERTY_TYPES.apartments,
  PROPERTY_TYPES.studioApartments,
  PROPERTY_TYPES.bungalows,
  PROPERTY_TYPES.maisonettes,
  PROPERTY_TYPES.townhouses,
  PROPERTY_TYPES.villas,
  PROPERTY_TYPES.bedsitters,
  PROPERTY_TYPES.servicedApartments,
];

/**
 * Get all commercial property types (for navigation)
 */
export const COMMERCIAL_PROPERTY_TYPES = [
  PROPERTY_TYPES.commercialProperties,
  PROPERTY_TYPES.officeSpace,
  PROPERTY_TYPES.shops,
  PROPERTY_TYPES.warehouses,
];

/**
 * Get all property type slugs for route generation
 */
export function getAllPropertyTypeSlugs(): string[] {
  return Object.values(PROPERTY_TYPES).map(type => type.slug);
}

/**
 * Parse property type and transaction from URL path
 */
export function parsePropertyTypeFromPath(path: string): {
  propertyTypeSlug: string;
  transactionType: 'sale' | 'rent';
} | null {
  // Expected format: /property-type-for-sale or /property-type-for-rent
  const match = path.match(/^\/([a-z-]+)-for-(sale|rent)/);

  if (!match) return null;

  return {
    propertyTypeSlug: match[1],
    transactionType: match[2] as 'sale' | 'rent',
  };
}
