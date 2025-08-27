import { type NextRequest, NextResponse } from "next/server";

import { trackOnboardingStep } from "@/lib/onboarding";
import { stackServerApp } from "@/lib/stack";

export async function POST(request: NextRequest) {
  try {
    // Get the user from Stack Auth
    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      projectId,
      stepName,
      action,
      timeSpentSeconds,
      stepData,
      userAgent,
      ipAddress,
    } = body;

    // Track the onboarding step
    const logId = await trackOnboardingStep(user.id, projectId ?? null, {
      stepName,
      action,
      timeSpentSeconds,
      stepData,
      userAgent,
      ipAddress,
    });

    return NextResponse.json({ success: true, logId });
  } catch (error) {
    console.error("Error tracking onboarding step:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get the user from Stack Auth
    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");

    // Get onboarding progress
    const { getUserOnboardingCompletionTime } = await import(
      "@/lib/onboarding"
    );
    const progress = await getUserOnboardingCompletionTime(user.id, projectId);

    return NextResponse.json({ progress });
  } catch (error) {
    console.error("Error getting onboarding progress:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
