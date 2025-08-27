import { DashboardLayoutContent } from "@/components/layout";
import { dashboardRoutes } from "@/config/routes";
import { CampaignDashboard } from "@/features/campaign";

const crumbs = [
  { label: "Home", href: dashboardRoutes.home },
  { label: "Campaigns", href: dashboardRoutes.campaigns },
];

export default function CampaignsPage() {
  return (
    <DashboardLayoutContent breadcrumbs={crumbs} currentPage="All Campaigns">
      <CampaignDashboard />
    </DashboardLayoutContent>
  );
}
