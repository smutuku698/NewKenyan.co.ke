import { NextRequest, NextResponse } from 'next/server';
import { PaystackService } from '@/lib/paystack';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { reference } = body;

    if (!reference) {
      return NextResponse.json(
        { error: 'Payment reference is required' },
        { status: 400 }
      );
    }

    // Verify payment with Paystack
    const verification = await PaystackService.verifyTransaction(reference);

    if (verification.status && verification.data.status === 'success') {
      return NextResponse.json({
        success: true,
        verified: true,
        data: verification.data,
      });
    } else {
      return NextResponse.json({
        success: false,
        verified: false,
        message: 'Payment verification failed',
      });
    }

  } catch (error: unknown) {
    console.error('Payment verification error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Payment verification failed';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}