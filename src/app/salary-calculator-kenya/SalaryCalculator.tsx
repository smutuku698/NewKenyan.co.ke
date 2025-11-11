'use client';

import { useState } from 'react';

export default function SalaryCalculator() {
  const [grossSalary, setGrossSalary] = useState<number>(50000);
  const [results, setResults] = useState<any>(null);

  // NSSF Calculation (6% capped at KES 2,160)
  const calculateNSSF = (gross: number) => {
    return Math.min(gross * 0.06, 2160);
  };

  // NHIF Calculation (Tiered rates)
  const calculateNHIF = (gross: number) => {
    if (gross <= 5999) return 150;
    if (gross <= 7999) return 300;
    if (gross <= 11999) return 400;
    if (gross <= 14999) return 500;
    if (gross <= 19999) return 600;
    if (gross <= 24999) return 750;
    if (gross <= 29999) return 850;
    if (gross <= 34999) return 900;
    if (gross <= 39999) return 950;
    if (gross <= 44999) return 1000;
    if (gross <= 49999) return 1100;
    if (gross <= 59999) return 1200;
    if (gross <= 69999) return 1300;
    if (gross <= 79999) return 1400;
    if (gross <= 89999) return 1500;
    if (gross <= 99999) return 1600;
    return 1700;
  };

  // PAYE Calculation (Progressive tax bands)
  const calculatePAYE = (taxableIncome: number) => {
    let tax = 0;
    const monthlyIncome = taxableIncome;

    // Band 1: 0 - 24,000 @ 10%
    if (monthlyIncome > 0) {
      const band1 = Math.min(monthlyIncome, 24000);
      tax += band1 * 0.10;
    }

    // Band 2: 24,001 - 32,333 @ 25%
    if (monthlyIncome > 24000) {
      const band2 = Math.min(monthlyIncome - 24000, 8333);
      tax += band2 * 0.25;
    }

    // Band 3: 32,334 - 500,000 @ 30%
    if (monthlyIncome > 32333) {
      const band3 = Math.min(monthlyIncome - 32333, 467667);
      tax += band3 * 0.30;
    }

    // Band 4: Above 500,000 @ 35%
    if (monthlyIncome > 500000) {
      const band4 = monthlyIncome - 500000;
      tax += band4 * 0.35;
    }

    // Apply personal relief (KES 2,400/month)
    const personalRelief = 2400;
    const netPAYE = Math.max(tax - personalRelief, 0);

    return { grossTax: tax, personalRelief, netPAYE };
  };

  // Housing Levy (1.5% of gross)
  const calculateHousingLevy = (gross: number) => {
    return gross * 0.015;
  };

  const handleCalculate = () => {
    const nssf = calculateNSSF(grossSalary);
    const taxableIncome = grossSalary - nssf;
    const payeDetails = calculatePAYE(taxableIncome);
    const nhif = calculateNHIF(grossSalary);
    const housingLevy = calculateHousingLevy(grossSalary);

    const totalDeductions = nssf + payeDetails.netPAYE + nhif + housingLevy;
    const netSalary = grossSalary - totalDeductions;

    setResults({
      grossSalary,
      nssf,
      taxableIncome,
      payeGross: payeDetails.grossTax,
      personalRelief: payeDetails.personalRelief,
      payeNet: payeDetails.netPAYE,
      nhif,
      housingLevy,
      totalDeductions,
      netSalary,
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Calculate Your Net Salary - Kenya Salary Calculator
        </h2>

        {/* Input Section */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Your Gross Monthly Salary (KES)
          </label>
          <input
            type="number"
            value={grossSalary}
            onChange={(e) => setGrossSalary(Number(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            placeholder="e.g., 50000"
          />
          <button
            onClick={handleCalculate}
            className="w-full mt-4 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Calculate Net Salary
          </button>
        </div>

        {/* Results Section */}
        {results && (
          <div className="mt-8">
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Salary Breakdown</h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Gross Salary:</span>
                  <span className="text-lg font-bold text-gray-900">
                    KES {results.grossSalary.toLocaleString()}
                  </span>
                </div>

                <div className="ml-4 space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">NSSF (6%):</span>
                    <span className="text-red-600">-KES {results.nssf.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center font-medium">
                    <span className="text-gray-700">Taxable Income:</span>
                    <span className="text-gray-900">KES {results.taxableIncome.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">PAYE Tax (Gross):</span>
                    <span className="text-gray-500">KES {results.payeGross.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">Personal Relief:</span>
                    <span className="text-green-600">+KES {results.personalRelief.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">PAYE Tax (Net):</span>
                    <span className="text-red-600">-KES {results.payeNet.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">NHIF:</span>
                    <span className="text-red-600">-KES {results.nhif.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Housing Levy (1.5%):</span>
                    <span className="text-red-600">-KES {results.housingLevy.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center py-3 border-t-2 border-gray-300 mt-4">
                  <span className="font-medium text-gray-700">Total Deductions:</span>
                  <span className="text-lg font-bold text-red-600">
                    -KES {results.totalDeductions.toLocaleString()}
                  </span>
                </div>

                <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">Net Salary (Take-Home):</span>
                    <span className="text-3xl font-bold text-green-700">
                      KES {results.netSalary.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    Deduction Rate: {((results.totalDeductions / results.grossSalary) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>

            {/* Financial Planning Tips */}
            <div className="mt-6 grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">💰 Budget Guideline</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Housing: Max 30% (KES {(results.netSalary * 0.3).toLocaleString()})</li>
                  <li>• Savings: Min 20% (KES {(results.netSalary * 0.2).toLocaleString()})</li>
                  <li>• Living Expenses: 50% (KES {(results.netSalary * 0.5).toLocaleString()})</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">🏠 Home Affordability</h4>
                <p className="text-sm text-green-700">
                  With your net salary, you can afford a monthly mortgage payment of up to{' '}
                  <strong>KES {(results.netSalary * 0.3).toLocaleString()}</strong>.
                </p>
                <a href="/mortgage-calculator-kenya" className="text-green-600 underline text-xs mt-2 inline-block">
                  → Calculate Mortgage
                </a>
              </div>
            </div>
          </div>
        )}

        {!results && (
          <div className="text-center text-gray-500 py-8">
            Enter your gross salary and click calculate to see your net pay breakdown
          </div>
        )}
      </div>
    </div>
  );
}
