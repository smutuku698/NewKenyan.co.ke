/**
 * Check Neighborhood Location Coverage
 *
 * This script verifies that all neighborhood locations have property listings
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkNeighborhoodCoverage() {
  console.log('\n' + '═'.repeat(70));
  console.log('🏘️  CHECKING NEIGHBORHOOD LOCATION COVERAGE');
  console.log('═'.repeat(70));

  // Get all locations
  const { data: locations, error: locError } = await supabase
    .from('locations')
    .select('*')
    .eq('is_active', true)
    .order('type', { ascending: true })
    .order('name', { ascending: true });

  if (locError) {
    console.error('❌ Error fetching locations:', locError);
    return;
  }

  console.log(`\n📍 Total active locations: ${locations.length}`);

  // Group by type
  const byType = {
    county: [],
    neighborhood: [],
    estate: []
  };

  locations.forEach(loc => {
    if (byType[loc.type]) {
      byType[loc.type].push(loc);
    }
  });

  console.log(`   - Counties: ${byType.county.length}`);
  console.log(`   - Neighborhoods: ${byType.neighborhood.length}`);
  console.log(`   - Estates: ${byType.estate.length}`);

  // Check property counts for each location type
  const results = {
    withProperties: [],
    withoutProperties: []
  };

  console.log('\n🔍 Checking property matches for all locations...\n');

  for (const location of locations) {
    // Build query like the page does
    let query = supabase
      .from('property_listings')
      .select('id', { count: 'exact', head: true })
      .eq('is_approved', true);

    if (location.type === 'county') {
      // Match county
      query = query.ilike('county', `%${location.name}%`);
    } else if (location.type === 'neighborhood') {
      // Match county AND (city OR address contains neighborhood name)
      query = query
        .ilike('county', `%${location.county}%`)
        .or(`city.ilike.%${location.name}%,address.ilike.%${location.name}%`);
    } else if (location.type === 'estate') {
      // Match county AND address contains estate name
      query = query
        .ilike('county', `%${location.county}%`)
        .ilike('address', `%${location.name}%`);
    }

    const { count, error } = await query;

    if (error) {
      console.error(`❌ Error querying ${location.name}:`, error.message);
      continue;
    }

    const locationInfo = {
      name: location.name,
      slug: location.slug,
      type: location.type,
      county: location.county,
      city: location.city,
      count: count || 0
    };

    if (count && count > 0) {
      results.withProperties.push(locationInfo);
    } else {
      results.withoutProperties.push(locationInfo);
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 50));
  }

  // Display results
  console.log('═'.repeat(70));
  console.log('📊 RESULTS BY LOCATION TYPE');
  console.log('═'.repeat(70));

  // Counties
  const countiesWithProps = results.withProperties.filter(l => l.type === 'county');
  const countiesWithoutProps = results.withoutProperties.filter(l => l.type === 'county');

  console.log('\n📍 COUNTIES:');
  console.log(`   ✅ With properties: ${countiesWithProps.length}/${byType.county.length}`);
  console.log(`   ❌ Without properties: ${countiesWithoutProps.length}/${byType.county.length}`);

  if (countiesWithoutProps.length > 0) {
    console.log('\n   Missing properties:');
    countiesWithoutProps.forEach(loc => {
      console.log(`      ❌ ${loc.name} (${loc.slug})`);
    });
  }

  // Neighborhoods
  const neighborhoodsWithProps = results.withProperties.filter(l => l.type === 'neighborhood');
  const neighborhoodsWithoutProps = results.withoutProperties.filter(l => l.type === 'neighborhood');

  console.log('\n🏘️  NEIGHBORHOODS:');
  console.log(`   ✅ With properties: ${neighborhoodsWithProps.length}/${byType.neighborhood.length}`);
  console.log(`   ❌ Without properties: ${neighborhoodsWithoutProps.length}/${byType.neighborhood.length}`);

  if (neighborhoodsWithoutProps.length > 0) {
    console.log('\n   Missing properties:');
    neighborhoodsWithoutProps.slice(0, 20).forEach(loc => {
      console.log(`      ❌ ${loc.name} in ${loc.county} (${loc.slug})`);
    });
    if (neighborhoodsWithoutProps.length > 20) {
      console.log(`      ... and ${neighborhoodsWithoutProps.length - 20} more`);
    }
  }

  // Show sample neighborhoods WITH properties
  if (neighborhoodsWithProps.length > 0) {
    console.log('\n   ✅ Sample neighborhoods WITH properties:');
    neighborhoodsWithProps.slice(0, 10).forEach(loc => {
      console.log(`      ✅ ${loc.name}: ${loc.count} properties`);
    });
  }

  // Estates
  const estatesWithProps = results.withProperties.filter(l => l.type === 'estate');
  const estatesWithoutProps = results.withoutProperties.filter(l => l.type === 'estate');

  console.log('\n🏢 ESTATES:');
  console.log(`   ✅ With properties: ${estatesWithProps.length}/${byType.estate.length}`);
  console.log(`   ❌ Without properties: ${estatesWithoutProps.length}/${byType.estate.length}`);

  if (estatesWithoutProps.length > 0) {
    console.log('\n   Missing properties:');
    estatesWithoutProps.slice(0, 10).forEach(loc => {
      console.log(`      ❌ ${loc.name} in ${loc.county} (${loc.slug})`);
    });
    if (estatesWithoutProps.length > 10) {
      console.log(`      ... and ${estatesWithoutProps.length - 10} more`);
    }
  }

  // Overall summary
  console.log('\n' + '═'.repeat(70));
  console.log('📈 OVERALL SUMMARY');
  console.log('═'.repeat(70));
  console.log(`✅ Locations with properties: ${results.withProperties.length}/${locations.length} (${Math.round(results.withProperties.length / locations.length * 100)}%)`);
  console.log(`❌ Locations without properties: ${results.withoutProperties.length}/${locations.length} (${Math.round(results.withoutProperties.length / locations.length * 100)}%)`);

  // Top locations by property count
  console.log('\n🏆 TOP 15 LOCATIONS BY PROPERTY COUNT:');
  results.withProperties
    .sort((a, b) => b.count - a.count)
    .slice(0, 15)
    .forEach((loc, idx) => {
      console.log(`   ${idx + 1}. ${loc.name} (${loc.type}): ${loc.count} properties`);
    });

  console.log('\n' + '═'.repeat(70));
}

if (require.main === module) {
  checkNeighborhoodCoverage()
    .then(() => {
      console.log('✅ Check complete!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Script failed:', error);
      process.exit(1);
    });
}

module.exports = { checkNeighborhoodCoverage };
