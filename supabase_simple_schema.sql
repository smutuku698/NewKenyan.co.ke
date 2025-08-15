-- Simple schema without RLS for initial setup
-- Run this in Supabase SQL Editor

-- Create business_listings table
CREATE TABLE business_listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id TEXT NOT NULL,
    business_name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    pin_location_url TEXT,
    phone TEXT NOT NULL,
    email TEXT,
    website TEXT,
    business_days TEXT,
    pricing_info TEXT,
    image_url TEXT,
    rating DECIMAL(2,1) DEFAULT 0.0,
    review_count INTEGER DEFAULT 0,
    is_approved BOOLEAN DEFAULT FALSE,
    is_verified BOOLEAN DEFAULT FALSE,
    whatsapp_number TEXT
);

-- Create reviews table
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    business_id UUID REFERENCES business_listings(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL,
    rating INTEGER NOT NULL,
    comment TEXT
);

-- Insert sample data
INSERT INTO business_listings (
    user_id,
    business_name,
    category,
    description,
    address,
    city,
    phone,
    email,
    website,
    business_days,
    pricing_info,
    image_url,
    is_approved,
    is_verified,
    whatsapp_number
) VALUES 
(
    'sample_user_1',
    'Savannah Grill Restaurant',
    'Food & Dining',
    'Authentic Kenyan cuisine with a modern twist, serving the best nyama choma in Nairobi.',
    'Westlands Shopping Centre',
    'Nairobi',
    '+254700123456',
    'info@savannahgrill.co.ke',
    'https://savannahgrill.co.ke',
    'Monday - Sunday: 11:00 AM - 11:00 PM',
    'Main dishes: KSh 800 - 2,500',
    '/images/sample-business-1.jpg',
    true,
    true,
    '+254700123456'
),
(
    'sample_user_2',
    'Tech Hub Co-working',
    'Co-working Space',
    'Modern co-working space designed for Kenya''s growing tech community and entrepreneurs.',
    'CBD Plaza, Kenyatta Avenue',
    'Nairobi',
    '+254700234567',
    'hello@techhubke.com',
    'https://techhubke.com',
    'Monday - Friday: 8:00 AM - 8:00 PM, Saturday: 9:00 AM - 6:00 PM',
    'Day pass: KSh 1,500, Monthly: KSh 15,000',
    '/images/sample-business-2.jpg',
    true,
    true,
    '+254700234567'
);