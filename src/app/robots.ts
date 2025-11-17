import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Block known scrapers and bad bots
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
          'YandexBot', // Can be aggressive
          'ExtLinksBot',
          'SEOkicks',
          'HTTrack',
          'Scrapy',
          'scrapy',
          'python-requests',
          'curl',
          'wget',
        ],
        disallow: '/',
      },
      // Allow legitimate search engines - full access
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/'],
      },
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/'],
      },
      {
        userAgent: 'Slurp', // Yahoo
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/'],
      },
      {
        userAgent: 'Baiduspider',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/'],
      },
      // AI Crawlers - Allow for AI training and search
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/'],
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/'],
      },
      {
        userAgent: 'Anthropic-AI',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/'],
      },
      {
        userAgent: 'cohere-ai',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/'],
      },
      {
        userAgent: 'Applebot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/'],
      },
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/'],
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/'],
      },
      {
        userAgent: 'facebookexternalhit', // Facebook previews
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/'],
      },
      {
        userAgent: 'Twitterbot', // Twitter card previews
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/'],
      },
      {
        userAgent: 'LinkedInBot', // LinkedIn previews
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/'],
      },
      {
        userAgent: 'WhatsApp', // WhatsApp previews
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/'],
      },
      // Default rule for other bots - restricted access
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/dashboard/',
          '/_next/',
          '/static/',
        ],
        crawlDelay: 10, // Slow down aggressive crawlers
      },
    ],
    sitemap: [
      'https://newkenyan.com/sitemap.xml',
      'https://newkenyan.com/jobs-sitemap.xml',
    ],
  }
}