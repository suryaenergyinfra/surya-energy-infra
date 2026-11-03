"use client";

import React from "react";
import { motion } from "motion/react";
import { ShieldCheck, Layers, SunMedium, Home } from "lucide-react";

// Rule B.1 & B.2: Client facts only - no "tier-one", no "empanelled", badge "PM Surya Ghar"
const FACT_CHIPS = [
  {
    icon: ShieldCheck,
    title: "PM Surya Ghar Authorised Vendor",
    desc: "Authorised vendor for residential solar in Andhra Pradesh",
    badge: "PM Surya Ghar",
  },
  {
    icon: Layers,
    title: "Complete EPC Under One Roof",
    desc: "Engineering, Procurement and Commissioning",
    badge: "Turnkey",
  },
  {
    icon: SunMedium,
    title: "Premium Topcon Panels, Inverters & Structures",
    desc: "Built with premium Topcon solar components",
    badge: "Premium",
  },
  {
    icon: Home,
    title: "3 kW to 10 kW Home Systems",
    desc: "On-grid solar tailored to household power needs",
    badge: "Residential",
  },
];

export function StatementSection() {
  return (
    <section className="bg-[#F1F8EC] py-20 lg:py-28 text-[#06180F] border-b border-[#D5E6CC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Label: WHO WE ARE (Rule C.1) */}
        <div className="mb-4">
          <span className="text-xs uppercase tracking-[0.14em] text-[#0B4A2B] font-semibold bg-white border border-[#D5E6CC] px-3.5 py-1.5 rounded-full inline-block">
            Who We Are
          </span>
        </div>

        {/* Big Statement: Original wording from client facts only (Rule B.6 & C.1: 36-44px, weight 500, tracking -0.03em) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mb-16 sm:mb-20"
        >
          <p className="text-2xl sm:text-4xl lg:text-[40px] font-medium font-heading leading-[1.2] text-[#06180F] tracking-[-0.03em]">
            Surya Energy Infra is an authorised PM Surya Ghar rooftop solar vendor in Andhra Pradesh. We handle engineering, procurement and commissioning of on-grid residential systems from 3 kW to 10 kW, using only premium Topcon panels, inverters and structures.
          </p>
        </motion.div>

        {/* Row of 4 Icon Fact Chips (Mint light theme with #D5E6CC borders) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {FACT_CHIPS.map((chip, idx) => {
            const Icon = chip.icon;
            return (
              <motion.div
                key={chip.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.08 + idx * 0.06 }}
                className="p-6 rounded-[24px] bg-white border border-[#D5E6CC] hover:border-[#0B4A2B] hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#F1F8EC] border border-[#D5E6CC] flex items-center justify-center text-[#3F8F3A] group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#F1F8EC] border border-[#D5E6CC] text-[#0B4A2B]">
                    {chip.badge}
                  </span>
                </div>
                <h3 className="text-base font-medium font-heading text-[#06180F] mb-1.5 leading-snug">
                  {chip.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#06180F]/70 leading-relaxed">
                  {chip.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
