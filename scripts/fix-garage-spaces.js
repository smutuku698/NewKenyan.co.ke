require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Helper function to generate garage spaces based on property type and bedrooms
function generateGarageSpaces(propertyTitle, propertyType, bedrooms) {
  const title = propertyTitle.toLowerCase();
  const type = propertyType.toLowerCase();

  // Studios get 0-1 garage
  if (type === 'studio' || title.includes('studio')) {
    return Math.random() > 0.6 ? 1 : 0;
  }

  // Villas and penthouses get 2-4 garages
  if (type === 'villa' || type === 'penthouse' || title.includes('villa') || title.includes('penthouse') || title.includes('mansion')) {
    return Math.floor(Math.random() * 3) + 2; // 2-4 spaces
  }

  // Houses get 1-3 garages
  if (type === 'house' || title.includes('house')) {
    return Math.floor(Math.random() * 3) + 1; // 1-3 spaces
  }

  // Townhouses get 1-2 garages
  if (type === 'townhouse' || title.includes('townhouse')) {
    return Math.floor(Math.random() * 2) + 1; // 1-2 spaces
  }

  // Office/Commercial get 3-8 spaces
  if (type === 'office' || type === 'commercial' || type === 'warehouse' || title.includes('office') || title.includes('workspace') || title.includes('co-working')) {
    return Math.floor(Math.random() * 6) + 3; // 3-8 spaces
  }

  // Apartments - based on bedrooms
  if (type === 'apartment' || title.includes('apartment')) {
    if (!bedrooms) {
      return Math.random() > 0.5 ? 1 : 0;
    }

    if (bedrooms === 1) {
      return Math.random() > 0.6 ? 1 : 0; // 40% chance of garage
    } else if (bedrooms === 2) {
      return Math.random() > 0.4 ? 1 : 0; // 60% chance of garage
    } else if (bedrooms === 3) {
      const rand = Math.random();
      if (rand > 0.7) return 2;
      else if (rand > 0.3) return 1;
      else return 0;
    } else if (bedrooms >= 4) {
      const rand = Math.random();
      if (rand > 0.6) return 2;
      else if (rand > 0.2) return 1;
      else return 0;
    }
  }

  // Default: 0-1 garage
  return Math.random() > 0.5 ? 1 : 0;
}

async function fixGarageSpaces() {
  console.log('Fixing garage spaces for all properties...\n');

  try {
    // Fetch all properties
    const { data: properties, error: fetchError } = await supabase
      .from('property_listings')
      .select('id, property_title, property_type, bedrooms, garage')
      .order('created_at', { ascending: true });

    if (fetchError) {
      throw new Error(`Failed to fetch properties: ${fetchError.message}`);
    }

    console.log(`Found ${properties.length} properties\n`);

    let updatedCount = 0;

    for (const property of properties) {
      const newGarage = generateGarageSpaces(property.property_title, property.property_type, property.bedrooms);

      // Update the property
      const { error: updateError } = await supabase
        .from('property_listings')
        .update({ garage: newGarage })
        .eq('id', property.id);

      if (updateError) {
        console.error(`✗ Failed to update ${property.property_title}: ${updateError.message}`);
        continue;
      }

      updatedCount++;
      if (updatedCount <= 20 || newGarage >= 2) {
        console.log(`✓ ${property.property_title}: ${newGarage} garage space${newGarage !== 1 ? 's' : ''}`);
      }
    }

    // Calculate statistics
    const garageStats = properties.reduce((acc, prop) => {
      const garage = generateGarageSpaces(prop.property_title, prop.property_type, prop.bedrooms);
      acc[garage] = (acc[garage] || 0) + 1;
      return acc;
    }, {});

    console.log('\n' + '='.repeat(60));
    console.log('GARAGE SPACES FIX SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total properties updated: ${updatedCount}`);
    console.log('\nGarage distribution:');
    Object.keys(garageStats).sort().forEach(spaces => {
      console.log(`  ${spaces} space${spaces !== '1' ? 's' : ''}: ${garageStats[spaces]} properties`);
    });
    console.log('='.repeat(60));

    console.log('\n✓ Garage spaces updated successfully!');

  } catch (error) {
    console.error('\n✗ Error fixing garage spaces:', error.message);
    process.exit(1);
  }
}

// Run the script
fixGarageSpaces();
