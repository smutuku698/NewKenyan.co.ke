const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = 'https://gsdctfcfkrtuxnwapjcj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzZGN0ZmNma3J0dXhud2FwamNqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTEzNDgzMCwiZXhwIjoyMDcwNzEwODMwfQ.TmCzZ3dyKOhN0V-6ezLAykzsJfAWcaVCt5Yx0gjMHLA';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkApprovalStatus() {
  console.log('='.repeat(80));
  console.log('CHECKING is_approved STATUS');
  console.log('='.repeat(80));
  console.log('');

  // Get all listings
  const { data: all, error: allError } = await supabase
    .from('property_listings')
    .select('is_approved, property_type, price_type');

  if (allError) {
    console.error('Error:', allError);
    return;
  }

  const total = all.length;
  const approved = all.filter(l => l.is_approved === true).length;
  const notApproved = all.filter(l => l.is_approved === false).length;
  const nullApproval = all.filter(l => l.is_approved === null).length;

  console.log(`Total listings: ${total}`);
  console.log(`Approved (is_approved = true): ${approved} (${(approved/total*100).toFixed(1)}%)`);
  console.log(`Not Approved (is_approved = false): ${notApproved} (${(notApproved/total*100).toFixed(1)}%)`);
  console.log(`NULL approval status: ${nullApproval} (${(nullApproval/total*100).toFixed(1)}%)`);

  console.log('\n');
  console.log('Breakdown by property type (approved only):');
  console.log('-'.repeat(80));

  const approvedListings = all.filter(l => l.is_approved === true);
  const typeCount = {};
  approvedListings.forEach(l => {
    const type = l.property_type || 'NULL';
    typeCount[type] = (typeCount[type] || 0) + 1;
  });

  Object.entries(typeCount)
    .sort((a, b) => b[1] - a[1])
    .forEach(([type, count]) => {
      console.log(`  ${type}: ${count}`);
    });

  console.log('\n');
  console.log('Breakdown by transaction type (approved only):');
  console.log('-'.repeat(80));

  const transactionCount = {};
  approvedListings.forEach(l => {
    const type = l.price_type || 'NULL';
    transactionCount[type] = (transactionCount[type] || 0) + 1;
  });

  Object.entries(transactionCount)
    .sort((a, b) => b[1] - a[1])
    .forEach(([type, count]) => {
      console.log(`  ${type}: ${count}`);
    });

  console.log('\n' + '='.repeat(80));

  if (approved === 0) {
    console.log('⚠️  WARNING: NO LISTINGS ARE APPROVED!');
    console.log('You need to approve listings for them to show on the website.');
    console.log('Set is_approved = true for the listings you want to display.');
  } else if (approved < total * 0.5) {
    console.log(`⚠️  WARNING: Only ${(approved/total*100).toFixed(1)}% of listings are approved.`);
    console.log('Consider approving more listings to show more properties on your site.');
  } else {
    console.log(`✓ ${approved} listings are approved and should be visible.`);
  }
  console.log('='.repeat(80));
}

checkApprovalStatus().catch(console.error);
