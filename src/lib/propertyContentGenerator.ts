/**
 * Auto-generate comprehensive, SEO-optimized property listing content
 * Based on property data, dynamically creates unique descriptions
 */

interface PropertyData {
  property_title: string;
  property_type: string;
  bedrooms: number | null;
  bathrooms: number | null;
  square_feet: number | null;
  price: number;
  price_type: string;
  city: string;
  county: string | null;
  address: string;
  amenities: string[];
  is_furnished: boolean;
  pets_allowed: boolean;
  garage: number | null;
  year_built: number | null;
  description?: string;
}

export function generatePropertyOverview(property: PropertyData): string {
  const propertyStyle = determinePropertyStyle(property);
  const highlightFeature = getHighlightFeature(property);
  const targetAudience = getTargetAudience(property);
  const environmentDescription = getEnvironmentDescription(property.city, property.county);

  return `Welcome to ${property.property_title}, a stunning ${property.bedrooms}-bedroom ${property.property_type.toLowerCase()} located in the heart of ${property.address}, ${property.city}.

This property offers ${propertyStyle} design, ${highlightFeature}, and unmatched comfort — ideal for ${targetAudience}.

Situated in ${property.county || property.city}, residents enjoy ${environmentDescription.features} and a peaceful environment surrounded by ${environmentDescription.surroundings}.`;
}

export function generateKeyFeatures(property: PropertyData): string[] {
  const features: string[] = [];

  // Bedroom/Bathroom Configuration
  if (property.bedrooms && property.bathrooms) {
    features.push(`🛏️ ${property.bedrooms} Spacious ${property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'} with ${property.bathrooms} Modern ${property.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}`);
  }

  // Square Footage
  if (property.square_feet) {
    const sizeCategory = property.square_feet > 2000 ? 'Generous' : property.square_feet > 1000 ? 'Comfortable' : 'Cozy';
    features.push(`📐 ${sizeCategory} ${property.square_feet.toLocaleString()} Sq Ft Living Space with Open Floor Plan`);
  }

  // Kitchen (inferred)
  const hasModernKitchen = property.amenities.some(a =>
    a.toLowerCase().includes('kitchen') || a.toLowerCase().includes('modern')
  );
  if (hasModernKitchen || property.bedrooms && property.bedrooms >= 2) {
    features.push(`🍳 Modern Kitchen with Ample Storage and Counter Space`);
  }

  // Living/Dining
  if (property.bedrooms && property.bedrooms >= 2) {
    features.push(`🛋️ Bright and Airy Living Room Perfect for Entertaining`);
  }

  // Master Suite
  if (property.bedrooms && property.bedrooms >= 3) {
    features.push(`🚪 Master Bedroom with En-Suite Bathroom and Walk-in Closet`);
  }

  // Parking
  if (property.garage && property.garage > 0) {
    features.push(`🚗 ${property.garage}-Car Secure Parking Space`);
  } else if (property.amenities.some(a => a.toLowerCase().includes('parking'))) {
    features.push(`🅿️ Dedicated Parking Space Available`);
  }

  // Security
  const hasSecurity = property.amenities.some(a =>
    a.toLowerCase().includes('security') || a.toLowerCase().includes('cctv')
  );
  if (hasSecurity) {
    features.push(`🔒 24/7 Security with CCTV Surveillance and Controlled Access`);
  }

  // Outdoor Space
  const hasOutdoor = property.amenities.some(a =>
    a.toLowerCase().includes('garden') || a.toLowerCase().includes('balcony') ||
    a.toLowerCase().includes('yard') || a.toLowerCase().includes('patio')
  );
  if (hasOutdoor) {
    features.push(`🌳 Private Garden/Balcony for Outdoor Relaxation`);
  }

  // Water/Utilities
  const hasWater = property.amenities.some(a =>
    a.toLowerCase().includes('water') || a.toLowerCase().includes('borehole')
  );
  if (hasWater) {
    features.push(`💧 Reliable Water Supply with Backup Tank System`);
  }

  // Swimming Pool
  const hasPool = property.amenities.some(a => a.toLowerCase().includes('pool'));
  if (hasPool) {
    features.push(`🏊 Swimming Pool with Well-Maintained Facilities`);
  }

  // Gym
  const hasGym = property.amenities.some(a => a.toLowerCase().includes('gym'));
  if (hasGym) {
    features.push(`💪 Fully Equipped Gym and Fitness Center`);
  }

  // Year Built
  if (property.year_built && property.year_built > 2015) {
    features.push(`✨ Recently Built (${property.year_built}) with Modern Finishes`);
  }

  // If we have less than 8 features, add generic ones
  if (features.length < 8) {
    const genericFeatures = [
      `🌟 Premium Finishes Throughout with Attention to Detail`,
      `🔌 Pre-wired for Internet and Cable Television`,
      `🪟 Large Windows for Natural Light and Ventilation`,
      `🏠 Well-Maintained Property in Move-In Condition`,
      `📍 Prime Location with Easy Access to Main Roads`,
      `🚌 Close Proximity to Public Transportation`,
      `🏪 Shopping Centers and Malls Within Easy Reach`,
      `🏥 Nearby Hospitals and Healthcare Facilities`,
      `🎓 Top-Rated Schools and Educational Institutions Nearby`,
      `⚡ Reliable Electricity with Backup Generator`,
    ];

    for (const feature of genericFeatures) {
      if (features.length >= 10) break;
      if (!features.some(f => f.includes(feature.substring(2)))) {
        features.push(feature);
      }
    }
  }

  return features.slice(0, 10);
}

