import type { Metadata } from 'next';
import ApartmentsKilimaniClient from './ApartmentsKilimaniClient';

export const metadata: Metadata = {
  metadataBase: new URL('https://newkenyan.com'),
  title: 'Apartments in Kilimani Nairobi 2025 - 700+ Listings from KES 20,000',
  description: 'Find modern apartments for rent in Kilimani, Nairobi from KES 20,000/month. Browse 700+ verified listings - studios, 1BR, 2BR, 3BR near Yaya Centre. Vibrant neighborhood.',
  keywords: 'apartments kilimani, kilimani apartments for rent, 1 bedroom kilimani, 2 bedroom kilimani, studio kilimani, flats kilimani nairobi, kilimani rental apartments, yaya centre apartments',
  authors: [{ name: 'NewKenyan.com' }],
  alternates: {
    canonical: 'https://newkenyan.com/apartments-kilimani',
  },
  openGraph: {
    title: 'Apartments in Kilimani Nairobi 2025 - 700+ Modern Listings',
    description: 'Find apartments in Kilimani from KES 20,000/month. Studios, 1BR, 2BR, 3BR near Yaya Centre, restaurants & nightlife.',
    url: 'https://newkenyan.com/apartments-kilimani',
    type: 'website',
    images: [
      {
        url: 'https://newkenyan.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Apartments for Rent in Kilimani Nairobi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apartments in Kilimani - 700+ Listings from KES 20K',
    description: 'Modern apartments in Kilimani. Near Yaya Centre, restaurants, nightlife.',
    images: ['https://newkenyan.com/og-image.jpg'],
  },
};

export default function Page() {
  return <ApartmentsKilimaniClient />;
}
