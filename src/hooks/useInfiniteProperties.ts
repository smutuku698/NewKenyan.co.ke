'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

interface Property {
  id: string;
  property_title: string;
  property_type: string;
  price: number;
  price_type: string;
  bedrooms: number | null;
  bathrooms: number | null;
  city: string;
  county: string | null;
  images: string[];
  amenities: string[];
  contact_phone: string;
  whatsapp_number: string | null;
  address: string;
  is_featured: boolean;
}

interface UseInfinitePropertiesProps {
  initialProperties: Property[];
  location?: {
    type: 'county' | 'neighborhood' | 'estate';
    name: string;
    county: string;
    city?: string;
  };
  propertyType?: 'house' | 'apartment';
  transactionType?: 'sale' | 'rent';
  filters?: {
    bedrooms?: number[];
    minPrice?: number;
    maxPrice?: number;
    amenities?: string[];
  };
}

const PAGE_SIZE = 12; // Load 12 properties at a time

export function useInfiniteProperties({
  initialProperties,
  location,
  propertyType,
  transactionType,
  filters
}: UseInfinitePropertiesProps) {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialProperties.length >= PAGE_SIZE);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      // Build query
      let query = supabase
        .from('property_listings')
        .select('*')
        .eq('is_approved', true);

      // Location filtering
      if (location) {
        if (location.type === 'county') {
          // Remove " County" suffix from location name for database matching
          const countyName = location.name.replace(/ County$/i, '');
          query = query.ilike('county', `%${countyName}%`);
        } else if (location.type === 'neighborhood') {
          // Remove " County" suffix from county name for database matching
          const countyName = location.county.replace(/ County$/i, '');
          query = query
            .ilike('county', `%${countyName}%`)
            .or(`city.ilike.%${location.name}%,address.ilike.%${location.name}%`);
        } else if (location.type === 'estate') {
          // Remove " County" suffix from county name for database matching
          const countyName = location.county.replace(/ County$/i, '');
          query = query
            .ilike('county', `%${countyName}%`)
            .ilike('address', `%${location.name}%`);
        }
      }

      // Property type filtering
      if (propertyType === 'house') {
        query = query.ilike('property_type', '%house%');
      } else if (propertyType === 'apartment') {
        query = query.ilike('property_type', '%apartment%');
      }

      // Transaction type filtering
      if (transactionType === 'sale') {
        query = query.eq('price_type', 'sale');
      } else if (transactionType === 'rent') {
        query = query.eq('price_type', 'rent');
      }

      // User filters
      if (filters?.bedrooms && filters.bedrooms.length > 0) {
        query = query.in('bedrooms', filters.bedrooms);
      }

      if (filters?.minPrice) {
        query = query.gte('price', filters.minPrice);
      }

      if (filters?.maxPrice) {
        query = query.lte('price', filters.maxPrice);
      }

      // Pagination
      const start = page * PAGE_SIZE;
      const end = start + PAGE_SIZE - 1;

      query = query
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false })
        .range(start, end);

      const { data, error } = await query;

      if (error) throw error;

      if (data && data.length > 0) {
        setProperties(prev => [...prev, ...data]);
        setPage(prev => prev + 1);
        setHasMore(data.length === PAGE_SIZE);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading properties:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore, location, propertyType, transactionType, filters]);

  // Reset when filters change
  useEffect(() => {
    setProperties(initialProperties);
    setPage(1);
    setHasMore(initialProperties.length >= PAGE_SIZE);
  }, [initialProperties, filters]);

  return {
    properties,
    loading,
    hasMore,
    loadMore
  };
}
