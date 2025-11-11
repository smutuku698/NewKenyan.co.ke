import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import KenyaPAYECalculator from '../net-pay-calculator/KenyaPAYECalculator';
import { ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: "PAYE Calculator Kenya 2025 | KRA Tax Calculator | Salary Tax Calculator Kenya",
  description: "Use our comprehensive PAYE calculator Kenya to calculate your income tax using official KRA rates for 2025. Free PAYE tax calculator with NSSF, SHIF, Housing Levy - get accurate Kenya salary tax calculations instantly.",
  keywords: "paye calculator, paye calculator kenya, kra paye calculator, kenya paye calculator, salary tax calculator kenya, income tax calculator kenya, paye tax calculator, kra tax calculator, kenya tax calculator 2025, paye calculation kenya, how to calculate paye kenya",
  openGraph: {
    title: "PAYE Calculator Kenya 2025 | KRA Tax Calculator | Free PAYE Calculation Tool",
    description: "Calculate your PAYE tax in Kenya with our comprehensive PAYE calculator. Based on official KRA rates for 2025 including NSSF, SHIF, and Housing Levy deductions.",
    url: "https://newkenyan.com/paye-calculator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PAYE Calculator Kenya 2025 | KRA PAYE Tax Calculator",
    description: "Free PAYE calculator for Kenya. Calculate your income tax using official 2025 KRA rates with NSSF, SHIF, and Housing Levy.",
  },
  alternates: {
    canonical: "https://newkenyan.com/paye-calculator",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PAYECalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* SEO Optimized Header Section */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 border-b">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              PAYE Calculator Kenya 2025 - Free KRA Tax Calculator
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
              Calculate Your Kenya PAYE Tax with Official 2025 KRA Rates
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
              Use our comprehensive PAYE calculator Kenya to calculate your exact income tax based on KRA rates for 2025.
              This free PAYE tax calculator includes all statutory deductions: NSSF, SHIF (Social Health Insurance), and Housing Levy.
              Get accurate Kenya salary tax calculations instantly with our KRA PAYE calculator.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium">PAYE Calculator</span>
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">KRA Tax Calculator</span>
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium">2025 Tax Rates</span>
              <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-medium">Free Calculator</span>
              <span className="bg-red-100 text-red-800 px-4 py-2 rounded-full font-medium">Instant Results</span>
            </div>
          </div>
        </div>
      </div>

      {/* PAYE Calculator Component */}
      <div id="calculator">
        <KenyaPAYECalculator />
      </div>

      {/* What is PAYE Section - Comprehensive */}
      <div className="max-w-6xl mx-auto px-6 py-16 bg-white">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          What is PAYE Tax in Kenya? Complete Guide to PAYE Calculator Kenya
        </h2>

        <div className="prose max-w-none">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-green-800 mb-4">Understanding PAYE Tax Kenya</h3>
              <p className="text-gray-700 mb-4">
                <strong>PAYE (Pay As You Earn)</strong> is the income tax system in Kenya where employers deduct tax from employees' salaries before payment.
                Our PAYE calculator Kenya helps you determine exactly how much tax KRA (Kenya Revenue Authority) will deduct from your monthly salary.
              </p>
              <p className="text-gray-700 mb-4">
                The PAYE tax calculation in Kenya uses a <strong>progressive tax system</strong> with 5 tax bands ranging from 10% to 35%.
                This PAYE calculator automatically applies the correct KRA tax rates for 2025 based on your gross salary.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Introduced:</strong> 1973 as the main income tax collection method</li>
                <li>• <strong>Managed by:</strong> Kenya Revenue Authority (KRA)</li>
                <li>• <strong>Payment Frequency:</strong> Monthly deductions from salary</li>
                <li>• <strong>Deadline:</strong> Employers must remit by 9th of following month</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">How to Calculate PAYE in Kenya</h3>
              <p className="text-gray-700 mb-4">
                Our Kenya PAYE calculator follows the official KRA method for PAYE calculation:
              </p>
              <div className="space-y-3">
                <div className="border-l-4 border-green-400 pl-4">
                  <h4 className="font-semibold text-green-800">Step 1: Calculate Taxable Income</h4>
                  <p className="text-sm text-gray-600">Gross Salary - NSSF Contribution - Pension = Taxable Income</p>
                </div>

                <div className="border-l-4 border-yellow-400 pl-4">
                  <h4 className="font-semibold text-yellow-800">Step 2: Apply Progressive Tax Rates</h4>
                  <p className="text-sm text-gray-600">Calculate tax using 5-tier system (10%, 25%, 30%, 32.5%, 35%)</p>
                </div>

                <div className="border-l-4 border-blue-400 pl-4">
                  <h4 className="font-semibold text-blue-800">Step 3: Apply Personal Relief</h4>
                  <p className="text-sm text-gray-600">Deduct KES 2,400 monthly personal relief from PAYE tax</p>
                </div>

                <div className="border-l-4 border-purple-400 pl-4">
                  <h4 className="font-semibold text-purple-800">Step 4: Add Other Deductions</h4>
                  <p className="text-sm text-gray-600">Add SHIF (2.75%) and Housing Levy (1.5%)</p>
                </div>
              </div>
            </div>
          </div>

          {/* 2025 PAYE Tax Rates Table */}
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Kenya PAYE Tax Rates 2025 - Official KRA Tax Bands
            </h3>
            <p className="text-gray-700 mb-6 text-center">
              These are the official PAYE tax rates used by our PAYE calculator Kenya for 2025 tax calculations.
              All rates are as per Finance Act 2023 effective July 1, 2023.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-3 text-left">Monthly Income Band (KES)</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Annual Income (KES)</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">PAYE Tax Rate</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Max Tax This Band</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">0 - 24,000</td>
                    <td className="border border-gray-300 px-4 py-3">0 - 288,000</td>
                    <td className="border border-gray-300 px-4 py-3 font-bold text-green-600">10%</td>
                    <td className="border border-gray-300 px-4 py-3">KES 2,400/month</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">24,001 - 32,333</td>
                    <td className="border border-gray-300 px-4 py-3">288,001 - 388,000</td>
                    <td className="border border-gray-300 px-4 py-3 font-bold text-yellow-600">25%</td>
                    <td className="border border-gray-300 px-4 py-3">KES 2,083/month</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">32,334 - 500,000</td>
                    <td className="border border-gray-300 px-4 py-3">388,001 - 6,000,000</td>
                    <td className="border border-gray-300 px-4 py-3 font-bold text-orange-600">30%</td>
                    <td className="border border-gray-300 px-4 py-3">KES 140,300/month</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">500,001 - 800,000</td>
                    <td className="border border-gray-300 px-4 py-3">6,000,001 - 9,600,000</td>
                    <td className="border border-gray-300 px-4 py-3 font-bold text-red-600">32.5%</td>
                    <td className="border border-gray-300 px-4 py-3">KES 97,500/month</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">Above 800,000</td>
                    <td className="border border-gray-300 px-4 py-3">Above 9,600,000</td>
                    <td className="border border-gray-300 px-4 py-3 font-bold text-purple-600">35%</td>
                    <td className="border border-gray-300 px-4 py-3">No limit</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-green-100 border border-green-300 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">🎯 Personal Relief (Tax Deduction)</h4>
              <p className="text-green-700 text-sm">
                <strong>KES 2,400 per month (KES 28,800 annually)</strong> is deducted from your calculated PAYE tax as personal relief.
                Our PAYE calculator automatically includes this relief in all calculations.
              </p>
            </div>
          </div>

          {/* PAYE Calculation Example */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              PAYE Calculation Example - How Our Kenya PAYE Calculator Works
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-blue-800 mb-4">Example 1: KES 50,000 Monthly Salary</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-blue-200 pb-2">
                    <span>Gross Salary</span>
                    <span className="font-semibold">KES 50,000</span>
                  </div>
                  <div className="flex justify-between border-b border-blue-200 pb-2">
                    <span>Less: NSSF (Tier I + II)</span>
                    <span className="text-red-600">-KES 3,000</span>
                  </div>
                  <div className="flex justify-between border-b border-blue-200 pb-2">
                    <span className="font-medium">Taxable Income</span>
                    <span className="font-semibold">KES 47,000</span>
                  </div>
                  <div className="bg-white p-3 rounded text-xs space-y-1">
                    <div className="flex justify-between">
                      <span>Tax on first KES 24,000 @ 10%:</span>
                      <span>KES 2,400</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax on next KES 8,333 @ 25%:</span>
                      <span>KES 2,083</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax on next KES 14,667 @ 30%:</span>
                      <span>KES 4,400</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t pt-1">
                      <span>Total Tax:</span>
                      <span>KES 8,883</span>
                    </div>
                  </div>
                  <div className="flex justify-between border-b border-blue-200 pb-2">
                    <span>Less: Personal Relief</span>
                    <span className="text-green-600">-KES 2,400</span>
                  </div>
                  <div className="flex justify-between border-b border-blue-200 pb-2">
                    <span className="font-bold">PAYE Tax Payable</span>
                    <span className="font-bold text-red-600">KES 6,483</span>
                  </div>
                  <div className="flex justify-between border-b border-blue-200 pb-2">
                    <span>SHIF (2.75%)</span>
                    <span className="text-red-600">-KES 1,375</span>
                  </div>
                  <div className="flex justify-between border-b border-blue-200 pb-2">
                    <span>Housing Levy (1.5%)</span>
                    <span className="text-red-600">-KES 750</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg bg-green-100 p-2 rounded">
                    <span>NET SALARY</span>
                    <span className="text-green-700">KES 37,392</span>
                  </div>
                </div>
                <a href="#calculator" className="text-blue-600 hover:underline text-sm mt-4 inline-block">
                  → Try this in our PAYE calculator above
                </a>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-purple-800 mb-4">Example 2: KES 150,000 Monthly Salary</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-purple-200 pb-2">
                    <span>Gross Salary</span>
                    <span className="font-semibold">KES 150,000</span>
                  </div>
                  <div className="flex justify-between border-b border-purple-200 pb-2">
                    <span>Less: NSSF (Max)</span>
                    <span className="text-red-600">-KES 4,320</span>
                  </div>
                  <div className="flex justify-between border-b border-purple-200 pb-2">
                    <span className="font-medium">Taxable Income</span>
                    <span className="font-semibold">KES 145,680</span>
                  </div>
                  <div className="bg-white p-3 rounded text-xs space-y-1">
                    <div className="flex justify-between">
                      <span>Tax on first KES 24,000 @ 10%:</span>
                      <span>KES 2,400</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax on next KES 8,333 @ 25%:</span>
                      <span>KES 2,083</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax on next KES 113,347 @ 30%:</span>
                      <span>KES 34,004</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t pt-1">
                      <span>Total Tax:</span>
                      <span>KES 38,487</span>
                    </div>
                  </div>
                  <div className="flex justify-between border-b border-purple-200 pb-2">
                    <span>Less: Personal Relief</span>
                    <span className="text-green-600">-KES 2,400</span>
                  </div>
                  <div className="flex justify-between border-b border-purple-200 pb-2">
                    <span className="font-bold">PAYE Tax Payable</span>
                    <span className="font-bold text-red-600">KES 36,087</span>
                  </div>
                  <div className="flex justify-between border-b border-purple-200 pb-2">
                    <span>SHIF (2.75%)</span>
                    <span className="text-red-600">-KES 4,125</span>
                  </div>
                  <div className="flex justify-between border-b border-purple-200 pb-2">
                    <span>Housing Levy (1.5%)</span>
                    <span className="text-red-600">-KES 2,250</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg bg-green-100 p-2 rounded">
                    <span>NET SALARY</span>
                    <span className="text-green-700">KES 103,218</span>
                  </div>
                </div>
                <a href="#calculator" className="text-purple-600 hover:underline text-sm mt-4 inline-block">
                  → Calculate your PAYE tax now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Internal Links - Job Listings */}
      <div className="max-w-6xl mx-auto px-6 py-12 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-blue-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            💼 Calculate PAYE for Your Dream Job - Browse Jobs by Salary Range
          </h2>
          <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
            Use our PAYE calculator to see your exact take-home pay for jobs across Kenya.
            Compare gross vs net salary before applying!
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Entry Level */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">🎓 Entry Level (KES 30K-60K)</h3>
              <p className="text-gray-700 text-sm mb-3">
                Use PAYE calculator: KES 50K gross = KES 40K net (20% deductions)
              </p>
              <div className="space-y-2">
                <a href="/local-jobs?salary=30000-60000" className="block text-green-600 hover:text-green-800 font-medium text-sm hover:underline">
                  → Browse Entry Level Jobs
                </a>
                <a href="/local-jobs?category=customer-service" className="block text-green-600 hover:text-green-800 font-medium text-sm hover:underline">
                  → Customer Service Jobs
                </a>
                <a href="/local-jobs?title=junior-accountant" className="block text-green-600 hover:text-green-800 font-medium text-sm hover:underline">
                  → Junior Accountant Jobs
                </a>
              </div>
            </div>

            {/* Mid Level */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">💼 Mid-Level (KES 60K-150K)</h3>
              <p className="text-gray-700 text-sm mb-3">
                Use PAYE calculator: KES 100K gross = KES 76K net (24% deductions)
              </p>
              <div className="space-y-2">
                <a href="/local-jobs?salary=60000-150000" className="block text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline">
                  → Browse Mid-Level Jobs
                </a>
                <a href="/local-jobs?category=it-software" className="block text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline">
                  → Software Engineer Jobs
                </a>
                <a href="/local-jobs?title=senior-accountant" className="block text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline">
                  → Senior Accountant Jobs
                </a>
              </div>
            </div>

            {/* Senior Level */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">⭐ Senior (KES 150K+)</h3>
              <p className="text-gray-700 text-sm mb-3">
                Use PAYE calculator: KES 200K gross = KES 147K net (26.5% deductions)
              </p>
              <div className="space-y-2">
                <a href="/local-jobs?salary=150000" className="block text-purple-600 hover:text-purple-800 font-medium text-sm hover:underline">
                  → Browse Senior Level Jobs
                </a>
                <a href="/local-jobs?category=management" className="block text-purple-600 hover:text-purple-800 font-medium text-sm hover:underline">
                  → Management Jobs
                </a>
                <a href="/local-jobs?title=finance-manager" className="block text-purple-600 hover:text-purple-800 font-medium text-sm hover:underline">
                  → Finance Manager Jobs
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Calculate PAYE for Popular Job Titles:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <a href="/local-jobs?title=teacher" className="text-gray-700 hover:text-blue-600 hover:underline">Teacher (Calculate PAYE)</a>
              <a href="/local-jobs?title=nurse" className="text-gray-700 hover:text-blue-600 hover:underline">Nurse (Calculate PAYE)</a>
              <a href="/local-jobs?title=accountant" className="text-gray-700 hover:text-blue-600 hover:underline">Accountant (Calculate PAYE)</a>
              <a href="/local-jobs?title=driver" className="text-gray-700 hover:text-blue-600 hover:underline">Driver (Calculate PAYE)</a>
              <a href="/local-jobs?title=sales-rep" className="text-gray-700 hover:text-blue-600 hover:underline">Sales Rep (Calculate PAYE)</a>
              <a href="/local-jobs?title=engineer" className="text-gray-700 hover:text-blue-600 hover:underline">Engineer (Calculate PAYE)</a>
              <a href="/local-jobs?title=secretary" className="text-gray-700 hover:text-blue-600 hover:underline">Secretary (Calculate PAYE)</a>
              <a href="/local-jobs?title=developer" className="text-gray-700 hover:text-blue-600 hover:underline">Developer (Calculate PAYE)</a>
            </div>
          </div>
        </div>
      </div>

      {/* Authoritative Sources */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-gray-100 rounded-xl p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Official KRA PAYE Calculator Sources & References
          </h3>
          <p className="text-gray-700 mb-6 text-center max-w-3xl mx-auto">
            Our PAYE calculator Kenya uses official Kenya Revenue Authority (KRA) tax rates and government regulations.
            All PAYE calculations are verified against official KRA sources.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Government PAYE Sources</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="https://www.kra.go.ke/individual/calculate-tax/calculating-tax/paye"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline flex items-center gap-2"
                  >
                    KRA Official PAYE Calculator & Tax Rates 2025
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://kra.go.ke/images/publications/Finance-Act-2023.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline flex items-center gap-2"
                  >
                    Finance Act 2023 - Official PAYE Tax Rates (PDF)
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.nssf.or.ke/services/contributions/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline flex items-center gap-2"
                  >
                    NSSF Contribution Rates (Used in PAYE Calculation)
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://sha.go.ke/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline flex items-center gap-2"
                  >
                    Social Health Authority - SHIF Rates 2025
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">PAYE Tax Laws & Guides</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="https://www.kenyalaw.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline flex items-center gap-2"
                  >
                    Kenya Law - Income Tax Act (PAYE Legislation)
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.president.go.ke/affordable-housing/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline flex items-center gap-2"
                  >
                    Housing Levy Information (1.5% Deduction)
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li className="text-gray-600">Current KRA PAYE tax bands verified Jan 2025</li>
                <li className="text-gray-600">Salary data from NewKenyan.com job listings</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-6 text-center">
            PAYE Calculator last updated: January 2025 | Based on Finance Act 2023 rates
          </p>
        </div>
      </div>

      {/* Related Calculators */}
      <div className="max-w-6xl mx-auto px-6 py-12 bg-white">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Related Tax & Salary Calculators Kenya
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <a href="/net-pay-calculator" className="block p-6 bg-green-50 border border-green-200 rounded-lg hover:shadow-lg transition-shadow">
            <h4 className="text-xl font-semibold text-green-800 mb-2">Net Pay Calculator</h4>
            <p className="text-sm text-gray-600">
              Calculate your net salary after all deductions including PAYE, NSSF, SHIF, and Housing Levy.
            </p>
          </a>
          <a href="/mortgage-calculator-kenya" className="block p-6 bg-blue-50 border border-blue-200 rounded-lg hover:shadow-lg transition-shadow">
            <h4 className="text-xl font-semibold text-blue-800 mb-2">Mortgage Calculator</h4>
            <p className="text-sm text-gray-600">
              Calculate monthly mortgage payments based on your net salary from our PAYE calculator.
            </p>
          </a>
          <a href="/local-jobs" className="block p-6 bg-purple-50 border border-purple-200 rounded-lg hover:shadow-lg transition-shadow">
            <h4 className="text-xl font-semibold text-purple-800 mb-2">Browse Jobs Kenya</h4>
            <p className="text-sm text-gray-600">
              Find jobs across Kenya and use our PAYE calculator to determine your take-home pay.
            </p>
          </a>
        </div>
      </div>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "PAYE Calculator Kenya 2025",
            "description": "Free PAYE calculator for Kenya. Calculate your income tax using official KRA rates for 2025. Includes NSSF, SHIF, and Housing Levy calculations for accurate salary tax determination.",
            "url": "https://newkenyan.com/paye-calculator",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "KES"
            },
            "featureList": [
              "PAYE Calculator Kenya",
              "KRA Tax Calculator",
              "Kenya PAYE Calculator",
              "Salary Tax Calculator",
              "Income Tax Calculator Kenya",
              "NSSF Calculator",
              "SHIF Calculator",
              "Housing Levy Calculator",
              "Net Pay Calculator"
            ],
            "author": {
              "@type": "Organization",
              "name": "NewKenyan.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "NewKenyan.com"
            },
            "datePublished": "2025-01-01",
            "dateModified": "2025-01-11",
            "inLanguage": "en-KE",
            "isAccessibleForFree": true,
            "keywords": "paye calculator, paye calculator kenya, kra paye calculator, kenya paye calculator, salary tax calculator kenya, paye tax calculator, kra tax calculator"
          })
        }}
      />

      <Footer />
    </div>
  );
}
