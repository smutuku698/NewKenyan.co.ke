import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import {
  generatePropertySlug,
  generatePropertyMetaTags,
  generatePropertyHeadings
} from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import NeighborhoodLinks from '@/components/NeighborhoodLinks';
import PropertyDetailClient from './PropertyDetailClient';

// Revalidate pages every 24 hours (86400 seconds) for ISR
export const revalidate = 86400;

interface PropertyListing {
  id: string;
  created_at: string;
  property_title: string;
  property_type: string;
  description: string;
  price: number;
  price_type: string;
  bedrooms: number | null;
  bathrooms: number | null;
  square_feet: number | null;
  address: string;
  city: string;
  county: string | null;
  contact_phone: string;
  contact_email: string | null;
  whatsapp_number: string | null;
  amenities: string[];
  images: string[];
  available_from: string | null;
  is_furnished: boolean;
  pets_allowed: boolean;
  rating: number;
  review_count: number;
  is_approved: boolean;
  is_featured: boolean;
  views_count: number;
  user_id: string;
  construction_progress?: string | null;
  completion_date?: string | null;
  payment_plan?: string | null;
  nearby_features?: string[];
  external_features?: string[];
  internal_features?: string[];
}

async function getPropertyBySlug(slug: string): Promise<PropertyListing | null> {
  try {
    // First try to get by slug, if that fails try by ID for backward compatibility
    const { data, error } = await supabase
      .from('property_listings')
      .select('*')
      .eq('is_approved', true)
      .limit(1000); // Ensure we get enough properties to find matches

    if (error || !data) return null;

    // Find property by matching slug or ID
    const property = data.find(p => {
      const expectedSlug = generatePropertySlug(
        p.property_title, 
        p.property_type, 
        p.city, 
        p.bedrooms
      );
      // Try exact slug match first, then ID fallback
      return expectedSlug === slug || p.id === slug;
    });

    // If no property found, log for debugging (only in development)
    if (!property && process.env.NODE_ENV === 'development') {
      console.log('Property not found for slug:', slug);
      console.log('Available properties:', data.map(p => ({
        id: p.id,
        title: p.property_title,
        expectedSlug: generatePropertySlug(p.property_title, p.property_type, p.city, p.bedrooms)
      })).slice(0, 3));
    }

    return property || null;
  } catch (error) {
    console.error('Error fetching property:', error);
    return null;
  }
}


interface PageProps {
  params: { slug: string };
}

