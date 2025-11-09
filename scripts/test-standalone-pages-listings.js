/**
 * Test Standalone Pages for Property Listings
 *
 * Checks if our high-traffic standalone pages have matching properties
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Standalone pages and their query criteria
const STANDALONE_PAGES = [
  {
    path: '/apartments-for-rent-nairobi',
    searches: '450/mo',
    query: {
      property_type: 'apartment',
      price_type: 'For Rent',
      location: 'Nairobi'
    }
  },
  {
    path: '/bedsitter-nairobi',
    searches: '300-500/mo',
    query: {
      property_type: 'bedsitter',
      location: 'Nairobi'
    }
  },
  {
    path: '/2-bedroom-apartment-nairobi',
    searches: '250-400/mo',
    query: {
      property_type: 'apartment',
      bedrooms: 2,
      location: 'Nairobi'
    }
  },
  {
    path: '/3-bedroom-house-for-rent',
    searches: '200-350/mo',
    query: {
      property_type: 'house',
      price_type: 'For Rent',
      bedrooms: 3
    }
  },
  {
    path: '/apartments-westlands',
    searches: '200-350/mo',
    query: {
      property_type: 'apartment',
      location: 'Westlands'
    }
  },
  {
    path: '/apartments-kilimani',
    searches: '200-300/mo',
    query: {
      property_type: 'apartment',
      location: 'Kilimani'
    }
  },
  {
    path: '/bedsitter-kasarani',
    searches: '150-250/mo',
    query: {
      property_type: 'bedsitter',
      location: 'Kasarani'
    }
  },
  {
    path: '/cheap-apartments-nairobi',
    searches: '150-250/mo',
    query: {
      property_type: 'apartment',
      location: 'Nairobi',
      maxPrice: 30000 // For rent < 30k or sale < 5M
    }
  },
  {
    path: '/land-for-sale-kenya',
    searches: '200-400/mo',
    query: {
      property_type: 'land',
      price_type: 'For Sale'
    }
  }
];

async function testStandalonePages() {
  console.log('\n' + '═'.repeat(70));
  console.log('🔍 TESTING STANDALONE PAGES FOR PROPERTY LISTINGS');
  console.log('═'.repeat(70));
  console.log(`\nTesting ${STANDALONE_PAGES.length} high-traffic standalone pages...\n`);

  const results = [];

  for (const page of STANDALONE_PAGES) {
    console.log(`\n📄 Testing: ${page.path} (${page.searches})`);
    console.log('─'.repeat(70));

    // Build query based on criteria
    let query = supabase
      .from('property_listings')
      .select('id, property_title, property_type, price, price_type, bedrooms, city, county', { count: 'exact' })
      .eq('is_approved', true);

    // Property type filter
    if (page.query.property_type) {
      query = query.ilike('property_type', `%${page.query.property_type}%`);
    }

    // Price type filter (For Rent / For Sale)
    if (page.query.price_type) {
      query = query.eq('price_type', page.query.price_type);
    }

    // Bedrooms filter
    if (page.query.bedrooms) {
      query = query.eq('bedrooms', page.query.bedrooms);
    }

    // Location filter (county or city)
    if (page.query.location) {
      query = query.or(
        `county.ilike.%${page.query.location}%,city.ilike.%${page.query.location}%,address.ilike.%${page.query.location}%`
      );
    }

    // Price filter for "cheap" apartments
    if (page.query.maxPrice) {
      query = query.or('price.lte.5000000,price.lte.30000'); // Sale < 5M or Rent < 30k
    }

    query = query
      .order('created_at', { ascending: false })
      .limit(10);

    const { data, error, count } = await query;

    if (error) {
      console.error(`   ❌ Query error: ${error.message}`);
      results.push({
        page: page.path,
        searches: page.searches,
        status: 'error',
        count: 0,
        error: error.message
      });
      continue;
    }

    console.log(`   Query filters used:`);
    if (page.query.property_type) console.log(`      - Property type: ${page.query.property_type}`);
    if (page.query.price_type) console.log(`      - Price type: ${page.query.price_type}`);
    if (page.query.bedrooms) console.log(`      - Bedrooms: ${page.query.bedrooms}`);
    if (page.query.location) console.log(`      - Location: ${page.query.location}`);
    if (page.query.maxPrice) console.log(`      - Max price: ${page.query.maxPrice}`);

    console.log(`\n   ${count > 0 ? '✅' : '❌'} Found: ${count} properties`);

    if (data && data.length > 0) {
      console.log(`\n   Sample listings (showing ${Math.min(5, data.length)}):`);
      data.slice(0, 5).forEach((prop, idx) => {
        const priceStr = prop.price_type === 'For Rent'
          ? `KES ${prop.price.toLocaleString()}/mo`
          : `KES ${prop.price.toLocaleString()}`;
        console.log(`      ${idx + 1}. ${prop.property_title.substring(0, 50)}...`);
        console.log(`         ${prop.property_type} | ${prop.bedrooms || 'N/A'} BR | ${priceStr}`);
        console.log(`         ${prop.city}, ${prop.county}`);
      });
    } else {
      console.log(`\n   ⚠️  NO LISTINGS FOUND - PAGE WILL BE EMPTY!`);
    }

    results.push({
      page: page.path,
      searches: page.searches,
      status: count > 0 ? 'success' : 'empty',
      count: count || 0,
      samples: data || []
    });

    // Small delay
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Summary
  console.log('\n\n' + '═'.repeat(70));
  console.log('📊 SUMMARY');
  console.log('═'.repeat(70));

  const successful = results.filter(r => r.status === 'success');
  const empty = results.filter(r => r.status === 'empty');
  const errors = results.filter(r => r.status === 'error');

  console.log(`\n✅ Pages with listings: ${successful.length}/${STANDALONE_PAGES.length}`);
  console.log(`❌ Pages without listings: ${empty.length}/${STANDALONE_PAGES.length}`);
  console.log(`⚠️  Pages with errors: ${errors.length}/${STANDALONE_PAGES.length}`);

  if (empty.length > 0) {
    console.log('\n❌ EMPTY PAGES (NEED ATTENTION):');
    empty.forEach(r => {
      console.log(`   ❌ ${r.page} (${r.searches}) - 0 listings`);
    });
  }

  if (successful.length > 0) {
    console.log('\n✅ SUCCESSFUL PAGES:');
    successful.forEach(r => {
      console.log(`   ✅ ${r.page} (${r.searches}) - ${r.count} listings`);
    });
  }

  // Traffic-weighted success rate
  console.log('\n📈 HIGH-TRAFFIC PAGES STATUS:');
  const highTraffic = results.filter(r => {
    const searches = parseInt(r.searches.split('-')[0]);
    return searches >= 200;
  });

  const highTrafficSuccess = highTraffic.filter(r => r.status === 'success');
  console.log(`   ${highTrafficSuccess.length}/${highTraffic.length} high-traffic pages have listings`);

  console.log('\n' + '═'.repeat(70));
}

if (require.main === module) {
  testStandalonePages()
    .then(() => {
      console.log('✅ Test complete!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Script failed:', error);
      process.exit(1);
    });
}

module.exports = { testStandalonePages };
