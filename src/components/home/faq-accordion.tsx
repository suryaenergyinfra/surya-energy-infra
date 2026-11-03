"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FAQ_ITEMS } from "@/lib/data";
import { Plus, Minus } from "lucide-react";

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="bg-[#F1F8EC] py-20 lg:py-28 text-[#06180F] border-b border-[#D5E6CC]" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Rule A.2: switch tag chip to brand-deep on light */}
          <span className="text-xs uppercase tracking-[0.14em] text-[#0B4A2B] font-semibold bg-white border border-[#D5E6CC] px-3.5 py-1.5 rounded-full inline-block mb-3 font-mono">
            Clarity & Guidance
          </span>
          <h2 className="text-3xl sm:text-5xl font-medium font-heading text-[#06180F] tracking-[-0.03em] mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#06180F]/70 font-normal">
            Accurate answers regarding residential on-grid rooftop solar in Andhra Pradesh.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#D5E6CC] overflow-hidden transition-all duration-200 shadow-sm"
              >
                <button
                  onClick={() => toggleIndex(idx)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-[#8CC63F]"
                >
                  <span className="text-base sm:text-lg font-medium font-heading text-[#06180F] leading-snug">
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? "bg-[#0B4A2B] text-white"
                        : "bg-white border border-[#D5E6CC] text-[#06180F]"
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-sm sm:text-base text-[#06180F]/75 leading-relaxed border-t border-[#D5E6CC]/80 pt-4">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
