// Debug script to diagnose missing property listings
// Run with: node debug-queries.js

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugQueries() {
  console.log('=== PROPERTY LISTINGS DIAGNOSTIC ===\n');

  // 1. Check total properties
  console.log('1. Total Properties Check:');
  const { data: allProps, error: allError } = await supabase
    .from('property_listings')
    .select('id, property_type, price_type', { count: 'exact' });

  console.log(`   Total properties: ${allProps?.length || 0}`);
  if (allError) console.error('   Error:', allError);

  // 2. Count by property type
  console.log('\n2. Properties by Type:');
  const types = {};
  allProps?.forEach(p => {
    types[p.property_type] = (types[p.property_type] || 0) + 1;
  });
  Object.entries(types).sort((a, b) => b[1] - a[1]).forEach(([type, count]) => {
    console.log(`   ${type}: ${count}`);
  });

  // 3. Check for apartments in Nairobi
  console.log('\n3. Apartments for Rent in Nairobi County:');
  const { data: apartments, error: aptError } = await supabase
    .from('property_listings')
    .select('id, property_title, property_type, city, county, address, bedrooms')
    .eq('is_approved', true)
    .eq('price_type', 'rent')
    .ilike('property_type', '%apartment%')
    .ilike('county', '%Nairobi%');

  console.log(`   Found: ${apartments?.length || 0} apartments`);
  if (apartments?.length > 0) {
    console.log('   First 5:');
    apartments.slice(0, 5).forEach(apt => {
      console.log(`     - ${apt.property_title} | ${apt.city} | ${apt.bedrooms}BR`);
    });
  }
  if (aptError) console.error('   Error:', aptError);

  // 4. Check for apartments in Westlands specifically
  console.log('\n4. 2BR Apartments in Westlands (with city param):');
  const { data: westlandsApts, error: westError } = await supabase
    .from('property_listings')
    .select('id, property_title, city, address, bedrooms')
    .eq('is_approved', true)
    .eq('price_type', 'rent')
    .ilike('property_type', '%apartment%')
    .ilike('county', '%Nairobi%')
    .eq('bedrooms', 2)
    .or('city.ilike.%Westlands%,address.ilike.%Westlands%');

  console.log(`   Found: ${westlandsApts?.length || 0} apartments`);
  if (westlandsApts?.length > 0) {
    westlandsApts.forEach(apt => {
      console.log(`     - ${apt.property_title} | ${apt.city} | ${apt.address}`);
    });
  }
  if (westError) console.error('   Error:', westError);

  // 5. Check locations table
  console.log('\n5. Locations Table Check:');
  const { data: nairobiCounty } = await supabase
    .from('locations')
    .select('*')
    .eq('slug', 'nairobi-county')
    .single();

  if (nairobiCounty) {
    console.log('   ✓ Location "nairobi-county" exists');
    console.log(`     Name: ${nairobiCounty.name}`);
    console.log(`     Type: ${nairobiCounty.type}`);
    console.log(`     County: ${nairobiCounty.county}`);
  } else {
    console.log('   ✗ Location "nairobi-county" NOT FOUND');
  }

  const { data: riversidePearl } = await supabase
    .from('locations')
    .select('*')
    .eq('slug', 'riverside-pearl-residence-nairobi-estate-nairobi')
    .single();

  if (riversidePearl) {
    console.log('   ✓ Location "riverside-pearl-residence-nairobi-estate-nairobi" exists');
    console.log(`     Name: ${riversidePearl.name}`);
    console.log(`     Type: ${riversidePearl.type}`);
    console.log(`     County: ${riversidePearl.county}`);
  } else {
    console.log('   ✗ Location "riverside-pearl-residence-nairobi-estate-nairobi" NOT FOUND');
  }

  // 6. Check for villas
  console.log('\n6. Villas for Sale:');
  const { data: villas, error: villaError } = await supabase
    .from('property_listings')
    .select('id, property_title, property_type, address, county')
    .eq('is_approved', true)
    .eq('price_type', 'sale')
    .ilike('property_type', '%villa%');

  console.log(`   Found: ${villas?.length || 0} villas`);
  if (villas?.length > 0) {
    console.log('   First 5:');
    villas.slice(0, 5).forEach(villa => {
      console.log(`     - ${villa.property_title} | ${villa.address}`);
    });
  }
  if (villaError) console.error('   Error:', villaError);

  // 7. Check what's in Westlands area
  console.log('\n7. All Properties in Westlands (any type):');
  const { data: westlandsAll } = await supabase
    .from('property_listings')
    .select('id, property_title, property_type, city, address')
    .eq('is_approved', true)
    .or('city.ilike.%Westlands%,address.ilike.%Westlands%')
    .limit(10);

  console.log(`   Found: ${westlandsAll?.length || 0} properties`);
  if (westlandsAll?.length > 0) {
    westlandsAll.forEach(prop => {
      console.log(`     - ${prop.property_type} | ${prop.property_title}`);
    });
  }

  // 8. Check county name variations
  console.log('\n8. County Name Variations:');
  const counties = new Set();
  allProps?.forEach(p => {
    if (p.county) counties.add(p.county);
  });
  console.log('   Unique county values:');
  Array.from(counties).sort().forEach(county => {
    console.log(`     - "${county}"`);
  });

  console.log('\n=== DIAGNOSTIC COMPLETE ===');
}

debugQueries().catch(console.error);
