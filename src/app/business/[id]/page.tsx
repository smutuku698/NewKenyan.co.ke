'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReviewSystem from '@/components/ReviewSystem';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  Phone, 
  MessageCircle, 
  MapPin, 
  CheckCircle, 
  Mail, 
  Globe, 
  Clock, 
  DollarSign,
  ExternalLink 
} from 'lucide-react';

interface BusinessDetails {
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
}

export default function BusinessDetailPage() {
  const params = useParams();
  const businessId = params.id as string;
  const [business, setBusiness] = useState<BusinessDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBusinessDetails = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('business_listings')
        .select('*')
        .eq('id', businessId)
        .eq('is_approved', true)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          setError('Business not found');
        } else {
          console.error('Error fetching business:', error);
          setError('Failed to load business details');
        }
      } else {
        setBusiness(data);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to load business details');
    } finally {
      setLoading(false);
    }
  }, [businessId]);

  useEffect(() => {
    if (businessId) {
      fetchBusinessDetails();
    }
  }, [businessId, fetchBusinessDetails]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-12">
              <p className="text-gray-600">Loading business details...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !business) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-600 mb-4">{error}</h2>
              <Button onClick={() => window.history.back()}>
                Go Back
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isNew = new Date(business.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Business Header */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm mb-8">
              {/* Hero Image */}
              {business.image_url && (
                <div className="relative h-64 md:h-80">
                  <Image
                    src={business.image_url}
                    alt={business.business_name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 flex space-x-2">
                    {isNew && (
                      <Badge className="bg-orange-100 text-orange-800">New</Badge>
                    )}
                    {business.is_verified && (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Business Info */}
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <div className="mb-4 md:mb-0">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {business.business_name}
                    </h1>
                    <Badge className="bg-green-100 text-green-800 mb-3">
                      {business.category}
                    </Badge>
                    
                    {/* Rating */}
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(business.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-gray-600">
                        {business.rating} ({business.review_count} reviews)
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col space-y-3 md:w-48">
                    <Button
                      onClick={() => window.open(`tel:${business.phone}`, '_self')}
                      className="w-full"
                      variant="outline"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                    {business.whatsapp_number && (
                      <Button
                        onClick={() => window.open(`https://wa.me/${business.whatsapp_number?.replace('+', '')}`, '_blank')}
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        WhatsApp
                      </Button>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">What We Do</h2>
                  <p className="text-gray-700 leading-relaxed">{business.description}</p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Location */}
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-gray-600" />
                      Location
                    </h3>
                    <div className="text-gray-700 space-y-1">
                      <p>{business.address}</p>
                      <p>{business.city}</p>
                      {business.pin_location_url && (
                        <a
                          href={business.pin_location_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-green-600 hover:text-green-700 text-sm"
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View on Maps
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div>
                    <h3 className="font-semibold mb-3">Contact Information</h3>
                    <div className="space-y-2 text-gray-700">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-3 text-gray-600" />
                        <span>{business.phone}</span>
                      </div>
                      {business.whatsapp_number && (
                        <div className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-3 text-gray-600" />
                          <span>{business.whatsapp_number}</span>
                        </div>
                      )}
                      {business.email && (
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-3 text-gray-600" />
                          <a
                            href={`mailto:${business.email}`}
                            className="text-green-600 hover:text-green-700"
                          >
                            {business.email}
                          </a>
                        </div>
                      )}
                      {business.website && (
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 mr-3 text-gray-600" />
                          <a
                            href={business.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-700"
                          >
                            Visit Website
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Business Hours */}
                  {business.business_days && (
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center">
                        <Clock className="h-5 w-5 mr-2 text-gray-600" />
                        Business Hours
                      </h3>
                      <p className="text-gray-700">{business.business_days}</p>
                    </div>
                  )}

                  {/* Pricing Info */}
                  {business.pricing_info && (
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center">
                        <DollarSign className="h-5 w-5 mr-2 text-gray-600" />
                        Pricing Information
                      </h3>
                      <p className="text-gray-700">{business.pricing_info}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <ReviewSystem 
                businessId={business.id} 
                businessName={business.business_name}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}