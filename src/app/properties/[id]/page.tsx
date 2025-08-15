'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
  Eye
} from 'lucide-react';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (params.id) {
      fetchProperty();
    }
  }, [params.id]);

  const fetchProperty = async () => {
    try {
      const { data, error } = await supabase
        .from('property_listings')
        .select('*')
        .eq('id', params.id)
        .eq('is_approved', true) // Only show approved properties
        .single();

      if (error) {
        console.error('Error fetching property:', error);
        setError('Property not found');
      } else {
        setProperty(data);
        // This is where we would normally increment views, but we're using automated tracking
      }
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

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
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
            {/* Image Gallery */}
            <div className="mb-6">
              {property.images && property.images.length > 0 ? (
                <div>
                  <div className="relative h-96 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={property.images[currentImageIndex]}
                      alt={property.property_title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-white">
                      <Eye className="h-4 w-4" />
                      <span className="text-sm">{property.views_count.toLocaleString()} views</span>
                    </div>
                  </div>

                  {property.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {property.images.map((image, index) => (
                        <div
                          key={index}
                          className={`relative h-20 rounded cursor-pointer overflow-hidden ${
                            index === currentImageIndex ? 'ring-2 ring-green-500' : ''
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                        >
                          <Image
                            src={image}
                            alt={`Property image ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">No images available</p>
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.property_title}</h1>
                    <div className="flex items-center space-x-2 text-gray-600 mb-2">
                      <Badge variant="secondary">{property.property_type}</Badge>
                      {property.is_featured && (
                        <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
                      )}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {property.address}, {property.city}
                      {property.county && `, ${property.county}`}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-green-600">
                      {formatPrice(property.price, property.price_type)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {property.price_type === 'rent' ? 'Monthly rent' : 'Sale price'}
                    </p>
                  </div>
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
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </div>

              {/* Property Features */}
              <div>
                <h2 className="text-xl font-semibold mb-3">Property Features</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <span className="font-medium">Furnished:</span>
                    <span className="ml-2">{property.is_furnished ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium">Pets Allowed:</span>
                    <span className="ml-2">{property.pets_allowed ? 'Yes' : 'No'}</span>
                  </div>
                  {property.available_from && (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="font-medium">Available from:</span>
                      <span className="ml-2">{new Date(property.available_from).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-3">Amenities</h2>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((amenity, index) => (
                      <Badge key={index} variant="outline" className="capitalize">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-gray-600" />
                  <span className="text-gray-700">{property.contact_phone}</span>
                </div>

                {property.contact_email && (
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-3 text-gray-600" />
                    <span className="text-gray-700">{property.contact_email}</span>
                  </div>
                )}

                {property.whatsapp_number && (
                  <div className="flex items-center">
                    <MessageCircle className="h-5 w-5 mr-3 text-gray-600" />
                    <span className="text-gray-700">{property.whatsapp_number}</span>
                  </div>
                )}
              </div>

              {/* Contact Buttons */}
              <div className="mt-6 space-y-3">
                <Button
                  onClick={() => handleContactClick('phone')}
                  variant="outline"
                  className="w-full border-green-600 text-green-600 hover:bg-green-50"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
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

              {/* Property Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">{property.views_count.toLocaleString()}</p>
                    <p className="text-gray-600">Views</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">
                      {new Date(property.created_at).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600">Listed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Safety Notice */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">Safety Tips</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Always view the property in person</li>
                <li>• Never send money without seeing the property</li>
                <li>• Verify the landlord&apos;s identity</li>
                <li>• Get all agreements in writing</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}