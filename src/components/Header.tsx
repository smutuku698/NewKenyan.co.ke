'use client'

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Menu, X, Search, MapPin, ChevronDown, Building, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPostDropdownOpen, setIsPostDropdownOpen] = useState(false);
  const currentPath = usePathname();

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Directory', path: '/directory' },
    { name: 'Jobs', path: '/jobs-in-kenya' },
    { name: 'Properties', path: '/properties' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-to-r from-green-600 to-green-800 rounded-lg flex items-center justify-center">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
              NewKenyan.com
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`transition-colors hover:text-green-600 ${
                  currentPath === item.path
                    ? 'text-green-600 font-medium'
                    : 'text-gray-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Search className="h-4 w-4" />
            </Button>
            <SignedIn>
              <Link href="/dashboard">
                <Button variant="outline" size="sm">Dashboard</Button>
              </Link>
              <div className="relative">
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => setIsPostDropdownOpen(!isPostDropdownOpen)}
                >
                  Post Listing
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
                {isPostDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    <div className="py-1">
                      <Link 
                        href="/add-listing"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsPostDropdownOpen(false)}
                      >
                        <Building className="h-4 w-4 mr-2" />
                        Business Listing
                      </Link>
                      <Link 
                        href="/properties/add"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsPostDropdownOpen(false)}
                      >
                        <Home className="h-4 w-4 mr-2" />
                        Property Listing
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <Button variant="outline">Sign In</Button>
              </SignInButton>
              <div className="relative">
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => setIsPostDropdownOpen(!isPostDropdownOpen)}
                >
                  Post Listing
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
                {isPostDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    <div className="py-1">
                      <Link 
                        href="/add-listing"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsPostDropdownOpen(false)}
                      >
                        <Building className="h-4 w-4 mr-2" />
                        Business Listing
                      </Link>
                      <Link 
                        href="/properties/add"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsPostDropdownOpen(false)}
                      >
                        <Home className="h-4 w-4 mr-2" />
                        Property Listing
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </SignedOut>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border border-gray-200 rounded-lg mt-2 shadow-lg">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`block px-3 py-2 text-base font-medium transition-colors rounded-md ${
                    currentPath === item.path
                      ? 'text-green-600 bg-green-50'
                      : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2 space-y-2">
                <Button variant="outline" className="w-full justify-center">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
                <SignedIn>
                  <Link href="/dashboard">
                    <Button variant="outline" className="w-full justify-center">
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/add-listing">
                    <Button variant="outline" className="w-full justify-start">
                      <Building className="h-4 w-4 mr-2" />
                      Post Business Listing
                    </Button>
                  </Link>
                  <Link href="/properties/add">
                    <Button variant="outline" className="w-full justify-start">
                      <Home className="h-4 w-4 mr-2" />
                      Post Property Listing
                    </Button>
                  </Link>
                  <div className="flex justify-center pt-2">
                    <UserButton />
                  </div>
                </SignedIn>
                <SignedOut>
                  <SignInButton>
                    <Button variant="outline" className="w-full justify-center">
                      Sign In
                    </Button>
                  </SignInButton>
                  <Link href="/add-listing">
                    <Button variant="outline" className="w-full justify-start">
                      <Building className="h-4 w-4 mr-2" />
                      Post Business Listing
                    </Button>
                  </Link>
                  <Link href="/properties/add">
                    <Button variant="outline" className="w-full justify-start">
                      <Home className="h-4 w-4 mr-2" />
                      Post Property Listing
                    </Button>
                  </Link>
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