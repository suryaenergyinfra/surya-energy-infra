import React from "react";
import { HeroSlideshow } from "@/components/home/hero-slideshow";
import { StatementSection } from "@/components/home/statement-section";
import { EmbeddedEstimator } from "@/components/calculator/embedded-estimator";
import { PerformanceSplit } from "@/components/home/performance-split";
import { QualityFeatures } from "@/components/home/quality-features";
import { StatTimeline } from "@/components/home/stat-timeline";
import { PackageLineup } from "@/components/home/package-lineup";
import { InstallationProcess } from "@/components/home/installation-process";
import { FinanceTeaser } from "@/components/home/finance-teaser";
import { UpdatesStrip } from "@/components/home/updates-strip";
import { FaqAccordion } from "@/components/home/faq-accordion";
import { CtaBanner } from "@/components/home/cta-banner";

export default function HomePage() {
  return (
    <>
      {/* Hero Slideshow */}
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
