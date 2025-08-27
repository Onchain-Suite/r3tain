"use client";

import { useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";

import { dashboardRoutes } from "@/config/routes";

import {
  BusinessAddressStep,
  BusinessGoalStep,
  ContactCountStep,
  ImportantFeaturesStep,
  OrganizationTypeStep,
  PersonalInfoStep,
  PlanSelectionStep,
} from "./components";
import { OnboardingLayout } from "./components/onboarding-layout";
import {
  getCompletionPercentage,
  getStepFromNumber,
  useOnboardingPersistence,
  useOnboardingTracking,
} from "./hooks";
import { type OnboardingData } from "./types";

export function OnboardingFlow() {
  const { push } = useRouter();
  const user = useUser();
  const {
    step: currentStep,
    data: formData,
    setStep,
    setData,
  } = useOnboardingPersistence<OnboardingData>();

  const { updateProgress, completeOnboarding } = useOnboardingTracking();

  const handleStepComplete = async (stepData: Partial<OnboardingData>) => {
    setData(stepData);
    const nextStep = currentStep + 1;
    setStep(nextStep);

    // Save progress to Supabase if user is authenticated
    if (user?.id) {
      const stepName = getStepFromNumber(nextStep);
      const completionPercentage = getCompletionPercentage(stepName);
      await updateProgress(stepName, stepData, completionPercentage);
    }
  };

  const handleBack = () => {
    setStep(Math.max(1, currentStep - 1));
  };

  const handleOnboardingComplete = async (
    stepData: Partial<OnboardingData>
  ) => {
    const finalData = { ...formData, ...stepData };

    try {
      // Mark onboarding as completed in the database
      const response = await fetch("/api/user/complete-onboarding", {
        method: "POST",
      });

      if (response.ok) {
        // Save final data to database if needed
        if (user?.id) {
          await completeOnboarding(finalData);
        }

        console.log(
          "Onboarding completed with data:",
          JSON.stringify(finalData, null, 2)
        );
        push(dashboardRoutes.home);
      } else {
        console.error("Failed to complete onboarding");
        // Still redirect to dashboard but show a warning
        push(dashboardRoutes.home);
      }
    } catch (error) {
      console.error("Error completing onboarding:", error);
      // Still redirect to dashboard but show a warning
      push(dashboardRoutes.home);
    }
  };

  const renderStep = () => {
    const commonProps = {
      initialData: formData,
      onBack: handleBack,
    };

    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            initialData={formData}
            onNext={handleStepComplete}
          />
        );
      case 2:
        return (
          <BusinessAddressStep {...commonProps} onNext={handleStepComplete} />
        );
      case 3:
        return (
          <OrganizationTypeStep {...commonProps} onNext={handleStepComplete} />
        );
      case 4:
        return (
          <BusinessGoalStep {...commonProps} onNext={handleStepComplete} />
        );
      case 5:
        return (
          <ImportantFeaturesStep {...commonProps} onNext={handleStepComplete} />
        );
      case 6:
        return (
          <ContactCountStep {...commonProps} onNext={handleStepComplete} />
        );
      case 7:
        return (
          <PlanSelectionStep
            {...commonProps}
            onNext={handleOnboardingComplete}
          />
        );
      default:
        return (
          <div className="text-center">
            <h1 className="text-foreground mb-4 text-3xl font-bold">
              Welcome to R3tain!
            </h1>
            <p className="text-muted-foreground">
              Your account has been set up successfully.
            </p>
          </div>
        );
    }
  };

  return (
    <OnboardingLayout currentStep={currentStep} totalSteps={7}>
      {renderStep()}
    </OnboardingLayout>
  );
}
