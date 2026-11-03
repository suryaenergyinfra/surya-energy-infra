"use client";

import React from "react";
import Image from "next/image";
import { QUALITY_COMPONENTS } from "@/lib/data";
import { SunMedium, Zap, Layers, ShieldCheck } from "lucide-react";

const COMPONENT_ICONS = [SunMedium, Zap, Layers, ShieldCheck];

export function QualityFeatures() {
  return (
    <section className="relative py-20 lg:py-28 text-white overflow-hidden bg-[#04140C]" id="services">
      {/* Background with dark overlay & subtle leaf glow (Rule A & C.7) */}
      <div className="absolute inset-0 z-0">
        {/* PLACEHOLDER: replace with client's real photo */}
        <Image
          src="/images/hero-2.webp"
          alt="Topcon Solar Panels"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04140C] via-[#04140C]/85 to-[#04140C]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header: "Built with premium components" (Rule B.3) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 pb-6 border-b border-[rgba(255,255,255,0.14)]">
          <div>
            <span className="text-xs uppercase tracking-[0.14em] text-[#8CC63F] font-semibold block mb-2 font-mono">
              Quality Components
            </span>
            <h2 className="text-3xl sm:text-5xl font-medium font-heading text-white tracking-[-0.03em]">
              Built with premium components
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#9DB3A5] font-normal max-w-md">
            Using only premium Topcon panels, premium inverters and sturdy mounting structures.
          </p>
        </div>

        {/* 4 Cards using only client facts (Rule B.3) - forest-900 on forest-950 with 1px border rgba(255,255,255,0.14) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {QUALITY_COMPONENTS.map((item, idx) => {
            const Icon = COMPONENT_ICONS[idx % COMPONENT_ICONS.length];
            return (
              <div
                key={idx}
                className="bg-[#072A19] rounded-[28px] p-7 border border-[rgba(255,255,255,0.14)] hover:border-[#8CC63F]/50 transition-all duration-300 card-soft-shadow flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#04140C] border border-[rgba(255,255,255,0.14)] flex items-center justify-center text-[#8CC63F] group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#9DB3A5]">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-medium font-heading text-white mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9DB3A5] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.1)] flex items-center justify-between text-xs text-[#8CC63F]">
                  <span>{item.tag}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8CC63F]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
