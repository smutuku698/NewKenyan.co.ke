/**
 * Upload Property Images to Supabase and Update CSV
 *
 * This script:
 * 1. Uploads all property images from renamed_images to Supabase
 * 2. RETAINS ORIGINAL FILENAMES (no modification)
 * 3. Gets public URLs for each uploaded image
 * 4. Updates the CSV file with new Supabase URLs
 * 5. Adds admin user_id to properties
 *
 * Usage: node scripts/upload-and-update-csv.js
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Initialize Supabase client with service role key for admin operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const BUCKET_NAME = 'property-images';
const IMAGES_DIR = path.join(__dirname, '..', 'renamed_images');
const CSV_PATH = path.join(__dirname, '..', 'properties-for-upload.csv');
const ADMIN_USER_ID = 'admin-001'; // Placeholder admin ID for property ownership

async function uploadPropertyImages() {
  try {
    console.log('='.repeat(60));
    console.log('STEP 1: UPLOADING IMAGES TO SUPABASE');
    console.log('='.repeat(60));

    if (!fs.existsSync(IMAGES_DIR)) {
      console.log('❌ Images directory not found:', IMAGES_DIR);
      return null;
    }

    const files = fs.readdirSync(IMAGES_DIR);
    console.log(`\n📁 Found ${files.length} images to upload...`);

    // Create property-images bucket if it doesn't exist
    const { data: buckets } = await supabase.storage.listBuckets();
    const propertyBucket = buckets?.find(bucket => bucket.name === BUCKET_NAME);

    if (!propertyBucket) {
      console.log('\n🪣 Creating property-images bucket...');
      const { error: bucketError } = await supabase.storage.createBucket(BUCKET_NAME, {
        public: true,
        allowedMimeTypes: ['image/webp', 'image/jpeg', 'image/png', 'image/jpg'],
        fileSizeLimit: 10485760 // 10MB
      });

      if (bucketError) {
        console.error('❌ Error creating bucket:', bucketError);
        return null;
      }
      console.log('✅ Created property-images bucket');
    }

    let uploadedCount = 0;
    let skippedCount = 0;
    const imageUrlMap = {}; // Map of filename -> public URL

    for (const fileName of files) {
      try {
        const filePath = path.join(IMAGES_DIR, fileName);
        const stat = fs.statSync(filePath);

        // Skip if not a file
        if (!stat.isFile()) {
          continue;
        }

        const fileBuffer = fs.readFileSync(filePath);

        // RETAIN ORIGINAL FILENAME - NO MODIFICATION
        const storagePath = `properties/${fileName}`;

        console.log(`\n⬆️  Uploading: ${fileName}`);

        // Check if file already exists
        const { data: existingFile } = await supabase.storage
          .from(BUCKET_NAME)
          .list('properties', { search: fileName });

        if (existingFile && existingFile.length > 0) {
          console.log(`   ⏭️  Already exists, skipping...`);
          skippedCount++;

          // Still get the URL for the mapping
          const { data } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(storagePath);

          imageUrlMap[fileName] = data.publicUrl;
          continue;
        }

        // Determine content type based on file extension
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
          console.error(`   ❌ Error uploading:`, error.message);
        } else {
          console.log(`   ✅ Uploaded successfully`);
          uploadedCount++;

          // Get public URL
          const { data: urlData } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(storagePath);

          imageUrlMap[fileName] = urlData.publicUrl;
          console.log(`   🔗 URL: ${urlData.publicUrl}`);
        }

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));

      } catch (error) {
        console.error(`❌ Error processing ${fileName}:`, error.message);
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('UPLOAD SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Uploaded: ${uploadedCount} files`);
    console.log(`⏭️  Skipped (already exist): ${skippedCount} files`);
    console.log(`📁 Total processed: ${files.length} files`);
    console.log(`🗺️  URL mappings created: ${Object.keys(imageUrlMap).length}`);

    return imageUrlMap;

  } catch (error) {
    console.error('❌ Upload failed:', error);
    return null;
  }
}

async function updateCSVWithUrls(imageUrlMap) {
  try {
    console.log('\n' + '='.repeat(60));
    console.log('STEP 2: UPDATING CSV WITH SUPABASE URLS');
    console.log('='.repeat(60));

    if (!fs.existsSync(CSV_PATH)) {
      console.log('❌ CSV file not found:', CSV_PATH);
      return;
    }

    // Read CSV file
    const csvContent = fs.readFileSync(CSV_PATH, 'utf-8');
    const lines = csvContent.split('\n');

    console.log(`\n📄 CSV has ${lines.length} lines (including header)`);

    let updatedCount = 0;
    let userIdCount = 0;
    const updatedLines = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Keep header as-is
      if (i === 0) {
        updatedLines.push(line);
        continue;
      }

      // Skip empty lines
      if (!line.trim()) {
        updatedLines.push(line);
        continue;
      }

      // Parse CSV line (handling quoted fields with commas)
      const fields = parseCSVLine(line);

      // User ID is field 0 - add admin ID if empty
      if (!fields[0] || fields[0].trim() === '') {
        fields[0] = ADMIN_USER_ID;
        userIdCount++;
      }

      // Images column is index 16 (17th column)
      const imagesField = fields[16] || '';

      if (imagesField && imagesField.trim()) {
        // Split by comma to get individual filenames
        const filenames = imagesField.split(',').map(f => f.trim());
        const updatedUrls = [];
        let hasUpdates = false;

        for (const filename of filenames) {
          if (imageUrlMap[filename]) {
            updatedUrls.push(imageUrlMap[filename]);
            hasUpdates = true;
          } else {
            // Keep original if no mapping found
            updatedUrls.push(filename);
            console.log(`   ⚠️  Row ${i}: No URL mapping for: ${filename}`);
          }
        }

        if (hasUpdates) {
          // Update the images field with new URLs
          fields[16] = updatedUrls.join(',');
          updatedCount++;
          console.log(`\n✏️  Row ${i}: Updated ${filenames.length} image(s)`);
        }
      }

      // Reconstruct the CSV line
      updatedLines.push(reconstructCSVLine(fields));
    }

    // Create backup of original CSV
    const backupPath = CSV_PATH.replace('.csv', '_backup.csv');
    fs.copyFileSync(CSV_PATH, backupPath);
    console.log(`\n💾 Backup created: ${backupPath}`);

    // Write updated CSV
    const updatedCSV = updatedLines.join('\n');
    fs.writeFileSync(CSV_PATH, updatedCSV, 'utf-8');

    console.log('\n' + '='.repeat(60));
    console.log('CSV UPDATE SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Updated ${updatedCount} rows with new image URLs`);
    console.log(`✅ Added admin user_id to ${userIdCount} rows`);
    console.log(`📄 CSV file saved: ${CSV_PATH}`);
    console.log(`💾 Backup saved: ${backupPath}`);

  } catch (error) {
    console.error('❌ CSV update failed:', error);
  }
}

// Helper function to parse CSV line (handles quoted fields)
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

  // Add last field
  fields.push(currentField);

  return fields;
}

// Helper function to reconstruct CSV line (adds quotes where needed)
function reconstructCSVLine(fields) {
  return fields.map(field => {
    // Add quotes if field contains comma, newline, or quote
    if (field.includes(',') || field.includes('\n') || field.includes('"')) {
      return `"${field.replace(/"/g, '""')}"`;
    }
    return field;
  }).join(',');
}

async function main() {
  console.log('\n🚀 PROPERTY IMAGES UPLOAD & CSV UPDATE SCRIPT');
  console.log('='.repeat(60));

  // Step 1: Upload images and get URL mappings
  const imageUrlMap = await uploadPropertyImages();

  if (!imageUrlMap || Object.keys(imageUrlMap).length === 0) {
    console.log('\n❌ No images were uploaded. Aborting CSV update.');
    return;
  }

  // Step 2: Update CSV with new URLs
  await updateCSVWithUrls(imageUrlMap);

  console.log('\n' + '='.repeat(60));
  console.log('✅ PROCESS COMPLETED SUCCESSFULLY!');
  console.log('='.repeat(60));
  console.log('\nNext steps:');
  console.log('1. Review the updated CSV file');
  console.log('2. Import the CSV to your database');
  console.log('3. Verify images are displaying correctly on the site\n');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { uploadPropertyImages, updateCSVWithUrls };
