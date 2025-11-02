'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, Phone, MessageCircle, MapPin, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BusinessCardProps {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  location: string;
  imageUrl?: string | null;
  isVerified: boolean;
  isNew: boolean;
  phoneNumber: string;
  whatsappNumber?: string;
  description?: string;
}

const BusinessCard = ({
  id,
  name,
  category,
  rating,
  reviewCount,
  location,
  imageUrl,
  isVerified,
  isNew,
  phoneNumber,
  whatsappNumber,
  description = "Trusted business serving the Kenyan community with quality services.",
}: BusinessCardProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative h-48">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-300 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl font-bold text-green-700">
                  {name.charAt(0).toUpperCase()}
                </span>
              </div>
              <p className="text-green-700 font-medium text-sm">{category}</p>
            </div>
          </div>
        )}
        <div className="absolute top-2 left-2 flex space-x-1">
          {isNew && (
            <Badge className="bg-orange-100 text-orange-800 text-xs">New</Badge>
          )}
          {isVerified && (
            <Badge className="bg-green-100 text-green-800 text-xs">
              <CheckCircle className="h-3 w-3 mr-1" />
              Verified
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <Link href={`/business/${id}`}>
            <h3 className="font-semibold text-lg text-gray-900 mb-1 hover:text-green-600 transition-colors cursor-pointer line-clamp-2">
              {name}
            </h3>
          </Link>
          <p className="text-green-600 font-medium text-sm">{category}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            {rating} ({reviewCount} reviews)
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center text-gray-600 text-sm mb-4">
          <MapPin className="h-4 w-4 mr-2" />
          {location}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-6 line-clamp-2">
          {description}
        </p>

        {/* Actions */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex-1 border-gray-300 hover:bg-gray-50 min-w-0" 
            size="sm"
            onClick={() => window.open(`tel:${phoneNumber}`, '_self')}
          >
            <Phone className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="truncate">Call</span>
          </Button>
          {whatsappNumber && (
            <Button
              className="bg-green-700 hover:bg-green-800 text-white flex-1 min-w-0"
              size="sm"
              onClick={() => window.open(`https://wa.me/${whatsappNumber.replace('+', '')}`, '_blank')}
            >
              <MessageCircle className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="truncate">WhatsApp</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;