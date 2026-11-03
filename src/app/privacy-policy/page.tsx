import React from "react";
import { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Surya Energy Infra™",
  description: "Privacy Policy for Surya Energy Infra™ rooftop solar services and customer inquiry handling.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#F1F8EC] min-h-screen text-[#06180F] pt-28 pb-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-5xl font-medium font-heading text-[#06180F] mb-4 tracking-[-0.03em]">
          Privacy Policy
        </h1>
        <p className="text-xs text-[#06180F]/60 uppercase tracking-wider mb-8 font-mono">
          Last Updated: November 2026
        </p>

        <div className="space-y-8 text-sm sm:text-base text-[#06180F]/75 leading-relaxed font-normal">
          <section>
            <h2 className="text-xl font-medium font-heading text-[#06180F] mb-3">
              1. Information We Collect
            </h2>
            <p>
              Surya Energy Infra™ (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) operates a residential solar EPC service in Andhra Pradesh. When you use our savings calculator, contact form, or connect with us over WhatsApp, we collect details such as your name, contact phone number, town/village location, and monthly electricity consumption solely for preparing your rooftop solar assessment and quotation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium font-heading text-[#06180F] mb-3">
              2. Use of Information
            </h2>
            <p>
              Your information is used strictly to:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Conduct rooftop feasibility and area measurement</li>
              <li>Provide solar equipment sizing and pricing proposals</li>
              <li>Provide guidance on PM Surya Ghar portal registration and net-metering</li>
              <li>Coordinate site survey visits by our solar technicians</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium font-heading text-[#06180F] mb-3">
              3. Data Protection & Sharing
            </h2>
            <p>
              We do not sell, rent, or trade your personal information with third-party marketers. Information is used strictly for processing your rooftop solar inquiries and financing guidance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium font-heading text-[#06180F] mb-3">
              4. Contact Us
            </h2>
            <p>
              For questions regarding our privacy practices, please contact us at{" "}
              <a href={`mailto:${siteConfig.contact.email}`} className="text-[#0B4A2B] font-semibold underline">
                {siteConfig.contact.email}
              </a>{" "}
              or write to our Head Office at {siteConfig.contact.address.full}.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
