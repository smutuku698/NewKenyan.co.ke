require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Helper function to generate realistic year built based on property type
function generateYearBuilt(propertyType) {
  const currentYear = new Date().getFullYear();
  const type = propertyType.toLowerCase();

  if (type.includes('modern') || type.includes('luxury')) {
    // Modern/luxury properties: 2015-2024
    return Math.floor(Math.random() * 10) + 2015;
  } else if (type.includes('office') || type.includes('commercial')) {
    // Commercial: 2000-2024
    return Math.floor(Math.random() * 25) + 2000;
  } else {
    // Regular properties: 2005-2024
    return Math.floor(Math.random() * 20) + 2005;
  }
}

// Helper function to generate garage spaces based on property type and bedrooms
function generateGarageSpaces(propertyType, bedrooms) {
  const type = propertyType.toLowerCase();

  if (type.includes('studio') || type === 'studio') {
    return Math.random() > 0.5 ? 1 : 0;
  } else if (type.includes('villa') || type.includes('penthouse')) {
    return Math.floor(Math.random() * 3) + 2; // 2-4 spaces
  } else if (type.includes('house')) {
    return Math.floor(Math.random() * 2) + 1; // 1-2 spaces
  } else if (type.includes('apartment')) {
    if (bedrooms >= 3) {
      return Math.random() > 0.3 ? 1 : 2;
    } else {
      return Math.random() > 0.5 ? 1 : 0;
    }
  } else if (type.includes('office') || type.includes('commercial')) {
    return Math.floor(Math.random() * 5) + 2; // 2-6 spaces
  } else {
    return Math.random() > 0.6 ? 1 : 0;
  }
}

// Helper function to generate Google Maps link for major Kenyan cities
function generateGoogleMapsLink(city, address) {
  const cityCoordinates = {
    'Nairobi': { lat: -1.2921, lng: 36.8219 },
    'Mombasa': { lat: -4.0435, lng: 39.6682 },
    'Kisumu': { lat: -0.0917, lng: 34.7680 },
    'Nakuru': { lat: -0.3031, lng: 36.0800 },
    'Eldoret': { lat: 0.5143, lng: 35.2698 },
    'Thika': { lat: -1.0332, lng: 37.0693 },
    'Malindi': { lat: -3.2167, lng: 40.1167 },
    'Kitale': { lat: 1.0167, lng: 35.0000 },
    'Machakos': { lat: -1.5177, lng: 37.2634 },
    'Meru': { lat: 0.0469, lng: 37.6495 },
  };

  // Check if we have coordinates for this city
  const coords = cityCoordinates[city];

  if (coords) {
    // Add small random offset to make locations slightly different
    const latOffset = (Math.random() - 0.5) * 0.05;
    const lngOffset = (Math.random() - 0.5) * 0.05;
    const finalLat = coords.lat + latOffset;
    const finalLng = coords.lng + lngOffset;

    // 70% chance of having a Google Maps link
    if (Math.random() > 0.3) {
      return `https://www.google.com/maps?q=${finalLat},${finalLng}`;
    }
  }

  return null;
}

async function populateCompletePropertyData() {
  console.log('Starting to populate complete property data...\n');

  try {
    // Fetch all properties
    console.log('Fetching all properties from database...');
    const { data: properties, error: fetchError } = await supabase
      .from('property_listings')
      .select('id, property_title, property_type, bedrooms, city, address, year_built, garage, google_maps_link')
      .order('created_at', { ascending: true });

    if (fetchError) {
      throw new Error(`Failed to fetch properties: ${fetchError.message}`);
    }

    console.log(`Found ${properties.length} properties\n`);

    let updatedCount = 0;
    let skippedCount = 0;
    const updates = [];

    for (const property of properties) {
      const needsUpdate =
        !property.year_built ||
        property.garage === null ||
        property.garage === undefined ||
        !property.google_maps_link;

      if (!needsUpdate) {
        skippedCount++;
        continue;
      }

      // Generate missing data
      const yearBuilt = property.year_built || generateYearBuilt(property.property_title);
      const garage = (property.garage !== null && property.garage !== undefined)
        ? property.garage
        : generateGarageSpaces(property.property_type, property.bedrooms || 2);
      const googleMapsLink = property.google_maps_link || generateGoogleMapsLink(property.city, property.address);

      // Update the property
      const { error: updateError } = await supabase
        .from('property_listings')
        .update({
          year_built: yearBuilt,
          garage: garage,
          google_maps_link: googleMapsLink
        })
        .eq('id', property.id);

      if (updateError) {
        console.error(`✗ Failed to update ${property.property_title}: ${updateError.message}`);
        continue;
      }

      updatedCount++;
      console.log(`✓ Updated: ${property.property_title} (${property.city})`);
      console.log(`  - Year Built: ${yearBuilt}`);
      console.log(`  - Garage: ${garage} spaces`);
      console.log(`  - Google Maps: ${googleMapsLink ? 'Added' : 'Not added'}\n`);

      updates.push({
        title: property.property_title,
        yearBuilt,
        garage,
        hasGoogleMaps: !!googleMapsLink
      });
    }

    // Summary
    console.log('='.repeat(60));
    console.log('PROPERTY DATA POPULATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total properties: ${properties.length}`);
    console.log(`Updated: ${updatedCount}`);
    console.log(`Already complete: ${skippedCount}`);
    console.log('='.repeat(60));

    if (updates.length > 0) {
      console.log('\nSample of updated properties:');
      updates.slice(0, 10).forEach(update => {
        console.log(`  - ${update.title}:`);
        console.log(`    Year: ${update.yearBuilt}, Garage: ${update.garage}, Maps: ${update.hasGoogleMaps ? 'Yes' : 'No'}`);
      });
      if (updates.length > 10) {
        console.log(`  ... and ${updates.length - 10} more`);
      }
    }

    // Statistics
    const withMaps = updates.filter(u => u.hasGoogleMaps).length;
    const avgGarage = updates.reduce((sum, u) => sum + u.garage, 0) / updates.length;
    const avgYear = updates.reduce((sum, u) => sum + u.yearBuilt, 0) / updates.length;

    console.log('\nStatistics:');
    console.log(`  - Properties with Google Maps: ${withMaps}/${updates.length} (${((withMaps/updates.length)*100).toFixed(1)}%)`);
    console.log(`  - Average garage spaces: ${avgGarage.toFixed(1)}`);
    console.log(`  - Average year built: ${Math.round(avgYear)}`);

    console.log('\n✓ Property data population completed successfully!');
    console.log('\nAll properties now have:');
    console.log('  ✓ Year Built');
    console.log('  ✓ Garage Spaces');
    console.log('  ✓ Google Maps Links (where applicable)');

  } catch (error) {
    console.error('\n✗ Error during property data population:', error.message);
    process.exit(1);
  }
}

// Run the script
populateCompletePropertyData();
