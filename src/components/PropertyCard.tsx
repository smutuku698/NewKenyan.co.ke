import Image from 'next/image';
import Link from 'next/link';
import { Bed, Bath, Maximize2, Heart } from 'lucide-react';
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
  squareFeet?: number;
  createdAt?: string;
  isFeatured?: boolean;
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
  squareFeet,
  createdAt,
  isFeatured = false,
}: PropertyCardProps) => {
  const formatPrice = (price: number) => {
    return `KES ${price.toLocaleString()}`;
  };

  const slug = generatePropertySlug(title, type, city, bedrooms);

  // Calculate hours since posted
  const getHoursSincePosted = () => {
    if (!createdAt) return null;
    const now = new Date();
    const posted = new Date(createdAt);
    const hours = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60));

    if (hours < 1) return 'JUST NOW';
    if (hours < 24) return `${hours} HOUR${hours === 1 ? '' : 'S'}`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} DAY${days === 1 ? '' : 'S'}`;
    return null;
  };

  const hoursSincePosted = getHoursSincePosted();
  const isNew = hoursSincePosted !== null;

  return (
    <Link href={`/properties/${slug}`} className="block group">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200">
        {/* Image Container */}
        <div className="relative h-64 bg-gray-200">
          {images[0] ? (
            <Image
              src={images[0]}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-sm">No Image</span>
            </div>
          )}

          {/* NEW Badge - Top Left */}
          {isNew && (
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded">
                NEW
              </span>
              <span className="bg-white text-gray-900 text-xs font-semibold px-3 py-1.5 rounded">
                {hoursSincePosted}
              </span>
            </div>
          )}

          {/* Favorite Icon - Top Right */}
          <button
            onClick={(e) => {
              e.preventDefault();
              // Add favorite functionality
            }}
            className="absolute top-3 right-3 bg-white hover:bg-gray-100 p-2 rounded-full shadow-md transition-colors"
            aria-label="Add to favorites"
          >
            <Heart className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Price - Bold and Large */}
          <div className="mb-2">
            <p className="text-2xl font-bold text-gray-900">{formatPrice(price)}</p>
          </div>

          {/* Bedroom, Bathroom, Sq Ft */}
          <div className="flex items-center gap-4 mb-3">
            {bedrooms !== undefined && bedrooms !== null && (
              <div className="flex items-center gap-1.5 text-gray-700">
                <Bed className="h-4 w-4" />
                <span className="text-sm font-medium">{bedrooms} Bd</span>
              </div>
            )}
            {bathrooms !== undefined && bathrooms !== null && (
              <div className="flex items-center gap-1.5 text-gray-700">
                <Bath className="h-4 w-4" />
                <span className="text-sm font-medium">{bathrooms} Ba</span>
              </div>
            )}
            {squareFeet && (
              <div className="flex items-center gap-1.5 text-gray-700">
                <Maximize2 className="h-4 w-4" />
                <span className="text-sm font-medium">{squareFeet.toLocaleString()} Sq Ft</span>
              </div>
            )}
          </div>

          {/* Address */}
          <p className="text-sm text-gray-600 line-clamp-1">
            {location}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
