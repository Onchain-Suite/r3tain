import type { ReactNode } from "react";

import type { Sidebar } from "@/components/ui/sidebar";
import type { CrumbItem, NavItem } from "@/types/ui";

export interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  navItems: NavItem[];
  setOpen?: (open: boolean) => void;
  open?: boolean;
  route: string;
}

export interface DashboardHeaderProps {
  breadcrumbs: CrumbItem[];
  currentPage: string;
  setOpen: (open: boolean) => void;
}

export interface DashboardLayoutContentProps
  extends Omit<DashboardHeaderProps, "setOpen"> {
  children: ReactNode;
}
