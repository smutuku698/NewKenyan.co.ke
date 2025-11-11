import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
      <Header />
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

      {/* Strategic Internal Links - Property Listings */}
      <div className="max-w-6xl mx-auto px-6 py-12 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-blue-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            🏠 Calculate Mortgage for Properties Across Kenya
          </h2>
          <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
            Use our mortgage calculator to determine payments for houses and apartments for sale in Kenya.
            Compare mortgage costs across different property types and locations.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Houses for Sale */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">🏡 Houses for Sale</h3>
              <p className="text-gray-700 text-sm mb-4">
                Calculate mortgage payments for houses ranging from KES 3M to 50M+
              </p>
              <div className="space-y-2">
                <a href="/houses-for-sale/nairobi-county" className="block text-green-600 hover:text-green-800 font-medium text-sm hover:underline">
                  → Houses for Sale in Nairobi
                </a>
                <a href="/houses-for-sale/kiambu-county" className="block text-green-600 hover:text-green-800 font-medium text-sm hover:underline">
                  → Houses for Sale in Kiambu
                </a>
                <a href="/houses-for-sale/mombasa-county" className="block text-green-600 hover:text-green-800 font-medium text-sm hover:underline">
                  → Houses for Sale in Mombasa
                </a>
                <a href="/3-bedroom-houses-for-sale/nairobi-county" className="block text-green-600 hover:text-green-800 font-medium text-sm hover:underline">
                  → 3 Bedroom Houses (Popular)
                </a>
              </div>
            </div>

            {/* Apartments for Sale */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">🏢 Apartments for Sale</h3>
              <p className="text-gray-700 text-sm mb-4">
                Calculate mortgage for apartments from KES 2M to 20M in prime locations
              </p>
              <div className="space-y-2">
                <a href="/apartments-for-sale/nairobi-county" className="block text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline">
                  → Apartments for Sale Nairobi
                </a>
                <a href="/apartments-kilimani" className="block text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline">
                  → Apartments in Kilimani
                </a>
                <a href="/apartments-westlands" className="block text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline">
                  → Apartments in Westlands
                </a>
                <a href="/apartments-for-sale/kiambu-county" className="block text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline">
                  → Apartments in Ruaka/Ruiru
                </a>
              </div>
            </div>

            {/* Land for Sale */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">🌳 Land for Sale</h3>
              <p className="text-gray-700 text-sm mb-4">
                Calculate construction + land mortgage for plots across Kenya
              </p>
              <div className="space-y-2">
                <a href="/land-for-sale/nairobi-county" className="block text-purple-600 hover:text-purple-800 font-medium text-sm hover:underline">
                  → Land for Sale in Nairobi
                </a>
                <a href="/land-for-sale/kiambu-county" className="block text-purple-600 hover:text-purple-800 font-medium text-sm hover:underline">
                  → Land for Sale in Kiambu
                </a>
                <a href="/land-for-sale/machakos-county" className="block text-purple-600 hover:text-purple-800 font-medium text-sm hover:underline">
                  → Land for Sale in Machakos
                </a>
                <a href="/construction-cost-calculator-kenya" className="block text-purple-600 hover:text-purple-800 font-medium text-sm hover:underline">
                  → Calculate Construction Costs
                </a>
              </div>
            </div>
          </div>

          {/* Popular Locations */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Calculate Mortgage by Location:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <a href="/houses-for-sale/karen-nairobi" className="text-gray-700 hover:text-green-600 hover:underline">Karen (Luxury)</a>
              <a href="/houses-for-sale/runda-nairobi" className="text-gray-700 hover:text-green-600 hover:underline">Runda (Upscale)</a>
              <a href="/houses-for-sale/kitisuru-nairobi" className="text-gray-700 hover:text-green-600 hover:underline">Kitisuru</a>
              <a href="/houses-for-sale/syokimau-machakos" className="text-gray-700 hover:text-green-600 hover:underline">Syokimau</a>
              <a href="/houses-for-sale/ruaka-kiambu" className="text-gray-700 hover:text-green-600 hover:underline">Ruaka</a>
              <a href="/houses-for-sale/ruiru-kiambu" className="text-gray-700 hover:text-green-600 hover:underline">Ruiru</a>
              <a href="/houses-for-sale/athi-river-machakos" className="text-gray-700 hover:text-green-600 hover:underline">Athi River</a>
              <a href="/houses-for-sale/kilimani-nairobi" className="text-gray-700 hover:text-green-600 hover:underline">Kilimani</a>
            </div>
          </div>
        </div>
      </div>

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

      {/* MASSIVE CONTENT SECTION - Mortgage Examples by Property Type */}
      <div className="max-w-6xl mx-auto px-6 py-16 bg-white">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Mortgage Calculation Examples - Real Kenya Properties 2025
        </h2>
        <p className="text-lg text-gray-700 mb-12 text-center max-w-3xl mx-auto">
          See exact monthly mortgage payments for different property types across Kenya.
          All calculations include 20% deposit, stamp duty, legal fees, and 2025 interest rates.
        </p>

        {/* 3 Bedroom House Examples */}
        <section className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            3 Bedroom House Mortgage Calculator - Most Popular in Kenya
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h4 className="text-xl font-semibold text-green-800 mb-4">Affordable 3BR House - Syokimau/Kitengela</h4>
              <div className="bg-green-50 p-6 rounded-lg mb-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-green-200 pb-2">
                    <span className="font-medium">Property Price:</span>
                    <span className="font-bold">KES 4,500,000</span>
                  </div>
                  <div className="flex justify-between border-b border-green-200 pb-2">
                    <span>Deposit (20%):</span>
                    <span className="text-red-600">-KES 900,000</span>
                  </div>
                  <div className="flex justify-between border-b border-green-200 pb-2">
                    <span>Loan Amount:</span>
                    <span className="font-bold">KES 3,600,000</span>
                  </div>
                  <div className="flex justify-between border-b border-green-200 pb-2">
                    <span>Interest Rate:</span>
                    <span>13.5% p.a. (variable)</span>
                  </div>
                  <div className="flex justify-between border-b border-green-200 pb-2">
                    <span>Loan Term:</span>
                    <span>20 years</span>
                  </div>
                  <div className="bg-white p-3 rounded mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">Monthly Payment:</span>
                      <span className="font-bold text-2xl text-green-700">KES 44,200</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-2">
                    Total Interest: KES 6,608,000 | Total Paid: KES 10,608,000
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded p-4 text-sm">
                <p className="text-blue-800 mb-2"><strong>💰 Affordability Guide:</strong></p>
                <p className="text-blue-700">
                  To afford KES 44,200/month comfortably (30% of income), you need:
                  <br/>• <strong>Gross Salary:</strong> KES 180,000/month
                  <br/>• <strong>Net Salary:</strong> KES 132,000/month (after tax)
                </p>
                <a href="/paye-calculator" className="text-blue-600 hover:underline inline-block mt-2">
                  → Calculate Your Net Salary
                </a>
              </div>
              <a href="/3-bedroom-houses-for-sale/machakos-county" className="text-green-600 hover:underline text-sm mt-4 inline-block">
                → Browse 3BR Houses in Syokimau/Kitengela
              </a>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h4 className="text-xl font-semibold text-blue-800 mb-4">Mid-Range 3BR House - Ruaka/Ruiru</h4>
              <div className="bg-blue-50 p-6 rounded-lg mb-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-blue-200 pb-2">
                    <span className="font-medium">Property Price:</span>
                    <span className="font-bold">KES 8,000,000</span>
                  </div>
                  <div className="flex justify-between border-b border-blue-200 pb-2">
                    <span>Deposit (20%):</span>
                    <span className="text-red-600">-KES 1,600,000</span>
                  </div>
                  <div className="flex justify-between border-b border-blue-200 pb-2">
                    <span>Loan Amount:</span>
                    <span className="font-bold">KES 6,400,000</span>
                  </div>
                  <div className="flex justify-between border-b border-blue-200 pb-2">
                    <span>Interest Rate:</span>
                    <span>13% p.a.</span>
                  </div>
                  <div className="flex justify-between border-b border-blue-200 pb-2">
                    <span>Loan Term:</span>
                    <span>20 years</span>
                  </div>
                  <div className="bg-white p-3 rounded mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">Monthly Payment:</span>
                      <span className="font-bold text-2xl text-blue-700">KES 77,100</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-2">
                    Total Interest: KES 11,504,000 | Total Paid: KES 18,504,000
                  </div>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded p-4 text-sm">
                <p className="text-green-800 mb-2"><strong>💰 Affordability Guide:</strong></p>
                <p className="text-green-700">
                  To afford KES 77,100/month comfortably, you need:
                  <br/>• <strong>Gross Salary:</strong> KES 310,000/month
                  <br/>• <strong>Net Salary:</strong> KES 225,000/month
                </p>
              </div>
              <a href="/3-bedroom-houses-for-sale/kiambu-county" className="text-blue-600 hover:underline text-sm mt-4 inline-block">
                → Browse 3BR Houses in Ruaka/Ruiru
              </a>
            </div>
          </div>
        </section>

        {/* Apartment Mortgage Examples */}
        <section className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Apartment Mortgage Calculator Kenya - Nairobi Apartments
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h4 className="text-xl font-semibold text-purple-800 mb-4">2BR Apartment - Kilimani/Parklands</h4>
              <div className="bg-purple-50 p-6 rounded-lg mb-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-purple-200 pb-2">
                    <span className="font-medium">Property Price:</span>
                    <span className="font-bold">KES 6,500,000</span>
                  </div>
                  <div className="flex justify-between border-b border-purple-200 pb-2">
                    <span>Deposit (20%):</span>
                    <span className="text-red-600">-KES 1,300,000</span>
                  </div>
                  <div className="flex justify-between border-b border-purple-200 pb-2">
                    <span>Loan Amount:</span>
                    <span className="font-bold">KES 5,200,000</span>
                  </div>
                  <div className="flex justify-between border-b border-purple-200 pb-2">
                    <span>Interest Rate:</span>
                    <span>12.5% p.a.</span>
                  </div>
                  <div className="flex justify-between border-b border-purple-200 pb-2">
                    <span>Loan Term:</span>
                    <span>15 years</span>
                  </div>
                  <div className="bg-white p-3 rounded mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">Monthly Payment:</span>
                      <span className="font-bold text-2xl text-purple-700">KES 62,800</span>
                    </div>
                  </div>
                </div>
              </div>
              <a href="/apartments-kilimani" className="text-purple-600 hover:underline text-sm mt-4 inline-block">
                → Browse Apartments in Kilimani
              </a>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h4 className="text-xl font-semibold text-orange-800 mb-4">3BR Apartment - Westlands</h4>
              <div className="bg-orange-50 p-6 rounded-lg mb-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-orange-200 pb-2">
                    <span className="font-medium">Property Price:</span>
                    <span className="font-bold">KES 12,000,000</span>
                  </div>
                  <div className="flex justify-between border-b border-orange-200 pb-2">
                    <span>Deposit (20%):</span>
                    <span className="text-red-600">-KES 2,400,000</span>
                  </div>
                  <div className="flex justify-between border-b border-orange-200 pb-2">
                    <span>Loan Amount:</span>
                    <span className="font-bold">KES 9,600,000</span>
                  </div>
                  <div className="flex justify-between border-b border-orange-200 pb-2">
                    <span>Interest Rate:</span>
                    <span>12% p.a.</span>
                  </div>
                  <div className="flex justify-between border-b border-orange-200 pb-2">
                    <span>Loan Term:</span>
                    <span>20 years</span>
                  </div>
                  <div className="bg-white p-3 rounded mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">Monthly Payment:</span>
                      <span className="font-bold text-2xl text-orange-700">KES 113,400</span>
                    </div>
                  </div>
                </div>
              </div>
              <a href="/apartments-westlands" className="text-orange-600 hover:underline text-sm mt-4 inline-block">
                → Browse Apartments in Westlands
              </a>
            </div>
          </div>
        </section>

        {/* Luxury Property Examples */}
        <section className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Luxury Property Mortgage Kenya - Karen, Runda, Kitisuru
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h4 className="text-xl font-semibold text-red-800 mb-4">4BR Townhouse - Karen</h4>
              <div className="bg-red-50 p-6 rounded-lg mb-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-red-200 pb-2">
                    <span className="font-medium">Property Price:</span>
                    <span className="font-bold">KES 25,000,000</span>
                  </div>
                  <div className="flex justify-between border-b border-red-200 pb-2">
                    <span>Deposit (30%):</span>
                    <span className="text-red-600">-KES 7,500,000</span>
                  </div>
                  <div className="flex justify-between border-b border-red-200 pb-2">
                    <span>Loan Amount:</span>
                    <span className="font-bold">KES 17,500,000</span>
                  </div>
                  <div className="flex justify-between border-b border-red-200 pb-2">
                    <span>Interest Rate:</span>
                    <span>11.5% p.a. (preferential)</span>
                  </div>
                  <div className="flex justify-between border-b border-red-200 pb-2">
                    <span>Loan Term:</span>
                    <span>25 years</span>
                  </div>
                  <div className="bg-white p-3 rounded mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">Monthly Payment:</span>
                      <span className="font-bold text-2xl text-red-700">KES 191,300</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded p-4 text-sm">
                <p className="text-yellow-800"><strong>Required Income:</strong> Gross salary of KES 770,000/month (Net: ~KES 540,000)</p>
              </div>
              <a href="/houses-for-sale/karen-nairobi" className="text-red-600 hover:underline text-sm mt-4 inline-block">
                → Browse Luxury Houses in Karen
              </a>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h4 className="text-xl font-semibold text-indigo-800 mb-4">5BR Mansion - Runda</h4>
              <div className="bg-indigo-50 p-6 rounded-lg mb-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-indigo-200 pb-2">
                    <span className="font-medium">Property Price:</span>
                    <span className="font-bold">KES 50,000,000</span>
                  </div>
                  <div className="flex justify-between border-b border-indigo-200 pb-2">
                    <span>Deposit (30%):</span>
                    <span className="text-red-600">-KES 15,000,000</span>
                  </div>
                  <div className="flex justify-between border-b border-indigo-200 pb-2">
                    <span>Loan Amount:</span>
                    <span className="font-bold">KES 35,000,000</span>
                  </div>
                  <div className="flex justify-between border-b border-indigo-200 pb-2">
                    <span>Interest Rate:</span>
                    <span>11% p.a.</span>
                  </div>
                  <div className="flex justify-between border-b border-indigo-200 pb-2">
                    <span>Loan Term:</span>
                    <span>25 years</span>
                  </div>
                  <div className="bg-white p-3 rounded mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">Monthly Payment:</span>
                      <span className="font-bold text-2xl text-indigo-700">KES 370,800</span>
                    </div>
                  </div>
                </div>
              </div>
              <a href="/houses-for-sale/runda-nairobi" className="text-indigo-600 hover:underline text-sm mt-4 inline-block">
                → Browse Luxury Homes in Runda
              </a>
            </div>
          </div>
        </section>

        {/* Bank Comparison Section */}
        <section className="mb-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Kenya Mortgage Rates by Bank 2025
          </h3>
          <p className="text-gray-700 mb-6 text-center">
            Compare current mortgage rates from major banks in Kenya. Rates vary based on credit score and loan amount.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-left">Bank / Lender</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Interest Rate</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Max Loan (KES)</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Max Term</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">KCB Bank</td>
                  <td className="border border-gray-300 px-4 py-3">12.5% - 13.5%</td>
                  <td className="border border-gray-300 px-4 py-3">50M</td>
                  <td className="border border-gray-300 px-4 py-3">25 years</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">Equity Bank</td>
                  <td className="border border-gray-300 px-4 py-3">13% - 14%</td>
                  <td className="border border-gray-300 px-4 py-3">30M</td>
                  <td className="border border-gray-300 px-4 py-3">20 years</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">Co-operative Bank</td>
                  <td className="border border-gray-300 px-4 py-3">12% - 13%</td>
                  <td className="border border-gray-300 px-4 py-3">50M</td>
                  <td className="border border-gray-300 px-4 py-3">25 years</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">NCBA Bank</td>
                  <td className="border border-gray-300 px-4 py-3">12.5% - 13.5%</td>
                  <td className="border border-gray-300 px-4 py-3">40M</td>
                  <td className="border border-gray-300 px-4 py-3">25 years</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">Stanbic Bank</td>
                  <td className="border border-gray-300 px-4 py-3">11.5% - 12.5%</td>
                  <td className="border border-gray-300 px-4 py-3">100M</td>
                  <td className="border border-gray-300 px-4 py-3">25 years</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">Standard Chartered</td>
                  <td className="border border-gray-300 px-4 py-3">11% - 12%</td>
                  <td className="border border-gray-300 px-4 py-3">No limit</td>
                  <td className="border border-gray-300 px-4 py-3">25 years</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium"><strong>KMRC (Fixed Rate)</strong></td>
                  <td className="border border-gray-300 px-4 py-3"><strong>8.5% - 9.5% (Fixed)</strong></td>
                  <td className="border border-gray-300 px-4 py-3">4M - 7M</td>
                  <td className="border border-gray-300 px-4 py-3">15-20 years</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded p-4 text-sm">
            <p className="text-yellow-800"><strong>💡 Pro Tip:</strong> KMRC (Kenya Mortgage Refinance Company) offers the lowest fixed rates but has lower loan limits. Best for properties under KES 7M.</p>
          </div>
        </section>

        {/* Authoritative Sources */}
        <section className="bg-gray-100 rounded-xl p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Official Mortgage Calculator Sources
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Banks & Lenders</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="https://ke.kcbbankgroup.com/personal-banking/borrow/mortgages" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    KCB Bank Mortgage Rates
                  </a>
                </li>
                <li>
                  <a href="https://equitygroupholdings.com/ke/mortgages" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Equity Bank Home Loans
                  </a>
                </li>
                <li>
                  <a href="https://www.co-opbank.co.ke/personal-banking/loans/home-mortgages/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Co-operative Bank Mortgages
                  </a>
                </li>
                <li>
                  <a href="https://kmrc.co.ke/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    KMRC - Kenya Mortgage Refinance Company
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Government & Regulations</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="https://www.centralbank.go.ke/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Central Bank of Kenya - CBR Rates
                  </a>
                </li>
                <li>
                  <a href="https://www.landregistryindex.go.ke/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Kenya Land Registry - Stamp Duty Info
                  </a>
                </li>
                <li className="text-gray-600">Current mortgage data from NewKenyan.com property listings</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-6 text-center">
            Mortgage rates updated: January 2025 | CBR Rate: 9.5%
          </p>
        </section>
      </div>

      <Footer />
    </div>
  );
}