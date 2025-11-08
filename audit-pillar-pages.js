const fs = require('fs');
const path = require('path');

const pillarPages = [
  // Tier 1
  'land-for-sale-kenya',

  // Tier 2
  'apartments-westlands',

  // Tier 3
  'cheap-apartments-nairobi',

  // Already fixed
  'apartments-for-rent-nairobi',
  'bedsitter-nairobi',
  '2-bedroom-apartment-nairobi',
  '3-bedroom-house-for-rent',
  'bedsitter-kasarani',
  'apartments-kilimani',
  'houses-for-rent-nairobi',

  // Additional bedroom-specific
  '2-bedroom-houses-for-rent',
  '2-bedroom-houses-for-sale',
  '3-bedroom-houses-for-rent',
  '3-bedroom-houses-for-sale',
  '4-bedroom-houses-for-rent',
  '4-bedroom-houses-for-sale',
  '5-bedroom-houses-for-rent',
  '5-bedroom-houses-for-sale'
];

console.log('='.repeat(80));
console.log('AUDITING PILLAR PAGES FOR LISTING QUERIES');
console.log('='.repeat(80));
console.log('');

const results = {
  hasClientComponent: [],
  needsFixing: [],
  noClientComponent: [],
  alreadyFixed: []
};

pillarPages.forEach(pageName => {
  const dirPath = path.join(__dirname, 'src', 'app', pageName);

  if (!fs.existsSync(dirPath)) {
    console.log(`⚠️  ${pageName} - Directory not found`);
    results.noClientComponent.push(pageName);
    return;
  }

  // Look for Client component
  const files = fs.readdirSync(dirPath);
  const clientFile = files.find(f => f.includes('Client.tsx'));

  if (!clientFile) {
    console.log(`  ${pageName} - No client component found`);
    results.noClientComponent.push(pageName);
    return;
  }

  const clientPath = path.join(dirPath, clientFile);
  const content = fs.readFileSync(clientPath, 'utf8');

  // Check for queries
  const hasSupabaseQuery = content.includes('supabase') && content.includes('.from(');
  const hasOldPriceType = content.match(/price_type.*['"](?:rent|sale)['"]/);
  const hasFixedPriceType = content.match(/price_type.*['"](?:For Rent|For Sale)['"]/);

  if (hasSupabaseQuery) {
    if (hasOldPriceType && !hasFixedPriceType) {
      console.log(`❌ ${pageName} - NEEDS FIXING (uses old price_type)`);
      results.needsFixing.push(pageName);
    } else if (hasFixedPriceType) {
      console.log(`✓ ${pageName} - Already fixed`);
      results.alreadyFixed.push(pageName);
    } else {
      console.log(`✓ ${pageName} - Has queries`);
      results.hasClientComponent.push(pageName);
    }
  } else {
    console.log(`  ${pageName} - No Supabase queries found`);
    results.hasClientComponent.push(pageName);
  }
});

console.log('\n' + '='.repeat(80));
console.log('SUMMARY');
console.log('='.repeat(80));
console.log(`Already fixed: ${results.alreadyFixed.length}`);
console.log(`Needs fixing: ${results.needsFixing.length}`);
console.log(`No client component: ${results.noClientComponent.length}`);
console.log(`Has client (no queries): ${results.hasClientComponent.length}`);

if (results.needsFixing.length > 0) {
  console.log('\nPages that need fixing:');
  results.needsFixing.forEach(page => console.log(`  - ${page}`));
}

if (results.noClientComponent.length > 0) {
  console.log('\nPages without client components (may need creation):');
  results.noClientComponent.forEach(page => console.log(`  - ${page}`));
}
