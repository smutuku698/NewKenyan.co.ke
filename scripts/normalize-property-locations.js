/**
 * Normalize Property Location Data
 *
 * Ensures property county/city names match the location names in the locations table
 * for proper filtering on dynamic location pages.
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function normalizePropertyLocations() {
  console.log('\n' + '═'.repeat(70));
  console.log('🔧 NORMALIZING PROPERTY LOCATION DATA');
  console.log('═'.repeat(70));

  // Step 1: Get all locations from database
  const { data: locations, error: locsError } = await supabase
    .from('locations')
    .select('name, slug, type, county')
    .eq('is_active', true);

  if (locsError) {
    console.error('❌ Error fetching locations:', locsError.message);
    return;
  }

  console.log(`✅ Loaded ${locations.length} active locations`);

  // Step 2: Get all properties
  const { data: properties, error: propsError } = await supabase
    .from('property_listings')
    .select('id, county, city, address');

  if (propsError) {
    console.error('❌ Error fetching properties:', propsError.message);
    return;
  }

  console.log(`✅ Loaded ${properties.length} properties`);

  // Step 3: Build location lookup maps
  const countyLocations = locations
    .filter(loc => loc.type === 'county')
    .reduce((acc, loc) => {
      acc[loc.name.toLowerCase()] = loc.name;
      return acc;
    }, {});

  const neighborhoodLocations = locations
    .filter(loc => loc.type === 'neighborhood' || loc.type === 'estate')
    .reduce((acc, loc) => {
      const key = loc.name.toLowerCase();
      if (!acc[key]) acc[key] = [];
      acc[key].push(loc);
      return acc;
    }, {});

  console.log(`\n📍 County locations to match: ${Object.keys(countyLocations).length}`);
  console.log(`📍 Neighborhood/estate locations: ${Object.keys(neighborhoodLocations).length}`);

  // Step 4: Normalize property data
  let updatedCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  console.log('\n🔄 Processing properties...\n');

  for (const property of properties) {
    try {
      let needsUpdate = false;
      const updates = {};

      // Normalize county
      if (property.county) {
        const normalizedCounty = property.county.toLowerCase().trim();

        // Check if county needs normalization
        if (countyLocations[normalizedCounty] && countyLocations[normalizedCounty] !== property.county) {
          updates.county = countyLocations[normalizedCounty];
          needsUpdate = true;
        }

        // Handle "Nairobi County" -> "Nairobi"
        if (normalizedCounty.includes('county')) {
          const withoutCounty = normalizedCounty.replace(/\s*county\s*/g, '').trim();
          if (countyLocations[withoutCounty]) {
            updates.county = countyLocations[withoutCounty];
            needsUpdate = true;
          }
        }
      }

      // Normalize city/neighborhood
      if (property.city) {
        const normalizedCity = property.city.toLowerCase().trim();

        // Check if city matches any neighborhood
        if (neighborhoodLocations[normalizedCity]) {
          const matchingLocs = neighborhoodLocations[normalizedCity];
          // If there's a matching neighborhood, use its exact name
          if (matchingLocs.length > 0 && matchingLocs[0].name !== property.city) {
            updates.city = matchingLocs[0].name;
            needsUpdate = true;
          }
        }
      }

      // Update if needed
      if (needsUpdate && Object.keys(updates).length > 0) {
        const { error: updateError } = await supabase
          .from('property_listings')
          .update(updates)
          .eq('id', property.id);

        if (updateError) {
          console.error(`❌ [${property.id}] Update failed: ${updateError.message}`);
          errorCount++;
        } else {
          updatedCount++;
          console.log(`✅ [${updatedCount}] Updated: ${Object.keys(updates).join(', ')}`);
        }

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 50));
      } else {
        skipCount++;
      }

    } catch (error) {
      console.error(`❌ Error processing property ${property.id}:`, error.message);
      errorCount++;
    }
  }

  // Step 5: Summary
  console.log('\n' + '═'.repeat(70));
  console.log('📊 NORMALIZATION SUMMARY');
  console.log('═'.repeat(70));
  console.log(`✅ Properties updated: ${updatedCount}`);
  console.log(`⏭️  Properties skipped (no changes): ${skipCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log(`📁 Total processed: ${properties.length}`);
  console.log('═'.repeat(70));

  if (updatedCount > 0) {
    console.log('\n💡 Changes applied! Location pages should now display more properties.');
  }
}

// Run normalization
normalizePropertyLocations()
  .then(() => {
    console.log('\n✅ Normalization complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Normalization failed:', error);
    process.exit(1);
  });
