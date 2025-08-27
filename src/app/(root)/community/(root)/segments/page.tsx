import { Suspense } from "react";

import { DashboardLayoutContent } from "@/components/layout";
import { dashboardRoutes } from "@/config/routes";
import { AutomationPageSkeleton } from "@/features/automation/components";
import { SegmentManager } from "@/segment/page";

const crumbs = [
  { label: "Home", href: dashboardRoutes.home },
  { label: "Community", href: dashboardRoutes.community },
];

export default function Page() {
  return (
    <DashboardLayoutContent breadcrumbs={crumbs} currentPage="Segments">
      <Suspense fallback={<AutomationPageSkeleton />}>
        <SegmentManager />
      </Suspense>
    </DashboardLayoutContent>
  );
}
