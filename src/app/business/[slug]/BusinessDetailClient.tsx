'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
  ExternalLink,
  Award,
  Shield
} from 'lucide-react';

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
}

interface BusinessDetailClientProps {
  business: BusinessListing;
}

export default function BusinessDetailClient({ business }: BusinessDetailClientProps) {
  const isNew = new Date(business.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2">
        {/* Business Header */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden mb-6">
          {/* Hero Image */}
          {business.image_url && (
            <div className="relative h-64 md:h-80">
              <Image
                src={business.image_url}
                alt={`${business.business_name} - ${business.category} in ${business.city}`}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 left-4 flex space-x-2">
                {isNew && (
                  <Badge className="bg-orange-100 text-orange-800 border-orange-300">
                    <Award className="h-3 w-3 mr-1" />
                    New
                  </Badge>
                )}
                {business.is_verified && (
                  <Badge className="bg-green-100 text-green-800 border-green-300">
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
              <div className="mb-4 md:mb-0 flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                    {business.category}
                  </Badge>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{business.city}</span>
                  </div>
                </div>
                
                {/* Rating */}
                <div className="flex items-center mb-4">
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
            </div>

            {/* Description */}
            {business.description && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">About {business.business_name}</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{business.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Business Details */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Business Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Location */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-gray-600" />
                Location & Address
              </h4>
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
              <h4 className="font-semibold mb-3">Contact Information</h4>
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
                <h4 className="font-semibold mb-3 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-gray-600" />
                  Business Hours
                </h4>
                <p className="text-gray-700">{business.business_days}</p>
              </div>
            )}

            {/* Pricing Info */}
            {business.pricing_info && (
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-gray-600" />
                  Pricing Information
                </h4>
                <p className="text-gray-700">{business.pricing_info}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Contact Card */}
        <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
          <h3 className="text-lg font-semibold mb-4">Contact {business.business_name}</h3>
          
          <div className="space-y-2 mb-6">
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
            {business.email && (
              <Button
                onClick={() => window.open(`mailto:${business.email}`, '_self')}
                variant="outline"
                className="w-full"
              >
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </Button>
            )}
          </div>

          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Category:</strong> {business.category}</p>
            <p><strong>Location:</strong> {business.city}</p>
            <p><strong>Listed:</strong> {new Date(business.created_at).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start">
            <Shield className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
            <div>
              <h4 className="font-semibold text-green-800 mb-2">
                {business.is_verified ? 'Verified Business' : 'Listed Business'}
              </h4>
              <p className="text-sm text-green-700">
                This business is listed in our Kenya business directory. 
                Contact information has been confirmed.
              </p>
            </div>
          </div>
        </div>

        {/* Back to Directory */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <Link href="/business-directory">
            <Button variant="outline" className="w-full">
              ← Back to Business Directory
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}