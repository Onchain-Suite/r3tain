import { AddSubscriber } from "@/community/pages";
import { DashboardLayoutContent } from "@/components/layout";
import { dashboardRoutes } from "@/config/routes";

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
