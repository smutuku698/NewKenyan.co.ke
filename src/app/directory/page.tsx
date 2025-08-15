'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BusinessCard from '@/components/BusinessCard';
import { supabase } from '@/lib/supabase';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface BusinessListing {
  id: string;
  business_name: string;
  category: string;
  description: string;
  address: string;
  city: string;
  phone: string;
  whatsapp_number: string | null;
  image_url: string | null;
  rating: number;
  review_count: number;
  is_verified: boolean;
  created_at: string;
}

export default function DirectoryPage() {
  const [businesses, setBusinesses] = useState<BusinessListing[]>([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState<BusinessListing[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  const categories = Array.from(new Set(businesses.map(b => b.category))).sort();

  useEffect(() => {
    fetchBusinesses();
  }, []);

  useEffect(() => {
    let filtered = businesses;

    if (searchTerm) {
      filtered = filtered.filter(business =>
        business.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(business => business.category === selectedCategory);
    }

    setFilteredBusinesses(filtered);
  }, [businesses, searchTerm, selectedCategory]);

  const fetchBusinesses = async () => {
    try {
      const { data, error } = await supabase
        .from('business_listings')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching businesses:', error);
      } else {
        setBusinesses(data || []);
        setFilteredBusinesses(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Business Directory</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover Kenya&apos;s top businesses, from local startups to established companies
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search businesses, services, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 min-w-[200px]"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading businesses...</p>
            </div>
          )}

          {/* No Results */}
          {!loading && filteredBusinesses.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-600 mb-2">No businesses found</h3>
              <p className="text-gray-500">
                {searchTerm || selectedCategory
                  ? 'Try adjusting your search or filter criteria.'
                  : 'No approved businesses yet. Check back soon!'}
              </p>
            </div>
          )}

          {/* Business Grid */}
          {!loading && filteredBusinesses.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredBusinesses.map((business) => {
                const isNew = new Date(business.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                
                return (
                  <BusinessCard
                    key={business.id}
                    id={business.id}
                    name={business.business_name}
                    category={business.category}
                    rating={business.rating}
                    reviewCount={business.review_count}
                    location={`${business.city}`}
                    imageUrl={business.image_url || '/images/sample-business-1.jpg'}
                    isVerified={business.is_verified}
                    isNew={isNew}
                    phoneNumber={business.phone}
                    whatsappNumber={business.whatsapp_number || undefined}
                    description={business.description}
                  />
                );
              })}
            </div>
          )}

          {/* Results Count */}
          {!loading && filteredBusinesses.length > 0 && (
            <div className="text-center mt-8 text-gray-600">
              Showing {filteredBusinesses.length} of {businesses.length} businesses
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}