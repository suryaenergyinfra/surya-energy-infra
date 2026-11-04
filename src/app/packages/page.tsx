import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { SOLAR_PACKAGES, formatINR } from "@/lib/data";
import { siteConfig } from "@/lib/site";
import {
  ShieldCheck,
  Zap,
  CheckCircle2,
  Download,
} from "lucide-react";
import { PackageEnquiryButton } from "@/components/packages/package-enquiry-button";

export const metadata: Metadata = {
  title: "Residential Solar Packages (3 kW – 10 kW) | Surya Energy Infra™",
  description:
    "Explore complete turnkey on-grid rooftop solar packages from 3 kW to 10 kW with Topcon panels, ₹78,000 PM Surya Ghar subsidy, and authorized installation across Andhra Pradesh.",
};

export default function PackagesPage() {
  return (
    <div className="bg-[#F1F8EC] min-h-screen text-[#06180F] pt-28 pb-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.14em] text-[#0B4A2B] font-semibold bg-[#F1F8EC] border border-[#D5E6CC] px-4 py-1.5 rounded-full inline-block mb-4 font-mono">
            Transparent Sizing & Pricing
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium font-heading text-[#06180F] tracking-[-0.03em] mb-4">
            Residential Solar Packages (3 kW – 10 kW)
          </h1>
          <p className="text-base sm:text-lg text-[#06180F]/70 font-normal">
            Complete EPC (Engineering, Procurement, Commissioning) with premium Topcon solar panels, on-grid inverters, and mounting structures.
          </p>
        </div>

        {/* Turnkey Pricing Banner */}
        <div className="bg-[#F1F8EC] border border-[#D5E6CC] rounded-3xl p-6 sm:p-8 mb-16 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#D5E6CC] flex items-center justify-center text-[#3F8F3A] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-medium font-heading text-[#06180F]">
                Turnkey Rate: ₹66,000 per kW Complete EPC
              </h3>
              <p className="text-xs sm:text-sm text-[#06180F]/70">
                Includes engineering, Topcon panels, inverter, mounting structures, net-metering and ₹78,000 subsidy assistance.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-[#D5E6CC] text-xs sm:text-sm text-[#0B4A2B] font-semibold whitespace-nowrap shadow-sm">
            <span>₹78,000 Fixed Subsidy (≥ 3 kW)</span>
          </div>
        </div>

        {/* Package Cards Grid (Rule C.2: 4x2 grid on desktop, 2 on tablet, 1 on mobile; 8 cards, 0 orphans) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {SOLAR_PACKAGES.map((pkg) => (
            <div
              key={pkg.kw}
              id={`pkg-${pkg.kw}kw`}
              className="rounded-[28px] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative bg-[#F1F8EC] border border-[#D5E6CC] shadow-sm hover:shadow-md hover:border-[#0B4A2B]/40"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#D5E6CC] flex items-center justify-center text-[#3F8F3A]">
                    <Zap className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-medium font-heading text-[#06180F]">
                      {pkg.kw} kW System
                    </h3>
                    <span className="text-[11px] text-[#06180F]/60">Residential On-Grid</span>
                  </div>
                </div>

                {/* Sizing & pricing facts only (Rule B.4: no appliance claims) */}
                <div className="space-y-3 py-4 border-y border-[#D5E6CC] text-xs mb-5">
                  <div className="flex justify-between items-center">
                    <span className="text-[#06180F]/70">Monthly Units:</span>
                    <span className="font-semibold text-[#06180F]">
                      {pkg.monthlyUnitsMin} – {pkg.monthlyUnitsMax} kWh
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#06180F]/70">Roof Area:</span>
                    <span className="font-semibold text-[#06180F]">~{pkg.roofAreaSqFt} sq ft</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#06180F]/70">Gross Cost:</span>
                    <span className="text-[#06180F]/80">{formatINR(pkg.grossCost)}</span>
                  </div>
                  <div className="flex justify-between items-center text-[#3F8F3A] font-semibold">
                    <span>Govt Subsidy:</span>
                    <span>- {formatINR(pkg.subsidy)}</span>
                  </div>
                </div>

                {/* Net Cost in brand-deep (Rule A.2) & 10-Yr Loan EMI */}
                <div className="mb-6">
                  <span className="text-[10px] uppercase tracking-wider text-[#06180F]/60 block mb-0.5 font-mono">
                    Net Investment
                  </span>
                  <div className="text-2xl sm:text-3xl font-medium font-heading text-[#0B4A2B] tracking-[-0.03em]">
                    {formatINR(pkg.netCost)}
                  </div>
                  <div className="flex items-center justify-between text-[11px] mt-1.5 pt-1.5 border-t border-[#D5E6CC]/70">
                    <span className="text-[#06180F]/70">10-Yr Bank EMI:</span>
                    <span className="font-semibold text-[#0B4A2B]">From {formatINR(pkg.tenure10YrEmi)}/mo</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons (Rule A.1: brand-deep with white text on light) */}
              <div className="space-y-2">
                <PackageEnquiryButton pkg={pkg} />

                {siteConfig.flags.hasBrochurePdf && (
                  <a
                    href={siteConfig.flags.brochurePdfUrl}
                    download
                    className="flex items-center justify-center gap-1.5 text-[11px] text-[#06180F]/70 hover:text-[#06180F] py-1 transition-colors"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download Brochure</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Side-by-Side Comparison Table (Mint Section) */}
        <div className="bg-[#F1F8EC] rounded-[32px] p-6 sm:p-10 lg:p-12 text-[#06180F] mb-16 shadow-sm border border-[#D5E6CC]">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-[0.14em] text-[#0B4A2B] font-semibold bg-white border border-[#D5E6CC] px-3.5 py-1.5 rounded-full inline-block mb-2 font-mono">
              Comparison Matrix
            </span>
            <h2 className="text-2xl sm:text-4xl font-medium font-heading text-[#06180F] tracking-[-0.03em]">
              Side-by-Side System Specifications
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b-2 border-[#D5E6CC] text-xs uppercase tracking-wider text-[#06180F]/70 font-mono">
                  <th className="py-4 px-3">System Size</th>
                  <th className="py-4 px-3">Monthly Units</th>
                  <th className="py-4 px-3">Required Roof</th>
                  <th className="py-4 px-3">Gross Cost</th>
                  <th className="py-4 px-3">Subsidy</th>
                  <th className="py-4 px-3 font-semibold text-[#0B4A2B]">Net Investment</th>
                  <th className="py-4 px-3 font-semibold text-[#0B4A2B]">10-Yr Bank EMI</th>
                  <th className="py-4 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D5E6CC]/80 font-medium">
                {SOLAR_PACKAGES.map((p) => (
                  <tr key={p.kw} className="hover:bg-white/60 transition-colors">
                    <td className="py-4 px-3 font-semibold text-[#06180F]">
                      {p.kw} kW System
                    </td>
                    <td className="py-4 px-3 text-[#06180F]/80">{p.monthlyUnitsMin} – {p.monthlyUnitsMax} units</td>
                    <td className="py-4 px-3 text-[#06180F]/80">~{p.roofAreaSqFt} sq ft</td>
                    <td className="py-4 px-3 text-[#06180F]/70">{formatINR(p.grossCost)}</td>
                    <td className="py-4 px-3 text-[#3F8F3A] font-semibold">- {formatINR(p.subsidy)}</td>
                    <td className="py-4 px-3 font-medium text-base sm:text-lg text-[#0B4A2B] font-heading">
                      {formatINR(p.netCost)}
                    </td>
                    <td className="py-4 px-3 text-sm text-[#0B4A2B] font-semibold">
                      {formatINR(p.tenure10YrEmi)}/mo
                    </td>
                    <td className="py-4 px-3 text-right">
                      <PackageEnquiryButton pkg={p} variant="table" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Standard Inclusions Checklist (Client facts only) */}
        <div className="bg-[#F1F8EC] border border-[#D5E6CC] rounded-3xl p-8 sm:p-12 mb-16 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-medium font-heading text-[#06180F] mb-6 tracking-[-0.03em]">
            What is Included in Every Surya Energy Infra Package
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-[#06180F]/80">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#3F8F3A] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#06180F] block mb-1">Premium Topcon Panels</strong>
                High-efficiency Topcon solar panels engineered for residential rooftop power generation.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#3F8F3A] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#06180F] block mb-1">On-Grid String Inverter</strong>
                Premium grid-tied solar inverter designed for residential utility interconnections.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#3F8F3A] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#06180F] block mb-1">Mounting Structures</strong>
                Sturdy rooftop mounting structures engineered for long-term residential installations.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#3F8F3A] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#06180F] block mb-1">AC & DC Distribution Boxes</strong>
                Standard electrical protection boxes and cabling connecting panels to your home electricals.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#3F8F3A] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#06180F] block mb-1">Dedicated Earthing</strong>
                Maintenance-free earthing electrodes and electrical grounding for residential safety.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#3F8F3A] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#06180F] block mb-1">Net-Meter & Subsidy Guidance</strong>
                Guidance on net-meter documentation and PM Surya Ghar national portal registration.
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-base text-[#06180F]/70 mb-6 font-normal">
            Need advice on sizing for your home? Use our interactive calculator or speak directly with our team.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/calculator"
              className="bg-[#0B4A2B] hover:bg-[#072A19] text-white px-8 py-4 rounded-full text-sm font-medium shadow-sm transition-all"
            >
              Open Sizing Calculator
            </Link>
            <Link
              href="/contact"
              className="bg-white border border-[#D5E6CC] text-[#06180F] hover:bg-[#F1F8EC] px-8 py-4 rounded-full text-sm font-medium shadow-sm transition-all"
            >
              Request Free Rooftop Survey
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
