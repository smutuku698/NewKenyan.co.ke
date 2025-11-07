require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkPropertyTypes() {
  const { data, error } = await supabase
    .from('property_listings')
    .select('property_type, price_type, bedrooms, county')
    .limit(1000);

  if (error) {
    console.error('Error:', error);
    return;
  }

  const types = {};
  const priceTypes = {};
  const counties = {};

  data.forEach(prop => {
    types[prop.property_type] = (types[prop.property_type] || 0) + 1;
    priceTypes[prop.price_type] = (priceTypes[prop.price_type] || 0) + 1;
    counties[prop.county] = (counties[prop.county] || 0) + 1;
  });

  console.log('\nProperty Types:');
  Object.entries(types).sort((a, b) => b[1] - a[1]).forEach(([type, count]) => {
    console.log(`  ${type}: ${count}`);
  });

  console.log('\nPrice Types:');
  Object.entries(priceTypes).forEach(([type, count]) => {
    console.log(`  ${type}: ${count}`);
  });

  console.log('\nTop Counties:');
  Object.entries(counties).sort((a, b) => b[1] - a[1]).slice(0, 5).forEach(([county, count]) => {
    console.log(`  ${county}: ${count}`);
  });
}

checkPropertyTypes();
