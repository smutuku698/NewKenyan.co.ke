-- Add new fields to property_listings table
-- Run this in your Supabase SQL Editor

-- Add year_built column
ALTER TABLE property_listings
ADD COLUMN IF NOT EXISTS year_built INTEGER;

-- Add garage column (number of garage spaces)
ALTER TABLE property_listings
ADD COLUMN IF NOT EXISTS garage INTEGER DEFAULT 0;

-- Add google_maps_link column
ALTER TABLE property_listings
ADD COLUMN IF NOT EXISTS google_maps_link TEXT;

-- Add comments to document the new columns
COMMENT ON COLUMN property_listings.year_built IS 'Year the property was built';
COMMENT ON COLUMN property_listings.garage IS 'Number of garage spaces available';
COMMENT ON COLUMN property_listings.google_maps_link IS 'Google Maps link or embed URL for the property location';

-- Update existing properties with default values if needed
UPDATE property_listings
SET garage = 0
WHERE garage IS NULL;

-- Optional: Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_property_year_built ON property_listings(year_built);
CREATE INDEX IF NOT EXISTS idx_property_garage ON property_listings(garage);
