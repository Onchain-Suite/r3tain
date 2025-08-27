"use client";

import type { ReactNode } from "react";

import { AppSidebar } from "@/components/layout";
import { SidebarProvider } from "@/components/ui/sidebar";
import { dashboardNav } from "@/config/dashboard-nav";
import { dashboardRoutes } from "@/config/routes";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar navItems={dashboardNav} route={dashboardRoutes.home} />

      {children}
    </SidebarProvider>
  );
}
