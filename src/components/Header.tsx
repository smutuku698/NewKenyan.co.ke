'use client'

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Menu, X, Search, MapPin, ChevronDown, Building, Home, Briefcase, Heart, Globe, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPostDropdownOpen, setIsPostDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const currentPath = usePathname();

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'BDirectory', path: '/business-directory' },
    { name: 'Jobs', path: '/jobs-in-kenya' },
    { name: 'Properties', path: '/properties' },
    { name: 'Services', path: '#', hasDropdown: true },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-green-600 via-green-700 to-emerald-800 shadow-lg">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="h-12 w-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
              <MapPin className="h-7 w-7 text-white drop-shadow-md" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl lg:text-2xl font-heading font-bold text-white drop-shadow-md">
                NewKenyan.com
              </span>
              <span className="text-xs text-green-100 font-body font-medium tracking-wider">
                KENYA&apos;S BUSINESS HUB
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 flex-1 justify-center max-w-md">
            {navigation.map((item) => (
              item.hasDropdown ? (
                <div key={item.path} className="relative">
                  <button
                    onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                    className={`btn-text font-semibold transition-all duration-200 hover:scale-105 whitespace-nowrap flex items-center ${
                      currentPath.startsWith('/website-services') || currentPath.startsWith('/real-estate-services')
                        ? 'text-white bg-white/20 px-3 py-2 rounded-lg backdrop-blur-sm shadow-lg'
                        : 'text-green-50 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg'
                    }`}
                  >
                    {item.name}
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </button>
                  {isServicesDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-50 backdrop-blur-lg">
                      <div className="py-2">
                        <Link 
                          href="/website-services"
                          className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
                          onClick={() => setIsServicesDropdownOpen(false)}
                        >
                          <Globe className="h-5 w-5 mr-3 text-green-600" />
                          Website & SEO Services
                        </Link>
                        <Link 
                          href="/real-estate-services"
                          className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
                          onClick={() => setIsServicesDropdownOpen(false)}
                        >
                          <Home className="h-5 w-5 mr-3 text-green-600" />
                          Real Estate Services
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`btn-text font-semibold transition-all duration-200 hover:scale-105 whitespace-nowrap ${
                    currentPath === item.path
                      ? 'text-white bg-white/20 px-3 py-2 rounded-lg backdrop-blur-sm shadow-lg'
                      : 'text-green-50 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg'
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3 flex-shrink-0">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white hover:bg-white/20 hover:text-white backdrop-blur-sm transition-all duration-200"
            >
              <Search className="h-4 w-4" />
            </Button>
            <Link href="/favorites">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-white hover:bg-white/20 hover:text-white backdrop-blur-sm transition-all duration-200"
                title="My Favorite Properties"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </Link>
            <SignedIn>
              <Link href="/dashboard">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-white/30 text-white bg-transparent hover:bg-white hover:text-green-700 backdrop-blur-sm font-semibold transition-all duration-200 px-4"
                >
                  Dashboard
                </Button>
              </Link>
              <div className="relative">
                <Button 
                  size="sm"
                  className="bg-white text-green-700 hover:bg-green-50 hover:text-green-800 font-bold px-4 shadow-lg transition-all duration-200 hover:scale-105"
                  onClick={() => setIsPostDropdownOpen(!isPostDropdownOpen)}
                >
                  Post Listing
                  <ChevronDown className="h-3 w-3 ml-2" />
                </Button>
                {isPostDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-50 backdrop-blur-lg">
                    <div className="py-2">
                      <Link 
                        href="/add-listing"
                        className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
                        onClick={() => setIsPostDropdownOpen(false)}
                      >
                        <Building className="h-5 w-5 mr-3 text-green-600" />
                        Business Listing
                      </Link>
                      <Link 
                        href="/properties/add"
                        className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
                        onClick={() => setIsPostDropdownOpen(false)}
                      >
                        <Home className="h-5 w-5 mr-3 text-green-600" />
                        Property Listing
                      </Link>
                      <Link 
                        href="/jobs-in-kenya/post"
                        className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
                        onClick={() => setIsPostDropdownOpen(false)}
                      >
                        <Briefcase className="h-5 w-5 mr-3 text-green-600" />
                        Job Listing
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9 ring-2 ring-white/30 hover:ring-white/50 transition-all duration-200"
                  }
                }}
              />
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-white/60 text-white bg-white/10 hover:bg-white hover:text-green-700 backdrop-blur-sm font-semibold transition-all duration-200 shadow-lg"
                >
                  Sign In
                </Button>
              </SignInButton>
              <div className="relative">
                <Button 
                  className="bg-white text-green-700 hover:bg-green-50 hover:text-green-800 font-bold px-6 py-2 text-base shadow-lg transition-all duration-200 hover:scale-105"
                  onClick={() => setIsPostDropdownOpen(!isPostDropdownOpen)}
                >
                  Post Listing
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
                {isPostDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-50 backdrop-blur-lg">
                    <div className="py-2">
                      <Link 
                        href="/add-listing"
                        className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
                        onClick={() => setIsPostDropdownOpen(false)}
                      >
                        <Building className="h-5 w-5 mr-3 text-green-600" />
                        Business Listing
                      </Link>
                      <Link 
                        href="/properties/add"
                        className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
                        onClick={() => setIsPostDropdownOpen(false)}
                      >
                        <Home className="h-5 w-5 mr-3 text-green-600" />
                        Property Listing
                      </Link>
                      <Link 
                        href="/jobs-in-kenya/post"
                        className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
                        onClick={() => setIsPostDropdownOpen(false)}
                      >
                        <Briefcase className="h-5 w-5 mr-3 text-green-600" />
                        Job Listing
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </SignedOut>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 hover:text-white transition-all duration-200"
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
          <div className="lg:hidden">
            <div className="mx-2 mt-4 mb-2 bg-white/95 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl overflow-hidden">
              <div className="px-4 py-4 space-y-2">
                {navigation.map((item) => (
                  item.hasDropdown ? (
                    <div key={item.path} className="space-y-1">
                      <div className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 rounded-lg">
                        {item.name}
                      </div>
                      <Link
                        href="/website-services"
                        className="flex items-center px-6 py-2 text-sm font-medium text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 hover:shadow-md rounded-lg transition-all duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Globe className="h-4 w-4 mr-3 text-green-600" />
                        Website & SEO
                      </Link>
                      <Link
                        href="/real-estate-services"
                        className="flex items-center px-6 py-2 text-sm font-medium text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 hover:shadow-md rounded-lg transition-all duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Home className="h-4 w-4 mr-3 text-green-600" />
                        Real Estate Sales
                      </Link>
                    </div>
                  ) : (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`block px-4 py-3 body-large font-semibold transition-all duration-200 rounded-lg ${
                        currentPath === item.path
                          ? 'text-white bg-gradient-to-r from-green-600 to-green-700 shadow-lg'
                          : 'text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 hover:shadow-md'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
                ))}
              </div>
              
              <div className="border-t border-gray-200 px-4 py-4 space-y-3 bg-gray-50/50">
                <Button 
                  variant="outline" 
                  className="w-full justify-center font-semibold border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
                <Link href="/favorites">
                  <Button 
                    variant="outline" 
                    className="w-full justify-center font-semibold border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    My Favorites
                  </Button>
                </Link>
                
                <SignedIn>
                  <Link href="/dashboard">
                    <Button 
                      variant="outline" 
                      className="w-full justify-center font-semibold border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
                    >
                      Dashboard
                    </Button>
                  </Link>
                  
                  <div className="space-y-2">
                    <Link href="/add-listing">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start font-medium border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300"
                      >
                        <Building className="h-5 w-5 mr-3" />
                        Post Business Listing
                      </Button>
                    </Link>
                    <Link href="/properties/add">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start font-medium border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300"
                      >
                        <Home className="h-5 w-5 mr-3" />
                        Post Property Listing
                      </Button>
                    </Link>
                    <Link href="/jobs-in-kenya/post">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start font-medium border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300"
                      >
                        <Briefcase className="h-5 w-5 mr-3" />
                        Post Job Listing
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="flex justify-center pt-4">
                    <UserButton 
                      appearance={{
                        elements: {
                          avatarBox: "w-12 h-12 ring-2 ring-green-200 hover:ring-green-300 transition-all duration-200"
                        }
                      }}
                    />
                  </div>
                </SignedIn>
                
                <SignedOut>
                  <SignInButton>
                    <Button 
                      variant="outline" 
                      className="w-full justify-center font-semibold border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
                    >
                      Sign In
                    </Button>
                  </SignInButton>
                  
                  <div className="space-y-2">
                    <Link href="/add-listing">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start font-medium border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300"
                      >
                        <Building className="h-5 w-5 mr-3" />
                        Post Business Listing
                      </Button>
                    </Link>
                    <Link href="/properties/add">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start font-medium border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300"
                      >
                        <Home className="h-5 w-5 mr-3" />
                        Post Property Listing
                      </Button>
                    </Link>
                    <Link href="/jobs-in-kenya/post">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start font-medium border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300"
                      >
                        <Briefcase className="h-5 w-5 mr-3" />
                        Post Job Listing
                      </Button>
                    </Link>
                  </div>
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