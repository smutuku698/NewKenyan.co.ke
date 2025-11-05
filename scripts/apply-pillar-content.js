#!/usr/bin/env node

/**
 * Script to apply comprehensive pillar content to all property type pages
 * Adds imports and conditional rendering for Nairobi and Mombasa
 */

const fs = require('fs');
const path = require('path');

const propertyTypes = [
  'apartments-for-sale',
  'apartments-for-rent',
  'houses-for-rent',
  'bungalows-for-sale',
  'bungalows-for-rent',
  'maisonettes-for-sale',
  'maisonettes-for-rent',
  'villas-for-sale',
  'villas-for-rent',
  'townhouses-for-sale',
  'townhouses-for-rent',
  'land-for-sale',
  'commercial-properties-for-sale',
  'commercial-properties-for-rent'
];

const IMPORT_TO_ADD = `import CityPillarContentComponent from '@/components/CityPillarContent';
import { getCityPillarContent, hasPillarContent } from '@/lib/city-pillar-content';`;

const CODE_TO_ADD_BEFORE_RETURN = `
  // Check for comprehensive pillar content (Nairobi & Mombasa)
  const cityPillarContent = hasPillarContent(location) ? getCityPillarContent(location.name) : null;
`;

function updatePropertyPage(propertyType) {
  const filePath = path.join(__dirname, '..', 'src', 'app', propertyType, '[location]', 'page.tsx');

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return false;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Check if already updated
  if (content.includes('CityPillarContentComponent')) {
    console.log(`✓ ${propertyType} - Already updated`);
    return true;
  }

  // Add imports after other component imports
  const importPattern = /import RelatedLocations from '@\/components\/RelatedLocations';/;
  if (importPattern.test(content)) {
    content = content.replace(importPattern, (match) => {
      return match + '\n' + IMPORT_TO_ADD;
    });
  } else {
    console.log(`⚠️  ${propertyType} - Could not find import location`);
    return false;
  }

  // Add code before return statement in main component
  const returnPattern = /const aboutContent = generateAboutContent\([^;]+\);(\s+)return \(/;
  if (returnPattern.test(content)) {
    content = content.replace(returnPattern, (match, whitespace) => {
      return match.replace('return (', CODE_TO_ADD_BEFORE_RETURN + whitespace + 'return (');
    });
  } else {
    console.log(`⚠️  ${propertyType} - Could not find code insertion point`);
    return false;
  }

  // Update the About Location section to be conditional
  const aboutSectionPattern = /(\/\* About Location \*\/\s+)<div className="bg-white p-8 rounded-lg shadow-sm mb-8">/;
  if (aboutSectionPattern.test(content)) {
    content = content.replace(
      aboutSectionPattern,
      '$1{/* Comprehensive Pillar Content for Major Cities */}\n        {cityPillarContent ? (\n          <div className="mb-12">\n            <CityPillarContentComponent content={cityPillarContent} />\n          </div>\n        ) : (\n          /* Basic About Location for other areas */\n          <div className="bg-white p-8 rounded-lg shadow-sm mb-8">'
    );

    // Add closing parenthesis for the conditional
    const closingDivPattern = /(<\/div>\s+)<\/div>\s+(\/\* Related Locations \*\/)/;
    if (closingDivPattern.test(content)) {
      content = content.replace(closingDivPattern, '$1</div>\n        )}\n\n        $2');
    }
  } else {
    console.log(`⚠️  ${propertyType} - Could not find About Location section`);
    return false;
  }

  // Write updated content
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ ${propertyType} - Successfully updated`);
  return true;
}

console.log('🚀 Applying comprehensive pillar content to property pages...\n');

let successCount = 0;
let failCount = 0;

propertyTypes.forEach(propertyType => {
  const success = updatePropertyPage(propertyType);
  if (success) {
    successCount++;
  } else {
    failCount++;
  }
});

console.log(`\n📊 Summary:`);
console.log(`   ✅ Successfully updated: ${successCount}`);
console.log(`   ⚠️  Failed/Skipped: ${failCount}`);
console.log(`\n✨ Done!`);
