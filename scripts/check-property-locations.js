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

async function checkPropertyLocations() {
  console.log('Analyzing existing property listings...\n');

  try {
    // Get all properties
    const { data: properties, error: propError } = await supabase
      .from('property_listings')
      .select('id, property_title, property_type, city, county, address, price_type, is_approved')
      .limit(1000);

    if (propError) {
      console.error('Error fetching properties:', propError);
      return;
    }

    console.log(`Total properties in database: ${properties.length}\n`);

    // Analyze by county
    const countyCounts = {};
    const cityCounts = {};
    const propertyTypeCounts = {};
    const priceTypeCounts = {};

    properties.forEach(prop => {
      // County analysis
      if (prop.county) {
        countyCounts[prop.county] = (countyCounts[prop.county] || 0) + 1;
      }

      // City analysis
      if (prop.city) {
        cityCounts[prop.city] = (cityCounts[prop.city] || 0) + 1;
      }

      // Property type
      if (prop.property_type) {
        propertyTypeCounts[prop.property_type] = (propertyTypeCounts[prop.property_type] || 0) + 1;
      }

      // Price type
      if (prop.price_type) {
        priceTypeCounts[prop.price_type] = (priceTypeCounts[prop.price_type] || 0) + 1;
      }
    });

    // Get our locations
    const { data: locations } = await supabase
      .from('locations')
      .select('name, type, county, city')
      .eq('is_active', true);

    console.log('='.repeat(60));
    console.log('PROPERTY DISTRIBUTION BY COUNTY');
    console.log('='.repeat(60));
    Object.entries(countyCounts)
      .sort((a, b) => b[1] - a[1])
      .forEach(([county, count]) => {
        const hasLocation = locations.some(loc => loc.county === county);
        const status = hasLocation ? '✓' : '✗';
        console.log(`${status} ${county}: ${count} properties`);
      });

    console.log('\n' + '='.repeat(60));
    console.log('PROPERTY DISTRIBUTION BY CITY/AREA');
    console.log('='.repeat(60));
    Object.entries(cityCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .forEach(([city, count]) => {
        const hasLocation = locations.some(loc =>
          loc.name.toLowerCase() === city.toLowerCase() ||
          loc.city && loc.city.toLowerCase() === city.toLowerCase()
        );
        const status = hasLocation ? '✓' : '✗';
        console.log(`${status} ${city}: ${count} properties`);
      });

    console.log('\n' + '='.repeat(60));
    console.log('PROPERTY TYPES');
    console.log('='.repeat(60));
    Object.entries(propertyTypeCounts)
      .sort((a, b) => b[1] - a[1])
      .forEach(([type, count]) => {
        const isHouse = type.toLowerCase().includes('house');
        const isApartment = type.toLowerCase().includes('apartment');
        const status = isHouse || isApartment ? '✓' : '⚠';
        console.log(`${status} ${type}: ${count} properties`);
      });

    console.log('\n' + '='.repeat(60));
    console.log('FOR SALE vs FOR RENT');
    console.log('='.repeat(60));
    Object.entries(priceTypeCounts)
      .forEach(([type, count]) => {
        console.log(`${type}: ${count} properties`);
      });

    // Check sample matches
    console.log('\n' + '='.repeat(60));
    console.log('SAMPLE PROPERTY MATCHES FOR NEW PAGES');
    console.log('='.repeat(60));

    // Houses for sale in Nairobi
    const nairobiHousesSale = properties.filter(p =>
      p.county && p.county.toLowerCase() === 'nairobi' &&
      p.property_type && p.property_type.toLowerCase().includes('house') &&
      p.price_type === 'For Sale'
    );
    console.log(`\n📍 Houses for Sale in Nairobi County: ${nairobiHousesSale.length} properties`);
    nairobiHousesSale.slice(0, 3).forEach(p => {
      console.log(`   - ${p.property_title} (${p.city})`);
    });

    // Apartments for rent in Nairobi
    const nairobiAptsRent = properties.filter(p =>
      p.county && p.county.toLowerCase() === 'nairobi' &&
      p.property_type && p.property_type.toLowerCase().includes('apartment') &&
      p.price_type === 'For Rent'
    );
    console.log(`\n📍 Apartments for Rent in Nairobi County: ${nairobiAptsRent.length} properties`);
    nairobiAptsRent.slice(0, 3).forEach(p => {
      console.log(`   - ${p.property_title} (${p.city})`);
    });

    // Check specific neighborhoods
    const westlandsProps = properties.filter(p =>
      (p.city && p.city.toLowerCase().includes('westland')) ||
      (p.address && p.address.toLowerCase().includes('westland'))
    );
    console.log(`\n📍 Properties in Westlands: ${westlandsProps.length} properties`);

    const kilimaniProps = properties.filter(p =>
      (p.city && p.city.toLowerCase().includes('kilimani')) ||
      (p.address && p.address.toLowerCase().includes('kilimani'))
    );
    console.log(`📍 Properties in Kilimani: ${kilimaniProps.length} properties`);

    const kileleswaProps = properties.filter(p =>
      (p.city && p.city.toLowerCase().includes('kileleshwa')) ||
      (p.address && p.address.toLowerCase().includes('kileleshwa'))
    );
    console.log(`📍 Properties in Kileleshwa: ${kileleswaProps.length} properties`);

    // Approval status
    const approvedCount = properties.filter(p => p.is_approved).length;
    const pendingCount = properties.length - approvedCount;
    console.log('\n' + '='.repeat(60));
    console.log('APPROVAL STATUS');
    console.log('='.repeat(60));
    console.log(`✓ Approved: ${approvedCount} properties`);
    console.log(`⏳ Pending: ${pendingCount} properties`);
    console.log('\nNote: Only approved properties will show on public pages');

    const totalLocationPages = locations.length * 4;
    console.log('\n' + '='.repeat(60));
    console.log('SUMMARY');
    console.log('='.repeat(60));
    console.log(`✓ Total properties: ${properties.length}`);
    console.log(`✓ Properties that will appear on location pages: ${approvedCount}`);
    console.log(`✓ New location pages created: ${totalLocationPages} (${locations.length} locations × 4 property types)`);

  } catch (error) {
    console.error('Error:', error);
  }
}

checkPropertyLocations();
