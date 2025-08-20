
import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'
import { generatePropertySlug, generateBusinessSlug } from '@/utils/seo'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://newkenyan.com'
  
  // Create Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/properties`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/business-directory`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/jobs-in-kenya`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  try {
    // Get all approved properties
    const { data: properties } = await supabase
      .from('property_listings')
      .select('id, property_title, property_type, city, bedrooms, updated_at')
      .eq('is_approved', true)
      .order('updated_at', { ascending: false })

    // Get all approved businesses
    const { data: businesses } = await supabase
      .from('business_listings')
      .select('id, business_name, category, city, updated_at')
      .eq('is_approved', true)
      .order('updated_at', { ascending: false })

    // Property pages
    const propertyPages = properties?.map((property) => {
      const slug = generatePropertySlug(
        property.property_title,
        property.property_type,
        property.city,
        property.bedrooms
      )
      
      return {
        url: `${baseUrl}/properties/${property.id}`,
        lastModified: new Date(property.updated_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }
    }) || []

    // Business pages
    const businessPages = businesses?.map((business) => {
      return {
        url: `${baseUrl}/business/${business.id}`,
        lastModified: new Date(business.updated_at),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }
    }) || []

    // Major Kenyan cities - static pages
    const majorCities = [
      'nairobi', 'mombasa', 'kisumu', 'nakuru', 'eldoret', 'thika', 'malindi', 
      'kitale', 'garissa', 'kakamega', 'machakos', 'meru', 'nyeri', 'kericho'
    ];
    
    const propertyCityPages = majorCities.map((city) => ({
      url: `${baseUrl}/properties/${city}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    }))

    const businessCityPages = majorCities.map((city) => ({
      url: `${baseUrl}/business-directory/${city}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }))

    return [
      ...staticPages,
      ...propertyPages,
      ...businessPages,
      ...propertyCityPages,
      ...businessCityPages,
    ]

  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return just static pages if dynamic content fails
    return staticPages
  }
}