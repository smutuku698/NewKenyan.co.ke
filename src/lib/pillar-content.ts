/**
 * Dynamic Content Generation for Pillar Pages
 * This utility generates unique, multi-paragraph content for location pages
 * Uses templates with dynamic data to ensure scalability
 */

interface PropertyStats {
  totalProperties: number;
  averagePrice: number;
  minPrice: number;
  maxPrice: number;
  bedroomDistribution: Record<number, number>;
  popularAmenities: string[];
  propertyTypes: Record<string, number>;
}

interface LocationData {
  name: string;
  type: 'city' | 'county' | 'neighborhood' | 'estate';
  city?: string;
  county?: string;
  stats?: PropertyStats;
}

/**
 * City Overview Content Generator
 */
export function generateCityOverview(cityName: string, stats: PropertyStats): {
  intro: string;
  marketOverview: string;
  neighborhoods: string;
  investment: string;
  lifestyle: string;
} {
  const cityData = {
    Nairobi: {
      description: "Kenya's bustling capital and economic powerhouse",
      highlights: "vibrant business districts, world-class international schools, modern shopping malls, and diverse entertainment venues",
      growth: "5-8% annual property appreciation in prime areas",
      character: "cosmopolitan lifestyle blending African heritage with modern urban living"
    },
    Mombasa: {
      description: "Kenya's coastal gem and second-largest city",
      highlights: "pristine beaches, historic Old Town, bustling port, and tropical island lifestyle",
      growth: "steady 4-6% annual growth driven by tourism and port expansion",
      character: "relaxed beachside living with excellent business opportunities"
    }
  };

  const data = cityData[cityName as keyof typeof cityData] || {
    description: "a thriving Kenyan city",
    highlights: "quality infrastructure, growing amenities, and peaceful neighborhoods",
    growth: "consistent development and infrastructure improvements",
    character: "balanced urban living with community-focused neighborhoods"
  };

  return {
    intro: `Welcome to ${cityName}, ${data.description}. With ${stats.totalProperties.toLocaleString()}+ properties currently listed on our platform, ${cityName} offers an incredible range of real estate opportunities for both homebuyers and investors. Whether you're searching for a modern apartment in the heart of the city, a spacious family home in a quiet suburb, or a lucrative investment property, ${cityName}'s dynamic real estate market has something for everyone.`,

    marketOverview: `The ${cityName} property market is characterized by ${data.growth}. Current listings range from KSh ${stats.minPrice.toLocaleString()} to KSh ${stats.maxPrice.toLocaleString()}, with an average price of KSh ${stats.averagePrice.toLocaleString()}. The market offers diverse options including ${Object.entries(stats.propertyTypes).map(([type, count]) => `${count} ${type.toLowerCase()}s`).join(', ')}, catering to various budgets and lifestyle preferences. ${cityName} continues to attract both local and international buyers due to its ${data.highlights}.`,

    neighborhoods: `${cityName} is home to diverse neighborhoods, each with its own unique character and appeal. From upscale residential areas perfect for executives and expatriates, to family-friendly suburbs with excellent schools and parks, to vibrant mixed-use developments offering urban convenience - ${cityName} has it all. Popular areas include both well-established neighborhoods with mature infrastructure and emerging areas offering exciting investment potential. Each neighborhood provides different amenities, price points, and lifestyle options, ensuring you'll find the perfect fit for your needs.`,

    investment: `Property investment in ${cityName} offers compelling opportunities for wealth creation. The city's strong economic fundamentals, growing population, and ongoing infrastructure development create favorable conditions for long-term capital appreciation. Rental yields remain attractive, particularly in areas close to business districts, universities, and major transport hubs. ${cityName}'s status as ${cityName === 'Nairobi' ? "Kenya's economic and political capital" : "a major coastal commercial hub"} ensures consistent demand for quality housing. Smart investors are focusing on properties near planned infrastructure projects, upcoming shopping centers, and areas experiencing commercial development.`,

    lifestyle: `Living in ${cityName} means embracing ${data.character}. Residents enjoy access to ${data.highlights}. The city offers excellent healthcare facilities, from public hospitals to world-class private clinics. Educational institutions range from public schools to prestigious international academies. Entertainment options abound, including restaurants serving cuisine from around the world, cinemas, theaters, sports facilities, and nightlife venues. ${cityName} also provides easy access to nature, with parks, nature reserves, and outdoor recreational areas within reach. The city's infrastructure continues to improve, with ongoing projects enhancing roads, public transport, and utilities.`
  };
}

