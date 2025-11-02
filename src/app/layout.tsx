import type { Metadata } from "next";
import { Inter, Manrope, Source_Sans_3 } from "next/font/google";
import { AuthProvider } from '@/components/AuthProvider';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import CookieConsent from '@/components/CookieConsent';
import GoogleTagManager, { GoogleTagManagerNoScript } from '@/components/GoogleTagManager';
import SEOOptimizations from '@/components/SEOOptimizations';
import SiteProtection from '@/components/SiteProtection';
import "./globals.css";

// Primary font for headings - Modern and professional
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
  display: 'swap',
});

// Body font - Highly readable
const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: 'swap',
});

// Fallback font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
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
  return (
    <html lang="en">
        <head>
          {/* Resource hints for critical origins */}
          <link rel="preconnect" href="https://gsdctfcfkrtuxnwapjcj.supabase.co" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://cheerful-llama-11.clerk.accounts.dev" />
          <link rel="dns-prefetch" href="https://static.cloudflareinsights.com" />
          <link rel="dns-prefetch" href="https://clerk-telemetry.com" />

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
                "@graph": [
                  {
                    "@type": "Organization",
                    "@id": "https://newkenyan.com/#/schema/Organization/1",
                    "name": "NewKenyan.com",
                    "legalName": "NewKenyan Limited",
                    "alternateName": "NewKenyan",
                    "description": "NewKenyan.com is Kenya's premier digital platform connecting people with job opportunities, businesses, and properties across the nation.",
                    "url": "https://newkenyan.com",
                    "logo": {
                      "@id": "https://newkenyan.com/logo.png"
                    },
                    "image": [
                      {
                        "@type": "ImageObject",
                        "@id": "https://newkenyan.com/logo.png",
                        "url": "https://newkenyan.com/logo.png",
                        "contentUrl": "https://newkenyan.com/logo.png"
                      }
                    ],
                    "email": "info@newkenyan.com",
                    "telephone": "+254 736 7642",
                    "address": {
                      "@id": "https://newkenyan.com/#/schema/Address/Organization/1"
                    },
                    "contactPoint": {
                      "@type": "ContactPoint",
                      "telephone": "+254 736 7642",
                      "contactType": "Customer Support",
                      "email": "info@newkenyan.com"
                    },
                    "founder": [
                      {
                        "@id": "https://newkenyan.com/#/schema/Person/simon-nthen"
                      }
                    ],
                    "parentOrganization": {
                      "@id": "https://newkenyan.com/#/schema/Organization/LegitHustlesKe"
                    },
                    "award": [
                      "Best Internet Marketing Portal, East Africa Property Association (EAPA), 2014",
                      "Best Online Real Estate Platform, Digital Inclusion Award, 2017",
                      "Best Digital Real Estate Platform, The Kenya Real Estate Awards, 2017",
                      "Property Portal of the Year, Real Estate 100 Awards, 2017",
                      "Property Web Portal of the Year, Kenya Professional Realtors Association (KPRA), 2018",
                      "Best Digital Real Estate Platform in Kenya, Digital Inclusion Awards, 2018",
                      "Best Real Estate Marketing Portal, Digital Tech Excellence Awards, 2019",
                      "Best Real Estate Marketing Platform, Real Estate Excellence Awards, 2019",
                      "Best Online Real Estate Marketing Platform, Real Estate Excellence Awards, 2019",
                      "Best Real Estate Marketing Platform, Real Estate Excellence Awards, 2020",
                      "Property Marketplace of the Year, Kenya e-Commerce Awards, 2022",
                      "Best Property Listings Portal, Real Estate 100 Awards, 2023",
                      "Best Property Listings Portal, Digital Tech 100 Awards, 2023",
                      "Gold Winner, Best Real Estate Marketplace, Kenya E-commerce Awards, 2023",
                      "Property Marketplace of the Year, Kenya e-Commerce Awards, 2023"
                    ],
                    "sameAs": [
                      "https://www.facebook.com/profile.php?id=61565698142992",
                      "https://twitter.com/SimonNthen66255",
                      "https://www.linkedin.com/company/108658379",
                      "https://www.pinterest.com/ApartmentsForRentNow/",
                      "https://www.youtube.com/channel/UCUDNMT7Aa3MFh8lY2nz9Y0Q"
                    ],
                    "memberOf": [
                      {
                        "@id": "https://newkenyan.com/#/schema/Organization/KDPA"
                      }
                    ]
                  },
                  {
                    "@type": "Organization",
                    "@id": "https://newkenyan.com/#/schema/Organization/LegitHustlesKe",
                    "name": "Legit Hustles Ke",
                    "url": "https://newkenyan.com"
                  },
                  {
                    "@type": "Organization",
                    "@id": "https://newkenyan.com/#/schema/Organization/KDPA",
                    "alternateName": "KDPA",
                    "name": "Kenyan Property Developers Association",
                    "url": "http://www.kpda.or.ke/",
                    "sameAs": [
                      "https://www.google.com/maps/place/Kenya+Property+Developers+Association/@-1.2934067,36.787611,17z/data=!3m1!4b1!4m6!3m5!1s0x182f10a307d21ba1:0x181c2f43a63faa50!8m2!3d-1.2934067!4d36.7901859!16s%2Fg%2F1ygbb8ftw?entry=ttu"
                    ]
                  },
                  {
                    "@type": "Person",
                    "@id": "https://newkenyan.com/#/schema/Person/simon-nthen",
                    "givenName": "Simon",
                    "familyName": "Nthen",
                    "jobTitle": "Founder of NewKenyan.com",
                    "sameAs": [
                      "https://twitter.com/SimonNthen66255"
                    ]
                  },
                  {
                    "@type": "PostalAddress",
                    "@id": "https://newkenyan.com/#/schema/Address/Organization/1",
                    "streetAddress": "4th Floor, Wing B - West End Towers, Waiyaki Way",
                    "addressLocality": "Westlands",
                    "addressRegion": "Nairobi",
                    "addressCountry": "KE"
                  },
                  {
                    "@type": "WebSite",
                    "@id": "https://newkenyan.com/#/schema/WebSite/1",
                    "url": "https://newkenyan.com",
                    "name": "NewKenyan.com",
                    "alternateName": "newkenyan.com",
                    "publisher": {
                      "@id": "https://newkenyan.com/#/schema/Organization/1"
                    }
                  },
                  {
                    "@type": "ImageObject",
                    "@id": "https://newkenyan.com/logo.png",
                    "url": "https://newkenyan.com/logo.png",
                    "contentUrl": "https://newkenyan.com/logo.png",
                    "caption": "NewKenyan.com Logo"
                  },
                  {
                    "@type": "WebPage",
                    "@id": "https://newkenyan.com",
                    "url": "https://newkenyan.com",
                    "name": "Search for Jobs, Properties & Businesses in Kenya",
                    "description": "Find trusted opportunities, connect with verified businesses and discover your next home. Kenya's premier platform for jobs, properties and business connections.",
                    "isPartOf": {
                      "@id": "https://newkenyan.com/#/schema/WebSite/1"
                    },
                    "dateModified": "2025-08-20T18:10:41.771401Z",
                    "primaryImageOfPage": {
                      "@id": "https://newkenyan.com/logo.png"
                    }
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
          className={`${manrope.variable} ${sourceSans.variable} ${inter.variable} font-body antialiased`}
        >
          <GoogleTagManagerNoScript />
          <GoogleAnalytics />
          <SEOOptimizations />
          <SiteProtection />
          <AuthProvider>
            {children}
          </AuthProvider>
          <CookieConsent />
        </body>
      </html>
  );
}
