import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kenya Business Directory - Find Companies & Services | NewKenyan.com',
  description: 'Explore Kenya\'s most comprehensive business directory. Find verified companies, services, and businesses across Nairobi, Mombasa, Kisumu and all major cities. Contact details, reviews, and ratings.',
  keywords: 'Kenya business directory, companies in Kenya, businesses in Kenya, Nairobi businesses, Mombasa companies, Kenya companies list, business listings Kenya, verified businesses Kenya, Kenya business contacts',
  openGraph: {
    title: 'Kenya Business Directory - Find Companies & Services | NewKenyan.com',
    description: 'Explore Kenya\'s most comprehensive business directory. Find verified companies and services.',
    url: 'https://newkenyan.com/business-directory',
    siteName: 'NewKenyan.com',
    images: [{
      url: 'https://newkenyan.com/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Kenya Business Directory'
    }],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kenya Business Directory - Find Companies & Services | NewKenyan.com',
    description: 'Explore Kenya\'s most comprehensive business directory',
    images: ['https://newkenyan.com/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://newkenyan.com/business-directory',
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

export default function BusinessDirectoryLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}