// Generate static params for all approved properties
export async function generateStaticParams() {
  try {
    const { data: properties } = await supabase
      .from('property_listings')
      .select('id, property_title, property_type, city, bedrooms')
      .eq('is_approved', true)
      .limit(1000); // Generate pages for up to 1000 properties

    if (!properties) return [];

    return properties.map((property) => ({
      slug: generatePropertySlug(
        property.property_title,
        property.property_type,
        property.city,
        property.bedrooms
      ),
    }));
  } catch (error) {
    console.error('Error generating static params for properties:', error);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const property = await getPropertyBySlug(resolvedParams.slug);
  
  if (!property) {
    return {
      title: 'Property Not Found | NewKenyan.com',
      description: 'The property you are looking for was not found.',
    };
  }

  const metaTags = generatePropertyMetaTags(
    property.property_title,
    property.price,
    property.city,
    property.property_type,
    property.bedrooms || undefined
  );

  const canonicalSlug = generatePropertySlug(
    property.property_title,
    property.property_type,
    property.city,
    property.bedrooms
  );

  return {
    title: metaTags.title,
    description: metaTags.description,
    keywords: metaTags.keywords,
    openGraph: {
      title: metaTags.title,
      description: metaTags.description,
      url: `https://newkenyan.com/properties/${canonicalSlug}`,
      siteName: 'NewKenyan.com',
      images: property.images.length > 0 ? [
        {
          url: property.images[0],
          width: 1200,
          height: 630,
          alt: `${property.property_title} in ${property.city}`,
        },
      ] : [],
      locale: 'en_KE',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTags.title,
      description: metaTags.description,
      images: property.images.length > 0 ? [property.images[0]] : [],
    },
    alternates: {
      canonical: `https://newkenyan.com/properties/${canonicalSlug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

async function getSimilarProperties(currentPropertyId: string, city: string, propertyType: string): Promise<PropertyListing[]> {
  try {
    const { data, error } = await supabase
      .from('property_listings')
      .select('*')
      .eq('is_approved', true)
      .neq('id', currentPropertyId)
      .ilike('city', `%${city}%`)
      .limit(3);

    if (error) {
      console.error('Error fetching similar properties:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching similar properties:', error);
    return [];
  }
}

export default async function PropertyPage({ params }: PageProps) {
  const resolvedParams = await params;
  const property = await getPropertyBySlug(resolvedParams.slug);

  if (!property) {
    notFound();
  }

  // Fetch similar properties
  const similarProperties = await getSimilarProperties(property.id, property.city, property.property_type);

  // Generate SEO-optimized headings
  const headings = generatePropertyHeadings(
    property.property_title,
    property.city,
    property.property_type,
    property.bedrooms || undefined
  );

  // Breadcrumb navigation
  const breadcrumbItems = [
    { label: 'Properties', href: '/properties' },
    { label: property.city, href: `/properties/city/${property.city.toLowerCase()}` },
    { label: property.property_title }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />
        
        {/* SEO-optimized headings */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            {headings.h1}
          </h1>
          <h2 className="text-lg text-gray-600 mb-4">
            {headings.h2}
          </h2>
        </div>

        {/* Property details component */}
        <PropertyDetailClient property={property} similarProperties={similarProperties} />

        {/* Unique Property Overview Section - Extended Content */}
        <div className="mt-12 bg-white p-8 rounded-lg border shadow-sm">
          <h2 className="text-2xl font-bold mb-6">
            {property.bedrooms}-Bedroom {property.property_type} for {property.price_type === 'rent' ? 'Rent' : 'Sale'} in {property.city}
          </h2>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            {/* Price and Key Info */}
            <div className="bg-gradient-to-br from-gray-50 to-green-50 p-6 rounded-lg border border-green-100">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-900 block mb-1">{property.price_type === 'rent' ? 'Monthly Rent' : 'Sale Price'}:</span>
                  <p className="text-green-600 font-bold text-lg">KSh {property.price.toLocaleString()}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900 block mb-1">Location:</span>
                  <p>{property.city}{property.county ? `, ${property.county}` : ''}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900 block mb-1">Property Type:</span>
                  <p>{property.property_type}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900 block mb-1">Bedrooms:</span>
                  <p>{property.bedrooms} Bed{property.bedrooms > 1 ? 's' : ''}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900 block mb-1">Bathrooms:</span>
                  <p>{property.bathrooms} Bath{property.bathrooms > 1 ? 's' : ''}</p>
                </div>
                {property.square_feet && (
                  <div>
                    <span className="font-semibold text-gray-900 block mb-1">Property Size:</span>
                    <p>{property.square_feet.toLocaleString()} sq ft</p>
                  </div>
                )}
                <div>
                  <span className="font-semibold text-gray-900 block mb-1">Furnishing:</span>
                  <p>{property.is_furnished ? 'Fully Furnished' : 'Unfurnished'}</p>
                </div>
                {property.available_from && (
                  <div>
                    <span className="font-semibold text-gray-900 block mb-1">Available:</span>
                    <p>{new Date(property.available_from).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Extended Personalized Overview */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Overview</h3>
              <div className="space-y-4 text-base">
                <p>
                  I'm excited to present <strong>{property.property_title}</strong>, {property.bedrooms ? `a stunning ${property.bedrooms}-bedroom` : 'an exceptional'} {property.property_type.toLowerCase()} that perfectly embodies {property.city === 'Nairobi' ? 'modern urban living in Kenya\'s capital' : `quality living in ${property.city}`}.
                  {property.square_feet ? ` Spanning an impressive ${property.square_feet.toLocaleString()} square feet, ` : ' '}
                  This property {property.is_furnished ? 'comes fully furnished with modern, high-quality furniture and appliances, allowing you to move in immediately without any hassle' : 'offers a blank canvas for you to personalize and make your own, with spacious rooms ready for your unique style'}.
                </p>

                <p>
                  Located at {property.address} in {property.city}{property.county ? `, ${property.county}` : ''}, this {property.property_type.toLowerCase()} features {property.bedrooms} {property.bedrooms > 1 ? 'generously-sized bedrooms' : 'spacious bedroom'} and {property.bathrooms} {property.bathrooms > 1 ? 'well-appointed bathrooms' : 'modern bathroom'},
                  {property.bedrooms >= 3 ? ' making it perfect for families who need extra space for children, home offices, or guest rooms' : property.bedrooms === 2 ? ' providing ample space for couples, small families, or professionals who work from home' : ' ideal for singles or couples seeking comfortable, manageable living space'}.
                  {property.pets_allowed ? ' Better yet, this is a pet-friendly property, so your furry family members are welcome to join you in your new home.' : ' Please note that this property has a no-pets policy.'}
                </p>

                <p>
                  {property.price_type === 'rent'
                    ? `Available for rent at KSh ${property.price.toLocaleString()} per month, this property represents excellent value for the quality and location offered. The rental includes access to ${property.amenities && property.amenities.length > 0 ? 'premium amenities and facilities' : 'all essential features'}${property.payment_plan ? `, and flexible payment arrangements are available: ${property.payment_plan}` : ', with standard deposit and payment terms'}.`
                    : `This property is offered for sale at KSh ${property.price.toLocaleString()}, representing ${property.city === 'Nairobi' ? 'an excellent investment opportunity in Kenya\'s most dynamic property market' : `great value in ${property.city}\'s growing real estate market`}.${property.payment_plan ? ` ${property.payment_plan}` : ' Various financing options may be available through local banks and financial institutions.'}`
                  }
                </p>
              </div>
            </div>

            {/* Key Features - Enhanced */}
            {property.amenities && property.amenities.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Key Features</h3>
                <p className="mb-4">
                  {property.property_title} comes equipped with an impressive array of features designed to enhance your daily living experience:
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-start bg-green-50 p-3 rounded-lg">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-gray-800">{amenity}</span>
                    </div>
                  ))}
                </div>
                {property.external_features && property.external_features.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">External Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {property.external_features.map((feature, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {property.internal_features && property.internal_features.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Internal Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {property.internal_features.map((feature, index) => (
                        <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Detailed Neighborhood Guide */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">About the Neighborhood</h3>
              <div className="space-y-4">
                <p>
                  One of the standout aspects of {property.property_title} is its prime location in {property.city}.
                  {property.city === 'Nairobi'
                    ? ' As Kenya\'s bustling capital and economic hub, Nairobi offers unparalleled access to business districts, entertainment venues, international schools, and world-class healthcare facilities.'
                    : property.city === 'Mombasa'
                    ? ' Mombasa, Kenya\'s second-largest city and main coastal hub, combines beachside living with urban amenities, offering residents a unique tropical lifestyle with excellent business opportunities.'
                    : property.city === 'Kisumu'
                    ? ' Kisumu, strategically located on the shores of Lake Victoria, is a rapidly growing city offering a perfect blend of lakeside tranquility and urban development opportunities.'
                    : ` ${property.city} is a thriving Kenyan town offering quality infrastructure, growing business opportunities, and a peaceful environment away from the hustle of major cities.`
                  }
                </p>

                {property.nearby_features && property.nearby_features.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Nearby Amenities & Facilities:</h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {property.nearby_features.map((feature, index) => (
                        <div key={index} className="flex items-center bg-gray-50 p-3 rounded-lg border">
                          <span className="text-blue-600 mr-2">📍</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-sm text-gray-600">
                      These nearby facilities ensure that everything you need for daily life - from groceries and healthcare to entertainment and education - is just minutes away.
                    </p>
                  </div>
                )}

                <p>
                  The {property.address} location provides {property.city === 'Nairobi' ? 'excellent connectivity via major roads and public transport, making your daily commute smooth whether you\'re heading to Westlands, Upper Hill, CBD, or Karen' : `convenient access to ${property.city}'s main areas and key transport routes`}.
                  {property.price_type === 'rent'
                    ? ` This makes ${property.property_title} an ideal rental choice for professionals working in the area, families seeking good schools and amenities, or anyone who values convenience and quality of life.`
                    : ` For property investors, this location offers strong potential for capital appreciation and rental yields, backed by ${property.city}'s ongoing development and infrastructure improvements.`
                  }
                </p>
              </div>
            </div>

            {/* Lifestyle & Living Experience */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Lifestyle & Living Experience</h3>
              <div className="space-y-4">
                <p>
                  Living at {property.property_title} means more than just having a roof over your head - it's about embracing a lifestyle of {property.is_furnished ? 'modern convenience and comfort' : 'personalized comfort and flexibility'}.
                  {property.bedrooms >= 3
                    ? ' With three or more bedrooms, families will appreciate the space for children to grow, dedicated home offices for remote work, and room for guests without feeling cramped.'
                    : property.bedrooms === 2
                    ? ' The two-bedroom layout strikes the perfect balance - enough space for comfort and flexibility, whether that\'s a home office, nursery, or guest room, while remaining manageable for busy professionals or small families.'
                    : ' The single-bedroom configuration is perfect for those who value quality over quantity, with well-designed living spaces that maximize functionality without unnecessary maintenance.'
                  }
                </p>

                <p>
                  {property.property_type.toLowerCase().includes('apartment') || property.property_type.toLowerCase().includes('flat')
                    ? `Apartment living at ${property.property_title} offers the convenience of modern amenities with minimal maintenance responsibilities. ${property.amenities && property.amenities.some(a => a.toLowerCase().includes('gym') || a.toLowerCase().includes('pool') || a.toLowerCase().includes('security')) ? 'The building\'s shared facilities provide resort-style living - imagine starting your day with a workout in the on-site gym, or cooling off in the pool after work, all without leaving home.' : 'The well-managed complex ensures your living experience is hassle-free, with professional maintenance and security teams handling the details.'}`
                    : property.property_type.toLowerCase().includes('house') || property.property_type.toLowerCase().includes('bungalow') || property.property_type.toLowerCase().includes('villa')
                    ? `House living at ${property.property_title} gives you the freedom and privacy that comes with your own standalone property. ${property.external_features && property.external_features.length > 0 ? `Enjoy your private outdoor space for ${property.external_features.some(f => f.toLowerCase().includes('garden')) ? 'gardening, children\'s play, or outdoor entertaining' : 'barbecues, relaxation, and making lasting family memories'}.` : 'You\'ll have complete control over your living environment, with the space to create your perfect home.'}  ${property.pets_allowed ? 'The property is pet-friendly, so your dogs can run freely in the yard!' : ''}`
                    : `This ${property.property_type.toLowerCase()} offers the best of both worlds - ${property.bedrooms >= 3 ? 'spacious family living' : 'compact efficiency'} combined with ${property.amenities && property.amenities.length > 3 ? 'premium amenities' : 'essential facilities'} that make daily life comfortable and convenient.`
                  }
                </p>

                {property.is_furnished && (
                  <p>
                    The property comes fully furnished with quality furniture, modern appliances, and all the essentials you need. This is particularly ideal for expatriates relocating to Kenya, professionals on short-term assignments, or anyone who wants to move in immediately without the hassle and expense of buying furniture. Simply bring your personal belongings and start enjoying your new home from day one.
                  </p>
                )}
              </div>
            </div>

            {/* Investment Value (for sale properties) */}
            {property.price_type === 'sale' && (
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Investment Potential</h3>
                <div className="space-y-3">
                  <p>
                    <strong>Why {property.property_title} is a Smart Investment:</strong>
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span><strong>Prime Location:</strong> {property.city === 'Nairobi' ? 'Nairobi\'s property market has shown consistent growth, with prime areas seeing 5-8% annual appreciation' : `${property.city} is experiencing rapid development with improving infrastructure and growing demand`}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span><strong>Rental Income Potential:</strong> {property.bedrooms >= 3 ? 'Large family homes command premium rents from expatriates and affluent local families' : property.bedrooms === 2 ? 'Two-bedroom properties are highly sought after by young professionals and small families, ensuring strong rental demand' : 'Studio and one-bedroom units have the highest occupancy rates due to constant demand from singles and couples'}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span><strong>Quality Construction:</strong> {property.year_built ? `Built in ${property.year_built}, this property ${new Date().getFullYear() - property.year_built < 5 ? 'is nearly new with modern standards and minimal maintenance needs' : 'has stood the test of time while offering opportunities for value-adding renovations'}` : 'The property features quality construction and finishes that ensure long-term value retention'}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span><strong>Ready Market:</strong> Properties in {property.city} with {property.bedrooms} bedrooms typically {property.price_type === 'rent' ? 'rent within 2-4 weeks' : 'sell within 3-6 months'} when priced competitively</span>
                    </li>
                  </ul>
                  <p className="mt-4 text-sm">
                    <em>Note: Property values and rental rates fluctuate based on market conditions. Consult with a qualified property advisor or financial planner before making investment decisions.</em>
                  </p>
                </div>
              </div>
            )}

            {/* Detailed Listing Information */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{property.price_type === 'rent' ? 'Rental' : 'Purchase'} Details</h3>
              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <span className="font-semibold text-gray-900 block mb-1">{property.price_type === 'rent' ? 'Monthly Rent:' : 'Sale Price:'}</span>
                    <p className="text-2xl font-bold text-green-600">KSh {property.price.toLocaleString()}</p>
                  </div>
                  {property.available_from && (
                    <div>
                      <span className="font-semibold text-gray-900 block mb-1">Available From:</span>
                      <p className="text-lg">{new Date(property.available_from).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                  )}
                </div>

                {property.price_type === 'rent' && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">What You Need to Know:</h4>
                    <ul className="space-y-2 text-sm">
                      <li><strong>Security Deposit:</strong> Typically 1-2 months' rent (confirm with owner)</li>
                      <li><strong>Lease Terms:</strong> Minimum 12-month lease preferred</li>
                      <li><strong>Utilities:</strong> May be separate or included (confirm with owner)</li>
                      <li><strong>Maintenance:</strong> {property.property_type.toLowerCase().includes('apartment') ? 'Building maintenance usually included; personal items tenant responsibility' : 'Tenant typically responsible for minor repairs; major structural items landlord responsibility'}</li>
                    </ul>
                  </div>
                )}

                {property.payment_plan && (
                  <div>
                    <span className="font-semibold text-gray-900 block mb-2">Payment Terms:</span>
                    <p className="bg-white p-4 rounded border">{property.payment_plan}</p>
                  </div>
                )}

                {property.construction_progress && (
                  <div>
                    <span className="font-semibold text-gray-900 block mb-2">Construction Status:</span>
                    <p><span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">{property.construction_progress}</span></p>
                    {property.completion_date && (
                      <p className="mt-2 text-sm">Expected completion: {new Date(property.completion_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Get in Touch</h3>
              <p className="mb-4">
                Ready to {property.price_type === 'rent' ? 'view this property and make it your new home' : 'schedule a viewing or discuss this investment opportunity'}?
                Contact the property owner directly using the information below:
              </p>
              <div className="space-y-3">
                <div className="flex items-center bg-white p-4 rounded-lg border">
                  <span className="text-2xl mr-3">📞</span>
                  <div>
                    <span className="font-semibold text-gray-900 block">Call / WhatsApp:</span>
                    <a href={`tel:${property.contact_phone}`} className="text-green-600 hover:text-green-700 font-semibold text-lg">
                      {property.contact_phone}
                    </a>
                  </div>
                </div>
                {property.contact_email && (
                  <div className="flex items-center bg-white p-4 rounded-lg border">
                    <span className="text-2xl mr-3">📧</span>
                    <div>
                      <span className="font-semibold text-gray-900 block">Email:</span>
                      <a href={`mailto:${property.contact_email}`} className="text-green-600 hover:text-green-700">
                        {property.contact_email}
                      </a>
                    </div>
                  </div>
                )}
                <p className="text-sm text-gray-600 mt-4">
                  <strong>Viewing Tip:</strong> When you call, mention the property reference "{property.property_title}" and the address at {property.address}.
                  Ask about viewing times, current availability, and any questions you have about {property.price_type === 'rent' ? 'lease terms' : 'purchase process'}.
                </p>
              </div>
            </div>

            {/* Why You'll Love This Property - Extended */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Why {property.property_title} Should Be Your Next Home</h3>
              <div className="space-y-4">
                <p>
                  After reviewing all the features and benefits, it's clear that <strong>{property.property_title}</strong> stands out in {property.city}'s property market for several compelling reasons:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 p-4 rounded-lg border">
                    <h4 className="font-semibold text-gray-900 mb-2">🏠 Space & Layout</h4>
                    <p className="text-sm">
                      {property.is_furnished ? 'Move-in ready with modern furnishings' : 'Flexible space for your personal style'},
                      {property.bedrooms >= 3 ? ' perfect for growing families' : property.bedrooms === 2 ? ' ideal for small families or professionals' : ' great for singles or couples'}{property.square_feet ? ` across ${property.square_feet.toLocaleString()} sq ft` : ''}.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-lg border">
                    <h4 className="font-semibold text-gray-900 mb-2">📍 Prime Location</h4>
                    <p className="text-sm">
                      Located in {property.city}'s {property.city === 'Nairobi' ? 'well-connected suburbs' : 'prime residential area'},
                      with {property.nearby_features && property.nearby_features.length > 0 ? `convenient access to ${property.nearby_features.slice(0, 2).join(' and ')}` : 'excellent proximity to essential amenities'}.
                    </p>
                  </div>
                  {property.amenities && property.amenities.length > 3 && (
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border">
                      <h4 className="font-semibold text-gray-900 mb-2">✨ Premium Amenities</h4>
                      <p className="text-sm">
                        Enjoy {property.amenities.length}+ features including {property.amenities.slice(0, 2).join(', ')},
                        ensuring comfort and convenience for modern living.
                      </p>
                    </div>
                  )}
                  <div className="bg-gradient-to-br from-pink-50 to-red-50 p-4 rounded-lg border">
                    <h4 className="font-semibold text-gray-900 mb-2">💰 Great Value</h4>
                    <p className="text-sm">
                      {property.price_type === 'rent'
                        ? `At KSh ${property.price.toLocaleString()}/month, competitive pricing for the quality and location offered`
                        : `Priced at KSh ${property.price.toLocaleString()}, representing ${property.city === 'Nairobi' ? 'solid investment potential in Kenya\'s capital' : 'excellent value in a growing market'}`
                      }
                    </p>
                  </div>
                </div>
                <p className="mt-4">
                  Whether you're {property.bedrooms >= 3 ? 'a family looking for space to grow and thrive' : property.bedrooms === 2 ? 'a couple seeking a comfortable home or a professional wanting a home office setup' : 'seeking your first home or a convenient urban base'},
                  {property.property_title} offers the perfect blend of {property.is_furnished ? 'convenience' : 'flexibility'}, {property.amenities && property.amenities.length > 3 ? 'luxury amenities' : 'quality finishes'}, and prime location that makes it {property.price_type === 'rent' ? 'an ideal place to call home' : 'a smart property investment'}.
                </p>
                <p className="font-semibold text-green-700 text-lg mt-4">
                  Don't miss this opportunity - contact the owner today at {property.contact_phone} to arrange your viewing!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Neighborhood Links - Internal Linking */}
        {property.county && (
          <NeighborhoodLinks
            county={property.county}
            currentCity={property.city}
            propertyType={property.property_type.toLowerCase().includes('apartment') ? 'apartment' : 'house'}
            className="mt-12"
          />
        )}

        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateListing",
              "name": property.property_title,
              "description": property.description,
              "url": `https://newkenyan.com/properties/${generatePropertySlug(property.property_title, property.property_type, property.city, property.bedrooms)}`,
              "image": property.images,
              "price": property.price,
              "priceCurrency": "KES",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": property.address,
                "addressLocality": property.city,
                "addressRegion": property.county || property.city,
                "addressCountry": "KE"
              },
              "geo": property.city === "Nairobi" ? {
                "@type": "GeoCoordinates",
                "latitude": -1.2921,
                "longitude": 36.8219
              } : undefined,
              "numberOfBedrooms": property.bedrooms,
              "numberOfBathroomsTotal": property.bathrooms,
              "floorSize": property.square_feet ? {
                "@type": "QuantitativeValue",
                "value": property.square_feet,
                "unitCode": "FTK"
              } : undefined,
              "amenityFeature": property.amenities.map(amenity => ({
                "@type": "LocationFeatureSpecification",
                "name": amenity
              })),
              "datePosted": property.created_at,
              "availabilityStarts": property.available_from,
              "isAccessibleForFree": false,
              "offers": {
                "@type": "Offer",
                "price": property.price,
                "priceCurrency": "KES",
                "availability": "https://schema.org/InStock"
              },
              "provider": {
                "@type": "Organization",
                "name": "NewKenyan.com",
                "url": "https://newkenyan.com"
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
                  "name": "Properties",
                  "item": "https://newkenyan.com/properties"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": property.city,
                  "item": `https://newkenyan.com/properties/city/${property.city.toLowerCase()}`
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "name": property.property_title,
                  "item": `https://newkenyan.com/properties/${generatePropertySlug(property.property_title, property.property_type, property.city, property.bedrooms)}`
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
                  "name": `What is the average rent for ${property.property_type.toLowerCase()}s in ${property.city}?`,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Property prices in ${property.city} vary based on location, size, and amenities. This ${property.property_type.toLowerCase()} is priced at KES ${property.price.toLocaleString()} which is competitive for the area.`
                  }
                },
                {
                  "@type": "Question",
                  "name": `Are there other ${property.bedrooms}-bedroom properties available in ${property.city}?`,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Yes, we have various ${property.bedrooms}-bedroom properties available in ${property.city}. Browse our listings to find options that match your budget and preferences.`
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