export function generateNeighborhood(property: PropertyData): {
  description: string;
  nearbyPlaces: string[];
  characteristics: string;
  targetAudience: string;
} {
  const cityData = getCityData(property.city);

  return {
    description: `Located in ${property.address}, one of the most sought-after areas in ${property.city}, this property offers easy access to:`,
    nearbyPlaces: cityData.nearbyPlaces,
    characteristics: cityData.characteristics,
    targetAudience: cityData.targetAudience
  };
}

export function generateWhyYouLoveit(property: PropertyData): {
  uniqueSellingPoints: string[];
  lifestyleDescription: string;
  neighborhoodCharacteristic: string;
} {
  const points: string[] = [];

  // Location USP
  points.push(`prime location in ${property.city}`);

  // Size/Space USP
  if (property.square_feet && property.square_feet > 1500) {
    points.push('spacious living areas perfect for families');
  } else if (property.bedrooms && property.bedrooms >= 3) {
    points.push('ample bedroom space for growing families');
  } else {
    points.push('efficient use of space with modern design');
  }

  // Price USP
  if (property.price_type === 'rent') {
    points.push('competitive monthly rent with excellent value');
  } else {
    points.push('attractive pricing with strong investment potential');
  }

  // Lifestyle
  const lifestyle = property.bedrooms && property.bedrooms >= 3
    ? 'comfortable family living with space to grow'
    : property.bedrooms === 2
    ? 'modern urban living with convenience'
    : 'efficient city living in a prime location';

  // Neighborhood
  const neighborhoodChar = property.city.toLowerCase().includes('nairobi')
    ? 'vibrant and well-connected'
    : property.city.toLowerCase().includes('mombasa')
    ? 'coastal and serene'
    : 'peaceful and growing';

  return {
    uniqueSellingPoints: points,
    lifestyleDescription: lifestyle,
    neighborhoodCharacteristic: neighborhoodChar
  };
}

export function generateRentalTerms(property: PropertyData): {
  securityDeposit: string;
  leaseTerms: string;
} {
  const depositMonths = property.price_type === 'rent' ? 2 : 0;
  const deposit = property.price_type === 'rent'
    ? `KSh ${(property.price * depositMonths).toLocaleString()} (${depositMonths} months' rent)`
    : 'N/A - Sale Property';

  const terms = property.price_type === 'rent'
    ? 'Minimum 12-month lease, renewable. 1-month notice required for termination.'
    : 'Cash or mortgage financing accepted. Professional legal services recommended.';

  return {
    securityDeposit: deposit,
    leaseTerms: terms
  };
}

// Helper Functions
function determinePropertyStyle(property: PropertyData): string {
  if (property.year_built && property.year_built > 2018) return 'contemporary';
  if (property.square_feet && property.square_feet > 2500) return 'luxurious';
  if (property.bedrooms && property.bedrooms >= 4) return 'spacious';
  if (property.amenities.some(a => a.toLowerCase().includes('modern'))) return 'modern';
  return 'elegant';
}

function getHighlightFeature(property: PropertyData): string {
  const hasPool = property.amenities.some(a => a.toLowerCase().includes('pool'));
  const hasGarden = property.amenities.some(a => a.toLowerCase().includes('garden'));
  const hasView = property.amenities.some(a => a.toLowerCase().includes('view'));
  const hasSecurity = property.amenities.some(a => a.toLowerCase().includes('security'));

  if (hasPool) return 'complete with a stunning swimming pool';
  if (hasView) return 'featuring breathtaking views';
  if (hasGarden) return 'surrounded by beautifully landscaped gardens';
  if (hasSecurity) return 'with top-tier security and safety features';
  if (property.square_feet && property.square_feet > 2000) return 'boasting generous living spaces';
  return 'featuring premium modern finishes throughout';
}

