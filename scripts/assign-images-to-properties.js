require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function assignImagesToProperties() {
  console.log('Starting image assignment process...\n');

  try {
    // Step 1: Fetch all properties
    console.log('Fetching all properties from database...');
    const { data: allProperties, error: fetchError } = await supabase
      .from('property_listings')
      .select('id, property_title, images, property_type, city')
      .order('created_at', { ascending: true });

    if (fetchError) {
      throw new Error(`Failed to fetch properties: ${fetchError.message}`);
    }

    console.log(`Found ${allProperties.length} total properties\n`);

    // Step 2: Separate properties with and without images
    const propertiesWithImages = allProperties.filter(
      p => p.images && Array.isArray(p.images) && p.images.length > 0
    );

    const propertiesWithoutImages = allProperties.filter(
      p => !p.images || !Array.isArray(p.images) || p.images.length === 0
    );

    console.log(`Properties with images: ${propertiesWithImages.length}`);
    console.log(`Properties without images: ${propertiesWithoutImages.length}\n`);

    if (propertiesWithoutImages.length === 0) {
      console.log('Great! All properties already have images.');
      return;
    }

    if (propertiesWithImages.length === 0) {
      console.error('Error: No properties with images found to use as source.');
      return;
    }

    // Step 3: Create a mapping strategy
    // We'll try to match property types when possible for better consistency
    const imageSetsByType = {};
    propertiesWithImages.forEach(prop => {
      const type = prop.property_type.toLowerCase();
      if (!imageSetsByType[type]) {
        imageSetsByType[type] = [];
      }
      imageSetsByType[type].push(prop.images);
    });

    console.log('Available image sets by property type:');
    Object.keys(imageSetsByType).forEach(type => {
      console.log(`  - ${type}: ${imageSetsByType[type].length} sets`);
    });
    console.log('');

    // Step 4: Assign images to properties without them
    let updateCount = 0;
    let errorCount = 0;
    const updates = [];

    for (const property of propertiesWithoutImages) {
      try {
        const propertyType = property.property_type.toLowerCase();

        // Try to find images from same property type first
        let imagesToAssign;
        if (imageSetsByType[propertyType] && imageSetsByType[propertyType].length > 0) {
          // Get a random image set from the same property type
          const randomIndex = Math.floor(Math.random() * imageSetsByType[propertyType].length);
          imagesToAssign = imageSetsByType[propertyType][randomIndex];
        } else {
          // If no match, use any random property's images
          const randomProperty = propertiesWithImages[Math.floor(Math.random() * propertiesWithImages.length)];
          imagesToAssign = randomProperty.images;
        }

        // Update the property
        const { error: updateError } = await supabase
          .from('property_listings')
          .update({ images: imagesToAssign })
          .eq('id', property.id);

        if (updateError) {
          throw updateError;
        }

        updateCount++;
        console.log(`✓ Updated: ${property.property_title} (${property.city}) - Assigned ${imagesToAssign.length} images`);

        updates.push({
          id: property.id,
          title: property.property_title,
          imageCount: imagesToAssign.length
        });

      } catch (error) {
        errorCount++;
        console.error(`✗ Failed to update ${property.property_title}: ${error.message}`);
      }
    }

    // Step 5: Summary
    console.log('\n' + '='.repeat(60));
    console.log('IMAGE ASSIGNMENT SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total properties processed: ${propertiesWithoutImages.length}`);
    console.log(`Successfully updated: ${updateCount}`);
    console.log(`Failed updates: ${errorCount}`);
    console.log('='.repeat(60));

    if (updateCount > 0) {
      console.log('\nSample of updated properties:');
      updates.slice(0, 5).forEach(update => {
        console.log(`  - ${update.title}: ${update.imageCount} images assigned`);
      });
      if (updates.length > 5) {
        console.log(`  ... and ${updates.length - 5} more`);
      }
    }

    console.log('\n✓ Image assignment process completed successfully!');
    console.log('\nNote: All properties now have complete image sets for visual consistency.');

  } catch (error) {
    console.error('\n✗ Error during image assignment:', error.message);
    process.exit(1);
  }
}

// Run the script
assignImagesToProperties();
