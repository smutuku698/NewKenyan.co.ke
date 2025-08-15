import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      business_listings: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          business_name: string
          category: string
          description: string
          address: string
          city: string
          pin_location_url: string | null
          phone: string
          email: string | null
          website: string | null
          business_days: string | null
          pricing_info: string | null
          image_url: string | null
          rating: number
          review_count: number
          is_approved: boolean
          is_verified: boolean
          whatsapp_number: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          business_name: string
          category: string
          description: string
          address: string
          city: string
          pin_location_url?: string | null
          phone: string
          email?: string | null
          website?: string | null
          business_days?: string | null
          pricing_info?: string | null
          image_url?: string | null
          rating?: number
          review_count?: number
          is_approved?: boolean
          is_verified?: boolean
          whatsapp_number?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          business_name?: string
          category?: string
          description?: string
          address?: string
          city?: string
          pin_location_url?: string | null
          phone?: string
          email?: string | null
          website?: string | null
          business_days?: string | null
          pricing_info?: string | null
          image_url?: string | null
          rating?: number
          review_count?: number
          is_approved?: boolean
          is_verified?: boolean
          whatsapp_number?: string | null
        }
      }
      reviews: {
        Row: {
          id: string
          created_at: string
          business_id: string
          user_id: string
          rating: number
          comment: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          business_id: string
          user_id: string
          rating: number
          comment?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          business_id?: string
          user_id?: string
          rating?: number
          comment?: string | null
        }
      }
    }
  }
}