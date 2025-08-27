"use client";

import { Logo } from "@/components/common";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import type { AppSidebarProps } from "./types";

const userData = {
  name: "Alex Johnson",
  email: "alex@r3tain.io",
  avatar: "/placeholder.svg?height=32&width=32",
};

export function AppSidebar({ navItems, route, ...rest }: AppSidebarProps) {
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...rest}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <a href={route}>
                <div className="flex items-center justify-center">
                  <Logo
                    className="text-sidebar-foreground size-24"
                    isCollapsed={state === "collapsed"}
                  />
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
