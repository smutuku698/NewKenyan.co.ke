import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function checkMissingBedBath() {
  const { data, error } = await supabase
    .from('property_listings')
    .select('id, property_title, bedrooms, bathrooms, square_feet')
    .eq('is_approved', true);

  if (error || !data) {
    console.error('Error:', error);
    return;
  }

  const missingBedrooms = data.filter(p => p.bedrooms === null || p.bedrooms === undefined);
  const missingBathrooms = data.filter(p => p.bathrooms === null || p.bathrooms === undefined);
  const missingSquareFeet = data.filter(p => !p.square_feet);

  console.log(`Total properties: ${data.length}`);
  console.log(`\nMissing bedrooms: ${missingBedrooms.length}`);
  console.log(`Missing bathrooms: ${missingBathrooms.length}`);
  console.log(`Missing square_feet: ${missingSquareFeet.length}`);

  if (missingBedrooms.length > 0) {
    console.log('\nProperties missing bedrooms:');
    missingBedrooms.slice(0, 5).forEach(p => console.log(`  - ${p.property_title}`));
  }

  if (missingBathrooms.length > 0) {
    console.log('\nProperties missing bathrooms:');
    missingBathrooms.slice(0, 5).forEach(p => console.log(`  - ${p.property_title}`));
  }
}

checkMissingBedBath();
