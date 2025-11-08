const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Initialize Supabase client
const supabaseUrl = 'https://gsdctfcfkrtuxnwapjcj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzZGN0ZmNma3J0dXhud2FwamNqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTEzNDgzMCwiZXhwIjoyMDcwNzEwODMwfQ.TmCzZ3dyKOhN0V-6ezLAykzsJfAWcaVCt5Yx0gjMHLA';
const supabase = createClient(supabaseUrl, supabaseKey);

// Kenya counties from locations.json
const counties = [
  "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo-Marakwet", "Embu",
  "Garissa", "Homa Bay", "Isiolo", "Kajiado", "Kakamega", "Kericho",
  "Kiambu", "Kilifi", "Kirinyaga", "Kisii", "Kisumu", "Kitui", "Kwale",
  "Laikipia", "Lamu", "Machakos", "Makueni", "Mandera", "Marsabit",
  "Meru", "Migori", "Mombasa", "Muranga", "Nairobi", "Nakuru",
  "Nandi", "Narok", "Nyamira", "Nyandarua", "Nyeri", "Samburu",
  "Siaya", "Taita Taveta", "Tana River", "Tharaka-Nithi", "Trans Nzoia",
  "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot"
];

async function checkCountyCoverage() {
  console.log('='.repeat(80));
  console.log('CHECKING PROPERTY COVERAGE BY COUNTY');
  console.log('='.repeat(80));
  console.log('');

  const results = [];

  for (const county of counties) {
    // Count total properties
    const { data: total, error: totalError } = await supabase
      .from('property_listings')
      .select('id', { count: 'exact', head: true })
      .eq('is_approved', true)
      .ilike('county', `%${county}%`);

    // Count apartments for rent
    const { data: aptsRent, error: aptsRentError } = await supabase
      .from('property_listings')
      .select('id', { count: 'exact', head: true })
      .eq('is_approved', true)
      .eq('price_type', 'For Rent')
      .ilike('property_type', '%apartment%')
      .ilike('county', `%${county}%`);

    // Count apartments for sale
    const { data: aptsSale, error: aptsSaleError } = await supabase
      .from('property_listings')
      .select('id', { count: 'exact', head: true })
      .eq('is_approved', true)
      .eq('price_type', 'For Sale')
      .ilike('property_type', '%apartment%')
      .ilike('county', `%${county}%`);

    // Count houses for rent
    const { data: housesRent, error: housesRentError } = await supabase
      .from('property_listings')
      .select('id', { count: 'exact', head: true })
      .eq('is_approved', true)
      .eq('price_type', 'For Rent')
      .ilike('property_type', '%house%')
      .ilike('county', `%${county}%`);

    // Count houses for sale
    const { data: housesSale, error: housesSaleError } = await supabase
      .from('property_listings')
      .select('id', { count: 'exact', head: true })
      .eq('is_approved', true)
      .eq('price_type', 'For Sale')
      .ilike('property_type', '%house%')
      .ilike('county', `%${county}%`);

    const totalCount = total?.length || 0;
    const aptsRentCount = aptsRent?.length || 0;
    const aptsSaleCount = aptsSale?.length || 0;
    const housesRentCount = housesRent?.length || 0;
    const housesSaleCount = housesSale?.length || 0;

    results.push({
      county,
      total: totalCount,
      aptsRent: aptsRentCount,
      aptsSale: aptsSaleCount,
      housesRent: housesRentCount,
      housesSale: housesSaleCount
    });
  }

  // Sort by total count
  results.sort((a, b) => b.total - a.total);

  console.log('Counties WITH listings:');
  console.log('-'.repeat(80));
  const withListings = results.filter(r => r.total > 0);
  withListings.forEach(r => {
    console.log(`${r.county.padEnd(20)} Total: ${r.total.toString().padStart(3)} | AptRent: ${r.aptsRent} | AptSale: ${r.aptsSale} | HouseRent: ${r.housesRent} | HouseSale: ${r.housesSale}`);
  });

  console.log('\n');
  console.log('Counties WITHOUT any listings:');
  console.log('-'.repeat(80));
  const withoutListings = results.filter(r => r.total === 0);
  withoutListings.forEach(r => {
    console.log(`  ❌ ${r.county}`);
  });

  console.log('\n');
  console.log('Counties with FEWER than 5 listings per page type:');
  console.log('-'.repeat(80));
  results.forEach(r => {
    const issues = [];
    if (r.aptsRent < 5) issues.push(`AptRent: ${r.aptsRent}`);
    if (r.aptsSale < 5) issues.push(`AptSale: ${r.aptsSale}`);
    if (r.housesRent < 5) issues.push(`HouseRent: ${r.housesRent}`);
    if (r.housesSale < 5) issues.push(`HouseSale: ${r.housesSale}`);

    if (issues.length > 0 && r.total > 0) {
      console.log(`  ⚠️  ${r.county.padEnd(20)} ${issues.join(', ')}`);
    }
  });

  console.log('\n' + '='.repeat(80));
  console.log('SUMMARY:');
  console.log(`  Total counties: ${counties.length}`);
  console.log(`  Counties with listings: ${withListings.length}`);
  console.log(`  Counties without listings: ${withoutListings.length}`);
  console.log('='.repeat(80));

  // Save results to file
  fs.writeFileSync('county-coverage-report.json', JSON.stringify(results, null, 2));
  console.log('\n✓ Detailed report saved to: county-coverage-report.json');
}

checkCountyCoverage().catch(console.error);
