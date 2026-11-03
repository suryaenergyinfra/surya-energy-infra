"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { siteConfig, getWhatsAppUrl } from "@/lib/site";
import { useWhatsAppModal } from "@/components/ui/whatsapp-modal-context";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowRight, MessageSquare, Phone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Rule A.3: No count badges ("8", "5") and no amber badges
const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Packages", href: "/packages" },
  { label: "Services", href: "/#services" },
  { label: "Subsidy & Finance", href: "/subsidy-finance" },
  { label: "Calculator", href: "/calculator" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const { openEnquiryModal } = useWhatsAppModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const defaultQuoteWhatsApp = getWhatsAppUrl(
    "Hello Surya Energy Infra, I am looking for a residential rooftop solar quote for my home in Andhra Pradesh. Please share details."
  );

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Unaltered logo in white pill (Rule C.8) */}
        <div className="pointer-events-auto">
          <Link
            href="/"
            aria-label="Surya Energy Infra Home"
            className="flex items-center bg-white border border-[#D5E6CC] px-3 sm:px-4 py-1.5 rounded-full shadow-sm hover:shadow transition-all group"
          >
            <Logo variant="onLight" size="sm" linkToHome={false} />
          </Link>
        </div>

        {/* Center/Right: Floating Pill Navigation Bar (Tokens only) */}
        <div className="hidden lg:flex items-center gap-1.5 bg-white/95 backdrop-blur-md border border-[#D5E6CC] px-3 py-1.5 rounded-full shadow-sm pointer-events-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "px-3.5 py-1.5 text-xs font-medium rounded-full transition-all select-none",
                  isActive
                    ? "bg-[#F1F8EC] text-[#0B4A2B] font-semibold"
                    : "text-[#06180F]/80 hover:text-[#0B4A2B] hover:bg-[#F1F8EC]/60"
                )}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* Contact us -> Pill Button in brand-deep green (Rule A.1 & A.2) */}
          <Link
            href="/contact"
            className="ml-1 bg-[#0B4A2B] hover:bg-[#072A19] text-white px-4 py-2 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-sm transition-all group"
          >
            <span>Contact us</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile Menu Action & Hamburger */}
        <div className="flex lg:hidden items-center gap-2 pointer-events-auto">
          <button
            type="button"
            onClick={() =>
              openEnquiryModal({
                title: "Get Solar Quote",
                defaultRequirement: "Free Rooftop Survey & Quote",
              })
            }
            className="bg-[#0B4A2B] hover:bg-[#072A19] text-white px-3.5 py-2 rounded-full text-xs font-medium flex items-center gap-1 shadow-sm cursor-pointer"
          >
            <span>Quote</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
            className="p-2 rounded-full bg-white border border-[#D5E6CC] text-[#06180F] shadow-sm cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden mt-3 max-w-sm mx-auto bg-white border border-[#D5E6CC] rounded-3xl p-5 shadow-2xl pointer-events-auto"
          >
            <div className="flex flex-col gap-1.5">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-[#06180F] hover:bg-[#F1F8EC] flex items-center justify-between"
                >
                  <span>{item.label}</span>
                </Link>
              ))}

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openEnquiryModal({
                    title: "Quick WhatsApp Enquiry",
                    defaultRequirement: "Residential Rooftop Solar Enquiry",
                  });
                }}
                className="mt-2 bg-[#0B4A2B] text-white px-4 py-3 rounded-full text-sm font-medium flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Enquire on WhatsApp</span>
              </button>
            </div>

            <div className="mt-4 pt-3 border-t border-[#D5E6CC]/60 flex items-center justify-between text-xs text-[#06180F]/70">
              <a href={siteConfig.contact.phoneTel} className="flex items-center gap-1 font-medium hover:text-[#0B4A2B]">
                <Phone className="w-3.5 h-3.5 text-[#3F8F3A]" />
                <span>{siteConfig.contact.displayPhone}</span>
              </a>
              <a
                href={defaultQuoteWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-medium text-[#0B4A2B]"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#3F8F3A]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
