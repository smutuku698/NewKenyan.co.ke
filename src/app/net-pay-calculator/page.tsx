import { Metadata } from 'next';
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
    </div>
  );
}