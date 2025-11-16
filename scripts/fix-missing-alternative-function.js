const fs = require('fs');
const path = require('path');

const propertyPages = [
  { page: 'houses-for-sale', query: '%house%', trans: 'sale' },
  { page: 'houses-for-rent', query: '%house%', trans: 'rent' },
  { page: 'apartments-for-sale', query: '%apartment%', trans: 'sale' },
  { page: 'bungalows-for-rent', query: '%bungalow%', trans: 'rent' },
  { page: 'bungalows-for-sale', query: '%bungalow%', trans: 'sale' },
  { page: 'maisonettes-for-rent', query: '%maisonette%', trans: 'rent' },
  { page: 'maisonettes-for-sale', query: '%maisonette%', trans: 'sale' },
  { page: 'townhouses-for-rent', query: '%townhouse%', trans: 'rent' },
  { page: 'townhouses-for-sale', query: '%townhouse%', trans: 'sale' },
  { page: 'villas-for-rent', query: '%villa%', trans: 'rent' },
  { page: 'bedsitters-for-rent', query: '%bedsitter%', trans: 'rent' },
  { page: 'studio-apartments-for-rent', query: '%studio%', trans: 'rent' },
  { page: 'studio-apartments-for-sale', query: '%studio%', trans: 'sale' },
];

const pagesDir = path.join(__dirname, '..', 'src', 'app');

propertyPages.forEach(({ page, query, trans }) => {
  const pagePath = path.join(pagesDir, page, '[location]', 'page.tsx');

  if (!fs.existsSync(pagePath)) {
    console.log(`⚠️  Skipping ${page} - file not found`);
    return;
  }

  let content = fs.readFileSync(pagePath, 'utf8');

  // Check if already has getAlternativeProperties function
  if (content.includes('async function getAlternativeProperties')) {
    console.log(`⏭️  ${page} already has getAlternativeProperties`);
    return;
  }

  const alternativeFunction = `
// Get alternative properties from nearby locations
async function getAlternativeProperties(location: Location, limit: number = 8): Promise<PropertyListing[]> {
  const countyName = location.county.replace(/ County$/i, '');

  // Get properties from same county
  let query = supabase
    .from('property_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('price_type', '${trans}')
    .ilike('property_type', '${query}')
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

  // Try to find a good place to insert before generateMetadata or getRelatedLocations
  let inserted = false;

  // Try before generateMetadata
  if (content.includes('export async function generateMetadata')) {
    content = content.replace(
      'export async function generateMetadata',
      alternativeFunction + '\nexport async function generateMetadata'
    );
    inserted = true;
  } else if (content.includes('// Get related locations\nasync function getRelatedLocations')) {
    content = content.replace(
      '// Get related locations\nasync function getRelatedLocations',
      alternativeFunction + '\n// Get related locations\nasync function getRelatedLocations'
    );
    inserted = true;
  }

  if (inserted) {
    fs.writeFileSync(pagePath, content, 'utf8');
    console.log(`✓ Added getAlternativeProperties to ${page}`);
  } else {
    console.log(`⚠️  Could not find insertion point in ${page}`);
  }
});

console.log('\n✅ Done!');
