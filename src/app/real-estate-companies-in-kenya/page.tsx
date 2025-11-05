import type { Metadata } from 'next';
import RealEstateCompaniesPage from './RealEstateCompaniesPage';

export const metadata: Metadata = {
  title: 'Best Real Estate Companies in Kenya 2025 | Top Realtors & Property Investment Agents',
  description: 'Find the best real estate agents and property investment companies in Kenya. Compare top realtors, commercial real estate firms, and trusted property agents in Nairobi. Expert guide for buyers and investors.',
  keywords: [
    'real estate companies in Kenya',
    'best real estate agent in kenya',
    'realtors in kenya',
    'property investment companies in kenya',
    'real estate agent in kenya',
    'commercial real estate kenya',
    'property agents in kenya',
    'real estate companies nairobi',
    'best realtors kenya',
    'property investment kenya',
    'houses for sale in Kenya',
    'real estate developers Kenya',
    'property market Kenya',
    'Nairobi real estate',
    'Kenya property listings',
    'land for sale Kenya',
    'real estate consultants kenya',
    'property management companies kenya',
    'real estate firms nairobi',
    'trusted real estate agents kenya'
  ],
  openGraph: {
    title: 'Best Real Estate Companies in Kenya 2025 | Top Realtors & Property Investment Agents',
    description: 'Find the best real estate agents and property investment companies in Kenya. Compare top realtors, commercial real estate firms, and trusted property agents.',
    type: 'website',
    url: 'https://newkenyan.co.ke/real-estate-companies-in-kenya',
    images: [
      {
        url: '/images/real-estate-kenya-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Real Estate Companies in Kenya - Market Overview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Real Estate Companies in Kenya 2025 | Top Realtors & Property Agents',
    description: 'Find the best real estate agents, realtors, and property investment companies in Kenya. Compare top commercial real estate firms and trusted property agents.',
  },
  alternates: {
    canonical: 'https://newkenyan.co.ke/real-estate-companies-in-kenya',
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

export default function Page() {
  return <RealEstateCompaniesPage />;
}
