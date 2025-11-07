require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkPriceDistribution() {
  const { data, error } = await supabase
    .from('property_listings')
    .select('price, price_type, bedrooms, property_type')
    .eq('price_type', 'For Rent');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('\n📊 RENTAL PRICE DISTRIBUTION BY BEDROOM COUNT\n');

  // Budget ranges from homepage
  const budgetRanges = [
    { name: 'Bedsitters KES 5K-10K', min: 5000, max: 10000, bedrooms: null, type: 'Bedsitter' },
    { name: 'Bedsitters KES 10K-15K', min: 10000, max: 15000, bedrooms: null, type: 'Bedsitter' },
    { name: '1BR KES 15K-25K', min: 15000, max: 25000, bedrooms: 1 },
    { name: '1BR KES 25K-35K', min: 25000, max: 35000, bedrooms: 1 },
    { name: '2BR KES 25K-40K', min: 25000, max: 40000, bedrooms: 2 },
    { name: '2BR KES 40K-60K', min: 40000, max: 60000, bedrooms: 2 },
    { name: '3BR KES 40K-60K', min: 40000, max: 60000, bedrooms: 3 },
    { name: '3BR KES 60K-80K', min: 60000, max: 80000, bedrooms: 3 },
    { name: '3BR KES 80K+', min: 80000, max: 999999999, bedrooms: 3 }
  ];

  budgetRanges.forEach(range => {
    let filtered = data.filter(p => p.price >= range.min && p.price <= range.max);

    if (range.bedrooms !== null) {
      filtered = filtered.filter(p => p.bedrooms === range.bedrooms);
    }

    if (range.type) {
      filtered = filtered.filter(p => p.property_type === range.type);
    }

    const status = filtered.length > 0 ? '✅' : '❌';
    console.log(`${status} ${range.name.padEnd(25)} ${filtered.length} properties`);
  });

  console.log('\n💰 Overall Price Ranges (For Rent):');
  const priceRanges = [
    { name: 'Under 10K', min: 0, max: 10000 },
    { name: '10K - 20K', min: 10000, max: 20000 },
    { name: '20K - 40K', min: 20000, max: 40000 },
    { name: '40K - 60K', min: 40000, max: 60000 },
    { name: '60K - 100K', min: 60000, max: 100000 },
    { name: '100K+', min: 100000, max: 999999999 }
  ];

  priceRanges.forEach(range => {
    const count = data.filter(p => p.price >= range.min && p.price <= range.max).length;
    console.log(`   ${range.name.padEnd(15)} ${count} properties`);
  });

  console.log(`\n📈 Total Rentals: ${data.length}`);
}

checkPriceDistribution();
