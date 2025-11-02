// This file now exports Supabase Auth components instead of Clerk
// Keeping the same export names for backwards compatibility

export {
  SignedIn as ClerkSignedIn,
  SignedOut as ClerkSignedOut,
  UserButton as ClerkUserButton,
  SignInButton as ClerkSignInButton
} from './SupabaseAuthWrapper';
