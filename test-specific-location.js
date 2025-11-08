const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = 'https://gsdctfcfkrtuxnwapjcj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzZGN0ZmNma3J0dXhud2FwamNqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTEzNDgzMCwiZXhwIjoyMDcwNzEwODMwfQ.TmCzZ3dyKOhN0V-6ezLAykzsJfAWcaVCt5Yx0gjMHLA';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testSpecificLocation() {
  console.log('='.repeat(80));
  console.log('TESTING SPECIFIC LOCATION PAGE QUERIES');
  console.log('='.repeat(80));
  console.log('');

  // Test with a few sample location slugs
  const testSlugs = ['nairobi-county', 'westlands', 'kilimani', 'karen', 'kileleshwa'];

  for (const slug of testSlugs) {
    console.log(`\nTesting location: ${slug}`);
    console.log('-'.repeat(80));

    // Step 1: Get location data
    const { data: location, error: locError } = await supabase
      .from('locations')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (locError || !location) {
      console.log(`  ❌ Location "${slug}" not found in database`);
      console.log(`     Error: ${locError?.message || 'No data returned'}`);
      continue;
    }

    console.log(`  ✓ Found location: ${location.name} (${location.type})`);
    console.log(`    County: ${location.county}, City: ${location.city || 'N/A'}`);

    // Step 2: Query houses for sale (matching the exact page query)
    let query = supabase
      .from('property_listings')
      .select('*')
      .eq('is_approved', true)
      .eq('price_type', 'For Sale')
      .ilike('property_type', '%house%');

    // Apply location filter based on type (exact same logic as the page)
    if (location.type === 'county') {
      query = query.ilike('county', `%${location.name}%`);
    } else if (location.type === 'neighborhood') {
      query = query
        .ilike('county', `%${location.county}%`)
        .or(`city.ilike.%${location.name}%,address.ilike.%${location.name}%`);
    } else if (location.type === 'estate') {
      query = query
        .ilike('county', `%${location.county}%`)
        .ilike('address', `%${location.name}%`);
    }

    query = query
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(12);

    const { data: properties, error: propError } = await query;

    if (propError) {
      console.log(`  ❌ Error fetching properties: ${propError.message}`);
    } else {
      console.log(`  ✓ Found ${properties.length} houses for sale`);
      if (properties.length > 0) {
        console.log(`    Sample listings:`);
        properties.slice(0, 3).forEach((p, idx) => {
          console.log(`    ${idx + 1}. ${p.property_title.substring(0, 50)}...`);
          console.log(`       ${p.city}, ${p.county}`);
        });
      }
    }

    // Step 3: Query apartments for sale
    let aptQuery = supabase
      .from('property_listings')
      .select('*')
      .eq('is_approved', true)
      .eq('price_type', 'For Sale')
      .ilike('property_type', '%apartment%');

    if (location.type === 'county') {
      aptQuery = aptQuery.ilike('county', `%${location.name}%`);
    } else if (location.type === 'neighborhood') {
      aptQuery = aptQuery
        .ilike('county', `%${location.county}%`)
        .or(`city.ilike.%${location.name}%,address.ilike.%${location.name}%`);
    } else if (location.type === 'estate') {
      aptQuery = aptQuery
        .ilike('county', `%${location.county}%`)
        .ilike('address', `%${location.name}%`);
    }

    aptQuery = aptQuery
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(12);

    const { data: apartments, error: aptError } = await aptQuery;

    if (aptError) {
      console.log(`  ❌ Error fetching apartments: ${aptError.message}`);
    } else {
      console.log(`  ✓ Found ${apartments.length} apartments for sale`);
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('RECOMMENDATION:');
  console.log('-'.repeat(80));
  console.log('If you\'re seeing 0 results for certain locations, check:');
  console.log('1. The location slug matches what\'s in the locations table');
  console.log('2. The property city/address/county values match the location names');
  console.log('3. The property_type field contains "house" or "apartment"');
  console.log('4. The price_type is exactly "For Sale" or "For Rent"');
  console.log('='.repeat(80));
}

testSpecificLocation().catch(console.error);
