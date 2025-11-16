require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkTotal() {
  const { count } = await supabase
    .from('property_listings')
    .select('*', { count: 'exact', head: true });
  
  console.log('Total properties in database:', count);
  
  const { data: images } = await supabase
    .from('property_listings')
    .select('images')
    .limit(10);
  
  const allImages = new Set();
  images.forEach(p => {
    if (p.images && Array.isArray(p.images)) {
      p.images.forEach(img => allImages.add(img));
    }
  });
  
  console.log('Sample unique images found:', allImages.size);
  console.log('Sample images:', Array.from(allImages).slice(0, 5));
}

checkTotal().catch(console.error);
