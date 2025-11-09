import { NextRequest, NextResponse } from 'next/server';
import { submitToIndexNow } from '@/lib/indexnow';

/**
 * API Route: /api/indexnow
 *
 * POST endpoint to submit URLs to IndexNow
 * Body: { urls: string[] }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { urls } = body;

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request. Provide an array of URLs.' },
        { status: 400 }
      );
    }

    const success = await submitToIndexNow(urls);

    if (success) {
      return NextResponse.json({
        success: true,
        message: `Successfully submitted ${urls.length} URLs to IndexNow`,
        count: urls.length,
      });
    } else {
      return NextResponse.json(
        { error: 'Failed to submit URLs to IndexNow' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('IndexNow API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint to verify IndexNow is configured
 */
export async function GET() {
  return NextResponse.json({
    service: 'IndexNow API',
    status: 'active',
    endpoint: '/api/indexnow',
    documentation: 'https://www.indexnow.org/',
  });
}
