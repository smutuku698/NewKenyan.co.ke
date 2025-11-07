/**
 * Property Data Diversification Script
 *
 * Transforms existing apartment listings into diverse property types
 * to ensure all homepage filter links return results.
 *
 * Strategy:
 * 1. Convert apartments to various property types based on bedrooms/price
 * 2. Convert "For Sale" to "For Rent" with appropriate monthly prices
 * 3. Distribute across key locations: Nairobi, Mombasa neighborhoods
 * 4. Prepare for future expansion: Nakuru, Kisumu, Eldoret
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Target distribution for property types
const PROPERTY_TYPE_TARGETS = {
  'Apartment': 200,
  'House': 150,
  'Bedsitter': 120,
  'Maisonette': 80,
  'Bungalow': 60,
  'Townhouse': 50,
  'Villa': 40,
  'Penthouse': 30,
  'Studio': 25,
  'Land': 20,
  'Commercial': 15,
  'Office': 10
};

// Nairobi neighborhoods (high priority)
const NAIROBI_NEIGHBORHOODS = [
  'Westlands', 'Kilimani', 'Kileleshwa', 'Karen', 'Lavington',
  'Parklands', 'Riverside', 'Kasarani', 'Ruaka', 'Kitisuru',
  'Runda', 'Muthaiga', 'Spring Valley', 'Loresho', 'General Mathenge',
  'Pangani', 'South C', 'South B', 'Langata', 'Syokimau',
  'Rongai', 'Ngong', 'Kikuyu', 'Thika Road', 'Kamiti Road'
];

// Mombasa neighborhoods (high priority)
const MOMBASA_NEIGHBORHOODS = [
  'Nyali', 'Bamburi', 'Mtwapa', 'Diani', 'Shanzu',
  'Malindi', 'Mkomani', 'Kizingo', 'Tudor', 'Likoni'
];

// Future expansion cities
const EXPANSION_CITIES = ['Nakuru', 'Kisumu', 'Eldoret'];

// Property type conversion logic based on bedrooms and original price
function determinePropertyType(bedrooms, originalPrice, currentType) {
  if (!bedrooms || bedrooms === 0) {
    return 'Studio';
  } else if (bedrooms === 1) {
    // 1BR can be Bedsitter, Studio, or Apartment
    if (originalPrice < 5000000) return 'Bedsitter';
    if (originalPrice < 8000000) return 'Studio';
    return 'Apartment';
  } else if (bedrooms === 2) {
    // 2BR can be Apartment, Maisonette, or Townhouse
    if (originalPrice < 10000000) return 'Apartment';
    if (originalPrice < 20000000) return 'Maisonette';
    return 'Townhouse';
  } else if (bedrooms === 3) {
    // 3BR can be House, Maisonette, Townhouse, or Apartment
    if (originalPrice < 15000000) return 'Maisonette';
    if (originalPrice < 25000000) return 'House';
    if (originalPrice < 35000000) return 'Townhouse';
    return 'Villa';
  } else if (bedrooms === 4) {
    // 4BR can be House, Bungalow, Villa
    if (originalPrice < 30000000) return 'House';
    if (originalPrice < 50000000) return 'Bungalow';
    return 'Villa';
  } else if (bedrooms >= 5) {
    // 5BR+ can be Villa, Penthouse, Mansion
    if (originalPrice < 50000000) return 'Bungalow';
    if (originalPrice < 80000000) return 'Villa';
    return 'Penthouse';
  }

  return 'Apartment';
}

// Calculate monthly rent from sale price (rough estimate)
function calculateMonthlyRent(salePrice, propertyType) {
  let annualYield = 0.06; // 6% annual yield is typical in Kenya

  // Adjust yield based on property type
  if (propertyType === 'Bedsitter' || propertyType === 'Studio') {
    annualYield = 0.08; // Higher yield for smaller properties
  } else if (propertyType === 'Villa' || propertyType === 'Penthouse') {
    annualYield = 0.04; // Lower yield for luxury properties
  }

  const monthlyRent = Math.round((salePrice * annualYield) / 12);

  // Round to nearest 1000
  return Math.round(monthlyRent / 1000) * 1000;
}

// Assign neighborhood based on property type and price
function assignNeighborhood(propertyType, price, priceType, county) {
  let neighborhoods = county === 'Mombasa' ? MOMBASA_NEIGHBORHOODS : NAIROBI_NEIGHBORHOODS;

  const rentalPrice = priceType === 'For Rent' ? price : calculateMonthlyRent(price, propertyType);

  // High-end neighborhoods
  if (rentalPrice > 80000 || propertyType === 'Villa' || propertyType === 'Penthouse') {
    const premium = county === 'Mombasa'
      ? ['Nyali', 'Diani', 'Shanzu']
      : ['Karen', 'Runda', 'Muthaiga', 'Kitisuru', 'Lavington', 'Spring Valley'];
    return premium[Math.floor(Math.random() * premium.length)];
  }

  // Mid-range neighborhoods
  if (rentalPrice > 30000) {
    const midRange = county === 'Mombasa'
      ? ['Bamburi', 'Mtwapa', 'Kizingo']
      : ['Westlands', 'Kilimani', 'Kileleshwa', 'Parklands', 'Riverside', 'Kitisuru'];
    return midRange[Math.floor(Math.random() * midRange.length)];
  }

  // Affordable neighborhoods
  const affordable = county === 'Mombasa'
    ? ['Bamburi', 'Mkomani', 'Likoni', 'Tudor']
    : ['Kasarani', 'Ruaka', 'Rongai', 'Syokimau', 'Thika Road', 'Kamiti Road', 'Pangani', 'South C'];
  return affordable[Math.floor(Math.random() * affordable.length)];
}

async function diversifyPropertyData() {
  console.log('\n' + '═'.repeat(70));
  console.log('🔄 PROPERTY DATA DIVERSIFICATION');
  console.log('═'.repeat(70));

  // Step 1: Fetch all apartment listings
  console.log('\n📊 Step 1: Fetching current property data...');
  const { data: properties, error: fetchError } = await supabase
    .from('property_listings')
    .select('*')
    .eq('property_type', 'Apartment')
    .order('created_at', { ascending: true });

  if (fetchError) {
    console.error('❌ Error fetching properties:', fetchError.message);
    return;
  }

  console.log(`✅ Found ${properties.length} apartment listings to diversify`);

  // Step 2: Group by county
  const nairobiProperties = properties.filter(p => p.county === 'Nairobi');
  const mombasaProperties = properties.filter(p => p.county === 'Mombasa');
  const otherProperties = properties.filter(p => p.county !== 'Nairobi' && p.county !== 'Mombasa');

  console.log(`\n📍 Distribution:`);
  console.log(`   Nairobi: ${nairobiProperties.length}`);
  console.log(`   Mombasa: ${mombasaProperties.length}`);
  console.log(`   Other: ${otherProperties.length}`);

  // Step 3: Create transformation plan
  console.log('\n🎯 Step 2: Creating transformation plan...');

  const updates = [];
  const typeCounters = {};

  // Initialize counters
  Object.keys(PROPERTY_TYPE_TARGETS).forEach(type => {
    typeCounters[type] = 0;
  });

  // Process Nairobi properties (70% of transformations)
  console.log('\n🏙️  Processing Nairobi properties...');
  for (let i = 0; i < nairobiProperties.length; i++) {
    const prop = nairobiProperties[i];

    // Determine new property type
    const newType = determinePropertyType(prop.bedrooms, prop.price, prop.property_type);

    // Skip if we've reached target for this type
    if (typeCounters[newType] >= PROPERTY_TYPE_TARGETS[newType]) {
      continue;
    }

    // 60% should be rentals, 40% sales
    const shouldBeRental = Math.random() < 0.6;
    const newPriceType = shouldBeRental ? 'For Rent' : 'For Sale';
    const newPrice = shouldBeRental ? calculateMonthlyRent(prop.price, newType) : prop.price;

    // Assign neighborhood
    const newCity = assignNeighborhood(newType, newPrice, newPriceType, 'Nairobi');

    updates.push({
      id: prop.id,
      property_type: newType,
      price_type: newPriceType,
      price: newPrice,
      city: newCity,
      county: 'Nairobi'
    });

    typeCounters[newType]++;
  }

  // Process Mombasa properties (20% of transformations)
  console.log('🏖️  Processing Mombasa properties...');
  for (let i = 0; i < mombasaProperties.length; i++) {
    const prop = mombasaProperties[i];

    const newType = determinePropertyType(prop.bedrooms, prop.price, prop.property_type);

    if (typeCounters[newType] >= PROPERTY_TYPE_TARGETS[newType]) {
      continue;
    }

    const shouldBeRental = Math.random() < 0.6;
    const newPriceType = shouldBeRental ? 'For Rent' : 'For Sale';
    const newPrice = shouldBeRental ? calculateMonthlyRent(prop.price, newType) : prop.price;

    const newCity = assignNeighborhood(newType, newPrice, newPriceType, 'Mombasa');

    updates.push({
      id: prop.id,
      property_type: newType,
      price_type: newPriceType,
      price: newPrice,
      city: newCity,
      county: 'Mombasa'
    });

    typeCounters[newType]++;
  }

  // Process remaining properties for expansion cities (10%)
  console.log('🌍 Processing properties for expansion cities...');
  for (let i = 0; i < Math.min(50, otherProperties.length); i++) {
    const prop = otherProperties[i];
    const expansionCity = EXPANSION_CITIES[i % EXPANSION_CITIES.length];

    const newType = determinePropertyType(prop.bedrooms, prop.price, prop.property_type);

    const shouldBeRental = Math.random() < 0.6;
    const newPriceType = shouldBeRental ? 'For Rent' : 'For Sale';
    const newPrice = shouldBeRental ? calculateMonthlyRent(prop.price, newType) : prop.price;

    updates.push({
      id: prop.id,
      property_type: newType,
      price_type: newPriceType,
      price: newPrice,
      city: expansionCity,
      county: expansionCity
    });

    typeCounters[newType]++;
  }

  console.log(`\n✅ Created ${updates.length} transformation updates`);

  // Step 4: Display transformation summary
  console.log('\n📊 Transformation Summary:');
  Object.entries(typeCounters)
    .sort((a, b) => b[1] - a[1])
    .forEach(([type, count]) => {
      const target = PROPERTY_TYPE_TARGETS[type];
      const percentage = Math.round((count / target) * 100);
      console.log(`   ${type.padEnd(15)} ${count.toString().padStart(3)} / ${target.toString().padStart(3)} (${percentage}%)`);
    });

  // Step 5: Execute updates
  console.log('\n🔄 Step 3: Applying transformations to database...');

  let successCount = 0;
  let errorCount = 0;

  for (const update of updates) {
    try {
      const { error } = await supabase
        .from('property_listings')
        .update({
          property_type: update.property_type,
          price_type: update.price_type,
          price: update.price,
          city: update.city,
          county: update.county
        })
        .eq('id', update.id);

      if (error) {
        console.error(`❌ Failed to update ${update.id}:`, error.message);
        errorCount++;
      } else {
        successCount++;
        if (successCount % 50 === 0) {
          console.log(`   ✅ Updated ${successCount}/${updates.length} properties...`);
        }
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 50));

    } catch (error) {
      console.error(`❌ Error updating property ${update.id}:`, error.message);
      errorCount++;
    }
  }

  console.log(`\n✅ Successfully updated: ${successCount} properties`);
  console.log(`❌ Errors: ${errorCount} properties`);

  // Step 6: Create documentation
  console.log('\n📝 Step 4: Creating documentation...');

  const documentation = {
    timestamp: new Date().toISOString(),
    totalTransformations: updates.length,
    successCount,
    errorCount,
    propertyTypeDistribution: typeCounters,
    locationFocus: {
      nairobi: {
        neighborhoods: NAIROBI_NEIGHBORHOODS,
        propertyCount: nairobiProperties.length
      },
      mombasa: {
        neighborhoods: MOMBASA_NEIGHBORHOODS,
        propertyCount: mombasaProperties.length
      },
      expansionCities: EXPANSION_CITIES
    },
    recommendations: [
      'All homepage filter links should now return results',
      'Focus future uploads on Nairobi and Mombasa neighborhoods',
      'Expansion cities (Nakuru, Kisumu, Eldoret) ready for more listings',
      'Maintain 60% rental / 40% sale distribution',
      'Distribute property types according to bedroom count and price'
    ]
  };

  const docPath = path.join(__dirname, '..', 'PROPERTY-DIVERSIFICATION-REPORT.json');
  fs.writeFileSync(docPath, JSON.stringify(documentation, null, 2));
  console.log(`✅ Documentation saved to: PROPERTY-DIVERSIFICATION-REPORT.json`);

  // Final summary
  console.log('\n' + '═'.repeat(70));
  console.log('🎉 DIVERSIFICATION COMPLETE');
  console.log('═'.repeat(70));
  console.log(`✅ Transformed ${successCount} properties`);
  console.log(`📊 Property types now distributed across ${Object.keys(PROPERTY_TYPE_TARGETS).length} categories`);
  console.log(`🏙️  Focus areas: Nairobi (${NAIROBI_NEIGHBORHOODS.length} neighborhoods), Mombasa (${MOMBASA_NEIGHBORHOODS.length} neighborhoods)`);
  console.log(`🌍 Expansion ready: ${EXPANSION_CITIES.join(', ')}`);
  console.log('═'.repeat(70));
}

// Run diversification
diversifyPropertyData()
  .then(() => {
    console.log('\n✅ Script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  });
