import { type JsonValue } from "@/prisma/runtime/library";
import {
  type OnboardingCompletionTime,
  type OnboardingStepData,
} from "@/types/onboarding";

import { prisma } from "./prisma";

/**
 * Track a step in the onboarding process
 */
export async function trackOnboardingStep(
  userId: string,
  projectId: string | null,
  stepData: OnboardingStepData
): Promise<string> {
  // First, get or create onboarding progress
  let onboarding = await prisma.onboardingProgress.findUnique({
    where: {
      userId_projectId: {
        userId,
        projectId: projectId ?? "",
      },
    },
  });

  onboarding ??= await prisma.onboardingProgress.create({
    data: {
      userId,
      projectId,
      currentStep: stepData.stepName,
      totalSteps: 5, // Default number of onboarding steps
    },
  });

  // Create step log
  const stepLog = await prisma.onboardingStepLog.create({
    data: {
      onboardingId: onboarding.id,
      stepName: stepData.stepName,
      action: stepData.action,
      timeSpentSeconds: stepData.timeSpentSeconds ?? 0,
      stepData: (stepData.stepData as JsonValue) ?? {},
      userAgent: stepData.userAgent,
      ipAddress: stepData.ipAddress,
    },
  });

  // Update onboarding progress if step is completed
  if (stepData.action === "completed") {
    const currentCompletedSteps = onboarding.completedSteps;
    const newCompletedSteps = currentCompletedSteps.includes(stepData.stepName)
      ? currentCompletedSteps
      : [...currentCompletedSteps, stepData.stepName];

    const completionPercentage =
      (newCompletedSteps.length / onboarding.totalSteps) * 100;
    const isCompleted = newCompletedSteps.length >= onboarding.totalSteps;

    await prisma.onboardingProgress.update({
      where: { id: onboarding.id },
      data: {
        completedSteps: newCompletedSteps,
        completionPercentage,
        timeSpentSeconds:
          onboarding.timeSpentSeconds + (stepData.timeSpentSeconds ?? 0),
        lastActivityAt: new Date(),
        isCompleted,
        completedAt: isCompleted ? new Date() : onboarding.completedAt,
        currentStep: stepData.stepName,
      },
    });
  } else {
    // Just update time spent and last activity
    await prisma.onboardingProgress.update({
      where: { id: onboarding.id },
      data: {
        timeSpentSeconds:
          onboarding.timeSpentSeconds + (stepData.timeSpentSeconds ?? 0),
        lastActivityAt: new Date(),
        currentStep: stepData.stepName,
      },
    });
  }

  return stepLog.id;
}

/**
 * Get user's onboarding completion time and progress
 */
export async function getUserOnboardingCompletionTime(
  userId: string,
  projectId?: string | null
): Promise<OnboardingCompletionTime | null> {
  const onboarding = await prisma.onboardingProgress.findUnique({
    where: {
      userId_projectId: {
        userId,
        projectId: projectId ?? "",
      },
    },
  });

  if (!onboarding) return null;

  const formatTime = (seconds: number): string => {
    if (seconds < 60) return `${seconds} seconds`;
    if (seconds < 3600) return `${(seconds / 60).toFixed(1)} minutes`;
    return `${(seconds / 3600).toFixed(1)} hours`;
  };

  return {
    onboardingId: onboarding.id,
    totalTimeSeconds: onboarding.timeSpentSeconds,
    totalTimeFormatted: formatTime(onboarding.timeSpentSeconds),
    completionPercentage: Number(onboarding.completionPercentage),
    isCompleted: onboarding.isCompleted,
    startedAt: onboarding.startedAt,
    completedAt: onboarding.completedAt,
    stepsCompleted: onboarding.completedSteps.length,
    totalSteps: onboarding.totalSteps,
  };
}

/**
 * Get onboarding progress for a user
 */
export async function getOnboardingProgress(
  userId: string,
  projectId?: string | null
) {
  return await prisma.onboardingProgress.findUnique({
    where: {
      userId_projectId: {
        userId,
        projectId: projectId ?? "",
      },
    },
    include: {
      onboardingStepLogs: {
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  });
}

/**
 * Mark onboarding as completed
 */
export async function completeOnboarding(
  userId: string,
  projectId?: string | null
) {
  const onboarding = await prisma.onboardingProgress.findUnique({
    where: {
      userId_projectId: {
        userId,
        projectId: projectId ?? "",
      },
    },
  });

  if (!onboarding) {
    throw new Error("Onboarding progress not found");
  }

  return await prisma.onboardingProgress.update({
    where: { id: onboarding.id },
    data: {
      isCompleted: true,
      completedAt: new Date(),
      completionPercentage: 100,
      completedSteps: Array.from(
        { length: onboarding.totalSteps },
        (_, i) => `step_${i + 1}`
      ),
    },
  });
}

/**
 * Reset onboarding progress
 */
export async function resetOnboarding(
  userId: string,
  projectId?: string | null
) {
  const onboarding = await prisma.onboardingProgress.findUnique({
    where: {
      userId_projectId: {
        userId,
        projectId: projectId ?? "",
      },
    },
  });

  if (!onboarding) {
    throw new Error("Onboarding progress not found");
  }

  return await prisma.onboardingProgress.update({
    where: { id: onboarding.id },
    data: {
      currentStep: "welcome",
      completedSteps: [],
      completionPercentage: 0,
      isCompleted: false,
      completedAt: null,
      timeSpentSeconds: 0,
      sessionCount: 1,
      startedAt: new Date(),
    },
  });
}
