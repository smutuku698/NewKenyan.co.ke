'use client';

import { Users, TrendingUp, Building2, MapPin, GraduationCap, Hospital, Zap, Globe, Factory, Landmark } from 'lucide-react';
import { CountyContent } from '@/lib/county-content';

interface CountyPillarContentProps {
  content: CountyContent;
}

export default function CountyPillarContentComponent({ content }: CountyPillarContentProps) {
  return (
    <div className="space-y-10">
      {/* County Overview Header */}
      <section className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 rounded-lg p-6 md:p-8 border-2 border-green-100">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="bg-green-600 p-2 rounded-lg">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{content.countyName} County</h2>
                <p className="text-green-700 font-semibold">{content.region} Region • Capital: {content.capital}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md text-center">
            <Users className="h-6 w-6 text-green-600 mx-auto mb-1" />
            <p className="text-sm text-gray-600">Population</p>
            <p className="text-lg font-bold text-gray-900">{content.population}</p>
          </div>
        </div>
        <p className="text-gray-700 leading-relaxed text-lg">
          {content.overview}
        </p>
      </section>

      {/* Economy Section */}
      <section className="bg-white rounded-lg border border-gray-200 p-6 md:p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-blue-600 p-2 rounded-lg">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">County Economy</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-50 rounded-lg p-5">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Factory className="h-5 w-5 text-blue-600 mr-2" />
              Main Sectors
            </h4>
            <ul className="space-y-2">
              {content.economy.mainSectors.map((sector, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span className="text-sm text-gray-700">{sector}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-green-50 rounded-lg p-5">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Building2 className="h-5 w-5 text-green-600 mr-2" />
              Key Industries
            </h4>
            <ul className="space-y-2">
              {content.economy.keyIndustries.map((industry, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span className="text-sm text-gray-700">{industry}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-purple-50 rounded-lg p-5">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <TrendingUp className="h-5 w-5 text-purple-600 mr-2" />
              Economic Growth
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              {content.economy.economicGrowth}
            </p>
          </div>
        </div>
      </section>

      {/* Real Estate Market */}
      <section className="bg-gradient-to-br from-green-600 to-emerald-700 text-white rounded-lg p-6 md:p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-white/20 p-2 rounded-lg">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-2xl font-bold">Real Estate Market Overview</h3>
        </div>

        <p className="text-white/90 leading-relaxed mb-6 text-lg">
          {content.realEstate.marketOverview}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <p className="text-white/70 text-sm mb-1">Price Range</p>
            <p className="text-xl font-bold">{content.realEstate.priceRange}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <p className="text-white/70 text-sm mb-1">Rental Yield</p>
            <p className="text-xl font-bold">{content.realEstate.rentalYield}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 sm:col-span-2">
            <p className="text-white/70 text-sm mb-1">Investment Potential</p>
            <p className="text-sm font-semibold">{content.realEstate.investmentPotential}</p>
          </div>
        </div>

        {content.realEstate.growthAreas.length > 0 && (
          <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-5 border border-white/20">
            <h4 className="font-semibold mb-3">High-Growth Areas</h4>
            <div className="flex flex-wrap gap-2">
              {content.realEstate.growthAreas.map((area, idx) => (
                <span
                  key={idx}
                  className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Infrastructure */}
      <section className="bg-gray-50 rounded-lg p-6 md:p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-orange-600 p-2 rounded-lg">
            <Landmark className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Infrastructure & Facilities</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Transport */}
          <div className="bg-white rounded-lg p-5 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <Globe className="h-5 w-5 text-blue-600" />
              </div>
              Transportation
            </h4>
            <ul className="space-y-2">
              {content.infrastructure.transport.map((item, idx) => (
                <li key={idx} className="flex items-start text-sm">
                  <span className="text-green-600 mt-1 mr-2">✓</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Education */}
          <div className="bg-white rounded-lg p-5 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
              <div className="bg-purple-100 p-2 rounded-lg mr-3">
                <GraduationCap className="h-5 w-5 text-purple-600" />
              </div>
              Education
            </h4>
            <ul className="space-y-2">
              {content.infrastructure.education.map((item, idx) => (
                <li key={idx} className="flex items-start text-sm">
                  <span className="text-green-600 mt-1 mr-2">✓</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Healthcare */}
          <div className="bg-white rounded-lg p-5 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
              <div className="bg-red-100 p-2 rounded-lg mr-3">
                <Hospital className="h-5 w-5 text-red-600" />
              </div>
              Healthcare
            </h4>
            <ul className="space-y-2">
              {content.infrastructure.healthcare.map((item, idx) => (
                <li key={idx} className="flex items-start text-sm">
                  <span className="text-green-600 mt-1 mr-2">✓</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Utilities */}
          <div className="bg-white rounded-lg p-5 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
              <div className="bg-yellow-100 p-2 rounded-lg mr-3">
                <Zap className="h-5 w-5 text-yellow-600" />
              </div>
              Utilities
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              {content.infrastructure.utilities}
            </p>
          </div>
        </div>
      </section>

      {/* Key Towns & Attractions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Key Towns */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
            <MapPin className="h-5 w-5 text-green-600 mr-2" />
            Major Towns & Urban Centers
          </h4>
          <div className="flex flex-wrap gap-2">
            {content.keyTowns.map((town, idx) => (
              <span
                key={idx}
                className="bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm font-medium border border-green-200"
              >
                {town}
              </span>
            ))}
          </div>
        </div>

        {/* Attractions */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
            <Landmark className="h-5 w-5 text-purple-600 mr-2" />
            Attractions & Points of Interest
          </h4>
          <ul className="space-y-2">
            {content.attractions.map((attraction, idx) => (
              <li key={idx} className="flex items-start text-sm">
                <span className="text-purple-600 mr-2">★</span>
                <span className="text-gray-700">{attraction}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Development Projects */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6 md:p-8">
        <h4 className="font-bold text-xl mb-4 flex items-center">
          <Building2 className="h-6 w-6 mr-2" />
          Ongoing & Planned Development Projects
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {content.developmentProjects.map((project, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <p className="text-white font-medium">{project}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Investment Notice */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong className="text-yellow-800">Investment Note:</strong> Property prices, market trends, and development projects are subject to change based on market conditions. Always conduct thorough due diligence and consult with licensed real estate professionals before making investment decisions in {content.countyName} County.
        </p>
      </div>
    </div>
  );
}
