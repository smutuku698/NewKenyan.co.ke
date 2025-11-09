require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function debugLocationQuery() {
  console.log('🔍 DEBUGGING LOCATION PAGE QUERIES\n');
  console.log('═'.repeat(70));

  // 1. Check locations table
  console.log('\n1️⃣ LOCATIONS TABLE (what pages expect):');
  console.log('─'.repeat(70));

  const { data: locations } = await supabase
    .from('locations')
    .select('name, slug, type, county, city')
    .eq('is_active', true)
    .limit(10);

  locations?.forEach(loc => {
    console.log(`📍 ${loc.name} (${loc.type})`);
    console.log(`   Slug: ${loc.slug}`);
    console.log(`   County: ${loc.county}`);
    console.log(`   City: ${loc.city || 'N/A'}`);
  });

  // 2. Check property listings
  console.log('\n\n2️⃣ PROPERTY LISTINGS (what we have in DB):');
  console.log('─'.repeat(70));

  const { data: properties } = await supabase
    .from('property_listings')
    .select('county, city, property_type, price_type')
    .eq('is_approved', true)
    .limit(10);

  properties?.forEach(prop => {
    console.log(`🏠 ${prop.property_type} - ${prop.price_type}`);
    console.log(`   County: "${prop.county}"`);
    console.log(`   City: "${prop.city}"`);
  });

  // 3. Test Nairobi County query (like the page does)
  console.log('\n\n3️⃣ TEST QUERY: Nairobi County (Houses for Sale):');
  console.log('─'.repeat(70));

  const nairobiLocation = {
    name: 'Nairobi',
    type: 'county',
    county: 'Nairobi County'
  };

  console.log(`Query will search for:`);
  console.log(`  - price_type = 'For Sale'`);
  console.log(`  - property_type ILIKE '%house%'`);
  console.log(`  - county ILIKE '%${nairobiLocation.name}%'`);

  const { data: nairobiHouses, error } = await supabase
    .from('property_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('price_type', 'For Sale')
    .ilike('property_type', '%house%')
    .ilike('county', `%${nairobiLocation.name}%`)
    .limit(5);

  console.log(`\n✅ Found ${nairobiHouses?.length || 0} houses`);

  if (nairobiHouses && nairobiHouses.length > 0) {
    nairobiHouses.forEach(h => {
      console.log(`   - ${h.property_title.substring(0, 60)}`);
    });
  } else {
    console.log('   ❌ NO RESULTS!');
  }

  // 4. Check what county values exist
  console.log('\n\n4️⃣ UNIQUE COUNTY VALUES IN PROPERTIES:');
  console.log('─'.repeat(70));

  const { data: allProps } = await supabase
    .from('property_listings')
    .select('county');

  const uniqueCounties = [...new Set(allProps?.map(p => p.county))];
  console.log('Counties in property_listings table:');
  uniqueCounties.slice(0, 20).forEach(c => console.log(`   - "${c}"`));

  // 5. Test a specific neighborhood (Westlands)
  console.log('\n\n5️⃣ TEST QUERY: Westlands Neighborhood (Apartments for Rent):');
  console.log('─'.repeat(70));

  const westlandsLocation = {
    name: 'Westlands',
    type: 'neighborhood',
    county: 'Nairobi County',
    city: 'Nairobi'
  };

  console.log(`Query will search for:`);
  console.log(`  - price_type = 'For Rent'`);
  console.log(`  - property_type ILIKE '%apartment%'`);
  console.log(`  - county ILIKE '%${westlandsLocation.county}%'`);
  console.log(`  - (city ILIKE '%${westlandsLocation.name}%' OR address ILIKE '%${westlandsLocation.name}%')`);

  const { data: westlandsApts } = await supabase
    .from('property_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('price_type', 'For Rent')
    .ilike('property_type', '%apartment%')
    .ilike('county', `%${westlandsLocation.county}%`)
    .or(`city.ilike.%${westlandsLocation.name}%,address.ilike.%${westlandsLocation.name}%`)
    .limit(5);

  console.log(`\n✅ Found ${westlandsApts?.length || 0} apartments`);

  if (westlandsApts && westlandsApts.length > 0) {
    westlandsApts.forEach(a => {
      console.log(`   - ${a.property_title.substring(0, 60)}`);
      console.log(`     City: "${a.city}" | County: "${a.county}"`);
    });
  } else {
    console.log('   ❌ NO RESULTS!');
  }

  console.log('\n' + '═'.repeat(70));
  console.log('🔎 DIAGNOSIS COMPLETE');
  console.log('═'.repeat(70));
}

debugLocationQuery();
