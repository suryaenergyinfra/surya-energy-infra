"use client";

import React, { useState, useMemo } from "react";
import {
  calculateFromUnits,
  calculateEMI,
  formatINR,
} from "@/lib/data";
import { siteConfig } from "@/lib/site";
import { useWhatsAppModal } from "@/components/ui/whatsapp-modal-context";
import {
  Zap,
  Calculator,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Building,
  ArrowRight,
} from "lucide-react";

export default function CalculatorPage() {
  const { openEnquiryModal } = useWhatsAppModal();
  const [mode, setMode] = useState<"units" | "bill">("units");
  const [units, setUnits] = useState<number>(500);
  const [bill, setBill] = useState<number>(3750);
  const [ratePerUnit, setRatePerUnit] = useState<number>(7.5);
  const [roofArea, setRoofArea] = useState<number>(500);
  const [checkRoof, setCheckRoof] = useState<boolean>(false);
  const [generationTimeframe, setGenerationTimeframe] = useState<"daily" | "monthly" | "annual">("monthly");

  // Finance state (Rule C.9)
  const [tenureYears, setTenureYears] = useState<number>(5);
  const [above2LakhRate, setAbove2LakhRate] = useState<number>(siteConfig.finance.standardRateAbove2LakhDefault); // Default 8.0%

  // Compute effective units if bill mode
  const effectiveUnits = useMemo(() => {
    if (mode === "units") return units;
    return Math.max(150, Math.round(bill / (ratePerUnit || 7.5)));
  }, [mode, units, bill, ratePerUnit]);

  // Sizing calculations
  const estimate = useMemo(() => {
    return calculateFromUnits(effectiveUnits);
  }, [effectiveUnits]);

  // Roof fit check
  const roofFits = !checkRoof || roofArea >= estimate.roofAreaSqFt;

  // Rate logic per Rule C.9: ≤ ₹2 Lakh uses 5.75%; > ₹2 Lakh uses 7.25%-9.50% selector
  const isAbove2Lakh = estimate.netCost > siteConfig.finance.maxSubsidizedLoanAmount;
  const interestRate = isAbove2Lakh ? above2LakhRate : siteConfig.finance.subsidizedRateUpTo2Lakh;

  // Calculated EMI for net system cost
  const emi = useMemo(() => {
    return calculateEMI(estimate.netCost, interestRate, tenureYears);
  }, [estimate.netCost, interestRate, tenureYears]);

  // Consistent generation across toggles (Rule B.8)
  const baseMonthlyUnits = estimate.monthlyUnits;
  const baseDailyUnits = Number(estimate.dailyUnits);
  const baseAnnualUnits = estimate.annualUnits;

  return (
    <div className="bg-[#F1F8EC] min-h-screen text-[#06180F] pt-28 pb-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.14em] text-[#0B4A2B] font-semibold bg-[#F1F8EC] border border-[#D5E6CC] px-4 py-1.5 rounded-full inline-block mb-4 font-mono">
            Solar Sizing & Savings
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium font-heading text-[#06180F] tracking-[-0.03em] mb-4">
            Solar Savings & Sizing Calculator
          </h1>
          <p className="text-base sm:text-lg text-[#06180F]/70 font-normal">
            Estimate your roof area capacity, electricity generation, PM Surya Ghar central subsidy, and bank financing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Inputs Column (Mint light theme with #D5E6CC borders) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F1F8EC] border border-[#D5E6CC] rounded-[28px] p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-medium font-heading text-[#06180F] mb-6 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[#3F8F3A]" />
                1. Your Electricity Profile
              </h2>

              {/* Mode Toggle */}
              <div className="grid grid-cols-2 gap-2 bg-white p-1.5 rounded-2xl border border-[#D5E6CC] mb-6">
                <button
                  onClick={() => setMode("units")}
                  className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                    mode === "units"
                      ? "bg-[#0B4A2B] text-white shadow-sm font-semibold"
                      : "text-[#06180F]/70 hover:text-[#06180F]"
                  }`}
                >
                  By Monthly Units
                </button>
                <button
                  onClick={() => setMode("bill")}
                  className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                    mode === "bill"
                      ? "bg-[#0B4A2B] text-white shadow-sm font-semibold"
                      : "text-[#06180F]/70 hover:text-[#06180F]"
                  }`}
                >
                  By Monthly Bill (₹)
                </button>
              </div>

              {/* Units Input */}
              {mode === "units" ? (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="calc-units-range" className="text-xs sm:text-sm text-[#06180F]/70">Average Monthly Units:</label>
                    <span className="text-2xl font-medium font-heading text-[#0B4A2B]">
                      {units} <span className="text-xs text-[#06180F]/60 font-sans">kWh</span>
                    </span>
                  </div>
                  <input
                    id="calc-units-range"
                    type="range"
                    min={150}
                    max={1500}
                    step={25}
                    value={units}
                    onChange={(e) => setUnits(Number(e.target.value))}
                    className="w-full h-2.5 bg-white rounded-full appearance-none cursor-pointer accent-[#3F8F3A]"
                    aria-label="Monthly units range"
                  />
                  <div className="flex justify-between text-[11px] text-[#06180F]/50 mt-1.5 font-mono">
                    <span>150 Units</span>
                    <span>750 Units</span>
                    <span>1,500 Units</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 mb-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label htmlFor="calc-bill-range" className="text-xs sm:text-sm text-[#06180F]/70">Average Monthly Bill:</label>
                      <span className="text-2xl font-medium font-heading text-[#0B4A2B]">
                        {formatINR(bill)}
                      </span>
                    </div>
                    <input
                      id="calc-bill-range"
                      type="range"
                      min={1000}
                      max={15000}
                      step={250}
                      value={bill}
                      onChange={(e) => setBill(Number(e.target.value))}
                      className="w-full h-2.5 bg-white rounded-full appearance-none cursor-pointer accent-[#3F8F3A]"
                      aria-label="Monthly bill range"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label htmlFor="calc-tariff" className="text-xs text-[#06180F]/70">Electricity Tariff (₹/unit):</label>
                      <span className="text-xs font-mono text-[#06180F] font-semibold">₹{ratePerUnit.toFixed(2)}/unit</span>
                    </div>
                    <input
                      id="calc-tariff"
                      type="number"
                      step={0.25}
                      min={4}
                      max={12}
                      value={ratePerUnit}
                      onChange={(e) => setRatePerUnit(Number(e.target.value))}
                      className="w-full px-4 py-2.5 bg-white border border-[#D5E6CC] rounded-xl text-sm text-[#06180F] focus:outline-none focus:border-[#0B4A2B]"
                      aria-label="Tariff in Rupees per unit"
                    />
                  </div>
                </div>
              )}

              {/* Optional Roof Area Verification */}
              <div className="pt-4 border-t border-[#D5E6CC]">
                <div className="flex items-center justify-between mb-3">
                  <label htmlFor="roof-check" className="flex items-center gap-2 text-sm text-[#06180F] font-medium cursor-pointer">
                    <input
                      id="roof-check"
                      type="checkbox"
                      checked={checkRoof}
                      onChange={(e) => setCheckRoof(e.target.checked)}
                      className="w-4 h-4 rounded border-[#D5E6CC] text-[#0B4A2B] focus:ring-[#8CC63F] accent-[#3F8F3A]"
                    />
                    <span>Verify My Roof Area Fit</span>
                  </label>
                </div>

                {checkRoof && (
                  <div className="p-4 bg-white rounded-2xl border border-[#D5E6CC]">
                    <div className="flex justify-between items-center mb-2">
                      <label htmlFor="roof-area-range" className="text-xs text-[#06180F]/70">Available Shadow-Free Roof:</label>
                      <span className="text-sm font-bold text-[#06180F] font-mono">{roofArea} sq ft</span>
                    </div>
                    <input
                      id="roof-area-range"
                      type="range"
                      min={150}
                      max={2000}
                      step={50}
                      value={roofArea}
                      onChange={(e) => setRoofArea(Number(e.target.value))}
                      className="w-full h-2 bg-[#F1F8EC] rounded-full appearance-none cursor-pointer accent-[#3F8F3A]"
                      aria-label="Available roof area range"
                    />
                    <div className="mt-2 text-xs">
                      {roofFits ? (
                        <span className="text-[#3F8F3A] flex items-center gap-1.5 font-medium">
                          <CheckCircle2 className="w-4 h-4" />
                          Ample roof space: {roofArea} sq ft exceeds required ~{estimate.roofAreaSqFt} sq ft.
                        </span>
                      ) : (
                        <span className="text-[#06180F]/80 flex items-center gap-1.5">
                          <AlertCircle className="w-4 h-4 text-[#3F8F3A]" />
                          Needs ~{estimate.roofAreaSqFt} sq ft. An elevated structure may be considered.
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bank Loan Selector Card (Rule C.9) */}
            <div className="bg-[#F1F8EC] border border-[#D5E6CC] rounded-[28px] p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-medium font-heading text-[#06180F] mb-4 flex items-center gap-2">
                <Building className="w-5 h-5 text-[#3F8F3A]" />
                2. Bank Financing Terms
              </h2>

              <p className="text-xs text-[#06180F]/70 mb-5 leading-relaxed">
                {isAbove2Lakh
                  ? "Loan exceeds ₹2 Lakh. Major public sector banks offer standard rates between 7.25% - 9.50% p.a. depending on bank and CIBIL score."
                  : "Eligible for 5.75% p.a. PM Surya Ghar subsidized floating loan from major public sector banks (loans ≤ ₹2 Lakh)."}
              </p>

              {/* Rate selector if above 2 Lakh (Rule C.9) */}
              {isAbove2Lakh ? (
                <div className="mb-4 p-4 bg-white rounded-2xl border border-[#D5E6CC]">
                  <div className="flex justify-between items-center mb-1.5 text-xs text-[#06180F]/70">
                    <label htmlFor="interest-rate-select">Bank Quoted Interest Rate (7.25% – 9.50%):</label>
                    <span className="text-sm font-mono font-bold text-[#0B4A2B]">
                      {above2LakhRate}% p.a.
                    </span>
                  </div>
                  <select
                    id="interest-rate-select"
                    value={above2LakhRate}
                    onChange={(e) => setAbove2LakhRate(Number(e.target.value))}
                    className="w-full px-4 py-2.5 bg-[#F1F8EC] border border-[#D5E6CC] rounded-xl text-sm text-[#06180F] focus:outline-none focus:border-[#0B4A2B]"
                  >
                    <option value={7.25}>7.25% p.a.</option>
                    <option value={7.5}>7.50% p.a.</option>
                    <option value={8.0}>8.00% p.a. (Default)</option>
                    <option value={8.5}>8.50% p.a.</option>
                    <option value={9.0}>9.00% p.a.</option>
                    <option value={9.5}>9.50% p.a.</option>
                  </select>
                  <p className="text-[11px] text-[#06180F]/60 mt-1.5">
                    * Rate depends on bank and CIBIL score.
                  </p>
                </div>
              ) : (
                <div className="mb-4 px-4 py-2.5 bg-white rounded-2xl border border-[#D5E6CC] flex items-center justify-between text-xs">
                  <span className="text-[#06180F]/70">Floating Rate:</span>
                  <span className="font-mono font-bold text-[#3F8F3A]">5.75% p.a. (PM Surya Ghar loan ≤ ₹2 Lakh)</span>
                </div>
              )}

              {/* Tenure Selection */}
              <div>
                <label className="text-xs text-[#06180F]/70 block mb-2 font-medium">Loan Tenure:</label>
                <div className="grid grid-cols-4 gap-2">
                  {[3, 4, 5, 7].map((yr) => (
                    <button
                      key={yr}
                      onClick={() => setTenureYears(yr)}
                      className={`py-2 px-3 rounded-full text-xs font-medium transition-all cursor-pointer ${
                        tenureYears === yr
                          ? "bg-[#0B4A2B] text-white shadow-sm font-semibold"
                          : "bg-white border border-[#D5E6CC] text-[#06180F] hover:bg-white/80"
                      }`}
                    >
                      {yr} Yrs
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Column: Dark Card uses forest-900 with 1px border rgba(255,255,255,0.14) & leaf glow (Rule C.7 & A) */}
          <div className="lg:col-span-7">
            <div className="bg-[#072A19] rounded-[36px] p-6 sm:p-10 border border-[rgba(255,255,255,0.14)] text-white shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-full card-soft-shadow">
              {/* Leaf glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#3F8F3A]/10 blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[rgba(255,255,255,0.14)]">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#8CC63F] font-mono font-semibold block mb-1">
                      Recommended System Size
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-medium font-heading text-white tracking-[-0.03em]">
                        {estimate.kw} kW
                      </span>
                      <span className="text-sm text-[#9DB3A5]">On-Grid Topcon</span>
                    </div>
                  </div>

                  <div className="bg-[#04140C] border border-[rgba(255,255,255,0.14)] px-4 py-2.5 rounded-2xl text-right">
                    <span className="text-[10px] uppercase text-[#9DB3A5] block font-mono">Roof Area</span>
                    <span className="text-base sm:text-lg font-medium font-heading text-white">
                      ~{estimate.roofAreaSqFt} sq ft
                    </span>
                  </div>
                </div>

                {/* Generation Stats with Timeframe Toggle (Rule B.8: consistent generation) */}
                <div className="py-6 border-b border-[rgba(255,255,255,0.14)]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs uppercase tracking-wider text-[#9DB3A5] font-mono">Estimated Generation:</span>
                    <div className="inline-flex bg-[#04140C] p-1 rounded-full border border-[rgba(255,255,255,0.14)] text-xs font-medium">
                      {(["daily", "monthly", "annual"] as const).map((tf) => (
                        <button
                          key={tf}
                          onClick={() => setGenerationTimeframe(tf)}
                          className={`px-3 py-1 rounded-full capitalize transition-colors cursor-pointer ${
                            generationTimeframe === tf
                              ? "bg-[#8CC63F] text-[#04140C] font-semibold"
                              : "text-[#9DB3A5] hover:text-white"
                          }`}
                        >
                          {tf}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#04140C] p-5 rounded-2xl border border-[rgba(255,255,255,0.14)] flex items-center justify-between">
                    <div>
                      <span className="text-3xl sm:text-4xl font-medium font-heading text-[#8CC63F] tracking-[-0.03em]">
                        {generationTimeframe === "daily" && `${baseDailyUnits} Units`}
                        {generationTimeframe === "monthly" && `${baseMonthlyUnits} Units`}
                        {generationTimeframe === "annual" && `${baseAnnualUnits.toLocaleString("en-IN")} Units`}
                      </span>
                      <span className="text-xs text-[#9DB3A5] block mt-1">
                        {generationTimeframe === "daily" && "Average solar power generated per day"}
                        {generationTimeframe === "monthly" && "Estimated generation per month"}
                        {generationTimeframe === "annual" && "Estimated generation per year"}
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-[#3F8F3A]/20 flex items-center justify-center text-[#8CC63F] shrink-0">
                      <Zap className="w-5 h-5 fill-current" />
                    </div>
                  </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="py-6 space-y-3.5 border-b border-[rgba(255,255,255,0.14)] text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-[#9DB3A5]">Gross Turnkey EPC ({estimate.kw} kW × ₹66,000):</span>
                    <span className="font-semibold text-white">{formatINR(estimate.grossCost)}</span>
                  </div>

                  <div className="flex justify-between items-center text-[#8CC63F]">
                    <span className="flex items-center gap-1.5 font-medium">
                      <ShieldCheck className="w-4 h-4" />
                      PM Surya Ghar Central Subsidy (3 kW+):
                    </span>
                    <span className="font-bold">- {formatINR(estimate.subsidy)}</span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-[rgba(255,255,255,0.14)] text-base sm:text-lg">
                    <span className="font-medium text-white">Net System Investment:</span>
                    <span className="text-2xl sm:text-3xl font-medium font-heading text-[#8CC63F]">
                      {formatINR(estimate.netCost)}
                    </span>
                  </div>
                </div>

                {/* Monthly EMI Preview */}
                <div className="my-5 p-5 bg-[#04140C] rounded-2xl border border-[rgba(255,255,255,0.14)] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#9DB3A5] block font-mono">
                      Estimated Bank EMI ({tenureYears} Yrs @ {interestRate}% p.a.)
                    </span>
                    <span className="text-2xl sm:text-3xl font-medium font-heading text-white">
                      {formatINR(emi)} <span className="text-xs font-normal text-[#9DB3A5]">/ month</span>
                    </span>
                  </div>
                  <div className="text-xs text-[#9DB3A5] text-right sm:max-w-[200px]">
                    {isAbove2Lakh ? "Rate depends on bank & CIBIL score" : "Subsidised floating rate up to ₹2 Lakh"}
                  </div>
                </div>
              </div>

              {/* Action Buttons (Rule A.1: on dark use leaf-light background with forest-950 text) */}
              <div className="relative z-10 pt-4 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    openEnquiryModal({
                      title: "Send Solar Estimate",
                      defaultKw: estimate.kw,
                      defaultRequirement: `${estimate.kw} kW Rooftop Solar (${estimate.monthlyUnits} units/month)`,
                      defaultNotes: `Monthly Bill: ₹${bill} | Net Cost: ${formatINR(estimate.netCost)} (Subsidy: ${formatINR(estimate.subsidy)}) | Est. Monthly Savings: ${formatINR(Math.round(estimate.monthlyUnits * ratePerUnit))}/mo.`,
                    })
                  }
                  className="w-full sm:flex-1 bg-[#8CC63F] hover:bg-[#9ae045] active:scale-[0.99] text-[#04140C] py-3.5 px-6 rounded-full text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Send Estimate to WhatsApp</span>
                </button>

                <a
                  href="/contact"
                  className="w-full sm:w-auto bg-transparent border border-white/40 hover:bg-white hover:text-[#04140C] text-white py-3.5 px-6 rounded-full text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Book Free Survey</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Footnote per Rule B.8 */}
              <div className="relative z-10 mt-4 text-center text-[11px] text-[#9DB3A5]">
                Indicative estimates only. Final design after site survey.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
