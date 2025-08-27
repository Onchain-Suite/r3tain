import { Suspense } from "react";

import { AutomationPageSkeleton } from "@/automation/components";
import { SubscribersPage } from "@/community/pages";
import { DashboardLayoutContent } from "@/components/layout";
import { dashboardRoutes } from "@/config/routes";

const crumbs = [
  { label: "Home", href: dashboardRoutes.home },
  { label: "Community", href: dashboardRoutes.community },
];

export default function Page() {
  return (
    <DashboardLayoutContent breadcrumbs={crumbs} currentPage="Subscribers">
      <Suspense fallback={<AutomationPageSkeleton />}>
        <SubscribersPage />
      </Suspense>
    </DashboardLayoutContent>
  );
}
