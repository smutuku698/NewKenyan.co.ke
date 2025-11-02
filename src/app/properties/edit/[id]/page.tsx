'use client';

// Force dynamic rendering for edit property page
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';
import EditPropertyForm from '@/components/EditPropertyForm';

interface PropertyListing {
  id: string;
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
  is_furnished: boolean;
  pets_allowed: boolean;
  user_id: string;
}

export default function EditPropertyPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useUser();
  const [property, setProperty] = useState<PropertyListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && params.id) {
      fetchProperty();
    }
  }, [user, params.id]);

  const fetchProperty = async () => {
    try {
      const { data, error } = await supabase
        .from('property_listings')
        .select('*')
        .eq('id', params.id)
        .eq('user_id', user?.id) // Ensure user can only edit their own properties
        .single();

      if (error) {
        console.error('Error fetching property:', error);
        setError('Property not found or access denied');
      } else {
        setProperty(data);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to load property');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-2xl mx-auto p-6 text-center py-20">
          <h2 className="text-2xl font-semibold mb-4">Sign In Required</h2>
          <p className="text-gray-600">Please sign in to edit your property listing.</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-2xl mx-auto p-6 text-center py-20">
          <p className="text-gray-600">Loading property...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-2xl mx-auto p-6 text-center py-20">
          <h2 className="text-2xl font-semibold mb-4">Error</h2>
          <p className="text-red-600 mb-4">{error || 'Property not found'}</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="text-green-600 hover:underline"
          >
            Return to Dashboard
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold mb-2">Edit Property Listing</h1>
              <p className="text-gray-600">Update your property information</p>
            </div>
            
            <EditPropertyForm property={property} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}