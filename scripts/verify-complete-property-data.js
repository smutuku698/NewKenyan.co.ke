require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function verifyCompletePropertyData() {
  console.log('Verifying complete property data...\n');

  try {
    // Fetch all properties with all fields
    const { data: properties, error: fetchError } = await supabase
      .from('property_listings')
      .select('*')
      .order('created_at', { ascending: true });

    if (fetchError) {
      throw new Error(`Failed to fetch properties: ${fetchError.message}`);
    }

    console.log(`Total properties in database: ${properties.length}\n`);

    // Analyze data completeness
    const stats = {
      withImages: 0,
      withYearBuilt: 0,
      withGarage: 0,
      withGoogleMaps: 0,
      withBedrooms: 0,
      withBathrooms: 0,
      withSquareFeet: 0,
      withAmenities: 0,
      complete: 0
    };

    const incomplete = [];

    properties.forEach(prop => {
      let isComplete = true;

      if (prop.images && prop.images.length > 0) {
        stats.withImages++;
      } else {
        isComplete = false;
      }

      if (prop.year_built) {
        stats.withYearBuilt++;
      } else {
        isComplete = false;
      }

      if (prop.garage !== null && prop.garage !== undefined) {
        stats.withGarage++;
      } else {
        isComplete = false;
      }

      if (prop.google_maps_link) {
        stats.withGoogleMaps++;
      }

      if (prop.bedrooms !== null && prop.bedrooms !== undefined) {
        stats.withBedrooms++;
      }

      if (prop.bathrooms !== null && prop.bathrooms !== undefined) {
        stats.withBathrooms++;
      }

      if (prop.square_feet) {
        stats.withSquareFeet++;
      }

      if (prop.amenities && prop.amenities.length > 0) {
        stats.withAmenities++;
      }

      if (isComplete) {
        stats.complete++;
      } else {
        incomplete.push({
          title: prop.property_title,
          city: prop.city,
          missing: []
        });
        if (!prop.images || prop.images.length === 0) incomplete[incomplete.length - 1].missing.push('images');
        if (!prop.year_built) incomplete[incomplete.length - 1].missing.push('year_built');
        if (prop.garage === null || prop.garage === undefined) incomplete[incomplete.length - 1].missing.push('garage');
      }
    });

    // Display results
    console.log('='.repeat(70));
    console.log('PROPERTY DATA COMPLETENESS REPORT');
    console.log('='.repeat(70));
    console.log(`\nCore Required Fields:`);
    console.log(`  Images:          ${stats.withImages}/${properties.length} (${((stats.withImages/properties.length)*100).toFixed(1)}%)`);
    console.log(`  Year Built:      ${stats.withYearBuilt}/${properties.length} (${((stats.withYearBuilt/properties.length)*100).toFixed(1)}%)`);
    console.log(`  Garage Spaces:   ${stats.withGarage}/${properties.length} (${((stats.withGarage/properties.length)*100).toFixed(1)}%)`);

    console.log(`\nOptional Fields:`);
    console.log(`  Google Maps:     ${stats.withGoogleMaps}/${properties.length} (${((stats.withGoogleMaps/properties.length)*100).toFixed(1)}%)`);
    console.log(`  Bedrooms:        ${stats.withBedrooms}/${properties.length} (${((stats.withBedrooms/properties.length)*100).toFixed(1)}%)`);
    console.log(`  Bathrooms:       ${stats.withBathrooms}/${properties.length} (${((stats.withBathrooms/properties.length)*100).toFixed(1)}%)`);
    console.log(`  Square Feet:     ${stats.withSquareFeet}/${properties.length} (${((stats.withSquareFeet/properties.length)*100).toFixed(1)}%)`);
    console.log(`  Amenities:       ${stats.withAmenities}/${properties.length} (${((stats.withAmenities/properties.length)*100).toFixed(1)}%)`);

    console.log(`\n${'='.repeat(70)}`);
    console.log(`Complete Properties (all required fields): ${stats.complete}/${properties.length} (${((stats.complete/properties.length)*100).toFixed(1)}%)`);
    console.log('='.repeat(70));

    if (incomplete.length > 0) {
      console.log(`\n⚠ Incomplete properties (${incomplete.length}):`);
      incomplete.slice(0, 10).forEach(prop => {
        console.log(`  - ${prop.title} (${prop.city})`);
        console.log(`    Missing: ${prop.missing.join(', ')}`);
      });
      if (incomplete.length > 10) {
        console.log(`  ... and ${incomplete.length - 10} more`);
      }
    } else {
      console.log('\n✓ All properties have complete data!');
    }

    // Sample some complete properties
    const completeProps = properties.filter(p =>
      p.images && p.images.length > 0 &&
      p.year_built &&
      p.garage !== null && p.garage !== undefined
    );

    if (completeProps.length > 0) {
      console.log('\nSample complete properties:');
      completeProps.slice(0, 5).forEach(prop => {
        console.log(`  - ${prop.property_title} (${prop.city})`);
        console.log(`    Year: ${prop.year_built}, Garage: ${prop.garage}, Images: ${prop.images.length}, Maps: ${prop.google_maps_link ? 'Yes' : 'No'}`);
      });
    }

    // Garage statistics
    const garageStats = {};
    properties.forEach(p => {
      const garage = p.garage || 0;
      garageStats[garage] = (garageStats[garage] || 0) + 1;
    });

    console.log('\nGarage Space Distribution:');
    Object.keys(garageStats).sort((a, b) => Number(a) - Number(b)).forEach(spaces => {
      const count = garageStats[spaces];
      const percentage = ((count / properties.length) * 100).toFixed(1);
      console.log(`  ${spaces} space${spaces !== '1' ? 's' : ''}: ${count} properties (${percentage}%)`);
    });

    // Year built statistics
    const years = properties.filter(p => p.year_built).map(p => p.year_built);
    if (years.length > 0) {
      const avgYear = Math.round(years.reduce((sum, y) => sum + y, 0) / years.length);
      const minYear = Math.min(...years);
      const maxYear = Math.max(...years);

      console.log('\nYear Built Statistics:');
      console.log(`  Average: ${avgYear}`);
      console.log(`  Range: ${minYear} - ${maxYear}`);
    }

    console.log('\n✓ Verification completed!\n');

  } catch (error) {
    console.error('\n✗ Error during verification:', error.message);
    process.exit(1);
  }
}

// Run the script
verifyCompletePropertyData();
