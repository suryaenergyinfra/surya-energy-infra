import React from "react";
import { siteConfig } from "@/lib/site";

export function Testimonials() {
  // Built behind flag until client supplies authentic reviews
  if (!siteConfig.flags.showTestimonials) {
    return null;
  }

  return (
    <section className="bg-[#04140C] py-20 text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-heading font-bold mb-4">What Our Customers Say</h2>
        <p className="text-[#9DB3A5]">Verified reviews from homeowners across Andhra Pradesh.</p>
      </div>
    </section>
  );
}
