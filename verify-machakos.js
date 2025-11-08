const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = '';
const supabaseKey = '';
const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyMachakos() {
  console.log('='.repeat(80));
  console.log('VERIFYING MACHAKOS COUNTY LISTINGS');
  console.log('='.repeat(80));
  console.log('');

  // Get all listings for Machakos
  const { data, error } = await supabase
    .from('property_listings')
    .select('property_title, property_type, price_type, city, county, is_approved')
    .eq('is_approved', true)
    .ilike('county', '%Machakos%');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Total approved listings in Machakos County: ${data.length}`);
  console.log('');

  // Group by page type
  const aptsRent = data.filter(d => d.property_type.toLowerCase().includes('apartment') && d.price_type === 'For Rent');
  const aptsSale = data.filter(d => d.property_type.toLowerCase().includes('apartment') && d.price_type === 'For Sale');
  const housesRent = data.filter(d => d.property_type.toLowerCase().includes('house') && d.price_type === 'For Rent');
  const housesSale = data.filter(d => d.property_type.toLowerCase().includes('house') && d.price_type === 'For Sale');

  console.log('By page type:');
  console.log(`  Apartments for Rent: ${aptsRent.length}`);
  console.log(`  Apartments for Sale: ${aptsSale.length}`);
  console.log(`  Houses for Rent: ${housesRent.length}`);
  console.log(`  Houses for Sale: ${housesSale.length}`);

  console.log('\n');
  console.log('Sample listings:');
  console.log('-'.repeat(80));
  data.slice(0, 10).forEach((listing, idx) => {
    console.log(`${idx + 1}. ${listing.property_title}`);
    console.log(`   Type: ${listing.property_type} | ${listing.price_type}`);
    console.log(`   City: ${listing.city}, County: ${listing.county}`);
  });

  console.log('\n' + '='.repeat(80));
  console.log('✓ https://newkenyan.com/apartments-for-rent/machakos-county/');
  console.log(`  Should now show ${aptsRent.length} apartments for rent`);
  console.log('='.repeat(80));
}

verifyMachakos().catch(console.error);
