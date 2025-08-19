'use client';

import { useState, useMemo } from "react";
import { Calculator, DollarSign, PiggyBank, Home, Heart, Shield, TrendingUp } from "lucide-react";

export default function KenyaPAYECalculator() {
  const [grossSalary, setGrossSalary] = useState("");
  const [pensionContribution, setPensionContribution] = useState("");

  const calculations = useMemo(() => {
    const gross = parseFloat(grossSalary) || 0;
    const pension = Math.min(parseFloat(pensionContribution) || 0, 30000); // Max KSh 30,000 per month

    if (gross <= 0) {
      return null;
    }

    // Calculate NSSF
    const tier1Base = Math.min(gross, 8000);
    const tier2Base = Math.max(0, Math.min(gross, 72000) - 8000);
    const nssfTier1 = tier1Base * 0.06; // Max KSh 480
    const nssfTier2 = tier2Base * 0.06; // Max KSh 3,840
    const totalNSSF = nssfTier1 + nssfTier2;

    // Calculate Housing Levy (1.5%, max KSh 5,000)
    const housingLevy = Math.min(gross * 0.015, 5000);

    // Calculate SHIF (2.75%, min KSh 300)
    const shif = Math.max(gross * 0.0275, 300);

    // Calculate taxable income
    const taxableIncome = Math.max(0, gross - totalNSSF - pension);

    // Calculate PAYE using progressive tax bands
    let paye = 0;
    let remainingIncome = taxableIncome;

    // 10% on first KSh 24,000
    if (remainingIncome > 0) {
      const taxable = Math.min(remainingIncome, 24000);
      paye += taxable * 0.10;
      remainingIncome -= taxable;
    }

    // 25% on next KSh 8,333
    if (remainingIncome > 0) {
      const taxable = Math.min(remainingIncome, 8333);
      paye += taxable * 0.25;
      remainingIncome -= taxable;
    }

    // 30% on next KSh 467,667
    if (remainingIncome > 0) {
      const taxable = Math.min(remainingIncome, 467667);
      paye += taxable * 0.30;
      remainingIncome -= taxable;
    }

    // 32.5% on next KSh 300,000
    if (remainingIncome > 0) {
      const taxable = Math.min(remainingIncome, 300000);
      paye += taxable * 0.325;
      remainingIncome -= taxable;
    }

    // 35% on income above KSh 800,000
    if (remainingIncome > 0) {
      paye += remainingIncome * 0.35;
    }

    // Apply personal relief
    const personalRelief = 2400;
    const finalPAYE = Math.max(0, paye - personalRelief);

    // Calculate net salary
    const totalDeductions = finalPAYE + totalNSSF + housingLevy + shif + pension;
    const netSalary = gross - totalDeductions;

    return {
      gross,
      taxableIncome,
      paye: finalPAYE,
      personalRelief,
      nssf: {
        tier1: nssfTier1,
        tier2: nssfTier2,
        total: totalNSSF
      },
      housingLevy,
      shif,
      pension,
      totalDeductions,
      netSalary,
      effectiveTaxRate: gross > 0 ? (totalDeductions / gross) * 100 : 0
    };
  }, [grossSalary, pensionContribution]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
          <div className="flex items-center gap-3">
            <Calculator className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Kenya PAYE Tax Calculator 2025</h1>
              <p className="text-green-100">Calculate your net salary with all statutory deductions</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 p-6">
          {/* Input Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              Income Details
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Gross Salary (KSh)
                </label>
                <input
                  type="number"
                  value={grossSalary}
                  onChange={(e) => setGrossSalary(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors text-lg"
                  placeholder="Enter your gross monthly salary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Pension Contribution (KSh) - Optional
                </label>
                <input
                  type="number"
                  value={pensionContribution}
                  onChange={(e) => setPensionContribution(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                  placeholder="Max KSh 30,000 per month"
                />
                <p className="text-xs text-gray-500 mt-1">Tax-deductible up to KSh 30,000 monthly</p>
              </div>
            </div>

            {/* Tax Bands Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">2025 PAYE Tax Bands</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>First KSh 24,000</span>
                  <span className="font-medium text-green-600">10%</span>
                </div>
                <div className="flex justify-between">
                  <span>Next KSh 8,333</span>
                  <span className="font-medium text-yellow-600">25%</span>
                </div>
                <div className="flex justify-between">
                  <span>Next KSh 467,667</span>
                  <span className="font-medium text-orange-600">30%</span>
                </div>
                <div className="flex justify-between">
                  <span>Next KSh 300,000</span>
                  <span className="font-medium text-red-600">32.5%</span>
                </div>
                <div className="flex justify-between">
                  <span>Above KSh 800,000</span>
                  <span className="font-medium text-purple-600">35%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {calculations ? (
              <>
                {/* Net Salary Highlight */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Net Monthly Salary</p>
                      <p className="text-3xl font-bold">{formatCurrency(calculations.netSalary)}</p>
                      <p className="text-green-100 text-sm mt-1">
                        Effective Rate: {calculations.effectiveTaxRate.toFixed(1)}%
                      </p>
                    </div>
                    <TrendingUp className="w-12 h-12 text-green-200" />
                  </div>
                </div>

                {/* Breakdown */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800">Deduction Breakdown</h3>
                  
                  {/* PAYE */}
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calculator className="w-5 h-5 text-red-600" />
                        <span className="font-medium text-red-800">PAYE Tax</span>
                      </div>
                      <span className="font-bold text-red-800">{formatCurrency(calculations.paye)}</span>
                    </div>
                    <p className="text-xs text-red-600 mt-1">
                      On taxable income of {formatCurrency(calculations.taxableIncome)} 
                      (Personal relief: {formatCurrency(calculations.personalRelief)})
                    </p>
                  </div>

                  {/* NSSF */}
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-blue-800">NSSF Contribution</span>
                      </div>
                      <span className="font-bold text-blue-800">{formatCurrency(calculations.nssf.total)}</span>
                    </div>
                    <div className="text-xs text-blue-600 mt-1 space-y-1">
                      <div>Tier I (6% of first KSh 8,000): {formatCurrency(calculations.nssf.tier1)}</div>
                      <div>Tier II (6% of KSh 8,001-72,000): {formatCurrency(calculations.nssf.tier2)}</div>
                    </div>
                  </div>

                  {/* Housing Levy */}
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Home className="w-5 h-5 text-yellow-600" />
                        <span className="font-medium text-yellow-800">Housing Levy</span>
                      </div>
                      <span className="font-bold text-yellow-800">{formatCurrency(calculations.housingLevy)}</span>
                    </div>
                    <p className="text-xs text-yellow-600 mt-1">1.5% of gross salary (max KSh 5,000)</p>
                  </div>

                  {/* SHIF */}
                  <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-purple-600" />
                        <span className="font-medium text-purple-800">SHIF</span>
                      </div>
                      <span className="font-bold text-purple-800">{formatCurrency(calculations.shif)}</span>
                    </div>
                    <p className="text-xs text-purple-600 mt-1">2.75% of gross salary (min KSh 300)</p>
                  </div>

                  {/* Pension */}
                  {calculations.pension > 0 && (
                    <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded-r-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <PiggyBank className="w-5 h-5 text-indigo-600" />
                          <span className="font-medium text-indigo-800">Pension Contribution</span>
                        </div>
                        <span className="font-bold text-indigo-800">{formatCurrency(calculations.pension)}</span>
                      </div>
                      <p className="text-xs text-indigo-600 mt-1">Tax-deductible voluntary contribution</p>
                    </div>
                  )}

                  {/* Total Summary */}
                  <div className="bg-gray-100 rounded-lg p-4 mt-6">
                    <div className="space-y-2">
                      <div className="flex justify-between font-medium">
                        <span>Gross Salary</span>
                        <span className="text-green-600">{formatCurrency(calculations.gross)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Total Deductions</span>
                        <span className="text-red-600">-{formatCurrency(calculations.totalDeductions)}</span>
                      </div>
                      <hr className="my-2" />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Net Salary</span>
                        <span className="text-green-700">{formatCurrency(calculations.netSalary)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Calculator className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>Enter your gross salary to see the breakdown</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 text-center">
          <p className="text-xs text-gray-600">
            Based on Kenya Revenue Authority (KRA) rates effective 2025. 
            This calculator is for estimation purposes only. Please consult a tax professional for official calculations.
          </p>
        </div>
      </div>
    </div>
  );
}