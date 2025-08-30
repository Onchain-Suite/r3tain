import { type NextRequest, NextResponse } from "next/server";

import { getUserOnboardingCompletionTime } from "@/lib/onboarding";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const projectId = searchParams.get("projectId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const onboardingData = await getUserOnboardingCompletionTime(
      userId,
      projectId
    );

    return NextResponse.json({
      onboardingCompleted: onboardingData?.isCompleted ?? false,
      onboardingData,
    });
  } catch (error) {
    console.error("Failed to get onboarding status:", error);
    return NextResponse.json(
      { error: "Failed to get onboarding status" },
      { status: 500 }
    );
  }
}
