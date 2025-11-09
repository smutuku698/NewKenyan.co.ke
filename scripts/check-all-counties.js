require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkAllCounties() {
  console.log('Checking property distribution across all counties...\n');

  const { data: properties, error, count } = await supabase
    .from('property_listings')
    .select('county, property_type', { count: 'exact' });

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Total properties in database: ${count}\n`);

  // Group by county
  const countyCounts = {};
  properties.forEach(prop => {
    if (prop.county) {
      countyCounts[prop.county] = (countyCounts[prop.county] || 0) + 1;
    }
  });

  console.log('Properties per county (sorted by count):');
  console.log('═'.repeat(60));

  Object.entries(countyCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([county, count]) => {
      console.log(`${county}: ${count} properties`);
    });

  console.log('\n' + '═'.repeat(60));
  console.log(`Total counties with properties: ${Object.keys(countyCounts).length}`);
}

checkAllCounties();
