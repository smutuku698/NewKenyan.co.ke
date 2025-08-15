'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { supabase } from '@/lib/supabase';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
      
      <main className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Find Your Perfect Home</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover apartments, houses, and commercial properties across Kenya
            </p>
          </div>

          {/* Properties Count */}
          <div className="mb-8">
            <p className="text-gray-600">
              Showing {properties.length} {properties.length === 1 ? 'property' : 'properties'}
            </p>
          </div>

          {/* Properties Grid */}
          {properties.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {properties.map((property) => (
                <PropertyCard 
                  key={property.id} 
                  id={property.id}
                  title={property.property_title}
                  type={property.property_type}
                  price={property.price}
                  bedrooms={property.bedrooms}
                  bathrooms={property.bathrooms}
                  location={`${property.address}, ${property.city}`}
                  images={property.images || ['/images/sample-property-1.jpg']}
                  amenities={property.amenities || []}
                  contactPhone={property.contact_phone}
                  whatsappNumber={property.whatsapp_number}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No properties available at the moment.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}