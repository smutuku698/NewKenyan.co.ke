/**
 * Upload Properties from CSV to Supabase Database
 *
 * This script reads the properties CSV file and uploads all property data
 * to the Supabase property_listings table.
 *
 * Usage: node scripts/upload-properties-from-csv.js
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

const CSV_PATH = path.join(__dirname, '..', 'properties-for-upload-with-urls.csv');
const ADMIN_USER_ID = 'f47ac10b-58cc-4372-a567-0e02b2c3d479'; // Default admin user ID

// Helper function to parse CSV line (handles quoted fields)
function parseCSVLine(line) {
  const fields = [];
  let currentField = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      fields.push(currentField);
      currentField = '';
    } else {
      currentField += char;
    }
  }

  fields.push(currentField);
  return fields;
}

// Parse amenities string to array
function parseAmenities(amenitiesStr) {
  if (!amenitiesStr || amenitiesStr.trim() === '') return [];
  return amenitiesStr.split(',').map(a => a.trim()).filter(a => a);
}

// Parse images string to array
function parseImages(imagesStr) {
  if (!imagesStr || imagesStr.trim() === '') return [];
  return imagesStr.split(',').map(i => i.trim()).filter(i => i);
}

// Parse boolean value
function parseBoolean(value) {
  if (!value || value.trim() === '') return false;
  return value.toLowerCase() === 'true' || value === '1';
}

// Parse number value
function parseNumber(value) {
  if (!value || value.trim() === '') return null;
  const num = parseFloat(value);
  return isNaN(num) ? null : num;
}

async function uploadPropertiesFromCSV() {
  try {
    console.log('🚀 Starting property upload from CSV...\n');

    if (!fs.existsSync(CSV_PATH)) {
      console.error('❌ CSV file not found:', CSV_PATH);
      return;
    }

    // Read CSV file
    const csvContent = fs.readFileSync(CSV_PATH, 'utf-8');
    const lines = csvContent.split('\n');

    console.log(`📄 Found ${lines.length - 1} properties in CSV (excluding header)\n`);

    // Parse header
    const header = parseCSVLine(lines[0]);
    console.log('📋 CSV Columns:', header.join(', '), '\n');

    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;

    // Process each line (skip header)
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();

      // Skip empty lines
      if (!line) {
        skipCount++;
        continue;
      }

      try {
        const fields = parseCSVLine(line);

        // Map CSV fields to property object
        const property = {
          user_id: fields[0] || ADMIN_USER_ID,
          property_title: fields[1] || '',
          property_type: fields[2] || 'Apartment',
          description: fields[3] || '',
          price: parseNumber(fields[4]) || 0,
          price_type: fields[5] || 'sale',
          bedrooms: parseNumber(fields[6]),
          bathrooms: parseNumber(fields[7]),
          square_feet: parseNumber(fields[8]),
          address: fields[9] || '',
          city: fields[10] || '',
          county: fields[11] || null,
          contact_phone: fields[12] || '',
          contact_email: fields[13] || null,
          whatsapp_number: fields[14] || null,
          amenities: parseAmenities(fields[15]),
          images: parseImages(fields[16]),
          available_from: fields[17] || null,
          is_furnished: parseBoolean(fields[18]),
          pets_allowed: parseBoolean(fields[19]),
          is_approved: parseBoolean(fields[20]),
          is_featured: parseBoolean(fields[21]),
          rating: 0,
          review_count: 0,
          views_count: 0
        };

        // Validate required fields
        if (!property.property_title || !property.city || property.price === 0) {
          console.log(`[${i}] ⚠️  Skipped - Missing required fields: ${property.property_title || 'NO TITLE'}`);
          skipCount++;
          continue;
        }

        // Insert into database
        const { data, error } = await supabase
          .from('property_listings')
          .insert([property])
          .select();

        if (error) {
          console.error(`[${i}] ❌ Error: ${property.property_title}`);
          console.error(`    ${error.message}`);
          errorCount++;
        } else {
          console.log(`[${i}] ✅ Uploaded: ${property.property_title} - ${property.city} (${property.price_type})`);
          successCount++;
        }

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));

      } catch (error) {
        console.error(`[${i}] ❌ Parse error:`, error.message);
        errorCount++;
      }
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 UPLOAD SUMMARY');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`✅ Successfully uploaded: ${successCount} properties`);
    console.log(`⏭️  Skipped: ${skipCount} rows`);
    console.log(`❌ Errors: ${errorCount} rows`);
    console.log(`📁 Total processed: ${lines.length - 1} rows`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    if (successCount > 0) {
      console.log('🎉 Properties uploaded successfully!');
      console.log('💡 Check your website to see the new listings.\n');
    }

  } catch (error) {
    console.error('❌ Upload failed:', error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  uploadPropertiesFromCSV()
    .then(() => {
      console.log('✅ Script completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Script failed:', error);
      process.exit(1);
    });
}

module.exports = { uploadPropertiesFromCSV };