/**
 * County Overview Content Generator
 */
export function generateCountyOverview(countyName: string, stats: PropertyStats): {
  intro: string;
  overview: string;
  mainAreas: string;
  opportunities: string;
} {
  return {
    intro: `${countyName} is one of Kenya's ${stats.totalProperties > 100 ? 'most vibrant' : 'emerging'} real estate markets, currently offering ${stats.totalProperties.toLocaleString()}+ properties across various locations and price ranges. From ${countyName === 'Nairobi' ? 'bustling urban centers to peaceful suburban estates' : 'established towns to developing rural areas'}, this county presents diverse opportunities for homebuyers, renters, and investors alike.`,

    overview: `The property landscape in ${countyName} spans from KSh ${stats.minPrice.toLocaleString()} to KSh ${stats.maxPrice.toLocaleString()}, with properties averaging KSh ${stats.averagePrice.toLocaleString()}. This wide range ensures accessibility for first-time buyers, families upgrading their homes, and investors seeking high-value properties. The county's real estate market is characterized by ${Object.keys(stats.propertyTypes).length} distinct property types, with ${Object.entries(stats.propertyTypes).sort((a, b) => b[1] - a[1])[0]?.[0] || 'residential properties'} being particularly popular.`,

    mainAreas: `${countyName} encompasses several distinct areas, each offering unique living experiences. ${countyName === 'Nairobi' ? 'From the diplomatic quarter of Runda to the vibrant streets of Westlands, from family-friendly Karen to cosmopolitan Kilimani' : 'From established urban centers to peaceful countryside settings'}, residents can choose environments that match their lifestyle preferences. Key features that make ${countyName} attractive include excellent connectivity, growing commercial centers, quality educational institutions, and healthcare facilities. The county continues to invest in infrastructure, with ongoing road improvements, expansion of utilities, and development of community amenities.`,

    opportunities: `Property investment in ${countyName} offers strong potential for both rental income and capital appreciation. The county's ${countyName === 'Nairobi' ? 'position as the national capital' : 'strategic location and development'} drives consistent demand for quality housing. Rental markets remain robust, particularly in areas near employment hubs, universities, and transport corridors. With ${stats.propertyTypes.House || 0} houses and ${stats.propertyTypes.Apartment || 0} apartments currently available, investors have ample choice in property types and locations. Smart investment strategies include targeting areas near planned infrastructure, focusing on properties with modern amenities like ${stats.popularAmenities.slice(0, 3).join(', ')}, and considering both established and emerging locations.`
  };
}

/**
 * Neighborhood Overview Content Generator
 */
