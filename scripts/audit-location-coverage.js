require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const PROPERTY_TYPES = ['House', 'Apartment', 'Villa', 'Maisonette', 'Bungalow', 'Townhouse', 'Studio', 'Bedsitter'];
const TRANSACTION_TYPES = ['sale', 'rent'];
const MIN_PROPERTIES = 3;

async function auditLocationCoverage() {
  console.log('=== LOCATION COVERAGE AUDIT ===\n');

  // Get all active locations
  const { data: locations, error: locError } = await supabase
    .from('locations')
    .select('*')
    .eq('is_active', true)
    .order('county', { ascending: true })
    .order('name', { ascending: true });

  if (locError) {
    console.error('Error fetching locations:', locError);
    return;
  }

  console.log(`Total active locations: ${locations.length}\n`);

  const gaps = [];
  const summary = {
    totalLocations: locations.length,
    locationsWithGaps: 0,
    totalGaps: 0,
    byCounty: {}
  };

  for (const location of locations) {
    const countyName = location.county.replace(/ County$/i, '');
    const locationGaps = [];

    for (const propertyType of PROPERTY_TYPES) {
      for (const transactionType of TRANSACTION_TYPES) {
        // Build query based on location type
        let query = supabase
          .from('property_listings')
          .select('id', { count: 'exact' })
          .eq('is_approved', true)
          .eq('price_type', transactionType)
          .ilike('property_type', `%${propertyType}%`);

        if (location.type === 'county') {
          query = query.ilike('county', `%${countyName}%`);
        } else if (location.type === 'neighborhood') {
          query = query
            .ilike('county', `%${countyName}%`)
            .or(`city.ilike.%${location.name}%,address.ilike.%${location.name}%`);
        } else if (location.type === 'estate') {
          query = query
            .ilike('county', `%${countyName}%`)
            .ilike('address', `%${location.name}%`);
        }

        const { count } = await query;
        const propertyCount = count || 0;

        if (propertyCount < MIN_PROPERTIES) {
          const needed = MIN_PROPERTIES - propertyCount;
          locationGaps.push({
            location: location.name,
            locationSlug: location.slug,
            locationType: location.type,
            county: location.county,
            propertyType,
            transactionType,
            currentCount: propertyCount,
            needed
          });
        }
      }
    }

    if (locationGaps.length > 0) {
      gaps.push(...locationGaps);
      summary.locationsWithGaps++;
      summary.totalGaps += locationGaps.length;

      if (!summary.byCounty[location.county]) {
        summary.byCounty[location.county] = 0;
      }
      summary.byCounty[location.county] += locationGaps.length;
    }
  }

  // Print summary
  console.log('=== SUMMARY ===');
  console.log(`Locations with gaps: ${summary.locationsWithGaps} / ${summary.totalLocations}`);
  console.log(`Total property type/transaction gaps: ${summary.totalGaps}`);
  console.log(`\nGaps by county:`);
  Object.entries(summary.byCounty)
    .sort((a, b) => b[1] - a[1])
    .forEach(([county, count]) => {
      console.log(`  ${county}: ${count} gaps`);
    });

  // Calculate total properties needed
  const totalNeeded = gaps.reduce((sum, gap) => sum + gap.needed, 0);
  console.log(`\nTotal properties needed to fill gaps: ${totalNeeded}`);

  // Save detailed report
  const report = {
    summary,
    gaps: gaps.sort((a, b) => {
      if (a.county !== b.county) return a.county.localeCompare(b.county);
      if (a.location !== b.location) return a.location.localeCompare(b.location);
      return a.propertyType.localeCompare(b.propertyType);
    }),
    generatedAt: new Date().toISOString()
  };

  fs.writeFileSync(
    'scripts/location-coverage-report.json',
    JSON.stringify(report, null, 2)
  );

  console.log('\n✓ Detailed report saved to: scripts/location-coverage-report.json');

  // Print sample gaps
  console.log('\n=== SAMPLE GAPS (first 20) ===');
  gaps.slice(0, 20).forEach(gap => {
    console.log(`${gap.location} (${gap.locationType}): Need ${gap.needed} ${gap.propertyType}(s) for ${gap.transactionType} (has ${gap.currentCount})`);
  });

  return report;
}

auditLocationCoverage().catch(console.error);
