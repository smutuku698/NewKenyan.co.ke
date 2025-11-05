import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function checkImages() {
  const { data, error } = await supabase
    .from('property_listings')
    .select('id, property_title, images')
    .ilike('property_title', '%luxury modern apartment in nyali%')
    .limit(5);

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Properties found:', data?.length);
  data?.forEach((property) => {
    console.log('\n===================');
    console.log('Title:', property.property_title);
    console.log('Images:', property.images);
    console.log('First image:', property.images[0]);
  });
}

checkImages();
