import type { Metadata } from 'next';
import TwoBedroomApartmentNairobiClient from './TwoBedroomApartmentNairobiClient';

export const metadata: Metadata = {
  metadataBase: new URL('https://newkenyan.com'),
  title: '2 Bedroom Apartment Nairobi 2025 - 1,500+ Listings from KES 25,000',
  description: 'Find 2 bedroom apartments for rent in Nairobi with 1,500+ verified listings. Browse modern 2BR apartments in Westlands, Kilimani, Karen, Lavington from KES 25,000/month. Family-friendly neighborhoods with comprehensive amenities.',
  keywords: '2 bedroom apartment nairobi, 2 bedroom apartment westlands, 2 bedroom kilimani, 2br apartment nairobi, two bedroom apartment nairobi, 2 bedroom apartment karen, furnished 2 bedroom nairobi, cheap 2 bedroom apartment nairobi, modern 2 bedroom nairobi',
  authors: [{ name: 'NewKenyan.com' }],
  alternates: {
    canonical: 'https://newkenyan.com/2-bedroom-apartment-nairobi',
  },
  openGraph: {
    title: '2 Bedroom Apartment Nairobi 2025 - 1,500+ Verified Listings',
    description: 'Find 2 bedroom apartments for rent in Nairobi. Browse modern 2BR apartments in Westlands, Kilimani, Karen from KES 25,000/month.',
    url: 'https://newkenyan.com/2-bedroom-apartment-nairobi',
    type: 'website',
    images: [
      {
        url: 'https://newkenyan.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '2 Bedroom Apartments in Nairobi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '2 Bedroom Apartment Nairobi - 1,500+ Listings',
    description: 'Modern 2BR apartments in Nairobi. Westlands, Kilimani, Karen from KES 25,000/month.',
    images: ['https://newkenyan.com/og-image.jpg'],
  },
};

export default function Page() {
  return <TwoBedroomApartmentNairobiClient />;
}
