import Link from 'next/link';

interface InternalLinksProps {
  currentPage: {
    type: 'property' | 'location' | 'home';
    city?: string;
    county?: string;
    propertyType?: string;
    transactionType?: 'sale' | 'rent';
  };
}

/**
 * Comprehensive internal linking component for SEO and silo structure
 * Creates contextual links based on current page type
 */
export default function InternalLinks({ currentPage }: InternalLinksProps) {
  const { type, city, county, propertyType, transactionType } = currentPage;

  // Major Kenya locations for linking
  const majorLocations = [
    { name: 'Nairobi', slug: 'nairobi-county' },
    { name: 'Mombasa', slug: 'mombasa-county' },
    { name: 'Kisumu', slug: 'kisumu-county' },
    { name: 'Nakuru', slug: 'nakuru-county' },
    { name: 'Eldoret', slug: 'eldoret-county' }
  ];

  // Popular Nairobi neighborhoods
  const nairobiNeighborhoods = [
    { name: 'Westlands', slug: 'westlands-nairobi' },
    { name: 'Kilimani', slug: 'kilimani-nairobi' },
    { name: 'Kileleshwa', slug: 'kileleshwa-nairobi' },
    { name: 'Karen', slug: 'karen-nairobi' },
    { name: 'Lavington', slug: 'lavington-nairobi' },
    { name: 'Parklands', slug: 'parklands-nairobi' }
  ];

  return (
    <div className="bg-gray-50 border-t border-gray-200 py-12 mt-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Browse Properties by Location</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Houses for Sale */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-600">Houses for Sale</h3>
            <ul className="space-y-2">
              {majorLocations.map(loc => (
                <li key={loc.slug}>
                  <Link
                    href={`/houses-for-sale/${loc.slug}`}
                    className="text-gray-700 hover:text-green-600 hover:underline text-sm"
                  >
                    Houses for Sale in {loc.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Houses for Rent */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-600">Houses for Rent</h3>
            <ul className="space-y-2">
              {majorLocations.map(loc => (
                <li key={loc.slug}>
                  <Link
                    href={`/houses-for-rent/${loc.slug}`}
                    className="text-gray-700 hover:text-green-600 hover:underline text-sm"
                  >
                    Houses for Rent in {loc.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Apartments for Sale */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-600">Apartments for Sale</h3>
            <ul className="space-y-2">
              {majorLocations.map(loc => (
                <li key={loc.slug}>
                  <Link
                    href={`/apartments-for-sale/${loc.slug}`}
                    className="text-gray-700 hover:text-green-600 hover:underline text-sm"
                  >
                    Apartments for Sale in {loc.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Apartments for Rent */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-600">Apartments for Rent</h3>
            <ul className="space-y-2">
              {majorLocations.map(loc => (
                <li key={loc.slug}>
                  <Link
                    href={`/apartments-for-rent/${loc.slug}`}
                    className="text-gray-700 hover:text-green-600 hover:underline text-sm"
                  >
                    Apartments for Rent in {loc.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Nairobi Neighborhoods Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Popular Nairobi Neighborhoods</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {nairobiNeighborhoods.map(neighborhood => (
              <div key={neighborhood.slug} className="space-y-1">
                <Link
                  href={`/houses-for-sale/${neighborhood.slug}`}
                  className="text-sm text-gray-700 hover:text-green-600 hover:underline block"
                >
                  Houses - {neighborhood.name}
                </Link>
                <Link
                  href={`/apartments-for-rent/${neighborhood.slug}`}
                  className="text-sm text-gray-700 hover:text-green-600 hover:underline block"
                >
                  Apartments - {neighborhood.name}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Property Types Directory */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Browse by Property Type</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">By Transaction</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/properties" className="text-gray-700 hover:text-green-600 hover:underline text-sm">
                    All Properties
                  </Link>
                </li>
                <li>
                  <Link href="/properties?type=sale" className="text-gray-700 hover:text-green-600 hover:underline text-sm">
                    Properties for Sale
                  </Link>
                </li>
                <li>
                  <Link href="/properties?type=rent" className="text-gray-700 hover:text-green-600 hover:underline text-sm">
                    Properties for Rent
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">By County</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/houses-for-sale/nairobi-county" className="text-gray-700 hover:text-green-600 hover:underline text-sm">
                    Nairobi County
                  </Link>
                </li>
                <li>
                  <Link href="/houses-for-sale/mombasa-county" className="text-gray-700 hover:text-green-600 hover:underline text-sm">
                    Mombasa County
                  </Link>
                </li>
                <li>
                  <Link href="/houses-for-sale/kiambu-county" className="text-gray-700 hover:text-green-600 hover:underline text-sm">
                    Kiambu County
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="text-gray-700 hover:text-green-600 hover:underline text-sm">
                    Real Estate Blog
                  </Link>
                </li>
                <li>
                  <Link href="/mortgage-calculator-kenya" className="text-gray-700 hover:text-green-600 hover:underline text-sm">
                    Mortgage Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/construction-cost-calculator-kenya" className="text-gray-700 hover:text-green-600 hover:underline text-sm">
                    Construction Calculator
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Other Services</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/business-directory" className="text-gray-700 hover:text-green-600 hover:underline text-sm">
                    Business Directory
                  </Link>
                </li>
                <li>
                  <Link href="/jobs-in-kenya" className="text-gray-700 hover:text-green-600 hover:underline text-sm">
                    Jobs in Kenya
                  </Link>
                </li>
                <li>
                  <Link href="/add-listing" className="text-gray-700 hover:text-green-600 hover:underline text-sm">
                    List Your Property
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contextual Quick Links based on current page */}
        {city && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-bold mb-4 text-gray-900">
              More Properties in {city}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                href={`/houses-for-sale/${city.toLowerCase()}-${county?.toLowerCase() || 'nairobi'}`}
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-green-600 hover:shadow-md transition-all text-center"
              >
                <span className="text-sm font-medium text-gray-900">Houses for Sale</span>
              </Link>
              <Link
                href={`/houses-for-rent/${city.toLowerCase()}-${county?.toLowerCase() || 'nairobi'}`}
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-green-600 hover:shadow-md transition-all text-center"
              >
                <span className="text-sm font-medium text-gray-900">Houses for Rent</span>
              </Link>
              <Link
                href={`/apartments-for-sale/${city.toLowerCase()}-${county?.toLowerCase() || 'nairobi'}`}
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-green-600 hover:shadow-md transition-all text-center"
              >
                <span className="text-sm font-medium text-gray-900">Apartments for Sale</span>
              </Link>
              <Link
                href={`/apartments-for-rent/${city.toLowerCase()}-${county?.toLowerCase() || 'nairobi'}`}
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-green-600 hover:shadow-md transition-all text-center"
              >
                <span className="text-sm font-medium text-gray-900">Apartments for Rent</span>
              </Link>
            </div>
          </div>
        )}

        {/* SEO Footer Text */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600 max-w-4xl mx-auto">
            NewKenyan.com is Kenya's leading property listing platform, connecting buyers, sellers, landlords, and tenants across all 47 counties.
            Find houses for sale, apartments for rent, commercial properties, and land in Nairobi, Mombasa, Kisumu, Nakuru, and other major cities.
            Browse verified listings with photos, prices, and direct contact details.
          </p>
        </div>
      </div>
    </div>
  );
}
