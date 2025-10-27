import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Real Estate Services in Kenya - Property Marketing & Listing | NewKenyan.com',
  description: 'Professional real estate services in Kenya. Property photography, listing, marketing, and promotion services for landlords, agents, and developers. Get your property seen by thousands of potential buyers and renters.',
  keywords: 'real estate services Kenya, property marketing Kenya, property photography Kenya, real estate listing services, property promotion Kenya, real estate marketing Nairobi, property listing services',
  openGraph: {
    title: 'Real Estate Services in Kenya - Property Marketing & Listing | NewKenyan.com',
    description: 'Professional real estate services in Kenya. Property photography, listing, marketing, and promotion services.',
    url: 'https://newkenyan.com/real-estate-services',
    siteName: 'NewKenyan.com',
    images: [{
      url: 'https://newkenyan.com/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Real Estate Services in Kenya'
    }],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Real Estate Services in Kenya - Property Marketing & Listing',
    description: 'Professional real estate services in Kenya. Property photography, listing, and marketing.',
    images: ['https://newkenyan.com/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://newkenyan.com/real-estate-services',
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

export default function RealEstateServicesLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}
