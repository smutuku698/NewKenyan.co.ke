const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://gsdctfcfkrtuxnwapjcj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzZGN0ZmNma3J0dXhud2FwamNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxMzQ4MzAsImV4cCI6MjA3MDcxMDgzMH0.hknSwHKvGu84Bg4oBnF1jEsiNBg-vTF8SmoWiQFyzEg'
);

async function testOrQueryIssue() {
  console.log('=== Testing .or() Query Behavior ===\n');

  const locationName = 'Nairobi Central';
  const countyName = 'Nairobi';

  console.log('Test 1: Current page logic with .or()');
  console.log('This adds .or() AFTER county filter, which might create: (county AND (city OR address))');
  let query1 = supabase
    .from('property_listings')
    .select('id, city, address, county, property_type, price_type')
    .eq('is_approved', true)
    .eq('price_type', 'rent')
    .ilike('property_type', '%apartment%')
    .ilike('county', `%${countyName}%`)
    .or(`city.ilike.%${locationName}%,address.ilike.%${locationName}%`)
    .limit(10);

  const { data: result1, error: error1 } = await query1;
  console.log('Found:', result1?.length || 0);
  if (error1) console.log('ERROR:', error1.message);
  if (result1 && result1.length > 0) {
    console.log('Samples:');
    result1.slice(0, 3).forEach(p => {
      console.log(`  - City: "${p.city}", County: "${p.county}"`);
    });
  }

  console.log('\n---\n');

  console.log('Test 2: What if we want ALL apartments in Nairobi county that match neighborhood?');
  console.log('Using AND logic with nested OR for city/address:');

  // Unfortunately Supabase .or() doesn't work as expected when chained
  // We need to use a different approach

  console.log('\nTest 3: Check how many apartments for rent exist in Nairobi Central specifically:');
  const { data: result3 } = await supabase
    .from('property_listings')
    .select('id, city, address, property_type')
    .eq('is_approved', true)
    .eq('price_type', 'rent')
    .ilike('property_type', '%apartment%')
    .ilike('city', '%Nairobi Central%')
    .limit(10);

  console.log('Found (city match):', result3?.length || 0);

  const { data: result4 } = await supabase
    .from('property_listings')
    .select('id, city, address, property_type')
    .eq('is_approved', true)
    .eq('price_type', 'rent')
    .ilike('property_type', '%apartment%')
    .ilike('address', '%Nairobi Central%')
    .limit(10);

  console.log('Found (address match):', result4?.length || 0);

  console.log('\n---\n');

  console.log('Test 4: Check what OTHER neighborhoods we have in Nairobi:');
  const { data: nairobiCities } = await supabase
    .from('property_listings')
    .select('city')
    .ilike('county', '%Nairobi%')
    .limit(1000);

  if (nairobiCities) {
    const uniqueCities = [...new Set(nairobiCities.map(p => p.city))];
    console.log(`Total unique cities in Nairobi: ${uniqueCities.length}`);
    console.log('Sample cities:');
    uniqueCities.slice(0, 30).forEach(city => console.log(' -', city));
  }

  console.log('\n---\n');

  console.log('Test 5: Check locations table for all Nairobi neighborhoods:');
  const { data: neighborhoods } = await supabase
    .from('locations')
    .select('name, type')
    .eq('county', 'Nairobi')
    .eq('type', 'neighborhood')
    .eq('is_active', true);

  console.log(`Active neighborhoods in locations table: ${neighborhoods?.length || 0}`);
  if (neighborhoods) {
    neighborhoods.slice(0, 10).forEach(n => console.log(' -', n.name));
  }
}

testOrQueryIssue().then(() => process.exit(0));
