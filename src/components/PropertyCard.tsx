import Image from 'next/image';
import Link from 'next/link';
import { Bed, Bath, MapPin, Phone, MessageCircle, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PropertyCardProps {
  id: string;
  title: string;
  type: string;
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  location: string;
  images: string[];
  amenities: string[];
  contactPhone: string;
  whatsappNumber?: string;
}

const PropertyCard = ({
  id,
  title,
  type,
  price,
  bedrooms,
  bathrooms,
  location,
  images,
  amenities,
  whatsappNumber,
}: PropertyCardProps) => {
  const formatPrice = (price: number) => {
    return `KSh ${price.toLocaleString()}`;
  };

  return (
    <Link href={`/properties/${id}`}>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      {/* Image */}
      <div className="relative h-48">
        {images[0] ? (
          <Image
            src={images[0]}
            alt={title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
        <div className="absolute top-2 left-2">
          <Badge className="bg-blue-100 text-blue-800 text-xs">{type}</Badge>
        </div>
        <div className="absolute top-2 right-2 flex space-x-1">
          <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
            <Heart className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
            {title}
          </h3>
          <p className="text-2xl font-bold text-green-600">{formatPrice(price)}</p>
          <p className="text-sm text-gray-600">per month</p>
        </div>

        {/* Property Details */}
        <div className="flex items-center space-x-4 mb-4">
          {bedrooms && (
            <div className="flex items-center text-gray-600 text-sm">
              <Bed className="h-4 w-4 mr-1" />
              {bedrooms} bed{bedrooms > 1 ? 's' : ''}
            </div>
          )}
          {bathrooms && (
            <div className="flex items-center text-gray-600 text-sm">
              <Bath className="h-4 w-4 mr-1" />
              {bathrooms} bath{bathrooms > 1 ? 's' : ''}
            </div>
          )}
        </div>

        {/* Location */}
        <div className="flex items-center text-gray-600 text-sm mb-4">
          <MapPin className="h-4 w-4 mr-2" />
          {location}
        </div>

        {/* Amenities */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-1">
            {amenities.slice(0, 3).map((amenity, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {amenity}
              </Badge>
            ))}
            {amenities.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{amenities.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Button variant="outline" className="flex-1 border-gray-300 hover:bg-gray-50" size="sm">
            <Phone className="h-4 w-4 mr-2" />
            Call
          </Button>
          {whatsappNumber && (
            <Button className="bg-green-600 hover:bg-green-700 text-white flex-1" size="sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
          )}
        </div>
      </div>
      </div>
    </Link>
  );
};

export default PropertyCard;