'use client'

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ClerkSignInButton as SignInButton, ClerkSignedIn as SignedIn, ClerkSignedOut as SignedOut, ClerkUserButton as UserButton } from './ClerkWrapper';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const currentPath = usePathname();

  const navigation = [
    { name: 'Buy', displayName: 'Buy', path: '/properties?type=sale' },
    { name: 'Sell', displayName: 'Sell', path: '/properties/add' },
    { name: 'Rent', displayName: 'Rent', path: '/properties?type=rent' },
    { name: 'Business', displayName: 'Business', path: '/business-directory' },
    { name: 'Jobs', displayName: 'Jobs', path: '/jobs-in-kenya' },
    { name: 'Agent', displayName: 'Agent', path: '/real-estate-services' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex min-h-16 items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group flex-shrink-0">
            <Image
              src="/android-chrome-512x512.png"
              alt="NewKenyan.com Logo"
              width={40}
              height={40}
              className="rounded-lg shadow-sm"
              priority
            />
            <div className="flex flex-col">
              <span className="text-base lg:text-lg font-heading font-bold text-gray-900">
                NewKenyan.com
              </span>
              <span className="text-[9px] text-gray-600 font-body font-bold tracking-wide hidden sm:block">
                NEWKENYAN PROPERTIES
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 flex-1 justify-end">
            {navigation.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-4 py-2 text-base font-bold font-heading transition-colors duration-200 rounded-md ${
                  currentPath === item.path || currentPath.startsWith(item.path.split('?')[0])
                    ? 'text-gray-900 bg-gray-100'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
            <SignedIn>
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 font-medium"
                >
                  Dashboard
                </Button>
              </Link>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 ring-2 ring-gray-200 hover:ring-gray-300 transition-all duration-200"
                  }
                }}
              />
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-300 text-gray-900 hover:bg-gray-50 font-medium rounded-full px-5"
                >
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200">
            <div className="px-4 py-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`block px-4 py-3 text-lg font-bold font-heading rounded-md ${
                    currentPath === item.path || currentPath.startsWith(item.path.split('?')[0])
                      ? 'text-gray-900 bg-gray-100'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.displayName}
                </Link>
              ))}

              <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
                <SignedIn>
                  <Link href="/dashboard">
                    <Button
                      variant="outline"
                      className="w-full justify-center font-medium border-gray-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Button>
                  </Link>
                  <div className="flex justify-center pt-2">
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: "w-10 h-10 ring-2 ring-gray-200"
                        }
                      }}
                    />
                  </div>
                </SignedIn>

                <SignedOut>
                  <SignInButton>
                    <Button
                      variant="outline"
                      className="w-full justify-center font-medium border-gray-300 rounded-full"
                    >
                      Sign In
                    </Button>
                  </SignInButton>
                </SignedOut>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;