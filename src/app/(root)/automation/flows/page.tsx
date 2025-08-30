import { Suspense } from "react";

import { DashboardLayoutContent } from "@/components/layout";

import { dashboardRoutes } from "@/config/routes";

import { AllFlowsPage } from "@/automation/flows";
import { AllFlowsPageSkeleton } from "@/automation/flows/components";

const crumbs = [
  { label: "Home", href: dashboardRoutes.home },
  { label: "Automation", href: dashboardRoutes.automation },
];

const AutomationFlowsPage = () => {
  return (
    <DashboardLayoutContent breadcrumbs={crumbs} currentPage="All Flows">
      <Suspense fallback={<AllFlowsPageSkeleton />}>
        <AllFlowsPage />
      </Suspense>
    </DashboardLayoutContent>
  );
};

export default AutomationFlowsPage;
