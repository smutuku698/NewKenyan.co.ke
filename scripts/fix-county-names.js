/**
 * Fix County Names in Property Listings
 *
 * This script normalizes county names to match what the locations table expects.
 * The locations table uses the format: "Nairobi County", "Mombasa County", etc.
 * But properties just have "Nairobi", "Mombasa", etc.
 *
 * This causes queries to fail and no properties show on location pages.
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// County name mappings (from property DB -> to match locations table)
const COUNTY_MAPPINGS = {
  'Nairobi': 'Nairobi County',
  'Mombasa': 'Mombasa County',
  'Nakuru': 'Nakuru County',
  'Kiambu': 'Kiambu County',
  'Kisumu': 'Kisumu County',
  'Uasin Gishu': 'Uasin Gishu County',
  'Machakos': 'Machakos County',
  'Kajiado': 'Kajiado County',
  'Meru': 'Meru County',
  'Nyeri': 'Nyeri County',
  'Kakamega': 'Kakamega County',
  'Bungoma': 'Bungoma County',
  'Kilifi': 'Kilifi County',
  'Trans Nzoia': 'Trans Nzoia County',
  'Kericho': 'Kericho County',
  'Embu': 'Embu County',
  'Nandi': 'Nandi County',
  'Kwale': 'Kwale County',
  'Bomet': 'Bomet County',
  'Kirinyaga': 'Kirinyaga County',
  'Narok': 'Narok County',
  'Murang\'a': 'Murang\'a County',
  'Kisii': 'Kisii County',
  'Laikipia': 'Laikipia County',
  'Nyamira': 'Nyamira County',
  'Busia': 'Busia County',
  'Siaya': 'Siaya County',
  'Homa Bay': 'Homa Bay County',
  'Migori': 'Migori County',
  'Vihiga': 'Vihiga County',
  'Elgeyo Marakwet': 'Elgeyo-Marakwet County',
  'Elgeyo-Marakwet': 'Elgeyo-Marakwet County',
  'Baringo': 'Baringo County',
  'Nyandarua': 'Nyandarua County',
  'Makueni': 'Makueni County',
  'Kitui': 'Kitui County',
  'Tharaka Nithi': 'Tharaka Nithi County',
  'Taita Taveta': 'Taita Taveta County',
  'Lamu': 'Lamu County',
  'Tana River': 'Tana River County',
  'Garissa': 'Garissa County',
  'Wajir': 'Wajir County',
  'Mandera': 'Mandera County',
  'Marsabit': 'Marsabit County',
  'Isiolo': 'Isiolo County',
  'Samburu': 'Samburu County',
  'Turkana': 'Turkana County',
  'West Pokot': 'West Pokot County',
  'Eldoret': 'Uasin Gishu County', // Eldoret is in Uasin Gishu County

  // Already correct (with " County" suffix) - map to themselves
  'Nairobi County': 'Nairobi County',
  'Mombasa County': 'Mombasa County',
  'Nakuru County': 'Nakuru County',
  'Kiambu County': 'Kiambu County',
  'Kisumu County': 'Kisumu County',
  'Uasin Gishu County': 'Uasin Gishu County',
  'Machakos County': 'Machakos County',
  'Kajiado County': 'Kajiado County',
  'Meru County': 'Meru County',
  'Nyeri County': 'Nyeri County',
  'Kakamega County': 'Kakamega County',
  'Bungoma County': 'Bungoma County',
  'Kilifi County': 'Kilifi County',
  'Trans Nzoia County': 'Trans Nzoia County',
  'Kericho County': 'Kericho County',
  'Embu County': 'Embu County',
  'Nandi County': 'Nandi County',
  'Kwale County': 'Kwale County',
  'Bomet County': 'Bomet County',
  'Kirinyaga County': 'Kirinyaga County',
  'Narok County': 'Narok County',
  'Murang\'a County': 'Murang\'a County',
  'Kisii County': 'Kisii County',
  'Laikipia County': 'Laikipia County',
  'Nyamira County': 'Nyamira County',
  'Busia County': 'Busia County',
  'Siaya County': 'Siaya County',
  'Homa Bay County': 'Homa Bay County',
  'Migori County': 'Migori County',
  'Vihiga County': 'Vihiga County',
  'Elgeyo-Marakwet County': 'Elgeyo-Marakwet County',
  'Baringo County': 'Baringo County',
  'Nyandarua County': 'Nyandarua County',
  'Makueni County': 'Makueni County',
  'Kitui County': 'Kitui County',
  'Tharaka Nithi County': 'Tharaka Nithi County',
  'Taita Taveta County': 'Taita Taveta County',
  'Lamu County': 'Lamu County',
  'Tana River County': 'Tana River County',
  'Garissa County': 'Garissa County',
  'Wajir County': 'Wajir County',
  'Mandera County': 'Mandera County',
  'Marsabit County': 'Marsabit County',
  'Isiolo County': 'Isiolo County',
  'Samburu County': 'Samburu County',
  'Turkana County': 'Turkana County',
  'West Pokot County': 'West Pokot County',

  // Handle variations in existing data
  'Muranga': 'Murang\'a County',
  'Tharaka-Nithi': 'Tharaka Nithi County',
};

async function fixCountyNames() {
  console.log('\n' + '═'.repeat(70));
  console.log('🔧 FIXING COUNTY NAMES IN PROPERTY LISTINGS');
  console.log('═'.repeat(70));

  // Get all properties (no limit - get everything)
  let allProperties = [];
  let from = 0;
  const pageSize = 1000;

  while (true) {
    const { data: properties, error } = await supabase
      .from('property_listings')
      .select('id, county')
      .range(from, from + pageSize - 1);

    if (error) {
      console.error('❌ Error fetching properties:', error);
      break;
    }

    if (!properties || properties.length === 0) break;

    allProperties = allProperties.concat(properties);
    from += pageSize;

    if (properties.length < pageSize) break;
  }

  const properties = allProperties;

  console.log(`\n📊 Total properties to check: ${properties.length}`);

  let updatedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  // Group by current county name
  const countyCounts = {};
  properties.forEach(p => {
    if (p.county) {
      countyCounts[p.county] = (countyCounts[p.county] || 0) + 1;
    }
  });

  console.log('\n📍 Current county distribution:');
  Object.entries(countyCounts).sort((a, b) => b[1] - a[1]).forEach(([county, count]) => {
    const mapped = COUNTY_MAPPINGS[county];
    const status = mapped && mapped !== county ? '🔄' : '✓';
    console.log(`   ${status} "${county}": ${count} properties${mapped && mapped !== county ? ` -> "${mapped}"` : ''}`);
  });

  console.log('\n🔄 Updating properties...\n');

  // Update properties in batches
  const BATCH_SIZE = 50;
  for (let i = 0; i < properties.length; i += BATCH_SIZE) {
    const batch = properties.slice(i, i + BATCH_SIZE);

    for (const property of batch) {
      const currentCounty = property.county;
      const newCounty = COUNTY_MAPPINGS[currentCounty];

      if (!newCounty) {
        console.log(`⚠️  [${property.id}] Unknown county: "${currentCounty}"`);
        skippedCount++;
        continue;
      }

      if (currentCounty === newCounty) {
        skippedCount++;
        continue;
      }

      // Update the property
      const { error: updateError } = await supabase
        .from('property_listings')
        .update({ county: newCounty })
        .eq('id', property.id);

      if (updateError) {
        console.error(`❌ [${property.id}] Error updating: ${updateError.message}`);
        errorCount++;
      } else {
        updatedCount++;
        if (updatedCount % 50 === 0) {
          console.log(`   ✅ Updated ${updatedCount} properties...`);
        }
      }
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('\n' + '═'.repeat(70));
  console.log('✅ UPDATE COMPLETE');
  console.log('═'.repeat(70));
  console.log(`✅ Updated: ${updatedCount} properties`);
  console.log(`⏭️  Skipped (already correct): ${skippedCount} properties`);
  console.log(`❌ Errors: ${errorCount} properties`);
  console.log('═'.repeat(70));

  // Verify the fix
  console.log('\n🔍 Verifying fix...\n');

  const { data: updatedProps } = await supabase
    .from('property_listings')
    .select('county');

  const newCountyCounts = {};
  updatedProps?.forEach(p => {
    if (p.county) {
      newCountyCounts[p.county] = (newCountyCounts[p.county] || 0) + 1;
    }
  });

  console.log('📍 New county distribution:');
  Object.entries(newCountyCounts).sort((a, b) => b[1] - a[1]).slice(0, 15).forEach(([county, count]) => {
    console.log(`   ✓ "${county}": ${count} properties`);
  });

  console.log('\n💡 Next Steps:');
  console.log('   1. Test a location page (e.g., /houses-for-sale/nairobi-county)');
  console.log('   2. Verify properties are now showing');
  console.log('   3. Check neighborhood pages (e.g., /apartments-for-rent/westlands)\n');
}

if (require.main === module) {
  fixCountyNames()
    .then(() => {
      console.log('✅ Script completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Script failed:', error);
      process.exit(1);
    });
}

module.exports = { fixCountyNames };
