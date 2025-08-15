'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  X, 
  Eye, 
  MapPin, 
  Clock, 
  Building,
  Home,
  Bed,
  Calendar,
  BarChart3,
  TrendingUp
} from 'lucide-react';
import Image from 'next/image';

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
  address: string;
  city: string;
  county: string | null;
  contact_phone: string;
  contact_email: string | null;
  whatsapp_number: string | null;
  amenities: string[];
  images: string[];
  is_approved: boolean;
  is_featured: boolean;
  is_furnished: boolean;
  pets_allowed: boolean;
  views_count: number;
  user_id: string;
}

export default function AdminDashboard() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<'business' | 'property'>('business');
  const [businessListings, setBusinessListings] = useState<BusinessListing[]>([]);
  const [propertyListings, setPropertyListings] = useState<PropertyListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBusinessListing, setSelectedBusinessListing] = useState<BusinessListing | null>(null);
  const [selectedPropertyListing, setSelectedPropertyListing] = useState<PropertyListing | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const isAdmin = true; // Allow any signed-in user for testing - change this in production

  useEffect(() => {
    if (isAdmin) {
      fetchAllListings();
    }
  }, [isAdmin]);

  // Auto-refresh every 30 seconds to keep data fresh
  useEffect(() => {
    if (isAdmin) {
      const interval = setInterval(fetchAllListings, 30000);
      return () => clearInterval(interval);
    }
  }, [isAdmin]);

  const fetchAllListings = async () => {
    setLoading(true);
    try {
      console.log('🔄 Fetching all listings...');
      
      // Fetch business listings
      const { data: businessData, error: businessError } = await supabase
        .from('business_listings')
        .select('*')
        .order('created_at', { ascending: false });

      // Fetch property listings  
      const { data: propertyData, error: propertyError } = await supabase
        .from('property_listings')
        .select('*')
        .order('created_at', { ascending: false });

      if (businessError) {
        console.error('Error fetching business listings:', businessError);
      } else {
        console.log('✅ Business listings:', businessData?.length || 0);
        setBusinessListings(businessData || []);
      }

      if (propertyError) {
        console.error('Error fetching property listings:', propertyError);
      } else {
        console.log('✅ Property listings:', propertyData?.length || 0);
        setPropertyListings(propertyData || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBusinessApprove = async (listingId: string) => {
    setActionLoading(listingId);
    try {
      const { error } = await supabase
        .from('business_listings')
        .update({ is_approved: true, is_verified: true })
        .eq('id', listingId);

      if (error) {
        console.error('Error approving business listing:', error);
        alert('Failed to approve business listing');
      } else {
        await fetchAllListings(); // Refresh data
        setSelectedBusinessListing(null);
        alert('Business listing approved successfully!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to approve business listing');
    } finally {
      setActionLoading(null);
    }
  };

  const handlePropertyApprove = async (listingId: string) => {
    setActionLoading(listingId);
    try {
      // Use the API route that includes the automated view boost
      const response = await fetch('/api/admin/approve-property', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ propertyId: listingId, approve: true }),
      });

      const result = await response.json();

      if (result.success) {
        await fetchAllListings(); // Refresh data
        setSelectedPropertyListing(null);
        alert(`Property approved! ${result.message}`);
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to approve property listing');
    } finally {
      setActionLoading(null);
    }
  };

  const handleBusinessReject = async (listingId: string) => {
    if (!confirm('Are you sure you want to delete this business listing? This action cannot be undone.')) {
      return;
    }

    setActionLoading(listingId);
    try {
      const { error } = await supabase
        .from('business_listings')
        .delete()
        .eq('id', listingId);

      if (error) {
        console.error('Error rejecting business listing:', error);
        alert('Failed to reject business listing');
      } else {
        await fetchAllListings(); // Refresh data
        setSelectedBusinessListing(null);
        alert('Business listing rejected and deleted.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to reject business listing');
    } finally {
      setActionLoading(null);
    }
  };

  const handlePropertyReject = async (listingId: string) => {
    if (!confirm('Are you sure you want to delete this property listing? This action cannot be undone.')) {
      return;
    }

    setActionLoading(listingId);
    try {
      const { error } = await supabase
        .from('property_listings')
        .delete()
        .eq('id', listingId);

      if (error) {
        console.error('Error rejecting property listing:', error);
        alert('Failed to reject property listing');
      } else {
        await fetchAllListings(); // Refresh data
        setSelectedPropertyListing(null);
        alert('Property listing rejected and deleted.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to reject property listing');
    } finally {
      setActionLoading(null);
    }
  };

  const runDailyViewIncrement = async () => {
    try {
      const response = await fetch('/api/increment-views', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET || 'your-secret-key'}`,
        },
      });

      const result = await response.json();
      
      if (result.success) {
        alert(`✅ ${result.message}`);
        await fetchAllListings(); // Refresh to see updated view counts
      } else {
        alert(`❌ Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Failed to run daily increment');
    }
  };

  const getStats = () => {
    const businessStats = {
      total: businessListings.length,
      approved: businessListings.filter(l => l.is_approved).length,
      pending: businessListings.filter(l => !l.is_approved).length,
    };

    const propertyStats = {
      total: propertyListings.length,
      approved: propertyListings.filter(l => l.is_approved).length,
      pending: propertyListings.filter(l => !l.is_approved).length,
      totalViews: propertyListings.reduce((sum, l) => sum + l.views_count, 0),
    };

    return { businessStats, propertyStats };
  };

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">Sign In Required</h2>
        <p className="text-gray-600">Please sign in to access the admin dashboard.</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">Access Denied</h2>
        <p className="text-gray-600">Admin access required.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center py-12">
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  const stats = getStats();
  const currentListings = activeTab === 'business' ? businessListings : propertyListings;
  const pendingListings = currentListings.filter(l => !l.is_approved);

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage business and property listings</p>
          </div>
          <div className="flex space-x-3">
            <Button onClick={fetchAllListings} variant="outline" disabled={loading}>
              <BarChart3 className="h-4 w-4 mr-2" />
              {loading ? 'Refreshing...' : 'Refresh Data'}
            </Button>
            <Button onClick={runDailyViewIncrement} className="bg-blue-600 hover:bg-blue-700">
              <TrendingUp className="h-4 w-4 mr-2" />
              Run Daily View Increment
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Business Listings</p>
              <p className="text-2xl font-bold text-gray-900">{stats.businessStats.total}</p>
              <p className="text-xs text-gray-500">{stats.businessStats.pending} pending</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Home className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Property Listings</p>
              <p className="text-2xl font-bold text-gray-900">{stats.propertyStats.total}</p>
              <p className="text-xs text-gray-500">{stats.propertyStats.pending} pending</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Approval</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.businessStats.pending + stats.propertyStats.pending}
              </p>
              <p className="text-xs text-gray-500">Requires action</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Property Views</p>
              <p className="text-2xl font-bold text-gray-900">{stats.propertyStats.totalViews.toLocaleString()}</p>
              <p className="text-xs text-gray-500">Total views</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-sm border">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex space-x-1 p-1">
            <button
              onClick={() => setActiveTab('business')}
              className={`flex-1 py-3 px-4 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'business'
                  ? 'bg-blue-50 text-blue-600 border border-blue-200'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Building className="h-4 w-4 inline mr-2" />
              Business Listings ({businessListings.length})
              {stats.businessStats.pending > 0 && (
                <Badge className="ml-2 bg-yellow-100 text-yellow-800">{stats.businessStats.pending} pending</Badge>
              )}
            </button>
            <button
              onClick={() => setActiveTab('property')}
              className={`flex-1 py-3 px-4 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'property'
                  ? 'bg-green-50 text-green-600 border border-green-200'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Home className="h-4 w-4 inline mr-2" />
              Property Listings ({propertyListings.length})
              {stats.propertyStats.pending > 0 && (
                <Badge className="ml-2 bg-yellow-100 text-yellow-800">{stats.propertyStats.pending} pending</Badge>
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {pendingListings.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">All caught up!</h3>
              <p className="text-gray-500">
                No pending {activeTab === 'business' ? 'business' : 'property'} listings to review.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">
                Pending {activeTab === 'business' ? 'Business' : 'Property'} Listings ({pendingListings.length})
              </h2>
              
              <div className="space-y-4">
                {pendingListings.map((listing) => (
                  <div
                    key={listing.id}
                    className={`border border-gray-200 rounded-lg p-6 transition-all hover:shadow-md ${
                      (activeTab === 'business' && selectedBusinessListing?.id === listing.id) ||
                      (activeTab === 'property' && selectedPropertyListing?.id === listing.id)
                        ? 'border-green-500 bg-green-50'
                        : ''
                    }`}
                    onClick={() => {
                      if (activeTab === 'business') {
                        setSelectedBusinessListing(listing as BusinessListing);
                        setSelectedPropertyListing(null);
                      } else {
                        setSelectedPropertyListing(listing as PropertyListing);
                        setSelectedBusinessListing(null);
                      }
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-lg">
                            {activeTab === 'business' 
                              ? (listing as BusinessListing).business_name 
                              : (listing as PropertyListing).property_title}
                          </h3>
                          <Badge className="bg-yellow-100 text-yellow-800">
                            <Clock className="h-3 w-3 mr-1" />
                            Pending
                          </Badge>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          {activeTab === 'business' ? (
                            <>
                              <span>{(listing as BusinessListing).category}</span>
                              <span>•</span>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {listing.city}
                              </div>
                              <span>•</span>
                              <span>{(listing as BusinessListing).phone}</span>
                            </>
                          ) : (
                            <>
                              <span>{(listing as PropertyListing).property_type}</span>
                              <span>•</span>
                              <span>KSh {(listing as PropertyListing).price.toLocaleString()}</span>
                              <span>•</span>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {listing.city}
                              </div>
                              {(listing as PropertyListing).bedrooms && (
                                <>
                                  <span>•</span>
                                  <div className="flex items-center">
                                    <Bed className="h-4 w-4 mr-1" />
                                    {(listing as PropertyListing).bedrooms} bed{(listing as PropertyListing).bedrooms! > 1 ? 's' : ''}
                                  </div>
                                </>
                              )}
                              {activeTab === 'property' && (
                                <>
                                  <span>•</span>
                                  <div className="flex items-center">
                                    <Eye className="h-4 w-4 mr-1" />
                                    {(listing as PropertyListing).views_count} views
                                  </div>
                                </>
                              )}
                            </>
                          )}
                        </div>

                        <p className="text-gray-700 text-sm mb-3 line-clamp-2">{listing.description}</p>
                        
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          Submitted {new Date(listing.created_at).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="flex space-x-2 ml-4">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (activeTab === 'business') {
                              handleBusinessApprove(listing.id);
                            } else {
                              handlePropertyApprove(listing.id);
                            }
                          }}
                          disabled={actionLoading === listing.id}
                          className="bg-green-600 hover:bg-green-700"
                          size="sm"
                        >
                          {actionLoading === listing.id ? (
                            'Processing...'
                          ) : (
                            <>
                              <CheckCircle className="h-4 w-4 mr-1" />
                              {activeTab === 'business' ? 'Approve' : 'Approve (+100 views)'}
                            </>
                          )}
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (activeTab === 'business') {
                              handleBusinessReject(listing.id);
                            } else {
                              handlePropertyReject(listing.id);
                            }
                          }}
                          disabled={actionLoading === listing.id}
                          variant="outline"
                          className="border-red-300 text-red-600 hover:bg-red-50"
                          size="sm"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Selected Listing Details */}
      {(selectedBusinessListing || selectedPropertyListing) && (
        <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Listing Details</h3>
          
          {selectedBusinessListing && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Business Information</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Name:</strong> {selectedBusinessListing.business_name}</p>
                  <p><strong>Category:</strong> {selectedBusinessListing.category}</p>
                  <p><strong>Address:</strong> {selectedBusinessListing.address}</p>
                  <p><strong>City:</strong> {selectedBusinessListing.city}</p>
                  <p><strong>Phone:</strong> {selectedBusinessListing.phone}</p>
                  {selectedBusinessListing.email && <p><strong>Email:</strong> {selectedBusinessListing.email}</p>}
                  {selectedBusinessListing.website && <p><strong>Website:</strong> {selectedBusinessListing.website}</p>}
                  {selectedBusinessListing.whatsapp_number && <p><strong>WhatsApp:</strong> {selectedBusinessListing.whatsapp_number}</p>}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Additional Details</h4>
                <div className="space-y-2 text-sm">
                  {selectedBusinessListing.business_days && <p><strong>Hours:</strong> {selectedBusinessListing.business_days}</p>}
                  {selectedBusinessListing.pricing_info && <p><strong>Pricing:</strong> {selectedBusinessListing.pricing_info}</p>}
                  <p><strong>Description:</strong> {selectedBusinessListing.description}</p>
                </div>
                {selectedBusinessListing.image_url && (
                  <div className="mt-4">
                    <h5 className="font-medium mb-2">Business Image</h5>
                    <Image
                      src={selectedBusinessListing.image_url}
                      alt={selectedBusinessListing.business_name}
                      width={300}
                      height={200}
                      sizes="300px"
                      className="rounded-lg object-cover border"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {selectedPropertyListing && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Property Information</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Title:</strong> {selectedPropertyListing.property_title}</p>
                  <p><strong>Type:</strong> {selectedPropertyListing.property_type}</p>
                  <p><strong>Price:</strong> KSh {selectedPropertyListing.price.toLocaleString()}/{selectedPropertyListing.price_type}</p>
                  <p><strong>Address:</strong> {selectedPropertyListing.address}</p>
                  <p><strong>City:</strong> {selectedPropertyListing.city}</p>
                  {selectedPropertyListing.county && <p><strong>County:</strong> {selectedPropertyListing.county}</p>}
                  {selectedPropertyListing.bedrooms && <p><strong>Bedrooms:</strong> {selectedPropertyListing.bedrooms}</p>}
                  {selectedPropertyListing.bathrooms && <p><strong>Bathrooms:</strong> {selectedPropertyListing.bathrooms}</p>}
                  <p><strong>Views:</strong> {selectedPropertyListing.views_count.toLocaleString()}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Contact & Features</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Phone:</strong> {selectedPropertyListing.contact_phone}</p>
                  {selectedPropertyListing.contact_email && <p><strong>Email:</strong> {selectedPropertyListing.contact_email}</p>}
                  {selectedPropertyListing.whatsapp_number && <p><strong>WhatsApp:</strong> {selectedPropertyListing.whatsapp_number}</p>}
                  <p><strong>Furnished:</strong> {selectedPropertyListing.is_furnished ? 'Yes' : 'No'}</p>
                  <p><strong>Pets Allowed:</strong> {selectedPropertyListing.pets_allowed ? 'Yes' : 'No'}</p>
                  {selectedPropertyListing.amenities.length > 0 && (
                    <p><strong>Amenities:</strong> {selectedPropertyListing.amenities.join(', ')}</p>
                  )}
                  <p><strong>Description:</strong> {selectedPropertyListing.description}</p>
                </div>
                {selectedPropertyListing.images.length > 0 && (
                  <div className="mt-4">
                    <h5 className="font-medium mb-2">Property Images ({selectedPropertyListing.images.length})</h5>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedPropertyListing.images.slice(0, 4).map((image, index) => (
                        <Image
                          key={index}
                          src={image}
                          alt={`${selectedPropertyListing.property_title} image ${index + 1}`}
                          width={150}
                          height={100}
                          sizes="150px"
                          className="rounded-lg object-cover border"
                        />
                      ))}
                    </div>
                    {selectedPropertyListing.images.length > 4 && (
                      <p className="text-sm text-gray-500 mt-1">
                        +{selectedPropertyListing.images.length - 4} more images
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}