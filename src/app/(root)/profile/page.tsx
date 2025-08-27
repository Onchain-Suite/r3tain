import { Suspense } from "react";

import { DashboardLayoutContent } from "@/components/layout";
import { dashboardRoutes } from "@/config/routes";
import { AutomationPageSkeleton } from "@/features/automation/components";
import { ProfilePage } from "@/features/profile";

const crumbs = [
  { label: "Home", href: dashboardRoutes.home },
  { label: "Profile", href: dashboardRoutes.profile },
];

export default function Page() {
  return (
    <DashboardLayoutContent breadcrumbs={crumbs} currentPage="Profile">
      <Suspense fallback={<AutomationPageSkeleton />}>
        <ProfilePage />
      </Suspense>
    </DashboardLayoutContent>
  );
}
