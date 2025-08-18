#!/usr/bin/env node

/**
 * Property Population Script for NewKenyan.co.ke
 * 
 * This script creates property listings for Nairobi regions with 3 images each
 * Regions: Kiambu, Westlands, Karen, Runda, Tatu City, Mombasa
 * 
 * Usage:
 * 1. Place your 50 property images in ./property-images/ folder
 * 2. Set up your environment variables (.env.local)
 * 3. Run: node scripts/populate-properties.js
 */

import { createClient } from '@supabase/supabase-js';
import { readdir, readFile } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const IMAGES_FOLDER = 'C:\\Users\\Atom\\Videos\\Captures\\propert images';
const IMAGES_PER_PROPERTY = 3;

// Property data for different regions
const propertyData = [
  // KIAMBU
  {
    propertyTitle: "Modern 3BR Family House in Kiambu",
    propertyType: "House",
    description: "Beautiful 3-bedroom family home in Kiambu with spacious compound and modern finishes. Features include a large kitchen, living room, and secure parking. Perfect for families looking for suburban living with easy access to Nairobi.",
    price: 85000,
    priceType: "rent",
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1400,
    address: "Kiambu Road, Green Valley Estate",
    city: "Kiambu",
    county: "Kiambu",
    contactPhone: "+254712345001",
    contactEmail: "kiambu@newkenyan.co.ke",
    whatsappNumber: "+254712345001",
    amenities: ["parking", "security", "garden", "backup generator"],
    isFurnished: false,
    petsAllowed: true
  },
  {
    propertyTitle: "Spacious 4BR Villa in Kiambu Town",
    propertyType: "Villa",
    description: "Luxurious 4-bedroom villa situated in quiet Kiambu neighborhood. Features include master ensuite, modern kitchen, spacious living areas, and beautiful garden. Close to schools and shopping centers.",
    price: 1200000,
    priceType: "sale",
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2000,
    address: "Kiambu Town, Villa Gardens",
    city: "Kiambu",
    county: "Kiambu",
    contactPhone: "+254712345002",
    contactEmail: "kiambu@newkenyan.co.ke",
    whatsappNumber: "+254712345002",
    amenities: ["garden", "parking", "security", "backup generator", "storage"],
    isFurnished: false,
    petsAllowed: true
  },
  
  // WESTLANDS
  {
    propertyTitle: "Luxury 2BR Apartment in Westlands",
    propertyType: "Apartment",
    description: "Premium 2-bedroom apartment in the heart of Westlands. Features modern amenities, city views, and close proximity to shopping malls, restaurants, and business centers. Perfect for young professionals.",
    price: 95000,
    priceType: "rent",
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1000,
    address: "Westlands Square, Block A",
    city: "Nairobi",
    county: "Nairobi",
    contactPhone: "+254712345003",
    contactEmail: "westlands@newkenyan.co.ke",
    whatsappNumber: "+254712345003",
    amenities: ["parking", "security", "gym", "pool", "elevator"],
    isFurnished: true,
    petsAllowed: false
  },
  {
    propertyTitle: "Executive 3BR Penthouse in Westlands",
    propertyType: "Penthouse",
    description: "Stunning 3-bedroom penthouse with panoramic city views. Features include a private balcony, modern kitchen, and premium finishes throughout. Located in prestigious Westlands area.",
    price: 3500000,
    priceType: "sale",
    bedrooms: 3,
    bathrooms: 3,
    squareFeet: 1800,
    address: "Westlands Road, Sky Tower",
    city: "Nairobi",
    county: "Nairobi",
    contactPhone: "+254712345004",
    contactEmail: "westlands@newkenyan.co.ke",
    whatsappNumber: "+254712345004",
    amenities: ["parking", "security", "gym", "pool", "balcony", "elevator"],
    isFurnished: true,
    petsAllowed: false
  },
  
  // KAREN
  {
    propertyTitle: "Elegant 4BR House in Karen",
    propertyType: "House",
    description: "Beautiful 4-bedroom house in prestigious Karen suburb. Features include spacious rooms, modern kitchen, large garden, and secure compound. Close to international schools and Karen shopping center.",
    price: 180000,
    priceType: "rent",
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2200,
    address: "Karen Hardy Estate, House 24",
    city: "Nairobi",
    county: "Nairobi",
    contactPhone: "+254712345005",
    contactEmail: "karen@newkenyan.co.ke",
    whatsappNumber: "+254712345005",
    amenities: ["garden", "parking", "security", "backup generator", "servant quarter"],
    isFurnished: false,
    petsAllowed: true
  },
  {
    propertyTitle: "Luxury 5BR Mansion in Karen",
    propertyType: "House",
    description: "Magnificent 5-bedroom mansion in Karen with swimming pool and manicured gardens. Perfect for large families or executives. Features include multiple living areas, study room, and staff quarters.",
    price: 5800000,
    priceType: "sale",
    bedrooms: 5,
    bathrooms: 5,
    squareFeet: 3500,
    address: "Karen Blixen Road, Mansion Estate",
    city: "Nairobi",
    county: "Nairobi",
    contactPhone: "+254712345006",
    contactEmail: "karen@newkenyan.co.ke",
    whatsappNumber: "+254712345006",
    amenities: ["pool", "garden", "parking", "security", "servant quarter", "backup generator"],
    isFurnished: false,
    petsAllowed: true
  },
  
  // RUNDA
  {
    propertyTitle: "Contemporary 3BR Townhouse in Runda",
    propertyType: "Townhouse",
    description: "Modern 3-bedroom townhouse in exclusive Runda estate. Features contemporary design, private garden, and top-notch security. Perfect for families seeking luxury living.",
    price: 150000,
    priceType: "rent",
    bedrooms: 3,
    bathrooms: 3,
    squareFeet: 1600,
    address: "Runda Estate, Townhouse 12",
    city: "Nairobi",
    county: "Nairobi",
    contactPhone: "+254712345007",
    contactEmail: "runda@newkenyan.co.ke",
    whatsappNumber: "+254712345007",
    amenities: ["garden", "parking", "security", "clubhouse", "backup generator"],
    isFurnished: false,
    petsAllowed: true
  },
  {
    propertyTitle: "Luxury 4BR Villa in Runda",
    propertyType: "Villa",
    description: "Exquisite 4-bedroom villa in prime Runda location. Features include spacious living areas, modern kitchen, swimming pool, and beautiful landscaped gardens. 24/7 security provided.",
    price: 4200000,
    priceType: "sale",
    bedrooms: 4,
    bathrooms: 4,
    squareFeet: 2800,
    address: "Runda Mhasibu Estate, Villa 8",
    city: "Nairobi",
    county: "Nairobi",
    contactPhone: "+254712345008",
    contactEmail: "runda@newkenyan.co.ke",
    whatsappNumber: "+254712345008",
    amenities: ["pool", "garden", "parking", "security", "clubhouse", "backup generator"],
    isFurnished: false,
    petsAllowed: true
  },
  
  // TATU CITY
  {
    propertyTitle: "Modern 2BR Apartment in Tatu City",
    propertyType: "Apartment",
    description: "Brand new 2-bedroom apartment in the innovative Tatu City development. Features smart home technology, modern amenities, and access to shopping, schools, and recreational facilities.",
    price: 75000,
    priceType: "rent",
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 900,
    address: "Tatu City, Riviera Apartments",
    city: "Kiambu",
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
    city: "Kiambu",
    county: "Kiambu",
    contactPhone: "+254712345010",
    contactEmail: "tatucity@newkenyan.co.ke",
    whatsappNumber: "+254712345010",
    amenities: ["garden", "parking", "security", "wifi", "backup generator", "clubhouse"],
    isFurnished: false,
    petsAllowed: true
  },
  
  // MOMBASA
  {
    propertyTitle: "Beachfront 3BR Apartment in Mombasa",
    propertyType: "Apartment",
    description: "Stunning 3-bedroom beachfront apartment with ocean views. Features include spacious balcony, modern kitchen, and direct beach access. Perfect for vacation rental or permanent residence.",
    price: 120000,
    priceType: "rent",
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1300,
    address: "Nyali Beach, Ocean View Apartments",
    city: "Mombasa",
    county: "Mombasa",
    contactPhone: "+254712345011",
    contactEmail: "mombasa@newkenyan.co.ke",
    whatsappNumber: "+254712345011",
    amenities: ["parking", "security", "pool", "balcony", "air conditioning"],
    isFurnished: true,
    petsAllowed: false
  },
  {
    propertyTitle: "Luxury Beach Villa in Mombasa",
    propertyType: "Villa",
    description: "Magnificent 4-bedroom beach villa with private pool and direct ocean access. Features include spacious living areas, modern amenities, and tropical gardens. Perfect for luxury coastal living.",
    price: 6500000,
    priceType: "sale",
    bedrooms: 4,
    bathrooms: 4,
    squareFeet: 3000,
    address: "Diani Beach Road, Villa Paradise",
    city: "Mombasa",
    county: "Mombasa",
    contactPhone: "+254712345012",
    contactEmail: "mombasa@newkenyan.co.ke",
    whatsappNumber: "+254712345012",
    amenities: ["pool", "garden", "parking", "security", "air conditioning", "balcony"],
    isFurnished: true,
    petsAllowed: true
  },
  
  // COMMERCIAL/OFFICE PROPERTIES
  {
    propertyTitle: "Modern Co-working Space in Westlands",
    propertyType: "Office",
    description: "Contemporary co-working space in prime Westlands location. Features hot desks, private offices, meeting rooms, and high-speed internet. Perfect for startups, freelancers, and remote teams.",
    price: 15000,
    priceType: "rent",
    bedrooms: 0,
    bathrooms: 2,
    squareFeet: 2000,
    address: "Westlands Road, Business Hub",
    city: "Nairobi",
    county: "Nairobi",
    contactPhone: "+254712345017",
    contactEmail: "coworking@newkenyan.co.ke",
    whatsappNumber: "+254712345017",
    amenities: ["wifi", "security", "parking", "air conditioning", "elevator"],
    isFurnished: true,
    petsAllowed: false
  },
  {
    propertyTitle: "Executive Office Space in CBD",
    propertyType: "Office",
    description: "Premium executive office space in Nairobi CBD. Fully furnished with modern amenities, reception area, and conference facilities. Ideal for established businesses and corporate offices.",
    price: 25000,
    priceType: "rent",
    bedrooms: 0,
    bathrooms: 3,
    squareFeet: 1500,
    address: "Kimathi Street, Executive Plaza",
    city: "Nairobi",
    county: "Nairobi",
    contactPhone: "+254712345018",
    contactEmail: "office@newkenyan.co.ke",
    whatsappNumber: "+254712345018",
    amenities: ["wifi", "security", "parking", "air conditioning", "elevator", "backup generator"],
    isFurnished: true,
    petsAllowed: false
  },
  {
    propertyTitle: "Creative Workspace in Karen",
    propertyType: "Office",
    description: "Unique creative workspace in serene Karen environment. Features open plan areas, break-out spaces, and natural lighting. Perfect for creative agencies, design studios, and tech companies.",
    price: 18000,
    priceType: "rent",
    bedrooms: 0,
    bathrooms: 2,
    squareFeet: 1200,
    address: "Karen Road, Creative Complex",
    city: "Nairobi",
    county: "Nairobi",
    contactPhone: "+254712345019",
    contactEmail: "creative@newkenyan.co.ke",
    whatsappNumber: "+254712345019",
    amenities: ["wifi", "security", "parking", "garden", "backup generator"],
    isFurnished: true,
    petsAllowed: false
  },

  // Additional residential properties
  {
    propertyTitle: "Affordable 2BR Apartment in Kiambu",
    propertyType: "Apartment", 
    description: "Comfortable 2-bedroom apartment in Kiambu town center. Great for young families or professionals. Close to public transport, schools, and shopping areas.",
    price: 55000,
    priceType: "rent",
    bedrooms: 2,
    bathrooms: 1,
    squareFeet: 800,
    address: "Kiambu Town, Central Apartments",
    city: "Kiambu",
    county: "Kiambu",
    contactPhone: "+254712345013",
    contactEmail: "kiambu@newkenyan.co.ke",
    whatsappNumber: "+254712345013",
    amenities: ["parking", "security"],
    isFurnished: false,
    petsAllowed: true
  },
  {
    propertyTitle: "Studio Apartment in Westlands",
    propertyType: "Studio",
    description: "Compact studio apartment perfect for young professionals working in Westlands. Features modern amenities and great location near offices and entertainment.",
    price: 50000,
    priceType: "rent",
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 500,
    address: "Westlands, Studio Complex",
    city: "Nairobi",
    county: "Nairobi",
    contactPhone: "+254712345014",
    contactEmail: "westlands@newkenyan.co.ke",
    whatsappNumber: "+254712345014",
    amenities: ["security", "wifi", "elevator"],
    isFurnished: true,
    petsAllowed: false
  },
  {
    propertyTitle: "Family Townhouse in Karen",
    propertyType: "Townhouse",
    description: "Spacious 3-bedroom townhouse in Karen with private garden. Perfect for growing families who want the Karen lifestyle at an affordable price.",
    price: 1800000,
    priceType: "sale",
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1400,
    address: "Karen, Sunrise Estate",
    city: "Nairobi",
    county: "Nairobi",
    contactPhone: "+254712345015",
    contactEmail: "karen@newkenyan.co.ke",
    whatsappNumber: "+254712345015",
    amenities: ["garden", "parking", "security"],
    isFurnished: false,
    petsAllowed: true
  },
  {
    propertyTitle: "Executive 2BR in Runda",
    propertyType: "Apartment",
    description: "Executive 2-bedroom apartment in Runda with modern finishes and access to estate amenities. Perfect for young executives.",
    price: 110000,
    priceType: "rent",
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1100,
    address: "Runda Estate, Executive Block",
    city: "Nairobi",
    county: "Nairobi",
    contactPhone: "+254712345016",
    contactEmail: "runda@newkenyan.co.ke",
    whatsappNumber: "+254712345016",
    amenities: ["parking", "security", "gym", "clubhouse"],
    isFurnished: false,
    petsAllowed: false
  }
];

