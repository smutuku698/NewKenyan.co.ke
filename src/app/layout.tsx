import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import CookieConsent from '@/components/CookieConsent';
import GoogleTagManager, { GoogleTagManagerNoScript } from '@/components/GoogleTagManager';
import SEOOptimizations from '@/components/SEOOptimizations';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://newkenyan.com'),
  title: "NewKenyan.com - Find Jobs, Businesses & Properties in Kenya",
  description: "Discover job opportunities, explore businesses, and find properties across Kenya on NewKenyan.com. Your gateway to Kenya's digital economy with verified listings and trusted connections.",
  keywords: "Kenya jobs, jobs in Kenya, Kenya business directory, properties for sale Kenya, houses for rent Nairobi, apartments Kenya, office space rent Kenya, business opportunities Kenya, employment Kenya, real estate Kenya",
  authors: [{ name: "Legit Hustles" }],
  creator: "NewKenyan.com",
  publisher: "Legit Hustles",
  openGraph: {
    title: "NewKenyan.com - Find Jobs, Businesses & Properties in Kenya",
    description: "Discover job opportunities, explore businesses, and find properties across Kenya on NewKenyan.com.",
    url: "https://newkenyan.com",
    siteName: "NewKenyan.com",
    type: "website",
    locale: "en_KE",
    images: [
      {
        url: "https://newkenyan.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NewKenyan.com - Kenya's Premier Opportunity Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NewKenyan.com - Find Jobs, Businesses & Properties in Kenya",
    description: "Discover job opportunities, explore businesses, and find properties across Kenya.",
    images: ["https://newkenyan.com/og-image.jpg"],
    site: "@newkenyan",
    creator: "@newkenyan",
  },
  alternates: {
    canonical: "https://newkenyan.com",
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
  category: "Business Directory",
  classification: "Business & Employment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    throw new Error('Missing Publishable Key')
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <html lang="en">
        <head>
          <meta name="google-site-verification" content="RV-BVBthjlDouZHZJbNOL0ts9uKXyoCQ2AF6Dyed4-0" />
          <meta name="msvalidate.01" content="C8F8E8A5B5F5A5B8C8D8E8F8A5B5C5D8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
          <meta name="theme-color" content="#10B981" />
          <link rel="canonical" href="https://newkenyan.com" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/manifest.webmanifest" />
          <GoogleTagManager />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "NewKenyan.com",
                "alternateName": "NewKenyan",
                "description": "Kenya's premier digital platform connecting people with job opportunities, businesses, and properties across the nation.",
                "url": "https://newkenyan.com",
                "logo": "https://newkenyan.com/logo.png",
                "foundingDate": "2024",
                "founder": {
                  "@type": "Organization",
                  "name": "Legit Hustles"
                },
                "contactPoint": [
                  {
                    "@type": "ContactPoint",
                    "telephone": "+254-700-000-000",
                    "email": "info@newkenyan.com",
                    "contactType": "customer service",
                    "areaServed": "KE",
                    "availableLanguage": ["English", "Swahili"]
                  },
                  {
                    "@type": "ContactPoint",
                    "email": "partnerships@newkenyan.com",
                    "contactType": "partnerships",
                    "areaServed": "KE"
                  },
                  {
                    "@type": "ContactPoint",
                    "email": "advertising@newkenyan.com",
                    "contactType": "advertising",
                    "areaServed": "KE"
                  }
                ],
                "address": {
                  "@type": "PostalAddress",
                  "addressCountry": "KE",
                  "addressLocality": "Nairobi",
                  "addressRegion": "Nairobi County"
                },
                "areaServed": {
                  "@type": "Country",
                  "name": "Kenya"
                },
                "serviceType": ["Job Board", "Business Directory", "Real Estate Listings", "Employment Services"],
                "knowsAbout": [
                  "Kenya Jobs",
                  "Kenyan Business Directory", 
                  "Kenya Real Estate",
                  "Property Listings",
                  "Employment Opportunities",
                  "Business Networking"
                ],
                "sameAs": [
                  "https://twitter.com/newkenyan",
                  "https://facebook.com/newkenyan",
                  "https://linkedin.com/company/newkenyan"
                ],
                "potentialAction": [
                  {
                    "@type": "SearchAction",
                    "target": "https://newkenyan.com/jobs-in-kenya?search={search_term_string}",
                    "query-input": "required name=search_term_string"
                  },
                  {
                    "@type": "SearchAction",
                    "target": "https://newkenyan.com/properties?search={search_term_string}",
                    "query-input": "required name=search_term_string"
                  },
                  {
                    "@type": "SearchAction",
                    "target": "https://newkenyan.com/business-directory?search={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                ]
              })
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "NewKenyan.com",
                "alternateName": "NewKenyan",
                "description": "Kenya's premier digital platform for property rentals, business directory, and job listings across Nairobi and all major cities.",
                "url": "https://newkenyan.com",
                "logo": "https://newkenyan.com/logo.png",
                "image": "https://newkenyan.com/og-image.jpg",
                "telephone": "+254-736-407-642",
                "email": "info@newkenyan.com",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "CBD",
                  "addressLocality": "Nairobi",
                  "addressRegion": "Nairobi County",
                  "postalCode": "00100",
                  "addressCountry": "KE"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": -1.2921,
                  "longitude": 36.8219
                },
                "openingHours": "Mo-Su 00:00-23:59",
                "priceRange": "Free",
                "currenciesAccepted": "KES",
                "paymentAccepted": "Cash, Mobile Money, Credit Card",
                "areaServed": [
                  {
                    "@type": "City",
                    "name": "Nairobi"
                  },
                  {
                    "@type": "City", 
                    "name": "Mombasa"
                  },
                  {
                    "@type": "City",
                    "name": "Kisumu"
                  },
                  {
                    "@type": "Country",
                    "name": "Kenya"
                  }
                ],
                "serviceType": [
                  "Property Rental Services",
                  "Real Estate Listings", 
                  "Business Directory",
                  "Job Board",
                  "Employment Services"
                ],
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "NewKenyan Services",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Houses for Rent in Nairobi",
                        "description": "Find affordable rental properties in Nairobi and across Kenya"
                      }
                    },
                    {
                      "@type": "Offer", 
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Property Sales Listings",
                        "description": "Browse apartments and houses for sale in Kenya"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service", 
                        "name": "Job Opportunities in Kenya",
                        "description": "Discover employment opportunities across all industries in Kenya"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Business Directory",
                        "description": "Find verified businesses and companies across Kenya"
                      }
                    }
                  ]
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.8",
                  "reviewCount": "1200",
                  "bestRating": "5",
                  "worstRating": "1"
                }
              })
            }}
          />
        </head>
        <body
          className={`${inter.variable} font-sans antialiased`}
        >
          <GoogleTagManagerNoScript />
          <GoogleAnalytics />
          <SEOOptimizations />
          {children}
          <CookieConsent />
        </body>
      </html>
    </ClerkProvider>
  );
}
