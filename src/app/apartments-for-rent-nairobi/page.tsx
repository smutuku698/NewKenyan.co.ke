import type { Metadata } from 'next';
import ApartmentsForRentNairobiClient from './ApartmentsForRentNairobiClient';

export const metadata: Metadata = {
  metadataBase: new URL('https://newkenyan.com'),
  title: 'Apartments for Rent in Nairobi 2025 - 1,000+ Verified Listings from KES 10,000',
  description: 'Find apartments for rent in Nairobi with 1,000+ verified listings. Browse 1BR, 2BR, 3BR apartments in Westlands, Kilimani, Karen from KES 10,000/month. Expert guide & market insights.',
  keywords: 'apartments for rent nairobi, apartments nairobi, 1 bedroom apartment nairobi, 2 bedroom apartment nairobi, apartments westlands, apartments kilimani, cheap apartments nairobi, furnished apartments nairobi, studio apartments nairobi',
  authors: [{ name: 'NewKenyan.com' }],
  alternates: {
    canonical: 'https://newkenyan.com/apartments-for-rent-nairobi',
  },
  openGraph: {
    title: 'Apartments for Rent in Nairobi 2025 - 1,000+ Verified Listings',
    description: 'Find apartments for rent in Nairobi. Browse 1BR, 2BR, 3BR apartments in Westlands, Kilimani, Karen from KES 10,000/month.',
    url: 'https://newkenyan.com/apartments-for-rent-nairobi',
    type: 'website',
    images: [
      {
        url: 'https://newkenyan.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Apartments for Rent in Nairobi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apartments for Rent in Nairobi 2025 - 1,000+ Listings',
    description: 'Find apartments for rent in Nairobi. 1BR, 2BR, 3BR in Westlands, Kilimani, Karen from KES 10,000/month.',
    images: ['https://newkenyan.com/og-image.jpg'],
  },
};

export default function Page() {
  return <ApartmentsForRentNairobiClient />;
}
