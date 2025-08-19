'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Heart, ArrowLeft, Home } from 'lucide-react';
import { supabase } from '@/lib/supabase';

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

export default function FavoritesPage() {
  const [favoriteProperties, setFavoriteProperties] = useState<PropertyListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const getFavorites = (): string[] => {
    if (typeof window === 'undefined') return [];
    const favorites = localStorage.getItem('propertyFavorites');
    return favorites ? JSON.parse(favorites) : [];
  };

  const removeFromFavorites = (propertyId: string) => {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(id => id !== propertyId);
    localStorage.setItem('propertyFavorites', JSON.stringify(updatedFavorites));
    setFavoriteIds(updatedFavorites);
    setFavoriteProperties(prev => prev.filter(property => property.id !== propertyId));
  };

  useEffect(() => {
    const loadFavoriteProperties = async () => {
      setIsLoading(true);
      const favoriteIds = getFavorites();
      setFavoriteIds(favoriteIds);

      if (favoriteIds.length === 0) {
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('property_listings')
          .select('*')
          .in('id', favoriteIds)
          .eq('is_approved', true);

        if (error) {
          console.error('Error fetching favorite properties:', error);
        } else {
          setFavoriteProperties(data || []);
        }
      } catch (error) {
        console.error('Error fetching favorite properties:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavoriteProperties();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Link 
                href="/properties" 
                className="inline-flex items-center text-green-600 hover:text-green-700 mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Properties
              </Link>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Heart className="h-8 w-8 mr-3 text-red-500 fill-current" />
                My Favorite Properties
              </h1>
              <p className="text-gray-600 mt-2">
                {favoriteProperties.length} propert{favoriteProperties.length === 1 ? 'y' : 'ies'} saved
              </p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && favoriteProperties.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                No Favorite Properties Yet
              </h2>
              <p className="text-gray-600 mb-8">
                Start browsing properties and click the heart icon to save them here for easy access later.
              </p>
              <Button asChild>
                <Link href="/properties">
                  <Home className="h-4 w-4 mr-2" />
                  Browse Properties
                </Link>
              </Button>
            </div>
          </div>
        )}

        {/* Properties Grid */}
        {!isLoading && favoriteProperties.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {favoriteProperties.map((property) => (
              <div key={property.id} className="relative">
                <PropertyCard 
                  id={property.id}
                  title={property.property_title}
                  type={property.property_type}
                  price={property.price}
                  bedrooms={property.bedrooms || undefined}
                  bathrooms={property.bathrooms || undefined}
                  location={`${property.city}${property.county ? `, ${property.county}` : ''}`}
                  images={property.images}
                  amenities={property.amenities}
                  contactPhone={property.contact_phone}
                  whatsappNumber={property.whatsapp_number || undefined}
                />
                
                {/* Remove from Favorites Button */}
                <button
                  onClick={() => removeFromFavorites(property.id)}
                  className="absolute top-2 right-2 bg-white bg-opacity-90 hover:bg-opacity-100 text-red-500 p-2 rounded-full shadow-md transition-all duration-200 hover:scale-110"
                  title="Remove from favorites"
                >
                  <Heart className="h-4 w-4 fill-current" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tips Section */}
        {!isLoading && favoriteProperties.length > 0 && (
          <div className="mt-16 bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">💡 Tips for Your Favorite Properties</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Your favorites are saved locally in your browser</li>
              <li>• Contact property owners quickly using the call or WhatsApp buttons</li>
              <li>• Click on any property to view full details and image gallery</li>
              <li>• Share interesting properties with friends using the share button</li>
            </ul>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}