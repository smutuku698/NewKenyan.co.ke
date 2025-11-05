const path = require('path');
const fs = require('fs');

// Load environment
const envPaths = [
  path.join(__dirname, '../.env.local'),
  path.join(__dirname, '../.env'),
];

for (const envPath of envPaths) {
  if (fs.existsSync(envPath)) {
    require('dotenv').config({ path: envPath });
    break;
  }
}

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fixPropertyData() {
  console.log('Fixing property data for location pages...\n');

  try {
    // Get all properties
    const { data: properties, error: propError } = await supabase
      .from('property_listings')
      .select('id, county, price_type');

    if (propError) {
      console.error('Error fetching properties:', propError);
      return;
    }

    console.log(`Found ${properties.length} properties to process\n`);

    let countyUpdates = 0;
    let priceTypeUpdates = 0;

    // Process each property
    for (const property of properties) {
      const updates = {};

      // Fix county names - remove " County" suffix
      if (property.county) {
        const cleanCounty = property.county.replace(/ County$/i, '').trim();
        if (cleanCounty !== property.county) {
          updates.county = cleanCounty;
          countyUpdates++;
        }
      }

      // Fix price_type - capitalize properly
      if (property.price_type) {
        let newPriceType = property.price_type;

        if (property.price_type.toLowerCase() === 'sale') {
          newPriceType = 'For Sale';
        } else if (property.price_type.toLowerCase() === 'rent') {
          newPriceType = 'For Rent';
        } else if (property.price_type.toLowerCase() === 'for sale') {
          newPriceType = 'For Sale';
        } else if (property.price_type.toLowerCase() === 'for rent') {
          newPriceType = 'For Rent';
        }

        if (newPriceType !== property.price_type) {
          updates.price_type = newPriceType;
          priceTypeUpdates++;
        }
      }

      // Update if there are changes
      if (Object.keys(updates).length > 0) {
        const { error: updateError } = await supabase
          .from('property_listings')
          .update(updates)
          .eq('id', property.id);

        if (updateError) {
          console.error(`Error updating property ${property.id}:`, updateError);
        }
      }
    }

    console.log('='.repeat(60));
    console.log('DATA CLEANUP COMPLETE');
    console.log('='.repeat(60));
    console.log(`✓ County names standardized: ${countyUpdates} properties`);
    console.log(`✓ Price types standardized: ${priceTypeUpdates} properties`);
    console.log('\nChanges made:');
    console.log('  - "Nairobi County" → "Nairobi"');
    console.log('  - "Mombasa County" → "Mombasa"');
    console.log('  - "sale" → "For Sale"');
    console.log('  - "rent" → "For Rent"');
    console.log('\n✓ Properties are now ready for location pages!');

  } catch (error) {
    console.error('Error:', error);
  }
}

fixPropertyData();