export function generateNeighborhoodOverview(
  neighborhoodName: string,
  cityName: string,
  stats: PropertyStats
): {
  intro: string;
  living: string;
  amenities: string;
  market: string;
} {
  return {
    intro: `${neighborhoodName} is ${stats.totalProperties > 50 ? 'one of the most sought-after' : 'an increasingly popular'} neighborhoods in ${cityName}, currently featuring ${stats.totalProperties.toLocaleString()}+ property listings. This ${stats.averagePrice > 100000 ? 'upscale' : stats.averagePrice > 50000 ? 'mid-range' : 'affordable'} area attracts ${stats.averagePrice > 100000 ? 'executives, diplomats, and affluent families' : stats.averagePrice > 50000 ? 'professionals, growing families, and investors' : 'first-time buyers, young professionals, and value-conscious renters'} seeking quality accommodation in ${cityName}.`,

    living: `Life in ${neighborhoodName} offers ${stats.propertyTypes.Apartment > stats.propertyTypes.House ? 'modern apartment living with minimal maintenance and excellent security' : 'spacious residential living with private outdoor spaces and family-friendly environments'}. The neighborhood is characterized by ${stats.popularAmenities.includes('24/7 Security') ? 'high security standards with gated communities and professional guard services' : 'well-maintained streets and community vigilance'}. Residents appreciate ${stats.popularAmenities.includes('Swimming Pool') || stats.popularAmenities.includes('Gym') ? 'resort-style amenities including fitness facilities and recreational areas' : 'the peaceful environment and strong sense of community'}. ${neighborhoodName} provides an ideal setting for ${Object.keys(stats.bedroomDistribution).some(k => parseInt(k) >= 3) ? 'families with children, offering space for growth and comfortable living' : 'singles and couples seeking convenient, manageable accommodation'}.`,

    amenities: `${neighborhoodName} benefits from excellent access to essential services and amenities. The area features ${stats.popularAmenities.includes('Backup Generator') ? 'reliable utilities with backup power systems ensuring uninterrupted electricity' : 'good utility infrastructure'}, ${stats.popularAmenities.includes('Parking') ? 'ample parking facilities for residents and visitors' : 'transportation connections'}. Local amenities include ${['shopping centers', 'supermarkets', 'banks', 'pharmacies'].join(', ')}, all within convenient reach. The neighborhood is well-served by ${cityName === 'Nairobi' ? 'matatus, buses, and ride-hailing services' : 'public and private transport options'}, providing easy connectivity to ${cityName}'s business districts, entertainment venues, and other key areas. ${stats.popularAmenities.includes('DSTV') || stats.popularAmenities.includes('Fibre Internet') ? 'Modern connectivity with high-speed internet and digital entertainment options is readily available' : 'Basic communication infrastructure is established'}, supporting both work-from-home professionals and digital lifestyles.`,

    market: `The property market in ${neighborhoodName} currently offers prices ranging from KSh ${stats.minPrice.toLocaleString()} to KSh ${stats.maxPrice.toLocaleString()}, with an average of KSh ${stats.averagePrice.toLocaleString()}. Available properties include ${Object.entries(stats.bedroomDistribution).map(([beds, count]) => `${count} ${beds}-bedroom unit${count > 1 ? 's' : ''}`).join(', ')}, catering to diverse household sizes and budgets. ${stats.propertyTypes.House > 0 && stats.propertyTypes.Apartment > 0 ? `Both houses (${stats.propertyTypes.House}) and apartments (${stats.propertyTypes.Apartment}) are available` : stats.propertyTypes.Apartment > stats.propertyTypes.House ? `Apartment living dominates, with ${stats.propertyTypes.Apartment} units available` : `Standalone houses are prevalent, with ${stats.propertyTypes.House} properties listed`}. The neighborhood ${stats.averagePrice > 80000 ? 'commands premium prices due to its location, amenities, and prestige' : 'offers competitive pricing, making it accessible to a broad range of buyers and renters'}. Investment potential remains ${stats.totalProperties > 30 ? 'strong, with consistent demand and good rental yields' : 'promising, as the area continues to develop and attract new residents'}.`
  };
}

/**
 * Generate FAQ content for location pages
 */
