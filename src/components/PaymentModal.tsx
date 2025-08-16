'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { 
  CreditCard, 
  Smartphone,
  AlertCircle,
  Loader2
} from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (reference: string) => void;
  email: string;
  listingData: Record<string, unknown>;
  listingType: 'job' | 'property' | 'business';
}

const PRICING = {
  job: { 
    amount: 100, 
    originalAmount: 2000, 
    label: 'Job Listing', 
    description: 'Get CVs delivered to your email' 
  },
  property: { 
    amount: 100, 
    originalAmount: 5000, 
    label: 'Property Listing', 
    description: 'Reach thousands of potential tenants/buyers' 
  },
  business: { 
    amount: 100, 
    originalAmount: 3000, 
    label: 'Business Listing', 
    description: 'Boost your business visibility' 
  }
};

export default function PaymentModal({ 
  isOpen, 
  onClose, 
  onPaymentSuccess, 
  email, 
  listingData,
  listingType 
}: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handlePayment = async () => {
    setIsProcessing(true);
    setError('');

    try {
      // Initialize payment
      const response = await fetch('/api/payment/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          listingData,
          listingType,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Payment initialization failed');
      }

      // Open payment in new window for M-Pesa and other methods
      const paymentWindow = window.open(
        result.data.authorization_url,
        'paystack_payment',
        'width=500,height=600,scrollbars=yes,resizable=yes'
      );

      // Poll for payment completion
      const pollPayment = setInterval(async () => {
        if (paymentWindow?.closed) {
          clearInterval(pollPayment);
          
          // Verify payment
          try {
            const verifyResponse = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                reference: result.reference,
              }),
            });

            const verifyResult = await verifyResponse.json();

            if (verifyResult.success && verifyResult.verified) {
              onPaymentSuccess(result.reference);
            } else {
              setError('Payment verification failed. Please try again.');
            }
          } catch {
            setError('Payment verification failed. Please try again.');
          }
          
          setIsProcessing(false);
        }
      }, 1000);

      // Cleanup after 5 minutes
      setTimeout(() => {
        clearInterval(pollPayment);
        if (!paymentWindow?.closed) {
          paymentWindow?.close();
        }
        setIsProcessing(false);
      }, 300000);

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Payment failed. Please try again.';
      setError(errorMessage);
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white border border-gray-300 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl font-bold text-gray-900">
            <CreditCard className="h-6 w-6 mr-3 text-green-600" />
            Payment Required
          </DialogTitle>
          <DialogDescription className="text-gray-600 text-base mt-2">
            <div className="bg-purple-100 border border-purple-300 rounded-lg p-3 mb-3">
              <div className="text-purple-800 font-semibold text-sm">🎉 8 Years Anniversary Special!</div>
              <div className="text-purple-700 text-sm mt-1">
                <span className="line-through text-gray-500">Regular Price: KES {PRICING[listingType].originalAmount.toLocaleString()}</span>
                <span className="ml-2 font-bold">Anniversary Price: KES {PRICING[listingType].amount.toLocaleString()}</span>
              </div>
            </div>
            Celebrating 8 years of connecting Kenyans with opportunities! Special anniversary pricing for your {PRICING[listingType].label.toLowerCase()}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Payment Details */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-700">{PRICING[listingType].label} Fee</span>
              <div className="text-right">
                <div className="line-through text-gray-400 text-xs">KES {PRICING[listingType].originalAmount.toLocaleString()}</div>
                <div className="font-semibold text-gray-900">KES {PRICING[listingType].amount.toLocaleString()}</div>
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-purple-700">8 Years Anniversary Discount</span>
              <span className="text-sm font-semibold text-purple-700">-KES {(PRICING[listingType].originalAmount - PRICING[listingType].amount).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-green-200">
              <span className="text-base font-medium text-gray-800">Total Amount</span>
              <span className="font-bold text-xl text-green-600">KES {PRICING[listingType].amount.toLocaleString()}</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 text-base">Choose Payment Method:</h4>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={handlePayment}
                disabled={isProcessing}
                className="flex items-center p-4 border-2 border-green-200 bg-green-50 rounded-lg hover:border-green-300 hover:bg-green-100 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Smartphone className="h-6 w-6 mr-3 text-green-600" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">M-Pesa</p>
                  <p className="text-xs text-gray-600">STK Push</p>
                </div>
              </button>
              <button 
                onClick={handlePayment}
                disabled={isProcessing}
                className="flex items-center p-4 border-2 border-blue-200 bg-blue-50 rounded-lg hover:border-blue-300 hover:bg-blue-100 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CreditCard className="h-6 w-6 mr-3 text-blue-600" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Card</p>
                  <p className="text-xs text-gray-600">Visa, Mastercard</p>
                </div>
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-5 w-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-sm font-medium text-red-700">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-2">
            <Button
              onClick={handlePayment}
              disabled={isProcessing}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 text-base shadow-lg hover:shadow-xl transition-all"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <Smartphone className="h-5 w-5 mr-2" />
                  Pay KES {PRICING[listingType].amount.toLocaleString()}
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1 border-2 border-gray-300 hover:border-gray-400 font-semibold py-3 text-base transition-all"
            >
              Cancel
            </Button>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <div className="text-sm font-medium text-blue-900">
              <p><strong>🎉 8 Years Anniversary Special - What you get:</strong></p>
              <ul className="mt-2 space-y-1">
                <li>• {PRICING[listingType].description}</li>
                <li>• Your listing stays live for 4 months</li>
                <li>• Reach thousands of potential customers</li>
                <li>• 8 years of trusted service & reliability</li>
                {listingType === 'job' && <li>• Direct CV submissions to your email</li>}
                <li className="text-purple-700 font-semibold">• You save KES {(PRICING[listingType].originalAmount - PRICING[listingType].amount).toLocaleString()} with our anniversary celebration!</li>
              </ul>
              <p className="mt-3 text-orange-700"><strong>⏰ Limited time:</strong> Anniversary pricing - celebrating 8 years of connecting Kenyans with opportunities!</p>
              <p className="mt-2"><strong>M-Pesa users:</strong> You will receive an STK push notification on your phone to complete the payment.</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}