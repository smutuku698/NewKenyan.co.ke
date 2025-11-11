'use client';

import { useState } from 'react';

export default function MoneyMarketCalculator() {
  const [initialAmount, setInitialAmount] = useState<number>(100000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(10000);
  const [annualRate, setAnnualRate] = useState<number>(13.5);
  const [years, setYears] = useState<number>(5);
  const [results, setResults] = useState<any>(null);

  const calculateReturns = () => {
    const months = years * 12;
    const monthlyRate = annualRate / 100 / 12;
    const taxRate = 0.15; // 15% withholding tax

    let balance = initialAmount;
    let totalContributions = initialAmount;
    let totalInterestGross = 0;
    let totalInterestNet = 0;

    const monthlyData = [];

    for (let month = 1; month <= months; month++) {
      // Add monthly contribution
      if (month > 1) {
        balance += monthlyContribution;
        totalContributions += monthlyContribution;
      }

      // Calculate interest
      const grossInterest = balance * monthlyRate;
      const taxOnInterest = grossInterest * taxRate;
      const netInterest = grossInterest - taxOnInterest;

      balance += netInterest;
      totalInterestGross += grossInterest;
      totalInterestNet += netInterest;

      // Save monthly snapshot
      if (month % 12 === 0 || month === 1) {
        monthlyData.push({
          month,
          year: Math.ceil(month / 12),
          balance,
          totalContributions,
          totalInterestGross,
          totalInterestNet,
          totalTax: totalInterestGross - totalInterestNet,
        });
      }
    }

    const finalBalance = balance;
    const totalTax = totalInterestGross - totalInterestNet;
    const effectiveRate = ((finalBalance - totalContributions) / totalContributions) * 100;
    const effectiveAnnualRate = effectiveRate / years;

    setResults({
      finalBalance,
      totalContributions,
      totalInterestGross,
      totalInterestNet,
      totalTax,
      effectiveRate,
      effectiveAnnualRate,
      monthlyData,
      netAnnualRate: annualRate * (1 - taxRate),
    });
  };

  const quickSetFund = (rate: number, name: string) => {
    setAnnualRate(rate);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center" id="calculator">
          Calculate Money Market Fund Returns - Kenya MMF Calculator
        </h2>

        {/* Quick Fund Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Quick Select MMF (or enter custom rate below):
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button onClick={() => quickSetFund(13.5, 'CIC')} className="bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg p-3 text-sm transition-colors">
              <div className="font-semibold text-green-800">CIC MMF</div>
              <div className="text-xs text-green-600">13.5% p.a.</div>
            </button>
            <button onClick={() => quickSetFund(13.2, 'Britam')} className="bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-3 text-sm transition-colors">
              <div className="font-semibold text-blue-800">Britam MMF</div>
              <div className="text-xs text-blue-600">13.2% p.a.</div>
            </button>
            <button onClick={() => quickSetFund(13.1, 'Old Mutual')} className="bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg p-3 text-sm transition-colors">
              <div className="font-semibold text-purple-800">Old Mutual</div>
              <div className="text-xs text-purple-600">13.1% p.a.</div>
            </button>
            <button onClick={() => quickSetFund(12.9, 'Sanlam')} className="bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg p-3 text-sm transition-colors">
              <div className="font-semibold text-orange-800">Sanlam MMF</div>
              <div className="text-xs text-orange-600">12.9% p.a.</div>
            </button>
          </div>
        </div>

        {/* Input Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Initial Investment (KES)
            </label>
            <input
              type="number"
              value={initialAmount}
              onChange={(e) => setInitialAmount(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <div className="mt-2 flex gap-2 flex-wrap">
              <button onClick={() => setInitialAmount(50000)} className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">50K</button>
              <button onClick={() => setInitialAmount(100000)} className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">100K</button>
              <button onClick={() => setInitialAmount(500000)} className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">500K</button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Contribution (KES)
            </label>
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <div className="mt-2 flex gap-2 flex-wrap">
              <button onClick={() => setMonthlyContribution(5000)} className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">5K</button>
              <button onClick={() => setMonthlyContribution(10000)} className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">10K</button>
              <button onClick={() => setMonthlyContribution(25000)} className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">25K</button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Interest Rate (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={annualRate}
              onChange={(e) => setAnnualRate(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <div className="text-xs text-gray-500 mt-1">
              After 15% tax: {(annualRate * 0.85).toFixed(2)}%
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Investment Period (Years)
            </label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <div className="mt-2 flex gap-2 flex-wrap">
              <button onClick={() => setYears(1)} className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">1yr</button>
              <button onClick={() => setYears(3)} className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">3yr</button>
              <button onClick={() => setYears(5)} className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">5yr</button>
            </div>
          </div>
        </div>

        <button
          onClick={calculateReturns}
          className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors mb-8"
        >
          Calculate MMF Returns
        </button>

        {/* Results Section */}
        {results && (
          <div className="mt-8">
            {/* Summary Cards */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-5 border border-green-200">
                <div className="text-xs text-green-700 mb-1">Final Balance</div>
                <div className="text-2xl font-bold text-green-800">
                  KES {results.finalBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                <div className="text-xs text-green-600 mt-1">After {years} years</div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-5 border border-blue-200">
                <div className="text-xs text-blue-700 mb-1">Total Contributions</div>
                <div className="text-2xl font-bold text-blue-800">
                  KES {results.totalContributions.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                <div className="text-xs text-blue-600 mt-1">Your money invested</div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-5 border border-purple-200">
                <div className="text-xs text-purple-700 mb-1">Net Interest Earned</div>
                <div className="text-2xl font-bold text-purple-800">
                  KES {results.totalInterestNet.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                <div className="text-xs text-purple-600 mt-1">After 15% tax</div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-5 border border-orange-200">
                <div className="text-xs text-orange-700 mb-1">Total Tax Paid</div>
                <div className="text-2xl font-bold text-orange-800">
                  KES {results.totalTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                <div className="text-xs text-orange-600 mt-1">15% withholding</div>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-6 border border-teal-200 mb-8">
              <h4 className="font-semibold text-gray-900 mb-4">Investment Summary</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Rate (Gross):</span>
                    <span className="font-semibold">{annualRate}% p.a.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Rate (After Tax):</span>
                    <span className="font-semibold text-green-700">{results.netAnnualRate.toFixed(2)}% p.a.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Investment Period:</span>
                    <span className="font-semibold">{years} years ({years * 12} months)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Effective Total Return:</span>
                    <span className="font-semibold text-purple-700">{results.effectiveRate.toFixed(2)}%</span>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Initial Lump Sum:</span>
                    <span className="font-semibold">KES {initialAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Contribution:</span>
                    <span className="font-semibold">KES {monthlyContribution.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gross Interest Earned:</span>
                    <span className="font-semibold">KES {results.totalInterestGross.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Growth Multiple:</span>
                    <span className="font-semibold text-green-700">{(results.finalBalance / results.totalContributions).toFixed(2)}x</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Year-by-Year Growth */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
              <h4 className="font-semibold text-gray-900 mb-4">Year-by-Year Growth</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-3 py-2 text-left">Year</th>
                      <th className="border border-gray-300 px-3 py-2 text-right">Total Contributed</th>
                      <th className="border border-gray-300 px-3 py-2 text-right">Net Interest Earned</th>
                      <th className="border border-gray-300 px-3 py-2 text-right">Tax Paid</th>
                      <th className="border border-gray-300 px-3 py-2 text-right">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.monthlyData.map((data: any, index: number) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="border border-gray-300 px-3 py-2 font-medium">Year {data.year}</td>
                        <td className="border border-gray-300 px-3 py-2 text-right">
                          KES {data.totalContributions.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </td>
                        <td className="border border-gray-300 px-3 py-2 text-right text-green-600 font-medium">
                          KES {data.totalInterestNet.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </td>
                        <td className="border border-gray-300 px-3 py-2 text-right text-orange-600">
                          KES {data.totalTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </td>
                        <td className="border border-gray-300 px-3 py-2 text-right font-bold text-blue-700">
                          KES {data.balance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Comparison with Savings Account */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <h4 className="font-semibold text-yellow-800 mb-4">💰 MMF vs Regular Savings Account Comparison</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded p-4">
                  <div className="text-sm text-gray-600 mb-2">Your MMF Investment @ {results.netAnnualRate.toFixed(1)}% (after tax)</div>
                  <div className="text-3xl font-bold text-green-700 mb-2">
                    KES {results.finalBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-xs text-green-600">Earnings: KES {results.totalInterestNet.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </div>
                <div className="bg-white rounded p-4">
                  <div className="text-sm text-gray-600 mb-2">Same in Savings Account @ 5% p.a.</div>
                  {(() => {
                    const savingsRate = 0.05 / 12;
                    let savingsBalance = initialAmount;
                    for (let i = 1; i <= years * 12; i++) {
                      savingsBalance += savingsBalance * savingsRate + (i > 1 ? monthlyContribution : 0);
                    }
                    const savingsEarnings = savingsBalance - results.totalContributions;
                    const difference = results.finalBalance - savingsBalance;
                    return (
                      <>
                        <div className="text-3xl font-bold text-red-700 mb-2">
                          KES {savingsBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </div>
                        <div className="text-xs text-red-600">Earnings: KES {savingsEarnings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                        <div className="mt-3 pt-3 border-t">
                          <div className="text-xs text-gray-600">MMF Advantage:</div>
                          <div className="text-lg font-bold text-green-700">+KES {difference.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>

            {/* Financial Goals */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h5 className="font-semibold text-blue-800 mb-2 text-sm">🏠 Property Deposit</h5>
                <p className="text-xs text-blue-700">
                  Your KES {results.finalBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })} could be a {((results.finalBalance / 5000000) * 100).toFixed(0)}% deposit
                  on a KES 5M house or {((results.finalBalance / 10000000) * 100).toFixed(0)}% on a KES 10M property!
                </p>
                <a href="/mortgage-calculator-kenya" className="text-blue-600 underline text-xs mt-2 inline-block">
                  → Calculate Mortgage
                </a>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h5 className="font-semibold text-green-800 mb-2 text-sm">🏗️ Construction Fund</h5>
                <p className="text-xs text-green-700">
                  At KES 45,000/sqm, your {results.finalBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })} could build
                  a {(results.finalBalance / 45000).toFixed(0)} sqm house (about {Math.floor(results.finalBalance / 45000 / 12)} bedrooms)!
                </p>
                <a href="/construction-cost-calculator-kenya" className="text-green-600 underline text-xs mt-2 inline-block">
                  → Calculate Building Costs
                </a>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h5 className="font-semibold text-purple-800 mb-2 text-sm">💼 Emergency Fund</h5>
                <p className="text-xs text-purple-700">
                  Financial experts recommend 6 months expenses as emergency fund.
                  If you spend KES 50K/month, you need KES 300K - you have {((results.finalBalance / 300000) * 100).toFixed(0)}% of that target!
                </p>
              </div>
            </div>
          </div>
        )}

        {!results && (
          <div className="text-center text-gray-500 py-8">
            Enter your investment details and click calculate to see projected returns
          </div>
        )}
      </div>
    </div>
  );
}
