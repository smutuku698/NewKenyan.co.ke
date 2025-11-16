const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://gsdctfcfkrtuxnwapjcj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzZGN0ZmNma3J0dXhud2FwamNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxMzQ4MzAsImV4cCI6MjA3MDcxMDgzMH0.hknSwHKvGu84Bg4oBnF1jEsiNBg-vTF8SmoWiQFyzEg'
);

async function checkAll() {
  console.log('Fetching all properties...\n');

  let allData = [];
  let start = 0;
  const batchSize = 1000;

  while (true) {
    const { data, error } = await supabase
      .from('property_listings')
      .select('price_type, property_type, city, county')
      .range(start, start + batchSize - 1);

    if (error) {
      console.error('Error:', error);
      break;
    }

    if (!data || data.length === 0) break;

    allData = allData.concat(data);
    console.log(`Fetched ${allData.length} properties...`);

    if (data.length < batchSize) break;
    start += batchSize;
  }

  const priceTypes = {};
  const propertyTypes = {};
  const counties = {};

  allData.forEach(d => {
    priceTypes[d.price_type] = (priceTypes[d.price_type] || 0) + 1;
    propertyTypes[d.property_type] = (propertyTypes[d.property_type] || 0) + 1;
    if (d.county) {
      counties[d.county] = (counties[d.county] || 0) + 1;
    }
  });

  console.log('\n=== TOTAL PROPERTIES ===');
  console.log('Total:', allData.length);

  console.log('\n=== PRICE_TYPE Distribution ===');
  Object.entries(priceTypes)
    .sort((a, b) => b[1] - a[1])
    .forEach(([k, v]) => console.log(`${k}: ${v}`));

  console.log('\n=== PROPERTY_TYPE Distribution ===');
  Object.entries(propertyTypes)
    .sort((a, b) => b[1] - a[1])
    .forEach(([k, v]) => console.log(`${k}: ${v}`));

  console.log('\n=== TOP 15 COUNTIES ===');
  Object.entries(counties)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .forEach(([k, v]) => console.log(`${k}: ${v}`));
}

checkAll().then(() => process.exit(0));
