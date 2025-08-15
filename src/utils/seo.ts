// SEO utilities for generating optimized URLs and metadata

export function generatePropertySlug(
  propertyTitle: string,
  propertyType: string,
  city: string,
  bedrooms?: number | null
): string {
  // Combine title elements for comprehensive slug
  const elements = [];
  
  // Add bedrooms if available
  if (bedrooms && bedrooms > 0) {
    elements.push(`${bedrooms}-bedroom`);
  }
  
  // Add property type
  elements.push(propertyType.toLowerCase());
  
  // Add location
  elements.push(city.toLowerCase());
  
  // Add key parts of title (remove price and common words)
  const titleWords = propertyTitle
    .toLowerCase()
    .replace(/ksh\s*\d+[,\d]*(\.\d+)?/g, '') // Remove price
    .replace(/\b(for|rent|sale|available|modern|spacious|beautiful|excellent)\b/g, '') // Remove common words
    .split(/\s+/)
    .filter(word => word.length > 2)
    .slice(0, 3); // Take first 3 meaningful words
  
  elements.push(...titleWords);
  
  // Create slug
  const slug = elements
    .join(' ')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  
  return slug;
}

export function generatePropertyTitle(
  propertyTitle: string,
  city: string,
  priceType: string,
  price: number
): string {
  const action = priceType === 'rent' ? 'for Rent' : 'for Sale';
  const formattedPrice = `KSh ${price.toLocaleString()}`;
  
  return `${propertyTitle} ${action} in ${city} - ${formattedPrice} | NewKenyan.com`;
}

export function generatePropertyDescription(
  propertyTitle: string,
  propertyType: string,
  city: string,
  bedrooms?: number | null,
  bathrooms?: number | null,
  amenities?: string[],
  priceType?: string
): string {
  const action = priceType === 'rent' ? 'for rent' : 'for sale';
  const bedroomText = bedrooms ? `${bedrooms} bedroom ` : '';
  const bathroomText = bathrooms ? `${bathrooms} bathroom ` : '';
  const amenityText = amenities && amenities.length > 0 
    ? `. Features: ${amenities.slice(0, 3).join(', ')}`
    : '';
  
  return `Find ${bedroomText}${bathroomText}${propertyType.toLowerCase()} ${action} in ${city}. ${propertyTitle}${amenityText}. Contact property owner directly for viewing and details.`;
}

export function generatePropertyKeywords(
  propertyType: string,
  city: string,
  county: string | null,
  priceType: string,
  bedrooms?: number | null,
  amenities?: string[]
): string {
  const keywords = [];
  
  // Core property keywords
  const action = priceType === 'rent' ? 'for rent' : 'for sale';
  keywords.push(`${propertyType.toLowerCase()} ${action}`);
  keywords.push(`${propertyType.toLowerCase()} ${city.toLowerCase()}`);
  
  // Location keywords
  keywords.push(`property ${city.toLowerCase()}`);
  keywords.push(`${action} ${city.toLowerCase()}`);
  if (county) {
    keywords.push(`property ${county.toLowerCase()}`);
  }
  
  // Bedroom keywords
  if (bedrooms && bedrooms > 0) {
    keywords.push(`${bedrooms} bedroom ${propertyType.toLowerCase()}`);
    keywords.push(`${bedrooms} bedroom ${action}`);
  }
  
  // Amenity-based keywords
  if (amenities && amenities.length > 0) {
    amenities.slice(0, 3).forEach(amenity => {
      keywords.push(`${amenity} ${propertyType.toLowerCase()}`);
    });
  }
  
  // General Kenya property keywords
  keywords.push('kenya property', 'nairobi property', 'property kenya');
  
  return keywords.join(', ');
}

