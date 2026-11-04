import React from "react";
import { HeroSlideshow } from "@/components/home/hero-slideshow";
import { StatementSection } from "@/components/home/statement-section";
import { EmbeddedEstimator } from "@/components/calculator/embedded-estimator";
import { PerformanceSplit } from "@/components/home/performance-split";
import { QualityFeatures } from "@/components/home/quality-features";
import { StatTimeline } from "@/components/home/stat-timeline";
import { PackageLineup } from "@/components/home/package-lineup";
import { InstallationProcess } from "@/components/home/installation-process";
import { ClientShowcase } from "@/components/home/client-showcase";
import { SolarVsGridComparison } from "@/components/home/solar-vs-grid-comparison";
import { FinanceTeaser } from "@/components/home/finance-teaser";
import { UpdatesStrip } from "@/components/home/updates-strip";
import { FaqAccordion } from "@/components/home/faq-accordion";
import { CtaBanner } from "@/components/home/cta-banner";

export default function HomePage() {
  return (
    <>
      {/* Photorealistic Hero Slideshow + Interactive 3D Topcon Solar Card */}
      <HeroSlideshow />

      {/* FAERS-Style Big Statement with Watermark */}
      <StatementSection />

      {/* FAERS-Style Energy Savings Estimator */}
      <EmbeddedEstimator />

      {/* FAERS-Style Split Photo + Technical Performance Card */}
      <PerformanceSplit />

      {/* FAERS-Style Climate & High-Heat Glass Cards Grid */}
      <QualityFeatures />

      {/* Numbered Stat Timeline 01-04 */}
      <StatTimeline />

      {/* Package Lineup (3 kW - 10 kW) */}
      <PackageLineup />

      {/* How Installation Works */}
      <InstallationProcess />

      {/* Real Installations & Happy Clients Across Andhra Pradesh */}
      <ClientShowcase />

      {/* Smart Comparison: Electricity Bill vs. Owning Rooftop Solar (Top EPC Benchmark) */}
      <SolarVsGridComparison />

      {/* Subsidy & Finance */}
      <FinanceTeaser />

      {/* Updates Strip (Instagram) */}
      <UpdatesStrip />

      {/* FAQ Accordion */}
      <FaqAccordion />

      {/* Final CTA Banner */}
      <CtaBanner />
    </>
  );
}
