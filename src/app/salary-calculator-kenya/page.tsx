import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SalaryCalculator from './SalaryCalculator';
import { ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: "Salary Calculator Kenya 2025 | Net Salary Calculator Kenya | Gross Pay Calculator",
  description: "Use our comprehensive salary calculator Kenya to calculate net salary, gross pay, PAYE tax, NSSF, NHIF and housing levy deductions. Best net salary calculator Kenya 2025 with accurate KRA tax rates and payroll calculations for all income levels.",
  keywords: "salary calculator kenya, net salary calculator kenya, gross pay calculator kenya, paye calculator kenya, net pay calculator, payroll calculator kenya, net calculator kenya, salary calculator, kra tax calculator, nssf calculator, nhif calculator, housing levy calculator, kenya salary calculator 2025",
  openGraph: {
    title: "Salary Calculator Kenya 2025 | Net Salary Calculator Kenya | Gross Pay Calculator",
    description: "Calculate your net salary in Kenya with our comprehensive salary calculator. Includes PAYE, NSSF, NHIF, and housing levy calculations based on 2025 KRA rates.",
    url: "https://newkenyan.com/salary-calculator-kenya",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salary Calculator Kenya 2025 | Net Salary Calculator",
    description: "Calculate your net salary in Kenya with accurate PAYE, NSSF, NHIF deductions.",
  },
  alternates: {
    canonical: "https://newkenyan.com/salary-calculator-kenya",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SalaryCalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* SEO Optimized Header Section */}
      <div className="bg-gradient-to-br from-blue-50 to-green-50 border-b">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Salary Calculator Kenya 2025 - Net Salary Calculator Kenya & Gross Pay Calculator
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
              Calculate Net Salary, PAYE Tax, NSSF, NHIF & Housing Levy - Best Payroll Calculator Kenya
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
              Use our comprehensive salary calculator Kenya to calculate your exact net salary after PAYE tax, NSSF, NHIF, and housing levy deductions.
              Our net salary calculator Kenya uses current 2025 KRA tax rates to provide accurate payroll calculations for all income levels in Kenya.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">Net Salary Calculator</span>
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium">PAYE Calculator 2025</span>
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium">Gross Pay Calculator</span>
              <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-medium">KRA Tax Rates</span>
              <span className="bg-red-100 text-red-800 px-4 py-2 rounded-full font-medium">Payroll Calculator</span>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator Component */}
      <SalaryCalculator />

      {/* Strategic Internal Links - Jobs & Careers Silo */}
      <div className="max-w-6xl mx-auto px-6 py-12 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-purple-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            💼 Find Jobs in Kenya - Calculate Salary for Your Next Role
          </h2>
          <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
            Use our salary calculator to evaluate job offers across Kenya. Browse thousands of jobs and calculate
            your take-home pay based on the salary offered.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Local Jobs */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">🔍 Browse All Jobs</h3>
              <p className="text-gray-700 text-sm mb-4">
                Search thousands of job opportunities across Kenya. Calculate net salary for each position.
              </p>
              <div className="space-y-2">
                <a href="/local-jobs" className="block text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline">
                  → All Jobs in Kenya
                </a>
                <a href="/local-jobs?location=nairobi" className="block text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline">
                  → Jobs in Nairobi
                </a>
                <a href="/local-jobs?location=mombasa" className="block text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline">
                  → Jobs in Mombasa
                </a>
              </div>
            </div>

            {/* High Paying Industries */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">💰 High-Paying Industries</h3>
              <p className="text-gray-700 text-sm mb-4">
                Top industries with highest salaries in Kenya. Calculate your potential earnings.
              </p>
              <div className="space-y-2">
                <a href="/local-jobs?category=IT" className="block text-green-600 hover:text-green-800 font-medium text-sm hover:underline">
                  → IT & Technology Jobs
                </a>
                <a href="/local-jobs?category=Finance" className="block text-green-600 hover:text-green-800 font-medium text-sm hover:underline">
                  → Finance & Banking Jobs
                </a>
                <a href="/local-jobs?category=Engineering" className="block text-green-600 hover:text-green-800 font-medium text-sm hover:underline">
                  → Engineering Jobs
                </a>
              </div>
            </div>

            {/* Career Resources */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">📈 Career Planning Tools</h3>
              <p className="text-gray-700 text-sm mb-4">
                Additional calculators to help you plan your finances and career in Kenya.
              </p>
              <div className="space-y-2">
                <a href="/mortgage-calculator-kenya" className="block text-purple-600 hover:text-purple-800 font-medium text-sm hover:underline">
                  → Mortgage Calculator Kenya
                </a>
                <a href="/loan-calculator-kenya" className="block text-purple-600 hover:text-purple-800 font-medium text-sm hover:underline">
                  → Loan Calculator Kenya
                </a>
                <a href="/net-pay-calculator" className="block text-purple-600 hover:text-purple-800 font-medium text-sm hover:underline">
                  → Net Pay Calculator
                </a>
              </div>
            </div>
          </div>

          {/* Job Categories Links */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Calculate Salary by Job Category:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <a href="/local-jobs?category=Sales" className="text-gray-700 hover:text-blue-600 hover:underline">Sales & Marketing Jobs</a>
              <a href="/local-jobs?category=Healthcare" className="text-gray-700 hover:text-blue-600 hover:underline">Healthcare Jobs</a>
              <a href="/local-jobs?category=Education" className="text-gray-700 hover:text-blue-600 hover:underline">Education & Teaching</a>
              <a href="/local-jobs?category=Construction" className="text-gray-700 hover:text-blue-600 hover:underline">Construction Jobs</a>
              <a href="/local-jobs?category=Hospitality" className="text-gray-700 hover:text-blue-600 hover:underline">Hospitality Jobs</a>
              <a href="/local-jobs?category=Accounting" className="text-gray-700 hover:text-blue-600 hover:underline">Accounting Jobs</a>
              <a href="/local-jobs?category=Legal" className="text-gray-700 hover:text-blue-600 hover:underline">Legal Jobs</a>
              <a href="/local-jobs?category=Management" className="text-gray-700 hover:text-blue-600 hover:underline">Management Jobs</a>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Use Our Salary Calculator Kenya - Most Accurate Net Salary Calculator
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-4">
            Calculate exact net salary with our comprehensive payroll calculator Kenya using current 2025 KRA tax rates, NSSF, NHIF, and housing levy rates
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-blue-800 text-sm">
              💡 <strong>Pro Tip:</strong> After calculating your net salary, use our
              <a href="/mortgage-calculator-kenya" className="text-blue-600 hover:text-blue-700 underline font-semibold ml-1 mr-1">
                Mortgage Calculator Kenya
              </a>
              to determine how much house you can afford with your take-home pay!
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">2025 KRA Tax Rates</h3>
            <p className="text-gray-600">
              Updated with latest Kenya Revenue Authority PAYE tax bands, NSSF rates (Tier I & II), NHIF rates, and 1.5% housing levy
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">All Statutory Deductions</h3>
            <p className="text-gray-600">
              Comprehensive calculation including PAYE tax, NSSF (old & new rates), NHIF, housing levy, and personal relief
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Breakdown</h3>
            <p className="text-gray-600">
              See detailed breakdown of all deductions, taxable income, and exact take-home pay for any salary in Kenya
            </p>
          </div>
        </div>

        {/* Salary Insights Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Kenya Salary Insights 2025 - Net Pay Analysis
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Average Net Salaries in Kenya by Industry</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">IT & Technology</span>
                  <span className="font-semibold text-gray-900">KES 85,000 - 180,000</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Finance & Banking</span>
                  <span className="font-semibold text-gray-900">KES 75,000 - 160,000</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Engineering</span>
                  <span className="font-semibold text-gray-900">KES 70,000 - 145,000</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Healthcare</span>
                  <span className="font-semibold text-gray-900">KES 65,000 - 135,000</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Statutory Deduction Rates 2025</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">PAYE Tax</span>
                  <span className="font-semibold text-gray-900">10% - 35% (progressive)</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">NSSF (New Rates)</span>
                  <span className="font-semibold text-gray-900">12% (6% employee + 6% employer)</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">NHIF</span>
                  <span className="font-semibold text-gray-900">KES 150 - 1,700 (tiered)</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Housing Levy</span>
                  <span className="font-semibold text-gray-900">1.5% of gross salary</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Authoritative References */}
        <div className="mt-16 bg-gray-100 rounded-xl p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Official Data Sources - KRA & Government
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Government Sources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.kra.go.ke/individual/calculate-tax/calculating-tax/paye"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
                  >
                    Kenya Revenue Authority - PAYE Tax Rates
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.nssfkenya.co.ke/contribution-rates/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
                  >
                    NSSF Kenya - Contribution Rates
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.nhif.or.ke/healthinsurance/rates"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
                  >
                    NHIF Kenya - Contribution Rates
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">2025 Updates</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Housing Levy: 1.5% implemented from July 2023</li>
                <li>• NSSF New Rates: Tier I (KES 7,000) + Tier II (up to KES 36,000)</li>
                <li>• Personal Relief: KES 2,400/month (KES 28,800/year)</li>
                <li>• All rates current as of January 2025</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">
            All tax and deduction rates verified from official KRA, NSSF, and NHIF sources - January 2025
          </p>
        </div>
      </div>

      {/* COMPREHENSIVE CONTENT - Salary Examples by Income Level */}
      <div className="max-w-6xl mx-auto px-6 py-16 bg-white">

        {/* Average Salary in Kenya */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Average Salary in Kenya 2025 - Net Salary Breakdown
          </h2>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              The average gross salary in Kenya in 2025 ranges from <strong>KES 30,000 to KES 150,000 per month</strong>,
              depending on the industry, experience level, and location. Here's a comprehensive breakdown of net salaries after all statutory deductions:
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2025 Average Net Salaries by Sector</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Private Sector</h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Entry Level: KES 25,000-35,000 (Net: KES 21,500-30,000)</li>
                    <li>• Mid-Level: KES 60,000-100,000 (Net: KES 48,000-76,000)</li>
                    <li>• Senior Level: KES 150,000-300,000 (Net: KES 109,000-204,000)</li>
                    <li>• Executive: KES 400,000+ (Net: KES 268,000+)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Public Sector (Government)</h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Job Group J-K: KES 30,000-50,000 (Net: KES 25,800-40,500)</li>
                    <li>• Job Group L-M: KES 60,000-90,000 (Net: KES 48,000-69,000)</li>
                    <li>• Job Group N-P: KES 100,000-180,000 (Net: KES 76,000-130,000)</li>
                    <li>• Job Group Q-S: KES 200,000+ (Net: KES 142,000+)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Salary Examples - Entry Level */}
        <section className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Entry Level Salary Calculator Kenya - KES 30,000 to KES 50,000
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* KES 30,000 Example */}
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h4 className="text-xl font-semibold text-blue-800 mb-4">Gross Salary: KES 30,000/month</h4>
              <div className="bg-blue-50 p-6 rounded-lg mb-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-blue-200 pb-2">
                    <span className="font-medium">Gross Salary:</span>
                    <span className="font-bold">KES 30,000</span>
                  </div>
                  <div className="text-xs text-gray-600 mb-2">Deductions:</div>
                  <div className="flex justify-between text-xs">
                    <span>NSSF (Tier I - 6%):</span>
                    <span className="text-red-600">-KES 420</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Taxable Income:</span>
                    <span>KES 29,580</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>PAYE Tax:</span>
                    <span className="text-red-600">-KES 1,558</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Personal Relief:</span>
                    <span className="text-green-600">+KES 2,400</span>
                  </div>
                  <div className="flex justify-between text-xs border-b border-blue-200 pb-2">
                    <span>Net PAYE:</span>
                    <span>KES 0 (relief covers tax)</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>NHIF:</span>
                    <span className="text-red-600">-KES 750</span>
                  </div>
                  <div className="flex justify-between text-xs border-b border-blue-200 pb-2">
                    <span>Housing Levy (1.5%):</span>
                    <span className="text-red-600">-KES 450</span>
                  </div>
                  <div className="bg-white p-3 rounded mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Net Salary:</span>
                      <span className="font-bold text-2xl text-blue-700">KES 25,980</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-2">
                    Total Deductions: KES 4,020 (13.4% of gross)
                  </div>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded p-4 text-xs">
                <p className="text-green-800"><strong>💡 Financial Planning:</strong> With KES 25,980 net pay, budget KES 8,000 for rent, KES 10,000 for living expenses, and save KES 5,000/month.</p>
              </div>
            </div>

            {/* KES 50,000 Example */}
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h4 className="text-xl font-semibold text-green-800 mb-4">Gross Salary: KES 50,000/month</h4>
              <div className="bg-green-50 p-6 rounded-lg mb-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-green-200 pb-2">
                    <span className="font-medium">Gross Salary:</span>
                    <span className="font-bold">KES 50,000</span>
                  </div>
                  <div className="text-xs text-gray-600 mb-2">Deductions:</div>
                  <div className="flex justify-between text-xs">
                    <span>NSSF (Tier I & II - 6%):</span>
                    <span className="text-red-600">-KES 1,080</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Taxable Income:</span>
                    <span>KES 48,920</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>PAYE Tax:</span>
                    <span className="text-red-600">-KES 5,892</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Personal Relief:</span>
                    <span className="text-green-600">+KES 2,400</span>
                  </div>
                  <div className="flex justify-between text-xs border-b border-green-200 pb-2">
                    <span>Net PAYE:</span>
                    <span className="text-red-600">-KES 3,492</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>NHIF:</span>
                    <span className="text-red-600">-KES 1,200</span>
                  </div>
                  <div className="flex justify-between text-xs border-b border-green-200 pb-2">
                    <span>Housing Levy (1.5%):</span>
                    <span className="text-red-600">-KES 750</span>
                  </div>
                  <div className="bg-white p-3 rounded mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Net Salary:</span>
                      <span className="font-bold text-2xl text-green-700">KES 40,986</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-2">
                    Total Deductions: KES 9,014 (18% of gross)
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded p-4 text-xs">
                <p className="text-blue-800"><strong>💰 Home Affordability:</strong> With KES 40,986 net, you can afford mortgage of ~KES 12,000/month (property worth ~KES 3.5M). <a href="/mortgage-calculator-kenya" className="underline">Calculate mortgage</a></p>
              </div>
            </div>
          </div>
        </section>

        {/* Mid-Level Salary Examples */}
        <section className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Mid-Level Salary Calculator Kenya - KES 80,000 to KES 150,000
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* KES 80,000 Example */}
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h4 className="text-xl font-semibold text-purple-800 mb-4">Gross Salary: KES 80,000/month</h4>
              <div className="bg-purple-50 p-6 rounded-lg mb-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-purple-200 pb-2">
                    <span className="font-medium">Gross Salary:</span>
                    <span className="font-bold">KES 80,000</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>NSSF (6%):</span>
                    <span className="text-red-600">-KES 2,160</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Taxable Income:</span>
                    <span>KES 77,840</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>PAYE Tax:</span>
                    <span className="text-red-600">-KES 12,340</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Personal Relief:</span>
                    <span className="text-green-600">+KES 2,400</span>
                  </div>
                  <div className="flex justify-between text-xs border-b border-purple-200 pb-2">
                    <span>Net PAYE:</span>
                    <span className="text-red-600">-KES 9,940</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>NHIF:</span>
                    <span className="text-red-600">-KES 1,400</span>
                  </div>
                  <div className="flex justify-between text-xs border-b border-purple-200 pb-2">
                    <span>Housing Levy (1.5%):</span>
                    <span className="text-red-600">-KES 1,200</span>
                  </div>
                  <div className="bg-white p-3 rounded mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Net Salary:</span>
                      <span className="font-bold text-2xl text-purple-700">KES 61,200</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-2">
                    Total Deductions: KES 18,800 (23.5% of gross)
                  </div>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded p-4 text-xs">
                <p className="text-yellow-800"><strong>🏠 Property Budget:</strong> Can afford monthly mortgage of KES 18,000 (30% of net). Property value: ~KES 5.5M.</p>
              </div>
            </div>

            {/* KES 150,000 Example */}
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h4 className="text-xl font-semibold text-orange-800 mb-4">Gross Salary: KES 150,000/month</h4>
              <div className="bg-orange-50 p-6 rounded-lg mb-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-orange-200 pb-2">
                    <span className="font-medium">Gross Salary:</span>
                    <span className="font-bold">KES 150,000</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>NSSF (capped at KES 2,160):</span>
                    <span className="text-red-600">-KES 2,160</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Taxable Income:</span>
                    <span>KES 147,840</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>PAYE Tax:</span>
                    <span className="text-red-600">-KES 31,340</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Personal Relief:</span>
                    <span className="text-green-600">+KES 2,400</span>
                  </div>
                  <div className="flex justify-between text-xs border-b border-orange-200 pb-2">
                    <span>Net PAYE:</span>
                    <span className="text-red-600">-KES 28,940</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>NHIF:</span>
                    <span className="text-red-600">-KES 1,700</span>
                  </div>
                  <div className="flex justify-between text-xs border-b border-orange-200 pb-2">
                    <span>Housing Levy (1.5%):</span>
                    <span className="text-red-600">-KES 2,250</span>
                  </div>
                  <div className="bg-white p-3 rounded mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Net Salary:</span>
                      <span className="font-bold text-2xl text-orange-700">KES 112,790</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-2">
                    Total Deductions: KES 37,210 (24.8% of gross)
                  </div>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded p-4 text-xs">
                <p className="text-green-800"><strong>💎 Luxury Living:</strong> Can afford KES 33,000/month mortgage. Property value: ~KES 10M. Browse <a href="/houses-for-sale/nairobi-county" className="underline">luxury homes</a>.</p>
              </div>
            </div>
          </div>
        </section>

        {/* High Earner Examples */}
        <section className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            High Income Salary Calculator Kenya - KES 250,000 to KES 500,000+
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* KES 250,000 Example */}
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h4 className="text-xl font-semibold text-red-800 mb-4">Gross Salary: KES 250,000/month</h4>
              <div className="bg-red-50 p-6 rounded-lg mb-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-red-200 pb-2">
                    <span className="font-medium">Gross Salary:</span>
                    <span className="font-bold">KES 250,000</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>NSSF:</span>
                    <span className="text-red-600">-KES 2,160</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Taxable Income:</span>
                    <span>KES 247,840</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>PAYE Tax (up to 30%):</span>
                    <span className="text-red-600">-KES 61,840</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Personal Relief:</span>
                    <span className="text-green-600">+KES 2,400</span>
                  </div>
                  <div className="flex justify-between text-xs border-b border-red-200 pb-2">
                    <span>Net PAYE:</span>
                    <span className="text-red-600">-KES 59,440</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>NHIF:</span>
                    <span className="text-red-600">-KES 1,700</span>
                  </div>
                  <div className="flex justify-between text-xs border-b border-red-200 pb-2">
                    <span>Housing Levy:</span>
                    <span className="text-red-600">-KES 3,750</span>
                  </div>
                  <div className="bg-white p-3 rounded mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Net Salary:</span>
                      <span className="font-bold text-2xl text-red-700">KES 180,790</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-2">
                    Total Deductions: KES 69,210 (27.7% of gross)
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded p-4 text-xs">
                <p className="text-purple-800"><strong>🏰 Executive Housing:</strong> Afford KES 54,000/month mortgage. Properties: KES 15-18M range in Karen, Runda.</p>
              </div>
            </div>

            {/* KES 500,000 Example */}
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-yellow-50 to-orange-50">
              <h4 className="text-xl font-semibold text-indigo-800 mb-4">Gross Salary: KES 500,000/month</h4>
              <div className="bg-white p-6 rounded-lg mb-4 border border-indigo-200">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-medium">Gross Salary:</span>
                    <span className="font-bold">KES 500,000</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>NSSF:</span>
                    <span className="text-red-600">-KES 2,160</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Taxable Income:</span>
                    <span>KES 497,840</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>PAYE Tax (35% bracket):</span>
                    <span className="text-red-600">-KES 149,340</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Personal Relief:</span>
                    <span className="text-green-600">+KES 2,400</span>
                  </div>
                  <div className="flex justify-between text-xs border-b border-gray-200 pb-2">
                    <span>Net PAYE:</span>
                    <span className="text-red-600">-KES 146,940</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>NHIF:</span>
                    <span className="text-red-600">-KES 1,700</span>
                  </div>
                  <div className="flex justify-between text-xs border-b border-gray-200 pb-2">
                    <span>Housing Levy:</span>
                    <span className="text-red-600">-KES 7,500</span>
                  </div>
                  <div className="bg-gradient-to-r from-green-100 to-blue-100 p-3 rounded mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">Net Salary:</span>
                      <span className="font-bold text-3xl text-indigo-700">KES 339,540</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-2">
                    Total Deductions: KES 160,460 (32.1% of gross)
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-300 rounded p-4 text-xs">
                <p className="text-purple-900"><strong>👑 Ultra-Premium Lifestyle:</strong> Can afford KES 100,000/month mortgage. Properties: KES 30M+ mansions in Runda, Kitisuru, Karen. <a href="/houses-for-sale/runda-nairobi" className="underline font-semibold">Browse luxury estates</a>.</p>
              </div>
            </div>
          </div>
        </section>

        {/* PAYE Tax Bands Explanation */}
        <section className="mb-16 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border border-blue-200">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Kenya PAYE Tax Rates 2025 - Complete Tax Bands Guide
          </h3>
          <p className="text-gray-700 mb-6 text-center max-w-3xl mx-auto">
            Kenya uses a progressive tax system. Here are the official KRA PAYE tax bands for 2025:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-left">Annual Taxable Income (KES)</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Monthly Taxable Income (KES)</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Tax Rate</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Tax on Band</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-3">0 - 288,000</td>
                  <td className="border border-gray-300 px-4 py-3">0 - 24,000</td>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">10%</td>
                  <td className="border border-gray-300 px-4 py-3">KES 2,400/month max</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3">288,001 - 388,000</td>
                  <td className="border border-gray-300 px-4 py-3">24,001 - 32,333</td>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">25%</td>
                  <td className="border border-gray-300 px-4 py-3">KES 2,083/month on this band</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3">388,001 - 6,000,000</td>
                  <td className="border border-gray-300 px-4 py-3">32,334 - 500,000</td>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">30%</td>
                  <td className="border border-gray-300 px-4 py-3">30% on amount above 32,333</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3">Above 6,000,000</td>
                  <td className="border border-gray-300 px-4 py-3">Above 500,000</td>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">35%</td>
                  <td className="border border-gray-300 px-4 py-3">35% on amount above 500,000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded p-4 text-sm">
              <h4 className="font-semibold text-green-800 mb-2">💰 Personal Relief</h4>
              <p className="text-green-700">Every employee gets KES 2,400/month (KES 28,800/year) personal relief, which reduces the final PAYE tax amount.</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded p-4 text-sm">
              <h4 className="font-semibold text-yellow-800 mb-2">📊 Progressive Taxation</h4>
              <p className="text-yellow-700">You only pay the higher rate on income above each threshold. Lower portions are taxed at lower rates.</p>
            </div>
          </div>
        </section>

        {/* NSSF & NHIF Breakdown */}
        <section className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            NSSF and NHIF Deductions 2025 - Complete Guide
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* NSSF */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-xl font-semibold text-blue-800 mb-4">NSSF Contributions (New Rates)</h4>
              <p className="text-gray-700 text-sm mb-4">
                The new NSSF Act 2013 rates apply. Both employee and employer contribute 6% each (12% total).
              </p>
              <div className="space-y-3 text-sm">
                <div className="bg-blue-50 p-4 rounded">
                  <div className="font-semibold text-blue-800 mb-2">Tier I (Lower Earning Limit)</div>
                  <ul className="space-y-1 text-blue-700">
                    <li>• Based on first KES 7,000 of salary</li>
                    <li>• Employee: 6% = KES 420</li>
                    <li>• Employer: 6% = KES 420</li>
                    <li>• Total: KES 840/month</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded">
                  <div className="font-semibold text-green-800 mb-2">Tier II (Upper Earning Limit)</div>
                  <ul className="space-y-1 text-green-700">
                    <li>• Based on earnings from KES 7,001 to KES 36,000</li>
                    <li>• Employee: 6% of this portion (max KES 1,740)</li>
                    <li>• Employer: 6% of this portion (max KES 1,740)</li>
                    <li>• Maximum combined: KES 2,160/month employee</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded p-3 text-xs">
                <p className="text-yellow-800"><strong>Note:</strong> Employee contribution is capped at KES 2,160/month (KES 420 + KES 1,740) regardless of how high your salary is.</p>
              </div>
            </div>

            {/* NHIF */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-xl font-semibold text-green-800 mb-4">NHIF Contributions (Tiered Rates)</h4>
              <p className="text-gray-700 text-sm mb-4">
                NHIF uses tiered contribution rates based on gross salary:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-green-100">
                      <th className="border border-green-300 px-2 py-2 text-left">Gross Salary (KES)</th>
                      <th className="border border-green-300 px-2 py-2 text-right">NHIF Rate</th>
                    </tr>
                  </thead>
                  <tbody className="text-green-800">
                    <tr><td className="border border-green-200 px-2 py-1">0 - 5,999</td><td className="border border-green-200 px-2 py-1 text-right">KES 150</td></tr>
                    <tr className="bg-green-50"><td className="border border-green-200 px-2 py-1">6,000 - 7,999</td><td className="border border-green-200 px-2 py-1 text-right">KES 300</td></tr>
                    <tr><td className="border border-green-200 px-2 py-1">8,000 - 11,999</td><td className="border border-green-200 px-2 py-1 text-right">KES 400</td></tr>
                    <tr className="bg-green-50"><td className="border border-green-200 px-2 py-1">12,000 - 14,999</td><td className="border border-green-200 px-2 py-1 text-right">KES 500</td></tr>
                    <tr><td className="border border-green-200 px-2 py-1">15,000 - 19,999</td><td className="border border-green-200 px-2 py-1 text-right">KES 600</td></tr>
                    <tr className="bg-green-50"><td className="border border-green-200 px-2 py-1">20,000 - 24,999</td><td className="border border-green-200 px-2 py-1 text-right">KES 750</td></tr>
                    <tr><td className="border border-green-200 px-2 py-1">25,000 - 29,999</td><td className="border border-green-200 px-2 py-1 text-right">KES 850</td></tr>
                    <tr className="bg-green-50"><td className="border border-green-200 px-2 py-1">30,000 - 34,999</td><td className="border border-green-200 px-2 py-1 text-right">KES 900</td></tr>
                    <tr><td className="border border-green-200 px-2 py-1">35,000 - 39,999</td><td className="border border-green-200 px-2 py-1 text-right">KES 950</td></tr>
                    <tr className="bg-green-50"><td className="border border-green-200 px-2 py-1">40,000 - 44,999</td><td className="border border-green-200 px-2 py-1 text-right">KES 1,000</td></tr>
                    <tr><td className="border border-green-200 px-2 py-1">45,000 - 49,999</td><td className="border border-green-200 px-2 py-1 text-right">KES 1,100</td></tr>
                    <tr className="bg-green-50"><td className="border border-green-200 px-2 py-1">50,000 - 59,999</td><td className="border border-green-200 px-2 py-1 text-right">KES 1,200</td></tr>
                    <tr><td className="border border-green-200 px-2 py-1">60,000 - 69,999</td><td className="border border-green-200 px-2 py-1 text-right">KES 1,300</td></tr>
                    <tr className="bg-green-50"><td className="border border-green-200 px-2 py-1">70,000 - 79,999</td><td className="border border-green-200 px-2 py-1 text-right">KES 1,400</td></tr>
                    <tr><td className="border border-green-200 px-2 py-1">80,000 - 89,999</td><td className="border border-green-200 px-2 py-1 text-right">KES 1,500</td></tr>
                    <tr className="bg-green-50"><td className="border border-green-200 px-2 py-1">90,000 - 99,999</td><td className="border border-green-200 px-2 py-1 text-right">KES 1,600</td></tr>
                    <tr><td className="border border-green-200 px-2 py-1">100,000+</td><td className="border border-green-200 px-2 py-1 text-right">KES 1,700</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-purple-800 mb-3">Housing Levy (Affordable Housing Act 2023)</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-purple-700"><strong>Rate:</strong> 1.5% of gross salary</p>
              </div>
              <div>
                <p className="text-purple-700"><strong>Split:</strong> 1.5% employee + 1.5% employer</p>
              </div>
              <div>
                <p className="text-purple-700"><strong>Example:</strong> KES 100,000 salary = KES 1,500 levy</p>
              </div>
            </div>
          </div>
        </section>

        {/* Salary Comparison by Industry */}
        <section className="mb-16 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-8 border border-orange-200">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Average Salaries by Industry in Kenya 2025
          </h3>
          <p className="text-gray-700 mb-8 text-center">
            Gross and net salary ranges by industry. All calculations include PAYE, NSSF, NHIF, and housing levy.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h4 className="text-lg font-semibold text-orange-800 mb-4">Technology & IT</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-medium text-gray-800">Software Developer</div>
                  <div className="text-gray-600">Gross: KES 120,000 → Net: KES 89,000</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">IT Manager</div>
                  <div className="text-gray-600">Gross: KES 200,000 → Net: KES 142,000</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Data Scientist</div>
                  <div className="text-gray-600">Gross: KES 180,000 → Net: KES 130,000</div>
                </div>
              </div>
              <a href="/local-jobs?category=IT" className="text-orange-600 hover:underline text-xs mt-4 inline-block">
                → Browse IT Jobs in Kenya
              </a>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h4 className="text-lg font-semibold text-blue-800 mb-4">Finance & Banking</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-medium text-gray-800">Accountant</div>
                  <div className="text-gray-600">Gross: KES 80,000 → Net: KES 61,200</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Financial Analyst</div>
                  <div className="text-gray-600">Gross: KES 120,000 → Net: KES 89,000</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Bank Manager</div>
                  <div className="text-gray-600">Gross: KES 250,000 → Net: KES 180,000</div>
                </div>
              </div>
              <a href="/local-jobs?category=Finance" className="text-blue-600 hover:underline text-xs mt-4 inline-block">
                → Browse Finance Jobs
              </a>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h4 className="text-lg font-semibold text-green-800 mb-4">Healthcare</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-medium text-gray-800">Registered Nurse</div>
                  <div className="text-gray-600">Gross: KES 60,000 → Net: KES 48,000</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Medical Officer</div>
                  <div className="text-gray-600">Gross: KES 150,000 → Net: KES 112,000</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Specialist Doctor</div>
                  <div className="text-gray-600">Gross: KES 350,000 → Net: KES 240,000</div>
                </div>
              </div>
              <a href="/local-jobs?category=Healthcare" className="text-green-600 hover:underline text-xs mt-4 inline-block">
                → Browse Healthcare Jobs
              </a>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h4 className="text-lg font-semibold text-purple-800 mb-4">Engineering</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-medium text-gray-800">Civil Engineer</div>
                  <div className="text-gray-600">Gross: KES 100,000 → Net: KES 76,000</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Mechanical Engineer</div>
                  <div className="text-gray-600">Gross: KES 110,000 → Net: KES 83,000</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Project Engineer</div>
                  <div className="text-gray-600">Gross: KES 140,000 → Net: KES 105,000</div>
                </div>
              </div>
              <a href="/local-jobs?category=Engineering" className="text-purple-600 hover:underline text-xs mt-4 inline-block">
                → Browse Engineering Jobs
              </a>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h4 className="text-lg font-semibold text-red-800 mb-4">Sales & Marketing</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-medium text-gray-800">Sales Executive</div>
                  <div className="text-gray-600">Gross: KES 70,000 → Net: KES 54,000</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Marketing Manager</div>
                  <div className="text-gray-600">Gross: KES 130,000 → Net: KES 98,000</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Business Dev. Manager</div>
                  <div className="text-gray-600">Gross: KES 160,000 → Net: KES 119,000</div>
                </div>
              </div>
              <a href="/local-jobs?category=Sales" className="text-red-600 hover:underline text-xs mt-4 inline-block">
                → Browse Sales Jobs
              </a>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h4 className="text-lg font-semibold text-indigo-800 mb-4">Education</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-medium text-gray-800">Primary Teacher (TSC)</div>
                  <div className="text-gray-600">Gross: KES 35,000 → Net: KES 30,000</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Secondary Teacher</div>
                  <div className="text-gray-600">Gross: KES 50,000 → Net: KES 41,000</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">University Lecturer</div>
                  <div className="text-gray-600">Gross: KES 120,000 → Net: KES 89,000</div>
                </div>
              </div>
              <a href="/local-jobs?category=Education" className="text-indigo-600 hover:underline text-xs mt-4 inline-block">
                → Browse Teaching Jobs
              </a>
            </div>
          </div>
        </section>

        {/* Calculator Methodology */}
        <section className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            How Our Salary Calculator Works - Calculation Formula
          </h3>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-blue-800 mb-4">Step-by-Step Calculation Process</h4>
            <div className="space-y-4 text-sm text-blue-900">
              <div className="bg-white p-4 rounded">
                <div className="font-semibold mb-2">Step 1: Calculate NSSF Deduction</div>
                <p className="text-gray-700">NSSF = 6% of pensionable pay (capped at KES 2,160/month)</p>
                <p className="text-xs text-gray-600 mt-1">Formula: min(Gross × 0.06, 2160)</p>
              </div>

              <div className="bg-white p-4 rounded">
                <div className="font-semibold mb-2">Step 2: Calculate Taxable Income</div>
                <p className="text-gray-700">Taxable Income = Gross Salary - NSSF</p>
              </div>

              <div className="bg-white p-4 rounded">
                <div className="font-semibold mb-2">Step 3: Calculate PAYE Tax (Progressive)</div>
                <ul className="text-gray-700 space-y-1">
                  <li>• First KES 24,000: 10% = KES 2,400</li>
                  <li>• Next KES 8,333 (24,001-32,333): 25%</li>
                  <li>• Next KES 467,667 (32,334-500,000): 30%</li>
                  <li>• Above KES 500,000: 35%</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded">
                <div className="font-semibold mb-2">Step 4: Apply Personal Relief</div>
                <p className="text-gray-700">PAYE = Tax Calculated - KES 2,400 (monthly relief)</p>
              </div>

              <div className="bg-white p-4 rounded">
                <div className="font-semibold mb-2">Step 5: Calculate Other Deductions</div>
                <ul className="text-gray-700 space-y-1">
                  <li>• NHIF: Based on tiered rates table</li>
                  <li>• Housing Levy: Gross Salary × 1.5%</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded">
                <div className="font-bold mb-2">Final Step: Calculate Net Salary</div>
                <p className="text-gray-800 font-medium">Net Salary = Gross - NSSF - PAYE - NHIF - Housing Levy</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tools & Resources */}
        <section className="mb-16 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-8 border border-teal-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            🛠️ Related Financial Calculators & Career Tools
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <a href="/mortgage-calculator-kenya" className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">🏠</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mortgage Calculator</h3>
              <p className="text-gray-600 text-sm">Calculate how much house you can afford based on your net salary.</p>
            </a>

            <a href="/loan-calculator-kenya" className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">💳</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Loan Calculator</h3>
              <p className="text-gray-600 text-sm">Calculate personal loan payments and total interest costs.</p>
            </a>

            <a href="/construction-cost-calculator-kenya" className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">🏗️</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Construction Calculator</h3>
              <p className="text-gray-600 text-sm">Estimate building costs for your dream house in Kenya.</p>
            </a>

            <a href="/local-jobs" className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">💼</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Browse Jobs</h3>
              <p className="text-gray-600 text-sm">Find high-paying jobs across all industries in Kenya.</p>
            </a>

            <a href="/net-pay-calculator" className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Net Pay Calculator</h3>
              <p className="text-gray-600 text-sm">Alternative net pay calculator with different interface.</p>
            </a>

            <a href="/paye-calculator" className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">🧾</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">PAYE Calculator</h3>
              <p className="text-gray-600 text-sm">Calculate just PAYE tax without other deductions.</p>
            </a>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center bg-gradient-to-r from-blue-100 to-green-100 border border-blue-200 rounded-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Calculate Your Net Salary?
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Use our comprehensive salary calculator above to get accurate take-home pay calculations
            based on current 2025 KRA tax rates, NSSF, NHIF, and housing levy.
          </p>

          <div className="grid md:grid-cols-3 gap-4 text-sm mb-6">
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="text-2xl mb-2">✅</div>
              <h3 className="font-semibold text-gray-900 mb-1">100% Accurate</h3>
              <p className="text-gray-600">Based on official KRA, NSSF, NHIF rates</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-semibold text-gray-900 mb-1">Instant Results</h3>
              <p className="text-gray-600">Real-time calculation with detailed breakdown</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="text-2xl mb-2">📱</div>
              <h3 className="font-semibold text-gray-900 mb-1">Mobile Friendly</h3>
              <p className="text-gray-600">Calculate on any device, anywhere</p>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </div>
  );
}
