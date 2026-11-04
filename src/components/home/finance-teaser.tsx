"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { calculateEMI, formatINR } from "@/lib/data";
import { siteConfig } from "@/lib/site";
import { Landmark, ShieldCheck, CheckCircle2, Calculator, ArrowRight } from "lucide-react";

export function FinanceTeaser() {
  const [loanAmount, setLoanAmount] = useState<number>(120000);
  const [tenureYears, setTenureYears] = useState<number>(10);
  const [above2LakhRate, setAbove2LakhRate] = useState<number>(siteConfig.finance.standardRateAbove2LakhDefault); // Default 8.0% (Rule C.9)

  // Rate logic per Rule C.9
  const isAbove2Lakh = loanAmount > siteConfig.finance.maxSubsidizedLoanAmount;
  const interestRate = isAbove2Lakh ? above2LakhRate : siteConfig.finance.subsidizedRateUpTo2Lakh;

  const emi = useMemo(() => {
    return calculateEMI(loanAmount, interestRate, tenureYears);
  }, [loanAmount, interestRate, tenureYears]);

  return (
    <section className="bg-[#F1F8EC] py-20 lg:py-28 text-[#06180F] border-b border-[#D5E6CC]" id="finance">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Facts */}
          <div className="lg:col-span-6">
            <span className="text-xs uppercase tracking-[0.14em] text-[#0B4A2B] font-semibold bg-[#F1F8EC] border border-[#D5E6CC] px-3.5 py-1.5 rounded-full inline-block mb-4 font-mono">
              Subsidy & Financing
            </span>
            <h2 className="text-3xl sm:text-5xl font-medium font-heading text-[#06180F] tracking-[-0.03em] mb-6">
              Up to ₹78,000 Subsidy & 10-Year Bank Loans
            </h2>
            <p className="text-sm sm:text-base text-[#06180F]/70 mb-8 leading-relaxed font-normal">
              Under the PM Surya Ghar: Muft Bijli Yojana, residential systems of 3 kW and higher receive a fixed ₹78,000 central subsidy. Major public sector banks offer loans starting from 5.75% p.a. floating with tenures up to 10 years (120 months).
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#3F8F3A] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base font-medium text-[#06180F] font-heading">
                    ₹78,000 Fixed Subsidy for 3 kW and Above
                  </h3>
                  <p className="text-xs sm:text-sm text-[#06180F]/70">
                    Applicable on all 3 kW to 10 kW residential rooftop systems, credited directly to your bank account.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Landmark className="w-5 h-5 text-[#3F8F3A] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base font-medium text-[#06180F] font-heading">
                    5.75% p.a. Floating Rate for Loans up to ₹2 Lakh
                  </h3>
                  <p className="text-xs sm:text-sm text-[#06180F]/70">
                    Offered by major public sector banks for PM Surya Ghar loans up to ₹2,00,000 with zero collateral.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#3F8F3A] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base font-medium text-[#06180F] font-heading">
                    Up to 10 Years Flexible Tenure (120 Months)
                  </h3>
                  <p className="text-xs sm:text-sm text-[#06180F]/70">
                    Longer 10-year repayment keeps your monthly EMI as low as ₹1,317/mo — often less than your current electricity bill!
                  </p>
                </div>
              </div>
            </div>

            {/* Rule A.1: on light sections use brand-deep with white text */}
            <Link
              href="/subsidy-finance"
              className="inline-flex items-center gap-2 bg-[#0B4A2B] hover:bg-[#072A19] text-white px-7 py-3.5 rounded-full text-sm font-medium shadow-sm transition-all group"
            >
              <span>Learn More About Subsidy & Finance</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right Column: Mini Interactive EMI Calculator (Rule C.9) */}
          <div className="lg:col-span-6 bg-white border border-[#D5E6CC] rounded-[32px] p-6 sm:p-10 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#D5E6CC]">
              <div className="w-10 h-10 rounded-2xl bg-white border border-[#D5E6CC] flex items-center justify-center text-[#3F8F3A]">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-medium font-heading text-[#06180F]">
                  Quick EMI Estimator
                </h3>
                <span className="text-xs text-[#06180F]/60">Check your approximate monthly payment</span>
              </div>
            </div>

            {/* Loan Amount Slider */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="finance-teaser-loan-amount" className="text-xs sm:text-sm text-[#06180F]/70">
                  Loan Amount:
                </label>
                <span className="text-xl font-medium font-heading text-[#0B4A2B]">
                  {formatINR(loanAmount)}
                </span>
              </div>
              <input
                id="finance-teaser-loan-amount"
                type="range"
                min={50000}
                max={450000}
                step={10000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-white rounded-full appearance-none cursor-pointer accent-[#3F8F3A]"
                aria-label="Loan amount slider"
              />
              <div className="flex justify-between text-[11px] text-[#06180F]/50 mt-1 font-mono">
                <span>₹50,000</span>
                <span className="text-[#0B4A2B]">₹2,00,000 (5.75% Cap)</span>
                <span>₹4,50,000</span>
              </div>
            </div>

            {/* Rate Selector when > ₹2 Lakh (Rule C.9) */}
            {isAbove2Lakh ? (
              <div className="mb-6 p-4 bg-white rounded-2xl border border-[#D5E6CC]">
                <div className="flex justify-between items-center mb-2 text-xs">
                  <label htmlFor="above-2lakh-rate" className="text-[#06180F]/70 font-medium">
                    Bank Quoted Rate (7.25% - 9.50%):
                  </label>
                  <span className="font-mono font-bold text-[#0B4A2B]">{above2LakhRate}% p.a.</span>
                </div>
                <select
                  id="above-2lakh-rate"
                  value={above2LakhRate}
                  onChange={(e) => setAbove2LakhRate(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#F1F8EC] border border-[#D5E6CC] rounded-xl text-xs text-[#06180F] focus:outline-none focus:border-[#0B4A2B]"
                >
                  <option value={7.25}>7.25% p.a.</option>
                  <option value={7.5}>7.50% p.a.</option>
                  <option value={8.0}>8.00% p.a. (Default)</option>
                  <option value={8.5}>8.50% p.a.</option>
                  <option value={9.0}>9.00% p.a.</option>
                  <option value={9.5}>9.50% p.a.</option>
                </select>
                <p className="text-[11px] text-[#06180F]/60 mt-2">
                  * Rate depends on bank and CIBIL score.
                </p>
              </div>
            ) : (
              <div className="mb-6 px-4 py-2.5 bg-white rounded-2xl border border-[#D5E6CC] flex items-center justify-between text-xs">
                <span className="text-[#06180F]/70">Floating Rate:</span>
                <span className="font-mono font-bold text-[#3F8F3A]">5.75% p.a. (PM Surya Ghar loan ≤ ₹2 Lakh)</span>
              </div>
            )}

            {/* Tenure Buttons with 10 Years */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs sm:text-sm text-[#06180F]/70 font-medium">
                  Loan Tenure:
                </label>
                <span className="text-xs text-[#3F8F3A] font-semibold">Up to 10 Years Available</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[3, 5, 7, 10].map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setTenureYears(yr)}
                    className={`py-2 px-3 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                      tenureYears === yr
                        ? "bg-[#0B4A2B] text-white shadow-sm font-semibold"
                        : "bg-white border border-[#D5E6CC] text-[#06180F] hover:bg-white/80"
                    }`}
                  >
                    {yr} Years
                  </button>
                ))}
              </div>
            </div>

            {/* Calculated EMI Display */}
            <div className="bg-white border border-[#D5E6CC] rounded-2xl p-6 text-center mb-6 shadow-sm">
              <span className="text-xs uppercase tracking-wider text-[#06180F]/60 block mb-1 font-mono">
                Estimated Monthly EMI
              </span>
              <div className="text-3xl sm:text-4xl font-medium font-heading text-[#0B4A2B] mb-1 tracking-[-0.03em]">
                {formatINR(emi)} <span className="text-xs font-normal text-[#06180F]/60">/ month</span>
              </div>
              <span className="text-xs text-[#06180F]/60 block mb-2">
                Applied rate: {interestRate}% p.a. • {tenureYears} Years ({tenureYears * 12} Months)
              </span>
              {tenureYears === 10 && loanAmount <= 200000 && (
                <div className="mt-2 py-1 px-2.5 rounded-lg bg-[#F1F8EC] border border-[#D5E6CC] text-[11px] text-[#0B4A2B] font-medium">
                  💡 Zero Out-of-Pocket: Monthly solar generation savings typically exceed this ₹{emi.toLocaleString("en-IN")}/mo EMI!
                </div>
              )}
            </div>

            <Link
              href="/subsidy-finance"
              className="w-full bg-[#0B4A2B] hover:bg-[#072A19] text-white py-3.5 px-6 rounded-full text-xs font-medium flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <span>Explore Full Financing Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
