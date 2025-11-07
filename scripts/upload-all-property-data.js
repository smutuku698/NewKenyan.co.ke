/**
 * Comprehensive Property Data Upload Script
 *
 * This script processes all three data directories:
 * 1. public/listings_musilli_20251105_234038
 * 2. public/listings_musilli_fixed_20251106_062332
 * 3. public/neighborhoods_only_20251106_064034
 *
 * For each directory, it:
 * - Uploads images to Supabase storage
 * - Imports property data from CSV to property_listings table
 * - Maps locations from migrations/locations.json
 *
 * Usage: node scripts/upload-all-property-data.js
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Initialize Supabase client with service role key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const BUCKET_NAME = 'property-images';
const ADMIN_USER_ID = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';

// Data directories configuration
const DATA_DIRS = [
  {
    name: 'Musilli Pages 7-20 (Original)',
    path: path.join(__dirname, '..', 'public', 'listings_musilli_20251105_234038'),
    csvFile: 'musilli_pages7-20_20251105_234038.csv',
    imagesDir: 'images'
  },
  {
    name: 'Musilli Pages 7-20 (Fixed)',
    path: path.join(__dirname, '..', 'public', 'listings_musilli_fixed_20251106_062332'),
    csvFile: 'musilli_pages7-20_fixed_20251106_062332.csv',
    imagesDir: 'images'
  },
  {
    name: 'Neighborhoods Only',
    path: path.join(__dirname, '..', 'public', 'neighborhoods_only_20251106_064034'),
    csvFile: 'neighborhoods_20251106_064034.csv',
    imagesDir: 'images'
  }
];

// Load locations mapping
const LOCATIONS_PATH = path.join(__dirname, '..', 'migrations', 'locations.json');
let LOCATIONS_DATA = null;

function loadLocations() {
  if (!fs.existsSync(LOCATIONS_PATH)) {
    console.log('⚠️  Warning: locations.json not found');
    return null;
  }

  try {
    const content = fs.readFileSync(LOCATIONS_PATH, 'utf-8');
    LOCATIONS_DATA = JSON.parse(content);
    console.log('✅ Loaded locations mapping from migrations/locations.json');
    return LOCATIONS_DATA;
  } catch (error) {
    console.error('❌ Error loading locations.json:', error.message);
    return null;
  }
}

// Helper: Parse CSV line (handles quoted fields)
function parseCSVLine(line) {
  const fields = [];
  let currentField = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      fields.push(currentField);
      currentField = '';
    } else {
      currentField += char;
    }
  }

  fields.push(currentField);
  return fields;
}

// Helper: Parse amenities string to array
function parseAmenities(amenitiesStr) {
  if (!amenitiesStr || amenitiesStr.trim() === '') return [];
  return amenitiesStr.split(',').map(a => a.trim()).filter(a => a);
}

// Helper: Parse images string to array
function parseImages(imagesStr) {
  if (!imagesStr || imagesStr.trim() === '') return [];
  return imagesStr.split(',').map(i => i.trim()).filter(i => i);
}

// Helper: Parse boolean value
function parseBoolean(value) {
  if (!value || value.trim() === '') return false;
  const val = value.toLowerCase();
  return val === 'true' || val === '1' || val === 'yes';
}

// Helper: Parse number value
function parseNumber(value) {
  if (!value || value.trim() === '') return null;
  const num = parseFloat(value);
  return isNaN(num) ? null : num;
}

// Helper: Normalize price type
function normalizePriceType(priceType) {
  if (!priceType) return 'sale';
  const normalized = priceType.toLowerCase().trim();
  if (normalized.includes('rent')) return 'For Rent';
  if (normalized.includes('sale')) return 'For Sale';
  return priceType;
}

// Step 1: Upload images from a directory
async function uploadImages(dataDir) {
  const imagesPath = path.join(dataDir.path, dataDir.imagesDir);

  if (!fs.existsSync(imagesPath)) {
    console.log(`⚠️  Images directory not found: ${imagesPath}`);
    return {};
  }

  const files = fs.readdirSync(imagesPath);
  console.log(`\n📁 Found ${files.length} images to upload...`);

  // Ensure bucket exists
  const { data: buckets } = await supabase.storage.listBuckets();
  const propertyBucket = buckets?.find(bucket => bucket.name === BUCKET_NAME);

  if (!propertyBucket) {
    console.log('🪣 Creating property-images bucket...');
    const { error: bucketError } = await supabase.storage.createBucket(BUCKET_NAME, {
      public: true,
      allowedMimeTypes: ['image/webp', 'image/jpeg', 'image/png', 'image/jpg'],
      fileSizeLimit: 10485760 // 10MB
    });

    if (bucketError) {
      console.error('❌ Error creating bucket:', bucketError.message);
      return {};
    }
    console.log('✅ Created property-images bucket');
  }

  let uploadedCount = 0;
  let skippedCount = 0;
  const imageUrlMap = {}; // Map of filename -> public URL

  for (const fileName of files) {
    try {
      const filePath = path.join(imagesPath, fileName);
      const stat = fs.statSync(filePath);

      // Skip if not a file
      if (!stat.isFile()) continue;

      const fileBuffer = fs.readFileSync(filePath);
      const storagePath = `properties/${fileName}`;

      // Check if file already exists
      const { data: existingFile } = await supabase.storage
        .from(BUCKET_NAME)
        .list('properties', { search: fileName });

      if (existingFile && existingFile.length > 0) {
        skippedCount++;
        const { data } = supabase.storage
          .from(BUCKET_NAME)
          .getPublicUrl(storagePath);
        imageUrlMap[fileName] = data.publicUrl;
        continue;
      }

      // Determine content type
      const ext = path.extname(fileName).toLowerCase();
      let contentType = 'image/webp';
      if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
      else if (ext === '.png') contentType = 'image/png';

      // Upload file
      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(storagePath, fileBuffer, {
          contentType: contentType,
          upsert: false
        });

      if (error) {
        console.error(`   ❌ Error uploading ${fileName}:`, error.message);
      } else {
        uploadedCount++;
        const { data: urlData } = supabase.storage
          .from(BUCKET_NAME)
          .getPublicUrl(storagePath);
        imageUrlMap[fileName] = urlData.publicUrl;
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 50));

    } catch (error) {
      console.error(`❌ Error processing ${fileName}:`, error.message);
    }
  }

  console.log(`✅ Uploaded: ${uploadedCount} | ⏭️  Skipped: ${skippedCount} | 📁 Total: ${files.length}`);
  return imageUrlMap;
}

// Step 2: Import CSV data to database
async function importCSVData(dataDir, imageUrlMap) {
  const csvPath = path.join(dataDir.path, dataDir.csvFile);

  if (!fs.existsSync(csvPath)) {
    console.error(`❌ CSV file not found: ${csvPath}`);
    return { success: 0, skipped: 0, errors: 0 };
  }

  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const lines = csvContent.split('\n');

  console.log(`\n📄 Processing ${lines.length - 1} properties from CSV...`);

  // Parse header
  const header = parseCSVLine(lines[0]);
  console.log(`📋 CSV Columns: ${header.join(', ')}\n`);

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  // Process each line (skip header)
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip empty lines
    if (!line) {
      skipCount++;
      continue;
    }

    try {
      const fields = parseCSVLine(line);

      // Map images to Supabase URLs
      const imageFilenames = parseImages(fields[18]);
      const imageUrls = imageFilenames.map(filename =>
        imageUrlMap[filename] || filename
      );

      // Build property object
      const property = {
        user_id: ADMIN_USER_ID,
        property_title: fields[0] || '',
        property_type: fields[1] || 'Apartment',
        description: fields[2] || '',
        price: parseNumber(fields[3]) || 0,
        price_type: normalizePriceType(fields[4]) || 'For Sale',
        bedrooms: parseNumber(fields[5]),
        bathrooms: parseNumber(fields[6]),
        square_feet: parseNumber(fields[7]),
        address: fields[10] || '',
        city: fields[11] || 'Nairobi',
        county: fields[12] || 'Nairobi',
        contact_phone: fields[13] || '+254712345678',
        contact_email: fields[14] || 'info@musillihomes.co.ke',
        whatsapp_number: fields[15] || '+254712345678',
        amenities: parseAmenities(fields[17]),
        images: imageUrls,
        available_from: fields[19] || null,
        is_furnished: parseBoolean(fields[20]),
        pets_allowed: parseBoolean(fields[21]),
        is_approved: true, // Auto-approve imported properties
        is_featured: false,
        rating: 0,
        review_count: 0,
        views_count: 0
      };

      // Validate required fields
      if (!property.property_title || !property.city || property.price === 0) {
        console.log(`[${i}] ⚠️  Skipped - Missing required fields: ${property.property_title || 'NO TITLE'}`);
        skipCount++;
        continue;
      }

      // Insert into database
      const { data, error } = await supabase
        .from('property_listings')
        .insert([property])
        .select();

      if (error) {
        console.error(`[${i}] ❌ ${property.property_title}: ${error.message}`);
        errorCount++;
      } else {
        console.log(`[${i}] ✅ ${property.property_title} - ${property.city} (${property.price_type})`);
        successCount++;
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));

    } catch (error) {
      console.error(`[${i}] ❌ Parse error:`, error.message);
      errorCount++;
    }
  }

  return { success: successCount, skipped: skipCount, errors: errorCount };
}

// Main process
async function processDataDirectory(dataDir, dirIndex, totalDirs) {
  console.log('\n' + '═'.repeat(70));
  console.log(`📦 PROCESSING DIRECTORY ${dirIndex}/${totalDirs}: ${dataDir.name}`);
  console.log('═'.repeat(70));
  console.log(`📁 Path: ${dataDir.path}`);

  // Step 1: Upload images
  console.log('\n🖼️  STEP 1: Uploading Images...');
  const imageUrlMap = await uploadImages(dataDir);
  console.log(`✅ Image upload complete. ${Object.keys(imageUrlMap).length} URLs mapped.`);

  // Step 2: Import CSV data
  console.log('\n📊 STEP 2: Importing Property Data...');
  const stats = await importCSVData(dataDir, imageUrlMap);

  console.log('\n' + '─'.repeat(70));
  console.log('📊 DIRECTORY SUMMARY:');
  console.log('─'.repeat(70));
  console.log(`✅ Successfully imported: ${stats.success} properties`);
  console.log(`⏭️  Skipped: ${stats.skipped} rows`);
  console.log(`❌ Errors: ${stats.errors} rows`);
  console.log('─'.repeat(70));

  return stats;
}

// Main execution
async function main() {
  console.log('\n' + '═'.repeat(70));
  console.log('🚀 COMPREHENSIVE PROPERTY DATA UPLOAD SCRIPT');
  console.log('═'.repeat(70));
  console.log(`📅 Started at: ${new Date().toLocaleString()}`);

  // Load locations mapping
  loadLocations();

  const overallStats = {
    totalSuccess: 0,
    totalSkipped: 0,
    totalErrors: 0,
    directories: []
  };

  // Process each data directory
  for (let i = 0; i < DATA_DIRS.length; i++) {
    const dataDir = DATA_DIRS[i];

    if (!fs.existsSync(dataDir.path)) {
      console.log(`\n⚠️  Directory not found, skipping: ${dataDir.path}`);
      continue;
    }

    const stats = await processDataDirectory(dataDir, i + 1, DATA_DIRS.length);

    overallStats.totalSuccess += stats.success;
    overallStats.totalSkipped += stats.skipped;
    overallStats.totalErrors += stats.errors;
    overallStats.directories.push({
      name: dataDir.name,
      ...stats
    });

    // Pause between directories
    if (i < DATA_DIRS.length - 1) {
      console.log('\n⏸️  Pausing 2 seconds before next directory...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  // Final summary
  console.log('\n\n' + '═'.repeat(70));
  console.log('🎉 ALL DIRECTORIES PROCESSED - FINAL SUMMARY');
  console.log('═'.repeat(70));
  console.log(`✅ Total properties imported: ${overallStats.totalSuccess}`);
  console.log(`⏭️  Total rows skipped: ${overallStats.totalSkipped}`);
  console.log(`❌ Total errors: ${overallStats.totalErrors}`);
  console.log('\n📊 Per-Directory Breakdown:');
  overallStats.directories.forEach((dir, idx) => {
    console.log(`\n   ${idx + 1}. ${dir.name}`);
    console.log(`      ✅ Success: ${dir.success} | ⏭️  Skipped: ${dir.skipped} | ❌ Errors: ${dir.errors}`);
  });
  console.log('\n' + '═'.repeat(70));
  console.log(`📅 Completed at: ${new Date().toLocaleString()}`);
  console.log('═'.repeat(70));

  if (overallStats.totalSuccess > 0) {
    console.log('\n💡 Next Steps:');
    console.log('   1. Visit your website to verify listings are displaying');
    console.log('   2. Check location pages for proper filtering');
    console.log('   3. Verify images are loading correctly');
    console.log('   4. Review any errors logged above\n');
  }
}

// Run if called directly
if (require.main === module) {
  main()
    .then(() => {
      console.log('✅ Script completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Script failed:', error);
      process.exit(1);
    });
}

module.exports = { processDataDirectory, uploadImages, importCSVData };
