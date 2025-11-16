require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkCounties() {
  // Check properties with NULL county
  const { data: nullCounty } = await supabase
    .from('property_listings')
    .select('id, property_title, city, county', { count: 'exact' })
    .is('county', null);

  console.log(`Properties with NULL county: ${nullCounty?.length || 0}`);

  // Check properties with non-NULL county
  const { data: hasCounty } = await supabase
    .from('property_listings')
    .select('id, property_title, city, county', { count: 'exact' })
    .not('county', 'is', null);

  console.log(`Properties with county value: ${hasCounty?.length || 0}`);

  if (hasCounty && hasCounty.length > 0) {
    console.log('\nSample counties:');
    hasCounty.slice(0, 5).forEach(p => {
      console.log(`  - "${p.county}" (${p.city})`);
    });
  }

  // Check the sample property from user
  const { data: sample } = await supabase
    .from('property_listings')
    .select('*')
    .eq('id', '007b1d22-a47d-4dcd-b58f-dce7f186205f')
    .single();

  console.log('\nSample property from user:');
  console.log(`  Title: ${sample?.property_title}`);
  console.log(`  Type: ${sample?.property_type}`);
  console.log(`  City: ${sample?.city}`);
  console.log(`  County: "${sample?.county}"`);
  console.log(`  Address: ${sample?.address}`);

  // Check 2BR apartments in Westlands without county filter
  const { data: westlandsNoCounty } = await supabase
    .from('property_listings')
    .select('id, property_title, city, county, bedrooms')
    .eq('is_approved', true)
    .eq('price_type', 'rent')
    .ilike('property_type', '%apartment%')
    .eq('bedrooms', 2)
    .or('city.ilike.%Westlands%,address.ilike.%Westlands%');

  console.log(`\n2BR Apartments in Westlands (NO county filter): ${westlandsNoCounty?.length || 0}`);
  if (westlandsNoCounty && westlandsNoCounty.length > 0) {
    westlandsNoCounty.forEach(p => {
      console.log(`  - ${p.property_title} | County: "${p.county}"`);
    });
  }
}

checkCounties().catch(console.error);
