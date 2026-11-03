import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | Surya Energy Infra™",
  description: "Terms and conditions for Surya Energy Infra™ residential rooftop solar services.",
};

export default function TermsPage() {
  return (
    <div className="bg-[#F1F8EC] min-h-screen text-[#06180F] pt-28 pb-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-5xl font-medium font-heading text-[#06180F] mb-4 tracking-[-0.03em]">
          Terms &amp; Conditions
        </h1>
        <p className="text-xs text-[#06180F]/60 uppercase tracking-wider mb-8 font-mono">
          Last Updated: November 2026
        </p>

        <div className="space-y-8 text-sm sm:text-base text-[#06180F]/75 leading-relaxed font-normal">
          <section>
            <h2 className="text-xl font-medium font-heading text-[#06180F] mb-3">
              1. Indicative Estimates &amp; Site Survey
            </h2>
            <p>
              Calculations provided on this website through the savings estimator and EMI calculator are indicative approximations based on standard solar irradiance in Andhra Pradesh and average consumption metrics. Final technical specifications, panel count, structural requirements, and total costs are subject to a physical rooftop shadow analysis and structural verification.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium font-heading text-[#06180F] mb-3">
              2. PM Surya Ghar Central Subsidy
            </h2>
            <p>
              The ₹78,000 residential subsidy is governed by the Ministry of New and Renewable Energy (MNRE) under PM Surya Ghar. Surya Energy Infra provides guidance on subsidy applications; however, disbursement is made directly by the Government of India into the customer&apos;s verified bank account following utility commissioning and bi-directional meter installation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium font-heading text-[#06180F] mb-3">
              3. Bank Loans &amp; Interest Rates
            </h2>
            <p>
              Subsidized interest rates starting from 5.75% per annum for loans up to ₹2,00,000, and 7.25%–9.50% for higher capacities, are provided by public sector banks. Final interest rates and approval terms depend on the bank and individual CIBIL score.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium font-heading text-[#06180F] mb-3">
              4. Grid Connectivity &amp; Net-Metering
            </h2>
            <p>
              On-grid solar systems require active grid interconnection and approval from the distribution utility. On-grid inverters will automatically power down during utility outages as a mandatory safety requirement (anti-islanding protection).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium font-heading text-[#06180F] mb-3">
              5. Governing Law
            </h2>
            <p>
              These terms are governed by the laws of India, with legal jurisdiction in Prakasam District, Andhra Pradesh.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
