"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui";

import { dashboardRoutes } from "@/config/routes";

export const AddSubscriberHeader = () => {
  const { push } = useRouter();

  return (
    <div className="bg-background/95 border-border sticky top-0 z-40 flex items-center justify-between border-b px-4 py-4 backdrop-blur-sm lg:px-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Add a single subscriber
        </h1>
        <p className="text-muted-foreground">
          Add subscriber information to your community
        </p>
      </div>
      <Button onClick={() => push(dashboardRoutes.addSubscribers)}>
        Import subscribers
      </Button>
    </div>
  );
};
