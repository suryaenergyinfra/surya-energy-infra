"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { calculateEMI, formatINR } from "@/lib/data";
import { siteConfig } from "@/lib/site";
import { useWhatsAppModal } from "@/components/ui/whatsapp-modal-context";
import {
  ShieldCheck,
  Landmark,
  FileText,
  CheckCircle2,
  Calculator,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

export default function SubsidyFinancePage() {
  const { openEnquiryModal } = useWhatsAppModal();
  const [loanAmount, setLoanAmount] = useState<number>(120000); // 3 kW net cost
  const [tenureYears, setTenureYears] = useState<number>(10);
  const [above2LakhRate, setAbove2LakhRate] = useState<number>(siteConfig.finance.standardRateAbove2LakhDefault); // Default 8.0% (Rule C.9)

  // Rate logic per Rule C.9: ≤ ₹2 Lakh uses 5.75%; > ₹2 Lakh uses 7.25%-9.50% selector
  const isAbove2Lakh = loanAmount > siteConfig.finance.maxSubsidizedLoanAmount;
  const effectiveRate = isAbove2Lakh ? above2LakhRate : siteConfig.finance.subsidizedRateUpTo2Lakh;

  const emi = useMemo(() => {
    return calculateEMI(loanAmount, effectiveRate, tenureYears);
  }, [loanAmount, effectiveRate, tenureYears]);

  const totalPayment = emi * tenureYears * 12;
  const totalInterest = Math.max(0, totalPayment - loanAmount);

  return (
    <div className="bg-[#F1F8EC] min-h-screen text-[#06180F] pt-28 pb-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.14em] text-[#0B4A2B] font-semibold bg-[#F1F8EC] border border-[#D5E6CC] px-4 py-1.5 rounded-full inline-block mb-4 font-mono">
            PM Surya Ghar: Muft Bijli Yojana
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium font-heading text-[#06180F] tracking-[-0.03em] mb-4">
            Subsidy & Bank Financing Guide
          </h1>
          <p className="text-base sm:text-lg text-[#06180F]/70 font-normal">
            Everything you need to know about the central government ₹78,000 subsidy and subsidized bank loans starting from 5.75% p.a.
          </p>
        </div>

        {/* Important Reassurance: Bank Loan is NOT Mandatory */}
        <div className="bg-white rounded-2xl border border-[#D5E6CC] p-4 sm:p-5 mb-12 flex items-start sm:items-center gap-3.5 shadow-sm max-w-4xl mx-auto">
          <div className="w-10 h-10 rounded-xl bg-[#0B4A2B]/10 flex items-center justify-center text-[#0B4A2B] shrink-0 mt-0.5 sm:mt-0">
            <ShieldCheck className="w-5 h-5 text-[#3F8F3A]" />
          </div>
          <div className="text-xs sm:text-sm">
            <span className="font-semibold text-[#0B4A2B] block mb-0.5">
              Is a Bank Loan Mandatory? No — It Is Completely Optional (Provided for Information).
            </span>
            <span className="text-[#06180F]/75">
              Taking a bank loan is completely optional. You can choose to pay the turnkey EPC amount directly upfront (via Bank Transfer, UPI, or Cheque) and receive the full ₹78,000 Central Government subsidy directly into your bank account. 10-year bank loan information is provided purely as guidance for homeowners who prefer zero initial out-of-pocket payment.
            </span>
          </div>
        </div>

        {/* Top 2 Cards: Subsidy + Loan Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Card 1: Subsidy */}
          <div className="bg-[#F1F8EC] border border-[#D5E6CC] rounded-[32px] p-8 lg:p-10 shadow-sm relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#D5E6CC] flex items-center justify-center text-[#3F8F3A] mb-6">
              <ShieldCheck className="w-7 h-7" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-wider text-[#0B4A2B] block mb-1 font-mono">
              Central Government Subsidy
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium font-heading text-[#06180F] mb-4">
              ₹78,000 Central Government Subsidy
            </h2>
            <p className="text-sm sm:text-base text-[#06180F]/75 leading-relaxed mb-6 font-normal">
              Under the PM Surya Ghar scheme, residential rooftop systems of 3 kW capacity and above receive a fixed central subsidy of ₹78,000. Surya Energy Infra provides guidance on portal submission, and the funds are credited directly to your bank account by the government.
            </p>

            <ul className="space-y-3 text-sm text-[#06180F]/80 pt-4 border-t border-[#D5E6CC]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3F8F3A]" />
                <span>Direct credit to customer bank account</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3F8F3A]" />
                <span>Fixed ₹78,000 amount for 3 kW and above systems</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3F8F3A]" />
                <span>Applicable on 3 kW to 10 kW residential installations</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Bank Loans */}
          <div className="bg-[#F1F8EC] border border-[#D5E6CC] rounded-[32px] p-8 lg:p-10 shadow-sm relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#D5E6CC] flex items-center justify-center text-[#3F8F3A] mb-6">
              <Landmark className="w-7 h-7" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-wider text-[#0B4A2B] block mb-1 font-mono">
              Low-Cost Financing
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium font-heading text-[#06180F] mb-4">
              Bank Loans from 5.75% Floating Rate
            </h2>
            <p className="text-sm sm:text-base text-[#06180F]/75 leading-relaxed mb-6 font-normal">
              Most major public sector banks offer a subsidised floating rate of 5.75% p.a. for PM Surya Ghar loans up to ₹2,00,000. For systems where the loan exceeds ₹2 Lakh, rates typically range from 7.25% to 9.50% depending on the bank and customer CIBIL score.
            </p>

            <ul className="space-y-3 text-sm text-[#06180F]/80 pt-4 border-t border-[#D5E6CC]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3F8F3A]" />
                <span>5.75% p.a. floating rate up to ₹2,00,000</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3F8F3A]" />
                <span>7.25% – 9.50% for loans exceeding ₹2 Lakh (depends on bank and CIBIL)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3F8F3A]" />
                <span>Flexible tenures up to 10 years (120 months) with public sector banks</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Interactive Full Financing Calculator (Rule C.9) */}
        <div className="bg-[#F1F8EC] border border-[#D5E6CC] rounded-[32px] p-8 lg:p-12 mb-16 shadow-sm">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-[#D5E6CC]">
            <div className="w-10 h-10 rounded-2xl bg-white border border-[#D5E6CC] flex items-center justify-center text-[#3F8F3A]">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-medium font-heading text-[#06180F]">
                Detailed EMI & Loan Payment Calculator
              </h2>
              <p className="text-xs sm:text-sm text-[#06180F]/70">
                Plan your solar financing and see how monthly electricity savings offset your loan payment.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Calculator Controls */}
            <div className="lg:col-span-7 space-y-6">
              {/* Loan Amount */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="finance-loan-amount" className="text-xs sm:text-sm text-[#06180F]/70">Desired Loan Amount:</label>
                  <span className="text-2xl font-medium font-heading text-[#0B4A2B]">
                    {formatINR(loanAmount)}
                  </span>
                </div>
                <input
                  id="finance-loan-amount"
                  type="range"
                  min={50000}
                  max={500000}
                  step={10000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2.5 bg-white rounded-full appearance-none cursor-pointer accent-[#3F8F3A]"
                  aria-label="Desired loan amount range"
                />
                <div className="flex justify-between text-xs text-[#06180F]/60 mt-1 font-mono">
                  <span>₹50,000</span>
                  <span className="text-[#0B4A2B] font-semibold">₹2,00,000 (5.75% Cap)</span>
                  <span>₹5,00,000</span>
                </div>
              </div>

              {/* Rate Details (Rule C.9) */}
              <div className="p-4 bg-white rounded-2xl border border-[#D5E6CC]">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-[#06180F]/70 font-medium">Applied Interest Rate:</span>
                  <span className="text-base font-bold font-mono text-[#0B4A2B]">
                    {effectiveRate}% p.a.
                  </span>
                </div>
                {!isAbove2Lakh ? (
                  <span className="text-xs text-[#3F8F3A] font-medium">
                    ✓ Subsidised floating rate of 5.75% under PM Surya Ghar (loans ≤ ₹2 Lakh)
                  </span>
                ) : (
                  <div className="mt-3 pt-3 border-t border-[#D5E6CC]">
                    <label htmlFor="custom-interest-rate" className="text-xs text-[#06180F]/70 block mb-1">
                      Bank Quoted Rate (7.25% – 9.50%):
                    </label>
                    <select
                      id="custom-interest-rate"
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
                    <p className="text-[11px] text-[#06180F]/60 mt-1.5">
                      * Rate depends on bank and CIBIL score.
                    </p>
                  </div>
                )}
              </div>

              {/* Tenure Selection with 10 Years */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs sm:text-sm text-[#06180F]/70 font-medium">Loan Tenure:</label>
                  <span className="text-xs text-[#3F8F3A] font-semibold">Up to 10 Years (120 Months)</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[3, 5, 7, 10].map((yr) => (
                    <button
                      key={yr}
                      onClick={() => setTenureYears(yr)}
                      className={`py-2.5 px-3 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
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
            </div>

            {/* Calculated Breakdown Card: forest-900 with 1px border rgba(255,255,255,0.14) (Rule C.7 & A.1) */}
            <div className="lg:col-span-5 bg-[#072A19] border border-[rgba(255,255,255,0.14)] rounded-3xl p-6 sm:p-8 text-center text-white shadow-xl card-soft-shadow">
              <span className="text-xs uppercase tracking-wider text-[#9DB3A5] block mb-1 font-mono">
                Estimated Monthly EMI
              </span>
              <div className="text-4xl sm:text-5xl font-medium font-heading text-[#8CC63F] mb-2 tracking-[-0.03em]">
                {formatINR(emi)}
              </div>
              <span className="text-xs text-[#9DB3A5] block mb-6">
                per month for {tenureYears} years ({tenureYears * 12} instalments)
              </span>

              <div className="space-y-3 py-4 border-y border-[rgba(255,255,255,0.14)] text-xs text-left mb-6">
                <div className="flex justify-between">
                  <span className="text-[#9DB3A5]">Principal Loan:</span>
                  <span className="font-semibold text-white">{formatINR(loanAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9DB3A5]">Total Interest:</span>
                  <span className="font-semibold text-white">{formatINR(totalInterest)}</span>
                </div>
                <div className="flex justify-between text-sm font-medium pt-1 border-t border-[rgba(255,255,255,0.1)]">
                  <span className="text-white">Total Repayment:</span>
                  <span className="text-[#8CC63F] font-semibold">{formatINR(totalPayment)}</span>
                </div>
              </div>

              {/* Action Button (Rule A.1: on dark use leaf-light with forest-950 text) */}
              <button
                type="button"
                onClick={() =>
                  openEnquiryModal({
                    title: "Loan & Subsidy Assistance",
                    defaultRequirement: `Bank Loan Guidance (${formatINR(loanAmount)} @ ${effectiveRate}% p.a.)`,
                    defaultNotes: `Estimated Loan: ${formatINR(loanAmount)}, Tenure: ${tenureYears} Years, Monthly EMI: ${formatINR(emi)}/mo. Looking for bank documentation guidance.`,
                  })
                }
                className="w-full bg-[#8CC63F] hover:bg-[#9ae045] active:scale-[0.99] text-[#04140C] py-3.5 px-6 rounded-full text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Inquire Loan Assistance on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* Required Documents Checklist */}
        <div className="bg-[#F1F8EC] rounded-[32px] p-8 lg:p-12 text-[#06180F] mb-16 shadow-sm border border-[#D5E6CC]">
          <div className="max-w-3xl mb-8">
            <span className="text-xs uppercase tracking-[0.14em] text-[#0B4A2B] font-semibold bg-white border border-[#D5E6CC] px-3.5 py-1.5 rounded-full inline-block mb-2 font-mono">
              Application Checklist
            </span>
            <h2 className="text-2xl sm:text-4xl font-medium font-heading text-[#06180F] tracking-[-0.03em]">
              Required Documents for PM Surya Ghar & Bank Loan
            </h2>
            <p className="text-sm sm:text-base text-[#06180F]/70 mt-2 font-normal">
              Keep these standard documents handy for PM Surya Ghar portal submission and bank loan processing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#D5E6CC] shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#F1F8EC] border border-[#D5E6CC] flex items-center justify-center text-[#3F8F3A] mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-medium font-heading text-[#06180F] mb-1">
                Electricity Bill
              </h3>
              <p className="text-xs text-[#06180F]/70 leading-relaxed">
                Latest electricity bill showing consumer service number in the applicant&apos;s name.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#D5E6CC] shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#F1F8EC] border border-[#D5E6CC] flex items-center justify-center text-[#3F8F3A] mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-medium font-heading text-[#06180F] mb-1">
                Aadhaar Card
              </h3>
              <p className="text-xs text-[#06180F]/70 leading-relaxed">
                Aadhaar card copy linked with mobile number for national portal verification.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#D5E6CC] shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#F1F8EC] border border-[#D5E6CC] flex items-center justify-center text-[#3F8F3A] mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-medium font-heading text-[#06180F] mb-1">
                Bank Passbook / Cheque
              </h3>
              <p className="text-xs text-[#06180F]/70 leading-relaxed">
                Cancelled cheque or passbook copy showing account number & IFSC code for direct government subsidy credit.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#D5E6CC] shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#F1F8EC] border border-[#D5E6CC] flex items-center justify-center text-[#3F8F3A] mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-medium font-heading text-[#06180F] mb-1">
                PAN Card
              </h3>
              <p className="text-xs text-[#06180F]/70 leading-relaxed">
                PAN card copy required for bank loan KYC processing.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#D5E6CC] shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#F1F8EC] border border-[#D5E6CC] flex items-center justify-center text-[#3F8F3A] mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-medium font-heading text-[#06180F] mb-1">
                House Property Proof
              </h3>
              <p className="text-xs text-[#06180F]/70 leading-relaxed">
                Property tax receipt or ownership proof of the premises where the system is to be installed.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#D5E6CC] shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#F1F8EC] border border-[#D5E6CC] flex items-center justify-center text-[#3F8F3A] mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-medium font-heading text-[#06180F] mb-1">
                Passport Photographs
              </h3>
              <p className="text-xs text-[#06180F]/70 leading-relaxed">
                Passport size photographs for bank loan documentation.
              </p>
            </div>
          </div>
        </div>

        {/* Step-by-Step Subsidy Process */}
        <div className="bg-[#F1F8EC] border border-[#D5E6CC] rounded-3xl p-8 lg:p-12 mb-16 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-medium font-heading text-[#06180F] mb-8 tracking-[-0.03em]">
            The 5 Steps from Registration to Subsidy Disbursement
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-[#0B4A2B] text-white font-medium font-heading flex items-center justify-center shrink-0">
                1
              </div>
              <div>
                <h3 className="text-base font-medium text-[#06180F] font-heading">
                  Site Survey & Technical Feasibility
                </h3>
                <p className="text-xs sm:text-sm text-[#06180F]/70 mt-1">
                  Rooftop inspection and application submission on the PM Surya Ghar national portal.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-[#0B4A2B] text-white font-medium font-heading flex items-center justify-center shrink-0">
                2
              </div>
              <div>
                <h3 className="text-base font-medium text-[#06180F] font-heading">
                  System Installation
                </h3>
                <p className="text-xs sm:text-sm text-[#06180F]/70 mt-1">
                  Surya Energy Infra completes physical installation with Topcon panels, inverters and mounting structures.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-[#0B4A2B] text-white font-medium font-heading flex items-center justify-center shrink-0">
                3
              </div>
              <div>
                <h3 className="text-base font-medium text-[#06180F] font-heading">
                  Net-Meter Inspection
                </h3>
                <p className="text-xs sm:text-sm text-[#06180F]/70 mt-1">
                  Submission of work completion report and bi-directional net-meter installation by utility engineers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-[#0B4A2B] text-white font-medium font-heading flex items-center justify-center shrink-0">
                4
              </div>
              <div>
                <h3 className="text-base font-medium text-[#06180F] font-heading">
                  Commissioning Certificate
                </h3>
                <p className="text-xs sm:text-sm text-[#06180F]/70 mt-1">
                  Issuance of the online commissioning certificate on the national portal.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-[#0B4A2B] text-white font-medium font-heading flex items-center justify-center shrink-0">
                5
              </div>
              <div>
                <h3 className="text-base font-medium text-[#06180F] font-heading">
                  Direct Subsidy Disbursement
                </h3>
                <p className="text-xs sm:text-sm text-[#06180F]/70 mt-1">
                  Central government transfers ₹78,000 directly into the customer&apos;s verified bank account.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA (Rule A.1: on light sections use brand-deep with white text) */}
        <div className="text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#0B4A2B] hover:bg-[#072A19] text-white px-8 py-4 rounded-full text-sm font-medium shadow-sm transition-all group"
          >
            <span>Start Your PM Surya Ghar Registration</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
