const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = 'https://gsdctfcfkrtuxnwapjcj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzZGN0ZmNma3J0dXhud2FwamNqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTEzNDgzMCwiZXhwIjoyMDcwNzEwODMwfQ.TmCzZ3dyKOhN0V-6ezLAykzsJfAWcaVCt5Yx0gjMHLA';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkActualCounties() {
  console.log('='.repeat(80));
  console.log('CHECKING ACTUAL COUNTY VALUES IN DATABASE');
  console.log('='.repeat(80));
  console.log('');

  // Get all listings
  const { data: listings, error } = await supabase
    .from('property_listings')
    .select('county, city, address')
    .eq('is_approved', true);

  if (error) {
    console.error('Error:', error);
    return;
  }

  // Count unique county values
  const countyCounts = {};
  const cityCounts = {};

  listings.forEach(listing => {
    const county = listing.county || 'NULL';
    const city = listing.city || 'NULL';

    countyCounts[county] = (countyCounts[county] || 0) + 1;
    cityCounts[city] = (cityCounts[city] || 0) + 1;
  });

  console.log('COUNTY values in database (sorted by count):');
  console.log('-'.repeat(80));
  Object.entries(countyCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([county, count]) => {
      console.log(`  "${county}": ${count} listings`);
    });

  console.log('\n');
  console.log('CITY values in database (top 30):');
  console.log('-'.repeat(80));
  Object.entries(cityCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30)
    .forEach(([city, count]) => {
      console.log(`  "${city}": ${count} listings`);
    });

  console.log('\n');
  console.log('Sample listings with county and city:');
  console.log('-'.repeat(80));
  listings.slice(0, 10).forEach((listing, idx) => {
    console.log(`${idx + 1}. County: "${listing.county}", City: "${listing.city}"`);
    console.log(`   Address: "${listing.address}"`);
  });

  console.log('\n' + '='.repeat(80));
}

checkActualCounties().catch(console.error);
