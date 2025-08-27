import {
  BarChart3,
  CircuitBoard,
  FileText,
  Inbox,
  Layers,
  LayoutDashboard,
  LayoutTemplate,
  ListCheck,
  Megaphone,
  Settings,
  Tags,
  UserCheck,
  Users,
} from "lucide-react";

import type { NavItem } from "@/types/ui";

import { dashboardRoutes } from "./routes";

export const dashboardNav: NavItem[] = [
  {
    href: dashboardRoutes.home,
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    href: dashboardRoutes.campaigns,
    icon: Megaphone,
    label: "Campaigns",
  },
  {
    href: dashboardRoutes.automation,
    icon: Layers,
    label: "Automation",
    submenu: [
      {
        href: dashboardRoutes.flows,
        label: "Flows",
        icon: CircuitBoard,
      },
      {
        href: dashboardRoutes.templates,
        label: "Templates",
        icon: LayoutTemplate,
      },
    ],
  },
  {
    href: dashboardRoutes.community,
    icon: Users,
    label: "Community",
    submenu: [
      {
        href: dashboardRoutes.subscribers,
        label: "Subscribers",
        icon: UserCheck,
      },

      {
        href: dashboardRoutes.segments,
        label: "Segments",
        icon: Layers,
      },
      {
        href: dashboardRoutes.surveys,
        label: "Surveys",
        icon: ListCheck,
      },
      {
        href: dashboardRoutes.subscriberPreferences,
        label: "Subscriber Preferences",
        icon: Settings,
      },
      {
        href: dashboardRoutes.inbox,
        label: "Inbox",
        icon: Inbox,
      },
      {
        href: dashboardRoutes.tags,
        label: "Tags",
        icon: Tags,
      },
    ],
  },
  {
    href: dashboardRoutes.analytics,
    icon: BarChart3,
    label: "Analytics",
    submenu: [
      {
        href: dashboardRoutes.reports,
        label: "Reports",
        icon: FileText,
      },
    ],
  },
];
