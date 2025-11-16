const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://gsdctfcfkrtuxnwapjcj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzZGN0ZmNma3J0dXhud2FwamNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxMzQ4MzAsImV4cCI6MjA3MDcxMDgzMH0.hknSwHKvGu84Bg4oBnF1jEsiNBg-vTF8SmoWiQFyzEg'
);

async function testQueries() {
  console.log('Testing location page queries...\n');

  // Test 1: Houses for rent in Nairobi (like houses-for-rent/nairobi)
  console.log('=== Test 1: Houses for rent in Nairobi ===');
  let query1 = supabase
    .from('property_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('price_type', 'rent')
    .ilike('property_type', '%house%')
    .ilike('county', '%Nairobi%')
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(100);

  const { data: data1, error: error1 } = await query1;
  console.log('Found:', data1?.length || 0, 'properties');
  if (data1 && data1.length > 0) {
    console.log('Sample:', data1[0].property_title, '-', data1[0].property_type, '-', data1[0].city);
  }

  // Test 2: Apartments for sale in Nairobi
  console.log('\n=== Test 2: Apartments for sale in Nairobi ===');
  let query2 = supabase
    .from('property_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('price_type', 'sale')
    .ilike('property_type', '%apartment%')
    .ilike('county', '%Nairobi%')
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(100);

  const { data: data2, error: error2 } = await query2;
  console.log('Found:', data2?.length || 0, 'properties');
  if (data2 && data2.length > 0) {
    console.log('Sample:', data2[0].property_title, '-', data2[0].property_type);
  }

  // Test 3: Apartments for rent in Mombasa
  console.log('\n=== Test 3: Apartments for rent in Mombasa ===');
  let query3 = supabase
    .from('property_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('price_type', 'rent')
    .ilike('property_type', '%apartment%')
    .ilike('county', '%Mombasa%')
    .limit(100);

  const { data: data3, error: error3 } = await query3;
  console.log('Found:', data3?.length || 0, 'properties');

  // Test 4: Check sample counties from database
  console.log('\n=== Test 4: Sample county values in database ===');
  const { data: sampleData } = await supabase
    .from('property_listings')
    .select('county, city, property_type, price_type')
    .limit(10);

  if (sampleData) {
    sampleData.forEach(d => {
      console.log(`County: "${d.county}", City: "${d.city}", Type: ${d.property_type} (${d.price_type})`);
    });
  }

  // Test 5: Get a sample location from locations table
  console.log('\n=== Test 5: Sample locations from locations table ===');
  const { data: locations } = await supabase
    .from('locations')
    .select('name, slug, type, county, is_active')
    .eq('is_active', true)
    .limit(10);

  if (locations) {
    console.log('Total active locations:', locations.length);
    locations.forEach(loc => {
      console.log(`- ${loc.name} (${loc.type}), County: ${loc.county}, Slug: ${loc.slug}`);
    });
  }
}

testQueries().then(() => process.exit(0));
