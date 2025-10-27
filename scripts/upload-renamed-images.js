/**
 * Upload Property Images from renamed_images folder to Supabase Storage
 *
 * This script:
 * 1. Uploads all images from the apartments_data/renamed_images folder
 * 2. Generates public URLs for each image
 * 3. Creates a mapping JSON file with filename -> URL mappings
 * 4. Updates the CSV file with correct Supabase URLs
 *
 * Usage: node scripts/upload-renamed-images.js
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

// Configuration
const SOURCE_IMAGES_DIR = 'C:\\Users\\Atom\\Documents\\jobs-in-kenya-scrapper\\apartments_data\\renamed_images';
const CSV_FILE_PATH = path.join(__dirname, '..', 'properties-for-upload.csv');
const MAPPING_FILE_PATH = path.join(__dirname, '..', 'image-url-mapping.json');
const BUCKET_NAME = 'property-images';
const STORAGE_FOLDER = 'properties';

async function uploadRenamedImages() {
  try {
    console.log('🚀 Starting property images upload...\n');

    // Verify source directory exists
    if (!fs.existsSync(SOURCE_IMAGES_DIR)) {
      console.error('❌ Source images directory not found:', SOURCE_IMAGES_DIR);
      return;
    }

    // Get list of image files
    const files = fs.readdirSync(SOURCE_IMAGES_DIR).filter(file =>
      file.match(/\.(webp|jpg|jpeg|png)$/i)
    );

    console.log(`📁 Found ${files.length} images to upload from:`);
    console.log(`   ${SOURCE_IMAGES_DIR}\n`);

    // Ensure bucket exists
    await ensureBucketExists();

    // Upload images and collect URLs
    const imageUrlMapping = {};
    let uploadedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    for (let i = 0; i < files.length; i++) {
      const fileName = files[i];
      const progress = `[${i + 1}/${files.length}]`;

      try {
        const filePath = path.join(SOURCE_IMAGES_DIR, fileName);
        const fileBuffer = fs.readFileSync(filePath);

        // Use the existing filename (already properly formatted)
        const storagePath = `${STORAGE_FOLDER}/${fileName}`;

        // Check if file already exists
        const { data: existingFile } = await supabase.storage
          .from(BUCKET_NAME)
          .list(STORAGE_FOLDER, { search: fileName });

        if (existingFile && existingFile.length > 0) {
          console.log(`${progress} ⏭️  Skipped: ${fileName} (already exists)`);

          // Still get the public URL for the mapping
          const { data } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(storagePath);

          imageUrlMapping[fileName] = data.publicUrl;
          skippedCount++;
          continue;
        }

        // Determine content type
        const contentType = fileName.endsWith('.webp') ? 'image/webp' :
                          fileName.endsWith('.png') ? 'image/png' :
                          'image/jpeg';

        // Upload file
        const { data, error } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(storagePath, fileBuffer, {
            contentType: contentType,
            upsert: false
          });

        if (error) {
          console.error(`${progress} ❌ Error uploading ${fileName}:`, error.message);
          errorCount++;
        } else {
          // Get public URL
          const { data: urlData } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(storagePath);

          imageUrlMapping[fileName] = urlData.publicUrl;
          console.log(`${progress} ✅ Uploaded: ${fileName}`);
          uploadedCount++;
        }

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 50));

      } catch (error) {
        console.error(`${progress} ❌ Error processing ${fileName}:`, error.message);
        errorCount++;
      }
    }

    // Save mapping to JSON file
    fs.writeFileSync(
      MAPPING_FILE_PATH,
      JSON.stringify(imageUrlMapping, null, 2),
      'utf-8'
    );

    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`🎉 Upload Summary:`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`✅ Uploaded:  ${uploadedCount} files`);
    console.log(`⏭️  Skipped:   ${skippedCount} files (already existed)`);
    console.log(`❌ Errors:    ${errorCount} files`);
    console.log(`📁 Total:     ${files.length} files`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

    console.log(`💾 Image URL mapping saved to: ${MAPPING_FILE_PATH}\n`);

    // Display sample URLs
    console.log(`📋 Sample URLs (first 5):`);
    const sampleFiles = Object.keys(imageUrlMapping).slice(0, 5);
    sampleFiles.forEach(fileName => {
      console.log(`   🔗 ${fileName}`);
      console.log(`      ${imageUrlMapping[fileName]}\n`);
    });

    // Update CSV file
    if (fs.existsSync(CSV_FILE_PATH)) {
      console.log(`📝 Updating CSV file with Supabase URLs...`);
      await updateCsvWithUrls(imageUrlMapping);
    } else {
      console.log(`⚠️  CSV file not found at: ${CSV_FILE_PATH}`);
      console.log(`   You can update it manually using the mapping file.`);
    }

  } catch (error) {
    console.error('❌ Upload failed:', error);
    throw error;
  }
}

async function ensureBucketExists() {
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const propertyBucket = buckets?.find(bucket => bucket.name === BUCKET_NAME);

    if (!propertyBucket) {
      console.log(`📦 Creating '${BUCKET_NAME}' bucket...`);
      const { error: bucketError } = await supabase.storage.createBucket(BUCKET_NAME, {
        public: true,
        allowedMimeTypes: ['image/webp', 'image/jpeg', 'image/png', 'image/jpg'],
        fileSizeLimit: 10485760 // 10MB
      });

      if (bucketError) {
        console.error('❌ Error creating bucket:', bucketError);
        throw bucketError;
      }
      console.log(`✅ Created '${BUCKET_NAME}' bucket\n`);
    } else {
      console.log(`✅ Bucket '${BUCKET_NAME}' already exists\n`);
    }
  } catch (error) {
    console.error('❌ Error checking/creating bucket:', error);
    throw error;
  }
}

async function updateCsvWithUrls(imageUrlMapping) {
  try {
    // Read CSV file
    const csvContent = fs.readFileSync(CSV_FILE_PATH, 'utf-8');
    const lines = csvContent.split('\n');

    let updatedLines = [];
    let updatedCount = 0;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];

      // Skip header or empty lines
      if (i === 0 || line.trim() === '') {
        updatedLines.push(line);
        continue;
      }

      // Parse CSV line (simple approach - may need enhancement for complex CSV)
      const parts = line.split(',');

      // Find the images column (usually near the end)
      // Look for patterns like "filename.webp" in the line
      let updatedLine = line;
      let lineUpdated = false;

      Object.keys(imageUrlMapping).forEach(fileName => {
        if (line.includes(fileName)) {
          // Replace just the filename with the full URL
          updatedLine = updatedLine.replace(
            new RegExp(fileName, 'g'),
            imageUrlMapping[fileName]
          );
          lineUpdated = true;
        }
      });

      if (lineUpdated) {
        updatedCount++;
      }

      updatedLines.push(updatedLine);
    }

    // Save updated CSV
    const updatedCsvPath = CSV_FILE_PATH.replace('.csv', '-with-urls.csv');
    fs.writeFileSync(updatedCsvPath, updatedLines.join('\n'), 'utf-8');

    console.log(`✅ CSV updated successfully!`);
    console.log(`   Updated ${updatedCount} property listings`);
    console.log(`   Saved to: ${updatedCsvPath}\n`);

  } catch (error) {
    console.error('❌ Error updating CSV:', error);
    console.log('   You can update the CSV manually using the mapping file.');
  }
}

// Run if called directly
if (require.main === module) {
  uploadRenamedImages()
    .then(() => {
      console.log('✅ Script completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Script failed:', error);
      process.exit(1);
    });
}

module.exports = { uploadRenamedImages };
