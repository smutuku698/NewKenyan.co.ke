/**
 * Remove -main images from Property Listings
 *
 * This script finds all properties with images ending in "-main"
 * and removes those images from the database.
 *
 * Usage: node scripts/remove-main-images.js
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client with service role key for admin operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function removeMainImages() {
  try {
    console.log('🔍 Fetching all property listings...\n');

    // Fetch all properties
    const { data: properties, error: fetchError } = await supabase
      .from('property_listings')
      .select('id, property_title, images');

    if (fetchError) {
      throw fetchError;
    }

    console.log(`📊 Found ${properties.length} total properties\n`);

    let updatedCount = 0;
    let totalMainImagesRemoved = 0;

    for (const property of properties) {
      if (!property.images || property.images.length === 0) {
        continue;
      }

      // Filter out images ending with "-main"
      const originalImages = property.images;
      const filteredImages = originalImages.filter(img => {
        // Check if image URL ends with "-main.webp" or contains "-main" before the extension
        const isMainImage = img.match(/-main\.(webp|jpg|jpeg|png)$/i);
        return !isMainImage;
      });

      // If any images were removed, update the property
      if (filteredImages.length !== originalImages.length) {
        const removedCount = originalImages.length - filteredImages.length;
        totalMainImagesRemoved += removedCount;

        console.log(`🗑️  Property: ${property.property_title}`);
        console.log(`   Removed ${removedCount} -main image(s)`);
        console.log(`   Before: ${originalImages.length} images`);
        console.log(`   After: ${filteredImages.length} images`);

        // Show which images were removed
        const removedImages = originalImages.filter(img => !filteredImages.includes(img));
        removedImages.forEach(img => {
          const imageName = img.split('/').pop();
          console.log(`   ❌ Removed: ${imageName}`);
        });
        console.log('');

        // Update the property with filtered images
        const { error: updateError } = await supabase
          .from('property_listings')
          .update({ images: filteredImages })
          .eq('id', property.id);

        if (updateError) {
          console.error(`❌ Error updating property ${property.id}:`, updateError.message);
        } else {
          updatedCount++;
        }
      }
    }

    console.log('\n✅ Cleanup Complete!');
    console.log(`📊 Summary:`);
    console.log(`   - Total properties checked: ${properties.length}`);
    console.log(`   - Properties updated: ${updatedCount}`);
    console.log(`   - Total -main images removed: ${totalMainImagesRemoved}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the cleanup
removeMainImages();
