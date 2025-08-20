'use client';

import { useState, useEffect } from 'react';
import { Calculator, Home, DollarSign, Calendar, Percent, FileText, AlertCircle, ExternalLink } from 'lucide-react';

interface MortgageCalculation {
  monthlyPayment: number;
  totalAmount: number;
  totalInterest: number;
  totalFees: number;
  breakdown: {
    principal: number;
    processingFee: number;
    stampDuty: number;
    legalFees: number;
    valuationFee: number;
  };
}

export default function MortgageCalculator() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'breakdown' | 'comparison'>('calculator');
  
  // Calculator inputs
  const [propertyValue, setPropertyValue] = useState<string>('5000000');
  const [downPayment, setDownPayment] = useState<string>('15');
  const [interestRate, setInterestRate] = useState<string>('13');
  const [loanTenure, setLoanTenure] = useState<string>('20');
  const [includeInsurance, setIncludeInsurance] = useState<boolean>(true);
  
  // Results
  const [calculation, setCalculation] = useState<MortgageCalculation | null>(null);
  
  // Calculate mortgage
  useEffect(() => {
    const propValue = parseFloat(propertyValue) || 0;
    const downPercent = parseFloat(downPayment) / 100 || 0;
    const annualRate = parseFloat(interestRate) / 100 || 0;
    const years = parseInt(loanTenure) || 0;
    
    if (propValue > 0 && years > 0) {
      const downAmount = propValue * downPercent;
      const loanAmount = propValue - downAmount;
      const monthlyRate = annualRate / 12;
      const numberOfPayments = years * 12;
      
      // Monthly payment calculation using amortization formula
      const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      
      const totalAmount = monthlyPayment * numberOfPayments;
      const totalInterest = totalAmount - loanAmount;
      
      // Calculate fees
      const processingFee = loanAmount * 0.01; // 1% of loan amount
      const stampDuty = propValue > 1000000 ? propValue * 0.04 : 0; // 4% for properties over 1M
      const legalFees = propValue * 0.0075; // 0.75% average
      const valuationFee = propValue * 0.005; // 0.5% average
      const totalFees = processingFee + stampDuty + legalFees + valuationFee;
      
      setCalculation({
        monthlyPayment,
        totalAmount,
        totalInterest,
        totalFees,
        breakdown: {
          principal: loanAmount,
          processingFee,
          stampDuty,
          legalFees,
          valuationFee
        }
      });
    }
  }, [propertyValue, downPayment, interestRate, loanTenure]);
  
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const tabs = [
    { id: 'calculator', label: 'Calculator', icon: Calculator },
    { id: 'breakdown', label: 'Cost Breakdown', icon: FileText },
    { id: 'comparison', label: 'Rate Comparison', icon: Percent }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-center border-b border-gray-200">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-3 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Calculator Tab */}
      {activeTab === 'calculator' && (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Home className="w-6 h-6 text-green-600 mr-3" />
              Mortgage Details
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Value (KES)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(e.target.value.replace(/[^0-9]/g, ''))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="5,000,000"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">Enter the total property value</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Down Payment (%)
                </label>
                <div className="relative">
                  <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(e.target.value)}
                    min="10"
                    max="50"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>Minimum 10%</span>
                  <span>Recommended 15-20%</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interest Rate (% per annum)
                </label>
                <div className="relative">
                  <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    step="0.1"
                    min="5"
                    max="20"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>KMRC: 8.5-9.5%</span>
                  <span>Commercial: 12-15%</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Tenure (Years)
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {[15, 20, 25].map(year => (
                      <option key={year} value={year}>{year} years</option>
                    ))}
                  </select>
                </div>
                <p className="text-sm text-gray-500 mt-1">Typical range: 15-25 years</p>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="insurance"
                  checked={includeInsurance}
                  onChange={(e) => setIncludeInsurance(e.target.checked)}
                  className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="insurance" className="ml-2 text-sm text-gray-700">
                  Include mortgage insurance (recommended)
                </label>
              </div>
            </div>
          </div>
          
          {/* Results */}
          <div className="space-y-6">
            {calculation && (
              <>
                {/* Monthly Payment Card */}
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-8 rounded-xl text-white">
                  <h3 className="text-lg font-medium mb-2 opacity-90">Monthly Payment</h3>
                  <div className="text-4xl font-bold mb-2">
                    {formatCurrency(calculation.monthlyPayment)}
                  </div>
                  <p className="text-green-100">
                    Principal & Interest for {loanTenure} years
                  </p>
                </div>
                
                {/* Summary Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-600 mb-2">Total Interest</h4>
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-red-600 break-words">
                      {formatCurrency(calculation.totalInterest)}
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-600 mb-2">Total Fees</h4>
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-600 break-words">
                      {formatCurrency(calculation.totalFees)}
                    </div>
                  </div>
                </div>
                
                {/* Loan Summary */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Loan Summary</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property Value:</span>
                      <span className="font-medium">{formatCurrency(parseFloat(propertyValue))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Down Payment ({downPayment}%):</span>
                      <span className="font-medium">{formatCurrency(parseFloat(propertyValue) * parseFloat(downPayment) / 100)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-3">
                      <span className="text-gray-600">Loan Amount:</span>
                      <span className="font-medium">{formatCurrency(calculation.breakdown.principal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Amount Payable:</span>
                      <span className="font-bold text-lg">{formatCurrency(calculation.totalAmount)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Warning */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-yellow-800">
                      <p className="font-medium mb-1">Important Note</p>
                      <p>This calculator provides estimates based on standard rates. Final terms may vary by lender. Always consult with your bank for exact figures.</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Cost Breakdown Tab */}
      {activeTab === 'breakdown' && calculation && (
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Cost Breakdown</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-700">Loan Principal</span>
                <span className="font-semibold">{formatCurrency(calculation.breakdown.principal)}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-700">Processing Fee (1%)</span>
                <span className="font-semibold text-orange-600">{formatCurrency(calculation.breakdown.processingFee)}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-700">Stamp Duty (4%)</span>
                <span className="font-semibold text-red-600">{formatCurrency(calculation.breakdown.stampDuty)}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-700">Legal Fees (0.75%)</span>
                <span className="font-semibold text-blue-600">{formatCurrency(calculation.breakdown.legalFees)}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-700">Valuation Fee (0.5%)</span>
                <span className="font-semibold text-purple-600">{formatCurrency(calculation.breakdown.valuationFee)}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 bg-gray-50 rounded-lg px-4 mt-6">
                <span className="font-bold text-gray-900">Total Initial Costs</span>
                <span className="font-bold text-xl">{formatCurrency(calculation.totalFees)}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Payment Schedule Overview</h3>
            
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {formatCurrency(calculation.monthlyPayment)}
                </div>
                <p className="text-gray-600">Monthly Payment</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">
                    {loanTenure}
                  </div>
                  <p className="text-sm text-gray-600">Years</p>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">
                    {parseInt(loanTenure) * 12}
                  </div>
                  <p className="text-sm text-gray-600">Payments</p>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Interest vs Principal</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Interest:</span>
                    <span className="font-medium text-red-600">{formatCurrency(calculation.totalInterest)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total Principal:</span>
                    <span className="font-medium text-green-600">{formatCurrency(calculation.breakdown.principal)}</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex rounded-full overflow-hidden h-3 bg-gray-200">
                    <div 
                      className="bg-red-500" 
                      style={{ width: `${(calculation.totalInterest / calculation.totalAmount) * 100}%` }}
                    />
                    <div 
                      className="bg-green-500" 
                      style={{ width: `${(calculation.breakdown.principal / calculation.totalAmount) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Interest ({((calculation.totalInterest / calculation.totalAmount) * 100).toFixed(1)}%)</span>
                    <span>Principal ({((calculation.breakdown.principal / calculation.totalAmount) * 100).toFixed(1)}%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rate Comparison Tab */}
      {activeTab === 'comparison' && (
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Current Mortgage Rates Kenya 2025 - Mortgage Loan Calculator Kenya Comparison
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* CBR Rate */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-semibold">Central Bank Rate</h4>
                  <p className="text-green-100 text-sm">As of August 2025</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">9.5%</div>
                </div>
              </div>
              <a 
                href="https://www.centralbank.go.ke/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-green-100 hover:text-white text-sm"
              >
                View CBR Updates <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
            
            {/* KMRC Rates */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-semibold">KMRC Fixed Rate</h4>
                  <p className="text-blue-100 text-sm">Government backed</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">8.5-9.5%</div>
                </div>
              </div>
              <a 
                href="https://kmrc.co.ke/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-100 hover:text-white text-sm"
              >
                KMRC Calculator <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
            
            {/* Commercial Banks */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-semibold">Commercial Banks</h4>
                  <p className="text-purple-100 text-sm">Variable rates</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">5.9-15%</div>
                </div>
              </div>
              <a 
                href="https://www.sc.com/ke/mortgages/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-purple-100 hover:text-white text-sm"
              >
                Compare Banks <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>
          
          {/* Detailed Comparison Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h4 className="text-xl font-semibold text-gray-900">Detailed Rate Comparison</h4>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lender Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest Rate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loan Tenure</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min. Down Payment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">KMRC Fixed Rate</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">8.5% - 9.5%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Up to 25 years</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                      <a href="https://kmrc.co.ke/" target="_blank" rel="noopener noreferrer" className="hover:underline">KMRC Official</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Standard Chartered</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-semibold">7.99% - 9.99% (Fixed)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">20-25 years</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                      <a href="https://www.sc.com/ke/mortgages/" target="_blank" rel="noopener noreferrer" className="hover:underline">SC Kenya</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">National Bank</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600 font-semibold">12% - 15%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15-25 years</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">20%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                      <a href="https://nationalbank.co.ke/" target="_blank" rel="noopener noreferrer" className="hover:underline">National Bank</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* FAQ Section */}
      <div className="mt-16 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            Frequently Asked Questions - Mortgage Calculator Kenya | Mortgage Loan Calculator Kenya
          </h2>
        </div>
        
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  What are the current mortgage rates in Kenya for 2025?
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our mortgage calculator Kenya shows current mortgage rates ranging from 8.5% to 15% as of August 2025. KMRC offers fixed rates of 8.5-9.5% for equity home loans, 
                  while commercial banks offer variable rates from 5.9% to 7.4% and fixed rates from 12% to 15%. 
                  The Central Bank Rate is currently at 9.5%, which influences all mortgage loan rates.
                  <br />
                  <a href="https://www.centralbank.go.ke/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center mt-1">
                    View current CBR <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  How much down payment do I need for a mortgage in Kenya?
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Most banks require a minimum down payment of 10-20% of the property value. KMRC-backed loans typically require 10%, 
                  while some commercial banks may require up to 20%. A higher down payment reduces your loan amount and monthly payments.
                  <br />
                  <a href="https://nationalbank.co.ke/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center mt-1">
                    National Bank mortgage details <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  What additional costs should I expect when getting a mortgage?
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Additional costs include: Processing fees (1% of loan amount), Stamp duty (4% for properties over KSh 1M), 
                  Legal fees (0.5-1% of property value), Valuation fees (0.5% of property value), and mortgage insurance premiums.
                  <br />
                  <a href="https://kra.go.ke/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center mt-1">
                    KRA stamp duty info <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  What is KMRC and how does it help with mortgages?
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Kenya Mortgage Refinance Company (KMRC) is a government-backed institution that provides affordable mortgage financing. 
                  KMRC offers fixed interest rates of 8.5-9.5%, which are typically lower than commercial bank rates.
                  <br />
                  <a href="https://kmrc.co.ke/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center mt-1">
                    KMRC official calculator <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  How accurate is this mortgage calculator Kenya for mortgage loan calculations?
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our mortgage payment calculator Kenya uses the standard amortization formula and current mortgage rates as of August 2025. 
                  This mortgage loan calculator Kenya provides highly accurate estimates based on official CBR rates and current market conditions. 
                  However, final mortgage loan terms may vary by lender based on your creditworthiness, income, and other factors. 
                  Always consult with your preferred bank for exact figures.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Can I get a mortgage for properties outside Nairobi?
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Yes, most banks offer mortgages for properties nationwide including Mombasa, Kisumu, Nakuru, and other major towns. 
                  However, some lenders may have different terms or require higher down payments for properties in certain locations.
                  <br />
                  <a href="https://www.sc.com/ke/mortgages/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center mt-1">
                    Standard Chartered mortgage areas <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reference Links Section */}
      <div className="mt-12 bg-gray-50 rounded-xl p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
          Official References & Sources
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <ExternalLink className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Central Bank of Kenya</h4>
            <a 
              href="https://www.centralbank.go.ke/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              Current CBR & Rates
            </a>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <ExternalLink className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">KMRC</h4>
            <a 
              href="https://kmrc.co.ke/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              KMRC Home Loan Calculator
            </a>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <ExternalLink className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Standard Chartered</h4>
            <a 
              href="https://www.sc.com/ke/mortgages/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              SC Mortgage Rates
            </a>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <ExternalLink className="w-6 h-6 text-red-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">KRA</h4>
            <a 
              href="https://kra.go.ke/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              Stamp Duty Information
            </a>
          </div>
        </div>
        
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>All rates and information are based on official sources as of August 2025. 
          Rates may change. Always verify current rates with your preferred lender.</p>
        </div>
      </div>
    </div>
  );
}