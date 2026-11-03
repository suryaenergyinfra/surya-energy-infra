"use client";

import React, { useState } from "react";
import Image from "next/image";
import { INSTALLATION_STEPS } from "@/lib/data";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

export function InstallationProcess() {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const prevStep = () => {
    setCurrentStep((prev) => (prev === 0 ? INSTALLATION_STEPS.length - 1 : prev - 1));
  };

  const nextStep = () => {
    setCurrentStep((prev) => (prev === INSTALLATION_STEPS.length - 1 ? 0 : prev + 1));
  };

  const step = INSTALLATION_STEPS[currentStep];

  return (
    <section className="bg-[#F1F8EC] py-16 sm:py-20 lg:py-28 text-[#06180F] border-b border-[#D5E6CC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.14em] text-[#0B4A2B] font-semibold bg-white border border-[#D5E6CC] px-3.5 py-1.5 rounded-full inline-block mb-3 font-mono">
              Step-By-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium font-heading text-[#06180F] tracking-[-0.03em]">
              How Installation Works
            </h2>
            <p className="text-sm sm:text-base text-[#06180F]/70 mt-2 max-w-xl font-normal">
              Turnkey engineering, procurement and commissioning executed from survey to activation.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prevStep}
              aria-label="Previous Installation Step"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-[#D5E6CC] hover:bg-[#E3EFE0] active:scale-95 flex items-center justify-center text-[#06180F] transition-all shadow-sm cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextStep}
              aria-label="Next Installation Step"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-[#D5E6CC] hover:bg-[#E3EFE0] active:scale-95 flex items-center justify-center text-[#06180F] transition-all shadow-sm cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step Tabs: No text truncation, labels wrap/scroll cleanly on mobile (Rule C.3) */}
        <div className="flex items-stretch gap-2 sm:gap-3 overflow-x-auto pb-3 mb-6 sm:mb-8 no-scrollbar">
          {INSTALLATION_STEPS.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => setCurrentStep(idx)}
              className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all cursor-pointer min-w-[130px] sm:flex-1 shrink-0 ${
                idx === currentStep
                  ? "bg-white border-[#0B4A2B] shadow-md ring-1 ring-[#0B4A2B]"
                  : "bg-white/70 border-[#D5E6CC] hover:bg-white"
              }`}
            >
              <span className={`text-xs font-mono font-bold block mb-1 ${
                idx === currentStep ? "text-[#0B4A2B]" : "text-[#06180F]/50"
              }`}>
                Step {s.step}
              </span>
              <span className="text-xs sm:text-sm font-medium text-[#06180F] leading-tight block">
                {s.title}
              </span>
            </button>
          ))}
        </div>

        {/* Main Display Card */}
        <div className="rounded-2xl sm:rounded-[32px] overflow-hidden bg-white border border-[#D5E6CC] shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
            <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-auto min-h-[260px] sm:min-h-[340px] bg-[#04140C]">
              {/* PLACEHOLDER: replace with client's real photo */}
              <Image
                src={step.image}
                alt={step.title}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>

            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#D5E6CC] text-xs font-mono text-[#0B4A2B] font-semibold mb-6">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3F8F3A]" />
                  <span>Phase {step.step} of 05</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-medium font-heading text-[#06180F] mb-4">
                  {step.title}
                </h3>

                <p className="text-sm sm:text-base text-[#06180F]/70 leading-relaxed mb-6">
                  {step.summary}
                </p>
              </div>

              {/* Client fact details (Rule B.1: removed fake guarantee and certification claims) */}
              <div className="pt-6 border-t border-[#D5E6CC] flex items-center justify-between text-xs text-[#06180F]/60">
                <span>Surya Energy Infra Head Office: Darsi</span>
                <span className="text-[#0B4A2B] font-semibold">Residential On-Grid Solar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
