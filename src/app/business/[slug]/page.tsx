import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { 
  generateBusinessSlug, 
  generateBusinessMetaTags, 
  generateBusinessHeadings 
} from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import BusinessDetailClient from './BusinessDetailClient';

interface BusinessListing {
  id: string;
  business_name: string;
  category: string;
  description: string;
  address: string;
  city: string;
  pin_location_url: string | null;
  phone: string;
  email: string | null;
  website: string | null;
  business_days: string | null;
  pricing_info: string | null;
  image_url: string | null;
  rating: number;
  review_count: number;
  is_verified: boolean;
  created_at: string;
  whatsapp_number: string | null;
  is_approved: boolean;
}

interface PageProps {
  params: { slug: string };
}

async function getBusinessBySlug(slug: string): Promise<BusinessListing | null> {
  try {
    // First try to get by slug, if that fails try by ID for backward compatibility
    const { data, error } = await supabase
      .from('business_listings')
      .select('*')
      .eq('is_approved', true);

    if (error || !data) return null;

    // Find business by matching slug or ID
    const business = data.find(b => {
      const expectedSlug = generateBusinessSlug(
        b.business_name, 
        b.city, 
        b.category
      );
      return expectedSlug === slug || b.id === slug;
    });

    return business || null;
  } catch (error) {
    console.error('Error fetching business:', error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const business = await getBusinessBySlug(params.slug);
  
  if (!business) {
    return {
      title: 'Business Not Found | NewKenyan.com',
      description: 'The business you are looking for was not found.',
    };
  }

  const metaTags = generateBusinessMetaTags(
    business.business_name,
    business.city,
    business.category,
    business.description
  );

  const canonicalSlug = generateBusinessSlug(
    business.business_name,
    business.city,
    business.category
  );

  return {
    title: metaTags.title,
    description: metaTags.description,
    keywords: metaTags.keywords,
    openGraph: {
      title: metaTags.title,
      description: metaTags.description,
      url: `https://newkenyan.com/business/${canonicalSlug}`,
      siteName: 'NewKenyan.com',
      images: business.image_url ? [
        {
          url: business.image_url,
          width: 1200,
          height: 630,
          alt: `${business.business_name} - ${business.category} in ${business.city}`,
        },
      ] : [],
      locale: 'en_KE',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTags.title,
      description: metaTags.description,
      images: business.image_url ? [business.image_url] : [],
    },
    alternates: {
      canonical: `https://newkenyan.com/business/${canonicalSlug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BusinessPage({ params }: PageProps) {
  const business = await getBusinessBySlug(params.slug);

  if (!business) {
    notFound();
  }

  // Generate SEO-optimized headings
  const headings = generateBusinessHeadings(
    business.business_name,
    business.city,
    business.category
  );

  // Breadcrumb navigation
  const breadcrumbItems = [
    { label: 'Business Directory', href: '/business-directory' },
    { label: business.city, href: `/business-directory/city/${business.city.toLowerCase()}` },
    { label: business.category, href: `/business-directory?category=${business.category}` },
    { label: business.business_name }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />
        
        {/* SEO-optimized headings */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {headings.h1}
          </h1>
          <h2 className="text-xl text-gray-600 mb-6">
            {headings.h2}
          </h2>
        </div>

        {/* Business details component */}
        <BusinessDetailClient business={business} />

        {/* Local SEO content */}
        <div className="mt-12 bg-gray-50 p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">
            About {business.category} Services in {business.city}
          </h3>
          <div className="prose max-w-none text-gray-600">
            <p>
              {business.city} offers excellent {business.category.toLowerCase()} services with {business.business_name} 
              being a trusted provider. Located at {business.address}, they provide 
              quality services to the local community.
            </p>
            
            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2">Why Choose {business.business_name}:</h4>
              <ul className="list-disc pl-6">
                <li>{business.is_verified ? 'Verified business on NewKenyan.com' : 'Listed business on NewKenyan.com'}</li>
                <li>Local {business.category.toLowerCase()} expertise in {business.city}</li>
                <li>Rated {business.rating} stars by {business.review_count} customers</li>
                <li>Easy contact via phone{business.whatsapp_number ? ', WhatsApp' : ''}{business.email ? ', and email' : ''}</li>
              </ul>
            </div>
            
            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2">
                Other {business.category} Services in {business.city}
              </h4>
              <p>
                Looking for more {business.category.toLowerCase()} options in {business.city}? Browse our comprehensive 
                business directory to find other local service providers, compare services, and read customer reviews.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6">
            Frequently Asked Questions about {business.business_name}
          </h3>
          <div className="space-y-4">
            {[
              {
                question: `What services does ${business.business_name} offer in ${business.city}?`,
                answer: `${business.business_name} is a ${business.category.toLowerCase()} business located in ${business.city}. ${business.description || 'Contact them directly for detailed information about their services and offerings.'} You can reach them at ${business.phone}.`
              },
              {
                question: `How can I contact ${business.business_name}?`,
                answer: `You can contact ${business.business_name} by calling ${business.phone}${business.whatsapp_number ? ` or via WhatsApp at ${business.whatsapp_number}` : ''}${business.email ? `. You can also email them at ${business.email}` : ''}. They are located at ${business.address}, ${business.city}.`
              },
              {
                question: `What are the business hours for ${business.business_name}?`,
                answer: business.business_days ? `${business.business_name} operates during: ${business.business_days}. For the most current hours and availability, please call ${business.phone} before visiting.` : `Contact ${business.business_name} directly at ${business.phone} for their current business hours and availability.`
              },
              {
                question: `What do customers say about ${business.business_name}?`,
                answer: `${business.business_name} has a rating of ${business.rating} stars based on ${business.review_count} customer reviews. They are ${business.is_verified ? 'a verified business' : 'listed'} on NewKenyan.com's business directory.`
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
                <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": business.business_name,
              "description": business.description,
              "url": business.website || `https://newkenyan.com/business/${generateBusinessSlug(business.business_name, business.city, business.category)}`,
              "image": business.image_url,
              "address": {
                "@type": "PostalAddress",
                "streetAddress": business.address,
                "addressLocality": business.city,
                "addressCountry": "KE"
              },
              "geo": business.city === "Nairobi" ? {
                "@type": "GeoCoordinates",
                "latitude": -1.2921,
                "longitude": 36.8219
              } : undefined,
              "telephone": business.phone,
              "email": business.email,
              "openingHours": business.business_days,
              "priceRange": business.pricing_info,
              "aggregateRating": business.review_count > 0 ? {
                "@type": "AggregateRating",
                "ratingValue": business.rating,
                "reviewCount": business.review_count,
                "bestRating": "5",
                "worstRating": "1"
              } : undefined,
              "serviceArea": {
                "@type": "City",
                "name": business.city
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": `${business.category} Services`,
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": `${business.category} Services in ${business.city}`,
                      "description": business.description || `Professional ${business.category.toLowerCase()} services`
                    }
                  }
                ]
              },
              "founder": {
                "@type": "Organization",
                "name": "NewKenyan.com"
              }
            })
          }}
        />

        {/* BreadcrumbList Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://newkenyan.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Business Directory",
                  "item": "https://newkenyan.com/business-directory"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": business.city,
                  "item": `https://newkenyan.com/business-directory/city/${business.city.toLowerCase()}`
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "name": business.category,
                  "item": `https://newkenyan.com/business-directory?category=${business.category}`
                },
                {
                  "@type": "ListItem",
                  "position": 5,
                  "name": business.business_name,
                  "item": `https://newkenyan.com/business/${generateBusinessSlug(business.business_name, business.city, business.category)}`
                }
              ]
            })
          }}
        />

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": `What services does ${business.business_name} offer in ${business.city}?`,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `${business.business_name} is a ${business.category.toLowerCase()} business located in ${business.city}. ${business.description || 'Contact them directly for detailed information about their services and offerings.'}`
                  }
                },
                {
                  "@type": "Question",
                  "name": `How can I contact ${business.business_name}?`,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `You can contact ${business.business_name} by calling ${business.phone}${business.whatsapp_number ? ` or via WhatsApp at ${business.whatsapp_number}` : ''}${business.email ? `. You can also email them at ${business.email}` : ''}. They are located at ${business.address}, ${business.city}.`
                  }
                }
              ]
            })
          }}
        />
      </main>

      <Footer />
    </div>
  );
}