export function getRandomProperties<T extends { id: string }>(
  allProperties: T[],
  currentPropertyId: string,
  count: number = 6
): T[] {
  const otherProperties = allProperties.filter(p => p.id !== currentPropertyId);
  const shuffled = [...otherProperties].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function getSimilarProperties<T extends { 
  id: string; 
  city: string; 
  property_type: string; 
  price: number; 
  bedrooms?: number | null;
}>(
  allProperties: T[],
  currentProperty: T,
  count: number = 6
): T[] {
  const otherProperties = allProperties.filter(p => p.id !== currentProperty.id);
  
  // Score properties by similarity
  const scoredProperties = otherProperties.map(property => {
    let score = 0;
    
    // Same city (high weight)
    if (property.city.toLowerCase() === currentProperty.city.toLowerCase()) {
      score += 10;
    }
    
    // Same property type
    if (property.property_type === currentProperty.property_type) {
      score += 8;
    }
    
    // Similar bedrooms
    if (property.bedrooms === currentProperty.bedrooms) {
      score += 5;
    }
    
    // Similar price range (within 30%)
    const priceDiff = Math.abs(property.price - currentProperty.price) / currentProperty.price;
    if (priceDiff <= 0.3) {
      score += 6;
    } else if (priceDiff <= 0.5) {
      score += 3;
    }
    
    return { property, score };
  });
  
  // Sort by score and return top properties
  return scoredProperties
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(item => item.property);
}

// Business SEO utilities
export function generateBusinessSlug(
  businessName: string,
  category: string,
  city: string
): string {
  // Combine business elements for comprehensive slug
  const elements = [];
  
  // Add key parts of business name (remove common business words)
  const nameWords = businessName
    .toLowerCase()
    .replace(/\b(ltd|limited|company|co|inc|incorporated|llc|restaurant|hotel|shop|store|services|solutions)\b/g, '')
    .split(/\s+/)
    .filter(word => word.length > 2)
    .slice(0, 3); // Take first 3 meaningful words
  
  elements.push(...nameWords);
  
  // Add category
  elements.push(category.toLowerCase().replace(/\s+/g, '-'));
  
  // Add location
  elements.push(city.toLowerCase());
  
  // Create slug
  const slug = elements
    .join(' ')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  
  return slug;
}

export function generateBusinessTitle(
  businessName: string,
  category: string,
  city: string
): string {
  return `${businessName} - ${category} in ${city} | Contact & Reviews | NewKenyan.com`;
}

export function generateBusinessDescription(
  businessName: string,
  category: string,
  city: string,
  description: string
): string {
  const trimmedDesc = description.length > 120 
    ? description.substring(0, 120) + '...' 
    : description;
  
  return `${businessName} - ${category} in ${city}. ${trimmedDesc} Contact details, reviews, and business information. Find top businesses in Kenya.`;
}

export function generateBusinessKeywords(
  businessName: string,
  category: string,
  city: string
): string {
  const keywords = [];
  
  // Core business keywords
  keywords.push(businessName.toLowerCase());
  keywords.push(`${category.toLowerCase()} ${city.toLowerCase()}`);
  keywords.push(`${category.toLowerCase()} kenya`);
  
  // Location keywords
  keywords.push(`business ${city.toLowerCase()}`);
  keywords.push(`companies ${city.toLowerCase()}`);
  keywords.push(`${city.toLowerCase()} business directory`);
  
  // Category-specific keywords
  const categoryWords = category.toLowerCase().split(/\s+/);
  categoryWords.forEach(word => {
    if (word.length > 3) {
      keywords.push(`${word} ${city.toLowerCase()}`);
      keywords.push(`${word} kenya`);
    }
  });
  
  // General business keywords
  keywords.push('kenya business', 'business directory kenya', 'companies in kenya');
  
  return keywords.join(', ');
}

export function getSimilarBusinesses<T extends { 
  id: string; 
  city: string; 
  category: string;
  business_name: string;
}>(
  allBusinesses: T[],
  currentBusiness: T,
  count: number = 6
): T[] {
  const otherBusinesses = allBusinesses.filter(b => b.id !== currentBusiness.id);
  
  // Score businesses by similarity
  const scoredBusinesses = otherBusinesses.map(business => {
    let score = 0;
    
    // Same city (high weight)
    if (business.city.toLowerCase() === currentBusiness.city.toLowerCase()) {
      score += 10;
    }
    
    // Same category (very high weight)
    if (business.category.toLowerCase() === currentBusiness.category.toLowerCase()) {
      score += 15;
    }
    
    // Similar category (partial match)
    const currentCategoryWords = currentBusiness.category.toLowerCase().split(/\s+/);
    const businessCategoryWords = business.category.toLowerCase().split(/\s+/);
    const commonWords = currentCategoryWords.filter(word => 
      businessCategoryWords.includes(word) && word.length > 3
    );
    if (commonWords.length > 0) {
      score += commonWords.length * 3;
    }
    
    // Similar business name words (for chains or similar businesses)
    const currentNameWords = currentBusiness.business_name.toLowerCase().split(/\s+/);
    const businessNameWords = business.business_name.toLowerCase().split(/\s+/);
    const commonNameWords = currentNameWords.filter(word => 
      businessNameWords.includes(word) && word.length > 3
    );
    if (commonNameWords.length > 0) {
      score += commonNameWords.length * 2;
    }
    
    return { business, score };
  });
  
  // Sort by score and return top businesses
  return scoredBusinesses
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(item => item.business);
}