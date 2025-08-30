import { Suspense } from "react";

import { DashboardLayoutContent } from "@/components/layout";

import { dashboardRoutes } from "@/config/routes";

import { MarketingDashboard } from "@/analytics/dashboard/page";
import { AutomationPageSkeleton } from "@/automation/components";

const crumbs = [
  { label: "Home", href: dashboardRoutes.home },
  { label: "Analytics", href: dashboardRoutes.analytics },
];

export default function Page() {
  return (
    <DashboardLayoutContent
      breadcrumbs={crumbs}
      currentPage="Marketing Analytics"
    >
      <Suspense fallback={<AutomationPageSkeleton />}>
        <MarketingDashboard />
      </Suspense>
    </DashboardLayoutContent>
  );
}
