import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoanCalculator from './LoanCalculator';
import { ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: "Loan Calculator Kenya 2025 | Personal Loan Calculator | Interest Calculator Kenya",
  description: "Use our comprehensive loan calculator Kenya to calculate monthly loan payments, total interest, and amortization schedules. Best personal loan calculator Kenya with current 2025 interest rates for all banks including KCB, Equity, Co-op Bank, and family bank loan calculator options.",
  keywords: "loan calculator kenya, personal loan calculator kenya, interest calculator, loan amortization calculator, family bank loan calculator, loan payment calculator, business loan calculator kenya, car loan calculator kenya, loan interest calculator, bank loan calculator kenya 2025",
  openGraph: {
    title: "Loan Calculator Kenya 2025 | Personal Loan Calculator | Interest Calculator",
    description: "Calculate loan payments and interest with our comprehensive loan calculator Kenya. Compare rates from all major banks with 2025 interest rates.",
    url: "https://newkenyan.com/loan-calculator-kenya",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Loan Calculator Kenya 2025 | Personal Loan Calculator",
    description: "Calculate loan payments and total interest with current 2025 Kenya bank rates.",
  },
  alternates: {
    canonical: "https://newkenyan.com/loan-calculator-kenya",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LoanCalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* SEO Optimized Header Section */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-b">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Loan Calculator Kenya 2025 - Personal Loan Calculator & Interest Calculator
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
              Calculate Loan Payments, Interest & Amortization - Best Loan Calculator Kenya
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
              Use our comprehensive loan calculator Kenya to calculate monthly loan payments, total interest costs, and complete amortization schedules.
              Our personal loan calculator Kenya includes current 2025 interest rates from all major banks including KCB, Equity Bank, Co-operative Bank, and family bank loan options.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium">Loan Calculator</span>
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">Personal Loan Calculator</span>
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium">Interest Calculator</span>
              <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-medium">2025 Bank Rates</span>
              <span className="bg-red-100 text-red-800 px-4 py-2 rounded-full font-medium">Amortization Schedule</span>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator Component */}
      <LoanCalculator />

      {/* Strategic Internal Links - Financial Products Silo */}
      <div className="max-w-6xl mx-auto px-6 py-12 bg-gradient-to-br from-green-50 to-teal-50">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-green-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            💰 Financial Planning Tools - Compare Loans & Affordability
          </h2>
          <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
            Use our loan calculator together with other financial tools to make informed borrowing decisions.
            Calculate what you can afford based on your salary and compare different loan options.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Salary Calculator */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">📊 Calculate Affordability</h3>
              <p className="text-gray-700 text-sm mb-4">
                Check if you can afford the loan payment based on your net salary (30% rule).
              </p>
              <div className="space-y-2">
                <a href="/salary-calculator-kenya" className="block text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline">
                  → Net Salary Calculator Kenya
                </a>
                <a href="/net-pay-calculator" className="block text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline">
                  → Net Pay Calculator
                </a>
                <a href="/paye-calculator" className="block text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline">
                  → PAYE Calculator Kenya
                </a>
              </div>
            </div>

            {/* Mortgage Calculator */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">🏠 Home Loans</h3>
              <p className="text-gray-700 text-sm mb-4">
                Planning to buy property? Calculate mortgage payments for home purchases.
              </p>
              <div className="space-y-2">
                <a href="/mortgage-calculator-kenya" className="block text-green-600 hover:text-green-800 font-medium text-sm hover:underline">
                  → Mortgage Calculator Kenya
                </a>
                <a href="/houses-for-sale/nairobi-county" className="block text-green-600 hover:text-green-800 font-medium text-sm hover:underline">
                  → Houses for Sale in Kenya
                </a>
                <a href="/construction-cost-calculator-kenya" className="block text-green-600 hover:text-green-800 font-medium text-sm hover:underline">
                  → Construction Cost Calculator
                </a>
              </div>
            </div>

            {/* Business Resources */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">💼 Business Loans</h3>
              <p className="text-gray-700 text-sm mb-4">
                Find lenders and business resources for your entrepreneurial journey.
              </p>
              <div className="space-y-2">
                <a href="/business-directory" className="block text-purple-600 hover:text-purple-800 font-medium text-sm hover:underline">
                  → Business Directory
                </a>
                <a href="/local-jobs" className="block text-purple-600 hover:text-purple-800 font-medium text-sm hover:underline">
                  → Job Opportunities Kenya
                </a>
              </div>
            </div>
          </div>

          {/* Loan Types Quick Links */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Calculate Payments by Loan Type:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="text-gray-700">Personal Loans (14-18%)</div>
              <div className="text-gray-700">Car Loans (12-16%)</div>
              <div className="text-gray-700">Business Loans (13-20%)</div>
              <div className="text-gray-700">Asset Finance (14-17%)</div>
              <div className="text-gray-700">Emergency Loans (18-24%)</div>
              <div className="text-gray-700">Logbook Loans (15-20%)</div>
              <div className="text-gray-700">Development Loans (13-16%)</div>
              <div className="text-gray-700">Salary Advance (varies)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Use Our Loan Calculator Kenya - Most Comprehensive Loan Payment Calculator
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-4">
            Calculate exact monthly payments, total interest, and amortization schedules with current 2025 Kenya bank interest rates
          </p>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-purple-800 text-sm">
              💡 <strong>Pro Tip:</strong> After calculating your loan payment, use our
              <a href="/salary-calculator-kenya" className="text-purple-600 hover:text-purple-700 underline font-semibold ml-1 mr-1">
                Salary Calculator Kenya
              </a>
              to ensure the monthly payment is less than 30% of your net income!
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">2025 Bank Interest Rates</h3>
            <p className="text-gray-600">
              Current rates from KCB, Equity, Co-op Bank, NCBA, Stanbic, and all major Kenya banks (12-24% APR)
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Total Interest Calculation</h3>
            <p className="text-gray-600">
              See exact total interest paid over loan term, effective rate, and cost comparison for different durations
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Amortization Schedule</h3>
            <p className="text-gray-600">
              Complete month-by-month breakdown showing principal vs interest payment for entire loan period
            </p>
          </div>
        </div>

        {/* Loan Interest Insights */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Kenya Loan Interest Rates 2025 - Current Bank Rates
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Average Personal Loan Rates by Bank</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">KCB Bank Personal Loans</span>
                  <span className="font-semibold text-gray-900">14% - 16% p.a.</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Equity Bank Eazzy Loan</span>
                  <span className="font-semibold text-gray-900">15% - 18% p.a.</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Co-operative Bank Loans</span>
                  <span className="font-semibold text-gray-900">13% - 16% p.a.</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">NCBA Personal Loans</span>
                  <span className="font-semibold text-gray-900">14% - 17% p.a.</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Loan Types & Typical Rates</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Personal Loans</span>
                  <span className="font-semibold text-gray-900">14% - 18% p.a.</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Car/Asset Finance</span>
                  <span className="font-semibold text-gray-900">12% - 16% p.a.</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Business Loans (SME)</span>
                  <span className="font-semibold text-gray-900">13% - 20% p.a.</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Logbook/Emergency Loans</span>
                  <span className="font-semibold text-gray-900">18% - 24% p.a.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Authoritative References */}
        <div className="mt-16 bg-gray-100 rounded-xl p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Official Sources - Kenya Banks & Central Bank
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Major Banks</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://ke.kcbbankgroup.com/personal-banking/borrow/personal-loans"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
                  >
                    KCB Bank Personal Loans
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://equitygroupholdings.com/ke/loans"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
                  >
                    Equity Bank Loans
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.co-opbank.co.ke/personal-banking/loans/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
                  >
                    Co-operative Bank Loans
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Regulatory Information</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.centralbank.go.ke/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
                  >
                    Central Bank of Kenya - CBR Rates
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li className="text-gray-600">Current CBR Rate: 9.5% (January 2025)</li>
                <li className="text-gray-600">Interest rates updated monthly based on bank publications</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">
            All loan rates verified from official bank sources - January 2025
          </p>
        </div>
      </div>

      {/* MASSIVE CONTENT - Loan Examples by Amount */}
      <div className="max-w-6xl mx-auto px-6 py-16 bg-white">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Loan Payment Examples Kenya 2025 - Real Calculations
        </h2>
        <p className="text-lg text-gray-700 mb-12 text-center max-w-3xl mx-auto">
          See exact monthly payments and total interest for common loan amounts in Kenya.
          All calculations use current 2025 bank interest rates and reducing balance method.
        </p>

        {/* Small Personal Loans */}
        <section className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Small Personal Loans Kenya - KES 50,000 to KES 200,000
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* KES 50,000 Loan */}
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h4 className="text-xl font-semibold text-blue-800 mb-4">KES 50,000 Personal Loan</h4>
              <div className="bg-blue-50 p-6 rounded-lg mb-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-blue-200 pb-2">
                    <span className="font-medium">Loan Amount:</span>
                    <span className="font-bold">KES 50,000</span>
                  </div>
                  <div className="flex justify-between border-b border-blue-200 pb-2">
                    <span>Interest Rate:</span>
                    <span>16% p.a. (reducing balance)</span>
                  </div>
                  <div className="flex justify-between border-b border-blue-200 pb-2">
                    <span>Loan Period:</span>
                    <span>12 months</span>
                  </div>
                  <div className="bg-white p-3 rounded mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">Monthly Payment:</span>
                      <span className="font-bold text-2xl text-blue-700">KES 4,579</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-2">
                    Total Interest: KES 4,948 | Total Repayment: KES 54,948
                  </div>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded p-4 text-xs">
                <p className="text-green-800 mb-2"><strong>💡 Affordability:</strong></p>
                <p className="text-green-700">
                  To comfortably afford KES 4,579/month (30% rule), you need:
                  <br/>• <strong>Net Salary:</strong> KES 15,300/month minimum
                  <br/>• <strong>Gross Salary:</strong> ~KES 19,000/month
                </p>
                <a href="/salary-calculator-kenya" className="text-green-600 hover:underline inline-block mt-2">
                  → Check if you qualify
                </a>
              </div>
            </div>

            {/* KES 100,000 Loan */}
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h4 className="text-xl font-semibold text-green-800 mb-4">KES 100,000 Personal Loan</h4>
              <div className="bg-green-50 p-6 rounded-lg mb-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-green-200 pb-2">
                    <span className="font-medium">Loan Amount:</span>
                    <span className="font-bold">KES 100,000</span>
                  </div>
                  <div className="flex justify-between border-b border-green-200 pb-2">
                    <span>Interest Rate:</span>
                    <span>15% p.a.</span>
                  </div>
                  <div className="flex justify-between border-b border-green-200 pb-2">
                    <span>Loan Period:</span>
                    <span>24 months</span>
                  </div>
                  <div className="bg-white p-3 rounded mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">Monthly Payment:</span>
                      <span className="font-bold text-2xl text-green-700">KES 4,849</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-2">
                    Total Interest: KES 16,376 | Total Repayment: KES 116,376
                  </div>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded p-4 text-xs">
                <p className="text-yellow-800"><strong>📊 Comparison:</strong> Shorter term (12 months) = KES 9,027/month but saves KES 7,500 in interest!</p>
              </div>
            </div>
          </div>

          {/* KES 200,000 Loan */}
          <div className="mt-8 border border-gray-200 rounded-lg p-6 bg-gradient-to-r from-purple-50 to-blue-50">
            <h4 className="text-xl font-semibold text-purple-800 mb-4">KES 200,000 Personal Loan - Payment Options</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-purple-200">
                <div className="text-sm mb-2 text-purple-700 font-semibold">12 Months @ 15%</div>
                <div className="text-2xl font-bold text-purple-800 mb-2">KES 18,054</div>
                <div className="text-xs text-gray-600">Total Interest: KES 16,648</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <div className="text-sm mb-2 text-blue-700 font-semibold">24 Months @ 15%</div>
                <div className="text-2xl font-bold text-blue-800 mb-2">KES 9,698</div>
                <div className="text-xs text-gray-600">Total Interest: KES 32,752</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-green-200">
                <div className="text-sm mb-2 text-green-700 font-semibold">36 Months @ 15%</div>
                <div className="text-2xl font-bold text-green-800 mb-2">KES 6,930</div>
                <div className="text-xs text-gray-600">Total Interest: KES 49,480</div>
              </div>
            </div>
            <p className="text-sm text-gray-700 mt-4 text-center">
              💡 Shorter loan terms save significant interest but have higher monthly payments
            </p>
          </div>
        </section>

        {/* Medium Personal Loans */}
        <section className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Medium Personal Loans Kenya - KES 300,000 to KES 500,000
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* KES 300,000 Loan */}
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h4 className="text-xl font-semibold text-orange-800 mb-4">KES 300,000 Personal/Car Loan</h4>
              <div className="bg-orange-50 p-6 rounded-lg mb-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-orange-200 pb-2">
                    <span className="font-medium">Loan Amount:</span>
                    <span className="font-bold">KES 300,000</span>
                  </div>
                  <div className="flex justify-between border-b border-orange-200 pb-2">
                    <span>Interest Rate:</span>
                    <span>14% p.a. (asset finance)</span>
                  </div>
                  <div className="flex justify-between border-b border-orange-200 pb-2">
                    <span>Loan Period:</span>
                    <span>36 months</span>
                  </div>
                  <div className="bg-white p-3 rounded mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">Monthly Payment:</span>
                      <span className="font-bold text-2xl text-orange-700">KES 10,267</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-2">
                    Total Interest: KES 69,612 | Total Repayment: KES 369,612
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded p-4 text-xs">
                <p className="text-blue-800"><strong>🚗 Typical Use:</strong> Car purchase, business equipment, or home improvement projects</p>
              </div>
            </div>

            {/* KES 500,000 Loan */}
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h4 className="text-xl font-semibold text-red-800 mb-4">KES 500,000 Business/Asset Loan</h4>
              <div className="bg-red-50 p-6 rounded-lg mb-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-red-200 pb-2">
                    <span className="font-medium">Loan Amount:</span>
                    <span className="font-bold">KES 500,000</span>
                  </div>
                  <div className="flex justify-between border-b border-red-200 pb-2">
                    <span>Interest Rate:</span>
                    <span>15% p.a.</span>
                  </div>
                  <div className="flex justify-between border-b border-red-200 pb-2">
                    <span>Loan Period:</span>
                    <span>48 months (4 years)</span>
                  </div>
                  <div className="bg-white p-3 rounded mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">Monthly Payment:</span>
                      <span className="font-bold text-2xl text-red-700">KES 13,918</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-2">
                    Total Interest: KES 168,064 | Total Repayment: KES 668,064
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded p-4 text-xs">
                <p className="text-purple-800"><strong>💼 Required Income:</strong> Net salary of ~KES 46,400/month to afford comfortably (30% rule)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Large Personal/Business Loans */}
        <section className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Large Loans Kenya - KES 1M to KES 5M (Business & Development)
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* KES 1M Loan */}
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-50 to-purple-50">
              <h4 className="text-xl font-semibold text-indigo-800 mb-4">KES 1,000,000 Business Loan</h4>
              <div className="bg-white p-6 rounded-lg mb-4 border border-indigo-200">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-medium">Loan Amount:</span>
                    <span className="font-bold">KES 1,000,000</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span>Interest Rate:</span>
                    <span>16% p.a. (business loan)</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span>Loan Period:</span>
                    <span>60 months (5 years)</span>
                  </div>
                  <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-3 rounded mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">Monthly Payment:</span>
                      <span className="font-bold text-2xl text-indigo-700">KES 24,327</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-2">
                    Total Interest: KES 459,620 | Total Repayment: KES 1,459,620
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-green-50 border border-green-200 rounded p-2">
                  <div className="font-semibold text-green-800">Business Use</div>
                  <div className="text-green-700">Inventory, equipment, expansion</div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
                  <div className="font-semibold text-yellow-800">Requirements</div>
                  <div className="text-yellow-700">Business plan, collateral needed</div>
                </div>
              </div>
            </div>

            {/* KES 3M Loan */}
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-green-50 to-teal-50">
              <h4 className="text-xl font-semibold text-teal-800 mb-4">KES 3,000,000 Development Loan</h4>
              <div className="bg-white p-6 rounded-lg mb-4 border border-teal-200">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-medium">Loan Amount:</span>
                    <span className="font-bold">KES 3,000,000</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span>Interest Rate:</span>
                    <span>14% p.a. (development)</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span>Loan Period:</span>
                    <span>84 months (7 years)</span>
                  </div>
                  <div className="bg-gradient-to-r from-green-100 to-teal-100 p-3 rounded mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">Monthly Payment:</span>
                      <span className="font-bold text-2xl text-teal-700">KES 52,891</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-2">
                    Total Interest: KES 1,442,844 | Total Repayment: KES 4,442,844
                  </div>
                </div>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded p-4 text-xs">
                <p className="text-orange-800"><strong>🏗️ Common Uses:</strong> Property development, construction, major business expansion. Often combined with land/property as collateral.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Car Loan Specific Examples */}
        <section className="mb-16 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border border-blue-200">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Car Loan Calculator Kenya - Vehicle Financing Examples 2025
          </h3>
          <p className="text-gray-700 mb-8 text-center">
            Calculate monthly payments for car purchases with typical Kenya bank auto loan rates (12-16% p.a.)
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h4 className="text-lg font-semibold text-blue-800 mb-4">Budget Car - KES 800K</h4>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between"><span className="text-gray-600">Loan Amount:</span><span className="font-semibold">KES 800,000</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Deposit (20%):</span><span className="text-red-600">-KES 200,000</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Rate:</span><span>14% / 48 months</span></div>
              </div>
              <div className="bg-blue-100 p-3 rounded">
                <div className="text-xs text-blue-700 mb-1">Monthly Payment:</div>
                <div className="text-2xl font-bold text-blue-800">KES 22,269</div>
              </div>
              <p className="text-xs text-gray-600 mt-3">Total: KES 1,068,912 | Interest: KES 268,912</p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h4 className="text-lg font-semibold text-green-800 mb-4">Mid-Range Car - KES 2M</h4>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between"><span className="text-gray-600">Loan Amount:</span><span className="font-semibold">KES 1,600,000</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Deposit (20%):</span><span className="text-red-600">-KES 400,000</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Rate:</span><span>13% / 60 months</span></div>
              </div>
              <div className="bg-green-100 p-3 rounded">
                <div className="text-xs text-green-700 mb-1">Monthly Payment:</div>
                <div className="text-2xl font-bold text-green-800">KES 36,434</div>
              </div>
              <p className="text-xs text-gray-600 mt-3">Total: KES 2,186,040 | Interest: KES 586,040</p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h4 className="text-lg font-semibold text-purple-800 mb-4">Premium Car - KES 5M</h4>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between"><span className="text-gray-600">Loan Amount:</span><span className="font-semibold">KES 4,000,000</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Deposit (20%):</span><span className="text-red-600">-KES 1,000,000</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Rate:</span><span>12% / 60 months</span></div>
              </div>
              <div className="bg-purple-100 p-3 rounded">
                <div className="text-xs text-purple-700 mb-1">Monthly Payment:</div>
                <div className="text-2xl font-bold text-purple-800">KES 89,016</div>
              </div>
              <p className="text-xs text-gray-600 mt-3">Total: KES 5,340,960 | Interest: KES 1,340,960</p>
            </div>
          </div>
        </section>

        {/* Interest Rate Comparison */}
        <section className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Impact of Interest Rates - How Rate Changes Affect Your Loan
          </h3>
          <p className="text-gray-700 mb-6">
            See how different interest rates impact monthly payments and total interest for the same loan amount.
            Shopping for the best rate can save you thousands!
          </p>

          <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              KES 500,000 Loan over 36 Months - Rate Comparison
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-3 text-left">Interest Rate</th>
                    <th className="border border-gray-300 px-4 py-3 text-right">Monthly Payment</th>
                    <th className="border border-gray-300 px-4 py-3 text-right">Total Interest</th>
                    <th className="border border-gray-300 px-4 py-3 text-right">Total Repayment</th>
                    <th className="border border-gray-300 px-4 py-3 text-right">Savings vs 20%</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-green-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold">12% p.a.</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">KES 16,607</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">KES 97,852</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">KES 597,852</td>
                    <td className="border border-gray-300 px-4 py-3 text-right text-green-600 font-bold">KES 52,520</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">14% p.a.</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">KES 17,133</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">KES 116,788</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">KES 616,788</td>
                    <td className="border border-gray-300 px-4 py-3 text-right text-green-600">KES 33,584</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">16% p.a.</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">KES 17,669</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">KES 136,084</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">KES 636,084</td>
                    <td className="border border-gray-300 px-4 py-3 text-right text-green-600">KES 14,288</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">18% p.a.</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">KES 18,214</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">KES 155,704</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">KES 655,704</td>
                    <td className="border border-gray-300 px-4 py-3 text-right text-orange-600">KES 5,332</td>
                  </tr>
                  <tr className="bg-red-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold">20% p.a.</td>
                    <td className="border border-gray-300 px-4 py-3 text-right font-bold">KES 18,769</td>
                    <td className="border border-gray-300 px-4 py-3 text-right font-bold">KES 175,684</td>
                    <td className="border border-gray-300 px-4 py-3 text-right font-bold">KES 675,684</td>
                    <td className="border border-gray-300 px-4 py-3 text-right text-gray-600">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded p-4">
              <p className="text-yellow-800 text-sm">
                <strong>💡 Key Insight:</strong> Getting a 12% rate instead of 20% on a KES 500,000 loan saves you <strong>KES 52,520 in interest</strong> over 3 years!
                Always compare rates from multiple banks.
              </p>
            </div>
          </div>
        </section>

        {/* Loan Term Impact */}
        <section className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Loan Term Impact - Short vs Long Term Loans
          </h3>
          <p className="text-gray-700 mb-6">
            Understand the trade-off between monthly payment affordability and total interest cost based on loan duration.
          </p>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              KES 1,000,000 Loan at 15% - Different Loan Terms
            </h4>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-5 border border-blue-200">
                <div className="text-center mb-3">
                  <div className="text-sm text-gray-600 mb-1">12 Months</div>
                  <div className="text-2xl font-bold text-blue-800">KES 90,258</div>
                  <div className="text-xs text-gray-500">per month</div>
                </div>
                <div className="border-t border-gray-200 pt-3 text-xs">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Total Interest:</span>
                    <span className="font-semibold">KES 83,096</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Paid:</span>
                    <span className="font-semibold">KES 1,083,096</span>
                  </div>
                </div>
                <div className="mt-3 bg-green-100 rounded p-2 text-center">
                  <div className="text-xs text-green-800 font-semibold">Lowest Interest!</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-5 border border-green-200">
                <div className="text-center mb-3">
                  <div className="text-sm text-gray-600 mb-1">24 Months</div>
                  <div className="text-2xl font-bold text-green-800">KES 48,487</div>
                  <div className="text-xs text-gray-500">per month</div>
                </div>
                <div className="border-t border-gray-200 pt-3 text-xs">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Total Interest:</span>
                    <span className="font-semibold">KES 163,688</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Paid:</span>
                    <span className="font-semibold">KES 1,163,688</span>
                  </div>
                </div>
                <div className="mt-3 bg-blue-100 rounded p-2 text-center">
                  <div className="text-xs text-blue-800 font-semibold">Popular Choice</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-5 border border-purple-200">
                <div className="text-center mb-3">
                  <div className="text-sm text-gray-600 mb-1">36 Months</div>
                  <div className="text-2xl font-bold text-purple-800">KES 34,665</div>
                  <div className="text-xs text-gray-500">per month</div>
                </div>
                <div className="border-t border-gray-200 pt-3 text-xs">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Total Interest:</span>
                    <span className="font-semibold">KES 247,940</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Paid:</span>
                    <span className="font-semibold">KES 1,247,940</span>
                  </div>
                </div>
                <div className="mt-3 bg-purple-100 rounded p-2 text-center">
                  <div className="text-xs text-purple-800 font-semibold">Balanced Option</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-5 border border-orange-200">
                <div className="text-center mb-3">
                  <div className="text-sm text-gray-600 mb-1">60 Months</div>
                  <div className="text-2xl font-bold text-orange-800">KES 23,789</div>
                  <div className="text-xs text-gray-500">per month</div>
                </div>
                <div className="border-t border-gray-200 pt-3 text-xs">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Total Interest:</span>
                    <span className="font-semibold text-red-600">KES 427,340</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Paid:</span>
                    <span className="font-semibold">KES 1,427,340</span>
                  </div>
                </div>
                <div className="mt-3 bg-orange-100 rounded p-2 text-center">
                  <div className="text-xs text-orange-800 font-semibold">Most Affordable</div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-white border border-gray-300 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-3">📊 Analysis - Choosing Your Loan Term:</h5>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium text-green-800 mb-2">✅ Choose Shorter Term (12-24 months) if:</div>
                  <ul className="text-gray-700 space-y-1 text-xs">
                    <li>• You have high monthly income and can afford larger payments</li>
                    <li>• You want to minimize total interest paid</li>
                    <li>• You want to be debt-free quickly</li>
                    <li>• The loan is for a depreciating asset (like a car)</li>
                  </ul>
                </div>
                <div>
                  <div className="font-medium text-orange-800 mb-2">⚖️ Choose Longer Term (36-60 months) if:</div>
                  <ul className="text-gray-700 space-y-1 text-xs">
                    <li>• You need lower monthly payments for cash flow</li>
                    <li>• You have other financial priorities/debts</li>
                    <li>• You're investing loan savings elsewhere (business)</li>
                    <li>• You want payment flexibility and emergency buffer</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bank Loan Products Comparison */}
        <section className="mb-16 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-8 border border-green-200">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Kenya Bank Loan Products 2025 - Interest Rates Comparison
          </h3>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-left">Bank</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Personal Loan</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Salary Loan</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Asset Finance</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Max Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">KCB Bank</td>
                  <td className="border border-gray-300 px-4 py-3">14% - 16%</td>
                  <td className="border border-gray-300 px-4 py-3">13% - 15%</td>
                  <td className="border border-gray-300 px-4 py-3">12% - 14%</td>
                  <td className="border border-gray-300 px-4 py-3">KES 5M</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Equity Bank</td>
                  <td className="border border-gray-300 px-4 py-3">15% - 18%</td>
                  <td className="border border-gray-300 px-4 py-3">14% - 16%</td>
                  <td className="border border-gray-300 px-4 py-3">13% - 15%</td>
                  <td className="border border-gray-300 px-4 py-3">KES 3M</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Co-operative Bank</td>
                  <td className="border border-gray-300 px-4 py-3">13% - 16%</td>
                  <td className="border border-gray-300 px-4 py-3">12% - 14%</td>
                  <td className="border border-gray-300 px-4 py-3">11% - 14%</td>
                  <td className="border border-gray-300 px-4 py-3">KES 5M</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold">NCBA Bank</td>
                  <td className="border border-gray-300 px-4 py-3">14% - 17%</td>
                  <td className="border border-gray-300 px-4 py-3">13% - 15%</td>
                  <td className="border border-gray-300 px-4 py-3">12% - 15%</td>
                  <td className="border border-gray-300 px-4 py-3">KES 4M</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Stanbic Bank</td>
                  <td className="border border-gray-300 px-4 py-3">13% - 15%</td>
                  <td className="border border-gray-300 px-4 py-3">12% - 14%</td>
                  <td className="border border-gray-300 px-4 py-3">11% - 13%</td>
                  <td className="border border-gray-300 px-4 py-3">KES 10M</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Standard Chartered</td>
                  <td className="border border-gray-300 px-4 py-3">12% - 14%</td>
                  <td className="border border-gray-300 px-4 py-3">11% - 13%</td>
                  <td className="border border-gray-300 px-4 py-3">10% - 12%</td>
                  <td className="border border-gray-300 px-4 py-3">KES 15M+</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Family Bank</td>
                  <td className="border border-gray-300 px-4 py-3">15% - 18%</td>
                  <td className="border border-gray-300 px-4 py-3">14% - 17%</td>
                  <td className="border border-gray-300 px-4 py-3">13% - 16%</td>
                  <td className="border border-gray-300 px-4 py-3">KES 2M</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-3">💡 How to Get the Best Rate:</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>✓ Maintain good credit score (CRB listing)</li>
                <li>✓ Have a stable employment history (2+ years)</li>
                <li>✓ Bank with the lender for better rates</li>
                <li>✓ Provide collateral/security when possible</li>
                <li>✓ Negotiate - rates are not always fixed!</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-3">🏦 Salary-Based Loans (Best Rates):</h4>
              <p className="text-sm text-gray-700 mb-2">
                Check-off loans (salary deduction) typically offer:
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 2-4% lower interest rates</li>
                <li>• Higher borrowing limits (up to 12x salary)</li>
                <li>• Faster approval (1-3 days)</li>
                <li>• No collateral required</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Loan Calculator Formula */}
        <section className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            How Loan Payment Calculation Works - The Formula
          </h3>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-blue-800 mb-4">Loan Payment Formula (Reducing Balance Method)</h4>
            <div className="bg-white p-6 rounded-lg mb-4">
              <div className="text-center mb-4">
                <div className="text-xl font-mono bg-gray-100 p-4 rounded inline-block">
                  M = P × [r(1 + r)ⁿ] / [(1 + r)ⁿ - 1]
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-semibold text-gray-800 mb-2">Where:</h5>
                  <ul className="space-y-1 text-gray-700">
                    <li><strong>M</strong> = Monthly Payment</li>
                    <li><strong>P</strong> = Principal Loan Amount</li>
                    <li><strong>r</strong> = Monthly Interest Rate (Annual Rate / 12)</li>
                    <li><strong>n</strong> = Number of Months</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-800 mb-2">Example Calculation:</h5>
                  <ul className="space-y-1 text-gray-700 text-xs">
                    <li>Loan: KES 100,000</li>
                    <li>Rate: 15% p.a. (0.15/12 = 0.0125 per month)</li>
                    <li>Term: 12 months</li>
                    <li>Payment = 100,000 × [0.0125(1.0125)¹²] / [(1.0125)¹² - 1]</li>
                    <li><strong>= KES 9,025/month</strong></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded p-4">
              <h5 className="font-semibold text-green-800 mb-2">Why Reducing Balance Method?</h5>
              <p className="text-sm text-green-700">
                Kenya banks use the reducing balance method where interest is calculated on the outstanding balance each month,
                not the original loan amount. This means you pay less interest over time as your principal reduces. This is
                fairer than flat rate calculation and is the CBK recommended method.
              </p>
            </div>
          </div>
        </section>

        {/* Loan Affordability Guide */}
        <section className="mb-16 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-200">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Loan Affordability Calculator - Can You Afford This Loan?
          </h3>
          <p className="text-gray-700 mb-8 text-center max-w-3xl mx-auto">
            Financial experts recommend that your total monthly debt payments (including this loan) should not exceed 40% of your gross income,
            and ideally stay under 30% for financial comfort.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 border border-green-200">
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">😊</div>
                <div className="font-bold text-green-800 text-lg">Safe Zone</div>
                <div className="text-2xl font-bold text-green-700 my-3">&lt; 30%</div>
                <div className="text-sm text-gray-600">of gross income</div>
              </div>
              <div className="bg-green-50 p-4 rounded">
                <h5 className="font-semibold text-green-800 text-sm mb-2">Example:</h5>
                <ul className="text-xs text-green-700 space-y-1">
                  <li>Gross Salary: KES 80,000</li>
                  <li>Max Loan Payment: KES 24,000</li>
                  <li>You can afford: ~KES 650K loan (36mo @15%)</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-yellow-200">
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">⚠️</div>
                <div className="font-bold text-yellow-800 text-lg">Caution Zone</div>
                <div className="text-2xl font-bold text-yellow-700 my-3">30-40%</div>
                <div className="text-sm text-gray-600">of gross income</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded">
                <h5 className="font-semibold text-yellow-800 text-sm mb-2">Example:</h5>
                <ul className="text-xs text-yellow-700 space-y-1">
                  <li>Gross Salary: KES 80,000</li>
                  <li>Max Loan Payment: KES 32,000</li>
                  <li>Tight budget - limited emergency fund</li>
                  <li>Consider shorter term or lower amount</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-red-200">
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">🛑</div>
                <div className="font-bold text-red-800 text-lg">Danger Zone</div>
                <div className="text-2xl font-bold text-red-700 my-3">&gt; 40%</div>
                <div className="text-sm text-gray-600">of gross income</div>
              </div>
              <div className="bg-red-50 p-4 rounded">
                <h5 className="font-semibold text-red-800 text-sm mb-2">Warning:</h5>
                <ul className="text-xs text-red-700 space-y-1">
                  <li>High risk of default</li>
                  <li>No room for emergencies</li>
                  <li>May damage credit score</li>
                  <li>Reconsider loan amount/term</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <section className="mb-16 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-8 border border-teal-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            🛠️ Complete Financial Planning Toolkit
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <a href="/salary-calculator-kenya" className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Salary Calculator Kenya</h3>
              <p className="text-gray-600 text-sm mb-3">Calculate net salary to determine loan affordability (30% rule).</p>
              <div className="text-teal-600 text-xs font-medium">→ Calculate Take-Home Pay</div>
            </a>

            <a href="/mortgage-calculator-kenya" className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">🏠</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mortgage Calculator</h3>
              <p className="text-gray-600 text-sm mb-3">Calculate home loan payments for property purchases in Kenya.</p>
              <div className="text-teal-600 text-xs font-medium">→ Calculate Mortgage</div>
            </a>

            <a href="/construction-cost-calculator-kenya" className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">🏗️</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Construction Calculator</h3>
              <p className="text-gray-600 text-sm mb-3">Estimate building costs - useful for development loans.</p>
              <div className="text-teal-600 text-xs font-medium">→ Calculate Building Costs</div>
            </a>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200 rounded-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Calculate Your Loan Payments?
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Use our comprehensive loan calculator above to get accurate monthly payment calculations,
            total interest costs, and complete amortization schedules based on current 2025 Kenya bank rates.
          </p>

          <div className="grid md:grid-cols-3 gap-4 text-sm mb-6">
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="font-semibold text-gray-900 mb-1">Accurate Calculations</h3>
              <p className="text-gray-600">Based on reducing balance method used by all Kenya banks</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-semibold text-gray-900 mb-1">Instant Results</h3>
              <p className="text-gray-600">See monthly payments and total interest immediately</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="font-semibold text-gray-900 mb-1">Compare Options</h3>
              <p className="text-gray-600">Try different rates, terms, and amounts</p>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </div>
  );
}
