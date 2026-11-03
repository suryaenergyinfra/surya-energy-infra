import React from "react";
import { siteConfig } from "@/lib/site";
import { ArrowUpRight } from "lucide-react";
import { InstagramIcon } from "@/components/ui/instagram-icon";

export function UpdatesStrip() {
  return (
    <section className="bg-[#F1F8EC] py-16 lg:py-24 text-[#06180F] border-b border-[#D5E6CC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Single clean banner replacing fake cards (Rule B.5) */}
        <div className="bg-white border border-[#D5E6CC] rounded-[32px] p-8 sm:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="max-w-2xl text-center md:text-left">
            <span className="text-xs uppercase tracking-[0.14em] text-[#0B4A2B] font-semibold bg-[#F1F8EC] border border-[#D5E6CC] px-3.5 py-1.5 rounded-full inline-block mb-3 font-mono">
              Live Updates
            </span>
            <h2 className="text-2xl sm:text-4xl font-medium font-heading text-[#06180F] tracking-[-0.03em] mb-3">
              See our latest work on Instagram
            </h2>
            <p className="text-sm sm:text-base text-[#06180F]/70 font-normal leading-relaxed">
              Follow our official Instagram channel for genuine site progress, updates and solar energy insights across Andhra Pradesh.
            </p>
          </div>

          <div className="shrink-0">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#0B4A2B] hover:bg-[#072A19] text-white font-medium text-sm transition-all shadow-sm group"
            >
              <InstagramIcon className="w-5 h-5 text-white" />
              <span>@suryaenergyinfra on Instagram</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
