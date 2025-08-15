-- Create property_listings table
CREATE TABLE IF NOT EXISTS property_listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id TEXT NOT NULL,
    property_title TEXT NOT NULL,
    property_type TEXT NOT NULL, -- e.g., 'Apartment', 'House', 'Studio', 'Commercial'
    description TEXT NOT NULL,
    price DECIMAL(12,2) NOT NULL, -- Monthly rent or sale price
    price_type TEXT NOT NULL DEFAULT 'rent', -- 'rent' or 'sale'
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
    amenities TEXT[], -- Array of amenities like ['parking', 'gym', 'pool']
    images TEXT[], -- Array of image URLs
    available_from DATE,
    is_furnished BOOLEAN DEFAULT FALSE,
    pets_allowed BOOLEAN DEFAULT FALSE,
    rating DECIMAL(2,1) DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),
    review_count INTEGER DEFAULT 0,
    is_approved BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    views_count INTEGER DEFAULT 0
);

-- Create property_reviews table
CREATE TABLE IF NOT EXISTS property_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    property_id UUID REFERENCES property_listings(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_property_listings_user_id ON property_listings(user_id);
CREATE INDEX IF NOT EXISTS idx_property_listings_type ON property_listings(property_type);
CREATE INDEX IF NOT EXISTS idx_property_listings_city ON property_listings(city);
CREATE INDEX IF NOT EXISTS idx_property_listings_county ON property_listings(county);
CREATE INDEX IF NOT EXISTS idx_property_listings_approved ON property_listings(is_approved);
CREATE INDEX IF NOT EXISTS idx_property_listings_price ON property_listings(price);
CREATE INDEX IF NOT EXISTS idx_property_listings_bedrooms ON property_listings(bedrooms);
CREATE INDEX IF NOT EXISTS idx_property_reviews_property_id ON property_reviews(property_id);
CREATE INDEX IF NOT EXISTS idx_property_reviews_user_id ON property_reviews(user_id);

-- Enable Row Level Security
ALTER TABLE property_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for property_listings
-- Users can view approved listings
CREATE POLICY "Anyone can view approved property listings" ON property_listings
    FOR SELECT USING (is_approved = true);

-- Users can view their own listings regardless of approval status
CREATE POLICY "Users can view their own property listings" ON property_listings
    FOR SELECT USING (auth.uid()::text = user_id);

-- Users can insert their own listings
CREATE POLICY "Users can insert their own property listings" ON property_listings
    FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- Users can update their own listings
CREATE POLICY "Users can update their own property listings" ON property_listings
    FOR UPDATE USING (auth.uid()::text = user_id);

-- RLS Policies for property_reviews
-- Anyone can view reviews
CREATE POLICY "Anyone can view property reviews" ON property_reviews
    FOR SELECT USING (true);

-- Authenticated users can insert reviews
CREATE POLICY "Authenticated users can insert property reviews" ON property_reviews
    FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- Users can update their own reviews
CREATE POLICY "Users can update their own property reviews" ON property_reviews
    FOR UPDATE USING (auth.uid()::text = user_id);

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
),
(
    'property_user_4',
    '3BR Townhouse in Gated Community',
    'Townhouse',
    'Modern townhouse in a secure gated community in Kiambu. Features include a private garden, covered parking, and access to clubhouse facilities.',
    95000,
    'rent',
    3,
    2,
    1800,
    'Kiambu Gardens Estate, Unit 18',
    'Kiambu',
    'Kiambu County',
    '+254700789012',
    null,
    '+254700789012',
    ARRAY['garden', 'parking', 'security', 'clubhouse', 'playground'],
    ARRAY['/images/sample-business-1.jpg', '/images/sample-business-2.jpg'],
    CURRENT_DATE + INTERVAL '2 weeks',
    false,
    true,
    true,
    true
),
(
    'property_user_5',
    'Luxury Penthouse with Rooftop Terrace',
    'Penthouse',
    'Exclusive penthouse apartment with panoramic views of Nairobi skyline. Features rooftop terrace, private lift access, and premium finishes throughout.',
    280000,
    'rent',
    3,
    3,
    2200,
    'Upperhill Towers, Penthouse Floor',
    'Nairobi',
    'Nairobi County',
    '+254700890123',
    'luxury@upperhill.co.ke',
    '+254700890123',
    ARRAY['rooftop terrace', 'private lift', 'gym', 'pool', 'concierge', 'parking'],
    ARRAY['/images/sample-property-1.jpg', '/images/sample-business-1.jpg', '/images/sample-business-2.jpg'],
    CURRENT_DATE,
    true,
    false,
    true,
    true
);

-- Add some sample property reviews
INSERT INTO property_reviews (property_id, user_id, rating, comment) VALUES
((SELECT id FROM property_listings WHERE property_title = 'Modern 2BR Apartment with City Views'), 'reviewer_1', 5, 'Excellent apartment with amazing views! The amenities are top-notch.'),
((SELECT id FROM property_listings WHERE property_title = 'Modern 2BR Apartment with City Views'), 'reviewer_2', 4, 'Great location and modern finishes. Highly recommend!'),
((SELECT id FROM property_listings WHERE property_title = 'Spacious Family Home in Quiet Neighborhood'), 'reviewer_3', 5, 'Perfect for families. Love the garden and quiet environment.'),
((SELECT id FROM property_listings WHERE property_title = 'Studio Apartment Perfect for Young Professionals'), 'reviewer_4', 4, 'Convenient location and well-furnished. Good value for money.');