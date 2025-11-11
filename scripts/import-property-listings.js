const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Initialize Supabase client with service role key
const supabaseUrl = 'https://gsdctfcfkrtuxnwapjcj.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzZGN0ZmNma3J0dXhud2FwamNqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTEzNDgzMCwiZXhwIjoyMDcwNzEwODMwfQ.TmCzZ3dyKOhN0V-6ezLAykzsJfAWcaVCt5Yx0gjMHLA';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Path to database file
const DB_FILE = 'C:/Users/Atom/Documents/jobs-in-kenya-scrapper/property_data_package/complete_coverage_database.json';
const BUCKET_NAME = 'property-images';
const BASE_IMAGE_URL = `${supabaseUrl}/storage/v1/object/public/${BUCKET_NAME}/`;

// Track progress
let insertedCount = 0;
let errorCount = 0;
let skippedCount = 0;
const errors = [];

function mapImageURLs(images) {
  if (!images || !Array.isArray(images)) return [];

  return images.map(imageName => {
    // If already a full URL, return as is
    if (imageName.startsWith('http')) return imageName;

    // Otherwise, prepend the base URL
    return `${BASE_IMAGE_URL}${imageName}`;
  });
}

function transformListing(listing) {
  // Map the listing to match your database schema
  return {
    property_title: listing.property_title,
    property_type: listing.property_type,
    price_type: listing.price_type,
    price: listing.price,
    description: listing.description,
    bedrooms: listing.bedrooms,
    bathrooms: listing.bathrooms,
    square_feet: listing.square_feet,
    garage: listing.garage || null,
    year_built: listing.year_built || null,
    address: listing.address,
    city: listing.city,
    county: listing.county,
    contact_phone: listing.contact_phone,
    whatsapp_number: listing.whatsapp_number,
    contact_email: listing.contact_email || null,
    google_maps_link: listing.google_maps_link || null,
    pin_location_url: listing.pin_location_url || null,
    amenities: listing.amenities || [],
    nearby_features: listing.nearby_features || [],
    external_features: listing.external_features || [],
    internal_features: listing.internal_features || [],
    images: mapImageURLs(listing.images),
    available_from: listing.available_from || null,
    is_furnished: listing.is_furnished || false,
    pets_allowed: listing.pets_allowed || false,
    is_approved: true, // Auto-approve these listings
    is_featured: listing.is_featured || false,
    rating: listing.rating || 0,
    construction_progress: listing.construction_progress || null,
    completion_date: listing.completion_date || null,
    payment_plan: listing.payment_plan || null,
    user_id: 'system', // System-generated listings
    views_count: 0,
    review_count: 0
  };
}

async function checkExistingListings() {
  console.log('🔍 Checking existing listings...');

  const { count, error } = await supabase
    .from('property_listings')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('❌ Error checking existing listings:', error);
    return null;
  }

  console.log(`📊 Found ${count} existing listings in database`);
  return count;
}

async function insertListings(listings) {
  console.log(`\n📥 Inserting ${listings.length} listings in batch...`);

  try {
    const { data, error } = await supabase
      .from('property_listings')
      .insert(listings)
      .select();

    if (error) throw error;

    insertedCount += listings.length;
    return { success: true, count: listings.length };
  } catch (error) {
    // If batch fails, try inserting one by one
    console.log('⚠️  Batch insert failed, trying individual inserts...');

    for (const listing of listings) {
      try {
        const { data, error: insertError } = await supabase
          .from('property_listings')
          .insert([listing])
          .select();

        if (insertError) {
          if (insertError.message.includes('duplicate') || insertError.code === '23505') {
            skippedCount++;
          } else {
            throw insertError;
          }
        } else {
          insertedCount++;
        }
      } catch (err) {
        errorCount++;
        errors.push({
          listing: listing.property_title,
          error: err.message
        });
      }
    }

    return { success: false, error: error.message };
  }
}

async function importAllListings() {
  console.log('🚀 Starting property listings import process...\n');

  // Check existing listings
  const existingCount = await checkExistingListings();

  if (existingCount === null) {
    console.error('❌ Failed to check database. Aborting.');
    return;
  }

  // Read database file
  console.log('\n📂 Reading database file...');
  const rawData = fs.readFileSync(DB_FILE, 'utf8');
  const database = JSON.parse(rawData);
  const listings = database.listings;

  console.log(`📊 Found ${listings.length} listings to import\n`);

  // Transform all listings
  console.log('🔄 Transforming listings with correct image URLs...');
  const transformedListings = listings.map(transformListing);

  // Verify image URLs
  const sampleListing = transformedListings[0];
  console.log('\n📸 Sample image URLs (first listing):');
  sampleListing.images.slice(0, 2).forEach(url => console.log(`  - ${url}`));

  // Import in batches
  const batchSize = 100; // Insert 100 listings at a time
  const totalBatches = Math.ceil(transformedListings.length / batchSize);

  console.log(`\n📦 Importing in ${totalBatches} batches of ${batchSize}...\n`);

  for (let i = 0; i < transformedListings.length; i += batchSize) {
    const batch = transformedListings.slice(i, i + batchSize);
    const batchNumber = Math.floor(i / batchSize) + 1;

    console.log(`📦 Processing batch ${batchNumber}/${totalBatches} (${batch.length} listings)...`);

    await insertListings(batch);

    // Progress update
    const progress = Math.round(((i + batch.length) / transformedListings.length) * 100);
    console.log(`✅ Batch ${batchNumber} complete. Progress: ${progress}% (${insertedCount} inserted, ${skippedCount} skipped, ${errorCount} errors)\n`);

    // Small delay between batches
    if (i + batchSize < transformedListings.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  // Final summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 IMPORT COMPLETE - SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Successfully inserted: ${insertedCount}`);
  console.log(`⏭️  Skipped (duplicates): ${skippedCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log(`📁 Total processed: ${transformedListings.length}`);
  console.log('='.repeat(60));

  if (errors.length > 0) {
    console.log('\n❌ Errors encountered:');
    errors.slice(0, 10).forEach(({ listing, error }) => {
      console.log(`  - ${listing}: ${error}`);
    });
    if (errors.length > 10) {
      console.log(`  ... and ${errors.length - 10} more errors`);
    }
  }

  // Verify final count
  const finalCount = await checkExistingListings();
  console.log(`\n📊 Total listings in database now: ${finalCount}`);
  console.log(`📈 New listings added: ${finalCount - existingCount}`);

  console.log('\n✅ Property listings import completed!');
  console.log('🌐 Your site newkenyan.com can now query these listings from Supabase!');
}

// Run the import
importAllListings().catch(console.error);
