require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function verifyPropertyImages() {
  console.log('Verifying property images in database...\n');

  try {
    // Fetch all properties
    const { data: allProperties, error: fetchError } = await supabase
      .from('property_listings')
      .select('id, property_title, images, city')
      .order('created_at', { ascending: true });

    if (fetchError) {
      throw new Error(`Failed to fetch properties: ${fetchError.message}`);
    }

    // Analyze image status
    const withImages = allProperties.filter(p => p.images && Array.isArray(p.images) && p.images.length > 0);
    const withoutImages = allProperties.filter(p => !p.images || !Array.isArray(p.images) || p.images.length === 0);

    console.log('='.repeat(60));
    console.log('PROPERTY IMAGES VERIFICATION REPORT');
    console.log('='.repeat(60));
    console.log(`Total properties: ${allProperties.length}`);
    console.log(`Properties with images: ${withImages.length} (${((withImages.length / allProperties.length) * 100).toFixed(1)}%)`);
    console.log(`Properties without images: ${withoutImages.length} (${((withoutImages.length / allProperties.length) * 100).toFixed(1)}%)`);
    console.log('='.repeat(60));

    if (withImages.length > 0) {
      const imageCounts = {};
      withImages.forEach(p => {
        const count = p.images.length;
        imageCounts[count] = (imageCounts[count] || 0) + 1;
      });

      console.log('\nImage count distribution:');
      Object.keys(imageCounts).sort((a, b) => b - a).forEach(count => {
        console.log(`  ${count} images: ${imageCounts[count]} properties`);
      });
    }

    if (withoutImages.length > 0) {
      console.log('\n⚠ Properties still without images:');
      withoutImages.forEach(p => {
        console.log(`  - ${p.property_title} (${p.city})`);
      });
    } else {
      console.log('\n✓ All properties have images! Site is ready.');
    }

    // Sample some properties with images
    console.log('\nSample properties with images:');
    withImages.slice(0, 5).forEach(p => {
      console.log(`  - ${p.property_title}: ${p.images.length} images`);
    });

    console.log('\n✓ Verification completed!\n');

  } catch (error) {
    console.error('\n✗ Error during verification:', error.message);
    process.exit(1);
  }
}

// Run the script
verifyPropertyImages();
