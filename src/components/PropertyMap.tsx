'use client';

import dynamic from 'next/dynamic';
import { MapPin } from 'lucide-react';

// Dynamically import map component to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 sm:h-80 md:h-96 bg-gray-200 rounded-lg flex items-center justify-center">
      <p className="text-gray-600">Loading map...</p>
    </div>
  )
});

interface PropertyMapProps {
  googleMapsLink?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  address: string;
  city: string;
  county?: string | null;
  propertyTitle: string;
}

/**
 * Get coordinates for major Kenyan cities
 */
function getCityCoordinates(city: string): [number, number] {
  const cityCoords: Record<string, [number, number]> = {
    'nairobi': [-1.2921, 36.8219],
    'mombasa': [-4.0435, 39.6682],
    'kisumu': [-0.0917, 34.7680],
    'nakuru': [-0.3031, 36.0800],
    'eldoret': [0.5143, 35.2698],
    'thika': [-1.0332, 37.0689],
    'malindi': [-3.2167, 40.1167],
    'kisii': [-0.6817, 34.7680],
    'kakamega': [0.2827, 34.7519],
    'kiambu': [-1.1714, 36.8356],
    'kitale': [1.0167, 35.0062],
    'machakos': [-1.5177, 37.2634],
    'meru': [0.0469, 37.6556]
  };

  const normalizedCity = city.toLowerCase().trim();
  return cityCoords[normalizedCity] || cityCoords['nairobi'];
}

/**
 * Get approximate coordinates based on neighborhood in Nairobi
 */
function getNairobiNeighborhoodCoords(address: string): [number, number] | null {
  const neighborhoods: Record<string, [number, number]> = {
    'westlands': [-1.2676, 36.8070],
    'kilimani': [-1.2905, 36.7878],
    'kileleshwa': [-1.2892, 36.7838],
    'karen': [-1.3197, 36.7070],
    'lavington': [-1.2829, 36.7693],
    'parklands': [-1.2642, 36.8206],
    'riverside': [-1.2692, 36.8089],
    'upperhill': [-1.2896, 36.8186],
    'embakasi': [-1.3193, 36.8964],
    'kasarani': [-1.2186, 36.8987],
    'kahawa': [-1.1801, 36.9275],
    'ruaka': [-1.2087, 36.8448],
    'ngong': [-1.3524, 36.6664],
    'kitisuru': [-1.2403, 36.8005],
    'runda': [-1.2229, 36.7905],
    'muthaiga': [-1.2485, 36.8234],
    'spring valley': [-1.2702, 36.7837],
    'woodley': [-1.3033, 36.7845],
    'south c': [-1.3116, 36.8281],
    'south b': [-1.3069, 36.8353],
    'buruburu': [-1.2863, 36.8842],
    'donholm': [-1.2807, 36.8917],
    'umoja': [-1.2781, 36.8989],
    'kayole': [-1.2738, 36.9191],
    'njiru': [-1.2638, 36.9264],
    'zimmerman': [-1.2114, 36.8823],
    'roysambu': [-1.2249, 36.8738]
  };

  const lowerAddress = address.toLowerCase();
  for (const [neighborhood, coords] of Object.entries(neighborhoods)) {
    if (lowerAddress.includes(neighborhood)) {
      return coords;
    }
  }
  return null;
}

export default function PropertyMap({
  googleMapsLink,
  latitude,
  longitude,
  address,
  city,
  county,
  propertyTitle
}: PropertyMapProps) {
  // Extract coordinates from Google Maps link if provided
  let coords: [number, number] | null = null;

  if (latitude && longitude) {
    coords = [latitude, longitude];
  } else if (googleMapsLink) {
    const coordMatch = googleMapsLink.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (coordMatch) {
      coords = [parseFloat(coordMatch[1]), parseFloat(coordMatch[2])];
    }
  }

  // If no exact coords, try neighborhood or city
  if (!coords) {
    const neighborhoodCoords = city.toLowerCase() === 'nairobi'
      ? getNairobiNeighborhoodCoords(address)
      : null;
    coords = neighborhoodCoords || getCityCoordinates(city);
  }

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

      {/* Leaflet Map */}
      <MapComponent
        coords={coords}
        address={address}
        city={city}
        propertyTitle={propertyTitle}
        isExactLocation={!!(latitude && longitude)}
      />

      {/* Map Note */}
      <p className="text-xs text-gray-500 mt-3 text-center">
        {latitude && longitude
          ? 'Showing exact property location'
          : googleMapsLink
          ? 'Showing approximate property location'
          : `Showing general location in ${city}. Contact owner for exact address.`}
      </p>
    </div>
  );
}
