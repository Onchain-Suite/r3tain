import { Suspense } from "react";

import { MarketingDashboard } from "@/analytics/dashboard/page";
import { AutomationPageSkeleton } from "@/automation/components";
import { DashboardLayoutContent } from "@/components/layout";
import { dashboardRoutes } from "@/config/routes";

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
