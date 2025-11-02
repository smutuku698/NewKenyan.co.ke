import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Combined middleware: Clerk authentication + hierarchical URL redirects
 */
export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect old domain content (sports, news, etc.) to jobs page with 301
  const oldContentPatterns = [
    /asian-champions-league/i,
    /football/i,
    /cricket/i,
    /rugby/i,
    /athletics/i,
    /al-hilal/i,
    /kbc/i, // old news patterns
  ];

  if (oldContentPatterns.some(pattern => pattern.test(pathname))) {
    return NextResponse.redirect(new URL('/jobs-in-kenya', request.url), 301);
  }

  // Handle hierarchical property type URLs BEFORE Clerk
  // Pattern: /nairobi/westlands/apartments-for-rent → /apartments-for-rent/westlands-nairobi
  const hierarchicalPattern = /^\/(nairobi|mombasa)\/([a-z-]+)\/(houses-for-sale|houses-for-rent|apartments-for-sale|apartments-for-rent)\/?$/i;
  const match = pathname.match(hierarchicalPattern);

  if (match) {
    const [, city, neighborhood, propertyType] = match;
    const flatUrl = `/${propertyType}/${neighborhood}-${city.toLowerCase()}`;
    return NextResponse.redirect(new URL(flatUrl, request.url), 301);
  }

  // Handle city-only + property type URLs
  // Pattern: /nairobi/apartments-for-rent → /apartments-for-rent?city=Nairobi
  const cityPropertyPattern = /^\/(nairobi|mombasa)\/(houses-for-sale|houses-for-rent|apartments-for-sale|apartments-for-rent)\/?$/i;
  const cityMatch = pathname.match(cityPropertyPattern);

  if (cityMatch) {
    const [, city, propertyType] = cityMatch;
    const capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1);
    const url = new URL(`/${propertyType}`, request.url);
    url.searchParams.set('city', capitalizedCity);
    return NextResponse.redirect(url, 301);
  }

  // Run Clerk middleware for authentication
  return clerkMiddleware()(request);
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};