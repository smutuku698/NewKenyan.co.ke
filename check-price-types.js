const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = 'https://gsdctfcfkrtuxnwapjcj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzZGN0ZmNma3J0dXhud2FwamNqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTEzNDgzMCwiZXhwIjoyMDcwNzEwODMwfQ.TmCzZ3dyKOhN0V-6ezLAykzsJfAWcaVCt5Yx0gjMHLA';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkPriceTypes() {
  console.log('='.repeat(80));
  console.log('CHECKING PRICE_TYPE VALUES IN DATABASE');
  console.log('='.repeat(80));
  console.log('');

  // Get distinct price_type values
  const { data: listings, error } = await supabase
    .from('property_listings')
    .select('price_type, property_type')
    .limit(1000);

  if (error) {
    console.error('Error:', error);
    return;
  }

  // Count unique price_type values
  const priceTypeCounts = {};
  const propertyTypeCounts = {};

  listings.forEach(listing => {
    const priceType = listing.price_type || 'NULL';
    const propertyType = listing.property_type || 'NULL';

    priceTypeCounts[priceType] = (priceTypeCounts[priceType] || 0) + 1;
    propertyTypeCounts[propertyType] = (propertyTypeCounts[propertyType] || 0) + 1;
  });

  console.log('PRICE_TYPE values found:');
  console.log('-'.repeat(40));
  Object.entries(priceTypeCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([type, count]) => {
      console.log(`  "${type}": ${count} listings`);
    });

  console.log('\n');
  console.log('PROPERTY_TYPE values found:');
  console.log('-'.repeat(40));
  Object.entries(propertyTypeCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([type, count]) => {
      console.log(`  "${type}": ${count} listings`);
    });

  console.log('\n' + '='.repeat(80));
  console.log('CONCLUSION:');
  console.log('-'.repeat(80));
  console.log('Your queries should use:');
  console.log('  .eq(\'price_type\', \'sale\')  NOT  .eq(\'price_type\', \'For Sale\')');
  console.log('  .eq(\'price_type\', \'rent\')  NOT  .eq(\'price_type\', \'For Rent\')');
  console.log('='.repeat(80));
}

checkPriceTypes().catch(console.error);
