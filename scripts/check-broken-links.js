/**
 * Check for Broken Links and 400-499 Errors
 *
 * This script tests common URL patterns to find 404 and other HTTP errors
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Test if running locally or need to test production
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

async function checkUrl(url, description) {
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Bingbot/2.0; +http://www.bing.com/bingbot.htm)',
      },
    });

    const status = response.status;
    const statusText = response.statusText;

    if (status >= 200 && status < 300) {
      return { url, status, statusText, description, ok: true };
    } else if (status >= 400 && status < 500) {
      return { url, status, statusText, description, ok: false, error: `Client Error ${status}` };
    } else if (status >= 500) {
      return { url, status, statusText, description, ok: false, error: `Server Error ${status}` };
    } else {
      return { url, status, statusText, description, ok: true };
    }
  } catch (error) {
    return { url, status: 'ERROR', statusText: error.message, description, ok: false, error: error.message };
  }
}

async function checkBrokenLinks() {
  console.log('\n' + '═'.repeat(70));
  console.log('🔍 CHECKING FOR BROKEN LINKS & HTTP ERRORS');
  console.log('═'.repeat(70));
  console.log(`Base URL: ${BASE_URL}\n`);

  const urlsToCheck = [];

  // 1. Main pages
  console.log('1️⃣ Checking main pages...');
  const mainPages = [
    { url: `${BASE_URL}/`, desc: 'Homepage' },
    { url: `${BASE_URL}/properties`, desc: 'Properties page' },
    { url: `${BASE_URL}/business-directory`, desc: 'Business directory' },
    { url: `${BASE_URL}/jobs-in-kenya`, desc: 'Jobs page' },
    { url: `${BASE_URL}/about`, desc: 'About page' },
    { url: `${BASE_URL}/contact`, desc: 'Contact page' },
  ];
  urlsToCheck.push(...mainPages);

  // 2. Location pages (sample)
  console.log('2️⃣ Checking sample location pages...');
  const locationPages = [
    { url: `${BASE_URL}/houses-for-sale/nairobi-county`, desc: 'Houses for sale Nairobi' },
    { url: `${BASE_URL}/apartments-for-rent/nairobi-county`, desc: 'Apartments for rent Nairobi' },
    { url: `${BASE_URL}/houses-for-sale/westlands`, desc: 'Houses for sale Westlands' },
    { url: `${BASE_URL}/apartments-for-rent/kilimani`, desc: 'Apartments for rent Kilimani' },
  ];
  urlsToCheck.push(...locationPages);

  // 3. Standalone pages
  console.log('3️⃣ Checking standalone pages...');
  const standalonePages = [
    { url: `${BASE_URL}/apartments-for-rent-nairobi`, desc: 'Apartments for rent Nairobi standalone' },
    { url: `${BASE_URL}/houses-for-sale-nairobi`, desc: 'Houses for sale Nairobi standalone' },
    { url: `${BASE_URL}/bedsitter-nairobi`, desc: 'Bedsitter Nairobi' },
    { url: `${BASE_URL}/land-for-sale-kenya`, desc: 'Land for sale Kenya' },
  ];
  urlsToCheck.push(...standalonePages);

  // 4. Property pages (sample from database)
  console.log('4️⃣ Fetching sample property pages...');
  const { data: properties } = await supabase
    .from('property_listings')
    .select('id, property_title')
    .eq('is_approved', true)
    .limit(5);

  if (properties) {
    properties.forEach(prop => {
      urlsToCheck.push({
        url: `${BASE_URL}/properties/${prop.id}`,
        desc: `Property: ${prop.property_title.substring(0, 40)}...`,
      });
    });
  }

  // 5. Common 404 patterns
  console.log('5️⃣ Checking for common 404 patterns...');
  const common404 = [
    { url: `${BASE_URL}/this-page-does-not-exist`, desc: 'Non-existent page (should 404)' },
    { url: `${BASE_URL}/properties/invalid-id`, desc: 'Invalid property ID (should 404)' },
  ];
  urlsToCheck.push(...common404);

  console.log(`\n📊 Testing ${urlsToCheck.length} URLs...\n`);

  // Test all URLs
  const results = [];
  for (const item of urlsToCheck) {
    const result = await checkUrl(item.url, item.desc);
    results.push(result);

    const icon = result.ok ? '✅' : '❌';
    console.log(`${icon} [${result.status}] ${result.description}`);

    // Small delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Summary
  console.log('\n' + '═'.repeat(70));
  console.log('📊 SUMMARY');
  console.log('═'.repeat(70));

  const successful = results.filter(r => r.ok);
  const clientErrors = results.filter(r => !r.ok && typeof r.status === 'number' && r.status >= 400 && r.status < 500);
  const serverErrors = results.filter(r => !r.ok && typeof r.status === 'number' && r.status >= 500);
  const otherErrors = results.filter(r => !r.ok && typeof r.status !== 'number');

  console.log(`✅ Successful (200-299): ${successful.length}`);
  console.log(`❌ Client Errors (400-499): ${clientErrors.length}`);
  console.log(`❌ Server Errors (500+): ${serverErrors.length}`);
  console.log(`❌ Other Errors: ${otherErrors.length}`);

  if (clientErrors.length > 0) {
    console.log('\n⚠️  CLIENT ERRORS (400-499):');
    clientErrors.forEach(err => {
      console.log(`   [${err.status}] ${err.description}`);
      console.log(`       ${err.url}`);
    });
  }

  if (serverErrors.length > 0) {
    console.log('\n⚠️  SERVER ERRORS (500+):');
    serverErrors.forEach(err => {
      console.log(`   [${err.status}] ${err.description}`);
      console.log(`       ${err.url}`);
    });
  }

  if (otherErrors.length > 0) {
    console.log('\n⚠️  OTHER ERRORS:');
    otherErrors.forEach(err => {
      console.log(`   ${err.error}: ${err.description}`);
      console.log(`       ${err.url}`);
    });
  }

  console.log('\n💡 RECOMMENDATIONS:');
  if (clientErrors.length > 0) {
    console.log('   1. Fix 404 errors by ensuring all linked pages exist');
    console.log('   2. Update internal links that point to non-existent pages');
    console.log('   3. Implement proper redirects for moved/deleted pages');
  }

  console.log('   4. Ensure your sitemap.xml includes all important pages');
  console.log('   5. Submit your sitemap to Bing Webmaster Tools');
  console.log('   6. Check robots.txt is not blocking important pages\n');
}

if (require.main === module) {
  checkBrokenLinks()
    .then(() => {
      console.log('✅ Check complete!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Script failed:', error);
      process.exit(1);
    });
}

module.exports = { checkBrokenLinks };