export function generateLocationFAQ(location: LocationData, stats: PropertyStats): Array<{
  question: string;
  answer: string;
}> {
  const faqs = [];

  // Price range question
  faqs.push({
    question: `What is the average property price in ${location.name}?`,
    answer: `Properties in ${location.name} range from KSh ${stats.minPrice.toLocaleString()} to KSh ${stats.maxPrice.toLocaleString()}, with an average price of KSh ${stats.averagePrice.toLocaleString()}. The exact price depends on factors such as property type (house vs apartment), number of bedrooms, location within ${location.name}, and available amenities. Currently, we have ${stats.totalProperties} properties listed, offering options for various budgets.`
  });

  // Property types question
  faqs.push({
    question: `What types of properties are available in ${location.name}?`,
    answer: `${location.name} offers diverse property options including ${Object.entries(stats.propertyTypes).map(([type, count]) => `${count} ${type.toLowerCase()}${count > 1 ? 's' : ''}`).join(', ')}. Properties range from ${Math.min(...Object.keys(stats.bedroomDistribution).map(Number))}-bedroom to ${Math.max(...Object.keys(stats.bedroomDistribution).map(Number))}-bedroom configurations. Popular amenities include ${stats.popularAmenities.slice(0, 5).join(', ')}, ensuring comfortable modern living.`
  });

  // Best areas question (for cities/counties)
  if (location.type === 'city' || location.type === 'county') {
    faqs.push({
      question: `What are the best areas to live in ${location.name}?`,
      answer: `${location.name} has several excellent residential areas, each with unique characteristics. ${location.name === 'Nairobi' ? 'Upscale areas include Karen, Runda, and Lavington, offering luxury properties and diplomatic residences. Mid-range family-friendly neighborhoods include Kilimani, Westlands, and Kileleshwa. Affordable areas include Donholm, Umoja, and Githurai.' : location.type === 'county' ? 'The county includes both urban centers and quieter suburban areas, providing options for different lifestyle preferences.' : 'Popular neighborhoods offer good access to schools, shopping centers, and transport links.'} The best area for you depends on your budget, commute requirements, and lifestyle preferences.`
    });
  }

  // Investment question
  faqs.push({
    question: `Is ${location.name} a good area for property investment?`,
    answer: `${location.name} ${stats.totalProperties > 50 ? 'presents strong investment opportunities with consistent demand' : 'offers emerging investment potential as the area develops'}. Factors supporting investment include ${location.name === 'Nairobi' || location.type === 'city' ? 'strategic location, ongoing infrastructure development, and growing population' : 'improving infrastructure and increasing commercial activity'}. Rental yields remain attractive, particularly for properties near ${location.type === 'city' ? 'business districts and universities' : 'commercial centers and transport hubs'}. ${stats.averagePrice > 100000 ? 'While entry prices are higher, capital appreciation potential is strong.' : 'Affordable entry prices make it accessible for first-time investors.'} Consider factors like planned developments, transport links, and local amenities when making investment decisions.`
  });

  // Amenities question
  if (location.type === 'neighborhood' || location.type === 'estate') {
    faqs.push({
      question: `What amenities are available in ${location.name}?`,
      answer: `${location.name} residents enjoy access to ${stats.popularAmenities.slice(0, 3).join(', ')}, and other modern conveniences. The area features ${location.type === 'estate' ? 'community amenities managed by the estate' : 'local shopping centers, supermarkets, banks, and restaurants'}. Healthcare facilities including clinics and pharmacies are readily accessible. Educational institutions from nursery to secondary level serve the area. ${location.city ? `As part of ${location.city}, residents benefit from the city's broader amenities including entertainment venues, hospitals, and recreational facilities.` : 'Transport links provide easy access to nearby commercial areas.'}`
    });
  }

  return faqs;
}

/**
 * Generate unique H1 variations to avoid duplicate content
 */
export function generateLocationH1(location: LocationData, propertyType?: string, index: number = 0): string {
  const variations = [
    `Find Your Perfect ${propertyType || 'Property'} in ${location.name}`,
    `${location.name} ${propertyType || 'Properties'}: Browse ${propertyType ? 'Listings' : 'Available Properties'} Today`,
    `${propertyType || 'Property'} ${propertyType?.includes('Sale') ? 'For Sale' : 'For Rent'} in ${location.name}, Kenya`,
    `Discover Premium ${propertyType || 'Real Estate'} in ${location.name}`
  ];

  return variations[index % variations.length];
}

/**
 * Generate Schema.org Place data for location pages
 */
export function generateLocationSchema(location: LocationData, stats: PropertyStats) {
  return {
    "@context": "https://schema.org",
    "@type": location.type === 'city' ? "City" : "Place",
    "name": location.name,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": location.city || location.name,
      "addressRegion": location.county || location.name,
      "addressCountry": "Kenya"
    },
    "geo": location.name === "Nairobi" ? {
      "@type": "GeoCoordinates",
      "latitude": -1.2921,
      "longitude": 36.8219
    } : location.name === "Mombasa" ? {
      "@type": "GeoCoordinates",
      "latitude": -4.0435,
      "longitude": 39.6682
    } : undefined,
    "containsPlace": stats.totalProperties > 0 ? {
      "@type": "ItemList",
      "numberOfItems": stats.totalProperties,
      "itemListElement": "Real estate properties"
    } : undefined
  };
}
