'use client';

import { useState } from 'react';

interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  cumulativePrincipal: number;
  cumulativeInterest: number;
}

export default function AmortizationCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [interestRate, setInterestRate] = useState<number>(15);
  const [loanTerm, setLoanTerm] = useState<number>(60);
  const [extraPayment, setExtraPayment] = useState<number>(0);
  const [results, setResults] = useState<any>(null);

  const calculateAmortization = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm;

    // Monthly payment formula
    const monthlyPayment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    // Generate amortization schedule
    const schedule: AmortizationRow[] = [];
    let balance = principal;
    let cumulativePrincipal = 0;
    let cumulativeInterest = 0;
    let actualMonths = 0;

    for (let month = 1; month <= numberOfPayments; month++) {
      if (balance <= 0) break;

      const interestPayment = balance * monthlyRate;
      let principalPayment = monthlyPayment - interestPayment + extraPayment;

      // Don't overpay
      if (principalPayment > balance) {
        principalPayment = balance;
      }

      const totalPayment = principalPayment + interestPayment;
      balance -= principalPayment;
      cumulativePrincipal += principalPayment;
      cumulativeInterest += interestPayment;
      actualMonths = month;

      schedule.push({
        month,
        payment: totalPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance),
        cumulativePrincipal,
        cumulativeInterest,
      });
    }

    const totalPayment = cumulativePrincipal + cumulativeInterest;

    setResults({
      monthlyPayment: monthlyPayment + extraPayment,
      basePayment: monthlyPayment,
      extraPayment,
      totalPayment,
      totalInterest: cumulativeInterest,
      principal,
      schedule,
      actualMonths,
      monthsSaved: loanTerm - actualMonths,
      interestSaved: extraPayment > 0 ? calculateInterestSaved() : 0,
    });
  };

  const calculateInterestSaved = () => {
    // Calculate without extra payment
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const monthlyPayment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm))) /
      (Math.pow(1 + monthlyRate, loanTerm) - 1);

    let balance = principal;
    let totalInterestWithout = 0;

    for (let month = 1; month <= loanTerm; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;
      totalInterestWithout += interestPayment;
    }

    // Calculate with extra payment
    balance = principal;
    let totalInterestWith = 0;

    for (let month = 1; month <= loanTerm; month++) {
      if (balance <= 0) break;
      const interestPayment = balance * monthlyRate;
      let principalPayment = monthlyPayment - interestPayment + extraPayment;
      if (principalPayment > balance) principalPayment = balance;
      balance -= principalPayment;
      totalInterestWith += interestPayment;
    }

    return totalInterestWithout - totalInterestWith;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center" id="calculator">
          Generate Loan Amortization Schedule - Complete Payment Breakdown
        </h2>

        {/* Input Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Amount (KES)
            </label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interest Rate (% p.a.)
            </label>
            <input
              type="number"
              step="0.5"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Term (Months)
            </label>
            <input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Extra Payment (Optional)
            </label>
            <input
              type="number"
              value={extraPayment}
              onChange={(e) => setExtraPayment(Number(e.target.value))}
              placeholder="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        <button
          onClick={calculateAmortization}
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-colors mb-8"
        >
          Generate Amortization Schedule
        </button>

        {/* Results Section */}
        {results && (
          <div className="mt-8">
            {/* Summary Cards */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-5 border border-blue-200">
                <div className="text-xs text-blue-700 mb-1">Monthly Payment</div>
                <div className="text-2xl font-bold text-blue-800">
                  KES {results.monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                {results.extraPayment > 0 && (
                  <div className="text-xs text-blue-600 mt-1">
                    Base: {results.basePayment.toLocaleString(undefined, { maximumFractionDigits: 0 })} + Extra: {results.extraPayment.toLocaleString()}
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-5 border border-green-200">
                <div className="text-xs text-green-700 mb-1">Total Principal</div>
                <div className="text-2xl font-bold text-green-800">
                  KES {results.principal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                <div className="text-xs text-green-600 mt-1">
                  Loan amount
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-5 border border-red-200">
                <div className="text-xs text-red-700 mb-1">Total Interest</div>
                <div className="text-2xl font-bold text-red-800">
                  KES {results.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                {results.interestSaved > 0 && (
                  <div className="text-xs text-green-600 mt-1 font-semibold">
                    Saved: {results.interestSaved.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-5 border border-purple-200">
                <div className="text-xs text-purple-700 mb-1">Payoff Time</div>
                <div className="text-2xl font-bold text-purple-800">
                  {results.actualMonths} mo
                </div>
                {results.monthsSaved > 0 && (
                  <div className="text-xs text-green-600 mt-1 font-semibold">
                    Saved: {results.monthsSaved} months
                  </div>
                )}
              </div>
            </div>

            {/* Extra Payment Impact */}
            {results.extraPayment > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                <h4 className="font-semibold text-green-800 mb-3">💰 Impact of Extra KES {results.extraPayment.toLocaleString()} Monthly Payment:</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white rounded p-3">
                    <div className="text-green-600 text-xs mb-1">Interest Saved:</div>
                    <div className="text-xl font-bold text-green-800">
                      KES {results.interestSaved.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                  <div className="bg-white rounded p-3">
                    <div className="text-green-600 text-xs mb-1">Time Saved:</div>
                    <div className="text-xl font-bold text-green-800">
                      {results.monthsSaved} months
                    </div>
                  </div>
                  <div className="bg-white rounded p-3">
                    <div className="text-green-600 text-xs mb-1">New Payoff Date:</div>
                    <div className="text-xl font-bold text-green-800">
                      {(results.actualMonths / 12).toFixed(1)} years
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Amortization Schedule Table */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4 text-lg">
                Complete Amortization Schedule - Month-by-Month Breakdown
              </h4>

              {/* Key Milestones */}
              <div className="grid md:grid-cols-4 gap-3 mb-6 text-xs">
                <div className="bg-blue-50 p-3 rounded">
                  <div className="text-blue-700 mb-1">First Payment</div>
                  <div className="text-blue-900">
                    Interest: <strong>{results.schedule[0].interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>
                  </div>
                  <div className="text-blue-900">
                    Principal: <strong>{results.schedule[0].principal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>
                  </div>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <div className="text-green-700 mb-1">Midpoint</div>
                  {results.schedule[Math.floor(results.actualMonths / 2)] && (
                    <>
                      <div className="text-green-900">
                        Interest: <strong>{results.schedule[Math.floor(results.actualMonths / 2)].interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>
                      </div>
                      <div className="text-green-900">
                        Principal: <strong>{results.schedule[Math.floor(results.actualMonths / 2)].principal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>
                      </div>
                    </>
                  )}
                </div>
                <div className="bg-purple-50 p-3 rounded">
                  <div className="text-purple-700 mb-1">Last Payment</div>
                  <div className="text-purple-900">
                    Interest: <strong>{results.schedule[results.actualMonths - 1].interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>
                  </div>
                  <div className="text-purple-900">
                    Principal: <strong>{results.schedule[results.actualMonths - 1].principal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>
                  </div>
                </div>
                <div className="bg-orange-50 p-3 rounded">
                  <div className="text-orange-700 mb-1">Total Paid</div>
                  <div className="text-orange-900">
                    <strong>KES {results.totalPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>
                  </div>
                  <div className="text-orange-700 text-xs mt-1">
                    ({((results.totalInterest / results.principal) * 100).toFixed(1)}% interest)
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                <table className="w-full text-xs border-collapse">
                  <thead className="bg-indigo-100 sticky top-0">
                    <tr>
                      <th className="border border-gray-300 px-3 py-2 text-left">Month</th>
                      <th className="border border-gray-300 px-3 py-2 text-right">Payment</th>
                      <th className="border border-gray-300 px-3 py-2 text-right">Principal</th>
                      <th className="border border-gray-300 px-3 py-2 text-right">Interest</th>
                      <th className="border border-gray-300 px-3 py-2 text-right">Balance</th>
                      <th className="border border-gray-300 px-3 py-2 text-right">Cum. Principal</th>
                      <th className="border border-gray-300 px-3 py-2 text-right">Cum. Interest</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.schedule.map((row: AmortizationRow, index: number) => (
                      <tr
                        key={row.month}
                        className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} ${index === 0 || index === results.schedule.length - 1 ? 'font-semibold bg-yellow-50' : ''}`}
                      >
                        <td className="border border-gray-300 px-3 py-2">{row.month}</td>
                        <td className="border border-gray-300 px-3 py-2 text-right">
                          {row.payment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </td>
                        <td className="border border-gray-300 px-3 py-2 text-right text-green-600 font-medium">
                          {row.principal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </td>
                        <td className="border border-gray-300 px-3 py-2 text-right text-red-600">
                          {row.interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </td>
                        <td className="border border-gray-300 px-3 py-2 text-right font-semibold">
                          {row.balance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </td>
                        <td className="border border-gray-300 px-3 py-2 text-right text-green-700">
                          {row.cumulativePrincipal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </td>
                        <td className="border border-gray-300 px-3 py-2 text-right text-red-700">
                          {row.cumulativeInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 grid md:grid-cols-2 gap-4 text-xs">
                <div className="bg-green-50 border border-green-200 rounded p-3">
                  <p className="text-green-800">
                    <strong>Green (Principal):</strong> Amount reducing your loan balance. Notice how this increases over time!
                  </p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded p-3">
                  <p className="text-red-800">
                    <strong>Red (Interest):</strong> Cost of borrowing. Notice how this decreases as balance reduces!
                  </p>
                </div>
              </div>
            </div>

            {/* Download/Print Options */}
            <div className="mt-6 flex gap-4 justify-center">
              <button
                onClick={() => window.print()}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-2 rounded-lg transition-colors text-sm"
              >
                🖨️ Print Schedule
              </button>
              <a
                href="/salary-calculator-kenya"
                className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium px-6 py-2 rounded-lg transition-colors text-sm"
              >
                💰 Check Affordability
              </a>
            </div>
          </div>
        )}

        {!results && (
          <div className="text-center text-gray-500 py-8">
            Enter loan details and click generate to see your complete amortization schedule
          </div>
        )}
      </div>
    </div>
  );
}
