import type { Metadata } from 'next';
import BedsitterKasaraniClient from './BedsitterKasaraniClient';

export const metadata: Metadata = {
  metadataBase: new URL('https://newkenyan.com'),
  title: 'Bedsitter in Kasarani 2025 - 400+ Listings from KES 5,000/Month',
  description: 'Find affordable bedsitters for rent in Kasarani from KES 5,000/month. Browse 400+ verified listings in Mwiki, Clay City, Seasons, Hunters. Perfect for students & young professionals.',
  keywords: 'bedsitter kasarani, bedsitter mwiki, bedsitter clay city, bedsitter seasons kasarani, cheap bedsitter kasarani, bedsitter under 10000 kasarani, bedsitter 5000 kasarani, student accommodation kasarani',
  authors: [{ name: 'NewKenyan.com' }],
  alternates: {
    canonical: 'https://newkenyan.com/bedsitter-kasarani',
  },
  openGraph: {
    title: 'Bedsitter in Kasarani 2025 - 400+ Listings from KES 5,000',
    description: 'Find affordable bedsitters in Kasarani from KES 5,000/month. Mwiki, Clay City, Seasons, Hunters. Perfect for students.',
    url: 'https://newkenyan.com/bedsitter-kasarani',
    type: 'website',
    images: [
      {
        url: 'https://newkenyan.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Bedsitter for Rent in Kasarani',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bedsitter in Kasarani - 400+ Listings from KES 5K',
    description: 'Affordable bedsitters in Kasarani. Mwiki, Clay City, Seasons from KES 5,000.',
    images: ['https://newkenyan.com/og-image.jpg'],
  },
};

export default function Page() {
  return <BedsitterKasaraniClient />;
}
