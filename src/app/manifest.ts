import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'NewKenyan - Kenya Business Directory, Properties & Jobs',
    short_name: 'NewKenyan',
    description: 'Find properties, businesses, and jobs in Kenya. The leading platform for real estate listings, business directory, and job opportunities across Kenya.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#10B981',
    orientation: 'portrait',
    categories: ['business', 'lifestyle', 'productivity'],
    lang: 'en',
    dir: 'ltr',
    icons: [
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}