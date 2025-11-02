'use client';

import { ReactNode } from 'react';

// Check if Clerk is available
const isClerkAvailable = () => {
  try {
    // Check if we're in a ClerkProvider context
    return typeof window !== 'undefined' &&
           process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
           !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes('placeholder');
  } catch {
    return false;
  }
};

export function ClerkSignedIn({ children }: { children: ReactNode }) {
  if (!isClerkAvailable()) return null;

  try {
    const { SignedIn } = require('@clerk/nextjs');
    return <SignedIn>{children}</SignedIn>;
  } catch {
    return null;
  }
}

export function ClerkSignedOut({ children }: { children: ReactNode }) {
  if (!isClerkAvailable()) return <>{children}</>;

  try {
    const { SignedOut } = require('@clerk/nextjs');
    return <SignedOut>{children}</SignedOut>;
  } catch {
    return <>{children}</>;
  }
}

export function ClerkUserButton(props: any) {
  if (!isClerkAvailable()) return null;

  try {
    const { UserButton } = require('@clerk/nextjs');
    return <UserButton {...props} />;
  } catch {
    return null;
  }
}

export function ClerkSignInButton({ children }: { children: ReactNode }) {
  if (!isClerkAvailable()) return null;

  try {
    const { SignInButton } = require('@clerk/nextjs');
    return <SignInButton>{children}</SignInButton>;
  } catch {
    return null;
  }
}
