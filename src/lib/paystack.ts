import axios from 'axios';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

interface PaystackTransactionData {
  email: string;
  amount: number; // Amount in kobo (multiply by 100)
  currency?: string;
  channels?: string[];
  metadata?: {
    [key: string]: unknown;
  };
  callback_url?: string;
}

interface PaystackResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

interface PaystackVerificationResponse {
  status: boolean;
  message: string;
  data: {
    reference: string;
    amount: number;
    status: string;
    gateway_response: string;
    channel: string;
    customer: {
      email: string;
    };
    metadata: Record<string, unknown>;
  };
}

export class PaystackService {
  private static baseURL = 'https://api.paystack.co';

  // Initialize payment transaction
  static async initializeTransaction(data: PaystackTransactionData): Promise<PaystackResponse> {
    try {
      const response = await axios.post(
        `${this.baseURL}/transaction/initialize`,
        {
          ...data,
          amount: data.amount * 100, // Convert to kobo
          currency: data.currency || 'KES',
          channels: data.channels || ['mobile_money', 'card', 'bank'], // Include mobile money for M-Pesa
        },
        {
          headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error: unknown) {
      console.error('Paystack initialization error:', error);
      const errorMessage = error instanceof Error && 'response' in error ? 
        (error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Payment initialization failed' :
        'Payment initialization failed';
      throw new Error(errorMessage);
    }
  }

  // Verify payment transaction
  static async verifyTransaction(reference: string): Promise<PaystackVerificationResponse> {
    try {
      const response = await axios.get(
        `${this.baseURL}/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          },
        }
      );

      return response.data;
    } catch (error: unknown) {
      console.error('Paystack verification error:', error);
      const errorMessage = error instanceof Error && 'response' in error ? 
        (error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Payment verification failed' :
        'Payment verification failed';
      throw new Error(errorMessage);
    }
  }

  // Generate unique reference
  static generateReference(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    return `job_post_${timestamp}_${random}`;
  }
}

// Frontend utility for payment popup
export const openPaystackPayment = (
  email: string,
  amount: number,
  onSuccess: (response: unknown) => void,
  onCancel: () => void,
  metadata?: Record<string, unknown>
) => {
  const reference = PaystackService.generateReference();
  
  // Load Paystack inline script if not already loaded
  if (!window.PaystackPop) {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.onload = () => initializePayment();
    document.head.appendChild(script);
  } else {
    initializePayment();
  }

  function initializePayment() {
    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: email,
      amount: amount * 100, // Convert to kobo
      currency: 'KES',
      ref: reference,
      channels: ['mobile_money', 'card', 'bank'],
      metadata: {
        purpose: 'job_posting',
        ...metadata,
      },
      onSuccess: (response: unknown) => {
        onSuccess({ ...response, reference });
      },
      onCancel: onCancel,
    });

    handler.openIframe();
  }
};

// Type declarations for Paystack
declare global {
  interface Window {
    PaystackPop: {
      setup: (options: Record<string, unknown>) => {
        openIframe: () => void;
      };
    };
  }
}