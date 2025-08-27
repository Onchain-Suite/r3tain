"use client";

import { useState } from "react";

import { DashboardLayoutContent } from "@/components/layout";
import { dashboardRoutes } from "@/config/routes";

import { FeatureCards } from "./feature-cards";
import { GetStartedSection } from "./get-started-section";
import { NewUserBanner } from "./new-banner";
import { OnboardingCalendar } from "./new-calendar";
import { PlanUsageCard } from "./plan-usage-card";
import { WelcomeSection } from "./welcome-section";

const crumbs = [{ label: "Home", href: dashboardRoutes.home }];

export function NewUserDashboard() {
  const [userName] = useState("Alex"); // This would come from user context/props

  return (
    <DashboardLayoutContent breadcrumbs={crumbs} currentPage="Onboarding">
      <NewUserBanner />
      <div className="mx-auto max-w-6xl space-y-8 p-4">
        {/* Welcome Section with Calendar */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2">
            <WelcomeSection userName={userName} />
          </div>
          <div className="lg:col-span-1">
            <OnboardingCalendar />
          </div>
        </div>

        {/* Get Started Section */}
        <div className="mt-8 lg:mt-10">
          <GetStartedSection />
        </div>

        {/* Plan Usage */}
        <div className="mt-8 lg:mt-10">
          <PlanUsageCard />
        </div>

        {/* Feature Cards Section */}
        <div className="mt-8 lg:mt-10">
          <FeatureCards />
        </div>
      </div>
    </DashboardLayoutContent>
  );
}
