/**
 * Upload Property Images to Supabase Storage
 *
 * This script uploads all property images from the property data package
 * to Supabase storage bucket for newkenyan.com
 *
 * Usage: node scripts/upload-property-images.js
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

// Path to images folder from property data package
const IMAGES_DIR = 'C:/Users/Atom/Documents/jobs-in-kenya-scrapper/property_data_package/images';
const BUCKET_NAME = 'property-images';

// Track progress
let uploadedCount = 0;
let errorCount = 0;
let skippedCount = 0;
const errors = [];

async function createBucketIfNotExists() {
  console.log('🪣 Checking if bucket exists...');

  const { data: buckets, error } = await supabase.storage.listBuckets();

  if (error) {
    console.error('❌ Error listing buckets:', error);
    return false;
  }

  const bucketExists = buckets.some(bucket => bucket.name === BUCKET_NAME);

  if (!bucketExists) {
    console.log('🪣 Creating bucket:', BUCKET_NAME);
    const { data, error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
      public: true,
      fileSizeLimit: 5242880, // 5MB
      allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    });

    if (createError) {
      console.error('❌ Error creating bucket:', createError);
      return false;
    }
    console.log('✅ Bucket created successfully');
  } else {
    console.log('✅ Bucket already exists');
  }

  return true;
}

async function uploadImage(imagePath, fileName) {
  try {
    // Read the file
    const fileBuffer = fs.readFileSync(imagePath);

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, fileBuffer, {
        contentType: 'image/jpeg',
        cacheControl: '3600',
        upsert: false // Don't overwrite existing files
      });

    if (error) {
      // If file already exists, skip it
      if (error.message && error.message.includes('already exists')) {
        skippedCount++;
        return { success: true, skipped: true };
      }
      throw error;
    }

    uploadedCount++;
    return { success: true, data };
  } catch (error) {
    errorCount++;
    errors.push({ fileName, error: error.message });
    return { success: false, error: error.message };
  }
}

async function uploadPropertyImages() {
  console.log('🚀 Starting image upload process for newkenyan.com...\n');

  // Verify images directory exists
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error('❌ Images directory not found:', IMAGES_DIR);
    return;
  }

  // Create bucket if needed
  const bucketReady = await createBucketIfNotExists();
  if (!bucketReady) {
    console.error('❌ Failed to create/verify bucket. Aborting.');
    return;
  }

  // Get all image files
  console.log('📂 Reading images directory...');
  const files = fs.readdirSync(IMAGES_DIR);
  const imageFiles = files.filter(file =>
    file.endsWith('.jpeg') || file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.webp')
  );

  console.log(`📊 Found ${imageFiles.length} images to upload\n`);

  // Upload images in batches
  const batchSize = 10; // Upload 10 images at a time
  const totalBatches = Math.ceil(imageFiles.length / batchSize);

  for (let i = 0; i < imageFiles.length; i += batchSize) {
    const batch = imageFiles.slice(i, i + batchSize);
    const batchNumber = Math.floor(i / batchSize) + 1;

    console.log(`📦 Processing batch ${batchNumber}/${totalBatches} (${batch.length} images)...`);

    const uploadPromises = batch.map(fileName => {
      const imagePath = path.join(IMAGES_DIR, fileName);
      return uploadImage(imagePath, fileName);
    });

    await Promise.all(uploadPromises);

    // Progress update
    const progress = Math.round(((i + batch.length) / imageFiles.length) * 100);
    console.log(`✅ Batch ${batchNumber} complete. Progress: ${progress}% (${uploadedCount} uploaded, ${skippedCount} skipped, ${errorCount} errors)\n`);

    // Small delay between batches to avoid rate limiting
    if (i + batchSize < imageFiles.length) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  // Final summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 UPLOAD COMPLETE - SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Successfully uploaded: ${uploadedCount}`);
  console.log(`⏭️  Skipped (already exist): ${skippedCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log(`📁 Total processed: ${imageFiles.length}`);
  console.log('='.repeat(60));

  if (errors.length > 0) {
    console.log('\n❌ Errors encountered:');
    errors.slice(0, 10).forEach(({ fileName, error }) => {
      console.log(`  - ${fileName}: ${error}`);
    });
    if (errors.length > 10) {
      console.log(`  ... and ${errors.length - 10} more errors`);
    }
  }

  // Get public URL example
  if (imageFiles.length > 0) {
    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(imageFiles[0]);

    console.log('\n📎 Base URL for images:');
    console.log(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/`);
    console.log('\n📎 Example image URL:');
    console.log(publicUrlData.publicUrl);
  }

  console.log('\n✅ Image upload process completed for newkenyan.com!');
}

if (require.main === module) {
  uploadPropertyImages();
}

module.exports = { uploadPropertyImages };