import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function checkLocationsTable() {
  const { data, error, count } = await supabase
    .from('locations')
    .select('*', { count: 'exact' })
    .eq('is_active', true);

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`\n📍 LOCATIONS TABLE: ${count} active locations\n`);

  if (!data || data.length === 0) {
    console.log('⚠️  No locations found in database!');
    console.log('The locations table needs to be populated with all Kenyan counties and neighborhoods.');
    return;
  }

  // Group by type
  const byType = {
    county: data.filter(l => l.type === 'county'),
    neighborhood: data.filter(l => l.type === 'neighborhood'),
    estate: data.filter(l => l.type === 'estate')
  };

  console.log(`Counties: ${byType.county.length}`);
  console.log(`Neighborhoods: ${byType.neighborhood.length}`);
  console.log(`Estates: ${byType.estate.length}\n`);

  if (byType.county.length > 0) {
    console.log('Sample Counties:');
    byType.county.slice(0, 10).forEach(l => {
      console.log(`  - ${l.name} (${l.slug})`);
    });
  }

  if (byType.neighborhood.length > 0) {
    console.log('\nSample Neighborhoods:');
    byType.neighborhood.slice(0, 10).forEach(l => {
      console.log(`  - ${l.name}, ${l.county} (${l.slug})`);
    });
  }
}

checkLocationsTable();
