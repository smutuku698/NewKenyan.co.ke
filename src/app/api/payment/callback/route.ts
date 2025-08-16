import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const reference = searchParams.get('reference');
  const status = searchParams.get('status');

  // Redirect to job posting page with payment status
  const redirectUrl = new URL('/jobs-in-kenya/post', request.url);
  redirectUrl.searchParams.set('payment_reference', reference || '');
  redirectUrl.searchParams.set('payment_status', status || '');

  return NextResponse.redirect(redirectUrl);
}