import type { Metadata } from 'next';
import ApartmentsWestlandsClient from './ApartmentsWestlandsClient';

export const metadata: Metadata = {
  metadataBase: new URL('https://newkenyan.com'),
  title: 'Apartments in Westlands Nairobi 2025 - 600+ Listings from KES 25,000',
  description: 'Find modern apartments for rent in Westlands, Nairobi from KES 25,000/month. Browse 600+ verified listings - studios, 1BR, 2BR, 3BR. Prime location near malls, offices & restaurants.',
  keywords: 'apartments westlands, westlands apartments for rent, 1 bedroom westlands, 2 bedroom westlands, studio westlands, flats westlands nairobi, westlands rental apartments, serviced apartments westlands',
  authors: [{ name: 'NewKenyan.com' }],
  alternates: {
    canonical: 'https://newkenyan.com/apartments-westlands',
  },
  openGraph: {
    title: 'Apartments in Westlands Nairobi 2025 - 600+ Premium Listings',
    description: 'Find modern apartments in Westlands from KES 25,000/month. Studios, 1BR, 2BR, 3BR near Sarit Centre, The Mall Westlands.',
    url: 'https://newkenyan.com/apartments-westlands',
    type: 'website',
    images: [
      {
        url: 'https://newkenyan.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Apartments for Rent in Westlands Nairobi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apartments in Westlands - 600+ Listings from KES 25K',
    description: 'Modern apartments in Westlands. Studios, 1BR, 2BR near Sarit Centre.',
    images: ['https://newkenyan.com/og-image.jpg'],
  },
};

export default function Page() {
  return <ApartmentsWestlandsClient />;
}
