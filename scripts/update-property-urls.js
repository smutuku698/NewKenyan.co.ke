/**
 * Update Property URLs to Use Supabase Storage
 * 
 * This script converts local property image paths to Supabase storage URLs
 * in the database. Run after uploading images to Supabase.
 * 
 * Usage: node scripts/update-property-urls.js
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Your Supabase storage URL - update this if needed
const SUPABASE_BASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL + '/storage/v1/object/public/property-images/properties';

function convertToSupabaseUrl(localPath) {
  // Convert from: "/propert images/bedroom with city view.webp" or "/propert%20images/bedroom%20with%20city%20view.webp"
  // To: "https://your-supabase-url.supabase.co/storage/v1/object/public/property-images/properties/bedroom-with-city-view.webp"
  
  if (!localPath || typeof localPath !== 'string') return localPath;
  
  // Skip if already a Supabase URL
  if (localPath.includes('supabase.co')) return localPath;
  
  // Remove the local path prefix
  let fileName = localPath.replace('/propert%20images/', '').replace('/propert images/', '');
  
  // Clean the filename: lowercase and replace spaces/encoded spaces with hyphens
  const cleanFileName = fileName
    .toLowerCase()
    .replace(/%20/g, ' ')  // Convert URL encoded spaces back to spaces first
    .replace(/\s+/g, '-')  // Then replace all spaces with hyphens
    .replace(/[()]/g, (match) => match === '(' ? '(' : ')'); // Keep parentheses as-is
  
  return `${SUPABASE_BASE_URL}/${cleanFileName}`;
}

async function updatePropertyUrls() {
  try {
    console.log('Fetching properties with local image paths...');
    
    // Get all properties that have image paths
    const { data: properties, error: fetchError } = await supabase
      .from('property_listings')
      .select('id, property_title, images')
      .not('images', 'is', null);

    if (fetchError) {
      console.error('Fetch error:', fetchError);
      return;
    }

    console.log(`Found ${properties.length} properties to check`);

    let updatedCount = 0;

    for (const property of properties) {
      if (property.images && Array.isArray(property.images)) {
        // Check if any images need updating (contain local paths)
        const needsUpdate = property.images.some(img => 
          img && typeof img === 'string' && 
          (img.includes('/propert images/') || img.includes('/propert%20images/')) &&
          !img.includes('supabase.co')
        );

        if (!needsUpdate) {
          console.log(`⏭️  Skipped ${property.property_title} (already using Supabase URLs)`);
          continue;
        }

        console.log(`\n🏠 Property: ${property.property_title}`);
        console.log('Current images:', property.images);
        
        // Convert local paths to Supabase URLs
        const supabaseUrls = property.images.map(imagePath => {
          const supabaseUrl = convertToSupabaseUrl(imagePath);
          if (supabaseUrl !== imagePath) {
            console.log(`  📸 ${imagePath} -> ${supabaseUrl}`);
          }
          return supabaseUrl;
        });

        // Update the property with Supabase URLs
        const { error: updateError } = await supabase
          .from('property_listings')
          .update({ images: supabaseUrls })
          .eq('id', property.id);

        if (updateError) {
          console.error(`❌ Update error for ${property.property_title}:`, updateError);
        } else {
          console.log(`✅ Updated ${property.property_title}`);
          updatedCount++;
        }
      }
    }

    console.log(`\n🎉 Update Summary:`);
    console.log(`✅ Updated ${updatedCount} properties with Supabase image URLs`);
    console.log(`📁 Total properties checked: ${properties.length}`);

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

if (require.main === module) {
  updatePropertyUrls();
}

module.exports = { updatePropertyUrls, convertToSupabaseUrl };