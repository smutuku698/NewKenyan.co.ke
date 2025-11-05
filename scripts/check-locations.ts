import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function checkLocations() {
  const { data, error } = await supabase
    .from('property_listings')
    .select('city, county, address')
    .eq('is_approved', true);

  if (error || !data) {
    console.error('Error:', error);
    return;
  }

  console.log(`Total properties: ${data.length}\n`);

  // Get unique cities
  const cities = Array.from(new Set(data.map(p => p.city))).sort();
  console.log(`\n📍 CITIES (${cities.length}):`);
  cities.forEach(city => {
    const count = data.filter(p => p.city === city).length;
    console.log(`  ${city}: ${count} properties`);
  });

  // Get unique counties
  const counties = Array.from(new Set(data.map(p => p.county).filter(Boolean))).sort();
  console.log(`\n🗺️  COUNTIES (${counties.length}):`);
  counties.forEach(county => {
    const count = data.filter(p => p.county === county).length;
    console.log(`  ${county}: ${count} properties`);
  });

  // Sample addresses to see the format
  console.log(`\n📮 SAMPLE ADDRESSES:`);
  data.slice(0, 10).forEach(p => {
    console.log(`  ${p.city} - ${p.address}`);
  });
}

checkLocations();
