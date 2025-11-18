import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Block known scrapers and bad bots - MUST come before wildcard
      {
        userAgent: [
          'AhrefsBot',
          'SemrushBot',
          'DotBot',
          'MJ12bot',
          'BLEXBot',
          'PetalBot',
          'DataForSeoBot',
          'serpstatbot',
          'ZoominfoBot',
          'AwarioBot',
          'MegaIndex',
          'BUbiNG',
          'YandexBot',
          'ExtLinksBot',
          'SEOkicks',
          'HTTrack',
          'Scrapy',
          'scrapy',
          'python-requests',
          'curl',
          'wget',
        ],
        disallow: ['/'],
      },
      // Googlebot - primary search engine
      {
        userAgent: 'Googlebot',
        disallow: ['/admin/', '/api/', '/dashboard/'],
      },
      {
        userAgent: 'Googlebot-Image',
        disallow: ['/admin/', '/api/', '/dashboard/'],
      },
      // Other major search engines
      {
        userAgent: 'Bingbot',
        disallow: ['/admin/', '/api/', '/dashboard/'],
      },
      {
        userAgent: 'DuckDuckBot',
        disallow: ['/admin/', '/api/', '/dashboard/'],
      },
      {
        userAgent: 'Slurp',
        disallow: ['/admin/', '/api/', '/dashboard/'],
      },
      {
        userAgent: 'Baiduspider',
        disallow: ['/admin/', '/api/', '/dashboard/'],
      },
      // AI Crawlers
      {
        userAgent: 'GPTBot',
        disallow: ['/admin/', '/api/', '/dashboard/'],
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: ['/admin/', '/api/', '/dashboard/'],
      },
      {
        userAgent: 'Claude-Web',
        disallow: ['/admin/', '/api/', '/dashboard/'],
      },
      {
        userAgent: 'Anthropic-AI',
        disallow: ['/admin/', '/api/', '/dashboard/'],
      },
      {
        userAgent: 'cohere-ai',
        disallow: ['/admin/', '/api/', '/dashboard/'],
      },
      {
        userAgent: 'PerplexityBot',
        disallow: ['/admin/', '/api/', '/dashboard/'],
      },
      {
        userAgent: 'Applebot',
        disallow: ['/admin/', '/api/', '/dashboard/'],
      },
      {
        userAgent: 'Applebot-Extended',
        disallow: ['/admin/', '/api/', '/dashboard/'],
      },
      {
        userAgent: 'Google-Extended',
        disallow: ['/admin/', '/api/', '/dashboard/'],
      },
      // Social media crawlers for preview cards
      {
        userAgent: 'facebookexternalhit',
        disallow: ['/admin/', '/api/', '/dashboard/'],
      },
      {
        userAgent: 'Twitterbot',
        disallow: ['/admin/', '/api/', '/dashboard/'],
      },
      {
        userAgent: 'LinkedInBot',
        disallow: ['/admin/', '/api/', '/dashboard/'],
      },
      {
        userAgent: 'WhatsApp',
        disallow: ['/admin/', '/api/', '/dashboard/'],
      },
      // Default rule - MUST be last
      {
        userAgent: '*',
        disallow: ['/admin/', '/api/', '/dashboard/', '/_next/', '/static/'],
      },
    ],
    sitemap: 'https://newkenyan.com/sitemap.xml',
  }
}