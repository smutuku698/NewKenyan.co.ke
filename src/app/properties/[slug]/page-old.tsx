'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Bed, 
  Bath, 
  Square, 
  Calendar,
  ArrowLeft,
  Heart,
  Share2,
  Eye,
  Home,
  ChevronRight,
  ChevronDown,
  Star,
  Shield,
  CheckCircle
} from 'lucide-react';
import { 
  generatePropertySlug, 
  generatePropertyTitle, 
  generatePropertyDescription, 
  generatePropertyKeywords,
  getSimilarProperties
} from '@/utils/seo';

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
}

export default function PropertyDetailPage() {
  const params = useParams();
  const [property, setProperty] = useState<PropertyListing | null>(null);
  const [similarProperties, setSimilarProperties] = useState<PropertyListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  useEffect(() => {
    if (params.id) {
      fetchProperty();
    }
  }, [params.id]);

  const fetchProperty = async () => {
    try {
      // Fetch the main property
      const { data: propertyData, error: propertyError } = await supabase
        .from('property_listings')
        .select('*')
        .eq('id', params.id)
        .eq('is_approved', true) // Only show approved properties
        .single();

      if (propertyError) {
        console.error('Error fetching property:', propertyError);
        setError('Property not found');
        return;
      }

      setProperty(propertyData);

      // Fetch similar properties
      const { data: allProperties, error: allPropertiesError } = await supabase
        .from('property_listings')
        .select('*')
        .eq('is_approved', true)
        .limit(50); // Get a good sample for similarity matching

      if (!allPropertiesError && allProperties) {
        const similar = getSimilarProperties(allProperties, propertyData, 6);
        setSimilarProperties(similar);
      }

      // Increment views (if you want to track)
      await supabase
        .from('property_listings')
        .update({ views_count: propertyData.views_count + 1 })
        .eq('id', params.id);

    } catch (error) {
      console.error('Error:', error);
      setError('Failed to load property');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number, priceType: string) => {
    return `KSh ${price.toLocaleString()}${priceType === 'rent' ? '/month' : ''}`;
  };

  const handleContactClick = (type: 'phone' | 'whatsapp' | 'email') => {
    if (!property) return;
    
    switch (type) {
      case 'phone':
        window.open(`tel:${property.contact_phone}`);
        break;
      case 'whatsapp':
        if (property.whatsapp_number) {
          window.open(`https://wa.me/${property.whatsapp_number.replace('+', '')}`);
        }
        break;
      case 'email':
        if (property.contact_email) {
          window.open(`mailto:${property.contact_email}`);
        }
        break;
    }
  };

  // Generate property-specific FAQ based on property type and features
  const generatePropertyFAQ = (property: PropertyListing) => {
    const baseQuestions = [
      {
        question: `What is included in the rent for this ${property.property_type.toLowerCase()} in ${property.city}?`,
        answer: `This ${property.property_type.toLowerCase()} includes the main living space with ${property.bedrooms || 'multiple'} bedroom(s) and ${property.bathrooms || 'bathroom(s)'}. ${property.is_furnished ? 'The property comes fully furnished.' : 'This is an unfurnished property.'} Additional amenities include: ${property.amenities?.join(', ') || 'standard amenities'}. Contact the property owner for detailed information about utilities and services included.`
      },
      {
        question: `How do I schedule a viewing for this property in ${property.city}?`,
        answer: `To schedule a viewing for this ${property.property_type.toLowerCase()}, contact the property owner directly using the contact information provided. You can call ${property.contact_phone}${property.whatsapp_number ? ` or WhatsApp ${property.whatsapp_number}` : ''}. We recommend viewing the property in person before making any commitments.`
      },
      {
        question: `Are pets allowed in this ${property.property_type.toLowerCase()}?`,
        answer: `${property.pets_allowed ? 'Yes, pets are allowed in this property.' : 'Pets are not permitted in this property.'} Please confirm the pet policy directly with the property owner as terms and conditions may apply.`
      },
      {
        question: `What are the nearby amenities around this property in ${property.city}?`,
        answer: `This property is located in ${property.address}, ${property.city}. The area typically offers good access to shopping centers, schools, hospitals, and public transportation. For specific information about nearby amenities, check our <a href='/properties' class='text-green-600 hover:underline'>properties section</a> or contact the property owner.`
      },
      {
        question: `What documents do I need to rent this ${property.property_type.toLowerCase()}?`,
        answer: `Typically, you'll need a valid ID, proof of income, references, and a security deposit. For this specific property, contact the owner at ${property.contact_phone} for exact requirements. Always ensure you get a written rental agreement. Check our <a href='/blog' class='text-green-600 hover:underline'>blog</a> for rental tips and advice.`
      },
      {
        question: `Is this property listing verified and legitimate?`,
        answer: `All properties on NewKenyan.com go through our verification process. However, we always recommend viewing the property in person, verifying the owner's identity, and getting all agreements in writing. Never send money without seeing the property first. Visit our <a href='/business-directory' class='text-green-600 hover:underline'>business directory</a> for verified property agents.`
      }
    ];

    // Add property-type specific questions
    if (property.property_type.toLowerCase().includes('house')) {
      baseQuestions.push({
        question: `What is the construction quality of this house in ${property.city}?`,
        answer: `This house in ${property.city} has been listed with detailed specifications. For information about construction materials, building quality, and recent renovations, contact the property owner directly. We recommend a professional inspection before finalizing any rental or purchase agreement.`
      });
    }

    if (property.price_type === 'sale') {
      baseQuestions.push({
        question: `What are the property transfer and legal costs for buying this ${property.property_type.toLowerCase()}?`,
        answer: `Property transfer costs in Kenya typically include stamp duty, legal fees, and registration costs. For this property priced at KSh ${property.price.toLocaleString()}, consult with a qualified lawyer for exact costs. Find legal professionals in our <a href='/business-directory' class='text-green-600 hover:underline'>business directory</a>.`
      });
    }

    return baseQuestions;
  };

  const propertyFAQ = property ? generatePropertyFAQ(property) : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-gray-600">Loading property...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">Property Not Found</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link href="/properties">
              <Button className="bg-green-600 hover:bg-green-700">
                Browse All Properties
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Generate SEO metadata
  const seoTitle = generatePropertyTitle(property.property_title, property.city, property.price_type, property.price);
  const seoDescription = generatePropertyDescription(
    property.property_title, 
    property.property_type, 
    property.city, 
    property.bedrooms, 
    property.bathrooms, 
    property.amenities, 
    property.price_type
  );
  const seoKeywords = generatePropertyKeywords(
    property.property_type, 
    property.city, 
    property.county, 
    property.price_type, 
    property.bedrooms, 
    property.amenities
  );
  const propertySlug = generatePropertySlug(property.property_title, property.property_type, property.city, property.bedrooms);

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={seoKeywords} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://newkenyan.com/properties/${propertySlug}`} />
        {property.images && property.images[0] && (
          <meta property="og:image" content={property.images[0]} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <link rel="canonical" href={`https://newkenyan.com/properties/${propertySlug}`} />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateListing",
              "name": property.property_title,
              "description": property.description,
              "url": `https://newkenyan.com/properties/${propertySlug}`,
              "image": property.images || [],
              "offers": {
                "@type": "Offer",
                "price": property.price,
                "priceCurrency": "KES",
                "availability": "https://schema.org/InStock",
                "priceSpecification": {
                  "@type": "PriceSpecification",
                  "price": property.price,
                  "priceCurrency": "KES"
                }
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": property.address,
                "addressLocality": property.city,
                "addressRegion": property.county || property.city,
                "addressCountry": "KE"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "addressCountry": "KE"
              },
              "floorSize": {
                "@type": "QuantitativeValue",
                "value": property.square_feet,
                "unitCode": "FTK"
              },
              "numberOfRooms": property.bedrooms,
              "numberOfBathroomsTotal": property.bathrooms,
              "petsAllowed": property.pets_allowed,
              "furnished": property.is_furnished,
              "datePosted": property.created_at,
              "broker": {
                "@type": "Organization",
                "name": "NewKenyan.com",
                "url": "https://newkenyan.com"
              }
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Header />
        
        {/* Breadcrumb Navigation */}
        <div className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-green-600">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/properties" className="hover:text-green-600">Properties</Link>
              <ChevronRight className="h-4 w-4" />
              <Link href={`/properties?city=${property.city}`} className="hover:text-green-600">{property.city}</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-gray-900 truncate">{property.property_title}</span>
            </nav>
          </div>
        </div>
        
        <main className="max-w-6xl mx-auto px-4 py-8">
          {/* Back Button */}
          <div className="mb-6">
            <Link href="/properties" className="inline-flex items-center text-green-600 hover:text-green-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Properties
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Property Header */}
              <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">{property.property_title}</h1>
                    <div className="flex items-center space-x-3 mb-3">
                      <Badge variant="secondary" className="text-sm">{property.property_type}</Badge>
                      {property.is_featured && (
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-green-700 border-green-300">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="h-4 w-4 mr-2" />
                      {property.address}, {property.city}
                      {property.county && `, ${property.county}`}
                    </div>
                    
                    {/* Property Stats */}
                    <div className="flex items-center space-x-6 text-gray-600">
                      {property.bedrooms && (
                        <div className="flex items-center">
                          <Bed className="h-5 w-5 mr-2" />
                          <span>{property.bedrooms} bed{property.bedrooms > 1 ? 's' : ''}</span>
                        </div>
                      )}
                      {property.bathrooms && (
                        <div className="flex items-center">
                          <Bath className="h-5 w-5 mr-2" />
                          <span>{property.bathrooms} bath{property.bathrooms > 1 ? 's' : ''}</span>
                        </div>
                      )}
                      {property.square_feet && (
                        <div className="flex items-center">
                          <Square className="h-5 w-5 mr-2" />
                          <span>{property.square_feet.toLocaleString()} sq ft</span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <Eye className="h-5 w-5 mr-2" />
                        <span>{property.views_count.toLocaleString()} views</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-3xl font-bold text-green-600 mb-1">
                      {formatPrice(property.price, property.price_type)}
                    </p>
                    <p className="text-sm text-gray-600 mb-3">
                      {property.price_type === 'rent' ? 'Monthly rent' : 'Sale price'}
                    </p>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-500">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-500">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Gallery */}
              <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Property Photos</h2>
                {property.images && property.images.length > 0 ? (
                  <div>
                    <div className="relative h-96 mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={property.images[currentImageIndex]}
                        alt={`${property.property_title} - ${property.city} property for ${property.price_type}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                        className="object-cover"
                        priority
                      />
                    </div>

                    {property.images.length > 1 && (
                      <div className="grid grid-cols-6 gap-2">
                        {property.images.map((image, index) => (
                          <div
                            key={index}
                            className={`relative h-20 rounded cursor-pointer overflow-hidden border-2 transition-colors ${
                              index === currentImageIndex ? 'border-green-500' : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setCurrentImageIndex(index)}
                          >
                            <Image
                              src={image}
                              alt={`Property view ${index + 1}`}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <Home className="h-12 w-12 mx-auto mb-2" />
                      <p>No images available</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Property Details */}
              <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Property Description</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{property.description}</p>
              </div>

              {/* Property Features */}
              <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Property Features & Details</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                    <span className="text-sm">
                      <strong>Furnished:</strong> {property.is_furnished ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                    <span className="text-sm">
                      <strong>Pets Allowed:</strong> {property.pets_allowed ? 'Yes' : 'No'}
                    </span>
                  </div>
                  {property.available_from && (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                      <span className="text-sm">
                        <strong>Available:</strong> {new Date(property.available_from).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                    <span className="text-sm">
                      <strong>Listed:</strong> {new Date(property.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">Amenities & Features</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        <span className="text-sm capitalize">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
                <h3 className="text-lg font-semibold mb-4">Contact Property Owner</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-3 text-gray-600" />
                    <span className="text-sm text-gray-700">{property.contact_phone}</span>
                  </div>

                  {property.contact_email && (
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-3 text-gray-600" />
                      <span className="text-sm text-gray-700">{property.contact_email}</span>
                    </div>
                  )}

                  {property.whatsapp_number && (
                    <div className="flex items-center">
                      <MessageCircle className="h-4 w-4 mr-3 text-gray-600" />
                      <span className="text-sm text-gray-700">{property.whatsapp_number}</span>
                    </div>
                  )}
                </div>

                {/* Contact Buttons */}
                <div className="space-y-2">
                  <Button
                    onClick={() => handleContactClick('phone')}
                    variant="outline"
                    className="w-full border-green-600 text-green-600 hover:bg-green-50"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Owner
                  </Button>

                  {property.whatsapp_number && (
                    <Button
                      onClick={() => handleContactClick('whatsapp')}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      WhatsApp
                    </Button>
                  )}

                  {property.contact_email && (
                    <Button
                      onClick={() => handleContactClick('email')}
                      variant="outline"
                      className="w-full"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                  )}
                </div>
              </div>

              {/* Safety Notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-2">Safety First</h4>
                    <ul className="text-sm text-amber-700 space-y-1">
                      <li>• Always view property in person</li>
                      <li>• Never pay without seeing the property</li>
                      <li>• Verify owner&apos;s identity</li>
                      <li>• Get agreements in writing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* More Properties Section */}
          {similarProperties.length > 0 && (
            <section className="mt-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">More Properties in {property.city}</h2>
                <Link 
                  href={`/properties?city=${property.city}`}
                  className="text-green-600 hover:text-green-700 font-semibold flex items-center"
                >
                  View All Properties in {property.city}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {similarProperties.map((similarProperty) => (
                  <PropertyCard 
                    key={similarProperty.id} 
                    id={similarProperty.id}
                    title={similarProperty.property_title}
                    type={similarProperty.property_type}
                    price={similarProperty.price}
                    bedrooms={similarProperty.bedrooms || undefined}
                    bathrooms={similarProperty.bathrooms || undefined}
                    location={`${similarProperty.city}${similarProperty.county ? `, ${similarProperty.county}` : ''}`}
                    city={similarProperty.city}
                    images={similarProperty.images}
                    amenities={similarProperty.amenities}
                    contactPhone={similarProperty.contact_phone}
                    whatsappNumber={similarProperty.whatsapp_number || undefined}
                  />
                ))}
              </div>
            </section>
          )}

          {/* FAQ Section */}
          <section className="mt-16">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                <p className="text-gray-600">
                  Common questions about this {property.property_type.toLowerCase()} in {property.city}
                </p>
              </div>

              <div className="space-y-4">
                {propertyFAQ.map((faq, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm border">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                      <ChevronDown 
                        className={`h-5 w-5 text-gray-500 transform transition-transform ${
                          openFAQ === index ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    {openFAQ === index && (
                      <div className="px-6 pb-4">
                        <div 
                          className="text-gray-600 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: faq.answer }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <p className="text-gray-600 mb-4">
                  Need more information about properties in {property.city}?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/properties">Browse All Properties</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/blog">Property Investment Tips</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
}