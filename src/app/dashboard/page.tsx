'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
 
  Edit3, 
  Eye, 
  Calendar,
  Plus,
  BarChart3,
  TrendingUp,
  MapPin,
  Phone,
  Mail,
  Globe,
  MessageCircle,
  Building,
  Home,
  Bed,
  Bath
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface BusinessListing {
  id: string;
  created_at: string;
  business_name: string;
  category: string;
  description: string;
  address: string;
  city: string;
  pin_location_url: string | null;
  phone: string;
  email: string | null;
  website: string | null;
  business_days: string | null;
  pricing_info: string | null;
  image_url: string | null;
  rating: number;
  review_count: number;
  is_approved: boolean;
  is_verified: boolean;
  whatsapp_number: string | null;
  user_id: string;
}

interface PropertyListing {
  id: string;
  created_at: string;
  property_title: string;
  property_type: string;
  description: string;
  price: number;
  price_type: string;
  bedrooms: number | null;
  bathrooms: number | null;
  square_feet: number | null;
  address: string;
  city: string;
  county: string | null;
  contact_phone: string;
  contact_email: string | null;
  whatsapp_number: string | null;
  amenities: string[];
  images: string[];
  available_from: string | null;
  is_furnished: boolean;
  pets_allowed: boolean;
  rating: number;
  review_count: number;
  is_approved: boolean;
  is_featured: boolean;
  views_count: number;
  user_id: string;
}

