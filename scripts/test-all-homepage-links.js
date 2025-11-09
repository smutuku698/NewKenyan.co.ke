/**
 * Test All Homepage Links for Property Listings
 *
 * This script extracts all property links from homepage components and tests
 * if they lead to pages with actual property listings
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Extract all links from homepage
const ALL_HOMEPAGE_LINKS = [
  // Popular Searches Section
  { path: '/apartments-for-rent/nairobi-county', filters: 'bedrooms=2&city=Westlands', desc: 'Popular: 2BR Westlands' },
  { path: '/bedsitters-for-rent/nairobi-county', filters: 'city=Kasarani&max_price=10000', desc: 'Popular: Bedsitter Kasarani' },
  { path: '/houses-for-sale/nairobi-county', filters: 'bedrooms=3&city=Karen', desc: 'Popular: 3BR House Karen' },
  { path: '/apartments-for-rent/nairobi-county', filters: 'city=Kilimani', desc: 'Popular: Apartments Kilimani' },
  { path: '/apartments-for-rent/nairobi-county', filters: 'bedrooms=1', desc: 'Popular: 1BR Apartment' },
  { path: '/bedsitters-for-rent/nairobi-county', filters: 'city=Kileleshwa', desc: 'Popular: Bedsitter Kileleshwa' },
  { path: '/houses-for-rent/nairobi-county', filters: 'city=Lavington', desc: 'Popular: Houses Lavington' },
  { path: '/apartments-for-rent/nairobi-county', filters: 'city=Parklands', desc: 'Popular: Apartments Parklands' },

  // Browse by Budget Section - Bedsitters
  { path: '/bedsitters-for-rent/nairobi-county', filters: 'min_price=5000&max_price=10000', desc: 'Budget: Bedsitter 5k-10k' },
  { path: '/bedsitters-for-rent/nairobi-county', filters: 'min_price=10000&max_price=15000', desc: 'Budget: Bedsitter 10k-15k' },
  { path: '/bedsitters-for-rent/nairobi-county', filters: 'min_price=15000', desc: 'Budget: Bedsitter 15k+' },

  // Browse by Budget Section - 1BR
  { path: '/apartments-for-rent/nairobi-county', filters: 'bedrooms=1&min_price=15000&max_price=25000', desc: 'Budget: 1BR 15k-25k' },
  { path: '/apartments-for-rent/nairobi-county', filters: 'bedrooms=1&min_price=25000&max_price=35000', desc: 'Budget: 1BR 25k-35k' },
  { path: '/apartments-for-rent/nairobi-county', filters: 'bedrooms=1&min_price=35000', desc: 'Budget: 1BR 35k+' },

  // Browse by Budget Section - 2BR
  { path: '/apartments-for-rent/nairobi-county', filters: 'bedrooms=2&min_price=25000&max_price=40000', desc: 'Budget: 2BR 25k-40k' },
  { path: '/apartments-for-rent/nairobi-county', filters: 'bedrooms=2&min_price=40000&max_price=60000', desc: 'Budget: 2BR 40k-60k' },
  { path: '/apartments-for-rent/nairobi-county', filters: 'bedrooms=2&min_price=60000', desc: 'Budget: 2BR 60k+' },

  // Browse by Budget Section - 3BR
  { path: '/apartments-for-rent/nairobi-county', filters: 'bedrooms=3&min_price=40000&max_price=60000', desc: 'Budget: 3BR 40k-60k' },
  { path: '/apartments-for-rent/nairobi-county', filters: 'bedrooms=3&min_price=60000&max_price=80000', desc: 'Budget: 3BR 60k-80k' },
  { path: '/apartments-for-rent/nairobi-county', filters: 'bedrooms=3&min_price=80000', desc: 'Budget: 3BR 80k+' },

  // Featured Neighborhoods
  { path: '/apartments-for-rent/nairobi-county', filters: 'city=Westlands', desc: 'Neighborhood: Westlands' },
  { path: '/apartments-for-rent/nairobi-county', filters: 'city=Kilimani', desc: 'Neighborhood: Kilimani' },
  { path: '/houses-for-sale/nairobi-county', filters: 'city=Karen', desc: 'Neighborhood: Karen' },
  { path: '/bedsitters-for-rent/nairobi-county', filters: 'city=Kasarani', desc: 'Neighborhood: Kasarani' },
  { path: '/apartments-for-rent/nairobi-county', filters: 'city=Kileleshwa', desc: 'Neighborhood: Kileleshwa' },
  { path: '/apartments-for-rent/nairobi-county', filters: 'city=Parklands', desc: 'Neighborhood: Parklands' },
  { path: '/apartments-for-rent/nairobi-county', filters: 'city=Lavington', desc: 'Neighborhood: Lavington' },

  // Major Counties - All property types
  { path: '/houses-for-sale/nairobi-county', filters: '', desc: 'Nairobi: Houses Sale' },
  { path: '/houses-for-rent/nairobi-county', filters: '', desc: 'Nairobi: Houses Rent' },
  { path: '/apartments-for-sale/nairobi-county', filters: '', desc: 'Nairobi: Apartments Sale' },
  { path: '/apartments-for-rent/nairobi-county', filters: '', desc: 'Nairobi: Apartments Rent' },
  { path: '/land-for-sale/nairobi-county', filters: '', desc: 'Nairobi: Land' },
  { path: '/bedsitters-for-rent/nairobi-county', filters: '', desc: 'Nairobi: Bedsitters' },

  { path: '/houses-for-sale/mombasa-county', filters: '', desc: 'Mombasa: Houses Sale' },
  { path: '/houses-for-rent/mombasa-county', filters: '', desc: 'Mombasa: Houses Rent' },
  { path: '/apartments-for-sale/mombasa-county', filters: '', desc: 'Mombasa: Apartments Sale' },
  { path: '/apartments-for-rent/mombasa-county', filters: '', desc: 'Mombasa: Apartments Rent' },
  { path: '/land-for-sale/mombasa-county', filters: '', desc: 'Mombasa: Land' },

  { path: '/houses-for-sale/kiambu-county', filters: '', desc: 'Kiambu: Houses Sale' },
  { path: '/apartments-for-rent/kiambu-county', filters: '', desc: 'Kiambu: Apartments Rent' },
  { path: '/land-for-sale/kiambu-county', filters: '', desc: 'Kiambu: Land' },

  { path: '/houses-for-sale/nakuru-county', filters: '', desc: 'Nakuru: Houses Sale' },
  { path: '/apartments-for-rent/nakuru-county', filters: '', desc: 'Nakuru: Apartments Rent' },
  { path: '/land-for-sale/nakuru-county', filters: '', desc: 'Nakuru: Land' },

  // Property Type Overview
  { path: '/bungalows-for-sale/nairobi-county', filters: '', desc: 'Bungalows Sale' },
  { path: '/maisonettes-for-sale/nairobi-county', filters: '', desc: 'Maisonettes Sale' },
  { path: '/townhouses-for-sale/nairobi-county', filters: '', desc: 'Townhouses Sale' },
  { path: '/villas-for-sale/nairobi-county', filters: '', desc: 'Villas Sale' },
  { path: '/office-space-for-rent/nairobi-county', filters: '', desc: 'Office Space' },
  { path: '/commercial-properties-for-sale/nairobi-county', filters: '', desc: 'Commercial Properties' },
];

// Function to test a link
async function testLink(linkInfo) {
  const { path, filters, desc } = linkInfo;

  // Parse path to extract property type and transaction
  const pathParts = path.split('/');
  const locationSlug = pathParts[pathParts.length - 1];

  // Extract property type and transaction from path
  let propertyType = null;
  let transactionType = null;

  if (path.includes('houses-for-sale')) {
    propertyType = 'house';
    transactionType = 'For Sale';
  } else if (path.includes('houses-for-rent')) {
    propertyType = 'house';
    transactionType = 'For Rent';
  } else if (path.includes('apartments-for-sale')) {
    propertyType = 'apartment';
    transactionType = 'For Sale';
  } else if (path.includes('apartments-for-rent')) {
    propertyType = 'apartment';
    transactionType = 'For Rent';
  } else if (path.includes('bedsitters-for-rent')) {
    propertyType = 'bedsitter';
    transactionType = 'For Rent';
  } else if (path.includes('land-for-sale')) {
    propertyType = 'land';
    transactionType = 'For Sale';
  } else if (path.includes('bungalows')) {
    propertyType = 'bungalow';
    transactionType = 'For Sale';
  } else if (path.includes('maisonettes')) {
    propertyType = 'maisonette';
    transactionType = 'For Sale';
  } else if (path.includes('townhouses')) {
    propertyType = 'townhouse';
    transactionType = 'For Sale';
  } else if (path.includes('villas')) {
    propertyType = 'villa';
    transactionType = 'For Sale';
  } else if (path.includes('office-space')) {
    propertyType = 'office';
    transactionType = 'For Rent';
  } else if (path.includes('commercial')) {
    propertyType = 'commercial';
    transactionType = 'For Sale';
  }

  // Get location info
  const { data: location } = await supabase
    .from('locations')
    .select('*')
    .eq('slug', locationSlug)
    .single();

  if (!location) {
    return { path, desc, count: 0, error: 'Location not found' };
  }

  // Build query
  let query = supabase
    .from('property_listings')
    .select('id', { count: 'exact', head: true })
    .eq('is_approved', true);

  // Apply property type filter
  if (propertyType) {
    query = query.ilike('property_type', `%${propertyType}%`);
  }

  // Apply transaction type filter
  if (transactionType) {
    query = query.eq('price_type', transactionType);
  }

  // Apply location filter
  if (location.type === 'county') {
    query = query.ilike('county', `%${location.name}%`);
  } else {
    query = query
      .ilike('county', `%${location.county}%`)
      .or(`city.ilike.%${location.name}%,address.ilike.%${location.name}%`);
  }

  // Parse and apply additional filters from query string
  if (filters) {
    const filterPairs = filters.split('&');
    for (const pair of filterPairs) {
      const [key, value] = pair.split('=');

      if (key === 'bedrooms') {
        query = query.eq('bedrooms', parseInt(value));
      } else if (key === 'city') {
        query = query.ilike('city', `%${value}%`);
      } else if (key === 'min_price') {
        query = query.gte('price', parseInt(value));
      } else if (key === 'max_price') {
        query = query.lte('price', parseInt(value));
      }
    }
  }

  const { count, error } = await query;

  return {
    path: `${path}${filters ? `?${filters}` : ''}`,
    desc,
    count: count || 0,
    error: error?.message
  };
}

async function testAllHomepageLinks() {
  console.log('\n' + '═'.repeat(70));
  console.log('🔍 TESTING ALL HOMEPAGE LINKS');
  console.log('═'.repeat(70));
  console.log(`\n📊 Total links to test: ${ALL_HOMEPAGE_LINKS.length}\n`);

  const results = [];
  let tested = 0;

  for (const link of ALL_HOMEPAGE_LINKS) {
    tested++;
    process.stdout.write(`\rTesting ${tested}/${ALL_HOMEPAGE_LINKS.length}...`);

    const result = await testLink(link);
    results.push(result);

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 50));
  }

  console.log('\n');

  // Categorize results
  const withListings = results.filter(r => r.count > 0 && !r.error);
  const emptyPages = results.filter(r => r.count === 0 && !r.error);
  const errors = results.filter(r => r.error);

  console.log('═'.repeat(70));
  console.log('📊 RESULTS SUMMARY');
  console.log('═'.repeat(70));
  console.log(`✅ Links with listings: ${withListings.length}/${ALL_HOMEPAGE_LINKS.length} (${Math.round(withListings.length/ALL_HOMEPAGE_LINKS.length*100)}%)`);
  console.log(`❌ Links with NO listings: ${emptyPages.length}/${ALL_HOMEPAGE_LINKS.length} (${Math.round(emptyPages.length/ALL_HOMEPAGE_LINKS.length*100)}%)`);
  console.log(`⚠️  Links with errors: ${errors.length}/${ALL_HOMEPAGE_LINKS.length}`);

  if (emptyPages.length > 0) {
    console.log('\n' + '═'.repeat(70));
    console.log('❌ EMPTY PAGES (CRITICAL - NEEDS FIXING):');
    console.log('═'.repeat(70));
    emptyPages.forEach(r => {
      console.log(`❌ ${r.desc}`);
      console.log(`   ${r.path}`);
      console.log(`   Count: 0 listings\n`);
    });
  }

  if (errors.length > 0) {
    console.log('\n' + '═'.repeat(70));
    console.log('⚠️  ERRORS:');
    console.log('═'.repeat(70));
    errors.forEach(r => {
      console.log(`⚠️  ${r.desc}`);
      console.log(`   ${r.path}`);
      console.log(`   Error: ${r.error}\n`);
    });
  }

  // Show successful categories
  console.log('\n' + '═'.repeat(70));
  console.log('✅ SUCCESSFUL LINK CATEGORIES:');
  console.log('═'.repeat(70));

  const byCategory = {
    'Popular Searches': withListings.filter(r => r.desc.startsWith('Popular:')),
    'Budget Filters': withListings.filter(r => r.desc.startsWith('Budget:')),
    'Neighborhoods': withListings.filter(r => r.desc.startsWith('Neighborhood:')),
    'County Pages': withListings.filter(r => !r.desc.includes(':') || r.desc.includes('Nairobi:') || r.desc.includes('Mombasa:') || r.desc.includes('Kiambu:') || r.desc.includes('Nakuru:')),
  };

  Object.entries(byCategory).forEach(([category, links]) => {
    console.log(`\n✅ ${category}: ${links.length} links working`);
    if (links.length > 0 && links.length <= 5) {
      links.forEach(l => console.log(`   - ${l.desc}: ${l.count} listings`));
    }
  });

  console.log('\n' + '═'.repeat(70));
  console.log('🎯 RECOMMENDATION:');
  console.log('═'.repeat(70));

  if (emptyPages.length === 0) {
    console.log('✅ ALL HOMEPAGE LINKS ARE WORKING!');
    console.log('   Every link leads to a page with property listings.');
  } else {
    console.log(`❌ ${emptyPages.length} homepage links lead to empty pages.`);
    console.log('   Action required: Generate properties for these categories.');
  }

  console.log('\n' + '═'.repeat(70));
}

if (require.main === module) {
  testAllHomepageLinks()
    .then(() => {
      console.log('✅ Test complete!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Test failed:', error);
      process.exit(1);
    });
}

module.exports = { testAllHomepageLinks };
