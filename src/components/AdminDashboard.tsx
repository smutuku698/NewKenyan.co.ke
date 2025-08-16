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
  TrendingUp,
  Briefcase,
  CreditCard,
  DollarSign
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

interface JobListing {
  id: string;
  created_at: string;
  job_title: string;
  nature_of_job: string;
  industry: string;
  salary: string;
  job_location: string;
  duties_and_responsibilities: string;
  key_requirements_skills_qualification: string;
  how_to_apply: string;
  company_name: string;
  contact_email: string;
  contact_phone: string | null;
  payment_reference: string | null;
  payment_amount: string;
  payment_status: string;
  payment_verified: boolean;
  status: string;
  featured: boolean;
  slug: string;
  approved_at: string | null;
  expires_at: string;
  admin_notes: string | null;
}

export default function AdminDashboard() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<'business' | 'property' | 'jobs'>('business');
  const [businessListings, setBusinessListings] = useState<BusinessListing[]>([]);
  const [propertyListings, setPropertyListings] = useState<PropertyListing[]>([]);
  const [jobListings, setJobListings] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBusinessListing, setSelectedBusinessListing] = useState<BusinessListing | null>(null);
  const [selectedPropertyListing, setSelectedPropertyListing] = useState<PropertyListing | null>(null);
  const [selectedJobListing, setSelectedJobListing] = useState<JobListing | null>(null);
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

      // Fetch job listings
      const { data: jobData, error: jobError } = await supabase
        .from('jobs')
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

      if (jobError) {
        console.error('Error fetching job listings:', jobError);
      } else {
        console.log('✅ Job listings:', jobData?.length || 0);
        setJobListings(jobData || []);
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

  const handleJobApprove = async (listingId: string) => {
    setActionLoading(listingId);
    try {
      const response = await fetch(`/api/jobs/${listingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'approved' }),
      });

      const result = await response.json();

      if (result.success) {
        await fetchAllListings(); // Refresh data
        setSelectedJobListing(null);
        alert('Job listing approved successfully!');
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to approve job listing');
    } finally {
      setActionLoading(null);
    }
  };

  const handleJobReject = async (listingId: string) => {
    if (!confirm('Are you sure you want to reject this job listing? This action cannot be undone.')) {
      return;
    }

    setActionLoading(listingId);
    try {
      const response = await fetch(`/api/jobs/${listingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'rejected' }),
      });

      const result = await response.json();

      if (result.success) {
        await fetchAllListings(); // Refresh data
        setSelectedJobListing(null);
        alert('Job listing rejected.');
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to reject job listing');
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

    const jobStats = {
      total: jobListings.length,
      approved: jobListings.filter(l => l.status === 'approved').length,
      pending: jobListings.filter(l => l.status === 'pending').length,
      paid: jobListings.filter(l => l.payment_verified).length,
      totalRevenue: jobListings.filter(l => l.payment_verified).length * 300, // KES 300 per job
    };

    return { businessStats, propertyStats, jobStats };
  };

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto p-4 sm:p-6 text-center">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Sign In Required</h2>
        <p className="text-gray-600 text-sm sm:text-base">Please sign in to access the admin dashboard.</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="max-w-2xl mx-auto p-4 sm:p-6 text-center">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Access Denied</h2>
        <p className="text-gray-600 text-sm sm:text-base">Admin access required.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  const stats = getStats();
  const pendingListings = activeTab === 'jobs' 
    ? jobListings.filter(l => l.status === 'pending')
    : activeTab === 'business' 
      ? businessListings.filter(l => !l.is_approved)
      : propertyListings.filter(l => !l.is_approved);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600 text-sm sm:text-base">Manage business and property listings</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button onClick={fetchAllListings} variant="outline" disabled={loading} className="w-full sm:w-auto">
              <BarChart3 className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{loading ? 'Refreshing...' : 'Refresh Data'}</span>
              <span className="sm:hidden">{loading ? 'Refreshing...' : 'Refresh'}</span>
            </Button>
            <Button onClick={runDailyViewIncrement} className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
              <TrendingUp className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Run Daily View Increment</span>
              <span className="sm:hidden">Daily Increment</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Business Listings</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.businessStats.total}</p>
              <p className="text-xs text-gray-500">{stats.businessStats.pending} pending</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Home className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Property Listings</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.propertyStats.total}</p>
              <p className="text-xs text-gray-500">{stats.propertyStats.pending} pending</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Job Listings</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.jobStats.total}</p>
              <p className="text-xs text-gray-500">{stats.jobStats.pending} pending</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Total Pending</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {stats.businessStats.pending + stats.propertyStats.pending + stats.jobStats.pending}
              </p>
              <p className="text-xs text-gray-500">Requires action</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border sm:col-span-2 lg:col-span-1">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Job Revenue</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">KES {stats.jobStats.totalRevenue.toLocaleString()}</p>
              <p className="text-xs text-gray-500">{stats.jobStats.paid} paid jobs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-sm border">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-1 p-1">
            <button
              onClick={() => setActiveTab('business')}
              className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-medium rounded-md transition-colors ${
                activeTab === 'business'
                  ? 'bg-blue-50 text-blue-600 border border-blue-200'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Building className="h-4 w-4 inline mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Business Listings ({businessListings.length})</span>
              <span className="sm:hidden">Business ({businessListings.length})</span>
              {stats.businessStats.pending > 0 && (
                <Badge className="ml-1 sm:ml-2 bg-yellow-100 text-yellow-800 text-xs">{stats.businessStats.pending}</Badge>
              )}
            </button>
            <button
              onClick={() => setActiveTab('property')}
              className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-medium rounded-md transition-colors ${
                activeTab === 'property'
                  ? 'bg-green-50 text-green-600 border border-green-200'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Home className="h-4 w-4 inline mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Property Listings ({propertyListings.length})</span>
              <span className="sm:hidden">Property ({propertyListings.length})</span>
              {stats.propertyStats.pending > 0 && (
                <Badge className="ml-1 sm:ml-2 bg-yellow-100 text-yellow-800 text-xs">{stats.propertyStats.pending}</Badge>
              )}
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-medium rounded-md transition-colors ${
                activeTab === 'jobs'
                  ? 'bg-orange-50 text-orange-600 border border-orange-200'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Briefcase className="h-4 w-4 inline mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Job Listings ({jobListings.length})</span>
              <span className="sm:hidden">Jobs ({jobListings.length})</span>
              {stats.jobStats.pending > 0 && (
                <Badge className="ml-1 sm:ml-2 bg-yellow-100 text-yellow-800 text-xs">{stats.jobStats.pending}</Badge>
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
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
              <h2 className="text-base sm:text-lg font-semibold">
                Pending {activeTab === 'business' ? 'Business' : activeTab === 'property' ? 'Property' : 'Job'} Listings ({pendingListings.length})
              </h2>
              
              <div className="space-y-4">
                {pendingListings.map((listing) => (
                  <div
                    key={listing.id}
                    className={`border border-gray-200 rounded-lg p-4 sm:p-6 transition-all hover:shadow-md ${
                      (activeTab === 'business' && selectedBusinessListing?.id === listing.id) ||
                      (activeTab === 'property' && selectedPropertyListing?.id === listing.id) ||
                      (activeTab === 'jobs' && selectedJobListing?.id === listing.id)
                        ? 'border-green-500 bg-green-50'
                        : ''
                    }`}
                    onClick={() => {
                      if (activeTab === 'business') {
                        setSelectedBusinessListing(listing as BusinessListing);
                        setSelectedPropertyListing(null);
                        setSelectedJobListing(null);
                      } else if (activeTab === 'property') {
                        setSelectedPropertyListing(listing as PropertyListing);
                        setSelectedBusinessListing(null);
                        setSelectedJobListing(null);
                      } else {
                        setSelectedJobListing(listing as JobListing);
                        setSelectedBusinessListing(null);
                        setSelectedPropertyListing(null);
                      }
                    }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                          <h3 className="font-semibold text-base sm:text-lg truncate">
                            {activeTab === 'business' 
                              ? (listing as BusinessListing).business_name 
                              : activeTab === 'property'
                              ? (listing as PropertyListing).property_title
                              : (listing as JobListing).job_title}
                          </h3>
                          <Badge className="bg-yellow-100 text-yellow-800 self-start">
                            <Clock className="h-3 w-3 mr-1" />
                            Pending
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-2">
                          {activeTab === 'business' ? (
                            <>
                              <span className="truncate">{(listing as BusinessListing).category}</span>
                              <span className="hidden sm:inline">•</span>
                              <div className="flex items-center">
                                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                <span className="truncate">{(listing as BusinessListing).city}</span>
                              </div>
                              <span className="hidden sm:inline">•</span>
                              <span className="truncate">{(listing as BusinessListing).phone}</span>
                            </>
                          ) : activeTab === 'property' ? (
                            <>
                              <span className="truncate">{(listing as PropertyListing).property_type}</span>
                              <span className="hidden sm:inline">•</span>
                              <span>KSh {(listing as PropertyListing).price.toLocaleString()}</span>
                              <span className="hidden sm:inline">•</span>
                              <div className="flex items-center">
                                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                <span className="truncate">{(listing as PropertyListing).city}</span>
                              </div>
                              {(listing as PropertyListing).bedrooms && (
                                <>
                                  <span className="hidden sm:inline">•</span>
                                  <div className="flex items-center">
                                    <Bed className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                    {(listing as PropertyListing).bedrooms} bed{(listing as PropertyListing).bedrooms! > 1 ? 's' : ''}
                                  </div>
                                </>
                              )}
                              <div className="flex items-center">
                                <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                {(listing as PropertyListing).views_count} views
                              </div>
                            </>
                          ) : (
                            <>
                              <span className="truncate">{(listing as JobListing).nature_of_job}</span>
                              <span className="hidden sm:inline">•</span>
                              <span className="truncate">{(listing as JobListing).salary}</span>
                              <span className="hidden sm:inline">•</span>
                              <div className="flex items-center">
                                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                <span className="truncate">{(listing as JobListing).job_location}</span>
                              </div>
                              {(listing as JobListing).payment_verified && (
                                <div className="flex items-center text-green-600">
                                  <CreditCard className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                  Paid
                                </div>
                              )}
                            </>
                          )}
                        </div>

                        <p className="text-gray-700 text-xs sm:text-sm mb-3 line-clamp-2">
                          {activeTab === 'jobs' 
                            ? (listing as JobListing).duties_and_responsibilities
                            : activeTab === 'business'
                              ? (listing as BusinessListing).description
                              : (listing as PropertyListing).description}
                        </p>
                        
                        <div className="flex items-center text-xs sm:text-sm text-gray-500">
                          <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          Submitted {new Date(listing.created_at).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2 sm:ml-4 w-full sm:w-auto">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (activeTab === 'business') {
                              handleBusinessApprove(listing.id);
                            } else if (activeTab === 'property') {
                              handlePropertyApprove(listing.id);
                            } else {
                              handleJobApprove(listing.id);
                            }
                          }}
                          disabled={actionLoading === listing.id}
                          className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
                          size="sm"
                        >
                          {actionLoading === listing.id ? (
                            'Processing...'
                          ) : (
                            <>
                              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                              <span className="hidden sm:inline">
                                {activeTab === 'business' ? 'Approve' : activeTab === 'property' ? 'Approve (+100 views)' : 'Approve'}
                              </span>
                              <span className="sm:hidden">Approve</span>
                            </>
                          )}
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (activeTab === 'business') {
                              handleBusinessReject(listing.id);
                            } else if (activeTab === 'property') {
                              handlePropertyReject(listing.id);
                            } else {
                              handleJobReject(listing.id);
                            }
                          }}
                          disabled={actionLoading === listing.id}
                          variant="outline"
                          className="border-red-300 text-red-600 hover:bg-red-50 w-full sm:w-auto"
                          size="sm"
                        >
                          <X className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
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
      {(selectedBusinessListing || selectedPropertyListing || selectedJobListing) && (
        <div className="mt-6 sm:mt-8 bg-white rounded-lg shadow-sm border p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-4">Listing Details</h3>
          
          {selectedBusinessListing && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h4 className="font-medium mb-2 text-sm sm:text-base">Business Information</h4>
                <div className="space-y-2 text-xs sm:text-sm">
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
                <h4 className="font-medium mb-2 text-sm sm:text-base">Additional Details</h4>
                <div className="space-y-2 text-xs sm:text-sm">
                  {selectedBusinessListing.business_days && <p><strong>Hours:</strong> {selectedBusinessListing.business_days}</p>}
                  {selectedBusinessListing.pricing_info && <p><strong>Pricing:</strong> {selectedBusinessListing.pricing_info}</p>}
                  <p><strong>Description:</strong> {selectedBusinessListing.description}</p>
                </div>
                {selectedBusinessListing.image_url && (
                  <div className="mt-4">
                    <h5 className="font-medium mb-2 text-sm sm:text-base">Business Image</h5>
                    <Image
                      src={selectedBusinessListing.image_url}
                      alt={selectedBusinessListing.business_name}
                      width={300}
                      height={200}
                      sizes="(max-width: 640px) 100vw, 300px"
                      className="rounded-lg object-cover border w-full max-w-sm"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {selectedPropertyListing && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h4 className="font-medium mb-2 text-sm sm:text-base">Property Information</h4>
                <div className="space-y-2 text-xs sm:text-sm">
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
                <h4 className="font-medium mb-2 text-sm sm:text-base">Contact & Features</h4>
                <div className="space-y-2 text-xs sm:text-sm">
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
                    <h5 className="font-medium mb-2 text-sm sm:text-base">Property Images ({selectedPropertyListing.images.length})</h5>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
                      {selectedPropertyListing.images.slice(0, 6).map((image, index) => (
                        <Image
                          key={index}
                          src={image}
                          alt={`${selectedPropertyListing.property_title} image ${index + 1}`}
                          width={150}
                          height={100}
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 150px"
                          className="rounded-lg object-cover border w-full aspect-video"
                        />
                      ))}
                    </div>
                    {selectedPropertyListing.images.length > 6 && (
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        +{selectedPropertyListing.images.length - 6} more images
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {selectedJobListing && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h4 className="font-medium mb-2 text-sm sm:text-base">Job Information</h4>
                <div className="space-y-2 text-xs sm:text-sm">
                  <p><strong>Title:</strong> {selectedJobListing.job_title}</p>
                  <p><strong>Company:</strong> {selectedJobListing.company_name}</p>
                  <p><strong>Nature:</strong> {selectedJobListing.nature_of_job}</p>
                  <p><strong>Industry:</strong> {selectedJobListing.industry}</p>
                  <p><strong>Location:</strong> {selectedJobListing.job_location}</p>
                  <p><strong>Salary:</strong> {selectedJobListing.salary}</p>
                  <p><strong>Status:</strong> {selectedJobListing.status}</p>
                  <p><strong>Payment Status:</strong> {selectedJobListing.payment_verified ? 'Verified' : 'Pending'}</p>
                  {selectedJobListing.payment_amount && (
                    <p><strong>Payment Amount:</strong> KES {selectedJobListing.payment_amount}</p>
                  )}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2 text-sm sm:text-base">Contact & Details</h4>
                <div className="space-y-2 text-xs sm:text-sm">
                  <p><strong>Email:</strong> {selectedJobListing.contact_email}</p>
                  {selectedJobListing.contact_phone && (
                    <p><strong>Phone:</strong> {selectedJobListing.contact_phone}</p>
                  )}
                  <p><strong>Featured:</strong> {selectedJobListing.featured ? 'Yes' : 'No'}</p>
                  {selectedJobListing.expires_at && (
                    <p><strong>Expires:</strong> {new Date(selectedJobListing.expires_at).toLocaleDateString()}</p>
                  )}
                  {selectedJobListing.approved_at && (
                    <p><strong>Approved:</strong> {new Date(selectedJobListing.approved_at).toLocaleDateString()}</p>
                  )}
                  {selectedJobListing.payment_reference && (
                    <p><strong>Payment Ref:</strong> {selectedJobListing.payment_reference}</p>
                  )}
                </div>
                <div className="mt-4">
                  <h5 className="font-medium mb-2 text-sm sm:text-base">Job Description</h5>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div>
                      <strong>Duties & Responsibilities:</strong>
                      <p className="mt-1 whitespace-pre-wrap">{selectedJobListing.duties_and_responsibilities}</p>
                    </div>
                    <div>
                      <strong>Requirements & Skills:</strong>
                      <p className="mt-1 whitespace-pre-wrap">{selectedJobListing.key_requirements_skills_qualification}</p>
                    </div>
                    <div>
                      <strong>How to Apply:</strong>
                      <p className="mt-1 whitespace-pre-wrap">{selectedJobListing.how_to_apply}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}