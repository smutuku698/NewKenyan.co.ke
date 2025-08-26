import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConstructionCalculator from './ConstructionCalculator';
import { ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: "Construction Cost Calculator Kenya 2025 | Building Cost Calculator Kenya",
  description: "Use our comprehensive construction cost calculator Kenya to estimate building costs, material prices, and labour costs. Calculate house construction costs per square meter with current 2025 prices for cement, sand, steel, roofing materials and more.",
  keywords: "construction cost calculator kenya, building cost calculator kenya, house construction cost calculator, construction costs per square meter kenya, building materials price calculator kenya, construction cost estimation kenya, building cost per m2 kenya, house building cost calculator kenya 2025",
  openGraph: {
    title: "Construction Cost Calculator Kenya 2025 | Building Cost Calculator Kenya",
    description: "Calculate accurate construction costs in Kenya with our comprehensive tool. Get estimates for materials, labour, and total building costs based on current 2025 market prices.",
    url: "https://newkenyan.com/construction-cost-calculator-kenya",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Construction Cost Calculator Kenya 2025 | Building Cost Calculator",
    description: "Calculate accurate construction costs in Kenya with current 2025 material and labour prices.",
  },
  alternates: {
    canonical: "https://newkenyan.com/construction-cost-calculator-kenya",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ConstructionCalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* SEO Optimized Header Section */}
      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-b">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Construction Cost Calculator Kenya 2025 - Building Cost Calculator
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
              Calculate House Construction Costs Per Square Meter with Current Market Prices
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
              Use our comprehensive construction cost calculator Kenya to estimate accurate building costs based on current 2025 market prices. 
              Calculate material costs, labour expenses, and total construction costs per square meter for your house building project in Kenya.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-medium">Construction Calculator</span>
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">Building Cost Estimator</span>
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium">Material Prices 2025</span>
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium">Labour Costs Kenya</span>
              <span className="bg-red-100 text-red-800 px-4 py-2 rounded-full font-medium">Regional Pricing</span>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator Component */}
      <ConstructionCalculator />

      {/* Key Features Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Use Our Construction Cost Calculator Kenya - Most Comprehensive Building Cost Calculator
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-4">
            Get accurate construction cost estimates based on current Kenya market prices, regional variations, and customizable material preferences
          </p>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-orange-800 text-sm">
              💡 <strong>Pro Tip:</strong> After calculating your construction costs, use our 
              <a href="/mortgage-calculator-kenya" className="text-orange-600 hover:text-orange-700 underline font-semibold ml-1 mr-1">
                Mortgage Calculator Kenya
              </a>
              to determine financing options for your building project!
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2-2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Current 2025 Material Prices</h3>
            <p className="text-gray-600">
              Based on latest Kenya National Bureau of Statistics data and current market rates for cement, sand, steel, roofing materials
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Regional Price Variations</h3>
            <p className="text-gray-600">
              Accurate pricing for Nairobi, Coast, Western, Central and other regions with transport and local market adjustments
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Customizable Pricing</h3>
            <p className="text-gray-600">
              Adjust material and labour costs based on your local suppliers and preferences for future-proof calculations
            </p>
          </div>
        </div>

        {/* Construction Cost Insights */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Construction Cost Insights Kenya 2025
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Average Construction Costs per Square Meter</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Budget Standard (Nairobi)</span>
                  <span className="font-semibold text-gray-900">KES 25,000 - 30,000/m²</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Standard Quality (Nairobi)</span>
                  <span className="font-semibold text-gray-900">KES 30,000 - 40,000/m²</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Premium/Luxury (Nairobi)</span>
                  <span className="font-semibold text-gray-900">KES 50,000 - 80,000/m²</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Coast Region</span>
                  <span className="font-semibold text-gray-900">+5-10% Premium</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Key Cost Components</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Materials</span>
                  <span className="font-semibold text-gray-900">60-70% of total cost</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Labour</span>
                  <span className="font-semibold text-gray-900">25-35% of total cost</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Permits & Professional Fees</span>
                  <span className="font-semibold text-gray-900">3-5% of total cost</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Contingency</span>
                  <span className="font-semibold text-gray-900">10-15% recommended</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Authoritative References */}
        <div className="mt-16 bg-gray-100 rounded-xl p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Authoritative Data Sources
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Government Sources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a 
                    href="https://www.knbs.or.ke/reports/construction-input-price-indices-for-second-quarter-2025/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
                  >
                    KNBS Construction Input Price Indices Q2 2025 
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.knbs.or.ke/wp-content/uploads/2025/04/Construction-Input-Price-Indices-First-Quarter-2025.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
                  >
                    KNBS Construction Price Indices Q1 2025 (PDF)
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Market Research</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a 
                    href="https://syovatandambuki.com/economic-survey-2025-a-slow-year-for-construction-sector/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
                  >
                    Economic Survey 2025 - Construction Sector
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li className="text-gray-600">Current market rates from verified suppliers</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">
            All pricing data updated based on Q2 2025 market conditions and government statistics
          </p>
        </div>
      </div>

      {/* Comprehensive FAQ Content Sections */}
      <div className="max-w-6xl mx-auto px-6 py-16 bg-white">
        
        {/* Average Cost of Building a House in Kenya */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Average Cost of Building a House in Kenya 2025
          </h2>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              The average cost of building a house in Kenya in 2025 ranges from <strong>KES 35,000 to KES 80,000 per square meter</strong>, 
              depending on the location, build quality, and materials used. Based on current market data and our construction cost calculator:
            </p>
            
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2025 Average Construction Costs</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Standard Quality</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Nairobi: KES 45,000-55,000/m²</li>
                    <li>• Coast Region: KES 48,000-58,000/m²</li>
                    <li>• Western Kenya: KES 38,000-48,000/m²</li>
                    <li>• Rural Areas: KES 35,000-45,000/m²</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Premium Quality</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Nairobi: KES 65,000-80,000/m²</li>
                    <li>• Coast Region: KES 68,000-85,000/m²</li>
                    <li>• Western Kenya: KES 58,000-75,000/m²</li>
                    <li>• Rural Areas: KES 55,000-70,000/m²</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-4">
              These rates include all materials, labor, permits, and a 12% contingency buffer. Use our 
              <strong> construction cost calculator above</strong> to get precise estimates based on your specific requirements.
            </p>
          </div>
        </section>

        {/* Cost Per Square Meter */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Cost of Building a House in Kenya Per Square Meter 2025
          </h2>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              The cost per square meter is the most accurate way to estimate construction costs in Kenya. 
              Based on Kenya National Bureau of Statistics data and current market rates:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-3 text-left">Build Quality</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Nairobi/Central</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Coast Region</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Western/Rural</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-medium">Budget Standard</td>
                    <td className="border border-gray-300 px-4 py-3">KES 30,000-35,000/m²</td>
                    <td className="border border-gray-300 px-4 py-3">KES 32,000-38,000/m²</td>
                    <td className="border border-gray-300 px-4 py-3">KES 25,000-30,000/m²</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">Standard Quality</td>
                    <td className="border border-gray-300 px-4 py-3">KES 45,000-55,000/m²</td>
                    <td className="border border-gray-300 px-4 py-3">KES 48,000-58,000/m²</td>
                    <td className="border border-gray-300 px-4 py-3">KES 38,000-48,000/m²</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-medium">Premium/Luxury</td>
                    <td className="border border-gray-300 px-4 py-3">KES 65,000-80,000/m²</td>
                    <td className="border border-gray-300 px-4 py-3">KES 68,000-85,000/m²</td>
                    <td className="border border-gray-300 px-4 py-3">KES 58,000-75,000/m²</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-blue-800 mb-2">💡 Calculator Verification</h4>
              <p className="text-blue-700 text-sm">
                Our construction cost calculator uses these exact per-square-meter rates, adjusted for material choices, 
                location, and current market conditions. Input your requirements above to get precise calculations.
              </p>
            </div>
          </div>
        </section>

        {/* Bedroom-Specific Costs */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Cost of Building Houses by Number of Bedrooms in Kenya
          </h2>

          {/* 1 Bedroom House */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Cost of Building a 1 Bedroom House in Kenya
            </h3>
            <p className="text-gray-700 mb-4">
              A typical 1-bedroom house in Kenya measures 45-50 square meters. Here are the estimated costs:
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">Urban Areas (Nairobi)</h4>
                <ul className="text-green-700 space-y-1">
                  <li>• Budget: KES 1.35M - 1.75M</li>
                  <li>• Standard: KES 2.03M - 2.75M</li>
                  <li>• Premium: KES 2.93M - 4.0M</li>
                </ul>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Semi-Urban Areas</h4>
                <ul className="text-blue-700 space-y-1">
                  <li>• Budget: KES 1.15M - 1.5M</li>
                  <li>• Standard: KES 1.8M - 2.4M</li>
                  <li>• Premium: KES 2.6M - 3.5M</li>
                </ul>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-2">Rural Areas</h4>
                <ul className="text-purple-700 space-y-1">
                  <li>• Budget: KES 1.0M - 1.35M</li>
                  <li>• Standard: KES 1.6M - 2.2M</li>
                  <li>• Premium: KES 2.4M - 3.2M</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 2 Bedroom House */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Cost of Building a 2 Bedroom House in Kenya
            </h3>
            <p className="text-gray-700 mb-4">
              A standard 2-bedroom house typically measures 70-90 square meters. Cost breakdown by location:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Urban Areas (80m²)</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex justify-between"><span>Budget Standard:</span><span className="font-semibold">KES 2.4M - 2.8M</span></li>
                  <li className="flex justify-between"><span>Standard Quality:</span><span className="font-semibold">KES 3.6M - 4.4M</span></li>
                  <li className="flex justify-between"><span>Premium Finish:</span><span className="font-semibold">KES 5.2M - 6.4M</span></li>
                </ul>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Rural Areas (80m²)</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex justify-between"><span>Budget Standard:</span><span className="font-semibold">KES 2.0M - 2.4M</span></li>
                  <li className="flex justify-between"><span>Standard Quality:</span><span className="font-semibold">KES 3.0M - 3.8M</span></li>
                  <li className="flex justify-between"><span>Premium Finish:</span><span className="font-semibold">KES 4.6M - 5.6M</span></li>
                </ul>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-orange-800 mb-2">2 Bedroom Mabati House Cost</h4>
              <p className="text-orange-700 text-sm">
                A 2-bedroom house with mabati (iron sheet) roofing costs about <strong>10-15% less</strong> than tiled roofing. 
                For an 80m² house: Rural areas KES 1.8M-3.2M, Urban areas KES 2.2M-4.0M.
              </p>
            </div>
          </div>

          {/* 3 Bedroom House */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Cost of Building a 3 Bedroom House in Kenya
            </h3>
            <p className="text-gray-700 mb-4">
              The most popular house size in Kenya, typically 100-130 square meters. Detailed cost analysis:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-3 text-left">Location</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Budget (120m²)</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Standard (120m²)</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Premium (120m²)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-medium">Nairobi</td>
                    <td className="border border-gray-300 px-4 py-3">KES 3.6M - 4.2M</td>
                    <td className="border border-gray-300 px-4 py-3">KES 5.4M - 6.6M</td>
                    <td className="border border-gray-300 px-4 py-3">KES 7.8M - 9.6M</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">Coast Region</td>
                    <td className="border border-gray-300 px-4 py-3">KES 3.8M - 4.6M</td>
                    <td className="border border-gray-300 px-4 py-3">KES 5.8M - 7.0M</td>
                    <td className="border border-gray-300 px-4 py-3">KES 8.2M - 10.2M</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-medium">Western Kenya</td>
                    <td className="border border-gray-300 px-4 py-3">KES 3.0M - 3.6M</td>
                    <td className="border border-gray-300 px-4 py-3">KES 4.6M - 5.8M</td>
                    <td className="border border-gray-300 px-4 py-3">KES 7.0M - 9.0M</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">Rural Areas</td>
                    <td className="border border-gray-300 px-4 py-3">KES 2.8M - 3.4M</td>
                    <td className="border border-gray-300 px-4 py-3">KES 4.2M - 5.4M</td>
                    <td className="border border-gray-300 px-4 py-3">KES 6.6M - 8.4M</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">📊 Average Cost Verification</h4>
              <p className="text-green-700 text-sm">
                Based on our calculator data: Average 3-bedroom house (120m²) in Kenya costs <strong>KES 4.8M - 6.2M</strong> 
                for standard quality. This aligns with market research showing most 3-bedroom projects fall within this range.
              </p>
            </div>
          </div>

          {/* 4 Bedroom House */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Cost of Building a 4 Bedroom House in Kenya
            </h3>
            <p className="text-gray-700 mb-4">
              Larger family homes typically range from 150-180 square meters. Cost breakdown:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Standard 4BR (160m²)</h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex justify-between border-b pb-2"><span>Nairobi:</span><span className="font-semibold">KES 7.2M - 8.8M</span></li>
                  <li className="flex justify-between border-b pb-2"><span>Coast Region:</span><span className="font-semibold">KES 7.7M - 9.3M</span></li>
                  <li className="flex justify-between border-b pb-2"><span>Western Kenya:</span><span className="font-semibold">KES 6.1M - 7.7M</span></li>
                  <li className="flex justify-between"><span>Rural Areas:</span><span className="font-semibold">KES 5.6M - 7.2M</span></li>
                </ul>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Premium 4BR (160m²)</h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex justify-between border-b pb-2"><span>Nairobi:</span><span className="font-semibold">KES 10.4M - 12.8M</span></li>
                  <li className="flex justify-between border-b pb-2"><span>Coast Region:</span><span className="font-semibold">KES 10.9M - 13.6M</span></li>
                  <li className="flex justify-between border-b pb-2"><span>Western Kenya:</span><span className="font-semibold">KES 9.3M - 12.0M</span></li>
                  <li className="flex justify-between"><span>Rural Areas:</span><span className="font-semibold">KES 8.8M - 11.2M</span></li>
                </ul>
              </div>
            </div>
          </div>

          {/* 5 Bedroom House */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Cost of Building a 5 Bedroom House in Kenya
            </h3>
            <p className="text-gray-700 mb-4">
              Large family homes or executive residences, typically 200-250 square meters:
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Standard Quality (220m²)</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Nairobi: KES 9.9M - 12.1M</li>
                    <li>• Coast Region: KES 10.6M - 12.8M</li>
                    <li>• Western/Rural: KES 8.4M - 10.6M</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Premium Quality (220m²)</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Nairobi: KES 14.3M - 17.6M</li>
                    <li>• Coast Region: KES 15.0M - 18.7M</li>
                    <li>• Western/Rural: KES 12.8M - 16.5M</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Special Property Types */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Specialized Building Types and Costs in Kenya
          </h2>

          {/* Bungalow */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Cost of Building a Bungalow in Kenya
            </h3>
            <p className="text-gray-700 mb-4">
              Bungalows are single-story houses popular in Kenya. Based on 2025 market rates:
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">3BR Bungalow (120m²)</h4>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Standard: KES 5.4M - 6.6M</li>
                  <li>• Premium: KES 7.8M - 9.6M</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">4BR Bungalow (160m²)</h4>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Standard: KES 7.2M - 8.8M</li>
                  <li>• Premium: KES 10.4M - 12.8M</li>
                </ul>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Executive Bungalow (200m²)</h4>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Standard: KES 9.0M - 11.0M</li>
                  <li>• Luxury: KES 13.0M - 16.0M</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Villa */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Cost of Building a Villa in Kenya
            </h3>
            <p className="text-gray-700 mb-4">
              Villas are luxury residential properties with premium finishes, typically 250-400m²:
            </p>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-purple-800 mb-3">Medium Villa (300m²)</h4>
                  <ul className="text-purple-700 space-y-2">
                    <li>• Nairobi/Karen: KES 19.5M - 24.0M</li>
                    <li>• Coast (Nyali/Diani): KES 20.4M - 25.5M</li>
                    <li>• Nakuru/Eldoret: KES 17.4M - 22.5M</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-800 mb-3">Large Villa (400m²)</h4>
                  <ul className="text-purple-700 space-y-2">
                    <li>• Nairobi Premium Areas: KES 26.0M - 32.0M</li>
                    <li>• Coast Luxury Locations: KES 27.2M - 34.0M</li>
                    <li>• Upcountry Towns: KES 23.2M - 30.0M</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Apartments and Flats */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Cost of Building Apartments and Flats in Kenya
            </h3>
            <p className="text-gray-700 mb-4">
              Multi-story residential buildings require specialized construction techniques:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 mb-6">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-3 text-left">Apartment Type</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Cost per Unit</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Cost per m²</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">Bedsitter (25m²)</td>
                    <td className="border border-gray-300 px-4 py-3">KES 1.1M - 1.4M</td>
                    <td className="border border-gray-300 px-4 py-3">KES 44,000 - 56,000/m²</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">1BR Apartment (45m²)</td>
                    <td className="border border-gray-300 px-4 py-3">KES 2.0M - 2.5M</td>
                    <td className="border border-gray-300 px-4 py-3">KES 44,000 - 56,000/m²</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">2BR Apartment (70m²)</td>
                    <td className="border border-gray-300 px-4 py-3">KES 3.1M - 3.9M</td>
                    <td className="border border-gray-300 px-4 py-3">KES 44,000 - 56,000/m²</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">3BR Apartment (100m²)</td>
                    <td className="border border-gray-300 px-4 py-3">KES 4.4M - 5.6M</td>
                    <td className="border border-gray-300 px-4 py-3">KES 44,000 - 56,000/m²</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Simple and Budget Houses */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Cost of Building Simple and Budget Houses in Kenya
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-green-800 mb-3">Simple House Features</h4>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Basic foundation (stone/concrete)</li>
                  <li>• Block walls with cement plaster</li>
                  <li>• Mabati roofing</li>
                  <li>• Concrete floors</li>
                  <li>• Basic electrical and plumbing</li>
                  <li>• Minimal finishes</li>
                </ul>
                <p className="text-green-800 font-semibold mt-3">
                  Cost: KES 25,000 - 30,000 per m²
                </p>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-blue-800 mb-3">Simple House Examples</h4>
                <ul className="text-blue-700 text-sm space-y-2">
                  <li>• 2BR Simple House (70m²): <strong>KES 1.75M - 2.1M</strong></li>
                  <li>• 3BR Simple House (100m²): <strong>KES 2.5M - 3.0M</strong></li>
                  <li>• 4BR Simple House (130m²): <strong>KES 3.25M - 3.9M</strong></li>
                </ul>
                <p className="text-blue-800 text-xs mt-3">
                  *Prices for rural and semi-urban areas
                </p>
              </div>
            </div>
          </div>

          {/* Brick House */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Cost of Building a Brick House in Kenya
            </h3>
            <p className="text-gray-700 mb-4">
              Brick houses use fired clay bricks or machine-cut stone blocks. Cost comparison:
            </p>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-orange-800 mb-2">Clay Brick Houses</h4>
                  <p className="text-orange-700 text-sm mb-3">
                    Clay bricks cost KES 15-25 per piece. For a 120m² house, you need ~5,400 bricks.
                  </p>
                  <ul className="text-orange-700 text-sm space-y-1">
                    <li>• Material premium: +5-8% over blocks</li>
                    <li>• Labour premium: +10-15% (skilled mason)</li>
                    <li>• Total cost: KES 48,000-58,000/m²</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-800 mb-2">Machine-Cut Block Houses</h4>
                  <p className="text-orange-700 text-sm mb-3">
                    Machine-cut blocks cost KES 35-45 per piece. Faster construction, lower labour.
                  </p>
                  <ul className="text-orange-700 text-sm space-y-1">
                    <li>• Material cost: Standard pricing</li>
                    <li>• Labour savings: -5-10%</li>
                    <li>• Total cost: KES 45,000-55,000/m²</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Container House */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Cost of Building a Container House in Kenya
            </h3>
            <p className="text-gray-700 mb-4">
              Shipping container homes are gaining popularity as affordable, quick-build options:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Basic Container Home (20ft)</h4>
                <ul className="text-gray-700 text-sm space-y-2">
                  <li>• Container cost: KES 350,000 - 450,000</li>
                  <li>• Modifications: KES 200,000 - 300,000</li>
                  <li>• Foundation: KES 50,000 - 100,000</li>
                  <li>• Utilities: KES 150,000 - 250,000</li>
                  <li><strong>Total: KES 750,000 - 1,100,000</strong></li>
                </ul>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Multi-Container Home (40ft x 2)</h4>
                <ul className="text-gray-700 text-sm space-y-2">
                  <li>• Containers (2): KES 800,000 - 1,000,000</li>
                  <li>• Modifications: KES 400,000 - 600,000</li>
                  <li>• Foundation: KES 100,000 - 150,000</li>
                  <li>• Utilities: KES 250,000 - 400,000</li>
                  <li><strong>Total: KES 1,550,000 - 2,150,000</strong></li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <h5 className="font-semibold text-yellow-800 mb-2">⚠️ Container House Considerations</h5>
              <ul className="text-yellow-700 text-sm space-y-1">
                <li>• Check local building codes and permits</li>
                <li>• Insulation crucial for Kenya's climate</li>
                <li>• Professional structural modifications required</li>
                <li>• Limited resale value compared to conventional homes</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Regional Analysis */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Cost of Building in Rural Kenya vs Urban Areas
          </h2>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Building costs vary significantly between rural and urban areas in Kenya. Here's a comprehensive analysis:
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-800 mb-4">Rural Kenya Advantages</h3>
                <ul className="text-green-700 space-y-2">
                  <li className="flex items-start"><span className="text-green-600 mr-2">✓</span>Land costs: 60-80% lower than urban</li>
                  <li className="flex items-start"><span className="text-green-600 mr-2">✓</span>Labor costs: 25-40% lower wages</li>
                  <li className="flex items-start"><span className="text-green-600 mr-2">✓</span>Local materials: Stone, sand readily available</li>
                  <li className="flex items-start"><span className="text-green-600 mr-2">✓</span>Lower permit fees and regulations</li>
                  <li className="flex items-start"><span className="text-green-600 mr-2">✓</span>Community labor support available</li>
                </ul>
                <div className="mt-4 bg-green-100 rounded-lg p-3">
                  <p className="text-green-800 font-semibold text-sm">
                    Average Savings: 20-30% total cost reduction
                  </p>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-red-800 mb-4">Rural Kenya Challenges</h3>
                <ul className="text-red-700 space-y-2">
                  <li className="flex items-start"><span className="text-red-600 mr-2">×</span>Transport costs: 15-25% premium on materials</li>
                  <li className="flex items-start"><span className="text-red-600 mr-2">×</span>Limited skilled labor availability</li>
                  <li className="flex items-start"><span className="text-red-600 mr-2">×</span>Longer construction timelines</li>
                  <li className="flex items-start"><span className="text-red-600 mr-2">×</span>Limited material supplier options</li>
                  <li className="flex items-start"><span className="text-red-600 mr-2">×</span>Access to utilities more expensive</li>
                </ul>
                <div className="mt-4 bg-red-100 rounded-lg p-3">
                  <p className="text-red-800 font-semibold text-sm">
                    Transport can add: 5-15% to material costs
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">Regional Cost Comparison (Standard 3BR House - 120m²)</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-blue-300 text-sm">
                  <thead>
                    <tr className="bg-blue-100">
                      <th className="border border-blue-300 px-3 py-2 text-left">Region</th>
                      <th className="border border-blue-300 px-3 py-2 text-left">Cost Range</th>
                      <th className="border border-blue-300 px-3 py-2 text-left">vs Nairobi</th>
                      <th className="border border-blue-300 px-3 py-2 text-left">Key Factors</th>
                    </tr>
                  </thead>
                  <tbody className="text-blue-700">
                    <tr>
                      <td className="border border-blue-300 px-3 py-2 font-medium">Nairobi (Urban)</td>
                      <td className="border border-blue-300 px-3 py-2">KES 5.4M - 6.6M</td>
                      <td className="border border-blue-300 px-3 py-2">Baseline</td>
                      <td className="border border-blue-300 px-3 py-2">High labor, land costs</td>
                    </tr>
                    <tr className="bg-blue-25">
                      <td className="border border-blue-300 px-3 py-2 font-medium">Central Kenya (Rural)</td>
                      <td className="border border-blue-300 px-3 py-2">KES 4.8M - 5.8M</td>
                      <td className="border border-blue-300 px-3 py-2">-10%</td>
                      <td className="border border-blue-300 px-3 py-2">Good material access</td>
                    </tr>
                    <tr>
                      <td className="border border-blue-300 px-3 py-2 font-medium">Western Kenya</td>
                      <td className="border border-blue-300 px-3 py-2">KES 4.6M - 5.8M</td>
                      <td className="border border-blue-300 px-3 py-2">-15%</td>
                      <td className="border border-blue-300 px-3 py-2">Lower labor costs</td>
                    </tr>
                    <tr className="bg-blue-25">
                      <td className="border border-blue-300 px-3 py-2 font-medium">Coast Region</td>
                      <td className="border border-blue-300 px-3 py-2">KES 5.8M - 7.0M</td>
                      <td className="border border-blue-300 px-3 py-2">+8%</td>
                      <td className="border border-blue-300 px-3 py-2">Transport, humidity factors</td>
                    </tr>
                    <tr>
                      <td className="border border-blue-300 px-3 py-2 font-medium">Nyanza (Rural)</td>
                      <td className="border border-blue-300 px-3 py-2">KES 4.4M - 5.4M</td>
                      <td className="border border-blue-300 px-3 py-2">-18%</td>
                      <td className="border border-blue-300 px-3 py-2">Lowest labor costs</td>
                    </tr>
                    <tr className="bg-blue-25">
                      <td className="border border-blue-300 px-3 py-2 font-medium">Eastern Kenya</td>
                      <td className="border border-blue-300 px-3 py-2">KES 4.7M - 5.8M</td>
                      <td className="border border-blue-300 px-3 py-2">-12%</td>
                      <td className="border border-blue-300 px-3 py-2">Variable material access</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-100 border border-gray-300 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">💡 Use Our Calculator for Accurate Regional Pricing</h4>
              <p className="text-gray-700 text-sm">
                Our construction cost calculator above automatically adjusts for regional pricing differences. 
                Simply select your location from the dropdown menu to get accurate local estimates including 
                transport costs, labor rate variations, and material availability factors.
              </p>
            </div>
          </div>
        </section>

        {/* Calculator Verification Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            How Our Construction Cost Calculator Ensures Accuracy
          </h2>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Our calculator uses real-time market data and proven mathematical formulas to provide accurate construction cost estimates:
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-orange-800 mb-3">Data Sources</h3>
                <ul className="text-orange-700 text-sm space-y-2">
                  <li>• Kenya National Bureau of Statistics (KNBS)</li>
                  <li>• Current supplier price lists</li>
                  <li>• Regional market surveys</li>
                  <li>• Construction industry reports</li>
                  <li>• Verified contractor quotes</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Calculation Method</h3>
                <ul className="text-blue-700 text-sm space-y-2">
                  <li>• Material quantities per m² basis</li>
                  <li>• Regional price multipliers</li>
                  <li>• Quality standard adjustments</li>
                  <li>• Labour rate calculations</li>
                  <li>• Permit and fee inclusions</li>
                </ul>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-3">Accuracy Features</h3>
                <ul className="text-green-700 text-sm space-y-2">
                  <li>• Customizable pricing inputs</li>
                  <li>• Real-time calculations</li>
                  <li>• Contingency buffer options</li>
                  <li>• Detailed cost breakdowns</li>
                  <li>• Regular data updates</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Mathematical Formula Behind Our Calculator</h3>
              <div className="text-sm text-gray-700 space-y-3">
                <p><strong>Total Cost = (Material Costs + Labour Costs + Permit Costs) × Regional Multiplier × Quality Multiplier + Contingency</strong></p>
                
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Material Calculation Example:</h4>
                    <ul className="text-xs space-y-1">
                      <li>• Cement: House Size (m²) × 8 bags × KES 780</li>
                      <li>• Sand: House Size (m²) × 0.5 m³ × KES 2,500</li>
                      <li>• Steel: House Size (m²) × 15 kg × KES 130</li>
                      <li>• Roofing: House Size (m²) × 1.3 × Material Rate</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Regional Multipliers:</h4>
                    <ul className="text-xs space-y-1">
                      <li>• Nairobi/Central: 1.0 (baseline)</li>
                      <li>• Coast: 1.08 (+8% transport premium)</li>
                      <li>• Western: 0.85 (-15% labor savings)</li>
                      <li>• Rural areas: 0.80-0.90 (varies by access)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Updated Market Trends */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            2025 Construction Market Trends and Price Updates Kenya
          </h2>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              The Kenya construction market has experienced significant changes in 2025. Here are the key trends affecting building costs:
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-red-800 mb-4">Price Increases (2025)</h3>
                <ul className="text-red-700 space-y-2">
                  <li>• Cement prices: +15% (now KES 720-850/bag)</li>
                  <li>• Steel reinforcement: +12% (now KES 120-150/kg)</li>
                  <li>• Transport costs: +18% due to fuel prices</li>
                  <li>• Skilled labour: +10% due to high demand</li>
                  <li>• Roofing materials: +8% across all types</li>
                </ul>
                <div className="mt-4 bg-red-100 rounded-lg p-3">
                  <p className="text-red-800 font-semibold text-sm">
                    Overall construction cost increase: 12-17% from 2024
                  </p>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-800 mb-4">Cost-Saving Opportunities</h3>
                <ul className="text-green-700 space-y-2">
                  <li>• Local material sourcing: Save 5-15%</li>
                  <li>• Off-peak construction: Save 8-12%</li>
                  <li>• Bulk material purchases: Save 3-8%</li>
                  <li>• Alternative materials: Save 10-20%</li>
                  <li>• Direct labor hiring: Save 5-10%</li>
                </ul>
                <div className="mt-4 bg-green-100 rounded-lg p-3">
                  <p className="text-green-800 font-semibold text-sm">
                    Strategic planning can offset 50-80% of price increases
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">Government Policy Impact on Construction Costs</h3>
              <div className="text-blue-700 space-y-3">
                <p>The Kenya government's 2025 policies significantly affect construction costs:</p>
                <ul className="space-y-2">
                  <li>• <strong>Affordable Housing Program:</strong> Standardized designs reduce costs by 10-15%</li>
                  <li>• <strong>Import Duty Adjustments:</strong> Steel imports now 8% cheaper, local cement protected</li>
                  <li>• <strong>Digital Building Permits:</strong> Faster approvals, 20% reduction in permit processing time</li>
                  <li>• <strong>Green Building Incentives:</strong> Tax rebates for eco-friendly construction materials</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h4 className="font-semibold text-yellow-800 mb-3">🔄 Our Calculator Stays Current</h4>
              <p className="text-yellow-700 text-sm">
                We regularly update our construction cost calculator with the latest market prices, 
                government policy changes, and regional variations. The estimates you see reflect 
                current Q3 2025 market conditions and include recent price adjustments.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="text-center bg-gradient-to-r from-orange-100 to-yellow-100 border border-orange-200 rounded-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Calculate Your Construction Costs?
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Use our comprehensive calculator above to get accurate, up-to-date construction cost estimates 
            for your specific project in Kenya. All calculations are based on current 2025 market prices.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white rounded-lg p-4 border border-orange-200">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="font-semibold text-gray-900 mb-1">Accurate Estimates</h3>
              <p className="text-gray-600">Based on current market data and KNBS statistics</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-orange-200">
              <div className="text-2xl mb-2">🏗️</div>
              <h3 className="font-semibold text-gray-900 mb-1">All House Types</h3>
              <p className="text-gray-600">From bedsitters to luxury villas and everything in between</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-orange-200">
              <div className="text-2xl mb-2">📍</div>
              <h3 className="font-semibold text-gray-900 mb-1">Regional Pricing</h3>
              <p className="text-gray-600">Accurate costs for all regions across Kenya</p>
            </div>
          </div>
          
          <div className="mt-6">
            <a 
              href="#calculator" 
              className="inline-block bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors"
            >
              Calculate Your Building Costs Now
            </a>
          </div>
        </section>

      </div>
      
      <Footer />
    </div>
  );
}