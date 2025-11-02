import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
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
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
        {/* Image Container - Landscape aspect ratio like Movoto */}
        <div className="relative w-full aspect-[16/10] bg-gray-200">
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

          {/* NEW Badge - Top Left - Sleek and narrow like Movoto */}
          {isNew && (
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
              <span className="bg-green-700 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                NEW
              </span>
              <span className="bg-white text-gray-900 text-[10px] font-semibold px-2 py-0.5 rounded">
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

          {/* Property Title */}
          <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
            {title}
          </h3>

          {/* Bedroom, Bathroom, Sq Ft - Inline with custom icons */}
          <div className="flex items-center gap-3 mb-2 text-gray-700">
            {bedrooms !== undefined && bedrooms !== null && (
              <div className="flex items-center gap-1">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 9V6c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v3c-1.1 0-2 .9-2 2v5h1.33L4 19h1l.67-3h12.67l.66 3h1l.67-3H22v-5c0-1.1-.9-2-2-2zm-4-3h2v3h-2V6zm-4 0h2v3h-2V6zM8 6h2v3H8V6zM6 6h2v3H6V6z"/>
                </svg>
                <span className="text-sm font-medium">{bedrooms} Bd</span>
              </div>
            )}
            {bathrooms !== undefined && bathrooms !== null && (
              <div className="flex items-center gap-1">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 7h10v2H7zm0 6h10v-2H7zm12-8c-.55 0-1 .45-1 1 0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-1.1.9-2 2-2s2 .9 2 2v10c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2s2 .9 2 2c0 .28-.22.5-.5.5S6 6.28 6 6c0-.55-.45-1-1-1s-1 .45-1 1v10c0 .55.45 1 1 1h14c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1z"/>
                </svg>
                <span className="text-sm font-medium">{bathrooms} Ba</span>
              </div>
            )}
            {squareFeet && (
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">{squareFeet.toLocaleString()}</span>
                <span className="text-xs text-gray-600">Sq Ft</span>
              </div>
            )}
          </div>

          {/* Property Type */}
          <p className="text-sm text-gray-600 mb-2">
            {type}
          </p>

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
