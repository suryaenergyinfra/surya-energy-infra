import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { siteConfig } from "@/lib/site";
import { SOLAR_PACKAGES, formatINR } from "@/lib/data";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { InstagramIcon } from "@/components/ui/instagram-icon";

export function Footer() {
  const quickPackages = SOLAR_PACKAGES.filter((p) => [3, 5, 10].includes(p.kw));

  return (
    <footer className="bg-[#04140C] text-white border-t border-[rgba(255,255,255,0.14)] relative overflow-hidden pt-20 pb-12">
      {/* Subtle leaf ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#3F8F3A]/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Highlight Banner: Authorized Status (Rule B.2) */}
        <div className="bg-[#072A19] border border-[rgba(255,255,255,0.14)] rounded-3xl p-6 sm:p-8 mb-16 flex flex-col md:flex-row items-center justify-between gap-6 card-soft-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#04140C] border border-[rgba(255,255,255,0.14)] flex items-center justify-center text-[#8CC63F] shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              {/* Rule B.2: Replace with AUTHORISED PM SURYA GHAR VENDOR */}
              <span className="text-xs font-semibold uppercase tracking-widest text-[#8CC63F] block font-mono">
                Authorised PM Surya Ghar Vendor
              </span>
              <h3 className="text-lg sm:text-xl font-medium font-heading text-white">
                PM Surya Ghar Rooftop Solar • Andhra Pradesh
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-[#9DB3A5] bg-[#04140C] px-4 py-2 rounded-full border border-[rgba(255,255,255,0.14)]">
            <CheckCircle2 className="w-4 h-4 text-[#8CC63F]" />
            <span>₹78,000 Direct Subsidy for 3 kW and Above</span>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-[rgba(255,255,255,0.14)]">
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              {/* Unaltered Logo in white pill on dark surfaces (Rule C.8) */}
              <Logo variant="onDark" size="lg" />
            </div>
            <p className="text-sm sm:text-base text-[#9DB3A5] max-w-md mb-6 leading-relaxed font-normal">
              Residential Solar EPC (Engineering, Procurement, Commissioning). On-grid rooftop solar installations using premium Topcon panels, inverters and structures across Andhra Pradesh.
            </p>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#072A19] border border-[rgba(255,255,255,0.14)] text-xs text-[#8CC63F] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#8CC63F] animate-pulse" />
              On-Grid Solar EPC
            </div>

            {/* Instagram Social (Only Instagram provided per client facts - Rule B.9) */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Surya Energy Infra on Instagram"
                className="w-10 h-10 rounded-full bg-[#072A19] border border-[rgba(255,255,255,0.14)] flex items-center justify-center text-[#9DB3A5] hover:text-[#8CC63F] transition-colors"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <span className="text-xs text-[#9DB3A5]">@suryaenergyinfra on Instagram</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#9DB3A5] mb-5 font-mono">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-[#9DB3A5] hover:text-[#8CC63F] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-[#9DB3A5] hover:text-[#8CC63F] transition-colors">
                  Solar Packages (3-10 kW)
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="text-[#9DB3A5] hover:text-[#8CC63F] transition-colors">
                  Energy Savings Calculator
                </Link>
              </li>
              <li>
                <Link href="/subsidy-finance" className="text-[#9DB3A5] hover:text-[#8CC63F] transition-colors">
                  Subsidy & Finance Guide
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#9DB3A5] hover:text-[#8CC63F] transition-colors">
                  About Surya Energy Infra
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#9DB3A5] hover:text-[#8CC63F] transition-colors">
                  Contact & Survey
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Packages */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#9DB3A5] mb-5 font-mono">
              Packages
            </h4>
            <div className="space-y-3">
              {quickPackages.map((pkg) => (
                <Link
                  key={pkg.kw}
                  href={`/packages#pkg-${pkg.kw}kw`}
                  className="block p-3 rounded-2xl bg-[#072A19] border border-[rgba(255,255,255,0.14)] hover:border-[#8CC63F]/50 transition-colors group"
                >
                  <div className="flex items-center justify-between text-xs text-white font-semibold">
                    <span>{pkg.kw} kW Package</span>
                    <span className="text-[#8CC63F]">{formatINR(pkg.netCost)} net</span>
                  </div>
                  <div className="text-[11px] text-[#9DB3A5] mt-0.5">
                    {pkg.monthlyUnitsMin}-{pkg.monthlyUnitsMax} units/mo • ~{pkg.roofAreaSqFt} sq ft
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Contact & Office (Client facts only) */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#9DB3A5] mb-5 font-mono">
              Head Office
            </h4>
            <ul className="space-y-3.5 text-xs text-[#9DB3A5]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#8CC63F] shrink-0 mt-0.5" />
                <a
                  href={siteConfig.contact.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors leading-relaxed"
                >
                  {siteConfig.contact.address.full}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#8CC63F] shrink-0" />
                <a href={siteConfig.contact.phoneTel} className="hover:text-white transition-colors">
                  {siteConfig.contact.displayPhone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#8CC63F] shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#8CC63F] shrink-0 mt-0.5" />
                <span>{siteConfig.contact.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip: Legal & StaffArc Credit */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#9DB3A5]">
          <div className="flex flex-wrap items-center gap-4">
            <p>© 2026 {siteConfig.name}. All rights reserved.</p>
            <span className="hidden sm:inline">•</span>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <span>Website by</span>
            <a
              href={siteConfig.developerCredit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-medium hover:text-[#8CC63F] transition-colors inline-flex items-center gap-1"
            >
              <span>{siteConfig.developerCredit.name}</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
