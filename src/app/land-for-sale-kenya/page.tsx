import type { Metadata } from 'next';
import LandForSaleKenyaClient from './LandForSaleKenyaClient';

export const metadata: Metadata = {
  metadataBase: new URL('https://newkenyan.com'),
  title: 'Land for Sale in Kenya 2025 - 2000+ Plots & Acres from KES 500K',
  description: 'Buy land in Kenya from KES 500,000. Browse 2000+ verified plots & acres in Nairobi, Kiambu, Machakos, Kajiado, Nakuru. Residential, commercial & agricultural land with ready title deeds.',
  keywords: 'land for sale kenya, plots for sale kenya, buy land nairobi, land kiambu, plots machakos, land kajiado, agricultural land kenya, commercial plots kenya, eighth acre plots, quarter acre land',
  authors: [{ name: 'NewKenyan.com' }],
  alternates: {
    canonical: 'https://newkenyan.com/land-for-sale-kenya',
  },
  openGraph: {
    title: 'Land for Sale in Kenya 2025 - 2000+ Verified Plots & Acres',
    description: 'Buy land in Kenya from KES 500,000. Residential, commercial & agricultural land with ready title deeds.',
    url: 'https://newkenyan.com/land-for-sale-kenya',
    type: 'website',
    images: [
      {
        url: 'https://newkenyan.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Land for Sale in Kenya',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Land for Sale in Kenya - 2000+ Plots from KES 500K',
    description: 'Buy verified land in Kenya. Residential, commercial & agricultural plots.',
    images: ['https://newkenyan.com/og-image.jpg'],
  },
};

export default function Page() {
  return <LandForSaleKenyaClient />;
}
