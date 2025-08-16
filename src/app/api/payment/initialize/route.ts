import { NextRequest, NextResponse } from 'next/server';
import { PaystackService } from '@/lib/paystack';

const PRICING = {
  job: 100,
  property: 100,
  business: 100
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, listingData, listingType } = body;

    if (!email || !listingData || !listingType) {
      return NextResponse.json(
        { error: 'Email, listing data, and listing type are required' },
        { status: 400 }
      );
    }

    if (!PRICING[listingType as keyof typeof PRICING]) {
      return NextResponse.json(
        { error: 'Invalid listing type' },
        { status: 400 }
      );
    }

    const reference = PaystackService.generateReference();
    const amount = PRICING[listingType as keyof typeof PRICING];
    
    // Initialize payment with Paystack
    const paymentData = await PaystackService.initializeTransaction({
      email,
      amount,
      currency: 'KES',
      channels: ['mobile_money', 'card', 'bank'],
      metadata: {
        purpose: `${listingType}_posting`,
        listing_type: listingType,
        title: listingData.job_title || listingData.property_title || listingData.business_name,
        company_name: listingData.company_name,
        reference,
      },
      callback_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/payment/callback`,
    });

    return NextResponse.json({
      success: true,
      data: paymentData.data,
      reference,
    });

  } catch (error: unknown) {
    console.error('Payment initialization error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Payment initialization failed';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}