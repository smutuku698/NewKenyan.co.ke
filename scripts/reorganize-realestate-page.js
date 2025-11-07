const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'app', 'real-estate-companies-in-kenya', 'RealEstateCompaniesPage.tsx');

// Read file
let content = fs.readFileSync(filePath, 'utf8');

// Find line numbers for both sections
const lines = content.split('\n');
let overviewStart = -1;
let overviewEnd = -1;
let companiesStart = -1;
let companiesEnd = -1;

// Find overview section
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('id="overview"') && lines[i].includes('<section')) {
    overviewStart = i;
  }
  if (overviewStart !== -1 && overviewEnd === -1 && lines[i].trim().startsWith('</section>')) {
    overviewEnd = i;
    break;
  }
}

// Find companies section
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('id="companies"') && lines[i].includes('<section')) {
    companiesStart = i;
  }
  if (companiesStart !== -1 && companiesEnd === -1 && i > companiesStart && lines[i].trim().startsWith('</section>')) {
    companiesEnd = i;
    break;
  }
}

console.log('Overview section:', overviewStart, '-', overviewEnd);
console.log('Companies section:', companiesStart, '-', companiesEnd);

// Extract sections
const overviewSection = lines.slice(overviewStart, overviewEnd + 1);
const companiesSection = lines.slice(companiesStart, companiesEnd + 1);

// Remove companies section
lines.splice(companiesStart, companiesEnd - companiesStart + 1);

// Insert companies section before overview (accounting for removed lines)
const newOverviewStart = overviewStart > companiesStart ? overviewStart - (companiesEnd - companiesStart + 1) : overviewStart;
lines.splice(newOverviewStart, 0, ...companiesSection, '');

// Join back
content = lines.join('\n');

// Now improve colors and contrast
// Change blue/purple gradient to green
content = content.replace(
  /bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600/g,
  'bg-gradient-to-r from-green-700 via-green-600 to-teal-600'
);

// In companies section, change button text color
content = content.replace(
  /text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50/,
  'text-green-700 px-6 py-3 rounded-lg hover:bg-green-50'
);

// Change text-blue-100 to text-green-100 in companies section
content = content.replace(/text-blue-100/g, 'text-green-100');

// Reduce yellow, change to orange/amber
content = content.replace(/from-yellow-50 to-yellow-100/g, 'from-orange-50 to-amber-50');
content = content.replace(/border-yellow-200/g, 'border-orange-200');
content = content.replace(/text-yellow-600/g, 'text-orange-600');

// Write back
fs.writeFileSync(filePath, content, 'utf8');

console.log('Successfully reorganized Real Estate Companies page!');
console.log('  - Companies section moved before Market Overview');
console.log('  - Color scheme improved (green/professional theme)');
console.log('  - Better visual contrast');
