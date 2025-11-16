const fs = require('fs');
const path = require('path');

const propertyPages = [
  'houses-for-sale',
  'houses-for-rent',
  'apartments-for-sale',
  'bungalows-for-rent',
  'bungalows-for-sale',
  'maisonettes-for-rent',
  'maisonettes-for-sale',
  'townhouses-for-rent',
  'townhouses-for-sale',
  'villas-for-rent',
  'bedsitters-for-rent',
  'studio-apartments-for-rent',
  'studio-apartments-for-sale',
];

const pagesDir = path.join(__dirname, '..', 'src', 'app');

propertyPages.forEach(pageType => {
  const pagePath = path.join(pagesDir, pageType, '[location]', 'page.tsx');

  if (!fs.existsSync(pagePath)) {
    console.log(`⚠️  Skipping ${pageType} - file not found`);
    return;
  }

  let content = fs.readFileSync(pagePath, 'utf8');

  // Check if already has PropertyCard import
  if (!content.includes("import PropertyCard from '@/components/PropertyCard'")) {
    // Add PropertyCard import after RelatedLocations import
    content = content.replace(
      "import RelatedLocations from '@/components/RelatedLocations';",
      "import RelatedLocations from '@/components/RelatedLocations';\nimport PropertyCard from '@/components/PropertyCard';"
    );
    console.log(`✓ Added PropertyCard import to ${pageType}`);
  }

  // Check if already has getAlternativeProperties function
  if (!content.includes('async function getAlternativeProperties')) {
    // Extract property type query from existing code
    const dbQueryMatch = content.match(/const DB_QUERY = ['"]([^'"]+)['"]/);
    const transactionTypeMatch = content.match(/const TRANSACTION_TYPE = ['"]([^'"]+)['"]/);

    if (dbQueryMatch && transactionTypeMatch) {
      const dbQuery = dbQueryMatch[1];
      const transactionType = transactionTypeMatch[1];

      const alternativeFunction = `
// Get alternative properties from nearby locations
async function getAlternativeProperties(location: Location, limit: number = 8): Promise<PropertyListing[]> {
  const countyName = location.county.replace(/ County$/i, '');

  // Get properties from same county
  let query = supabase
    .from('property_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('price_type', '${transactionType}')
    .ilike('property_type', '${dbQuery}')
    .ilike('county', \`%\${countyName}%\`)
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(limit);

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching alternative properties:', error);
    return [];
  }

  return data || [];
}
`;

      // Add before getRelatedLocations function
      content = content.replace(
        '// Get related locations\nasync function getRelatedLocations',
        alternativeFunction + '\n// Get related locations\nasync function getRelatedLocations'
      );
      console.log(`✓ Added getAlternativeProperties function to ${pageType}`);
    }
  }

  // Check if already fetches alternativeProperties in main component
  if (!content.includes('const alternativeProperties')) {
    content = content.replace(
      /const relatedLocations = await getRelatedLocations\(location\);/,
      `const relatedLocations = await getRelatedLocations(location);

  // Get alternative properties if we have fewer than 3 or none
  const needsAlternatives = properties.length < 3;
  const alternativeProperties = needsAlternatives ? await getAlternativeProperties(location, 8) : [];`
    );
    console.log(`✓ Added alternativeProperties fetch to ${pageType}`);
  }

  // Write back the modified content
  fs.writeFileSync(pagePath, content, 'utf8');
});

console.log('\n✅ Fallback functions added to all property pages!');
console.log('\n⚠️  Note: You still need to manually update the JSX to display alternative properties');
console.log('   Copy the fallback JSX from apartments-for-rent or villas-for-sale pages');
