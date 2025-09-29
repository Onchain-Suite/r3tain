import { Suspense } from "react";

import { DashboardLayoutContent } from "@/components/layout";

import { dashboardRoutes } from "@/config/routes";

import { CommunityDashboard } from "@/community/pages";
import { AutomationPageSkeleton } from "@/features/automation/components";

const crumbs = [
  { label: "Home", href: dashboardRoutes.home },
  { label: "Community", href: dashboardRoutes.community },
];

export default function Page() {
  return (
    <DashboardLayoutContent breadcrumbs={crumbs} currentPage="">
      <Suspense fallback={<AutomationPageSkeleton />}>
        <CommunityDashboard />
      </Suspense>
    </DashboardLayoutContent>
  );
}
