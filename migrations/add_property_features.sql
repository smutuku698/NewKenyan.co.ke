-- Add new property feature columns to property_listings table

-- Construction and completion information
ALTER TABLE property_listings
ADD COLUMN IF NOT EXISTS construction_progress TEXT,
ADD COLUMN IF NOT EXISTS completion_date DATE,
ADD COLUMN IF NOT EXISTS payment_plan TEXT;

-- Feature categories (stored as text arrays)
ALTER TABLE property_listings
ADD COLUMN IF NOT EXISTS nearby_features TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS external_features TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS internal_features TEXT[] DEFAULT '{}';

-- Add comments for clarity
COMMENT ON COLUMN property_listings.construction_progress IS 'Construction progress status (e.g., "Under Construction", "Completed", "Off-Plan")';
COMMENT ON COLUMN property_listings.completion_date IS 'Expected or actual completion date';
COMMENT ON COLUMN property_listings.payment_plan IS 'Payment plan details (e.g., "20% deposit, balance in 3 years")';
COMMENT ON COLUMN property_listings.nearby_features IS 'Array of nearby amenities (Bus Stop, Hospital, School, etc.)';
COMMENT ON COLUMN property_listings.external_features IS 'Array of external features (Balcony, BBQ, CCTV, Garden, etc.)';
COMMENT ON COLUMN property_listings.internal_features IS 'Array of internal features (Alarm, Fibre Internet, etc.)';
