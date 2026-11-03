"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { MapPin, ShieldCheck, Zap, ArrowRight, MessageSquare, CheckCircle2 } from "lucide-react";
import { useWhatsAppModal } from "@/components/ui/whatsapp-modal-context";
import { siteConfig } from "@/lib/site";

interface ClientProject {
  id: string;
  location: string;
  district: string;
  systemSize: string;
  image: string;
  rawImage?: string;
  tag: string;
  summary: string;
  highlight: string;
}

const CLIENT_PROJECTS: ClientProject[] = [
  {
    id: "darsi-1",
    location: "Darsi",
    district: "Prakasam District, Andhra Pradesh",
    systemSize: "5 kW On-Grid Rooftop System",
    image: "/images/client-darsi.jpg",
    rawImage: "/images/raw-client-darsi.jpg",
    tag: "Happy Homeowner",
    summary: "Commissioned with high-efficiency Topcon bi-facial panels and heavy-duty galvanized rooftop structures.",
    highlight: "₹78,000 Subsidy Credited",
  },
  {
    id: "pothavaram-1",
    location: "Potha Varam",
    district: "Prakasam District, Andhra Pradesh",
    systemSize: "3 kW Residential Solar System",
    image: "/images/client-pothavaram-woman.jpg",
    rawImage: "/images/raw-client-pothavaram-2.jpg",
    tag: "Verified Client",
    summary: "Complete turnkey EPC installation with PM Surya Ghar subsidy filing and discom net metering.",
    highlight: "Saves ₹2,800+ Every Month",
  },
  {
    id: "pothavaram-2",
    location: "Potha Varam",
    district: "Prakasam District, Andhra Pradesh",
    systemSize: "3 kW On-Grid Solar Plant",
    image: "/images/client-pothavaram-man.jpg",
    rawImage: "/images/raw-client-pothavaram-1.jpg",
    tag: "PM Surya Ghar",
    summary: "Terrace-mounted solar plant powering entire home day and night via on-grid bi-directional export.",
    highlight: "Installed in 7 Days",
  },
  {
    id: "rajampalli-1",
    location: "Rajampalli",
    district: "Prakasam District, Andhra Pradesh",
    systemSize: "5 kW Elevated Rooftop Solar",
    image: "/images/installation-rajampalli.jpg",
    rawImage: "/images/raw-installation-rajampalli-1.jpg",
    tag: "Turnkey EPC",
    summary: "Elevated structures allowing complete terrace usage beneath panels while harvesting maximum solar yield.",
    highlight: "High Wind-Resistant Mounts",
  },
  {
    id: "family-1",
    location: "Andhra Pradesh",
    district: "Residential Homeowner",
    systemSize: "3 kW Beneficiary Household",
    image: "/images/client-family.jpg",
    tag: "Clean Energy Home",
    summary: "Financed through nationalised bank low-interest solar scheme with ₹78,000 central government grant.",
    highlight: "5.75% Bank Loan Rate",
  },
];

export function ClientShowcase() {
  const { openEnquiryModal } = useWhatsAppModal();

  return (
    <section className="bg-[#F1F8EC] py-20 lg:py-28 text-[#06180F] border-b border-[#D5E6CC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#D5E6CC] text-xs font-mono uppercase tracking-[0.14em] text-[#0B4A2B] font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#3F8F3A]" />
              <span>Real Andhra Pradesh Installations</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-medium font-heading tracking-[-0.03em] text-[#06180F] leading-[1.12]">
              Real Homes. Real Power. <br />
              <span className="text-[#0B4A2B]">Happy Clients Across AP.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#06180F]/75 font-normal leading-relaxed">
              Explore authentic rooftop solar EPC installations completed by Surya Energy Infra across Darsi, Potha Varam, Rajampalli, and Prakasam District under the PM Surya Ghar scheme.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                openEnquiryModal({
                  title: "Book Free Rooftop Survey",
                  defaultRequirement: "Free Rooftop Survey",
                  defaultNotes: "Looking to install rooftop solar in Andhra Pradesh. Please arrange a site survey.",
                })
              }
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#0B4A2B] hover:bg-[#072A19] text-white font-medium text-sm transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <span>Get Free Survey</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Client Installation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CLIENT_PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group bg-white rounded-[28px] border border-[#D5E6CC] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Photo Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#072A19]/10">
                <Image
                  src={project.image}
                  alt={`${project.systemSize} in ${project.location}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* Location Badge Overlay */}
                <div className="absolute top-3.5 left-3.5 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#04140C]/85 backdrop-blur-md text-white border border-white/20 text-xs font-medium">
                  <MapPin className="w-3 h-3 text-[#8CC63F]" />
                  <span>{project.location}, AP</span>
                </div>

                {/* Highlight Badge */}
                <div className="absolute bottom-3.5 left-3.5 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8CC63F] text-[#04140C] text-xs font-semibold shadow-md">
                  <Zap className="w-3 h-3 fill-current" />
                  <span>{project.highlight}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#0B4A2B] bg-[#F1F8EC] px-2.5 py-0.5 rounded-full border border-[#D5E6CC]">
                      {project.tag}
                    </span>
                    <span className="text-xs text-[#06180F]/60 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#3F8F3A]" />
                      <span>AP Discom Net Metered</span>
                    </span>
                  </div>

                  <h3 className="text-xl font-medium font-heading text-[#06180F] tracking-tight mb-2">
                    {project.systemSize}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#06180F]/70 leading-relaxed mb-4">
                    {project.summary}
                  </p>
                </div>

                {/* Card Action */}
                <div className="pt-4 border-t border-[#D5E6CC]/70 flex items-center justify-between gap-2 mt-auto">
                  <span className="text-xs font-mono text-[#06180F]/60 truncate">
                    {project.district}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      openEnquiryModal({
                        title: `Solar Enquiry for ${project.location}`,
                        defaultRequirement: project.systemSize,
                        defaultNotes: `Interested in a system similar to the ${project.location} installation (${project.systemSize}). Please provide details for my location.`,
                      })
                    }
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F1F8EC] hover:bg-[#0B4A2B] text-[#0B4A2B] hover:text-white border border-[#D5E6CC] text-xs font-medium transition-all shrink-0 cursor-pointer"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>Enquire</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Proof Trust Banner */}
        <div className="mt-12 bg-white rounded-2xl border border-[#D5E6CC] p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0B4A2B]/10 flex items-center justify-center text-[#0B4A2B] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#06180F]">Authorised Andhra Pradesh Vendor</h4>
              <p className="text-xs text-[#06180F]/70">
                Official PM Surya Ghar Rooftop Solar installations with complete subsidy processing across Andhra Pradesh.
              </p>
            </div>
          </div>

          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0B4A2B] hover:bg-[#072A19] text-white text-xs font-medium transition-all shrink-0 shadow-sm"
          >
            <span>See More Daily Work on Instagram</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
