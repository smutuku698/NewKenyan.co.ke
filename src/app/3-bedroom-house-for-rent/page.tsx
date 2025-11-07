import type { Metadata } from 'next';
import ThreeBedroomHouseClient from './ThreeBedroomHouseClient';

export const metadata: Metadata = {
  metadataBase: new URL('https://newkenyan.com'),
  title: '3 Bedroom House for Rent in Kenya 2025 - 800+ Listings from KES 30,000',
  description: 'Find spacious 3 bedroom houses for rent in Kenya from KES 30,000/month. Browse 800+ verified listings in Karen, Runda, Lavington, Kilimani, Ngong. Perfect for families.',
  keywords: '3 bedroom house for rent, 3 bedroom house kenya, houses for rent nairobi, family houses kenya, 3 bedroom Karen, 3 bedroom Kilimani, 3 bedroom Ngong, houses Runda, rental houses kenya',
  authors: [{ name: 'NewKenyan.com' }],
  alternates: {
    canonical: 'https://newkenyan.com/3-bedroom-house-for-rent',
  },
  openGraph: {
    title: '3 Bedroom House for Rent in Kenya 2025 - 800+ Family Houses',
    description: 'Find spacious 3 bedroom houses for rent in Kenya. Browse verified listings in Karen, Runda, Lavington from KES 30,000/month.',
    url: 'https://newkenyan.com/3-bedroom-house-for-rent',
    type: 'website',
    images: [
      {
        url: 'https://newkenyan.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '3 Bedroom House for Rent in Kenya',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '3 Bedroom House for Rent in Kenya - 800+ Listings',
    description: 'Spacious 3 bedroom houses in Karen, Runda, Lavington from KES 30,000/month.',
    images: ['https://newkenyan.com/og-image.jpg'],
  },
};

export default function Page() {
  return <ThreeBedroomHouseClient />;
}
