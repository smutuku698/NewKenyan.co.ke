const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gsdctfcfkrtuxnwapjcj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzZGN0ZmNma3J0dXhud2FwamNqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTEzNDgzMCwiZXhwIjoyMDcwNzEwODMwfQ.TmCzZ3dyKOhN0V-6ezLAykzsJfAWcaVCt5Yx0gjMHLA';
const supabase = createClient(supabaseUrl, supabaseKey);

const allCounties = [
  "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo-Marakwet", "Embu",
  "Garissa", "Homa Bay", "Isiolo", "Kajiado", "Kakamega", "Kericho",
  "Kiambu", "Kilifi", "Kirinyaga", "Kisii", "Kisumu", "Kitui", "Kwale",
  "Laikipia", "Lamu", "Machakos", "Makueni", "Mandera", "Marsabit",
  "Meru", "Migori", "Mombasa", "Muranga", "Nairobi", "Nakuru",
  "Nandi", "Narok", "Nyamira", "Nyandarua", "Nyeri", "Samburu",
  "Siaya", "Taita Taveta", "Tana River", "Tharaka-Nithi", "Trans Nzoia",
  "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot"
];

async function finalReport() {
  console.log('='.repeat(80));
  console.log('FINAL COUNTY COVERAGE REPORT');
  console.log('='.repeat(80));
  console.log('');

  const results = [];
  let allPass = true;

  for (const county of allCounties) {
    const { data, error } = await supabase
      .from('property_listings')
      .select('property_type, price_type')
      .eq('is_approved', true)
      .ilike('county', `%${county}%`);

    if (error || !data) {
      results.push({ county, status: '❌ ERROR', total: 0 });
      allPass = false;
      continue;
    }

    const aptsRent = data.filter(d => d.property_type.toLowerCase().includes('apartment') && d.price_type === 'For Rent').length;
    const aptsSale = data.filter(d => d.property_type.toLowerCase().includes('apartment') && d.price_type === 'For Sale').length;
    const housesRent = data.filter(d => d.property_type.toLowerCase().includes('house') && d.price_type === 'For Rent').length;
    const housesSale = data.filter(d => d.property_type.toLowerCase().includes('house') && d.price_type === 'For Sale').length;

    const pass = aptsRent >= 5 && aptsSale >= 5 && housesRent >= 5 && housesSale >= 5;
    if (!pass) allPass = false;

    results.push({
      county,
      total: data.length,
      aptsRent,
      aptsSale,
      housesRent,
      housesSale,
      status: pass ? '✓' : '⚠️'
    });
  }

  // Show counties with issues first
  const issues = results.filter(r => r.status !== '✓');
  if (issues.length > 0) {
    console.log('Counties with issues (less than 5 per page type):');
    console.log('-'.repeat(80));
    issues.forEach(r => {
      console.log(`${r.status} ${r.county.padEnd(20)} AptRent:${r.aptsRent} AptSale:${r.aptsSale} HouseRent:${r.housesRent} HouseSale:${r.housesSale}`);
    });
    console.log('');
  }

  // Show summary
  const passed = results.filter(r => r.status === '✓').length;
  console.log('Summary:');
  console.log('-'.repeat(80));
  console.log(`Total counties: ${allCounties.length}`);
  console.log(`Counties with 5+ per page type: ${passed}`);
  console.log(`Counties needing attention: ${issues.length}`);
  console.log(`Total listings: ${results.reduce((sum, r) => sum + r.total, 0)}`);

  console.log('\n' + '='.repeat(80));
  if (allPass) {
    console.log('✓✓✓ SUCCESS! All county pages have minimum 5 listings per type!');
  } else {
    console.log('⚠️  Some counties still need more listings');
  }
  console.log('='.repeat(80));
}

finalReport().catch(console.error);
