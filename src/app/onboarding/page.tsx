import { Suspense } from "react";

import { AnimatedLoading } from "@/components/loading";
import { OnboardingFlow } from "@/features/onboarding-flow/onboarding-flow";

export default function OnboardingPage() {
  return (
    <Suspense fallback={<AnimatedLoading />}>
      <OnboardingFlow />
    </Suspense>
  );
}