function getTargetAudience(property: PropertyData): string {
  if (property.bedrooms && property.bedrooms >= 4) return 'large families seeking comfort and space';
  if (property.bedrooms === 3) return 'growing families looking for the perfect home';
  if (property.bedrooms === 2) return 'young professionals or small families';
  if (property.bedrooms === 1) return 'individuals or couples seeking modern living';
  return 'discerning tenants who appreciate quality';
}

function getEnvironmentDescription(city: string, county: string | null): {
  features: string;
  surroundings: string;
} {
  // Real data for major Kenyan cities
  const cityLower = city.toLowerCase();

  if (cityLower.includes('nairobi') || cityLower.includes('westlands') || cityLower.includes('kilimani')) {
    return {
      features: 'world-class amenities, shopping malls, international schools, and vibrant nightlife',
      surroundings: 'cosmopolitan energy and modern infrastructure'
    };
  }

  if (cityLower.includes('mombasa') || cityLower.includes('nyali') || cityLower.includes('bamburi')) {
    return {
      features: 'pristine beaches, water sports facilities, and coastal dining experiences',
      surroundings: 'tropical beauty and ocean breeze'
    };
  }

  if (cityLower.includes('kisumu')) {
    return {
      features: 'lakeside views, fishing activities, and cultural attractions',
      surroundings: 'the scenic beauty of Lake Victoria'
    };
  }

  if (cityLower.includes('nakuru')) {
    return {
      features: 'access to nature reserves, flamingo viewing, and agricultural richness',
      surroundings: 'the natural beauty of the Rift Valley'
    };
  }

  if (cityLower.includes('eldoret') || cityLower.includes('uasin gishu')) {
    return {
      features: 'sporting facilities, training grounds, and agricultural markets',
      surroundings: 'the highlands and champion-producing environment'
    };
  }

  // Default for other areas
  return {
    features: 'modern amenities, schools, hospitals, and shopping centers',
    surroundings: 'a thriving community and green spaces'
  };
}

function getCityData(city: string): {
  nearbyPlaces: string[];
  characteristics: string;
  targetAudience: string;
} {
  const cityLower = city.toLowerCase();

  if (cityLower.includes('nairobi') || cityLower.includes('westlands') || cityLower.includes('kilimani')) {
    return {
      nearbyPlaces: [
        '🏪 Sarit Centre, Westgate Mall, and The Hub Karen - Premium shopping and dining',
        '🏥 Nairobi Hospital, MP Shah Hospital, and Aga Khan Hospital - World-class healthcare',
        '🎓 International School of Kenya, Brookhouse, and German School - Top international schools',
        '🚌 Matatu routes and Uber availability - Excellent public transport links',
        '🏢 Westlands Business District and Upper Hill - Major employment hubs'
      ],
      characteristics: 'cosmopolitan living, 24/7 security, and proximity to diplomatic missions',
      targetAudience: 'expatriates, professionals, and affluent families'
    };
  }

  if (cityLower.includes('mombasa')) {
    return {
      nearbyPlaces: [
        '🏖️ Nyali Beach, Bamburi Beach, and Diani Beach - Pristine white sand beaches',
        '🏪 Nyali Cinemax, City Mall, and Mombasa Marina - Shopping and entertainment',
        '🏥 Aga Khan Hospital, Coast General Hospital - Quality healthcare facilities',
        '🎓 Light Academy, Oshwal Academy - Excellent schools',
        '✈️ Moi International Airport - Easy travel access'
      ],
      characteristics: 'coastal living, warm climate, and beachfront lifestyle',
      targetAudience: 'beach lovers, expatriates, and vacation home seekers'
    };
  }

  if (cityLower.includes('kisumu')) {
    return {
      nearbyPlaces: [
        '🌊 Lake Victoria shores and waterfront - Stunning lakeside views',
        '🏪 West End Mall and Mega Plaza - Modern shopping centers',
        '🏥 Aga Khan Hospital and Kisumu County Hospital - Healthcare facilities',
        '🎓 Kisumu Girls, Kisumu Boys, and international schools',
        '🚌 Well-connected matatu and bus services'
      ],
      characteristics: 'lakeside tranquility, fishing heritage, and growing business hub',
      targetAudience: 'families, business professionals, and nature enthusiasts'
    };
  }

  // Default
  return {
    nearbyPlaces: [
      '🏪 Major shopping centers and supermarkets within 5km',
      '🏥 Hospitals and medical clinics nearby',
      '🎓 Quality primary and secondary schools in the area',
      '🚌 Good public transport connectivity',
      '🏢 Business districts and employment centers accessible'
    ],
    characteristics: 'growing infrastructure, peaceful environment, and community spirit',
    targetAudience: 'families, young professionals, and investors'
  };
}
