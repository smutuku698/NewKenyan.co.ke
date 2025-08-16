import { Metadata } from 'next';
import JobsPageClient from './JobsPageClient';

export const metadata: Metadata = {
  title: 'Jobs in Kenya - Find Employment Opportunities | NewKenyan.com',
  description: 'Discover thousands of job opportunities across Kenya. From Nairobi to Mombasa, find your next career move. Latest vacancies in all industries and experience levels.',
  keywords: 'jobs in Kenya, Kenya employment, job opportunities Kenya, careers Kenya, Nairobi jobs, Mombasa jobs, job vacancies Kenya, employment opportunities',
  openGraph: {
    title: 'Jobs in Kenya - Find Employment Opportunities | NewKenyan.com',
    description: 'Discover thousands of job opportunities across Kenya. From Nairobi to Mombasa, find your next career move.',
    url: 'https://newkenyan.com/jobs-in-kenya',
    siteName: 'NewKenyan.com',
    images: [{
      url: 'https://newkenyan.com/og-jobs.jpg',
      width: 1200,
      height: 630,
    }],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jobs in Kenya - Find Employment Opportunities | NewKenyan.com',
    description: 'Discover thousands of job opportunities across Kenya. From Nairobi to Mombasa, find your next career move.',
    images: ['https://newkenyan.com/og-jobs.jpg'],
  },
  alternates: {
    canonical: 'https://newkenyan.com/jobs-in-kenya',
  },
};

export default function JobsInKenyaPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Jobs in Kenya',
    description: 'Find employment opportunities across Kenya on NewKenyan.com',
    url: 'https://newkenyan.com/jobs-in-kenya',
    mainEntity: {
      '@type': 'JobBoard',
      name: 'NewKenyan.com Jobs',
      description: 'Premier job board for employment opportunities across Kenya',
      url: 'https://newkenyan.com/jobs-in-kenya',
      provider: {
        '@type': 'Organization',
        name: 'NewKenyan.com',
        url: 'https://newkenyan.com'
      },
      areaServed: {
        '@type': 'Country',
        name: 'Kenya'
      },
      industry: [
        'Technology',
        'Healthcare', 
        'Education',
        'Finance',
        'Manufacturing',
        'Hospitality',
        'Agriculture',
        'Construction',
        'Retail',
        'Transport'
      ]
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://newkenyan.com'
        },
        {
          '@type': 'ListItem', 
          position: 2,
          name: 'Jobs in Kenya',
          item: 'https://newkenyan.com/jobs-in-kenya'
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JobsPageClient />
    </>
  );
}