/**
 * Homepage Links Verification Script
 *
 * Verifies that all major homepage links return property results
 * from the database after data upload is complete.
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Test queries that correspond to homepage links
const testQueries = [
  {
    name: 'Houses for Rent Nairobi County',
    query: async () => {
      const { data, error } = await supabase
        .from('property_listings')
        .select('id')
        .eq('is_approved', true)
        .eq('price_type', 'For Rent')
        .ilike('property_type', '%house%')
        .ilike('county', '%Nairobi%')
        .limit(1);
      return { count: data?.length || 0, error };
    }
  },
  {
    name: 'Apartments for Rent Nairobi County',
    query: async () => {
      const { data, error } = await supabase
        .from('property_listings')
        .select('id')
        .eq('is_approved', true)
        .eq('price_type', 'For Rent')
        .ilike('property_type', '%apartment%')
        .ilike('county', '%Nairobi%')
        .limit(1);
      return { count: data?.length || 0, error };
    }
  },
  {
    name: 'Bedsitters for Rent Nairobi County',
    query: async () => {
      const { data, error } = await supabase
        .from('property_listings')
        .select('id')
        .eq('is_approved', true)
        .eq('price_type', 'For Rent')
        .ilike('property_type', '%bedsitter%')
        .ilike('county', '%Nairobi%')
        .limit(1);
      return { count: data?.length || 0, error };
    }
  },
  {
    name: '2 Bedroom Apartments Westlands',
    query: async () => {
      const { data, error } = await supabase
        .from('property_listings')
        .select('id')
        .eq('is_approved', true)
        .ilike('property_type', '%apartment%')
        .eq('bedrooms', 2)
        .or('city.ilike.%Westlands%,address.ilike.%Westlands%')
        .limit(1);
      return { count: data?.length || 0, error };
    }
  },
  {
    name: 'Bedsitter Kasarani Under 10K',
    query: async () => {
      const { data, error } = await supabase
        .from('property_listings')
        .select('id')
        .eq('is_approved', true)
        .ilike('property_type', '%bedsitter%')
        .or('city.ilike.%Kasarani%,address.ilike.%Kasarani%')
        .lte('price', 10000)
        .limit(1);
      return { count: data?.length || 0, error };
    }
  },
  {
    name: 'Houses for Sale Nairobi',
    query: async () => {
      const { data, error } = await supabase
        .from('property_listings')
        .select('id')
        .eq('is_approved', true)
        .eq('price_type', 'For Sale')
        .ilike('property_type', '%house%')
        .ilike('county', '%Nairobi%')
        .limit(1);
      return { count: data?.length || 0, error };
    }
  },
  {
    name: 'Apartments for Sale Nairobi',
    query: async () => {
      const { data, error } = await supabase
        .from('property_listings')
        .select('id')
        .eq('is_approved', true)
        .eq('price_type', 'For Sale')
        .ilike('property_type', '%apartment%')
        .ilike('county', '%Nairobi%')
        .limit(1);
      return { count: data?.length || 0, error };
    }
  },
  {
    name: 'All Properties (General Browse)',
    query: async () => {
      const { data, error } = await supabase
        .from('property_listings')
        .select('id')
        .eq('is_approved', true)
        .limit(1);
      return { count: data?.length || 0, error };
    }
  },
  {
    name: 'Mombasa County Properties',
    query: async () => {
      const { data, error } = await supabase
        .from('property_listings')
        .select('id')
        .eq('is_approved', true)
        .ilike('county', '%Mombasa%')
        .limit(1);
      return { count: data?.length || 0, error };
    }
  },
  {
    name: 'Kiambu County Properties',
    query: async () => {
      const { data, error } = await supabase
        .from('property_listings')
        .select('id')
        .eq('is_approved', true)
        .ilike('county', '%Kiambu%')
        .limit(1);
      return { count: data?.length || 0, error };
    }
  }
];

async function verifyHomepageLinks() {
  console.log('\n' + '═'.repeat(70));
  console.log('🔍 HOMEPAGE LINKS VERIFICATION');
  console.log('═'.repeat(70));
  console.log('Testing that all major homepage links return property results...\n');

  let passedCount = 0;
  let failedCount = 0;
  const failures = [];

  for (const test of testQueries) {
    try {
      const result = await test.query();

      if (result.error) {
        console.log(`❌ ${test.name}: Query Error - ${result.error.message}`);
        failedCount++;
        failures.push({ name: test.name, reason: `Query Error: ${result.error.message}` });
      } else if (result.count === 0) {
        console.log(`⚠️  ${test.name}: No results found`);
        failedCount++;
        failures.push({ name: test.name, reason: 'No properties match this query' });
      } else {
        console.log(`✅ ${test.name}: ${result.count} result(s) found`);
        passedCount++;
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));

    } catch (error) {
      console.log(`❌ ${test.name}: Exception - ${error.message}`);
      failedCount++;
      failures.push({ name: test.name, reason: `Exception: ${error.message}` });
    }
  }

  // Summary
  console.log('\n' + '═'.repeat(70));
  console.log('📊 VERIFICATION SUMMARY');
  console.log('═'.repeat(70));
  console.log(`✅ Tests Passed: ${passedCount}/${testQueries.length}`);
  console.log(`❌ Tests Failed: ${failedCount}/${testQueries.length}`);
  console.log(`📈 Success Rate: ${Math.round((passedCount / testQueries.length) * 100)}%`);

  if (failures.length > 0) {
    console.log('\n⚠️  FAILED TESTS:');
    failures.forEach((failure, idx) => {
      console.log(`   ${idx + 1}. ${failure.name}`);
      console.log(`      Reason: ${failure.reason}`);
    });

    console.log('\n💡 RECOMMENDED ACTIONS:');
    console.log('   1. Check that property data has correct county names');
    console.log('   2. Verify property_type field contains expected values');
    console.log('   3. Ensure price_type is normalized to "For Sale" or "For Rent"');
    console.log('   4. Review city/address fields for neighborhood searches');
  } else {
    console.log('\n🎉 ALL TESTS PASSED!');
    console.log('   All homepage links should return property results.');
    console.log('   Website is ready for production!');
  }

  console.log('\n' + '═'.repeat(70));
}

// Run verification
verifyHomepageLinks()
  .then(() => {
    console.log('\n✅ Verification complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Verification failed:', error);
    process.exit(1);
  });
