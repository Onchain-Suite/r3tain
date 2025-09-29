import { Suspense } from "react";

import { DashboardLayoutContent } from "@/components/layout";
import { WorkInProgressPage } from "@/components/meta-components";

import { dashboardRoutes } from "@/config/routes";

import { AutomationPageSkeleton } from "@/features/automation/components";

const crumbs = [
  { label: "Home", href: dashboardRoutes.home },
  { label: "Community", href: dashboardRoutes.community },
];

export default function Page() {
  return (
    <DashboardLayoutContent breadcrumbs={crumbs} currentPage="Inbox">
      <Suspense fallback={<AutomationPageSkeleton />}>
        <WorkInProgressPage
          featureName="Inbox"
          expectedRelease="Q3 2024"
          description="Manage your inbox with ease and speed"
          progress={30}
        />
      </Suspense>
    </DashboardLayoutContent>
  );
}
