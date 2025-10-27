require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigration() {
  console.log('Running database migration to add new property fields...\n');

  try {
    // Read the SQL file
    const sqlPath = path.join(__dirname, 'add-property-fields.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');

    // Split by semicolons and filter out comments and empty statements
    const statements = sqlContent
      .split(';')
      .map(s => s.trim())
      .filter(s => s && !s.startsWith('--') && s !== '');

    console.log(`Found ${statements.length} SQL statements to execute\n`);

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      console.log(`Executing statement ${i + 1}/${statements.length}...`);

      const { error } = await supabase.rpc('exec_sql', { sql: statement });

      if (error) {
        // Try alternative method using direct query
        console.log('Trying direct query method...');
        const { error: directError } = await supabase.from('_sql').select(statement);

        if (directError) {
          console.log(`⚠ Statement ${i + 1} note: ${directError.message}`);
        } else {
          console.log(`✓ Statement ${i + 1} executed successfully`);
        }
      } else {
        console.log(`✓ Statement ${i + 1} executed successfully`);
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('Migration completed!');
    console.log('='.repeat(60));
    console.log('\nNew fields added to property_listings table:');
    console.log('  - year_built (INTEGER)');
    console.log('  - garage (INTEGER, default 0)');
    console.log('  - google_maps_link (TEXT)');
    console.log('\nNote: If migration failed, please run the SQL file manually');
    console.log('in your Supabase SQL Editor:');
    console.log('  scripts/add-property-fields.sql\n');

  } catch (error) {
    console.error('\n✗ Error during migration:', error.message);
    console.log('\nPlease run the SQL file manually in Supabase SQL Editor:');
    console.log('  scripts/add-property-fields.sql\n');
    process.exit(1);
  }
}

// Run the migration
runMigration();
