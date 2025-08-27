import { Suspense } from "react";

import { DashboardPageContent, LoadingSkeleton } from "@/dashboard/components";

export default function Page() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <DashboardPageContent />;
    </Suspense>
  );
}
