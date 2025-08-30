"use client";

import { useSearchParams } from "next/navigation";

import { ReturningUserDashboard } from "./returning-user-dashboard";

import { NewUserDashboard } from "@/features/dashboard/new-user/components";

export function DashboardPageContent() {
  const searchParams = useSearchParams();
  const userType = searchParams.get("userType") ?? "returning"; // Default

  // Show onboarding dashboard for first-time users
  if (userType === "new") {
    return <NewUserDashboard />;
  } else {
    return <ReturningUserDashboard />;
  }
}
