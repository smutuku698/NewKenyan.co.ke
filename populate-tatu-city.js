#!/usr/bin/env node

/**
 * Populate Tatu City properties
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Tatu City property data
const tatuCityProperties = [
  {
    propertyTitle: "Modern 2BR Apartment in Tatu City",
    propertyType: "Apartment",
    description: "Brand new 2-bedroom apartment in the innovative Tatu City development. Features smart home technology, modern amenities, and access to shopping, schools, and recreational facilities. Perfect for young professionals and families.",
    price: 75000,
    priceType: "rent",
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 900,
    address: "Tatu City, Riviera Apartments",
    city: "Tatu City",
    county: "Kiambu",
    contactPhone: "+254712345009",
    contactEmail: "tatucity@newkenyan.co.ke",
    whatsappNumber: "+254712345009",
    amenities: ["parking", "security", "gym", "pool", "wifi", "backup generator"],
    isFurnished: true,
    petsAllowed: false
  },
  {
    propertyTitle: "Smart 3BR Townhouse in Tatu City",
    propertyType: "Townhouse",
    description: "Innovative 3-bedroom townhouse in Tatu City with smart home features. Includes private garden, modern kitchen, and access to world-class amenities including schools and shopping centers.",
    price: 2200000,
    priceType: "sale",
    bedrooms: 3,
    bathrooms: 3,
    squareFeet: 1500,
    address: "Tatu City, Eden Square",
    city: "Tatu City",
    county: "Kiambu",
    contactPhone: "+254712345010",
    contactEmail: "tatucity@newkenyan.co.ke",
    whatsappNumber: "+254712345010",
    amenities: ["garden", "parking", "security", "wifi", "backup generator", "clubhouse"],
    isFurnished: false,
    petsAllowed: true
  },
  {
    propertyTitle: "Luxury 1BR Apartment in Tatu City",
    propertyType: "Apartment",
    description: "Contemporary 1-bedroom apartment in Tatu City's prime location. Features include smart home integration, high-speed internet, and proximity to the upcoming international school and shopping mall.",
    price: 55000,
    priceType: "rent",
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 600,
    address: "Tatu City, Nova Apartments",
    city: "Tatu City",
    county: "Kiambu",
    contactPhone: "+254712345020",
    contactEmail: "tatucity@newkenyan.co.ke",
    whatsappNumber: "+254712345020",
    amenities: ["parking", "security", "gym", "wifi", "backup generator"],
    isFurnished: true,
    petsAllowed: false
  },
  {
    propertyTitle: "Executive 4BR Villa in Tatu City",
    propertyType: "Villa",
    description: "Spacious 4-bedroom villa in exclusive Tatu City residential area. Features include modern design, large garden, solar panels, and smart home automation. Close to international schools.",
    price: 3500000,
    priceType: "sale",
    bedrooms: 4,
    bathrooms: 4,
    squareFeet: 2200,
    address: "Tatu City, Greenview Estate",
    city: "Tatu City",
    county: "Kiambu",
    contactPhone: "+254712345021",
    contactEmail: "tatucity@newkenyan.co.ke",
    whatsappNumber: "+254712345021",
    amenities: ["garden", "parking", "security", "wifi", "backup generator", "solar panels", "clubhouse"],
    isFurnished: false,
    petsAllowed: true
  },
  {
    propertyTitle: "Studio Apartment in Tatu City",
    propertyType: "Studio",
    description: "Compact and efficient studio apartment perfect for young professionals. Features modern finishes, smart storage solutions, and access to all Tatu City amenities.",
    price: 40000,
    priceType: "rent",
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 400,
    address: "Tatu City, Urban Studios",
    city: "Tatu City",
    county: "Kiambu",
    contactPhone: "+254712345022",
    contactEmail: "tatucity@newkenyan.co.ke",
    whatsappNumber: "+254712345022",
    amenities: ["parking", "security", "wifi", "gym"],
    isFurnished: true,
    petsAllowed: false
  },
  {
    propertyTitle: "Family 3BR House in Tatu City",
    propertyType: "House",
    description: "Beautiful 3-bedroom family house in Tatu City. Features include open-plan living, modern kitchen, private garden, and access to recreational facilities. Walking distance to schools.",
    price: 1800000,
    priceType: "sale",
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1400,
    address: "Tatu City, Family Homes Estate",
    city: "Tatu City",
    county: "Kiambu",
    contactPhone: "+254712345023",
    contactEmail: "tatucity@newkenyan.co.ke",
    whatsappNumber: "+254712345023",
    amenities: ["garden", "parking", "security", "backup generator", "clubhouse"],
    isFurnished: false,
    petsAllowed: true
  },
  {
    propertyTitle: "Premium 2BR Apartment in Tatu City",
    propertyType: "Apartment",
    description: "Premium 2-bedroom apartment with balcony views. Features include modern appliances, high-speed internet, and proximity to shopping centers and entertainment areas.",
    price: 85000,
    priceType: "rent",
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1000,
    address: "Tatu City, Summit Residences",
    city: "Tatu City",
    county: "Kiambu",
    contactPhone: "+254712345024",
    contactEmail: "tatucity@newkenyan.co.ke",
    whatsappNumber: "+254712345024",
    amenities: ["parking", "security", "gym", "pool", "wifi", "backup generator", "balcony"],
    isFurnished: true,
    petsAllowed: false
  },
  {
    propertyTitle: "Commercial Office Space in Tatu City",
    propertyType: "Office",
    description: "Modern commercial office space in Tatu City's business district. Features include fiber optic internet, ample parking, and proximity to residential areas and amenities.",
    price: 120000,
    priceType: "rent",
    bedrooms: 0,
    bathrooms: 2,
    squareFeet: 1500,
    address: "Tatu City, Business Park",
    city: "Tatu City",
    county: "Kiambu",
    contactPhone: "+254712345025",
    contactEmail: "tatucity@newkenyan.co.ke",
    whatsappNumber: "+254712345025",
    amenities: ["parking", "security", "wifi", "backup generator", "elevator"],
    isFurnished: false,
    petsAllowed: false
  },
  {
    propertyTitle: "Retail Shop in Tatu City Mall",
    propertyType: "Commercial",
    description: "Prime retail space in Tatu City's main shopping mall. High foot traffic location perfect for retail, restaurant, or service business.",
    price: 150000,
    priceType: "rent",
    bedrooms: 0,
    bathrooms: 1,
    squareFeet: 800,
    address: "Tatu City, Central Mall",
    city: "Tatu City",
    county: "Kiambu",
    contactPhone: "+254712345026",
    contactEmail: "tatucity@newkenyan.co.ke",
    whatsappNumber: "+254712345026",
    amenities: ["parking", "security", "wifi", "air conditioning"],
    isFurnished: false,
    petsAllowed: false
  },
  {
    propertyTitle: "Affordable 2BR Apartment in Tatu City",
    propertyType: "Apartment",
    description: "Affordable 2-bedroom apartment for first-time buyers or investors. Features modern finishes and access to Tatu City's growing infrastructure and amenities.",
    price: 1500000,
    priceType: "sale",
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 850,
    address: "Tatu City, Starter Homes",
    city: "Tatu City",
    county: "Kiambu",
    contactPhone: "+254712345027",
    contactEmail: "tatucity@newkenyan.co.ke",
    whatsappNumber: "+254712345027",
    amenities: ["parking", "security", "backup generator"],
    isFurnished: false,
    petsAllowed: true
  }
];

// Get random images from existing Supabase storage
async function getRandomImages(count = 3) {
  try {
    const { data: files, error } = await supabase.storage
      .from('property-images')
      .list('', { limit: 1000 });

    if (error || !files || files.length === 0) {
      console.log('⚠️  No images found in storage, will create properties without images');
      return [];
    }

    // Filter out folders and get only image files
    const imageFiles = files.filter(file =>
      file.name.match(/\.(jpg|jpeg|png|webp)$/i) && !file.name.startsWith('.')
    );

    if (imageFiles.length === 0) {
      console.log('⚠️  No valid image files found');
      return [];
    }

    // Randomly select images
    const selectedImages = [];
    const usedIndices = new Set();

    for (let i = 0; i < Math.min(count, imageFiles.length); i++) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * imageFiles.length);
      } while (usedIndices.has(randomIndex));

      usedIndices.add(randomIndex);

      const { data: { publicUrl } } = supabase.storage
        .from('property-images')
        .getPublicUrl(imageFiles[randomIndex].name);

      selectedImages.push(publicUrl);
    }

    return selectedImages;
  } catch (error) {
    console.error('Error getting images:', error);
    return [];
  }
}

// Insert property listing
async function insertProperty(property, images) {
  const { error } = await supabase
    .from('property_listings')
    .insert({
      user_id: 'demo-user-tatu-city',
      property_title: property.propertyTitle,
      property_type: property.propertyType,
      description: property.description,
      price: property.price,
      price_type: property.priceType,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      square_feet: property.squareFeet,
      address: property.address,
      city: property.city,
      county: property.county,
      contact_phone: property.contactPhone,
      contact_email: property.contactEmail,
      whatsapp_number: property.whatsappNumber,
      amenities: property.amenities,
      images: images,
      available_from: new Date().toISOString(),
      is_furnished: property.isFurnished,
      pets_allowed: property.petsAllowed,
      is_approved: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });

  if (error) {
    throw new Error(`Failed to insert property: ${error.message}`);
  }

  return true;
}

async function main() {
  console.log('🏗️  Starting Tatu City Property Population...\n');
  console.log(`📍 Adding ${tatuCityProperties.length} properties to Tatu City\n`);

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < tatuCityProperties.length; i++) {
    const property = tatuCityProperties[i];

    try {
      console.log(`\n--- Processing Property ${i + 1}/${tatuCityProperties.length} ---`);
      console.log(`🏠 ${property.propertyTitle}`);
      console.log(`📍 ${property.address}`);

      // Get random images from Supabase storage
      const images = await getRandomImages(3);
      console.log(`📷 Selected ${images.length} images`);

      // Insert property
      await insertProperty(property, images);

      console.log(`✅ Property added successfully!`);
      successCount++;

    } catch (error) {
      console.error(`❌ Failed to add property:`, error.message);
      failCount++;
    }
  }

  console.log('\n\n' + '='.repeat(50));
  console.log('📊 SUMMARY:');
  console.log('='.repeat(50));
  console.log(`✅ Successfully added: ${successCount} properties`);
  console.log(`❌ Failed: ${failCount} properties`);
  console.log('='.repeat(50));

  if (successCount > 0) {
    console.log('\n🎉 Tatu City properties have been populated!');
    console.log('🌐 Visit your website to see the new Tatu City listings.');
  }
}

main().catch(console.error);
