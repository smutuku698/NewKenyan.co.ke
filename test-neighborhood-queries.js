const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://gsdctfcfkrtuxnwapjcj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzZGN0ZmNma3J0dXhud2FwamNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxMzQ4MzAsImV4cCI6MjA3MDcxMDgzMH0.hknSwHKvGu84Bg4oBnF1jEsiNBg-vTF8SmoWiQFyzEg'
);

async function testNeighborhoodQueries() {
  console.log('=== Testing Neighborhood & Estate Queries ===\n');

  // Get a sample neighborhood location
  const { data: neighborhood } = await supabase
    .from('locations')
    .select('*')
    .eq('slug', 'nairobi-central-nairobi')
    .single();

  if (neighborhood) {
    console.log('Testing with neighborhood:', neighborhood.name);
    console.log('County:', neighborhood.county);
    console.log('Type:', neighborhood.type);
    console.log('');

    // Simulate the exact query from the page for neighborhoods
    const countyName = neighborhood.county.replace(/ County$/i, '');

    console.log('Query 1: Using ONLY .or() clause (current page logic)');
    let query1 = supabase
      .from('property_listings')
      .select('*')
      .eq('is_approved', true)
      .eq('price_type', 'rent')
      .ilike('property_type', '%apartment%')
      .ilike('county', `%${countyName}%`)
      .or(`city.ilike.%${neighborhood.name}%,address.ilike.%${neighborhood.name}%`)
      .limit(10);

    const { data: result1 } = await query1;
    console.log('Found:', result1?.length || 0, 'properties');
    if (result1 && result1.length > 0) {
      console.log('Sample property city:', result1[0].city);
      console.log('Sample property address:', result1[0].address);
    }

    // Check what cities/addresses we have in Nairobi
    console.log('\n=== Sample properties in Nairobi ===');
    const { data: nairobProps } = await supabase
      .from('property_listings')
      .select('city, address, property_type, price_type')
      .ilike('county', '%Nairobi%')
      .limit(20);

    if (nairobProps) {
      console.log('Sample cities in Nairobi:');
      const uniqueCities = [...new Set(nairobProps.map(p => p.city))];
      uniqueCities.slice(0, 10).forEach(city => console.log(' -', city));

      console.log('\nSample addresses:');
      nairobProps.slice(0, 5).forEach(p => console.log(' -', p.address));
    }

    // Check if "Nairobi Central" exists as city or in address
    console.log('\n=== Checking for "Nairobi Central" specifically ===');
    const { data: centralProps } = await supabase
      .from('property_listings')
      .select('city, address, property_title')
      .or(`city.ilike.%Nairobi Central%,address.ilike.%Nairobi Central%`)
      .limit(5);

    console.log('Properties with "Nairobi Central" in city or address:', centralProps?.length || 0);
    if (centralProps && centralProps.length > 0) {
      centralProps.forEach(p => {
        console.log(` - City: "${p.city}", Address: "${p.address}"`);
      });
    }
  }

  // Test with an estate
  console.log('\n\n=== Testing Estate Query ===');
  const { data: estates } = await supabase
    .from('locations')
    .select('*')
    .eq('type', 'estate')
    .eq('is_active', true)
    .limit(1);

  if (estates && estates.length > 0) {
    const estate = estates[0];
    console.log('Testing with estate:', estate.name);
    console.log('County:', estate.county);

    const countyName = estate.county.replace(/ County$/i, '');

    let estateQuery = supabase
      .from('property_listings')
      .select('*')
      .eq('is_approved', true)
      .ilike('county', `%${countyName}%`)
      .ilike('address', `%${estate.name}%`)
      .limit(10);

    const { data: estateResult } = await estateQuery;
    console.log('Found:', estateResult?.length || 0, 'properties');
    if (estateResult && estateResult.length > 0) {
      console.log('Sample address:', estateResult[0].address);
    }
  }
}

testNeighborhoodQueries().then(() => process.exit(0));
