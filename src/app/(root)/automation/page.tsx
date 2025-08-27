import { Suspense } from "react";

import { AutomationPageSkeleton } from "@/automation/components";
import { AutomationPage } from "@/automation/page";
import { DashboardLayoutContent } from "@/components/layout";
import { dashboardRoutes } from "@/config/routes";

const crumbs = [
  { label: "Home", href: dashboardRoutes.home },
  { label: "Automation", href: dashboardRoutes.automation },
];

export default function Page() {
  return (
    <DashboardLayoutContent breadcrumbs={crumbs} currentPage="Overview">
      <Suspense fallback={<AutomationPageSkeleton />}>
        <AutomationPage />;
      </Suspense>
    </DashboardLayoutContent>
  );
}
