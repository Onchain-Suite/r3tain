import { Suspense } from "react";

import { DashboardLayoutContent } from "@/components/layout";
import { dashboardRoutes } from "@/config/routes";
import { AutomationPageSkeleton } from "@/features/automation/components";
import { TagsPage } from "@/tag/page";

const crumbs = [
  { label: "Home", href: dashboardRoutes.home },
  { label: "Community", href: dashboardRoutes.community },
];

export default function Page() {
  return (
    <DashboardLayoutContent breadcrumbs={crumbs} currentPage="Tags">
      <Suspense fallback={<AutomationPageSkeleton />}>
        <TagsPage />
      </Suspense>
    </DashboardLayoutContent>
  );
}
