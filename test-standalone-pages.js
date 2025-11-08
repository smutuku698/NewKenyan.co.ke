const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gsdctfcfkrtuxnwapjcj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzZGN0ZmNma3J0dXhud2FwamNqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTEzNDgzMCwiZXhwIjoyMDcwNzEwODMwfQ.TmCzZ3dyKOhN0V-6ezLAykzsJfAWcaVCt5Yx0gjMHLA';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testStandalonePages() {
  console.log('='.repeat(80));
  console.log('TESTING STANDALONE PAGES');
  console.log('='.repeat(80));
  console.log('');

  const tests = [
    {
      name: 'Houses for Sale (Main Page)',
      url: '/houses-for-sale',
      query: async () => {
        const { data } = await supabase
          .from('property_listings')
          .select('*')
          .eq('is_approved', true)
          .eq('price_type', 'For Sale')
          .ilike('property_type', '%house%')
          .order('is_featured', { ascending: false })
          .order('created_at', { ascending: false })
          .limit(12);
        return data;
      }
    },
    {
      name: 'Apartments for Sale (Main Page)',
      url: '/apartments-for-sale',
      query: async () => {
        const { data } = await supabase
          .from('property_listings')
          .select('*')
          .eq('is_approved', true)
          .eq('price_type', 'For Sale')
          .ilike('property_type', '%apartment%')
          .order('is_featured', { ascending: false })
          .order('created_at', { ascending: false })
          .limit(12);
        return data;
      }
    },
    {
      name: 'Houses for Rent (Main Page)',
      url: '/houses-for-rent',
      query: async () => {
        const { data } = await supabase
          .from('property_listings')
          .select('*')
          .eq('is_approved', true)
          .eq('price_type', 'For Rent')
          .ilike('property_type', '%house%')
          .order('is_featured', { ascending: false })
          .order('created_at', { ascending: false })
          .limit(12);
        return data;
      }
    },
    {
      name: 'Apartments for Rent (Main Page)',
      url: '/apartments-for-rent',
      query: async () => {
        const { data } = await supabase
          .from('property_listings')
          .select('*')
          .eq('is_approved', true)
          .eq('price_type', 'For Rent')
          .ilike('property_type', '%apartment%')
          .order('is_featured', { ascending: false })
          .order('created_at', { ascending: false })
          .limit(12);
        return data;
      }
    }
  ];

  for (const test of tests) {
    console.log(`Testing: ${test.name}`);
    console.log(`URL: ${test.url}`);
    console.log('-'.repeat(80));

    const results = await test.query();

    if (results && results.length > 0) {
      console.log(`✓ Found ${results.length} listings`);
      console.log('\nSample listings:');
      results.slice(0, 5).forEach((listing, idx) => {
        console.log(`  ${idx + 1}. ${listing.property_title.substring(0, 60)}...`);
        console.log(`     ${listing.city}, ${listing.county} | ${listing.price_type}`);
      });
    } else {
      console.log(`❌ No listings found`);
    }

    console.log('\n');
  }

  console.log('='.repeat(80));
  console.log('SUMMARY');
  console.log('='.repeat(80));

  // Get total counts
  const { data: allListings } = await supabase
    .from('property_listings')
    .select('property_type, price_type')
    .eq('is_approved', true);

  const stats = {
    housesForSale: allListings.filter(l => l.property_type.toLowerCase().includes('house') && l.price_type === 'For Sale').length,
    housesForRent: allListings.filter(l => l.property_type.toLowerCase().includes('house') && l.price_type === 'For Rent').length,
    aptsForSale: allListings.filter(l => l.property_type.toLowerCase().includes('apartment') && l.price_type === 'For Sale').length,
    aptsForRent: allListings.filter(l => l.property_type.toLowerCase().includes('apartment') && l.price_type === 'For Rent').length,
  };

  console.log(`Total Houses for Sale: ${stats.housesForSale}`);
  console.log(`Total Houses for Rent: ${stats.housesForRent}`);
  console.log(`Total Apartments for Sale: ${stats.aptsForSale}`);
  console.log(`Total Apartments for Rent: ${stats.aptsForRent}`);
  console.log(`\nGrand Total: ${allListings.length} approved listings`);
  console.log('='.repeat(80));
}

testStandalonePages().catch(console.error);
