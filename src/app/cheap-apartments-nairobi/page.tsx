import type { Metadata } from 'next';
import CheapApartmentsNairobiClient from './CheapApartmentsNairobiClient';

export const metadata: Metadata = {
  metadataBase: new URL('https://newkenyan.com'),
  title: 'Cheap Apartments in Nairobi 2025 - 1000+ Listings from KES 10,000',
  description: 'Find affordable apartments for rent in Nairobi from KES 10,000/month. Browse 1000+ verified budget listings in Kasarani, Rongai, Githurai, Kitengela, Pipeline. Save money, live well.',
  keywords: 'cheap apartments nairobi, affordable apartments nairobi, budget apartments nairobi, apartments under 20000 nairobi, cheap 1 bedroom nairobi, cheap 2 bedroom nairobi, low cost housing nairobi',
  authors: [{ name: 'NewKenyan.com' }],
  alternates: {
    canonical: 'https://newkenyan.com/cheap-apartments-nairobi',
  },
  openGraph: {
    title: 'Cheap Apartments in Nairobi 2025 - 1000+ Affordable Listings',
    description: 'Find budget apartments in Nairobi from KES 10,000/month. Kasarani, Rongai, Githurai, Kitengela.',
    url: 'https://newkenyan.com/cheap-apartments-nairobi',
    type: 'website',
    images: [
      {
        url: 'https://newkenyan.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Cheap Apartments for Rent in Nairobi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cheap Apartments in Nairobi - 1000+ from KES 10K',
    description: 'Affordable apartments in Nairobi. Budget-friendly rentals from KES 10,000.',
    images: ['https://newkenyan.com/og-image.jpg'],
  },
};

export default function Page() {
  return <CheapApartmentsNairobiClient />;
}
