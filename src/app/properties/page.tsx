'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { Search, Filter, MapPin } from 'lucide-react';

interface Property {
  id: string;
  property_title: string;
  property_type: string;
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  address: string;
  city: string;
  contact_phone: string;
  whatsapp_number?: string;
  amenities: string[];
  images: string[];
  rating: number;
  review_count: number;
  is_featured: boolean;
  created_at: string;
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('property_listings')
        .select('*')
        .eq('is_approved', true)
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching properties:', error);
        setError('Failed to load properties');
      } else {
        setProperties(data || []);
        setFilteredProperties(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    filterProperties();
  }, [searchTerm, filterType, priceRange, properties]);

  const filterProperties = () => {
    let filtered = properties;

    if (searchTerm) {
      filtered = filtered.filter(property =>
        property.property_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(property =>
        property.property_type.toLowerCase() === filterType.toLowerCase()
      );
    }

    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      if (max) {
        filtered = filtered.filter(property => property.price >= min && property.price <= max);
      } else {
        filtered = filtered.filter(property => property.price >= min);
      }
    }

    setFilteredProperties(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="py-8">
          <div className="container mx-auto px-2 sm:px-4 lg:px-6">
            <div className="text-center py-12">
              <p className="text-gray-600">Loading properties...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="py-8">
          <div className="container mx-auto px-2 sm:px-4 lg:px-6">
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section with Search */}
      <section className="relative bg-gray-900 text-white py-20">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-property.jpg"
            alt="Beautiful Home Interior"
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gray-900/50" />
        </div>
        
        <div className="relative container mx-auto px-2 sm:px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 !text-white">
            Find Your Perfect Home
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto !text-white">
            Discover apartments, houses, and commercial properties for sale or rent across Kenya
          </p>
          
          {/* Search Form */}
          <div className="max-w-4xl mx-auto bg-white rounded-lg p-6 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by location, title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-gray-900"
                />
              </div>
              
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="all">All Types</option>
                <option value="for sale">For Sale</option>
                <option value="for rent">For Rent</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="commercial">Commercial</option>
              </select>
              
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="all">Any Price</option>
                <option value="0-50000">Under KSh 50,000</option>
                <option value="50000-100000">KSh 50,000 - 100,000</option>
                <option value="100000-200000">KSh 100,000 - 200,000</option>
                <option value="200000-500000">KSh 200,000 - 500,000</option>
                <option value="500000">KSh 500,000+</option>
              </select>
              
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Search className="h-4 w-4 mr-2" />
                Search Properties
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <main className="py-8">
        <div className="container mx-auto px-2 sm:px-4 lg:px-6">

          {/* Results Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Available Properties</h2>
              <p className="text-gray-600">
                Showing {filteredProperties.length} of {properties.length} {properties.length === 1 ? 'property' : 'properties'}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">Sort by: Latest</span>
            </div>
          </div>

          {/* Properties Grid */}
          {filteredProperties.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProperties.map((property) => (
                <PropertyCard 
                  key={property.id} 
                  id={property.id}
                  title={property.property_title}
                  type={property.property_type}
                  price={property.price}
                  bedrooms={property.bedrooms}
                  bathrooms={property.bathrooms}
                  location={`${property.address}, ${property.city}`}
                  city={property.city}
                  images={property.images || ['/images/sample-property-1.jpg']}
                  amenities={property.amenities || []}
                  contactPhone={property.contact_phone}
                  whatsappNumber={property.whatsapp_number}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No properties found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || filterType !== 'all' || priceRange !== 'all' 
                    ? 'Try adjusting your search criteria or filters.'
                    : 'No properties available at the moment.'}
                </p>
                {(searchTerm || filterType !== 'all' || priceRange !== 'all') && (
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSearchTerm('');
                      setFilterType('all');
                      setPriceRange('all');
                    }}
                    className="border-gray-300 hover:bg-gray-50"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}