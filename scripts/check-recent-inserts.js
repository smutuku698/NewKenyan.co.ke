require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkRecentInserts() {
  console.log('Checking recently inserted properties...\n');

  // Get the most recent properties (sorted by created_at)
  const { data: properties, error } = await supabase
    .from('property_listings')
    .select('id, property_title, county, city, property_type, created_at')
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Last 50 properties inserted:\n`);
  properties.forEach((prop, idx) => {
    console.log(`${idx + 1}. ${prop.county} - ${prop.city} - ${prop.property_type} - "${prop.property_title.substring(0, 60)}..."`);
  });

  // Check for specific counties
  console.log('\n\nChecking specific counties:');
  console.log('═'.repeat(60));

  const testCounties = ['Nakuru', 'Kisumu', 'Uasin Gishu', 'Trans Nzoia', 'Turkana'];

  for (const county of testCounties) {
    const { data, error, count } = await supabase
      .from('property_listings')
      .select('id', { count: 'exact' })
      .eq('county', county);

    console.log(`${county}: ${count || 0} properties`);
  }
}

checkRecentInserts();
