"use client";

import { useRouter } from "next/navigation";

import { useImport } from "@/community/context";
import { dashboardRoutes } from "@/config/routes";

export function useImportNavigation() {
  const router = useRouter();
  const { resetImport } = useImport();

  const navigateToStep = (step: string, params?: Record<string, string>) => {
    const searchParams = new URLSearchParams(params ?? {});
    const fullUrl = new URL(
      `${dashboardRoutes.addSubscribers}/${step}?${searchParams}`,
      window.location.origin
    );
    router.push(fullUrl.toString());
  };

  const goBack = (previousStep: string) => {
    router.push(`${dashboardRoutes.addSubscribers}/${previousStep}`);
  };

  const exitImport = () => {
    resetImport();
    router.push(dashboardRoutes.community);
  };

  const goToDashboard = () => {
    resetImport();
    router.push(dashboardRoutes.community);
  };

  return {
    navigateToStep,
    goBack,
    exitImport,
    goToDashboard,
  };
}
