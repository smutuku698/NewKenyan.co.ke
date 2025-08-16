import { Metadata } from 'next';

export const homeMetadata: Metadata = {
  title: 'NewKenyan.com - Find Jobs, Businesses & Properties in Kenya',
  description: 'Discover job opportunities, explore businesses, and find properties across Kenya on NewKenyan.com. Your gateway to Kenya\'s digital economy with verified listings and trusted connections.',
  keywords: [
    'Kenya jobs',
    'jobs in Kenya',
    'Kenya business directory',
    'properties for sale Kenya',
    'houses for rent Nairobi',
    'apartments Kenya',
    'office space rent Kenya',
    'business opportunities Kenya',
    'employment Kenya',
    'real estate Kenya'
  ].join(', '),
  openGraph: {
    title: 'NewKenyan.com - Find Jobs, Businesses & Properties in Kenya',
    description: 'Discover job opportunities, explore businesses, and find properties across Kenya on NewKenyan.com.',
    url: 'https://newkenyan.com',
    siteName: 'NewKenyan.com',
    images: [
      {
        url: 'https://newkenyan.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NewKenyan.com - Kenya\'s Premier Opportunity Platform',
      },
    ],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NewKenyan.com - Find Jobs, Businesses & Properties in Kenya',
    description: 'Discover job opportunities, explore businesses, and find properties across Kenya.',
    images: ['https://newkenyan.com/og-image.jpg'],
    site: '@newkenyan',
    creator: '@newkenyan',
  },
  alternates: {
    canonical: 'https://newkenyan.com',
  },
  other: {
    'google-site-verification': 'your-google-verification-code',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  authors: [{ name: 'Legit Hustles' }],
  category: 'Business Directory',
  classification: 'Business & Employment',
  verification: {
    google: 'your-google-verification-code',
  },
};