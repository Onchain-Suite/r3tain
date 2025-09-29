"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui";

import { signOut, useSession } from "@/lib/auth-client";
import { getInitials } from "@/lib/utils";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { data: session, isPending } = useSession();
  const isLoading = isPending || !session;

  // User info component used in both places
  const UserInfo = ({ isLoading }: { isLoading?: boolean }) => (
    <div className="grid flex-1 text-left text-sm leading-tight">
      {isLoading ? (
        <>
          <div className="h-4 w-20 bg-muted rounded animate-pulse mb-1" />
          <div className="h-3 w-28 bg-muted rounded animate-pulse" />
        </>
      ) : (
        session && (
          <>
            <span className="truncate font-medium">{session.user.name}</span>
            <span className="truncate text-xs">{session.user.email}</span>
          </>
        )
      )}
    </div>
  );

  // Avatar component used in both places
  const UserAvatar = ({ isLoading }: { isLoading?: boolean }) =>
    isLoading ? (
      <div className="h-8 w-8 rounded-lg bg-muted animate-pulse" />
    ) : (
      session && (
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage src={session.user.image ?? ""} alt={session.user.name} />
          <AvatarFallback className="rounded-lg">
            {getInitials(session.user.name)}
          </AvatarFallback>
        </Avatar>
      )
    );

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild disabled={isLoading}>
            <SidebarMenuButton
              size="lg"
              className={
                isLoading
                  ? "cursor-not-allowed opacity-60"
                  : "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              }
            >
              <UserAvatar isLoading={isLoading} />
              <UserInfo isLoading={isLoading} />
              <ChevronsUpDown
                className={`ml-auto size-4 ${isLoading ? "opacity-50" : ""}`}
              />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          {!isLoading && (
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <UserAvatar />
                  <UserInfo />
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Sparkles />
                  Upgrade to Pro
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <BadgeCheck />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
