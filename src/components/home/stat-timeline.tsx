"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useInView } from "motion/react";
import { STAT_TIMELINE } from "@/lib/data";

function CountUpNumber({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const [displayValue, setDisplayValue] = useState<number>(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    const duration = 1400;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplayValue(value * easeProgress);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [inView, value]);

  const isDecimal = value % 1 !== 0;
  const formatted = isDecimal
    ? displayValue.toFixed(2)
    : Math.round(displayValue).toLocaleString("en-IN");

  return (
    <span ref={ref} className="font-heading font-medium text-white tracking-[-0.03em]">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

export function StatTimeline() {
  const [activePhotoIdx, setActivePhotoIdx] = useState<number>(0);

  // Rotating background photo effect (Rule C.4)
  useEffect(() => {
    const timer = setInterval(() => {
      setActivePhotoIdx((prev) => (prev + 1) % STAT_TIMELINE.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-[#04140C] py-20 lg:py-28 text-white relative overflow-hidden border-b border-[rgba(255,255,255,0.14)]">
      {/* Rotating photo background with dark forest overlay & gradient fallback (Rule C.4) */}
      <div className="absolute inset-0 z-0">
        {STAT_TIMELINE.map((item, idx) => (
          <div
            key={item.numeral}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === activePhotoIdx ? "opacity-25" : "opacity-0"
            }`}
          >
            {/* PLACEHOLDER: replace with client's real photo */}
            <Image
              src={item.image}
              alt="Surya Energy Infra solar installation"
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-[#04140C] via-[#04140C]/90 to-[#04140C]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            {/* Rule A.2: switch tag to leaf-light on dark */}
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8CC63F] bg-[#072A19] border border-[rgba(255,255,255,0.14)] px-3.5 py-1.5 rounded-full inline-block mb-3 font-mono">
              Verifiable Tariffs
            </span>
            <h2 className="text-3xl sm:text-5xl font-medium font-heading text-white tracking-[-0.03em]">
              Why Go Solar With Us
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#9DB3A5] max-w-md font-normal">
            Transparent pricing, direct central subsidy, and subsidized bank loans under the PM Surya Ghar scheme.
          </p>
        </div>

        {/* 01 - 04 Numbered Timeline Grid (Rule C.4: dark forest-950 section with large 01-04 numerals) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STAT_TIMELINE.map((item, idx) => (
            <div
              key={item.numeral}
              onMouseEnter={() => setActivePhotoIdx(idx)}
              className="p-8 rounded-[28px] bg-[#072A19]/90 backdrop-blur-md border border-[rgba(255,255,255,0.14)] hover:border-[#8CC63F]/50 transition-all duration-300 flex flex-col justify-between card-soft-shadow group cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  {/* Huge numerals with hover color in leaf-light */}
                  <span className="text-3xl sm:text-4xl font-medium font-heading text-white/30 group-hover:text-[#8CC63F] transition-colors">
                    {item.numeral}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#8CC63F]" />
                </div>

                <div className="text-3xl sm:text-4xl font-medium mb-2 text-white">
                  <CountUpNumber
                    value={item.numericValue}
                    prefix={item.prefix}
                    suffix={item.suffix}
                  />
                </div>

                <h3 className="text-base font-medium font-heading text-white mb-2">
                  {item.label}
                </h3>
              </div>

              <p className="text-xs text-[#9DB3A5] leading-relaxed pt-4 border-t border-[rgba(255,255,255,0.1)]">
                {item.subtext}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
