'use client';

import { ExternalLink, TrendingUp, MapPin, Building2, GraduationCap, Hospital, ShoppingCart, Info } from 'lucide-react';
import { CityPillarContent } from '@/lib/city-pillar-content';

interface CityPillarContentProps {
  content: CityPillarContent;
}

export default function CityPillarContentComponent({ content }: CityPillarContentProps) {
  return (
    <div className="space-y-12">
      {/* City Overview */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 md:p-8">
        <div className="flex items-start space-x-3 mb-4">
          <div className="bg-green-600 p-2 rounded-lg">
            <Info className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            About {content.cityName}
          </h2>
        </div>
        <p className="text-gray-700 leading-relaxed text-lg">
          {content.overview}
        </p>
      </section>

      {/* Market Insights */}
      <section>
        <div className="flex items-start space-x-3 mb-6">
          <div className="bg-blue-600 p-2 rounded-lg">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {content.marketInsights.title}
          </h2>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8 mb-6">
          <p className="text-gray-700 leading-relaxed mb-6">
            {content.marketInsights.content}
          </p>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {content.marketInsights.statistics.map((stat, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-4 border border-green-100"
              >
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-green-700 mb-2">{stat.value}</p>
                {stat.source && (
                  <p className="text-xs text-gray-500 italic">Source: {stat.source}</p>
                )}
              </div>
            ))}
          </div>

          {/* Market Trends */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Market Trends</h3>
            <ul className="space-y-3">
              {content.marketInsights.trends.map((trend, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="bg-green-100 p-1 rounded-full mt-1 flex-shrink-0">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{trend}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section>
        <div className="flex items-start space-x-3 mb-6">
          <div className="bg-purple-600 p-2 rounded-lg">
            <MapPin className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {content.neighborhoods.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {content.neighborhoods.areas.map((area, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-900">{area.name}</h3>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                  {area.priceRange}
                </span>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">{area.description}</p>

              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Amenities:</h4>
                <div className="flex flex-wrap gap-2">
                  {area.amenities.map((amenity, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Best For:</h4>
                <div className="flex flex-wrap gap-2">
                  {area.bestFor.map((item, idx) => (
                    <span
                      key={idx}
                      className="bg-purple-50 text-purple-700 px-2 py-1 rounded text-xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Infrastructure */}
      <section className="bg-gray-50 rounded-lg p-6 md:p-8">
        <div className="flex items-start space-x-3 mb-6">
          <div className="bg-orange-600 p-2 rounded-lg">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {content.infrastructure.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Transportation */}
          <div className="bg-white rounded-lg p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="bg-blue-100 p-2 rounded-lg mr-3">
                <MapPin className="h-5 w-5 text-blue-600" />
              </span>
              Transportation
            </h3>
            <ul className="space-y-2">
              {content.infrastructure.transportation.map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span className="text-gray-700 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Education */}
          <div className="bg-white rounded-lg p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="bg-purple-100 p-2 rounded-lg mr-3">
                <GraduationCap className="h-5 w-5 text-purple-600" />
              </span>
              Education
            </h3>
            <ul className="space-y-2">
              {content.infrastructure.education.map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span className="text-gray-700 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Healthcare */}
          <div className="bg-white rounded-lg p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="bg-red-100 p-2 rounded-lg mr-3">
                <Hospital className="h-5 w-5 text-red-600" />
              </span>
              Healthcare
            </h3>
            <ul className="space-y-2">
              {content.infrastructure.healthcare.map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span className="text-gray-700 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Shopping */}
          <div className="bg-white rounded-lg p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="bg-green-100 p-2 rounded-lg mr-3">
                <ShoppingCart className="h-5 w-5 text-green-600" />
              </span>
              Shopping & Retail
            </h3>
            <ul className="space-y-2">
              {content.infrastructure.shopping.map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span className="text-gray-700 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Investment Opportunities */}
      <section>
        <div className="flex items-start space-x-3 mb-6">
          <div className="bg-emerald-600 p-2 rounded-lg">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {content.investment.title}
          </h2>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8">
          <p className="text-gray-700 leading-relaxed mb-6">
            {content.investment.content}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Opportunities */}
            <div className="bg-green-50 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Investment Opportunities
              </h3>
              <ul className="space-y-3">
                {content.investment.opportunities.map((opportunity, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-green-600 font-bold mt-1">+</span>
                    <span className="text-gray-700 text-sm">{opportunity}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Considerations */}
            <div className="bg-orange-50 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Key Considerations
              </h3>
              <ul className="space-y-3">
                {content.investment.considerations.map((consideration, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-orange-600 font-bold mt-1">!</span>
                    <span className="text-gray-700 text-sm">{consideration}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Authoritative Sources - E-E-A-T Signals */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-6 md:p-8 border-2 border-blue-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <ExternalLink className="h-5 w-5 text-blue-600 mr-2" />
          Authoritative Sources & References
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          The information on this page is backed by data from official government sources,
          leading property research firms, and authoritative institutions in Kenya.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {content.authoritative_sources.map((source, index) => (
            <a
              key={index}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-sm text-gray-900 group-hover:text-blue-600">
                  {source.label}
                </h3>
                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600 flex-shrink-0" />
              </div>
              <p className="text-xs text-gray-600">{source.description}</p>
            </a>
          ))}
        </div>

        <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-xs text-gray-600">
            <strong>Note:</strong> Property prices, market trends, and statistics are subject to market conditions and may vary.
            Always conduct independent research and consult with licensed real estate professionals before making investment decisions.
            Data is updated regularly from official sources.
          </p>
        </div>
      </section>
    </div>
  );
}
