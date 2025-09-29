"use client";

import { DashboardLayoutContent } from "@/components/layout";

import { dashboardRoutes } from "@/config/routes";
import { useUserSync } from "@/hooks/client";

import { AudienceSection } from "./audience-section";
import { AutomationsSection } from "./automations-section";
import { EmailPerformance } from "./email-performance";
import { EmailTaggedContacts } from "./email-tagged-contacts";

const crumbs = [{ label: "Home", href: dashboardRoutes.home }];

export function ReturningUserDashboard() {
  // Sync user data when component mounts
  useUserSync();

  return (
    <DashboardLayoutContent breadcrumbs={crumbs} currentPage="Overview">
      <div className="mx-auto max-w-7xl space-y-8 p-4">
        <EmailPerformance />

        {/* Audience Section */}
        <AudienceSection />

        {/* Automations Section - Full Width */}
        <AutomationsSection />

        {/* Email Tagged Contacts */}
        <EmailTaggedContacts />
      </div>
    </DashboardLayoutContent>
  );
}
