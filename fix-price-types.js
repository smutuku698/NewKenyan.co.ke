const fs = require('fs');
const path = require('path');

const filesToFix = [
  'src/app/cheap-apartments-nairobi/CheapApartmentsNairobiClient.tsx',
  'src/app/bedsitter-kasarani/BedsitterKasaraniClient.tsx',
  'src/app/apartments-kilimani/ApartmentsKilimaniClient.tsx',
  'src/app/apartments-westlands/ApartmentsWestlandsClient.tsx',
  'src/app/3-bedroom-house-for-rent/ThreeBedroomHouseClient.tsx',
  'src/app/2-bedroom-apartment-nairobi/TwoBedroomApartmentNairobiClient.tsx',
  'src/app/bedsitter-nairobi/BedsitterNairobiClient.tsx',
  'src/app/houses-for-rent-nairobi/HousesForRentNairobiClient.tsx',
  'src/app/properties/rent/page.tsx'
];

const fixes = [
  // Fix price_type values
  { from: /\.eq\('price_type',\s*'rent'\)/g, to: ".eq('price_type', 'For Rent')" },
  { from: /\.eq\('price_type',\s*'sale'\)/g, to: ".eq('price_type', 'For Sale')" },

  // Fix city to county for better matching
  { from: /\.ilike\('city',\s*'%nairobi%'\)/gi, to: ".ilike('county', '%Nairobi%')" },
  { from: /\.ilike\('city',\s*'%Nairobi%'\)/g, to: ".ilike('county', '%Nairobi%')" }
];

console.log('Fixing price_type and location queries in standalone pages...\n');

let totalFixed = 0;

filesToFix.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Skipped: ${filePath} (not found)`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  let modified = false;
  let changeCount = 0;

  fixes.forEach(fix => {
    const matches = content.match(fix.from);
    if (matches) {
      content = content.replace(fix.from, fix.to);
      modified = true;
      changeCount += matches.length;
    }
  });

  if (modified) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✓ Fixed ${filePath} (${changeCount} changes)`);
    totalFixed++;
  } else {
    console.log(`  ${filePath} (no changes needed)`);
  }
});

console.log(`\nDone! Fixed ${totalFixed} files.`);
console.log('\nChanges made:');
console.log('  - price_type: "rent" → "For Rent"');
console.log('  - price_type: "sale" → "For Sale"');
console.log('  - Query: city → county for better location matching');
