import { Metadata } from 'next';
import MortgageCalculator from './MortgageCalculator';

export const metadata: Metadata = {
  title: "Mortgage Calculator Kenya 2025 | Best Mortgage Loan Calculator Kenya",
  description: "Use the best mortgage calculator Kenya has to offer. Calculate mortgage payments, mortgage loan rates, and total costs with our mortgage payment calculator Kenya. Current mortgage rates and equity home loan options included.",
  keywords: "mortgage calculator kenya, mortgage loan calculator kenya, mortgage payment calculator kenya, mortgage loan, mortgage rates, equity home loan, current mortgage rates, home loan calculator, property loan calculator, cbr rates, kmrc calculator, mortgage rates kenya 2025",
  openGraph: {
    title: "Mortgage Calculator Kenya 2025 | Best Mortgage Loan Calculator Kenya",
    description: "Use the best mortgage calculator Kenya has to offer. Calculate mortgage payments and current mortgage rates with our comprehensive tool.",
    url: "https://newkenyan.com/mortgage-calculator-kenya",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mortgage Calculator Kenya 2025 | Mortgage Loan Calculator Kenya",
    description: "Use the best mortgage calculator Kenya has to offer. Calculate mortgage payments and current mortgage rates.",
  },
  alternates: {
    canonical: "https://newkenyan.com/mortgage-calculator-kenya",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function MortgageCalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO Optimized Header Section */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 border-b">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Mortgage Calculator Kenya 2025 - Best Mortgage Loan Calculator Kenya
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
              Calculate Mortgage Payments with Our Mortgage Payment Calculator Kenya
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
              Use our comprehensive mortgage calculator Kenya to determine your exact monthly payments for mortgage loans. 
              Our mortgage loan calculator Kenya includes current mortgage rates, CBR rates, equity home loan options, and all fees to give you accurate calculations based on 2025 rates.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium">Mortgage Calculator</span>
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">Home Loan Calculator</span>
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium">CBR 9.5% (2025)</span>
              <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-medium">KMRC Rates</span>
              <span className="bg-red-100 text-red-800 px-4 py-2 rounded-full font-medium">Property Loan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator Component */}
      <MortgageCalculator />

      {/* Key Features Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Use Our Mortgage Calculator Kenya - Best Mortgage Loan Calculator
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-4">
            Get accurate mortgage calculations based on current mortgage rates and Kenya market regulations with our mortgage payment calculator Kenya
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-green-800 text-sm">
              💡 <strong>Pro Tip:</strong> After calculating your mortgage payments, use our 
              <a href="/net-pay-calculator" className="text-green-600 hover:text-green-700 underline font-semibold ml-1 mr-1">
                Net Pay Calculator Kenya
              </a>
              to determine if your net salary can comfortably cover the monthly payments!
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Current CBR Rates</h3>
            <p className="text-gray-600">
              Based on Central Bank of Kenya current rate of 9.5% and commercial bank mortgage rates of 12-15%
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">All Fees Included</h3>
            <p className="text-gray-600">
              Includes processing fees, stamp duty (4%), legal fees, and valuation costs for accurate calculations
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">KMRC & Bank Options</h3>
            <p className="text-gray-600">
              Compare KMRC fixed rates (8.5-9.5%) with commercial bank variable rates (5.9-7.4%)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}