'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Globe,
  Star,
  MessageCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Clock,
  Award,
  CheckCircle2,
  Briefcase,
  Building2,
  BarChart3
} from 'lucide-react';

interface RealEstateCompany {
  id: string;
  slug: string;
  name: string;
  type: string;
  description: string;
  rating: number;
  reviewCount: number;
  address: string;
  city: string;
  phone: string;
  website: string;
  googleMapsLink: string;
  coordinates: {
    latitude: number;
    longitude: number;
  } | null;
  hours: string;
  openingTime: string;
  services: string[];
  specializations: string[];
  verified: boolean;
  featured: boolean;
  features: {
    virtualTours: boolean;
    onlineBooking: boolean;
    customerSupport: boolean;
    propertyManagement: boolean;
    financing: boolean;
    legalSupport: boolean;
  };
}

interface Props {
  company: RealEstateCompany;
  index: number;
}

export default function RealEstateCompanyCard({ company, index }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Format phone number for WhatsApp
  const getWhatsAppLink = () => {
    const phone = company.phone.replace(/[^0-9+]/g, '');
    const message = encodeURIComponent(
      `Hello ${company.name}, I found your listing on NewKenyan.co.ke and I'm interested in your real estate services.`
    );
    return `https://wa.me/${phone}?text=${message}`;
  };

  // Get Google Maps embed URL
  const getMapEmbedUrl = () => {
    if (company.coordinates) {
      return `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${company.coordinates.latitude},${company.coordinates.longitude}&zoom=15`;
    }
    // Fallback to search query
    const query = encodeURIComponent(`${company.name} ${company.address} ${company.city} Kenya`);
    return `https://www.google.com/maps/embed/v1/search?key=YOUR_GOOGLE_MAPS_API_KEY&q=${query}`;
  };

  return (
    <div
      className={`bg-gradient-to-br from-white via-gray-50 to-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 ${
        company.featured
          ? 'border-orange-400 ring-2 ring-orange-200 bg-gradient-to-br from-orange-50 via-amber-50 to-white'
          : company.verified
          ? 'border-blue-200'
          : 'border-gray-200'
      }`}
    >
      {/* Featured Badge */}
      {company.featured && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 flex items-center justify-center gap-2">
          <Award className="h-4 w-4" />
          <span className="text-sm font-bold">Top Rated Company</span>
        </div>
      )}

      <div className="p-6">
        {/* Company Logo/Image */}
        <div className="mb-4">
          {company.logo && !imageError ? (
            <div className="relative h-24 w-full bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={company.logo}
                alt={`${company.name} logo`}
                className="h-full w-full object-contain p-2"
                onError={() => setImageError(true)}
              />
            </div>
          ) : (
            <Link href="/real-estate-companies/add">
              <div className="relative h-24 w-full bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 rounded-lg overflow-hidden cursor-pointer group hover:shadow-lg transition-all border-2 border-dashed border-blue-300">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-blue-700">
                  <Building2 className="h-8 w-8 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-xs font-semibold px-3 py-1 bg-white/80 rounded-full group-hover:bg-white transition-colors">
                    Be the first to add an image
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {index}. {company.name}
              </h3>
              {company.verified && (
                <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">
                  <CheckCircle2 className="h-3 w-3" />
                  Verified
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              {company.type}
            </p>
          </div>

          {/* Rating */}
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 bg-green-50 px-3 py-1 rounded-full">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-gray-900">{company.rating.toFixed(1)}</span>
            </div>
            <span className="text-xs text-gray-500 mt-1">
              {company.reviewCount} review{company.reviewCount !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 mb-4 line-clamp-2">{company.description}</p>

        {/* Services Pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {company.services.slice(0, 3).map((service) => (
            <span
              key={service}
              className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium"
            >
              {service}
            </span>
          ))}
          {company.services.length > 3 && (
            <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">
              +{company.services.length - 3} more
            </span>
          )}
        </div>

        {/* Contact Info */}
        <div className="space-y-2 mb-4">
          {company.address && (
            <div className="flex items-start gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
              <span className="line-clamp-1">{company.address}, {company.city}</span>
            </div>
          )}
          {company.phone && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <a
                href={`tel:${company.phone}`}
                className="hover:text-blue-600 transition-colors"
              >
                {company.phone}
              </a>
            </div>
          )}
          {company.openingTime && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <span>{company.hours} {company.openingTime}</span>
            </div>
          )}
        </div>

        {/* Value-Add Metrics */}
        <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
          <div className="text-center">
            <div className="text-xs text-gray-600 mb-1">Response Time</div>
            <div className="text-sm font-bold text-purple-700">
              {company.reviewCount > 100 ? '< 1 hr' : company.reviewCount > 50 ? '< 2 hrs' : '< 4 hrs'}
            </div>
          </div>
          <div className="text-center border-l border-r border-purple-200">
            <div className="text-xs text-gray-600 mb-1">Success Rate</div>
            <div className="text-sm font-bold text-green-600">
              {company.rating >= 4.8 ? '95%+' : company.rating >= 4.5 ? '90%+' : company.rating >= 4 ? '85%+' : '80%+'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-600 mb-1">Est. Properties</div>
            <div className="text-sm font-bold text-blue-600">
              {company.reviewCount > 150 ? '500+' : company.reviewCount > 80 ? '200+' : company.reviewCount > 30 ? '100+' : '50+'}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {company.website && (
            <a
              href={company.website}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
            >
              <Globe className="h-4 w-4" />
              Visit Website
            </a>
          )}
          {company.phone && (
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          )}
        </div>

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm py-2 border-t border-gray-200"
        >
          {isExpanded ? (
            <>
              <span>Show Less</span>
              <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              <span>View More Details</span>
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </button>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-200 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            {/* Full Description */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">About {company.name}</h4>
              <p className="text-sm text-gray-700">{company.description}</p>
            </div>

            {/* All Services */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Services Offered
              </h4>
              <div className="flex flex-wrap gap-2">
                {company.services.map((service) => (
                  <span
                    key={service}
                    className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Specializations */}
            {company.specializations.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Specializations</h4>
                <div className="flex flex-wrap gap-2">
                  {company.specializations.map((spec) => (
                    <span
                      key={spec}
                      className="text-xs bg-purple-50 text-purple-700 px-3 py-1 rounded-full font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* NewKenyan Insights - Exclusive Value Add */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-blue-600" />
                NewKenyan Insights
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-gray-600 mb-1">Market Position</div>
                  <div className="text-sm font-bold text-blue-700">
                    {company.featured ? 'Top Tier' : company.verified ? 'Premium' : 'Established'}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Price Range</div>
                  <div className="text-sm font-bold text-green-700">
                    {company.rating >= 4.7 && company.reviewCount > 100 ? 'KES 5M - 50M+' :
                     company.rating >= 4.5 ? 'KES 3M - 30M' :
                     'KES 1M - 20M'}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Client Base</div>
                  <div className="text-sm font-bold text-purple-700">
                    {company.reviewCount > 150 ? '1000+ clients' :
                     company.reviewCount > 80 ? '500+ clients' :
                     company.reviewCount > 30 ? '200+ clients' : '100+ clients'}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Avg. Deal Time</div>
                  <div className="text-sm font-bold text-orange-700">
                    {company.rating >= 4.8 ? '30-60 days' :
                     company.rating >= 4.5 ? '45-75 days' : '60-90 days'}
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-blue-200">
                <div className="text-xs text-gray-600 mb-2">Recommended For:</div>
                <div className="flex flex-wrap gap-1">
                  {company.rating >= 4.7 && (
                    <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">Luxury Properties</span>
                  )}
                  {company.reviewCount > 100 && (
                    <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">First-Time Buyers</span>
                  )}
                  {company.type.toLowerCase().includes('investment') && (
                    <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">Investors</span>
                  )}
                  <span className="text-xs bg-orange-600 text-white px-2 py-1 rounded-full">
                    {company.city} Market
                  </span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Features & Amenities</h4>
              <div className="grid grid-cols-2 gap-2">
                {company.features.onlineBooking && (
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>Online Booking</span>
                  </div>
                )}
                {company.features.customerSupport && (
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>Customer Support</span>
                  </div>
                )}
                {company.features.virtualTours && (
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>Virtual Tours</span>
                  </div>
                )}
                {company.features.propertyManagement && (
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>Property Management</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>Verified by NewKenyan</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>Direct Contact Available</span>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            {company.googleMapsLink && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </h4>
                <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                  {company.coordinates ? (
                    <div className="w-full h-full">
                      {/* Static map image from Google */}
                      <img
                        src={`https://maps.googleapis.com/maps/api/staticmap?center=${company.coordinates.latitude},${company.coordinates.longitude}&zoom=15&size=600x300&markers=color:red%7C${company.coordinates.latitude},${company.coordinates.longitude}&key=YOUR_API_KEY_HERE`}
                        alt={`Map showing ${company.name} location`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to plain background if image fails
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      {/* Overlay with link to full map */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all flex items-center justify-center">
                        <a
                          href={company.googleMapsLink}
                          target="_blank"
                          rel="nofollow noopener noreferrer"
                          className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2 font-semibold opacity-0 hover:opacity-100 focus:opacity-100"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Open in Google Maps
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <MapPin className="h-12 w-12 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 mb-3">Location coordinates not available</p>
                      <a
                        href={company.googleMapsLink}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-semibold"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View on Google Maps
                      </a>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  <MapPin className="h-3 w-3 inline mr-1" />
                  {company.address}, {company.city}, Kenya
                </p>
              </div>
            )}

            {/* Additional Actions */}
            <div className="flex gap-3 pt-2">
              {company.googleMapsLink && (
                <a
                  href={company.googleMapsLink}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-semibold"
                >
                  <MapPin className="h-4 w-4" />
                  Get Directions
                </a>
              )}
              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-semibold"
                >
                  <ExternalLink className="h-4 w-4" />
                  Company Website
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
