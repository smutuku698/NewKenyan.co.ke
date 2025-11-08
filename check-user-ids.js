const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = 'https://gsdctfcfkrtuxnwapjcj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzZGN0ZmNma3J0dXhud2FwamNqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTEzNDgzMCwiZXhwIjoyMDcwNzEwODMwfQ.TmCzZ3dyKOhN0V-6ezLAykzsJfAWcaVCt5Yx0gjMHLA';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkUserIds() {
  const { data, error } = await supabase
    .from('property_listings')
    .select('user_id')
    .limit(10);

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Sample user_id values:');
  const uniqueUserIds = [...new Set(data.map(d => d.user_id))];
  uniqueUserIds.forEach(id => {
    console.log(`  ${id}`);
  });

  // Pick the first one as the default
  console.log(`\nDefault user_id to use: ${uniqueUserIds[0]}`);
}

checkUserIds().catch(console.error);
