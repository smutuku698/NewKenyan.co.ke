import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Property {
  id: string;
  property_title: string;
  property_type: string;
  bedrooms: number | null;
  bathrooms: number | null;
}

function estimateBedroomsFromTitle(title: string, propertyType: string): number {
  // Try to extract from title
  const bedroomMatch = title.match(/(\d+)\s*(br|bedroom|bed)/i);
  if (bedroomMatch) {
    return parseInt(bedroomMatch[1]);
  }

  // Check for studio
  if (title.toLowerCase().includes('studio')) {
    return 0;
  }

  // Default based on property type
  const type = propertyType.toLowerCase();
  if (type.includes('studio')) return 0;
  if (type.includes('apartment')) return 2; // Default apartment
  if (type.includes('house')) return 3; // Default house
  if (type.includes('villa') || type.includes('mansion')) return 4;
  if (type.includes('townhouse')) return 3;
  if (type.includes('penthouse')) return 3;
  if (type.includes('office') || type.includes('commercial')) return 0;

  return 2; // Default fallback
}

function estimateBathrooms(bedrooms: number): number {
  if (bedrooms === 0) return 1; // Studio
  if (bedrooms === 1) return 1;
  if (bedrooms === 2) return 1;
  if (bedrooms === 3) return 2;
  if (bedrooms >= 4) return bedrooms - 1; // Large properties
  return 1;
}

async function populateBedBath() {
  console.log('🔍 Finding properties with missing bedrooms/bathrooms...\n');

  const { data: properties, error } = await supabase
    .from('property_listings')
    .select('id, property_title, property_type, bedrooms, bathrooms')
    .eq('is_approved', true);

  if (error || !properties) {
    console.error('Error:', error);
    return;
  }

  const needsUpdate = properties.filter(
    p => p.bedrooms === null || p.bathrooms === null
  );

  console.log(`Found ${needsUpdate.length} properties needing bed/bath data\n`);

  if (needsUpdate.length === 0) {
    console.log('✅ All properties have bedroom and bathroom data!');
    return;
  }

  let updated = 0;
  let failed = 0;

  for (const property of needsUpdate) {
    const bedrooms = property.bedrooms !== null
      ? property.bedrooms
      : estimateBedroomsFromTitle(property.property_title, property.property_type);

    const bathrooms = property.bathrooms !== null
      ? property.bathrooms
      : estimateBathrooms(bedrooms);

    const updates: any = {};
    if (property.bedrooms === null) updates.bedrooms = bedrooms;
    if (property.bathrooms === null) updates.bathrooms = bathrooms;

    if (Object.keys(updates).length > 0) {
      console.log(`Updating: ${property.property_title}`);
      console.log(`  Bedrooms: ${updates.bedrooms !== undefined ? updates.bedrooms : property.bedrooms}`);
      console.log(`  Bathrooms: ${updates.bathrooms !== undefined ? updates.bathrooms : property.bathrooms}`);

      const { error: updateError } = await supabase
        .from('property_listings')
        .update(updates)
        .eq('id', property.id);

      if (updateError) {
        console.error(`  ❌ Failed:`, updateError.message);
        failed++;
      } else {
        console.log(`  ✅ Updated\n`);
        updated++;
      }

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  console.log(`\n📊 UPDATE SUMMARY:`);
  console.log(`═══════════════════════════════════════`);
  console.log(`✅ Successfully updated: ${updated}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`\n✨ Bedroom and bathroom data complete!`);
}

populateBedBath();
