import { Suspense } from "react";

import { FlowTemplatesPage } from "@/automation/flow-templates";
import { FlowTemplatesPageSkeleton } from "@/automation/flow-templates/components";
import { DashboardLayoutContent } from "@/components/layout";
import { dashboardRoutes } from "@/config/routes";

const crumbs = [
  { label: "Home", href: dashboardRoutes.home },
  { label: "Automation", href: dashboardRoutes.automation },
];

const TemplatesPage = () => {
  return (
    <DashboardLayoutContent breadcrumbs={crumbs} currentPage="All Templates">
      <Suspense fallback={<FlowTemplatesPageSkeleton />}>
        <FlowTemplatesPage />
      </Suspense>
    </DashboardLayoutContent>
  );
};

export default TemplatesPage;
