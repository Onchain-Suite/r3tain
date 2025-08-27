"use client";

import { useState } from "react";

import { CommandPalette } from "@/components/common";
import { SidebarInset } from "@/components/ui";

import { DashboardHeader } from "./dashboard-header";
import type { DashboardLayoutContentProps } from "./types";

export const DashboardLayoutContent = ({
  children,
  breadcrumbs,
  currentPage,
}: DashboardLayoutContentProps) => {
  const [openPalette, setOpenPalette] = useState(false);

  return (
    <SidebarInset className="flex h-screen flex-col overflow-hidden">
      <DashboardHeader
        breadcrumbs={breadcrumbs}
        currentPage={currentPage}
        setOpen={setOpenPalette}
      />
      <div className="flex-1 overflow-auto">{children}</div>
      <CommandPalette open={openPalette} setOpen={setOpenPalette} />
    </SidebarInset>
  );
};
