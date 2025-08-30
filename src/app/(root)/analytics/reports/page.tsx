import { Suspense } from "react";

import { DashboardLayoutContent } from "@/components/layout";

import { dashboardRoutes } from "@/config/routes";

import { ReportsPage } from "@/analytics/reports/page";
import { AutomationPageSkeleton } from "@/automation/components";

const crumbs = [
  { label: "Home", href: dashboardRoutes.home },
  { label: "Analytics", href: dashboardRoutes.analytics },
];

export default function Page() {
  return (
    <DashboardLayoutContent breadcrumbs={crumbs} currentPage="Reports">
      <Suspense fallback={<AutomationPageSkeleton />}>
        <ReportsPage />
      </Suspense>
    </DashboardLayoutContent>
  );
}
