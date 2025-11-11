'use client';

import { useState, useEffect } from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { Search, Filter, MapPin, Home } from 'lucide-react';

interface Property {
  id: string;
  property_title: string;
  property_type: string;
  price: number;
  price_type: string;
  bedrooms?: number;
  bathrooms?: number;
  address: string;
  city: string;
  county?: string;
  contact_phone: string;
  whatsapp_number?: string;
  amenities: string[];
  images: string[];
  rating: number;
  review_count: number;
  is_featured: boolean;
  created_at: string;
}

export default function RentPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [bedroomFilter, setBedroomFilter] = useState('all');

  useEffect(() => {
    fetchRentProperties();
  }, []);

  const fetchRentProperties = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('property_listings')
        .select('*')
        .eq('is_approved', true)
        .eq('price_type', 'rent')
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;

      setProperties(data || []);
      setFilteredProperties(data || []);
    } catch (err) {
      console.error('Error fetching rent properties:', err);
      setError('Failed to load properties. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = properties;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (property) =>
          property.property_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Property type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(
        (property) => property.property_type.toLowerCase() === filterType.toLowerCase()
      );
    }

    // Price range filter
    if (priceRange !== 'all') {
      filtered = filtered.filter((property) => {
        const price = property.price;
        switch (priceRange) {
          case 'under-20k':
            return price < 20000;
          case '20k-50k':
            return price >= 20000 && price < 50000;
          case '50k-100k':
            return price >= 50000 && price < 100000;
          case '100k-200k':
            return price >= 100000 && price < 200000;
          case 'over-200k':
            return price >= 200000;
          default:
            return true;
        }
      });
    }

    // Bedroom filter
    if (bedroomFilter !== 'all') {
      filtered = filtered.filter((property) => {
        const bedrooms = property.bedrooms || 0;
        switch (bedroomFilter) {
          case 'studio':
            return bedrooms === 0 || bedrooms === 1;
          case '2':
            return bedrooms === 2;
          case '3':
            return bedrooms === 3;
          case '4+':
            return bedrooms >= 4;
          default:
            return true;
        }
      });
    }

    setFilteredProperties(filtered);
  }, [searchTerm, filterType, priceRange, bedroomFilter, properties]);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full mx-auto mb-4">
              <Home className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Houses for Rent in Kenya
            </h1>
            <p className="text-lg sm:text-xl text-green-100 mb-8">
              Find affordable houses, apartments, and properties for rent across Kenya. Browse thousands of listings in Nairobi, Mombasa, Kisumu, and other major cities.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by location, property type, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-6 text-lg w-full rounded-lg border-0 text-gray-900"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-gray-50 border-b py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            {/* Property Type Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Property Types</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="studio">Studio</option>
              <option value="villa">Villa</option>
              <option value="townhouse">Townhouse</option>
            </select>

            {/* Bedroom Filter */}
            <select
              value={bedroomFilter}
              onChange={(e) => setBedroomFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">Any Bedrooms</option>
              <option value="studio">Studio/1 Bed</option>
              <option value="2">2 Bedrooms</option>
              <option value="3">3 Bedrooms</option>
              <option value="4+">4+ Bedrooms</option>
            </select>

            {/* Price Range Filter */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Prices</option>
              <option value="under-20k">Under KES 20,000</option>
              <option value="20k-50k">KES 20,000 - 50,000</option>
              <option value="50k-100k">KES 50,000 - 100,000</option>
              <option value="100k-200k">KES 100,000 - 200,000</option>
              <option value="over-200k">Over KES 200,000</option>
            </select>

            {/* Reset Filters */}
            {(searchTerm || filterType !== 'all' || priceRange !== 'all' || bedroomFilter !== 'all') && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setFilterType('all');
                  setPriceRange('all');
                  setBedroomFilter('all');
                }}
                className="border-gray-300"
              >
                Reset Filters
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Results Count */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {loading ? 'Loading...' : `${filteredProperties.length} Properties for Rent`}
            </h2>
            <p className="text-gray-600">
              Find your ideal rental property in Kenya
            </p>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-lg h-96 animate-pulse"></div>
              ))}
            </div>
          )}

          {/* Properties Grid */}
          {!loading && !error && (
            <>
              {filteredProperties.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      id={property.id}
                      title={property.property_title}
                      type={property.property_type}
                      price={property.price}
                      priceType={property.price_type}
                      bedrooms={property.bedrooms}
                      bathrooms={property.bathrooms}
                      location={`${property.city}${property.county ? `, ${property.county}` : ''}`}
                      city={property.city}
                      images={property.images}
                      amenities={property.amenities}
                      contactPhone={property.contact_phone}
                      whatsappNumber={property.whatsapp_number}
                      createdAt={property.created_at}
                      isFeatured={property.is_featured}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4">
                    <Home className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your filters or search criteria
                  </p>
                  <Button
                    onClick={() => {
                      setSearchTerm('');
                      setFilterType('all');
                      setPriceRange('all');
                      setBedroomFilter('all');
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Popular Cities for Rent */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Popular Cities for Rental Properties
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'Nairobi', count: '500+' },
              { name: 'Mombasa', count: '200+' },
              { name: 'Kisumu', count: '100+' },
              { name: 'Nakuru', count: '80+' },
              { name: 'Eldoret', count: '60+' },
              { name: 'Thika', count: '50+' },
            ].map((city) => (
              <div
                key={city.name}
                className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSearchTerm(city.name)}
              >
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-3">
                  <MapPin className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{city.name}</h3>
                <p className="text-sm text-gray-600">{city.count} rentals</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
