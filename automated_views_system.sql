-- Automated Property Views System
-- This system automatically manages view counts without relying on actual user traffic

-- Add tracking fields to property_listings table
ALTER TABLE property_listings 
ADD COLUMN IF NOT EXISTS last_view_increment DATE DEFAULT CURRENT_DATE,
ADD COLUMN IF NOT EXISTS base_views_set BOOLEAN DEFAULT FALSE;

-- Function to give initial view boost when property is approved
CREATE OR REPLACE FUNCTION boost_property_views_on_approval()
RETURNS TRIGGER AS $$
BEGIN
    -- If property is being approved for the first time
    IF NEW.is_approved = true AND OLD.is_approved = false THEN
        -- Add 100 views as approval bonus
        NEW.views_count = OLD.views_count + 100;
        NEW.base_views_set = true;
        NEW.last_view_increment = CURRENT_DATE;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for approval bonus
DROP TRIGGER IF EXISTS property_approval_view_boost ON property_listings;
CREATE TRIGGER property_approval_view_boost
    BEFORE UPDATE ON property_listings
    FOR EACH ROW
    EXECUTE FUNCTION boost_property_views_on_approval();

-- Function to increment daily views for all approved properties
CREATE OR REPLACE FUNCTION increment_daily_property_views()
RETURNS INTEGER AS $$
DECLARE
    updated_count INTEGER := 0;
BEGIN
    -- Update all approved properties that haven't been incremented today
    UPDATE property_listings 
    SET 
        views_count = views_count + 200,
        last_view_increment = CURRENT_DATE
    WHERE 
        is_approved = true 
        AND base_views_set = true
        AND (last_view_increment IS NULL OR last_view_increment < CURRENT_DATE);
    
    GET DIAGNOSTICS updated_count = ROW_COUNT;
    
    -- Log the update
    INSERT INTO view_increment_log (increment_date, properties_updated, increment_amount)
    VALUES (CURRENT_DATE, updated_count, 200);
    
    RETURN updated_count;
END;
$$ LANGUAGE plpgsql;

-- Create log table to track view increments
CREATE TABLE IF NOT EXISTS view_increment_log (
    id SERIAL PRIMARY KEY,
    increment_date DATE NOT NULL,
    properties_updated INTEGER NOT NULL,
    increment_amount INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Function to manually run daily increment (for testing)
CREATE OR REPLACE FUNCTION run_daily_view_increment()
RETURNS TEXT AS $$
DECLARE
    updated_count INTEGER;
BEGIN
    SELECT increment_daily_property_views() INTO updated_count;
    RETURN 'Updated ' || updated_count || ' properties with +200 views each';
END;
$$ LANGUAGE plpgsql;

-- Function to reset a property's view system (useful for testing)
CREATE OR REPLACE FUNCTION reset_property_views(property_id UUID)
RETURNS TEXT AS $$
BEGIN
    UPDATE property_listings 
    SET 
        views_count = 0,
        last_view_increment = NULL,
        base_views_set = false
    WHERE id = property_id;
    
    RETURN 'Reset views for property ' || property_id;
END;
$$ LANGUAGE plpgsql;

-- Function to simulate approval and view boost (for testing)
CREATE OR REPLACE FUNCTION simulate_property_approval(property_id UUID)
RETURNS TEXT AS $$
DECLARE
    current_approved BOOLEAN;
    current_views INTEGER;
    new_views INTEGER;
BEGIN
    -- Get current status
    SELECT is_approved, views_count INTO current_approved, current_views
    FROM property_listings WHERE id = property_id;
    
    IF current_approved = true THEN
        RETURN 'Property is already approved';
    END IF;
    
    -- Approve the property (this will trigger the automatic view boost)
    UPDATE property_listings 
    SET is_approved = true
    WHERE id = property_id;
    
    -- Get new view count
    SELECT views_count INTO new_views
    FROM property_listings WHERE id = property_id;
    
    RETURN 'Property approved! Views increased from ' || current_views || ' to ' || new_views;
END;
$$ LANGUAGE plpgsql;

-- Create index for efficient daily updates
CREATE INDEX IF NOT EXISTS idx_property_listings_daily_increment 
ON property_listings(is_approved, base_views_set, last_view_increment) 
WHERE is_approved = true;

-- Insert initial log entry
INSERT INTO view_increment_log (increment_date, properties_updated, increment_amount)
VALUES (CURRENT_DATE, 0, 0)
ON CONFLICT DO NOTHING;

-- Example usage and testing queries:

-- Test 1: Check current property status
-- SELECT id, property_title, is_approved, views_count, base_views_set, last_view_increment 
-- FROM property_listings ORDER BY created_at DESC;

-- Test 2: Simulate approving a property (replace with actual property ID)
-- SELECT simulate_property_approval('your-property-id-here');

-- Test 3: Run daily increment manually
-- SELECT run_daily_view_increment();

-- Test 4: Check increment log
-- SELECT * FROM view_increment_log ORDER BY created_at DESC;

-- Test 5: Reset a property for testing (replace with actual property ID)
-- SELECT reset_property_views('your-property-id-here');

COMMENT ON FUNCTION boost_property_views_on_approval() IS 'Automatically adds 100 views when a property is approved for the first time';
COMMENT ON FUNCTION increment_daily_property_views() IS 'Adds 200 views daily to all approved properties that have been view-boosted';
COMMENT ON FUNCTION run_daily_view_increment() IS 'Manually triggers the daily view increment for testing';
COMMENT ON FUNCTION simulate_property_approval(UUID) IS 'Test function to simulate property approval and view boost';
COMMENT ON FUNCTION reset_property_views(UUID) IS 'Reset property view tracking for testing purposes';





--not yet added superbase table for real estate companies input.

CREATE TABLE real_estate_companies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  company_type TEXT NOT NULL,
  description TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  website TEXT,
  whatsapp_number TEXT,
  services TEXT[] NOT NULL,
  specializations TEXT[] NOT NULL,
  year_established INTEGER,
  employee_count INTEGER,
  google_maps_link TEXT,
  logo TEXT,
  social_media JSONB,
  is_approved BOOLEAN DEFAULT FALSE,
  is_verified BOOLEAN DEFAULT FALSE,
  rating DECIMAL DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);