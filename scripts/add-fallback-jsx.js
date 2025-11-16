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

  // Skip if already has alternative properties JSX
  if (content.includes('Show alternative properties from nearby areas')) {
    console.log(`⏭️  Skipping ${pageType} - already has fallback JSX`);
    return;
  }

  // Find the empty state div pattern
  const emptyStatePattern = /\) : \(\s*<div className="text-center py-12[^>]*>[\s\S]*?<\/div>\s*\)\}/;

  if (!emptyStatePattern.test(content)) {
    console.log(`⚠️  Could not find empty state in ${pageType}`);
    return;
  }

  // Determine the property label
  let propertyLabel = 'Properties';
  if (pageType.includes('houses')) propertyLabel = 'Houses';
  else if (pageType.includes('apartments')) propertyLabel = 'Apartments';
  else if (pageType.includes('villas')) propertyLabel = 'Villas';
  else if (pageType.includes('bungalows')) propertyLabel = 'Bungalows';
  else if (pageType.includes('maisonettes')) propertyLabel = 'Maisonettes';
  else if (pageType.includes('townhouses')) propertyLabel = 'Townhouses';
  else if (pageType.includes('bedsitters')) propertyLabel = 'Bedsitters';
  else if (pageType.includes('studio')) propertyLabel = 'Studios';

  const transactionLabel = pageType.includes('sale') ? 'Sale' : 'Rent';
  const transactionLower = transactionLabel.toLowerCase();

  // Replace the empty state with enhanced version
  content = content.replace(
    emptyStatePattern,
    `) : (
          <>
            <div className="text-center py-12 mb-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No ${propertyLabel.toLowerCase()} for ${transactionLower} found in {location.name}
              </h3>
              <p className="text-gray-600 mb-6">
                Be the first to list a property in {location.name}!
              </p>
              <a
                href="/add-listing"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                List Your Property
              </a>
            </div>

            {/* Show alternative properties from nearby areas */}
            {alternativeProperties.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  ${propertyLabel} for ${transactionLabel} in {location.county}
                </h2>
                <p className="text-gray-600 mb-6">
                  Check out these ${propertyLabel.toLowerCase()} for ${transactionLower} in nearby areas within {location.county}
                </p>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {alternativeProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      id={property.id}
                      title={property.property_title}
                      type={property.property_type}
                      price={property.price}
                      priceType={property.price_type}
                      bedrooms={property.bedrooms || undefined}
                      bathrooms={property.bathrooms || undefined}
                      squareFeet={property.square_feet || undefined}
                      location={\`\${property.city}\${property.county ? \`, \${property.county}\` : ''}\`}
                      city={property.city}
                      images={property.images}
                      amenities={property.amenities}
                      contactPhone={property.contact_phone}
                      whatsappNumber={property.whatsapp_number || undefined}
                      createdAt={property.created_at}
                      isFeatured={property.is_featured}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}`
  );

  // Now add the "less than 3 properties" fallback right after the closing of the above ternary
  // Find where to insert by looking for the closing of the properties list section
  const insertPattern = /(\)\})\s*(<div className="bg-white p-8 rounded-lg|<script|<RelatedLocations|<CountyCrossLinks)/;

  if (insertPattern.test(content)) {
    content = content.replace(
      insertPattern,
      `)}

        {/* Show alternative properties when we have less than 3 exact matches */}
        {properties.length > 0 && properties.length < 3 && alternativeProperties.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              More ${propertyLabel} for ${transactionLabel} in {location.county}
            </h2>
            <p className="text-gray-600 mb-6">
              Explore more ${propertyLabel.toLowerCase()} for ${transactionLower} in nearby areas
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {alternativeProperties.filter(alt => !properties.find(p => p.id === alt.id)).slice(0, 8).map((property) => (
                <PropertyCard
                  key={property.id}
                  id={property.id}
                  title={property.property_title}
                  type={property.property_type}
                  price={property.price}
                  priceType={property.price_type}
                  bedrooms={property.bedrooms || undefined}
                  bathrooms={property.bathrooms || undefined}
                  squareFeet={property.square_feet || undefined}
                  location={\`\${property.city}\${property.county ? \`, \${property.county}\` : ''}\`}
                  city={property.city}
                  images={property.images}
                  amenities={property.amenities}
                  contactPhone={property.contact_phone}
                  whatsappNumber={property.whatsapp_number || undefined}
                  createdAt={property.created_at}
                  isFeatured={property.is_featured}
                />
              ))}
            </div>
          </div>
        )}

        $2`
    );
  }

  fs.writeFileSync(pagePath, content, 'utf8');
  console.log(`✓ Added fallback JSX to ${pageType}`);
});

console.log('\n✅ All property pages updated with fallback displays!');
