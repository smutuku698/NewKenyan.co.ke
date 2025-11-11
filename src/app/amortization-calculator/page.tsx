import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AmortizationCalculator from './AmortizationCalculator';
import { ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: "Amortization Calculator Kenya 2025 | Loan Amortization Schedule Calculator",
  description: "Use our amortization calculator Kenya to generate detailed loan amortization schedules showing monthly payments, principal vs interest breakdown, and remaining balance. Best loan amortization calculator Kenya with 2025 bank rates for mortgages, personal loans, and business loans.",
  keywords: "amortization calculator, loan amortization calculator, amortization schedule, mortgage amortization calculator kenya, loan repayment schedule, principal and interest calculator, loan payment schedule kenya, amortization table calculator 2025",
  openGraph: {
    title: "Amortization Calculator Kenya 2025 | Loan Amortization Schedule Calculator",
    description: "Generate detailed loan amortization schedules with our comprehensive amortization calculator Kenya. See monthly principal vs interest breakdown.",
    url: "https://newkenyan.com/amortization-calculator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amortization Calculator Kenya 2025",
    description: "Calculate loan amortization schedules with detailed monthly breakdown.",
  },
  alternates: {
    canonical: "https://newkenyan.com/amortization-calculator",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AmortizationCalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* SEO Optimized Header Section */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-b">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Amortization Calculator Kenya 2025 - Loan Amortization Schedule Calculator
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
              Generate Complete Loan Amortization Schedules - Monthly Principal & Interest Breakdown
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
              Use our comprehensive amortization calculator Kenya to generate detailed loan amortization schedules showing exact monthly payments,
              principal vs interest breakdown, and remaining loan balance for each payment. Perfect for mortgages, personal loans, car loans,
              and business loans with current 2025 Kenya bank interest rates.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <span className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full font-medium">Amortization Calculator</span>
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium">Loan Schedule</span>
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">Principal vs Interest</span>
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium">Reducing Balance</span>
              <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-medium">Payment Schedule</span>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator Component */}
      <AmortizationCalculator />

      {/* Strategic Internal Links */}
      <div className="max-w-6xl mx-auto px-6 py-12 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-blue-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            📊 Complete Loan Planning Toolkit - Calculate Every Detail
          </h2>
          <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
            Use our amortization calculator with other financial tools for complete loan planning.
            Understand total costs, affordability, and payment schedules.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Loan Calculator */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">💰 Calculate Loan Payments</h3>
              <p className="text-gray-700 text-sm mb-4">
                Calculate monthly payments and total interest before viewing the amortization schedule.
              </p>
              <div className="space-y-2">
                <a href="/loan-calculator-kenya" className="block text-purple-600 hover:text-purple-800 font-medium text-sm hover:underline">
                  → Loan Calculator Kenya
                </a>
                <a href="/mortgage-calculator-kenya" className="block text-purple-600 hover:text-purple-800 font-medium text-sm hover:underline">
                  → Mortgage Calculator Kenya
                </a>
              </div>
            </div>

            {/* Affordability Check */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">✅ Check Affordability</h3>
              <p className="text-gray-700 text-sm mb-4">
                Verify you can afford the loan payment based on your net salary (30% rule).
              </p>
              <div className="space-y-2">
                <a href="/salary-calculator-kenya" className="block text-green-600 hover:text-green-800 font-medium text-sm hover:underline">
                  → Salary Calculator Kenya
                </a>
                <a href="/net-pay-calculator" className="block text-green-600 hover:text-green-800 font-medium text-sm hover:underline">
                  → Net Pay Calculator
                </a>
              </div>
            </div>

            {/* Property Loans */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">🏠 Property & Homes</h3>
              <p className="text-gray-700 text-sm mb-4">
                Browse properties and calculate amortization for home purchases in Kenya.
              </p>
              <div className="space-y-2">
                <a href="/houses-for-sale/nairobi-county" className="block text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline">
                  → Houses for Sale Kenya
                </a>
                <a href="/construction-cost-calculator-kenya" className="block text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline">
                  → Construction Calculator
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Use Our Amortization Calculator - Most Detailed Loan Schedule Generator
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-4">
            Generate complete loan amortization schedules with month-by-month breakdown of principal, interest, and remaining balance
          </p>
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-indigo-800 text-sm">
              💡 <strong>Pro Tip:</strong> Use the amortization schedule to plan extra payments and see how much interest you can save!
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Complete Payment Schedule</h3>
            <p className="text-gray-600">
              Month-by-month breakdown showing payment number, principal portion, interest portion, and remaining balance
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Principal vs Interest Analysis</h3>
            <p className="text-gray-600">
              Visual breakdown showing how much goes to principal vs interest each month - see the equity buildup
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Extra Payment Scenarios</h3>
            <p className="text-gray-600">
              Calculate impact of extra payments - see how much interest you save and how many months you reduce
            </p>
          </div>
        </div>

        {/* Authoritative References */}
        <div className="mt-16 bg-gray-100 rounded-xl p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Official Sources - Kenya Banking Standards
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Regulatory Bodies</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.centralbank.go.ke/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
                  >
                    Central Bank of Kenya - Loan Regulations
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li className="text-gray-600">All Kenya banks use reducing balance amortization method</li>
                <li className="text-gray-600">CBR Rate: 9.5% (January 2025)</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Calculation Method</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Reducing Balance Method (industry standard)</li>
                <li>• Interest calculated on outstanding balance</li>
                <li>• Equal monthly payments throughout term</li>
                <li>• Principal portion increases over time</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">
            Amortization calculations based on CBK guidelines - January 2025
          </p>
        </div>
      </div>

      {/* COMPREHENSIVE CONTENT - Understanding Amortization */}
      <div className="max-w-6xl mx-auto px-6 py-16 bg-white">

        {/* What is Amortization */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            What is Loan Amortization? Complete Guide for Kenya 2025
          </h2>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              <strong>Loan amortization</strong> is the process of paying off a debt over time through regular monthly payments.
              Each payment is split between paying down the principal (the original loan amount) and paying interest on the remaining balance.
              In Kenya, all major banks use the <strong>reducing balance amortization method</strong>.
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">How Amortization Works in Kenya</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Key Principles:</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>✓ <strong>Equal Monthly Payments:</strong> You pay the same amount each month</li>
                    <li>✓ <strong>Reducing Interest:</strong> Interest calculated on remaining balance</li>
                    <li>✓ <strong>Increasing Principal:</strong> More principal paid each month</li>
                    <li>✓ <strong>Building Equity:</strong> Your ownership increases over time</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Real Example:</h4>
                  <div className="bg-white p-4 rounded border border-blue-200 text-sm">
                    <p className="text-gray-700 mb-2"><strong>KES 1M Loan @ 15% for 24 months</strong></p>
                    <ul className="space-y-1 text-xs text-gray-600">
                      <li>Month 1: KES 36,200 interest + KES 12,287 principal</li>
                      <li>Month 12: KES 19,900 interest + KES 28,587 principal</li>
                      <li>Month 24: KES 600 interest + KES 47,887 principal</li>
                    </ul>
                    <p className="text-xs text-blue-700 mt-2 font-semibold">Notice: Interest decreases, principal increases!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Amortization Schedule Examples */}
        <section className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Sample Amortization Schedules - Real Kenya Loan Examples
          </h3>

          {/* Personal Loan Example */}
          <div className="mb-12 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 border border-green-200">
            <h4 className="text-xl font-semibold text-green-800 mb-4">
              Personal Loan: KES 500,000 @ 16% for 36 Months
            </h4>
            <div className="bg-white rounded-lg p-6 mb-4">
              <div className="grid md:grid-cols-3 gap-4 mb-6 text-center">
                <div className="bg-green-50 p-4 rounded">
                  <div className="text-sm text-green-700 mb-1">Monthly Payment</div>
                  <div className="text-2xl font-bold text-green-800">KES 17,669</div>
                </div>
                <div className="bg-blue-50 p-4 rounded">
                  <div className="text-sm text-blue-700 mb-1">Total Interest</div>
                  <div className="text-2xl font-bold text-blue-800">KES 136,084</div>
                </div>
                <div className="bg-purple-50 p-4 rounded">
                  <div className="text-sm text-purple-700 mb-1">Total Paid</div>
                  <div className="text-2xl font-bold text-purple-800">KES 636,084</div>
                </div>
              </div>

              <h5 className="font-semibold text-gray-800 mb-3">First Year Payment Breakdown:</h5>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-3 py-2 text-left">Month</th>
                      <th className="border border-gray-300 px-3 py-2 text-right">Payment</th>
                      <th className="border border-gray-300 px-3 py-2 text-right">Principal</th>
                      <th className="border border-gray-300 px-3 py-2 text-right">Interest</th>
                      <th className="border border-gray-300 px-3 py-2 text-right">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2">1</td>
                      <td className="border border-gray-300 px-3 py-2 text-right">17,669</td>
                      <td className="border border-gray-300 px-3 py-2 text-right text-green-600">11,002</td>
                      <td className="border border-gray-300 px-3 py-2 text-right text-red-600">6,667</td>
                      <td className="border border-gray-300 px-3 py-2 text-right font-semibold">488,998</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2">6</td>
                      <td className="border border-gray-300 px-3 py-2 text-right">17,669</td>
                      <td className="border border-gray-300 px-3 py-2 text-right text-green-600">11,756</td>
                      <td className="border border-gray-300 px-3 py-2 text-right text-red-600">5,913</td>
                      <td className="border border-gray-300 px-3 py-2 text-right font-semibold">432,156</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2">12</td>
                      <td className="border border-gray-300 px-3 py-2 text-right">17,669</td>
                      <td className="border border-gray-300 px-3 py-2 text-right text-green-600">12,679</td>
                      <td className="border border-gray-300 px-3 py-2 text-right text-red-600">4,990</td>
                      <td className="border border-gray-300 px-3 py-2 text-right font-semibold">368,234</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2">24</td>
                      <td className="border border-gray-300 px-3 py-2 text-right">17,669</td>
                      <td className="border border-gray-300 px-3 py-2 text-right text-green-600">14,688</td>
                      <td className="border border-gray-300 px-3 py-2 text-right text-red-600">2,981</td>
                      <td className="border border-gray-300 px-3 py-2 text-right font-semibold">211,092</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2">36</td>
                      <td className="border border-gray-300 px-3 py-2 text-right">17,669</td>
                      <td className="border border-gray-300 px-3 py-2 text-right text-green-600">17,435</td>
                      <td className="border border-gray-300 px-3 py-2 text-right text-red-600">234</td>
                      <td className="border border-gray-300 px-3 py-2 text-right font-semibold">0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
              <p className="text-yellow-800 text-sm">
                <strong>📊 Key Insight:</strong> In the first payment, 62% goes to interest (KES 6,667) and only 38% to principal (KES 11,002).
                By the final payment, 99% goes to principal and just 1% to interest!
              </p>
            </div>
          </div>

          {/* Mortgage Example */}
          <div className="mb-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
            <h4 className="text-xl font-semibold text-blue-800 mb-4">
              Mortgage Loan: KES 5,000,000 @ 13% for 20 Years (240 months)
            </h4>
            <div className="bg-white rounded-lg p-6 mb-4">
              <div className="grid md:grid-cols-4 gap-4 mb-6 text-center text-sm">
                <div className="bg-blue-50 p-3 rounded">
                  <div className="text-xs text-blue-700 mb-1">Monthly Payment</div>
                  <div className="text-xl font-bold text-blue-800">KES 59,765</div>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <div className="text-xs text-green-700 mb-1">Total Interest</div>
                  <div className="text-xl font-bold text-green-800">KES 9,343,600</div>
                </div>
                <div className="bg-purple-50 p-3 rounded">
                  <div className="text-xs text-purple-700 mb-1">Total Paid</div>
                  <div className="text-xl font-bold text-purple-800">KES 14,343,600</div>
                </div>
                <div className="bg-orange-50 p-3 rounded">
                  <div className="text-xs text-orange-700 mb-1">Interest/Principal</div>
                  <div className="text-xl font-bold text-orange-800">187%</div>
                </div>
              </div>

              <h5 className="font-semibold text-gray-800 mb-3">Key Milestones in 20-Year Mortgage:</h5>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded text-sm">
                  <div className="font-semibold text-blue-800 mb-2">Year 1 (Month 12)</div>
                  <ul className="space-y-1 text-blue-700 text-xs">
                    <li>• Total Paid: KES 717,180</li>
                    <li>• Principal Paid: KES 75,234</li>
                    <li>• Interest Paid: KES 641,946</li>
                    <li>• Balance: KES 4,924,766</li>
                    <li>• Equity: <strong>1.5%</strong></li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded text-sm">
                  <div className="font-semibold text-green-800 mb-2">Year 5 (Month 60)</div>
                  <ul className="space-y-1 text-green-700 text-xs">
                    <li>• Total Paid: KES 3,585,900</li>
                    <li>• Principal Paid: KES 461,823</li>
                    <li>• Interest Paid: KES 3,124,077</li>
                    <li>• Balance: KES 4,538,177</li>
                    <li>• Equity: <strong>9.2%</strong></li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-4 rounded text-sm">
                  <div className="font-semibold text-purple-800 mb-2">Year 10 (Month 120)</div>
                  <ul className="space-y-1 text-purple-700 text-xs">
                    <li>• Total Paid: KES 7,171,800</li>
                    <li>• Principal Paid: KES 1,338,945</li>
                    <li>• Interest Paid: KES 5,832,855</li>
                    <li>• Balance: KES 3,661,055</li>
                    <li>• Equity: <strong>26.8%</strong></li>
                  </ul>
                </div>
                <div className="bg-orange-50 p-4 rounded text-sm">
                  <div className="font-semibold text-orange-800 mb-2">Year 20 (Month 240)</div>
                  <ul className="space-y-1 text-orange-700 text-xs">
                    <li>• Total Paid: KES 14,343,600</li>
                    <li>• Principal Paid: KES 5,000,000</li>
                    <li>• Interest Paid: KES 9,343,600</li>
                    <li>• Balance: KES 0</li>
                    <li>• Equity: <strong>100%</strong></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded p-4">
              <p className="text-red-800 text-sm">
                <strong>⚠️ Important:</strong> On a 20-year mortgage, you pay 187% of the loan amount in interest!
                This is why making extra payments early can save massive amounts. Even KES 10,000 extra per month can save over KES 2M in interest.
              </p>
            </div>
          </div>
        </section>

        {/* Extra Payment Impact */}
        <section className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Impact of Extra Payments - How to Save Massive Interest
          </h3>
          <p className="text-gray-700 mb-6">
            Making extra payments toward your loan principal is one of the most powerful ways to save money.
            Here's how extra payments impact a typical Kenya loan:
          </p>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              KES 1,000,000 Loan @ 15% - Extra Payment Scenarios
            </h4>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-3 text-left">Payment Strategy</th>
                    <th className="border border-gray-300 px-4 py-3 text-right">Monthly Payment</th>
                    <th className="border border-gray-300 px-4 py-3 text-right">Months to Payoff</th>
                    <th className="border border-gray-300 px-4 py-3 text-right">Total Interest</th>
                    <th className="border border-gray-300 px-4 py-3 text-right">Interest Saved</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">Base (60 months)</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">KES 23,789</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">60</td>
                    <td className="border border-gray-300 px-4 py-3 text-right text-red-600">KES 427,340</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">-</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">+KES 2,000/month</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">KES 25,789</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">47</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">KES 317,883</td>
                    <td className="border border-gray-300 px-4 py-3 text-right text-green-600 font-bold">KES 109,457</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">+KES 5,000/month</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">KES 28,789</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">40</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">KES 250,560</td>
                    <td className="border border-gray-300 px-4 py-3 text-right text-green-600 font-bold">KES 176,780</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">+KES 10,000/month</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">KES 33,789</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">33</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">KES 186,037</td>
                    <td className="border border-gray-300 px-4 py-3 text-right text-green-600 font-bold">KES 241,303</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold">One-time KES 100K (Month 1)</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">KES 23,789</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">51</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">KES 314,239</td>
                    <td className="border border-gray-300 px-4 py-3 text-right text-green-600 font-bold">KES 113,101</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white border border-green-300 rounded-lg p-4">
                <h5 className="font-semibold text-green-800 mb-3 text-sm">💚 Best Strategies for Extra Payments:</h5>
                <ul className="text-xs text-green-700 space-y-1">
                  <li>✓ Apply extra payments directly to principal</li>
                  <li>✓ Make extra payments as early as possible</li>
                  <li>✓ Even small amounts (KES 2,000) save significant interest</li>
                  <li>✓ One-time lump sum at start very effective</li>
                  <li>✓ Confirm with bank that payments go to principal</li>
                </ul>
              </div>
              <div className="bg-white border border-blue-300 rounded-lg p-4">
                <h5 className="font-semibold text-blue-800 mb-3 text-sm">📊 Why It Works:</h5>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• Reduces principal faster</li>
                  <li>• Interest calculated on lower balance</li>
                  <li>• Compounds savings over time</li>
                  <li>• Early payments have biggest impact</li>
                  <li>• Can shorten loan by years</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Amortization vs Other Methods */}
        <section className="mb-16 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-8 border border-orange-200">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Reducing Balance vs Flat Rate - Why Amortization Saves You Money
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg p-6 border border-green-200">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-green-800">Reducing Balance (Amortization)</h4>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">RECOMMENDED</span>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-medium text-gray-800 mb-1">How it works:</div>
                  <p className="text-gray-600 text-xs">Interest is calculated only on the outstanding principal balance each month. As you pay down principal, interest decreases.</p>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <div className="font-medium text-green-800 mb-2 text-xs">Example: KES 500K @ 15% for 36 months</div>
                  <ul className="text-xs text-green-700 space-y-1">
                    <li>Monthly Payment: <strong>KES 17,336</strong></li>
                    <li>Total Interest: <strong>KES 136,084</strong></li>
                    <li>Total Paid: <strong>KES 636,084</strong></li>
                  </ul>
                </div>
                <div>
                  <div className="font-medium text-green-800 mb-1 text-xs">Benefits:</div>
                  <ul className="text-xs text-green-700 space-y-1">
                    <li>✓ Lower total interest</li>
                    <li>✓ Extra payments reduce interest significantly</li>
                    <li>✓ Fair and transparent</li>
                    <li>✓ Used by all major Kenya banks</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-red-200">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-red-800">Flat Rate Method</h4>
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold">AVOID</span>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-medium text-gray-800 mb-1">How it works:</div>
                  <p className="text-gray-600 text-xs">Interest is calculated on the original loan amount for the entire period, regardless of how much you've paid down.</p>
                </div>
                <div className="bg-red-50 p-3 rounded">
                  <div className="font-medium text-red-800 mb-2 text-xs">Example: KES 500K @ 15% flat for 36 months</div>
                  <ul className="text-xs text-red-700 space-y-1">
                    <li>Monthly Payment: <strong>KES 20,139</strong></li>
                    <li>Total Interest: <strong>KES 225,000</strong></li>
                    <li>Total Paid: <strong>KES 725,000</strong></li>
                  </ul>
                </div>
                <div>
                  <div className="font-medium text-red-800 mb-1 text-xs">Disadvantages:</div>
                  <ul className="text-xs text-red-700 space-y-1">
                    <li>✗ Much higher total interest (+KES 88,916!)</li>
                    <li>✗ Extra payments don't reduce interest</li>
                    <li>✗ Effective rate much higher than stated</li>
                    <li>✗ Common with some mobile loan apps</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-orange-300 rounded-lg p-6">
            <h5 className="font-semibold text-orange-800 mb-3">💰 The Difference is Massive:</h5>
            <p className="text-sm text-gray-700 mb-3">
              On a KES 500,000 loan at "15%" for 3 years, reducing balance saves you <strong>KES 88,916 in interest</strong> compared to flat rate!
              Always ask the bank if they use reducing balance method (all major banks do).
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
              <p className="text-xs text-yellow-800">
                <strong>⚠️ Warning:</strong> Some lenders advertise low flat rates (e.g., 5% flat) which sound attractive,
                but the effective interest rate is actually double (10%+ p.a.). Always compare using reducing balance rates.
              </p>
            </div>
          </div>
        </section>

        {/* Industry-Specific Amortization */}
        <section className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Amortization Schedules by Loan Type - Kenya 2025
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Mortgage */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-blue-800 mb-4">🏠 Mortgage Amortization (15-25 years)</h4>
              <div className="space-y-3 text-sm">
                <div className="bg-blue-50 p-4 rounded">
                  <div className="font-medium text-blue-800 mb-2">Typical Terms:</div>
                  <ul className="text-blue-700 text-xs space-y-1">
                    <li>• Loan Amount: KES 3M - 50M</li>
                    <li>• Interest Rate: 11% - 14% p.a.</li>
                    <li>• Period: 15-25 years (180-300 months)</li>
                    <li>• Early Years: 80%+ of payment is interest</li>
                  </ul>
                </div>
                <p className="text-gray-600 text-xs">
                  <strong>Key Point:</strong> Mortgage amortization heavily front-loads interest.
                  In the first 5 years of a 20-year mortgage, you build very little equity.
                  Extra payments in early years have maximum impact.
                </p>
              </div>
              <a href="/mortgage-calculator-kenya" className="text-blue-600 hover:underline text-xs mt-4 inline-block">
                → Calculate Mortgage Amortization
              </a>
            </div>

            {/* Car Loan */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-green-800 mb-4">🚗 Car Loan Amortization (3-5 years)</h4>
              <div className="space-y-3 text-sm">
                <div className="bg-green-50 p-4 rounded">
                  <div className="font-medium text-green-800 mb-2">Typical Terms:</div>
                  <ul className="text-green-700 text-xs space-y-1">
                    <li>• Loan Amount: KES 800K - 5M</li>
                    <li>• Interest Rate: 12% - 16% p.a.</li>
                    <li>• Period: 3-5 years (36-60 months)</li>
                    <li>• First Payment: ~60% interest, 40% principal</li>
                  </ul>
                </div>
                <p className="text-gray-600 text-xs">
                  <strong>Key Point:</strong> Car loans have shorter terms than mortgages,
                  so you build equity faster. However, cars depreciate rapidly (20-30% first year),
                  so owing more than car's value is common early on.
                </p>
              </div>
            </div>

            {/* Personal Loan */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-purple-800 mb-4">💼 Personal Loan Amortization (1-3 years)</h4>
              <div className="space-y-3 text-sm">
                <div className="bg-purple-50 p-4 rounded">
                  <div className="font-medium text-purple-800 mb-2">Typical Terms:</div>
                  <ul className="text-purple-700 text-xs space-y-1">
                    <li>• Loan Amount: KES 50K - 3M</li>
                    <li>• Interest Rate: 14% - 18% p.a.</li>
                    <li>• Period: 1-3 years (12-36 months)</li>
                    <li>• Faster principal paydown than long loans</li>
                  </ul>
                </div>
                <p className="text-gray-600 text-xs">
                  <strong>Key Point:</strong> Shorter loan terms mean higher percentage goes to principal each month.
                  Total interest is much lower, but monthly payments are higher.
                </p>
              </div>
              <a href="/loan-calculator-kenya" className="text-purple-600 hover:underline text-xs mt-4 inline-block">
                → Calculate Personal Loan
              </a>
            </div>

            {/* Business Loan */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-orange-800 mb-4">🏢 Business Loan Amortization (1-7 years)</h4>
              <div className="space-y-3 text-sm">
                <div className="bg-orange-50 p-4 rounded">
                  <div className="font-medium text-orange-800 mb-2">Typical Terms:</div>
                  <ul className="text-orange-700 text-xs space-y-1">
                    <li>• Loan Amount: KES 500K - 20M+</li>
                    <li>• Interest Rate: 13% - 20% p.a.</li>
                    <li>• Period: Varies by purpose (12-84 months)</li>
                    <li>• May have grace period for interest-only</li>
                  </ul>
                </div>
                <p className="text-gray-600 text-xs">
                  <strong>Key Point:</strong> Business loans often have flexible amortization.
                  Some allow interest-only periods initially, followed by full amortization.
                  Cash flow timing is critical.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Reading Amortization Schedule */}
        <section className="mb-16 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-8 border border-teal-200">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            How to Read and Use Your Amortization Schedule
          </h3>

          <div className="bg-white rounded-lg p-6 mb-6">
            <h4 className="text-lg font-semibold text-teal-800 mb-4">Understanding Each Column:</h4>
            <div className="space-y-4 text-sm">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-32 font-semibold text-gray-700">Payment Number</div>
                <div className="text-gray-600">
                  Sequential month number (1, 2, 3... up to final month). Helps track progress through loan term.
                </div>
              </div>
              <div className="flex gap-4 bg-blue-50 p-3 rounded">
                <div className="flex-shrink-0 w-32 font-semibold text-blue-800">Total Payment</div>
                <div className="text-blue-700">
                  Amount you pay each month. This stays constant throughout the loan (unless you make extra payments).
                  Example: KES 23,789/month for entire 60-month term.
                </div>
              </div>
              <div className="flex gap-4 bg-green-50 p-3 rounded">
                <div className="flex-shrink-0 w-32 font-semibold text-green-800">Principal Portion</div>
                <div className="text-green-700">
                  Amount going toward paying down the actual loan. <strong>This INCREASES each month</strong> as interest decreases.
                  This is your equity buildup!
                </div>
              </div>
              <div className="flex gap-4 bg-red-50 p-3 rounded">
                <div className="flex-shrink-0 w-32 font-semibold text-red-800">Interest Portion</div>
                <div className="text-red-700">
                  Amount going to the bank as interest. <strong>This DECREASES each month</strong> as principal balance shrinks.
                  This is the "cost" of borrowing.
                </div>
              </div>
              <div className="flex gap-4 bg-purple-50 p-3 rounded">
                <div className="flex-shrink-0 w-32 font-semibold text-purple-800">Remaining Balance</div>
                <div className="text-purple-700">
                  How much you still owe after this payment. Watch this number decrease month by month.
                  When it reaches zero, loan is paid off!
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-teal-200 rounded-lg p-6">
              <h5 className="font-semibold text-teal-800 mb-3 text-sm">✅ What to Look For:</h5>
              <ul className="text-xs text-gray-700 space-y-2">
                <li>🔍 <strong>Early months:</strong> Notice how much goes to interest vs principal</li>
                <li>📈 <strong>Midpoint:</strong> Find when principal portion exceeds interest</li>
                <li>💰 <strong>Total interest:</strong> Sum of all interest payments shows true cost</li>
                <li>⏰ <strong>Payoff date:</strong> See exactly when you'll own asset free & clear</li>
                <li>🎯 <strong>Equity milestones:</strong> Track when you reach 20%, 50%, 80% equity</li>
              </ul>
            </div>
            <div className="bg-white border border-blue-200 rounded-lg p-6">
              <h5 className="font-semibold text-blue-800 mb-3 text-sm">💡 How to Use It:</h5>
              <ul className="text-xs text-gray-700 space-y-2">
                <li>📋 <strong>Budget planning:</strong> Know exact payment for each month</li>
                <li>🏠 <strong>Refinancing:</strong> See current balance if you want to refinance</li>
                <li>💸 <strong>Extra payments:</strong> Calculate savings from paying extra</li>
                <li>📊 <strong>Tax deductions:</strong> Total interest paid for deductions</li>
                <li>🔄 <strong>Selling asset:</strong> Know exact payoff amount any month</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <section className="mb-16 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            🛠️ Complete Loan Analysis Toolkit
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <a href="/loan-calculator-kenya" className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Loan Calculator</h3>
              <p className="text-gray-600 text-sm mb-3">Calculate monthly payments and total interest before viewing amortization.</p>
              <div className="text-purple-600 text-xs font-medium">→ Calculate Loan Payment</div>
            </a>

            <a href="/salary-calculator-kenya" className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Salary Calculator</h3>
              <p className="text-gray-600 text-sm mb-3">Check if you can afford the loan payment (30% rule).</p>
              <div className="text-purple-600 text-xs font-medium">→ Calculate Net Salary</div>
            </a>

            <a href="/mortgage-calculator-kenya" className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">🏠</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mortgage Calculator</h3>
              <p className="text-gray-600 text-sm mb-3">Specialized calculator for home loan amortization schedules.</p>
              <div className="text-purple-600 text-xs font-medium">→ Calculate Mortgage</div>
            </a>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center bg-gradient-to-r from-indigo-100 to-purple-100 border border-indigo-200 rounded-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Generate Your Amortization Schedule?
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Use our amortization calculator above to generate a complete payment schedule
            showing exactly how your loan will be paid off month by month.
          </p>

          <div className="grid md:grid-cols-3 gap-4 text-sm mb-6">
            <div className="bg-white rounded-lg p-4 border border-indigo-200">
              <div className="text-2xl mb-2">📅</div>
              <h3 className="font-semibold text-gray-900 mb-1">Month-by-Month Detail</h3>
              <p className="text-gray-600">See exact breakdown for every single payment</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-indigo-200">
              <div className="text-2xl mb-2">💵</div>
              <h3 className="font-semibold text-gray-900 mb-1">Principal vs Interest</h3>
              <p className="text-gray-600">Understand where your money goes each month</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-indigo-200">
              <div className="text-2xl mb-2">📈</div>
              <h3 className="font-semibold text-gray-900 mb-1">Track Your Progress</h3>
              <p className="text-gray-600">Monitor equity buildup and payoff timeline</p>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </div>
  );
}
