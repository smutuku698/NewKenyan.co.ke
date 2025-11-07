import Link from 'next/link';
import { MapPin, TrendingUp, DollarSign, Star } from 'lucide-react';

export function PopularSearchesSection() {
  const popularSearches = [
    {
      title: '2 Bedroom Apartment Westlands',
      link: '/apartments-for-rent/nairobi-county?bedrooms=2&city=Westlands',
      volume: '250-400/mo',
      category: 'High Demand'
    },
    {
      title: 'Bedsitter Kasarani Under KES 10,000',
      link: '/bedsitters-for-rent/nairobi-county?city=Kasarani&max_price=10000',
      volume: '150-250/mo',
      category: 'Budget Friendly'
    },
    {
      title: '3 Bedroom House Karen for Sale',
      link: '/houses-for-sale/nairobi-county?bedrooms=3&city=Karen',
      volume: '150-250/mo',
      category: 'Premium'
    },
    {
      title: 'Studio Apartment Kilimani Furnished',
      link: '/apartments-for-rent/nairobi-county?city=Kilimani',
      volume: '100-180/mo',
      category: 'Professionals'
    },
    {
      title: '1 Bedroom Apartment Nairobi',
      link: '/apartments-for-rent/nairobi-county?bedrooms=1',
      volume: '150-250/mo',
      category: 'Popular'
    },
    {
      title: 'Bedsitter Kileleshwa',
      link: '/bedsitters-for-rent/nairobi-county?city=Kileleshwa',
      volume: '100-200/mo',
      category: 'Trending'
    },
    {
      title: 'Houses for Rent Lavington',
      link: '/houses-for-rent/nairobi-county?city=Lavington',
      volume: '80-150/mo',
      category: 'Upscale'
    },
    {
      title: 'Apartments Parklands',
      link: '/apartments-for-rent/nairobi-county?city=Parklands',
      volume: '100-180/mo',
      category: 'Family Friendly'
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-green-50 to-blue-50 border-t border-green-100">
      <div className="container mx-auto px-3">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-green-600 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-3xl font-bold text-gray-900 mb-3">
            Most Searched Properties in Nairobi
          </h2>
          <p className="text-base md:text-base text-gray-600 max-w-2xl mx-auto">
            Quick access to the most popular property searches. Find apartments for rent in Nairobi, bedsitters, and houses based on what others are searching for.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularSearches.map((search, index) => (
            <Link
              key={index}
              href={search.link}
              className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-all border border-gray-200 hover:border-green-500 group"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">
                  {search.category}
                </span>
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                {search.title}
              </h3>
              <p className="text-xs text-gray-500">
                {search.volume} searches
              </p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/properties"
            className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold"
          >
            Browse All Properties →
          </Link>
        </div>
      </div>
    </section>
  );
}

export function BrowseByBudgetSection() {
  const budgetRanges = [
    {
      category: 'Bedsitters',
      ranges: [
        { label: 'KES 5,000 - 10,000', link: '/bedsitters-for-rent/nairobi-county?min_price=5000&max_price=10000', popular: true },
        { label: 'KES 10,000 - 15,000', link: '/bedsitters-for-rent/nairobi-county?min_price=10000&max_price=15000', popular: true },
        { label: 'KES 15,000+', link: '/bedsitters-for-rent/nairobi-county?min_price=15000', popular: false }
      ],
      icon: '🚪',
      description: 'Perfect for students & young professionals'
    },
    {
      category: '1 Bedroom',
      ranges: [
        { label: 'KES 15,000 - 25,000', link: '/apartments-for-rent/nairobi-county?bedrooms=1&min_price=15000&max_price=25000', popular: true },
        { label: 'KES 25,000 - 35,000', link: '/apartments-for-rent/nairobi-county?bedrooms=1&min_price=25000&max_price=35000', popular: true },
        { label: 'KES 35,000+', link: '/apartments-for-rent/nairobi-county?bedrooms=1&min_price=35000', popular: false }
      ],
      icon: '🏠',
      description: 'Ideal for singles & couples'
    },
    {
      category: '2 Bedroom',
      ranges: [
        { label: 'KES 25,000 - 40,000', link: '/apartments-for-rent/nairobi-county?bedrooms=2&min_price=25000&max_price=40000', popular: true },
        { label: 'KES 40,000 - 60,000', link: '/apartments-for-rent/nairobi-county?bedrooms=2&min_price=40000&max_price=60000', popular: true },
        { label: 'KES 60,000+', link: '/apartments-for-rent/nairobi-county?bedrooms=2&min_price=60000', popular: false }
      ],
      icon: '🏡',
      description: 'Most searched size - Family favorite'
    },
    {
      category: '3 Bedroom',
      ranges: [
        { label: 'KES 40,000 - 60,000', link: '/apartments-for-rent/nairobi-county?bedrooms=3&min_price=40000&max_price=60000', popular: true },
        { label: 'KES 60,000 - 80,000', link: '/apartments-for-rent/nairobi-county?bedrooms=3&min_price=60000&max_price=80000', popular: true },
        { label: 'KES 80,000+', link: '/apartments-for-rent/nairobi-county?bedrooms=3&min_price=80000', popular: false }
      ],
      icon: '🏘️',
      description: 'Spacious homes for growing families'
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-3">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-3xl font-bold text-gray-900 mb-3">
            Browse Properties by Your Budget
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find affordable apartments for rent in Nairobi within your price range. Filter by bedroom count and monthly rent to discover your ideal home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {budgetRanges.map((category, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 border-2 border-gray-200 hover:border-blue-500 transition-all"
            >
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{category.icon}</div>
                <h3 className="font-bold text-lg text-gray-900 mb-1">
                  {category.category}
                </h3>
                <p className="text-xs text-gray-600">{category.description}</p>
              </div>

              <div className="space-y-2">
                {category.ranges.map((range, idx) => (
                  <Link
                    key={idx}
                    href={range.link}
                    className={`block text-center py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                      range.popular
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-300'
                    }`}
                  >
                    {range.label}
                    {range.popular && <span className="ml-1">🔥</span>}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg p-6 text-center text-white">
          <h3 className="font-bold text-xl mb-2">
            Looking for Cheap Apartments for Rent in Nairobi?
          </h3>
          <p className="mb-4 text-blue-50">
            We have 1,000+ affordable listings starting from KES 5,000/month
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/bedsitters-for-rent/nairobi-county?max_price=10000"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all"
            >
              Bedsitters Under 10K
            </Link>
            <Link
              href="/apartments-for-rent/nairobi-county?bedrooms=1&max_price=20000"
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all"
            >
              1BR Under 20K
            </Link>
            <Link
              href="/apartments-for-rent/nairobi-county?bedrooms=2&max_price=30000"
              className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all"
            >
              2BR Under 30K
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeaturedNeighborhoodsSection() {
  const neighborhoods = [
    {
      name: 'Westlands',
      slug: 'westlands',
      county: 'nairobi-county',
      searches: '200-350/mo',
      avgRent: 'KES 35,000 - 80,000',
      description: 'Upscale neighborhood with modern apartments, malls & restaurants',
      highlights: ['Shopping malls', 'Expat-friendly', 'Modern apartments'],
      priority: 'critical'
    },
    {
      name: 'Kilimani',
      slug: 'kilimani',
      county: 'nairobi-county',
      searches: '200-300/mo',
      avgRent: 'KES 30,000 - 70,000',
      description: 'Vibrant area popular with young professionals & families',
      highlights: ['Central location', 'Nightlife', '2BR hotspot'],
      priority: 'critical'
    },
    {
      name: 'Karen',
      slug: 'karen',
      county: 'nairobi-county',
      searches: '150-250/mo',
      avgRent: 'KES 80,000 - 200,000',
      description: 'Exclusive leafy suburb with spacious houses & premium amenities',
      highlights: ['Luxury homes', 'Spacious', 'Family-friendly'],
      priority: 'critical'
    },
    {
      name: 'Kasarani',
      slug: 'kasarani',
      county: 'nairobi-county',
      searches: '150-250/mo',
      avgRent: 'KES 8,000 - 25,000',
      description: 'Affordable residential area perfect for budget-conscious renters',
      highlights: ['Affordable', 'Student-friendly', 'Growing area'],
      priority: 'high'
    },
    {
      name: 'Kileleshwa',
      slug: 'kileleshwa',
      county: 'nairobi-county',
      searches: '100-200/mo',
      avgRent: 'KES 25,000 - 60,000',
      description: 'Quiet residential area close to Westlands & CBD',
      highlights: ['Quiet', 'Safe', 'Well-connected'],
      priority: 'high'
    },
    {
      name: 'Parklands',
      slug: 'parklands',
      county: 'nairobi-county',
      searches: '100-180/mo',
      avgRent: 'KES 20,000 - 50,000',
      description: 'Diverse neighborhood with mix of apartments & houses',
      highlights: ['Diverse', 'Affordable', 'Good schools'],
      priority: 'high'
    },
    {
      name: 'Lavington',
      slug: 'lavington',
      county: 'nairobi-county',
      searches: '80-150/mo',
      avgRent: 'KES 60,000 - 150,000',
      description: 'Prestigious area with beautiful homes & green spaces',
      highlights: ['Prestigious', 'Quiet', 'Leafy'],
      priority: 'medium'
    },
    {
      name: 'Ruaka',
      slug: 'ruaka',
      county: 'kiambu-county',
      searches: '100-200/mo',
      avgRent: 'KES 15,000 - 40,000',
      description: 'Fast-growing suburb with modern apartments',
      highlights: ['Affordable', 'Modern', 'Growing'],
      priority: 'high'
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-3">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-600 rounded-lg">
              <MapPin className="h-6 w-6 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-3xl font-bold text-gray-900 mb-3">
            Featured Neighborhoods in Nairobi
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore the most sought-after locations. Find apartments for rent in Westlands, Kilimani, Karen, and other premium Nairobi neighborhoods.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {neighborhoods.map((neighborhood, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-all border-2 ${
                neighborhood.priority === 'critical'
                  ? 'border-red-300 hover:border-red-500'
                  : neighborhood.priority === 'high'
                  ? 'border-orange-300 hover:border-orange-500'
                  : 'border-gray-200 hover:border-purple-500'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-xl text-gray-900">
                  {neighborhood.name}
                </h3>
                {neighborhood.priority === 'critical' && (
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-semibold">
                    HOT
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-600 mb-3">{neighborhood.description}</p>

              <div className="mb-4">
                <div className="flex flex-wrap gap-1 mb-2">
                  {neighborhood.highlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Avg. Rent:</span>
                  <span className="font-semibold text-gray-700">{neighborhood.avgRent}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Searches:</span>
                  <span className="font-semibold text-green-600">{neighborhood.searches}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Link
                  href={`/apartments-for-rent/${neighborhood.county}?city=${neighborhood.slug}`}
                  className="text-center bg-purple-600 text-white py-2 px-3 rounded-lg text-xs font-semibold hover:bg-purple-700 transition-all"
                >
                  Apartments
                </Link>
                <Link
                  href={`/houses-for-rent/${neighborhood.county}?city=${neighborhood.slug}`}
                  className="text-center bg-white text-purple-600 border-2 border-purple-600 py-2 px-3 rounded-lg text-xs font-semibold hover:bg-purple-50 transition-all"
                >
                  Houses
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <h3 className="font-bold text-xl text-gray-900 mb-4">
            Search by Specific Neighborhood Needs
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/apartments-for-rent/nairobi-county?city=westlands&bedrooms=2"
              className="bg-white border-2 border-purple-300 text-purple-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-50 transition-all"
            >
              2 Bedroom Apartment Westlands
            </Link>
            <Link
              href="/bedsitters-for-rent/nairobi-county?city=kasarani&max_price=10000"
              className="bg-white border-2 border-purple-300 text-purple-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-50 transition-all"
            >
              Bedsitter Kasarani Under 10K
            </Link>
            <Link
              href="/houses-for-sale/nairobi-county?city=karen&bedrooms=3"
              className="bg-white border-2 border-purple-300 text-purple-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-50 transition-all"
            >
              3 Bedroom House Karen
            </Link>
            <Link
              href="/apartments-for-rent/nairobi-county?city=kilimani"
              className="bg-white border-2 border-purple-300 text-purple-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-50 transition-all"
            >
              Apartments Kilimani
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function QuickAccessLinksSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-3">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-3xl font-bold text-gray-900 mb-3">
            Quick Access to Popular Property Types
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fast links to the most searched property types and locations in Kenya
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Bedroom-Specific Searches */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center">
              <span className="text-2xl mr-2">🛏️</span>
              By Bedroom Count
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/bedsitters-for-rent/nairobi-county" className="text-green-600 hover:underline text-sm">
                  Bedsitter for Rent Nairobi
                </Link>
              </li>
              <li>
                <Link href="/apartments-for-rent/nairobi-county?bedrooms=1" className="text-green-600 hover:underline text-sm">
                  1 Bedroom Apartment for Rent Nairobi
                </Link>
              </li>
              <li>
                <Link href="/apartments-for-rent/nairobi-county?bedrooms=2" className="text-green-600 hover:underline text-sm">
                  2 Bedroom Apartment Nairobi
                </Link>
              </li>
              <li>
                <Link href="/houses-for-rent/nairobi-county?bedrooms=2" className="text-green-600 hover:underline text-sm">
                  2 Bedroom House for Rent Nairobi
                </Link>
              </li>
              <li>
                <Link href="/houses-for-rent/nairobi-county?bedrooms=3" className="text-green-600 hover:underline text-sm">
                  3 Bedroom House for Rent
                </Link>
              </li>
              <li>
                <Link href="/apartments-for-rent/nairobi-county?bedrooms=3" className="text-green-600 hover:underline text-sm">
                  3 Bedroom Apartment Westlands
                </Link>
              </li>
              <li>
                <Link href="/apartments-for-rent/nairobi-county" className="text-green-600 hover:underline text-sm">
                  Studio Apartment Nairobi
                </Link>
              </li>
            </ul>
          </div>

          {/* Budget/Price Keywords */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center">
              <span className="text-2xl mr-2">💰</span>
              By Budget
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/apartments-for-rent/nairobi-county?max_price=20000" className="text-green-600 hover:underline text-sm">
                  Cheap Apartments for Rent Nairobi
                </Link>
              </li>
              <li>
                <Link href="/houses-for-sale/nairobi-county?max_price=5000000" className="text-green-600 hover:underline text-sm">
                  Affordable Houses for Sale Kenya
                </Link>
              </li>
              <li>
                <Link href="/bedsitters-for-rent/nairobi-county?max_price=5000" className="text-green-600 hover:underline text-sm">
                  Bedsitter 5000 Nairobi
                </Link>
              </li>
              <li>
                <Link href="/bedsitters-for-rent/nairobi-county?max_price=10000" className="text-green-600 hover:underline text-sm">
                  Bedsitter for Rent Nairobi Under 10000
                </Link>
              </li>
              <li>
                <Link href="/houses-for-sale/nairobi-county?max_price=5000000" className="text-green-600 hover:underline text-sm">
                  Houses Under 5 Million Kenya
                </Link>
              </li>
              <li>
                <Link href="/apartments-for-rent/nairobi-county?max_price=15000" className="text-green-600 hover:underline text-sm">
                  Affordable Apartments Nairobi
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Type + Location Combos */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center">
              <span className="text-2xl mr-2">🏘️</span>
              By Property Type
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/maisonettes-for-sale/nairobi-county" className="text-green-600 hover:underline text-sm">
                  Maisonette for Sale Nairobi
                </Link>
              </li>
              <li>
                <Link href="/bungalows-for-sale/kiambu-county" className="text-green-600 hover:underline text-sm">
                  Bungalow for Sale Kiambu
                </Link>
              </li>
              <li>
                <Link href="/townhouses-for-rent/nairobi-county" className="text-green-600 hover:underline text-sm">
                  Townhouse for Rent Nairobi
                </Link>
              </li>
              <li>
                <Link href="/villas-for-sale/mombasa-county" className="text-green-600 hover:underline text-sm">
                  Villa for Sale Mombasa
                </Link>
              </li>
              <li>
                <Link href="/office-space-for-rent/nairobi-county" className="text-green-600 hover:underline text-sm">
                  Office Space for Rent Nairobi
                </Link>
              </li>
              <li>
                <Link href="/land-for-sale/nairobi-county" className="text-green-600 hover:underline text-sm">
                  Land for Sale in Kenya
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-center text-white">
          <h3 className="font-bold text-xl mb-2">
            Can't Find What You're Looking For?
          </h3>
          <p className="mb-4 text-green-50">
            Use our advanced search filters to find exactly what you need
          </p>
          <Link
            href="/properties"
            className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all"
          >
            Advanced Property Search
          </Link>
        </div>
      </div>
    </section>
  );
}
