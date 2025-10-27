'use client';

import { MapPin } from 'lucide-react';

interface PropertyMapProps {
  googleMapsLink?: string | null;
  address: string;
  city: string;
  county?: string | null;
  propertyTitle: string;
}

export default function PropertyMap({
  googleMapsLink,
  address,
  city,
  county,
  propertyTitle
}: PropertyMapProps) {
  // Extract coordinates or place from Google Maps link if provided
  const getMapSrc = () => {
    if (googleMapsLink) {
      // If it's already an embed URL, use it
      if (googleMapsLink.includes('embed')) {
        return googleMapsLink;
      }

      // If it's a Google Maps link, convert to embed
      if (googleMapsLink.includes('google.com/maps')) {
        // Try to extract place_id or coordinates
        const placeIdMatch = googleMapsLink.match(/place_id=([^&]+)/);
        const coordMatch = googleMapsLink.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);

        if (placeIdMatch) {
          return `https://www.google.com/maps/embed/v1/place?key=&q=place_id:${placeIdMatch[1]}`;
        } else if (coordMatch) {
          return `https://www.google.com/maps/embed/v1/view?key=&center=${coordMatch[1]},${coordMatch[2]}&zoom=15`;
        }
      }
    }

    // Fallback: Use city and county for general location
    const location = county ? `${city}, ${county}, Kenya` : `${city}, Kenya`;
    return `https://www.google.com/maps/embed/v1/place?key=&q=${encodeURIComponent(location)}`;
  };

  const openInGoogleMaps = () => {
    if (googleMapsLink) {
      window.open(googleMapsLink, '_blank');
    } else {
      const searchQuery = `${address}, ${city}${county ? `, ${county}` : ''}, Kenya`;
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`, '_blank');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-green-600" />
          Property Location
        </h2>
        <button
          onClick={openInGoogleMaps}
          className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center"
        >
          Open in Google Maps
          <svg
            className="h-4 w-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </button>
      </div>

      {/* Address Display */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">{address}</span>
          <br />
          {city}{county ? `, ${county}` : ''}, Kenya
        </p>
      </div>

      {/* Map Embed */}
      <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden border border-gray-200">
        <iframe
          src={getMapSrc()}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
          title={`Map showing location of ${propertyTitle}`}
        />
      </div>

      {/* Map Note */}
      <p className="text-xs text-gray-500 mt-3 text-center">
        {googleMapsLink
          ? 'Showing exact property location'
          : `Showing general location in ${city}. Contact owner for exact address.`}
      </p>
    </div>
  );
}
