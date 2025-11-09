const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const https = require('https');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkImageUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve(res.statusCode === 200);
    }).on('error', () => {
      resolve(false);
    });
  });
}

async function auditImages() {
  console.log('Auditing property images...\n');

  const { data: properties, error } = await supabase
    .from('property_listings')
    .select('id, property_title, city, county, images')
    .eq('is_approved', true);

  if (error) {
    console.error('Error:', error);
    return;
  }

  const broken = [];
  const working = [];
  const empty = [];

  for (const property of properties) {
    if (!property.images || property.images.length === 0) {
      empty.push(property);
      continue;
    }

    const firstImage = property.images[0];
    const isWorking = await checkImageUrl(firstImage);

    if (isWorking) {
      working.push(property);
    } else {
      broken.push(property);
    }
  }

  console.log(`Total properties: ${properties.length}`);
  console.log(`Working images: ${working.length}`);
  console.log(`Broken images: ${broken.length}`);
  console.log(`Empty images: ${empty.length}\n`);

  if (broken.length > 0) {
    console.log('Properties with broken images:\n');
    broken.forEach((prop, index) => {
      console.log(`${index + 1}. ${prop.property_title}`);
      console.log(`   City: ${prop.city}`);
      console.log(`   County: ${prop.county}`);
      console.log(`   Image: ${prop.images[0]}`);
      console.log('');
    });
  }

  // Group by county
  console.log('\n\nBroken images by county:\n');
  const byCounty = {};
  broken.forEach(prop => {
    const county = prop.county || 'Unknown';
    if (!byCounty[county]) {
      byCounty[county] = [];
    }
    byCounty[county].push(prop);
  });

  Object.entries(byCounty).forEach(([county, props]) => {
    console.log(`${county}: ${props.length} properties`);
  });
}

auditImages();
