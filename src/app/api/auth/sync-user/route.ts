import { type NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/lib/stack";

export async function POST(request: NextRequest) {
  try {
    // Get the user from Stack Auth
    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get additional profile data from request body if provided
    const body = await request.json().catch(() => ({}));
    const { firstName, lastName } = body;

    // Check if user profile exists in our database
    const existingProfile = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!existingProfile) {
      // Create user profile in our database
      await prisma.user.create({
        data: {
          id: user.id,
          email: user.primaryEmail ?? "",
          name:
            user.displayName ?? `${firstName ?? ""} ${lastName ?? ""}`.trim(),
          firstName:
            firstName ?? (user.clientMetadata?.firstName as string) ?? "",
          lastName: lastName ?? (user.clientMetadata?.lastName as string) ?? "",
          image: user.profileImageUrl ?? null,
        },
      });

      // Create initial onboarding progress
      await prisma.onboardingProgress.create({
        data: {
          userId: user.id,
          projectId: null, // Global onboarding, not project-specific
          currentStep: "welcome",
          totalSteps: 5,
        },
      });
    } else if (firstName || lastName) {
      // Update existing profile with new data
      await prisma.user.update({
        where: { id: user.id },
        data: {
          ...(firstName && { firstName }),
          ...(lastName && { lastName }),
          name: `${firstName ?? existingProfile.firstName} ${lastName ?? existingProfile.lastName}`.trim(),
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error syncing user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
