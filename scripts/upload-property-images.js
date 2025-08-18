/**
 * Upload Property Images to Supabase Storage
 * 
 * This script uploads all property images from the public/propert images folder
 * to Supabase storage bucket for use on deployed sites.
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

async function uploadPropertyImages() {
  try {
    const imagesDir = path.join(__dirname, '..', 'public', 'propert images');
    
    if (!fs.existsSync(imagesDir)) {
      console.log('❌ Images directory not found:', imagesDir);
      return;
    }
    
    const files = fs.readdirSync(imagesDir);
    console.log(`Found ${files.length} images to upload...`);

    // Create property-images bucket if it doesn't exist
    const { data: buckets } = await supabase.storage.listBuckets();
    const propertyBucket = buckets.find(bucket => bucket.name === 'property-images');
    
    if (!propertyBucket) {
      console.log('Creating property-images bucket...');
      const { error: bucketError } = await supabase.storage.createBucket('property-images', {
        public: true,
        allowedMimeTypes: ['image/webp', 'image/jpeg', 'image/png', 'image/jpg'],
        fileSizeLimit: 10485760 // 10MB
      });
      
      if (bucketError) {
        console.error('Error creating bucket:', bucketError);
        return;
      }
      console.log('✅ Created property-images bucket');
    }

    let uploadedCount = 0;
    let skippedCount = 0;

    for (const fileName of files) {
      try {
        const filePath = path.join(imagesDir, fileName);
        const fileBuffer = fs.readFileSync(filePath);
        
        // Clean filename for storage (replace spaces with hyphens)
        const cleanFileName = fileName.toLowerCase().replace(/\s+/g, '-');
        const storagePath = `properties/${cleanFileName}`;

        console.log(`Uploading: ${fileName} -> ${storagePath}`);

        // Check if file already exists
        const { data: existingFile } = await supabase.storage
          .from('property-images')
          .list('properties', { search: cleanFileName });

        if (existingFile && existingFile.length > 0) {
          console.log(`⏭️  Skipped ${fileName} (already exists)`);
          skippedCount++;
          continue;
        }

        // Upload file
        const { data, error } = await supabase.storage
          .from('property-images')
          .upload(storagePath, fileBuffer, {
            contentType: 'image/webp',
            duplex: 'half'
          });

        if (error) {
          console.error(`❌ Error uploading ${fileName}:`, error);
        } else {
          console.log(`✅ Uploaded: ${fileName}`);
          uploadedCount++;
        }

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));

      } catch (error) {
        console.error(`❌ Error processing ${fileName}:`, error);
      }
    }

    console.log(`\n🎉 Upload Summary:`);
    console.log(`✅ Uploaded: ${uploadedCount} files`);
    console.log(`⏭️  Skipped: ${skippedCount} files`);
    console.log(`📁 Total processed: ${files.length} files`);

    // Generate public URLs for verification
    console.log(`\n📋 Sample URLs:`);
    const sampleFiles = files.slice(0, 3);
    for (const fileName of sampleFiles) {
      const cleanFileName = fileName.toLowerCase().replace(/\s+/g, '-');
      const { data } = supabase.storage
        .from('property-images')
        .getPublicUrl(`properties/${cleanFileName}`);
      
      console.log(`🔗 ${fileName}: ${data.publicUrl}`);
    }

  } catch (error) {
    console.error('❌ Upload failed:', error);
  }
}

if (require.main === module) {
  uploadPropertyImages();
}

module.exports = { uploadPropertyImages };