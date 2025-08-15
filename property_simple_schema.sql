-- Simple property schema without RLS (matches business listings approach)
-- Run this in Supabase SQL Editor

-- Drop existing tables if they exist
DROP TABLE IF EXISTS property_reviews;
DROP TABLE IF EXISTS property_listings;

-- Create property_listings table (without RLS)
CREATE TABLE property_listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id TEXT NOT NULL,
    property_title TEXT NOT NULL,
    property_type TEXT NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    price_type TEXT NOT NULL DEFAULT 'rent',
    bedrooms INTEGER,
    bathrooms INTEGER,
    square_feet INTEGER,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    county TEXT,
    pin_location_url TEXT,
    contact_phone TEXT NOT NULL,
    contact_email TEXT,
    whatsapp_number TEXT,
    amenities TEXT[],
    images TEXT[],
    available_from DATE,
    is_furnished BOOLEAN DEFAULT FALSE,
    pets_allowed BOOLEAN DEFAULT FALSE,
    rating DECIMAL(2,1) DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),
    review_count INTEGER DEFAULT 0,
    is_approved BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    views_count INTEGER DEFAULT 0
);

-- Create property_reviews table (without RLS)
CREATE TABLE property_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    property_id UUID REFERENCES property_listings(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT
);

-- Create indexes for better performance
CREATE INDEX idx_property_listings_user_id ON property_listings(user_id);
CREATE INDEX idx_property_listings_type ON property_listings(property_type);
CREATE INDEX idx_property_listings_city ON property_listings(city);
CREATE INDEX idx_property_listings_county ON property_listings(county);
CREATE INDEX idx_property_listings_approved ON property_listings(is_approved);
CREATE INDEX idx_property_listings_price ON property_listings(price);
CREATE INDEX idx_property_listings_bedrooms ON property_listings(bedrooms);
CREATE INDEX idx_property_reviews_property_id ON property_reviews(property_id);
CREATE INDEX idx_property_reviews_user_id ON property_reviews(user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_property_listings_updated_at
    BEFORE UPDATE ON property_listings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to update property rating when reviews are added/updated/deleted
CREATE OR REPLACE FUNCTION update_property_rating()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'DELETE' THEN
        UPDATE property_listings 
        SET 
            rating = COALESCE((
                SELECT ROUND(AVG(rating::numeric), 1)
                FROM property_reviews 
                WHERE property_id = OLD.property_id
            ), 0),
            review_count = (
                SELECT COUNT(*)
                FROM property_reviews 
                WHERE property_id = OLD.property_id
            )
        WHERE id = OLD.property_id;
        RETURN OLD;
    ELSE
        UPDATE property_listings 
        SET 
            rating = COALESCE((
                SELECT ROUND(AVG(rating::numeric), 1)
                FROM property_reviews 
                WHERE property_id = NEW.property_id
            ), 0),
            review_count = (
                SELECT COUNT(*)
                FROM property_reviews 
                WHERE property_id = NEW.property_id
            )
        WHERE id = NEW.property_id;
        RETURN NEW;
    END IF;
END;
$$ language 'plpgsql';

-- Triggers to update property rating
CREATE TRIGGER update_rating_on_property_review_insert
    AFTER INSERT ON property_reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_property_rating();

CREATE TRIGGER update_rating_on_property_review_update
    AFTER UPDATE ON property_reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_property_rating();

CREATE TRIGGER update_rating_on_property_review_delete
    AFTER DELETE ON property_reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_property_rating();

-- Insert sample property data
INSERT INTO property_listings (
    user_id,
    property_title,
    property_type,
    description,
    price,
    price_type,
    bedrooms,
    bathrooms,
    square_feet,
    address,
    city,
    county,
    contact_phone,
    contact_email,
    whatsapp_number,
    amenities,
    images,
    available_from,
    is_furnished,
    pets_allowed,
    is_approved,
    is_featured
) VALUES 
(
    'property_user_1',
    'Modern 2BR Apartment with City Views',
    'Apartment',
    'Beautiful modern apartment in the heart of Kilimani with stunning city views. Features include modern kitchen, spacious living area, and access to gym and swimming pool.',
    85000,
    'rent',
    2,
    2,
    1200,
    'Kilimani Road, Apartment 15B',
    'Nairobi',
    'Nairobi County',
    '+254700456789',
    'apartments@kilimani.co.ke',
    '+254700456789',
    ARRAY['parking', 'gym', 'pool', 'security', 'balcony', 'elevator'],
    ARRAY['/images/sample-property-1.jpg', '/images/sample-business-1.jpg'],
    CURRENT_DATE,
    false,
    false,
    true,
    true
),
(
    'property_user_2',
    'Spacious Family Home in Quiet Neighborhood',
    'House',
    'Perfect family home in the prestigious Karen area. Features a large garden, modern kitchen, and peaceful environment ideal for families with children.',
    120000,
    'rent',
    4,
    3,
    2500,
    'Karen Road, House 42',
    'Nairobi',
    'Nairobi County',
    '+254700567890',
    'karen.properties@gmail.com',
    '+254700567890',
    ARRAY['garden', 'parking', 'security', 'backup generator', 'servant quarter'],
    ARRAY['/images/sample-business-2.jpg', '/images/sample-property-1.jpg'],
    CURRENT_DATE + INTERVAL '1 month',
    true,
    true,
    true,
    false
),
(
    'property_user_3',
    'Studio Apartment Perfect for Young Professionals',
    'Studio',
    'Cozy studio apartment in Westlands, perfect for young professionals. Fully furnished with modern amenities and excellent transport links.',
    45000,
    'rent',
    1,
    1,
    500,
    'Westlands, Studio Complex 7A',
    'Nairobi',
    'Nairobi County',
    '+254700678901',
    'westlands.studios@yahoo.com',
    '+254700678901',
    ARRAY['furnished', 'wifi', 'parking', 'security', 'laundry'],
    ARRAY['/images/sample-property-1.jpg'],
    CURRENT_DATE,
    true,
    false,
    true,
    false
);