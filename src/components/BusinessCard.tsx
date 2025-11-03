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
    <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
      {/* Gradient Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-white"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Content Wrapper */}
      <div className="relative z-10">
        {/* Image Header with Enhanced Gradient */}
        <div className="relative h-48">
          {imageUrl ? (
            <>
              <Image
                src={imageUrl}
                alt={name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <span className="text-3xl font-bold text-white">
                    {name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <p className="text-white font-semibold text-sm px-4">{category}</p>
              </div>
            </div>
          )}
          <div className="absolute top-3 left-3 flex space-x-2">
            {isNew && (
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold shadow-md">
                New
              </Badge>
            )}
            {isVerified && (
              <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs font-semibold shadow-md">
                <CheckCircle className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>
        </div>

        {/* Content Section with Enhanced Styling */}
        <div className="p-6 bg-white/40 backdrop-blur-sm">
          {/* Header */}
          <div className="mb-4">
            <Link href={`/business/${id}`}>
              <h3 className="font-bold text-xl text-gray-900 mb-2 hover:text-green-700 transition-colors cursor-pointer line-clamp-2">
                {name}
              </h3>
            </Link>
            <div className="inline-block px-3 py-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full text-xs font-semibold shadow-sm">
              {category}
            </div>
          </div>

          {/* Rating with enhanced styling */}
          <div className="flex items-center mb-4 bg-white/60 rounded-lg p-3 backdrop-blur-sm">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(rating)
                      ? 'text-yellow-500 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm font-semibold text-gray-800">
              {rating} <span className="text-gray-600 font-normal">({reviewCount} reviews)</span>
            </span>
          </div>

          {/* Location with icon background */}
          <div className="flex items-center text-gray-700 text-sm mb-4 bg-white/50 rounded-lg p-3 backdrop-blur-sm">
            <div className="bg-purple-100 p-1.5 rounded-md mr-3">
              <MapPin className="h-4 w-4 text-purple-700" />
            </div>
            <span className="font-medium">{location}</span>
          </div>

          {/* Description */}
          <div className="bg-white/50 rounded-lg p-3 backdrop-blur-sm mb-5">
            <p className="text-sm text-gray-700 line-clamp-2 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 border-2 border-purple-600 hover:bg-purple-50 text-purple-700 font-semibold min-w-0"
              size="sm"
              onClick={() => window.open(`tel:${phoneNumber}`, '_self')}
            >
              <Phone className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="truncate">Call</span>
            </Button>
            {whatsappNumber && (
              <Button
                className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white flex-1 min-w-0 font-semibold shadow-md hover:shadow-lg transition-all"
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
    </div>
  );
};

export default BusinessCard;