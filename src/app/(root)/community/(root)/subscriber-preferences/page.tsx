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
    <DashboardLayoutContent
      breadcrumbs={crumbs}
      currentPage="Subscriber Preferences"
    >
      <Suspense fallback={<AutomationPageSkeleton />}>
        <WorkInProgressPage
          featureName="Subscriber Preferences"
          expectedRelease="Q3 2024"
          description="Manage your subscriber preferences with ease"
          progress={30}
        />
      </Suspense>
    </DashboardLayoutContent>
  );
}
