const fs = require('fs');
const path = require('path');

// Configuration for each property type
const propertyConfig = {
  'bedsitters-for-rent': { type: 'bedsitters', label: 'Bedsitters', transaction: 'rent', query: '%bedsitter%', filter: '%bedsitter%' },
  'bungalows-for-rent': { type: 'bungalows', label: 'Bungalows', transaction: 'rent', query: '%bungalow%', filter: '%bungalow%' },
  'bungalows-for-sale': { type: 'bungalows', label: 'Bungalows', transaction: 'sale', query: '%bungalow%', filter: '%bungalow%' },
  'maisonettes-for-rent': { type: 'maisonettes', label: 'Maisonettes', transaction: 'rent', query: '%maisonette%', filter: '%maisonette%' },
  'maisonettes-for-sale': { type: 'maisonettes', label: 'Maisonettes', transaction: 'sale', query: '%maisonette%', filter: '%maisonette%' },
  'villas-for-rent': { type: 'villas', label: 'Villas', transaction: 'rent', query: '%villa%', filter: '%villa%' },
  'villas-for-sale': { type: 'villas', label: 'Villas', transaction: 'sale', query: '%villa%', filter: '%villa%' },
  'townhouses-for-rent': { type: 'townhouses', label: 'Townhouses', transaction: 'rent', query: '%townhouse%', filter: '%townhouse%' },
  'townhouses-for-sale': { type: 'townhouses', label: 'Townhouses', transaction: 'sale', query: '%townhouse%', filter: '%townhouse%' },
  'studio-apartments-for-rent': { type: 'studio-apartments', label: 'Studios', transaction: 'rent', query: '%studio%', filter: '%studio%' },
  'studio-apartments-for-sale': { type: 'studio-apartments', label: 'Studios', transaction: 'sale', query: '%studio%', filter: '%studio%' },
  'commercial-properties-for-rent': { type: 'commercial-properties', label: 'Commercial Properties', transaction: 'rent', query: '%commercial%', filter: '%commercial%' },
  'commercial-properties-for-sale': { type: 'commercial-properties', label: 'Commercial Properties', transaction: 'sale', query: '%commercial%', filter: '%commercial%' },
  'office-space-for-rent': { type: 'office-space', label: 'Office Spaces', transaction: 'rent', query: '%office%', filter: '%office%' },
  'shops-for-rent': { type: 'shops', label: 'Shops', transaction: 'rent', query: '%shop%', filter: '%shop%' },
  'shops-for-sale': { type: 'shops', label: 'Shops', transaction: 'sale', query: '%shop%', filter: '%shop%' },
  'warehouses-for-rent': { type: 'warehouses', label: 'Warehouses', transaction: 'rent', query: '%warehouse%', filter: '%warehouse%' },
  'warehouses-for-sale': { type: 'warehouses', label: 'Warehouses', transaction: 'sale', query: '%warehouse%', filter: '%warehouse%' },
  'serviced-apartments-for-rent': { type: 'serviced-apartments', label: 'Serviced Apartments', transaction: 'rent', query: '%serviced%', filter: '%serviced%' },
  'container-houses-for-sale': { type: 'container-houses', label: 'Container Houses', transaction: 'sale', query: '%container%', filter: '%container%' },
  'land-for-sale': { type: 'land', label: 'Land', transaction: 'sale', query: '%land%', filter: '%land%' },
  '2-bedroom-houses-for-rent': { type: '2-bedroom-houses', label: '2-Bedroom Houses', transaction: 'rent', query: '', filter: '', bedroom: 2 },
  '2-bedroom-houses-for-sale': { type: '2-bedroom-houses', label: '2-Bedroom Houses', transaction: 'sale', query: '', filter: '', bedroom: 2 },
  '3-bedroom-houses-for-rent': { type: '3-bedroom-houses', label: '3-Bedroom Houses', transaction: 'rent', query: '', filter: '', bedroom: 3 },
  '3-bedroom-houses-for-sale': { type: '3-bedroom-houses', label: '3-Bedroom Houses', transaction: 'sale', query: '', filter: '', bedroom: 3 },
  '4-bedroom-houses-for-rent': { type: '4-bedroom-houses', label: '4-Bedroom Houses', transaction: 'rent', query: '', filter: '', bedroom: 4 },
  '4-bedroom-houses-for-sale': { type: '4-bedroom-houses', label: '4-Bedroom Houses', transaction: 'sale', query: '', filter: '', bedroom: 4 },
  '5-bedroom-houses-for-rent': { type: '5-bedroom-houses', label: '5-Bedroom Houses', transaction: 'rent', query: '', filter: '', bedroom: 5 },
  '5-bedroom-houses-for-sale': { type: '5-bedroom-houses', label: '5-Bedroom Houses', transaction: 'sale', query: '', filter: '', bedroom: 5 },
};

const srcDir = path.join(__dirname, 'src', 'app');

// Files to process (excluding bungalows-for-rent which is partially done, and bedsitters-for-rent which is complete)
const filesToProcess = [
  'bungalows-for-rent', // Continue this one
  'bungalows-for-sale',
  'maisonettes-for-rent',
  'maisonettes-for-sale',
  'villas-for-rent',
  'villas-for-sale',
  'townhouses-for-rent',
  'townhouses-for-sale',
  'studio-apartments-for-rent',
  'studio-apartments-for-sale',
  '2-bedroom-houses-for-rent',
  '2-bedroom-houses-for-sale',
  '3-bedroom-houses-for-rent',
  '3-bedroom-houses-for-sale',
  '4-bedroom-houses-for-rent',
  '4-bedroom-houses-for-sale',
  '5-bedroom-houses-for-rent',
  '5-bedroom-houses-for-sale',
  'commercial-properties-for-rent',
  'commercial-properties-for-sale',
  'office-space-for-rent',
  'shops-for-rent',
  'shops-for-sale',
  'warehouses-for-rent',
  'warehouses-for-sale',
  'serviced-apartments-for-rent',
  'container-houses-for-sale',
  'land-for-sale',
];

console.log('Files to update manually:');
filesToProcess.forEach((file, index) => {
  const filePath = path.join(srcDir, file, '[location]', 'page.tsx');
  const config = propertyConfig[file];
  console.log(`${index + 1}. ${file}`);
  console.log(`   Path: ${filePath}`);
  console.log(`   Config: ${JSON.stringify(config)}`);
  console.log('');
});

console.log(`\nTotal files: ${filesToProcess.length}`);
console.log('\nNote: bedsitters-for-rent is already complete');
console.log('Note: bungalows-for-rent needs remaining updates (metadata and page component)');
