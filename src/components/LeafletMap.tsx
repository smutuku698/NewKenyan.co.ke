'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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
}

export default function LeafletMap({ coords, address, city, propertyTitle, isExactLocation }: LeafletMapProps) {
  const [lat, lng] = coords;

  return (
    <div className="w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden border border-gray-200">
      <MapContainer
        center={[lat, lng]}
        zoom={isExactLocation ? 16 : 13}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
          <Popup>
            <div className="text-sm">
              <p className="font-semibold mb-1">{propertyTitle}</p>
              <p className="text-gray-600 text-xs">{address}, {city}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
