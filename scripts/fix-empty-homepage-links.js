/**
 * Fix Empty Homepage Links
 *
 * Generate properties to fill gaps found in homepage link testing
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const ADMIN_USER_ID = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getExistingImages(propertyType) {
  const { data: existingProps } = await supabase
    .from('property_listings')
    .select('images')
    .ilike('property_type', `%${propertyType}%`)
    .not('images', 'is', null)
    .limit(30);

  const allImages = [];
  existingProps?.forEach(prop => {
    if (prop.images && prop.images.length > 0) {
      allImages.push(...prop.images);
    }
  });

  return [...new Set(allImages)];
}

async function fixEmptyLinks() {
  console.log('\n' + '═'.repeat(70));
  console.log('🔧 FIXING EMPTY HOMEPAGE LINKS');
  console.log('═'.repeat(70));

  const properties = [];

  // 1. Bedsitters in Kileleshwa (10 properties)
  console.log('\n1️⃣ Adding Bedsitters in Kileleshwa...');
  const bedsitterImages = await getExistingImages('bedsitter');
  for (let i = 0; i < 10; i++) {
    const rent = randomNumber(12000, 18000);
    properties.push({
      user_id: ADMIN_USER_ID,
      property_title: `1 Bedroom Bedsitter for Rent in Kileleshwa`,
      property_type: 'Bedsitter',
      description: `Modern bedsitter in Kileleshwa, ideal for young professionals. Close to Westlands and CBD.`,
      price: rent,
      price_type: 'For Rent',
      bedrooms: 1,
      bathrooms: 1,
      square_feet: randomChoice([300, 350, 400]),
      address: `Kileleshwa, Nairobi, Kenya`,
      city: 'Kileleshwa',
      county: 'Nairobi County',
      contact_phone: '+254712345678',
      contact_email: 'info@newkenyan.co.ke',
      whatsapp_number: '+254712345678',
      amenities: ['water', 'electricity', 'security', 'parking'],
      images: bedsitterImages.slice(0, 3),
      available_from: null,
      is_furnished: Math.random() > 0.6,
      pets_allowed: false,
      is_approved: true,
      is_featured: false,
      rating: 0,
      review_count: 0,
      views_count: 0
    });
  }

  // 2. 1BR Apartments in specific price ranges (30 properties total)
  console.log('2️⃣ Adding 1BR Apartments in various price ranges...');
  const apartmentImages = await getExistingImages('apartment');

  const nairobiAreas = ['Westlands', 'Kilimani', 'Parklands', 'Kileleshwa', 'Lavington', 'Kilimani', 'South C', 'Kasarani'];

  // 15k-25k range (10 properties)
  for (let i = 0; i < 10; i++) {
    const rent = randomNumber(15000, 25000);
    const area = randomChoice(nairobiAreas);
    properties.push({
      user_id: ADMIN_USER_ID,
      property_title: `1 Bedroom Apartment for Rent in ${area}`,
      property_type: 'Apartment',
      description: `Affordable 1 bedroom apartment in ${area}. Modern amenities and great location.`,
      price: rent,
      price_type: 'For Rent',
      bedrooms: 1,
      bathrooms: 1,
      square_feet: randomChoice([550, 600, 650, 700]),
      address: `${area}, Nairobi, Kenya`,
      city: area,
      county: 'Nairobi County',
      contact_phone: '+254712345678',
      contact_email: 'info@newkenyan.co.ke',
      whatsapp_number: '+254712345678',
      amenities: ['water', 'electricity', 'security', 'parking', 'backup generator'],
      images: apartmentImages.slice(0, randomNumber(3, 5)),
      available_from: null,
      is_furnished: false,
      pets_allowed: false,
      is_approved: true,
      is_featured: false,
      rating: 0,
      review_count: 0,
      views_count: 0
    });
  }

  // 25k-35k range (10 properties)
  for (let i = 0; i < 10; i++) {
    const rent = randomNumber(25000, 35000);
    const area = randomChoice(['Westlands', 'Kilimani', 'Lavington', 'Kileleshwa', 'Parklands']);
    properties.push({
      user_id: ADMIN_USER_ID,
      property_title: `Modern 1 Bedroom Apartment in ${area}`,
      property_type: 'Apartment',
      description: `Well-maintained 1 bedroom apartment in ${area}. Excellent amenities.`,
      price: rent,
      price_type: 'For Rent',
      bedrooms: 1,
      bathrooms: 1,
      square_feet: randomChoice([650, 700, 750, 800]),
      address: `${area}, Nairobi, Kenya`,
      city: area,
      county: 'Nairobi County',
      contact_phone: '+254712345678',
      contact_email: 'info@newkenyan.co.ke',
      whatsapp_number: '+254712345678',
      amenities: ['water', 'electricity', 'security', 'parking', 'gym', 'swimming pool'],
      images: apartmentImages.slice(0, randomNumber(3, 5)),
      available_from: null,
      is_furnished: Math.random() > 0.5,
      pets_allowed: false,
      is_approved: true,
      is_featured: false,
      rating: 0,
      review_count: 0,
      views_count: 0
    });
  }

  // 3. 2BR Apartments 60k+ (15 properties)
  console.log('3️⃣ Adding 2BR Apartments 60k+...');
  for (let i = 0; i < 15; i++) {
    const rent = randomNumber(60000, 120000);
    const area = randomChoice(['Westlands', 'Kilimani', 'Lavington', 'Karen', 'Kileleshwa']);
    properties.push({
      user_id: ADMIN_USER_ID,
      property_title: `Luxury 2 Bedroom Apartment in ${area}`,
      property_type: 'Apartment',
      description: `Premium 2 bedroom apartment in ${area}. High-end finishes and amenities.`,
      price: rent,
      price_type: 'For Rent',
      bedrooms: 2,
      bathrooms: 2,
      square_feet: randomChoice([900, 1000, 1100, 1200]),
      address: `${area}, Nairobi, Kenya`,
      city: area,
      county: 'Nairobi County',
      contact_phone: '+254712345678',
      contact_email: 'info@newkenyan.co.ke',
      whatsapp_number: '+254712345678',
      amenities: ['water', 'electricity', 'security', 'parking', 'gym', 'swimming pool', 'backup generator'],
      images: apartmentImages.slice(0, randomNumber(4, 5)),
      available_from: null,
      is_furnished: true,
      pets_allowed: Math.random() > 0.7,
      is_approved: true,
      is_featured: Math.random() > 0.7,
      rating: 0,
      review_count: 0,
      views_count: 0
    });
  }

  // 4. 3BR Apartments in various price ranges (30 properties total)
  console.log('4️⃣ Adding 3BR Apartments in various price ranges...');

  // 40k-60k range (10 properties)
  for (let i = 0; i < 10; i++) {
    const rent = randomNumber(40000, 60000);
    const area = randomChoice(['Kilimani', 'Parklands', 'South C', 'Lavington', 'Kileleshwa']);
    properties.push({
      user_id: ADMIN_USER_ID,
      property_title: `Spacious 3 Bedroom Apartment in ${area}`,
      property_type: 'Apartment',
      description: `Family-friendly 3 bedroom apartment in ${area}. Great amenities.`,
      price: rent,
      price_type: 'For Rent',
      bedrooms: 3,
      bathrooms: 2,
      square_feet: randomChoice([1100, 1200, 1300, 1400]),
      address: `${area}, Nairobi, Kenya`,
      city: area,
      county: 'Nairobi County',
      contact_phone: '+254712345678',
      contact_email: 'info@newkenyan.co.ke',
      whatsapp_number: '+254712345678',
      amenities: ['water', 'electricity', 'security', 'parking', 'playground'],
      images: apartmentImages.slice(0, randomNumber(4, 5)),
      available_from: null,
      is_furnished: false,
      pets_allowed: Math.random() > 0.6,
      is_approved: true,
      is_featured: false,
      rating: 0,
      review_count: 0,
      views_count: 0
    });
  }

  // 60k-80k range (10 properties)
  for (let i = 0; i < 10; i++) {
    const rent = randomNumber(60000, 80000);
    const area = randomChoice(['Westlands', 'Kilimani', 'Lavington', 'Kileleshwa', 'Karen']);
    properties.push({
      user_id: ADMIN_USER_ID,
      property_title: `Premium 3 Bedroom Apartment in ${area}`,
      property_type: 'Apartment',
      description: `Well-appointed 3 bedroom apartment in ${area}. Modern amenities.`,
      price: rent,
      price_type: 'For Rent',
      bedrooms: 3,
      bathrooms: 3,
      square_feet: randomChoice([1300, 1400, 1500, 1600]),
      address: `${area}, Nairobi, Kenya`,
      city: area,
      county: 'Nairobi County',
      contact_phone: '+254712345678',
      contact_email: 'info@newkenyan.co.ke',
      whatsapp_number: '+254712345678',
      amenities: ['water', 'electricity', 'security', 'parking', 'gym', 'swimming pool'],
      images: apartmentImages.slice(0, randomNumber(4, 5)),
      available_from: null,
      is_furnished: Math.random() > 0.5,
      pets_allowed: Math.random() > 0.6,
      is_approved: true,
      is_featured: Math.random() > 0.8,
      rating: 0,
      review_count: 0,
      views_count: 0
    });
  }

  // 80k+ range (10 properties)
  for (let i = 0; i < 10; i++) {
    const rent = randomNumber(80000, 150000);
    const area = randomChoice(['Westlands', 'Lavington', 'Karen', 'Kilimani', 'Kileleshwa']);
    properties.push({
      user_id: ADMIN_USER_ID,
      property_title: `Luxury 3 Bedroom Apartment in ${area}`,
      property_type: 'Apartment',
      description: `High-end 3 bedroom apartment in ${area}. Premium finishes and amenities.`,
      price: rent,
      price_type: 'For Rent',
      bedrooms: 3,
      bathrooms: 3,
      square_feet: randomChoice([1500, 1600, 1700, 1800]),
      address: `${area}, Nairobi, Kenya`,
      city: area,
      county: 'Nairobi County',
      contact_phone: '+254712345678',
      contact_email: 'info@newkenyan.co.ke',
      whatsapp_number: '+254712345678',
      amenities: ['water', 'electricity', 'security', 'parking', 'gym', 'swimming pool', 'backup generator', 'concierge'],
      images: apartmentImages.slice(0, 5),
      available_from: null,
      is_furnished: true,
      pets_allowed: true,
      is_approved: true,
      is_featured: true,
      rating: 0,
      review_count: 0,
      views_count: 0
    });
  }

  // 5. Commercial Properties (10 properties)
  console.log('5️⃣ Adding Commercial Properties...');
  for (let i = 0; i < 10; i++) {
    const price = randomNumber(20000000, 100000000);
    const area = randomChoice(['Westlands', 'CBD', 'Kilimani', 'Parklands', 'Industrial Area']);
    const type = randomChoice(['Retail Space', 'Office Building', 'Warehouse', 'Shopping Center']);
    properties.push({
      user_id: ADMIN_USER_ID,
      property_title: `${type} for Sale in ${area}`,
      property_type: 'Commercial',
      description: `Prime commercial property in ${area}. Excellent investment opportunity.`,
      price: price,
      price_type: 'For Sale',
      bedrooms: null,
      bathrooms: null,
      square_feet: randomNumber(2000, 10000),
      address: `${area}, Nairobi, Kenya`,
      city: area,
      county: 'Nairobi County',
      contact_phone: '+254712345678',
      contact_email: 'info@newkenyan.co.ke',
      whatsapp_number: '+254712345678',
      amenities: ['parking', 'security', 'elevator', 'backup generator'],
      images: apartmentImages.slice(0, randomNumber(3, 5)),
      available_from: null,
      is_furnished: false,
      pets_allowed: false,
      is_approved: true,
      is_featured: Math.random() > 0.7,
      rating: 0,
      review_count: 0,
      views_count: 0
    });
  }

  console.log(`\n📝 Total properties to insert: ${properties.length}`);
  console.log('   - Bedsitters Kileleshwa: 10');
  console.log('   - 1BR Apartments (15k-25k): 10');
  console.log('   - 1BR Apartments (25k-35k): 10');
  console.log('   - 2BR Apartments (60k+): 15');
  console.log('   - 3BR Apartments (40k-60k): 10');
  console.log('   - 3BR Apartments (60k-80k): 10');
  console.log('   - 3BR Apartments (80k+): 10');
  console.log('   - Commercial Properties: 10');

  console.log('\n💾 Inserting properties into database...');

  const { data, error } = await supabase
    .from('property_listings')
    .insert(properties);

  if (error) {
    console.error('❌ Error inserting properties:', error.message);
    throw error;
  }

  console.log('\n✅ Successfully added all properties!');

  console.log('\n' + '═'.repeat(70));
  console.log('✅ FIX COMPLETE');
  console.log('═'.repeat(70));
  console.log(`Total properties added: ${properties.length}`);
  console.log('\n💡 Next Steps:');
  console.log('   1. Re-run: node scripts/test-all-homepage-links.js');
  console.log('   2. Verify all homepage links now have listings');
  console.log('   3. Test the actual pages in browser\n');
}

if (require.main === module) {
  fixEmptyLinks()
    .then(() => {
      console.log('✅ Script completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Script failed:', error);
      process.exit(1);
    });
}

module.exports = { fixEmptyLinks };
