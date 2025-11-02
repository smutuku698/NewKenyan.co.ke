'use client';

import Link from 'next/link';
import { generatePropertyTypeUrl } from '@/lib/property-types';

interface County {
  name: string;
  slug: string;
}

// All 47 counties in Kenya
const KENYA_COUNTIES: County[] = [
  { name: 'Baringo', slug: 'baringo-county' },
  { name: 'Bomet', slug: 'bomet-county' },
  { name: 'Bungoma', slug: 'bungoma-county' },
  { name: 'Busia', slug: 'busia-county' },
  { name: 'Elgeyo-Marakwet', slug: 'elgeyo-marakwet-county' },
  { name: 'Embu', slug: 'embu-county' },
  { name: 'Garissa', slug: 'garissa-county' },
  { name: 'Homa Bay', slug: 'homa-bay-county' },
  { name: 'Isiolo', slug: 'isiolo-county' },
  { name: 'Kajiado', slug: 'kajiado-county' },
  { name: 'Kakamega', slug: 'kakamega-county' },
  { name: 'Kericho', slug: 'kericho-county' },
  { name: 'Kiambu', slug: 'kiambu-county' },
  { name: 'Kilifi', slug: 'kilifi-county' },
  { name: 'Kirinyaga', slug: 'kirinyaga-county' },
  { name: 'Kisii', slug: 'kisii-county' },
  { name: 'Kisumu', slug: 'kisumu-county' },
  { name: 'Kitui', slug: 'kitui-county' },
  { name: 'Kwale', slug: 'kwale-county' },
  { name: 'Laikipia', slug: 'laikipia-county' },
  { name: 'Lamu', slug: 'lamu-county' },
  { name: 'Machakos', slug: 'machakos-county' },
  { name: 'Makueni', slug: 'makueni-county' },
  { name: 'Mandera', slug: 'mandera-county' },
  { name: 'Marsabit', slug: 'marsabit-county' },
  { name: 'Meru', slug: 'meru-county' },
  { name: 'Migori', slug: 'migori-county' },
  { name: 'Mombasa', slug: 'mombasa-county' },
  { name: 'Muranga', slug: 'muranga-county' },
  { name: 'Nairobi', slug: 'nairobi-county' },
  { name: 'Nakuru', slug: 'nakuru-county' },
  { name: 'Nandi', slug: 'nandi-county' },
  { name: 'Narok', slug: 'narok-county' },
  { name: 'Nyamira', slug: 'nyamira-county' },
  { name: 'Nyandarua', slug: 'nyandarua-county' },
  { name: 'Nyeri', slug: 'nyeri-county' },
  { name: 'Samburu', slug: 'samburu-county' },
  { name: 'Siaya', slug: 'siaya-county' },
  { name: 'Taita Taveta', slug: 'taita-taveta-county' },
  { name: 'Tana River', slug: 'tana-river-county' },
  { name: 'Tharaka-Nithi', slug: 'tharaka-nithi-county' },
  { name: 'Trans Nzoia', slug: 'trans-nzoia-county' },
  { name: 'Turkana', slug: 'turkana-county' },
  { name: 'Uasin Gishu', slug: 'uasin-gishu-county' },
  { name: 'Vihiga', slug: 'vihiga-county' },
  { name: 'Wajir', slug: 'wajir-county' },
  { name: 'West Pokot', slug: 'west-pokot-county' },
];

interface CountyCrossLinksProps {
  currentCountySlug: string;
  propertyType: string; // e.g., "houses"
  transactionType: 'sale' | 'rent';
  className?: string;
}

export default function CountyCrossLinks({
  currentCountySlug,
  propertyType,
  transactionType,
  className = ''
}: CountyCrossLinksProps) {
  // Sort counties alphabetically and separate current county
  const sortedCounties = [...KENYA_COUNTIES].sort((a, b) => a.name.localeCompare(b.name));
  const currentCounty = sortedCounties.find(c => c.slug === currentCountySlug);
  const otherCounties = sortedCounties.filter(c => c.slug !== currentCountySlug);

  // Prioritize major markets
  const majorCounties = ['nairobi-county', 'mombasa-county', 'kiambu-county', 'nakuru-county', 'kisumu-county'];
  const priorityCounties = otherCounties.filter(c => majorCounties.includes(c.slug));
  const regularCounties = otherCounties.filter(c => !majorCounties.includes(c.slug));

  return (
    <div className={`bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-sm border p-8 ${className}`}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Explore Properties Across Kenya
        </h2>
        <p className="text-gray-600">
          Browse properties in all 47 counties of Kenya. Find your perfect property in any location.
        </p>
      </div>

      {/* Major Markets - Highlighted */}
      {priorityCounties.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            Major Markets
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {priorityCounties.map((county) => (
              <Link
                key={county.slug}
                href={generatePropertyTypeUrl(propertyType, transactionType, county.slug)}
                className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg text-center font-medium text-sm"
                title={`View properties in ${county.name} County`}
              >
                {county.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* All Other Counties */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          All Counties in Kenya
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {regularCounties.map((county) => {
            const isCurrentCounty = county.slug === currentCountySlug;

            return (
              <Link
                key={county.slug}
                href={generatePropertyTypeUrl(propertyType, transactionType, county.slug)}
                className={`
                  px-3 py-2 rounded-lg transition-all text-center text-sm
                  ${isCurrentCounty
                    ? 'bg-gray-800 text-white font-semibold cursor-default'
                    : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-700 hover:border-green-300 border border-gray-200'
                  }
                `}
                title={`View properties in ${county.name} County`}
              >
                {county.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* SEO-friendly footer text */}
      <div className="mt-6 pt-6 border-t border-gray-300">
        <p className="text-xs text-gray-600 text-center">
          Comprehensive property listings across all 47 counties in Kenya. From Nairobi to Mombasa,
          Kisumu to Nakuru - find verified properties with photos, prices, and direct contact details.
        </p>
      </div>
    </div>
  );
}

// Export the counties list for use in other components
export { KENYA_COUNTIES };
