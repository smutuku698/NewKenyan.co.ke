'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getOptimalZoom, getAlternativeTileProviders } from '@/lib/maps-utils';

// Fix for default marker icon in React-Leaflet
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
}

interface LeafletMapProps {
  coords: [number, number];
  address: string;
  city: string;
  propertyTitle: string;
  isExactLocation: boolean;
  locationType?: 'property' | 'business' | 'neighborhood' | 'city';
  height?: string;
}

export default function LeafletMap({
  coords,
  address,
  city,
  propertyTitle,
  isExactLocation,
  locationType = 'property',
  height = 'h-64 sm:h-80 md:h-96'
}: LeafletMapProps) {
  const [lat, lng] = coords;

  // Get optimal zoom for crisp, clear map display
  const zoom = getOptimalZoom(isExactLocation, locationType);

  // Use professional CartoDB Positron tiles for clean, modern look
  const tileProviders = getAlternativeTileProviders();
  const tileConfig = tileProviders.cartodbPositron; // Clean, professional style

  return (
    <div className={`w-full ${height} rounded-lg overflow-hidden border border-gray-200 shadow-sm`}>
      <MapContainer
        center={[lat, lng]}
        zoom={zoom}
        scrollWheelZoom={false}
        zoomControl={true}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
        attributionControl={true}
        minZoom={10}
        maxZoom={19}
      >
        <TileLayer
          attribution={tileConfig.attribution}
          url={tileConfig.url}
          subdomains={tileConfig.subdomains}
          maxZoom={tileConfig.maxZoom}
          // High-quality rendering
          detectRetina={true}
          updateWhenIdle={false}
          updateWhenZooming={false}
          keepBuffer={2}
        />
        <Marker position={[lat, lng]}>
          <Popup maxWidth={250} className="custom-popup">
            <div className="text-sm p-2">
              <p className="font-semibold mb-1 text-gray-900">{propertyTitle}</p>
              <p className="text-gray-600 text-xs mb-2">{address}, {city}</p>
              {isExactLocation && (
                <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                  📍 Exact Location
                </span>
              )}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
