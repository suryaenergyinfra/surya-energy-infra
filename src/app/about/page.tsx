import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import {
  ShieldCheck,
  Clock,
  MapPin,
  Phone,
  Zap,
  Building,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Surya Energy Infra™ - Powering a Sustainable Future",
  description:
    "Surya Energy Infra™ is an authorised Andhra Pradesh vendor for PM Surya Ghar Rooftop Solar scheme, providing residential on-grid solar EPC from our head office in Darsi, Prakasam District.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#F1F8EC] min-h-screen text-[#06180F] pt-28 pb-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.14em] text-[#0B4A2B] font-semibold bg-[#F1F8EC] border border-[#D5E6CC] px-4 py-1.5 rounded-full inline-block mb-4 font-mono">
            Powering a Sustainable Future
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium font-heading text-[#06180F] tracking-[-0.03em] mb-4">
            About Surya Energy Infra™
          </h1>
          <p className="text-base sm:text-lg text-[#06180F]/70 font-normal">
            Dedicated residential solar EPC specialists delivering on-grid rooftop solar systems across Andhra Pradesh.
          </p>
        </div>

        {/* Hero Image & Brand Statement */}
        <div className="relative rounded-[32px] overflow-hidden bg-[#F1F8EC] border border-[#D5E6CC] mb-20 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
            <div className="lg:col-span-7 relative h-72 lg:h-auto min-h-[340px] bg-[#04140C]">
              {/* PLACEHOLDER: replace with client's real photo */}
              <Image
                src="/images/about-hero.webp"
                alt="Surya Energy Infra solar installation team"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
                priority
              />
            </div>

            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#D5E6CC] text-xs font-semibold text-[#0B4A2B] mb-6">
                  <ShieldCheck className="w-4 h-4 text-[#3F8F3A]" />
                  <span>Authorised PM Surya Ghar Vendor</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-medium font-heading text-[#06180F] mb-4 tracking-[-0.03em]">
                  Residential Rooftop Solar EPC in Andhra Pradesh
                </h2>

                <p className="text-sm sm:text-base text-[#06180F]/75 leading-relaxed mb-4 font-normal">
                  Surya Energy Infra™ is an authorised Andhra Pradesh vendor for the central government&apos;s PM Surya Ghar Rooftop Solar scheme. We specialize purely in Residential Solar EPC (Engineering, Procurement, Commissioning) with a focus on on-grid systems from 3 kW to 10 kW.
                </p>

                <p className="text-sm sm:text-base text-[#06180F]/75 leading-relaxed font-normal">
                  Headquartered on Kurichedu Road in Darsi, Prakasam District, our mission is to deliver dependable solar infrastructure that cuts household electricity costs while adhering to strict quality standards.
                </p>
              </div>

              <div className="pt-6 border-t border-[#D5E6CC] flex items-center justify-between text-xs text-[#06180F]/60">
                <span>Prakasam District & Andhra Pradesh</span>
                <span className="text-[#0B4A2B] font-semibold">On-Grid Solar EPC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Core Principles (Client facts only) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-[#F1F8EC] border border-[#D5E6CC] rounded-[28px] p-8 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#D5E6CC] flex items-center justify-center text-[#3F8F3A] mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-medium font-heading text-[#06180F] mb-3">
              Premium Topcon Panels
            </h3>
            <p className="text-sm text-[#06180F]/70 leading-relaxed font-normal">
              We install next-generation Topcon solar panels for reliable residential solar power generation across Andhra Pradesh.
            </p>
          </div>

          <div className="bg-[#F1F8EC] border border-[#D5E6CC] rounded-[28px] p-8 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#D5E6CC] flex items-center justify-center text-[#3F8F3A] mb-6">
              <Building className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-medium font-heading text-[#06180F] mb-3">
              Premium Mounting Structures
            </h3>
            <p className="text-sm text-[#06180F]/70 leading-relaxed font-normal">
              Every rooftop array is securely anchored using sturdy mounting structures engineered for long-term residential reliability.
            </p>
          </div>

          <div className="bg-[#F1F8EC] border border-[#D5E6CC] rounded-[28px] p-8 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#D5E6CC] flex items-center justify-center text-[#3F8F3A] mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-medium font-heading text-[#06180F] mb-3">
              Complete EPC Under One Roof
            </h3>
            <p className="text-sm text-[#06180F]/70 leading-relaxed font-normal">
              From initial rooftop survey to net-metering commissioning and PM Surya Ghar subsidy guidance, we handle every step directly.
            </p>
          </div>
        </div>

        {/* Head Office & Working Standards (Client facts only) */}
        <div className="bg-[#F1F8EC] rounded-[32px] p-8 lg:p-12 text-[#06180F] mb-16 shadow-sm border border-[#D5E6CC]">
          <div className="max-w-3xl mb-8">
            <span className="text-xs uppercase tracking-[0.14em] text-[#0B4A2B] font-semibold bg-white border border-[#D5E6CC] px-3.5 py-1.5 rounded-full inline-block mb-2 font-mono">
              Physical Location & Support
            </span>
            <h2 className="text-2xl sm:text-4xl font-medium font-heading text-[#06180F] tracking-[-0.03em]">
              Our Head Office & Operational Standards
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#D5E6CC] shadow-sm">
              <MapPin className="w-6 h-6 text-[#3F8F3A] mb-3" />
              <h3 className="text-base font-medium font-heading text-[#06180F] mb-1">
                Head Office Location
              </h3>
              <p className="text-xs sm:text-sm text-[#06180F]/70 leading-relaxed">
                {siteConfig.contact.address.full}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#D5E6CC] shadow-sm">
              <Clock className="w-6 h-6 text-[#3F8F3A] mb-3" />
              <h3 className="text-base font-medium font-heading text-[#06180F] mb-1">
                Working Hours
              </h3>
              <p className="text-xs sm:text-sm text-[#06180F]/70 leading-relaxed">
                {siteConfig.contact.hours}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#D5E6CC] shadow-sm">
              <Phone className="w-6 h-6 text-[#3F8F3A] mb-3" />
              <h3 className="text-base font-medium font-heading text-[#06180F] mb-1">
                Direct Contact
              </h3>
              <p className="text-xs sm:text-sm text-[#06180F]/70 leading-relaxed">
                Phone: {siteConfig.contact.displayPhone} <br />
                Email: {siteConfig.contact.email}
              </p>
            </div>
          </div>
        </div>

        {/* CTA (Rule A.1: on light sections use brand-deep with white text) */}
        <div className="text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#0B4A2B] hover:bg-[#072A19] text-white px-8 py-4 rounded-full text-sm font-medium shadow-sm transition-all group"
          >
            <span>Request Site Survey from Our Team</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
