'use client';

import dynamic from 'next/dynamic';
import { MapPin, ExternalLink } from 'lucide-react';
import {
  extractGoogleMapsCoordinates,
  getCityCoordinates,
  getNairobiNeighborhoodCoords
} from '@/lib/maps-utils';

// Dynamically import map component to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 sm:h-80 md:h-96 bg-gray-200 rounded-lg flex items-center justify-center">
      <p className="text-gray-600">Loading map...</p>
    </div>
  )
});

interface BusinessMapProps {
  googleMapsLink?: string | null;
  pinLocationUrl?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  address: string;
  city: string;
  businessName: string;
}

export default function BusinessMap({
  googleMapsLink,
  pinLocationUrl,
  latitude,
  longitude,
  address,
  city,
  businessName
}: BusinessMapProps) {
  // Extract coordinates intelligently from multiple sources
  let coords: [number, number] | null = null;
  let isExact = false;

  // Priority 1: Explicit lat/lng
  if (latitude && longitude) {
    coords = [latitude, longitude];
    isExact = true;
  }
  // Priority 2: Extract from pin_location_url (usually Google Maps)
  else if (pinLocationUrl) {
    const extracted = extractGoogleMapsCoordinates(pinLocationUrl);
    if (extracted) {
      coords = [extracted.lat, extracted.lng];
      isExact = true;
    }
  }
  // Priority 3: Extract from googleMapsLink
  else if (googleMapsLink) {
    const extracted = extractGoogleMapsCoordinates(googleMapsLink);
    if (extracted) {
      coords = [extracted.lat, extracted.lng];
      isExact = true;
    }
  }

  // Priority 4: Try neighborhood match for Nairobi
  if (!coords) {
    const neighborhoodCoords = city.toLowerCase() === 'nairobi'
      ? getNairobiNeighborhoodCoords(address)
      : null;

    if (neighborhoodCoords) {
      coords = [neighborhoodCoords.lat, neighborhoodCoords.lng];
    }
  }

  // Priority 5: Fallback to city coordinates
  if (!coords) {
    const cityCoords = getCityCoordinates(city);
    coords = [cityCoords.lat, cityCoords.lng];
  }

  const openInGoogleMaps = () => {
    const mapsUrl = pinLocationUrl || googleMapsLink;
    if (mapsUrl) {
      window.open(mapsUrl, '_blank');
    } else {
      const searchQuery = `${businessName}, ${address}, ${city}, Kenya`;
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`, '_blank');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-green-600" />
          Business Location
        </h2>
        <button
          onClick={openInGoogleMaps}
          className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1 transition-colors"
        >
          Open in Google Maps
          <ExternalLink className="h-4 w-4" />
        </button>
      </div>

      {/* Address Display */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">{businessName}</span>
          <br />
          <span className="text-gray-700">{address}</span>
          <br />
          {city}, Kenya
        </p>
      </div>

      {/* Leaflet Map - Professional, Clear, Crisp */}
      <MapComponent
        coords={coords}
        address={address}
        city={city}
        propertyTitle={businessName}
        isExactLocation={isExact}
        locationType="business"
      />

      {/* Map Note */}
      <div className="mt-3 text-center">
        <p className="text-xs text-gray-500">
          {isExact
            ? '📍 Showing exact business location'
            : `📍 Showing approximate location in ${city}. Contact business for exact directions.`}
        </p>
        {isExact && (
          <p className="text-xs text-green-600 mt-1">
            ✓ Location verified from Google Maps
          </p>
        )}
      </div>
    </div>
  );
}
