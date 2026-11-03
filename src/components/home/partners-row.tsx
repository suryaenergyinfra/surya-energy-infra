import React from "react";
import { siteConfig } from "@/lib/site";

export function PartnersRow() {
  // Built behind flag until client supplies partner/component logos.
  // Mention "Topcon" as text only.
  if (!siteConfig.flags.showPartners) {
    return null;
  }

  return (
    <div className="bg-[#04140C] py-8 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <span className="text-xs uppercase tracking-widest text-[#9DB3A5]">
          Built with Topcon Solar Technology
        </span>
      </div>
    </div>
  );
}
