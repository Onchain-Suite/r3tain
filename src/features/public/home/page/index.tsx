"use client";

import {
  PageErrorBoundary,
  SectionErrorBoundary,
} from "@/components/error-boundaries";

import {
  CTASection,
  FeaturesSection,
  Footer,
  Header,
  HeroSection,
  StatsSection,
} from "../components";

export function HomePage() {
  return (
    <PageErrorBoundary pageName="Home">
      <Header />
      <main className="min-h-screen">
        <SectionErrorBoundary sectionName="Hero">
          <HeroSection />
        </SectionErrorBoundary>

        <SectionErrorBoundary sectionName="Features">
          <FeaturesSection />
        </SectionErrorBoundary>

        <SectionErrorBoundary sectionName="Statistics">
          <StatsSection />
        </SectionErrorBoundary>

        <SectionErrorBoundary sectionName="Call to Action">
          <CTASection />
        </SectionErrorBoundary>
      </main>
      <Footer />
    </PageErrorBoundary>
  );
}
