import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Properties for Rent & Sale in Kenya - Houses, Apartments & Land | NewKenyan.com',
  description: 'Browse thousands of properties for rent and sale across Kenya. Find houses, apartments, land, and commercial properties in Nairobi, Mombasa, Kisumu and more. Verified listings with photos and direct contact to property owners.',
  keywords: 'properties Kenya, houses for rent Kenya, apartments for sale Kenya, land for sale Kenya, property listings Kenya, Nairobi properties, Mombasa properties, Kisumu real estate, rental properties Kenya, commercial property Kenya, residential property Kenya',
  openGraph: {
    title: 'Properties for Rent & Sale in Kenya | NewKenyan.com',
    description: 'Browse thousands of verified property listings across Kenya. Houses, apartments, land, and commercial properties.',
    url: 'https://newkenyan.com/properties',
    siteName: 'NewKenyan.com',
    images: [{
      url: 'https://newkenyan.com/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Properties for Rent and Sale in Kenya'
    }],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Properties for Rent & Sale in Kenya | NewKenyan.com',
    description: 'Browse thousands of verified property listings across Kenya',
    images: ['https://newkenyan.com/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://newkenyan.com/properties',
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
};

export default function PropertiesLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}
