import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function testSignup() {
  const testEmail = `test-${Date.now()}@gmail.com`;
  const testPassword = 'Test123456!';

  console.log('Testing signup with:', testEmail);

  const { data, error } = await supabase.auth.signUp({
    email: testEmail,
    password: testPassword,
    options: {
      emailRedirectTo: 'http://localhost:3000/auth/callback',
    },
  });

  if (error) {
    console.error('Signup error:', error);
  } else {
    console.log('Signup successful!');
    console.log('User ID:', data.user?.id);
    console.log('Email:', data.user?.email);
    console.log('Email confirmed:', data.user?.email_confirmed_at);
    console.log('Session:', data.session ? 'Created' : 'Not created (email confirmation required)');

    if (!data.session) {
      console.log('\n⚠️  No session created - email confirmation is REQUIRED');
      console.log('Check your email (or spam folder) for confirmation link');
    } else {
      console.log('\n✅ Session created immediately - email confirmation is DISABLED');
    }
  }
}

testSignup();
