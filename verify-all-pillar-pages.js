const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = '';
const supabaseKey = '';
const supabase = createClient(supabaseUrl, supabaseKey);

const tests = [
  {
    name: '/apartments-for-rent-nairobi',
    query: async () => {
      const { data } = await supabase
        .from('property_listings')
        .select('*')
        .eq('is_approved', true)
        .eq('property_type', 'Apartment')
        .eq('price_type', 'For Rent')
        .ilike('county', '%Nairobi%')
        .limit(12);
      return data;
    }
  },
  {
    name: '/bedsitter-nairobi',
    query: async () => {
      const { data } = await supabase
        .from('property_listings')
        .select('*')
        .eq('is_approved', true)
        .eq('price_type', 'For Rent')
        .ilike('county', '%Nairobi%')
        .limit(12);
      return data;
    }
  },
  {
    name: '/2-bedroom-apartment-nairobi',
    query: async () => {
      const { data } = await supabase
        .from('property_listings')
        .select('*')
        .eq('is_approved', true)
        .eq('property_type', 'Apartment')
        .eq('bedrooms', 2)
        .eq('price_type', 'For Rent')
        .ilike('county', '%Nairobi%')
        .limit(12);
      return data;
    }
  },
  {
    name: '/3-bedroom-house-for-rent',
    query: async () => {
      const { data } = await supabase
        .from('property_listings')
        .select('*')
        .eq('is_approved', true)
        .eq('bedrooms', 3)
        .eq('price_type', 'For Rent')
        .ilike('property_type', '%house%')
        .limit(12);
      return data;
    }
  },
  {
    name: '/land-for-sale-kenya',
    query: async () => {
      const { data } = await supabase
        .from('property_listings')
        .select('*')
        .eq('is_approved', true)
        .eq('price_type', 'For Sale')
        .eq('property_type', 'Land')
        .limit(12);
      return data;
    }
  },
  {
    name: '/apartments-westlands',
    query: async () => {
      const { data } = await supabase
        .from('property_listings')
        .select('*')
        .eq('is_approved', true)
        .eq('property_type', 'Apartment')
        .eq('price_type', 'For Rent')
        .or('city.ilike.%Westlands%,address.ilike.%Westlands%')
        .limit(12);
      return data;
    }
  },
  {
    name: '/apartments-kilimani',
    query: async () => {
      const { data } = await supabase
        .from('property_listings')
        .select('*')
        .eq('is_approved', true)
        .eq('property_type', 'Apartment')
        .eq('price_type', 'For Rent')
        .or('city.ilike.%Kilimani%,address.ilike.%Kilimani%')
        .limit(12);
      return data;
    }
  },
  {
    name: '/bedsitter-kasarani',
    query: async () => {
      const { data } = await supabase
        .from('property_listings')
        .select('*')
        .eq('is_approved', true)
        .eq('price_type', 'For Rent')
        .or('city.ilike.%Kasarani%,address.ilike.%Kasarani%')
        .limit(12);
      return data;
    }
  },
  {
    name: '/cheap-apartments-nairobi',
    query: async () => {
      const { data } = await supabase
        .from('property_listings')
        .select('*')
        .eq('is_approved', true)
        .eq('property_type', 'Apartment')
        .eq('price_type', 'For Rent')
        .ilike('county', '%Nairobi%')
        .lte('price', 20000)
        .limit(12);
      return data;
    }
  },
  {
    name: '/houses-for-rent-nairobi',
    query: async () => {
      const { data } = await supabase
        .from('property_listings')
        .select('*')
        .eq('is_approved', true)
        .eq('price_type', 'For Rent')
        .ilike('property_type', '%house%')
        .ilike('county', '%Nairobi%')
        .limit(12);
      return data;
    }
  }
];

async function verifyAllPages() {
  console.log('='.repeat(80));
  console.log('VERIFYING ALL PILLAR PAGES');
  console.log('='.repeat(80));
  console.log('');

  const results = [];

  for (const test of tests) {
    const data = await test.query();
    const count = data ? data.length : 0;
    const status = count > 0 ? '✓' : '❌';

    results.push({ name: test.name, count, status });
    console.log(`${status} ${test.name.padEnd(40)} ${count} listings`);
  }

  console.log('\n' + '='.repeat(80));
  const allWorking = results.every(r => r.status === '✓');
  if (allWorking) {
    console.log('✓✓✓ ALL PILLAR PAGES ARE WORKING!');
  } else {
    const failing = results.filter(r => r.status === '❌');
    console.log(`⚠️  ${failing.length} pages have no listings:`);
    failing.forEach(f => console.log(`   ${f.name}`));
  }
  console.log('='.repeat(80));
}

verifyAllPages().catch(console.error);
