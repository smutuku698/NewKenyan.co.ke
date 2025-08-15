'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BusinessCard from '@/components/BusinessCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { Search, Filter, Building2 } from 'lucide-react';

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
      
      {/* Hero Section with Search */}
      <section className="relative bg-gray-900 text-white py-20">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-office.jpg"
            alt="Modern Office Interior"
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gray-900/50" />
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Business Directory
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover Kenya&apos;s top businesses, from innovative startups to established companies across all industries
          </p>
          
          {/* Search Form */}
          <div className="max-w-4xl mx-auto bg-white rounded-lg p-6 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search businesses, services, or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-gray-900"
                />
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="mt-4 flex justify-center">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8">
                <Search className="h-4 w-4 mr-2" />
                Search Businesses
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <main className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          {/* Results Header */}
          {!loading && (
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">Kenya Business Directory</h2>
                <p className="text-gray-600">
                  Showing {filteredBusinesses.length} of {businesses.length} {businesses.length === 1 ? 'business' : 'businesses'}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">Sort by: Latest</span>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading businesses...</p>
            </div>
          )}

          {/* No Results */}
          {!loading && filteredBusinesses.length === 0 && (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No businesses found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || selectedCategory
                    ? 'Try adjusting your search or filter criteria.'
                    : 'No approved businesses yet. Check back soon!'}
                </p>
                {(searchTerm || selectedCategory) && (
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('');
                    }}
                    className="border-gray-300 hover:bg-gray-50"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
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
        </div>
      </main>
      
      <Footer />
    </div>
  );
}