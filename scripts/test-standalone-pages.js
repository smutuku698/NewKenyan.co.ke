require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function testStandalonePages() {
  console.log('\n🔍 TESTING STANDALONE LOCATION PAGES\n');

  const tests = [
    {
      page: '/houses-for-rent-nairobi',
      query: { price_type: 'For Rent', property_type_like: '%house%', county_like: '%Nairobi%' }
    },
    {
      page: '/apartments-for-rent-nairobi',
      query: { price_type: 'For Rent', property_type_like: '%apartment%', county_like: '%Nairobi%' }
    },
    {
      page: '/bedsitter-nairobi',
      query: { property_type_like: '%bedsitter%', county_like: '%Nairobi%' }
    },
    {
      page: '/2-bedroom-apartment-nairobi',
      query: { property_type_like: '%apartment%', bedrooms: 2, county_like: '%Nairobi%' }
    },
    {
      page: '/apartments-westlands',
      query: { property_type_like: '%apartment%', city_like: '%Westlands%' }
    },
    {
      page: '/apartments-kilimani',
      query: { property_type_like: '%apartment%', city_like: '%Kilimani%' }
    }
  ];

  for (const test of tests) {
    let query = supabase.from('property_listings').select('id').eq('is_approved', true);

    if (test.query.price_type) query = query.eq('price_type', test.query.price_type);
    if (test.query.property_type_like) query = query.ilike('property_type', test.query.property_type_like);
    if (test.query.county_like) query = query.ilike('county', test.query.county_like);
    if (test.query.city_like) query = query.ilike('city', test.query.city_like);
    if (test.query.bedrooms) query = query.eq('bedrooms', test.query.bedrooms);

    const { data, error } = await query.limit(10);

    const status = data && data.length > 0 ? '✅' : '❌';
    const count = data ? data.length : 0;
    console.log(`${status} ${test.page.padEnd(40)} ${count} properties`);
  }
}

testStandalonePages();
