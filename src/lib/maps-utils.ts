/**
 * Maps Utilities - Google Maps to OpenStreetMap Conversion
 *
 * Extracts coordinates from Google Maps links and provides utilities
 * for working with maps across the application
 */

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface MapConfig {
  zoom: number;
  minZoom: number;
  maxZoom: number;
  tileUrl: string;
  attribution: string;
}

/**
 * Extract coordinates from various Google Maps URL formats
 */
export function extractGoogleMapsCoordinates(url: string): Coordinates | null {
  if (!url) return null;

  // Format 1: @lat,lng (most common)
  // Example: https://www.google.com/maps/@-1.2921,36.8219,15z
  const pattern1 = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
  const match1 = url.match(pattern1);
  if (match1) {
    return {
      lat: parseFloat(match1[1]),
      lng: parseFloat(match1[2])
    };
  }

  // Format 2: q=lat,lng
  // Example: https://www.google.com/maps?q=-1.2921,36.8219
  const pattern2 = /[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/;
  const match2 = url.match(pattern2);
  if (match2) {
    return {
      lat: parseFloat(match2[1]),
      lng: parseFloat(match2[2])
    };
  }

  // Format 3: ll=lat,lng
  // Example: https://www.google.com/maps?ll=-1.2921,36.8219
  const pattern3 = /[?&]ll=(-?\d+\.\d+),(-?\d+\.\d+)/;
  const match3 = url.match(pattern3);
  if (match3) {
    return {
      lat: parseFloat(match3[1]),
      lng: parseFloat(match3[2])
    };
  }

  // Format 4: /place/lat,lng
  // Example: https://www.google.com/maps/place/-1.2921,36.8219
  const pattern4 = /\/place\/(-?\d+\.\d+),(-?\d+\.\d+)/;
  const match4 = url.match(pattern4);
  if (match4) {
    return {
      lat: parseFloat(match4[1]),
      lng: parseFloat(match4[2])
    };
  }

  // Format 5: !3d (latitude) !4d (longitude) - Google Maps share links
  // Example: https://www.google.com/maps/place/...!3d-1.2921!4d36.8219
  const pattern5 = /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/;
  const match5 = url.match(pattern5);
  if (match5) {
    return {
      lat: parseFloat(match5[1]),
      lng: parseFloat(match5[2])
    };
  }

  return null;
}

/**
 * Get optimal zoom level based on location precision
 */
export function getOptimalZoom(isExactLocation: boolean, locationType?: 'property' | 'business' | 'neighborhood' | 'city'): number {
  if (isExactLocation) {
    return 17; // Very close zoom for exact locations (clear building details)
  }

  switch (locationType) {
    case 'property':
    case 'business':
      return 15; // Close zoom for approximate property/business locations
    case 'neighborhood':
      return 14; // Medium zoom for neighborhood areas
    case 'city':
      return 12; // Wider zoom for city-level locations
    default:
      return 13; // Default zoom
  }
}

/**
 * Get professional map configuration with clear, crisp tiles
 */
export function getMapConfig(useHighDPI: boolean = true): MapConfig {
  return {
    zoom: 15,
    minZoom: 10,
    maxZoom: 19,
    // Use high-DPI tiles for crisp, professional appearance
    tileUrl: useHighDPI
      ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  };
}

/**
 * Get alternative high-quality map tile providers
 */
export function getAlternativeTileProviders() {
  return {
    // Standard OpenStreetMap (default, good quality)
    osm: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    },

    // CartoDB Positron (clean, minimal, professional)
    cartodbPositron: {
      url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 19,
      subdomains: 'abcd'
    },

    // CartoDB Voyager (colorful, modern)
    cartodbVoyager: {
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 19,
      subdomains: 'abcd'
    }
  };
}

/**
 * Validate coordinates are within Kenya bounds
 */
export function isWithinKenyaBounds(coords: Coordinates): boolean {
  // Kenya's approximate bounding box
  const kenyaBounds = {
    north: 5.0,
    south: -4.7,
    east: 41.9,
    west: 33.9
  };

  return (
    coords.lat >= kenyaBounds.south &&
    coords.lat <= kenyaBounds.north &&
    coords.lng >= kenyaBounds.west &&
    coords.lng <= kenyaBounds.east
  );
}

/**
 * Get coordinates for major Kenyan cities
 */
