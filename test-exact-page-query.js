const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://gsdctfcfkrtuxnwapjcj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzZGN0ZmNma3J0dXhud2FwamNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxMzQ4MzAsImV4cCI6MjA3MDcxMDgzMH0.hknSwHKvGu84Bg4oBnF1jEsiNBg-vTF8SmoWiQFyzEg'
);

async function testExactPageQuery() {
  console.log('=== Simulating EXACT page query for houses-for-rent/nairobi-county ===\n');

  // Step 1: Get location (like the page does)
  const slug = 'nairobi-county';
  const { data: location, error: locError } = await supabase
    .from('locations')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (locError || !location) {
    console.log('ERROR: Location not found!', locError);
    return;
  }

  console.log('Location found:', location.name);
  console.log('Location type:', location.type);
  console.log('Location county:', location.county);
  console.log('');

  // Step 2: Build query exactly like houses-for-rent page does
  let query = supabase
    .from('property_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('price_type', 'rent')
    .ilike('property_type', '%house%');

  // Apply location filter (from houses-for-rent/[location]/page.tsx logic)
  if (location.type === 'county') {
    // Remove " County" suffix from location name for database matching
    const countyName = location.name.replace(/ County$/i, '');
    console.log('Searching for county:', countyName);
    query = query.ilike('county', `%${countyName}%`);
  }

  query = query
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(100);

  const { data: properties, error: propError } = await query;

  if (propError) {
    console.log('ERROR fetching properties:', propError);
    return;
  }

  console.log('\n=== RESULTS ===');
  console.log('Properties found:', properties?.length || 0);

  if (properties && properties.length > 0) {
    console.log('\nFirst 5 properties:');
    properties.slice(0, 5).forEach((p, i) => {
      console.log(`${i + 1}. ${p.property_title}`);
      console.log(`   Type: ${p.property_type}, City: ${p.city}, County: ${p.county}`);
    });
  } else {
    console.log('\n⚠️ NO PROPERTIES FOUND!');
    console.log('\nLet me check if there are ANY houses for rent in Nairobi:');

    const { data: anyHouses } = await supabase
      .from('property_listings')
      .select('property_title, property_type, county, price_type')
      .eq('is_approved', true)
      .eq('price_type', 'rent')
      .ilike('property_type', '%house%')
      .ilike('county', '%Nairobi%')
      .limit(5);

    console.log('Direct query for houses in Nairobi:', anyHouses?.length || 0);
    if (anyHouses && anyHouses.length > 0) {
      anyHouses.forEach(h => console.log(`- ${h.property_type} in ${h.county}`));
    }
  }
}

testExactPageQuery().then(() => process.exit(0));
