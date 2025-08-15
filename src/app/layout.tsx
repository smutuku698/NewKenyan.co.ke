import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "NewKenyan.com - Houses for Rent & Sale in Nairobi Kenya | Jobs | Business Directory",
  description: "Find houses for rent, apartments for sale, affordable properties, and job opportunities in Nairobi Kenya. Leading real estate marketplace and business directory. Office space for rent, land for sale.",
  keywords: "house for rent, apartment for rent, house for sale, apartment for sale, houses for sale in Nairobi Kenya, apartment for rent in Nairobi, affordable houses, land for sale in Kenya, office space for rent, business daily kenya, companies in kenya, jobs in kenya, job opportunities in kenya, houses for rent in nairobi",
  authors: [{ name: "NewKenyan.com" }],
  creator: "NewKenyan.com",
  publisher: "NewKenyan.com",
  openGraph: {
    title: "NewKenyan.com - Houses for Rent & Sale in Nairobi Kenya | Jobs | Business Directory",
    description: "Find houses for rent, apartments for sale, affordable properties, and job opportunities in Nairobi Kenya. Leading real estate marketplace and business directory.",
    url: "https://newkenyan.com",
    siteName: "NewKenyan.com",
    type: "website",
    locale: "en_KE",
  },
  twitter: {
    card: "summary_large_image",
    title: "NewKenyan.com - Houses for Rent & Sale in Nairobi Kenya",
    description: "Find houses for rent, apartments for sale, affordable properties, and job opportunities in Nairobi Kenya.",
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
                "@type": "RealEstateAgent",
                "name": "NewKenyan.com",
                "description": "Leading real estate marketplace and business directory in Kenya offering houses for rent, apartments for sale, job opportunities, and business listings.",
                "url": "https://newkenyan.com",
                "logo": "https://newkenyan.com/logo.png",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+254736407642",
                  "email": "hr@newkenyan.com",
                  "contactType": "customer service",
                  "areaServed": "KE",
                  "availableLanguage": ["English", "Swahili"]
                },
                "address": {
                  "@type": "PostalAddress",
                  "addressCountry": "KE",
                  "addressRegion": "Nairobi"
                },
                "areaServed": {
                  "@type": "Country",
                  "name": "Kenya"
                },
                "serviceType": ["Real Estate", "Property Management", "Job Board", "Business Directory"],
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://newkenyan.com/properties?search={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
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
