import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
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
        </head>
        <body
          className={`${inter.variable} font-sans antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
