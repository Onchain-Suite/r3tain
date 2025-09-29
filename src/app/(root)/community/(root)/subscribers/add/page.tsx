import { DashboardLayoutContent } from "@/components/layout";

import { dashboardRoutes } from "@/config/routes";

import { AddSubscriber } from "@/community/pages";

const crumbs = [
  { label: "Home", href: dashboardRoutes.home },
  { label: "Community", href: dashboardRoutes.community },
  { label: "Subscribers", href: dashboardRoutes.subscribers },
];

export default function Page() {
  return (
    <DashboardLayoutContent breadcrumbs={crumbs} currentPage="Add Subscriber">
      <AddSubscriber />
    </DashboardLayoutContent>
  );
}
