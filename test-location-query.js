const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = 'https://gsdctfcfkrtuxnwapjcj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzZGN0ZmNma3J0dXhud2FwamNqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTEzNDgzMCwiZXhwIjoyMDcwNzEwODMwfQ.TmCzZ3dyKOhN0V-6ezLAykzsJfAWcaVCt5Yx0gjMHLA';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testQueries() {
  console.log('='.repeat(80));
  console.log('TESTING LOCATION PAGE QUERIES');
  console.log('='.repeat(80));
  console.log('');

  // Test 1: Basic query for houses for sale
  console.log('Test 1: Houses for sale (no location filter)');
  console.log('-'.repeat(80));
  const { data: houses, error: housesError } = await supabase
    .from('property_listings')
    .select('property_title, property_type, price_type, city, address, is_approved')
    .eq('is_approved', true)
    .eq('price_type', 'For Sale')
    .ilike('property_type', '%house%')
    .limit(5);

  if (housesError) {
    console.error('Error:', housesError);
  } else {
    console.log(`Found ${houses.length} houses for sale`);
    houses.forEach((h, idx) => {
      console.log(`${idx + 1}. ${h.property_title.substring(0, 50)}...`);
      console.log(`   Type: ${h.property_type}, Price Type: ${h.price_type}`);
      console.log(`   Location: ${h.city}, ${h.address}`);
      console.log(`   Approved: ${h.is_approved}`);
    });
  }

  console.log('\n');

  // Test 2: Apartments for sale
  console.log('Test 2: Apartments for sale (no location filter)');
  console.log('-'.repeat(80));
  const { data: apartments, error: aptsError } = await supabase
    .from('property_listings')
    .select('property_title, property_type, price_type, city, address, is_approved')
    .eq('is_approved', true)
    .eq('price_type', 'For Sale')
    .ilike('property_type', '%apartment%')
    .limit(5);

  if (aptsError) {
    console.error('Error:', aptsError);
  } else {
    console.log(`Found ${apartments.length} apartments for sale`);
    apartments.forEach((a, idx) => {
      console.log(`${idx + 1}. ${a.property_title.substring(0, 50)}...`);
      console.log(`   Type: ${a.property_type}, Price Type: ${a.price_type}`);
      console.log(`   Location: ${a.city}, ${a.address}`);
    });
  }

  console.log('\n');

  // Test 3: Check sample locations in database
  console.log('Test 3: Check locations table');
  console.log('-'.repeat(80));
  const { data: locations, error: locError } = await supabase
    .from('locations')
    .select('name, slug, type, county, city, is_active')
    .eq('is_active', true)
    .limit(10);

  if (locError) {
    console.error('Error:', locError);
  } else {
    console.log(`Found ${locations.length} active locations`);
    locations.forEach((loc, idx) => {
      console.log(`${idx + 1}. ${loc.name} (${loc.type})`);
      console.log(`   Slug: ${loc.slug}, County: ${loc.county}, City: ${loc.city || 'N/A'}`);
    });
  }

  console.log('\n');

  // Test 4: Query with location filter (Nairobi County example)
  console.log('Test 4: Houses for sale in Nairobi (county filter)');
  console.log('-'.repeat(80));
  const { data: nairobHouses, error: nrbError } = await supabase
    .from('property_listings')
    .select('property_title, property_type, price_type, county, city, is_approved')
    .eq('is_approved', true)
    .eq('price_type', 'For Sale')
    .ilike('property_type', '%house%')
    .ilike('county', '%Nairobi%')
    .limit(5);

  if (nrbError) {
    console.error('Error:', nrbError);
  } else {
    console.log(`Found ${nairobHouses.length} houses for sale in Nairobi`);
    nairobHouses.forEach((h, idx) => {
      console.log(`${idx + 1}. ${h.property_title.substring(0, 50)}...`);
      console.log(`   County: ${h.county}, City: ${h.city}`);
    });
  }

  console.log('\n' + '='.repeat(80));
}

testQueries().catch(console.error);
