import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MoneyMarketCalculator from './MoneyMarketCalculator';
import { ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: "Money Market Fund Calculator Kenya 2025 | MMF Returns Calculator",
  description: "Use our money market fund calculator Kenya to calculate returns on MMF investments. Compare CIC, Britam, NCBA, Old Mutual, Sanlam money market funds with current 2025 interest rates. Best MMF calculator Kenya for investment planning and compound interest calculations.",
  keywords: "money market fund calculator kenya, mmf calculator, money market fund returns, cic money market fund, britam money market fund, ncba money market fund, old mutual money market fund, sanlam money market fund, mmf interest rates kenya 2025, investment calculator kenya",
  openGraph: {
    title: "Money Market Fund Calculator Kenya 2025 | MMF Returns Calculator",
    description: "Calculate money market fund returns with our comprehensive MMF calculator Kenya. Compare all major money market funds with 2025 rates.",
    url: "https://newkenyan.com/money-market-fund-calculator-kenya",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Money Market Fund Calculator Kenya 2025",
    description: "Calculate MMF returns and compare all Kenya money market funds.",
  },
  alternates: {
    canonical: "https://newkenyan.com/money-market-fund-calculator-kenya",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function MoneyMarketFundCalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* SEO Optimized Header Section */}
      <div className="bg-gradient-to-br from-green-50 to-teal-50 border-b">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Money Market Fund Calculator Kenya 2025 - MMF Returns Calculator
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
              Calculate Money Market Fund Returns - Compare CIC, Britam, NCBA, Old Mutual & Sanlam MMFs
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
              Use our comprehensive money market fund calculator Kenya to calculate investment returns, compare MMF interest rates,
              and plan your savings strategy. Get accurate projections for CIC Money Market Fund, Britam Money Market Fund, NCBA Money Market Fund,
              Old Mutual MMF, Sanlam MMF, and all major Kenya money market funds with current 2025 rates (12-14% p.a.).
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium">MMF Calculator</span>
              <span className="bg-teal-100 text-teal-800 px-4 py-2 rounded-full font-medium">Investment Returns</span>
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">12-14% p.a.</span>
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium">Compound Interest</span>
              <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-medium">Compare MMFs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator Component */}
      <MoneyMarketCalculator />

      {/* Strategic Internal Links */}
      <div className="max-w-6xl mx-auto px-6 py-12 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-purple-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            💰 Complete Financial Planning - Savings & Investment Tools
          </h2>
          <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
            Use our money market fund calculator with other financial tools to maximize your savings strategy
            and plan for major financial goals like buying property or building a home.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Salary Planning */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">📊 Calculate Savings Capacity</h3>
              <p className="text-gray-700 text-sm mb-4">
                Calculate net salary to determine how much you can invest in MMFs monthly.
              </p>
              <div className="space-y-2">
                <a href="/salary-calculator-kenya" className="block text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline">
                  → Salary Calculator Kenya
                </a>
                <a href="/net-pay-calculator" className="block text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline">
                  → Net Pay Calculator
                </a>
              </div>
            </div>

            {/* Property Investment */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">🏠 Save for Property</h3>
              <p className="text-gray-700 text-sm mb-4">
                Use MMF returns to save for house deposit or construction costs.
              </p>
              <div className="space-y-2">
                <a href="/mortgage-calculator-kenya" className="block text-green-600 hover:text-green-800 font-medium text-sm hover:underline">
                  → Mortgage Calculator Kenya
                </a>
                <a href="/construction-cost-calculator-kenya" className="block text-green-600 hover:text-green-800 font-medium text-sm hover:underline">
                  → Construction Cost Calculator
                </a>
                <a href="/houses-for-sale/nairobi-county" className="block text-green-600 hover:text-green-800 font-medium text-sm hover:underline">
                  → Houses for Sale Kenya
                </a>
              </div>
            </div>

            {/* Loan Comparison */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">💳 Smart Borrowing</h3>
              <p className="text-gray-700 text-sm mb-4">
                Compare MMF returns vs loan interest - sometimes better to invest than prepay.
              </p>
              <div className="space-y-2">
                <a href="/loan-calculator-kenya" className="block text-purple-600 hover:text-purple-800 font-medium text-sm hover:underline">
                  → Loan Calculator Kenya
                </a>
                <a href="/amortization-calculator" className="block text-purple-600 hover:text-purple-800 font-medium text-sm hover:underline">
                  → Amortization Calculator
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
            Why Use Our Money Market Fund Calculator - Most Comprehensive MMF Returns Calculator
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-4">
            Calculate accurate returns on money market fund investments with current 2025 Kenya MMF rates and compound interest
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-green-800 text-sm">
              💡 <strong>Pro Tip:</strong> Money market funds offer 12-14% annual returns with daily liquidity -
              better than most savings accounts (7-9%) and accessible anytime!
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">2025 MMF Rates</h3>
            <p className="text-gray-600">
              Current rates from all major Kenya MMFs: CIC (13.5%), Britam (13.2%), NCBA (12.8%), Old Mutual (13.1%), Sanlam (12.9%)
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Compound Interest Calculation</h3>
            <p className="text-gray-600">
              See how your money grows with daily compounding - calculate total returns, interest earned, and final value
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Monthly Contribution Scenarios</h3>
            <p className="text-gray-600">
              Calculate growth with regular monthly deposits - see how consistent investing builds wealth over time
            </p>
          </div>
        </div>

        {/* MMF Rates Comparison */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Kenya Money Market Fund Rates 2025 - Current Returns
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Top MMFs by Returns (2025)</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">CIC Money Market Fund</span>
                  <span className="font-semibold text-gray-900">13.5% p.a.</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Britam Money Market Fund</span>
                  <span className="font-semibold text-gray-900">13.2% p.a.</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Old Mutual Money Market Fund</span>
                  <span className="font-semibold text-gray-900">13.1% p.a.</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Sanlam Money Market Fund</span>
                  <span className="font-semibold text-gray-900">12.9% p.a.</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">MMF vs Other Investments</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Money Market Funds</span>
                  <span className="font-semibold text-green-700">12-14% p.a.</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">High-Interest Savings Accounts</span>
                  <span className="font-semibold text-gray-900">7-9% p.a.</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Fixed Deposits (1 year)</span>
                  <span className="font-semibold text-gray-900">9-11% p.a.</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Regular Savings Account</span>
                  <span className="font-semibold text-red-600">2-5% p.a.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Authoritative References */}
        <div className="mt-16 bg-gray-100 rounded-xl p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Official Sources - Kenya Money Market Funds
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Major Fund Managers</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.cic.co.ke/personal/investments/money-market-fund"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
                  >
                    CIC Money Market Fund
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.britam.com/ke/personal/investments/money-market-fund"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
                  >
                    Britam Money Market Fund
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.oldmutual.co.ke/personal/investments/unit-trusts/money-market-fund"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
                  >
                    Old Mutual Money Market Fund
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
                    href="https://www.cma.or.ke/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
                  >
                    Capital Markets Authority Kenya
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li className="text-gray-600">MMFs regulated by CMA Kenya</li>
                <li className="text-gray-600">Low risk, liquid investment vehicle</li>
                <li className="text-gray-600">Rates updated January 2025</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">
            All MMF rates verified from official fund manager sources - January 2025
          </p>
        </div>
      </div>

      {/* COMPREHENSIVE CONTENT - MMF Investment Examples */}
      <div className="max-w-6xl mx-auto px-6 py-16 bg-white">

        {/* What are Money Market Funds */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            What are Money Market Funds? Complete Guide for Kenya 2025
          </h2>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              <strong>Money Market Funds (MMFs)</strong> are low-risk investment vehicles that pool money from multiple investors
              to invest in short-term, high-quality debt instruments. In Kenya, MMFs typically offer returns of <strong>12-14% per annum</strong>,
              significantly higher than regular savings accounts (2-5% p.a.) while maintaining daily liquidity.
            </p>

            <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">How Money Market Funds Work in Kenya</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">What MMFs Invest In:</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>✓ <strong>Treasury Bills:</strong> Short-term government securities (91, 182, 364 days)</li>
                    <li>✓ <strong>Fixed Deposits:</strong> Bank deposits with maturity under 1 year</li>
                    <li>✓ <strong>Commercial Paper:</strong> Short-term corporate debt</li>
                    <li>✓ <strong>Repo Agreements:</strong> Repurchase agreements with banks</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Key Benefits:</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>✓ <strong>High Returns:</strong> 12-14% p.a. (vs 2-5% savings accounts)</li>
                    <li>✓ <strong>Daily Liquidity:</strong> Withdraw anytime, funds in 1-3 days</li>
                    <li>✓ <strong>Low Risk:</strong> Invest in government securities & banks</li>
                    <li>✓ <strong>Low Minimum:</strong> Start with as little as KES 1,000</li>
                    <li>✓ <strong>Compound Daily:</strong> Interest compounds daily</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MMF Investment Examples */}
        <section className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Money Market Fund Returns Calculator - Real Investment Examples 2025
          </h3>

          {/* Lump Sum Investments */}
          <div className="mb-12">
            <h4 className="text-xl font-semibold text-green-800 mb-4">Lump Sum Investment Examples</h4>

            <div className="grid md:grid-cols-2 gap-8">
              {/* KES 100K Investment */}
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h5 className="text-lg font-semibold text-blue-800 mb-4">KES 100,000 Investment @ 13.5% p.a.</h5>
                <div className="bg-blue-50 p-6 rounded-lg mb-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between border-b border-blue-200 pb-2">
                      <span className="font-medium">Initial Investment:</span>
                      <span className="font-bold">KES 100,000</span>
                    </div>
                    <div className="flex justify-between border-b border-blue-200 pb-2">
                      <span>Annual Rate:</span>
                      <span>13.5% (CIC MMF)</span>
                    </div>

                    <div className="bg-white p-3 rounded mt-3">
                      <div className="text-xs text-gray-600 mb-2">After 1 Year:</div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold">Final Value:</span>
                        <span className="font-bold text-2xl text-blue-700">KES 114,424</span>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Interest Earned: KES 14,424</div>
                    </div>

                    <div className="bg-white p-3 rounded mt-2">
                      <div className="text-xs text-gray-600 mb-2">After 3 Years:</div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold">Final Value:</span>
                        <span className="font-bold text-2xl text-green-700">KES 149,961</span>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Interest Earned: KES 49,961</div>
                    </div>

                    <div className="bg-white p-3 rounded mt-2">
                      <div className="text-xs text-gray-600 mb-2">After 5 Years:</div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold">Final Value:</span>
                        <span className="font-bold text-2xl text-purple-700">KES 195,034</span>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Interest Earned: KES 95,034</div>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded p-4 text-xs">
                  <p className="text-green-800">
                    <strong>💰 Power of Compounding:</strong> Your KES 100K nearly doubles in 5 years!
                    Compare this to a savings account at 5% which would only give you KES 128K.
                  </p>
                </div>
              </div>

              {/* KES 500K Investment */}
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h5 className="text-lg font-semibold text-green-800 mb-4">KES 500,000 Investment @ 13.2% p.a.</h5>
                <div className="bg-green-50 p-6 rounded-lg mb-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between border-b border-green-200 pb-2">
                      <span className="font-medium">Initial Investment:</span>
                      <span className="font-bold">KES 500,000</span>
                    </div>
                    <div className="flex justify-between border-b border-green-200 pb-2">
                      <span>Annual Rate:</span>
                      <span>13.2% (Britam MMF)</span>
                    </div>

                    <div className="bg-white p-3 rounded mt-3">
                      <div className="text-xs text-gray-600 mb-2">After 1 Year:</div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold">Final Value:</span>
                        <span className="font-bold text-2xl text-blue-700">KES 570,422</span>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Interest Earned: KES 70,422</div>
                    </div>

                    <div className="bg-white p-3 rounded mt-2">
                      <div className="text-xs text-gray-600 mb-2">After 3 Years:</div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold">Final Value:</span>
                        <span className="font-bold text-2xl text-green-700">KES 740,268</span>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Interest Earned: KES 240,268</div>
                    </div>

                    <div className="bg-white p-3 rounded mt-2">
                      <div className="text-xs text-gray-600 mb-2">After 5 Years:</div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold">Final Value:</span>
                        <span className="font-bold text-2xl text-purple-700">KES 955,867</span>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Interest Earned: KES 455,867</div>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded p-4 text-xs">
                  <p className="text-blue-800">
                    <strong>🏠 Property Deposit:</strong> Growing KES 500K to nearly KES 1M in 5 years
                    gives you a solid deposit for a house worth KES 5-7M!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Contribution Examples */}
          <div className="mb-12">
            <h4 className="text-xl font-semibold text-purple-800 mb-4">Monthly Contribution Investment Examples</h4>

            <div className="grid md:grid-cols-2 gap-8">
              {/* KES 10K Monthly */}
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-purple-50 to-pink-50">
                <h5 className="text-lg font-semibold text-purple-800 mb-4">KES 10,000/Month @ 13.5% p.a.</h5>
                <div className="bg-white p-6 rounded-lg mb-4 border border-purple-200">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="font-medium">Monthly Contribution:</span>
                      <span className="font-bold">KES 10,000</span>
                    </div>

                    <div className="bg-purple-50 p-3 rounded mt-3">
                      <div className="text-xs text-purple-700 mb-2">After 1 Year (12 months):</div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs">Total Contributed:</span>
                        <span className="font-semibold">KES 120,000</span>
                      </div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs">Interest Earned:</span>
                        <span className="font-semibold text-green-600">KES 8,691</span>
                      </div>
                      <div className="flex justify-between items-center border-t pt-2">
                        <span className="font-bold">Final Value:</span>
                        <span className="font-bold text-xl text-purple-700">KES 128,691</span>
                      </div>
                    </div>

                    <div className="bg-green-50 p-3 rounded mt-2">
                      <div className="text-xs text-green-700 mb-2">After 3 Years (36 months):</div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs">Total Contributed:</span>
                        <span className="font-semibold">KES 360,000</span>
                      </div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs">Interest Earned:</span>
                        <span className="font-semibold text-green-600">KES 80,147</span>
                      </div>
                      <div className="flex justify-between items-center border-t pt-2">
                        <span className="font-bold">Final Value:</span>
                        <span className="font-bold text-xl text-green-700">KES 440,147</span>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-3 rounded mt-2">
                      <div className="text-xs text-blue-700 mb-2">After 5 Years (60 months):</div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs">Total Contributed:</span>
                        <span className="font-semibold">KES 600,000</span>
                      </div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs">Interest Earned:</span>
                        <span className="font-semibold text-green-600">KES 215,891</span>
                      </div>
                      <div className="flex justify-between items-center border-t pt-2">
                        <span className="font-bold">Final Value:</span>
                        <span className="font-bold text-2xl text-blue-700">KES 815,891</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded p-4 text-xs">
                  <p className="text-yellow-800">
                    <strong>💪 Consistency Pays:</strong> Just KES 10K/month turns into KES 815K in 5 years!
                    That's enough for a down payment on a KES 5M+ property.
                  </p>
                </div>
              </div>

              {/* KES 25K Monthly */}
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-orange-50 to-red-50">
                <h5 className="text-lg font-semibold text-orange-800 mb-4">KES 25,000/Month @ 13.2% p.a.</h5>
                <div className="bg-white p-6 rounded-lg mb-4 border border-orange-200">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="font-medium">Monthly Contribution:</span>
                      <span className="font-bold">KES 25,000</span>
                    </div>

                    <div className="bg-orange-50 p-3 rounded mt-3">
                      <div className="text-xs text-orange-700 mb-2">After 1 Year:</div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs">Contributed:</span>
                        <span className="font-semibold">KES 300,000</span>
                      </div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs">Interest:</span>
                        <span className="font-semibold text-green-600">KES 21,643</span>
                      </div>
                      <div className="flex justify-between items-center border-t pt-2">
                        <span className="font-bold">Value:</span>
                        <span className="font-bold text-xl text-orange-700">KES 321,643</span>
                      </div>
                    </div>

                    <div className="bg-green-50 p-3 rounded mt-2">
                      <div className="text-xs text-green-700 mb-2">After 3 Years:</div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs">Contributed:</span>
                        <span className="font-semibold">KES 900,000</span>
                      </div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs">Interest:</span>
                        <span className="font-semibold text-green-600">KES 199,115</span>
                      </div>
                      <div className="flex justify-between items-center border-t pt-2">
                        <span className="font-bold">Value:</span>
                        <span className="font-bold text-xl text-green-700">KES 1,099,115</span>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-3 rounded mt-2">
                      <div className="text-xs text-blue-700 mb-2">After 5 Years:</div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs">Contributed:</span>
                        <span className="font-semibold">KES 1,500,000</span>
                      </div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs">Interest:</span>
                        <span className="font-semibold text-green-600">KES 536,283</span>
                      </div>
                      <div className="flex justify-between items-center border-t pt-2">
                        <span className="font-bold">Value:</span>
                        <span className="font-bold text-2xl text-blue-700">KES 2,036,283</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded p-4 text-xs">
                  <p className="text-green-800">
                    <strong>🏆 Millionaire Status:</strong> KES 25K/month grows to over KES 2M in 5 years!
                    That's a 20% deposit on a KES 10M house in Nairobi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MMF vs Savings Account Comparison */}
        <section className="mb-16 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border border-blue-200">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Money Market Fund vs Savings Account - The Massive Difference
          </h3>

          <div className="bg-white rounded-lg p-6 mb-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              KES 500,000 Investment Over 5 Years - Comparison
            </h4>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-3 text-left">Investment Type</th>
                    <th className="border border-gray-300 px-4 py-3 text-right">Interest Rate</th>
                    <th className="border border-gray-300 px-4 py-3 text-right">After 1 Year</th>
                    <th className="border border-gray-300 px-4 py-3 text-right">After 3 Years</th>
                    <th className="border border-gray-300 px-4 py-3 text-right">After 5 Years</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-green-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-green-800">Money Market Fund (CIC)</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">13.5% p.a.</td>
                    <td className="border border-gray-300 px-4 py-3 text-right font-bold">KES 572,120</td>
                    <td className="border border-gray-300 px-4 py-3 text-right font-bold">KES 749,805</td>
                    <td className="border border-gray-300 px-4 py-3 text-right font-bold text-green-700">KES 975,170</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">High-Interest Savings (8%)</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">8% p.a.</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">KES 541,600</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">KES 629,856</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">KES 734,664</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">Regular Savings Account (5%)</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">5% p.a.</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">KES 525,000</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">KES 578,813</td>
                    <td className="border border-gray-300 px-4 py-3 text-right text-red-600">KES 638,141</td>
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold">Difference (MMF vs Regular Savings)</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">-</td>
                    <td className="border border-gray-300 px-4 py-3 text-right font-bold text-green-600">+KES 47,120</td>
                    <td className="border border-gray-300 px-4 py-3 text-right font-bold text-green-600">+KES 170,992</td>
                    <td className="border border-gray-300 px-4 py-3 text-right font-bold text-green-700">+KES 337,029</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-200 rounded p-4">
                <h5 className="font-semibold text-green-800 mb-2 text-sm">✅ MMF Advantages:</h5>
                <ul className="text-xs text-green-700 space-y-1">
                  <li>• Earns KES 337K MORE than savings in 5 years!</li>
                  <li>• Daily compounding maximizes returns</li>
                  <li>• Still fully liquid (withdraw anytime)</li>
                  <li>• Low risk - invests in government securities</li>
                  <li>• Start with just KES 1,000</li>
                </ul>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded p-4">
                <h5 className="font-semibold text-blue-800 mb-2 text-sm">📊 The Numbers Don't Lie:</h5>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• MMF gives you 53% more money after 5 years</li>
                  <li>• Extra KES 337K = down payment for a car</li>
                  <li>• Could be partial deposit for land purchase</li>
                  <li>• All while keeping money accessible</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Best Money Market Funds Kenya */}
        <section className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Best Money Market Funds in Kenya 2025 - Complete Comparison
          </h3>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-left">Fund Manager</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Fund Name</th>
                  <th className="border border-gray-300 px-4 py-3 text-right">Current Rate</th>
                  <th className="border border-gray-300 px-4 py-3 text-right">Min. Investment</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Withdrawal Time</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-green-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold">CIC Asset Management</td>
                  <td className="border border-gray-300 px-4 py-3">CIC Money Market Fund</td>
                  <td className="border border-gray-300 px-4 py-3 text-right font-bold text-green-700">13.5% p.a.</td>
                  <td className="border border-gray-300 px-4 py-3 text-right">KES 1,000</td>
                  <td className="border border-gray-300 px-4 py-3">T+1 day</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Britam Asset Managers</td>
                  <td className="border border-gray-300 px-4 py-3">Britam Money Market Fund</td>
                  <td className="border border-gray-300 px-4 py-3 text-right font-bold">13.2% p.a.</td>
                  <td className="border border-gray-300 px-4 py-3 text-right">KES 5,000</td>
                  <td className="border border-gray-300 px-4 py-3">T+2 days</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Old Mutual</td>
                  <td className="border border-gray-300 px-4 py-3">Old Mutual Money Market Fund</td>
                  <td className="border border-gray-300 px-4 py-3 text-right font-bold">13.1% p.a.</td>
                  <td className="border border-gray-300 px-4 py-3 text-right">KES 1,000</td>
                  <td className="border border-gray-300 px-4 py-3">T+2 days</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Sanlam Investments</td>
                  <td className="border border-gray-300 px-4 py-3">Sanlam Money Market Fund</td>
                  <td className="border border-gray-300 px-4 py-3 text-right font-bold">12.9% p.a.</td>
                  <td className="border border-gray-300 px-4 py-3 text-right">KES 5,000</td>
                  <td className="border border-gray-300 px-4 py-3">T+1 day</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold">NCBA Investment Bank</td>
                  <td className="border border-gray-300 px-4 py-3">NCBA Money Market Fund</td>
                  <td className="border border-gray-300 px-4 py-3 text-right font-bold">12.8% p.a.</td>
                  <td className="border border-gray-300 px-4 py-3 text-right">KES 10,000</td>
                  <td className="border border-gray-300 px-4 py-3">T+2 days</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">GenAfrica Asset Managers</td>
                  <td className="border border-gray-300 px-4 py-3">GenAfrica Money Market Fund</td>
                  <td className="border border-gray-300 px-4 py-3 text-right font-bold">12.7% p.a.</td>
                  <td className="border border-gray-300 px-4 py-3 text-right">KES 1,000</td>
                  <td className="border border-gray-300 px-4 py-3">T+1 day</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Dry Associates</td>
                  <td className="border border-gray-300 px-4 py-3">Dry Associates MMF</td>
                  <td className="border border-gray-300 px-4 py-3 text-right font-bold">12.5% p.a.</td>
                  <td className="border border-gray-300 px-4 py-3 text-right">KES 5,000</td>
                  <td className="border border-gray-300 px-4 py-3">T+2 days</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-green-800 mb-4">🏆 Top Pick: CIC MMF</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between"><span>Rate:</span><span className="font-bold text-green-700">13.5% p.a.</span></div>
                <div className="flex justify-between"><span>Min:</span><span>KES 1,000</span></div>
                <div className="flex justify-between"><span>Access:</span><span>Next day</span></div>
              </div>
              <p className="text-xs text-gray-600 mt-3">
                Best combination of high returns, low minimum, and quick access.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-blue-800 mb-4">💼 Best for Large Amounts</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between"><span>Fund:</span><span className="font-bold">Britam/Old Mutual</span></div>
                <div className="flex justify-between"><span>Rate:</span><span className="font-bold">13%+</span></div>
                <div className="flex justify-between"><span>Track Record:</span><span>Excellent</span></div>
              </div>
              <p className="text-xs text-gray-600 mt-3">
                Established fund managers with consistent performance history.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-purple-800 mb-4">🚀 Best for Beginners</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between"><span>Fund:</span><span className="font-bold">CIC/GenAfrica</span></div>
                <div className="flex justify-between"><span>Min:</span><span className="font-bold">KES 1,000</span></div>
                <div className="flex justify-between"><span>Ease:</span><span>Very Simple</span></div>
              </div>
              <p className="text-xs text-gray-600 mt-3">
                Low minimum investment and user-friendly platforms.
              </p>
            </div>
          </div>
        </section>

        {/* How to Invest in MMFs */}
        <section className="mb-16 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-8 border border-teal-200">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            How to Invest in Money Market Funds Kenya - Step by Step Guide
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 border border-teal-200">
              <h4 className="text-lg font-semibold text-teal-800 mb-4">Opening an MMF Account</h4>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center font-bold text-teal-700 text-sm">1</div>
                  <div className="text-sm">
                    <div className="font-semibold text-gray-800">Choose Your Fund</div>
                    <p className="text-gray-600 text-xs">Compare rates and pick a fund manager (CIC, Britam, Old Mutual, etc.)</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center font-bold text-teal-700 text-sm">2</div>
                  <div className="text-sm">
                    <div className="font-semibold text-gray-800">Visit Office or Apply Online</div>
                    <p className="text-gray-600 text-xs">Most fund managers now allow online applications. Bring ID and KRA PIN.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center font-bold text-teal-700 text-sm">3</div>
                  <div className="text-sm">
                    <div className="font-semibold text-gray-800">Complete Application</div>
                    <p className="text-gray-600 text-xs">Fill account opening form, provide bank details, sign agreements</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center font-bold text-teal-700 text-sm">4</div>
                  <div className="text-sm">
                    <div className="font-semibold text-gray-800">Make Initial Deposit</div>
                    <p className="text-gray-600 text-xs">Transfer minimum amount (KES 1,000-10,000 depending on fund)</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-700 text-sm">5</div>
                  <div className="text-sm">
                    <div className="font-semibold text-gray-800">Start Earning!</div>
                    <p className="text-gray-600 text-xs">Interest starts accruing immediately, compounding daily</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-blue-200">
              <h4 className="text-lg font-semibold text-blue-800 mb-4">Documents Required</h4>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-blue-600">✓</span>
                  <div>
                    <div className="font-medium text-gray-800">National ID or Passport</div>
                    <p className="text-gray-600 text-xs">Original and copy</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-blue-600">✓</span>
                  <div>
                    <div className="font-medium text-gray-800">KRA PIN Certificate</div>
                    <p className="text-gray-600 text-xs">For tax purposes - get from iTax if you don't have</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-blue-600">✓</span>
                  <div>
                    <div className="font-medium text-gray-800">Bank Statement (Recent)</div>
                    <p className="text-gray-600 text-xs">Usually last 3 months</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-blue-600">✓</span>
                  <div>
                    <div className="font-medium text-gray-800">Proof of Residence</div>
                    <p className="text-gray-600 text-xs">Utility bill, lease agreement, etc.</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                <h5 className="font-semibold text-yellow-800 mb-2 text-sm">⏱️ Processing Time:</h5>
                <p className="text-yellow-700 text-xs">
                  • Online applications: 1-2 business days<br/>
                  • Walk-in applications: Same day to 1 business day<br/>
                  • First deposit can be made immediately after approval
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tax on MMF Returns */}
        <section className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Tax on Money Market Fund Returns Kenya 2025
          </h3>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
            <h4 className="text-lg font-semibold text-orange-800 mb-4">Withholding Tax on MMF Interest</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="font-semibold text-gray-800 mb-3">Current Tax Rates:</div>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between bg-white p-3 rounded">
                    <span className="text-gray-700">Withholding Tax on Interest:</span>
                    <span className="font-bold text-orange-700">15%</span>
                  </li>
                  <li className="flex justify-between bg-white p-3 rounded">
                    <span className="text-gray-700">Applied to:</span>
                    <span className="font-medium">All interest earned</span>
                  </li>
                  <li className="flex justify-between bg-white p-3 rounded">
                    <span className="text-gray-700">Deducted:</span>
                    <span className="font-medium">Automatically by fund</span>
                  </li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-gray-800 mb-3">Example Calculation:</div>
                <div className="bg-white p-4 rounded text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Investment:</span>
                      <span className="font-medium">KES 500,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Annual Rate:</span>
                      <span className="font-medium">13.5%</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-gray-600">Gross Interest (1 year):</span>
                      <span className="font-semibold">KES 72,120</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Withholding Tax (15%):</span>
                      <span className="font-semibold text-red-600">-KES 10,818</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-gray-700 font-semibold">Net Interest Received:</span>
                      <span className="font-bold text-green-700">KES 61,302</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      Effective After-Tax Return: 11.48% p.a.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded p-4">
            <h5 className="font-semibold text-blue-800 mb-2">💡 Important Tax Notes:</h5>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Tax is deducted at source - you receive net amount</li>
              <li>• Still 11.5% after tax beats most savings accounts!</li>
              <li>• Withholding tax is final tax (no additional tax to pay)</li>
              <li>• Fund provides annual tax certificate for your records</li>
            </ul>
          </div>
        </section>

        {/* Related Tools */}
        <section className="mb-16 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            🛠️ Complete Investment Planning Toolkit
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <a href="/salary-calculator-kenya" className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Salary Calculator</h3>
              <p className="text-gray-600 text-sm mb-3">Calculate net salary to determine monthly investment capacity.</p>
              <div className="text-purple-600 text-xs font-medium">→ Calculate Take-Home Pay</div>
            </a>

            <a href="/mortgage-calculator-kenya" className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">🏠</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mortgage Calculator</h3>
              <p className="text-gray-600 text-sm mb-3">Plan property purchase using MMF savings as deposit.</p>
              <div className="text-purple-600 text-xs font-medium">→ Calculate Mortgage</div>
            </a>

            <a href="/loan-calculator-kenya" className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">💳</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Loan Calculator</h3>
              <p className="text-gray-600 text-sm mb-3">Compare MMF returns vs loan interest rates.</p>
              <div className="text-purple-600 text-xs font-medium">→ Calculate Loan</div>
            </a>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center bg-gradient-to-r from-green-100 to-teal-100 border border-green-200 rounded-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Calculate Your MMF Returns?
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Use our money market fund calculator above to see how your investment will grow
            with current 2025 Kenya MMF rates (12-14% p.a.).
          </p>

          <div className="grid md:grid-cols-3 gap-4 text-sm mb-6">
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <div className="text-2xl mb-2">📈</div>
              <h3 className="font-semibold text-gray-900 mb-1">High Returns</h3>
              <p className="text-gray-600">12-14% annual returns with daily compounding</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <div className="text-2xl mb-2">💧</div>
              <h3 className="font-semibold text-gray-900 mb-1">Daily Liquidity</h3>
              <p className="text-gray-600">Access your money in 1-2 business days</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <div className="text-2xl mb-2">🛡️</div>
              <h3 className="font-semibold text-gray-900 mb-1">Low Risk</h3>
              <p className="text-gray-600">Invest in government securities & top banks</p>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </div>
  );
}
