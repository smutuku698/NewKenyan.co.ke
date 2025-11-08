const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Initialize Supabase client
const supabaseUrl = 'https://gsdctfcfkrtuxnwapjcj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzZGN0ZmNma3J0dXhud2FwamNqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTEzNDgzMCwiZXhwIjoyMDcwNzEwODMwfQ.TmCzZ3dyKOhN0V-6ezLAykzsJfAWcaVCt5Yx0gjMHLA';
const supabase = createClient(supabaseUrl, supabaseKey);

// Simple CSV parser
function parseCSV(content) {
  const lines = content.split('\n');
  if (lines.length === 0) return [];

  const headers = lines[0].split(',').map(h => h.trim());
  const records = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;

    const values = [];
    let currentValue = '';
    let insideQuotes = false;

    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') {
        insideQuotes = !insideQuotes;
      } else if (char === ',' && !insideQuotes) {
        values.push(currentValue.trim());
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    values.push(currentValue.trim());

    const record = {};
    headers.forEach((header, idx) => {
      record[header] = values[idx] || '';
    });
    records.push(record);
  }

  return records;
}

const csvFiles = [
  'C:\\Users\\Atom\\Documents\\jobs-in-kenya-scrapper\\apartments_data\\listings_musilli_fixed_20251106_062332\\musilli_pages7-20_fixed_20251106_062332.csv',
  'C:\\Users\\Atom\\Documents\\jobs-in-kenya-scrapper\\apartments_data\\neighborhoods_only_20251106_064034\\neighborhoods_20251106_064034.csv',
  'C:\\Users\\Atom\\Documents\\jobs-in-kenya-scrapper\\apartments_data\\listings_musilli_20251105_234038\\musilli_pages7-20_20251105_234038.csv'
];

async function checkImages() {
  console.log('='.repeat(80));
  console.log('LISTING IMAGES DATABASE CHECK');
  console.log('='.repeat(80));
  console.log('');

  // Get all listings with images from database
  const { data: dbListings, error } = await supabase
    .from('property_listings')
    .select('property_title, images')
    .not('images', 'is', null);

  if (error) {
    console.error('Error fetching from database:', error);
    return;
  }

  console.log(`Total listings with images in database: ${dbListings.length}`);
  console.log('');

  // Process each CSV file
  for (const csvFile of csvFiles) {
    console.log('-'.repeat(80));
    console.log(`Processing: ${path.basename(csvFile)}`);
    console.log('-'.repeat(80));

    try {
      const fileContent = fs.readFileSync(csvFile, 'utf-8');
      const records = parseCSV(fileContent);

      console.log(`Total listings in CSV: ${records.length}`);

      let foundCount = 0;
      let missingCount = 0;
      let missingListings = [];

      for (const record of records) {
        const title = record.property_title;
        const csvImages = record.images;

        // Check if this listing exists in DB with images
        const dbListing = dbListings.find(db =>
          db.property_title && title &&
          db.property_title.trim().toLowerCase() === title.trim().toLowerCase()
        );

        if (dbListing && dbListing.images) {
          foundCount++;
        } else {
          missingCount++;
          if (missingListings.length < 10) {
            missingListings.push({
              title: title ? title.substring(0, 60) : 'N/A',
              csvImages: csvImages ? csvImages.substring(0, 40) : 'N/A'
            });
          }
        }
      }

      console.log(`\nResults:`);
      console.log(`  ✓ Found in DB with images: ${foundCount} (${(foundCount/records.length*100).toFixed(1)}%)`);
      console.log(`  ✗ Missing or no images: ${missingCount} (${(missingCount/records.length*100).toFixed(1)}%)`);

      if (missingListings.length > 0) {
        console.log(`\nSample missing listings (showing first ${missingListings.length}):`);
        missingListings.forEach((listing, idx) => {
          console.log(`  ${idx + 1}. ${listing.title}`);
          console.log(`     CSV Images: ${listing.csvImages}`);
        });
      }
      console.log('');

    } catch (err) {
      console.error(`Error processing ${csvFile}:`, err.message);
    }
  }

  // Summary of database images
  console.log('='.repeat(80));
  console.log('DATABASE IMAGE SUMMARY');
  console.log('='.repeat(80));
  console.log(`\nSample listings with images in DB (showing first 10):`);

  dbListings.slice(0, 10).forEach((listing, idx) => {
    const imageArray = Array.isArray(listing.images) ? listing.images : [listing.images];
    console.log(`${idx + 1}. ${listing.property_title.substring(0, 60)}`);
    console.log(`   Images: ${imageArray.join(', ').substring(0, 80)}`);
  });

  console.log('\n' + '='.repeat(80));
}

checkImages().catch(console.error);
