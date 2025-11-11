import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import KenyaPAYECalculator from './KenyaPAYECalculator';

export const metadata: Metadata = {
  title: "Net Pay Calculator Kenya 2025 | PAYE Tax Calculator | KRA Salary Calculator",
  description: "Calculate your net pay in Kenya with our comprehensive net pay calculator. Use our PAYE tax calculator and salary calculator to determine your net income after KRA tax deductions, NSSF, SHIF, and housing levy.",
  keywords: "net pay calculator, net income calculator, paye tax calculator, kra tax calculator, salary calculator, kenya tax calculator, net salary calculator, take home pay calculator, kenya paye calculator 2025",
  openGraph: {
    title: "Net Pay Calculator Kenya 2025 | PAYE Tax Calculator | KRA Salary Calculator",
    description: "Calculate your net pay in Kenya with our comprehensive net pay calculator. Determine your net income after all statutory deductions.",
    url: "https://newkenyan.com/net-pay-calculator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Net Pay Calculator Kenya 2025 | PAYE Tax Calculator",
    description: "Calculate your net pay in Kenya with our comprehensive net pay calculator and PAYE tax calculator.",
  },
  alternates: {
    canonical: "https://newkenyan.com/net-pay-calculator",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function NetPayCalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* SEO Optimized Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Net Pay Calculator Kenya 2025 - Calculate Your Take Home Salary
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
              Use our comprehensive net pay calculator to determine your exact net income in Kenya. Our PAYE tax calculator includes all 2025 statutory deductions including KRA tax, NSSF, SHIF, and housing levy to give you an accurate net salary calculation.
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">Net Pay Calculator</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">PAYE Tax Calculator</span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">KRA Tax Calculator</span>
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">Salary Calculator</span>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator Component */}
      <KenyaPAYECalculator />

      {/* Strategic Internal Links - Job Listings Silo */}
      <div className="max-w-6xl mx-auto px-6 py-12 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-green-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            💼 Browse Jobs by Salary Range - See What You'll Actually Take Home!
          </h2>
          <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
            After calculating your net pay, browse real jobs in Kenya with actual salary ranges.
            Compare take-home pay across different industries and positions.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Entry Level Jobs */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">🎓 Entry Level (KES 30K-60K)</h3>
              <p className="text-gray-700 text-sm mb-4">
                Net pay: KES 25K-50K after tax. Perfect for fresh graduates and career starters.
              </p>
              <div className="space-y-2">
                <a href="/local-jobs?salary=30000-60000" className="block text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline">
                  → Browse Entry Level Jobs
                </a>
                <a href="/local-jobs?category=customer-service" className="block text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline">
                  → Customer Service Jobs
                </a>
                <a href="/local-jobs?category=administration" className="block text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline">
                  → Administrative Jobs
                </a>
              </div>
            </div>

            {/* Mid-Level Jobs */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">💼 Mid-Level (KES 60K-150K)</h3>
              <p className="text-gray-700 text-sm mb-4">
                Net pay: KES 48K-115K after tax. Experienced professionals with 3-5 years experience.
              </p>
              <div className="space-y-2">
                <a href="/local-jobs?salary=60000-150000" className="block text-green-600 hover:text-green-800 font-medium text-sm hover:underline">
                  → Browse Mid-Level Jobs
                </a>
                <a href="/local-jobs?category=it-software" className="block text-green-600 hover:text-green-800 font-medium text-sm hover:underline">
                  → IT & Software Jobs
                </a>
                <a href="/local-jobs?category=accounting-finance" className="block text-green-600 hover:text-green-800 font-medium text-sm hover:underline">
                  → Accounting & Finance Jobs
                </a>
              </div>
            </div>

            {/* Senior Level Jobs */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">⭐ Senior (KES 150K+)</h3>
              <p className="text-gray-700 text-sm mb-4">
                Net pay: KES 115K+ after tax. Management, senior tech roles, and executive positions.
              </p>
              <div className="space-y-2">
                <a href="/local-jobs?salary=150000" className="block text-purple-600 hover:text-purple-800 font-medium text-sm hover:underline">
                  → Browse Senior Level Jobs
                </a>
                <a href="/local-jobs?category=management" className="block text-purple-600 hover:text-purple-800 font-medium text-sm hover:underline">
                  → Management Jobs
                </a>
                <a href="/local-jobs?category=engineering" className="block text-purple-600 hover:text-purple-800 font-medium text-sm hover:underline">
                  → Engineering Jobs
                </a>
              </div>
            </div>
          </div>

          {/* Job Categories by Industry */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Browse Jobs by Industry & Calculate Your Take-Home Pay:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <a href="/local-jobs?category=healthcare" className="text-gray-700 hover:text-green-600 hover:underline">Healthcare & Medical</a>
              <a href="/local-jobs?category=education" className="text-gray-700 hover:text-green-600 hover:underline">Education & Teaching</a>
              <a href="/local-jobs?category=sales-marketing" className="text-gray-700 hover:text-green-600 hover:underline">Sales & Marketing</a>
              <a href="/local-jobs?category=construction" className="text-gray-700 hover:text-green-600 hover:underline">Construction & Trades</a>
              <a href="/local-jobs?category=hospitality" className="text-gray-700 hover:text-green-600 hover:underline">Hospitality & Tourism</a>
              <a href="/local-jobs?category=legal" className="text-gray-700 hover:text-green-600 hover:underline">Legal & Compliance</a>
              <a href="/local-jobs?category=logistics" className="text-gray-700 hover:text-green-600 hover:underline">Logistics & Transport</a>
              <a href="/local-jobs?category=media" className="text-gray-700 hover:text-green-600 hover:underline">Media & Communications</a>
            </div>
          </div>
        </div>
      </div>

      {/* Additional SEO Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to Use Our Net Pay Calculator Kenya
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">About Our Net Income Calculator</h2>
              <p className="text-gray-600 mb-4">
                Our net pay calculator is designed specifically for Kenyan employees to accurately calculate their take-home salary after all statutory deductions. This comprehensive salary calculator includes the latest 2025 PAYE tax rates from KRA (Kenya Revenue Authority) as per Finance Act 2023 effective July 1, 2023.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Official 2025 PAYE tax rates (10% to 35% progressive bands)</li>
                <li>Updated NSSF contributions effective February 1, 2025</li>
                <li>SHIF (Social Health Insurance Fund) replacing NHIF from October 1, 2024</li>
                <li>Housing Levy calculations (1.5% capped at KSh 5,000)</li>
                <li>Tax-deductible pension contributions up to KSh 30,000 monthly</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Kenya PAYE Tax Calculator Features</h2>
              <p className="text-gray-600 mb-4">
                Our KRA tax calculator uses the official progressive tax system implemented in Kenya, ensuring accurate net salary calculations for all income levels based on the latest government regulations.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Real-time net pay calculations with instant updates</li>
                <li>Comprehensive breakdown of all statutory deductions</li>
                <li>Effective tax rate calculation and analysis</li>
                <li>Automatic personal relief of KSh 2,400 monthly</li>
                <li>Mobile-optimized responsive design for all devices</li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Understanding Your Net Income Calculation in Kenya
            </h2>
            <p className="text-gray-600 mb-4">
              When calculating your net pay in Kenya, several statutory deductions are applied to your gross salary based on the latest government regulations:
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-2">PAYE Tax (2025)</h3>
                <div className="text-xs text-red-600 space-y-1">
                  <div>• 10% on first KSh 24,000</div>
                  <div>• 25% on next KSh 8,333</div>
                  <div>• 30% on next KSh 467,667</div>
                  <div>• 32.5% on next KSh 300,000</div>
                  <div>• 35% above KSh 800,000</div>
                  <div className="font-medium mt-2">Personal Relief: KSh 2,400</div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">NSSF (Feb 2025)</h3>
                <div className="text-xs text-blue-600 space-y-1">
                  <div>• Tier I: 6% of first KSh 8,000</div>
                  <div>• Maximum: KSh 480/month</div>
                  <div>• Tier II: 6% of KSh 8,001-72,000</div>
                  <div>• Maximum: KSh 3,840/month</div>
                  <div className="font-medium mt-2">Total Max: KSh 4,320</div>
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">SHIF (Oct 2024)</h3>
                <div className="text-xs text-purple-600 space-y-1">
                  <div>• Rate: 2.75% of gross income</div>
                  <div>• Minimum: KSh 300/month</div>
                  <div>• No maximum cap</div>
                  <div>• Replaces NHIF</div>
                  <div className="font-medium mt-2">Mandatory for all employees</div>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">Housing Levy</h3>
                <div className="text-xs text-yellow-600 space-y-1">
                  <div>• Rate: 1.5% of gross salary</div>
                  <div>• Maximum: KSh 5,000/month</div>
                  <div>• Cap at KSh 333,333 income</div>
                  <div>• Both employee & employer</div>
                  <div className="font-medium mt-2">Affordable Housing Fund</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <div className="p-4 bg-green-50 rounded-lg">
              <h2 className="font-semibold text-green-800 mb-2">💡 Pro Tips for Maximizing Your Net Pay</h2>
              <ul className="text-green-700 text-sm space-y-1">
                <li>• Make voluntary pension contributions up to KSh 30,000 monthly (KSh 360,000 annually)</li>
                <li>• Pension contributions are deducted before calculating taxable income</li>
                <li>• Use our calculator to see the tax savings from different contribution amounts</li>
                <li>• Consider employer-matched pension schemes for maximum benefit</li>
              </ul>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <h2 className="font-semibold text-blue-800 mb-2">Important Calculator Notes</h2>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• All rates are based on official KRA and government regulations for 2025</li>
                <li>• NSSF contributions are matched by employers (not shown in net pay calculation)</li>
                <li>• Non-cash benefits below KSh 5,000 can be ignored in taxable income</li>
                <li>• This calculator is for estimation purposes - consult a tax professional for official advice</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Comprehensive Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* PAYE Tax Calculation Guide */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Complete PAYE Tax Calculation Guide 2025
            </h2>
            <p className="text-gray-600 mb-4">
              Understanding how your PAYE tax is calculated step-by-step using the progressive tax system in Kenya.
            </p>
            
            <div className="space-y-3">
              <div className="border-l-4 border-green-400 pl-4">
                <h3 className="font-semibold text-green-800">Step 1: Calculate Taxable Income</h3>
                <p className="text-sm text-gray-600">Gross Salary - NSSF - Pension Contributions = Taxable Income</p>
              </div>
              
              <div className="border-l-4 border-yellow-400 pl-4">
                <h3 className="font-semibold text-yellow-800">Step 2: Apply Progressive Tax Bands</h3>
                <p className="text-sm text-gray-600">Calculate tax using the 5-tier progressive system from 10% to 35%</p>
              </div>
              
              <div className="border-l-4 border-blue-400 pl-4">
                <h3 className="font-semibold text-blue-800">Step 3: Apply Personal Relief</h3>
                <p className="text-sm text-gray-600">Deduct KSh 2,400 monthly personal relief from calculated tax</p>
              </div>
              
              <div className="border-l-4 border-purple-400 pl-4">
                <h3 className="font-semibold text-purple-800">Step 4: Add Other Deductions</h3>
                <p className="text-sm text-gray-600">Add SHIF (2.75%) and Housing Levy (1.5%) to total deductions</p>
              </div>
            </div>
          </div>

          {/* Salary Examples */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Net Pay Examples for Common Salaries
            </h2>
            <p className="text-gray-600 mb-4">
              See how different salary levels affect your net pay using our calculator's methodology.
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">KSh 50,000 Gross</span>
                  <span className="text-green-600 font-bold">≈ KSh 40,500 Net</span>
                </div>
                <div className="text-xs text-gray-600">
                  PAYE: KSh 4,500 | NSSF: KSh 3,000 | SHIF: KSh 1,375 | Housing: KSh 750
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">KSh 100,000 Gross</span>
                  <span className="text-green-600 font-bold">≈ KSh 76,400 Net</span>
                </div>
                <div className="text-xs text-gray-600">
                  PAYE: KSh 14,500 | NSSF: KSh 4,320 | SHIF: KSh 2,750 | Housing: KSh 1,500
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">KSh 200,000 Gross</span>
                  <span className="text-green-600 font-bold">≈ KSh 147,000 Net</span>
                </div>
                <div className="text-xs text-gray-600">
                  PAYE: KSh 36,000 | NSSF: KSh 4,320 | SHIF: KSh 5,500 | Housing: KSh 3,000
                </div>
              </div>
            </div>
            
            <p className="text-xs text-gray-500 mt-4">
              *Approximate values. Use our calculator above for exact calculations.
            </p>
          </div>
        </div>

        {/* Tax Optimization Strategies */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Tax Optimization Strategies for Kenyan Employees
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Pension Contributions</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Contribute up to KSh 30,000 monthly</li>
                <li>• Reduces taxable income directly</li>
                <li>• Tax relief of up to KSh 10,500/month for high earners</li>
                <li>• Employer matching often available</li>
              </ul>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Salary Structuring</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Non-cash benefits under KSh 5,000</li>
                <li>• Medical insurance premiums</li>
                <li>• Life insurance premiums</li>
                <li>• Professional development allowances</li>
              </ul>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">Investment Options</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Individual pension schemes</li>
                <li>• Education insurance policies</li>
                <li>• Home ownership savings plans</li>
                <li>• Unit trust investments</li>
              </ul>
            </div>
          </div>
        </div>

        {/* SALARY BY JOB TITLE - MASSIVE SEO SECTION */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Net Salary by Job Title in Kenya 2025
          </h2>
          <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
            Calculate exact take-home pay for the most common jobs in Kenya. All figures include PAYE, NSSF, SHIF, and Housing Levy deductions based on 2025 rates.
          </p>

          {/* IT & Technology Jobs */}
          <section className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              IT & Technology Jobs - Net Salary Kenya
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h4 className="text-xl font-semibold text-blue-800 mb-3">Software Engineer Salary Kenya</h4>
                <div className="space-y-3">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Junior (1-2 years)</span>
                      <span className="text-green-600 font-bold">KES 53K net</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      Gross: KES 70,000 | PAYE: KES 8,100 | NSSF: KES 4,200 | SHIF: KES 1,925 | Housing: KES 1,050
                    </div>
                    <a href="/local-jobs?title=junior-software-engineer" className="text-blue-600 hover:underline text-sm mt-2 inline-block">
                      → Browse Junior Software Engineer Jobs
                    </a>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Mid-Level (3-5 years)</span>
                      <span className="text-green-600 font-bold">KES 95K net</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      Gross: KES 130,000 | PAYE: KES 21,000 | NSSF: KES 4,320 | SHIF: KES 3,575 | Housing: KES 1,950
                    </div>
                    <a href="/local-jobs?title=software-engineer" className="text-green-600 hover:underline text-sm mt-2 inline-block">
                      → Browse Software Engineer Jobs
                    </a>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Senior (5+ years)</span>
                      <span className="text-green-600 font-bold">KES 160K net</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      Gross: KES 220,000 | PAYE: KES 42,500 | NSSF: KES 4,320 | SHIF: KES 6,050 | Housing: KES 3,300
                    </div>
                    <a href="/local-jobs?title=senior-software-engineer" className="text-purple-600 hover:underline text-sm mt-2 inline-block">
                      → Browse Senior Software Engineer Jobs
                    </a>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h4 className="text-xl font-semibold text-blue-800 mb-3">IT Support Specialist Salary Kenya</h4>
                <div className="space-y-3">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Help Desk Support</span>
                      <span className="text-green-600 font-bold">KES 33K net</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      Gross: KES 45,000 | PAYE: KES 3,600 | NSSF: KES 2,700 | SHIF: KES 1,238 | Housing: KES 675
                    </div>
                    <a href="/local-jobs?title=it-support" className="text-blue-600 hover:underline text-sm mt-2 inline-block">
                      → Browse IT Support Jobs
                    </a>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Network Administrator</span>
                      <span className="text-green-600 font-bold">KES 64K net</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      Gross: KES 85,000 | PAYE: KES 11,000 | NSSF: KES 4,320 | SHIF: KES 2,338 | Housing: KES 1,275
                    </div>
                    <a href="/local-jobs?title=network-administrator" className="text-green-600 hover:underline text-sm mt-2 inline-block">
                      → Browse Network Admin Jobs
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Healthcare Jobs */}
          <section className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Healthcare & Medical Jobs - Net Salary Kenya
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h4 className="text-xl font-semibold text-red-800 mb-3">Nurse Salary Kenya</h4>
                <div className="space-y-3">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Registered Nurse (Public Hospital)</span>
                      <span className="text-green-600 font-bold">KES 46K net</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      Gross: KES 62,000 | PAYE: KES 6,700 | NSSF: KES 3,720 | SHIF: KES 1,705 | Housing: KES 930
                    </div>
                    <a href="/local-jobs?title=nurse" className="text-red-600 hover:underline text-sm mt-2 inline-block">
                      → Browse Nursing Jobs
                    </a>
                  </div>
                  <div className="bg-pink-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Senior Nurse (Private Hospital)</span>
                      <span className="text-green-600 font-bold">KES 73K net</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      Gross: KES 100,000 | PAYE: KES 14,500 | NSSF: KES 4,320 | SHIF: KES 2,750 | Housing: KES 1,500
                    </div>
                    <a href="/local-jobs?title=senior-nurse" className="text-pink-600 hover:underline text-sm mt-2 inline-block">
                      → Browse Senior Nursing Jobs
                    </a>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h4 className="text-xl font-semibold text-red-800 mb-3">Clinical Officer Salary Kenya</h4>
                <div className="space-y-3">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Clinical Officer (County Hospital)</span>
                      <span className="text-green-600 font-bold">KES 56K net</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      Gross: KES 75,000 | PAYE: KES 9,300 | NSSF: KES 4,320 | SHIF: KES 2,063 | Housing: KES 1,125
                    </div>
                    <a href="/local-jobs?title=clinical-officer" className="text-red-600 hover:underline text-sm mt-2 inline-block">
                      → Browse Clinical Officer Jobs
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Teaching Jobs */}
          <section className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Teaching & Education Jobs - Net Salary Kenya
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h4 className="text-xl font-semibold text-orange-800 mb-3">Teacher Salary Kenya</h4>
                <div className="space-y-3">
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Primary School Teacher (TSC)</span>
                      <span className="text-green-600 font-bold">KES 38K net</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      Gross: KES 52,000 | PAYE: KES 5,100 | NSSF: KES 3,120 | SHIF: KES 1,430 | Housing: KES 780
                    </div>
                    <a href="/local-jobs?title=primary-teacher" className="text-orange-600 hover:underline text-sm mt-2 inline-block">
                      → Browse Primary Teacher Jobs
                    </a>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Secondary School Teacher (TSC)</span>
                      <span className="text-green-600 font-bold">KES 48K net</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      Gross: KES 65,000 | PAYE: KES 7,500 | NSSF: KES 3,900 | SHIF: KES 1,788 | Housing: KES 975
                    </div>
                    <a href="/local-jobs?title=secondary-teacher" className="text-yellow-600 hover:underline text-sm mt-2 inline-block">
                      → Browse Secondary Teacher Jobs
                    </a>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">International School Teacher</span>
                      <span className="text-green-600 font-bold">KES 110K net</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      Gross: KES 150,000 | PAYE: KES 25,000 | NSSF: KES 4,320 | SHIF: KES 4,125 | Housing: KES 2,250
                    </div>
                    <a href="/local-jobs?title=international-teacher" className="text-green-600 hover:underline text-sm mt-2 inline-block">
                      → Browse International School Jobs
                    </a>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h4 className="text-xl font-semibold text-orange-800 mb-3">University Lecturer Salary Kenya</h4>
                <div className="space-y-3">
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Tutorial Fellow (Public University)</span>
                      <span className="text-green-600 font-bold">KES 61K net</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      Gross: KES 82,000 | PAYE: KES 10,500 | NSSF: KES 4,320 | SHIF: KES 2,255 | Housing: KES 1,230
                    </div>
                    <a href="/local-jobs?title=university-lecturer" className="text-orange-600 hover:underline text-sm mt-2 inline-block">
                      → Browse University Lecturer Jobs
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Accounting & Finance Jobs */}
          <section className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Accounting & Finance Jobs - Net Salary Kenya
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h4 className="text-xl font-semibold text-green-800 mb-3">Accountant Salary Kenya</h4>
                <div className="space-y-3">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Junior Accountant (CPA Part II)</span>
                      <span className="text-green-600 font-bold">KES 43K net</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      Gross: KES 58,000 | PAYE: KES 6,000 | NSSF: KES 3,480 | SHIF: KES 1,595 | Housing: KES 870
                    </div>
                    <a href="/local-jobs?title=junior-accountant" className="text-green-600 hover:underline text-sm mt-2 inline-block">
                      → Browse Junior Accountant Jobs
                    </a>
                  </div>
                  <div className="bg-teal-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Senior Accountant (CPA-K)</span>
                      <span className="text-green-600 font-bold">KES 90K net</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      Gross: KES 125,000 | PAYE: KES 20,000 | NSSF: KES 4,320 | SHIF: KES 3,438 | Housing: KES 1,875
                    </div>
                    <a href="/local-jobs?title=senior-accountant" className="text-teal-600 hover:underline text-sm mt-2 inline-block">
                      → Browse Senior Accountant Jobs
                    </a>
                  </div>
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Finance Manager</span>
                      <span className="text-green-600 font-bold">KES 148K net</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      Gross: KES 205,000 | PAYE: KES 38,000 | NSSF: KES 4,320 | SHIF: KES 5,638 | Housing: KES 3,075
                    </div>
                    <a href="/local-jobs?title=finance-manager" className="text-emerald-600 hover:underline text-sm mt-2 inline-block">
                      → Browse Finance Manager Jobs
                    </a>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h4 className="text-xl font-semibold text-green-800 mb-3">Bank Teller / Customer Service</h4>
                <div className="space-y-3">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Bank Teller</span>
                      <span className="text-green-600 font-bold">KES 36K net</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      Gross: KES 50,000 | PAYE: KES 4,500 | NSSF: KES 3,000 | SHIF: KES 1,375 | Housing: KES 750
                    </div>
                    <a href="/local-jobs?title=bank-teller" className="text-green-600 hover:underline text-sm mt-2 inline-block">
                      → Browse Bank Teller Jobs
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sales & Marketing Jobs */}
          <section className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Sales & Marketing Jobs - Net Salary Kenya
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h4 className="text-xl font-semibold text-purple-800 mb-3">Sales Representative Salary Kenya</h4>
                <div className="space-y-3">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Sales Representative (Base Salary)</span>
                      <span className="text-green-600 font-bold">KES 31K net</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      Gross: KES 42,000 | PAYE: KES 3,000 | NSSF: KES 2,520 | SHIF: KES 1,155 | Housing: KES 630
                    </div>
                    <p className="text-xs text-purple-700 mt-2">+ Commission (typically 20-50% additional)</p>
                    <a href="/local-jobs?title=sales-representative" className="text-purple-600 hover:underline text-sm mt-2 inline-block">
                      → Browse Sales Representative Jobs
                    </a>
                  </div>
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Sales Executive (B2B)</span>
                      <span className="text-green-600 font-bold">KES 67K net</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      Gross: KES 90,000 | PAYE: KES 12,500 | NSSF: KES 4,320 | SHIF: KES 2,475 | Housing: KES 1,350
                    </div>
                    <a href="/local-jobs?title=sales-executive" className="text-indigo-600 hover:underline text-sm mt-2 inline-block">
                      → Browse Sales Executive Jobs
                    </a>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h4 className="text-xl font-semibold text-purple-800 mb-3">Marketing Manager Salary Kenya</h4>
                <div className="space-y-3">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Marketing Manager (Mid-Sized Company)</span>
                      <span className="text-green-600 font-bold">KES 120K net</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      Gross: KES 165,000 | PAYE: KES 29,500 | NSSF: KES 4,320 | SHIF: KES 4,538 | Housing: KES 2,475
                    </div>
                    <a href="/local-jobs?title=marketing-manager" className="text-purple-600 hover:underline text-sm mt-2 inline-block">
                      → Browse Marketing Manager Jobs
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Engineering & Construction Jobs */}
          <section className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Engineering & Construction Jobs - Net Salary Kenya
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h4 className="text-xl font-semibold text-yellow-800 mb-3">Civil Engineer Salary Kenya</h4>
                <div className="space-y-3">
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Graduate Engineer</span>
                      <span className="text-green-600 font-bold">KES 50K net</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      Gross: KES 68,000 | PAYE: KES 7,700 | NSSF: KES 4,080 | SHIF: KES 1,870 | Housing: KES 1,020
                    </div>
                    <a href="/local-jobs?title=civil-engineer" className="text-yellow-600 hover:underline text-sm mt-2 inline-block">
                      → Browse Civil Engineer Jobs
                    </a>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Project Engineer (5+ years)</span>
                      <span className="text-green-600 font-bold">KES 128K net</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      Gross: KES 180,000 | PAYE: KES 33,500 | NSSF: KES 4,320 | SHIF: KES 4,950 | Housing: KES 2,700
                    </div>
                    <a href="/local-jobs?title=project-engineer" className="text-amber-600 hover:underline text-sm mt-2 inline-block">
                      → Browse Project Engineer Jobs
                    </a>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h4 className="text-xl font-semibold text-yellow-800 mb-3">Construction Worker / Artisan Salary</h4>
                <div className="space-y-3">
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Skilled Mason / Carpenter</span>
                      <span className="text-green-600 font-bold">KES 24K net</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      Gross: KES 35,000 | PAYE: KES 1,500 | NSSF: KES 2,100 | SHIF: KES 963 | Housing: KES 525
                    </div>
                    <a href="/local-jobs?title=mason-carpenter" className="text-yellow-600 hover:underline text-sm mt-2 inline-block">
                      → Browse Construction Jobs
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Regional Cost of Living Comparison */}
          <section className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Cost of Living by City - Is Your Net Salary Enough?
            </h3>
            <p className="text-gray-700 mb-6 text-center max-w-3xl mx-auto">
              Compare your net salary against the actual cost of living in major Kenyan cities.
              See how far your take-home pay will go in Nairobi vs Mombasa vs Kisumu.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Nairobi */}
              <div className="border border-orange-200 rounded-lg p-6 bg-orange-50">
                <h4 className="text-xl font-semibold text-orange-800 mb-4">Nairobi</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">1BR Apartment (CBD)</span>
                    <span className="font-semibold">KES 25K-40K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">1BR Apartment (Suburbs)</span>
                    <span className="font-semibold">KES 15K-25K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Monthly Transport</span>
                    <span className="font-semibold">KES 5K-10K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Food (Single Person)</span>
                    <span className="font-semibold">KES 12K-18K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Utilities</span>
                    <span className="font-semibold">KES 3K-5K</span>
                  </div>
                  <div className="border-t border-orange-300 pt-3 mt-3 flex justify-between font-bold">
                    <span>Minimum Net Salary Needed:</span>
                    <span className="text-orange-700">KES 40K-60K</span>
                  </div>
                </div>
                <a href="/apartments-for-rent/nairobi-county" className="text-orange-600 hover:underline text-sm mt-4 inline-block">
                  → Browse Apartments in Nairobi
                </a>
              </div>

              {/* Mombasa */}
              <div className="border border-blue-200 rounded-lg p-6 bg-blue-50">
                <h4 className="text-xl font-semibold text-blue-800 mb-4">Mombasa</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">1BR Apartment (Nyali)</span>
                    <span className="font-semibold">KES 20K-35K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">1BR Apartment (Mainland)</span>
                    <span className="font-semibold">KES 12K-20K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Monthly Transport</span>
                    <span className="font-semibold">KES 4K-8K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Food (Single Person)</span>
                    <span className="font-semibold">KES 10K-15K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Utilities</span>
                    <span className="font-semibold">KES 3K-5K</span>
                  </div>
                  <div className="border-t border-blue-300 pt-3 mt-3 flex justify-between font-bold">
                    <span>Minimum Net Salary Needed:</span>
                    <span className="text-blue-700">KES 35K-55K</span>
                  </div>
                </div>
                <a href="/apartments-for-rent/mombasa-county" className="text-blue-600 hover:underline text-sm mt-4 inline-block">
                  → Browse Apartments in Mombasa
                </a>
              </div>

              {/* Kisumu */}
              <div className="border border-green-200 rounded-lg p-6 bg-green-50">
                <h4 className="text-xl font-semibold text-green-800 mb-4">Kisumu</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">1BR Apartment (CBD)</span>
                    <span className="font-semibold">KES 15K-25K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">1BR Apartment (Outskirts)</span>
                    <span className="font-semibold">KES 8K-15K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Monthly Transport</span>
                    <span className="font-semibold">KES 3K-6K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Food (Single Person)</span>
                    <span className="font-semibold">KES 8K-12K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Utilities</span>
                    <span className="font-semibold">KES 2K-4K</span>
                  </div>
                  <div className="border-t border-green-300 pt-3 mt-3 flex justify-between font-bold">
                    <span>Minimum Net Salary Needed:</span>
                    <span className="text-green-700">KES 25K-45K</span>
                  </div>
                </div>
                <a href="/apartments-for-rent/kisumu-county" className="text-green-600 hover:underline text-sm mt-4 inline-block">
                  → Browse Apartments in Kisumu
                </a>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h4 className="font-semibold text-yellow-800 mb-3">💡 Salary vs Cost of Living Guide</h4>
              <div className="grid md:grid-cols-2 gap-6 text-sm text-yellow-700">
                <div>
                  <p className="font-medium mb-2">If your NET salary is KES 40,000 in Nairobi:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• You can afford a bedsitter/studio (KES 12K-18K)</li>
                    <li>• Budget KES 8K for food</li>
                    <li>• KES 5K for transport (matatu)</li>
                    <li>• KES 3K utilities</li>
                    <li>• Remaining: KES 12K for savings/emergencies</li>
                  </ul>
                  <a href="/bedsitters-for-rent/nairobi-county" className="text-yellow-600 hover:underline inline-block mt-2">
                    → Browse Affordable Bedsitters in Nairobi
                  </a>
                </div>
                <div>
                  <p className="font-medium mb-2">If your NET salary is KES 80,000 in Nairobi:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• You can afford a 2BR apartment (KES 30K-40K)</li>
                    <li>• Budget KES 15K for food</li>
                    <li>• KES 8K for transport (own car possible)</li>
                    <li>• KES 5K utilities</li>
                    <li>• Remaining: KES 22K for savings/lifestyle</li>
                  </ul>
                  <a href="/2-bedroom-apartments-for-rent/nairobi-county" className="text-yellow-600 hover:underline inline-block mt-2">
                    → Browse 2BR Apartments in Nairobi
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Authoritative Data Sources */}
          <section className="mb-12 bg-gray-100 rounded-xl p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Authoritative Data Sources
            </h3>
            <p className="text-gray-700 mb-6 text-center max-w-3xl mx-auto">
              Our PAYE calculator uses official government rates and regulations. All calculations are based on the latest tax laws effective in 2025.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Government & Regulatory Sources</h4>
                <ul className="space-y-3 text-sm">
                  <li>
                    <a
                      href="https://www.kra.go.ke/individual/calculate-tax/calculating-tax/paye"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline flex items-center gap-2"
                    >
                      Kenya Revenue Authority (KRA) - PAYE Tax Rates 2025
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.nssf.or.ke/services/contributions/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline flex items-center gap-2"
                    >
                      NSSF Kenya - Contribution Rates & Tiers (Feb 2025)
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://sha.go.ke/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline flex items-center gap-2"
                    >
                      Social Health Authority (SHA) - SHIF Contribution Rates
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.president.go.ke/affordable-housing/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline flex items-center gap-2"
                    >
                      Affordable Housing Programme - Housing Levy Information
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Tax Laws & Regulations</h4>
                <ul className="space-y-3 text-sm">
                  <li>
                    <a
                      href="https://kra.go.ke/images/publications/Finance-Act-2023.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline flex items-center gap-2"
                    >
                      Finance Act 2023 - Official Tax Rates (PDF)
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.kenyalaw.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline flex items-center gap-2"
                    >
                      Kenya Law Reports - Income Tax Act
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </li>
                  <li className="text-gray-600">Current market salary data from verified employers</li>
                  <li className="text-gray-600">Cost of living data from NewKenyan.com property listings</li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-6 text-center">
              All pricing data updated based on Q1 2025 government regulations and market conditions
            </p>
          </section>
        </div>

        {/* FAQ Section */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions - Net Pay Calculator Kenya
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">What is the difference between gross and net pay?</h3>
                <p className="text-sm text-gray-600">
                  Gross pay is your total salary before deductions. Net pay is what you take home after PAYE tax, NSSF, SHIF, and housing levy deductions.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">How accurate is this net pay calculator?</h3>
                <p className="text-sm text-gray-600">
                  Our calculator uses official 2025 KRA rates and government regulations. It provides accurate estimates for standard employment situations.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Can I claim tax relief on pension contributions?</h3>
                <p className="text-sm text-gray-600">
                  Yes, pension contributions up to KSh 30,000 monthly (KSh 360,000 annually) are tax-deductible and reduce your taxable income.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">When did SHIF replace NHIF?</h3>
                <p className="text-sm text-gray-600">
                  SHIF (Social Health Insurance Fund) replaced NHIF from October 1, 2024, with a rate of 2.75% of gross income (minimum KSh 300).
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">What is the maximum NSSF contribution?</h3>
                <p className="text-sm text-gray-600">
                  Maximum NSSF contribution is KSh 4,320 monthly (KSh 480 for Tier I + KSh 3,840 for Tier II), effective February 1, 2025.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Is housing levy mandatory for all employees?</h3>
                <p className="text-sm text-gray-600">
                  Yes, housing levy of 1.5% (capped at KSh 5,000) is mandatory for all employees earning above the minimum wage threshold.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Net Pay Calculator Kenya 2025",
            "description": "Calculate your net pay in Kenya with our comprehensive net pay calculator. Includes PAYE tax calculator, NSSF, SHIF, and housing levy calculations for accurate net income determination.",
            "url": "https://newkenyan.com/net-pay-calculator",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "KES"
            },
            "featureList": [
              "Net Pay Calculator",
              "PAYE Tax Calculator", 
              "KRA Tax Calculator",
              "Salary Calculator",
              "Net Income Calculator",
              "NSSF Calculator",
              "SHIF Calculator",
              "Housing Levy Calculator"
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
            "dateModified": "2025-01-01",
            "inLanguage": "en-KE",
            "isAccessibleForFree": true,
            "keywords": "net pay calculator, paye tax calculator, kra tax calculator, salary calculator, net income calculator"
          })
        }}
      />
      
      <Footer />
    </div>
  );
}