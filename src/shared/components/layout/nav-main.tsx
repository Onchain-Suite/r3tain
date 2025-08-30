"use client";

import { ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui";

import { dashboardRoutes } from "@/config/routes";

import type { NavItem } from "@/types/ui";

export function NavMain({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const { push } = useRouter();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.label}
            defaultOpen
            className="group/collapsible mt-2"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  isActive={
                    pathname === item.href ||
                    (pathname.startsWith(item.href) &&
                      item.href !== dashboardRoutes.home)
                  }
                  tooltip={item.label}
                  onClick={() => push(item.href)}
                  className="cursor-pointer"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                  {item.submenu && (
                    <ChevronDown className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                  )}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              {item.submenu && (
                <CollapsibleContent className="overflow-hidden transition-all duration-200 ease-in-out">
                  <SidebarMenuSub>
                    {item.submenu.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.label} className="mt-2">
                        <SidebarMenuSubButton
                          asChild
                          isActive={
                            pathname === subItem.href ||
                            (pathname.startsWith(subItem.href) &&
                              subItem.href !== dashboardRoutes.home)
                          }
                        >
                          <a href={subItem.href}>
                            <subItem.icon className="mr-2 h-4 w-4" />
                            {subItem.label}
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
