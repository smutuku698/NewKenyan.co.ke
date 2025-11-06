'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { GridLoadingSkeleton } from '@/components/LoadingSkeleton';
import WhatsAppButton from '@/components/WhatsAppButton';
import { supabase } from '@/lib/supabase';
import { Home, MapPin } from 'lucide-react';

interface PropertyListing {
  id: string;
  property_title: string;
  property_type: string;
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
  is_approved: boolean;
  is_featured: boolean;
  created_at: string;
}

export default function HousesForRentNairobiClient() {
  const [properties, setProperties] = useState<PropertyListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('property_listings')
        .select('*')
        .eq('is_approved', true)
        .eq('property_type', 'House')
        .eq('price_type', 'rent')
        .ilike('city', '%nairobi%')
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-12 border-b border-green-100">
        <div className="container mx-auto px-3">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center justify-center w-16 h-16 bg-green-600 rounded-lg">
                <Home className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Houses for Rent in Nairobi
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Find your perfect rental house in Nairobi. Browse 500+ verified listings with 2-6 bedrooms starting from KES 15,000/month in Westlands, Kilimani, Karen, Lavington and more.
            </p>
            <div className="flex flex-wrap gap-3 justify-center text-sm">
              <span className="bg-white px-4 py-2 rounded-full border border-gray-200">
                500+ Listings
              </span>
              <span className="bg-white px-4 py-2 rounded-full border border-gray-200">
                Verified Properties
              </span>
              <span className="bg-white px-4 py-2 rounded-full border border-gray-200">
                All Nairobi Areas
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-3">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-600">
              Showing <strong>{properties.length}</strong> houses for rent in Nairobi
            </p>
            <Button variant="outline" asChild>
              <Link href="/properties">View All Properties</Link>
            </Button>
          </div>

          {loading ? (
            <GridLoadingSkeleton type="property" count={12} />
          ) : properties.length > 0 ? (
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  id={property.id}
                  title={property.property_title}
                  type={property.property_type}
                  price={property.price}
                  bedrooms={property.bedrooms || undefined}
                  bathrooms={property.bathrooms || undefined}
                  squareFeet={property.square_feet || undefined}
                  location={property.city + (property.county ? ', ' + property.county : '')}
                  city={property.city}
                  images={property.images}
                  amenities={property.amenities}
                  contactPhone={property.contact_phone}
                  whatsappNumber={property.whatsapp_number || undefined}
                  createdAt={property.created_at}
                  isFeatured={property.is_featured}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Home className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No houses found</h3>
              <p className="text-gray-600 mb-6">
                Check back soon for new listings
              </p>
              <Button asChild>
                <Link href="/properties">Browse All Properties</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Popular Neighborhoods */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-3">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Houses for Rent by Neighborhood in Nairobi
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              'Westlands', 'Kilimani', 'Karen', 'Lavington',
              'Kileleshwa', 'Parklands', 'Runda', 'Spring Valley'
            ].map((neighborhood) => (
              <Link
                key={neighborhood}
                href={'/houses-for-rent/nairobi-county?city=' + neighborhood}
                className="bg-green-50 border border-green-200 rounded-lg p-4 hover:bg-green-100 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="h-4 w-4 text-green-600" />
                  <span className="font-semibold text-gray-900">{neighborhood}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-br from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-3 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Looking for More Options?
          </h2>
          <p className="text-lg mb-6 text-green-50">
            Browse all properties or list your own house for rent in Nairobi
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-green-600 hover:bg-gray-100" asChild>
              <Link href="/properties">Browse All Properties</Link>
            </Button>
            <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-green-600" asChild>
              <Link href="/add-listing">List Your Property</Link>
            </Button>
          </div>
        </div>
      </section>

      <WhatsAppButton />
      <Footer />
    </div>
  );
}