// Initialize Supabase client
function initializeSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables. Check your .env.local file.');
  }
  
  return createClient(supabaseUrl, supabaseServiceKey);
}

// Categorize images by type
function categorizeImages(imageFiles) {
  const officeImages = [];
  const residentialImages = [];
  
  imageFiles.forEach(file => {
    const fileName = file.toLowerCase();
    
    // Check if it's an office/workspace image
    if (fileName.includes('office') || 
        fileName.includes('working') || 
        fileName.includes('coworking') || 
        fileName.includes('co working') || 
        fileName.includes('co-working') ||
        fileName.includes('workspace')) {
      officeImages.push(file);
    } else {
      // Everything else is residential (bedrooms, living rooms, kitchens, bathrooms, houses)
      residentialImages.push(file);
    }
  });
  
  console.log(`📊 Categorized images:`);
  console.log(`   Office/Commercial: ${officeImages.length} images`);
  console.log(`   Residential: ${residentialImages.length} images`);
  
  return { officeImages, residentialImages };
}

// Get image files from folder
async function getImageFiles() {
  try {
    const files = await readdir(IMAGES_FOLDER);
    const imageFiles = files.filter(file => {
      const ext = extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext) && !file.startsWith('desktop');
    });
    
    console.log(`Found ${imageFiles.length} image files in ${IMAGES_FOLDER}`);
    return imageFiles;
  } catch (error) {
    throw new Error(`Cannot read images folder: ${IMAGES_FOLDER}. Make sure the folder exists and contains your property images.`);
  }
}

