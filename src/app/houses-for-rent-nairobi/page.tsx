import type { Metadata } from 'next';
import HousesForRentNairobiClient from './HousesForRentNairobiClient';

export const metadata: Metadata = {
  metadataBase: new URL('https://newkenyan.com'),
  title: 'Houses for Rent in Nairobi - 500+ Listings from KES 15,000 | NewKenyan',
  description: 'Find houses for rent in Nairobi with verified listings. Browse 500+ rental houses in Westlands, Kilimani, Karen, Lavington & more. 2-6 bedroom houses from KES 15,000/month.',
  keywords: 'houses for rent nairobi, rental houses nairobi, houses to rent in nairobi, nairobi houses for rent, 2 bedroom house nairobi, 3 bedroom house nairobi, houses for rent in westlands, houses for rent in kilimani, houses for rent karen',
  alternates: {
    canonical: 'https://newkenyan.com/houses-for-rent-nairobi',
  },
  openGraph: {
    title: 'Houses for Rent in Nairobi - 500+ Listings from KES 15,000',
    description: 'Find houses for rent in Nairobi with verified listings. Browse 500+ rental houses in Westlands, Kilimani, Karen & more.',
    url: 'https://newkenyan.com/houses-for-rent-nairobi',
    type: 'website',
    images: [
      {
        url: 'https://newkenyan.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Houses for Rent in Nairobi',
      },
    ],
  },
};

export default function Page() {
  return <HousesForRentNairobiClient />;
}
