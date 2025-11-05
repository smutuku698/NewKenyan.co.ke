const path = require('path');
const fs = require('fs');

// Try multiple possible env file locations
const envPaths = [
  path.join(__dirname, '../.env.local'),
  path.join(__dirname, '../.env'),
  path.join(process.cwd(), '.env.local'),
  path.join(process.cwd(), '.env')
];

let envLoaded = false;
for (const envPath of envPaths) {
  if (fs.existsSync(envPath)) {
    require('dotenv').config({ path: envPath });
    envLoaded = true;
    console.log(`✓ Loaded environment from: ${envPath}\n`);
    break;
  }
}

if (!envLoaded) {
  console.log('⚠ No .env file found, checking environment variables...\n');
}

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('\n❌ Error: Missing Supabase credentials\n');
  console.error('Please create a .env.local file in the project root with:');
  console.error('');
  console.error('NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url');
  console.error('SUPABASE_SERVICE_ROLE_KEY=your_service_role_key');
  console.error('');
  console.error('You can find these in your Supabase project settings under API.\n');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Kenya Counties
const counties = [
  'Baringo', 'Bomet', 'Bungoma', 'Busia', 'Elgeyo-Marakwet', 'Embu', 'Garissa',
  'Homa Bay', 'Isiolo', 'Kajiado', 'Kakamega', 'Kericho', 'Kiambu', 'Kilifi',
  'Kirinyaga', 'Kisii', 'Kisumu', 'Kitui', 'Kwale', 'Laikipia', 'Lamu', 'Machakos',
  'Makueni', 'Mandera', 'Marsabit', 'Meru', 'Migori', 'Mombasa', 'Muranga', 'Nairobi',
  'Nakuru', 'Nandi', 'Narok', 'Nyamira', 'Nyandarua', 'Nyeri', 'Samburu', 'Siaya',
  'Taita Taveta', 'Tana River', 'Tharaka-Nithi', 'Trans Nzoia', 'Turkana',
  'Uasin Gishu', 'Vihiga', 'Wajir', 'West Pokot'
];

// Nairobi Neighbourhoods
const nairobiNeighborhoods = [
  'Airbase', 'Baba Dogo', 'California', 'Chokaa', 'Eastleigh North', 'Eastleigh South',
  'Embakasi', 'Gatina', 'Githurai', 'Hamza', 'Harambee', 'Highridge', 'Huruma',
  'Imara Daima', 'Kahawa North', 'Kahawa West', 'Kangemi', 'Karen', 'Kariobangi North',
  'Kariobangi South', 'Karura', 'Kasarani', 'Kawangware', 'Kayole', 'Kiamaiko', 'Kibera',
  'Kileleshwa', 'Kilimani', 'Kitisuru', 'Komarock', 'Korogocho', 'Kwa Njenga', 'Kware',
  'Kwa Reuben', 'Landimawe', 'Lavington', 'Lower Savannah', 'Makadara', 'Makongeni',
  'Maringo', 'Mathare', 'Matopeni', 'Maziwa', 'Mihango', 'Mlango Kubwa', 'Mountain View',
  'Mowlem', 'Mugumo-Ini (Langata)', 'Muthaiga', 'Mutuini', 'Mwiki', 'Nairobi Central',
  'Nairobi South', 'Nairobi West', 'Ngando', 'Ngara', 'Ngei', 'Njiru', 'Pangani',
  'Parklands', 'Pumwani', 'Riruta', 'Riruta Satellite', 'Roysambu', 'Ruai', 'Sarang\'Ombe',
  'Spring Valley', 'Umoja', 'Upper Savanna', 'Utalii', 'Utawala', 'Uthiru/Ruthimitu',
  'Viwandani', 'Waithaka', 'Westlands', 'Woodley', 'Zimmerman', 'Ziwani/Kariokor'
];

// Nairobi Estates
const nairobiEstates = [
  'Akiba Estate', 'Almond Grove Estate', 'Asali Estate', 'Avenue Park', 'Balozi Estate',
  'Braeburn Garden Estate', 'Buruburu Estate', 'Cedar Court Garden Estate', 'City Park',
  'City Park Estate', 'Delta Plains Estate', 'Enzi Heights', 'Forest Road',
  'Fourways Junction Estate', 'Garden Estate', 'Gitanga Road', 'Githunguri Road',
  'Green 2 Estate', 'Green Estate', 'Harambee Estate', 'Hazina Estate', 'Jogoo Road',
  'Kenyatta University', 'Kingara Road', 'Lower Kabete Road', 'Mogotio Road', 'Mpaka Road',
  'Nairobi Chapel', 'Nairobi National Park', 'Nasra Gardens Estate', 'Nextgen Park',
  'Nyayo Stadium', 'Park Road', 'Peponi Road', 'Redhill', 'Riara Road', 'Ridgeways',
  'Riverside Pearl Residence', 'Rosslyn Academy', 'Rosslyn Riviera Mall',
  'Safari Park View Estate', 'Strathmore University', 'Thome Estate', 'University of Nairobi',
  'Westgate Shopping Mall', 'Wilson Airport'
];

