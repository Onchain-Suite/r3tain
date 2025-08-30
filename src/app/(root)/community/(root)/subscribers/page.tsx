import { Suspense } from "react";

import { DashboardLayoutContent } from "@/components/layout";

import { dashboardRoutes } from "@/config/routes";

import { AutomationPageSkeleton } from "@/automation/components";
import { SubscribersPage } from "@/community/pages";

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
