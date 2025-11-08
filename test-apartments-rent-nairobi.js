const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gsdctfcfkrtuxnwapjcj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzZGN0ZmNma3J0dXhud2FwamNqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTEzNDgzMCwiZXhwIjoyMDcwNzEwODMwfQ.TmCzZ3dyKOhN0V-6ezLAykzsJfAWcaVCt5Yx0gjMHLA';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testApartmentsRentNairobi() {
  console.log('Testing query for /apartments-for-rent-nairobi page...\n');

  // This mimics the fixed query
  const { data, error } = await supabase
    .from('property_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('property_type', 'Apartment')
    .eq('price_type', 'For Rent')
    .ilike('county', '%Nairobi%')
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(12);

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`✓ Found ${data.length} apartments for rent in Nairobi\n`);

  if (data.length > 0) {
    console.log('Sample listings:');
    data.slice(0, 5).forEach((listing, idx) => {
      console.log(`${idx + 1}. ${listing.property_title.substring(0, 60)}...`);
      console.log(`   ${listing.city}, ${listing.county} | ${listing.price_type}`);
    });
  }

  console.log('\n' + '='.repeat(80));
  console.log('✓ The page /apartments-for-rent-nairobi should now show listings!');
  console.log('='.repeat(80));
}

testApartmentsRentNairobi().catch(console.error);
