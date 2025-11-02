import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Combined middleware: Supabase authentication + hierarchical URL redirects
 */
export default async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  await supabase.auth.getUser()
  const { pathname } = request.nextUrl;

  // Redirect old domain content with smart categorization for SEO juice

  // Sports content → Jobs (sports industry jobs, coaching, etc.)
  const sportsPatterns = [
    /asian-champions-league/i,
    /football/i,
    /cricket/i,
    /rugby/i,
    /athletics/i,
    /al-hilal/i,
    /kip-keino/i,
    /kipchoge/i,
    /boseman/i, // entertainment
  ];

  // Business/Corporate news → Business Directory
  const businessPatterns = [
    /ktda/i,
    /geothermal/i,
    /tea-farmers/i,
    /medical-insurance/i,
    /broadcasting-corporation/i,
  ];

  // Health/Medical content → Jobs (healthcare jobs)
  const healthPatterns = [
    /covid/i,
    /knh-workers/i,
    /hospital/i,
    /medical/i,
  ];

  // KBC/News general → Jobs
  const newsPatterns = [
    /kbc/i,
    /jubilee-party/i,
    /raila/i,
    /muguka/i,
    /mashujaa-day/i,
    /heroic-movies/i,
  ];

  // Finance/Investment content → Business Directory
  const financePatterns = [
    /cytonn/i,
    /fraud/i,
    /shareholders/i,
    /iias/i,
    /investment/i,
    /macau-casinos/i,
    /gambling-revenue/i,
  ];

  // Food/Beverage/Lifestyle → Business Directory
  const lifestylePatterns = [
    /white-cap-lager/i,
    /big-brunch/i,
    /eatout/i,
  ];

  // International/Politics → Jobs
  const politicsPatterns = [
    /cuba-doctors/i,
    /kenya-cuba/i,
    /covid-19-news/i,
    /women-covid/i,
  ];

  if (sportsPatterns.some(pattern => pattern.test(pathname))) {
    return NextResponse.redirect(new URL('/jobs-in-kenya', request.url), 301);
  }

  if (businessPatterns.some(pattern => pattern.test(pathname))) {
    return NextResponse.redirect(new URL('/business-directory', request.url), 301);
  }

  if (healthPatterns.some(pattern => pattern.test(pathname))) {
    return NextResponse.redirect(new URL('/jobs-in-kenya', request.url), 301);
  }

  if (newsPatterns.some(pattern => pattern.test(pathname))) {
    return NextResponse.redirect(new URL('/jobs-in-kenya', request.url), 301);
  }

  if (financePatterns.some(pattern => pattern.test(pathname))) {
    return NextResponse.redirect(new URL('/business-directory', request.url), 301);
  }

  if (lifestylePatterns.some(pattern => pattern.test(pathname))) {
    return NextResponse.redirect(new URL('/business-directory', request.url), 301);
  }

  if (politicsPatterns.some(pattern => pattern.test(pathname))) {
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

  // Return the response with Supabase cookies
  return response;
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};