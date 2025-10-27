import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Website Design & Development Services Kenya - Fast & SEO Optimized | NewKenyan.com',
  description: 'Professional website design and development services in Kenya. Get a lightning-fast, mobile-responsive website with advanced SEO, starting from KSh 25,000. Next.js, React, e-commerce, and custom web solutions.',
  keywords: 'website design Kenya, web development Kenya, website services Nairobi, SEO websites Kenya, e-commerce website Kenya, Next.js development, React websites Kenya, responsive web design, business websites Kenya',
  openGraph: {
    title: 'Website Design & Development Services Kenya | NewKenyan.com',
    description: 'Professional website design and development services in Kenya. Lightning-fast, mobile-responsive, SEO-optimized websites from KSh 25,000.',
    url: 'https://newkenyan.com/website-services',
    siteName: 'NewKenyan.com',
    images: [{
      url: 'https://newkenyan.com/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Website Design & Development Services Kenya'
    }],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website Design & Development Services Kenya | NewKenyan.com',
    description: 'Professional, fast, SEO-optimized websites from KSh 25,000. Next.js & React development.',
    images: ['https://newkenyan.com/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://newkenyan.com/website-services',
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

export default function WebsiteServicesLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}
