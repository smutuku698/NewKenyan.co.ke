import type { Metadata } from 'next';
import BedsitterNairobiClient from './BedsitterNairobiClient';

export const metadata: Metadata = {
  metadataBase: new URL('https://newkenyan.com'),
  title: 'Bedsitter in Nairobi 2025 - 500+ Listings from KES 5,000/Month',
  description: 'Find affordable bedsitters for rent in Nairobi from KES 5,000/month. Browse 500+ verified listings in Kasarani, Ruaka, Kahawa, Rongai. Perfect for students & young professionals.',
  keywords: 'bedsitter nairobi, bedsitter for rent nairobi, bedsitter kasarani, cheap bedsitter nairobi, bedsitter under 10000, bedsitter 5000 nairobi, bedsitter ruaka, bedsitter kahawa, student accommodation nairobi',
  authors: [{ name: 'NewKenyan.com' }],
  alternates: {
    canonical: 'https://newkenyan.com/bedsitter-nairobi',
  },
  openGraph: {
    title: 'Bedsitter in Nairobi 2025 - 500+ Listings from KES 5,000/Month',
    description: 'Find affordable bedsitters for rent in Nairobi. Browse verified listings in Kasarani, Ruaka, Kahawa from KES 5,000/month.',
    url: 'https://newkenyan.com/bedsitter-nairobi',
    type: 'website',
    images: [
      {
        url: 'https://newkenyan.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Bedsitter for Rent in Nairobi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bedsitter in Nairobi - 500+ Listings from KES 5,000',
    description: 'Affordable bedsitters in Nairobi. Kasarani, Ruaka, Kahawa from KES 5,000/month.',
    images: ['https://newkenyan.com/og-image.jpg'],
  },
};

export default function Page() {
  return <BedsitterNairobiClient />;
}
