require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkWestlands() {
  console.log('=== WESTLANDS APARTMENTS ANALYSIS ===\n');

  // Get all apartments for rent in Westlands
  const { data: apartments } = await supabase
    .from('property_listings')
    .select('id, property_title, bedrooms, price, city, address')
    .eq('is_approved', true)
    .eq('price_type', 'rent')
    .ilike('property_type', '%apartment%')
    .or('city.ilike.%Westlands%,address.ilike.%Westlands%');

  const aptCount = apartments ? apartments.length : 0;
  console.log(`Total apartments for rent in Westlands: ${aptCount}\n`);

  if (apartments && apartments.length > 0) {
    console.log('Breakdown by bedrooms:');
    const byBedrooms = {};
    apartments.forEach(apt => {
      const br = apt.bedrooms || 'null';
      byBedrooms[br] = (byBedrooms[br] || 0) + 1;
    });
    Object.entries(byBedrooms).sort((a, b) => {
      if (a[0] === 'null') return 1;
      if (b[0] === 'null') return -1;
      return parseInt(a[0]) - parseInt(b[0]);
    }).forEach(([br, count]) => {
      console.log(`  ${br} bedrooms: ${count} apartments`);
    });

    console.log('\nAll apartments:');
    apartments.forEach(apt => {
      console.log(`  - ${apt.property_title} | ${apt.bedrooms}BR | ${apt.city}`);
    });
  }

  // Now check for villas at Riverside Pearl
  console.log('\n\n=== RIVERSIDE PEARL RESIDENCE VILLAS ===\n');

  const { data: villas } = await supabase
    .from('property_listings')
    .select('id, property_title, bedrooms, price, city, address, county')
    .eq('is_approved', true)
    .eq('price_type', 'sale')
    .ilike('property_type', '%villa%')
    .ilike('address', '%Riverside Pearl%');

  const villaCount = villas ? villas.length : 0;
  console.log(`Villas for sale with "Riverside Pearl" in address: ${villaCount}`);

  if (villas && villas.length > 0) {
    villas.forEach(villa => {
      console.log(`  - ${villa.property_title}`);
      console.log(`    Address: ${villa.address}`);
      console.log(`    City: ${villa.city}`);
      console.log(`    County: ${villa.county}\n`);
    });
  } else {
    // Try broader search
    const { data: broadVillas } = await supabase
      .from('property_listings')
      .select('id, property_title, bedrooms, city, address')
      .eq('is_approved', true)
      .eq('price_type', 'sale')
      .ilike('property_type', '%villa%')
      .ilike('county', '%Nairobi%')
      .limit(10);

    console.log(`\nSample villas for sale in Nairobi (first 10):`);
    if (broadVillas) {
      broadVillas.forEach(villa => {
        console.log(`  - ${villa.property_title} | ${villa.address}`);
      });
    }
  }
}

checkWestlands().catch(console.error);
