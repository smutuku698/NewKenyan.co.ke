/**
 * Generate Property Listings for All Kenyan Counties
 *
 * This script generates 15 properties per county (5 houses, 5 bedsitters, 5 apartments)
 * for all 47 counties in Kenya, reusing existing images from the database.
 *
 * Usage: node scripts/generate-county-properties.js
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const ADMIN_USER_ID = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';

// All 47 Kenyan Counties with major towns/cities
const KENYA_COUNTIES = [
  { county: 'Nairobi', cities: ['Nairobi', 'Westlands', 'Kilimani', 'Karen', 'Kileleshwa', 'Kasarani'] },
  { county: 'Mombasa', cities: ['Mombasa', 'Nyali', 'Bamburi', 'Likoni', 'Changamwe'] },
  { county: 'Nakuru', cities: ['Nakuru', 'Naivasha', 'Gilgil', 'Molo', 'Njoro'] },
  { county: 'Kiambu', cities: ['Thika', 'Kikuyu', 'Ruiru', 'Limuru', 'Kiambu'] },
  { county: 'Kisumu', cities: ['Kisumu', 'Ahero', 'Maseno', 'Muhoroni'] },
  { county: 'Uasin Gishu', cities: ['Eldoret', 'Kapsabet', 'Turbo', 'Burnt Forest'] },
  { county: 'Machakos', cities: ['Machakos', 'Athi River', 'Mlolongo', 'Kangundo'] },
  { county: 'Kajiado', cities: ['Kajiado', 'Kitengela', 'Ngong', 'Ongata Rongai'] },
  { county: 'Meru', cities: ['Meru', 'Maua', 'Mikinduri', 'Nkubu'] },
  { county: 'Nyeri', cities: ['Nyeri', 'Karatina', 'Othaya', 'Mukurweini'] },
  { county: 'Kakamega', cities: ['Kakamega', 'Mumias', 'Butere', 'Khayega'] },
  { county: 'Bungoma', cities: ['Bungoma', 'Webuye', 'Kimilili', 'Chwele'] },
  { county: 'Kilifi', cities: ['Kilifi', 'Malindi', 'Watamu', 'Mtwapa'] },
  { county: 'Trans Nzoia', cities: ['Kitale', 'Kiminini', 'Endebess'] },
  { county: 'Kericho', cities: ['Kericho', 'Litein', 'Londiani', 'Kipkelion'] },
  { county: 'Embu', cities: ['Embu', 'Siakago', 'Runyenjes'] },
  { county: 'Nandi', cities: ['Kapsabet', 'Nandi Hills', 'Mosoriot'] },
  { county: 'Kwale', cities: ['Kwale', 'Ukunda', 'Msambweni', 'Kinango'] },
  { county: 'Bomet', cities: ['Bomet', 'Longisa', 'Sotik'] },
  { county: 'Kirinyaga', cities: ['Kerugoya', 'Kutus', 'Sagana', 'Kagio'] },
  { county: 'Narok', cities: ['Narok', 'Kilgoris', 'Loita'] },
  { county: 'Murang\'a', cities: ['Murang\'a', 'Kenol', 'Kandara', 'Makuyu'] },
  { county: 'Kisii', cities: ['Kisii', 'Ogembo', 'Keroka'] },
  { county: 'Laikipia', cities: ['Nanyuki', 'Nyahururu', 'Rumuruti'] },
  { county: 'Nyamira', cities: ['Nyamira', 'Keroka', 'Nyansiongo'] },
  { county: 'Busia', cities: ['Busia', 'Malaba', 'Bumala'] },
  { county: 'Siaya', cities: ['Siaya', 'Bondo', 'Ugunja', 'Yala'] },
  { county: 'Homa Bay', cities: ['Homa Bay', 'Oyugis', 'Mbita', 'Ndhiwa'] },
  { county: 'Migori', cities: ['Migori', 'Rongo', 'Awendo', 'Kehancha'] },
  { county: 'Vihiga', cities: ['Vihiga', 'Mbale', 'Hamisi'] },
  { county: 'Elgeyo Marakwet', cities: ['Iten', 'Kapsowar', 'Tambach'] },
  { county: 'Baringo', cities: ['Kabarnet', 'Marigat', 'Eldama Ravine'] },
  { county: 'Nyandarua', cities: ['Ol Kalou', 'Nyahururu', 'Engineer'] },
  { county: 'Makueni', cities: ['Wote', 'Makutano', 'Emali'] },
  { county: 'Kitui', cities: ['Kitui', 'Mwingi', 'Mutomo'] },
  { county: 'Tharaka Nithi', cities: ['Chuka', 'Kathwana', 'Marimanti'] },
  { county: 'Taita Taveta', cities: ['Voi', 'Wundanyi', 'Taveta'] },
  { county: 'Lamu', cities: ['Lamu', 'Mpeketoni', 'Witu'] },
  { county: 'Tana River', cities: ['Hola', 'Garsen', 'Bura'] },
  { county: 'Garissa', cities: ['Garissa', 'Dadaab', 'Balambala'] },
  { county: 'Wajir', cities: ['Wajir', 'Habaswein', 'Diff'] },
  { county: 'Mandera', cities: ['Mandera', 'Elwak', 'Rhamu'] },
  { county: 'Marsabit', cities: ['Marsabit', 'Moyale', 'Loiyangalani'] },
  { county: 'Isiolo', cities: ['Isiolo', 'Merti', 'Garbatulla'] },
  { county: 'Samburu', cities: ['Maralal', 'Baragoi', 'Wamba'] },
  { county: 'Turkana', cities: ['Lodwar', 'Kakuma', 'Lokichogio'] },
  { county: 'West Pokot', cities: ['Kapenguria', 'Makutano', 'Ortum'] }
];

// Property type templates
const PROPERTY_TYPES = {
  house: {
    type: 'House',
    priceRange: { min: 8000000, max: 45000000 },
    rentRange: { min: 40000, max: 200000 },
    bedrooms: [3, 4, 5],
    bathrooms: [2, 3, 4],
    sqft: [1800, 2200, 2800, 3500],
    amenities: ['parking', 'garden', 'security', 'water', 'electricity', 'balcony'],
    descriptions: [
      'Spacious family home with modern finishes and ample parking',
      'Beautiful standalone house in a serene neighborhood',
      'Well-maintained property with spacious compound',
      'Modern house with contemporary design and secure perimeter',
      'Elegant home perfect for family living'
    ]
  },
  bedsitter: {
    type: 'Bedsitter',
    priceRange: { min: 1500000, max: 3500000 },
    rentRange: { min: 8000, max: 25000 },
    bedrooms: [1],
    bathrooms: [1],
    sqft: [300, 400, 500],
    amenities: ['water', 'electricity', 'security'],
    descriptions: [
      'Affordable bedsitter ideal for singles or students',
      'Cozy bedsitter in a convenient location',
      'Modern bedsitter with excellent amenities',
      'Well-designed unit perfect for young professionals',
      'Compact living space with all essentials'
    ]
  },
  apartment: {
    type: 'Apartment',
    priceRange: { min: 4500000, max: 35000000 },
    rentRange: { min: 25000, max: 150000 },
    bedrooms: [1, 2, 3],
    bathrooms: [1, 2, 3],
    sqft: [650, 900, 1200, 1500],
    amenities: ['parking', 'security', 'water', 'electricity', 'gym', 'swimming pool', 'backup generator'],
    descriptions: [
      'Modern apartment in prime location with great amenities',
      'Luxurious living space with stunning views',
      'Well-appointed apartment in secure complex',
      'Contemporary design with premium finishes',
      'Spacious apartment ideal for modern living'
    ]
  }
};

// Pricing adjustments by county tier
const COUNTY_PRICE_MULTIPLIERS = {
  'Nairobi': 1.5,
  'Mombasa': 1.3,
  'Kiambu': 1.2,
  'Nakuru': 1.0,
  'Kisumu': 0.9,
  'Uasin Gishu': 0.9,
  'Machakos': 0.85,
  'Kajiado': 1.1,
  'default': 0.75
};

// Random helper
function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Get price multiplier for county
function getPriceMultiplier(county) {
  return COUNTY_PRICE_MULTIPLIERS[county] || COUNTY_PRICE_MULTIPLIERS.default;
}

// Generate property listing
function generateProperty(county, city, propertyTypeKey, imageUrls) {
  const template = PROPERTY_TYPES[propertyTypeKey];
  const multiplier = getPriceMultiplier(county);

  const bedrooms = randomChoice(template.bedrooms);
  const bathrooms = randomChoice(template.bathrooms);
  const sqft = randomChoice(template.sqft);
  const description = randomChoice(template.descriptions);

  // Randomly choose sale or rent
  const isForSale = Math.random() > 0.4; // 60% for sale, 40% for rent

  const basePrice = isForSale
    ? randomNumber(template.priceRange.min, template.priceRange.max)
    : randomNumber(template.rentRange.min, template.rentRange.max);

  const price = Math.round(basePrice * multiplier);

  // Generate title
  const bedroomText = bedrooms > 1 ? `${bedrooms} Bedroom` : bedrooms === 1 ? '1 Bedroom' : '';
  const title = `${bedroomText} ${template.type} ${isForSale ? 'for Sale' : 'for Rent'} in ${city}`;

  // Select random images (2-5 images per property)
  const numImages = randomNumber(2, Math.min(5, imageUrls.length));
  const selectedImages = [];
  const shuffled = [...imageUrls].sort(() => 0.5 - Math.random());
  for (let i = 0; i < numImages; i++) {
    selectedImages.push(shuffled[i]);
  }

  // Random amenities (3-6 amenities)
  const numAmenities = randomNumber(3, Math.min(6, template.amenities.length));
  const selectedAmenities = [];
  const shuffledAmenities = [...template.amenities].sort(() => 0.5 - Math.random());
  for (let i = 0; i < numAmenities; i++) {
    selectedAmenities.push(shuffledAmenities[i]);
  }

  return {
    user_id: ADMIN_USER_ID,
    property_title: title,
    property_type: template.type,
    description: `${description}. Located in ${city}, ${county} County. ${bedrooms} bedroom(s), ${bathrooms} bathroom(s). Contact us for viewing arrangements.`,
    price: price,
    price_type: isForSale ? 'For Sale' : 'For Rent',
    bedrooms: bedrooms,
    bathrooms: bathrooms,
    square_feet: sqft,
    address: `${city}, ${county} County, Kenya`,
    city: city,
    county: county,
    contact_phone: '+254712345678',
    contact_email: 'info@newkenyan.co.ke',
    whatsapp_number: '+254712345678',
    amenities: selectedAmenities,
    images: selectedImages,
    available_from: null,
    is_furnished: Math.random() > 0.6,
    pets_allowed: Math.random() > 0.7,
    is_approved: true,
    is_featured: false,
    rating: 0,
    review_count: 0,
    views_count: 0
  };
}

// Fetch existing images from database
async function fetchExistingImages() {
  console.log('📸 Fetching existing images from database...');

  const { data: properties, error } = await supabase
    .from('property_listings')
    .select('images, property_type')
    .not('images', 'is', null);

  if (error) {
    console.error('❌ Error fetching images:', error);
    return { houses: [], bedsitters: [], apartments: [] };
  }

  const imagesByType = {
    houses: [],
    bedsitters: [],
    apartments: []
  };

  properties.forEach(prop => {
    if (!prop.images || prop.images.length === 0) return;

    const type = prop.property_type.toLowerCase();

    if (type.includes('house') || type.includes('villa') || type.includes('bungalow')) {
      imagesByType.houses.push(...prop.images);
    } else if (type.includes('bedsitter') || type.includes('studio')) {
      imagesByType.bedsitters.push(...prop.images);
    } else if (type.includes('apartment') || type.includes('flat') || type.includes('penthouse')) {
      imagesByType.apartments.push(...prop.images);
    }
  });

  // Remove duplicates
  imagesByType.houses = [...new Set(imagesByType.houses)];
  imagesByType.bedsitters = [...new Set(imagesByType.bedsitters)];
  imagesByType.apartments = [...new Set(imagesByType.apartments)];

  console.log(`✅ Found ${imagesByType.houses.length} house images`);
  console.log(`✅ Found ${imagesByType.bedsitters.length} bedsitter images`);
  console.log(`✅ Found ${imagesByType.apartments.length} apartment images`);

  // If bedsitters have few images, borrow from apartments
  if (imagesByType.bedsitters.length < 20) {
    imagesByType.bedsitters.push(...imagesByType.apartments.slice(0, 30));
    imagesByType.bedsitters = [...new Set(imagesByType.bedsitters)];
  }

  return imagesByType;
}

// Main function
async function generateAllCountyProperties() {
  console.log('\n' + '═'.repeat(70));
  console.log('🏘️  GENERATING PROPERTIES FOR ALL 47 KENYAN COUNTIES');
  console.log('═'.repeat(70));
  console.log('📊 Plan: 15 properties per county (5 houses, 5 bedsitters, 5 apartments)');
  console.log(`📍 Total counties: ${KENYA_COUNTIES.length}`);
  console.log(`📝 Total properties to generate: ${KENYA_COUNTIES.length * 15}`);
  console.log('═'.repeat(70));

  // Fetch existing images
  const imagesByType = await fetchExistingImages();

  if (imagesByType.houses.length === 0 || imagesByType.apartments.length === 0) {
    console.error('❌ Not enough images found in database. Please ensure properties with images exist.');
    return;
  }

  let totalGenerated = 0;
  let totalErrors = 0;

  // Process each county
  for (const countyData of KENYA_COUNTIES) {
    console.log(`\n📍 Processing ${countyData.county} County...`);

    const properties = [];

    // Generate 5 houses
    for (let i = 0; i < 5; i++) {
      const city = randomChoice(countyData.cities);
      const property = generateProperty(countyData.county, city, 'house', imagesByType.houses);
      properties.push(property);
    }

    // Generate 5 bedsitters
    for (let i = 0; i < 5; i++) {
      const city = randomChoice(countyData.cities);
      const property = generateProperty(countyData.county, city, 'bedsitter', imagesByType.bedsitters);
      properties.push(property);
    }

    // Generate 5 apartments
    for (let i = 0; i < 5; i++) {
      const city = randomChoice(countyData.cities);
      const property = generateProperty(countyData.county, city, 'apartment', imagesByType.apartments);
      properties.push(property);
    }

    // Insert into database
    const { data, error } = await supabase
      .from('property_listings')
      .insert(properties);

    if (error) {
      console.error(`   ❌ Error: ${error.message}`);
      totalErrors++;
    } else {
      console.log(`   ✅ Successfully added 15 properties to ${countyData.county}`);
      totalGenerated += 15;
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  console.log('\n' + '═'.repeat(70));
  console.log('🎉 GENERATION COMPLETE');
  console.log('═'.repeat(70));
  console.log(`✅ Total properties generated: ${totalGenerated}`);
  console.log(`❌ Counties with errors: ${totalErrors}`);
  console.log('═'.repeat(70));

  if (totalGenerated > 0) {
    console.log('\n💡 Next Steps:');
    console.log('   1. Run: node scripts/check-property-locations.js');
    console.log('   2. Verify properties are showing on your website');
    console.log('   3. Check county pages for proper distribution\n');
  }
}

// Run
if (require.main === module) {
  generateAllCountyProperties()
    .then(() => {
      console.log('✅ Script completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Script failed:', error);
      process.exit(1);
    });
}

module.exports = { generateAllCountyProperties };
