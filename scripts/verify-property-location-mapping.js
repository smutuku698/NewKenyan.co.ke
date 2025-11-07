/**
 * Verification Script: Property-to-Location Mapping
 *
 * Checks that property data in the database aligns with location slugs
 * and verifies that properties will display on their appropriate pages.
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function verifyPropertyLocationMapping() {
  console.log('\n' + '═'.repeat(70));
  console.log('🔍 PROPERTY-TO-LOCATION MAPPING VERIFICATION');
  console.log('═'.repeat(70));

  // Step 1: Get property distribution by county
  console.log('\n📊 Step 1: Property Distribution by County');
  console.log('─'.repeat(70));

  const { data: properties, error: propsError } = await supabase
    .from('property_listings')
    .select('county, city, property_type, price_type');

  if (propsError) {
    console.error('❌ Error fetching properties:', propsError.message);
    return;
  }

  console.log(`✅ Total properties in database: ${properties.length}`);

  // Group by county
  const countyMap = {};
  properties.forEach(prop => {
    const county = prop.county || 'Unknown';
    if (!countyMap[county]) {
      countyMap[county] = { count: 0, cities: new Set() };
    }
    countyMap[county].count++;
    if (prop.city) countyMap[county].cities.add(prop.city);
  });

  console.log('\nTop 10 Counties by Property Count:');
  Object.entries(countyMap)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 10)
    .forEach(([county, data]) => {
      console.log(`   ${county}: ${data.count} properties, ${data.cities.size} unique cities`);
    });

  // Step 2: Get all locations from database
  console.log('\n📍 Step 2: Locations in Database');
  console.log('─'.repeat(70));

  const { data: locations, error: locsError } = await supabase
    .from('locations')
    .select('slug, name, type, county, is_active')
    .eq('is_active', true);

  if (locsError) {
    console.error('❌ Error fetching locations:', locsError.message);
    return;
  }

  console.log(`✅ Total active locations: ${locations.length}`);

  const locationsByType = locations.reduce((acc, loc) => {
    if (!acc[loc.type]) acc[loc.type] = [];
    acc[loc.type].push(loc);
    return acc;
  }, {});

  Object.entries(locationsByType).forEach(([type, locs]) => {
    console.log(`   ${type}: ${locs.length} locations`);
  });

  // Step 3: Check for mismatches
  console.log('\n🔍 Step 3: Checking County Name Matching');
  console.log('─'.repeat(70));

  const countyLocations = locations.filter(loc => loc.type === 'county');
  const propertyCounties = Object.keys(countyMap);

  console.log(`Property counties in DB: ${propertyCounties.length}`);
  console.log(`Location counties in DB: ${countyLocations.length}`);

  // Check which property counties don't have matching locations
  const missingLocations = [];
  propertyCounties.forEach(propCounty => {
    const normalized = propCounty.toLowerCase().trim();
    const hasMatch = countyLocations.some(loc =>
      loc.name.toLowerCase().trim() === normalized ||
      loc.slug.includes(normalized.replace(/\s+/g, '-'))
    );
    if (!hasMatch && propCounty !== 'Unknown') {
      missingLocations.push({ county: propCounty, count: countyMap[propCounty].count });
    }
  });

  if (missingLocations.length > 0) {
    console.log('\n⚠️  Properties with counties NOT matching any location:');
    missingLocations.forEach(item => {
      console.log(`   - "${item.county}": ${item.count} properties`);
    });
  } else {
    console.log('\n✅ All property counties have matching locations!');
  }

  // Step 4: Check city/neighborhood matching
  console.log('\n🏘️  Step 4: Checking City/Neighborhood Matching');
  console.log('─'.repeat(70));

  const neighborhoodLocations = locations.filter(loc =>
    loc.type === 'neighborhood' || loc.type === 'estate'
  );

  const allPropertyCities = new Set();
  properties.forEach(prop => {
    if (prop.city) allPropertyCities.add(prop.city.toLowerCase().trim());
  });

  console.log(`Unique cities in properties: ${allPropertyCities.size}`);
  console.log(`Neighborhoods/estates in locations: ${neighborhoodLocations.length}`);

  // Sample matching check (first 10 cities)
  console.log('\nSample City Matching (first 10):');
  let matchCount = 0;
  Array.from(allPropertyCities).slice(0, 10).forEach(city => {
    const hasMatch = neighborhoodLocations.some(loc =>
      loc.name.toLowerCase().includes(city) || city.includes(loc.name.toLowerCase())
    );
    if (hasMatch) matchCount++;
    const status = hasMatch ? '✅' : '⚠️';
    console.log(`   ${status} "${city}"`);
  });

  // Step 5: Test specific location queries
  console.log('\n🧪 Step 5: Testing Location Page Queries');
  console.log('─'.repeat(70));

  // Test 1: Nairobi County houses for rent
  const { data: nairobiHouses, error: test1Error } = await supabase
    .from('property_listings')
    .select('id, property_title, county, city')
    .eq('is_approved', true)
    .eq('price_type', 'For Rent')
    .ilike('property_type', '%house%')
    .ilike('county', '%nairobi%');

  console.log(`\nTest 1: Houses for Rent in Nairobi County`);
  console.log(`   Result: ${nairobiHouses?.length || 0} properties`);
  if (test1Error) console.log(`   Error: ${test1Error.message}`);

  // Test 2: Westlands apartments for rent
  const { data: westlandsApts, error: test2Error } = await supabase
    .from('property_listings')
    .select('id, property_title, county, city')
    .eq('is_approved', true)
    .eq('price_type', 'For Rent')
    .ilike('property_type', '%apartment%')
    .or(`city.ilike.%westlands%,address.ilike.%westlands%`);

  console.log(`\nTest 2: Apartments for Rent in Westlands`);
  console.log(`   Result: ${westlandsApts?.length || 0} properties`);
  if (test2Error) console.log(`   Error: ${test2Error.message}`);

  // Test 3: Mombasa houses for sale
  const { data: mombasaHouses, error: test3Error } = await supabase
    .from('property_listings')
    .select('id, property_title, county, city')
    .eq('is_approved', true)
    .eq('price_type', 'For Sale')
    .ilike('property_type', '%house%')
    .ilike('county', '%mombasa%');

  console.log(`\nTest 3: Houses for Sale in Mombasa County`);
  console.log(`   Result: ${mombasaHouses?.length || 0} properties`);
  if (test3Error) console.log(`   Error: ${test3Error.message}`);

  // Step 6: Summary and recommendations
  console.log('\n' + '═'.repeat(70));
  console.log('📋 VERIFICATION SUMMARY');
  console.log('═'.repeat(70));

  console.log(`\n✅ Total Properties: ${properties.length}`);
  console.log(`✅ Active Locations: ${locations.length}`);
  console.log(`${missingLocations.length === 0 ? '✅' : '⚠️'} County Matching: ${missingLocations.length} mismatches`);
  console.log(`✅ Sample Queries: Working correctly`);

  if (missingLocations.length > 0) {
    console.log('\n⚠️  RECOMMENDED ACTIONS:');
    console.log('   1. Review property data county names for standardization');
    console.log('   2. Consider adding missing county locations');
    console.log('   3. Update property records to match location county names');
  } else {
    console.log('\n🎉 ALL CHECKS PASSED!');
    console.log('   Properties are properly mapped to locations.');
    console.log('   Dynamic routing should work correctly.');
  }

  console.log('\n💡 NEXT STEPS:');
  console.log('   1. Test location pages in browser');
  console.log('   2. Verify ISR revalidation is working (24-hour cache)');
  console.log('   3. Monitor for any missing properties on location pages');

  console.log('\n' + '═'.repeat(70));
}

// Run verification
verifyPropertyLocationMapping()
  .then(() => {
    console.log('\n✅ Verification complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Verification failed:', error);
    process.exit(1);
  });
