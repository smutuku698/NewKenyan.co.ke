'use client';

import { useState } from 'react';

interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [interestRate, setInterestRate] = useState<number>(15);
  const [loanTerm, setLoanTerm] = useState<number>(36);
  const [results, setResults] = useState<any>(null);
  const [showAmortization, setShowAmortization] = useState<boolean>(false);

  const calculateLoan = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm;

    // Monthly payment formula: M = P * [r(1 + r)^n] / [(1 + r)^n - 1]
    const monthlyPayment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    // Generate amortization schedule
    const schedule: AmortizationRow[] = [];
    let balance = principal;

    for (let month = 1; month <= numberOfPayments; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;

      schedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance),
      });
    }

    setResults({
      monthlyPayment,
      totalPayment,
      totalInterest,
      principal,
      schedule,
      effectiveRate: (totalInterest / principal) * 100,
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center" id="calculator">
          Calculate Your Loan Payments - Kenya Loan Calculator
        </h2>

        {/* Input Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Amount (KES)
            </label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g., 500000"
            />
            <div className="mt-2 flex gap-2 flex-wrap">
              <button onClick={() => setLoanAmount(100000)} className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">100K</button>
              <button onClick={() => setLoanAmount(500000)} className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">500K</button>
              <button onClick={() => setLoanAmount(1000000)} className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">1M</button>
              <button onClick={() => setLoanAmount(3000000)} className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">3M</button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Interest Rate (%)
            </label>
            <input
              type="number"
              step="0.5"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g., 15"
            />
            <div className="mt-2 flex gap-2 flex-wrap">
              <button onClick={() => setInterestRate(12)} className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">12%</button>
              <button onClick={() => setInterestRate(14)} className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">14%</button>
              <button onClick={() => setInterestRate(16)} className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">16%</button>
              <button onClick={() => setInterestRate(18)} className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">18%</button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Term (Months)
            </label>
            <input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g., 36"
            />
            <div className="mt-2 flex gap-2 flex-wrap">
              <button onClick={() => setLoanTerm(12)} className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">12mo</button>
              <button onClick={() => setLoanTerm(24)} className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">24mo</button>
              <button onClick={() => setLoanTerm(36)} className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">36mo</button>
              <button onClick={() => setLoanTerm(60)} className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">60mo</button>
            </div>
          </div>
        </div>

        <button
          onClick={calculateLoan}
          className="w-full bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition-colors mb-8"
        >
          Calculate Loan Payment
        </button>

        {/* Results Section */}
        {results && (
          <div className="mt-8">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                <div className="text-sm text-green-700 mb-2">Monthly Payment</div>
                <div className="text-3xl font-bold text-green-800">
                  KES {results.monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                <div className="text-xs text-green-600 mt-2">
                  {loanTerm} monthly payments
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                <div className="text-sm text-blue-700 mb-2">Total Interest</div>
                <div className="text-3xl font-bold text-blue-800">
                  KES {results.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                <div className="text-xs text-blue-600 mt-2">
                  Effective Rate: {results.effectiveRate.toFixed(1)}%
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                <div className="text-sm text-purple-700 mb-2">Total Repayment</div>
                <div className="text-3xl font-bold text-purple-800">
                  KES {results.totalPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                <div className="text-xs text-purple-600 mt-2">
                  Principal + Interest
                </div>
              </div>
            </div>

            {/* Breakdown */}
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-6 border border-orange-200 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Summary</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Loan Amount:</span>
                    <span className="font-semibold">KES {results.principal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interest Rate:</span>
                    <span className="font-semibold">{interestRate}% p.a.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Loan Term:</span>
                    <span className="font-semibold">{loanTerm} months ({(loanTerm / 12).toFixed(1)} years)</span>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Interest Paid:</span>
                    <span className="font-semibold text-red-600">KES {results.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interest as % of Principal:</span>
                    <span className="font-semibold">{results.effectiveRate.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount Paid:</span>
                    <span className="font-semibold text-purple-600">KES {results.totalPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Affordability Check */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h4 className="font-semibold text-blue-800 mb-3">💰 Affordability Check</h4>
              <p className="text-sm text-blue-700 mb-3">
                To comfortably afford KES {results.monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}/month using the 30% rule:
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white rounded p-3">
                  <div className="text-blue-600 text-xs mb-1">Minimum Gross Salary Required:</div>
                  <div className="text-xl font-bold text-blue-800">
                    KES {(results.monthlyPayment / 0.3).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                </div>
                <div className="bg-white rounded p-3">
                  <div className="text-green-600 text-xs mb-1">Estimated Net Salary Needed:</div>
                  <div className="text-xl font-bold text-green-800">
                    KES {((results.monthlyPayment / 0.3) * 0.75).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                </div>
              </div>
              <a href="/salary-calculator-kenya" className="text-blue-600 hover:underline text-xs mt-3 inline-block">
                → Use Salary Calculator to check if you qualify
              </a>
            </div>

            {/* Amortization Schedule Toggle */}
            <div className="text-center mb-6">
              <button
                onClick={() => setShowAmortization(!showAmortization)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-2 rounded-lg transition-colors"
              >
                {showAmortization ? 'Hide' : 'Show'} Amortization Schedule
              </button>
            </div>

            {/* Amortization Schedule */}
            {showAmortization && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Monthly Payment Breakdown - Amortization Schedule
                </h4>
                <div className="overflow-x-auto max-h-96 overflow-y-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead className="bg-gray-100 sticky top-0">
                      <tr>
                        <th className="border border-gray-300 px-3 py-2 text-left">Month</th>
                        <th className="border border-gray-300 px-3 py-2 text-right">Payment</th>
                        <th className="border border-gray-300 px-3 py-2 text-right">Principal</th>
                        <th className="border border-gray-300 px-3 py-2 text-right">Interest</th>
                        <th className="border border-gray-300 px-3 py-2 text-right">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.schedule.map((row: AmortizationRow, index: number) => (
                        <tr key={row.month} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                          <td className="border border-gray-300 px-3 py-2">{row.month}</td>
                          <td className="border border-gray-300 px-3 py-2 text-right">
                            {row.payment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-right text-green-600">
                            {row.principal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-right text-red-600">
                            {row.interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-right font-semibold">
                            {row.balance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-600 mt-4">
                  💡 Notice how the principal portion (green) increases while interest portion (red) decreases over time.
                  This is the reducing balance method used by Kenya banks.
                </p>
              </div>
            )}
          </div>
        )}

        {!results && (
          <div className="text-center text-gray-500 py-8">
            Enter your loan details and click calculate to see monthly payments, total interest, and amortization schedule
          </div>
        )}
      </div>
    </div>
  );
}
