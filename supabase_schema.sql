-- Create business_listings table
CREATE TABLE IF NOT EXISTS business_listings (
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
    rating DECIMAL(2,1) DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),
    review_count INTEGER DEFAULT 0,
    is_approved BOOLEAN DEFAULT FALSE,
    is_verified BOOLEAN DEFAULT FALSE,
    whatsapp_number TEXT
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    business_id UUID REFERENCES business_listings(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_business_listings_user_id ON business_listings(user_id);
CREATE INDEX IF NOT EXISTS idx_business_listings_category ON business_listings(category);
CREATE INDEX IF NOT EXISTS idx_business_listings_city ON business_listings(city);
CREATE INDEX IF NOT EXISTS idx_business_listings_approved ON business_listings(is_approved);
CREATE INDEX IF NOT EXISTS idx_reviews_business_id ON reviews(business_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);

-- Enable Row Level Security
ALTER TABLE business_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for business_listings
-- Users can view approved listings
CREATE POLICY "Anyone can view approved business listings" ON business_listings
    FOR SELECT USING (is_approved = true);

-- Users can view their own listings regardless of approval status
CREATE POLICY "Users can view their own business listings" ON business_listings
    FOR SELECT USING (auth.uid()::text = user_id);

-- Users can insert their own listings
CREATE POLICY "Users can insert their own business listings" ON business_listings
    FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- Users can update their own listings
CREATE POLICY "Users can update their own business listings" ON business_listings
    FOR UPDATE USING (auth.uid()::text = user_id);

-- RLS Policies for reviews
-- Anyone can view reviews
CREATE POLICY "Anyone can view reviews" ON reviews
    FOR SELECT USING (true);

-- Authenticated users can insert reviews
CREATE POLICY "Authenticated users can insert reviews" ON reviews
    FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- Users can update their own reviews
CREATE POLICY "Users can update their own reviews" ON reviews
    FOR UPDATE USING (auth.uid()::text = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_business_listings_updated_at
    BEFORE UPDATE ON business_listings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to update business rating when reviews are added/updated/deleted
CREATE OR REPLACE FUNCTION update_business_rating()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'DELETE' THEN
        UPDATE business_listings 
        SET 
            rating = COALESCE((
                SELECT ROUND(AVG(rating::numeric), 1)
                FROM reviews 
                WHERE business_id = OLD.business_id
            ), 0),
            review_count = (
                SELECT COUNT(*)
                FROM reviews 
                WHERE business_id = OLD.business_id
            )
        WHERE id = OLD.business_id;
        RETURN OLD;
    ELSE
        UPDATE business_listings 
        SET 
            rating = COALESCE((
                SELECT ROUND(AVG(rating::numeric), 1)
                FROM reviews 
                WHERE business_id = NEW.business_id
            ), 0),
            review_count = (
                SELECT COUNT(*)
                FROM reviews 
                WHERE business_id = NEW.business_id
            )
        WHERE id = NEW.business_id;
        RETURN NEW;
    END IF;
END;
$$ language 'plpgsql';

-- Triggers to update business rating
CREATE TRIGGER update_rating_on_review_insert
    AFTER INSERT ON reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_business_rating();

CREATE TRIGGER update_rating_on_review_update
    AFTER UPDATE ON reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_business_rating();

CREATE TRIGGER update_rating_on_review_delete
    AFTER DELETE ON reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_business_rating();

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
),
(
    'sample_user_3',
    'Green Valley Organic Farm',
    'Agriculture',
    'Organic farming solutions and fresh produce supply for restaurants and markets.',
    'Green Valley Estate',
    'Nakuru',
    '+254700345678',
    'orders@greenvalleyke.com',
    'https://greenvalleyke.com',
    'Monday - Saturday: 6:00 AM - 6:00 PM',
    'Wholesale prices available, contact for quotes',
    '/images/sample-business-1.jpg',
    true,
    true,
    null
),
(
    'sample_user_4',
    'Kenya Coffee Roasters',
    'Food & Dining',
    'Premium Kenyan coffee beans roasted to perfection for local and international markets.',
    'Coffee Estate Road',
    'Kiambu',
    '+254700456789',
    'sales@kenyacoffeeroasters.com',
    'https://kenyacoffeeroasters.com',
    'Monday - Friday: 7:00 AM - 5:00 PM',
    'Premium blends: KSh 1,200 - 3,000 per kg',
    '/images/sample-business-2.jpg',
    true,
    true,
    '+254700456789'
),
(
    'sample_user_5',
    'Nairobi Innovation Hub',
    'Technology',
    'Supporting tech startups and entrepreneurs with mentorship, funding, and workspace.',
    'Upperhill Business District',
    'Nairobi',
    '+254700567890',
    'info@nairobiinnovation.com',
    'https://nairobiinnovation.com',
    'Monday - Friday: 8:00 AM - 10:00 PM',
    'Incubation programs from KSh 50,000',
    '/images/sample-business-1.jpg',
    true,
    true,
    null
);

-- Add some sample reviews
INSERT INTO reviews (business_id, user_id, rating, comment) VALUES
((SELECT id FROM business_listings WHERE business_name = 'Savannah Grill Restaurant'), 'reviewer_1', 5, 'Amazing nyama choma and excellent service!'),
((SELECT id FROM business_listings WHERE business_name = 'Savannah Grill Restaurant'), 'reviewer_2', 4, 'Great food, authentic Kenyan flavors.'),
((SELECT id FROM business_listings WHERE business_name = 'Tech Hub Co-working'), 'reviewer_3', 5, 'Perfect workspace for startups. Great community!'),
((SELECT id FROM business_listings WHERE business_name = 'Kenya Coffee Roasters'), 'reviewer_4', 5, 'Best coffee in Kenya! Premium quality beans.');