"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { calculateFromUnits, formatINR, SOLAR_PACKAGES } from "@/lib/data";
import { useWhatsAppModal } from "@/components/ui/whatsapp-modal-context";
import {
  HelpCircle,
  Zap,
  ArrowRight,
  MessageSquare,
  ChevronDown,
  Layers,
} from "lucide-react";

export function EmbeddedEstimator() {
  const { openEnquiryModal } = useWhatsAppModal();
  const [selectedKw, setSelectedKw] = useState<number>(3);
  const [timeframe, setTimeframe] = useState<"day" | "month" | "year">("month");
  const [ratePerUnit, setRatePerUnit] = useState<number>(7.5);

  const estimate = useMemo(() => {
    const units = selectedKw * 125;
    return calculateFromUnits(units);
  }, [selectedKw]);

  // Consistent generation & savings calculation across toggles (Rule B.8)
  const baseMonthlyUnits = selectedKw * 125;
  const baseDailyUnits = Number((selectedKw * 4.2).toFixed(1));
  const baseAnnualUnits = selectedKw * 1500;

  const generationDisplay = useMemo(() => {
    if (timeframe === "day") {
      return `${baseDailyUnits} kWh`;
    }
    if (timeframe === "year") {
      return `${baseAnnualUnits.toLocaleString("en-IN")} kWh`;
    }
    return `${baseMonthlyUnits.toLocaleString("en-IN")} kWh`;
  }, [timeframe, baseDailyUnits, baseMonthlyUnits, baseAnnualUnits]);

  const savingsDisplay = useMemo(() => {
    const monthlySavings = baseMonthlyUnits * ratePerUnit;
    if (timeframe === "day") {
      return formatINR(monthlySavings / 30);
    }
    if (timeframe === "year") {
      return formatINR(monthlySavings * 12);
    }
    return formatINR(monthlySavings);
  }, [timeframe, baseMonthlyUnits, ratePerUnit]);

  return (
    <section className="bg-[#04140C] py-20 lg:py-28 text-white relative overflow-hidden" id="calculator">
      {/* Subtle leaf glow in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#3F8F3A]/10 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Dark Card Canvas: forest-900 on forest-950 with 1px border rgba(255,255,255,0.14) (Rule A & C.7) */}
        <div className="bg-[#072A19] text-white rounded-[36px] p-6 sm:p-10 lg:p-14 border border-[rgba(255,255,255,0.14)] shadow-2xl relative overflow-hidden card-soft-shadow">
          {/* Top Row: Timeframe Switcher Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[rgba(255,255,255,0.14)]">
            <div>
              {/* Rule B.2: Replace with "SOLAR SAVINGS ESTIMATOR" */}
              <span className="text-xs uppercase tracking-[0.14em] text-[#8CC63F] font-semibold">
                Solar Savings Estimator
              </span>
            </div>

            {/* Timeframe Toggle Pills (Rule A.1: on dark active is leaf-light with forest-950 text) */}
            <div className="flex items-center gap-1.5 bg-[#04140C] p-1 rounded-full border border-[rgba(255,255,255,0.14)] self-start sm:self-auto">
              <button
                onClick={() => setTimeframe("day")}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  timeframe === "day"
                    ? "bg-[#8CC63F] text-[#04140C] font-semibold"
                    : "text-[#9DB3A5] hover:text-white"
                }`}
              >
                Per Day
              </button>
              <button
                onClick={() => setTimeframe("month")}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  timeframe === "month"
                    ? "bg-[#8CC63F] text-[#04140C] font-semibold"
                    : "text-[#9DB3A5] hover:text-white"
                }`}
              >
                Per Month
              </button>
              <button
                onClick={() => setTimeframe("year")}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  timeframe === "year"
                    ? "bg-[#8CC63F] text-[#04140C] font-semibold"
                    : "text-[#9DB3A5] hover:text-white"
                }`}
              >
                Per Year
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left Column: Sizing Selectors (Rule B.8: Single-state vendor; removed State and District dropdowns) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xl sm:text-2xl font-heading text-[#9DB3A5] font-normal block leading-tight">
                  Estimate Your
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium font-heading text-white tracking-[-0.03em] mt-1 mb-3">
                  Energy Savings
                </h2>
                <p className="text-sm text-[#9DB3A5] leading-relaxed mb-4">
                  Estimate your residential power bill reduction and net system investment under the PM Surya Ghar scheme.
                </p>

                <div className="flex items-center gap-2 text-xs text-[#9DB3A5]">
                  <span>Explore system sizes:</span>
                  <Link
                    href="/packages"
                    className="text-[#8CC63F] hover:underline font-medium inline-flex items-center gap-1 transition-colors"
                  >
                    <span>View 3–10 kW Packages</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Sizing inputs */}
              <div className="space-y-4 pt-2">
                {/* System Size Select (3 kW to 10 kW) */}
                <div>
                  <label htmlFor="embedded-size-select" className="text-xs text-[#9DB3A5] block mb-1.5 font-medium">
                    System Size:
                  </label>
                  <div className="relative">
                    <select
                      id="embedded-size-select"
                      value={selectedKw}
                      onChange={(e) => setSelectedKw(Number(e.target.value))}
                      className="w-full bg-[#04140C] border border-[rgba(255,255,255,0.14)] rounded-2xl px-4 py-3 text-sm text-white appearance-none cursor-pointer focus:outline-none focus:border-[#8CC63F]"
                    >
                      {SOLAR_PACKAGES.map((p) => (
                        <option key={p.kw} value={p.kw}>
                          {p.kw} kW System (~{p.roofAreaSqFt} sq ft roof area)
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#9DB3A5] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Tariff input */}
                <div>
                  <label htmlFor="embedded-tariff-input" className="text-xs text-[#9DB3A5] block mb-1.5 font-medium">
                    Electricity Tariff (₹/kWh):
                  </label>
                  <input
                    id="embedded-tariff-input"
                    type="number"
                    step={0.5}
                    min={4}
                    max={12}
                    value={ratePerUnit}
                    onChange={(e) => setRatePerUnit(Number(e.target.value))}
                    className="w-full bg-[#04140C] border border-[rgba(255,255,255,0.14)] rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#8CC63F]"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Key Results */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              {/* Stat Card 1: Bill Savings */}
              <div className="bg-[#04140C] rounded-2xl p-6 border border-[rgba(255,255,255,0.14)] relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs sm:text-sm text-[#9DB3A5] font-medium">
                    Estimated Bill Savings
                  </span>
                  <div className="w-5 h-5 rounded-full bg-[#3F8F3A]/20 flex items-center justify-center text-[#8CC63F]">
                    <HelpCircle className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-medium font-heading text-white tracking-[-0.03em]">
                  {savingsDisplay}
                </div>
              </div>

              {/* Stat Card 2: Total Energy Generation */}
              <div className="bg-[#04140C] rounded-2xl p-6 border border-[rgba(255,255,255,0.14)] relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs sm:text-sm text-[#9DB3A5] font-medium">
                    Estimated Solar Generation
                  </span>
                  <div className="w-5 h-5 rounded-full bg-[#3F8F3A]/20 flex items-center justify-center text-[#8CC63F]">
                    <HelpCircle className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-medium font-heading text-white tracking-[-0.03em]">
                  {generationDisplay}
                </div>
              </div>

              {/* Stat Card 3: Net Investment after ₹78k Subsidy */}
              <div className="bg-[#04140C] rounded-2xl p-6 border border-[rgba(255,255,255,0.14)] relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs sm:text-sm text-[#9DB3A5] font-medium">
                    Net System Investment (After ₹78,000 Subsidy)
                  </span>
                  <div className="w-5 h-5 rounded-full bg-[#3F8F3A]/20 flex items-center justify-center text-[#8CC63F]">
                    <HelpCircle className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-medium font-heading text-[#8CC63F] tracking-[-0.03em]">
                  {formatINR(estimate.netCost)}
                </div>
                <div className="text-xs text-[#9DB3A5] mt-1">
                  Gross Cost: {formatINR(estimate.grossCost)} • Subsidy: - {formatINR(estimate.subsidy)}
                </div>
              </div>

              {/* Verified Component Chips (Rule B.1: no fake 400W+ or 12.6 kWh chips) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="bg-[#04140C] rounded-2xl px-4 py-3 border border-[rgba(255,255,255,0.1)] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#3F8F3A]/20 flex items-center justify-center text-[#8CC63F] shrink-0">
                    <Zap className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">Premium Topcon Panels</span>
                    <span className="text-[11px] text-[#9DB3A5]">On-Grid Residential Solar</span>
                  </div>
                </div>

                <div className="bg-[#04140C] rounded-2xl px-4 py-3 border border-[rgba(255,255,255,0.1)] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#3F8F3A]/20 flex items-center justify-center text-[#8CC63F] shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">Complete Turnkey EPC</span>
                    <span className="text-[11px] text-[#9DB3A5]">₹66,000 / kW Complete</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons (Rule A.1: on dark use leaf-light background with forest-950 text) */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() =>
                    openEnquiryModal({
                      title: "Send Solar Estimate",
                      defaultKw: selectedKw,
                      defaultRequirement: `${selectedKw} kW Solar (${generationDisplay}/${timeframe})`,
                      defaultNotes: `Estimated Savings: ${savingsDisplay} | Net Cost: ${formatINR(estimate.netCost)} after ₹78,000 subsidy.`,
                    })
                  }
                  className="flex-1 bg-[#8CC63F] hover:bg-[#9ae045] active:scale-[0.99] text-[#04140C] py-3.5 px-6 rounded-full text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Send Estimate to WhatsApp</span>
                </button>
                <Link
                  href="/calculator"
                  className="bg-transparent border border-white/40 hover:bg-white hover:text-[#04140C] text-white py-3.5 px-6 rounded-full text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Full Calculator</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Footnote per Rule B.8 */}
              <p className="text-[11px] text-[#9DB3A5] text-center pt-2">
                Indicative estimates only. Final design after site survey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
