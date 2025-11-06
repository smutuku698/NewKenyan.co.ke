
import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'
import { generatePropertySlug, generateBusinessSlug } from '@/utils/seo'
import jobsData from '@/data/jobs.json'
import { generateJobSlug } from '@/lib/utils'

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
      url: `${baseUrl}/real-estate-companies-in-kenya`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
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
    // City pillar pages
    {
      url: `${baseUrl}/nairobi`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/mombasa`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.95,
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

    // Get all active locations
    const { data: locations } = await supabase
      .from('locations')
      .select('slug, type, updated_at')
      .eq('is_active', true)
      .order('type', { ascending: true })

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

    // Location-based property pages - Dynamic routes
    const locationPropertyPages: MetadataRoute.Sitemap = []

    if (locations && locations.length > 0) {
      // All property type combinations with routes
      const propertyRoutes = [
        { path: 'houses-for-sale', priority: 0.85 },
        { path: 'houses-for-rent', priority: 0.85 },
        { path: 'apartments-for-sale', priority: 0.85 },
        { path: 'apartments-for-rent', priority: 0.85 },
        { path: '2-bedroom-houses-for-rent', priority: 0.84 },
        { path: '2-bedroom-houses-for-sale', priority: 0.84 },
        { path: '3-bedroom-houses-for-rent', priority: 0.84 },
        { path: '3-bedroom-houses-for-sale', priority: 0.84 },
        { path: '4-bedroom-houses-for-rent', priority: 0.83 },
        { path: '4-bedroom-houses-for-sale', priority: 0.83 },
        { path: '5-bedroom-houses-for-rent', priority: 0.83 },
        { path: '5-bedroom-houses-for-sale', priority: 0.83 },
        { path: 'bedsitters-for-rent', priority: 0.82 },
        { path: 'bungalows-for-rent', priority: 0.82 },
        { path: 'bungalows-for-sale', priority: 0.82 },
        { path: 'commercial-properties-for-rent', priority: 0.81 },
        { path: 'commercial-properties-for-sale', priority: 0.81 },
        { path: 'container-houses-for-sale', priority: 0.80 },
        { path: 'land-for-sale', priority: 0.85 },
        { path: 'maisonettes-for-rent', priority: 0.82 },
        { path: 'maisonettes-for-sale', priority: 0.82 },
        { path: 'office-space-for-rent', priority: 0.83 },
        { path: 'serviced-apartments-for-rent', priority: 0.82 },
        { path: 'shops-for-rent', priority: 0.81 },
        { path: 'shops-for-sale', priority: 0.81 },
        { path: 'studio-apartments-for-rent', priority: 0.82 },
        { path: 'studio-apartments-for-sale', priority: 0.82 },
        { path: 'townhouses-for-rent', priority: 0.82 },
        { path: 'townhouses-for-sale', priority: 0.82 },
        { path: 'villas-for-rent', priority: 0.82 },
        { path: 'villas-for-sale', priority: 0.82 },
        { path: 'warehouses-for-rent', priority: 0.81 },
        { path: 'warehouses-for-sale', priority: 0.81 }
      ]

      locations.forEach((location) => {
        propertyRoutes.forEach((route) => {
          // Higher priority for counties and major neighborhoods
          const priority = location.type === 'county' ? route.priority : route.priority - 0.05

          locationPropertyPages.push({
            url: `${baseUrl}/${route.path}/${location.slug}`,
            lastModified: new Date(location.updated_at || new Date()),
            changeFrequency: 'daily' as const,
            priority: priority,
          })
        })
      })
    }

    // Legacy property city pages (keep for backwards compatibility)
    const majorCities = [
      'nairobi', 'mombasa', 'kisumu', 'nakuru', 'eldoret', 'thika', 'malindi',
      'kitale', 'garissa', 'kakamega', 'machakos', 'meru', 'nyeri', 'kericho'
    ];

    const propertyCityPages = majorCities.map((city) => ({
      url: `${baseUrl}/properties/city/${city}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.75,
    }))

    const businessCityPages = majorCities.map((city) => ({
      url: `${baseUrl}/business-directory/city/${city}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }))

    // Job pages from JSON data
    const jobPages = jobsData.jobs.map((job) => {
      const slug = generateJobSlug(job.job_title, 'NewKenyan', job.job_location)
      return {
        url: `${baseUrl}/jobs-in-kenya/${slug}`,
        lastModified: new Date(job.date),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }
    })

    return [
      ...staticPages,
      ...locationPropertyPages,
      ...propertyPages,
      ...businessPages,
      ...propertyCityPages,
      ...businessCityPages,
      ...jobPages,
    ]

  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return just static pages if dynamic content fails
    return staticPages
  }
}