export function getCityCoordinates(city: string): Coordinates {
  const cityCoords: Record<string, Coordinates> = {
    'nairobi': { lat: -1.2921, lng: 36.8219 },
    'mombasa': { lat: -4.0435, lng: 39.6682 },
    'kisumu': { lat: -0.0917, lng: 34.7680 },
    'nakuru': { lat: -0.3031, lng: 36.0800 },
    'eldoret': { lat: 0.5143, lng: 35.2698 },
    'thika': { lat: -1.0332, lng: 37.0689 },
    'malindi': { lat: -3.2167, lng: 40.1167 },
    'kisii': { lat: -0.6817, lng: 34.7680 },
    'kakamega': { lat: 0.2827, lng: 34.7519 },
    'kiambu': { lat: -1.1714, lng: 36.8356 },
    'kitale': { lat: 1.0167, lng: 35.0062 },
    'machakos': { lat: -1.5177, lng: 37.2634 },
    'meru': { lat: 0.0469, lng: 37.6556 },
    'nyeri': { lat: -0.4197, lng: 36.9478 },
    'nanyuki': { lat: 0.0167, lng: 37.0739 },
    'voi': { lat: -3.3965, lng: 38.5598 },
    'kilifi': { lat: -3.6305, lng: 39.8492 },
    'kericho': { lat: -0.3676, lng: 35.2839 },
    'bungoma': { lat: 0.5635, lng: 34.5609 },
    'garissa': { lat: -0.4536, lng: 39.6401 }
  };

  const normalizedCity = city.toLowerCase().trim();
  return cityCoords[normalizedCity] || cityCoords['nairobi'];
}

/**
 * Get approximate coordinates based on Nairobi neighborhoods
 */
export function getNairobiNeighborhoodCoords(address: string): Coordinates | null {
  const neighborhoods: Record<string, Coordinates> = {
    'westlands': { lat: -1.2676, lng: 36.8070 },
    'kilimani': { lat: -1.2905, lng: 36.7878 },
    'kileleshwa': { lat: -1.2892, lng: 36.7838 },
    'karen': { lat: -1.3197, lng: 36.7070 },
    'lavington': { lat: -1.2829, lng: 36.7693 },
    'parklands': { lat: -1.2642, lng: 36.8206 },
    'riverside': { lat: -1.2692, lng: 36.8089 },
    'upperhill': { lat: -1.2896, lng: 36.8186 },
    'embakasi': { lat: -1.3193, lng: 36.8964 },
    'kasarani': { lat: -1.2186, lng: 36.8987 },
    'kahawa': { lat: -1.1801, lng: 36.9275 },
    'ruaka': { lat: -1.2087, lng: 36.8448 },
    'ngong': { lat: -1.3524, lng: 36.6664 },
    'kitisuru': { lat: -1.2403, lng: 36.8005 },
    'runda': { lat: -1.2229, lng: 36.7905 },
    'muthaiga': { lat: -1.2485, lng: 36.8234 },
    'spring valley': { lat: -1.2702, lng: 36.7837 },
    'woodley': { lat: -1.3033, lng: 36.7845 },
    'south c': { lat: -1.3116, lng: 36.8281 },
    'south b': { lat: -1.3069, lng: 36.8353 },
    'buruburu': { lat: -1.2863, lng: 36.8842 },
    'donholm': { lat: -1.2807, lng: 36.8917 },
    'umoja': { lat: -1.2781, lng: 36.8989 },
    'kayole': { lat: -1.2738, lng: 36.9191 },
    'njiru': { lat: -1.2638, lng: 36.9264 },
    'zimmerman': { lat: -1.2114, lng: 36.8823 },
    'roysambu': { lat: -1.2249, lng: 36.8738 },
    'syokimau': { lat: -1.3514, lng: 36.9123 },
    'rongai': { lat: -1.3933, lng: 36.7523 },
    'mlolongo': { lat: -1.3773, lng: 36.9497 },
    'utawala': { lat: -1.2965, lng: 36.9567 },
    'ruiru': { lat: -1.1461, lng: 36.9616 },
    'juja': { lat: -1.0961, lng: 37.0125 }
  };

  const lowerAddress = address.toLowerCase();
  for (const [neighborhood, coords] of Object.entries(neighborhoods)) {
    if (lowerAddress.includes(neighborhood)) {
      return coords;
    }
  }
  return null;
}

/**
 * Generate OpenStreetMap URL from coordinates
 */
export function generateOSMUrl(coords: Coordinates, zoom: number = 15): string {
  return `https://www.openstreetmap.org/?mlat=${coords.lat}&mlon=${coords.lng}#map=${zoom}/${coords.lat}/${coords.lng}`;
}

/**
 * Generate Google Maps URL from coordinates
 */
export function generateGoogleMapsUrl(coords: Coordinates, query?: string): string {
  if (query) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}&query_place_id=${coords.lat},${coords.lng}`;
  }
  return `https://www.google.com/maps/@${coords.lat},${coords.lng},15z`;
}
