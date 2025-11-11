
import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'
import { generatePropertySlug, generateBusinessSlug } from '@/utils/seo'
import jobsData from '@/data/jobs.json'
import { generateJobSlug } from '@/lib/utils'
import fs from 'fs'
import path from 'path'

// Auto-discover all app routes from file system
function getAppRoutes(): string[] {
  const appDir = path.join(process.cwd(), 'src', 'app')
  const routes: string[] = []

  function scanDirectory(dir: string, currentPath: string = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      // Skip special Next.js folders and files
      if (entry.name.startsWith('_') || entry.name.startsWith('.') ||
          entry.name === 'api' || entry.name === 'components' ||
          entry.name.includes('[') || entry.name.includes(']')) {
        continue
      }

      const fullPath = path.join(dir, entry.name)
      const routePath = currentPath ? `${currentPath}/${entry.name}` : entry.name

      if (entry.isDirectory()) {
        // Check if directory has a page.tsx or page.ts file
        const hasPage = fs.existsSync(path.join(fullPath, 'page.tsx')) ||
                        fs.existsSync(path.join(fullPath, 'page.ts'))

        if (hasPage) {
          routes.push(`/${routePath}`)
        }

        // Recursively scan subdirectories
        scanDirectory(fullPath, routePath)
      }
    }
  }

  scanDirectory(appDir)
  return routes
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://newkenyan.com'

  // Create Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // Auto-discover all static routes
  const discoveredRoutes = getAppRoutes()

  // Determine priority based on route type
  const getPriority = (route: string): number => {
    if (route === '/') return 1
    if (route.includes('properties') || route.includes('business')) return 0.9
    if (route.includes('nairobi') || route.includes('mombasa')) return 0.88
    if (route.includes('apartment') || route.includes('house')) return 0.85
    if (route.includes('bedroom')) return 0.84
    if (route.includes('bedsitter') || route.includes('cheap')) return 0.83
    if (route.includes('jobs')) return 0.8
    if (route.includes('calculator') || route.includes('services')) return 0.75
    if (route.includes('blog')) return 0.7
    if (route.includes('about') || route.includes('contact')) return 0.5
    if (route.includes('privacy') || route.includes('terms')) return 0.3
    return 0.7 // default
  }

  // Auto-generate static pages from discovered routes
  const autoStaticPages: MetadataRoute.Sitemap = discoveredRoutes.map(route => ({
    url: route === '/' ? baseUrl : `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route.includes('properties') || route.includes('apartment') || route.includes('house')
      ? 'daily' as const
      : route.includes('jobs') || route.includes('business')
      ? 'weekly' as const
      : 'monthly' as const,
    priority: getPriority(route),
  }))

  // No need for manual static pages list anymore - all auto-discovered!

  try {
    // Get all approved properties
    const { data: properties } = await supabase
      .from('property_listings')
      .select('id, property_title, property_type, city, bedrooms, price_type, updated_at')
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

    // Property pages - Use proper slugs with price_type
    const propertyPages = properties?.map((property) => {
      const slug = generatePropertySlug(
        property.property_title,
        property.property_type,
        property.city,
        property.bedrooms,
        property.price_type
      )

      return {
        url: `${baseUrl}/properties/${slug}`,
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
      ...autoStaticPages,
      ...locationPropertyPages,
      ...propertyPages,
      ...businessPages,
      ...propertyCityPages,
      ...businessCityPages,
      ...jobPages,
    ]

  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return just auto-discovered pages if dynamic content fails
    return autoStaticPages
  }
}