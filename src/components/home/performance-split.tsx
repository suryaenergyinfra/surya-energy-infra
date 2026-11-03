"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";

// PLACEHOLDER: replace with client's real photo (Rule D)
const SPLIT_SLIDES = [
  {
    step: "01",
    label: "Turnkey EPC",
    metric: "₹66,000",
    unit: "/ kW Complete EPC",
    subtext: "Complete engineering, procurement and commissioning of on-grid residential systems with premium Topcon panels, inverters and mounting structures.",
    cta: "View Packages",
    href: "/packages",
    image: "/images/hero-1.webp",
    alt: "Surya Energy Infra residential rooftop solar installation in Andhra Pradesh",
  },
  {
    step: "02",
    label: "Direct Subsidy",
    metric: "₹78,000",
    unit: "Direct Subsidy",
    subtext: "Fixed central government subsidy credited directly to your bank account for 3 kW and above residential systems under PM Surya Ghar: Muft Bijli Yojana.",
    cta: "Subsidy & Finance Guide",
    href: "/subsidy-finance",
    image: "/images/hero-3.webp",
    alt: "Modern home with rooftop solar panels under PM Surya Ghar scheme",
  },
  {
    step: "03",
    label: "Low-Interest Loan",
    metric: "5.75%",
    unit: "p.a. Bank Loans",
    subtext: "Subsidised floating interest rates from public sector banks for loans up to ₹2 Lakh. Transparent guidance for application and documentation.",
    cta: "Explore Financing",
    href: "/subsidy-finance",
    image: "/images/hero-2.webp",
    alt: "Premium Topcon solar panels glistening in sunlight on residential terrace",
  },
];

export function PerformanceSplit() {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const slide = SPLIT_SLIDES[activeSlide];

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + SPLIT_SLIDES.length) % SPLIT_SLIDES.length);
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % SPLIT_SLIDES.length);
  };

  return (
    <section className="bg-[#F1F8EC] py-14 sm:py-20 lg:py-28 text-[#06180F] border-b border-[#D5E6CC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.14em] text-[#0B4A2B] font-semibold block mb-2 font-mono">
              Infrastructure Standard
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium font-heading text-[#06180F] tracking-[-0.03em]">
              Solar engineered for Andhra Pradesh homes
            </h2>
          </div>

          {/* Prev/Next arrows for quick desktop & tablet browsing */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrev}
              aria-label="Previous Feature"
              className="w-10 h-10 rounded-full bg-white hover:bg-[#E3EFE0] active:scale-95 border border-[#D5E6CC] text-[#06180F] flex items-center justify-center transition-all cursor-pointer shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Feature"
              className="w-10 h-10 rounded-full bg-white hover:bg-[#E3EFE0] active:scale-95 border border-[#D5E6CC] text-[#06180F] flex items-center justify-center transition-all cursor-pointer shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
          {/* Left Column: Full-Height Photo with Smooth Fade & Badges */}
          <div className="lg:col-span-7 relative h-[280px] sm:h-[400px] lg:h-[480px] rounded-2xl sm:rounded-[32px] overflow-hidden border border-[#D5E6CC] shadow-md bg-[#04140C] group">
            {/* Real photographic solar installation image with smooth transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.image}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative w-full h-full"
              >
                {/* PLACEHOLDER: replace with client's real photo */}
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-center"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Subtle gradient vignette to keep overlays legible while retaining vivid imagery */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#04140C]/75 via-transparent to-[#04140C]/25" />

            {/* Slider Dots on top-right */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-1.5 bg-[#04140C]/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 z-10">
              {SPLIT_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === activeSlide
                      ? "w-6 bg-[#8CC63F] shadow-sm"
                      : "w-2 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>

            {/* Trust badge on bottom left */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full text-xs font-medium text-[#06180F] shadow border border-[#D5E6CC] z-10 max-w-[calc(100%-2rem)]">
              <ShieldCheck className="w-4 h-4 text-[#3F8F3A] shrink-0" />
              <span className="truncate">Authorised PM Surya Ghar Vendor, Andhra Pradesh</span>
            </div>
          </div>

          {/* Right Column: Clean White Floating Card with Step Tabs */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="w-full bg-white border border-[#D5E6CC] rounded-2xl sm:rounded-[32px] p-6 sm:p-8 lg:p-10 shadow-md relative flex flex-col justify-between h-full min-h-[320px] sm:min-h-[420px]">
              <div>
                {/* Step Tabs: 01 Turnkey | 02 Subsidy | 03 Loan */}
                <div className="flex items-center gap-2 mb-6 sm:mb-8 overflow-x-auto no-scrollbar pb-1">
                  {SPLIT_SLIDES.map((item, idx) => (
                    <button
                      key={item.step}
                      onClick={() => setActiveSlide(idx)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold font-mono transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                        idx === activeSlide
                          ? "bg-[#0B4A2B] text-white shadow-sm"
                          : "bg-[#F1F8EC] text-[#06180F]/70 hover:bg-[#E3EFE0] border border-[#D5E6CC]"
                      }`}
                    >
                      <span>{item.step}</span>
                      <span className="font-sans font-medium text-[11px] opacity-90">{item.label}</span>
                    </button>
                  ))}
                </div>

                {/* Big Metric in brand-deep (Rule A.2 & C.6) */}
                <div className="mb-2">
                  <span className="text-4xl sm:text-5xl lg:text-6xl font-medium font-heading text-[#06180F] tracking-[-0.03em] block leading-none">
                    {slide.metric}
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-[#0B4A2B] block mt-2">
                    {slide.unit}
                  </span>
                </div>

                {/* Subtext */}
                <p className="text-sm sm:text-base text-[#06180F]/75 leading-relaxed mt-4 pt-4 border-t border-[#D5E6CC]">
                  {slide.subtext}
                </p>
              </div>

              {/* Action Button: brand-deep background with white text on light section */}
              <div className="mt-8 pt-2">
                <Link
                  href={slide.href}
                  className="w-full bg-[#0B4A2B] hover:bg-[#072A19] text-white py-3.5 sm:py-4 px-6 rounded-full text-sm sm:text-base font-medium flex items-center justify-center gap-2 shadow-sm transition-all group"
                >
                  <span>{slide.cta}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
