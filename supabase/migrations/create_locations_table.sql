-- Create locations table for Kenya counties, cities, neighborhoods, and estates
CREATE TABLE IF NOT EXISTS locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL CHECK (type IN ('county', 'neighborhood', 'estate')),
  parent_id UUID REFERENCES locations(id) ON DELETE CASCADE,
  city TEXT,
  county TEXT NOT NULL,
  description TEXT,
  meta_content JSONB DEFAULT '{}',
  coordinates POINT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_locations_slug ON locations(slug);
CREATE INDEX idx_locations_type ON locations(type);
CREATE INDEX idx_locations_county ON locations(county);
CREATE INDEX idx_locations_city ON locations(city);
CREATE INDEX idx_locations_parent_id ON locations(parent_id);
CREATE INDEX idx_locations_is_active ON locations(is_active);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_locations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to call the function
CREATE TRIGGER trigger_update_locations_updated_at
  BEFORE UPDATE ON locations
  FOR EACH ROW
  EXECUTE FUNCTION update_locations_updated_at();

-- Add comment to table
COMMENT ON TABLE locations IS 'Stores hierarchical location data for Kenya including counties, neighborhoods, and estates';
COMMENT ON COLUMN locations.type IS 'Location type: county, neighborhood, or estate';
COMMENT ON COLUMN locations.parent_id IS 'Reference to parent location (e.g., neighborhood belongs to a county)';
COMMENT ON COLUMN locations.meta_content IS 'JSON object storing SEO metadata variations and additional content';
