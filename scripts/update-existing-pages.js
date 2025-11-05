/**
 * Script to update existing property pages with new components
 * Run with: node scripts/update-existing-pages.js
 */

const fs = require('fs');
const path = require('path');

const pages = [
  { path: 'src/app/houses-for-rent/[location]/page.tsx', propertyType: 'houses', transaction: 'rent' },
  { path: 'src/app/apartments-for-sale/[location]/page.tsx', propertyType: 'apartments', transaction: 'sale' },
  { path: 'src/app/apartments-for-rent/[location]/page.tsx', propertyType: 'apartments', transaction: 'rent' },
];

pages.forEach(({ path: filePath, propertyType, transaction }) => {
  const fullPath = path.join(__dirname, '..', filePath);
  let content = fs.readFileSync(fullPath, 'utf8');

  // Replace imports
  content = content.replace(
    /import LocationDirectory from '@\/components\/LocationDirectory';/,
    `import PropertyTypeSwitcher from '@/components/PropertyTypeSwitcher';
import CountyCrossLinks from '@/components/CountyCrossLinks';
import RelatedLocations from '@/components/RelatedLocations';`
  );

  content = content.replace(
    /from '@\/lib\/location-seo';/,
    `from '@/lib/location-seo';
import {
  generatePropertyMetadata,
  generatePropertyH1,
  generatePropertyBreadcrumbs,
  generatePropertySchema,
  generateAboutContent,
  formatPrice
} from '@/lib/property-page-generator';`
  );

  // Replace getAllLocations with getRelatedLocations
  content = content.replace(
    /async function getAllLocations\(\) \{[\s\S]*?\n\}/,
    `// Get related locations
async function getRelatedLocations(location: Location) {
  let query = supabase
    .from('locations')
    .select('name, slug, type, county, city')
    .eq('is_active', true);

  // Get locations in the same area
  if (location.type === 'county') {
    query = query.eq('county', location.name).neq('slug', location.slug);
  } else {
    query = query.eq('county', location.county).neq('slug', location.slug);
  }

  query = query.order('name').limit(50);

  const { data, error } = await query;
  if (error || !data) return [];
  return data;
}`
  );

  // Replace metadata generation
  content = content.replace(
    /return generateLocationMetadata\(location, '.*?', '.*?', stats\);/,
    `return generatePropertyMetadata(location, '${propertyType}', '${transaction}', stats);`
  );

  // Replace h1 and breadcrumb generation
  content = content.replace(
    /const h1 = generateH1\(location, '.*?', '.*?', h1VariationIndex\);/,
    `const h1 = generatePropertyH1(location, '${propertyType}', '${transaction}', h1VariationIndex);`
  );

  content = content.replace(
    /const breadcrumbItems = generateBreadcrumbs\(location, '.*?', '.*?'\);/,
    `const breadcrumbItems = generatePropertyBreadcrumbs(location, '${propertyType}', '${transaction}');
  const aboutContent = generateAboutContent(location, '${propertyType}', '${transaction}', stats);`
  );

  // Replace allLocations with relatedLocations
  content = content.replace(
    /const allLocations = await getAllLocations\(\);/,
    `const relatedLocations = await getRelatedLocations(location);`
  );

  // Remove formatPrice function definition (now imported)
  content = content.replace(
    /\/\/ Format price\s+const formatPrice = \(price: number\) => \{[\s\S]*?\};/,
    ''
  );

  // Replace hero section description
  content = content.replace(
    /\{location\.description \|\| `[\s\S]*?`\}/,
    `{aboutContent.paragraphs[0]}`
  );

  // Replace About Location section
  const aboutSectionRegex = /\{\/\* Location Information \*\/\}[\s\S]*?<\/div>\s+\{\/\* Schema\.org JSON-LD \*\/\}/;
  const newAboutSection = `{/* About Location */}
        <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
          <h2 className="text-2xl font-bold mb-4">{aboutContent.title}</h2>
          <div className="prose max-w-none text-gray-600">
            {aboutContent.paragraphs.map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}

            {aboutContent.features.length > 0 && (
              <>
                <h3 className="text-lg font-semibold mt-6 mb-3">
                  Why Choose {location.name}?
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  {aboutContent.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </>
            )}

            {stats.popularAmenities.length > 0 && (
              <>
                <h3 className="text-lg font-semibold mt-6 mb-3">Popular Features</h3>
                <div className="flex flex-wrap gap-2 mt-3">
                  {stats.popularAmenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Related Locations */}
        <RelatedLocations
          currentLocation={location}
          relatedLocations={relatedLocations}
          propertyType="${propertyType}"
          transactionType="${transaction}"
          className="mb-8"
        />

        {/* County Cross Links */}
        <CountyCrossLinks
          currentCountySlug={location.type === 'county' ? location.slug : \`\${location.county.toLowerCase().replace(/\\s+/g, '-')}-county\`}
          propertyType="${propertyType}"
          transactionType="${transaction}"
          className="mb-8"
        />

        {/* Schema.org JSON-LD */}`;

  content = content.replace(aboutSectionRegex, newAboutSection);

  // Add PropertyTypeSwitcher after stats
  const statsEndRegex = /\{\/\* Infinite Scroll Properties List with Filters \*\/\}/;
  content = content.replace(
    statsEndRegex,
    `{/* Property Type Switcher */}
        <PropertyTypeSwitcher
          currentPropertyType="${propertyType}"
          currentTransaction="${transaction}"
          locationSlug={location.slug}
          locationName={location.name}
          className="mb-8"
        />

        {/* Infinite Scroll Properties List with Filters */}`
  );

  // Replace LocationDirectory with nothing (we're using RelatedLocations and CountyCrossLinks instead)
  content = content.replace(
    /\{\/\* Location Directory - Massive Internal Linking \*\/\}[\s\S]*?<LocationDirectory[\s\S]*?\/>/,
    ''
  );

  // Replace generateLocationSchema with generatePropertySchema
  content = content.replace(
    /generateLocationSchema\(/g,
    'generatePropertySchema('
  );

  fs.writeFileSync(fullPath, content);
  console.log(`✅ Updated: ${filePath}`);
});

console.log('\n🎉 Successfully updated all existing property pages!');
