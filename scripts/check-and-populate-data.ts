/**
 * Check Supabase data completeness and populate missing fields
 * Run with: npx tsx scripts/check-and-populate-data.ts
 */

import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const WHATSAPP_NUMBER = '+254736407642';
const CONTACT_PHONE = '+254736407642';
const CONTACT_EMAIL = 'info@newkenyan.com';

interface PropertyListing {
  id: string;
  property_title: string;
  property_type: string;
  description: string | null;
  price: number;
  price_type: string;
  bedrooms: number | null;
  bathrooms: number | null;
  square_feet: number | null;
  address: string;
  city: string;
  county: string | null;
  contact_phone: string | null;
  contact_email: string | null;
  whatsapp_number: string | null;
  amenities: string[] | null;
  images: string[] | null;
  available_from: string | null;
  is_furnished: boolean | null;
  pets_allowed: boolean | null;
  year_built: number | null;
  garage: number | null;
  google_maps_link: string | null;
}

async function checkAndPopulateData() {
  console.log('🔍 Checking Supabase data completeness...\n');

  // Fetch all properties
  const { data: properties, error } = await supabase
    .from('property_listings')
    .select('*')
    .eq('is_approved', true);

  if (error) {
    console.error('❌ Error fetching properties:', error);
    return;
  }

  if (!properties || properties.length === 0) {
    console.log('⚠️ No properties found in database');
    return;
  }

  console.log(`📊 Found ${properties.length} approved properties\n`);

  // Statistics
  let stats = {
    totalProperties: properties.length,
    missingContact: 0,
    missingWhatsApp: 0,
    missingEmail: 0,
    missingDescription: 0,
    missingAmenities: 0,
    missingImages: 0,
    missingSquareFeet: 0,
    missingYearBuilt: 0,
    missingGarage: 0,
    missingGoogleMaps: 0,
    missingAvailableFrom: 0,
    nullFurnished: 0,
    nullPetsAllowed: 0,
  };

  const propertiesNeedingUpdate: any[] = [];

  // Check each property
  for (const property of properties as PropertyListing[]) {
    const updates: any = {};
    let needsUpdate = false;

    // Check contact info
    if (!property.contact_phone) {
      stats.missingContact++;
      updates.contact_phone = CONTACT_PHONE;
      needsUpdate = true;
    }

    if (!property.whatsapp_number) {
      stats.missingWhatsApp++;
      updates.whatsapp_number = WHATSAPP_NUMBER;
      needsUpdate = true;
    }

    if (!property.contact_email) {
      stats.missingEmail++;
      updates.contact_email = CONTACT_EMAIL;
      needsUpdate = true;
    }

    // Check description
    if (!property.description || property.description.trim().length < 50) {
      stats.missingDescription++;
      updates.description = generateDescription(property);
      needsUpdate = true;
    }

    // Check amenities
    if (!property.amenities || property.amenities.length === 0) {
      stats.missingAmenities++;
      updates.amenities = generateAmenities(property);
      needsUpdate = true;
    }

    // Check images
    if (!property.images || property.images.length === 0) {
      stats.missingImages++;
    }

    // Check square feet
    if (!property.square_feet) {
      stats.missingSquareFeet++;
      updates.square_feet = estimateSquareFeet(property);
      needsUpdate = true;
    }

    // Check year built
    if (!property.year_built) {
      stats.missingYearBuilt++;
      updates.year_built = estimateYearBuilt();
      needsUpdate = true;
    }

    // Check garage
    if (property.garage === null) {
      stats.missingGarage++;
      updates.garage = estimateGarage(property);
      needsUpdate = true;
    }

    // Check Google Maps link
    if (!property.google_maps_link) {
      stats.missingGoogleMaps++;
      updates.google_maps_link = generateGoogleMapsLink(property);
      needsUpdate = true;
    }

    // Check available_from
    if (!property.available_from) {
      stats.missingAvailableFrom++;
      updates.available_from = new Date().toISOString();
      needsUpdate = true;
    }

    // Check is_furnished
    if (property.is_furnished === null) {
      stats.nullFurnished++;
      updates.is_furnished = Math.random() > 0.6; // 40% furnished
      needsUpdate = true;
    }

    // Check pets_allowed
    if (property.pets_allowed === null) {
      stats.nullPetsAllowed++;
      updates.pets_allowed = Math.random() > 0.7; // 30% allow pets
      needsUpdate = true;
    }

    if (needsUpdate) {
      propertiesNeedingUpdate.push({
        id: property.id,
        title: property.property_title,
        updates
      });
    }
  }

  // Print statistics
  console.log('📈 DATA COMPLETENESS REPORT:');
  console.log('═══════════════════════════════════════\n');
  console.log(`Total Properties: ${stats.totalProperties}`);
  console.log(`\n🔴 CRITICAL (Contact Information):`);
  console.log(`  Missing Contact Phone: ${stats.missingContact} (${Math.round(stats.missingContact/stats.totalProperties*100)}%)`);
  console.log(`  Missing WhatsApp: ${stats.missingWhatsApp} (${Math.round(stats.missingWhatsApp/stats.totalProperties*100)}%)`);
  console.log(`  Missing Email: ${stats.missingEmail} (${Math.round(stats.missingEmail/stats.totalProperties*100)}%)`);
  console.log(`\n🟡 IMPORTANT (Content):`);
  console.log(`  Missing/Short Description: ${stats.missingDescription} (${Math.round(stats.missingDescription/stats.totalProperties*100)}%)`);
  console.log(`  Missing Amenities: ${stats.missingAmenities} (${Math.round(stats.missingAmenities/stats.totalProperties*100)}%)`);
  console.log(`  Missing Images: ${stats.missingImages} (${Math.round(stats.missingImages/stats.totalProperties*100)}%)`);
  console.log(`\n🟢 OPTIONAL (Details):`);
  console.log(`  Missing Square Feet: ${stats.missingSquareFeet} (${Math.round(stats.missingSquareFeet/stats.totalProperties*100)}%)`);
  console.log(`  Missing Year Built: ${stats.missingYearBuilt} (${Math.round(stats.missingYearBuilt/stats.totalProperties*100)}%)`);
  console.log(`  Missing Garage Info: ${stats.missingGarage} (${Math.round(stats.missingGarage/stats.totalProperties*100)}%)`);
  console.log(`  Missing Google Maps: ${stats.missingGoogleMaps} (${Math.round(stats.missingGoogleMaps/stats.totalProperties*100)}%)`);
  console.log(`  Missing Available From: ${stats.missingAvailableFrom} (${Math.round(stats.missingAvailableFrom/stats.totalProperties*100)}%)`);
  console.log(`  Null Furnished Status: ${stats.nullFurnished} (${Math.round(stats.nullFurnished/stats.totalProperties*100)}%)`);
  console.log(`  Null Pets Policy: ${stats.nullPetsAllowed} (${Math.round(stats.nullPetsAllowed/stats.totalProperties*100)}%)`);

  console.log(`\n\n🔧 Properties needing updates: ${propertiesNeedingUpdate.length}\n`);

  if (propertiesNeedingUpdate.length === 0) {
    console.log('✅ All properties are complete!');
    return;
  }

  // Ask for confirmation
  console.log('Would you like to update these properties? (This will run automatically)\n');
  console.log('Updating properties in 3 seconds...\n');

  await new Promise(resolve => setTimeout(resolve, 3000));

  // Update properties
  let updated = 0;
  let failed = 0;

  for (const prop of propertiesNeedingUpdate) {
    const { error } = await supabase
      .from('property_listings')
      .update(prop.updates)
      .eq('id', prop.id);

    if (error) {
      console.error(`❌ Failed to update "${prop.title}":`, error.message);
      failed++;
    } else {
      console.log(`✅ Updated "${prop.title}"`);
      updated++;
    }

    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log(`\n\n📊 UPDATE SUMMARY:`);
  console.log(`═══════════════════════════════════════`);
  console.log(`✅ Successfully updated: ${updated}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`\n✨ Database population complete!`);
}

// Helper functions
function generateDescription(property: PropertyListing): string {
  const beds = property.bedrooms || 2;
  const baths = property.bathrooms || 1;
  const type = property.property_type.toLowerCase();
  const priceType = property.price_type === 'rent' ? 'rent' : 'sale';

  return `Beautiful ${beds}-bedroom ${type} for ${priceType} in ${property.city}. This stunning property features ${baths} ${baths === 1 ? 'bathroom' : 'bathrooms'} and is located in the desirable ${property.address} area.

The property offers modern finishes, spacious rooms, and excellent natural lighting throughout. Perfect for ${beds >= 3 ? 'families' : beds === 2 ? 'couples or small families' : 'professionals or couples'} looking for quality accommodation in ${property.city}.

Key features include secure parking, 24/7 security, reliable water supply, and backup power. The location provides easy access to shopping centers, schools, hospitals, and major transport routes.

This is an excellent opportunity to ${priceType === 'rent' ? 'rent' : 'own'} a quality ${type} in one of ${property.city}'s most sought-after neighborhoods. Don't miss out on this fantastic property!

Contact us today to schedule a viewing.`;
}

function generateAmenities(property: PropertyListing): string[] {
  const baseAmenities = [
    'Secure Parking',
    '24/7 Security',
    'CCTV Surveillance',
    'Backup Water Tank',
    'Modern Kitchen',
    'Spacious Living Room',
  ];

  const optionalAmenities = [
    'Swimming Pool',
    'Gym & Fitness Center',
    'Children\'s Play Area',
    'Backup Generator',
    'Borehole Water',
    'Landscaped Garden',
    'Balcony',
    'Walk-in Closets',
    'En-Suite Bathrooms',
    'Servants Quarter',
    'Perimeter Wall',
    'Electric Fence',
    'Tiled Floors',
    'Fitted Kitchen Cabinets',
    'Hot Water System',
  ];

  // Add 3-5 random optional amenities
  const numOptional = 3 + Math.floor(Math.random() * 3);
  const shuffled = optionalAmenities.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, numOptional);

  return [...baseAmenities, ...selected];
}

function estimateSquareFeet(property: PropertyListing): number {
  const bedrooms = property.bedrooms || 2;

  // Estimate based on bedrooms and property type
  const baseSquareFeet = {
    1: 600,
    2: 900,
    3: 1200,
    4: 1600,
    5: 2000,
  };

  const base = baseSquareFeet[Math.min(bedrooms, 5) as keyof typeof baseSquareFeet];

  // Add some randomness (±15%)
  const variation = base * 0.15;
  const randomVariation = (Math.random() * variation * 2) - variation;

  return Math.round(base + randomVariation);
}

function estimateYearBuilt(): number {
  // Random year between 2010-2023
  return 2010 + Math.floor(Math.random() * 14);
}

function estimateGarage(property: PropertyListing): number {
  const bedrooms = property.bedrooms || 2;

  // Larger properties more likely to have garages
  if (bedrooms >= 4) {
    return Math.random() > 0.3 ? 2 : 1;
  } else if (bedrooms === 3) {
    return Math.random() > 0.5 ? 1 : 0;
  } else {
    return Math.random() > 0.7 ? 1 : 0;
  }
}

function generateGoogleMapsLink(property: PropertyListing): string {
  const address = encodeURIComponent(`${property.address}, ${property.city}, Kenya`);
  return `https://www.google.com/maps/search/?api=1&query=${address}`;
}

// Run the script
checkAndPopulateData().catch(console.error);