// Upload 3 images for a property
async function uploadPropertyImages(supabase, imageFiles, propertyIndex, propertyType) {
  const uploadedUrls = [];
  let imagesToUpload = [];
  
  // Determine which images to use based on property type
  if (propertyType === 'Office' || propertyType === 'Commercial') {
    // Use office images for commercial properties
    imagesToUpload = imageFiles.officeImages.slice(0, IMAGES_PER_PROPERTY);
    // Remove used images from the array
    imageFiles.officeImages.splice(0, IMAGES_PER_PROPERTY);
  } else {
    // Use residential images for houses, apartments, etc.
    imagesToUpload = imageFiles.residentialImages.slice(0, IMAGES_PER_PROPERTY);
    // Remove used images from the array
    imageFiles.residentialImages.splice(0, IMAGES_PER_PROPERTY);
  }
  
  console.log(`Uploading ${imagesToUpload.length} ${propertyType === 'Office' ? 'office' : 'residential'} images for property ${propertyIndex + 1}...`);
  
  for (const [index, imageFile] of imagesToUpload.entries()) {
    try {
      const imagePath = join(IMAGES_FOLDER, imageFile);
      const imageBuffer = await readFile(imagePath);
      
      const fileExt = extname(imageFile);
      const fileName = `property-${propertyIndex + 1}-img-${index + 1}-${Date.now()}${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('property-images')
        .upload(fileName, imageBuffer, {
          contentType: `image/${fileExt.slice(1)}`,
          upsert: false
        });
      
      if (uploadError) {
        console.error(`Failed to upload ${imageFile}:`, uploadError);
        continue;
      }
      
      const { data: { publicUrl } } = supabase.storage
        .from('property-images')
        .getPublicUrl(fileName);
      
      uploadedUrls.push(publicUrl);
      console.log(`✓ Uploaded: ${imageFile} -> ${fileName}`);
    } catch (error) {
      console.error(`Error uploading ${imageFile}:`, error);
    }
  }
  
  return uploadedUrls;
}

// Insert property listing into database
async function insertPropertyListing(supabase, property, imageUrls) {
  const { error } = await supabase
    .from('property_listings')
    .insert({
      user_id: 'demo-user-001',
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
      images: imageUrls,
      available_from: new Date().toISOString(),
      is_furnished: property.isFurnished,
      pets_allowed: property.petsAllowed,
      is_approved: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  
  if (error) {
    throw new Error(`Database insert failed: ${error.message}`);
  }
  
  console.log(`✓ Property listing created: ${property.propertyTitle}`);
}

// Main execution function
async function main() {
  try {
    console.log('🏠 Starting Property Population Script...\n');
    console.log('📍 Creating properties in: Kiambu, Westlands, Karen, Runda, Tatu City, Mombasa\n');
    
    // Initialize Supabase
    const supabase = initializeSupabase();
    console.log('✓ Supabase client initialized');
    
    // Get and categorize image files
    const allImageFiles = await getImageFiles();
    const categorizedImages = categorizeImages(allImageFiles);
    
    if (allImageFiles.length < 30) {
      console.warn(`⚠️  Only ${allImageFiles.length} images found. Recommended: 30+ images for good variety`);
    }
    
    // Calculate number of properties to create
    const commercialProperties = propertyData.filter(p => p.propertyType === 'Office' || p.propertyType === 'Commercial').length;
    const residentialProperties = propertyData.filter(p => p.propertyType !== 'Office' && p.propertyType !== 'Commercial').length;
    
    const maxCommercial = Math.min(commercialProperties, Math.floor(categorizedImages.officeImages.length / IMAGES_PER_PROPERTY));
    const maxResidential = Math.min(residentialProperties, Math.floor(categorizedImages.residentialImages.length / IMAGES_PER_PROPERTY));
    const maxProperties = maxCommercial + maxResidential;
    
    console.log(`Will create ${maxProperties} property listings (3 images each):`);
    console.log(`   Commercial: ${maxCommercial} properties`);
    console.log(`   Residential: ${maxResidential} properties\n`);
    
    // Process properties - commercial first, then residential
    let propertyIndex = 0;
    let processedProperties = 0;
    
    // Process commercial properties first
    for (let i = 0; i < propertyData.length && processedProperties < maxProperties; i++) {
      const property = propertyData[i];
      
      if (property.propertyType === 'Office' || property.propertyType === 'Commercial') {
        if (categorizedImages.officeImages.length < IMAGES_PER_PROPERTY) {
          console.log(`⚠️  Not enough office images for property ${i + 1}, skipping...`);
          continue;
        }
        
        console.log(`--- Processing Commercial Property ${processedProperties + 1}/${maxProperties} ---`);
        console.log(`🏢 ${property.propertyTitle}`);
        console.log(`📍 ${property.address}, ${property.city}`);
        
        try {
          // Upload images for this property
          const imageUrls = await uploadPropertyImages(supabase, categorizedImages, processedProperties, property.propertyType);
          
          if (imageUrls.length === 0) {
            console.log(`⚠️  No images uploaded for property ${processedProperties + 1}, skipping...`);
            continue;
          }
          
          // Insert property listing
          await insertPropertyListing(supabase, property, imageUrls);
          
          console.log(`✅ Property ${processedProperties + 1} completed with ${imageUrls.length} images\n`);
          processedProperties++;
        } catch (error) {
          console.error(`❌ Failed to process property ${processedProperties + 1}:`, error.message);
          continue;
        }
      }
    }
    
    // Process residential properties
    for (let i = 0; i < propertyData.length && processedProperties < maxProperties; i++) {
      const property = propertyData[i];
      
      if (property.propertyType !== 'Office' && property.propertyType !== 'Commercial') {
        if (categorizedImages.residentialImages.length < IMAGES_PER_PROPERTY) {
          console.log(`⚠️  Not enough residential images for property ${i + 1}, skipping...`);
          continue;
        }
        
        console.log(`--- Processing Residential Property ${processedProperties + 1}/${maxProperties} ---`);
        console.log(`🏠 ${property.propertyTitle}`);
        console.log(`📍 ${property.address}, ${property.city}`);
        
        try {
          // Upload images for this property
          const imageUrls = await uploadPropertyImages(supabase, categorizedImages, processedProperties, property.propertyType);
          
          if (imageUrls.length === 0) {
            console.log(`⚠️  No images uploaded for property ${processedProperties + 1}, skipping...`);
            continue;
          }
          
          // Insert property listing
          await insertPropertyListing(supabase, property, imageUrls);
          
          console.log(`✅ Property ${processedProperties + 1} completed with ${imageUrls.length} images\n`);
          processedProperties++;
        } catch (error) {
          console.error(`❌ Failed to process property ${processedProperties + 1}:`, error.message);
          continue;
        }
      }
    }
    
    console.log('🎉 Property population completed successfully!');
    console.log(`📊 Created ${maxProperties} properties across 6 regions`);
    console.log('🌐 Visit your website to see the new property listings.');
    
  } catch (error) {
    console.error('❌ Script failed:', error.message);
    process.exit(1);
  }
}

// Run the script
main().catch(console.error);