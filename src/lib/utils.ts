import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// SEO slug generation utilities
export function generateSEOSlug(title: string, location?: string, maxLength = 60): string {
  let slug = title
    .toLowerCase()
    .trim()
    // Remove special characters except numbers and basic punctuation
    .replace(/[^a-z0-9\s-]/g, '')
    // Replace spaces with hyphens
    .replace(/\s+/g, '-')
    // Remove multiple consecutive hyphens
    .replace(/-+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-|-$/g, '');

  // Add location if provided and not already in title
  if (location && !slug.includes(location.toLowerCase().replace(/\s+/g, '-'))) {
    const locationSlug = location.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    slug = `${slug}-${locationSlug}`;
  }

  // Truncate if too long, but preserve whole words
  if (slug.length > maxLength) {
    const truncated = slug.substring(0, maxLength);
    const lastHyphen = truncated.lastIndexOf('-');
    slug = lastHyphen > 20 ? truncated.substring(0, lastHyphen) : truncated;
  }

  return slug;
}

export function generatePropertySlug(title: string, propertyType: string, city: string, bedrooms?: number): string {
  // Use title if provided, otherwise create from property details
  const baseTitle = title || `${bedrooms ? `${bedrooms} bedroom ` : ''}${propertyType}`;
  return generateSEOSlug(baseTitle, city);
}

export function generateBusinessSlug(businessName: string, city: string, category?: string): string {
  return generateSEOSlug(businessName, city);
}

export function generateJobSlug(jobTitle: string, company: string, location: string): string {
  const title = company ? `${jobTitle} at ${company}` : jobTitle;
  return generateSEOSlug(title, location);
}

// SEO meta tag generators
export function generatePropertyMetaTags(title: string, price: number, location: string, propertyType: string, bedrooms?: number) {
  const fallbackTitles = [
    `${bedrooms || ''} Bedroom Apartment for Sale in Nairobi`,
    `${bedrooms || ''} Bedroom Apartment for Sale in Mombasa`
  ];
  
  const metaTitle = title 
    ? `${title} - ${location} | NewKenyan.com`
    : `${fallbackTitles[Math.floor(Math.random() * fallbackTitles.length)]} | NewKenyan.com`;
    
  const priceText = price > 0 ? ` KES ${price.toLocaleString()}` : '';
  const bedroomText = bedrooms ? `${bedrooms} bedroom ` : '';
  
  const metaDescription = title
    ? `${title} in ${location}.${priceText} ${bedroomText}${propertyType}. Contact owner directly. View photos & details on NewKenyan.com.`
    : `${bedroomText}${propertyType} for sale in ${location}.${priceText} Modern amenities, secure location. Contact owner directly.`;

  return {
    title: metaTitle.substring(0, 60),
    description: metaDescription.substring(0, 160),
    keywords: `${bedroomText}${propertyType} ${location}, property for sale ${location}, houses for rent Kenya`
  };
}

export function generateBusinessMetaTags(businessName: string, city: string, category: string, description?: string) {
  const fallbackName = `Professional Business Services in Nairobi`;
  
  const metaTitle = businessName 
    ? `${businessName} - ${city} | NewKenyan.com`
    : `${fallbackName} | NewKenyan.com`;
    
  const metaDescription = description
    ? `${businessName} in ${city}. ${description.substring(0, 100)}. Contact details, reviews & location on NewKenyan.com.`
    : `${businessName || fallbackName} - Quality ${category} services in ${city}. Contact details & reviews on NewKenyan.com.`;

  return {
    title: metaTitle.substring(0, 60),
    description: metaDescription.substring(0, 160),
    keywords: `${category} ${city}, ${businessName}, business directory Kenya, services ${city}`
  };
}

export function generateJobMetaTags(jobTitle: string, company: string, location: string, salary?: string) {
  const fallbackTitle = `Job Opportunity in Nairobi`;
  
  const metaTitle = jobTitle 
    ? `${jobTitle} - ${location} | NewKenyan Jobs`
    : `${fallbackTitle} | NewKenyan Jobs`;
    
  const salaryText = salary ? ` Salary: ${salary}.` : '';
  const companyText = company ? ` at ${company}` : '';
  
  const metaDescription = jobTitle
    ? `${jobTitle}${companyText} in ${location}.${salaryText} Apply now with CV. Job details on NewKenyan.com.`
    : `Job opportunity in ${location}.${salaryText} Apply now with CV. Latest jobs on NewKenyan.com.`;

  return {
    title: metaTitle.substring(0, 60),
    description: metaDescription.substring(0, 160),
    keywords: `${jobTitle} ${location}, jobs ${location}, employment Kenya, careers ${location}`
  };
}

// Auto-generate H1/H2 tags
export function generatePropertyHeadings(title: string, location: string, propertyType: string, bedrooms?: number) {
  const fallbackTitles = [
    `${bedrooms || ''} Bedroom Apartment for Sale in Nairobi`,
    `${bedrooms || ''} Bedroom Apartment for Sale in Mombasa`
  ];
  
  const h1 = title 
    ? `${title}${title.includes(location) ? '' : ` in ${location}`}`
    : fallbackTitles[Math.floor(Math.random() * fallbackTitles.length)];
    
  const h2 = title
    ? `${bedrooms ? `${bedrooms} Bedroom ` : ''}${propertyType} for Sale in ${location} - Premium Location`
    : `Affordable ${bedrooms ? `${bedrooms} Bedroom ` : ''}${propertyType} ${location} - Available Now`;

  return { h1, h2 };
}

export function generateBusinessHeadings(businessName: string, city: string, category: string) {
  const fallbackName = `Professional Business Services in Nairobi`;
  
  const h1 = businessName 
    ? `${businessName}${businessName.includes(city) ? '' : ` in ${city}`}`
    : fallbackName;
    
  const h2 = businessName
    ? `${category} Services in ${city} - ${businessName}`
    : `Top Business Service Provider ${city} - Quality Guaranteed`;

  return { h1, h2 };
}

export function generateJobHeadings(jobTitle: string, company: string, location: string) {
  const fallbackTitle = `Job Opportunity in Nairobi`;
  
  const h1 = jobTitle 
    ? `${jobTitle}${company ? ` at ${company}` : ''}${jobTitle.includes(location) ? '' : ` in ${location}`}`
    : fallbackTitle;
    
  const h2 = jobTitle
    ? `${jobTitle} Job ${location}${company ? ` - Join ${company} Team` : ` - Career Opportunity`}`
    : `Career Position ${location} - Join Our Growing Team`;

  return { h1, h2 };
}