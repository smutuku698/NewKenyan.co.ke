'use client';

import { ReactNode } from 'react';
import { useAuth } from './AuthProvider';
import Link from 'next/link';

// Replace Clerk's SignedIn component
export function SignedIn({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return null;

  return <>{children}</>;
}

// Replace Clerk's SignedOut component
export function SignedOut({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (user) return null;

  return <>{children}</>;
}

// Replace Clerk's UserButton component
export function UserButton() {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/20 transition-colors">
        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold">
          {user.email?.charAt(0).toUpperCase()}
        </div>
      </button>

      {/* Dropdown menu */}
      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border hidden group-hover:block z-50">
        <div className="p-4 border-b">
          <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
        </div>
        <div className="py-2">
          <Link
            href="/dashboard"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Dashboard
          </Link>
          <button
            onClick={signOut}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

// Replace Clerk's SignInButton component
export function SignInButton({ children }: { children?: ReactNode }) {
  return (
    <Link
      href="/sign-in"
      className="inline-block"
    >
      {children || (
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold">
          Sign In
        </button>
      )}
    </Link>
  );
}