// Mombasa Neighbourhoods
const mombasaNeighborhoods = [
  'Bamburi', 'Bofu', 'Changamwe', 'Ganjoni', 'Jomvu Kuu', 'Junda', 'Kadzandani',
  'Kipevu', 'Likoni', 'Magogoni', 'Majengo', 'Mikindani', 'Miritini',
  'Mji Wa Kale/Makadara', 'Mkomani', 'Mtongwe', 'Mwakirunge', 'Port Reitz', 'Shanzu',
  'Shika Adabu', 'Shimanzi', 'Timbwani', 'Tononoka', 'Tudor', 'Ziwa La Ng\'Ombe'
];

// Helper function to create slug
function createSlug(name, city = null, type = null) {
  let slug = name
    .toLowerCase()
    .replace(/'/g, '')
    .replace(/\s+/g, '-')
    .replace(/[()]/g, '')
    .replace(/\//g, '-');

  if (city) {
    slug = `${slug}-${city.toLowerCase()}`;
  }

  if (type === 'county') {
    slug = `${slug}-county`;
  } else if (type === 'estate') {
    slug = slug.replace(/-estate$/, ''); // Remove trailing -estate if exists
    slug = `${slug}-estate-${city.toLowerCase()}`;
  }

  return slug;
}

// Generate location descriptions
function generateCountyDescription(countyName) {
  return `${countyName} County is one of the 47 counties in Kenya, offering diverse property opportunities for homebuyers and investors. Explore houses and apartments for sale or rent across ${countyName} County.`;
}

function generateNeighborhoodDescription(neighborhood, city) {
  return `${neighborhood} is a vibrant neighborhood in ${city}, Kenya. Find houses and apartments for sale or rent in ${neighborhood}. Browse verified property listings with photos, prices, and direct contact information.`;
}

function generateEstateDescription(estate, city) {
  return `${estate} in ${city} offers quality housing options including houses and apartments. Explore properties for sale or rent in this well-planned estate with modern amenities and security.`;
}

// Generate meta content for SEO
function generateMetaContent(name, type, city = null, county = null) {
  return {
    seo_variations: {
      title_templates: {
        houses_sale: `Houses for Sale in ${name}${city ? ', ' + city : ''} | Buy Homes in ${name}`,
        houses_rent: `Houses for Rent in ${name}${city ? ', ' + city : ''} - Rental Homes Available`,
        apartments_sale: `Apartments for Sale in ${name}${city ? ', ' + city : ''} | Flats & Units`,
        apartments_rent: `Apartments for Rent in ${name}${city ? ', ' + city : ''} - Find Your Home`
      },
      h1_variations: [
        `{propertyType} for {transactionType} in ${name}`,
        `Find {propertyType} for {transactionType} in ${name}, Kenya`,
        `Best {propertyType} for {transactionType} in ${name}`,
        `${name} {propertyType} for {transactionType} - Verified Listings`
      ]
    },
    features: type === 'estate'
      ? ['Gated Community', 'Security', 'Parking', 'Modern Amenities']
      : type === 'neighborhood'
      ? ['Schools Nearby', 'Shopping Centers', 'Public Transport', 'Healthcare Facilities']
      : ['Diverse Properties', 'Investment Opportunities', 'Growing Market', 'Strategic Location']
  };
}

async function populateLocations() {
  console.log('Starting location data population...\n');

  try {
    // Clear existing locations (optional - comment out if you want to keep existing data)
    console.log('Clearing existing locations...');
    const { error: deleteError } = await supabase
      .from('locations')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    if (deleteError) {
      console.log('Note: Could not clear existing data:', deleteError.message);
    }

    // Step 1: Insert Counties
    console.log('Inserting counties...');
    const countyData = counties.map(county => ({
      name: county,
      slug: createSlug(county, null, 'county'),
      type: 'county',
      county: county,
      description: generateCountyDescription(county),
      meta_content: generateMetaContent(county, 'county'),
      is_active: true
    }));

    const { data: insertedCounties, error: countyError } = await supabase
      .from('locations')
      .insert(countyData)
      .select();

    if (countyError) {
      console.error('Error inserting counties:', countyError);
      throw countyError;
    }
    console.log(`✓ Inserted ${insertedCounties.length} counties\n`);

    // Get Nairobi county ID
    const nairobiCounty = insertedCounties.find(c => c.name === 'Nairobi');
    const mombasaCounty = insertedCounties.find(c => c.name === 'Mombasa');

    // Step 2: Insert Nairobi Neighborhoods
    console.log('Inserting Nairobi neighborhoods...');
    const nairobiNeighborhoodData = nairobiNeighborhoods.map(neighborhood => ({
      name: neighborhood,
      slug: createSlug(neighborhood, 'nairobi'),
      type: 'neighborhood',
      parent_id: nairobiCounty.id,
      city: 'Nairobi',
      county: 'Nairobi',
      description: generateNeighborhoodDescription(neighborhood, 'Nairobi'),
      meta_content: generateMetaContent(neighborhood, 'neighborhood', 'Nairobi', 'Nairobi'),
      is_active: true
    }));

    const { data: insertedNairobiNeighborhoods, error: nairobiNeighborhoodError } = await supabase
      .from('locations')
      .insert(nairobiNeighborhoodData)
      .select();

    if (nairobiNeighborhoodError) {
      console.error('Error inserting Nairobi neighborhoods:', nairobiNeighborhoodError);
      throw nairobiNeighborhoodError;
    }
    console.log(`✓ Inserted ${insertedNairobiNeighborhoods.length} Nairobi neighborhoods\n`);

    // Step 3: Insert Nairobi Estates
    console.log('Inserting Nairobi estates...');
    const nairobiEstateData = nairobiEstates.map(estate => ({
      name: estate,
      slug: createSlug(estate, 'nairobi', 'estate'),
      type: 'estate',
      parent_id: nairobiCounty.id,
      city: 'Nairobi',
      county: 'Nairobi',
      description: generateEstateDescription(estate, 'Nairobi'),
      meta_content: generateMetaContent(estate, 'estate', 'Nairobi', 'Nairobi'),
      is_active: true
    }));

    const { data: insertedNairobiEstates, error: nairobiEstateError } = await supabase
      .from('locations')
      .insert(nairobiEstateData)
      .select();

    if (nairobiEstateError) {
      console.error('Error inserting Nairobi estates:', nairobiEstateError);
      throw nairobiEstateError;
    }
    console.log(`✓ Inserted ${insertedNairobiEstates.length} Nairobi estates\n`);

    // Step 4: Insert Mombasa Neighborhoods
    console.log('Inserting Mombasa neighborhoods...');
    const mombasaNeighborhoodData = mombasaNeighborhoods.map(neighborhood => ({
      name: neighborhood,
      slug: createSlug(neighborhood, 'mombasa'),
      type: 'neighborhood',
      parent_id: mombasaCounty.id,
      city: 'Mombasa',
      county: 'Mombasa',
      description: generateNeighborhoodDescription(neighborhood, 'Mombasa'),
      meta_content: generateMetaContent(neighborhood, 'neighborhood', 'Mombasa', 'Mombasa'),
      is_active: true
    }));

    const { data: insertedMombasaNeighborhoods, error: mombasaNeighborhoodError } = await supabase
      .from('locations')
      .insert(mombasaNeighborhoodData)
      .select();

    if (mombasaNeighborhoodError) {
      console.error('Error inserting Mombasa neighborhoods:', mombasaNeighborhoodError);
      throw mombasaNeighborhoodError;
    }
    console.log(`✓ Inserted ${insertedMombasaNeighborhoods.length} Mombasa neighborhoods\n`);

    // Summary
    console.log('='.repeat(50));
    console.log('LOCATION DATA POPULATION COMPLETE');
    console.log('='.repeat(50));
    console.log(`Total counties: ${insertedCounties.length}`);
    console.log(`Total Nairobi neighborhoods: ${insertedNairobiNeighborhoods.length}`);
    console.log(`Total Nairobi estates: ${insertedNairobiEstates.length}`);
    console.log(`Total Mombasa neighborhoods: ${insertedMombasaNeighborhoods.length}`);
    console.log(`\nGrand Total: ${
      insertedCounties.length +
      insertedNairobiNeighborhoods.length +
      insertedNairobiEstates.length +
      insertedMombasaNeighborhoods.length
    } locations`);
    console.log('='.repeat(50));

  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

// Run the script
populateLocations();
