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
  city: string;
  address: string;
  bedrooms: number | null;
  property_type: string;
  price: number;
}

async function fixDuplicateTitles() {
  console.log('🔍 Checking for duplicate property titles...\n');

  // Fetch all properties
  const { data: properties, error } = await supabase
    .from('property_listings')
    .select('id, property_title, city, address, bedrooms, property_type, price')
    .eq('is_approved', true)
    .order('created_at', { ascending: true });

  if (error || !properties) {
    console.error('Error fetching properties:', error);
    return;
  }

  // Find duplicates
  const titleCounts = new Map<string, Property[]>();

  for (const property of properties) {
    if (!titleCounts.has(property.property_title)) {
      titleCounts.set(property.property_title, []);
    }
    titleCounts.get(property.property_title)!.push(property);
  }

  // Filter only duplicates
  const duplicates = Array.from(titleCounts.entries()).filter(([_, props]) => props.length > 1);

  console.log(`Found ${duplicates.length} duplicate titles affecting ${duplicates.reduce((sum, [_, props]) => sum + props.length, 0)} properties\n`);

  if (duplicates.length === 0) {
    console.log('✅ No duplicate titles found!');
    return;
  }

  let updated = 0;
  let failed = 0;

  for (const [title, props] of duplicates) {
    console.log(`\n📋 Duplicate: "${title}" (${props.length} properties)`);

    // Keep first one as is, rename others with unique identifiers
    for (let i = 1; i < props.length; i++) {
      const property = props[i];
      const uniquifier = property.address.split(',')[0].trim() || `Unit ${i}`;
      const newTitle = `${property.property_type} in ${uniquifier}, ${property.city}`;

      console.log(`  Renaming property ${property.id}`);
      console.log(`    Old: ${property.property_title}`);
      console.log(`    New: ${newTitle}`);

      const { error: updateError } = await supabase
        .from('property_listings')
        .update({ property_title: newTitle })
        .eq('id', property.id);

      if (updateError) {
        console.error(`    ❌ Failed:`, updateError.message);
        failed++;
      } else {
        console.log(`    ✅ Updated successfully`);
        updated++;
      }

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  console.log(`\n\n📊 UPDATE SUMMARY:`);
  console.log(`═══════════════════════════════════════`);
  console.log(`✅ Successfully updated: ${updated}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`\n✨ Duplicate titles fixed!`);
}

fixDuplicateTitles();