const BusinessServicesWidget = () => {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg p-6 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
      
      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-2">
          🚀 Let Us Build You the Perfect Business Website
        </h3>
        <p className="text-blue-100 mb-4 text-sm">
          Professional website design & SEO services to grow your business online
        </p>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Link href="/website-services">
            <Button 
              variant="secondary" 
              className="bg-white text-blue-600 hover:bg-blue-50 w-full sm:w-auto"
            >
              Learn More
            </Button>
          </Link>
          <Link href="/website-services#pricing">
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600 w-full sm:w-auto"
            >
              See Our Prices
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function UserDashboard() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<'business' | 'property'>('business');
  const [businessListings, setBusinessListings] = useState<BusinessListing[]>([]);
  const [propertyListings, setPropertyListings] = useState<PropertyListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBusinessListing, setSelectedBusinessListing] = useState<BusinessListing | null>(null);
  const [selectedPropertyListing, setSelectedPropertyListing] = useState<PropertyListing | null>(null);

  useEffect(() => {
    if (user) {
      fetchUserListings();
    }
  }, [user]);

  const fetchUserListings = async () => {
    try {
      // Fetch business listings
      const { data: businessData, error: businessError } = await supabase
        .from('business_listings')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      // Fetch property listings
      const { data: propertyData, error: propertyError } = await supabase
        .from('property_listings')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (businessError) {
        console.error('Error fetching business listings:', businessError);
      } else {
        setBusinessListings(businessData || []);
      }

      if (propertyError) {
        console.error('Error fetching property listings:', propertyError);
      } else {
        setPropertyListings(propertyData || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getBusinessStatusBadge = (listing: BusinessListing) => {
    if (listing.is_approved && listing.is_verified) {
      return (
        <Badge className="bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Live & Verified
        </Badge>
      );
    } else if (listing.is_approved) {
      return (
        <Badge className="bg-blue-100 text-blue-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Approved
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-yellow-100 text-yellow-800">
          <Clock className="h-3 w-3 mr-1" />
          Under Review
        </Badge>
      );
    }
  };

  const getPropertyStatusBadge = (listing: PropertyListing) => {
    if (listing.is_approved && listing.is_featured) {
      return (
        <Badge className="bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Live & Featured
        </Badge>
      );
    } else if (listing.is_approved) {
      return (
        <Badge className="bg-blue-100 text-blue-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Approved
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-yellow-100 text-yellow-800">
          <Clock className="h-3 w-3 mr-1" />
          Under Review
        </Badge>
      );
    }
  };

  const getStats = () => {
    const currentListings = activeTab === 'business' ? businessListings : propertyListings;
    const total = currentListings.length;
    const approved = currentListings.filter(l => l.is_approved).length;
    const pending = currentListings.filter(l => !l.is_approved).length;
    const totalViews = activeTab === 'business' 
      ? businessListings.reduce((sum, l) => sum + l.review_count, 0)
      : propertyListings.reduce((sum, l) => sum + l.views_count, 0);
    
    return { total, approved, pending, totalViews };
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-2xl mx-auto p-6 text-center py-20">
          <h2 className="text-2xl font-semibold mb-4">Sign In Required</h2>
          <p className="text-gray-600">Please sign in to view your dashboard.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Dashboard</h1>
          <p className="text-gray-600">Manage your business listings and track performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Listings</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {activeTab === 'business' ? 'Total Reviews' : 'Total Views'}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalViews}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Listings Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">My Listings</h2>
                  <div className="flex space-x-2">
                    <Link href="/add-listing">
                      <Button size="sm" variant="outline" className="border-green-600 text-green-600">
                        <Building className="h-4 w-4 mr-2" />
                        Add Business
                      </Button>
                    </Link>
                    <Link href="/properties/add">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <Home className="h-4 w-4 mr-2" />
                        Add Property
                      </Button>
                    </Link>
                  </div>
                </div>
                
                {/* Tabs */}
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={() => setActiveTab('business')}
                    className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                      activeTab === 'business'
                        ? 'bg-white text-green-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Building className="h-4 w-4 inline mr-2" />
                    Business ({businessListings.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('property')}
                    className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                      activeTab === 'property'
                        ? 'bg-white text-green-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Home className="h-4 w-4 inline mr-2" />
                    Properties ({propertyListings.length})
                  </button>
                </div>
              </div>

              <div className="p-6">
                {loading ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600">Loading your listings...</p>
                  </div>
                ) : (
                  <>
                    {/* Business Listings */}
                    {activeTab === 'business' && (
                      <>
                        {businessListings.length === 0 ? (
                          <div className="text-center py-12">
                            <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-600 mb-2">No business listings yet</h3>
                            <p className="text-gray-500 mb-6">Create your first business listing to get started.</p>
                            <Link href="/add-listing">
                              <Button className="bg-green-600 hover:bg-green-700">
                                <Plus className="h-4 w-4 mr-2" />
                                Create Business Listing
                              </Button>
                            </Link>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {businessListings.map((listing) => (
                              <div
                                key={listing.id}
                                className={`border border-gray-200 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                                  selectedBusinessListing?.id === listing.id ? 'border-green-500 bg-green-50' : ''
                                }`}
                                onClick={() => setSelectedBusinessListing(listing)}
                              >
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex-1">
                                    <h3 className="font-semibold text-lg">{listing.business_name}</h3>
                                    <p className="text-sm text-gray-600">{listing.category} • {listing.city}</p>
                                  </div>
                                  {getBusinessStatusBadge(listing)}
                                </div>
                                
                                <p className="text-gray-700 text-sm mb-3 line-clamp-2">{listing.description}</p>
                                
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center text-sm text-gray-500">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    Created {new Date(listing.created_at).toLocaleDateString()}
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedBusinessListing(listing);
                                      }}
                                    >
                                      <Eye className="h-4 w-4 mr-1" />
                                      View
                                    </Button>
                                    <Link href={`/add-listing?edit=${listing.id}`}>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <Edit3 className="h-4 w-4 mr-1" />
                                        Edit
                                      </Button>
                                    </Link>
                                    {listing.rating > 0 && (
                                      <div className="flex items-center text-sm">
                                        <BarChart3 className="h-4 w-4 mr-1 text-yellow-500" />
                                        {listing.rating} ({listing.review_count} reviews)
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}

                    {/* Property Listings */}
                    {activeTab === 'property' && (
                      <>
                        {propertyListings.length === 0 ? (
                          <div className="text-center py-12">
                            <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-600 mb-2">No property listings yet</h3>
                            <p className="text-gray-500 mb-6">Create your first property listing to get started.</p>
                            <Link href="/properties/add">
                              <Button className="bg-green-600 hover:bg-green-700">
                                <Plus className="h-4 w-4 mr-2" />
                                Create Property Listing
                              </Button>
                            </Link>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {propertyListings.map((listing) => (
                              <div
                                key={listing.id}
                                className={`border border-gray-200 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                                  selectedPropertyListing?.id === listing.id ? 'border-green-500 bg-green-50' : ''
                                }`}
                                onClick={() => setSelectedPropertyListing(listing)}
                              >
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex-1">
                                    <h3 className="font-semibold text-lg">{listing.property_title}</h3>
                                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                                      <span>{listing.property_type}</span>
                                      <span>•</span>
                                      <span>{listing.city}</span>
                                      <span>•</span>
                                      <span className="font-medium text-green-600">
                                        KSh {listing.price.toLocaleString()}/{listing.price_type === 'rent' ? 'month' : 'sale'}
                                      </span>
                                    </div>
                                  </div>
                                  {getPropertyStatusBadge(listing)}
                                </div>
                                
                                <p className="text-gray-700 text-sm mb-3 line-clamp-2">{listing.description}</p>
                                
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                                    <div className="flex items-center">
                                      <Calendar className="h-4 w-4 mr-1" />
                                      Created {new Date(listing.created_at).toLocaleDateString()}
                                    </div>
                                    {listing.bedrooms && (
                                      <div className="flex items-center">
                                        <Bed className="h-4 w-4 mr-1" />
                                        {listing.bedrooms} bed{listing.bedrooms > 1 ? 's' : ''}
                                      </div>
                                    )}
                                    {listing.bathrooms && (
                                      <div className="flex items-center">
                                        <Bath className="h-4 w-4 mr-1" />
                                        {listing.bathrooms} bath{listing.bathrooms > 1 ? 's' : ''}
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedPropertyListing(listing);
                                      }}
                                    >
                                      <Eye className="h-4 w-4 mr-1" />
                                      View
                                    </Button>
                                    <Link href={`/properties/edit/${listing.id}`}>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <Edit3 className="h-4 w-4 mr-1" />
                                        Edit
                                      </Button>
                                    </Link>
                                    {listing.views_count > 0 && (
                                      <div className="flex items-center text-sm">
                                        <BarChart3 className="h-4 w-4 mr-1 text-blue-500" />
                                        {listing.views_count} views
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Business Services Widget */}
            <BusinessServicesWidget />

            {/* Listing Details or Quick Actions */}
            {(selectedBusinessListing || selectedPropertyListing) ? (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4">Listing Details</h3>
                
                {/* Business Listing Details */}
                {selectedBusinessListing && (
                  <>
                    {selectedBusinessListing.image_url && (
                      <div className="relative h-32 mb-4 rounded-lg overflow-hidden">
                        <Image
                          src={selectedBusinessListing.image_url}
                          alt={selectedBusinessListing.business_name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold">{selectedBusinessListing.business_name}</h4>
                        <p className="text-sm text-gray-600">{selectedBusinessListing.category}</p>
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {selectedBusinessListing.address && `${selectedBusinessListing.address}, `}{selectedBusinessListing.city}
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2" />
                        {selectedBusinessListing.phone}
                      </div>

                      {selectedBusinessListing.email && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="h-4 w-4 mr-2" />
                          {selectedBusinessListing.email}
                        </div>
                      )}

                      {selectedBusinessListing.website && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Globe className="h-4 w-4 mr-2" />
                          <a href={selectedBusinessListing.website} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                            Website
                          </a>
                        </div>
                      )}

                      {selectedBusinessListing.whatsapp_number && (
                        <div className="flex items-center text-sm text-gray-600">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          WhatsApp: {selectedBusinessListing.whatsapp_number}
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      {getBusinessStatusBadge(selectedBusinessListing)}
                      <p className="text-xs text-gray-500 mt-2">
                        Last updated: {new Date(selectedBusinessListing.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </>
                )}

                {/* Property Listing Details */}
                {selectedPropertyListing && (
                  <>
                    {selectedPropertyListing.images && selectedPropertyListing.images.length > 0 && (
                      <div className="relative h-32 mb-4 rounded-lg overflow-hidden">
                        <Image
                          src={selectedPropertyListing.images[0]}
                          alt={selectedPropertyListing.property_title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold">{selectedPropertyListing.property_title}</h4>
                        <p className="text-sm text-gray-600">{selectedPropertyListing.property_type}</p>
                        <p className="text-lg font-bold text-green-600">
                          KSh {selectedPropertyListing.price.toLocaleString()}
                          <span className="text-sm font-normal">/{selectedPropertyListing.price_type === 'rent' ? 'month' : 'sale'}</span>
                        </p>
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {selectedPropertyListing.address}, {selectedPropertyListing.city}
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        {selectedPropertyListing.bedrooms && (
                          <div className="flex items-center">
                            <Bed className="h-4 w-4 mr-1" />
                            {selectedPropertyListing.bedrooms} bed{selectedPropertyListing.bedrooms > 1 ? 's' : ''}
                          </div>
                        )}
                        {selectedPropertyListing.bathrooms && (
                          <div className="flex items-center">
                            <Bath className="h-4 w-4 mr-1" />
                            {selectedPropertyListing.bathrooms} bath{selectedPropertyListing.bathrooms > 1 ? 's' : ''}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2" />
                        {selectedPropertyListing.contact_phone}
                      </div>

                      {selectedPropertyListing.contact_email && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="h-4 w-4 mr-2" />
                          {selectedPropertyListing.contact_email}
                        </div>
                      )}

                      {selectedPropertyListing.whatsapp_number && (
                        <div className="flex items-center text-sm text-gray-600">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          WhatsApp: {selectedPropertyListing.whatsapp_number}
                        </div>
                      )}

                      {selectedPropertyListing.amenities && selectedPropertyListing.amenities.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Amenities:</p>
                          <div className="flex flex-wrap gap-1">
                            {selectedPropertyListing.amenities.slice(0, 3).map((amenity, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {amenity}
                              </Badge>
                            ))}
                            {selectedPropertyListing.amenities.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{selectedPropertyListing.amenities.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      {getPropertyStatusBadge(selectedPropertyListing)}
                      <p className="text-xs text-gray-500 mt-2">
                        Last updated: {new Date(selectedPropertyListing.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link href="/add-listing">
                    <Button variant="outline" className="w-full border-green-600 text-green-600">
                      <Building className="h-4 w-4 mr-2" />
                      Add Business Listing
                    </Button>
                  </Link>
                  <Link href="/properties/add">
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <Home className="h-4 w-4 mr-2" />
                      Add Property Listing
                    </Button>
                  </Link>
                  <Link href="/directory">
                    <Button variant="outline" className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      Browse Directory
                    </Button>
                  </Link>
                  <Link href="/properties">
                    <Button variant="outline" className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      Browse Properties
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}