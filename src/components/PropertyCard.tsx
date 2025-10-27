import Image from 'next/image';
import Link from 'next/link';
import { Bed, Bath, MapPin, Phone, MessageCircle, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { generatePropertySlug } from '@/lib/utils';

interface PropertyCardProps {
  id: string;
  title: string;
  type: string;
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  location: string;
  city: string;
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
  city,
  images,
  amenities,
  whatsappNumber,
}: PropertyCardProps) => {
  const formatPrice = (price: number) => {
    return `KSh ${price.toLocaleString()}`;
  };

  const slug = generatePropertySlug(title, type, city, bedrooms);
  
  return (
    <Link href={`/properties/${slug}`}>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col h-full">
      {/* Image */}
      <div className="relative h-48 sm:h-56 md:h-64 flex-shrink-0">
        {images[0] ? (
          <Image
            src={images[0]}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-sm">No Image</span>
          </div>
        )}
        <div className="absolute top-2 left-2 max-w-[60%]">
          <Badge className="bg-blue-100 text-blue-800 text-xs truncate">{type}</Badge>
        </div>
        <div className="absolute top-2 right-2 flex space-x-1">
          <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white p-2">
            <Heart className="h-4 w-4 flex-shrink-0" />
          </Button>
          <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white p-2">
            <Share2 className="h-4 w-4 flex-shrink-0" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-base sm:text-lg font-semibold mb-2 line-clamp-2 min-h-[3rem] text-gray-900 leading-tight">
            {title}
          </h3>
          <p className="text-lg sm:text-xl font-bold text-green-600 truncate">{formatPrice(price)}</p>
          <p className="text-xs sm:text-sm text-gray-600">per month</p>
        </div>

        {/* Property Details */}
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          {bedrooms !== undefined && bedrooms !== null && (
            <div className="flex items-center text-gray-600 text-xs sm:text-sm whitespace-nowrap">
              <Bed className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="truncate">{bedrooms} bed{bedrooms > 1 ? 's' : ''}</span>
            </div>
          )}
          {bathrooms !== undefined && bathrooms !== null && (
            <div className="flex items-center text-gray-600 text-xs sm:text-sm whitespace-nowrap">
              <Bath className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="truncate">{bathrooms} bath{bathrooms > 1 ? 's' : ''}</span>
            </div>
          )}
        </div>

        {/* Location */}
        <div className="flex items-start text-gray-600 text-xs sm:text-sm mb-3 min-h-[2.5rem]">
          <MapPin className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
          <span className="line-clamp-2 break-words">{location}</span>
        </div>

        {/* Amenities */}
        {amenities && amenities.length > 0 && (
          <div className="mb-4 min-h-[2rem]">
            <div className="flex flex-wrap gap-1">
              {amenities.slice(0, 3).map((amenity, index) => (
                <Badge key={index} variant="secondary" className="text-xs truncate max-w-[7rem]">
                  {amenity}
                </Badge>
              ))}
              {amenities.length > 3 && (
                <Badge variant="outline" className="text-xs whitespace-nowrap">
                  +{amenities.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <Button variant="outline" className="flex-1 border-gray-300 hover:bg-gray-50 min-w-0 text-xs sm:text-sm h-9" size="sm">
            <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
            <span className="truncate">Call</span>
          </Button>
          {whatsappNumber && (
            <Button className="bg-green-600 hover:bg-green-700 text-white flex-1 min-w-0 text-xs sm:text-sm h-9" size="sm">
              <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
              <span className="truncate">WhatsApp</span>
            </Button>
          )}
        </div>
      </div>
      </div>
    </Link>
  );
};

export default PropertyCard;