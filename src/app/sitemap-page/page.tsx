import { createClient } from '@supabase/supabase-js'
import { generatePropertySlug } from '@/utils/seo'
import jobsData from '../../../local-jobs.json'
import { slugify } from '@/lib/slugify'
import Link from 'next/link'
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

export default async function SitemapPage() {
  const baseUrl = 'https://newkenyan.com'

  // Create Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // Auto-discover all static routes
  const discoveredRoutes = getAppRoutes()

  // Get active locations
  const { data: locations } = await supabase
    .from('locations')
    .select('slug, name, type')
    .eq('is_active', true)
    .order('type', { ascending: true })

  // Property type routes
  const propertyRoutes = [
    { path: 'houses-for-sale', label: 'Houses for Sale' },
    { path: 'houses-for-rent', label: 'Houses for Rent' },
    { path: 'apartments-for-sale', label: 'Apartments for Sale' },
    { path: 'apartments-for-rent', label: 'Apartments for Rent' },
    { path: '2-bedroom-houses-for-rent', label: '2 Bedroom Houses for Rent' },
    { path: '2-bedroom-houses-for-sale', label: '2 Bedroom Houses for Sale' },
    { path: '3-bedroom-houses-for-rent', label: '3 Bedroom Houses for Rent' },
    { path: '3-bedroom-houses-for-sale', label: '3 Bedroom Houses for Sale' },
    { path: '4-bedroom-houses-for-rent', label: '4 Bedroom Houses for Rent' },
    { path: '4-bedroom-houses-for-sale', label: '4 Bedroom Houses for Sale' },
    { path: '5-bedroom-houses-for-rent', label: '5 Bedroom Houses for Rent' },
    { path: '5-bedroom-houses-for-sale', label: '5 Bedroom Houses for Sale' },
    { path: 'bedsitters-for-rent', label: 'Bedsitters for Rent' },
    { path: 'bungalows-for-rent', label: 'Bungalows for Rent' },
    { path: 'bungalows-for-sale', label: 'Bungalows for Sale' },
    { path: 'commercial-properties-for-rent', label: 'Commercial Properties for Rent' },
    { path: 'commercial-properties-for-sale', label: 'Commercial Properties for Sale' },
    { path: 'container-houses-for-sale', label: 'Container Houses for Sale' },
    { path: 'land-for-sale', label: 'Land for Sale' },
    { path: 'maisonettes-for-rent', label: 'Maisonettes for Rent' },
    { path: 'maisonettes-for-sale', label: 'Maisonettes for Sale' },
    { path: 'office-space-for-rent', label: 'Office Space for Rent' },
    { path: 'serviced-apartments-for-rent', label: 'Serviced Apartments for Rent' },
    { path: 'shops-for-rent', label: 'Shops for Rent' },
    { path: 'shops-for-sale', label: 'Shops for Sale' },
    { path: 'studio-apartments-for-rent', label: 'Studio Apartments for Rent' },
    { path: 'studio-apartments-for-sale', label: 'Studio Apartments for Sale' },
    { path: 'townhouses-for-rent', label: 'Townhouses for Rent' },
    { path: 'townhouses-for-sale', label: 'Townhouses for Sale' },
    { path: 'villas-for-rent', label: 'Villas for Rent' },
    { path: 'villas-for-sale', label: 'Villas for Sale' },
    { path: 'warehouses-for-rent', label: 'Warehouses for Rent' },
    { path: 'warehouses-for-sale', label: 'Warehouses for Sale' }
  ]

  // Group routes by category
  const staticRoutes = discoveredRoutes.filter(r =>
    !r.includes('properties') &&
    !r.includes('business') &&
    !r.includes('jobs') &&
    !r.includes('bedroom') &&
    !r.includes('apartment') &&
    !r.includes('house')
  )

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Sitemap</h1>
          <p className="text-gray-600 mb-8">
            Browse all pages on NewKenyan.com
          </p>

          {/* Main Pages */}
          <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Main Pages</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {staticRoutes.map((route) => (
                <li key={route}>
                  <Link
                    href={route}
                    className="text-green-600 hover:text-green-700 hover:underline"
                  >
                    {route === '/' ? 'Home' : route.replace(/\//g, ' ').replace(/-/g, ' ').trim()}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Property Types by Location */}
          <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Properties by Type & Location</h2>
            <div className="space-y-6">
              {propertyRoutes.map((route) => (
                <div key={route.path}>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">{route.label}</h3>
                  <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-sm">
                    {locations?.slice(0, 50).map((location) => (
                      <li key={`${route.path}-${location.slug}`}>
                        <Link
                          href={`/${route.path}/${location.slug}`}
                          className="text-green-600 hover:text-green-700 hover:underline"
                        >
                          {location.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {locations && locations.length > 50 && (
                    <p className="text-sm text-gray-500 mt-2">
                      And {locations.length - 50} more locations...
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Jobs Section */}
          <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Latest Jobs</h2>
            <p className="text-gray-600 mb-4">
              {jobsData.jobs.length.toLocaleString()} job listings available
            </p>
            <Link
              href="/jobs-in-kenya"
              className="text-green-600 hover:text-green-700 hover:underline font-medium"
            >
              View all jobs &rarr;
            </Link>
            <div className="mt-4">
              <Link
                href="/jobs-sitemap-page"
                className="text-sm text-gray-500 hover:text-gray-700 hover:underline"
              >
                View detailed jobs sitemap
              </Link>
            </div>
          </section>

          {/* XML Sitemap Links */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">XML Sitemaps</h2>
            <p className="text-gray-600 mb-4">
              For search engines and developers
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="/sitemap.xml"
                  className="text-green-600 hover:text-green-700 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Main Sitemap (XML)
                </a>
              </li>
              <li>
                <a
                  href="/jobs-sitemap.xml"
                  className="text-green-600 hover:text-green-700 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Jobs Sitemap (XML)
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
