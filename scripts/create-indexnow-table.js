/**
 * Create the indexnow_submissions table in Supabase
 * Run this once to set up tracking for IndexNow submissions
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function createTable() {
  console.log('Creating indexnow_submissions table...\n');

  const { data, error } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS indexnow_submissions (
        id BIGSERIAL PRIMARY KEY,
        url TEXT NOT NULL UNIQUE,
        first_submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        last_submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        submission_count INTEGER NOT NULL DEFAULT 1,
        success BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_indexnow_url ON indexnow_submissions(url);
      CREATE INDEX IF NOT EXISTS idx_indexnow_last_submitted ON indexnow_submissions(last_submitted_at DESC);
    `
  });

  if (error) {
    console.error('❌ Error creating table:', error.message);
    console.log('\n💡 Alternative: Run this SQL manually in Supabase SQL Editor:\n');
    console.log(`
CREATE TABLE IF NOT EXISTS indexnow_submissions (
  id BIGSERIAL PRIMARY KEY,
  url TEXT NOT NULL UNIQUE,
  first_submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  submission_count INTEGER NOT NULL DEFAULT 1,
  success BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_indexnow_url ON indexnow_submissions(url);
CREATE INDEX IF NOT EXISTS idx_indexnow_last_submitted ON indexnow_submissions(last_submitted_at DESC);
    `);
    process.exit(1);
  }

  console.log('✅ Table created successfully!');
  console.log('\n📊 You can now run: node scripts/submit-to-indexnow.js\n');
}

createTable();
